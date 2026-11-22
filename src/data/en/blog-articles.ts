// The English article collection, translated from the Swedish one; same slugs and sources.
import data from "@/content/en/parts/kunskap.json";
import type { SiteContent } from "@/content/types";
import { articleCollection } from "../article-collection";

const collection = articleCollection(data as SiteContent["kunskap"], "en");

export const { sources, glossary, articles, findSources, searchArticles, searchGlossary } = collection;
