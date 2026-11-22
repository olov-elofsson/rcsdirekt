import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, ArrowUp, ArrowUpRight, CalendarDays, Globe, Linkedin, Menu, X } from "lucide-react";
import { company, phoneHref } from "@/lib/company";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { FormDialog } from "@/components/FormDialog";
import { InquiryForm } from "@/components/InquiryForm";
import { shortWhen, useNextWebinar, when } from "@/lib/webinar";
import { cn } from "@/lib/utils";
import { englishPath, hasEnglish, swedishPath, useT } from "@/lib/i18n";

const navLinkBase =
  "rounded-full px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const navLinkActive = "text-foreground";
const navLinkInactive = "text-foreground/70 hover:bg-muted hover:text-foreground";

const mobileLinkClass =
  "flex items-center justify-between gap-3 py-4 text-base font-semibold transition-colors hover:text-logo-blue";

const headerLinks = [
  { label: "Kunder", to: "/", hash: "exempel" },
  { label: "Plattform", to: "/", hash: "vad-ar-rcs" },
  { label: "Jämför", to: "/", hash: "rcs-mot-sms" },
  { label: "Priser", to: "/priser" },
  { label: "Insikter", to: "/blogg" },
] as const;

/** Start page sections that light up a menu item while they are under the header. */
const SECTION_LINKS: [id: string, label: string][] = [
  ["exempel", "Kunder"],
  ["vad-ar-rcs", "Plattform"],
  ["rcs-mot-sms", "Jämför"],
  ["pris", "Priser"],
  ["blogg", "Insikter"],
];

/** The menu item for where the visitor is: the page, or on the start page the section in view. */
function useActiveLink(path: string): string | null {
  // Compared on the Swedish address, so /en/pricing lights up the same item as /priser.
  const pathname = swedishPath(path);
  const [section, setSection] = useState<string | null>(null);
  useEffect(() => {
    if (pathname !== "/") return;
    const update = () => {
      const line = 120;
      const hit = SECTION_LINKS.find(([id]) => {
        const box = document.getElementById(id)?.getBoundingClientRect();
        return box ? box.top <= line && box.bottom > line : false;
      });
      setSection(hit ? hit[1] : null);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);
  if (pathname.startsWith("/priser")) return "Priser";
  if (pathname.startsWith("/blogg")) return "Insikter";
  return pathname === "/" ? section : null;
}

/**
 * Notice about the next webinar, above the header on every page. Scrolls away; the header stays.
 * "Anmäl dig" opens the sign-up form, or the webinar's own sign-up page when it has one.
 */
function WebinarBar() {
  const { locale } = useT();
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
  // The webinars are held in Swedish, so the English pages leave the notice out.
  if (!webinar || closed || locale === "en") return null;
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
  const linkClass = "group flex min-w-0 cursor-pointer items-center gap-2 self-stretch rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/70";
  return (
    <div className="relative bg-primary text-primary-foreground">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2 px-12 text-[13px]">
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
          <InquiryForm mode="webinar" webinar={`${webinar.title}, ${day} ${time}`} compact />
        </FormDialog>
      ) : null}
    </div>
  );
}

