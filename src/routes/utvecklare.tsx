import { createFileRoute } from "@tanstack/react-router";

import { jsonLd, pageHead } from "@/lib/page-head";
import { DeveloperPage } from "@/pages/DeveloperPage";

const description = "Ett enkelt REST-API för RCS: skicka meddelanden, kontrollera nummer och ta emot leveransrapporter, läsrapporter och svar med webhooks. Alla anrop med exempel.";

export const Route = createFileRoute("/utvecklare")({
  head: () => {
    const head = pageHead({ title: "RCS API för utvecklare | rcsdirekt.se", description, svPath: "/utvecklare", crumb: "För utvecklare" });
    return {
      ...head,
      scripts: [
        ...head.scripts,
        jsonLd({
          "@type": "WebAPI",
          name: "rcsdirekt.se RCS-API",
          description,
          url: "https://rcsdirekt.se/utvecklare",
          documentation: "https://rcsdirekt.se/utvecklare#api-referens",
          provider: { "@id": "https://rcsdirekt.se/#organization" },
          inLanguage: "sv-SE",
        }),
      ],
    };
  },
  component: DeveloperPage,
});
