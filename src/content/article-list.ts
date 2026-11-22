// Every article as a card, with the reading time worked out when the content was split
// (scripts/split-content.ts). Small, for the start page and the blog list.
import data from "./parts/article-list.json";

export type ArticleSummary = { slug: string; title: string; description: string; category: string; keywords: string[]; published: string; minutes: number };

export const articleList = data as ArticleSummary[];
