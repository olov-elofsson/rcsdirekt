import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Check, RadioTower } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NumberDrop } from "@/components/NumberDrop";
import { CustomerExamples } from "@/components/CustomerExamples";
import { BlogSection, CompareSection, ContactSection, PricingSection } from "@/components/HomepageSections";
import { DifferenceRow, Entrances, SendRows, SupportCards } from "@/components/HomeRows";
import { useReveal } from "@/hooks/use-reveal";
import { sectionIntro, sectionTitle } from "@/lib/typography";
import { usePriser, useStartsida } from "@/content/localized";
import { STEPS } from "@/data/onboarding";
import { useT } from "@/lib/i18n";
import { articleList as articleListSv } from "@/content/article-list";
import { articleList as articleListEn } from "@/content/en/article-list";

// The start page, in Swedish at / and in English at /en; the routes only add their own head.

// The page is a journey from A to Ö for someone who has never sent RCS: what it is (hero), why
// (the difference and the comparison), whether it works (reach and customer cases), how to send
// (web and API), what it costs (prices), how to start (steps and help), then guides and contact.
export function HomePage() {
  const revealReady = useReveal();
  return <div className={cn("home-refined min-h-screen bg-background text-foreground", revealReady && "reveal-ready")}><SiteHeader /><main id="innehall" tabIndex={-1} className="outline-none"><HeroFirst /><Entrances /><DifferenceRow /><CompareSection /><Reach /><CustomerExamples /><SendRows /><PricingSection /><Steps /><SupportCards /><BlogSection /><ContactSection /></main><SiteFooter /></div>;
}

// -0.05em: Archivo has about 0.07em of space before straight capitals, the body text far less,
// so a left-aligned heading would look indented next to the text under it.

function DualCtas({ dark = false }: { dark?: boolean }) {
  const { t, lp } = useT();
  // On Marin the primary action is the white outline Button, and the second a quiet white link.
  if (dark) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <Button className="home-cta border-transparent" asChild size="lg" variant="outline"><Link to={lp("/skapa-konto")}>{t("Skapa konto")} <ArrowRight data-icon="end" /></Link></Button>
        <Link to={lp("/")} hash="kontakt" className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink-foreground underline-offset-4 hover:underline">{t("Prata med oss")} <ArrowRight aria-hidden className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" /></Link>
      </div>
    );
  }
  return <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto"><Button className="home-cta" asChild size="lg"><Link to={lp("/skapa-konto")}>{t("Skapa konto")} <ArrowRight data-icon="end" /></Link></Button><Button className="home-cta" asChild size="lg" variant="outline"><Link to={lp("/")} hash="kontakt">{t("Prata med oss")}</Link></Button></div>;
}

const revealOrder = (index: number) => ({ "--reveal-order": index }) as CSSProperties;


/** The hero split in two: headline, one line on what it is and two actions beside one notice shown as SMS and as RCS. */
/** The news article the line above the heading leads to; until it is in the content, the iPhone article's operator section. */
const NEWS_SLUG = "svenska-operatorer-oppnar-rcs-pa-iphone";

function HeroFirst() {
  const home = useStartsida();
  const { t, lp, locale } = useT();
  const news = (locale === "en" ? articleListEn : articleListSv).some((article) => article.slug === NEWS_SLUG);
  const labelLink = "group -my-2 inline-flex min-h-10 items-center gap-2 rounded-full bg-ink-foreground/10 px-3.5 text-[13px] font-semibold sm:text-sm text-ink-foreground transition-colors duration-150 hover:bg-ink-foreground/15";
  return (
    // Marin, full width, and pulled up under the floating header so the menu bar sits on it.
    // Marin, centred, with one action, as Fortnox's hero; pulled up under the floating header.
    <section id="top" className="-mt-[4.75rem] bg-ink text-ink-foreground">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 pt-36 pb-20 text-center sm:pt-44 sm:pb-28 lg:px-8">
        {/* One line on where RCS stands, leading to the article with each operator's status. */}
        <p className="mb-7">
          <Link to={lp("/blogg/$slug")} params={{ slug: news ? NEWS_SLUG : "rcs-pa-iphone" }} {...(news ? {} : { hash: "operatorer" })} className={labelLink}>
            <RadioTower aria-hidden strokeWidth={2} className="size-4 text-logo-blue" />
            {t("Tele2 och Comviq har öppnat RCS för iPhone")}
            <ArrowRight aria-hidden className="hidden size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 sm:block" />
          </Link>
        </p>
        <h1 className="text-[2.5rem] font-extrabold leading-[1.05] text-balance text-ink-foreground sm:text-6xl lg:text-[4.25rem]">
          {home.hero.title} <span className="sm:block">{home.hero.highlight}</span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-pretty text-ink-muted sm:text-xl">{home.hero.description}</p>
        <div className="mt-10 flex justify-center"><DualCtas dark /></div>
      </div>
    </section>
  );
}

