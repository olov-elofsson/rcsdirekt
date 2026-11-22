import { useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BadgeCheck, BarChart3, BellOff, Check, CheckCheck, Clock, Download, IdCard, Image as ImageIcon, MessageSquareReply, MousePointerClick, Smartphone, Type, Wallet, X, type LucideIcon } from "lucide-react";

import { InquiryForm } from "@/components/InquiryForm";
import { PhoneIcon, RcsSnippet, VerifiedMark } from "@/components/RcsPhone";
import { rcsDirektSender } from "@/data/rcs-sender";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { articleList } from "@/content/article-list";
import { priser } from "@/content/priser";
import { startsida } from "@/content/startsida";
import { contentIcon } from "@/content/icons";
import { sectionBody, sectionIntro, sectionTitle } from "@/lib/typography";
import { cn } from "@/lib/utils";

const home = startsida;
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

/** An icon for each property in the table, matched on the start of its label; others get none. */
const PROPERTY_ICONS: [prefix: string, Icon: LucideIcon][] = [
  ["Verifierad", BadgeCheck],
  ["Avsändarprofil", IdCard],
  ["Tecken", Type],
  ["Analys", BarChart3],
  ["Tillgänglighet", Smartphone],
  ["Bilder", ImageIcon],
  ["Installation", Download],
  ["Klickfrekvens", MousePointerClick],
  ["Läskvitton", CheckCheck],
  ["Svar", MessageSquareReply],
  ["Avregistrering", BellOff],
  ["Listpris", Wallet],
];
const propertyIcon = (label: string) => PROPERTY_ICONS.find(([prefix]) => label.startsWith(prefix))?.[1];

