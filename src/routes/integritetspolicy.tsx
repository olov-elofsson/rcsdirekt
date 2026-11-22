import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { juridiskt } from "@/content/juridiskt";

const page = juridiskt?.integritetspolicy;
const title = `${page?.title || "Integritetspolicy"} | rcsdirekt.se`;
const description = `${page?.description || "Så behandlar WIGOSE AB personuppgifter när du använder rcsdirekt.se."} Vilka uppgifter vi samlar in, varför, hur länge de sparas och dina rättigheter.`;

export const Route = createFileRoute("/integritetspolicy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rcsdirekt.se/integritetspolicy" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/integritetspolicy" }],
  }),
  component: IntegritetspolicyPage,
});

function IntegritetspolicyPage() {
  return <LegalPage page={page} fallbackTitle="Integritetspolicy" />;
}
