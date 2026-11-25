import { createFileRoute } from "@tanstack/react-router";

import { pageHead } from "@/lib/page-head";
import { DeveloperPage } from "@/pages/DeveloperPage";

export const Route = createFileRoute("/utvecklare")({
  head: () => pageHead({ title: "RCS API för utvecklare | rcsdirekt.se", description: "Ett enkelt REST-API för RCS: skicka meddelanden, kontrollera nummer och ta emot leveransrapporter, läsrapporter och svar med webhooks. Alla anrop med exempel.", svPath: "/utvecklare" }),
  component: DeveloperPage,
});
