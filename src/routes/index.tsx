import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/data/pricing-plans";
import { cn } from "@/lib/utils";
import { Wave } from "@/components/BandWave";
import { Drop, HeroGraphic, dropColors } from "@/components/HeroGraphic";
import { PhotoScenarios } from "@/components/PhotoScenarios";
import { BlogSection, CompareSection, ContactSection, PricingSection, WaysSection } from "@/components/HomeSections";
import { useReveal } from "@/hooks/use-reveal";
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
  return <div className={cn("home-refined min-h-screen bg-background text-foreground", revealReady && "reveal-ready")}><SiteHeader /><main><HeroFirst /><PhotoScenarios /><Advantages /><CompareSection /><WaysSection /><PricingSection /><BlogSection /><ContactSection /></main><SiteFooter /></div>;
}

const sectionTitle = "text-[2.1rem] font-extrabold leading-tight tracking-normal sm:text-[2.65rem]";

function DualCtas() { return <div className="flex flex-col gap-3 sm:flex-row"><Button className="home-cta" asChild size="lg"><Link to="/skapa-konto">Skapa konto <ArrowRight data-icon="end" /></Link></Button><Button className="home-cta" asChild size="lg" variant="outline"><Link to="/" hash="kontakt">Prata med oss</Link></Button></div>; }

const revealOrder = (index: number) => ({ "--reveal-order": index }) as CSSProperties;

/** Advantages as a numbered editorial list beside a sticky heading, instead of icon cards. */
function Advantages() {
  return <section id="fordelar" className="relative overflow-hidden bg-background py-16 sm:py-24"><Wave flip fill="var(--color-primary-soft)" /><div className="relative mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8"><div data-reveal className="lg:sticky lg:top-28 lg:self-start"><h2 className={sectionTitle}>{home.fordelar.heading}</h2><p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-muted-foreground">{home.fordelar.intro}</p><div className="mt-8 hidden lg:block"><DualCtas /></div></div><ol className="divide-y divide-border border-y border-border">{home.fordelar.items.map(({ title, copy }, index) => <li key={title} data-reveal style={revealOrder(index)} className="grid grid-cols-[2.5rem_1fr] gap-x-5 py-7 sm:grid-cols-[3.5rem_1fr] sm:py-8"><Drop size={40} corner={(["bl", "br", "tl", "tr"] as const)[index % 4] ?? "bl"} fill={index % 2 ? dropColors.blue : dropColors.navy} text={String(index + 1)} /><div><h3 className="text-xl font-extrabold leading-snug tracking-normal">{title}</h3><p className="mt-2 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">{copy}</p></div></li>)}</ol><div className="lg:hidden"><DualCtas /></div></div></section>;
}

const lowestPrice = pricingPlans[0]?.price;
// Named operators only; "Övriga operatörer" (MVNOs) is a price row, not a network to name.
const operators = content.priser.operators.filter((name) => !name.startsWith("Övriga"));

/** A clean, centred hero: headline, one line on what it is, two actions and the list price. */
function HeroFirst() {
  return <section id="top" className="relative overflow-hidden bg-background"><HeroGraphic /><div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:py-28 lg:px-8"><h1 className="mx-auto max-w-4xl text-[2.6rem] font-extrabold leading-[1.05] sm:text-6xl lg:text-[4.25rem]">{home.hero.title}<br />{home.hero.highlight}</h1><p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">{home.hero.description}</p><div className="mt-9 flex justify-center"><DualCtas /></div>{lowestPrice && operators.length ? <p className="mx-auto mt-6 max-w-md text-sm text-pretty text-muted-foreground">Listpris från <span className="font-semibold text-foreground tabular-nums">{lowestPrice}</span> per meddelande till kunder hos {operators.slice(0, -1).join(", ")} och {operators.at(-1)}. Priset beror på volym.</p> : null}</div></section>;
}
