import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, Code2, Images, MessageSquareText, MessagesSquare, MonitorSmartphone, Receipt, type LucideIcon } from "lucide-react";

import { HeroMessage } from "@/components/HeroMessage";
import { Button } from "@/components/ui/button";
import { usePriser } from "@/content/localized";
import { STEPS } from "@/data/onboarding";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { formatPrice, useCurrency } from "@/lib/money";

// The start page sections, in the style of the hero and the entrance cards: a short heading and
// bordered cards with a line icon and one blue link.

const order = (index: number) => ({ "--reveal-order": index }) as CSSProperties;

/** The closing blue box: one line and the two ways to start. */
export function CtaBox() {
  const { t, lp } = useT();
  return (
    <section id="starta" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div data-reveal className="flex flex-col items-center rounded-3xl bg-logo-blue px-6 py-16 text-center sm:py-20">
          <h2 className="max-w-3xl text-[2rem] font-extrabold leading-[1.1] text-balance text-white sm:text-[2.6rem]">{t("Kom igång i dag")}</h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-pretty text-white sm:text-[17px]">{t("Skapa ett konto, så hjälper vi er med avsändaren och det första utskicket.")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Button asChild size="lg" className="home-cta"><Link to={lp("/skapa-konto")}>{t("Skapa konto")} <ArrowRight data-icon="end" /></Link></Button>
            <Link to={lp("/kontakt")} className="inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-white underline underline-offset-4">{t("Prata med oss")}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

type IconCard = { Icon: LucideIcon; title: string; copy: string; link: string; to: string; hash?: string; search?: Record<string, string> };

// Left-aligned like the rest of the page below the hero; -0.04em lines Archivo's capitals up with the text.
const sectionHeading = "-ml-[0.04em] max-w-3xl text-[2.1rem] font-extrabold leading-[1.1] text-balance sm:text-[2.65rem]";
const sectionLead = "mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-[17px]";

/** The card row the sections use: bordered cards with a line icon, text and a blue link. The heading sits left, with an optional link on the right. */
function CardGrid({ id, label, title, intro, cards, after, muted = false, centered = false }: { id: string; label?: string; title?: string; intro?: string; cards: IconCard[]; after?: ReactNode; muted?: boolean; centered?: boolean }) {
  return (
    <section id={id} aria-label={title ? undefined : label} className={muted ? "scroll-mt-24 bg-muted" : "scroll-mt-24 bg-background"}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {title ? (
          <div data-reveal className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className={sectionHeading}>{title}</h2>
              {intro ? <p className={sectionLead}>{intro}</p> : null}
            </div>
            {after}
          </div>
        ) : null}
        <ul className="grid gap-6 lg:grid-cols-3">
          {cards.map(({ Icon, ...card }, index) => (
            <li key={card.title} data-reveal style={order(index)}>
              <Link to={card.to} {...(card.hash ? { hash: card.hash } : {})} {...(card.search ? { search: card.search } : {})} className={cn("group flex h-full flex-col rounded-2xl border border-border bg-card px-8 pt-10 pb-9 transition-[border-color,box-shadow] duration-200 ease-out hover:border-logo-blue/40 hover:shadow-card", centered ? "items-center text-center" : "items-start text-left")}>
                <Icon aria-hidden strokeWidth={1.25} className={centered ? "size-16 text-logo-blue" : "size-12 text-logo-blue"} />
                <h3 className="mt-7 text-xl font-extrabold leading-snug">{card.title}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-pretty text-muted-foreground">{card.copy}</p>
                <span className="mt-7 inline-flex items-center gap-1.5 text-base font-semibold text-logo-blue">{card.link} <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Section 2: where to go from the hero. Also the menu's "Plattform". */
export function Entrances() {
  const { t, lp, locale } = useT();
  const currency = useCurrency();
  const price = usePriser().plans[0]?.price;
  const from = price ? formatPrice(price, currency, { locale: locale === "en" ? "en-GB" : "sv-SE" }) : undefined;
  return (
    <CardGrid
      id="vad-ar-rcs"
      centered
      label={t("Kom vidare")}
      cards={[
        { Icon: MonitorSmartphone, title: t("Skicka från webben"), copy: t("Bygg utskicket i webbläsaren och se direkt hur det ser ut hos kunden."), link: t("Prova webbverktyget"), to: lp("/skapa-konto") },
        { Icon: Code2, title: t("Koppla in ert system"), copy: t("Låt era system skicka bekräftelser och påminnelser via API."), link: t("Till utvecklarsidan"), to: lp("/utvecklare") },
        { Icon: Receipt, title: t("Betala per meddelande"), copy: from ? t("Listpris från {price} per meddelande, utan bindningstid.").replace("{price}", from) : t("Ni betalar för de meddelanden ni skickar."), link: t("Se priser"), to: lp("/"), hash: "pris" },
      ]}
    />
  );
}

/** Why RCS: the text and actions on the left, the SMS/RCS demo on the right. */
export function Difference() {
  const { t, lp } = useT();
  return (
    <section id="rcs-mot-sms" className="scroll-mt-24 bg-muted">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div data-reveal>
          <h2 className={sectionHeading}>{t("Låt kunden se vem som skriver")}</h2>
          <p className={sectionLead}>{t("Ett SMS kommer från ett nummer. Med RCS kommer samma besked med ert namn, er logga och knappar som kunden svarar med. Växla och jämför.")}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button asChild size="lg" className="home-cta"><Link to={lp("/skapa-konto")}>{t("Skapa konto")} <ArrowRight data-icon="end" /></Link></Button>
            <Link to={lp("/blogg/$slug")} params={{ slug: "rcs-vs-sms" }} className="group inline-flex min-h-10 items-center gap-1.5 text-base font-semibold text-logo-blue">{t("Läs om skillnaden")} <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" /></Link>
          </div>
        </div>
        <div data-reveal style={order(1)} className="flex justify-center rounded-3xl border border-border bg-card px-6 py-12 sm:py-14">
          <div className="w-full max-w-[22rem]"><HeroMessage bare /></div>
        </div>
      </div>
    </section>
  );
}

/** How to get started, as three cards in the same style. */
export function Steps() {
  const { t, lp } = useT();
  return (
    <CardGrid
      id="kom-igang"
      muted
      title={t("Från konto till första utskick")}
      intro={t("Tre steg, och vi hjälper er med avsändaren på vägen.")}
      cards={STEPS.map((step, index) => ({
        Icon: step.Icon,
        title: t(step.title),
        copy: t(step.copy),
        ...[
          { link: t("Skapa konto"), to: lp("/skapa-konto") },
          { link: t("Om verifierad avsändare"), to: lp("/blogg/$slug").replace("$slug", "verifierad-avsandare") },
          { link: t("Till utvecklarsidan"), to: lp("/utvecklare") },
        ][index]!,
      }))}
    />
  );
}

/** The three message types as cards, each with its own way to start. */
export function Plans() {
  const priser = usePriser();
  const currency = useCurrency();
  const { t, lp, locale } = useT();
  const icons = [MessageSquareText, Images, MessagesSquare];
  return (
    <CardGrid
      id="pris"
      title={t("Betala för det ni skickar")}
      intro={t("Priset beror på meddelandetyp och mottagarens operatör. Det kostar inget att starta och det finns ingen bindningstid.")}
      cards={priser.plans.map((plan, index) => ({
        Icon: icons[index] ?? MessageSquareText,
        title: plan.name,
        copy: `${plan.contents}. ${t("Från")} ${formatPrice(plan.price, currency, { locale: locale === "en" ? "en-GB" : "sv-SE" })} ${t("per meddelande")}.`,
        link: `${t("Välj")} ${plan.name.replace(/^RCS /, "")}`,
        to: lp("/skapa-konto"),
        search: { plan: plan.name },
      }))}
      after={<Link to={lp("/priser")} className="group inline-flex min-h-10 items-center gap-1.5 text-base font-semibold text-logo-blue">{t("Priser per operatör")} <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" /></Link>}
    />
  );
}
