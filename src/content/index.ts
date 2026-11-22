// Types for the site's editable content. The content itself is split into one module per part,
// so a page only loads what it shows: import a part from its own module, for example
// `import { priser } from "@/content/priser"` or `import { articleList } from "@/content/article-list"`.
// content.json is refreshed from Payload CMS on every build (scripts/fetch-content.ts) and split
// into src/content/parts/ (scripts/split-content.ts).
export type * from "./types";
export type { ArticleSummary } from "./article-list";
