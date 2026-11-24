import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Check, RadioTower } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CustomerExamples } from "@/components/CustomerExamples";
import { BlogSection, CompareSection, FaqSection, PricingSection } from "@/components/HomepageSections";
import { CtaBand, CustomerStrip, DifferenceRow, FeatureGrid, HowItWorks, SendRows } from "@/components/HomeRows";
import { useReveal } from "@/hooks/use-reveal";
import { sectionIntro, sectionTitle, sectionTitleCentered } from "@/lib/typography";
import { usePriser, useStartsida } from "@/content/localized";
import { useT } from "@/lib/i18n";
import { articleList as articleListSv } from "@/content/article-list";
import { articleList as articleListEn } from "@/content/en/article-list";

// The start page, in Swedish at / and in English at /en; the routes only add their own head.

// Modules people know from company sites, in a familiar order: hero, customers, a feature grid,
// rows with pictures, a comparison table, customer cases, how it works, pricing, FAQ, blog and a
// closing call to action.
export function HomePage() {
  const revealReady = useReveal();
  return <div className={cn("home-refined min-h-screen bg-background text-foreground", revealReady && "reveal-ready")}><SiteHeader /><main id="innehall" tabIndex={-1} className="outline-none"><HeroFirst /><CustomerStrip /><FeatureGrid /><DifferenceRow /><CompareSection /><CustomerExamples /><SendRows /><HowItWorks /><PricingSection /><FaqSection /><BlogSection /><CtaBand /></main><SiteFooter /></div>;
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
        <Link to={lp("/kontakt")} className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink-foreground underline-offset-4 hover:underline">{t("Prata med oss")} <ArrowRight aria-hidden className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" /></Link>
      </div>
    );
  }
  return <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto"><Button className="home-cta" asChild size="lg"><Link to={lp("/skapa-konto")}>{t("Skapa konto")} <ArrowRight data-icon="end" /></Link></Button><Button className="home-cta" asChild size="lg" variant="outline"><Link to={lp("/kontakt")}>{t("Prata med oss")}</Link></Button></div>;
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




