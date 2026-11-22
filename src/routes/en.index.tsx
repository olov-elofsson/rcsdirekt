import { createFileRoute } from "@tanstack/react-router";

import { startsida } from "@/content/en/startsida";
import { organizationSchema } from "@/lib/company";
import { alternates } from "@/lib/i18n";
import { HomePage } from "@/pages/HomePage";

const home = startsida;

export const Route = createFileRoute("/en/")({
  head: () => ({
    meta: [
      { title: home.seo.title },
      { name: "description", content: home.seo.description },
      { property: "og:title", content: home.seo.title },
      { property: "og:description", content: home.seo.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rcsdirekt.se/en" },
      { property: "og:locale", content: "en_GB" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/en" }, ...alternates("/")],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ ...organizationSchema, description: home.seo.description }) }],
  }),
  component: HomePage,
});
