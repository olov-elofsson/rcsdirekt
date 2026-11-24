import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Check, RadioTower } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NumberDrop } from "@/components/NumberDrop";
import { CustomerExamples } from "@/components/CustomerExamples";
import { BlogSection, CompareSection, ContactSection, PricingSection, WaysSection } from "@/components/HomepageSections";
import { useReveal } from "@/hooks/use-reveal";
import { sectionIntro, sectionTitle } from "@/lib/typography";
import { usePriser, useStartsida } from "@/content/localized";
import { HeroMessage } from "@/components/HeroMessage";
import { STEPS } from "@/data/onboarding";
import { useT } from "@/lib/i18n";
import { articleList as articleListSv } from "@/content/article-list";
import { articleList as articleListEn } from "@/content/en/article-list";

// The start page, in Swedish at / and in English at /en; the routes only add their own head.

export function HomePage() {
  const revealReady = useReveal();
  return <div className={cn("home-refined min-h-screen bg-background text-foreground", revealReady && "reveal-ready")}><SiteHeader /><main id="innehall" tabIndex={-1} className="outline-none"><HeroFirst /><Entrances /><CustomerExamples /><Reach /><WaysSection /><CompareSection /><PricingSection /><BlogSection /><Steps /><ContactSection /></main><SiteFooter /></div>;
}

// -0.05em: Archivo has about 0.07em of space before straight capitals, the body text far less,
// so a left-aligned heading would look indented next to the text under it.

function DualCtas({ dark = false }: { dark?: boolean }) {
  const { t, lp } = useT();
  // On Marin the primary action is the white outline Button, and the second a quiet white link.
  if (dark) {
    return (
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
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
    <section id="top" className="-mt-[4.75rem] bg-ink text-ink-foreground">
      {/* Text and message share the header's edges: the text starts at the logo, the message ends at the last button. */}
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pt-32 pb-16 sm:pt-36 sm:pb-20 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 lg:px-8 lg:pt-36">
        <div>
          {/* One line on where RCS stands, leading to the article with each operator's status. */}
          <p className="mb-5">
            <Link to={lp("/blogg/$slug")} params={{ slug: news ? NEWS_SLUG : "rcs-pa-iphone" }} {...(news ? {} : { hash: "operatorer" })} className={labelLink}>
              <RadioTower aria-hidden strokeWidth={2} className="size-4 text-logo-blue" />
              {t("Tele2 och Comviq har öppnat RCS för iPhone")}
              {/* Only where the line fits on one row; on phones a wrapped line would push the arrow to the edge. */}
              <ArrowRight aria-hidden className="hidden size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 sm:block" />
            </Link>
          </p>
          <h1 className="max-w-3xl text-[2.4rem] font-extrabold leading-[1.06] text-balance text-ink-foreground sm:text-5xl lg:max-w-none lg:text-[3.4rem] lg:text-pretty xl:text-[3.75rem]">
            {home.hero.title} <span className="sm:block">{home.hero.highlight}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ink-muted sm:text-xl">{home.hero.description}</p>
          <div className="mt-9 flex"><DualCtas dark /></div>
        </div>
        <HeroMessage dark />
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


/** Where to go next, right under the hero: the web tool, the API and the prices, as three short cards. */
function Entrances() {
  const { t, lp } = useT();
  const plans = usePriser().plans;
  const from = plans[0]?.price;
  const cards = [
    { title: t("Skicka från webben"), copy: t("Bygg utskicket i webbläsaren och se direkt hur det ser ut hos kunden."), link: t("Se webbverktyget"), to: lp("/"), hash: "vad-ar-rcs" },
    { title: t("Koppla in ert system"), copy: t("Låt era system skicka bekräftelser och påminnelser via API, med svaren tillbaka som webhooks."), link: t("Till utvecklarsidan"), to: lp("/utvecklare") },
    { title: t("Betala per meddelande"), copy: from ? t("Listpris från {price} per meddelande. Det kostar inget att starta och det finns ingen bindningstid.").replace("{price}", from) : t("Det kostar inget att starta och det finns ingen bindningstid."), link: t("Se priser"), to: lp("/priser") },
  ];
  return (
    <section id="ingangar" aria-label={t("Kom vidare")} className="bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <ul className="grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => (
            <li key={card.title} data-reveal style={revealOrder(index)}>
              <Link to={card.to} {...(card.hash ? { hash: card.hash } : {})} className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-[border-color,box-shadow] duration-200 ease-out hover:border-logo-blue/40 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <h3 className="text-xl font-extrabold leading-snug">{card.title}</h3>
                <p className="mt-2 flex-1 text-base leading-relaxed text-pretty text-muted-foreground">{card.copy}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">{card.link} <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The reach in one sentence on its own white band, large and centred, the way Fortnox states its customer count. */
function Reach() {
  const { t } = useT();
  return (
    <section id="rackvidd" aria-label={t("Räckvidd")} className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:py-16 lg:px-8">
        <p data-reveal className="mx-auto max-w-5xl text-center font-display text-[1.9rem] font-extrabold leading-[1.15] text-balance sm:text-[2.9rem] lg:text-[3.4rem]">
          {t("Ett ekosystem med")} <span className="text-logo-blue">{t("över 800 direktkopplingar")}</span> {t("till operatörer världen över.")}
        </p>
      </div>
    </section>
  );
}
