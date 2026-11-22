import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { KnowledgeLayout, knowledgeHead } from "@/components/KnowledgeLayout";
import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { content } from "@/content";
import { CopyLink, ReadingProgress, useActiveSection } from "@/components/ArticleExtras";
import { ArticleCard } from "@/components/BlogCards";
import { articles, findSources, readingMinutes } from "@/data/rcs-knowledge";

const lowestPrice = content.priser.plans[0]?.price;

/** The aside on wide screens: the article's sections, then the way to try RCS. */
function ArticleAside({ sections, category, slug }: { sections: { id: string; title: string }[]; category: string; slug: string }) {
  const more = articles.filter((item) => item.category === category && item.slug !== slug).slice(0, 5);
  const titled = sections.filter((section) => section.title);
  const active = useActiveSection(titled.map((section) => section.id));
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 space-y-6">
        {titled.length > 1 ? (
          <nav aria-label="Innehåll i artikeln">
            <p className="text-xs font-bold tracking-[0.08em] text-muted-foreground uppercase">Innehåll</p>
            <ul className="mt-3 space-y-1 border-l border-border">
              {titled.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined} className={`-ml-px block border-l py-1.5 pl-4 text-sm transition-colors duration-150 ${active === section.id ? "border-logo-blue font-semibold text-foreground" : "border-transparent text-muted-foreground hover:border-foreground hover:text-foreground"}`}>{section.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        ) : more.length ? (
          <nav aria-label={`Mer om ${category}`}>
            <p className="text-xs font-bold tracking-[0.08em] text-muted-foreground uppercase">Mer om {category}</p>
            <ul className="mt-3 space-y-1 border-l border-border">
              {more.map((item) => (
                <li key={item.slug}>
                  <Link to="/blogg/$slug" params={{ slug: item.slug }} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm leading-snug text-muted-foreground transition-colors duration-150 hover:border-foreground hover:text-foreground">{item.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        <div className="rounded-2xl bg-ink p-6 text-ink-foreground">
          <p className="font-display text-lg font-extrabold leading-snug">Skicka RCS för ert företag</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{lowestPrice ? `Från ${lowestPrice} per meddelande. ` : ""}Ingen startavgift eller bindningstid.</p>
          <Button asChild variant="outline" className="mt-5 w-full border-transparent"><Link to="/skapa-konto">Skapa konto <ArrowRight data-icon="end" /></Link></Button>
          <Link to="/priser" className="mt-3 inline-flex min-h-10 w-full items-center justify-center text-sm font-semibold text-ink-muted underline-offset-4 transition-colors hover:text-ink-foreground hover:underline">Se alla priser</Link>
        </div>
      </div>
    </aside>
  );
}

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
  notFoundComponent: () => <KnowledgeLayout><div className="mx-auto max-w-3xl px-5 py-24"><h1 className="text-4xl tracking-normal">Artikeln finns inte</h1><p className="mt-5 text-muted-foreground">Den kan ha flyttats eller så är adressen fel.</p><Button asChild className="mt-7"><Link to="/blogg">Till alla artiklar <ArrowRight data-icon="end" /></Link></Button></div></KnowledgeLayout>,
});

function ArticlePage() {
  const article = Route.useLoaderData();
  const references = findSources(article.sections.flatMap((section) => section.sources));
  const related = article.related.map((slug) => articles.find((item) => item.slug === slug)).filter((item): item is (typeof articles)[number] => Boolean(item)).slice(0, 4);
  return <KnowledgeLayout><ReadingProgress /><article>
    <PageHeading title={article.title} description={<p>{article.description}</p>}><Badge variant="secondary">{article.category}</Badge><span className="text-sm text-muted-foreground">{readingMinutes(article)} min läsning</span><span className="text-sm text-muted-foreground">Av <Link to="/om-oss" className="font-semibold text-foreground underline-offset-4 hover:underline">RCS Direkt</Link> · Publicerad <time dateTime={article.published}>{new Date(article.published).toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" })}</time></span></PageHeading>
    <div className="mx-auto grid max-w-6xl gap-16 px-5 pb-16 sm:pb-24 lg:grid-cols-[minmax(0,1fr)_17rem] lg:px-8">
    <div className="min-w-0 max-w-3xl">
    <div className="flex items-center justify-between gap-3"><Link to="/blogg" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-logo-blue"><ArrowLeft aria-hidden className="size-4" /> Alla artiklar</Link><CopyLink /></div>
    <div className="mt-8 space-y-12">
      {article.sections.map((section) => (
        <section key={section.id} id={section.id} aria-labelledby={section.title ? `${section.id}-title` : undefined} className="scroll-mt-28">
          {section.title ? <h2 id={`${section.id}-title`} className="-ml-[0.05em] mb-5 text-2xl font-extrabold leading-tight tracking-normal sm:text-3xl">{section.title}</h2> : null}
          <div className="space-y-5 text-lg leading-[1.75] text-pretty text-foreground/85">
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.points.length ? (
              <ul className="list-disc space-y-2 pl-6 marker:text-logo-blue">
                {section.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            ) : null}
          </div>
        </section>
      ))}
    </div>
    <section aria-label="Källor" className="mt-14"><h2 className="font-sans text-sm font-semibold text-muted-foreground">Källor</h2><ul className="mt-5 space-y-4">{references.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer" className="group inline-flex min-h-11 max-w-full items-start gap-3 rounded-sm text-sm leading-relaxed text-muted-foreground outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"><ExternalLink aria-hidden strokeWidth={1.5} className="mt-1 size-3.5 shrink-0 opacity-60" /><span className="min-w-0"><span className="block underline-offset-4 group-hover:underline">{source.title}</span><span className="mt-0.5 block text-xs opacity-70">{new URL(source.url).hostname}</span></span></a></li>)}</ul></section>
    {related.length ? (
      <section aria-label="Läs vidare" className="mt-14 border-t border-border pt-10">
        <h2 className="text-xl font-extrabold">Läs vidare</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {related.map((item) => (
            <li key={item.slug} className="flex"><ArticleCard article={item} className="w-full" /></li>
          ))}
        </ul>
      </section>
    ) : null}
    <div className="mt-14 rounded-2xl bg-ink p-6 text-ink-foreground lg:hidden">
      <p className="font-display text-lg font-extrabold">Skicka RCS för ert företag</p>
      <p className="mt-2 text-sm text-ink-muted">{lowestPrice ? `Från ${lowestPrice} per meddelande. ` : ""}Ingen startavgift eller bindningstid.</p>
      <Button asChild variant="outline" className="mt-5 border-transparent"><Link to="/skapa-konto">Skapa konto <ArrowRight data-icon="end" /></Link></Button>
    </div>
    </div>
    <ArticleAside sections={article.sections} category={article.category} slug={article.slug} />
    </div>
  </article></KnowledgeLayout>;
}
