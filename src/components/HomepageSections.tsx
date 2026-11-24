import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BadgeCheck, BarChart3, Check, ChevronDown, Clock, Images, MousePointerClick, X } from "lucide-react";

import { PlanCard } from "@/components/PlanCard";
import { VerifiedMark } from "@/components/RcsPhone";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { articleList } from "@/content/article-list";
import { priser } from "@/content/priser";
import { usePriser, useStartsida } from "@/content/localized";
import { useT } from "@/lib/i18n";
import { articleList as articleListEn } from "@/content/en/article-list";
import { sectionBody, sectionIntro, sectionTitle, sectionTitleCentered } from "@/lib/typography";
import { formatPrice, formatTotal, useCurrency } from "@/lib/money";
import { cn } from "@/lib/utils";

// -0.05em: Archivo has about 0.07em of space before straight capitals, the body text far less,
// so a left-aligned heading would look indented next to the text under it.
const order = (index: number) => ({ "--reveal-order": index }) as CSSProperties;


/* ------------------------------------------------------------------------------------------ */
/* RCS och SMS: the same notice as an SMS and as RCS, beside the facts that differ.            */

function compareValue(value: string): boolean | string {
  if (value.trim() === "✓") return true;
  if (value.trim() === "✗") return false;
  // A no-break space inside numbers like "4 000", so a narrow column never splits them.
  return value.replace(/(\d) (?=\d)/g, "$1\u00a0");
}

function Fact({ value, rcs }: { value: boolean | string; rcs: boolean }) {
  const { t } = useT();
  if (typeof value === "boolean")
    return value ? (
      <span className={cn("inline-flex", rcs ? "text-logo-blue" : "text-foreground")}><Check aria-hidden className="size-5" /><span className="sr-only">{t("Ja")}</span></span>
    ) : (
      <span className="inline-flex text-muted-foreground/60"><X aria-hidden className="size-5" /><span className="sr-only">{t("Nej")}</span></span>
    );
  return <span className={cn("text-[13px] leading-snug text-pretty sm:text-[15px]", rcs ? "font-semibold text-foreground" : "text-muted-foreground")}>{value}</span>;
}


