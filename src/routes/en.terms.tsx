import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { juridiskt } from "@/content/en/juridiskt";
import { pageHead } from "@/lib/page-head";

const page = juridiskt?.villkor;
const title = `${page?.title || "Terms"} | rcsdirekt.se`;
const description = `${page?.description || "The terms for businesses sending RCS through rcsdirekt.se."} About the service, pricing, permitted use, personal data and termination.`;

export const Route = createFileRoute("/en/terms")({
  head: () => pageHead({ title, description, svPath: "/villkor", lang: "en" }),
  component: Page,
});

function Page() {
  return <LegalPage page={page} fallbackTitle="Terms" swedish="/villkor" />;
}