export function CompareSection() {
  const rows = home.jamforelse.rows.map((row) => ({ label: row.label, sms: compareValue(row.sms), rcs: compareValue(row.rcs) }));
  return (
    <section id="rcs-mot-sms" className="relative scroll-mt-24 overflow-hidden bg-primary-soft py-16 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div data-reveal>
          <h2 className={sectionTitle}>{home.jamforelse.heading}</h2>
          <p className={sectionIntro}>{home.jamforelse.intro}</p>
        </div>
        {/* On a phone three columns get too narrow, so each property becomes a row of its own
            with SMS and RCS side by side under it. */}
        <ul data-reveal style={order(1)} className={cn(sectionBody, "overflow-hidden rounded-2xl bg-card sm:hidden")}>
          <li aria-hidden className="grid grid-cols-2 gap-2 px-4 pt-4 pb-1">
            <span className="px-3 text-xs font-semibold text-muted-foreground">SMS</span>
            <span className="px-3 font-display text-sm font-extrabold text-foreground">RCS</span>
          </li>
          {rows.map((item) => {
            const Icon = propertyIcon(item.label);
            return (
              <li key={item.label} className="border-t border-border px-4 py-4 first-of-type:border-t-0 [&:nth-child(2)]:border-t-0">
                <p className="flex items-center gap-2.5 text-sm font-semibold">
                  {Icon ? <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary-soft text-logo-blue"><Icon strokeWidth={2} className="size-4" /></span> : null}
                  {item.label}
                </p>
                <dl className="mt-3 grid grid-cols-2 gap-2">
                  <div className="flex min-h-11 items-center rounded-xl px-3 py-2">
                    <dt className="sr-only">SMS</dt>
                    <dd><Fact value={item.sms} rcs={false} /></dd>
                  </div>
                  <div className="flex min-h-11 items-center rounded-xl bg-primary-soft px-3 py-2">
                    <dt className="sr-only">RCS</dt>
                    <dd><Fact value={item.rcs} rcs /></dd>
                  </div>
                </dl>
              </li>
            );
          })}
        </ul>
        <div data-reveal style={order(1)} className={cn(sectionBody, "hidden overflow-hidden rounded-2xl bg-card sm:block")}>
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
                  <th scope="row" className="px-5 py-4 text-sm font-semibold leading-snug text-pretty sm:px-8 sm:text-[15px]">
                    <span className="flex items-center gap-3">
                      {(() => {
                        const Icon = propertyIcon(item.label);
                        return Icon ? <span aria-hidden className="hidden size-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-logo-blue sm:grid"><Icon strokeWidth={2} className="size-[18px]" /></span> : null;
                      })()}
                      {item.label}
                    </span>
                  </th>
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

const BUTTON_KINDS = [
  { id: "open", label: "Öppnar länk", icon: "open" },
  { id: "call", label: "Ringer", icon: "call" },
  { id: "reply", label: "Svar", icon: null },
] as const;

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-transparent bg-muted px-3 py-2 text-sm font-normal leading-snug text-foreground outline-none transition-[border-color,background-color] duration-150 placeholder:text-muted-foreground/70 focus:border-logo-blue focus:bg-background";

/**
 * The web tool, reduced to a card editor the visitor can use: what is typed in the fields shows
 * at once in the message beside them, the way it reaches the customer. A sketch of how such an
 * editor works, not one product; nothing is sent.
 */
function WebSketch() {
  const banner = rcsDirektSender.profile.banner;
  const [title, setTitle] = useState("Ert första utskick");
  const [body, setBody] = useState("Skriv här, så ser ni direkt hur kortet ser ut hos kunden.");
  const [button, setButton] = useState("Läs mer");
  const [kind, setKind] = useState<(typeof BUTTON_KINDS)[number]["id"]>("open");
  const [sent, setSent] = useState(0);
  const icon = BUTTON_KINDS.find((item) => item.id === kind)?.icon;
  const edit = (set: (value: string) => void) => (event: { target: { value: string } }) => {
    set(event.target.value);
    setSent(0);
  };
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-background text-left shadow-card">
      <div className="flex flex-1 flex-col p-2.5">
        {/* The message alone, without a phone around it: the sender line and the card, above the editor. */}
        {/* The preview sits inset in the editor's white card, so the two halves read as one tool. */}
        <div className="relative flex flex-col items-center justify-center gap-3 rounded-[calc(var(--radius-xl)-0.375rem)] bg-muted px-4 pt-10 pb-5">
          <span className="absolute top-3 left-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <span aria-hidden className="size-1.5 rounded-full bg-logo-blue" />Förhandsvisning
          </span>
          <div aria-live="polite" className="flex w-full justify-center">
            <RcsSnippet width={300} scale={0.8}>
              <SenderLine name={rcsDirektSender.sender} verified />
              <div className="card">
                <img src={banner} alt="" />
                <div className="ct">{title || "Rubrik"}</div>
                {body ? <div className="cb">{body}</div> : null}
                {button ? (
                  <div className="cbtns">
                    <div className="cbtn">
                      {icon ? <span className="ci"><PhoneIcon name={icon} size={18} /></span> : null}
                      {button}
                    </div>
                  </div>
                ) : null}
              </div>
            </RcsSnippet>
          </div>
          <p className={cn("flex h-5 items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-opacity duration-200", sent ? "opacity-100" : "opacity-0")}>
            <CheckCheck aria-hidden className="size-4 text-logo-blue" /> Testutskick levererat
          </p>
        </div>
        <form
          className="grid flex-1 gap-4 px-3 pt-5 pb-3 sm:grid-cols-2 sm:px-4"
          onSubmit={(event) => {
            event.preventDefault();
            setSent((count) => count + 1);
          }}
        >
          <p className="font-display text-base font-extrabold sm:col-span-2">Nytt utskick</p>
          <label className="block text-xs font-semibold text-muted-foreground">
            Rubrik
            <input value={title} onChange={edit(setTitle)} maxLength={60} className={fieldClass} />
          </label>
          <label className="block text-xs font-semibold text-muted-foreground sm:row-span-2">
            Text
            <textarea value={body} onChange={edit(setBody)} maxLength={160} rows={4} className={cn(fieldClass, "resize-none")} />
          </label>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground">
              Knapp
              <input value={button} onChange={edit(setButton)} maxLength={25} className={fieldClass} />
            </label>
            <div role="radiogroup" aria-label="Vad knappen gör" className="mt-2 flex flex-wrap gap-1.5">
              {BUTTON_KINDS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={kind === item.id}
                  onClick={() => { setKind(item.id); setSent(0); }}
                  className={cn(
                    "inline-flex h-8 items-center rounded-full px-3 text-xs font-semibold transition-[background-color,color,scale] duration-150 ease-out active:scale-[0.96]",
                    kind === item.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end justify-end sm:col-span-2">
            <Button type="submit" size="sm">Skicka test</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

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
  const step = "flex items-center gap-2 text-[11px] font-semibold tracking-[0.06em] text-ink-muted uppercase";
  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-xl bg-ink text-left shadow-card">
      <figcaption className="flex items-center justify-between border-b border-ink-foreground/10 px-4 py-2.5 text-xs text-ink-muted">
        <span className="flex items-center gap-2 font-semibold text-ink-foreground">
          <span className="rounded bg-ink-foreground/15 px-1.5 py-0.5 font-mono text-[11px]">POST</span>
          <span className="font-mono">/messages</span>
        </span>
        <span>Förenklat exempel</span>
      </figcaption>
      <div className="flex-1 px-5 pt-4">
        <p className={step}>1 Anrop</p>
        <pre className="mt-2 overflow-x-auto text-[12.5px] leading-relaxed"><JsonCode code={API_REQUEST} /></pre>
      </div>
      <div className="border-t border-ink-foreground/10 px-5 py-3">
        <p className={step}>2 Svar <span className="rounded bg-ink-foreground/15 px-1.5 py-0.5 font-mono normal-case tracking-normal text-ink-foreground">202</span></p>
        <pre className="mt-2 overflow-x-auto text-[12.5px] leading-relaxed"><JsonCode code={API_RESPONSE} /></pre>
      </div>
      <div className="border-t border-ink-foreground/10 px-5 py-3">
        <p className={step}>3 Händelser via webhook</p>
        <ol className="mt-2 grid gap-1.5 text-[12.5px] text-ink-muted">
          {API_EVENTS.map(([time, status, detail]) => (
            <li key={status} className="flex items-center gap-3">
              <span className="font-mono tabular-nums text-ink-muted/80">{time}</span>
              <span className="rounded-full bg-ink-foreground/10 px-2 py-0.5 font-mono text-[11.5px] text-ink-foreground">{status}</span>
              <span className="truncate">{detail}</span>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}

export function WaysSection() {
  const [web, api] = home.vagar.items;
  const visual: Record<number, ReactNode> = { 0: <WebSketch />, 1: <ApiSketch /> };
  return (
    <section id="vad-ar-rcs" className="relative scroll-mt-24 overflow-hidden bg-background py-16 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div data-reveal>
          <h2 className={sectionTitle}>{home.vagar.heading}</h2>
          <p className={sectionIntro}>{home.vagar.intro}</p>
        </div>
        {/* The cards share rows (subgrid), so both visuals start and end at the same height. */}
        <div className={cn(sectionBody, "grid gap-6 lg:grid-cols-2 lg:grid-rows-[auto_1fr]")}>
          {[web, api].filter(Boolean).map((item, index) => (
            <div key={item!.title} data-reveal style={order(index)} className="flex min-w-0 flex-col gap-6 rounded-2xl bg-primary-soft p-5 sm:p-8 lg:row-span-2 lg:grid lg:grid-rows-subgrid">
              <div>
                {(() => {
                  const Icon = contentIcon(item!.icon);
                  return <span aria-hidden className="mb-5 grid size-11 place-items-center rounded-xl bg-card text-logo-blue shadow-card"><Icon strokeWidth={2} className="size-5" /></span>;
                })()}
                <h3 className="text-2xl font-extrabold">{item!.title}</h3>
                <p className="mt-2 max-w-md text-base leading-relaxed text-pretty text-muted-foreground">{item!.copy}</p>
              </div>
              <div className="h-full">{visual[index]}</div>
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
export function PriceCalculator({ plans }: { plans: typeof priser.plans }) {
  const [planIndex, setPlanIndex] = useState(() => Math.max(0, plans.findIndex((plan) => plan.badge)));
  const [count, setCount] = useState(5000);
  const plan = plans[planIndex];
  if (!plan) return null;
  const unit = Number.parseFloat(plan.price.replace(/[^\d,]/g, "").replace(",", "."));
  if (!Number.isFinite(unit)) return null;
  const countId = "kalkyl-antal";
  return (
    <div data-reveal className="grid gap-8 rounded-2xl bg-primary-soft p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
      <div>
        <h3 className="text-xl font-extrabold">Priskalkyl</h3>
        <div role="group" aria-label="Meddelandetyp" className="mt-4 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
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
          <label htmlFor={countId} className="text-sm font-semibold">Antal meddelanden</label>
          <input
            type="number"
            inputMode="numeric"
            aria-label="Antal meddelanden"
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
          aria-valuetext={`${sek(count)} meddelanden`}
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
  const plans = priser.plans;
  return (
    <section id="pris" className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
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
                  {plan.badge ? <span className="rounded-full bg-ink-foreground px-2.5 py-0.5 text-xs font-semibold text-ink">{plan.badge}</span> : null}
                </div>
                {/* Price right under the name, so the three prices line up; when to pick it under that. */}
                <p className="mt-5 flex items-baseline gap-1.5">
                  <span className={cn("text-sm font-semibold", featured ? "text-ink-muted" : "text-muted-foreground")}>från</span>
                  <span className="text-4xl font-extrabold tabular-nums">{plan.price}</span>
                </p>
                <p className={cn("mt-1 text-sm", featured ? "text-ink-muted" : "text-muted-foreground")}>listpris per meddelande</p>
                <p className={cn("mt-6 flex-1 text-sm leading-relaxed text-pretty", featured ? "text-ink-muted" : "text-muted-foreground")}>{plan.short || plan.contents}</p>
                {/* One filled action, on the lifted plan; the plan follows into the sign-up form. */}
                <div className="h-7" />
                <Button asChild size="lg" variant="outline" className={cn("w-full", featured && "border-transparent")}>
                  <Link to="/skapa-konto" search={{ plan: plan.name }}>Välj {plan.name.replace(/^RCS /, "")}</Link>
                </Button>
              </div>
            );
          })}
        </div>
        <p data-reveal className="mt-5 text-sm leading-relaxed text-pretty text-muted-foreground">
          Osäkra på vilken ni behöver?{" "}
          <Link to="/blogg/$slug" params={{ slug: "rcs-basic-single-conversation" }} className="font-semibold text-foreground underline underline-offset-4 transition-colors hover:text-logo-blue">Så skiljer sig Basic, Single och Conversation</Link>
        </p>
        <div className="mt-5"><PriceCalculator plans={plans} /></div>
        <p data-reveal className="mt-8 text-sm leading-relaxed text-pretty text-muted-foreground">
          Listpriser exklusive moms. Ert pris beror på hur många meddelanden ni skickar.{" "}
          <Link to="/" hash="kontakt" className="font-semibold whitespace-nowrap text-foreground underline underline-offset-4 transition-colors hover:text-logo-blue">Fråga om volympris</Link>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Insikter: one article large, two beside it.                                                 */

export function BlogSection() {
  const picks = home.blogg.picks.map((slug) => articleList.find((article) => article.slug === slug)).filter((a): a is (typeof articleList)[number] => Boolean(a));
  const [first, ...rest] = picks;
  return (
    <section id="blogg" className="relative overflow-hidden bg-primary-soft py-16 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div data-reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className={sectionTitle}>{home.blogg.heading}</h2>
            <p className={sectionIntro}>{home.blogg.intro}</p>
          </div>
          <Link to="/blogg" className="-my-3 inline-flex items-center gap-1.5 py-3 text-sm font-semibold underline-offset-4 transition-colors hover:text-logo-blue hover:underline">Alla artiklar <ArrowRight aria-hidden className="size-4" /></Link>
        </div>
        {first ? (
          <div className={cn(sectionBody, "grid gap-5 lg:grid-cols-[1.2fr_0.8fr]")}>
            <Link to="/blogg/$slug" params={{ slug: first.slug }} data-reveal style={order(0)} className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl bg-ink p-7 text-ink-foreground sm:p-9">
              <Badge variant="secondary" className="relative self-start bg-ink-foreground text-ink">{first.category}</Badge>
              <h3 className="relative mt-4 max-w-md text-3xl font-extrabold leading-tight">{first.title}</h3>
              <p className="relative mt-3 max-w-md leading-relaxed text-pretty text-ink-muted">{first.description}</p>
              <span className="relative mt-6 inline-flex items-center gap-2 text-sm text-ink-muted"><Clock aria-hidden className="size-4" />{first.minutes} min läsning</span>
              <span className="relative mt-3 inline-flex items-center gap-2 text-sm font-semibold">Läs artikeln <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
            </Link>
            <div className="grid gap-5">
              {rest.map((article, index) => (
                <Link key={article.slug} to="/blogg/$slug" params={{ slug: article.slug }} data-reveal style={order(index + 1)} className="group flex flex-col rounded-2xl bg-card p-6 shadow-card">
                  <Badge variant="secondary" className="self-start">{article.category}</Badge>
                  <h3 className="mt-3 text-lg font-extrabold leading-snug transition-colors group-hover:text-logo-blue">{article.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{article.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"><Clock aria-hidden className="size-3.5" />{article.minutes} min läsning</span>
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
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <div data-reveal className="lg:pt-4">
          <h2 className={sectionTitle}>{home.kontakt.heading}</h2>
          <p className={sectionIntro}>{home.kontakt.intro}</p>
        </div>
        <div data-reveal style={order(1)}>
          <InquiryForm mode="contact" />
        </div>
      </div>
    </section>
  );
}
