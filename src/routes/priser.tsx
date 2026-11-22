import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { PageHeading } from "@/components/PageHeading";
import { content, type NetworkPrice } from "@/content";
import { sectionTitleCentered } from "@/lib/typography";

const page = content.priser;
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

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-bold">{label}</span>
      <span className="relative mt-2 block">{children}</span>
    </label>
  );
}

const included = page.included;

const faq = page.faq;


/** Every network with its price per type, folded away under the operator tables. */
function NetworkPrices({ heading, note, networks }: { heading: string; note: string; networks: NetworkPrice[] }) {
  const cell = (price: string) => (price ? <span className="tabular-nums">{price.replace(" SEK", "")}</span> : <span className="text-muted-foreground/60">–</span>);
  return (
    <details className="group min-w-0 overflow-hidden rounded-lg border border-border">
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

function PricingPage() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main id="innehall" tabIndex={-1} className="outline-none">
        <PageHeading title={page.heading} description={<p>{page.intro}</p>} />

        <section className="pb-16 sm:pb-20">
          <div className="mx-auto grid max-w-3xl gap-10 px-5 lg:px-8">
            <div className="rounded-lg bg-card p-7 shadow-card">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Välj land">
                  <span className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 overflow-hidden rounded-full outline outline-1 -outline-offset-1 outline-black/10">
                    <Flag code="SE" />
                  </span>
                  <select
                    aria-label="Välj land"
                    defaultValue="SE"
                    className="h-11 w-full cursor-pointer appearance-none rounded-full border border-input bg-background pl-10 pr-10 text-base font-semibold sm:text-sm text-foreground transition-colors hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {pricingCountries.map((country) => (
                      <option key={country.code} value={country.code} disabled={!country.available}>
                        {country.available ? country.name : `${country.name} (kommer snart)`}
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                </Field>

                <Field label="Valuta">
                  <select
                    aria-label="Välj valuta"
                    defaultValue="SEK"
                    className="h-11 w-full cursor-pointer appearance-none rounded-full border border-input bg-background px-4 pr-10 text-base font-semibold sm:text-sm text-foreground transition-colors hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {pricingCurrencies.map((currency) => (
                      <option key={currency.code} value={currency.code} disabled={!currency.available}>
                        {currency.available ? `${currency.name} (${currency.code})` : `${currency.name} (${currency.code}), kommer snart`}
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                </Field>
              </div>
              <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">{page.selectorNote}</p>
            </div>

            <div className="min-w-0 space-y-8">
              {pricingPlans.map((item) => (
                <div key={item.slug} className="overflow-hidden rounded-lg border border-border">
                  <div className="bg-muted px-5 py-4 text-center">
                    <span className="text-base font-extrabold">{item.name}</span>
                    <span className="block text-sm text-muted-foreground">{item.contents}</span>
                  </div>
                  {(item.operatorPrices?.length ? item.operatorPrices : operators.map((operator) => ({ operator, price: item.price }))).map((row) => (
                    <div key={row.operator} className="flex items-center justify-between gap-4 border-t border-border px-5 py-3.5">
                      <span className="font-semibold">{row.operator}</span>
                      <span className="font-extrabold whitespace-nowrap tabular-nums">{row.price}</span>
                    </div>
                  ))}
                </div>
              ))}
              {page.sms?.operatorPrices.length ? (
                <div className="overflow-hidden rounded-lg border border-border">
                  <div className="bg-muted px-5 py-4 text-center">
                    <span className="text-base font-extrabold">{page.sms.name || "SMS"}</span>
                    {page.sms.contents ? <span className="block text-sm text-muted-foreground">{page.sms.contents}</span> : null}
                  </div>
                  {page.sms.operatorPrices.map((row) => (
                    <div key={row.operator} className="flex items-center justify-between gap-4 border-t border-border px-5 py-3.5">
                      <span className="font-semibold">{row.operator}</span>
                      <span className="font-extrabold whitespace-nowrap tabular-nums">{row.price}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              <p className="text-center text-xs leading-relaxed text-muted-foreground">Priserna ovan är listpriser. Ert pris beror på volym. {page.vatNote}</p>
              {page.networks?.length ? <NetworkPrices heading={page.networksHeading || "Alla nät och priser"} note={page.networksNote ?? ""} networks={page.networks} /> : null}
            </div>

          </div>
        </section>

        <section className="relative overflow-hidden bg-background py-12 sm:py-16">
          <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
            <h2 className={sectionTitleCentered}>{page.includedHeading}</h2>
            <ul className="mx-auto mt-10 grid max-w-3xl gap-x-8 gap-y-4 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-3 font-semibold"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary-soft ring-1 ring-border/60"><Check aria-hidden className="size-4" /></span>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pt-12 pb-16 sm:pt-16 sm:pb-24">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <h2 className={sectionTitleCentered}>{page.faqHeading}</h2>
            <div className="mt-10 divide-y divide-border border-y border-border">
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
            <p className="mt-8 text-center text-muted-foreground">{page.volumeText} <Link to="/" hash="kontakt" className="font-bold text-foreground underline underline-offset-4 transition-colors hover:text-logo-blue">Kontakta oss</Link> för volympris.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
