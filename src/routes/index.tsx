import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Check, Code2, Globe, TrendingUp, Wallet, X } from "lucide-react";

import { LeadForm } from "@/components/LeadForm";
import { InteractiveRcsDemo } from "@/components/InteractiveRcsDemo";
import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/data/pricing-plans";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "RCS för företag: skicka RCS enkelt" },
    { name: "description", content: "Skicka RCS för företag direkt från webben eller via API. Bilder, knappar och verifierad avsändare. Från 0,30 SEK per meddelande, inga månadskostnader." },
    { property: "og:title", content: "RCS för företag: skicka RCS enkelt" },
    { property: "og:description", content: "Skicka RCS för företag direkt från webben eller via API. Bilder, knappar och verifierad avsändare. Från 0,30 SEK per meddelande, inga månadskostnader." },
    { property: "og:type", content: "website" }, { property: "og:url", content: "https://rcsdirekt.se/" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  links: [{ rel: "canonical", href: "https://rcsdirekt.se/" }],
  scripts: [{ type: "application/ld+json", children: JSON.stringify({"@context":"https://schema.org","@type":"Organization","name":"RCS Direkt","url":"https://rcsdirekt.se/","logo":"https://rcsdirekt.se/favicon.svg","description":"RCS för företag. Skicka RCS från webben eller via API."}) }],
  }),
  component: Index,
});

const assistedHref = "/skapa-konto";

function Index() {
  return <div className="min-h-screen bg-background text-foreground"><SiteHeader /><main><HeroFirst /><DemoSection /><Comparison /><Advantages /><WhatIsRcs /><Pricing /><ContactSection /></main><SiteFooter /></div>;
}

const sectionTitle = "text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.026em] sm:text-[2.65rem]";

