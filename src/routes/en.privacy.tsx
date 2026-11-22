import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { juridiskt } from "@/content/en/juridiskt";
import { pageHead } from "@/lib/page-head";

const page = juridiskt?.integritetspolicy;
const title = `${page?.title || "Privacy policy"} | rcsdirekt.se`;
const description = `${page?.description || "How WIGOSE AB handles personal data when you use rcsdirekt.se."} What we collect, why, how long it is kept and your rights.`;

export const Route = createFileRoute("/en/privacy")({
  head: () => pageHead({ title, description, svPath: "/integritetspolicy", lang: "en" }),
  component: Page,
});

function Page() {
  return <LegalPage page={page} fallbackTitle="Privacy policy" swedish="/integritetspolicy" />;
}
