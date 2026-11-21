import { content } from "@/content";

/** Positions of the six features are fixed in the phone illustration. */
export type DemoFeatureId = 1 | 2 | 3 | 4 | 5 | 6;

export const demoFeatures = content.demo.features.filter(
  (feature): feature is { id: DemoFeatureId; title: string; copy: string } =>
    [1, 2, 3, 4, 5, 6].includes(feature.id),
);

export const richCards = content.demo.richCards;

export const replyOptions = content.demo.replies.map((reply) => reply.option);
export type ReplyOption = string;

export const replyContent: Record<
  ReplyOption,
  { title: string; copy: string; actions?: string[] }
> = Object.fromEntries(
  content.demo.replies.map((reply) => [
    reply.option,
    { title: reply.title, copy: reply.copy, actions: reply.actions },
  ]),
);
