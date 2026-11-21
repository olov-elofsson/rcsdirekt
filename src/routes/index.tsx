import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { ArrowRight, Check, X } from "lucide-react";

import { LeadForm } from "@/components/LeadForm";
import { InteractiveRcsDemo } from "@/components/InteractiveRcsDemo";
import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { pricingPlans } from "@/data/pricing-plans";
import { articles } from "@/data/rcs-knowledge";
import { cn } from "@/lib/utils";
import { Wave } from "@/components/BandWave";
import { CustomerPresentations } from "@/components/CustomerPresentations";
import { UpcomingWebinar } from "@/components/UpcomingWebinar";
import { HeroPhone } from "@/components/HeroPhone";
import { useReveal } from "@/hooks/use-reveal";
import { content } from "@/content";
import { contentIcon } from "@/content/icons";

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
  return <div className={cn("home-refined min-h-screen bg-background text-foreground", revealReady && "reveal-ready")}><SiteHeader /><main><HeroFirst /><UpcomingWebinar /><DemoSection /><Advantages /><Comparison /><WhatIsRcs /><CustomerPresentations /><Pricing /><BlogSection /><ContactSection /></main><SiteFooter /></div>;
}

const sectionTitle = "text-[2.1rem] font-extrabold leading-tight tracking-normal sm:text-[2.65rem]";

function DualCtas() { return <div className="flex flex-col gap-3 sm:flex-row"><Button className="home-cta" asChild size="lg"><Link to="/skapa-konto">Skapa konto <ArrowRight data-icon="end" /></Link></Button><Button className="home-cta" asChild size="lg" variant="outline"><Link to="/" hash="kontakt">Prata med oss</Link></Button></div>; }

const waysToSend = home.vagar.items.map((item) => ({ ...item, icon: contentIcon(item.icon) }));

function WhatIsRcs() {
  return <section id="vad-ar-rcs" className="relative overflow-hidden bg-background py-16 sm:py-24"><Wave flip fill="var(--color-primary-soft)" /><div className="mx-auto grid max-w-6xl items-start gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8"><div className="max-w-md"><h2 className={sectionTitle}>{home.vagar.heading}</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">{home.vagar.intro}</p></div><div className="grid divide-y divide-border">{waysToSend.map(({ icon: Icon, title: key, copy }, index) => <div key={key} data-reveal style={revealOrder(index)} className="group flex items-start gap-4 py-5 first:pt-0 last:pb-0"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary ring-1 ring-border/50"><Icon className="size-4.5" /></span><div className="min-w-0"><h3 className="text-sm font-bold leading-5">{key}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p></div></div>)}</div></div></section>;
}

const revealOrder = (index: number) => ({ "--reveal-order": index }) as CSSProperties;

function compareValue(value: string): boolean | string {
  if (value.trim() === "✓") return true;
  if (value.trim() === "✗") return false;
  return value;
}

const comparisonRows = home.jamforelse.rows.map((row) => ({ label: row.label, sms: compareValue(row.sms), rcs: compareValue(row.rcs) }));

function CompareCell({ value, highlight }: { value: boolean | string; highlight: boolean }) {
  const tone = highlight ? "text-logo-blue" : "text-muted-foreground";
  return <span className={cn("flex justify-center text-center text-xs font-semibold leading-snug", tone)}>{typeof value === "boolean" ? (value ? <><Check aria-hidden className="size-5" /><span className="sr-only">Ja</span></> : <><X aria-hidden className="size-5 text-muted-foreground/50" /><span className="sr-only">Nej</span></>) : value}</span>;
}

function Comparison() {
  return <section id="rcs-mot-sms" className="relative overflow-hidden bg-primary-soft py-16 sm:py-24"><Wave flip fill="var(--color-background)" /><div className="relative mx-auto max-w-3xl px-5 lg:px-8"><div className="mx-auto max-w-2xl text-center"><h2 className={sectionTitle}>{home.jamforelse.heading}</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">{home.jamforelse.intro}</p></div><div data-reveal className="mt-12 rounded-lg bg-card px-4 py-2 shadow-card sm:px-7"><div className="grid grid-cols-[1fr_5.5rem_5.5rem] items-center gap-x-2 pt-3 sm:grid-cols-[1fr_9rem_9rem]"><span aria-hidden /><span className="text-center text-xs font-bold uppercase tracking-wide text-muted-foreground">SMS</span><span className="text-center text-xs font-bold uppercase tracking-wide text-logo-blue">RCS</span></div><div className="divide-y divide-border">{comparisonRows.map((row) => <div key={row.label} className="grid grid-cols-[1fr_5.5rem_5.5rem] items-center gap-x-2 py-3 sm:grid-cols-[1fr_9rem_9rem]"><span className="text-sm font-semibold leading-snug">{row.label}</span><CompareCell value={row.sms} highlight={false} /><CompareCell value={row.rcs} highlight={typeof row.rcs === "string"} /></div>)}</div></div></div></section>;
}

