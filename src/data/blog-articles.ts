import { kunskap } from "@/content/kunskap";
import { articleCollection } from "./article-collection";

export type { Article, GlossaryTerm, Section, Source, SourceFact } from "./article-collection";
export { readingMinutes } from "./article-collection";

const collection = articleCollection(kunskap, "sv");

export const { sources, glossary, articles, findSources, searchArticles, searchGlossary, redirectFor } = collection;
