import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Check, Code2, Globe, TrendingUp, Wallet, X } from "lucide-react";


import { LeadForm } from "@/components/LeadForm";
import { InteractiveRcsDemo } from "@/components/InteractiveRcsDemo";
import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { pricingPlans } from "@/data/pricing-plans";
import { articles } from "@/data/rcs-knowledge";
import { cn } from "@/lib/utils";
import { Wave } from "@/components/BandWave";
import { PageHeading } from "@/components/PageHeading";
import { CustomerPresentations } from "@/components/CustomerPresentations";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Det smidiga sättet att skicka RCS" },
    { name: "description", content: "Skicka RCS för företag direkt från webben eller via API. Bilder, knappar och verifierad avsändare. Från 0,30 SEK per meddelande, inga månadskostnader." },
    { property: "og:title", content: "Det smidiga sättet att skicka RCS" },
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
  return <div className="home-refined min-h-screen bg-background text-foreground"><SiteHeader /><main><HeroFirst /><CustomerPresentations /><DemoSection /><Advantages /><Comparison /><WhatIsRcs /><Pricing /><BlogSection /><ContactSection /></main><SiteFooter /></div>;
}

const sectionTitle = "text-[2.1rem] font-extrabold leading-tight tracking-normal sm:text-[2.65rem]";



function DualCtas({ dark = false }: { dark?: boolean }) { return <div className="flex flex-col gap-3 sm:flex-row"><Button className="home-cta" asChild size="lg"><a href={assistedHref}>Skapa konto <ArrowRight /></a></Button><Button className="home-cta" asChild size="lg" variant={dark ? "inverted" : "outline"}><a href="/#kontakt">Prata med oss</a></Button></div>; }

const waysToSend = [
  { icon: Globe, key: "Webb", label: "RCS i webbgränssnitt", copy: "Logga in och skapa kampanjen direkt i webbläsaren. Ladda upp mottagare, lägg till bilder, text och knappar, förhandsgranska och skicka. Inga tekniska förkunskaper krävs." },
  { icon: Code2, key: "API", label: "RCS API", copy: "Koppla RCS till era egna system, till exempel e-handel, bokningssystem eller CRM, via REST API och webhooks. Orderbekräftelser, påminnelser och erbjudanden skickas då automatiskt när något händer hos er." },
];

function WhatIsRcs() {
  return <section id="vad-ar-rcs" className="relative overflow-hidden bg-background py-16 sm:py-24 lg:py-28"><Wave flip fill="var(--color-primary-soft)" /><div className="mx-auto grid max-w-6xl items-start gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8"><div className="max-w-md"><h2 className={sectionTitle}>Från webben eller via API</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">Båda vägarna använder samma RCS-nätverk, samma avsändare och samma pris per meddelande. Skillnaden är vem som bygger meddelandet, ni eller era system.</p></div><div className="grid divide-y divide-border">{waysToSend.map(({ icon: Icon, key, copy }) => <div key={key} className="group flex items-start gap-4 py-5 first:pt-0 last:pb-0"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary ring-1 ring-border/50"><Icon className="size-4.5" /></span><div className="min-w-0"><h3 className="text-sm font-bold leading-5">{key}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p></div></div>)}</div></div></section>;
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
  return <section id="rcs-mot-sms" className="relative overflow-hidden bg-primary-soft py-16 sm:py-24 lg:py-28"><Wave flip fill="var(--color-background)" /><div className="relative mx-auto max-w-3xl px-5 lg:px-8"><div className="mx-auto max-w-2xl text-center"><h2 className={sectionTitle}>RCS och SMS sida vid sida</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">Båda hamnar i kundens meddelandeapp och betalas per meddelande. Skillnaden är vad som ryms i varje meddelande.</p></div><div className="mt-12 rounded-lg border border-border/80 bg-card px-4 py-2 shadow-card sm:px-7"><div className="grid grid-cols-[1fr_5.5rem_5.5rem] items-center gap-x-2 pt-3 sm:grid-cols-[1fr_9rem_9rem]"><span aria-hidden /><span className="text-center text-xs font-bold uppercase tracking-wide text-muted-foreground">SMS</span><span className="text-center text-xs font-bold uppercase tracking-wide text-logo-blush">RCS</span></div><div className="divide-y divide-border">{comparisonRows.map((row) => <div key={row.label} className="grid grid-cols-[1fr_5.5rem_5.5rem] items-center gap-x-2 py-3 sm:grid-cols-[1fr_9rem_9rem]"><span className="text-sm font-semibold leading-snug">{row.label}</span><CompareCell value={row.sms} highlight={false} /><CompareCell value={row.rcs} highlight={typeof row.rcs === "string"} /></div>)}</div></div></div></section>;
}

