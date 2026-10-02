import { createFileRoute } from "@tanstack/react-router";

import { PricingDetailPage } from "@/components/PricingDetailPage";
import { pricingPlans } from "@/data/pricing-plans";

export const Route = createFileRoute("/rcs-single")({
  head: () => ({ meta: [{ title: "RCS Single – 0,425 SEK — RCS Direkt" }, { name: "description", content: "RCS Single med bilder, video, karuseller och knappar, utan månadskostnad." }, { property: "og:title", content: "RCS Single – 0,425 SEK per meddelande" }, { property: "og:description", content: "Rika RCS-utskick med visuellt innehåll och tydliga handlingar." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: "https://rcsdirekt.se/rcs-single" }] }),
  component: () => <PricingDetailPage plan={pricingPlans[1]} />,
});