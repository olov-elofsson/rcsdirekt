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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RCS Direkt – RCS Business Messaging för svenska företag" },
      {
        name: "description",
        content:
          "Nå dina kunder direkt i meddelandeappen. RCS Direkt hjälper svenska företag med kampanjer, aviseringar och interaktiv kunddialog via RCS.",
      },
      {
        property: "og:title",
        content: "RCS Direkt – RCS Business Messaging för svenska företag",
      },
      {
        property: "og:description",
        content:
          "Kampanjer, aviseringar och interaktiv kunddialog via RCS – med verifierad avsändare och läs-kvitto. Ingen app behövs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

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

/* ---------- Header ---------- */

function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <MessagesSquare className="size-4.5 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            RCS Direkt
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#tjanster" className="transition-colors hover:text-foreground">
            Tjänster
          </a>
          <a
            href="#safunkar" 
            className="transition-colors hover:text-foreground"
          >
            Så funkar det
          </a>
          <a href="#kontakt" className="transition-colors hover:text-foreground">
            Kontakt
          </a>
        </nav>
        <a
          href="#kontakt"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          Boka demo
          <ArrowRight className="size-4" />
        </a>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden pt-16">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
      <div className="glow-primary absolute -top-40 left-1/2 h-[560px] w-[860px] -translate-x-1/2" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 md:grid-cols-2 md:pt-24">
        <div>
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
            <BadgeCheck className="size-3.5" />
            SMS:ens arvtagare – nu för företag
          </span>

          <h1 className="animate-fade-up-1 mt-6 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
            Få kunderna att agera direkt i meddelandet.
          </h1>

          <p className="animate-fade-up-2 mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            RCS Direkt hjälper svenska företag att nå kunder med rika,
            verifierade meddelanden – bilder, knappar och läs-kvitton, rakt in
            i meddelandeappen. Ingen app att ladda ner.
          </p>

          <div className="animate-fade-up-3 mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Boka en demo
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#tjanster"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Utforska tjänsterna
            </a>
          </div>

          <dl className="animate-fade-up-3 mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {[
              ["Ingen app", "rakt i meddelandeappen"],
              ["Verifierad avsändare", "trygg från bluff"],
              ["Läs-kvitto", "full kontroll i realtid"],
            ].map(([title, sub]) => (
              <div key={title}>
                <dt className="font-display text-sm font-semibold text-primary">
                  {title}
                </dt>
                <dd className="text-xs text-muted-foreground">{sub}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="glow-primary absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2" />
          <RcsPhone />
        </div>
      </div>
    </section>
  );
}

/* ---------- Kompatibilitet ---------- */

function CompatibilityStrip() {
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-6 text-sm text-muted-foreground">
        <span className="text-xs font-semibold uppercase tracking-wider">
          Fungerar i
        </span>
        <span className="font-display font-semibold">Google Messages</span>
        <span className="font-display font-semibold">Samsung Messages</span>
        <span className="font-display font-semibold">Apple Messages</span>
        <span className="text-xs">– utan extra app</span>
      </div>
    </section>
  );
}

/* ---------- Tjänster ---------- */

const services = [
  {
    icon: Send,
    title: "Kampanjer & utskick",
    body: "Rika utskick med bilder, gallerier och klickbara knappar – från produktlanseringar till helgkampanjer. Segmentera, schemalägg och följ resultatet live.",
  },
  {
    icon: Bell,
    title: "Aviseringar & påminnelser",
    body: "Leveransstatus, bokningar och betalningspåminnelser som kommer fram. Automatiserade flöden med läs- och leveranskvitto i realtid.",
  },
  {
    icon: MessagesSquare,
    title: "Interaktiv kunddialog",
    body: "Snabbsvar, formulär och botar direkt i konversationen. Låt kunder bekräfta, boka och köpa – utan att lämna meddelandeappen.",
  },
  {
    icon: Code2,
    title: "RCS via API",
    body: "Skicka RCS från era egna system. Väl dokumenterat API med sandbox-miljö, webhooks och stöd för att fallbacka till SMS när RCS saknas.",
  },
];

function Services() {
  return (
    <section id="tjanster" className="mx-auto max-w-6xl px-5 py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Tjänster
        </p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Allt ni behöver för att kommunicera via RCS
        </h2>
        <p className="mt-4 text-muted-foreground">
          Från första kampanjen till fullständiga API-integrationer – vi tar er
          från tanke till levererat meddelande.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {services.map(({ icon: Icon, title, body }) => (
          <article
            key={title}
            className="group rounded-3xl border border-border bg-card p-7 transition-colors hover:border-primary/40"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary transition-transform group-hover:scale-110">
              <Icon className="size-5.5" />
            </span>
            <h3 className="mt-5 text-xl font-semibold">{title}</h3>
            <p className="mt-2.5 leading-relaxed text-muted-foreground">
              {body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Så funkar det ---------- */

const steps = [
  {
    icon: Store,
    title: "1. Verifiera ert varumärke",
    body: "Vi registrerar och verifierar er avsändare hos operatörerna så att kunderna ser ert namn, er logotyp och en grön verifieringsmarkering.",
  },
  {
    icon: Smartphone,
    title: "2. Bygg ert meddelande",
    body: "Sätt ihop kampanjer och flöden med bilder, knappar och snabbsvar – själva eller tillsammans med vårt team.",
  },
  {
    icon: CheckCheck,
    title: "3. Skicka & följ upp",
    body: "Leverans, läsning och klick visas i realtid. Saknar mottagaren RCS-stöd fallbackar meddelandet automatiskt till SMS.",
  },
];

function HowItWorks() {
  return (
    <section
      id="safunkar"
      className="border-y border-border/60 bg-card/40 py-24"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Så funkar det
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Från verifiering till leverans på dagar, inte månader
          </h2>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="relative rounded-3xl border border-border bg-background p-7"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-highlight/15 text-highlight">
                <Icon className="size-5.5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Fördelar ---------- */

const benefits = [
  { value: "Ingen", label: "app som ska laddas ner" },
  { value: "10x", label: "större meddelandeyta än SMS" },
  { value: "Realtid", label: "leverans- och läs-kvitton" },
  { value: "100 %", label: "verifierade avsändare" },
];

function BenefitsBand() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ value, label }) => (
          <div key={value} className="border-l-2 border-primary/60 pl-5">
            <p className="font-display text-4xl font-bold text-primary">
              {value}
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Kontakt / CTA ---------- */

function ContactCta() {
  return (
    <section
      id="kontakt"
      className="border-y border-border/60 bg-card/40 py-24"
    >
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-4xl border border-primary/30 bg-background px-8 py-14 text-center">
        <div className="glow-primary absolute -top-32 left-1/2 h-72 w-96 -translate-x-1/2" />
        <div className="relative">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Redo att nå kunderna direkt?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Boka en 20-minuters demo så visar vi hur RCS kan fungera för just
            er verksamhet – med exempel från er bransch.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:hej@rcsdirekt.se"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              <Send className="size-4" />
              hej@rcsdirekt.se
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function SiteFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary">
            <MessagesSquare className="size-4 text-primary-foreground" />
          </span>
          <span className="font-display font-bold">RCS Direkt</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} RCS Direkt · rcsdirekt.se
        </p>
      </div>
    </footer>
  );
}
