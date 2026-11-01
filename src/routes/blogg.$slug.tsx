import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  const date = new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${article.published}T00:00:00Z`));
  return <KnowledgeLayout><article>
    <header className="mx-auto max-w-6xl px-5 pt-12 pb-12 sm:pt-20 lg:px-8"><Link to="/blogg" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-logo-blue"><ArrowLeft className="size-4" /> Alla artiklar</Link><h1 className="mt-8 max-w-4xl text-4xl leading-tight tracking-normal sm:text-5xl">{article.title}</h1><p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{article.description}</p><div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"><span>RCS Direkt</span><time dateTime={article.published}>{date}</time><span>{readingMinutes(article)} min läsning</span></div></header>
    <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 lg:px-8">
      <aside className="lg:sticky lg:top-28 lg:self-start"><nav aria-label="Artikelns innehåll" className="border-y border-border py-6"><h2 className="text-base tracking-normal">I den här guiden</h2><ol className="mt-4 space-y-3">{article.sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="text-sm leading-relaxed text-muted-foreground hover:text-logo-blue">{section.title}</a></li>)}<li><a href="#kallor" className="text-sm text-muted-foreground hover:text-logo-blue">Källor</a></li></ol></nav><Link to="/ordlista" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">RCS-ordlista <ArrowRight className="size-4" /></Link></aside>
      <div className="min-w-0 max-w-3xl">{article.sections.map((section) => <section key={section.id} id={section.id} className="scroll-mt-28 pb-12"><h2 className="text-2xl leading-snug tracking-normal sm:text-3xl">{section.title}</h2><div className="mt-5 space-y-5 text-lg leading-[1.8] text-muted-foreground">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.points ? <ul className="list-disc space-y-2 pl-6">{section.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}</div><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Källor: {findSources(section.sources).map((source, index) => <span key={source.id}>{index > 0 ? " · " : ""}<a href={source.url} className="underline underline-offset-4 hover:text-logo-blue">{source.title}</a></span>)}</p></section>)}
        <section id="kallor" className="scroll-mt-28 border-t border-border pt-8"><h2 className="text-2xl tracking-normal">Källor och avgränsning</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">Källorna kontrollerades den {date}. Google-källorna beskriver Google Messages eller Googles företagsplattform. De bekräftar inte vilka funktioner som är aktiverade på ett konto hos RCS Direkt. Operatörsstöd och tillgänglighet kan förändras.</p><ul className="mt-6 space-y-4">{references.map((source) => <li key={source.id}><a href={source.url} className="break-words text-sm underline underline-offset-4 hover:text-logo-blue">{source.title}</a></li>)}</ul></section>
        <section className="mt-12 border-t border-border pt-8"><h2 className="text-2xl tracking-normal">Skicka från webben eller era system</h2><p className="mt-4 leading-relaxed text-muted-foreground">Läs om de två sätten att använda RCS hos oss.</p><div className="mt-6 flex flex-wrap gap-3"><Button asChild><Link to="/rcs-online">RCS i webbgränssnitt <ArrowRight /></Link></Button><Button asChild variant="outline"><Link to="/rcs-api">RCS via API <ArrowRight /></Link></Button></div></section>
      </div>
    </div>
    <section className="bg-muted py-14 sm:py-20"><div className="mx-auto max-w-6xl px-5 lg:px-8"><h2 className="text-3xl tracking-normal">Läs vidare</h2><div className="mt-8 grid gap-8 sm:grid-cols-3">{articles.filter((item) => article.related.includes(item.slug)).map((item) => <div key={item.slug}><h3 className="text-xl leading-snug tracking-normal"><Link to="/blogg/$slug" params={{ slug: item.slug }} className="hover:text-logo-blue">{item.title}</Link></h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p></div>)}</div></div></section>
  </article></KnowledgeLayout>;
}