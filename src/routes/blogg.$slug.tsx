import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { blogHead } from "@/components/BlogLayout";
import { articleList } from "@/content/article-list";
import { articles, findSources, redirectFor } from "@/data/blog-articles";
import { ArticleNotFound, ArticlePage } from "@/pages/ArticlePage";

export const Route = createFileRoute("/blogg/$slug")({
  loader: ({ params }) => {
    const article = articles.find((item) => item.slug === params.slug);
    if (!article) {
      // An article hidden in the CMS: its old address leads permanently to the one that replaced it.
      const next = redirectFor(params.slug);
      if (next) throw redirect({ to: "/blogg/$slug", params: { slug: next }, statusCode: 301 });
      throw notFound();
    }
    return article;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { ...blogHead("Artikeln är inte tillgänglig", "Artikeln kunde inte visas.", "/blogg", false), meta: [...blogHead("Artikeln är inte tillgänglig", "Artikeln kunde inte visas.", "/blogg", false).meta, { name: "robots", content: "noindex" }] };
    const url = `https://rcsdirekt.se/blogg/${loaderData.slug}`;
    return { ...blogHead(loaderData.title, loaderData.description, `/blogg/${loaderData.slug}`, true), scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: loaderData.title, description: loaderData.description, datePublished: loaderData.published, dateModified: loaderData.published, inLanguage: "sv-SE", author: loaderData.author ? { "@type": "Person", name: loaderData.author } : { "@type": "Organization", name: "rcsdirekt.se", url: "https://rcsdirekt.se" }, publisher: { "@type": "Organization", name: "rcsdirekt.se" }, mainEntityOfPage: url, citation: findSources(loaderData.sections.flatMap((section) => section.sources)).map((source) => source.url) }) }, { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "rcsdirekt.se", item: "https://rcsdirekt.se/" },
      { "@type": "ListItem", position: 2, name: "Insikter", item: "https://rcsdirekt.se/blogg" },
      { "@type": "ListItem", position: 3, name: loaderData.title, item: url },
    ] }) }] };
  },
  component: Page,
  notFoundComponent: ArticleNotFound,
});

function Page() {
  const article = Route.useLoaderData();
  return <ArticlePage article={article} references={findSources(article.sections.flatMap((section) => section.sources))} list={articleList} />;
}
