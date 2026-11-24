import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, BookOpen, Building2, CircleHelp, Code2, Images, MessageSquareText, MessagesSquare, MonitorSmartphone, Receipt } from "lucide-react";

import { HeroMessage } from "@/components/HeroMessage";
import { PhoneIcon, RcsSnippet, VerifiedMark } from "@/components/RcsPhone";
import { rcsDirektSender } from "@/data/rcs-sender";
import { scenarios } from "@/data/customer-examples";
import { Button } from "@/components/ui/button";
import { usePriser, useStartsida } from "@/content/localized";
import { useT } from "@/lib/i18n";
import { formatPrice, useCurrency } from "@/lib/money";
import { cn } from "@/lib/utils";

// The start page sections laid out after fortnox.se, in our own brand kit: entrance cards with a
// line icon under the hero, rows that alternate picture and text with one rounded action each,
// and two large coloured cards side by side.

const order = (index: number) => ({ "--reveal-order": index }) as CSSProperties;

/** A row's heading: a full sentence, as Fortnox writes them, a little smaller than a section title. */
const rowTitle = "-ml-[0.04em] text-[1.9rem] font-extrabold leading-[1.12] text-balance sm:text-[2.35rem]";


/** The soft panel every row's picture sits on, so the three pictures read as one set. */
function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex min-h-[22rem] items-center justify-center rounded-3xl bg-primary-soft p-8 sm:min-h-[26rem] sm:p-12", className)}>{children}</div>;
}

/** The web tool, reduced to its result: the card as the customer sees it. */
function WebVisual() {
  const { t } = useT();
  return (
    <Panel>
      <RcsSnippet width={300} scale={0.95}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#444746", marginBottom: 6 }}>
          {rcsDirektSender.sender} <VerifiedMark size={14} />
        </div>
        <div className="card">
          <img src={rcsDirektSender.profile.banner} alt="" style={{ objectFit: "cover" }} />
          <div className="ct">{t("Ert första utskick")}</div>
          <div className="cb">{t("Bilder, text och knappar, byggt i webbläsaren.")}</div>
          <div className="cbtns">
            <div className="cbtn"><span className="ci"><PhoneIcon name="open" size={18} /></span>{t("Läs mer")}</div>
          </div>
        </div>
      </RcsSnippet>
    </Panel>
  );
}

