import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  CheckCheck,
  Code2,
  MessagesSquare,
  Send,
  Smartphone,
  Store,
} from "lucide-react";

import { RcsPhone } from "@/components/RcsPhone";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RCS Direkt – RCS Business Messaging för företag" },
      {
        name: "description",
        content:
          "Nå kunder direkt i meddelandeappen. RCS Direkt hjälper svenska företag med kampanjer, aviseringar och interaktiv kunddialog via RCS.",
      },
      { property: "og:title", content: "RCS Direkt – RCS Business Messaging för företag" },
      {
        property: "og:description",
        content: "Kampanjer, aviseringar och interaktiv kunddialog via RCS – med verifierad avsändare och läskvitto.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Send, title: "Kampanjer & utskick", body: "Rika utskick med bilder, gallerier och klickbara knappar – från produktlanseringar till helgkampanjer. Segmentera, schemalägg och följ resultatet live." },
  { icon: Bell, title: "Aviseringar & påminnelser", body: "Leveransstatus, bokningar och betalningspåminnelser som kommer fram. Automatiserade flöden med läs- och leveranskvitto i realtid." },
  { icon: MessagesSquare, title: "Interaktiv kunddialog", body: "Snabbsvar, formulär och botar direkt i konversationen. Låt kunder bekräfta, boka och köpa – utan att lämna meddelandeappen." },
  { icon: Code2, title: "RCS via API", body: "Skicka RCS från era egna system. Väl dokumenterat API med sandbox-miljö, webhooks och stöd för att falla tillbaka till SMS när RCS saknas." },
];

const steps = [
  { icon: Store, title: "1. Verifiera ert varumärke", body: "Vi registrerar och verifierar er avsändare hos operatörerna så att kunderna ser ert namn, er logotyp och en verifieringsmarkering." },
  { icon: Smartphone, title: "2. Bygg ert meddelande", body: "Sätt ihop kampanjer och flöden med bilder, knappar och snabbsvar – själva eller tillsammans med vårt team." },
  { icon: CheckCheck, title: "3. Skicka & följ upp", body: "Leverans, läsning och klick visas i realtid. Saknar mottagaren RCS-stöd går meddelandet automatiskt som SMS." },
];

const benefits = [
  { value: "Ingen", label: "app som ska laddas ner" },
  { value: "10x", label: "större meddelandeyta än SMS" },
  { value: "Realtid", label: "leverans- och läskvitton" },
  { value: "100 %", label: "verifierade avsändare" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <CompatibilityStrip />
        <Services />
        <HowItWorks />
        <BenefitsBand />
        <ContactCta />
      </main>
      <SiteFooter />
    </div>
  );
}

function Logo() {
  return (
    <span className="flex items-center gap-3 font-display text-lg font-bold">
      <span className="grid size-7 place-items-center rounded-sm bg-ink text-xs text-gold" aria-hidden="true">R</span>
      RCS Direkt
    </span>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-strong bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5">
        <a href="#top" aria-label="RCS Direkt, startsida"><Logo /></a>
        <nav aria-label="Huvudmeny" className="hidden items-center gap-1 md:flex">
          <a href="#tjanster" className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Tjänster</a>
          <a href="#safunkar" className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Så funkar det</a>
          <a href="#kontakt" className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Kontakt</a>
        </nav>
        <Button asChild size="sm">
          <a href="#kontakt">Boka demo <ArrowRight /></a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border bg-background py-14 sm:py-20 lg:py-24">
      <div className="absolute inset-y-0 right-0 hidden w-[39%] bg-ink lg:block" aria-hidden="true" />
      <div className="absolute inset-y-0 right-[39%] hidden w-px bg-border-strong lg:block" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="max-w-3xl lg:pr-10">
          <p className="animate-fade-up flex items-center gap-2 text-sm font-semibold text-primary">
            <BadgeCheck className="size-4" /> SMS:ens arvtagare – nu för företag
          </p>
          <h1 className="animate-fade-up-1 mt-6 text-[2.7rem] font-semibold leading-[0.98] sm:text-6xl lg:text-[4.6rem]">
            Få kunderna att agera direkt i meddelandet.
          </h1>
          <div className="editorial-rule mt-8 h-1 w-20" aria-hidden="true" />
          <p className="animate-fade-up-2 mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            RCS Direkt hjälper svenska företag att nå kunder med rika, verifierade meddelanden – bilder, knappar och läskvitton, rakt in i meddelandeappen. Ingen app att ladda ner.
          </p>
          <div className="animate-fade-up-3 mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><a href="#kontakt">Boka en demo <ArrowRight /></a></Button>
            <Button asChild size="lg" variant="outline"><a href="#tjanster">Utforska tjänsterna</a></Button>
          </div>
          <p className="mt-6 max-w-lg border-l border-border-strong pl-4 text-sm font-medium leading-relaxed text-muted-foreground">
            Ingen app. Verifierad avsändare. Leverans- och läskvitton i realtid.
          </p>
        </div>
        <div className="relative -mx-5 bg-ink px-5 py-10 sm:mx-0 sm:rounded-lg lg:bg-transparent lg:p-0">
          <RcsPhone />
        </div>
      </div>
    </section>
  );
}

