import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronDown } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { PageHeading } from "@/components/PageHeading";
import { priser } from "@/content/priser";
import type { NetworkPrice } from "@/content";
import { PriceCalculator } from "@/components/HomepageSections";
import { Button } from "@/components/ui/button";
import { sectionIntro, sectionTitle } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { organizationSchema } from "@/lib/company";

const page = priser;
const { plans: pricingPlans, countries: pricingCountries, currencies: pricingCurrencies } = page;

const title = page.seo.title;
const description = page.seo.description;

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
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "rcsdirekt.se",
      serviceType: "RCS-meddelanden för företag",
      areaServed: { "@type": "Country", name: "Sverige" },
      provider: organizationSchema,
      offers: pricingPlans.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        description: plan.contents,
        priceCurrency: "SEK",
        priceSpecification: { "@type": "UnitPriceSpecification", price: Number.parseFloat(plan.price.replace(/[^\d,]/g, "").replace(",", ".")), priceCurrency: "SEK", unitText: "meddelande", valueAddedTaxIncluded: false },
      })),
    }) }],
  }),
  component: PricingPage,
});

const operators = page.operators;

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

const included = page.included;

const faq = page.faq;


/** Every network with its price per type, folded away under the operator tables. */
function NetworkPrices({ heading, note, networks }: { heading: string; note: string; networks: NetworkPrice[] }) {
  const cell = (price: string) => (price ? <span className="tabular-nums">{price.replace(" SEK", "")}</span> : <span className="text-muted-foreground/60">–</span>);
  return (
    <details className="group min-w-0 overflow-hidden rounded-2xl bg-card shadow-card">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3.5 font-extrabold [&::-webkit-details-marker]:hidden">
        {heading} <span className="text-sm font-semibold text-muted-foreground">({networks.length})</span>
        <ChevronDown aria-hidden className="ml-auto size-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="border-t border-border">
        {note ? <p className="px-5 pt-4 text-sm leading-relaxed text-pretty text-muted-foreground">{note} Priser i SEK.</p> : null}
        <div className="mt-3 max-h-[28rem] overflow-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="sticky top-0 bg-muted text-xs font-semibold text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-2.5">Nät</th>
                <th scope="col" className="px-3 py-2.5 text-right">Basic</th>
                <th scope="col" className="px-3 py-2.5 text-right">Single</th>
                <th scope="col" className="px-3 py-2.5 text-right">Conversation</th>
                <th scope="col" className="px-5 py-2.5 text-right">SMS</th>
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
                  <td className="px-3 py-2.5 text-right">{cell(row.conversation)}</td>
                  <td className="px-5 py-2.5 text-right">{cell(row.sms)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </details>
  );
}

const num = (price: string) => Number.parseFloat(price.replace(/[^\d,]/g, "").replace(",", "."));

/** One column per message type: the RCS plans, then SMS when it has prices. */
type Column = { key: string; name: string; contents: string; prices: Map<string, string> };
const columns: Column[] = [
  ...pricingPlans.map((plan) => ({
    key: plan.slug,
    name: plan.name.replace(/^RCS /, ""),
    contents: plan.contents,
    prices: new Map((plan.operatorPrices?.length ? plan.operatorPrices : operators.map((operator) => ({ operator, price: plan.price }))).map((row) => [row.operator, row.price])),
  })),
  ...(page.sms?.operatorPrices.length
    ? [{ key: "sms", name: page.sms.name || "SMS", contents: page.sms.contents, prices: new Map(page.sms.operatorPrices.map((row) => [row.operator, row.price])) }]
    : []),
];
const tableOperators = [...new Set(columns.flatMap((column) => [...column.prices.keys()]))];
const lowest = (column: Column) => Math.min(...[...column.prices.values()].map(num));
const smsFrom = page.sms?.operatorPrices.length ? `${Math.min(...page.sms.operatorPrices.map((row) => num(row.price))).toFixed(3).replace(".", ",")} SEK` : "";

/** The from-price cards: the three RCS types, the popular one on navy, and SMS as the plain fallback. */
function PlanCards() {
  return (
    <div className={cn("grid gap-5 sm:grid-cols-2", page.sms?.operatorPrices.length ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
      {pricingPlans.map((plan) => {
        const featured = Boolean(plan.badge);
        return (
          <div key={plan.slug} className={cn("flex flex-col rounded-2xl p-6", featured ? "bg-ink text-ink-foreground" : "bg-card shadow-card")}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-extrabold">{plan.name}</h2>
              {plan.badge ? <span className="rounded-full bg-ink-foreground px-2.5 py-0.5 text-xs font-semibold text-ink">{plan.badge}</span> : null}
            </div>
            <p className={cn("mt-1.5 text-sm leading-relaxed text-pretty", featured ? "text-ink-muted" : "text-muted-foreground")}>{plan.contents}</p>
            <p className="mt-6 flex items-baseline gap-1.5">
              <span className={cn("text-sm font-semibold", featured ? "text-ink-muted" : "text-muted-foreground")}>från</span>
              <span className="text-3xl font-extrabold tabular-nums">{plan.price}</span>
            </p>
            <p className={cn("mt-1 text-sm", featured ? "text-ink-muted" : "text-muted-foreground")}>per meddelande</p>
            {/* When to pick this type, so the three are easy to tell apart. */}
            {plan.short ? <p className={cn("mt-5 border-t pt-4 text-sm leading-relaxed text-pretty", featured ? "border-ink-foreground/15" : "border-border")}>{plan.short}</p> : null}
            <div className="min-h-6 flex-1" />
            <Button asChild variant="outline" className={cn("w-full", featured && "border-transparent")}>
              <Link to="/skapa-konto" search={{ plan: plan.name }}>Välj {plan.name.replace(/^RCS /, "")}</Link>
            </Button>
          </div>
        );
      })}
      {page.sms?.operatorPrices.length ? (
        <div className="flex flex-col rounded-2xl bg-muted p-6">
          <h2 className="text-lg font-extrabold">{page.sms.name || "SMS"}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground">{page.sms.contents}</p>
          <p className="mt-6 flex items-baseline gap-1.5">
            <span className="text-sm font-semibold text-muted-foreground">från</span>
            <span className="text-3xl font-extrabold tabular-nums">{smsFrom}</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">per meddelande</p>
          <Button asChild variant="outline" className="mt-6 w-full">
            <Link to="/" hash="kontakt">Fråga om SMS</Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
}

/** Every type side by side per operator; the lowest price in each column is marked. */
function OperatorTable() {
  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] text-left">
          <caption className="sr-only">Listpris per meddelande och operatör, i SEK exklusive moms</caption>
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
                  const best = price ? num(price) === lowest(column) : false;
                  return (
                    <td key={column.key} className="px-4 py-3.5 text-right tabular-nums">
                      {price ? (
                        <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap", best ? "font-extrabold" : "text-foreground/80")}>
                          {best ? <span className="rounded-full bg-primary-soft px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase">Lägst</span> : null}
                          {price.replace(" SEK", "")}
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
function MarketBar() {
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
        <select aria-label="Välj valuta" defaultValue="SEK" className={cn(select, "pl-4 pr-9")}>
          {pricingCurrencies.map((currency) => (
            <option key={currency.code} value={currency.code} disabled={!currency.available}>{currency.available ? currency.code : `${currency.code} (kommer snart)`}</option>
          ))}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </span>
    </div>
  );
}

function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main id="innehall" tabIndex={-1} className="outline-none">
        <PageHeading title={page.heading} description={<p>{page.intro}</p>}>
          <MarketBar />
        </PageHeading>

        <section className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <PlanCards />
            <p className="mt-6 text-center text-sm leading-relaxed text-pretty text-muted-foreground">{page.selectorNote}</p>
          </div>
        </section>

        <section className="bg-primary-soft py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:px-8">
            <div>
              <h2 className={sectionTitle}>Pris per operatör</h2>
              <p className={sectionIntro}>Priset beror på vilken operatör mottagaren har. Alla priser är listpriser per meddelande i SEK. {page.vatNote}</p>
            </div>
            <OperatorTable />
            {page.networks?.length ? <NetworkPrices heading={page.networksHeading || "Alla nät och priser"} note={page.networksNote ?? ""} networks={page.networks} /> : null}
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className={sectionTitle}>Räkna på ett utskick</h2>
            <p className={sectionIntro}>Välj meddelandetyp och antal. Kalkylen räknar med det lägsta listpriset.</p>
            <div className="mt-8"><PriceCalculator plans={pricingPlans} /></div>
          </div>
        </section>

        <section className="bg-ink py-16 text-ink-foreground sm:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className={sectionTitle}>{page.includedHeading}</h2>
            <ul className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {included.map((item) => (
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
              <Button asChild size="lg" className="mt-8"><Link to="/" hash="kontakt">Fråga om volympris <ArrowRight data-icon="end" /></Link></Button>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {faq.map((item) => (
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
  );
}
