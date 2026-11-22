import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

// The parts in src/content/parts are generated from content.json (scripts/split-content.ts).
// If they differ, a page would show older content than the CMS: run `bun scripts/split-content.ts`.
const content = JSON.parse(readFileSync("src/content/content.json", "utf8")) as Record<string, unknown>;
const part = (name: string) => JSON.parse(readFileSync(`src/content/parts/${name}.json`, "utf8"));

test("every part matches content.json", () => {
  for (const key of Object.keys(content).filter((name) => name !== "version")) expect(part(key)).toEqual(content[key]);
});

test("the article list has every article, with a reading time", () => {
  const articles = (content.kunskap as { articles: { slug: string }[] }).articles;
  const list = part("article-list") as { slug: string; minutes: number }[];
  expect(list.map((item) => item.slug)).toEqual(articles.map((article) => article.slug));
  expect(list.every((item) => item.minutes >= 1)).toBe(true);
});
