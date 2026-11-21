import type { CSSProperties, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, MapPin, X } from "lucide-react";

import { Wave } from "@/components/BandWave";
import { LeadForm } from "@/components/LeadForm";
import { PhoneIcon, RcsSnippet, VerifiedMark } from "@/components/RcsPhone";
import { Badge } from "@/components/ui/badge";
import { content } from "@/content";
import { articles } from "@/data/rcs-knowledge";
import { cn } from "@/lib/utils";

const home = content.startsida;
const sectionTitle = "text-[2.1rem] font-extrabold leading-tight tracking-normal sm:text-[2.65rem]";
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
  return value;
}

function Fact({ value, rcs }: { value: boolean | string; rcs: boolean }) {
  if (typeof value === "boolean")
    return value ? (
      <span className={cn("inline-flex", rcs ? "text-logo-blue" : "text-foreground")}><Check aria-hidden className="size-4.5" /><span className="sr-only">Ja</span></span>
    ) : (
      <span className="inline-flex text-muted-foreground/60"><X aria-hidden className="size-4.5" /><span className="sr-only">Nej</span></span>
    );
  return <span className={cn("text-[13px] font-semibold leading-snug", rcs ? "text-foreground" : "text-muted-foreground")}>{value}</span>;
}

export function CompareSection() {
  const rows = home.jamforelse.rows.map((row) => ({ label: row.label, sms: compareValue(row.sms), rcs: compareValue(row.rcs) }));
  return (
    <section id="rcs-mot-sms" className="relative overflow-hidden bg-primary-soft py-16 sm:py-24">
      <Wave flip fill="var(--color-background)" />
      <div className="relative mx-auto max-w-3xl px-5 lg:px-8">
        <div data-reveal className="max-w-2xl">
          <h2 className={sectionTitle}>{home.jamforelse.heading}</h2>
          <p className="mt-5 text-base leading-relaxed text-pretty text-muted-foreground">{home.jamforelse.intro}</p>
        </div>
        <div data-reveal style={order(1)} className="mt-10 rounded-2xl bg-card px-6 py-2 sm:px-8">
          <div aria-hidden className="grid grid-cols-[1fr_5rem_6.5rem] gap-x-3 pt-4 pb-1 text-xs font-semibold text-muted-foreground sm:grid-cols-[1fr_8rem_9rem]">
            <span />
            <span>SMS</span>
            <span className="text-foreground">RCS</span>
          </div>
          <dl className="divide-y divide-border">
            {rows.map((item) => (
              <div key={item.label} className="grid grid-cols-[1fr_5rem_6.5rem] items-center gap-x-3 py-3.5 sm:grid-cols-[1fr_8rem_9rem]">
                <dt className="text-sm font-semibold leading-snug">{item.label}</dt>
                <dd><Fact value={item.sms} rcs={false} /></dd>
                <dd><Fact value={item.rcs} rcs /></dd>
              </div>
            ))}
          </dl>
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
      <Wave flip fill="var(--color-primary-soft)" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div data-reveal className="max-w-2xl">
          <h2 className={sectionTitle}>{home.vagar.heading}</h2>
          <p className="mt-5 text-base leading-relaxed text-pretty text-muted-foreground">{home.vagar.intro}</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
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
/* Priser: name, what it contains and the from price. */

export function PricingSection() {
  const plans = content.priser.plans;
  return (
    // Follows "Från webben eller via API" on the same white, so it has no wave at the top.
    <section id="pris" className="relative overflow-hidden bg-background pb-16 sm:pb-24">
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div data-reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className={sectionTitle}>{home.pris.heading}</h2>
            <p className="mt-5 text-base leading-relaxed text-pretty text-muted-foreground">{home.pris.intro}</p>
          </div>
          <Link to="/priser" className="-my-3 inline-flex items-center gap-1.5 py-3 text-sm font-semibold underline-offset-4 transition-colors hover:text-logo-blue hover:underline">Priser per operatör <ArrowRight aria-hidden className="size-4" /></Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Link key={plan.slug} to="/priser" data-reveal style={order(index)} className="group flex flex-col rounded-2xl bg-card p-7 shadow-card">
              <div className="flex items-center justify-between gap-3">
                <p className="font-bold">{plan.name}</p>
                {plan.badge ? <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold">{plan.badge}</span> : null}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{plan.contents}</p>
              <p className="mt-8 text-3xl font-extrabold tracking-normal tabular-nums">{plan.price}</p>
              <p className="mt-1 text-xs text-muted-foreground">från, listpris per meddelande</p>
            </Link>
          ))}
        </div>
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
      <Wave flip fill="var(--color-background)" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div data-reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className={sectionTitle}>{home.blogg.heading}</h2>
            <p className="mt-5 text-base leading-relaxed text-pretty text-muted-foreground">{home.blogg.intro}</p>
          </div>
          <Link to="/blogg" className="-my-3 inline-flex items-center gap-1.5 py-3 text-sm font-semibold underline-offset-4 transition-colors hover:text-logo-blue hover:underline">Alla artiklar <ArrowRight aria-hidden className="size-4" /></Link>
        </div>
        {first ? (
          <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
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
/* Kontakt: who you reach beside the form.                                                     */

export function ContactSection() {
  return (
    <section id="kontakt" className="relative scroll-mt-24 overflow-hidden bg-background py-16 sm:py-24">
      <Wave flip fill="var(--color-primary-soft)" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <div data-reveal className="lg:pt-4">
          <h2 className={sectionTitle}>{home.kontakt.heading}</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-muted-foreground">{home.kontakt.intro}</p>
          <div className="relative mt-8 overflow-hidden rounded-2xl bg-primary-soft p-6">
            <p className="font-display text-lg font-extrabold">RCS Direkt</p>
            <p className="mt-1 text-sm text-muted-foreground">En tjänst från WIGOSE AB</p>
            <p className="mt-4 flex items-start gap-2 text-sm"><MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-logo-blue" />Klostergatan 15, 703 39 Örebro</p>
            <a href="https://portal.rcsdirekt.se/login" className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold underline-offset-4 transition-colors hover:text-logo-blue hover:underline">Har ni redan ett konto? Logga in <ArrowRight aria-hidden className="size-4" /></a>
          </div>
        </div>
        <div data-reveal style={order(1)}>
          <LeadForm mode="contact" />
        </div>
      </div>
    </section>
  );
}
