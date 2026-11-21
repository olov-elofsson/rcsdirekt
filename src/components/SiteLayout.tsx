import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, ArrowUp, ArrowUpRight, CalendarDays, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { FormDialog } from "@/components/FormDialog";
import { LeadForm } from "@/components/LeadForm";
import { shortWhen, useNextWebinar, when } from "@/lib/webinar";
import { cn } from "@/lib/utils";

const navLinkBase =
  "rounded-md px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors";
const navLinkActive = { className: "text-foreground" };
const navLinkInactive = { className: "text-muted-foreground hover:text-foreground" };

const mobileLinkClass =
  "flex items-center justify-between gap-3 py-4 text-base font-semibold transition-colors hover:text-logo-blue";

const headerLinks = [
  { label: "Exempel", to: "/", hash: "exempel" },
  { label: "Fördelar", to: "/", hash: "fordelar" },
  { label: "Guider", to: "/blogg" },
  { label: "Priser", to: "/priser" },
] as const;

/**
 * Notice about the next webinar, above the header on every page. Scrolls away; the header stays.
 * "Anmäl dig" opens the sign-up form, or the webinar's own sign-up page when it has one.
 */
function WebinarBar() {
  const webinar = useNextWebinar();
  const key = webinar ? `webinar-notice-closed:${webinar.startsAt}` : "";
  const [closed, setClosed] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const closeDialog = useCallback(() => setSigningUp(false), []);
  useEffect(() => {
    try {
      setClosed(Boolean(key) && window.localStorage.getItem(key) === "1");
    } catch {
      // Storage can be blocked; the notice then simply stays.
    }
  }, [key]);
  if (!webinar || closed) return null;
  const close = () => {
    setClosed(true);
    try {
      window.localStorage.setItem(key, "1");
    } catch {
      // Ignore: closing still works for this page view.
    }
  };
  const { day, time } = when(webinar);
  const label = (
    <>
      <CalendarDays aria-hidden className="size-4 shrink-0 opacity-80" />
      <span className="truncate">
        <span className="font-semibold">Webinar {shortWhen(webinar)}:</span> {webinar.title}
      </span>
      <span className="hidden shrink-0 items-center gap-1 font-semibold underline-offset-4 group-hover:underline sm:inline-flex">
        Anmäl dig <ArrowRight aria-hidden className="size-3.5" />
      </span>
    </>
  );
  const linkClass = "group flex min-w-0 cursor-pointer items-center gap-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/70";
  return (
    <div className="relative bg-primary text-primary-foreground">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-center gap-2 px-12 text-[13px] sm:text-sm">
        {webinar.registrationUrl ? (
          <a href={webinar.registrationUrl} target="_blank" rel="noreferrer" className={linkClass}>{label}</a>
        ) : (
          <button type="button" onClick={() => setSigningUp(true)} className={linkClass}>{label}</button>
        )}
      </div>
      <button
        type="button"
        onClick={close}
        aria-label="Stäng notisen om webinaret"
        className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/70 after:absolute after:-inset-1.5 after:content-['']"
      >
        <X aria-hidden className="size-4" />
      </button>
      {signingUp ? (
        <FormDialog title={webinar.title} description={<p>{day}, {time}. {webinar.description} Vi skickar länken till din e-post.</p>} onClose={closeDialog}>
          <LeadForm mode="webinar" webinar={`${webinar.title}, ${day} ${time}`} compact />
        </FormDialog>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [menuTop, setMenuTop] = useState(80);
  const headerRef = useRef<HTMLElement>(null);
  const { pathname, hash } = useLocation({
    select: (location) => ({ pathname: location.pathname, hash: location.hash }),
  });

  useEffect(() => setOpen(false), [pathname, hash]);

  useEffect(() => {
    if (!open) return;
    // The menu opens right under the header, which sits lower while the webinar notice is in view.
    setMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 80);
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
    <>
    <a href="#innehall" className="sr-only z-[80] rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-3">Hoppa till innehållet</a>
    <WebinarBar />
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 min-[1200px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-8">
        <Link to="/" aria-label="RCS Direkt, startsida" className="min-w-0 py-2.5">
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
            <Link to="/skapa-konto">Skapa konto <ArrowRight data-icon="end" /></Link>
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
            {/* Both icons stay mounted and cross-fade, so the swap animates both ways. */}
            <span className="relative grid size-5 place-items-center">
              <X className={cn("absolute size-5 transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-opacity", open ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]")} />
              <Menu className={cn("size-5 transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-opacity", open ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0")} />
            </span>
          </Button>
        </div>
      </div>
      {open ? (
        <div id="mobile-nav" className="fixed inset-x-0 bottom-0 z-40 min-[1200px]:hidden" style={{ top: menuTop }}>
          <button
            type="button"
            aria-label="Stäng menyn"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full bg-foreground/10 backdrop-blur-[2px] animate-opacity-in"
          />
          <nav aria-label="Huvudmeny" className="relative mx-4 max-h-[calc(100dvh-8.5rem)] origin-top-right overflow-y-auto rounded-lg bg-background p-7 shadow-lift animate-scale-in">
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
                <Link to="/skapa-konto">Skapa konto <ArrowRight data-icon="end" /></Link>
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
    </>
  );
}

const footerNav = [
  {
    title: "RCS Direkt",
    links: [
      { label: "Exempel på RCS", to: "/", hash: "exempel" },
      { label: "Priser", to: "/priser" },
      { label: "Guider", to: "/blogg" },
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
                <ul className="mt-3">
                  {group.links.map((link) => {
                    const linkClass = "group inline-flex min-h-11 items-center sm:min-h-10 gap-1.5 text-[13px] text-ink-muted transition-colors hover:text-ink-foreground";
                    return (
                      <li key={link.label}>
                        {"to" in link ? (
                          <Link to={link.to} {...("hash" in link ? { hash: link.hash } : {})} className={linkClass}>
                            {link.label}
                            <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-3.5 shrink-0 opacity-70 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-none" />
                          </Link>
                        ) : (
                          <a href={link.href} className={linkClass}>
                            {link.label}
                            <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-3.5 shrink-0 opacity-70 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-none" />
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
            onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
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
