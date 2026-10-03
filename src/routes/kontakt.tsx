import { createFileRoute } from "@tanstack/react-router";

import { DetailPage } from "@/components/SiteLayout";
import { LeadForm } from "@/components/LeadForm";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakta oss om RCS för företag" },
      { name: "description", content: "Frågor om att skicka RCS, API-tillgång eller priser? Kontakta RCS Direkt så hjälper vi ert företag igång." },
      { property: "og:title", content: "Kontakta oss om RCS för företag" },
      { property: "og:description", content: "Frågor om att skicka RCS, API-tillgång eller priser? Kontakta RCS Direkt så hjälper vi ert företag igång." },
      { property: "og:type", content: "website" }, { property: "og:url", content: "https://rcsdirekt.se/kontakt" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/kontakt" }],
  }),
  component: () => (
    <DetailPage title="Prata med oss" intro="Frågor om RCS, API-tillgång eller vilken meddelandetyp som passar? Skriv några rader så återkommer vi.">
      <LeadForm mode="contact" />
    </DetailPage>
  ),
});
