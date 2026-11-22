import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { InquiryForm } from "@/components/InquiryForm";
import { SiteHeader, SiteFooter } from "@/components/SiteLayout";
import { PageHeading } from "@/components/PageHeading";
import { usePriser } from "@/content/localized";
import { STEPS } from "@/data/onboarding";
import { company } from "@/lib/company";
import { useT } from "@/lib/i18n";

/** The sign-up page, in Swedish at /skapa-konto and in English at /en/sign-up; `plan` is the type chosen on a price card. */
export function SignupPage({ plan }: { plan?: string | undefined }) {
  const priser = usePriser();
  const { t, lp } = useT();
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main id="innehall" tabIndex={-1} className="outline-none flex-1">
        <PageHeading
          title={t("Skapa ditt konto")}
          description={<p>{t("Berätta vilka ni är, så aktiverar vi kontot och hör av oss om vad som händer sen. Har ni redan ett konto?")} <a href="https://portal.rcsdirekt.se/login" className="font-semibold text-primary underline underline-offset-4">{t("Logga in")}</a></p>}
        />
        <section className="px-5 pb-16 sm:pb-24 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
            <div>
              <InquiryForm mode="signup" {...(plan ? { defaultMessage: t("Vi är intresserade av {plan}.").replace("{plan}", plan) } : {})} />
              <p className="mt-7 text-center text-xs leading-relaxed text-muted-foreground">{t("Ni betalar bara för det ni skickar. Det finns inga fasta avgifter och ingen bindningstid.")}</p>
            </div>
            {/* What happens after the form, what every account includes and who is behind it. */}
            <aside className="space-y-6">
              <div className="rounded-2xl bg-ink p-6 text-ink-foreground sm:p-7">
                <h2 className="text-lg font-extrabold">{t("Så går det till")}</h2>
                <ol className="mt-5 space-y-5">
                  {STEPS.map((step, index) => (
                    <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3">
                      <span aria-hidden className="grid size-8 place-items-center rounded-[50%_50%_50%_0] bg-ink-foreground font-display text-sm font-extrabold text-ink">{index + 1}</span>
                      <div>
                        <p className="font-bold">{t(step.title)}</p>
                        <p className="mt-1 text-sm leading-relaxed text-pretty text-ink-muted">{t(step.copy)}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              {priser.included.length ? (
                <div className="rounded-2xl bg-primary-soft p-6 sm:p-7">
                  <h2 className="text-lg font-extrabold">{priser.includedHeading}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {priser.included.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm font-semibold">
                        <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-logo-blue text-white"><Check strokeWidth={3} className="size-3" /></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <p className="text-xs leading-relaxed text-muted-foreground">
                {t("{brand} drivs av {company}, org.nr {org}, {city}.").replace("{brand}", company.brand).replace("{company}", company.legalName).replace("{org}", company.orgNumber).replace("{city}", company.city)} <Link to={lp("/om-oss")} className="font-semibold text-foreground underline underline-offset-4 hover:text-logo-blue">{t("Om oss")}</Link>
              </p>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
