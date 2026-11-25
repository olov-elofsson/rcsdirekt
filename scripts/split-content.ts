// Splits src/content/content.json into one file per part (src/content/parts/<part>.json), so each
// page only loads the parts it shows: the 150+ articles stay on the blog pages instead of being
// sent with every page. Runs after fetch-content.ts, and on its own with `bun scripts/split-content.ts`.
// The parts are generated: change content in the CMS, never in these files.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const source = new URL("../src/content/content.json", import.meta.url);
const folder = new URL("../src/content/parts/", import.meta.url);

export async function splitContent() {
  const content = JSON.parse(readFileSync(source, "utf8")) as Record<string, unknown>;
  mkdirSync(folder, { recursive: true });
  const parts = Object.keys(content).filter((key) => key !== "version");
  for (const part of parts) writeFileSync(new URL(`${part}.json`, folder), JSON.stringify(content[part] ?? null) + "\n");
  // Parts that older content does not have yet, so every import resolves.
  for (const part of ["webinarer", "juridiskt"]) if (!parts.includes(part)) writeFileSync(new URL(`${part}.json`, folder), "null\n");
  // The article module reads these through src/content/index.ts, so they must exist before it loads.
  writeFileSync(new URL("sources.json", folder), JSON.stringify((content.kunskap as { sources?: unknown[] } | undefined)?.sources ?? []) + "\n");
  if (!existsSync(new URL("article-list.json", folder))) writeFileSync(new URL("article-list.json", folder), "[]\n");
  // A light list of every article for the start page and the blog list: what a card shows, and the
  // reading time worked out here from the full article, so those pages never load the full texts.
  const { articles, readingMinutes } = await import("../src/data/blog-articles");
  const list = articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    category: article.category,
    keywords: article.keywords,
    published: article.published,
    minutes: readingMinutes(article),
  }));
  writeFileSync(new URL("article-list.json", folder), JSON.stringify(list) + "\n");

  return [...parts, "article-list", "sources"];
}

if (import.meta.main) console.log(`[content] Split into ${(await splitContent()).join(", ")}.`);
