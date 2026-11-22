import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Search, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { ArticleCard, formatDate, topicIcon } from "@/components/BlogCards";
import { KnowledgeLayout, knowledgeHead } from "@/components/KnowledgeLayout";
import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/ui/button";
import { articles, readingMinutes, searchArticles } from "@/data/rcs-knowledge";
import { sectionIntro, sectionTitle } from "@/lib/typography";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blogg/")({
  head: () => knowledgeHead("Guider om RCS", "Vad är RCS och hur fungerar det? Korta, källbelagda artiklar om meddelanden, företags-RCS, teknik och begrepp.", "/blogg"),
  component: BlogPage,
});

const PAGE = 12;
const FEATURED = ["vad-ar-rcs", "rcs-sverige-operatorer", "rcs-for-foretag"];
const featured = FEATURED.map((slug) => articles.find((article) => article.slug === slug)).filter((article): article is (typeof articles)[number] => Boolean(article));
const topics = [...articles.reduce((map, article) => map.set(article.category, (map.get(article.category) ?? 0) + 1), new Map<string, number>())];

function BlogPage() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("Alla");
  const [shown, setShown] = useState(PAGE);
  const resultsRef = useRef<HTMLElement>(null);
  const results = useMemo(() => searchArticles(query, topic), [query, topic]);
  const filtering = Boolean(query.trim()) || topic !== "Alla";
  const allMatches = useMemo(() => (query.trim() ? searchArticles(query, "Alla").length : 0), [query]);

  const chooseTopic = (next: string, scroll = false) => {
    setTopic(next);
    setShown(PAGE);
    if (scroll) resultsRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };
  const reset = () => {
    setQuery("");
    chooseTopic("Alla");
  };

  const [lead, ...side] = featured;
  return (
    <KnowledgeLayout>
      <PageHeading title="Guider om RCS" description={<p>Korta artiklar om RCS och vad som gäller för företag i Sverige. Varje artikel anger sina källor.</p>}>
        <div className="relative w-full max-w-xl">
          <Search aria-hidden strokeWidth={1.75} className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            aria-label="Sök artiklar"
            placeholder={`Sök bland ${articles.length} artiklar`}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShown(PAGE);
            }}
            className="h-14 w-full rounded-full bg-card pl-13 pr-12 text-base shadow-card ring-1 ring-border transition-shadow duration-150 ease-out placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button type="button" aria-label="Rensa sökningen" onClick={() => setQuery("")} className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <X aria-hidden className="size-4" />
            </button>
          ) : null}
        </div>
      </PageHeading>

      {!filtering && lead ? (
        <section aria-label="Utvalda artiklar" className="mx-auto max-w-7xl px-5 pb-14 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
            <Link to="/blogg/$slug" params={{ slug: lead.slug }} className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-2xl bg-ink p-7 text-ink-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-9">
              <span className="text-xs font-bold tracking-[0.08em] text-ink-muted uppercase">Börja här</span>
              <span className="flex-1" />
              <span className="relative w-fit rounded-full bg-ink-foreground px-3 py-1 text-xs font-semibold text-ink">{lead.category}</span>
              <h2 className="relative mt-4 max-w-lg text-3xl font-extrabold leading-tight text-balance">{lead.title}</h2>
              <p className="relative mt-3 max-w-lg leading-relaxed text-pretty text-ink-muted">{lead.description}</p>
              <span className="relative mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
                <span className="inline-flex items-center gap-2">Läs artikeln <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                <span className="inline-flex items-center gap-1.5 font-normal text-ink-muted"><Clock aria-hidden className="size-3.5" />{readingMinutes(lead)} min · {formatDate(lead.published)}</span>
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
            <h2 id="amnen" className={sectionTitle}>Utforska ämnen</h2>
            <p className={sectionIntro}>Välj ett ämne för att se artiklarna om det.</p>
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
                      <span className="text-xs text-muted-foreground tabular-nums">{count} artiklar</span>
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
          <h2 id="alla-artiklar" className={sectionTitle}>{topic === "Alla" ? "Alla artiklar" : topic}</h2>
          <p role="status" className="text-sm text-muted-foreground tabular-nums">{results.length} {results.length === 1 ? "artikel" : "artiklar"}{query.trim() ? ` för "${query.trim()}"` : ""}</p>
        </div>
        {/* Topic chips: a row to swipe on phones, wrapping on wider screens. */}
        <div role="group" aria-label="Filtrera på ämne" className="scrollbar-none -mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {[["Alla", articles.length] as const, ...topics].map(([name, count]) => (
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
              {name}
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
                  Visa fler <span className="text-muted-foreground tabular-nums">({results.length - shown} kvar)</span>
                </Button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="mt-10 rounded-2xl bg-muted p-10 text-center">
            <h3 className="text-xl font-extrabold">Inga artiklar hittades</h3>
            <p className="mt-2 text-muted-foreground">Prova ett annat ord eller ett annat ämne.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {/* A search inside one topic can miss what other topics have; offer them. */}
              {topic !== "Alla" && allMatches ? <Button onClick={() => chooseTopic("Alla")}>Sök i alla ämnen ({allMatches})</Button> : null}
              <Button variant="outline" onClick={reset}>Visa alla artiklar</Button>
            </div>
          </div>
        )}
      </section>
    </KnowledgeLayout>
  );
}
