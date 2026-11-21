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
  return <span className={cn("text-[13px] font-semibold leading-snug", rcs ? "text-logo-blue" : "text-muted-foreground")}>{value}</span>;
}

export function CompareSection() {
  const rows = home.jamforelse.rows.map((row) => ({ label: row.label, sms: compareValue(row.sms), rcs: compareValue(row.rcs) }));
  return (
    <section id="rcs-mot-sms" className="relative overflow-hidden bg-primary-soft py-16 sm:py-24">
      <Wave flip fill="var(--color-background)" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div data-reveal className="max-w-2xl">
          <h2 className={sectionTitle}>{home.jamforelse.heading}</h2>
          <p className="mt-5 text-base leading-relaxed text-pretty text-muted-foreground">{home.jamforelse.intro}</p>
        </div>
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <figure data-reveal style={order(0)} className="grid gap-4 rounded-2xl bg-card p-5 sm:p-6 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-7">
              <div>
              <figcaption className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Som SMS</figcaption>
              <RcsSnippet width={260} scale={0.92}>
                <SenderLine name="72456" verified={false} />
                <div className="inrow"><div className="bubble" style={{ background: "#f0f4f9", boxShadow: "none" }}>Butiken: Din order 4821 har skickats och levereras i morgon. Spåra: https://bit.ly/3xK9q</div></div>
              </RcsSnippet>
              </div>
              <p className="text-sm leading-relaxed text-pretty text-muted-foreground lg:mt-6">Ett nummer som avsändare, ren text och en förkortad länk kunden får lita på.</p>
            </figure>
            <figure data-reveal style={order(1)} className="grid gap-4 rounded-2xl bg-card p-5 sm:p-6 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-7">
              <div>
              <figcaption className="mb-4 text-xs font-bold uppercase tracking-wider text-logo-blue">Som RCS</figcaption>
              <RcsSnippet width={260} scale={0.92}>
                <SenderLine name="Butiken" verified />
                <div className="card" style={{ background: "#f0f4f9", boxShadow: "none" }}>
                  <div className="ct">Din order är på väg</div>
                  <div className="cb">Levereras i morgon kl. 9–12.</div>
                  <div className="cbtns">
                    <div className="cbtn"><span className="ci"><PhoneIcon name="open" size={18} /></span>Spåra paketet</div>
                    <div className="cbtn"><span className="ci"><PhoneIcon name="event" size={18} /></span>Ändra tid</div>
                  </div>
                </div>
              </RcsSnippet>
              </div>
              <p className="text-sm leading-relaxed text-pretty text-muted-foreground lg:mt-6">Företagets namn med blå bock, och knappar som tar kunden rätt.</p>
            </figure>
          </div>
          <div data-reveal style={order(2)} className="rounded-2xl bg-card px-5 py-2 sm:px-7">
            <div className="grid grid-cols-[1fr_5rem_6.5rem] gap-x-3 pt-4 pb-2 text-xs font-bold uppercase tracking-wide">
              <span className="sr-only">Egenskap</span>
              <span aria-hidden />
              <span className="text-muted-foreground">SMS</span>
              <span className="text-logo-blue">RCS</span>
            </div>
            <dl className="divide-y divide-border">
              {rows.map((row) => (
                <div key={row.label} className="grid grid-cols-[1fr_5rem_6.5rem] items-center gap-x-3 py-3">
                  <dt className="text-sm font-semibold leading-snug">{row.label}</dt>
                  <dd><Fact value={row.sms} rcs={false} /></dd>
                  <dd><Fact value={row.rcs} rcs /></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Från webben eller via API: a sketch of the web tool beside a simplified API request.         */

function WebSketch() {
  return (
    <div aria-hidden className="overflow-hidden rounded-xl border border-border bg-background text-left shadow-card">
      <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-border" /><span className="size-2.5 rounded-full bg-border" /><span className="size-2.5 rounded-full bg-border" />
        <span className="ml-3 text-xs text-muted-foreground">Nytt utskick</span>
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-[1fr_0.9fr]">
        <div className="space-y-3 text-sm">
          <div><p className="text-xs font-semibold text-muted-foreground">Mottagare</p><p className="mt-1 rounded-lg border border-border px-3 py-2 font-semibold tabular-nums">1 240 kunder</p></div>
          <div><p className="text-xs font-semibold text-muted-foreground">Rubrik</p><p className="mt-1 rounded-lg border border-border px-3 py-2">Höstrea i butiken</p></div>
          <div><p className="text-xs font-semibold text-muted-foreground">Knappar</p><div className="mt-1 flex flex-wrap gap-1.5"><span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold">Se erbjudandet</span><span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold">Hitta butik</span></div></div>
          <div className="pt-1"><span className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground">Skicka</span></div>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <p className="mb-2 text-xs font-semibold text-muted-foreground">Förhandsvisning</p>
          <RcsSnippet width={220} scale={0.85}>
            <div className="card" style={{ background: "#fff", boxShadow: "none" }}>
              <div className="cimg" style={{ height: 70 }}><PhoneIcon name="image" size={28} color="#0b57d0" /></div>
              <div className="ct">Höstrea i butiken</div>
              <div className="cbtns"><div className="cbtn" style={{ background: "#f0f4f9" }}>Se erbjudandet</div></div>
            </div>
          </RcsSnippet>
        </div>
      </div>
    </div>
  );
}

const API_EXAMPLE = `{
  "to": "+46701234567",
  "card": {
    "title": "Din tid är bokad",
    "text": "Tisdag kl. 14.00 hos oss.",
    "buttons": [
      { "reply": "Bekräfta" },
      { "reply": "Boka om" }
    ]
  }
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
            <div key={item!.title} data-reveal style={order(index)} className="relative flex flex-col gap-6 overflow-hidden rounded-2xl bg-primary-soft p-6 sm:p-8">
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
/* Priser: each message type shows what it contains, as a small message.                       */

function PlanPreview({ slug }: { slug: string }) {
  if (slug === "basic")
    return (
      <RcsSnippet width={250} scale={0.82}>
        <SenderLine name="Salongen" verified />
        <div className="inrow"><div className="bubble" style={{ background: "#fff", boxShadow: "none" }}>Påminnelse: din tid är tisdag kl. 14.00. Välkommen!</div></div>
      </RcsSnippet>
    );
  if (slug === "single")
    return (
      <RcsSnippet width={250} scale={0.82}>
        <SenderLine name="Butiken" verified />
        <div className="card" style={{ background: "#fff", boxShadow: "none" }}>
          <div className="cimg" style={{ height: 64 }}><PhoneIcon name="image" size={26} color="#0b57d0" /></div>
          <div className="ct">Höstrea i butiken</div>
          <div className="cbtns"><div className="cbtn" style={{ background: "#f0f4f9" }}>Se erbjudandet</div></div>
        </div>
      </RcsSnippet>
    );
  return (
    <RcsSnippet width={250} scale={0.82}>
      <SenderLine name="Kundservice" verified />
      <div className="inrow"><div className="bubble" style={{ background: "#fff", boxShadow: "none" }}>Hur kan vi hjälpa till?</div></div>
      <div className="outrow" style={{ marginTop: 6 }}><div className="bubble" style={{ boxShadow: "none" }}>Jag vill byta storlek</div></div>
      <div className="inrow" style={{ marginTop: 6 }}><div className="bubble" style={{ background: "#fff", boxShadow: "none" }}>Klart, vilken storlek vill du ha?</div></div>
    </RcsSnippet>
  );
}

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
          <Link to="/priser" className="inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 transition-colors hover:text-logo-blue hover:underline">Priser per operatör <ArrowRight aria-hidden className="size-4" /></Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Link key={plan.slug} to="/priser" data-reveal style={order(index)} className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-card">
              <div className="relative flex min-h-[200px] items-end justify-center overflow-hidden bg-primary-soft px-5 pt-6 pb-5">
                <div className="relative">
                <PlanPreview slug={plan.slug} />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold">{plan.name}</p>
                  {plan.badge ? <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">{plan.badge}</span> : null}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{plan.contents}</p>
                <p className="mt-5 text-sm text-muted-foreground">från <span className="text-3xl font-extrabold tracking-normal tabular-nums text-foreground">{plan.price}</span></p>
                <p className="text-xs text-muted-foreground">listpris per meddelande</p>
              </div>
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
          <Link to="/blogg" className="inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 transition-colors hover:text-logo-blue hover:underline">Alla artiklar <ArrowRight aria-hidden className="size-4" /></Link>
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
            <a href="https://portal.rcsdirekt.se/login" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 transition-colors hover:text-logo-blue hover:underline">Har ni redan ett konto? Logga in <ArrowRight aria-hidden className="size-4" /></a>
          </div>
        </div>
        <div data-reveal style={order(1)}>
          <LeadForm mode="contact" />
        </div>
      </div>
    </section>
  );
}
