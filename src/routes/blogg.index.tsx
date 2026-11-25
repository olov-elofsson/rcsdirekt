import { createFileRoute } from "@tanstack/react-router";

import { blogHead } from "@/components/BlogLayout";
import { articleList } from "@/content/article-list";
import { breadcrumb, jsonLd } from "@/lib/page-head";
import { BlogIndexPage } from "@/pages/BlogIndexPage";

export const Route = createFileRoute("/blogg/")({
  head: () => ({
    ...blogHead("Insikter om RCS", "Guider om RCS för svenska företag: vad RCS är, vad det kostar, hur API:t fungerar och vilka operatörer som stöder det. Varje påstående har en källa.", "/blogg"),
    scripts: [
      breadcrumb(["Insikter", "/blogg"]),
      jsonLd({
        "@type": "Blog",
        name: "Insikter om RCS",
        url: "https://rcsdirekt.se/blogg",
        inLanguage: "sv-SE",
        publisher: { "@id": "https://rcsdirekt.se/#organization" },
        blogPost: articleList.map((article) => ({
          "@type": "BlogPosting",
          headline: article.title,
          url: `https://rcsdirekt.se/blogg/${article.slug}`,
          datePublished: article.published,
        })),
      }),
    ],
  }),
  component: BlogIndexPage,
});
