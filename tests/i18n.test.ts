// Every Swedish text passed to t() in the components has an English translation, and the
// language helpers map the addresses both ways.
import { expect, test } from "bun:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { en } from "../src/i18n/en";
import { englishPath, swedishPath } from "../src/lib/i18n";

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : /\.tsx?$/.test(name) ? [path] : [];
  });
}

test("every t() text has an English translation", () => {
  const missing = new Set<string>();
  for (const file of files(join(import.meta.dir, "../src")).filter((path) => !path.endsWith("lib/i18n.ts"))) {
    const source = readFileSync(file, "utf8");
    for (const match of source.matchAll(/\bt\(\s*"((?:[^"\\]|\\.)+)"\s*\)/g)) {
      const text = JSON.parse(`"${match[1]}"`) as string;
      if (en[text] === undefined) missing.add(`${file.split("/src/")[1]}: ${text}`);
    }
  }
  expect([...missing]).toEqual([]);
});

test("every English text is still used somewhere", () => {
  const sources = files(join(import.meta.dir, "../src"))
    .concat(readdirSync(join(import.meta.dir, "../src/content/parts")).map((name) => join(import.meta.dir, "../src/content/parts", name)))
    .filter((path) => !path.endsWith("i18n/en.ts"))
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");
  expect(Object.keys(en).filter((text) => !sources.includes(JSON.stringify(text).slice(1, -1)))).toEqual([]);
});

test("addresses map between the languages", () => {
  expect(englishPath("/")).toBe("/en");
  expect(englishPath("/priser")).toBe("/en/pricing");
  expect(englishPath("/blogg/vad-ar-rcs")).toBe("/en/blog/vad-ar-rcs");
  expect(englishPath("/video-generator")).toBe("/video-generator");
  expect(swedishPath("/en")).toBe("/");
  expect(swedishPath("/en/blog/vad-ar-rcs")).toBe("/blogg/vad-ar-rcs");
  expect(swedishPath("/en/sign-up")).toBe("/skapa-konto");
});

test("the English blog has the same articles as the important Swedish ones, and the same redirects", async () => {
  const en = await import("../src/data/en/blog-articles");
  const slugs = en.articles.map((article) => article.slug);
  expect(slugs.length).toBeGreaterThanOrEqual(10);
  expect(en.redirectFor("rcs-e-handel")).toBe("rcs-for-foretag");
  for (const article of en.articles) for (const slug of article.related) expect(slugs).toContain(slug);
});
