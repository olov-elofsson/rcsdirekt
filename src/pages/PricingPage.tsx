import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { useState } from "react";

import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { PageHeading } from "@/components/PageHeading";
import { PlanCard } from "@/components/PlanCard";
import type { NetworkPrice } from "@/content";
import { priser } from "@/content/priser";
import { PriceCalculator } from "@/components/HomepageSections";
import { Button } from "@/components/ui/button";
import { sectionIntro, sectionTitle } from "@/lib/typography";
import { CurrencyContext, formatPrice, priceNumber, SEK_PER_EUR, useCurrency, type Currency } from "@/lib/money";
import { cn } from "@/lib/utils";

// The price page at /priser; the route adds the head.


type FlagColors = { bg: string; cross: string; inner?: string };

const swedishFlag: FlagColors = { bg: "#006AA7", cross: "#FECC02" };

const flags: Record<string, FlagColors> = {
  SE: swedishFlag,
  NO: { bg: "#BA0C2F", cross: "#ffffff", inner: "#00205B" },
  DK: { bg: "#C8102E", cross: "#ffffff" },
  FI: { bg: "#ffffff", cross: "#003580" },
};

function Flag({ code }: { code: string }) {
  const flag = flags[code] ?? swedishFlag;
  return (
    <svg viewBox="0 0 16 12" preserveAspectRatio="xMidYMid slice" className="size-full" aria-hidden focusable="false">
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



/** Every network with its price per type, folded away under the operator tables. */
function NetworkPrices({ heading, note, networks }: { heading: string; note: string; networks: NetworkPrice[] }) {
  const currency = useCurrency();
  const cell = (price: string) => (price ? <span className="tabular-nums">{formatPrice(price, currency, { unit: false })}</span> : <span className="text-muted-foreground/60">–</span>);
  return (
    <details className="group min-w-0 overflow-hidden rounded-2xl bg-card shadow-card">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3.5 font-extrabold [&::-webkit-details-marker]:hidden">
        {heading} <span className="text-sm font-semibold text-muted-foreground">({networks.length})</span>
        <ChevronDown aria-hidden className="ml-auto size-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="border-t border-border">
        {note ? <p className="px-5 pt-4 text-sm leading-relaxed text-pretty text-muted-foreground">{note} Priser i {currency}.</p> : null}
        <div className="mt-3 max-h-[28rem] overflow-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="sticky top-0 bg-muted text-xs font-semibold text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-2.5">Nät</th>
                <th scope="col" className="px-3 py-2.5 text-right">Basic</th>
                <th scope="col" className="px-3 py-2.5 text-right">Single</th>
                <th scope="col" className="px-5 py-2.5 text-right">Conversation</th>
              </tr>
            </thead>
            <tbody>
              {networks.map((row) => (
                <tr key={row.network} className="border-t border-border">
                  <th scope="row" className="px-5 py-2.5 font-semibold">
                    {row.network}
                    {row.host ? <span className="block text-xs font-normal text-muted-foreground">Via {row.host}</span> : null}
                  </th>
                  <td className="px-3 py-2.5 text-right">{cell(row.basic)}</td>
                  <td className="px-3 py-2.5 text-right">{cell(row.single)}</td>
                  <td className="px-5 py-2.5 text-right">{cell(row.conversation)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </details>
  );
}

/** One column per RCS message type. */
type Column = { key: string; name: string; contents: string; prices: Map<string, string> };
function columnsOf(page: typeof priser) {
  const columns: Column[] = page.plans.map((plan) => ({
    key: plan.slug,
    name: plan.name.replace(/^RCS /, ""),
    contents: plan.contents,
    prices: new Map((plan.operatorPrices?.length ? plan.operatorPrices : page.operators.map((operator) => ({ operator, price: plan.price }))).map((row) => [row.operator, row.price])),
  }));
  const tableOperators = [...new Set(columns.flatMap((column) => [...column.prices.keys()]))];
  return { columns, tableOperators };
}
const lowest = (column: Column) => Math.min(...[...column.prices.values()].map(priceNumber));

/** The from-price cards: the three RCS types, the popular one on navy. */
function PlanCards() {
  const pricingPlans = priser.plans;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {pricingPlans.map((plan) => <PlanCard key={plan.slug} plan={plan} size="md" />)}
    </div>
  );
}

/** Every type side by side per operator; the lowest price in each column is marked. */
function OperatorTable() {
  const currency = useCurrency();
  const { columns, tableOperators } = columnsOf(priser);
  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] text-left">
          <caption className="sr-only">Listpris per meddelande och operatör, exklusive moms ({currency})</caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="px-5 py-4 text-sm font-semibold text-muted-foreground sm:px-6">Operatör</th>
              {columns.map((column) => (
                <th key={column.key} scope="col" className="px-4 py-4 text-right">
                  <span className="block text-sm font-extrabold">{column.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableOperators.map((operator) => (
              <tr key={operator} className="border-b border-border last:border-0">
                <th scope="row" className="px-5 py-3.5 font-semibold sm:px-6">{operator}</th>
                {columns.map((column) => {
                  const price = column.prices.get(operator);
                  const best = price ? priceNumber(price) === lowest(column) : false;
                  return (
                    <td key={column.key} className="px-4 py-3.5 text-right tabular-nums">
                      {price ? (
                        <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap", best ? "font-extrabold" : "text-foreground/80")}>
                          {best ? <span className="rounded-full bg-primary-soft px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase">Lägst</span> : null}
                          {formatPrice(price, currency, { unit: false })}
                        </span>
                      ) : (
                        <span className="text-muted-foreground/60">–</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** The market the prices apply to; other countries and currencies are listed as coming. */
function MarketBar({ currency, onCurrency }: { currency: Currency; onCurrency: (currency: Currency) => void }) {
  const { countries: pricingCountries, currencies: pricingCurrencies } = priser;
  const select = "h-10 cursor-pointer appearance-none rounded-full border border-input bg-background text-sm font-semibold text-foreground transition-colors hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 overflow-hidden rounded-full outline outline-1 -outline-offset-1 outline-black/10"><Flag code="SE" /></span>
        <select aria-label="Välj land" defaultValue="SE" className={cn(select, "pl-10 pr-9")}>
          {pricingCountries.map((country) => (
            <option key={country.code} value={country.code} disabled={!country.available}>{country.available ? country.name : `${country.name} (kommer snart)`}</option>
          ))}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </span>
      <span className="relative">
        <select aria-label="Välj valuta" value={currency} onChange={(event) => onCurrency(event.target.value as Currency)} className={cn(select, "pl-4 pr-9")}>
          {pricingCurrencies.map((option) => (
            <option key={option.code} value={option.code} disabled={!selectable(option)}>{selectable(option) ? option.code : `${option.code} (kommer snart)`}</option>
          ))}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </span>
    </div>
  );
}

/** SEK and EUR can always be shown, EUR as the supplier's list price; others follow the CMS. */
const selectable = (option: { code: string; available: boolean }) => option.available || option.code === "EUR";

export function PricingPage() {
  const page = priser;
  const [currency, setCurrency] = useState<Currency>("SEK");
  const inCurrency = (text: string) => text.split("SEK").join(currency);
  return (
    <CurrencyContext.Provider value={currency}>
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main id="innehall" tabIndex={-1} className="outline-none">
        <PageHeading title={page.heading} description={<p>{page.intro}</p>}>
          <MarketBar currency={currency} onCurrency={setCurrency} />
        </PageHeading>

        <section className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <PlanCards />
            <p className="mt-6 text-center text-sm leading-relaxed text-pretty text-muted-foreground">
              {inCurrency(page.selectorNote)}
              {currency === "EUR" ? ` Europriserna är leverantörens listpriser. Kronpriserna är omräknade med ${SEK_PER_EUR.toLocaleString("sv-SE")} kr per euro.` : ""}
            </p>
          </div>
        </section>

        <section className="bg-primary-soft py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:px-8">
            <div>
              <h2 className={sectionTitle}>Pris per operatör</h2>
              <p className={sectionIntro}>Priset beror på vilken operatör mottagaren har. {inCurrency(page.vatNote)}</p>
            </div>
            <OperatorTable />
            {page.networks?.length ? <NetworkPrices heading={page.networksHeading || "Alla nät och priser"} note={page.networksNote ?? ""} networks={page.networks} /> : null}
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className={sectionTitle}>Räkna på ett utskick</h2>
            <p className={sectionIntro}>Välj meddelandetyp och antal. Kalkylen räknar med det lägsta listpriset.</p>
            <div className="mt-8"><PriceCalculator plans={page.plans} /></div>
          </div>
        </section>

        <section className="bg-ink py-16 text-ink-foreground sm:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className={sectionTitle}>{page.includedHeading}</h2>
            <ul className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.included.map((item) => (
                <li key={item} className="flex items-center gap-3 font-semibold">
                  <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-full bg-logo-blue text-white"><Check strokeWidth={3} className="size-3.5" /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
            <div>
              <h2 className={sectionTitle}>{page.faqHeading}</h2>
              <p className={sectionIntro}>{page.volumeText}</p>
              <Button asChild size="lg" className="mt-8"><Link to="/kontakt">Fråga om volympris <ArrowRight data-icon="end" /></Link></Button>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {page.faq.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-md font-bold outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 [&::-webkit-details-marker]:hidden">
                    <span className="text-pretty">{item.question}</span>
                    <ChevronDown aria-hidden className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 leading-relaxed text-pretty text-muted-foreground">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
    </CurrencyContext.Provider>
  );
}
