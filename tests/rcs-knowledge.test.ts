import { expect, test } from "bun:test";
import { articles, glossary, searchArticles, searchGlossary, sources } from "../src/data/rcs-knowledge";
import { expandedArticles } from "../src/data/rcs-articles-expanded";
import { articleDepth } from "../src/data/rcs-article-depth";
import { factsForSources } from "../src/data/rcs-source-facts";

test("alla 157 artiklar får en egen fördjupning utan återanvänd utfyllnad", () => {
  expect(Object.keys(articleDepth)).toHaveLength(157);
  const paragraphs = articles.map((article) => {
    const depth = articleDepth[article.slug];
    expect(depth).toBeDefined();
    expect(article.sections.find((section) => section.id === "fordjupning")?.paragraphs).toEqual(depth.paragraphs);
    return depth.paragraphs.join(" ");
  });
  expect(new Set(paragraphs).size).toBe(157);
});

test("sammanställda originaluppgifter har källor och skapar inte egna mätresultat", () => {
  for (const article of articles) {
    expect(article.facts?.length).toBeGreaterThan(0);
    for (const fact of article.facts ?? []) {
      expect(sources.some((source) => source.id === fact.sourceId)).toBe(true);
      expect(article.sections.some((section) => section.sources.includes(fact.sourceId))).toBe(true);
    }
  }
  expect(factsForSources(["unknown"])).toEqual([]);
});

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