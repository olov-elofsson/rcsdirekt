import { expect, test } from "bun:test";
import { articles, glossary, searchArticles, searchGlossary, sources } from "../src/data/rcs-knowledge";
import { expandedArticles } from "../src/data/rcs-articles-expanded";

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

test("utökningen innehåller exakt 100 egna artiklar utöver de 57 befintliga", () => {
  expect(expandedArticles).toHaveLength(100);
  expect(articles).toHaveLength(157);
  expect(new Set(expandedArticles.map((article) => article.slug)).size).toBe(100);
});

test("alla fördjupningar och relaterade guider har befintliga artiklar", () => {
  const slugs = articles.map((article) => article.slug);
  expect(new Set(slugs).size).toBe(articles.length);
  for (const term of glossary) expect(slugs.includes(term.article)).toBe(true);
  for (const article of articles) for (const slug of article.related) expect(slugs.includes(slug)).toBe(true);
});

test("vart och ett av de 27 begreppen har en egen unik artikel", () => {
  expect(glossary).toHaveLength(27);
  expect(new Set(glossary.map((entry) => entry.article)).size).toBe(27);
  for (const entry of glossary) {
    const article = articles.find((item) => item.slug === entry.article);
    expect(article).toBeDefined();
    expect(article?.sections.flatMap((section) => section.sources).includes(entry.source)).toBe(true);
  }
});

test("nya begreppsartiklar går att hitta i bloggens sökning", () => {
  expect(searchArticles("postbackData", "Begrepp").map((article) => article.slug)).toEqual(["begrepp-postback-data"]);
  expect(searchArticles("webhook", "Begrepp").map((article) => article.slug)).toEqual(["begrepp-webhook"]);
});