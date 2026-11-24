import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Code2, MonitorSmartphone, Receipt } from "lucide-react";

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

/** Three cards right under the hero, each with a line icon, a short text and where it leads. */
export function Entrances() {
  const { t, lp } = useT();
  const from = usePriser().plans[0]?.price;
  const cards = [
    { Icon: MonitorSmartphone, title: t("Skicka från webben"), copy: t("Bygg utskicket i webbläsaren och se direkt hur det ser ut hos kunden."), link: t("Se webbverktyget"), to: lp("/"), hash: "vad-ar-rcs" },
    { Icon: Code2, title: t("Koppla in ert system"), copy: t("Låt era system skicka bekräftelser och påminnelser via API, med svaren tillbaka som webhooks."), link: t("Till utvecklarsidan"), to: lp("/utvecklare") },
    { Icon: Receipt, title: t("Betala per meddelande"), copy: from ? t("Listpris från {price} per meddelande. Det kostar inget att starta och det finns ingen bindningstid.").replace("{price}", from) : t("Det kostar inget att starta och det finns ingen bindningstid."), link: t("Se priser"), to: lp("/priser") },
  ];
  return (
    <section id="ingangar" aria-label={t("Kom vidare")} className="bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <ul className="grid gap-5 md:grid-cols-3">
          {cards.map(({ Icon, ...card }, index) => (
            <li key={card.title} data-reveal style={order(index)}>
              <Link to={card.to} {...(card.hash ? { hash: card.hash } : {})} className="group flex h-full flex-col items-center rounded-2xl border border-border bg-card px-7 pt-9 pb-8 text-center transition-[border-color,box-shadow] duration-200 ease-out hover:border-logo-blue/40 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Icon aria-hidden strokeWidth={1.4} className="size-14 text-logo-blue" />
                <h3 className="mt-6 text-xl font-extrabold leading-snug">{card.title}</h3>
                <p className="mt-2 flex-1 text-base leading-relaxed text-pretty text-muted-foreground">{card.copy}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold">{card.link} <ArrowRight aria-hidden className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" /></span>
              </Link>
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

/**
 * The page's close, as Fortnox ends with one coloured box: how to get started in three steps, and
 * the two ways forward. It replaces separate sections for the steps, help and the contact form.
 */
export function ClosingBox() {
  const { t, lp } = useT();
  return (
    <section id="kom-igang" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="rounded-3xl bg-primary-soft px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 data-reveal className="mx-auto max-w-3xl text-[2.1rem] font-extrabold leading-[1.1] text-balance sm:text-[2.65rem]">{t("Från konto till första utskick i tre steg")}</h2>
          <p data-reveal className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-[17px]">{t("Vi hjälper er med avsändaren och upplägget på vägen.")}</p>
          <ol className="relative mx-auto mt-12 grid max-w-5xl gap-10 text-left md:grid-cols-3 md:gap-8">
            {/* The line through the drops, drawn from left to right when the steps come into view. */}
            <li aria-hidden data-reveal className="steps-line pointer-events-none absolute left-5 right-0 top-5 hidden h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/20 from-75% to-transparent md:block" />
            {STEPS.map((step, index) => (
              <li key={step.title} data-reveal style={order(index + 1)} className="relative">
                <NumberDrop n={index + 1} />
                <h3 className="mt-5 text-lg font-extrabold leading-snug">{t(step.title)}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-pretty text-muted-foreground">{t(step.copy)}</p>
              </li>
            ))}
          </ol>
          <div data-reveal className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Button className="home-cta" asChild size="lg"><Link to={lp("/skapa-konto")}>{t("Skapa konto")} <ArrowRight data-icon="end" /></Link></Button>
            <Link to={lp("/kontakt")} className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline">{t("Prata med oss först")} <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
          </div>
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
