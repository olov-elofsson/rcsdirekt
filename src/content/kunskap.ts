// One part of the CMS content, read from the file scripts/split-content.ts writes. Import only the parts a page shows.
import data from "./parts/kunskap.json";
import type { SiteContent } from "./types";

/** All articles, sources and terms: large, so only the article pages import it. */
export const kunskap = data as unknown as SiteContent["kunskap"];
