import { kunskap } from "@/content/kunskap";
import type { Source } from "@/content";

export type SourceFact = { sourceId: string; finding: string; implication: string };

// Findings describe the original publisher's service, not rcsdirekt.se's results.
export const sourceFacts: Record<string, SourceFact> = Object.fromEntries(
  kunskap.sources
    .filter((source) => source.finding && source.implication)
    .map((source) => [
      source.id,
      { sourceId: source.id, finding: source.finding, implication: source.implication },
    ]),
);

export function factsForSources(ids: string[]): SourceFact[] {
  return [...new Set(ids)].flatMap((id) => (sourceFacts[id] ? [sourceFacts[id]] : [])).slice(0, 2);
}

export function factPublisher(source: Pick<Source, "title">) {
  return source.title.split(":")[0];
}
