import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BadgeCheck, Braces, Check, Code2, Globe, Headphones, Linkedin, Menu, Sparkles, X, Youtube } from "lucide-react";

import logoAsset from "@/assets/rcsdirekt-logo.svg.asset.json";
import { RcsPhone } from "@/components/RcsPhone";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { campaigns, industries } from "@/data/rcs-content";
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

const assistedHref = "#kontakt";

function Index() {
  return <div className="min-h-screen bg-background text-foreground"><Header /><main><HeroFirst /><WhatIsRcs /><Pricing /></main><Footer /></div>;
}

const sectionTitle = "text-[2rem] font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-[2.5rem]";

function Logo({ white = false }: { white?: boolean }) { return <img src={logoAsset.url} alt="RCS Direkt" className={cn("h-7 w-auto", white && "brightness-0 invert")} />; }

function Header() {
  const [open, setOpen] = useState(false);
  const links: [string, string][] = [["Dokumentation", "#vad-ar-rcs"]];
  return <header className="sticky top-0 z-50 border-b border-foreground/10 bg-header-tint/95 backdrop-blur-lg"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8"><a href="#top" aria-label="RCS Direkt, startsida" className="inline-flex items-center"><Logo /></a><nav className="hidden items-center gap-7 lg:flex" aria-label="Huvudmeny">{links.map(([label, href]) => <a key={label} href={href} className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">{label}</a>)}<details className="group relative"><summary className="cursor-pointer list-none text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">Pris</summary><div className="absolute left-1/2 top-7 w-64 -translate-x-1/2 rounded-2xl border border-border bg-card p-5 shadow-card"><p className="text-xs font-bold">Pris per meddelande</p><div className="mt-3 grid gap-2 text-xs">{pricingPlans.map((plan) => <div key={plan.name} className="flex justify-between gap-5"><span className="text-muted-foreground">{plan.name}</span><span className="font-bold text-primary">{plan.price}</span></div>)}</div><p className="mt-4 border-t border-border pt-3 text-[11px] text-muted-foreground">Inga månadskostnader</p></div></details></nav><div className="hidden items-center gap-5 sm:flex"><a href="#kontakt" className="text-xs font-semibold text-foreground hover:text-ink-foreground">Logga in</a><Button asChild size="sm" variant="secondary"><a href={assistedHref}>Skapa konto <ArrowRight /></a></Button></div><Button aria-label={open ? "Stäng meny" : "Öppna meny"} variant="ghost" size="icon" className="text-foreground lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>{open ? <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Mobilmeny">{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)} className="block border-b border-border py-3 text-sm font-semibold text-foreground">{label}</a>)}<div className="border-b border-border py-4"><p className="text-sm font-semibold">Pris</p><div className="mt-3 grid gap-2">{pricingPlans.map((plan) => <p key={plan.name} className="flex justify-between text-xs"><span className="text-muted-foreground">{plan.name}</span><span className="font-bold text-primary">{plan.price}</span></p>)}</div><p className="mt-2 text-[11px] text-muted-foreground">Inga månadskostnader</p></div><Button asChild className="mt-5 w-full"><a href={assistedHref} onClick={() => setOpen(false)}>Skapa konto</a></Button></nav> : null}</header>;
}

function DualCtas({ dark = false }: { dark?: boolean }) { return <div className="flex flex-col gap-3 sm:flex-row"><Button asChild size="lg"><a href={assistedHref}>Skapa konto <ArrowRight /></a></Button><Button asChild size="lg" variant="outline" className={dark ? "border-ink-foreground/40 bg-transparent text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground" : ""}><a href={assistedHref}>Prata med oss</a></Button></div>; }

const heroBenefits = [
  { icon: BadgeCheck, title: "Enkel prissättning", copy: "Från 0,30 SEK per meddelande. Inga månadskostnader." },
  { icon: Braces, title: "Lätt att integrera", copy: "Anslut ert befintliga system via API eller webhook." },
  { icon: Headphones, title: "Vi hjälper dig", copy: "Ring oss när du vill. Vi hjälper dig från idé till första utskick." },
];


const referenceLogos = [
  { alt: "Google", src: "https://cdn-web.infobip.com/uploads/2024/12/google-1.png" },
  { alt: "Uber", src: "https://cdn-web.infobip.com/uploads/2024/12/uber-1.png" },
  { alt: "Bolt", src: "https://cdn-web.infobip.com/uploads/2024/12/bolt-1.svg" },
  { alt: "Strava", src: "https://cdn-web.infobip.com/uploads/2024/12/strava-1.png" },
  { alt: "Santander", src: "https://cdn-web.infobip.com/uploads/2024/12/santander-1.svg" },
  { alt: "Coca-Cola", src: "https://cdn-web.infobip.com/uploads/2024/12/coca-cola-1.png" },
];

