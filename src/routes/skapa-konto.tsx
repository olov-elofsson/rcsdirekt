import { createFileRoute } from "@tanstack/react-router";

import { priser } from "@/content/priser";
import { pageHead } from "@/lib/page-head";
import { SignupPage } from "@/pages/SignupPage";

// The plan chosen on the pricing cards, accepted only if it is one of the plans on the site.
const planNames = new Set(priser.plans.map((plan) => plan.name));

export const Route = createFileRoute("/skapa-konto")({
  validateSearch: (search: Record<string, unknown>): { plan?: string } =>
    typeof search["plan"] === "string" && planNames.has(search["plan"]) ? { plan: search["plan"] } : {},
  head: () => pageHead({ title: "Skapa konto och skicka RCS | rcsdirekt.se", description: "Skapa ett konto och börja skicka RCS med ert namn och er logga. Vi hjälper er registrera avsändaren, och ni betalar bara för de meddelanden ni skickar.", svPath: "/skapa-konto" }),
  component: Page,
});

function Page() {
  const { plan } = Route.useSearch();
  return <SignupPage plan={plan} />;
}
