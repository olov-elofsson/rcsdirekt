import { Link } from "@tanstack/react-router";
import { PhoneIcon, RcsSnippet, VerifiedMark } from "@/components/RcsPhone";
import { rcsDirektSender } from "@/data/rcs-sender";
import { ArrowRight, ChevronDown, ExternalLink } from "lucide-react";

import { formatDate } from "@/components/ArticleCard";
import { ReadingProgress } from "@/components/ArticleReadingTools";
import { BlogLayout } from "@/components/BlogLayout";
import { Button } from "@/components/ui/button";
import type { ArticleSummary } from "@/content/article-list";
import { usePriser } from "@/content/localized";
import { readingMinutes, type Article, type Source } from "@/data/article-collection";
import { useT } from "@/lib/i18n";

// An article, in Swedish under /blogg and in English under /en/blog; each route loads its own language.

/**
 * The picture at the top when the CMS has none: the article itself as an RCS message from
 * rcsdirekt.se, built with the phone's own code, on the brand's lavender surface.
 */
/** The first sentence of the summary, so the card in the cover stays short. */
const firstSentence = (text: string) => /^.+?[.!?](?=\s|$)/.exec(text.trim())?.[0] ?? text;

function ArticleCover({ article }: { article: Article }) {
  const { t } = useT();
  return (
    <div
      aria-hidden
      className="flex w-full items-center justify-center overflow-hidden rounded-2xl bg-primary-soft px-4 py-10 sm:aspect-[16/9] sm:py-0"
    >
      <RcsSnippet width={300} scale={1.05}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 500,
            color: "#444746",
            marginBottom: 6,
          }}
        >
          <img
            src={rcsDirektSender.logo}
            alt=""
            width={20}
            height={20}
            style={{ borderRadius: 6, background: "#fff" }}
          />
          {rcsDirektSender.sender}
          <VerifiedMark size={15} />
        </div>
        <div className="card">
          <div className="ct">{article.title}</div>
          <div className="cb">{firstSentence(article.description)}</div>
          <div className="cbtns">
            <div className="cbtn">
              <span className="ci">
                <PhoneIcon name="open" size={18} />
              </span>
              {t("Läs artikeln")}
            </div>
          </div>
        </div>
      </RcsSnippet>
    </div>
  );
}

/**
 * An article laid out like a news page: topic, a large heading, when it was published and by whom,
 * a large picture, the text, and the latest articles beside it on wide screens.
 */