function CompatibilityStrip() {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-6 text-sm text-muted-foreground">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Fungerar i</span>
        <span className="font-display font-semibold text-foreground">Google Messages</span>
        <span className="font-display font-semibold text-foreground">Samsung Messages</span>
        <span className="font-display font-semibold text-foreground">Apple Messages</span>
        <span className="text-xs">– utan extra app</span>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">{title}</h2>
      {text ? <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{text}</p> : null}
    </div>
  );
}

function Services() {
  return (
    <section id="tjanster" className="border-b border-border bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Tjänster" title="Allt ni behöver för att kommunicera via RCS" text="Från första kampanjen till fullständiga API-integrationer – vi tar er från tanke till levererat meddelande." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {services.map(({ icon: Icon, title, body }, index) => (
            <article key={title} className="group border-t border-border-strong bg-card p-7 shadow-soft transition-shadow hover:shadow-card">
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex size-10 items-center justify-center rounded-sm bg-primary-soft text-primary"><Icon className="size-5" /></span>
                <span className="font-display text-sm font-semibold text-gold">0{index + 1}</span>
              </div>
              <h3 className="mt-7 text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="safunkar" className="border-b border-ink-foreground/15 bg-ink py-20 text-ink-foreground sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-gold">Så funkar det</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">Från verifiering till leverans på dagar, inte månader</h2>
        </div>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-ink-foreground/15 bg-ink-foreground/15 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }) => (
            <li key={title} className="bg-ink p-7">
              <span className="inline-flex size-10 items-center justify-center rounded-sm bg-ink-foreground/8 text-gold"><Icon className="size-5" /></span>
              <h3 className="mt-7 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function BenefitsBand() {
  return (
    <section className="border-b border-border bg-surface-tint py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-10 px-5 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ value, label }) => (
          <div key={value} className="border-l border-border-strong pl-5">
            <p className="font-display text-4xl font-semibold text-primary">{value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section id="kontakt" className="bg-card py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-end gap-10 px-5 md:grid-cols-[1fr_auto]">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Nästa steg</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">Redo att nå kunderna direkt?</h2>
          <div className="editorial-rule mt-7 h-1 w-20" aria-hidden="true" />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">Boka en 20-minuters demo så visar vi hur RCS kan fungera för just er verksamhet – med exempel från er bransch.</p>
        </div>
        <Button asChild size="lg"><a href="mailto:hej@rcsdirekt.se"><Send /> hej@rcsdirekt.se</a></Button>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-ink-foreground/15 bg-ink py-12 text-ink-foreground">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 px-5 sm:flex-row sm:items-end">
        <div>
          <Logo />
          <div className="editorial-rule mt-4 h-1 w-14" aria-hidden="true" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">RCS Business Messaging för svenska företag.</p>
        </div>
        <p className="text-sm text-ink-muted">© {new Date().getFullYear()} RCS Direkt · rcsdirekt.se</p>
      </div>
    </footer>
  );
}