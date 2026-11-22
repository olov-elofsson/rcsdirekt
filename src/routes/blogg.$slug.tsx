import { createFileRoute, notFound } from "@tanstack/react-router";

import { blogHead } from "@/components/BlogLayout";
import { articleList } from "@/content/article-list";
import { articles, findSources } from "@/data/blog-articles";
import { ArticleNotFound, ArticlePage } from "@/pages/ArticlePage";

export const Route = createFileRoute("/blogg/$slug")({
  loader: ({ params }) => {
    const article = articles.find((item) => item.slug === params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { ...blogHead("Artikeln är inte tillgänglig", "Artikeln kunde inte visas.", "/blogg", false, "sv"), meta: [...blogHead("Artikeln är inte tillgänglig", "Artikeln kunde inte visas.", "/blogg", false, "sv").meta, { name: "robots", content: "noindex" }] };
    const url = `https://rcsdirekt.se/blogg/${loaderData.slug}`;
    return { ...blogHead(loaderData.title, loaderData.description, `/blogg/${loaderData.slug}`, true, "sv"), scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: loaderData.title, description: loaderData.description, datePublished: loaderData.published, dateModified: loaderData.published, inLanguage: "sv-SE", author: { "@type": "Organization", name: "rcsdirekt.se", url: "https://rcsdirekt.se" }, publisher: { "@type": "Organization", name: "rcsdirekt.se" }, mainEntityOfPage: url, citation: findSources(loaderData.sections.flatMap((section) => section.sources)).map((source) => source.url) }) }] };
  },
  component: Page,
  notFoundComponent: ArticleNotFound,
});

function Page() {
  const article = Route.useLoaderData();
  return <ArticlePage article={article} references={findSources(article.sections.flatMap((section) => section.sources))} list={articleList} />;
}
