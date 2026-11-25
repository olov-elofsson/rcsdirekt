import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { juridiskt } from "@/content/juridiskt";
import { pageHead } from "@/lib/page-head";

const page = juridiskt?.villkor;
const title = `${page?.title || "Villkor"} | rcsdirekt.se`;
const description = `${page?.description || "Villkoren för företag som skickar RCS genom rcsdirekt.se."} Om tjänsten, priser, tillåten användning, personuppgifter och uppsägning.`;

export const Route = createFileRoute("/villkor")({
  head: () => pageHead({ title, description, svPath: "/villkor", crumb: "Villkor" }),
  component: Page,
});

function Page() {
  return <LegalPage page={page} fallbackTitle="Villkor" />;
}
