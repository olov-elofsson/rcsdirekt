// One part of the CMS content, read from the file scripts/split-content.ts writes. Import only the parts a page shows.
import data from "./parts/webinarer.json";
import type { SiteContent } from "./types";

/** Upcoming webinars; missing in older content. */
export const webinarer = (data ?? undefined) as SiteContent["webinarer"];
