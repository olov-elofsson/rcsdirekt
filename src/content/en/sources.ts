// The English sources (scripts/split-content.ts), as src/content/sources.ts for Swedish.
import data from "./parts/sources.json";
import type { SiteContent } from "../types";

export const sources = data as SiteContent["kunskap"]["sources"];