export function ArticlePage({
  article,
  references,
  list,
}: {
  article: Article;
  references: Source[];
  list: ArticleSummary[];
}) {
  const { t, lp, locale } = useT();
  const priser = usePriser();
  const lowestPrice = priser.plans[0]?.price;
  const latest = list
    .filter((item) => item.slug !== article.slug)
    .sort((a, b) => b.published.localeCompare(a.published))
    .slice(0, 5);
  const published = new Date(`${article.published}T12:00:00Z`);
  return (
    <BlogLayout>
      <ReadingProgress />
      <article className="mx-auto max-w-6xl px-5 pt-10 pb-16 sm:pt-16 sm:pb-24 lg:px-8">
        <header>
          <Link
            to={lp("/blogg")}
            className="inline-block rounded-md bg-primary-soft px-2.5 py-1 text-xs font-bold tracking-[0.08em] text-foreground uppercase transition-colors duration-150 hover:bg-primary hover:text-primary-foreground"
          >
            {article.category}
          </Link>
          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>
          <p className="mt-6 flex flex-wrap items-center gap-y-2 text-sm tracking-[0.04em] text-muted-foreground uppercase gap-x-6">
            {Number.isNaN(published.getTime()) ? null : (
              <span>
                {t("Publicerad")}{" "}
                <time dateTime={article.published} className="font-bold text-foreground">
                  {formatDate(article.published, locale)}
                </time>
              </span>
            )}
            <span>
              {t("Av")}{" "}
              <span className="font-bold text-foreground">{article.author || "rcsdirekt.se"}</span>
            </span>
            <span>
              {readingMinutes(article)} {t("min läsning")}
            </span>
          </p>
        </header>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
          <div className="min-w-0">
            {article.image?.url ? (
              <img
                src={article.image.url}
                alt={article.image.alt}
                width={article.image.width}
                height={article.image.height}
                fetchPriority="high"
                className="aspect-[16/9] w-full rounded-2xl bg-muted object-cover"
              />
            ) : (
              <ArticleCover article={article} />
            )}
            <div className="mt-10 max-w-2xl">
              <p className="text-xl leading-relaxed text-pretty text-foreground sm:text-[1.375rem]">
                {article.description}
              </p>
              <div className="mt-12 space-y-12">
                {article.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={section.title ? `${section.id}-title` : undefined}
                    className="scroll-mt-28"
                  >
                    {section.title ? (
                      <h2
                        id={`${section.id}-title`}
                        className="-ml-[0.05em] mb-5 text-2xl font-extrabold leading-tight sm:text-3xl"
                      >
                        {section.title}
                      </h2>
                    ) : null}
                    <div className="space-y-5 text-lg leading-[1.75] text-pretty text-foreground/85">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.points.length ? (
                        <ul className="list-disc space-y-2 pl-6 marker:text-logo-blue">
                          {section.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </section>
                ))}
              </div>

              {references.length ? (
                <details className="group mt-12">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-muted-foreground [&::-webkit-details-marker]:hidden">
                    {t("Källor")} ({references.length})
                    <ChevronDown
                      aria-hidden
                      className="size-4 transition-transform duration-200 ease-out group-open:rotate-180"
                    />
                  </summary>
                  <ul className="mt-3 space-y-3">
                    {references.map((source) => (
                      <li key={source.id}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group/link inline-flex min-h-10 items-start gap-2.5 py-2 text-sm leading-relaxed text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <ExternalLink
                            aria-hidden
                            strokeWidth={1.5}
                            className="mt-1 size-3.5 shrink-0 opacity-60"
                          />
                          <span>
                            {source.title}{" "}
                            <span className="text-xs opacity-70">
                              {new URL(source.url).hostname}
                            </span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}

              <div className="mt-12 flex flex-col gap-4 rounded-2xl bg-primary-soft p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-lg font-extrabold">
                    {t("Skicka RCS för ert företag")}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {lowestPrice
                      ? `${t("Från {price} per meddelande.").replace("{price}", lowestPrice)} `
                      : ""}
                    {t("Ingen startavgift eller bindningstid.")}
                  </p>
                </div>
                <Button asChild className="shrink-0">
                  <Link to={lp("/skapa-konto")}>
                    {t("Skapa konto")} <ArrowRight data-icon="end" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {latest.length ? (
            <aside
              aria-labelledby="senaste"
              className="rounded-2xl bg-muted p-6 lg:sticky lg:top-28 lg:self-start"
            >
              <h2 id="senaste" className="font-display text-lg font-extrabold">
                {t("Senaste artiklar")}
              </h2>
              {/* Each entry reads like a small article: topic, heading, the start of the summary, date and reading time. */}
              <ul className="mt-5 space-y-6">
                {latest.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={lp("/blogg/$slug")}
                      params={{ slug: item.slug }}
                      className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="block text-xs font-bold tracking-[0.06em] text-muted-foreground uppercase">
                        {item.category}
                      </span>
                      <span className="mt-1.5 block text-[17px] font-extrabold leading-snug text-balance transition-colors duration-150 group-hover:text-logo-blue">
                        {item.title}
                      </span>
                      <span className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                        {item.description}
                      </span>
                      <span className="mt-2 block text-xs text-muted-foreground tabular-nums">
                        <time dateTime={item.published}>{formatDate(item.published, locale)}</time>{" "}
                        · {item.minutes} {t("min läsning")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </article>
    </BlogLayout>
  );
}

/** Shown for an article address that does not exist, in either language. */
export function ArticleNotFound() {
  const { t, lp } = useT();
  return (
    <BlogLayout>
      <div className="mx-auto max-w-3xl px-5 py-24">
        <h1 className="text-4xl tracking-normal">{t("Artikeln finns inte")}</h1>
        <p className="mt-5 text-muted-foreground">
          {t("Den kan ha flyttats eller så är adressen fel.")}
        </p>
        <Button asChild className="mt-7">
          <Link to={lp("/blogg")}>
            {t("Till Insikter")} <ArrowRight data-icon="end" />
          </Link>
        </Button>
      </div>
    </BlogLayout>
  );
}
