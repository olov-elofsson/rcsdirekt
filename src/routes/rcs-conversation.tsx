import { createFileRoute } from "@tanstack/react-router";

import { PricingDetailPage } from "@/components/PricingDetailPage";
import { pricingPlans } from "@/data/pricing-plans";

export const Route = createFileRoute("/rcs-conversation")({
  head: () => ({ meta: [{ title: "RCS Conversation 0,63 SEK: RCS-dialog | RCS Direkt" }, { name: "description", content: "RCS Conversation för företag: tvåvägsdialog med kunder i meddelandeappen för 0,63 SEK st. Inga månadskostnader." }, { property: "og:title", content: "RCS Conversation 0,63 SEK – RCS-dialog | RCS Direkt" }, { property: "og:description", content: "RCS Conversation för företag: tvåvägsdialog med kunder i meddelandeappen för 0,63 SEK st. Inga månadskostnader." }, { property: "og:type", content: "website" }, { property: "og:url", content: "https://rcsdirekt.se/rcs-conversation" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: "https://rcsdirekt.se/rcs-conversation" }] }),
  component: () => <PricingDetailPage plan={pricingPlans[2]} />,
});