/** How a company gets started: three steps in a row, near the end beside the contact form. */
function Steps() {
  const { t, lp } = useT();
  return (
    <section id="kom-igang" className="relative overflow-hidden bg-ink py-16 text-ink-foreground sm:py-24">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div data-reveal>
          <h2 className={sectionTitle}>{t("Från konto till första utskick i tre steg")}</h2>
          <p className={cn(sectionIntro, "text-ink-muted")}>{t("Vi hjälper er med avsändaren och upplägget på vägen.")}</p>
        </div>
        <ol className="relative mt-10 grid gap-8 sm:mt-12 md:grid-cols-3 md:gap-5">
          {/* The line through the drops, drawn from left to right when the steps come into view.
              It starts at the first drop's centre (card padding + half a drop) and fades out after the last. */}
          <li aria-hidden data-reveal className="steps-line pointer-events-none absolute left-[calc(1.75rem+1.25rem)] right-0 top-5 hidden h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-ink-foreground/30 from-75% to-transparent md:block" />
          {STEPS.map((step, index) => (
            <li key={step.title} data-reveal style={revealOrder(index + 1)} className="flex flex-col">
              {/* Indented by the card's padding, so each number stands over its heading. */}
              <div className="pl-7"><NumberDrop tone="light" n={index + 1} /></div>
              <div className="mt-4 flex-1 rounded-2xl bg-card p-7 text-card-foreground">
                <h3 className="text-xl font-extrabold leading-snug">{t(step.title)}</h3>
                <p className="mt-2 text-base leading-relaxed text-pretty text-muted-foreground">{t(step.copy)}</p>
              </div>
            </li>
          ))}
        </ol>
        {/* What every account includes, from the pricing page in the CMS, in the cards' columns; then the action. */}
        <div data-reveal className="mt-10"><Button className="home-cta border-transparent" asChild size="lg" variant="outline"><Link to={lp("/skapa-konto")}>{t("Skapa konto")} <ArrowRight data-icon="end" /></Link></Button></div>
      </div>
    </section>
  );
}



/**
 * The reach as one large figure, the way Fortnox states its customer count: a small label, the
 * number in blue, what it counts, and one quiet line on the Swedish networks.
 */
function Reach() {
  const { t, locale } = useT();
  const operators = usePriser().operators.filter((name) => !/^(Övriga|Other)/.test(name));
  const names = operators.length > 1 ? `${operators.slice(0, -1).join(", ")} ${locale === "en" ? "and" : "och"} ${operators.at(-1)}` : operators[0];
  return (
    <section id="rackvidd" aria-labelledby="rackvidd-title" className="bg-background">
      <div data-reveal className="mx-auto flex max-w-3xl flex-col items-center px-5 py-6 text-center sm:py-10">
        <h2 id="rackvidd-title" className="mt-5">
          <span className="block font-display text-[5.5rem] font-extrabold leading-none tracking-[-0.02em] text-logo-blue tabular-nums sm:text-[8.5rem]">800+</span>
          <span className="mt-4 block text-[1.6rem] font-extrabold leading-tight text-balance sm:text-[2.25rem]">{t("direktkopplingar till operatörer världen över")}</span>
        </h2>
        {names ? (
          <p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-muted-foreground sm:text-[17px]">
            {t("I Sverige når ni kunder hos {names}.").replace("{names}", names)}
          </p>
        ) : null}
      </div>
    </section>
  );
}
