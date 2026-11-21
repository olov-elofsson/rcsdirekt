import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { PageHeading } from "@/components/PageHeading";
import { content } from "@/content";

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


function PricingPage() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <PageHeading title={page.heading} description={<p>{page.intro}</p>} />

        <section className="py-16 sm:py-24">
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
                    className="h-11 w-full cursor-pointer appearance-none rounded-full border border-input bg-background pl-10 pr-10 text-sm font-semibold text-foreground transition-colors hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {pricingCountries.map((country) => (
                      <option key={country.code} value={country.code} disabled={!country.available}>
                        {country.available ? country.name : `${country.name} – kommer snart`}
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                </Field>

                <Field label="Valuta">
                  <select
                    aria-label="Välj valuta"
                    defaultValue="SEK"
                    className="h-11 w-full cursor-pointer appearance-none rounded-full border border-input bg-background px-4 pr-10 text-sm font-semibold text-foreground transition-colors hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {pricingCurrencies.map((currency) => (
                      <option key={currency.code} value={currency.code} disabled={!currency.available}>
                        {currency.available ? `${currency.code} – ${currency.name}` : `${currency.code} – ${currency.name} (kommer snart)`}
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                </Field>
              </div>
              <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">{page.selectorNote}</p>
            </div>

            <div className="space-y-8">
              {pricingPlans.map((item) => (
                <div key={item.slug} className="overflow-hidden rounded-lg border border-border">
                  <div className="bg-muted px-5 py-4 text-center">
                    <span className="text-base font-extrabold">{item.name}</span>
                    <span className="block text-sm text-muted-foreground">{item.contents}</span>
                  </div>
                  {operators.map((op) => (
                    <div key={op} className="flex items-center justify-between gap-4 border-t border-border px-5 py-3.5">
                      <span className="font-semibold">{op}</span>
                      <span className="font-extrabold whitespace-nowrap tabular-nums">{item.price}</span>
                    </div>
                  ))}
                </div>
              ))}
              <p className="text-center text-xs text-muted-foreground">{page.vatNote}</p>
            </div>

          </div>
        </section>

        <section className="relative overflow-hidden bg-background py-16 sm:py-24">
          <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
            <h2 className="text-center text-3xl font-extrabold sm:text-4xl">{page.includedHeading}</h2>
            <ul className="mx-auto mt-8 grid max-w-3xl gap-x-8 gap-y-4 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-3 font-semibold"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary-soft ring-1 ring-border/60"><Check aria-hidden className="size-4" /></span>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <h2 className="text-center text-3xl font-extrabold sm:text-4xl">{page.faqHeading}</h2>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {faq.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md font-bold outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 [&::-webkit-details-marker]:hidden">
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
