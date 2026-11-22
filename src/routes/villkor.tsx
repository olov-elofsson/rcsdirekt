import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { content } from "@/content";

const page = content.juridiskt?.villkor;
const title = `${page?.title || "Villkor"} | RCS Direkt`;
const description = page?.description || "Villkoren för företag som skickar RCS genom RCS Direkt.";

export const Route = createFileRoute("/villkor")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rcsdirekt.se/villkor" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/villkor" }],
  }),
  component: VillkorPage,
});

function VillkorPage() {
  return <LegalPage page={page} fallbackTitle="Villkor" />;
}
