import { Link } from "@tanstack/react-router";
import { ArrowRight, Copy, ExternalLink, Inbox, KeyRound, ListOrdered, MessageSquareReply, Send, ShieldCheck, Activity } from "lucide-react";

import { ArticleCard } from "@/components/ArticleCard";
import { ApiSketch } from "@/components/HomepageSections";
import { PageHeading } from "@/components/PageHeading";
import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { articleList as articlesSv } from "@/content/article-list";
import { articleList as articlesEn } from "@/content/en/article-list";
import { sources as sourcesSv } from "@/content/sources";
import { sources as sourcesEn } from "@/content/en/sources";
import { useT } from "@/lib/i18n";
import { sectionIntro, sectionTitle } from "@/lib/typography";
import { cn } from "@/lib/utils";

// The developer page, in Swedish at /utvecklare and in English at /en/developers.


/** The flow in three steps, as the start page and the guides describe it. */
const FLOW = [
  { Icon: Send, title: "Skicka", copy: "Ert system anropar API:t med mottagare och innehåll, till exempel text, ett kort, en karusell eller knappar. Går RCS inte fram kan ni låta det gå som SMS i stället." },
  { Icon: Activity, title: "Följ status", copy: "Ni får händelser till er webhook när meddelandet har kommit fram, när kunden har öppnat det och när någon trycker på en knapp." },
  { Icon: MessageSquareReply, title: "Ta emot svar", copy: "Trycker kunden på ett förslag eller skriver något kommer det också som en händelse. Då kan ert system svara i samma tråd." },
];

/** What a working integration handles, each point backed by a guide on the site. */
const CHECKLIST: { Icon: typeof Send; slug: string; label: string }[] = [
  { Icon: Copy, slug: "rcs-dubbla-handelser", label: "Samma händelse kan komma två gånger" },
  { Icon: ListOrdered, slug: "rcs-handelser-ordning", label: "Händelser kan komma i fel ordning" },
  { Icon: Inbox, slug: "rcs-handelser-ko", label: "Lägg inkommande händelser i en kö" },
  { Icon: ShieldCheck, slug: "rcs-webhook-avsandarkontroll", label: "Kontrollera vem som skickar till webhooken" },
  { Icon: KeyRound, slug: "rcs-api-nycklar", label: "Håll API-nycklarna hemliga" },
  { Icon: Activity, slug: "rcs-handelser-overvakning", label: "Märk när händelser slutar komma" },
];

const GUIDE_SLUGS = ["rcs-api-webhooks", "rcs-basic-single-conversation", "verifierad-avsandare"];

export function DeveloperPage() {
  const { t, lp, locale } = useT();
  const articles = locale === "en" ? articlesEn : articlesSv;
  const sources = locale === "en" ? sourcesEn : sourcesSv;
  const bySlug = (slug: string) => articles.find((article) => article.slug === slug);
  const GUIDES = GUIDE_SLUGS.map(bySlug).filter((article): article is (typeof articles)[number] => Boolean(article));
  const DOCS = ["send", "events", "webhooks"].map((id) => sources.find((source) => source.id === id)).filter((source): source is (typeof sources)[number] => Boolean(source));
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main id="innehall" tabIndex={-1} className="flex-1 outline-none">
        <PageHeading title={t("RCS för utvecklare")} description={<p>{t("Låt era egna system skicka RCS via vårt REST API. Status och svar från kunderna kommer tillbaka till er med webhooks.")}</p>}>
          <Button className="border-transparent" asChild size="lg" variant="outline"><Link to={lp("/skapa-konto")}>{t("Skapa konto")} <ArrowRight data-icon="end" /></Link></Button>
          <Link to={lp("/kontakt")} className="inline-flex min-h-11 items-center px-3 text-sm font-semibold text-ink-foreground underline-offset-4 hover:underline">{t("Prata med oss")}</Link>
        </PageHeading>

        <section className="pb-16 sm:pb-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14 lg:px-8">
            <div>
              <h2 className={sectionTitle}>{t("Så fungerar flödet")}</h2>
              <ol className="mt-8 grid gap-6">
                {FLOW.map(({ Icon, title: heading, copy }, index) => (
                  <li key={heading} className="grid grid-cols-[2.75rem_1fr] gap-4">
                    <span aria-hidden className="grid size-11 place-items-center rounded-xl bg-primary-soft text-logo-blue"><Icon strokeWidth={2} className="size-5" /></span>
                    <div>
                      <h3 className="text-lg font-extrabold"><span className="text-muted-foreground tabular-nums">{index + 1}.</span> {t(heading)}</h3>
                      <p className="mt-1.5 leading-relaxed text-pretty text-muted-foreground">{t(copy)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <ApiSketch />
          </div>
        </section>

        <section className="bg-ink py-16 text-ink-foreground sm:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className={sectionTitle}>{t("Det en integration behöver hantera")}</h2>
            <p className={cn(sectionIntro, "text-ink-muted")}>{t("Händelser från webhooks kommer inte alltid en gång och i rätt ordning. Här är det som brukar ställa till det.")}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CHECKLIST.map(({ Icon, slug, label }) => (
                <li key={slug} className="flex min-h-16 items-center gap-3 rounded-2xl bg-ink-foreground/[0.06] px-4 py-3 ring-1 ring-ink-foreground/10">
                  <Icon aria-hidden strokeWidth={2} className="size-5 shrink-0 text-logo-blue" />
                  <span className="text-sm font-semibold leading-snug">{t(label)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className={sectionTitle}>{t("Artiklar om integrationen")}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {GUIDES.map((article) => <ArticleCard key={article.slug} article={article} />)}
            </div>
            {DOCS.length ? (
              <div className="mt-12 rounded-2xl bg-primary-soft p-6 sm:p-8">
                <h3 className="text-lg font-extrabold">{t("Googles dokumentation")}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{t("RCS bygger på Googles RCS for Business. Vill ni gå på djupet finns allt om meddelanden, händelser och webhooks där.")}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                  {DOCS.map((source) => (
                    <li key={source.id}>
                      <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold underline-offset-4 hover:text-logo-blue hover:underline">
                        <ExternalLink aria-hidden className="size-4 shrink-0" />{source.title.replace("Google RCS for Business: ", "")}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
