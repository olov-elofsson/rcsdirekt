import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { juridiskt } from "@/content/juridiskt";
import { pageHead } from "@/lib/page-head";

const page = juridiskt?.integritetspolicy;
const title = `${page?.title || "Integritetspolicy"} | rcsdirekt.se`;
const description = `${page?.description || "Så behandlar WIGOSE AB personuppgifter när du använder rcsdirekt.se."} Vilka uppgifter vi samlar in, varför, hur länge de sparas och dina rättigheter.`;

export const Route = createFileRoute("/integritetspolicy")({
  head: () => pageHead({ title, description, svPath: "/integritetspolicy", lang: "sv" }),
  component: Page,
});

function Page() {
  return <LegalPage page={page} fallbackTitle="Integritetspolicy" />;
}
