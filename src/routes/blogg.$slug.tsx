import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { KnowledgeLayout, knowledgeHead } from "@/components/KnowledgeLayout";
import { Button } from "@/components/ui/button";
import { articles, findSources, readingMinutes } from "@/data/rcs-knowledge";

export const Route = createFileRoute("/blogg/$slug")({
  loader: ({ params }) => {
    const article = articles.find((item) => item.slug === params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { ...knowledgeHead("Artikeln är inte tillgänglig", "Artikeln kunde inte visas. Läs fler guider i vår RCS-kunskapsbank.", "/blogg"), meta: [...knowledgeHead("Artikeln är inte tillgänglig", "Artikeln kunde inte visas.", "/blogg").meta, { name: "robots", content: "noindex" }] };
    return { ...knowledgeHead(loaderData.title, loaderData.description, `/blogg/${loaderData.slug}`, true), scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: loaderData.title, description: loaderData.description, datePublished: loaderData.published, dateModified: loaderData.published, inLanguage: "sv-SE", author: { "@type": "Organization", name: "RCS Direkt", url: "https://rcsdirekt.se" }, publisher: { "@type": "Organization", name: "RCS Direkt" }, mainEntityOfPage: `https://rcsdirekt.se/blogg/${loaderData.slug}`, citation: findSources(loaderData.sections.flatMap((section) => section.sources)).map((source) => source.url) }) }] };
  },
  component: ArticlePage,
  notFoundComponent: () => <KnowledgeLayout><div className="mx-auto max-w-3xl px-5 py-24"><h1 className="text-4xl tracking-normal">Artikeln finns inte</h1><p className="mt-5 text-muted-foreground">Den kan ha flyttats eller så är adressen fel.</p><Button asChild className="mt-7"><Link to="/blogg">Till alla artiklar <ArrowRight /></Link></Button></div></KnowledgeLayout>,
});

function ArticlePage() {
  const article = Route.useLoaderData();
  const references = findSources(article.sections.flatMap((section) => section.sources));
  return <KnowledgeLayout><article className="mx-auto max-w-3xl px-5 py-12 sm:py-16 lg:px-8">
    <Link to="/blogg" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-logo-blue"><ArrowLeft className="size-4" /> Alla artiklar</Link>
    <header className="mt-8"><h1 className="text-3xl leading-tight tracking-normal sm:text-4xl">{article.title}</h1><p className="mt-6 text-lg leading-[1.75] text-foreground">{article.description}</p><p className="mt-5 text-sm text-muted-foreground">{article.category} · {readingMinutes(article)} min läsning</p></header>
    <div className="mt-10 space-y-10">{article.sections.map((section) => <section key={section.id} id={section.id}><h2 className="text-xl leading-snug tracking-normal sm:text-2xl">{section.title}</h2><div className="mt-5 space-y-4 text-lg leading-[1.75] text-muted-foreground">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.points?.length ? <ul className="list-disc space-y-4 pl-5 marker:text-logo-blue">{section.points.map((point) => <li key={point} className="pl-1">{point}</li>)}</ul> : null}</div></section>)}</div>
    <section className="mt-10 border-t border-border pt-6"><h2 className="text-base tracking-normal">Källor</h2><ul className="mt-3 space-y-2">{references.map((source) => <li key={source.id}><a href={source.url} className="inline-flex items-start gap-2 text-sm leading-relaxed text-muted-foreground underline underline-offset-4 hover:text-logo-blue">{source.title}<ExternalLink aria-hidden className="mt-1 size-3 shrink-0" /></a></li>)}</ul></section>
    {article.related.length ? <section className="mt-10 border-t border-border pt-6"><h2 className="text-xl tracking-normal">Läs också</h2><div className="mt-4 space-y-3">{articles.filter((item) => article.related.includes(item.slug)).map((item) => <Link key={item.slug} to="/blogg/$slug" params={{ slug: item.slug }} className="flex items-center justify-between gap-5 text-base font-semibold hover:text-logo-blue">{item.title}<ArrowRight aria-hidden className="size-4 shrink-0" /></Link>)}</div></section> : null}
  </article></KnowledgeLayout>;
}
