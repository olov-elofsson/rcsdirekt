import { Link } from "@tanstack/react-router";
import { ArrowRight, Linkedin, Youtube } from "lucide-react";
import type { ReactNode } from "react";

import { BrandLogo, BrandSymbol } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <Link to="/" aria-label="RCS Direkt, startsida">
          <BrandLogo />
        </Link>
        <div className="flex items-center gap-5">
          <Link to="/skapa-konto" className="hidden text-xs font-semibold text-foreground transition-colors hover:text-logo-blush sm:block">
            Logga in
          </Link>
          <Button asChild size="sm">
            <Link to="/skapa-konto">Skapa konto <ArrowRight /></Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="kontakt" className="bg-ink py-12 text-ink-foreground sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-[1.2fr_2fr_auto] lg:px-8">
        <Link to="/" aria-label="RCS Direkt, startsida">
          <BrandSymbol inverse className="h-11" />
        </Link>
        <div className="grid grid-cols-2 gap-6 text-xs sm:grid-cols-3">
          <div><p className="font-bold">Skicka</p><Link to="/rcs-online" className="mt-2 block text-ink-muted hover:text-ink-foreground">RCS online</Link><Link to="/rcs-api" className="mt-2 block text-ink-muted hover:text-ink-foreground">RCS API</Link></div>
          <div><p className="font-bold">Priser</p><Link to="/rcs-basic" className="mt-2 block text-ink-muted hover:text-ink-foreground">RCS Basic</Link><Link to="/rcs-single" className="mt-2 block text-ink-muted hover:text-ink-foreground">RCS Single</Link><Link to="/rcs-conversation" className="mt-2 block text-ink-muted hover:text-ink-foreground">RCS Conversation</Link><Link to="/jamfor-planer" className="mt-2 block text-ink-muted hover:text-ink-foreground">Jämför meddelandetyperna</Link></div>
          <div><p className="font-bold">Företag</p><a href="/kontakt" className="mt-2 block text-ink-muted hover:text-ink-foreground">Kontakt</a></div>
        </div>
        <div className="flex items-start gap-3"><a href="#kontakt" aria-label="LinkedIn"><Linkedin className="size-4" /></a><a href="#kontakt" aria-label="Youtube"><Youtube className="size-4" /></a></div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-ink-foreground/10 px-5 pt-6 text-right text-[10px] text-ink-muted lg:px-8">© {new Date().getFullYear()} RCS Direkt. Alla rättigheter reserverade.</div>
    </footer>
  );
}

export function DetailPage({ title, intro, children, aside }: { title: string; intro: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-primary-soft pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div aria-hidden className="deco-dots pointer-events-none absolute -right-8 top-12 size-56 opacity-[0.07]" />
          <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">{title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{intro}</p>
          </div>
        </section>
        <section className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[1fr_0.72fr] lg:gap-20 lg:px-8">
            <div className="space-y-12">{children}</div>
            {aside ? <aside className="lg:sticky lg:top-24 lg:self-start">{aside}</aside> : null}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export function ContentBlock({ title, children }: { title: string; children: ReactNode }) {
  return <div className="border-t border-border pt-8 first:border-t-0 first:pt-0"><h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2><div className="mt-4 text-base leading-relaxed text-muted-foreground">{children}</div></div>;
}