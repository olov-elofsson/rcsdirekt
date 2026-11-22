import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/data/pricing-plans";
import { cn } from "@/lib/utils";
import { PhotoScenarios } from "@/components/PhotoScenarios";
import { BlogSection, CompareSection, ContactSection, PricingSection, WaysSection } from "@/components/HomeSections";
import { useReveal } from "@/hooks/use-reveal";
import { sectionIntro, sectionTitle } from "@/lib/typography";
import { content } from "@/content";

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
    { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "RCS Direkt", legalName: "WIGOSE AB", url: "https://rcsdirekt.se/", logo: "https://rcsdirekt.se/icon-512.png", description: home.seo.description }) },
    ...webinarSchema(),
  ],
  }),
  component: Index,
});

function Index() {
  const revealReady = useReveal();
  return <div className={cn("home-refined min-h-screen bg-background text-foreground", revealReady && "reveal-ready")}><SiteHeader /><main id="innehall" tabIndex={-1} className="outline-none"><HeroFirst /><PhotoScenarios /><Advantages /><CompareSection /><WaysSection /><Steps /><PricingSection /><BlogSection /><ContactSection /></main><SiteFooter /></div>;
}

// -0.05em: Archivo has about 0.07em of space before straight capitals, the body text far less,
// so a left-aligned heading would look indented next to the text under it.

function DualCtas() { return <div className="flex flex-col gap-3 sm:flex-row"><Button className="home-cta" asChild size="lg"><Link to="/skapa-konto">Skapa konto <ArrowRight data-icon="end" /></Link></Button><Button className="home-cta" asChild size="lg" variant="outline"><Link to="/" hash="kontakt">Prata med oss</Link></Button></div>; }

const revealOrder = (index: number) => ({ "--reveal-order": index }) as CSSProperties;

/** Advantages as a numbered editorial list beside a sticky heading, instead of icon cards. */
/** The number in the logo's drop: a circle with one square corner, alternating navy and blue. */
function NumberDrop({ n }: { n: number }) {
  return (
    <span aria-hidden className={cn("grid size-10 place-items-center rounded-[50%_50%_50%_0] font-display text-base font-extrabold tabular-nums text-primary-foreground", n % 2 ? "bg-primary" : "bg-logo-blue")}>
      {n}
    </span>
  );
}

function Advantages() {
  return <section id="fordelar" className="relative overflow-hidden bg-background py-16 sm:py-24"><div className="relative mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8"><div data-reveal className="lg:sticky lg:top-28 lg:self-start"><h2 className={sectionTitle}>{home.fordelar.heading}</h2><p className={sectionIntro}>{home.fordelar.intro}</p><div className="mt-8 hidden lg:block"><DualCtas /></div></div><ol className="grid gap-9">{home.fordelar.items.map(({ title, copy, sms }, index) => <li key={title} data-reveal style={revealOrder(index)} className="grid grid-cols-[2.5rem_1fr] items-start gap-x-5"><NumberDrop n={index + 1} /><div><h3 className="text-xl font-extrabold leading-snug tracking-normal">{title}</h3><p className="mt-2 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">{copy}</p>{sms ? <p className="mt-3 flex max-w-xl items-baseline gap-2.5 text-sm leading-relaxed text-pretty text-muted-foreground"><span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground">Med sms</span>{sms}</p> : null}</div></li>)}</ol><div className="lg:hidden"><DualCtas /></div></div></section>;
}

const lowestPrice = pricingPlans[0]?.price;
// Named operators only; "Övriga operatörer" (MVNOs) is a price row, not a network to name.
const operators = content.priser.operators.filter((name) => !name.startsWith("Övriga"));

/** A plain, centred hero: headline, one line on what it is, two actions and the list price. No decoration. */
function HeroFirst() {
  return <section id="top" className="bg-background"><div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:py-28 lg:px-8"><h1 className="mx-auto max-w-4xl text-[2.4rem] font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">{home.hero.title}<br />{home.hero.highlight}</h1><p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">{home.hero.description}</p><div className="mt-9 flex justify-center"><DualCtas /></div>{lowestPrice && operators.length ? <p className="mx-auto mt-6 max-w-md text-sm text-pretty text-muted-foreground">Listpris från <span className="font-semibold text-foreground tabular-nums">{lowestPrice}</span> per meddelande till kunder hos {operators.slice(0, -1).join(", ")} och {operators.at(-1)}. Priset beror på volym.</p> : null}</div></section>;
}


const STEPS = [
  { title: "Skapa ett konto", copy: "Berätta vilka ni är och vad ni vill skicka. Vi aktiverar kontot och hör av oss med nästa steg." },
  { title: "Avsändaren registreras", copy: "Ni skickar företagsnamn, logotyp och en kort beskrivning. Vi registrerar avsändaren, och den kontrolleras innan den får skicka." },
  { title: "Skicka första utskicket", copy: "Bygg meddelandet i webbverktyget eller koppla in ert system via API. Ni betalar för de meddelanden som skickas." },
];

/** How a company gets started: three steps in a row, so the process is visible before the price. */
function Steps() {
  return (
    <section id="kom-igang" className="relative overflow-hidden bg-ink py-16 text-ink-foreground sm:py-24">
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div data-reveal>
          <h2 className={sectionTitle}>Så kommer ni igång</h2>
          <p className={cn(sectionIntro, "text-ink-muted")}>Från konto till första meddelande. Vi hjälper till med avsändaren och upplägget på vägen.</p>
        </div>
        <ol className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} data-reveal style={revealOrder(index)} className="rounded-2xl bg-card p-7 text-card-foreground">
              <NumberDrop n={index + 1} />
              <h3 className="mt-6 text-xl font-extrabold leading-snug">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-pretty text-muted-foreground">{step.copy}</p>
            </li>
          ))}
        </ol>
        {/* The outline variant is a white pill, the primary action on the dark surface. */}
        <div data-reveal className="mt-10"><Button className="home-cta border-transparent" asChild size="lg" variant="outline"><Link to="/skapa-konto">Skapa konto <ArrowRight data-icon="end" /></Link></Button></div>
      </div>
    </section>
  );
}

