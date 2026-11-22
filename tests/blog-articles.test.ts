import { expect, test } from "bun:test";
import {
  articles,
  glossary,
  searchArticles,
  searchGlossary,
  sources,
} from "../src/data/blog-articles";
import { factsForSources } from "../src/data/article-source-facts";

test("varje artikel har en egen fördjupning utan återanvänd utfyllnad", () => {
  const paragraphs = articles.map((article) => {
    const depth = article.sections.find((section) => section.id === "fordjupning");
    expect(depth?.paragraphs.length).toBeGreaterThan(0);
    return depth?.paragraphs.join(" ");
  });
  expect(new Set(paragraphs).size).toBe(articles.length);
});

test("sammanställda originaluppgifter har källor och skapar inte egna mätresultat", () => {
  for (const article of articles) {
    expect(article.facts?.length).toBeGreaterThan(0);
    for (const fact of article.facts ?? []) {
      expect(sources.some((source) => source.id === fact.sourceId)).toBe(true);
      expect(article.sections.some((section) => section.sources.includes(fact.sourceId))).toBe(
        true,
      );
    }
  }
  expect(factsForSources(["unknown"])).toEqual([]);
});

test("varje sakavsnitt och ordlistebegrepp har en befintlig https-källa", () => {
  for (const article of articles) {
    for (const section of article.sections) {
      expect(section.sources.length).toBeGreaterThan(0);
      for (const id of section.sources)
        expect(sources.find((source) => source.id === id)?.url.startsWith("https://")).toBe(true);
    }
  }
  for (const term of glossary)
    expect(sources.find((source) => source.id === term.source)?.url.startsWith("https://")).toBe(
      true,
    );
});

test("svenska varianter med samma sökintention hittar samma guide", () => {
  expect(searchArticles("vad betyder rcs meddelande").map((article) => article.slug)).toEqual([
    "vad-ar-rcs",
  ]);
});

test("ordlistan hittar svensk reservkanal som fallback", () => {
  expect(searchGlossary("reservkanal").map((entry) => entry.term)).toEqual(["Fallback"]);
});

test("ämnesfilter kombineras med sökning", () => {
  // The topic is read from the article, so the test follows topic changes in the CMS.
  const topic = articles.find((article) => article.slug === "rcs-api-webhooks")!.category;
  expect(searchArticles("webhook", topic).map((article) => article.slug)).toContain("rcs-api-webhooks");
  expect(searchArticles("webhook", "Grunder")).toEqual([]);
});

test("inga av de 157 artiklarna från flytten till CMS har försvunnit", () => {
  // New articles are added in the CMS, so the count may grow but never fall below the moved set.
  expect(articles.length).toBeGreaterThanOrEqual(157);
});

test("alla fördjupningar och relaterade guider har befintliga artiklar", () => {
  const slugs = articles.map((article) => article.slug);
  expect(new Set(slugs).size).toBe(articles.length);
  for (const term of glossary) expect(slugs.includes(term.article)).toBe(true);
  for (const article of articles)
    for (const slug of article.related) expect(slugs.includes(slug)).toBe(true);
});

test("vart och ett av de 27 begreppen har en egen unik artikel", () => {
  expect(glossary).toHaveLength(27);
  expect(new Set(glossary.map((entry) => entry.article)).size).toBe(27);
  for (const entry of glossary) {
    const article = articles.find((item) => item.slug === entry.article);
    expect(article).toBeDefined();
    expect(article?.sections.flatMap((section) => section.sources).includes(entry.source)).toBe(
      true,
    );
  }
});

test("nya begreppsartiklar går att hitta i bloggens sökning", () => {
  expect(searchArticles("postbackData", "Begrepp").map((article) => article.slug)).toEqual([
    "begrepp-postback-data",
  ]);
  expect(searchArticles("webhook", "Begrepp").map((article) => article.slug)).toEqual([
    "begrepp-webhook",
  ]);
});
