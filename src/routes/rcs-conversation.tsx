import { createFileRoute } from "@tanstack/react-router";

import { PricingDetailPage } from "@/components/PricingDetailPage";
import { pricingPlans } from "@/data/pricing-plans";

export const Route = createFileRoute("/rcs-conversation")({
  head: () => ({ meta: [{ title: "RCS Conversation 0,63 SEK · RCS Direkt" }, { name: "description", content: "RCS Conversation för tvåvägsdialog med kunder, utan månadskostnad." }, { property: "og:title", content: "RCS Conversation 0,63 SEK per meddelande" }, { property: "og:description", content: "Bygg dialoger med bilder, knappar och snabbsvar direkt i meddelandeappen." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: "https://rcsdirekt.se/rcs-conversation" }] }),
  component: () => <PricingDetailPage plan={pricingPlans[2]} />,
});