import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { InquiryForm } from "@/components/InquiryForm";
import { SiteHeader, SiteFooter } from "@/components/SiteLayout";
import { PageHeading } from "@/components/PageHeading";
import { content } from "@/content";
import { STEPS } from "@/data/onboarding";
import { company } from "@/lib/company";

// The plan chosen on the pricing cards, accepted only if it is one of the plans on the site.
const planNames = new Set(content.priser.plans.map((plan) => plan.name));

export const Route = createFileRoute("/skapa-konto")({
  validateSearch: (search: Record<string, unknown>): { plan?: string } =>
    typeof search["plan"] === "string" && planNames.has(search["plan"]) ? { plan: search["plan"] } : {},
  head: () => ({
    meta: [
      { title: "Skapa konto och skicka RCS" },
      { name: "description", content: "Skapa ett konto och skicka RCS för ert företag. Ni betalar per meddelande och har inga fasta avgifter." },
      { property: "og:title", content: "Skapa konto och skicka RCS" },
      { property: "og:description", content: "Skapa ett konto och skicka RCS för ert företag. Ni betalar per meddelande och har inga fasta avgifter." },
      { property: "og:type", content: "website" }, { property: "og:url", content: "https://rcsdirekt.se/skapa-konto" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/skapa-konto" }],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { plan } = Route.useSearch();
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main id="innehall" tabIndex={-1} className="outline-none flex-1">
        <PageHeading
          title="Skapa ditt konto"
          description={<p>Berätta vilka ni är, så aktiverar vi kontot och hör av oss med nästa steg. Har du redan ett konto? <a href="https://portal.rcsdirekt.se/login" className="font-semibold text-primary underline underline-offset-4">Logga in</a></p>}
        />
        <section className="px-5 pb-16 sm:pb-24 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
            <div>
              <InquiryForm mode="signup" {...(plan ? { defaultMessage: `Vi är intresserade av ${plan}.` } : {})} />
              <p className="mt-7 text-center text-xs leading-relaxed text-muted-foreground">Ni betalar per skickat meddelande, utan fasta avgifter eller bindningstid.</p>
            </div>
            {/* What happens after the form, what every account includes and who is behind it. */}
            <aside className="space-y-6">
              <div className="rounded-2xl bg-ink p-6 text-ink-foreground sm:p-7">
                <h2 className="text-lg font-extrabold">Så går det till</h2>
                <ol className="mt-5 space-y-5">
                  {STEPS.map((step, index) => (
                    <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3">
                      <span aria-hidden className="grid size-8 place-items-center rounded-[50%_50%_50%_0] bg-ink-foreground font-display text-sm font-extrabold text-ink">{index + 1}</span>
                      <div>
                        <p className="font-bold">{step.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-pretty text-ink-muted">{step.copy}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              {content.priser.included.length ? (
                <div className="rounded-2xl bg-primary-soft p-6 sm:p-7">
                  <h2 className="text-lg font-extrabold">{content.priser.includedHeading}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {content.priser.included.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm font-semibold">
                        <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-logo-blue text-white"><Check strokeWidth={3} className="size-3" /></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <p className="text-xs leading-relaxed text-muted-foreground">
                {company.brand} drivs av {company.legalName}, org.nr {company.orgNumber}, {company.city}. <Link to="/om-oss" className="font-semibold text-foreground underline underline-offset-4 hover:text-logo-blue">Om oss</Link>
              </p>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