const waysToSend = [
  { icon: Globe, title: "Komplett webbgränssnitt för RCS & SMS-kampanjer", copy: "Skapa kampanjen, lägg in mottagare, bilder och meddelande — och skicka direkt i webbläsaren." },
  { icon: Code2, title: "REST API för att bygga in RCS & SMS i era applikationer", copy: "Koppla ert befintliga system via API eller webhook och låt meddelanden gå ut automatiskt." },
  { icon: Sparkles, title: "AI-verktyg — skicka RCS & SMS via Claude, ChatGPT med flera", copy: "Beskriv vad du vill säga och låt AI sätta ihop meddelandet. Du godkänner alltid innan det skickas." },
];

function WhatIsRcs() {
  return <section id="vad-ar-rcs" className="border-b border-border bg-background py-20 sm:py-24"><div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:px-8"><div className="relative order-last overflow-hidden rounded-[2.25rem] bg-ink p-9 text-ink-foreground shadow-lift sm:p-12 lg:order-first"><div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-foreground/5 to-transparent" /><ul className="relative grid gap-5 text-sm">{["Verifierad avsändare med namn och logotyp", "Bilder, video och produktkort", "Knappar för köp, bokning och svar", "Leveransstatus, läskvitton och klick", "SMS fallback när RCS inte kan levereras"].map((item) => <li key={item} className="flex gap-3 border-b border-ink-foreground/15 pb-5 text-base last:border-0 last:pb-0"><Check className="mt-1 size-4 shrink-0 text-ink-foreground" /><span className="leading-relaxed">{item}</span></li>)}</ul></div><div><h2 className={sectionTitle}>SMS, fast med fler möjligheter</h2><p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">RCS är nästa generation SMS. Meddelandet kommer direkt till mobilens vanliga meddelandeapp. Kunden behöver inte ladda ner något.</p><p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">Du kan skicka bilder och video, visa flera produkter och lägga in knappar för köp, bokning eller svar. Företagsnamn och logotyp visar vem som är avsändare.</p><div className="mt-12 grid gap-4">{waysToSend.map(({ icon: Icon, title, copy }) => <div key={title} className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"><div className="flex items-center gap-4"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary"><Icon className="size-4" /></span><p className="text-sm font-bold leading-snug">{title}</p></div><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p></div>)}</div></div></div></section>;
}

function Pricing() {
  return <section id="pris" className="border-b border-border bg-primary-soft py-20 sm:py-24"><div className="mx-auto max-w-6xl px-5 lg:px-8"><div className="mx-auto max-w-2xl text-center"><h2 className={sectionTitle}>Pris per meddelande</h2><p className="mt-5 text-base font-bold">Inga månadskostnader</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Inga startavgifter och inga bindningstider. Skapa ditt konto och skicka ditt första RCS-meddelande på minuter.</p></div><div className="mt-12 grid gap-5 sm:grid-cols-3">{pricingPlans.map((plan) => <div key={plan.name} className="rounded-[2rem] border border-border bg-card p-8 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"><p className="text-sm font-bold">{plan.name}</p><p className="mt-6 text-4xl font-extrabold tracking-[-0.02em]">{plan.price}</p><p className="mt-2 text-xs text-muted-foreground">per meddelande</p></div>)}</div><div className="mt-10 text-center"><Dialog><DialogTrigger asChild><button className="text-sm font-semibold text-foreground underline underline-offset-4 transition-colors hover:text-ink-foreground">Jämför planerna</button></DialogTrigger><DialogContent className="max-w-2xl"><DialogHeader><DialogTitle className="text-left text-2xl font-bold">Skillnaden mellan planerna</DialogTitle><DialogDescription className="text-left">Alla planer betalas per skickat meddelande. Priset styrs av vad meddelandet kan innehålla.</DialogDescription></DialogHeader><div className="grid gap-4 text-left">{planExplanations.map((plan) => <div key={plan.name} className="rounded-2xl border border-border bg-background p-5"><div className="flex items-baseline justify-between gap-4"><p className="text-sm font-bold">{plan.name}</p><p className="text-sm font-extrabold">{plan.price}</p></div><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{plan.copy}</p></div>)}</div><DialogFooter className="sm:justify-start"><p className="text-xs text-muted-foreground">Inga månadskostnader</p></DialogFooter></DialogContent></Dialog></div></div></section>;
}

