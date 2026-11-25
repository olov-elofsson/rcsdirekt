import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { priser } from "@/content/priser";
import { sectionTitle } from "@/lib/typography";
import { formatPrice, formatTotal, unitPrice, useCurrency } from "@/lib/money";
import { cn } from "@/lib/utils";


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
  // On a phone the example starts cut short, with a way to see all of it.
  const [whole, setWhole] = useState(false);
  const step = "flex items-center gap-2 text-[11px] font-semibold tracking-[0.06em] text-ink-muted uppercase";
  return (
    <figure className={cn("relative flex h-full flex-col overflow-hidden rounded-xl bg-ink text-left shadow-card", !whole && "max-sm:max-h-[24rem]")}>
      {!whole ? (
        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-ink via-ink/90 to-transparent pt-16 pb-4 sm:hidden">
          <Button type="button" variant="outline" size="sm" onClick={() => setWhole(true)}>Visa hela exemplet</Button>
        </div>
      ) : null}
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

/* ------------------------------------------------------------------------------------------ */
/* Priser: name, what it contains, the from price and a way to start. */

/** The total, counted up or down to the new value; screen readers get only the final figure. */
function GlidingTotal({ value, currency }: { value: number; currency: "SEK" | "EUR" }) {
  const tag = "sv-SE";
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
  const plan = plans[planIndex];
  if (!plan) return null;
  // The total uses the same rounded unit price the line under it shows, also in EUR.
  const unit = unitPrice(plan.price, currency);
  if (!Number.isFinite(unit)) return null;
  const countId = "kalkyl-antal";
  const total = unit * count;
  const number = (value: number) => value.toLocaleString("sv-SE");
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
          aria-valuetext={`${number(count)} meddelanden`}
          className="mt-3 h-11 w-full cursor-pointer accent-primary"
        />
      </div>
      <div className="lg:min-w-64 lg:text-right">
        <p className="text-sm text-muted-foreground">Listpris från</p>
        <GlidingTotal value={total} currency={currency} />
        <p className="mt-1 text-sm text-muted-foreground">exkl. moms, {number(count)} × {formatPrice(plan.price, currency)}</p>
      </div>
    </div>
  );
}

/** Common questions as a plain accordion, the way pricing pages answer them. From the CMS. */
export function FaqSection() {
  return (
    <section id="fragor" className="relative overflow-hidden bg-muted py-16 sm:py-24">
      {/* Heading and the way to ask on the left, the questions on the right; stacked on phones. */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:px-8">
        <div data-reveal>
          <h2 className={sectionTitle}>Vanliga frågor</h2>
          <p className="mt-4 text-base text-muted-foreground">Hittar ni inte svaret? <Link to="/kontakt" className="font-semibold text-foreground underline underline-offset-4 hover:text-logo-blue">Kontakta oss</Link></p>
        </div>
        <div data-reveal className="divide-y divide-border rounded-2xl border border-border bg-card px-6 sm:px-8">
          {priser.faq.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                <span className="text-pretty">{item.question}</span>
                <ChevronDown aria-hidden className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-open:rotate-180" />
              </summary>
              <p className="pb-5 leading-relaxed text-pretty text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

