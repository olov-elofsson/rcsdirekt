import { createFileRoute } from "@tanstack/react-router";

import { PricingDetailPage } from "@/components/PricingDetailPage";
import { pricingPlans } from "@/data/pricing-plans";

export const Route = createFileRoute("/rcs-basic")({
  head: () => ({ meta: [{ title: "RCS Basic – 0,30 SEK — RCS Direkt" }, { name: "description", content: "RCS Basic för korta verifierade meddelanden, utan månadskostnad." }, { property: "og:title", content: "RCS Basic – 0,30 SEK per meddelande" }, { property: "og:description", content: "Verifierade RCS-meddelanden för korta och tydliga besked." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: "https://rcsdirekt.se/rcs-basic" }] }),
  component: () => <PricingDetailPage plan={pricingPlans[0]} />,
});