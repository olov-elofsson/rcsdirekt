import { createFileRoute } from "@tanstack/react-router";

import { breadcrumb, jsonLd, pageHead } from "@/lib/page-head";
import { RulesPage } from "@/pages/RulesPage";

const title = "Regler för RCS-utskick: samtycke, köpta listor och GDPR";
const description = "Vad gäller när ett företag skickar RCS? Samtycke till reklam, köpta telefonnummer, reklam till företag och personuppgifter, i korthet och med källor.";

export const Route = createFileRoute("/regler")({
  head: () => ({
    ...pageHead({ title, description, svPath: "/regler", crumb: "Regler" }),
    scripts: [breadcrumb(["Regler", "/regler"]), jsonLd({ "@type": "WebPage", url: "https://rcsdirekt.se/regler", name: "Regler för RCS-utskick", description })],
  }),
  component: RulesPage,
});
