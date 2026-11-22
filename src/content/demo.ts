// One part of the CMS content, read from the file scripts/split-content.ts writes. Import only the parts a page shows.
import data from "./parts/demo.json";
import type { SiteContent } from "./types";

export const demo = data as SiteContent["demo"];
