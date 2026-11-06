import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
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

const included = ["Verifierad avsändare med logotyp", "Webbgränssnitt och API", "Leveransrapporter och statistik", "Inga start- eller månadsavgifter", "Ingen bindningstid", "Svensk support"];

const faq = [
  { q: "Vad betalar jag för?", a: "Ni betalar bara för de meddelanden ni skickar. Priset beror på meddelandetyp, inte på antal mottagare per utskick." },
  { q: "Finns det några fasta avgifter?", a: "Nej. Det finns inga månadskostnader, startavgifter eller bindningstider." },
  { q: "Är priserna inklusive moms?", a: "Alla priser anges exklusive moms." },
  { q: "Hur räknas ett längre textmeddelande?", a: "Text över 160 tecken räknas som RCS Single." },
];

const toNumber = (price: string) => Number(price.replace(" SEK", "").replace(",", "."));
const sek = (value: number) => value.toLocaleString("sv-SE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " kr";

function PricingPage() {
  const [count, setCount] = useState(1000);
  const [planIndex, setPlanIndex] = useState(1);
  const plan = pricingPlans[planIndex] ?? pricingPlans[1];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="bg-primary-soft py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">RCS-priser för Sverige</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">Betala per skickat meddelande. Priser per operatör i Sverige, utan månadskostnader eller bindningstider.</p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto grid max-w-3xl gap-10 px-5 lg:px-8">
            <div className="overflow-hidden rounded-lg border border-border">
              {operators.map((op, i) => (
                <div key={op} className={i ? "border-t border-border" : ""}>
                  <h2 className="bg-muted px-5 py-3 text-base font-extrabold">{op}</h2>
                  {pricingPlans.map((item) => (
                    <div key={item.slug} className="flex items-center justify-between gap-4 border-t border-border px-5 py-4">
                      <div>
                        <Link to={item.slug} className="font-bold hover:underline">{item.name}</Link>
                        <span className="block text-sm text-muted-foreground">{contents[item.name]}</span>
                      </div>
                      <span className="text-lg font-extrabold whitespace-nowrap">{item.price}</span>
                    </div>
                  ))}
                </div>
              ))}
              <p className="border-t border-border bg-muted px-5 py-3 text-xs text-muted-foreground">Alla priser exklusive moms.</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-7 shadow-card">
              <h2 className="text-xl font-extrabold">Räkna på ert utskick</h2>
              <label className="mt-6 block text-sm font-bold" htmlFor="type">Meddelandetyp</label>
              <select id="type" value={planIndex} onChange={(e) => setPlanIndex(Number(e.target.value))} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3">
                {pricingPlans.map((item, i) => <option key={item.slug} value={i}>{item.name} – {item.price}</option>)}
              </select>
              <label className="mt-5 block text-sm font-bold" htmlFor="count">Antal meddelanden</label>
              <input id="count" type="number" min={0} value={count} onChange={(e) => setCount(Math.max(0, Number(e.target.value) || 0))} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3" />
              <div className="mt-6 border-t border-border pt-5">
                <p className="text-sm text-muted-foreground">Uppskattad kostnad</p>
                <p className="mt-1 text-4xl font-extrabold">{sek(count * toNumber(plan.price))}</p>
                <p className="mt-1 text-xs text-muted-foreground">exkl. moms</p>
              </div>
              <Button asChild className="mt-6 w-full"><Link to="/skapa-konto">Skapa konto <ArrowRight /></Link></Button>
            </div>
          </div>
        </section>

        <section className="bg-primary-soft py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Ingår alltid</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-3 font-semibold"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-background"><Check className="size-4" /></span>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Vanliga frågor om priser</h2>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {faq.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="cursor-pointer list-none font-bold">{item.q}</summary>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-8 text-muted-foreground">Skickar ni stora volymer? <Link to="/kontakt" className="font-bold text-foreground underline">Kontakta oss</Link> för volympris.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