function Wave({ fill, flip = false, className }: { fill: string; flip?: boolean; className?: string }) { return <svg aria-hidden="true" className={cn("pointer-events-none absolute inset-x-0 z-0 h-14 w-full sm:h-20 lg:h-28", flip ? "-top-px rotate-180" : "-bottom-px", className)} viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0 62 C240 12 480 6 720 38 C960 70 1200 110 1440 54 L1440 120 L0 120 Z" fill={fill} /></svg>; }


function DualCtas({ dark = false }: { dark?: boolean }) { return <div className="flex flex-col gap-3 sm:flex-row"><Button asChild size="lg"><a href={assistedHref}>Skapa konto <ArrowRight /></a></Button><Button asChild size="lg" variant={dark ? "inverted" : "outline"}><a href="/kontakt">Prata med oss</a></Button></div>; }

const waysToSend = [
  { icon: Globe, key: "Webb", label: "RCS i webbgränssnitt", to: "/rcs-online" as const, copy: "Logga in och skapa kampanjen direkt i webbläsaren. Ladda upp mottagare, lägg till bilder, text och knappar, förhandsgranska och skicka. Inga tekniska förkunskaper krävs." },
  { icon: Code2, key: "API", label: "RCS API", to: "/rcs-api" as const, copy: "Koppla RCS till era egna system, till exempel e-handel, bokningssystem eller CRM, via REST API och webhooks. Orderbekräftelser, påminnelser och erbjudanden skickas då automatiskt när något händer hos er." },
];

function WhatIsRcs() {
  return <section id="vad-ar-rcs" className="relative overflow-hidden bg-background pt-24 pb-24 sm:pt-28 sm:pb-28"><div aria-hidden className="deco-dots pointer-events-none absolute left-8 top-20 h-56 w-56 opacity-[0.05] lg:left-16" /><div aria-hidden className="deco-dots pointer-events-none absolute bottom-24 right-8 h-56 w-56 opacity-[0.05] lg:right-16" /><div className="mx-auto grid max-w-6xl items-start gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8"><div className="max-w-md"><h2 className={sectionTitle}>Två sätt att skicka</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">Båda vägarna använder samma RCS-nätverk, samma avsändare och samma pris per meddelande. Skillnaden är vem som bygger meddelandet, ni eller era system.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg"><Link to="/rcs-online">RCS i webbgränssnitt</Link></Button><Button asChild size="lg" variant="outline"><Link to="/rcs-api">RCS via API</Link></Button></div></div><div className="grid divide-y divide-border">{waysToSend.map(({ icon: Icon, key, copy }) => <div key={key} className="group flex items-start gap-4 py-5 first:pt-0 last:pb-0"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary ring-1 ring-border/50"><Icon className="size-4.5" /></span><div className="min-w-0"><h3 className="text-sm font-bold leading-5">{key}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p></div></div>)}</div></div></section>;
}

const rcsAdvantages = [
  { icon: TrendingUp, title: "Upp till 35 % klickfrekvens", copy: "RCS-meddelanden ger betydligt högre engagemang än ett vanligt textutskick. Interaktiva knappar och rikt innehåll får kunderna att agera direkt." },
  { icon: BarChart3, title: "Statistik i realtid", copy: "Följ leverans, läsningar och klick medan utskicket pågår. Se vad som fungerar och justera nästa utskick." },
  { icon: Wallet, title: "Mer resultat för pengarna", copy: "När fler kunder öppnar, klickar och svarar får ni mer utav samma budget. Betala bara för de meddelanden som faktiskt skickas." },
  { icon: Globe, title: "En internationell standard", copy: "RCS är en branschstandard som stöds av operatörer och telefontillverkare världen över. Samma teknik fungerar oavsett var era kunder finns." },
];

const comparisonRows: { label: string; sms: boolean | string; rcs: boolean | string }[] = [
  { label: "Verifierad avsändare", sms: false, rcs: true },
  { label: "Avsändarprofil", sms: "Begränsad", rcs: "Stark" },
  { label: "Tecken per meddelande", sms: "160 tecken", rcs: "Upp till ca 4 000" },
  { label: "Analys och insikter", sms: "Levererat", rcs: "Levererat, sett, klick" },
  { label: "AI-/GenAI-stöd", sms: "Ja, till viss del", rcs: "Ja" },
  { label: "Tillgänglighet i Sverige", sms: "Alla mobiler", rcs: "Android 5.0 eller senare, iOS 27" },
  { label: "Rich features (bilder, knappar m.m.)", sms: false, rcs: true },
  { label: "Installation", sms: "Ingen", rcs: "Ingen (inbyggt där det finns)" },
];

function CompareCell({ value, highlight }: { value: boolean | string; highlight: boolean }) {
  const tone = highlight ? "text-logo-blush" : "text-muted-foreground";
  return <span className={cn("flex justify-center text-center text-[0.7rem] font-semibold leading-snug sm:text-xs", tone)}>{typeof value === "boolean" ? (value ? <Check className="size-5" /> : <X className="size-5 text-muted-foreground/50" />) : value}</span>;
}

function Comparison() {
  return <section className="relative overflow-hidden bg-background pt-24 pb-24 sm:pt-28 sm:pb-28"><div aria-hidden className="deco-dots pointer-events-none absolute left-8 top-16 h-56 w-56 opacity-[0.05] lg:left-16" /><div className="relative mx-auto max-w-3xl px-5 lg:px-8"><div className="mx-auto max-w-2xl text-center"><h2 className={sectionTitle}>RCS jämfört med SMS</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">Båda hamnar i kundens meddelandeapp och betalas per meddelande. Skillnaden är vad som ryms i varje meddelande.</p></div><div className="mt-12 rounded-[2rem] border border-border/80 bg-card px-4 py-2 shadow-card sm:px-7"><div className="grid grid-cols-[1fr_5.5rem_5.5rem] items-center gap-x-2 pt-3 sm:grid-cols-[1fr_9rem_9rem]"><span aria-hidden /><span className="text-center text-xs font-bold uppercase tracking-wide text-muted-foreground">SMS</span><span className="text-center text-xs font-bold uppercase tracking-wide text-logo-blush">RCS</span></div><div className="divide-y divide-border">{comparisonRows.map((row) => <div key={row.label} className="grid grid-cols-[1fr_5.5rem_5.5rem] items-center gap-x-2 py-3 sm:grid-cols-[1fr_9rem_9rem]"><span className="text-sm font-semibold leading-snug">{row.label}</span><CompareCell value={row.sms} highlight={false} /><CompareCell value={row.rcs} highlight={typeof row.rcs === "string"} /></div>)}</div></div></div></section>;
}

function Advantages() {
  return <section className="relative overflow-hidden bg-primary-soft pt-28 pb-24 sm:pt-36 sm:pb-28"><Wave flip className="h-12 sm:h-16 lg:h-24" fill="var(--color-background)" /><div aria-hidden className="deco-dots pointer-events-none absolute left-8 top-36 h-56 w-56 opacity-[0.08] lg:left-16" /><div aria-hidden className="deco-dots pointer-events-none absolute bottom-28 right-8 h-56 w-56 opacity-[0.08] lg:right-16" /><div className="relative mx-auto max-w-5xl px-5 lg:px-8"><div className="max-w-2xl"><h2 className={sectionTitle}>Fördelarna med RCS</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">Mycket av det som gör RCS bra syns redan i demonstrationen. Här är fler saker som dessutom går att mäta.</p></div><div className="mt-12 grid gap-5 sm:grid-cols-2">{rcsAdvantages.map(({ icon: Icon, title, copy }) => <div key={title} className="rounded-[2rem] border border-border/80 bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-foreground/25 hover:shadow-lift"><span className="grid size-11 place-items-center rounded-full bg-primary-soft text-primary ring-1 ring-border/60"><Icon className="size-5" /></span><h3 className="mt-6 text-lg font-extrabold tracking-[-0.01em]">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p></div>)}</div><div className="mt-12 flex justify-center"><DualCtas /></div></div><Wave fill="var(--color-background)" className="h-10 sm:h-14 lg:h-20" /></section>;
}

function Pricing() {
  return <section id="pris" className="relative bg-primary-soft pt-28 pb-24 sm:pt-36 sm:pb-28"><Wave flip className="h-12 sm:h-16 lg:h-24" fill="var(--color-background)" /><div aria-hidden className="deco-dots pointer-events-none absolute left-8 top-28 h-52 w-52 opacity-[0.08] lg:left-16" /><div aria-hidden className="deco-dots pointer-events-none absolute bottom-28 right-8 h-52 w-52 opacity-[0.08] lg:right-16" /><div className="relative mx-auto max-w-6xl px-5 lg:px-8"><div className="mx-auto max-w-2xl text-center"><h2 className={sectionTitle}>Pris per meddelande</h2><p className="mt-5 text-base font-bold">Inga månadskostnader</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Inga startavgifter och inga bindningstider. Skapa ditt konto och skicka ditt första RCS-meddelande på minuter.</p></div><div className="mt-12 grid gap-5 sm:grid-cols-3">{pricingPlans.map((plan) => <Link key={plan.name} to={plan.slug} className="group rounded-[2rem] border border-border/80 bg-card p-8 text-center shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-foreground/25 hover:shadow-lift"><p className="text-sm font-bold">{plan.name}</p><p className="mt-6 text-[2.6rem] font-extrabold leading-none tracking-[-0.03em]">{plan.price}</p><p className="mt-2 text-xs text-muted-foreground">per meddelande</p></Link>)}</div></div><Wave fill="var(--color-background)" className="h-10 sm:h-14 lg:h-20" /></section>;
}

function HeroFirst() { return <section id="top" className="relative overflow-hidden bg-background"><div aria-hidden className="deco-dots pointer-events-none absolute left-10 top-36 h-56 w-56 opacity-[0.05]" /><div className="relative mx-auto max-w-7xl px-5 pb-24 pt-24 text-center sm:pb-28 sm:pt-28 lg:px-8"><h1 className="mx-auto max-w-4xl text-[2.75rem] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[5.5rem]">Det smidiga sättet att<br /><span className="text-logo-blue">skicka RCS</span></h1><p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">Använd vårt webbgränssnitt eller integrera via API. Flexibel prissättning för allt från enstaka kampanjer till storskaliga utskick.</p><div className="mt-10 flex justify-center"><DualCtas /></div></div></section>; }
function DemoSection() { return <section className="relative overflow-hidden bg-primary-soft pt-28 pb-24 sm:pt-36 sm:pb-28"><Wave flip className="h-12 sm:h-16 lg:h-24" fill="var(--color-background)" /><div aria-hidden className="deco-dots pointer-events-none absolute left-8 top-36 h-56 w-56 opacity-[0.08] lg:left-16" /><div aria-hidden className="deco-dots pointer-events-none absolute bottom-28 right-8 h-56 w-56 opacity-[0.08] lg:right-16" /><div className="relative mx-auto px-5 pb-2 lg:px-8"><InteractiveRcsDemo /></div><Wave fill="var(--color-background)" className="h-10 sm:h-14 lg:h-20" /></section>; }
function ContactSection() { return <section id="kontakt" className="relative overflow-hidden bg-background pb-24 pt-24 sm:pb-28 sm:pt-28"><div aria-hidden className="deco-dots pointer-events-none absolute right-10 top-16 h-52 w-52 opacity-[0.06]" /><div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8"><h2 className={sectionTitle}>Prata med oss</h2><p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">Frågor om RCS, API-tillgång eller vilken meddelandetyp som passar? Skriv några rader så återkommer vi.</p><div className="mt-12 text-left"><LeadForm mode="contact" /></div></div></section>; }
