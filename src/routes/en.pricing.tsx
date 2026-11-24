import { createFileRoute } from "@tanstack/react-router";

import { priser } from "@/content/en/priser";
import { organizationSchema } from "@/lib/company";
import { priceNumber } from "@/lib/money";
import { pageHead } from "@/lib/page-head";
import { PricingPage } from "@/pages/PricingPage";

export const Route = createFileRoute("/en/pricing")({
  head: () => ({
    ...pageHead({ title: priser.seo.title, description: priser.seo.description, svPath: "/priser", lang: "en" }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "rcsdirekt.se",
      serviceType: "RCS business messaging",
      areaServed: { "@type": "Country", name: "Sweden" },
      provider: organizationSchema,
      offers: priser.plans.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        description: plan.contents,
        priceCurrency: "SEK",
        priceSpecification: { "@type": "UnitPriceSpecification", price: priceNumber(plan.price), priceCurrency: "SEK", unitText: "message", valueAddedTaxIncluded: false },
      })),
    }) }],
  }),
  component: PricingPage,
});
