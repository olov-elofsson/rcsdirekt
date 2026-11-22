import { createFileRoute } from "@tanstack/react-router";

import { organizationSchema } from "@/lib/company";
import { pageHead } from "@/lib/page-head";
import { AboutPage } from "@/pages/AboutPage";

const title = "About rcsdirekt.se | WIGOSE AB in Örebro, Sweden";
const description = "rcsdirekt.se is run by WIGOSE AB in Örebro, Sweden. Businesses send RCS from the web or through an API and pay per message.";

export const Route = createFileRoute("/en/about")({
  head: () => ({
    ...pageHead({ title, description, svPath: "/om-oss", lang: "en" }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "AboutPage", url: "https://rcsdirekt.se/en/about", mainEntity: organizationSchema }) }],
  }),
  component: AboutPage,
});
