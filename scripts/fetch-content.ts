// Runs before every build of the site: downloads the current content from Payload CMS
// into src/content/content.json. If the CMS cannot be reached or answers with content that
// does not look right, the build stops, so stale or broken content is never published.
import { readFileSync, writeFileSync } from "node:fs";

import type { SiteContent } from "../src/content/types";
import { splitContent } from "./split-content";

const target = new URL("../src/content/content.json", import.meta.url);
const cmsUrl = (process.env.CMS_URL || "https://rcsdirekt-cms-631487523529.europe-west1.run.app").replace(/\/$/, "");

function problems(content: SiteContent): string[] {
  const found: string[] = [];
  const need = (ok: unknown, message: string) => {
    if (!ok) found.push(message);
  };
  need(content?.version === 1, "unknown version");
  need(content?.startsida?.hero?.title, "start page has no heading");
  need(content?.priser?.plans?.length, "no pricing plans");
  need(content?.kunskap?.articles?.length, "no articles");
  need(content?.kunskap?.sources?.length, "no sources");
  const slugs = new Set<string>();
  for (const article of content?.kunskap?.articles ?? []) {
    need(article.slug && article.title, `article without address or heading: ${article.slug || article.title}`);
    need(!slugs.has(article.slug), `two articles share the address ${article.slug}`);
    slugs.add(article.slug);
  }
  for (const slug of content?.startsida?.blogg?.picks ?? []) need(slugs.has(slug), `start page picks a missing article: ${slug}`);
  return found;
}

// A CMS that is starting up gets a few tries. After that the build stops, so the committed copy
// (often weeks old, with old prices) never goes live; the running revision stays up meanwhile.
async function download(): Promise<Response> {
  let problem = "";
  for (const wait of [0, 5_000, 15_000]) {
    await new Promise((resolve) => setTimeout(resolve, wait));
    try {
      const response = await fetch(`${cmsUrl}/api/site-content`, { signal: AbortSignal.timeout(60_000) });
      if (response.ok) return response;
      problem = `answered ${response.status}`;
    } catch (error) {
      problem = `not reachable (${String(error)})`;
    }
    console.warn(`[content] CMS at ${cmsUrl} ${problem}.`);
  }
  console.error(`[content] Could not load the content from the CMS, so the build stops.`);
  process.exit(1);
}

const response = await download();

const content = (await response.json()) as SiteContent;
const found = problems(content);
if (found.length) {
  console.error(`[content] The CMS content is not usable, so the build stops:\n- ${found.join("\n- ")}`);
  process.exit(1);
}
const before = readFileSync(target, "utf8");
const after = JSON.stringify(content, null, 2) + "\n";
writeFileSync(target, after);
console.log(`[content] Loaded ${content.kunskap.articles.length} articles from ${cmsUrl}${before === after ? " (unchanged)" : ""}.`);
await splitContent();
