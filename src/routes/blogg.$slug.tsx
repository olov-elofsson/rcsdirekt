import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { KnowledgeLayout, knowledgeHead } from "@/components/KnowledgeLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { articles, findSources, readingMinutes } from "@/data/rcs-knowledge";
import { factPublisher } from "@/data/rcs-source-facts";

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
    <header className="mt-8"><h1 className="text-3xl leading-tight tracking-normal sm:text-4xl">{article.title}</h1><div className="mt-5 flex items-center gap-3"><Badge variant="secondary">{article.category}</Badge><span className="text-sm text-muted-foreground">{readingMinutes(article)} min läsning</span></div><p className="mt-7 text-lg leading-[1.75] text-foreground">{article.description}</p></header>
    <div className="mt-7 space-y-10">{article.sections.map((section) => <section key={section.id} id={section.id}>{section.title ? <h2 className="mb-5 text-xl leading-snug tracking-normal sm:text-2xl">{section.title}</h2> : null}<div className="space-y-5 text-lg leading-[1.75] text-muted-foreground">{[...section.paragraphs, ...(section.points ?? [])].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>)}</div>
    {article.facts?.length ? <section aria-labelledby="originalkallor" className="mt-12 bg-muted px-5 py-6 sm:px-7 sm:py-7">
      <h2 id="originalkallor" className="text-xl leading-snug sm:text-2xl">Vad säger originalkällorna?</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Sammanställda uppgifter från originalkällorna, inte RCS direkts egna utskicksresultat.</p>
      <div className="mt-6 space-y-7">{article.facts.map((fact) => {
        const source = references.find((item) => item.id === fact.sourceId);
        if (!source) return null;
        return <div key={fact.sourceId}>
          <Badge variant="secondary">{factPublisher(source)}</Badge>
          <p className="mt-3 text-base leading-relaxed text-foreground">{fact.finding}</p>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">Det betyder för dig: </span>{fact.implication}</p>
          <a href={source.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Läs originalkällan <ExternalLink aria-hidden className="size-3.5" /></a>
        </div>;
      })}</div>
    </section> : null}
    <section aria-label="Källor" className="mt-14"><h2 className="font-sans text-sm font-semibold text-muted-foreground">Källor</h2><ul className="mt-5 space-y-4">{references.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer" className="group inline-flex max-w-full items-start gap-3 rounded-sm text-sm leading-relaxed text-muted-foreground outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"><ExternalLink aria-hidden className="mt-1 size-3.5 shrink-0 opacity-60" /><span className="min-w-0"><span className="block underline-offset-4 group-hover:underline">{source.title}</span><span className="mt-0.5 block text-xs opacity-70">{new URL(source.url).hostname}</span></span></a></li>)}</ul></section>
  </article></KnowledgeLayout>;
}