function HeroFirst() { const lumenCampaign = campaigns[5] ?? campaigns[0]; return <section id="top" className="relative overflow-hidden bg-background"><div aria-hidden className="hero-wash" /><div className="relative mx-auto max-w-6xl px-5 pb-20 pt-24 text-center sm:pt-28 lg:px-8"><h1 className="mx-auto max-w-4xl text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[5.25rem]">Ett enkelt sätt att<br /><span className="logo-gradient-text">skicka RCS</span></h1><p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">Skicka bilder, video, knappar och verifierade meddelanden direkt i kundens vanliga meddelandeapp.</p><div id="prislista" className="mx-auto mt-16 grid max-w-5xl gap-10 sm:grid-cols-3 sm:gap-8">{heroBenefits.map(({ icon: Icon, title, copy }) => <div key={title}><span className="mx-auto grid size-12 place-items-center rounded-full bg-primary-soft text-primary shadow-soft"><Icon className="size-5" /></span><h2 className="mt-5 text-lg font-bold tracking-[-0.01em]">{title}</h2><p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">{copy}</p></div>)}</div><div className="mt-14 flex justify-center"><DualCtas /></div><div className="relative mx-auto mt-20 flex min-h-[540px] max-w-4xl items-end justify-center overflow-hidden rounded-[2.75rem] bg-primary-soft px-6 pt-14 shadow-card sm:min-h-[580px]"><div className="hero-halo" /><div className="relative z-10 translate-y-10"><RcsPhone campaign={lumenCampaign} /></div></div></div><div className="mx-auto mt-16 max-w-5xl"><p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Företag som redan använder RCS</p><div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">{referenceLogos.map((logo) => <img key={logo.alt} src={logo.src} alt={logo.alt} loading="lazy" className="h-6 w-auto grayscale opacity-55" />)}</div></div></section>; }
const pricingPlans = [
  { name: "RCS Basic", price: "0,30 SEK" },
  { name: "RCS Single", price: "0,425 SEK" },
  { name: "RCS Conversation", price: "0,63 SEK" },
];

const planExplanations = [
  { name: "RCS Basic", price: "0,30 SEK", copy: "Enklaste meddelandet. Text med verifierad avsändare. Passar påminnelser, kvitton och kort information." },
  { name: "RCS Single", price: "0,425 SEK", copy: "Ett riktare meddelande med bilder och knappar. Kunden agerar direkt i meddelandet, utan att lämna sidan." },
  { name: "RCS Conversation", price: "0,63 SEK", copy: "Tvåvägskommunikation. Kunden kan svara och ni fortsätter konversationen direkt i meddelandeappen." },
];
function Footer() { return <footer id="kontakt" className="bg-ink py-10 text-ink-foreground"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:grid-cols-[1.2fr_2fr_auto] lg:px-8"><Logo /><div className="grid grid-cols-3 gap-6 text-xs"><div><p className="font-bold">Produkt</p>{["Så fungerar det", "Pris"].map((item) => <a key={item} href={item === "Pris" ? "#pris" : "#vad-ar-rcs"} className="mt-2 block text-ink-muted transition-colors hover:text-ink-foreground">{item}</a>)}</div><div><p className="font-bold">Företag</p><a href="#kontakt" className="mt-2 block text-ink-muted transition-colors hover:text-ink-foreground">Om oss</a><a href="#kontakt" className="mt-2 block text-ink-muted transition-colors hover:text-ink-foreground">Kontakt</a></div><div><p className="font-bold">Juridiskt</p><a href="#kontakt" className="mt-2 block text-ink-muted transition-colors hover:text-ink-foreground">Integritet</a><a href="#kontakt" className="mt-2 block text-ink-muted transition-colors hover:text-ink-foreground">Villkor</a></div></div><div className="flex items-start gap-3"><a href="#top" aria-label="LinkedIn" className="text-ink-foreground"><Linkedin className="size-4" /></a><a href="#top" aria-label="Youtube" className="text-ink-foreground"><Youtube className="size-4" /></a></div></div><div className="mx-auto mt-10 max-w-7xl border-t border-ink-foreground/10 px-5 pt-6 text-right text-[10px] text-ink-muted lg:px-8">© {new Date().getFullYear()} RCS Direkt. Alla rättigheter reserverade.</div></footer>; }