export function CompareSection() {
  const home = useStartsida();
  const { t } = useT();
  const rows = home.jamforelse.rows.map((row) => ({ label: row.label, sms: compareValue(row.sms), rcs: compareValue(row.rcs) }));
  // As on fortnox.se: four things side by side with a line icon, and the full table under "Visa mer".
  const [open, setOpen] = useState(false);
  const features = [
    { Icon: BadgeCheck, title: t("Verifierad avsändare"), copy: t("Kunden ser ert namn, er logga och en bock i stället för ett okänt nummer.") },
    { Icon: Images, title: t("Bilder, video och knappar"), copy: t("Visa erbjudandet direkt i meddelandet, med kort och karuseller att svepa mellan.") },
    { Icon: MousePointerClick, title: t("Svar med ett tryck"), copy: t("Kunden bekräftar, bokar om eller väljer ett alternativ med en knapp.") },
    { Icon: BarChart3, title: t("Ni ser vad som händer"), copy: t("Ni ser vilka knappar kunden trycker på och, om mottagaren tillåter, när meddelandet läses.") },
  ];
  return (
    <section id="rcs-mot-sms" className="relative scroll-mt-24 overflow-hidden bg-background py-16 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div data-reveal className="text-center">
          <h2 className={sectionTitleCentered}>{home.jamforelse.heading}</h2>
          <p className={cn(sectionIntro, "mx-auto")}>{home.jamforelse.intro}</p>
        </div>
        <ul className={cn(sectionBody, "grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8")}>
          {features.map(({ Icon, title, copy }, index) => (
            <li key={title} data-reveal style={order(index)}>
              <Icon aria-hidden strokeWidth={1.4} className="size-12 text-logo-blue" />
              <h3 className="mt-5 text-lg font-extrabold leading-snug">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-pretty text-muted-foreground">{copy}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <Button type="button" className="home-cta" aria-expanded={open} aria-controls="jamforelse-tabell" onClick={() => setOpen((value) => !value)}>
            {open ? t("Dölj jämförelsen") : t("Visa hela jämförelsen")} <ChevronDown data-icon="end" className={cn("transition-transform duration-200", open && "rotate-180")} />
          </Button>
        </div>
        {/* One table on every screen; on a phone the columns and text are tighter. */}
        <div id="jamforelse-tabell" hidden={!open} className={cn("mt-10 overflow-hidden rounded-2xl border border-border bg-card", !open && "hidden")}>
          <table className="w-full table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[34%] sm:w-[38%]" />
              <col />
              <col />
            </colgroup>
            <thead>
              {/* One dark heading row over all three columns; in the body the properties and RCS are lit, SMS stays white. */}
              <tr>
                <th scope="col" className="bg-ink px-3 py-3.5 font-display text-base font-extrabold text-ink-foreground sm:px-8 sm:py-4">{t("Funktion")}</th>
                <th scope="col" className="bg-ink px-2 py-3.5 font-display text-base font-extrabold text-ink-foreground sm:px-6 sm:py-4">SMS</th>
                <th scope="col" className="bg-ink px-2 py-3.5 font-display text-base font-extrabold text-ink-foreground sm:px-6 sm:py-4">RCS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.label} className="border-t border-border first:border-t-0">
                  <th scope="row" className="bg-muted px-3 py-3.5 text-[13px] font-semibold leading-snug text-pretty sm:px-8 sm:py-4 sm:text-[15px]">
                    {item.label}
                  </th>
                  <td className="px-2 py-3.5 sm:px-6 sm:py-4"><Fact value={item.sms} rcs={false} /></td>
                  <td className="bg-muted px-2 py-3.5 sm:px-6 sm:py-4"><Fact value={item.rcs} rcs /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Från webben eller via API: a sketch of the web tool beside a simplified API request.         */

/** A simplified request: a card with an image, two reply buttons and SMS as the fallback. */
const API_REQUEST = `{
  "sender": "rcsdirekt",
  "to": "+46701234567",
  "card": {
    "title": "Din tid är bokad",
    "description": "Tisdag 14 januari kl. 14.00",
    "media": "https://exempel.se/bild.jpg",
    "buttons": [
      { "type": "reply", "text": "Bekräfta" },
      { "type": "reply", "text": "Boka om" }
    ]
  },
  "fallback": { "sms": "Din tid: tis 14/1 kl. 14.00" }
}`;

const API_REQUEST_EN = `{
  "sender": "rcsdirekt",
  "to": "+46701234567",
  "card": {
    "title": "Your appointment is booked",
    "description": "Tuesday 14 January at 2 pm",
    "media": "https://example.com/image.jpg",
    "buttons": [
      { "type": "reply", "text": "Confirm" },
      { "type": "reply", "text": "Reschedule" }
    ]
  },
  "fallback": { "sms": "Your appointment: Tue 14/1 at 2 pm" }
}`;

const API_RESPONSE = `{ "messageId": "a1b2c3", "status": "ACCEPTED" }`;

/** Light JSON colouring: keys muted, strings bright, punctuation faint. No library. */
function JsonCode({ code }: { code: string }) {
  const parts = code.split(/("(?:[^"\\]|\\.)*")(\s*:)?/g);
  const out: ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    const plain = parts[i];
    if (plain) out.push(<span key={`p${i}`} className="text-ink-muted/70">{plain}</span>);
    const str = parts[i + 1];
    const colon = parts[i + 2];
    if (str) out.push(<span key={`s${i}`} className={colon ? "text-ink-muted" : "text-ink-foreground"}>{str}</span>);
    if (colon) out.push(<span key={`c${i}`} className="text-ink-muted/70">{colon}</span>);
  }
  return <code>{out}</code>;
}

const API_EVENTS: [time: string, status: string, detail: string][] = [
  ["14:02", "DELIVERED", "Levererat till telefonen"],
  ["14:05", "SEEN", "Öppnat av mottagaren"],
  ["14:06", "REPLY", "Svarade Bekräfta"],
];

/** The API in three steps: the request, the answer and the events that come back. */
export function ApiSketch() {
  const { t, locale } = useT();
  // On a phone the example starts cut short, with a way to see all of it.
  const [whole, setWhole] = useState(false);
  const step = "flex items-center gap-2 text-[11px] font-semibold tracking-[0.06em] text-ink-muted uppercase";
  return (
    <figure className={cn("relative flex h-full flex-col overflow-hidden rounded-xl bg-ink text-left shadow-card", !whole && "max-sm:max-h-[24rem]")}>
      {!whole ? (
        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-ink via-ink/90 to-transparent pt-16 pb-4 sm:hidden">
          <Button type="button" variant="outline" size="sm" onClick={() => setWhole(true)}>{t("Visa hela exemplet")}</Button>
        </div>
      ) : null}
      <figcaption className="flex items-center justify-between border-b border-ink-foreground/10 px-4 py-2.5 text-xs text-ink-muted">
        <span className="flex items-center gap-2 font-semibold text-ink-foreground">
          <span className="rounded bg-ink-foreground/15 px-1.5 py-0.5 font-mono text-[11px]">POST</span>
          <span className="font-mono">/messages</span>
        </span>
        <span>{t("Förenklat exempel")}</span>
      </figcaption>
      <div className="flex-1 px-5 pt-4">
        <p className={step}>1 {t("Anrop")}</p>
        <pre className="mt-2 overflow-x-auto text-[12.5px] leading-relaxed"><JsonCode code={locale === "en" ? API_REQUEST_EN : API_REQUEST} /></pre>
      </div>
      <div className="border-t border-ink-foreground/10 px-5 py-3">
        <p className={step}>2 {t("Svar")} <span className="rounded bg-ink-foreground/15 px-1.5 py-0.5 font-mono normal-case tracking-normal text-ink-foreground">202</span></p>
        <pre className="mt-2 overflow-x-auto text-[12.5px] leading-relaxed"><JsonCode code={API_RESPONSE} /></pre>
      </div>
      <div className="border-t border-ink-foreground/10 px-5 py-3">
        <p className={step}>3 {t("Händelser via webhook")}</p>
        <ol className="mt-2 grid gap-1.5 text-[12.5px] text-ink-muted">
          {API_EVENTS.map(([time, status, detail]) => (
            <li key={status} className="flex items-center gap-3">
              <span className="font-mono tabular-nums text-ink-muted/80">{time}</span>
              <span className="rounded-full bg-ink-foreground/10 px-2 py-0.5 font-mono text-[11.5px] text-ink-foreground">{status}</span>
              <span className="truncate">{t(detail)}</span>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}


/* ------------------------------------------------------------------------------------------ */
/* Priser: name, what it contains, the from price and a way to start. */

const sek = (value: number, digits = 0) =>
  value.toLocaleString("sv-SE", { minimumFractionDigits: digits, maximumFractionDigits: digits });

/** The list price for a number of messages: the plan's from price times the count, nothing else. */
/** The total, counted up or down to the new value; screen readers get only the final figure. */
function GlidingTotal({ value, currency, locale = "sv" }: { value: number; currency: "SEK" | "EUR"; locale?: "sv" | "en" }) {
  const tag = locale === "en" ? "en-GB" : "sv-SE";
  const shown = useGlide(value);
  return (
    <p className="mt-1 text-4xl font-extrabold tabular-nums">
      <span aria-hidden>{formatTotal(shown, currency, tag)}</span>
      <span className="sr-only" aria-live="polite">{formatTotal(value, currency, tag)}</span>
    </p>
  );
}

/** A number that glides to its new value, so a changed total reads as a change. Instant with reduced motion. */
function useGlide(target: number, duration = 450): number {
  const [shown, setShown] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      from.current = target;
      return;
    }
    const start = performance.now();
    const begin = from.current;
    let frame = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Ease out: quick at first, settling softly on the new total.
      const value = begin + (target - begin) * (1 - Math.pow(1 - t, 3));
      from.current = value;
      setShown(value);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return shown;
}

export function PriceCalculator({ plans }: { plans: typeof priser.plans }) {
  const [planIndex, setPlanIndex] = useState(() => Math.max(0, plans.findIndex((plan) => plan.badge)));
  const [count, setCount] = useState(5000);
  const currency = useCurrency();
  const { t, locale } = useT();
  const plan = plans[planIndex];
  if (!plan) return null;
  const unit = Number.parseFloat(plan.price.replace(/[^\d,]/g, "").replace(",", "."));
  if (!Number.isFinite(unit)) return null;
  const countId = "kalkyl-antal";
  const total = unit * count;
  const number = (value: number) => value.toLocaleString(locale === "en" ? "en-GB" : "sv-SE");
  return (
    <div data-reveal className="grid gap-8 rounded-2xl bg-primary-soft p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
      <div>
        <h3 className="text-xl font-extrabold">{t("Priskalkyl")}</h3>
        <div role="group" aria-label={t("Meddelandetyp")} className="mt-4 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
          {plans.map((option, index) => (
            <button
              key={option.slug}
              type="button"
              aria-pressed={index === planIndex}
              onClick={() => setPlanIndex(index)}
              className={cn(
                "h-10 rounded-full px-4 text-sm font-semibold transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                index === planIndex ? "bg-ink text-ink-foreground" : "bg-card text-foreground hover:bg-card/70",
              )}
            >
              <span className="sm:hidden">{option.name.replace(/^RCS /, "")}</span>
              <span className="hidden sm:inline">{option.name}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <label htmlFor={countId} className="text-sm font-semibold">{t("Antal meddelanden")}</label>
          <input
            type="number"
            inputMode="numeric"
            aria-label={t("Antal meddelanden")}
            min={1}
            max={1000000}
            value={count}
            onChange={(event) => setCount(Math.max(0, Math.min(1000000, Math.round(Number(event.target.value) || 0))))}
            className="h-10 w-32 rounded-full bg-card px-4 text-right font-display text-base font-extrabold tabular-nums ring-1 ring-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <input
          id={countId}
          type="range"
          min={500}
          max={50000}
          step={500}
          value={Math.min(count, 50000)}
          onChange={(event) => setCount(Number(event.target.value))}
          aria-valuetext={`${number(count)} ${t("meddelanden")}`}
          className="mt-3 h-11 w-full cursor-pointer accent-primary"
        />
      </div>
      <div className="lg:min-w-64 lg:text-right">
        <p className="text-sm text-muted-foreground">{t("Listpris från")}</p>
        <GlidingTotal value={total} currency={currency} locale={locale} />
        <p className="mt-1 text-sm text-muted-foreground">{t("exkl. moms")}, {number(count)} × {formatPrice(plan.price, currency, { locale: locale === "en" ? "en-GB" : "sv-SE" })}</p>
      </div>
    </div>
  );
}

export function PricingSection() {
  const home = useStartsida();
  const plans = usePriser().plans;
  const { t, lp } = useT();
  return (
    <section id="pris" className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Centred over the three plans, as Fortnox sets "De första byggstenarna" over its products. */}
        <div data-reveal className="flex flex-col items-center text-center">
          <h2 className={sectionTitleCentered}>{home.pris.heading}</h2>
          <p className={cn(sectionIntro, "mx-auto")}>{home.pris.intro}</p>
          <Link to={lp("/priser")} className="mt-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold underline-offset-4 transition-colors hover:text-logo-blue hover:underline">{t("Priser per operatör")} <ArrowRight aria-hidden className="size-4" /></Link>
        </div>
        {/* On a phone the plans sit in a row to swipe through, so the section is one card tall. */}
        <div className={cn(sectionBody, "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden")}>
          {plans.map((plan, index) => <PlanCard key={plan.slug} plan={plan} uses={false} style={order(index)} className="w-[84%] shrink-0 snap-center md:w-auto" />)}
        </div>
        <div className="mt-5"><PriceCalculator plans={plans} /></div>
        <p data-reveal className="mt-8 text-center text-sm leading-relaxed text-pretty text-muted-foreground">
          {t("Listpriser exklusive moms. Ert pris beror på hur många meddelanden ni skickar.")}{" "}
          <Link to={lp("/kontakt")} className="font-semibold whitespace-nowrap text-foreground underline underline-offset-4 transition-colors hover:text-logo-blue">{t("Fråga om volympris")}</Link>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Insikter: one article large, two beside it.                                                 */

export function BlogSection() {
  const home = useStartsida();
  const priser = usePriser();
  const { t, lp, locale } = useT();
  const list = locale === "en" ? articleListEn : articleList;
  const picks = home.blogg.picks.map((slug) => list.find((article) => article.slug === slug)).filter((a): a is (typeof articleList)[number] => Boolean(a));
  const card = "flex flex-col rounded-3xl border border-border bg-card p-8 sm:p-10";
  // As Fortnox ends a page: the guides in one card, the common questions in the other.
  return (
    <section id="blogg" className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="relative mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-2 lg:px-8">
        <div data-reveal className={card}>
          <h2 className="-ml-[0.04em] text-[1.9rem] font-extrabold leading-[1.12] text-balance sm:text-[2.2rem]">{home.blogg.heading}</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-pretty text-muted-foreground">{home.blogg.intro}</p>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {picks.map((article) => (
              <li key={article.slug}>
                <Link to={lp("/blogg/$slug")} params={{ slug: article.slug }} className="group flex min-h-14 items-center justify-between gap-4 py-3.5 font-semibold transition-colors hover:text-logo-blue">
                  <span className="text-pretty">{article.title}</span>
                  <span className="flex shrink-0 items-center gap-3 text-sm font-normal text-muted-foreground"><span className="hidden items-center gap-1 sm:inline-flex"><Clock aria-hidden className="size-3.5" />{article.minutes} {t("min")}</span><ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <Button asChild size="lg" className="home-cta"><Link to={lp("/blogg")}>{t("Alla artiklar")} <ArrowRight data-icon="end" /></Link></Button>
          </div>
        </div>
        <div data-reveal style={order(1)} className={card}>
          <h2 className="-ml-[0.04em] text-[1.9rem] font-extrabold leading-[1.12] text-balance sm:text-[2.2rem]">{t("Vanliga frågor")}</h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {priser.faq.map((item) => (
              <details key={item.question} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-md font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                  <span className="text-pretty">{item.question}</span>
                  <ChevronDown aria-hidden className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-open:rotate-180" />
                </summary>
                <p className="pb-4 leading-relaxed text-pretty text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-auto pt-8">
            <Link to={lp("/priser")} className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline">{t("Fler frågor på prissidan")} <ArrowRight aria-hidden className="size-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

