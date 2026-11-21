// The site's editable content. content.json is refreshed from Payload CMS on every build
// (scripts/fetch-content.ts); the committed copy is used when the CMS cannot be reached.
import data from "./content.json";
import type { SiteContent } from "./types";

export const content = data as SiteContent;
export type * from "./types";
