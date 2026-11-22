import { createFileRoute } from "@tanstack/react-router";

import { priser } from "@/content/priser";
import { organizationSchema } from "@/lib/company";
import { alternates } from "@/lib/i18n";
import { PricingPage } from "@/pages/PricingPage";

const page = priser;
const pricingPlans = page.plans;

const title = page.seo.title;
const description = page.seo.description;

export const Route = createFileRoute("/priser")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rcsdirekt.se/priser" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/priser" }, ...alternates("/priser")],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "rcsdirekt.se",
      serviceType: "RCS-meddelanden för företag",
      areaServed: { "@type": "Country", name: "Sverige" },
      provider: organizationSchema,
      offers: pricingPlans.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        description: plan.contents,
        priceCurrency: "SEK",
        priceSpecification: { "@type": "UnitPriceSpecification", price: Number.parseFloat(plan.price.replace(/[^\d,]/g, "").replace(",", ".")), priceCurrency: "SEK", unitText: "meddelande", valueAddedTaxIncluded: false },
      })),
    }) }],
  }),
  component: PricingPage,
});

