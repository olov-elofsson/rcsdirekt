import { createFileRoute } from "@tanstack/react-router";

import { DetailPage } from "@/components/SiteLayout";
import { LeadForm } from "@/components/LeadForm";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakta oss — RCS Direkt" },
      { name: "description", content: "Har du frågor om RCS, API-tillgång eller priser? Skriv till oss så återkommer vi." },
      { property: "og:title", content: "Kontakta oss — RCS Direkt" },
      { property: "og:description", content: "Prata med oss om RCS för er verksamhet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/kontakt" }],
  }),
  component: () => (
    <DetailPage eyebrow="Kontakt" title="Prata med oss" intro="Frågor om RCS, API-tillgång eller vilken meddelandetyp som passar? Skriv några rader så återkommer vi.">
      <LeadForm mode="contact" />
    </DetailPage>
  ),
});
