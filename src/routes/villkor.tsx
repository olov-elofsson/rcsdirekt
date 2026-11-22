import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { juridiskt } from "@/content/juridiskt";

const page = juridiskt?.villkor;
const title = `${page?.title || "Villkor"} | rcsdirekt.se`;
const description = `${page?.description || "Villkoren för företag som skickar RCS genom rcsdirekt.se."} Om tjänsten, priser, tillåten användning, personuppgifter och uppsägning.`;

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
