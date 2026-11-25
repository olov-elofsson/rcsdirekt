// The article collection from the CMS (src/content/kunskap): articles with their source facts,
// search and reading time.
import type { Article as ContentArticle, GlossaryTerm, Section, Source } from "@/content";

export type { GlossaryTerm, Section, Source };
export type SourceFact = { sourceId: string; finding: string; implication: string };
export type Article = ContentArticle & { facts?: SourceFact[] };
type Knowledge = { sources: Source[]; glossary: GlossaryTerm[]; articles: ContentArticle[]; redirects?: { from: string; to: string }[] };

export function readingMinutes(article: Article) {
  const text = [
    article.description,
    ...article.sections.flatMap((section) => [section.title, ...section.paragraphs, ...(section.points ?? [])]),
    ...(article.facts ?? []).flatMap((fact) => [fact.finding, fact.implication]),
  ].join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

export function factPublisher(source: Pick<Source, "title">) {
  return source.title.split(":")[0];
}

export function articleCollection(data: Knowledge) {
  // Findings describe the original publisher's service, not rcsdirekt.se's results.
  const sourceFacts: Record<string, SourceFact> = Object.fromEntries(
    data.sources
      .filter((source) => source.finding && source.implication)
      .map((source) => [source.id, { sourceId: source.id, finding: source.finding, implication: source.implication }]),
  );
  const factsForSources = (ids: string[]): SourceFact[] =>
    [...new Set(ids)].flatMap((id) => (sourceFacts[id] ? [sourceFacts[id]] : [])).slice(0, 2);
  const sources = data.sources;
  const glossary = data.glossary;
  const articles: Article[] = data.articles.map((article) => ({
    ...article,
    facts: factsForSources(article.sections.flatMap((section) => section.sources)),
  }));
  const all = "Alla";
  // Old addresses of articles hidden in the CMS, and the article each leads to now.
  const redirects = new Map((data.redirects ?? []).map((row) => [row.from, row.to]));
  return {
    sources,
    glossary,
    articles,
    redirectFor: (slug: string) => redirects.get(slug),
    sourceFacts,
    factsForSources,
    findSources: (ids: string[]) => sources.filter((source) => ids.includes(source.id)),
    searchArticles(query: string, category = all) {
      const needle = query.trim().toLocaleLowerCase("sv");
      return articles.filter(
        (article) =>
          (category === all || article.category === category) &&
          [article.title, article.description, ...article.keywords].join(" ").toLocaleLowerCase("sv").includes(needle),
      );
    },
    searchGlossary(query: string) {
      const needle = query.trim().toLocaleLowerCase("sv");
      return glossary.filter((entry) => [entry.term, entry.aliases, entry.definition].join(" ").toLocaleLowerCase("sv").includes(needle));
    },
  };
}
