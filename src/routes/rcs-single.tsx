import { createFileRoute } from "@tanstack/react-router";

import { PricingDetailPage } from "@/components/PricingDetailPage";
import { pricingPlans } from "@/data/pricing-plans";

export const Route = createFileRoute("/rcs-single")({
  head: () => ({ meta: [{ title: "RCS Single 0,425 SEK: rika RCS-utskick | RCS Direkt" }, { name: "description", content: "RCS Single för företag: skicka RCS med bilder, video, karuseller och knappar för 0,425 SEK st. Inga månadskostnader." }, { property: "og:title", content: "RCS Single 0,425 SEK – rika RCS-utskick | RCS Direkt" }, { property: "og:description", content: "RCS Single för företag: skicka RCS med bilder, video, karuseller och knappar för 0,425 SEK st. Inga månadskostnader." }, { property: "og:type", content: "website" }, { property: "og:url", content: "https://rcsdirekt.se/rcs-single" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: "https://rcsdirekt.se/rcs-single" }] }),
  component: () => <PricingDetailPage plan={pricingPlans[1]} />,
});