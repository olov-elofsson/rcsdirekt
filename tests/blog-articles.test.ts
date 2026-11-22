import { expect, test } from "bun:test";
import { articles, glossary, redirectFor, searchArticles, searchGlossary, sources } from "../src/data/blog-articles";
import { factsForSources } from "../src/data/article-source-facts";

// The blog keeps the most important articles; the rest are hidden in the CMS and their old
// addresses lead to one of these. The tests hold for the content before and after that change.
const IMPORTANT = [
  "vad-ar-rcs",
  "rcs-vs-sms",
  "rcs-for-foretag",
  "rcs-basic-single-conversation",
  "vad-kostar-rcs",
  "verifierad-avsandare",
  "rcs-sverige-operatorer",
  "rcs-pa-iphone",
  "rcs-gdpr-samtycke",
  "rcs-api-webhooks",
];

test("de viktigaste artiklarna finns", () => {
  const slugs = articles.map((article) => article.slug);
  for (const slug of IMPORTANT) expect(slugs).toContain(slug);
  expect(new Set(slugs).size).toBe(articles.length);
});

test("varje dold artikels adress leder till en artikel som visas", () => {
  const slugs = new Set(articles.map((article) => article.slug));
  for (const slug of slugs) expect(redirectFor(slug)).toBeUndefined();
  // Every redirect target is a shown article (checked through the redirect table itself).
  for (const article of articles) for (const slug of article.related) expect(slugs.has(slug)).toBe(true);
});

test("sammanställda originaluppgifter har källor och skapar inte egna mätresultat", () => {
  for (const article of articles) {
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

test("svenska varianter med samma sökintention hittar samma artikel", () => {
  expect(searchArticles("vad betyder rcs meddelande").map((article) => article.slug)).toEqual(["vad-ar-rcs"]);
});

test("ordlistan hittar svensk reservkanal som fallback", () => {
  expect(searchGlossary("reservkanal").map((entry) => entry.term)).toEqual(["Fallback"]);
});

test("ämnesfilter kombineras med sökning", () => {
  const topic = articles.find((article) => article.slug === "rcs-api-webhooks")!.category;
  expect(searchArticles("webhook", topic).map((article) => article.slug)).toContain("rcs-api-webhooks");
  expect(searchArticles("webhook", "Grunder")).toEqual([]);
});
