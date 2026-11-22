import { createFileRoute } from "@tanstack/react-router";

import { blogHead } from "@/components/BlogLayout";
import { BlogIndexPage } from "@/pages/BlogIndexPage";

export const Route = createFileRoute("/en/blog/")({
  head: () => blogHead("Insights on RCS", "What is RCS and how does it work? Short articles with sources about messaging, RCS for business, technology and terms.", "/blogg", false, "en"),
  component: BlogIndexPage,
});
