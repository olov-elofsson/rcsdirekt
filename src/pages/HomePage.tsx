import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { ArrowRight, Check, RadioTower, Smartphone } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CustomerExamples } from "@/components/CustomerExamples";
import { BlogSection, CompareSection, ContactSection, PricingSection, WaysSection, WhySection } from "@/components/HomepageSections";
import { useReveal } from "@/hooks/use-reveal";
import { sectionIntro, sectionTitle } from "@/lib/typography";
import { usePriser, useStartsida } from "@/content/localized";
import { HeroMessage } from "@/components/HeroMessage";
import { STEPS } from "@/data/onboarding";
import { useT } from "@/lib/i18n";

// The start page, in Swedish at / and in English at /en; the routes only add their own head.

export function HomePage() {
  const revealReady = useReveal();
  return <div className={cn("home-refined min-h-screen bg-background text-foreground", revealReady && "reveal-ready")}><SiteHeader /><main id="innehall" tabIndex={-1} className="outline-none"><HeroFirst /><CustomerExamples /><WhySection /><WaysSection /><CompareSection /><PricingSection /><BlogSection /><Steps /><ContactSection /></main><SiteFooter /></div>;
}

// -0.05em: Archivo has about 0.07em of space before straight capitals, the body text far less,
// so a left-aligned heading would look indented next to the text under it.

function DualCtas() {
  const { t, lp } = useT();
  return <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><Button className="home-cta" asChild size="lg"><Link to={lp("/skapa-konto")}>{t("Skapa konto")} <ArrowRight data-icon="end" /></Link></Button><Button className="home-cta" asChild size="lg" variant="outline"><Link to={lp("/")} hash="kontakt">{t("Prata med oss")}</Link></Button></div>;
}

const revealOrder = (index: number) => ({ "--reveal-order": index }) as CSSProperties;


/** The number in the logo's drop: a circle with one square corner, white on navy. */
function NumberDrop({ n }: { n: number }) {
  return (
    <span aria-hidden className={cn("relative grid size-10 place-items-center rounded-[50%_50%_50%_0] font-display text-base font-extrabold tabular-nums", "bg-ink-foreground text-ink")}>
      {n}
    </span>
  );
}

/** The hero split in two: headline, one line on what it is and two actions beside one notice shown as SMS and as RCS. */
/**
 * Operators whose customers can get RCS on iPhone, as their own support pages say (Tele2 and
 * Comviq, November 2026; sources tele2-rcs and comviq-rcs in the CMS). Tre and Hallon are testing
 * it in iOS 27.3; add them here once they have opened it for all customers.
 */
const IPHONE_OPERATORS = ["Tele2", "Comviq"];

function HeroFirst() {
  const home = useStartsida();
  const { t } = useT();
  const operators = usePriser().operators.filter((name) => !/^(Övriga|Other)/.test(name));
  return (
    <section id="top" className="bg-background">
      {/* Text and message share the header's edges: the text starts at the logo, the message ends at the last button. */}
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pt-12 pb-14 sm:pt-20 sm:pb-16 lg:grid-cols-[1.55fr_1fr] lg:gap-12 lg:px-8 lg:pt-16">
        <div>
          {operators.length ? (
            <p className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm font-semibold text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <RadioTower aria-hidden strokeWidth={2} className="size-4 text-logo-blue" />
                {t("Når kunder hos {operators}").replace("{operators}", `${operators.slice(0, -1).join(", ")} ${t("och")} ${operators.at(-1)}`)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Smartphone aria-hidden strokeWidth={2} className="size-4 text-logo-blue" />
                {t("På iPhone hos {operators}").replace("{operators}", `${IPHONE_OPERATORS.slice(0, -1).join(", ")} ${t("och")} ${IPHONE_OPERATORS.at(-1)}`)}
              </span>
            </p>
          ) : null}
          <h1 className="max-w-3xl text-[2.4rem] font-extrabold leading-[1.06] text-balance sm:text-5xl lg:max-w-none lg:text-[3.4rem] lg:text-pretty xl:text-[3.75rem]">
            {home.hero.title} <span className="sm:block">{home.hero.highlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">{home.hero.description}</p>
          <div className="mt-9 flex"><DualCtas /></div>
        </div>
        <HeroMessage className="lg:ml-auto" />
      </div>
    </section>
  );
}

/** How a company gets started: three steps in a row, near the end beside the contact form. */
function Steps() {
  const priser = usePriser();
  const { t, lp } = useT();
  return (
    <section id="kom-igang" className="relative overflow-hidden bg-ink py-16 text-ink-foreground sm:py-24">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div data-reveal>
          <h2 className={sectionTitle}>{t("Kom igång")}</h2>
          <p className={cn(sectionIntro, "text-ink-muted")}>{t("Tre steg från konto till första meddelandet. Vi hjälper er med avsändaren på vägen.")}</p>
        </div>
        <ol className="relative mt-10 grid gap-8 sm:mt-12 md:grid-cols-3 md:gap-5">
          {/* The line through the drops, drawn from left to right when the steps come into view.
              It starts at the first drop's centre (card padding + half a drop) and fades out after the last. */}
          <li aria-hidden data-reveal className="steps-line pointer-events-none absolute left-[calc(1.75rem+1.25rem)] right-0 top-5 hidden h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-ink-foreground/30 from-75% to-transparent md:block" />
          {STEPS.map((step, index) => (
            <li key={step.title} data-reveal style={revealOrder(index + 1)} className="flex flex-col">
              {/* Indented by the card's padding, so each number stands over its heading. */}
              <div className="pl-7"><NumberDrop n={index + 1} /></div>
              <div className="mt-4 flex-1 rounded-2xl bg-card p-7 text-card-foreground">
                <step.Icon aria-hidden strokeWidth={2} className="size-6 text-logo-blue" />
                <h3 className="mt-4 text-xl font-extrabold leading-snug">{t(step.title)}</h3>
                <p className="mt-2 text-base leading-relaxed text-pretty text-muted-foreground">{t(step.copy)}</p>
              </div>
            </li>
          ))}
        </ol>
        {/* What every account includes, from the pricing page in the CMS, in the cards' columns; then the action. */}
        {priser.included.length ? (
          <div data-reveal className="mt-10">
            <p className="text-xs font-bold tracking-[0.08em] text-ink-muted uppercase">{priser.includedHeading}</p>
            <ul className="mt-4 grid gap-x-5 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
              {priser.included.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-semibold">
                  <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-logo-blue text-white"><Check strokeWidth={3} className="size-3" /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div data-reveal className="mt-10"><Button className="home-cta border-transparent" asChild size="lg" variant="outline"><Link to={lp("/skapa-konto")}>{t("Skapa konto")} <ArrowRight data-icon="end" /></Link></Button></div>
      </div>
    </section>
  );
}

