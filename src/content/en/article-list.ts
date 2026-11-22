// The English article list (scripts/split-content.ts), as src/content/article-list.ts for Swedish.
import data from "./parts/article-list.json";
import type { ArticleSummary } from "../article-list";

export const articleList = data as ArticleSummary[];
