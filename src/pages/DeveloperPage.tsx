import { Link } from "@tanstack/react-router";
import { ArrowRight, Copy, ExternalLink, Inbox, KeyRound, ListOrdered, Send, ShieldCheck, Activity } from "lucide-react";

import { ArticleCard } from "@/components/ArticleCard";
import { ApiSketch } from "@/components/HomepageSections";
import { NumberDrop } from "@/components/NumberDrop";
import { PageHeading } from "@/components/PageHeading";
import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { articleList as articles } from "@/content/article-list";
import { sources } from "@/content/sources";
import { sectionIntro, sectionTitle } from "@/lib/typography";
import { cn } from "@/lib/utils";

// The developer page at /utvecklare.


/** The flow in three steps, as the start page and the guides describe it. */
const FLOW = [
  { title: "Skicka", copy: "Ert system skickar ett POST-anrop med avsändare, mottagare och innehåll: text, en fil, ett kort, en karusell eller en mall. Når RCS inte telefonen kan samma anrop låta meddelandet gå som SMS eller MMS i stället." },
  { title: "Följ status", copy: "Till er webhook kommer en leveransrapport när meddelandet har nått telefonen och en läsrapport när kunden har öppnat det. Rapporten visar också vilken prisnivå meddelandet fick." },
  { title: "Ta emot svar", copy: "Trycker kunden på ett förslag kommer en händelse med det postbackData ni satte på knappen. Skriver kunden själv kommer det som ett inkommande meddelande, och ert system kan svara i samma tråd." },
];

/** The endpoints and webhooks, in the API's own names. */
const ENDPOINTS: [kind: string, path: string, copy: string][] = [
  ["POST", "/rcs/2/messages", "Skicka text, fil, kort, karusell eller mall till en eller flera mottagare, högst 10 MB per anrop."],
  ["POST", "/rcs/2/capability-check/query", "Kolla om upp till 500 nummer kan ta emot RCS från er avsändare. Inför ett utskick fungerar små omgångar om 1 till 10 nummer bäst."],
  ["Webhook", "Leveransrapport", "Meddelandet har nått telefonen eller misslyckats, med prisnivån i fältet trafficType."],
  ["Webhook", "Läsrapport", "Kunden har öppnat meddelandet."],
  ["Webhook", "Händelse", "Kunden har tryckt på ett förslag. Ni får texten och ert postbackData."],
  ["Webhook", "Inkommande meddelande", "Kunden har skrivit något eller skickat en fil eller plats."],
  ["Webhook", "Samtal startat", "Kunden har svarat inom 24 timmar, och meddelandena räknas nu som ett samtal."],
];

/** Limits worth knowing before the first request. */
const LIMITS = [
  "En text får vara upp till 3 072 tecken.",
  "En fil får vara upp till 100 MB, och länken till den upp till 2 048 tecken.",
  "Ett meddelande kan ha upp till 11 förslag, som svar, länkar eller telefonnummer.",
  "Giltighetstiden kan sättas från 10 sekunder till 48 timmar. Därefter försöker API:t inte längre leverera.",
  "Reserven är SMS eller MMS, inte båda.",
  "Ett leveransfönster styr vilka dagar och klockslag meddelanden får gå ut.",
  "En text utan förslag räknas som Basic. Lägger ni till ett svarsförslag blir samma text Single.",
  "Filer som kunden skickar till er finns kvar i 60 dagar.",
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
  const bySlug = (slug: string) => articles.find((article) => article.slug === slug);
  const GUIDES = GUIDE_SLUGS.map(bySlug).filter((article): article is (typeof articles)[number] => Boolean(article));
  const DOCS = ["send", "events", "webhooks"].map((id) => sources.find((source) => source.id === id)).filter((source): source is (typeof sources)[number] => Boolean(source));
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main id="innehall" tabIndex={-1} className="flex-1 outline-none">
        <PageHeading title="RCS för utvecklare" description={<p>Låt era egna system skicka RCS via vårt REST API. Status och svar från kunderna kommer tillbaka till er med webhooks.</p>}>
          <Button className="border-transparent" asChild size="lg" variant="outline"><Link to="/skapa-konto">Skapa konto <ArrowRight data-icon="end" /></Link></Button>
          <Link to="/kontakt" className="inline-flex min-h-11 items-center px-3 text-sm font-semibold text-ink-foreground underline-offset-4 hover:underline">Prata med oss</Link>
        </PageHeading>

        <section className="pb-16 sm:pb-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14 lg:px-8">
            <div>
              <h2 className={sectionTitle}>Så fungerar flödet</h2>
              <ol className="mt-8 grid gap-6">
                {FLOW.map(({ title: heading, copy }, index) => (
                  <li key={heading} className="grid grid-cols-[2.5rem_1fr] gap-4">
                    <NumberDrop n={index + 1} />
                    <div>
                      <h3 className="pt-2 text-lg font-extrabold">{heading}</h3>
                      <p className="mt-1.5 leading-relaxed text-pretty text-muted-foreground">{copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <ApiSketch />
          </div>
        </section>

        <section className="bg-muted py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className={sectionTitle}>Anrop och webhooks</h2>
            <p className={sectionIntro}>Anropen autentiseras med en API-nyckel i huvudet Authorization. Adressen och nyckeln får ni när kontot är aktiverat, och webhookarna pekar ni mot er egen server.</p>
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
              <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
                {ENDPOINTS.map(([kind, path, copy]) => (
                  <li key={path} className="grid gap-1.5 px-5 py-4 sm:grid-cols-[18rem_1fr] sm:gap-6 sm:px-6">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      <span className="rounded bg-primary-soft px-1.5 py-0.5 font-mono text-[11px]">{kind}</span>
                      <span className={kind === "POST" ? "font-mono text-[13px] break-all" : ""}>{path}</span>
                    </p>
                    <p className="text-sm leading-relaxed text-pretty text-muted-foreground">{copy}</p>
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl border border-border bg-card px-5 py-5 sm:px-6">
                <h3 className="text-lg font-extrabold">Bra att veta</h3>
                <ul className="mt-3 grid gap-2.5 text-sm leading-relaxed text-pretty text-muted-foreground">
                  {LIMITS.map((limit) => <li key={limit} className="border-t border-border pt-2.5 first:border-t-0 first:pt-0">{limit}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-ink py-16 text-ink-foreground sm:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className={sectionTitle}>Det en integration behöver hantera</h2>
            <p className={cn(sectionIntro, "text-ink-muted")}>Händelser från webhooks kommer inte alltid en gång och i rätt ordning. Här är det som brukar ställa till det.</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CHECKLIST.map(({ Icon, slug, label }) => (
                <li key={slug} className="flex min-h-16 items-center gap-3 rounded-2xl bg-ink-foreground/[0.06] px-4 py-3 ring-1 ring-ink-foreground/10">
                  <Icon aria-hidden strokeWidth={2} className="size-5 shrink-0 text-logo-blue" />
                  <span className="text-sm font-semibold leading-snug">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className={sectionTitle}>Artiklar om integrationen</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {GUIDES.map((article) => <ArticleCard key={article.slug} article={article} />)}
            </div>
            {DOCS.length ? (
              <div className="mt-12 rounded-2xl bg-primary-soft p-6 sm:p-8">
                <h3 className="text-lg font-extrabold">Googles dokumentation</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">RCS bygger på Googles RCS for Business. Vill ni gå på djupet finns allt om meddelanden, händelser och webhooks där.</p>
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
