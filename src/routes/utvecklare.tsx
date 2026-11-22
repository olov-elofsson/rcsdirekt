import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Copy, ExternalLink, Inbox, KeyRound, ListOrdered, MessageSquareReply, Send, ShieldCheck, Activity } from "lucide-react";

import { ArticleCard } from "@/components/BlogCards";
import { ApiSketch } from "@/components/HomeSections";
import { PageHeading } from "@/components/PageHeading";
import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { articles, sources } from "@/data/rcs-knowledge";
import { sectionIntro, sectionTitle } from "@/lib/typography";
import { cn } from "@/lib/utils";

const title = "RCS API för utvecklare | RCS Direkt";
const description = "Skicka RCS från era egna system via REST API och ta emot status och svar med webhooks. Så fungerar flödet, och vad en integration behöver hantera.";

export const Route = createFileRoute("/utvecklare")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rcsdirekt.se/utvecklare" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/utvecklare" }],
  }),
  component: DeveloperPage,
});

const bySlug = (slug: string) => articles.find((article) => article.slug === slug);

/** The flow in three steps, as the start page and the guides describe it. */
const FLOW = [
  { Icon: Send, title: "Skicka", copy: "Ert system anropar API:t med mottagare och innehåll: text, kort, karusell eller knappar. Ni kan ange SMS som reserv om RCS inte går fram." },
  { Icon: Activity, title: "Följ status", copy: "Status kommer tillbaka som händelser till er webhook: levererat till telefonen, öppnat och tryck på knappar." },
  { Icon: MessageSquareReply, title: "Ta emot svar", copy: "När kunden trycker på ett förslag eller skriver ett svar kommer det som en händelse, så att ert system kan svara i samma tråd." },
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

const GUIDES = ["rcs-api-webhooks", "rcs-leveransstatus", "rcs-fallback-sms", "kapabilitetskontroll", "testa-rcs-utskick", "rcs-loggning"]
  .map(bySlug)
  .filter((article): article is (typeof articles)[number] => Boolean(article));

const DOCS = ["send", "events", "webhooks"].map((id) => sources.find((source) => source.id === id)).filter((source): source is (typeof sources)[number] => Boolean(source));

function DeveloperPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main id="innehall" tabIndex={-1} className="flex-1 outline-none">
        <PageHeading title="RCS för utvecklare" description={<p>Skicka RCS från era egna system via REST API och ta emot status och svar med webhooks.</p>}>
          <Button asChild size="lg"><Link to="/skapa-konto">Skapa konto <ArrowRight data-icon="end" /></Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/kontakt">Prata med oss</Link></Button>
        </PageHeading>

        <section className="pb-16 sm:pb-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14 lg:px-8">
            <div>
              <h2 className={sectionTitle}>Så fungerar flödet</h2>
              <ol className="mt-8 grid gap-6">
                {FLOW.map(({ Icon, title: heading, copy }, index) => (
                  <li key={heading} className="grid grid-cols-[2.75rem_1fr] gap-4">
                    <span aria-hidden className="grid size-11 place-items-center rounded-xl bg-primary-soft text-logo-blue"><Icon strokeWidth={2} className="size-5" /></span>
                    <div>
                      <h3 className="text-lg font-extrabold"><span className="text-muted-foreground tabular-nums">{index + 1}.</span> {heading}</h3>
                      <p className="mt-1.5 leading-relaxed text-pretty text-muted-foreground">{copy}</p>
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
            <h2 className={sectionTitle}>Det en integration behöver hantera</h2>
            <p className={cn(sectionIntro, "text-ink-muted")}>Händelser via webhook kommer inte alltid en gång och i ordning. Varje punkt har en guide.</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CHECKLIST.filter((item) => bySlug(item.slug)).map(({ Icon, slug, label }) => (
                <li key={slug}>
                  <Link to="/blogg/$slug" params={{ slug }} className="group flex min-h-16 items-center gap-3 rounded-2xl bg-ink-foreground/[0.06] px-4 py-3 ring-1 ring-ink-foreground/10 transition-colors duration-150 hover:bg-ink-foreground/[0.1]">
                    <Icon aria-hidden strokeWidth={2} className="size-5 shrink-0 text-logo-blue" />
                    <span className="text-sm font-semibold leading-snug">{label}</span>
                    <ArrowRight aria-hidden className="ml-auto size-4 shrink-0 text-ink-muted transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className={sectionTitle}>Guider för integrationen</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {GUIDES.map((article) => <ArticleCard key={article.slug} article={article} />)}
            </div>
            {DOCS.length ? (
              <div className="mt-12 rounded-2xl bg-primary-soft p-6 sm:p-8">
                <h3 className="text-lg font-extrabold">Googles dokumentation</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">RCS bygger på Googles RCS for Business. Där beskrivs meddelanden, händelser och webhooks i detalj.</p>
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
