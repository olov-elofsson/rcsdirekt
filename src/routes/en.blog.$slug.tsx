import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { blogHead } from "@/components/BlogLayout";
import { articleList } from "@/content/en/article-list";
import { articles, findSources, redirectFor } from "@/data/en/blog-articles";
import { ArticleNotFound, ArticlePage } from "@/pages/ArticlePage";

export const Route = createFileRoute("/en/blog/$slug")({
  loader: ({ params }) => {
    const article = articles.find((item) => item.slug === params.slug);
    if (!article) {
      // An article hidden in the CMS: its old address leads permanently to the one that replaced it.
      const next = redirectFor(params.slug);
      if (next) throw redirect({ to: "/en/blog/$slug", params: { slug: next }, statusCode: 301 });
      throw notFound();
    }
    // The author comes from the Swedish article in the CMS, through the English article list.
    return { ...article, author: articleList.find((item) => item.slug === article.slug)?.author || article.author || "" };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { ...blogHead("Article not available", "The article could not be shown.", "/blogg", false, "en"), meta: [...blogHead("Article not available", "The article could not be shown.", "/blogg", false, "en").meta, { name: "robots", content: "noindex" }] };
    const url = `https://rcsdirekt.se/en/blog/${loaderData.slug}`;
    return { ...blogHead(loaderData.title, loaderData.description, `/blogg/${loaderData.slug}`, true, "en"), scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: loaderData.title, description: loaderData.description, datePublished: loaderData.published, dateModified: loaderData.published, inLanguage: "en", author: loaderData.author ? { "@type": "Person", name: loaderData.author } : { "@type": "Organization", name: "rcsdirekt.se", url: "https://rcsdirekt.se" }, publisher: { "@type": "Organization", name: "rcsdirekt.se" }, mainEntityOfPage: url, citation: findSources(loaderData.sections.flatMap((section) => section.sources)).map((source) => source.url) }) }] };
  },
  component: Page,
  notFoundComponent: ArticleNotFound,
});

function Page() {
  const article = Route.useLoaderData();
  return <ArticlePage article={article} references={findSources(article.sections.flatMap((section) => section.sources))} list={articleList} />;
}
