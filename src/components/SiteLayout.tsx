import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, ArrowUp, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";

const mobileNav = [
  { label: "Startsida", to: "/" },
  { label: "Prislista", to: "/priser" },
  { label: "Nyheter", to: "/blogg" },
] as const;


export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto grid h-20 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:px-8">
        <Link to="/" aria-label="RCS Direkt, startsida" className="min-w-0">
          <BrandLogo className="h-6 sm:h-9" />
        </Link>
        <div className="flex shrink-0 items-center gap-5">
          <Link to="/priser" className="hidden h-10 items-center text-sm font-semibold leading-none text-foreground transition-colors hover:text-logo-blush sm:inline-flex">
            Prislista
          </Link>
          <a href="https://portal.rcsdirekt.se/login" className="hidden h-10 items-center text-sm font-semibold leading-none text-foreground transition-colors hover:text-logo-blush sm:inline-flex">
            Logga in
          </a>
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/skapa-konto">Skapa konto <ArrowRight /></Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Stäng menyn" : "Öppna menyn"}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-border/70 text-foreground transition-colors hover:bg-primary-soft md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      {open ? (
        <div id="mobile-nav" className="fixed inset-x-0 bottom-0 top-20 z-40 md:hidden">
          <button
            type="button"
            aria-label="Stäng menyn"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full bg-foreground/10 backdrop-blur-[2px]"
          />
          <nav aria-label="Huvudmeny" className="relative mx-4 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-lg border border-border/70 bg-background p-5 shadow-lift">
            <ul className="divide-y divide-border">
              {mobileNav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="flex items-center justify-between gap-3 py-4 text-base font-semibold transition-colors hover:text-logo-blush"
                  >
                    {item.label}
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-3">
              <a href="https://portal.rcsdirekt.se/login" className="text-center text-sm font-semibold text-foreground underline underline-offset-4 transition-colors hover:text-logo-blush">
                Logga in
              </a>
              <Button asChild size="lg" className="w-full">
                <Link to="/skapa-konto">Skapa konto <ArrowRight /></Link>
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

const footerNav = [
  {
    title: "Skicka",
    links: [
              { label: "Priser", to: "/priser" },
    ],
  },
  {
    title: "Kom igång",
    links: [
      { label: "Skapa konto", to: "/skapa-konto" },
      { label: "Logga in", href: "https://portal.rcsdirekt.se/login" },
    ],
  },
  {
    title: "Verktyg",
    links: [{ label: "Sender launch video URL", to: "/video-generator" }],
  },
] as const;

function FooterWave({ fill }: { fill: string }) {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-px z-0 h-14 w-full -rotate-180 sm:h-20 lg:h-28" viewBox="0 0 1440 120" preserveAspectRatio="none">
      <path d="M0 62 C240 12 480 6 720 38 C960 70 1200 110 1440 54 L1440 120 L0 120 Z" fill={fill} />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-28 pb-12 text-ink-foreground sm:pt-36 sm:pb-14">
      <FooterWave fill="var(--color-background)" />
      <div aria-hidden className="deco-dots pointer-events-none absolute -right-4 top-28 h-52 w-52 opacity-[0.06]" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-14">
          <div>
            <p className="max-w-md text-sm leading-relaxed text-ink-muted">
              RCS för svenska företag. Skicka direkt från webben eller koppla era system via API, och betala bara för de meddelanden ni skickar.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-8 lg:grid-cols-[1fr_1fr_1fr_1.5fr]">
            {footerNav.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-foreground/70">{group.title}</p>
                <ul className="mt-5 space-y-2.5">
                  {group.links.map((link) => {
                    const linkClass = "group inline-flex items-center gap-1.5 text-[13px] text-ink-muted transition-colors hover:text-ink-foreground";
                    return (
                      <li key={link.label}>
                        {"to" in link ? (
                          <Link to={link.to} className={linkClass}>
                            {link.label}
                            <ArrowUpRight aria-hidden className="size-3.5 shrink-0 opacity-70 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </Link>
                        ) : (
                          <a href={link.href} className={linkClass}>
                            {link.label}
                            <ArrowUpRight aria-hidden className="size-3.5 shrink-0 opacity-70 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-foreground/70">Kontaktuppgifter</p>
              <ul className="mt-5 space-y-2.5 text-[13px] text-ink-muted">
                <li>WIGOSE AB</li>
                <li>Org.nr 559415-6753</li>
                <li>Klostergatan 15, 703 39 Örebro</li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-ink-foreground/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-muted">© {new Date().getFullYear()} WIGOSE AB · RCS Direkt. Alla rättigheter reserverade.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-ink-muted transition-colors hover:text-ink-foreground sm:self-auto"
          >
            Till toppen <ArrowUp className="size-3.5 transition-transform duration-200 hover:-translate-y-0.5" />
          </button>
        </div>
        <Link to="/" aria-label="RCS Direkt, startsida" className="mt-12 block w-full sm:mt-16">
          <BrandLogo inverse className="h-auto w-full" />
        </Link>
      </div>
    </footer>
  );
}

export function DetailPage({ title, intro, children, aside }: { title: string; intro: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-primary-soft py-16 sm:py-24 lg:py-28">
          <div aria-hidden className="deco-dots pointer-events-none absolute -right-8 top-12 size-56 opacity-[0.07]" />
          <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-normal sm:text-5xl lg:text-6xl">{title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{intro}</p>
          </div>
        </section>
        <section className="py-16 sm:py-24 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:gap-16 lg:px-8">
            <div className="min-w-0 space-y-10">{children}</div>
            {aside ? <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">{aside}</aside> : null}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export function ContentBlock({ title, children }: { title: string; children: ReactNode }) {
  return <div className="border-t border-border pt-8 first:border-t-0 first:pt-0"><h2 className="text-2xl font-extrabold leading-tight tracking-normal sm:text-3xl">{title}</h2><div className="mt-5 text-base leading-relaxed text-muted-foreground">{children}</div></div>;
}