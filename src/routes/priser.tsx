import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { pricingPlans } from "@/data/pricing-plans";

const title = "RCS-priser i Sverige – betala per meddelande";
const description = "Priser för RCS i Sverige: Basic 0,30 SEK, Single 0,425 SEK och Conversation 0,63 SEK per meddelande. Inga månadskostnader eller bindningstider.";

export const Route = createFileRoute("/priser")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rcsdirekt.se/priser" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/priser" }],
  }),
  component: PricingPage,
});

const contents: Record<string, string> = {
  "RCS Basic": "Text upp till 160 tecken",
  "RCS Single": "Bild, video, karusell och knappar",
  "RCS Conversation": "Tvåvägsdialog i 24 timmar",
};

const operators = ["Telia", "Tele2", "Telenor", "Tre"];

const countries = [
  { code: "SE", name: "Sverige", available: true },
  { code: "NO", name: "Norge", available: false },
  { code: "DK", name: "Danmark", available: false },
  { code: "FI", name: "Finland", available: false },
];

const currencies = [
  { code: "SEK", name: "Svensk krona", available: true },
  { code: "EUR", name: "Euro", available: false },
  { code: "NOK", name: "Norsk krona", available: false },
  { code: "DKK", name: "Dansk krona", available: false },
];

const flags: Record<string, { bg: string; cross: string; inner?: string }> = {
  SE: { bg: "#006AA7", cross: "#FECC02" },
  NO: { bg: "#BA0C2F", cross: "#ffffff", inner: "#00205B" },
  DK: { bg: "#C8102E", cross: "#ffffff" },
  FI: { bg: "#ffffff", cross: "#003580" },
};

function Flag({ code }: { code: string }) {
  const flag = flags[code] ?? flags.SE;
  return (
    <svg viewBox="0 0 16 12" className="size-full" aria-hidden focusable="false">
      <rect width="16" height="12" fill={flag.bg} />
      <rect x="4.4" width="2.4" height="12" fill={flag.cross} />
      <rect y="4.8" width="16" height="2.4" fill={flag.cross} />
      {flag.inner ? (
        <>
          <rect x="5" width="1.2" height="12" fill={flag.inner} />
          <rect y="5.4" width="16" height="1.2" fill={flag.inner} />
        </>
      ) : null}
    </svg>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-bold">{label}</span>
      <span className="relative mt-2 block">{children}</span>
    </label>
  );
}

const included = ["Verifierad avsändare med logotyp", "Webbgränssnitt och API", "Leveransrapporter och statistik", "Inga start- eller månadsavgifter", "Ingen bindningstid", "Svensk support"];

const faq = [
  { q: "Vad betalar jag för?", a: "Ni betalar bara för de meddelanden ni skickar. Priset beror på meddelandetyp, inte på antal mottagare per utskick." },
  { q: "Finns det några fasta avgifter?", a: "Nej. Det finns inga månadskostnader, startavgifter eller bindningstider." },
  { q: "Är priserna inklusive moms?", a: "Alla priser anges exklusive moms." },
  { q: "Hur räknas ett längre textmeddelande?", a: "Text över 160 tecken räknas som RCS Single." },
];


function PricingPage() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-background py-16 sm:py-24">
          <div aria-hidden className="heading-glow pointer-events-none absolute inset-x-0 top-0 h-96" />
          <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
            <h1 className="mx-auto max-w-3xl text-center text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">RCS-priser för Sverige</h1>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground sm:text-xl">Betala per skickat meddelande. Priser per operatör i Sverige, utan månadskostnader eller bindningstider.</p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto grid max-w-3xl gap-10 px-5 lg:px-8">
            <div className="space-y-8">
              {pricingPlans.map((item) => (
                <div key={item.slug} className="overflow-hidden rounded-lg border border-border">
                  <div className="bg-muted px-5 py-4">
                    <span className="text-base font-extrabold">{item.name}</span>
                    <span className="block text-sm text-muted-foreground">{contents[item.name]}</span>
                  </div>
                  {operators.map((op) => (
                    <div key={op} className="flex items-center justify-between gap-4 border-t border-border px-5 py-3.5">
                      <span className="font-semibold">{op}</span>
                      <span className="font-extrabold whitespace-nowrap">{item.price}</span>
                    </div>
                  ))}
                </div>
              ))}
              <p className="text-center text-xs text-muted-foreground">Alla priser exklusive moms.</p>
            </div>

          </div>
        </section>

        <section className="relative overflow-hidden bg-background py-16 sm:py-24">
          <div aria-hidden className="heading-glow pointer-events-none absolute inset-x-0 top-0 h-80" />
          <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
            <h2 className="text-center text-3xl font-extrabold sm:text-4xl">Ingår alltid</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-3 font-semibold"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary-soft ring-1 ring-border/60"><Check className="size-4" /></span>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <h2 className="text-center text-3xl font-extrabold sm:text-4xl">Vanliga frågor om priser</h2>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {faq.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="cursor-pointer list-none font-bold">{item.q}</summary>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-8 text-center text-muted-foreground">Skickar ni stora volymer? <a href="/#kontakt" className="font-bold text-foreground underline">Kontakta oss</a> för volympris.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
