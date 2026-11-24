import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, BadgeCheck, Code2, Images, MessageSquareText, MessagesSquare, MonitorSmartphone, Receipt, Send, UserPlus, type LucideIcon } from "lucide-react";

import { HeroMessage } from "@/components/HeroMessage";
import { Button } from "@/components/ui/button";
import { usePriser } from "@/content/localized";
import { useT } from "@/lib/i18n";
import { formatPrice, useCurrency } from "@/lib/money";

// The start page sections, all in the style of the hero and the entrance cards: a short centred
// heading and bordered cards with a large line icon, centred text and one blue link.

const order = (index: number) => ({ "--reveal-order": index }) as CSSProperties;












/** Fortnox's rounded, outlined action: white with a thin border. */







/** Fortnox block 9: one rounded coloured box with a question and one dark button. */
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

const sectionHeading = "mx-auto max-w-3xl text-center text-[2.1rem] font-extrabold leading-[1.1] text-balance sm:text-[2.65rem]";
const sectionLead = "mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-pretty text-muted-foreground sm:text-[17px]";

/** The card row every section uses: bordered cards with a large line icon, centred text and a blue link. */
function CardGrid({ id, label, title, intro, cards, after }: { id: string; label?: string; title?: string; intro?: string; cards: IconCard[]; after?: ReactNode }) {
  return (
    <section id={id} aria-label={title ? undefined : label} className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {title ? (
          <div data-reveal className="mb-12">
            <h2 className={sectionHeading}>{title}</h2>
            {intro ? <p className={sectionLead}>{intro}</p> : null}
          </div>
        ) : null}
        <ul className="grid gap-6 lg:grid-cols-3">
          {cards.map(({ Icon, ...card }, index) => (
            <li key={card.title} data-reveal style={order(index)}>
              <Link to={card.to} {...(card.hash ? { hash: card.hash } : {})} {...(card.search ? { search: card.search } : {})} className="group flex h-full flex-col items-center rounded-2xl border border-border bg-card px-8 pt-10 pb-9 text-center transition-[border-color,box-shadow] duration-200 ease-out hover:border-logo-blue/40 hover:shadow-card">
                <Icon aria-hidden strokeWidth={1.25} className="size-16 text-logo-blue" />
                <h3 className="mt-7 text-xl font-extrabold leading-snug">{card.title}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-pretty text-muted-foreground">{card.copy}</p>
                <span className="mt-7 inline-flex items-center gap-1.5 text-base font-semibold text-logo-blue">{card.link} <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" /></span>
              </Link>
            </li>
          ))}
        </ul>
        {after ? <div data-reveal className="mt-10 flex justify-center">{after}</div> : null}
      </div>
    </section>
  );
}

/** Section 2: where to go from the hero. Also the menu's "Plattform". */
export function Entrances() {
  const { t, lp } = useT();
  const from = usePriser().plans[0]?.price;
  return (
    <CardGrid
      id="vad-ar-rcs"
      label={t("Kom vidare")}
      cards={[
        { Icon: MonitorSmartphone, title: t("Skicka från webben"), copy: t("Bygg utskicket i webbläsaren och se direkt hur det ser ut hos kunden."), link: t("Prova webbverktyget"), to: lp("/skapa-konto") },
        { Icon: Code2, title: t("Koppla in ert system"), copy: t("Låt era system skicka bekräftelser och påminnelser via API."), link: t("Till utvecklarsidan"), to: lp("/utvecklare") },
        { Icon: Receipt, title: t("Betala per meddelande"), copy: from ? t("Listpris från {price} per meddelande, utan bindningstid.").replace("{price}", from) : t("Ni betalar för de meddelanden ni skickar."), link: t("Se priser"), to: lp("/") , hash: "pris" },
      ]}
    />
  );
}

/** The SMS/RCS demo, centred under a short heading. */
export function Difference() {
  const { t, lp } = useT();
  return (
    <section id="rcs-mot-sms" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div data-reveal className="mb-12">
          <h2 className={sectionHeading}>{t("SMS eller RCS?")}</h2>
          <p className={sectionLead}>{t("Samma besked, två sätt. Med RCS ser kunden ert namn och er logga, och kan svara med ett tryck.")}</p>
        </div>
        <div data-reveal className="mx-auto flex max-w-3xl justify-center rounded-3xl border border-border bg-primary-soft px-6 py-12 sm:py-14">
          <div className="w-full max-w-[22rem]"><HeroMessage bare /></div>
        </div>
        <div data-reveal className="mt-8 flex justify-center">
          <Link to={lp("/blogg/$slug")} params={{ slug: "rcs-vs-sms" }} className="group inline-flex min-h-10 items-center gap-1.5 text-base font-semibold text-logo-blue">{t("Läs om skillnaden")} <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" /></Link>
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
      title={t("Så kommer ni igång")}
      intro={t("Från konto till första utskick i tre steg.")}
      cards={[
        { Icon: UserPlus, title: t("Skapa ett konto"), copy: t("Berätta vilka ni är och vad ni vill skicka. Vi aktiverar kontot och hör av oss."), link: t("Skapa konto"), to: lp("/skapa-konto") },
        { Icon: BadgeCheck, title: t("Registrera avsändare"), copy: t("Ni skickar namn, logotyp och en kort beskrivning. Avsändaren kontrolleras innan den får skicka."), link: t("Om verifierad avsändare"), to: lp("/blogg/$slug").replace("$slug", "verifierad-avsandare") },
        { Icon: Send, title: t("Skicka första utskicket"), copy: t("Bygg meddelandet i webbverktyget eller koppla in ert system via API."), link: t("Till utvecklarsidan"), to: lp("/utvecklare") },
      ]}
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
      title={t("Priser")}
      intro={t("Ni betalar per meddelande. Det kostar inget att starta och det finns ingen bindningstid.")}
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
