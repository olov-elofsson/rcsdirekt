import { createFileRoute } from "@tanstack/react-router";

import { PricingDetailPage } from "@/components/PricingDetailPage";
import { pricingPlans } from "@/data/pricing-plans";

export const Route = createFileRoute("/rcs-basic")({
  head: () => ({ meta: [{ title: "RCS Basic 0,30 SEK – skicka korta RCS | RCS Direkt" }, { name: "description", content: "RCS Basic för företag: korta verifierade RCS-meddelanden för 0,30 SEK st. Inga månadskostnader eller bindningstider." }, { property: "og:title", content: "RCS Basic 0,30 SEK – skicka korta RCS | RCS Direkt" }, { property: "og:description", content: "RCS Basic för företag: korta verifierade RCS-meddelanden för 0,30 SEK st. Inga månadskostnader eller bindningstider." }, { property: "og:type", content: "website" }, { property: "og:url", content: "https://rcsdirekt.se/rcs-basic" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: "https://rcsdirekt.se/rcs-basic" }] }),
  component: () => <PricingDetailPage plan={pricingPlans[0]} />,
});