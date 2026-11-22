import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, ExternalLink } from "lucide-react";
import { BlogLayout, blogHead } from "@/components/BlogLayout";
import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/ui/button";
import { articleList } from "@/content/article-list";
import { priser } from "@/content/priser";
import { ReadingProgress } from "@/components/ArticleReadingTools";
import { articles, findSources, readingMinutes } from "@/data/blog-articles";

const lowestPrice = priser.plans[0]?.price;

export const Route = createFileRoute("/blogg/$slug")({
  loader: ({ params }) => {
    const article = articles.find((item) => item.slug === params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { ...blogHead("Artikeln är inte tillgänglig", "Artikeln kunde inte visas. Läs fler artiklar under Insikter.", "/blogg"), meta: [...blogHead("Artikeln är inte tillgänglig", "Artikeln kunde inte visas.", "/blogg").meta, { name: "robots", content: "noindex" }] };
    return { ...blogHead(loaderData.title, loaderData.description, `/blogg/${loaderData.slug}`, true), scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: loaderData.title, description: loaderData.description, datePublished: loaderData.published, dateModified: loaderData.published, inLanguage: "sv-SE", author: { "@type": "Organization", name: "rcsdirekt.se", url: "https://rcsdirekt.se" }, publisher: { "@type": "Organization", name: "rcsdirekt.se" }, mainEntityOfPage: `https://rcsdirekt.se/blogg/${loaderData.slug}`, citation: findSources(loaderData.sections.flatMap((section) => section.sources)).map((source) => source.url) }) }] };
  },
  component: ArticlePage,
  notFoundComponent: () => <BlogLayout><div className="mx-auto max-w-3xl px-5 py-24"><h1 className="text-4xl tracking-normal">Artikeln finns inte</h1><p className="mt-5 text-muted-foreground">Den kan ha flyttats eller så är adressen fel.</p><Button asChild className="mt-7"><Link to="/blogg">Till Insikter <ArrowRight data-icon="end" /></Link></Button></div></BlogLayout>,
});

const dateFormat = new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "long", year: "numeric" });

/** One column: heading with one line of facts, the text, sources folded away, links on, one next step. */
function ArticlePage() {
  const article = Route.useLoaderData();
  const references = findSources(article.sections.flatMap((section) => section.sources));
  const related = article.related.map((slug) => articleList.find((item) => item.slug === slug)).filter((item): item is (typeof articleList)[number] => Boolean(item)).slice(0, 4);
  const published = new Date(`${article.published}T12:00:00Z`);
  return (
    <BlogLayout>
      <ReadingProgress />
      <article>
        <PageHeading title={article.title} description={<p>{article.description}</p>}>
          <p className="text-sm text-muted-foreground">
            <Link to="/blogg" className="font-semibold text-foreground underline-offset-4 hover:underline">{article.category}</Link>
            {" · "}{readingMinutes(article)} min läsning
            {Number.isNaN(published.getTime()) ? null : <>{" · "}<time dateTime={article.published}>{dateFormat.format(published)}</time></>}
          </p>
        </PageHeading>

        <div className="mx-auto max-w-2xl px-5 pb-16 sm:pb-24">
          <div className="space-y-12">
            {article.sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={section.title ? `${section.id}-title` : undefined} className="scroll-mt-28">
                {section.title ? <h2 id={`${section.id}-title`} className="-ml-[0.05em] mb-5 text-2xl font-extrabold leading-tight sm:text-3xl">{section.title}</h2> : null}
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

          {references.length ? (
            <details className="group mt-12 border-t border-border pt-6">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-muted-foreground [&::-webkit-details-marker]:hidden">
                Källor ({references.length})
                <ChevronDown aria-hidden className="size-4 transition-transform duration-200 ease-out group-open:rotate-180" />
              </summary>
              <ul className="mt-3 space-y-3">
                {references.map((source) => (
                  <li key={source.id}>
                    <a href={source.url} target="_blank" rel="noreferrer" className="group/link inline-flex min-h-10 items-start gap-2.5 py-2 text-sm leading-relaxed text-muted-foreground transition-colors hover:text-foreground">
                      <ExternalLink aria-hidden strokeWidth={1.5} className="mt-1 size-3.5 shrink-0 opacity-60" />
                      <span>{source.title} <span className="text-xs opacity-70">{new URL(source.url).hostname}</span></span>
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          ) : null}

          {related.length ? (
            <section aria-labelledby="las-vidare" className="mt-10 border-t border-border pt-8">
              <h2 id="las-vidare" className="text-lg font-extrabold">Läs vidare</h2>
              <ul className="mt-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link to="/blogg/$slug" params={{ slug: item.slug }} className="group flex min-h-12 items-center justify-between gap-4 border-b border-border py-3 font-semibold transition-colors hover:text-logo-blue">
                      {item.title}
                      <ArrowRight aria-hidden className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="mt-12 flex flex-col gap-4 rounded-2xl bg-primary-soft p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-lg font-extrabold">Skicka RCS för ert företag</p>
              <p className="mt-1 text-sm text-muted-foreground">{lowestPrice ? `Från ${lowestPrice} per meddelande. ` : ""}Ingen startavgift eller bindningstid.</p>
            </div>
            <Button asChild className="shrink-0"><Link to="/skapa-konto">Skapa konto <ArrowRight data-icon="end" /></Link></Button>
          </div>
        </div>
      </article>
    </BlogLayout>
  );
}
