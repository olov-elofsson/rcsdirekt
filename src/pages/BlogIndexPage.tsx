import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Search, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { ArticleCard, formatDate, topicIcon } from "@/components/ArticleCard";
import { BlogLayout } from "@/components/BlogLayout";
import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/ui/button";
import { articleList as articlesSv } from "@/content/article-list";
import { articleList as articlesEn } from "@/content/en/article-list";
import { useT } from "@/lib/i18n";
import { sectionIntro, sectionTitle } from "@/lib/typography";
import { cn } from "@/lib/utils";

const PAGE = 12;
const FEATURED = ["vad-ar-rcs", "rcs-sverige-operatorer", "rcs-for-foretag"];

/** The blog's front page, in Swedish at /blogg and in English at /en/blog. */
export function BlogIndexPage() {
  const { t, lp, locale } = useT();
  const articles = locale === "en" ? articlesEn : articlesSv;
  const ALL = "Alla";
  const searchArticles = (query: string, category = ALL) => {
    const needle = query.trim().toLocaleLowerCase(locale);
    return articles.filter((article) => (category === ALL || article.category === category) && [article.title, article.description, ...article.keywords].join(" ").toLocaleLowerCase(locale).includes(needle));
  };
  const featured = FEATURED.map((slug) => articles.find((article) => article.slug === slug)).filter((article): article is (typeof articles)[number] => Boolean(article));
  const topics = [...articles.reduce((map, article) => map.set(article.category, (map.get(article.category) ?? 0) + 1), new Map<string, number>())];
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState(ALL);
  const [shown, setShown] = useState(PAGE);
  const resultsRef = useRef<HTMLElement>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const results = useMemo(() => searchArticles(query, topic), [query, topic, locale]);
  const filtering = Boolean(query.trim()) || topic !== "Alla";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allMatches = useMemo(() => (query.trim() ? searchArticles(query, ALL).length : 0), [query, locale]);

  const chooseTopic = (next: string, scroll = false) => {
    setTopic(next);
    setShown(PAGE);
    if (scroll) resultsRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };
  const reset = () => {
    setQuery("");
    chooseTopic(ALL);
  };

  const [lead, ...side] = featured;
  return (
    <BlogLayout>
      <PageHeading title={t("Insikter")} description={<p>{t("Korta artiklar om RCS och vad som gäller i Sverige. Alla har källor, så du kan kolla själv.")}</p>}>
        <div className="relative w-full max-w-xl">
          <Search aria-hidden strokeWidth={1.75} className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            aria-label={t("Sök artiklar")}
            placeholder={t("Sök bland {n} artiklar").replace("{n}", String(articles.length))}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShown(PAGE);
            }}
            className="h-14 w-full rounded-full bg-card pl-13 pr-12 text-base shadow-card ring-1 ring-border transition-shadow duration-150 ease-out placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button type="button" aria-label={t("Rensa sökningen")} onClick={() => setQuery("")} className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <X aria-hidden className="size-4" />
            </button>
          ) : null}
        </div>
      </PageHeading>

      {!filtering && lead ? (
        <section aria-label={t("Utvalda artiklar")} className="mx-auto max-w-7xl px-5 pb-14 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
            <Link to={lp("/blogg/$slug")} params={{ slug: lead.slug }} className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-2xl bg-ink p-7 text-ink-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-9">
              <span className="text-xs font-bold tracking-[0.08em] text-ink-muted uppercase">{t("Börja här")}</span>
              <span className="flex-1" />
              <span className="relative w-fit rounded-full bg-ink-foreground px-3 py-1 text-xs font-semibold text-ink">{lead.category}</span>
              <h2 className="relative mt-4 max-w-lg text-3xl font-extrabold leading-tight text-balance">{lead.title}</h2>
              <p className="relative mt-3 max-w-lg leading-relaxed text-pretty text-ink-muted">{lead.description}</p>
              <span className="relative mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
                <span className="inline-flex items-center gap-2">{t("Läs artikeln")} <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                <span className="inline-flex items-center gap-1.5 font-normal text-ink-muted"><Clock aria-hidden className="size-3.5" />{lead.minutes} min · {formatDate(lead.published, locale)}</span>
              </span>
            </Link>
            <div className="grid gap-5">
              {side.map((article) => <ArticleCard key={article.slug} article={article} />)}
            </div>
          </div>
        </section>
      ) : null}

      {!filtering ? (
        <section aria-labelledby="amnen" className="bg-primary-soft py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 id="amnen" className={sectionTitle}>{t("Utforska ämnen")}</h2>
            <p className={sectionIntro}>{t("Välj ett ämne, så ser du artiklarna om det.")}</p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {topics.map(([name, count]) => {
                const Icon = topicIcon(name);
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => chooseTopic(name, true)}
                    className="group flex min-h-24 flex-col items-start justify-between gap-3 rounded-2xl bg-card p-4 text-left shadow-card transition-[box-shadow,translate] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-safe:hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    <span aria-hidden className="grid size-9 place-items-center rounded-xl bg-primary-soft text-logo-blue transition-colors duration-150 group-hover:bg-ink group-hover:text-ink-foreground"><Icon strokeWidth={2} className="size-4" /></span>
                    <span className="w-full">
                      <span className="block text-sm font-bold leading-snug">{name}</span>
                      <span className="text-xs text-muted-foreground tabular-nums">{count} {t("artiklar")}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section ref={resultsRef} aria-labelledby="alla-artiklar" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-14 sm:py-16 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="alla-artiklar" className={sectionTitle}>{topic === ALL ? t("Alla artiklar") : topic}</h2>
          <p role="status" className="text-sm text-muted-foreground tabular-nums">{results.length} {t(results.length === 1 ? "artikel" : "artiklar")}{query.trim() ? ` ${t("för")} "${query.trim()}"` : ""}</p>
        </div>
        {/* Topic chips: a row to swipe on phones, wrapping on wider screens. */}
        <div role="group" aria-label={t("Filtrera på ämne")} className="scrollbar-none -mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {[[ALL, articles.length] as const, ...topics].map(([name, count]) => (
            <button
              key={name}
              type="button"
              aria-pressed={topic === name}
              onClick={() => chooseTopic(name)}
              className={cn(
                "inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                topic === name ? "bg-ink text-ink-foreground" : "bg-muted text-foreground hover:bg-primary-soft",
              )}
            >
              {name === ALL ? t("Alla") : name}
              <span className={cn("text-xs tabular-nums", topic === name ? "text-ink-muted" : "text-muted-foreground")}>{count}</span>
            </button>
          ))}
        </div>

        {results.length ? (
          <>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.slice(0, shown).map((article) => <ArticleCard key={article.slug} article={article} />)}
            </div>
            {results.length > shown ? (
              <div className="mt-10 flex justify-center">
                <Button variant="outline" size="lg" onClick={() => setShown((value) => value + PAGE)}>
                  {t("Visa fler")} <span className="text-muted-foreground tabular-nums">({results.length - shown} {t("kvar")})</span>
                </Button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="mt-10 rounded-2xl bg-muted p-10 text-center">
            <h3 className="text-xl font-extrabold">{t("Inga artiklar hittades")}</h3>
            <p className="mt-2 text-muted-foreground">{t("Prova ett annat ord eller ett annat ämne.")}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {/* A search inside one topic can miss what other topics have; offer them. */}
              {topic !== ALL && allMatches ? <Button onClick={() => chooseTopic(ALL)}>{t("Sök i alla ämnen")} ({allMatches})</Button> : null}
              <Button variant="outline" onClick={reset}>{t("Visa alla artiklar")}</Button>
            </div>
          </div>
        )}
      </section>
    </BlogLayout>
  );
}
