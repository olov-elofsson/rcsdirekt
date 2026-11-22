// The sources the articles cite, without the articles (scripts/split-content.ts).
import data from "./parts/sources.json";
import type { SiteContent } from "./types";

export const sources = data as SiteContent["kunskap"]["sources"];
