import { createFileRoute } from "@tanstack/react-router";

import { pageHead } from "@/lib/page-head";
import { DeveloperPage } from "@/pages/DeveloperPage";

export const Route = createFileRoute("/en/developers")({
  head: () => pageHead({ title: "RCS API for developers | rcsdirekt.se", description: "Send RCS from your own systems through a REST API and receive status and replies with webhooks. How the flow works and what an integration needs to handle.", svPath: "/utvecklare", lang: "en" }),
  component: DeveloperPage,
});