/** Advantages as a numbered editorial list beside a sticky heading, instead of icon cards. */
function Advantages() {
  return <section id="fordelar" className="relative overflow-hidden bg-background py-16 sm:py-24"><Wave flip fill="var(--color-primary-soft)" /><div className="relative mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8"><div data-reveal className="lg:sticky lg:top-28 lg:self-start"><h2 className={sectionTitle}>{home.fordelar.heading}</h2><p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-muted-foreground">{home.fordelar.intro}</p><div className="mt-8 hidden lg:block"><DualCtas /></div></div><ol className="divide-y divide-border border-y border-border">{home.fordelar.items.map(({ title, copy }, index) => <li key={title} data-reveal style={revealOrder(index)} className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-7 sm:grid-cols-[4rem_1fr] sm:py-8"><span aria-hidden className="pt-1.5 font-display text-sm font-bold tabular-nums text-logo-blue">{String(index + 1).padStart(2, "0")}</span><div><h3 className="text-xl font-extrabold leading-snug tracking-normal">{title}</h3><p className="mt-2 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">{copy}</p></div></li>)}</ol><div className="lg:hidden"><DualCtas /></div></div></section>;
}

function Pricing() {
  return <section id="pris" className="relative overflow-hidden bg-background py-16 sm:py-24"><Wave flip fill="var(--color-primary-soft)" /><div className="relative mx-auto max-w-6xl px-5 lg:px-8"><div className="mx-auto max-w-2xl text-center"><h2 className={sectionTitle}>{home.pris.heading}</h2><p className="mx-auto mt-5 text-base font-bold">{home.pris.subheading}</p><p className="mx-auto mt-2 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">{home.pris.intro}</p></div><div className="mt-12 grid gap-5 sm:grid-cols-3">{pricingPlans.map((plan, index) => <Link key={plan.name} to="/priser" data-reveal style={revealOrder(index)} className="group relative rounded-lg bg-card p-8 text-center shadow-card">{plan.badge ? <span className="absolute -top-3 left-1/2 inline-flex h-7 -translate-x-1/2 items-center rounded-full bg-primary px-4 text-xs font-bold whitespace-nowrap text-primary-foreground">{plan.badge}</span> : null}<p className="text-sm font-bold">{plan.name}</p><p className="mt-6 text-[2.6rem] font-extrabold leading-none tracking-normal tabular-nums">{plan.price}</p><p className="mt-2 text-xs text-muted-foreground">listpris per meddelande</p></Link>)}</div><p data-reveal className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-pretty text-muted-foreground">Listpriser exklusive moms. Ert pris beror på hur många meddelanden ni skickar. <Link to="/" hash="kontakt" className="font-semibold whitespace-nowrap text-foreground underline underline-offset-4 transition-colors hover:text-logo-blue">Fråga om volympris</Link></p></div></section>;
}

function BlogSection() {
  const picks = home.blogg.picks.map((slug) => articles.find((article) => article.slug === slug)).filter((a): a is (typeof articles)[number] => Boolean(a));
  return <section id="blogg" className="relative overflow-hidden bg-primary-soft py-16 sm:py-24"><Wave flip fill="var(--color-background)" /><div className="relative mx-auto max-w-6xl px-5 lg:px-8"><div className="mx-auto max-w-2xl text-center"><h2 className={sectionTitle}>{home.blogg.heading}</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">{home.blogg.intro}</p></div><div className="mt-12 grid gap-5 sm:grid-cols-3">{picks.map((article, index) => <Link key={article.slug} to="/blogg/$slug" params={{ slug: article.slug }} data-reveal style={revealOrder(index)} className="group flex flex-col rounded-lg bg-card p-8 text-left shadow-card"><Badge variant="secondary" className="self-start">{article.category}</Badge><h3 className="mt-4 text-lg font-extrabold tracking-normal transition-colors group-hover:text-logo-blue">{article.title}</h3><p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{article.description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-colors group-hover:text-logo-blue">Läs artikeln <ArrowRight aria-hidden className="size-4" /></span></Link>)}</div><div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"><Button className="home-cta" asChild size="lg"><Link to="/blogg">Läs alla artiklar <ArrowRight data-icon="end" /></Link></Button></div></div></section>;
}

const lowestPrice = pricingPlans[0]?.price;
const operators = content.priser.operators;

/** Headline beside a phone where a real RCS message arrives (HeroPhone). */
function HeroFirst() {
  return <section id="top" className="bg-background"><div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-8"><div className="text-center lg:text-left"><h1 className="text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.5rem]">{home.hero.title}<br />{home.hero.highlight}</h1><p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl lg:mx-0">{home.hero.description}</p><div className="mt-8 flex justify-center lg:justify-start"><DualCtas /></div>{lowestPrice && operators.length ? <p className="mt-6 text-sm text-pretty text-muted-foreground">Listpris från <span className="font-semibold text-foreground tabular-nums">{lowestPrice}</span> per meddelande till kunder hos {operators.slice(0, -1).join(", ")} och {operators.at(-1)}. Priset beror på volym.</p> : null}</div><div className="mx-auto w-full max-w-[300px] sm:max-w-[310px]"><HeroPhone /></div></div></section>;
}
function DemoSection() { return <section id="sa-fungerar" className="relative scroll-mt-24 overflow-hidden bg-primary-soft py-16 sm:py-24"><Wave flip fill="var(--color-background)" /><div className="relative mx-auto px-5 pb-2 lg:px-8"><InteractiveRcsDemo /></div></section>; }
function ContactSection() { return <section id="kontakt" className="relative scroll-mt-24 overflow-hidden bg-background py-16 sm:py-24"><Wave flip fill="var(--color-primary-soft)" /><div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8"><h2 className={sectionTitle}>{home.kontakt.heading}</h2><p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{home.kontakt.intro}</p><div data-reveal className="mt-12 text-left"><LeadForm mode="contact" /></div></div></section>; }
