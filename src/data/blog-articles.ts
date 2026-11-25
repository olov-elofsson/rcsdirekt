import { kunskap } from "@/content/kunskap";
import { articleCollection } from "./article-collection";

export type { Article, Section, Source, SourceFact } from "./article-collection";
export { readingMinutes } from "./article-collection";

const collection = articleCollection(kunskap);

export const { sources, articles, findSources, searchArticles, redirectFor } = collection;
