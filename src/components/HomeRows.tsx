import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Code2, MonitorSmartphone, Receipt } from "lucide-react";

import { HeroMessage } from "@/components/HeroMessage";
import { ApiSketch, WebSketch } from "@/components/HomepageSections";
import { Button } from "@/components/ui/button";
import { usePriser, useStartsida } from "@/content/localized";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// The start page sections laid out after fortnox.se, in our own brand kit: entrance cards with a
// line icon under the hero, rows that alternate picture and text with one rounded action each,
// and two large coloured cards side by side.

const order = (index: number) => ({ "--reveal-order": index }) as CSSProperties;

/** A row's heading: a full sentence, as Fortnox writes them, a little smaller than a section title. */
const rowTitle = "-ml-[0.04em] text-[1.9rem] font-extrabold leading-[1.12] text-balance sm:text-[2.35rem]";

/** Three cards right under the hero, each with a line icon, a short text and where it leads. */
export function Entrances() {
  const { t, lp } = useT();
  const from = usePriser().plans[0]?.price;
  const cards = [
    { Icon: MonitorSmartphone, title: t("Skicka från webben"), copy: t("Bygg utskicket i webbläsaren och se direkt hur det ser ut hos kunden."), link: t("Se webbverktyget"), to: lp("/"), hash: "vad-ar-rcs" },
    { Icon: Code2, title: t("Koppla in ert system"), copy: t("Låt era system skicka bekräftelser och påminnelser via API, med svaren tillbaka som webhooks."), link: t("Till utvecklarsidan"), to: lp("/utvecklare") },
    { Icon: Receipt, title: t("Betala per meddelande"), copy: from ? t("Listpris från {price} per meddelande. Det kostar inget att starta och det finns ingen bindningstid.").replace("{price}", from) : t("Det kostar inget att starta och det finns ingen bindningstid."), link: t("Se priser"), to: lp("/priser") },
  ];
  return (
    <section id="ingangar" aria-label={t("Kom vidare")} className="bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <ul className="grid gap-5 md:grid-cols-3">
          {cards.map(({ Icon, ...card }, index) => (
            <li key={card.title} data-reveal style={order(index)}>
              <Link to={card.to} {...(card.hash ? { hash: card.hash } : {})} className="group flex h-full flex-col items-center rounded-2xl border border-border bg-card px-7 pt-9 pb-8 text-center transition-[border-color,box-shadow] duration-200 ease-out hover:border-logo-blue/40 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Icon aria-hidden strokeWidth={1.4} className="size-14 text-logo-blue" />
                <h3 className="mt-6 text-xl font-extrabold leading-snug">{card.title}</h3>
                <p className="mt-2 flex-1 text-base leading-relaxed text-pretty text-muted-foreground">{card.copy}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold">{card.link} <ArrowRight aria-hidden className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** One row: a picture on one side, a heading, a paragraph and one rounded action on the other. */
function SplitRow({ id, flip = false, title, copy, action, visual }: { id?: string; flip?: boolean; title: string; copy: string; action: ReactNode; visual: ReactNode }) {
  return (
    <div id={id} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <div data-reveal className={cn("min-w-0", flip && "lg:order-2")}>
        <h2 className={rowTitle}>{title}</h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-[17px]">{copy}</p>
        <div className="mt-8">{action}</div>
      </div>
      <div data-reveal style={order(1)} className={cn("min-w-0", flip && "lg:order-1")}>{visual}</div>
    </div>
  );
}

/** The product in three rows, as Fortnox shows its areas: the difference, the web tool and the API. */
export function ProductRows() {
  const home = useStartsida();
  const { t, lp } = useT();
  const [web, api] = home.vagar.items;
  const pill = "home-cta";
  return (
    <section id="plattform" className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-24 px-5 sm:gap-32 lg:px-8">
        <SplitRow
          title={t("Samma besked, som SMS och som RCS")}
          copy={t("Växla mellan SMS och RCS och se hur samma besked ser ut hos kunden. Med RCS syns ert namn och er logga, och kunden kan svara med ett tryck.")}
          action={<Button className={pill} asChild size="lg" variant="outline"><Link to={lp("/skapa-konto")}>{t("Skapa konto")}</Link></Button>}
          visual={<div className="mx-auto max-w-[22rem]"><HeroMessage /></div>}
        />
        <SplitRow
          id="vad-ar-rcs"
          flip
          title={t("Bygg utskicket i webbläsaren")}
          copy={web?.copy ?? ""}
          action={<Button className={pill} asChild size="lg" variant="outline"><Link to={lp("/skapa-konto")}>{t("Prova webbverktyget")}</Link></Button>}
          visual={<WebSketch />}
        />
        <SplitRow
          title={t("Låt era system skicka via API")}
          copy={api?.copy ?? ""}
          action={<Button className={pill} asChild size="lg" variant="outline"><Link to={lp("/utvecklare")}>{t("Till utvecklarsidan")}</Link></Button>}
          visual={<ApiSketch />}
        />
      </div>
    </section>
  );
}

/** Two large coloured cards side by side, as Fortnox's: help getting started, and support. */
export function SupportCards() {
  const { t, lp } = useT();
  const link = "group inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline";
  return (
    <section id="hjalp" aria-label={t("Hjälp")} className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-2 lg:px-8">
        <div data-reveal className="flex flex-col rounded-3xl bg-ink p-8 text-ink-foreground sm:p-12">
          <h2 className={cn(rowTitle, "text-ink-foreground")}>{t("Hjälp att komma igång")}</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-ink-muted">{t("Vi registrerar er avsändare och hjälper er med det första utskicket, från webben eller med en koppling till era system.")}</p>
          <div className="mt-auto grid gap-1 pt-8">
            <p className="text-sm text-ink-muted">{t("För företag")}</p>
            <Link to={lp("/")} hash="kontakt" className={cn(link, "text-ink-foreground")}>{t("Prata med oss om upplägget")} <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" /></Link>
            <p className="mt-4 text-sm text-ink-muted">{t("För utvecklare")}</p>
            <Link to={lp("/utvecklare")} className={cn(link, "text-ink-foreground")}>{t("Läs om API:t och webhooks")} <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" /></Link>
          </div>
        </div>
        <div data-reveal style={order(1)} className="flex flex-col rounded-3xl bg-primary-soft p-8 sm:p-12">
          <h2 className={rowTitle}>{t("Vi står bakom er")}</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-muted-foreground">{t("Ni får svensk support när ni behöver hjälp, och raka svar på frågor om priser och volymer.")}</p>
          <p className="mt-6 max-w-md text-base font-semibold">{t("Undrar ni vilken meddelandetyp ni behöver?")}</p>
          <p className="mt-1 max-w-md text-base leading-relaxed text-muted-foreground">{t("Hör av er, så räknar vi på det tillsammans.")}</p>
          <div className="mt-auto pt-8">
            <Link to={lp("/kontakt")} className={link}>{t("Kontakta oss")} <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
