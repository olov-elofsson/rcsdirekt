import { createFileRoute } from "@tanstack/react-router";

import { blogHead } from "@/components/BlogLayout";
import { BlogIndexPage } from "@/pages/BlogIndexPage";

export const Route = createFileRoute("/blogg/")({
  head: () => blogHead("Insikter om RCS", "Vad är RCS och hur fungerar det? Korta, källbelagda artiklar om meddelanden, företags-RCS, teknik och begrepp.", "/blogg"),
  component: BlogIndexPage,
});
