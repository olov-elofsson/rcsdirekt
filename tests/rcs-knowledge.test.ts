import { expect, test } from "bun:test";
import { articles, glossary, searchArticles, searchGlossary, sources } from "../src/data/rcs-knowledge";

test("varje sakavsnitt och ordlistebegrepp har en befintlig https-källa", () => {
  for (const article of articles) {
    for (const section of article.sections) {
      expect(section.sources.length).toBeGreaterThan(0);
      for (const id of section.sources) expect(sources.find((source) => source.id === id)?.url.startsWith("https://")).toBe(true);
    }
  }
  for (const term of glossary) expect(sources.find((source) => source.id === term.source)?.url.startsWith("https://")).toBe(true);
});

test("svenska varianter med samma sökintention hittar samma guide", () => {
  expect(searchArticles("vad betyder rcs meddelande").map((article) => article.slug)).toEqual(["vad-ar-rcs"]);
});

test("ordlistan hittar svensk reservkanal som fallback", () => {
  expect(searchGlossary("reservkanal").map((entry) => entry.term)).toEqual(["Fallback"]);
});

test("ämnesfilter kombineras med sökning", () => {
  expect(searchArticles("webhook", "Integration").map((article) => article.slug)).toEqual(["rcs-api-webhooks"]);
  expect(searchArticles("webhook", "Grunder")).toEqual([]);
});

test("alla fördjupningar och relaterade guider har befintliga artiklar", () => {
  const slugs = articles.map((article) => article.slug);
  expect(new Set(slugs).size).toBe(articles.length);
  for (const term of glossary) expect(slugs.includes(term.article)).toBe(true);
  for (const article of articles) for (const slug of article.related) expect(slugs.includes(slug)).toBe(true);
});