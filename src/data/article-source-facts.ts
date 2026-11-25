import { kunskap } from "@/content/kunskap";
import { articleCollection } from "./article-collection";

export type { SourceFact } from "./article-collection";
export { factPublisher } from "./article-collection";

const collection = articleCollection(kunskap);

export const { sourceFacts, factsForSources } = collection;
