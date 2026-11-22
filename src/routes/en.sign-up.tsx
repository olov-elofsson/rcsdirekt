import { createFileRoute } from "@tanstack/react-router";

import { priser } from "@/content/priser";
import { pageHead } from "@/lib/page-head";
import { SignupPage } from "@/pages/SignupPage";

// The plan chosen on the pricing cards, accepted only if it is one of the plans on the site.
const planNames = new Set(priser.plans.map((plan) => plan.name));

export const Route = createFileRoute("/en/sign-up")({
  validateSearch: (search: Record<string, unknown>): { plan?: string } =>
    typeof search["plan"] === "string" && planNames.has(search["plan"]) ? { plan: search["plan"] } : {},
  head: () => pageHead({ title: "Create an account and send RCS | rcsdirekt.se", description: "Create an account and start sending RCS. You pay for the messages you send, with no fixed fees.", svPath: "/skapa-konto", lang: "en" }),
  component: Page,
});

function Page() {
  const { plan } = Route.useSearch();
  return <SignupPage plan={plan} />;
}