function Advantages() {
  return <section id="fordelar" className="relative overflow-hidden bg-background pt-28 pb-24 sm:pt-36 sm:pb-28"><Wave flip className="h-12 sm:h-16 lg:h-24" fill="var(--color-primary-soft)" /><div className="relative mx-auto max-w-6xl px-5 lg:px-8"><div className="max-w-2xl"><h2 className={sectionTitle}>Varför företag väljer RCS</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">Rikare meddelanden ger fler klick, svar och köp – och allt går att mäta.</p></div><div className="mt-12 grid gap-5 sm:grid-cols-2">{rcsAdvantages.map(({ icon: Icon, title, copy }) => <div key={title} className="rounded-lg border border-border/80 bg-card p-8 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-lift"><span className="grid size-11 place-items-center rounded-full bg-primary-soft text-primary ring-1 ring-border/60"><Icon className="size-5" /></span><h3 className="mt-6 text-lg font-extrabold tracking-normal">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p></div>)}</div><div className="mt-12 flex justify-center"><DualCtas /></div></div></section>;
}

function Pricing() {
  return <section id="pris" className="relative bg-primary-soft pt-28 pb-24 sm:pt-36 sm:pb-28"><Wave flip fill="var(--color-background)" /><div className="relative mx-auto max-w-6xl px-5 lg:px-8"><div className="mx-auto max-w-2xl text-center"><h2 className={sectionTitle}>Enkel prissättning</h2><p className="mx-auto mt-5 text-base font-bold">Inga månadskostnader</p><p className="mx-auto mt-2 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">Betala per meddelande. Inga startavgifter och inga bindningstider.</p></div><div className="mt-12 grid gap-5 sm:grid-cols-3">{pricingPlans.map((plan) => <Link key={plan.name} to="/priser" className={cn("group relative rounded-lg border bg-card p-8 text-center shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift", plan.badge ? "border-primary/30" : "border-border/80 hover:border-foreground/25")}>{plan.badge ? <span className="absolute -top-3 left-1/2 inline-flex h-7 -translate-x-1/2 items-center rounded-full bg-primary px-4 text-xs font-bold whitespace-nowrap text-primary-foreground">{plan.badge}</span> : null}<p className="text-sm font-bold">{plan.name}</p><p className="mt-6 text-[2.6rem] font-extrabold leading-none tracking-normal">{plan.price}</p><p className="mt-2 text-xs text-muted-foreground">per meddelande</p></Link>)}</div></div></section>;
}

function BlogSection() {
  const picks = ["vad-ar-rcs", "rcs-e-handel", "rcs-fallback-sms"].map((slug) => articles.find((article) => article.slug === slug)).filter((a): a is (typeof articles)[number] => Boolean(a));
  return <section id="blogg" className="relative overflow-hidden bg-background py-16 sm:py-24 lg:py-28"><Wave flip fill="var(--color-primary-soft)" /><div className="relative mx-auto max-w-6xl px-5 lg:px-8"><div className="mx-auto max-w-2xl text-center"><h2 className={sectionTitle}>Kunskap och guider</h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">Guider och förklaringar om RCS, från grunderna till API och webhooks. Allt på svenska, med källor.</p></div><div className="mt-12 grid gap-5 sm:grid-cols-3">{picks.map((article) => <Link key={article.slug} to="/blogg/$slug" params={{ slug: article.slug }} className="group flex flex-col rounded-lg border border-border/80 bg-card p-8 text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-lift"><Badge variant="secondary" className="self-start">{article.category}</Badge><h3 className="mt-4 text-lg font-extrabold tracking-normal transition-colors group-hover:text-logo-blue">{article.title}</h3><p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{article.description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-colors group-hover:text-logo-blue">Läs artikeln <ArrowRight className="size-4" /></span></Link>)}</div><div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"><Button className="home-cta" asChild size="lg"><Link to="/blogg">Läs alla artiklar <ArrowRight /></Link></Button></div></div></section>;
}

function HeroFirst() { return <section id="top" className="bg-background"><PageHeading title={<>Det smidiga sättet att<br /><span className="text-logo-blue">skicka RCS</span></>} description={<p>Skicka meddelanden med bilder, knappar och verifierad avsändare – direkt från webben eller via API. Betala bara för det ni skickar.</p>}><DualCtas /></PageHeading></section>; }
function DemoSection() { return <section id="sa-fungerar" className="relative scroll-mt-24 overflow-hidden bg-primary-soft pt-28 pb-24 sm:pt-36 sm:pb-28"><Wave flip fill="var(--color-background)" /><div className="relative mx-auto px-5 pb-2 lg:px-8"><InteractiveRcsDemo /></div></section>; }
function ContactSection() { return <section id="kontakt" className="relative scroll-mt-24 overflow-hidden bg-primary-soft py-16 sm:py-24 lg:py-28"><Wave flip fill="var(--color-background)" /><div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8"><h2 className={sectionTitle}>Kom igång med RCS</h2><p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">Berätta vad ni vill skicka, så hjälper vi er med avsändare, upplägg och integration.</p><div className="mt-12 text-left"><LeadForm mode="contact" /></div></div></section>; }
