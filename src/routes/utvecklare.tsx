import { createFileRoute } from "@tanstack/react-router";

import { pageHead } from "@/lib/page-head";
import { DeveloperPage } from "@/pages/DeveloperPage";

export const Route = createFileRoute("/utvecklare")({
  head: () => pageHead({ title: "RCS API för utvecklare | rcsdirekt.se", description: "Skicka RCS från era egna system via REST API och ta emot status och svar med webhooks. Så fungerar flödet, och vad en integration behöver hantera.", svPath: "/utvecklare", lang: "sv" }),
  component: DeveloperPage,
});
