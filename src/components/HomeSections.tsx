import { useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, X } from "lucide-react";

import { LeadForm } from "@/components/LeadForm";
import { PhoneIcon, RcsSnippet, VerifiedMark } from "@/components/RcsPhone";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { content } from "@/content";
import { articles } from "@/data/rcs-knowledge";
import { sectionBody, sectionIntro, sectionTitle } from "@/lib/typography";
import { cn } from "@/lib/utils";

const home = content.startsida;
// -0.05em: Archivo has about 0.07em of space before straight capitals, the body text far less,
// so a left-aligned heading would look indented next to the text under it.
const order = (index: number) => ({ "--reveal-order": index }) as CSSProperties;

/** A sender line above a message on a light background, as the chat list shows it. */
function SenderLine({ name, verified }: { name: string; verified: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", fontSize: 13, fontWeight: 500, color: "#444746", marginBottom: 6 }}>
      {name}
      {verified ? <VerifiedMark size={15} /> : null}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* RCS och SMS: the same notice as an SMS and as RCS, beside the facts that differ.            */

function compareValue(value: string): boolean | string {
  if (value.trim() === "✓") return true;
  if (value.trim() === "✗") return false;
  // A no-break space inside numbers like "4 000", so a narrow column never splits them.
  return value.replace(/(\d) (?=\d)/g, "$1\u00a0");
}

function Fact({ value, rcs }: { value: boolean | string; rcs: boolean }) {
  if (typeof value === "boolean")
    return value ? (
      <span className={cn("inline-flex", rcs ? "text-logo-blue" : "text-foreground")}><Check aria-hidden className="size-5" /><span className="sr-only">Ja</span></span>
    ) : (
      <span className="inline-flex text-muted-foreground/60"><X aria-hidden className="size-5" /><span className="sr-only">Nej</span></span>
    );
  return <span className={cn("text-sm leading-snug text-pretty sm:text-[15px]", rcs ? "font-semibold text-foreground" : "text-muted-foreground")}>{value}</span>;
}

export function CompareSection() {
  const rows = home.jamforelse.rows.map((row) => ({ label: row.label, sms: compareValue(row.sms), rcs: compareValue(row.rcs) }));
  return (
    <section id="rcs-mot-sms" className="relative overflow-hidden bg-primary-soft py-16 sm:py-24">
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div data-reveal>
          <h2 className={sectionTitle}>{home.jamforelse.heading}</h2>
          <p className={sectionIntro}>{home.jamforelse.intro}</p>
        </div>
        <div data-reveal style={order(1)} className={cn(sectionBody, "overflow-hidden rounded-2xl bg-card")}>
          <table className="w-full table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[38%]" />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="px-5 py-4 sm:px-8"><span className="sr-only">Egenskap</span></th>
                <th scope="col" className="px-3 py-4 text-sm font-semibold text-muted-foreground sm:px-6">SMS</th>
                <th scope="col" className="bg-ink px-3 py-4 font-display text-base font-extrabold text-ink-foreground sm:px-6">RCS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.label} className="border-t border-border">
                  <th scope="row" className="px-5 py-4 text-sm font-semibold leading-snug text-pretty sm:px-8 sm:text-[15px]">{item.label}</th>
                  <td className="px-3 py-4 sm:px-6"><Fact value={item.sms} rcs={false} /></td>
                  <td className="bg-muted px-3 py-4 sm:px-6"><Fact value={item.rcs} rcs /></td>
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

/** The web tool, reduced to what matters: who receives it and what they see. */
function WebSketch() {
  return (
    <div aria-hidden className="rounded-xl bg-background p-5 text-left">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">Nytt utskick</span>
        <span className="text-muted-foreground tabular-nums">1 240 mottagare</span>
      </div>
      <div className="mt-4 flex justify-center rounded-lg bg-muted py-5">
        <RcsSnippet width={220} scale={0.9}>
          <div className="card" style={{ background: "#fff", boxShadow: "none" }}>
            <div className="ct">Höstrea i butiken</div>
            <div className="cb">Upp till halva priset i helgen.</div>
            <div className="cbtns"><div className="cbtn" style={{ background: "#f0f4f9" }}>Se erbjudandet</div></div>
          </div>
        </RcsSnippet>
      </div>
      <div className="mt-4 flex justify-end"><span className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground">Skicka</span></div>
    </div>
  );
}

const API_EXAMPLE = `{
  "to": "+46701234567",
  "text": "Din tid är bokad tisdag kl. 14.00.",
  "buttons": ["Bekräfta", "Boka om"]
}`;

function ApiSketch() {
  return (
    <figure className="overflow-hidden rounded-xl bg-ink text-left shadow-card">
      <figcaption className="flex items-center justify-between border-b border-ink-foreground/10 px-4 py-2.5 text-xs text-ink-muted">
        <span className="font-semibold text-ink-foreground">Ett meddelande via API</span>
        <span>Förenklat exempel</span>
      </figcaption>
      <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed text-ink-foreground"><code>{API_EXAMPLE}</code></pre>
    </figure>
  );
}

export function WaysSection() {
  const [web, api] = home.vagar.items;
  const visual: Record<number, ReactNode> = { 0: <WebSketch />, 1: <ApiSketch /> };
  return (
    <section id="vad-ar-rcs" className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div data-reveal>
          <h2 className={sectionTitle}>{home.vagar.heading}</h2>
          <p className={sectionIntro}>{home.vagar.intro}</p>
        </div>
        <div className={cn(sectionBody, "grid gap-6 lg:grid-cols-2")}>
          {[web, api].filter(Boolean).map((item, index) => (
            <div key={item!.title} data-reveal style={order(index)} className="flex flex-col gap-6 rounded-2xl bg-primary-soft p-6 sm:p-8">
              <div>
                <h3 className="text-2xl font-extrabold">{item!.title}</h3>
                <p className="mt-2 max-w-md text-base leading-relaxed text-pretty text-muted-foreground">{item!.copy}</p>
              </div>
              <div className="mt-auto">{visual[index]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Priser: name, what it contains, the from price and a way to start. */

const sek = (value: number, digits = 0) =>
  value.toLocaleString("sv-SE", { minimumFractionDigits: digits, maximumFractionDigits: digits });

/** The list price for a number of messages: the plan's from price times the count, nothing else. */
function PriceCalculator({ plans }: { plans: typeof content.priser.plans }) {
  const [planIndex, setPlanIndex] = useState(() => Math.max(0, plans.findIndex((plan) => plan.badge)));
  const [count, setCount] = useState(5000);
  const plan = plans[planIndex];
  if (!plan) return null;
  const unit = Number.parseFloat(plan.price.replace(/[^\d,]/g, "").replace(",", "."));
  if (!Number.isFinite(unit)) return null;
  const countId = "kalkyl-antal";
  return (
    <div data-reveal className="mt-5 grid gap-8 rounded-2xl bg-primary-soft p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
      <div>
        <h3 className="text-xl font-extrabold">Priskalkyl</h3>
        <div role="group" aria-label="Meddelandetyp" className="mt-4 flex flex-wrap gap-2">
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
              {option.name}
            </button>
          ))}
        </div>
        <label htmlFor={countId} className="mt-6 flex items-baseline justify-between gap-4 text-sm font-semibold">
          Antal meddelanden <span className="font-display text-lg font-extrabold tabular-nums">{sek(count)}</span>
        </label>
        <input
          id={countId}
          type="range"
          min={500}
          max={50000}
          step={500}
          value={count}
          onChange={(event) => setCount(Number(event.target.value))}
          className="mt-3 h-11 w-full cursor-pointer accent-primary"
        />
      </div>
      <div className="lg:min-w-64 lg:text-right" aria-live="polite">
        <p className="text-sm text-muted-foreground">Listpris från</p>
        <p className="mt-1 text-4xl font-extrabold tabular-nums">{sek(unit * count)} SEK</p>
        <p className="mt-1 text-sm text-muted-foreground">exkl. moms, {sek(count)} × {plan.price}</p>
      </div>
    </div>
  );
}

export function PricingSection() {
  const plans = content.priser.plans;
  return (
    <section id="pris" className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div data-reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className={sectionTitle}>{home.pris.heading}</h2>
            <p className={sectionIntro}>{home.pris.intro}</p>
          </div>
          <Link to="/priser" className="-my-3 inline-flex items-center gap-1.5 py-3 text-sm font-semibold underline-offset-4 transition-colors hover:text-logo-blue hover:underline">Priser per operatör <ArrowRight aria-hidden className="size-4" /></Link>
        </div>
        <div className={cn(sectionBody, "grid gap-5 md:grid-cols-3")}>
          {plans.map((plan, index) => {
            // The plan with a badge ("Populärast") is the one to lift out, on the navy surface.
            const featured = Boolean(plan.badge);
            return (
              <div key={plan.slug} data-reveal style={order(index)} className={cn("flex flex-col rounded-2xl p-7 sm:p-8", featured ? "bg-ink text-ink-foreground" : "bg-card shadow-card")}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-extrabold">{plan.name}</h3>
                  {plan.badge ? <span className="rounded-full bg-logo-blue px-2.5 py-0.5 text-xs font-semibold text-white">{plan.badge}</span> : null}
                </div>
                <p className={cn("mt-1.5 text-sm leading-relaxed text-pretty", featured ? "text-ink-muted" : "text-muted-foreground")}>{plan.contents}</p>
                <p className="mt-8 flex items-baseline gap-1.5">
                  <span className={cn("text-sm font-semibold", featured ? "text-ink-muted" : "text-muted-foreground")}>från</span>
                  <span className="text-4xl font-extrabold tabular-nums">{plan.price}</span>
                </p>
                <p className={cn("mt-1 text-sm", featured ? "text-ink-muted" : "text-muted-foreground")}>listpris per meddelande</p>
                <Button asChild size="lg" variant={featured ? "outline" : "default"} className={cn("mt-8 w-full", featured && "border-transparent")}>
                  <Link to="/skapa-konto">Skapa konto</Link>
                </Button>
              </div>
            );
          })}
        </div>
        <PriceCalculator plans={plans} />
        <p data-reveal className="mt-8 text-sm leading-relaxed text-pretty text-muted-foreground">
          Listpriser exklusive moms. Ert pris beror på hur många meddelanden ni skickar.{" "}
          <Link to="/" hash="kontakt" className="font-semibold whitespace-nowrap text-foreground underline underline-offset-4 transition-colors hover:text-logo-blue">Fråga om volympris</Link>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Guider: one article large, two beside it.                                                   */

export function BlogSection() {
  const picks = home.blogg.picks.map((slug) => articles.find((article) => article.slug === slug)).filter((a): a is (typeof articles)[number] => Boolean(a));
  const [first, ...rest] = picks;
  return (
    <section id="blogg" className="relative overflow-hidden bg-primary-soft py-16 sm:py-24">
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div data-reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className={sectionTitle}>{home.blogg.heading}</h2>
            <p className={sectionIntro}>{home.blogg.intro}</p>
          </div>
          <Link to="/blogg" className="-my-3 inline-flex items-center gap-1.5 py-3 text-sm font-semibold underline-offset-4 transition-colors hover:text-logo-blue hover:underline">Alla artiklar <ArrowRight aria-hidden className="size-4" /></Link>
        </div>
        {first ? (
          <div className={cn(sectionBody, "grid gap-5 lg:grid-cols-[1.2fr_0.8fr]")}>
            <Link to="/blogg/$slug" params={{ slug: first.slug }} data-reveal style={order(0)} className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl bg-ink p-7 text-ink-foreground sm:p-9">
              <Badge variant="secondary" className="relative self-start bg-ink-foreground text-ink">{first.category}</Badge>
              <h3 className="relative mt-4 max-w-md text-3xl font-extrabold leading-tight">{first.title}</h3>
              <p className="relative mt-3 max-w-md leading-relaxed text-pretty text-ink-muted">{first.description}</p>
              <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold">Läs artikeln <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
            </Link>
            <div className="grid gap-5">
              {rest.map((article, index) => (
                <Link key={article.slug} to="/blogg/$slug" params={{ slug: article.slug }} data-reveal style={order(index + 1)} className="group flex flex-col rounded-2xl bg-card p-6 shadow-card">
                  <Badge variant="secondary" className="self-start">{article.category}</Badge>
                  <h3 className="mt-3 text-lg font-extrabold leading-snug transition-colors group-hover:text-logo-blue">{article.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{article.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Kontakt: the heading beside the form.                                                        */

export function ContactSection() {
  return (
    <section id="kontakt" className="relative scroll-mt-24 overflow-hidden bg-background py-16 sm:py-24">
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <div data-reveal className="lg:pt-4">
          <h2 className={sectionTitle}>{home.kontakt.heading}</h2>
          <p className={sectionIntro}>{home.kontakt.intro}</p>
        </div>
        <div data-reveal style={order(1)}>
          <LeadForm mode="contact" />
        </div>
      </div>
    </section>
  );
}
