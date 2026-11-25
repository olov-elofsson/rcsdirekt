import { createFileRoute } from "@tanstack/react-router";

import { blogHead } from "@/components/BlogLayout";
import { BlogIndexPage } from "@/pages/BlogIndexPage";

export const Route = createFileRoute("/blogg/")({
  head: () => blogHead("Insikter om RCS", "Guider om RCS för svenska företag: vad RCS är, vad det kostar, hur API:t fungerar och vilka operatörer som stöder det. Varje påstående har en källa.", "/blogg"),
  component: BlogIndexPage,
});
