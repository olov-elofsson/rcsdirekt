import { createFileRoute } from "@tanstack/react-router";

import { organizationSchema } from "@/lib/company";
import { pageHead } from "@/lib/page-head";
import { ContactPage } from "@/pages/ContactPage";

const title = "Contact rcsdirekt.se";
const description = "Tell us a little about what you want to send, and we will get back to you and help with the sender, setup and integration. rcsdirekt.se is run by WIGOSE AB in Örebro, Sweden.";

export const Route = createFileRoute("/en/contact")({
  head: () => ({
    ...pageHead({ title, description, svPath: "/kontakt", lang: "en" }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "ContactPage", url: "https://rcsdirekt.se/en/contact", mainEntity: organizationSchema }) }],
  }),
  component: ContactPage,
});
