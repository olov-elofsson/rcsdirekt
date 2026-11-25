import { createFileRoute } from "@tanstack/react-router";

import { organizationSchema } from "@/lib/company";
import { pageHead } from "@/lib/page-head";
import { AboutPage } from "@/pages/AboutPage";

const title = "Om rcsdirekt.se | WIGOSE AB i Örebro";
const description = "rcsdirekt.se drivs av WIGOSE AB i Örebro. Här skickar svenska företag RCS från webben eller via API och betalar per meddelande.";

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    ...pageHead({ title, description, svPath: "/om-oss" }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "AboutPage", url: "https://rcsdirekt.se/om-oss", mainEntity: organizationSchema }) }],
  }),
  component: AboutPage,
});
