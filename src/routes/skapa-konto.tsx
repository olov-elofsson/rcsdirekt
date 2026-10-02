import { createFileRoute } from "@tanstack/react-router";

import { DetailPage } from "@/components/SiteLayout";
import { LeadForm } from "@/components/LeadForm";

export const Route = createFileRoute("/skapa-konto")({
  head: () => ({
    meta: [
      { title: "Skapa konto — RCS Direkt" },
      { name: "description", content: "Skapa ett konto hos RCS Direkt. Inga månadskostnader, inga startavgifter — betala per meddelande." },
      { property: "og:title", content: "Skapa konto — RCS Direkt" },
      { property: "og:description", content: "Kom igång med RCS på några minuter." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/skapa-konto" }],
  }),
  component: () => (
    <DetailPage eyebrow="Skapa konto" title="Kom igång med RCS" intro="Fyll i dina uppgifter så aktiverar vi ditt konto. Inga månadskostnader, inga startavgifter och inga bindningstider.">
      <LeadForm mode="signup" />
    </DetailPage>
  ),
});
