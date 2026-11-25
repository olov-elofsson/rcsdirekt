import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { formatDate } from "@/components/ArticleCard";
import { BlogLayout } from "@/components/BlogLayout";
import { NumberDrop } from "@/components/NumberDrop";
import { PageHeading } from "@/components/PageHeading";
import { articleList as articles } from "@/content/article-list";
import { sectionTitle } from "@/lib/typography";

/** The order of the important articles, from what RCS is to the details; others follow after. */
const ORDER = [
  "vad-ar-rcs",
  "rcs-vs-sms",
  "rcs-for-foretag",
  "rcs-basic-single-conversation",
  "vad-kostar-rcs",
  "verifierad-avsandare",
  "rcs-sverige-operatorer",
  "rcs-pa-iphone",
  "rcs-gdpr-samtycke",
  "rcs-api-webhooks",
];
const isNews = (category: string) => category === "Nyheter" || category === "News";

/**
 * The blog's front page: the latest news first,
 * then the articles worth reading, numbered in the order they build on each other.
 */
export function BlogIndexPage() {
  const news = articles.filter((article) => isNews(article.category)).sort((a, b) => b.published.localeCompare(a.published));
  const rank = (slug: string) => (ORDER.includes(slug) ? ORDER.indexOf(slug) : ORDER.length);
  const guides = articles.filter((article) => !isNews(article.category)).sort((a, b) => rank(a.slug) - rank(b.slug));

  return (
    <BlogLayout>
      <PageHeading title="Insikter" description={<p>Det viktigaste om RCS, och nyheter om hur det går i Sverige. Alla artiklar har källor.</p>} />

      {news.length ? (
        <section aria-labelledby="nyheter" className="mx-auto max-w-5xl px-5 pb-14 lg:px-8">
          <h2 id="nyheter" className="text-xs font-bold tracking-[0.08em] text-muted-foreground uppercase">Nyheter</h2>
          <ul className="mt-4 grid gap-4">
            {news.map((item) => (
              <li key={item.slug}>
                <Link to="/blogg/$slug" params={{ slug: item.slug }} className="group grid gap-3 rounded-2xl bg-ink p-7 text-ink-foreground transition-[translate] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-safe:hover:-translate-y-0.5 sm:grid-cols-[9rem_1fr] sm:gap-8 sm:p-9">
                  <time dateTime={item.published} className="text-sm font-semibold text-ink-muted tabular-nums">{formatDate(item.published)}</time>
                  <span>
                    <span className="block text-2xl font-extrabold leading-tight text-balance sm:text-3xl">{item.title}</span>
                    <span className="mt-3 block max-w-2xl leading-relaxed text-pretty text-ink-muted">{item.description}</span>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                      Läs nyheten <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="viktigast" className="mx-auto max-w-5xl px-5 pb-16 sm:pb-24 lg:px-8">
        <h2 id="viktigast" className={sectionTitle}>Det viktigaste om RCS</h2>
        {/* A numbered reading list rather than a grid of cards: the order says where to start. */}
        <ol className="mt-8 border-t border-border">
          {guides.map((item, index) => (
            <li key={item.slug} className="border-b border-border">
              <Link to="/blogg/$slug" params={{ slug: item.slug }} className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6">
                <NumberDrop n={index + 1} className="self-start transition-colors duration-150 group-hover:bg-logo-blue" />
                <span>
                  <span className="block text-lg font-extrabold leading-snug text-balance transition-colors duration-150 group-hover:text-logo-blue sm:text-xl">{item.title}</span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">{item.description}</span>
                </span>
                <ArrowRight aria-hidden className="size-4 self-center text-muted-foreground transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </BlogLayout>
  );
}
