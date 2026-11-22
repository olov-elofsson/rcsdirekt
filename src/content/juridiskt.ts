// One part of the CMS content, read from the file scripts/split-content.ts writes. Import only the parts a page shows.
import data from "./parts/juridiskt.json";
import type { SiteContent } from "./types";

/** The privacy policy and terms; missing in older content. */
export const juridiskt = (data ?? undefined) as SiteContent["juridiskt"];
