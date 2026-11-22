import { kunskap } from "@/content/kunskap";
import type { Article as ContentArticle, GlossaryTerm, Section, Source } from "@/content";
import { factsForSources, type SourceFact } from "./article-source-facts";

export type { GlossaryTerm, Section, Source };
export type Article = ContentArticle & { facts?: SourceFact[] };

export const sources: Source[] = kunskap.sources;

export function findSources(ids: string[]) {
  return sources.filter((source) => ids.includes(source.id));
}

export function readingMinutes(article: Article) {
  const text = [
    article.description,
    ...article.sections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
      ...(section.points ?? []),
    ]),
    ...(article.facts ?? []).flatMap((fact) => [fact.finding, fact.implication]),
  ].join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

export const glossary: GlossaryTerm[] = kunskap.glossary;

export const articles: Article[] = kunskap.articles.map((article) => ({
  ...article,
  facts: factsForSources(article.sections.flatMap((section) => section.sources)),
}));

export function searchArticles(query: string, category = "Alla") {
  const needle = query.trim().toLocaleLowerCase("sv");
  return articles.filter(
    (article) =>
      (category === "Alla" || article.category === category) &&
      [article.title, article.description, ...article.keywords]
        .join(" ")
        .toLocaleLowerCase("sv")
        .includes(needle),
  );
}

export function searchGlossary(query: string) {
  const needle = query.trim().toLocaleLowerCase("sv");
  return glossary.filter((entry) =>
    [entry.term, entry.aliases, entry.definition]
      .join(" ")
      .toLocaleLowerCase("sv")
      .includes(needle),
  );
}
