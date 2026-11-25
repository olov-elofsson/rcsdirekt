import { createFileRoute } from "@tanstack/react-router";

import { organizationSchema } from "@/lib/company";
import { breadcrumb, jsonLd, pageHead } from "@/lib/page-head";
import { ContactPage } from "@/pages/ContactPage";

const title = "Kontakta rcsdirekt.se";
const description = "Berätta lite om vad ni vill skicka, så hör vi av oss och hjälper till med avsändare, upplägg och koppling. rcsdirekt.se drivs av WIGOSE AB i Örebro.";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    ...pageHead({ title, description, svPath: "/kontakt", crumb: "Kontakt" }),
    scripts: [breadcrumb(["Kontakt", "/kontakt"]), jsonLd({ "@type": "ContactPage", url: "https://rcsdirekt.se/kontakt", mainEntity: organizationSchema })],
  }),
  component: ContactPage,
});
