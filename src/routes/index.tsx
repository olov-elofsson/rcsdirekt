import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BadgeCheck, BarChart3, Braces, Check, Code2, Globe, Headphones, Images, Linkedin, Menu, TrendingUp, X, Youtube } from "lucide-react";

import logoUrl from "@/assets/rcsdirekt-logo.svg";
import { RcsPhone } from "@/components/RcsPhone";
import { Button } from "@/components/ui/button";
import { campaigns, industries } from "@/data/rcs-content";
import { pricingPlans } from "@/data/pricing-plans";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "RCS Direkt – Sveriges enklaste sätt att börja med RCS" },
    { name: "description", content: "Skicka RCS med bilder, knappar och verifierad avsändare. Enkel prissättning och personlig hjälp när du behöver den." },
    { property: "og:title", content: "RCS Direkt – Sveriges enklaste sätt att börja med RCS" },
    { property: "og:description", content: "Ett enkelt sätt för svenska företag att skicka RCS direkt till kundens meddelandeapp." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const assistedHref = "/skapa-konto";

function Index() {
  return <div className="min-h-screen bg-background text-foreground"><Header /><main><HeroFirst /><WhatIsRcs /><Advantages /><Pricing /><ContactSection /></main><Footer /></div>;
}

const sectionTitle = "text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.026em] sm:text-[2.65rem]";

function Logo({ white = false, className }: { white?: boolean; className?: string }) { return <img src={logoUrl} alt="RCS Direkt" className={cn("h-8 w-auto", white && "brightness-0 invert", className)} />; }

function Wave({ fill, flip = false, className }: { fill: string; flip?: boolean; className?: string }) { return <svg aria-hidden="true" className={cn("pointer-events-none absolute inset-x-0 z-0 h-14 w-full sm:h-20 lg:h-28", flip ? "-top-px rotate-180" : "-bottom-px", className)} viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0 62 C240 12 480 6 720 38 C960 70 1200 110 1440 54 L1440 120 L0 120 Z" fill={fill} /></svg>; }

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8"><a href="#top" aria-label="RCS Direkt, startsida" className="inline-flex items-center"><Logo /></a><div className="hidden items-center gap-5 sm:flex"><a href="/skapa-konto" className="text-xs font-semibold text-foreground hover:text-ink-foreground">Logga in</a><Button asChild size="sm" variant="secondary"><a href={assistedHref}>Skapa konto <ArrowRight /></a></Button></div><Button aria-label={open ? "Stäng meny" : "Öppna meny"} variant="ghost" size="icon" className="text-foreground lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>{open ? <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Mobilmeny"><Button asChild className="mt-5 w-full"><a href={assistedHref} onClick={() => setOpen(false)}>Skapa konto</a></Button></nav> : null}</header>;
}

function DualCtas({ dark = false }: { dark?: boolean }) { return <div className="flex flex-col gap-3 sm:flex-row"><Button asChild size="lg"><a href={assistedHref}>Skapa konto <ArrowRight /></a></Button><Button asChild size="lg" variant={dark ? "inverted" : "outline"}><a href="/kontakt">Prata med oss</a></Button></div>; }

const heroBenefits = [
  { icon: BadgeCheck, title: "Enkel prissättning", copy: "Från 0,30 SEK per meddelande. Inga månadskostnader." },
  { icon: Braces, title: "Lätt att integrera", copy: "Anslut ert befintliga system via API eller webhook." },
  { icon: Headphones, title: "Vi hjälper dig", copy: "Ring oss när du vill. Vi hjälper dig från idé till första utskick." },
];


const waysToSend = [
  { icon: Globe, key: "Webb", label: "Skicka RCS online", to: "/rcs-online" as const, copy: "Logga in och skapa kampanjen direkt i webbläsaren. Ladda upp mottagare, lägg till bilder, text och knappar, förhandsgranska och skicka. Inga tekniska förkunskaper krävs." },
  { icon: Code2, key: "API", label: "RCS API", to: "/rcs-api" as const, copy: "Koppla RCS till era egna system, till exempel e-handel, bokningssystem eller CRM, via REST API och webhooks. Orderbekräftelser, påminnelser och erbjudanden skickas då automatiskt när något händer hos er." },
];

function WhatIsRcs() {
  return <section id="vad-ar-rcs" className="relative overflow-hidden bg-primary-soft pt-32 pb-24 sm:pt-40 sm:pb-28"><Wave flip className="h-12 sm:h-16 lg:h-24" fill="var(--color-background)" /><div aria-hidden className="deco-dots pointer-events-none absolute left-8 top-36 h-56 w-56 opacity-[0.08] lg:left-16" /><div aria-hidden className="deco-dots pointer-events-none absolute bottom-28 right-8 h-56 w-56 opacity-[0.08] lg:right-16" /><div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8"><div className="max-w-xl"><h2 className={sectionTitle}>Mer än ett SMS. Mindre krångel än en app.</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">RCS är nästa generations meddelanden. Ert utskick hamnar direkt i kundens vanliga meddelandeapp, där vanliga SMS också visas. Men i stället för bara text kan meddelandet innehålla bilder, video, flera produkter att svepa mellan och knappar som kunden trycker på för att köpa, boka eller svara. Kunden behöver inte ladda ner någon app eller skapa något konto.</p><p className="mt-4 text-base leading-relaxed text-muted-foreground">Ert företagsnamn och er logotyp visas som avsändare, så mottagaren ser direkt vem meddelandet kommer från. Det ger mer förtroende och fler som faktiskt öppnar och agerar.</p><div className="mt-8 flex flex-wrap gap-3">{waysToSend.map(({ label, to }) => <Button key={label} asChild size="lg"><Link to={to}>{label} <ArrowRight /></Link></Button>)}</div></div><div className="rounded-[2.5rem] border border-border/70 bg-card p-8 shadow-card sm:p-10"><div className="grid divide-y divide-border">{waysToSend.map(({ icon: Icon, key, copy, to }) => <Link key={key} to={to} className="group flex items-start gap-4 py-5 first:pt-0 last:pb-0"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary ring-1 ring-border/50"><Icon className="size-4.5" /></span><div className="min-w-0 flex-1"><span className="flex items-center justify-between gap-3 pt-2.5 text-sm font-bold leading-5">{key}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p></div></Link>)}</div></div></div></section>;
}

const rcsAdvantages = [
  { icon: TrendingUp, title: "Upp till 35 % klickfrekvens", copy: "RCS-meddelanden ger betydligt högre engagemang än sms. Interaktiva knappar och rikt innehåll får kunderna att agera direkt." },
  { icon: Images, title: "Rikt innehåll och karuseller", copy: "Skicka bilder i hög upplösning, videor och produktkaruseller. Visa era produkter direkt i meddelandet – inga externa länkar behövs." },
  { icon: BadgeCheck, title: "Verifierad avsändare", copy: "Er företagsnamn och er logotyp visas direkt i meddelandet. Verifieringsmarkeringen skapar trygghet och skyddar mot bedrägeriförsök." },
  { icon: BarChart3, title: "Statistik i realtid", copy: "Följ leverans, läsningar och klick i realtid. Mät resultatet av varje utskick och förbättra kontinuerligt." },
];

const advantageChecks = ["Ingen prenumeration", "Inga bindningstider", "Betala per meddelande"];

function Advantages() {
  return <section className="relative overflow-hidden bg-background pt-28 pb-24 sm:pt-36 sm:pb-28"><Wave flip className="h-12 sm:h-16 lg:h-24" fill="var(--color-primary-soft)" /><div aria-hidden className="deco-dots pointer-events-none absolute left-8 top-28 h-52 w-52 opacity-[0.06] lg:left-16" /><div aria-hidden className="deco-dots pointer-events-none absolute bottom-28 right-8 h-52 w-52 opacity-[0.06] lg:right-16" /><div className="relative mx-auto max-w-6xl px-5 lg:px-8"><div className="mx-auto max-w-2xl text-center"><h2 className={sectionTitle}>Fördelarna med RCS</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">RCS kombinerar sms:ets räckvidd med möjligheterna i moderna meddelandeappar – ingen app att ladda ner, levererat direkt i kundens meddelandeapp.</p></div><div className="mx-auto mt-14 grid max-w-4xl gap-10 sm:grid-cols-2 sm:gap-x-14 sm:gap-y-12">{rcsAdvantages.map(({ icon: Icon, title, copy }) => <div key={title} className="flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary-soft text-primary ring-1 ring-border/60"><Icon className="size-5" /></span><div><h3 className="text-base font-extrabold tracking-[-0.01em]">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p></div></div>)}</div><div className="mt-14 flex justify-center"><DualCtas /></div><ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">{advantageChecks.map((item) => <li key={item} className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"><Check className="size-3.5 text-primary" />{item}</li>)}</ul></div></section>;
}

function Pricing() {
  return <section id="pris" className="relative bg-primary-soft pt-28 pb-24 sm:pt-36 sm:pb-28"><Wave flip className="h-12 sm:h-16 lg:h-24" fill="var(--color-background)" /><div aria-hidden className="deco-dots pointer-events-none absolute left-8 top-28 h-52 w-52 opacity-[0.08] lg:left-16" /><div aria-hidden className="deco-dots pointer-events-none absolute bottom-28 right-8 h-52 w-52 opacity-[0.08] lg:right-16" /><div className="relative mx-auto max-w-6xl px-5 lg:px-8"><div className="mx-auto max-w-2xl text-center"><h2 className={sectionTitle}>Pris per meddelande</h2><p className="mt-5 text-base font-bold">Inga månadskostnader</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Inga startavgifter och inga bindningstider. Skapa ditt konto och skicka ditt första RCS-meddelande på minuter.</p></div><div className="mt-12 grid gap-5 sm:grid-cols-3">{pricingPlans.map((plan) => <Link key={plan.name} to={plan.slug} className="group rounded-[2.5rem] border border-border/80 bg-card p-8 text-center shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-foreground/25 hover:shadow-lift"><p className="text-sm font-bold">{plan.name}</p><p className="mt-6 text-[2.6rem] font-extrabold leading-none tracking-[-0.03em]">{plan.price}</p><p className="mt-2 text-xs text-muted-foreground">per meddelande</p><span className="mt-7 inline-flex items-center gap-2 text-xs font-bold">Läs mer <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" /></span></Link>)}</div><div className="mt-10 text-center"><Link to="/jamfor-planer" className="text-sm font-semibold text-foreground underline underline-offset-4 transition-colors hover:text-ink-foreground">Vilken behöver jag?</Link></div></div></section>;
}

function HeroFirst() { const lumenCampaign = campaigns[5] ?? campaigns[0]; return <section id="top" className="relative overflow-hidden bg-background"><div aria-hidden className="hero-wash" /><div aria-hidden className="deco-dots pointer-events-none absolute left-10 top-36 h-56 w-56 opacity-[0.05]" /><div className="relative mx-auto max-w-6xl px-5 pb-24 pt-24 text-center sm:pt-28 lg:px-8"><h1 className="mx-auto max-w-4xl text-[2.75rem] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[5.5rem]">Ett enkelt sätt att<br /><span className="text-logo-blush">skicka</span> <span className="text-logo-peach">RCS</span></h1><p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">Skicka RCS direkt från webben eller integrera era egna system via API, med en prissättning som passar både små och stora projekt.</p><div id="prislista" className="mx-auto mt-14 grid max-w-5xl gap-10 sm:grid-cols-3 sm:gap-8">{heroBenefits.map(({ icon: Icon, title, copy }) => <div key={title}><span className="mx-auto grid size-12 place-items-center rounded-full bg-primary-soft text-primary shadow-soft ring-1 ring-border/60"><Icon className="size-5" /></span><h2 className="mt-5 text-lg font-extrabold tracking-[-0.015em]">{title}</h2><p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">{copy}</p></div>)}</div><div className="mt-14 flex justify-center"><DualCtas /></div><div className="relative mx-auto mt-20 flex min-h-[540px] max-w-4xl items-end justify-center overflow-hidden rounded-[2.75rem] bg-primary-soft px-6 pt-14 shadow-card sm:min-h-[580px]"><div className="hero-halo" /><div className="relative z-10 translate-y-10"><RcsPhone campaign={lumenCampaign} /></div></div></div></section>; }
function Footer() { return <footer id="kontakt" className="relative overflow-hidden bg-ink pt-28 pb-12 text-ink-foreground sm:pt-36 sm:pb-16"><Wave flip fill="var(--color-primary-soft)" /><div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:grid-cols-[1.2fr_2fr_auto] lg:px-8"><Logo className="h-9 w-auto" /><div className="grid grid-cols-3 gap-6 text-xs"><div><p className="font-bold">Produkt</p>{["Så fungerar det", "Pris"].map((item) => <a key={item} href={item === "Pris" ? "#pris" : "#vad-ar-rcs"} className="mt-2 block text-ink-muted transition-colors hover:text-ink-foreground">{item}</a>)}</div><div><p className="font-bold">Företag</p><a href="#kontakt" className="mt-2 block text-ink-muted transition-colors hover:text-ink-foreground">Om oss</a><a href="/kontakt" className="mt-2 block text-ink-muted transition-colors hover:text-ink-foreground">Kontakt</a></div><div><p className="font-bold">Juridiskt</p><a href="#kontakt" className="mt-2 block text-ink-muted transition-colors hover:text-ink-foreground">Integritet</a><a href="#kontakt" className="mt-2 block text-ink-muted transition-colors hover:text-ink-foreground">Villkor</a></div></div><div className="flex items-start gap-3"><a href="#top" aria-label="LinkedIn" className="text-ink-foreground"><Linkedin className="size-4" /></a><a href="#top" aria-label="Youtube" className="text-ink-foreground"><Youtube className="size-4" /></a></div></div><div className="mx-auto mt-10 max-w-7xl border-t border-ink-foreground/10 px-5 pt-6 text-right text-[10px] text-ink-muted lg:px-8">© {new Date().getFullYear()} RCS Direkt. Alla rättigheter reserverade.</div></footer>; }