/** The API, reduced to one request and its answer. */
function ApiVisual() {
  const { t, locale } = useT();
  const body = locale === "en"
    ? `{
  "to": "+46701234567",
  "text": "Your appointment is Tuesday at 2 pm.",
  "buttons": ["Confirm", "Reschedule"]
}`
    : `{
  "to": "+46701234567",
  "text": "Din tid är tisdag kl. 14.00.",
  "buttons": ["Bekräfta", "Boka om"]
}`;
  return (
    <Panel className="bg-ink">
      <figure className="w-full max-w-md text-left">
        <figcaption className="flex items-center gap-2 font-mono text-xs text-ink-muted">
          <span className="rounded bg-ink-foreground/15 px-1.5 py-0.5 text-ink-foreground">POST</span>/messages
        </figcaption>
        <pre className="mt-4 overflow-x-auto text-[13px] leading-relaxed text-ink-foreground sm:text-sm"><code>{body}</code></pre>
        <p className="mt-5 flex items-center gap-2 border-t border-ink-foreground/10 pt-4 font-mono text-xs text-ink-muted">
          <span className="rounded bg-ink-foreground/15 px-1.5 py-0.5 text-ink-foreground">202</span>{t("Mottaget, status kommer via webhook")}
        </p>
      </figure>
    </Panel>
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






/** A section heading as Fortnox writes them: a full sentence, centred. */
const centredTitle = "mx-auto max-w-3xl text-center text-[2.1rem] font-extrabold leading-[1.1] text-balance sm:text-[2.65rem]";
/** Fortnox's rounded, outlined action: white with a thin border. */
const pill = "home-cta";
const textLink = "group inline-flex min-h-10 items-center gap-1.5 text-base font-semibold text-logo-blue underline-offset-4 hover:underline";

/** Fortnox block 2: three bordered cards under the hero, a large line icon, centred text and a link. */
export function Entrances() {
  const { t, lp } = useT();
  const from = usePriser().plans[0]?.price;
  const cards = [
    { Icon: MonitorSmartphone, title: t("Skicka från webben"), copy: t("Bygg utskicket i webbläsaren och se direkt hur det ser ut hos kunden."), link: t("Se webbverktyget"), to: lp("/"), hash: "vad-ar-rcs" },
    { Icon: Code2, title: t("Koppla in ert system"), copy: t("Låt era system skicka bekräftelser och påminnelser via API."), link: t("Till utvecklarsidan"), to: lp("/utvecklare") },
    { Icon: Receipt, title: t("Betala per meddelande"), copy: from ? t("Listpris från {price} per meddelande, utan bindningstid.").replace("{price}", from) : t("Ni betalar för de meddelanden ni skickar."), link: t("Se priser"), to: lp("/priser") },
  ];
  return (
    <section id="ingangar" aria-label={t("Kom vidare")} className="bg-background">
      <ul className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-3 lg:px-8">
        {cards.map(({ Icon, ...card }, index) => (
          <li key={card.title} data-reveal style={order(index)}>
            <Link to={card.to} {...(card.hash ? { hash: card.hash } : {})} className="group flex h-full flex-col items-center rounded-2xl border border-border bg-card px-8 pt-10 pb-9 text-center transition-[border-color,box-shadow] duration-200 ease-out hover:border-logo-blue/40 hover:shadow-card">
              <Icon aria-hidden strokeWidth={1.25} className="size-16 text-logo-blue" />
              <h3 className="mt-7 text-xl font-extrabold leading-snug">{card.title}</h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-pretty text-muted-foreground">{card.copy}</p>
              <span className="mt-7 inline-flex items-center gap-1.5 text-base font-semibold text-logo-blue">{card.link} <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" /></span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Fortnox block 3: rows that alternate picture and text, each with one action. */
export function ProductRows() {
  const home = useStartsida();
  const { t, lp } = useT();
  const [web, api] = home.vagar.items;
  return (
    <section id="plattform" className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-24 px-5 sm:gap-32 lg:px-8">
        <SplitRow
          id="rcs-mot-sms"
          title={t("Samma besked, som SMS och som RCS")}
          copy={t("Växla mellan SMS och RCS och se hur samma besked ser ut hos kunden. Med RCS syns ert namn och er logga, och kunden kan svara med ett tryck.")}
          action={<Button className={pill} asChild size="lg" variant="outline"><Link to={lp("/blogg/$slug")} params={{ slug: "rcs-vs-sms" }}>{t("Läs om skillnaden")}</Link></Button>}
          visual={<Panel><div className="w-full max-w-[22rem]"><HeroMessage bare /></div></Panel>}
        />
        <SplitRow
          id="vad-ar-rcs"
          flip
          title={t("Bygg utskicket i webbläsaren")}
          copy={web?.copy ?? ""}
          action={<Link to={lp("/skapa-konto")} className={textLink}>{t("Prova webbverktyget")} <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" /></Link>}
          visual={<WebVisual />}
        />
        <SplitRow
          title={t("Låt era system skicka via API")}
          copy={api?.copy ?? ""}
          action={<Button className={pill} asChild size="lg" variant="outline"><Link to={lp("/utvecklare")}>{t("Till utvecklarsidan")}</Link></Button>}
          visual={<ApiVisual />}
        />
      </div>
    </section>
  );
}

/** Fortnox block 4: one large centred statement with the key part in colour. */
export function Statement() {
  const { t, locale } = useT();
  const names = scenarios.map((scenario) => scenario.customer);
  const list = `${names.slice(0, -1).join(", ")} ${locale === "en" ? "and" : "och"} ${names.at(-1)}`;
  return (
    <section id="kunder" aria-label={t("Kunder")} className="bg-background">
      <p data-reveal className="mx-auto max-w-5xl px-5 text-center font-display text-[1.9rem] font-extrabold leading-[1.15] text-balance sm:text-[2.6rem] lg:px-8">
        {t("Ni är i gott sällskap.")} <span className="text-logo-blue">{list}</span> {t("skickar RCS med oss.")}
      </p>
    </section>
  );
}

/** Fortnox block 5: two large coloured cards side by side. */
export function BigCards() {
  const { t, lp } = useT();
  const link = "group inline-flex min-h-10 items-center gap-1.5 text-base font-semibold underline-offset-4 hover:underline";
  return (
    <section id="hjalp" aria-label={t("Hjälp")} className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div data-reveal className="flex flex-col rounded-3xl bg-ink p-9 text-ink-foreground sm:p-12">
          <h2 className="text-[1.9rem] font-extrabold leading-[1.15] text-balance text-ink-foreground sm:text-[2.2rem]">{t("Hjälp att komma igång")}</h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-pretty text-ink-muted">{t("Vi registrerar er avsändare och hjälper er med det första utskicket, från webben eller med en koppling till era system.")}</p>
          <p className="mt-8 text-base text-ink-foreground">{t("För företag")}</p>
          <Link to={lp("/kontakt")} className={cn(link, "text-ink-foreground underline")}>{t("Prata med oss om upplägget")} <ArrowRight aria-hidden className="size-4" /></Link>
          <p className="mt-6 text-base text-ink-foreground">{t("För utvecklare")}</p>
          <Link to={lp("/utvecklare")} className={cn(link, "text-ink-foreground underline")}>{t("Läs om API:t och webhooks")} <ArrowRight aria-hidden className="size-4" /></Link>
        </div>
        <div data-reveal style={order(1)} className="flex flex-col rounded-3xl bg-primary-soft p-9 sm:p-12">
          <h2 className="text-[1.9rem] font-extrabold leading-[1.15] text-balance sm:text-[2.2rem]">{t("Vi står bakom er")}</h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-pretty text-muted-foreground">{t("Ni får svensk support när ni behöver hjälp, och raka svar på frågor om priser och volymer.")}</p>
          <p className="mt-8 max-w-md text-base font-semibold">{t("Undrar ni vilken meddelandetyp ni behöver?")}</p>
          <p className="mt-1 max-w-md text-base leading-relaxed text-muted-foreground">{t("Hör av er, så räknar vi på det tillsammans.")}</p>
          <div className="mt-8"><Link to={lp("/kontakt")} className={link}>{t("Prata med oss")} <ArrowRight aria-hidden className="size-4" /></Link></div>
        </div>
      </div>
    </section>
  );
}

/** Fortnox block 6: three bordered cards with an icon, a left-aligned title, text and an outlined button. */
export function LinkCards() {
  const { t, lp } = useT();
  const cards = [
    { Icon: BookOpen, title: t("Guider om RCS"), copy: t("Korta artiklar om vad RCS är, vad det kostar och hur ni kommer igång. Alla med källor."), action: t("Läs guiderna"), to: lp("/blogg") },
    { Icon: CircleHelp, title: t("Vanliga frågor"), copy: t("Svar på det de flesta undrar om priser, moms, fasta avgifter och längre meddelanden."), action: t("Se frågorna"), to: lp("/priser") },
    { Icon: Building2, title: t("Om rcsdirekt.se"), copy: t("Vilka vi är, var vi finns och hur ni når oss."), action: t("Om oss"), to: lp("/om-oss") },
  ];
  return (
    <section id="mer" aria-label={t("Mer om RCS")} className="bg-background">
      <ul className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-3 lg:px-8">
        {cards.map(({ Icon, ...card }, index) => (
          <li key={card.title} data-reveal style={order(index)} className="flex flex-col rounded-2xl border border-border bg-card p-8">
            <Icon aria-hidden strokeWidth={1.25} className="mx-auto size-16 text-logo-blue" />
            <h3 className="mt-10 text-lg font-extrabold leading-snug">{card.title}</h3>
            <p className="mt-3 flex-1 text-base leading-relaxed text-pretty text-muted-foreground">{card.copy}</p>
            <div className="mt-8"><Button className={pill} asChild variant="outline"><Link to={card.to}>{card.action}</Link></Button></div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Fortnox block 8, "De första byggstenarna": the three message types as centred cards with an icon. */
export function PlanBlocks() {
  const priser = usePriser();
  const currency = useCurrency();
  const { t, locale } = useT();
  const icons = [MessageSquareText, Images, MessagesSquare];
  return (
    <section id="pris" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 data-reveal className={centredTitle}>{t("Tre sorters meddelanden")}</h2>
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {priser.plans.map((plan, index) => {
            const Icon = icons[index] ?? MessageSquareText;
            return (
              <li key={plan.slug} data-reveal style={order(index)} className="flex flex-col items-center rounded-2xl border border-border bg-card px-8 pt-10 pb-9 text-center">
                <Icon aria-hidden strokeWidth={1.25} className="size-16 text-logo-blue" />
                <h3 className="mt-7 text-xl font-extrabold leading-snug">{plan.name}</h3>
                <p className="mt-2 text-base text-muted-foreground">{plan.contents}</p>
                <p className="mt-3 text-base font-semibold">{t("från")} {formatPrice(plan.price, currency, { locale: locale === "en" ? "en-GB" : "sv-SE" })} {t("per meddelande")}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Fortnox block 9: one rounded coloured box with a question and one dark button. */
export function CtaBox() {
  const { t, lp } = useT();
  return (
    <section id="kom-igang" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div data-reveal className="flex flex-col items-center rounded-3xl bg-logo-blue px-6 py-16 text-center sm:py-20">
          <h2 className="max-w-3xl text-[2rem] font-extrabold leading-[1.1] text-balance text-white sm:text-[2.6rem]">{t("Hur mycket kostar ert utskick?")}</h2>
          <Button asChild size="lg" className="home-cta mt-8"><Link to={lp("/priser")}>{t("Räkna på priset")}</Link></Button>
        </div>
      </div>
    </section>
  );
}
