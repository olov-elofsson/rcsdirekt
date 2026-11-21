import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, ArrowUp, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";

const navLinkBase =
  "rounded-md px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors";
const navLinkActive = { className: "text-foreground" };
const navLinkInactive = { className: "text-muted-foreground hover:text-foreground" };

const mobileLinkClass =
  "flex items-center justify-between gap-3 py-4 text-base font-semibold transition-colors hover:text-logo-blue";

const headerLinks = [
  { label: "Produkter", to: "/", hash: "sa-fungerar" },
  { label: "Lösningar", to: "/", hash: "fordelar" },
  { label: "Resurser", to: "/blogg" },
  { label: "Priser", to: "/priser" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation({
    select: (location) => ({ pathname: location.pathname, hash: location.hash }),
  });

  useEffect(() => setOpen(false), [pathname, hash]);

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
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 min-[1200px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-8">
        <Link to="/" aria-label="RCS Direkt, startsida" className="min-w-0">
          <BrandLogo className="h-6 sm:h-9" />
        </Link>

        <nav aria-label="Huvudmeny" className="hidden items-center min-[1200px]:flex">
          {headerLinks.map((link) => <Link key={link.label} to={link.to} {...("hash" in link ? { hash: link.hash } : {})} activeOptions={{ includeHash: true }} className={navLinkBase} activeProps={navLinkActive} inactiveProps={navLinkInactive}>{link.label}</Link>)}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
          <a href="https://portal.rcsdirekt.se/login">
            Logga in
          </a>
          </Button>
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
            className="shrink-0 min-[1200px]:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      {open ? (
        <div id="mobile-nav" className="fixed inset-x-0 bottom-0 top-20 z-40 min-[1200px]:hidden">
          <button
            type="button"
            aria-label="Stäng menyn"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full bg-foreground/10 backdrop-blur-[2px]"
          />
          <nav aria-label="Huvudmeny" className="relative mx-4 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-lg border border-border/70 bg-background p-5 shadow-lift">
            <ul className="divide-y divide-border">
              <li>
                <Link to="/" className={mobileLinkClass}>
                  Startsida
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                </Link>
              </li>
              {headerLinks.map((link) => <li key={link.label}><Link to={link.to} {...("hash" in link ? { hash: link.hash } : {})} className={mobileLinkClass}>{link.label}<ArrowRight className="size-4 shrink-0 text-muted-foreground" /></Link></li>)}
            </ul>
            <div className="mt-5 flex flex-col gap-3">
              <Button asChild variant="outline" size="lg" className="w-full">
              <a href="https://portal.rcsdirekt.se/login">
                Logga in
              </a>
              </Button>
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
    title: "RCS Direkt",
    links: [
      { label: "Så fungerar RCS", to: "/", hash: "sa-fungerar" },
      { label: "Priser", to: "/priser" },
      { label: "Resurser", to: "/blogg" },
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
    links: [{ label: "Videogenerator för avsändare", to: "/video-generator" }],
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
                          <Link to={link.to} {...("hash" in link ? { hash: link.hash } : {})} className={linkClass}>
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
          <Button variant="link" size="sm"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="self-start px-0 text-ink-muted hover:text-ink-foreground sm:self-auto"
          >
            Till toppen <ArrowUp className="size-3.5" />
          </Button>
        </div>
        <Link to="/" aria-label="RCS Direkt, startsida" className="mt-12 block w-full sm:mt-16">
          <BrandLogo inverse className="h-auto w-full" />
        </Link>
      </div>
    </footer>
  );
}
