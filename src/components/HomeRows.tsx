import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, BadgeCheck, BarChart3, Code2, GalleryHorizontal, Images, MousePointerClick } from "lucide-react";

import { HeroMessage } from "@/components/HeroMessage";
import { PhoneIcon, RcsSnippet, VerifiedMark } from "@/components/RcsPhone";
import { rcsDirektSender } from "@/data/rcs-sender";
import { scenarios } from "@/data/customer-examples";
import { STEPS } from "@/data/onboarding";
import { NumberDrop } from "@/components/NumberDrop";
import { Button } from "@/components/ui/button";
import { usePriser, useStartsida } from "@/content/localized";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// The start page sections laid out after fortnox.se, in our own brand kit: entrance cards with a
// line icon under the hero, rows that alternate picture and text with one rounded action each,
// and two large coloured cards side by side.

const order = (index: number) => ({ "--reveal-order": index }) as CSSProperties;

/** A row's heading: a full sentence, as Fortnox writes them, a little smaller than a section title. */
const rowTitle = "-ml-[0.04em] text-[1.9rem] font-extrabold leading-[1.12] text-balance sm:text-[2.35rem]";

/** The features as a standard grid of six, each with a small icon, a title and one sentence. */
export function FeatureGrid() {
  const { t } = useT();
  const features = [
    { Icon: BadgeCheck, title: t("Verifierad avsändare"), copy: t("Kunden ser ert namn, er logga och en bock i stället för ett okänt nummer.") },
    { Icon: Images, title: t("Bilder och video"), copy: t("Visa produkten, platsen eller erbjudandet direkt i meddelandet.") },
    { Icon: MousePointerClick, title: t("Knappar och snabbsvar"), copy: t("Kunden bekräftar, bokar om eller väljer ett alternativ med ett tryck.") },
    { Icon: GalleryHorizontal, title: t("Karuseller"), copy: t("Flera kort att svepa mellan, med en egen knapp på varje kort.") },
    { Icon: BarChart3, title: t("Leveransrapporter"), copy: t("Se om meddelandet har kommit fram, och vilka knappar kunderna har tryckt på.") },
    { Icon: Code2, title: t("Webb och API"), copy: t("Skicka från webbläsaren, eller låt era egna system skicka via API.") },
  ];
  return (
    <section id="funktioner" className="bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div data-reveal className="text-center">
          <h2 className="mx-auto max-w-3xl text-[2.1rem] font-extrabold leading-[1.1] text-balance sm:text-[2.65rem]">{t("Allt ni behöver för att skicka RCS")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-[17px]">{t("Meddelandet hamnar i kundens vanliga meddelandeapp, med det här på köpet.")}</p>
        </div>
        <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ Icon, title, copy }, index) => (
            <li key={title} data-reveal style={order(index)} className="flex gap-5">
              <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-logo-blue"><Icon strokeWidth={1.75} className="size-6" /></span>
              <div>
                <h3 className="text-lg font-extrabold leading-snug">{title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-pretty text-muted-foreground">{copy}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The soft panel every row's picture sits on, so the three pictures read as one set. */
function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex min-h-[22rem] items-center justify-center rounded-3xl bg-primary-soft p-8 sm:min-h-[26rem] sm:p-12", className)}>{children}</div>;
}

/** The web tool, reduced to its result: the card as the customer sees it. */
function WebVisual() {
  const { t } = useT();
  return (
    <Panel>
      <RcsSnippet width={300} scale={0.95}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#444746", marginBottom: 6 }}>
          {rcsDirektSender.sender} <VerifiedMark size={14} />
        </div>
        <div className="card">
          <img src={rcsDirektSender.profile.banner} alt="" style={{ objectFit: "cover" }} />
          <div className="ct">{t("Ert första utskick")}</div>
          <div className="cb">{t("Bilder, text och knappar, byggt i webbläsaren.")}</div>
          <div className="cbtns">
            <div className="cbtn"><span className="ci"><PhoneIcon name="open" size={18} /></span>{t("Läs mer")}</div>
          </div>
        </div>
      </RcsSnippet>
    </Panel>
  );
}

/** The API, reduced to one request and its answer. */
function ApiVisual() {
  const { t, locale } = useT();
  const body = locale === "en"
    ? `{
  "to": "+46701234567",
  "text": "Your appointment is Tuesday at 2 pm.",
  "buttons": ["Confirm", "Reschedule"]
}`
    : `{
  "to": "+46701234567",
  "text": "Din tid är tisdag kl. 14.00.",
  "buttons": ["Bekräfta", "Boka om"]
}`;
  return (
    <Panel className="bg-ink">
      <figure className="w-full max-w-md text-left">
        <figcaption className="flex items-center gap-2 font-mono text-xs text-ink-muted">
          <span className="rounded bg-ink-foreground/15 px-1.5 py-0.5 text-ink-foreground">POST</span>/messages
        </figcaption>
        <pre className="mt-4 overflow-x-auto text-[13px] leading-relaxed text-ink-foreground sm:text-sm"><code>{body}</code></pre>
        <p className="mt-5 flex items-center gap-2 border-t border-ink-foreground/10 pt-4 font-mono text-xs text-ink-muted">
          <span className="rounded bg-ink-foreground/15 px-1.5 py-0.5 text-ink-foreground">202</span>{t("Mottaget, status kommer via webhook")}
        </p>
      </figure>
    </Panel>
  );
}

/** One row: a picture on one side, a heading, a paragraph and one rounded action on the other. */
function SplitRow({ id, flip = false, title, copy, action, visual }: { id?: string; flip?: boolean; title: string; copy: string; action: ReactNode; visual: ReactNode }) {
  return (
    <div id={id} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <div data-reveal className={cn("min-w-0", flip && "lg:order-2")}>
        <h2 className={rowTitle}>{title}</h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-[17px]">{copy}</p>
        <div className="mt-8">{action}</div>
      </div>
      <div data-reveal style={order(1)} className={cn("min-w-0", flip && "lg:order-1")}>{visual}</div>
    </div>
  );
}

/** Step one of the journey, why RCS: the same notice shown as SMS and as RCS. */
export function DifferenceRow() {
  const { t, lp } = useT();
  return (
    <section id="skillnaden" className="bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SplitRow
          title={t("Samma besked, som SMS och som RCS")}
          copy={t("Växla mellan SMS och RCS och se hur samma besked ser ut hos kunden. Med RCS syns ert namn och er logga, och kunden kan svara med ett tryck.")}
          action={<Button className="home-cta" asChild size="lg" variant="outline"><Link to={lp("/")} hash="rcs-mot-sms">{t("Se hela jämförelsen")}</Link></Button>}
          visual={<Panel><div className="w-full max-w-[22rem]"><HeroMessage bare /></div></Panel>}
        />
      </div>
    </section>
  );
}

/** The journey's "how do we send": the web tool and the API, the same sender and price for both. */
export function SendRows() {
  const home = useStartsida();
  const { t, lp } = useT();
  const [web, api] = home.vagar.items;
  return (
    <section id="plattform" className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-24 px-5 sm:gap-32 lg:px-8">
        <SplitRow
          id="vad-ar-rcs"
          flip
          title={t("Bygg utskicket i webbläsaren")}
          copy={web?.copy ?? ""}
          action={<Button className="home-cta" asChild size="lg" variant="outline"><Link to={lp("/skapa-konto")}>{t("Prova webbverktyget")}</Link></Button>}
          visual={<WebVisual />}
        />
        <SplitRow
          title={t("Låt era system skicka via API")}
          copy={api?.copy ?? ""}
          action={<Button className="home-cta" asChild size="lg" variant="outline"><Link to={lp("/utvecklare")}>{t("Till utvecklarsidan")}</Link></Button>}
          visual={<ApiVisual />}
        />
      </div>
    </section>
  );
}

/** "Så funkar det": three numbered steps in a row, with the line drawn through the drops. */
export function HowItWorks() {
  const { t } = useT();
  return (
    <section id="kom-igang" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div data-reveal className="text-center">
          <h2 className="mx-auto max-w-3xl text-[2.1rem] font-extrabold leading-[1.1] text-balance sm:text-[2.65rem]">{t("Så kommer ni igång")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-[17px]">{t("Från konto till första utskick i tre steg. Vi hjälper er med avsändaren på vägen.")}</p>
        </div>
        <ol className="relative mx-auto mt-12 grid max-w-6xl gap-10 md:grid-cols-3 md:gap-8">
          <li aria-hidden data-reveal className="steps-line pointer-events-none absolute left-5 right-0 top-5 hidden h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-border from-75% to-transparent md:block" />
          {STEPS.map((step, index) => (
            <li key={step.title} data-reveal style={order(index + 1)} className="relative">
              <NumberDrop n={index + 1} />
              <h3 className="mt-5 text-lg font-extrabold leading-snug">{t(step.title)}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-pretty text-muted-foreground">{t(step.copy)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** The closing call to action: a full-width Marin band with a heading and two actions. */
export function CtaBand() {
  const { t, lp } = useT();
  return (
    <section id="kom-igang-nu" className="border-b border-ink-foreground/10 bg-ink text-ink-foreground">
      <div data-reveal className="mx-auto flex max-w-4xl flex-col items-center px-5 text-center lg:px-8">
        <h2 className="text-[2.1rem] font-extrabold leading-[1.1] text-balance text-ink-foreground sm:text-[2.65rem]">{t("Redo att skicka ert första RCS-meddelande?")}</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-ink-muted sm:text-[17px]">{t("Det kostar inget att skapa ett konto. Ni betalar för de meddelanden ni skickar.")}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Button className="home-cta border-transparent" asChild size="lg" variant="outline"><Link to={lp("/skapa-konto")}>{t("Skapa konto")} <ArrowRight data-icon="end" /></Link></Button>
          <Link to={lp("/kontakt")} className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink-foreground underline-offset-4 hover:underline">{t("Prata med oss")} <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" /></Link>
        </div>
      </div>
    </section>
  );
}

/** The customers behind the cases, as large companies show their logo wall right under the hero. */
export function CustomerStrip() {
  const { t } = useT();
  return (
    <section id="kunder" aria-label={t("Kunder")} className="bg-background">
      <div data-reveal className="mx-auto max-w-7xl px-5 text-center lg:px-8">
        <p className="text-sm font-semibold text-muted-foreground">{t("Företag som skickar RCS med oss")}</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 sm:gap-x-16">
          {scenarios.map(({ customer }) => (
            <li key={customer} className="font-display text-2xl font-extrabold tracking-[-0.01em] text-foreground/45 sm:text-[1.75rem]">{customer}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