/** To the same page in the other language, or that language's start page when it has none. */
function LanguageSwitch({ pathname, block = false }: { pathname: string; block?: boolean }) {
  const { locale } = useT();
  const target = locale === "en" ? swedishPath(pathname) : hasEnglish(pathname) ? englishPath(pathname) : "/en";
  const label = locale === "en" ? "Svenska" : "English";
  return (
    <Button asChild variant="ghost" size="default" className={block ? "w-full bg-muted" : "hidden sm:inline-flex"}>
      {/* A plain link: the other language is a different page, with its own lang and texts. */}
      <a href={target} hrefLang={locale === "en" ? "sv" : "en"} lang={locale === "en" ? "sv" : "en"}>
        <Globe aria-hidden className="size-4" />
        {block ? label : locale === "en" ? "SV" : "EN"}
        {block ? null : <span className="sr-only">{label}</span>}
      </a>
    </Button>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [menuTop, setMenuTop] = useState(80);
  const headerRef = useRef<HTMLElement>(null);
  // A faint line always sets the header apart; once the page scrolls it firms up and gets a soft shadow.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const { pathname, hash } = useLocation({
    select: (location) => ({ pathname: location.pathname, hash: location.hash }),
  });

  useEffect(() => setOpen(false), [pathname, hash]);
  const { t, lp, locale } = useT();
  const onStart = swedishPath(pathname) === "/";
  const active = useActiveLink(pathname);
  const navRef = useRef<HTMLElement>(null);
  // Keeps its last place when nothing is active, so it fades out where it was instead of sliding away.
  const [pill, setPill] = useState<{ left: number; width: number; shown: boolean } | null>(null);
  useEffect(() => {
    const place = () => {
      const item = active ? navRef.current?.querySelector<HTMLElement>(`[data-nav="${active}"]`) : null;
      setPill((last) => (item ? { left: item.offsetLeft, width: item.offsetWidth, shown: true } : last ? { ...last, shown: false } : null));
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

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
    <a href="#innehall" className="sr-only z-[80] rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-3">{t("Hoppa till innehållet")}</a>
    <WebinarBar />
    <header ref={headerRef} className={cn("sticky top-0 z-50 border-b bg-background/85 backdrop-blur-xl transition-[border-color,box-shadow] duration-200 ease-out", scrolled ? "border-border shadow-[0_1px_12px_-6px_rgb(21_17_95/0.15)]" : "border-border/60")}>
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 min-[1200px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-8">
        <Link to={lp("/")} aria-label={t("rcsdirekt.se, startsida")} className="min-w-0 py-2.5">
          <BrandLogo className="h-6 sm:h-7" />
        </Link>

        <nav ref={navRef} aria-label={t("Huvudmeny")} className="relative hidden items-center min-[1200px]:flex">
          {/* One pill glides to the active item instead of each item lighting up on its own. */}
          <span
            aria-hidden
            className={cn("pointer-events-none absolute top-1/2 left-0 h-9 -translate-y-1/2 rounded-full bg-primary-soft transition-[translate,width,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none", pill?.shown ? "opacity-100" : "opacity-0")}
            style={pill ? { width: pill.width, translate: `${pill.left}px -50%` } : undefined}
          />
          {headerLinks.map((link) => (
            <Link key={link.label} data-nav={link.label} to={lp(link.to)} {...("hash" in link ? { hash: link.hash } : {})} activeOptions={{ exact: link.to === "/", includeHash: true }} activeProps={{ "aria-current": active === link.label ? (onStart ? "location" : "page") : undefined }} inactiveProps={{ "aria-current": active === link.label ? (onStart ? "location" : "page") : undefined }} className={cn(navLinkBase, "relative", active === link.label ? navLinkActive : navLinkInactive)}>
              {t(link.label)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
          <a href="https://portal.rcsdirekt.se/login">
            {t("Logga in")}
          </a>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link to={lp("/skapa-konto")}>{t("Skapa konto")} <ArrowRight data-icon="end" /></Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("Stäng menyn") : t("Öppna menyn")}
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
            aria-label={t("Stäng menyn")}
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full bg-foreground/10 backdrop-blur-[2px] animate-opacity-in"
          />
          <nav aria-label={t("Huvudmeny")} className="relative mx-4 max-h-[calc(100dvh-8.5rem)] origin-top-right overflow-y-auto rounded-lg bg-background p-7 shadow-lift animate-scale-in">
            <ul className="divide-y divide-border">
              <li>
                <Link to={lp("/")} className={mobileLinkClass}>
                  {t("Startsida")}
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                </Link>
              </li>
              {headerLinks.map((link) => <li key={link.label}><Link to={lp(link.to)} {...("hash" in link ? { hash: link.hash } : {})} activeProps={{ "aria-current": active === link.label ? "page" : undefined }} inactiveProps={{ "aria-current": active === link.label ? "page" : undefined }} className={cn(mobileLinkClass, active === link.label && "text-logo-blue")}>{t(link.label)}<ArrowRight className="size-4 shrink-0 text-muted-foreground" /></Link></li>)}
            </ul>
            <div className="mt-5 flex flex-col gap-3">
              <LanguageSwitch pathname={pathname} block />
              <Button asChild variant="outline" size="lg" className="w-full">
              <a href="https://portal.rcsdirekt.se/login">
                {t("Logga in")}
              </a>
              </Button>
              <Button asChild size="lg" className="w-full">
                <Link to={lp("/skapa-konto")}>{t("Skapa konto")} <ArrowRight data-icon="end" /></Link>
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
    title: "rcsdirekt.se",
    links: [
      { label: "Om oss", to: "/om-oss" },
      { label: "Kunder", to: "/", hash: "exempel" },
      { label: "Plattform", to: "/", hash: "vad-ar-rcs" },
      { label: "Jämför", to: "/", hash: "rcs-mot-sms" },
      { label: "Priser", to: "/priser" },
      { label: "Insikter", to: "/blogg" },
    ],
  },
  {
    title: "Kom igång",
    links: [
      { label: "Skapa konto", to: "/skapa-konto" },
      { label: "Kontakt", to: "/kontakt" },
      { label: "Logga in", href: "https://portal.rcsdirekt.se/login" },
    ],
  },
  {
    title: "Verktyg",
    links: [
      { label: "För utvecklare", to: "/utvecklare" },
      { label: "Videogenerator", to: "/video-generator" },
    ],
  },
  {
    title: "Juridiskt",
    links: [
      { label: "Integritetspolicy", to: "/integritetspolicy" },
      { label: "Villkor", to: "/villkor" },
    ],
  },
] as const;

const footerLinkClass =
  "group inline-flex min-h-10 items-center gap-1.5 text-sm text-ink-muted transition-colors duration-150 ease-out hover:text-ink-foreground";

/** The footer: who we are, the links grouped, and one line at the bottom. */
/**
 * On phones: "Skapa konto" fixed at the bottom once the visitor has scrolled past the first screen,
 * hidden again when the footer is in view and on the pages that already are the next step.
 */
function MobileSignupBar() {
  const { pathname } = useLocation();
  const { t, lp } = useT();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => {
      const footer = document.querySelector("footer");
      const footerInView = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      // Step aside where the bar would cover something to tap: forms and the customer examples.
      const covers = [...document.querySelectorAll("form, [data-no-mobile-cta]")].some((element) => {
        const box = element.getBoundingClientRect();
        return box.top < window.innerHeight && box.bottom > window.innerHeight - 96;
      });
      setVisible(window.scrollY > window.innerHeight * 0.8 && !footerInView && !covers);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);
  if (["/skapa-konto", "/kontakt"].includes(swedishPath(pathname))) return null;
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur-md transition-[translate,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity sm:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
      aria-hidden={!visible}
    >
      <Button asChild size="lg" className="w-full" tabIndex={visible ? 0 : -1}>
        <Link to={lp("/skapa-konto")}>{t("Skapa konto")} <ArrowRight data-icon="end" /></Link>
      </Button>
    </div>
  );
}

/** The other language, as a quiet link in the footer's bottom row. */
function FooterLanguageLink() {
  const { locale } = useT();
  const pathname = useLocation({ select: (location) => location.pathname });
  const target = locale === "en" ? swedishPath(pathname) : hasEnglish(pathname) ? englishPath(pathname) : "/en";
  return (
    <a href={target} hrefLang={locale === "en" ? "sv" : "en"} lang={locale === "en" ? "sv" : "en"} className="ml-3 inline-flex min-h-10 items-center gap-1.5 underline-offset-4 transition-colors hover:text-ink-foreground hover:underline">
      <Globe aria-hidden className="size-3.5" />
      {locale === "en" ? "Svenska" : "English"}
    </a>
  );
}

export function SiteFooter() {
  const { t, lp } = useT();
  return (
    <>
    <MobileSignupBar />
    <footer className="relative overflow-hidden bg-ink pt-16 pb-10 text-ink-foreground sm:pt-20">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          <div>
            <Link to={lp("/")} aria-label={t("rcsdirekt.se, startsida")} className="inline-block">
              <BrandLogo inverse className="h-8" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-pretty text-ink-muted">
              {t("RCS för svenska företag. Skicka från webben eller via API och betala för de meddelanden ni skickar.")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {company.legalName}, {t("org.nr")} {company.orgNumber}
              <br />
              {company.street}, {company.postalCode} {company.city}
              {company.email ? <><br /><a href={`mailto:${company.email}`} className="underline-offset-4 hover:text-ink-foreground hover:underline">{company.email}</a></> : null}
              {company.phone ? <><br /><a href={phoneHref(company.phone)} className="underline-offset-4 hover:text-ink-foreground hover:underline">{company.phone}</a></> : null}
            </p>
            {company.linkedin ? <a href={company.linkedin} className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink-foreground"><Linkedin aria-hidden className="size-4" />LinkedIn</a> : null}
          </div>
          <nav aria-label={t("Sidfot")} className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-ink-foreground">{t(group.title)}</p>
                <ul className="mt-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {"to" in link ? (
                        <Link to={lp(link.to)} {...("hash" in link ? { hash: link.hash } : {})} className={footerLinkClass}>{t(link.label)}</Link>
                      ) : (
                        <a href={link.href} className={footerLinkClass}>
                          {t(link.label)}
                          <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-3.5 shrink-0 opacity-70 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ink-foreground/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-muted">
            © {new Date().getFullYear()} WIGOSE AB · rcsdirekt.se. {t("Alla rättigheter reserverade.")}
            {/* For the team: the CMS where the site's texts are edited. */}
            <a href="https://cms.rcsdirekt.se/admin" className="ml-3 inline-flex min-h-10 items-center underline-offset-4 transition-colors hover:text-ink-foreground hover:underline">CMS</a>
            <FooterLanguageLink />
          </p>
          <Button variant="link" size="sm"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
            className="self-start px-0 text-ink-muted hover:text-ink-foreground sm:self-auto"
          >
            {t("Till toppen")} <ArrowUp className="size-3.5" />
          </Button>
        </div>
      </div>
    </footer>
    </>
  );
}
