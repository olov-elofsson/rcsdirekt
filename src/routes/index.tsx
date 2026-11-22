import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { ArrowRight, Check } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/data/pricing-plans";
import { cn } from "@/lib/utils";
import { CustomerExamples } from "@/components/CustomerExamples";
import { BlogSection, CompareSection, ContactSection, PricingSection, WaysSection } from "@/components/HomepageSections";
import { useReveal } from "@/hooks/use-reveal";
import { sectionIntro, sectionTitle } from "@/lib/typography";
import { content } from "@/content";
import { organizationSchema } from "@/lib/company";
import { STEPS } from "@/data/onboarding";

const home = content.startsida;

/** Event markup for the next webinar, so search engines can show it as an online event. */
function webinarSchema() {
  const webinar = (content.webinarer ?? [])[0];
  if (!webinar) return [];
  const end = new Date(Date.parse(webinar.startsAt) + webinar.durationMinutes * 60_000).toISOString();
  const event = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: webinar.title,
    description: webinar.description,
    startDate: webinar.startsAt,
    endDate: end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: { "@type": "VirtualLocation", url: webinar.registrationUrl || "https://rcsdirekt.se/#webinar" },
    organizer: { "@type": "Organization", name: "RCS Direkt", url: "https://rcsdirekt.se/" },
    inLanguage: "sv-SE",
  };
  return [{ type: "application/ld+json", children: JSON.stringify(event) }];
}

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: home.seo.title },
    { name: "description", content: home.seo.description },
    { property: "og:title", content: home.seo.title },
    { property: "og:description", content: home.seo.description },
    { property: "og:type", content: "website" }, { property: "og:url", content: "https://rcsdirekt.se/" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  links: [{ rel: "canonical", href: "https://rcsdirekt.se/" }],
  scripts: [
    { type: "application/ld+json", children: JSON.stringify({ ...organizationSchema, description: home.seo.description }) },
    ...webinarSchema(),
  ],
  }),
  component: Index,
});

function Index() {
  const revealReady = useReveal();
  return <div className={cn("home-refined min-h-screen bg-background text-foreground", revealReady && "reveal-ready")}><SiteHeader /><main id="innehall" tabIndex={-1} className="outline-none"><HeroFirst /><CustomerExamples /><CompareSection /><WaysSection /><Steps /><PricingSection /><BlogSection /><ContactSection /></main><SiteFooter /></div>;
}

// -0.05em: Archivo has about 0.07em of space before straight capitals, the body text far less,
// so a left-aligned heading would look indented next to the text under it.

function DualCtas() { return <div className="flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row"><Button className="home-cta" asChild size="lg"><Link to="/skapa-konto">Skapa konto <ArrowRight data-icon="end" /></Link></Button><Button className="home-cta" asChild size="lg" variant="outline"><Link to="/" hash="kontakt">Prata med oss</Link></Button></div>; }

const revealOrder = (index: number) => ({ "--reveal-order": index }) as CSSProperties;


/** The number in the logo's drop: a circle with one square corner, white on navy. */
function NumberDrop({ n }: { n: number }) {
  return (
    <span aria-hidden className={cn("relative grid size-10 place-items-center rounded-[50%_50%_50%_0] font-display text-base font-extrabold tabular-nums", "bg-ink-foreground text-ink")}>
      {n}
    </span>
  );
}

const lowestPrice = pricingPlans[0]?.price;
// Named operators only; "Övriga operatörer" (MVNOs) is a price row, not a network to name.
const operators = content.priser.operators.filter((name) => !name.startsWith("Övriga"));

/** A plain, centred hero: headline, one line on what it is, two actions and the list price. No decoration. */
function HeroFirst() {
  return <section id="top" className="bg-background"><div className="relative mx-auto max-w-5xl px-5 pt-16 pb-14 text-center sm:pt-24 sm:pb-16 lg:px-8"><h1 className="mx-auto max-w-4xl text-[2.4rem] font-extrabold leading-[1.08] text-balance sm:text-5xl lg:text-6xl">{home.hero.title} <span className="sm:block">{home.hero.highlight}</span></h1><p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">{home.hero.description}</p><div className="mt-9 flex justify-center"><DualCtas /></div>{lowestPrice && operators.length ? <p className="mx-auto mt-6 max-w-md text-sm text-pretty text-muted-foreground">Listpris från <span className="font-semibold text-foreground tabular-nums">{lowestPrice}</span> per meddelande till kunder hos {operators.slice(0, -1).join(", ")} och {operators.at(-1)}. Priset beror på volym.</p> : null}</div></section>;
}



/** How a company gets started: three steps in a row, so the process is visible before the price. */
function Steps() {
  return (
    <section id="kom-igang" className="relative overflow-hidden bg-ink py-16 text-ink-foreground sm:py-24">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div data-reveal>
          <h2 className={sectionTitle}>Kom igång</h2>
          <p className={cn(sectionIntro, "text-ink-muted")}>Från konto till första meddelande. Vi hjälper till med avsändaren och upplägget på vägen.</p>
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
                <h3 className="mt-4 text-xl font-extrabold leading-snug">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-pretty text-muted-foreground">{step.copy}</p>
              </div>
            </li>
          ))}
        </ol>
        {/* What every account includes, from the pricing page in the CMS, in the cards' columns; then the action. */}
        {content.priser.included.length ? (
          <div data-reveal className="mt-10">
            <p className="text-xs font-bold tracking-[0.08em] text-ink-muted uppercase">{content.priser.includedHeading}</p>
            <ul className="mt-4 grid gap-x-5 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
              {content.priser.included.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-semibold">
                  <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-logo-blue text-white"><Check strokeWidth={3} className="size-3" /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div data-reveal className="mt-10"><Button className="home-cta border-transparent" asChild size="lg" variant="outline"><Link to="/skapa-konto">Skapa konto <ArrowRight data-icon="end" /></Link></Button></div>
      </div>
    </section>
  );
}

