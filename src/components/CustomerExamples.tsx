import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, CalendarPlus, CheckCheck, IdCard, MoreHorizontal, MousePointerClick, ExternalLink, GalleryHorizontal, MapPin, MessagesSquare, Phone, RotateCcw, SquareMousePointer, Ticket, type LucideIcon } from "lucide-react";

import { PhoneIcon, RcsSnippet, Typing, VerifiedMark } from "@/components/RcsPhone";
import { scenarios as scenariosSv, type Card, type Choice, type Scenario, type Step } from "@/data/customer-examples";
import { scenarios as scenariosEn } from "@/data/en/customer-examples";
import { translate, useT, type Locale } from "@/lib/i18n";

const useScenarios = () => (useT().locale === "en" ? scenariosEn : scenariosSv);
import { sectionBody, sectionIntro, sectionTitle } from "@/lib/typography";
import { cn } from "@/lib/utils";

const order = (index: number) => ({ "--reveal-order": index }) as CSSProperties;
const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** A pause that grows with what the business writes, so the rhythm is not mechanical. */
const typingTime = (step: Step) => {
  const words = [step.text, step.card?.title, step.card?.body].filter(Boolean).join(" ").length;
  return Math.min(1700, 650 + words * 14 + (step.carousel ? 300 : 0));
};

type Entry =
  { from: "business"; step: Step } | { from: "me"; text: string } | { from: "note"; text: string };

/** Buttons the recipient can use in a message: card and carousel actions, then suggestions. */
const choicesIn = (step: Step): Choice[] => [
  ...(step.card?.actions ?? []),
  ...(step.carousel ?? []).flatMap((card) => card.actions),
  ...(step.chips ?? []),
];

/** One case's conversation on its photo. */
function useConversation(start: Step) {
  const { locale } = useT();
  const [entries, setEntries] = useState<Entry[]>([{ from: "business", step: start }]);
  const [typing, setTyping] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const lastBusiness = [...entries]
    .reverse()
    .find((entry): entry is Extract<Entry, { from: "business" }> => entry.from === "business");
  const current = lastBusiness?.step ?? start;
  // Suggestions disappear once the recipient has answered, as in Google Messages.
  const answered = entries[entries.length - 1]?.from === "me" || typing;

  const choose = (choice: Choice) => {
    if (typing || !choicesIn(current).includes(choice)) return;
    if (choice.opens) {
      setEntries((list) => [...list, { from: "note", text: `${translate(locale, "Öppnar")} ${choice.opens}` }]);
      return;
    }
    const next = choice.next;
    if (!next) return;
    setEntries((list) => [...list, { from: "me", text: choice.label }]);
    if (reducedMotion()) {
      setEntries((list) => [...list, { from: "business", step: next }]);
      return;
    }
    setTyping(true);
    timer.current = window.setTimeout(() => {
      setTyping(false);
      setEntries((list) => [...list, { from: "business", step: next }]);
    }, typingTime(next));
  };
  const reset = () => {
    window.clearTimeout(timer.current);
    setTyping(false);
    setEntries([{ from: "business", step: start }]);
  };
  const started = entries.length > 1;
  return { entries, typing, current, answered, choose, reset, started };
}

type Conversation = ReturnType<typeof useConversation>;

function CardView({
  card,
  narrow,
  active,
  onChoose,
  hint,
}: {
  card: Card;
  narrow?: boolean;
  active: boolean;
  onChoose: (choice: Choice) => void;
  /** The button the demo is about to press, marked with a pulsing ring. */
  hint?: Choice | undefined;
}) {
  const { t } = useT();
  return (
    <div className={cn("card", narrow && "narrow")} style={{ flex: "none" }}>
      <div className="ct">{card.title}</div>
      <div className="cb">{card.body}</div>
      <div className={cn("cbtns", active && "invite")}>
        {card.actions.map((action) => (
          <button
            key={action.label}
            type="button"
            className={cn("cbtn", action === hint && "tap-hint")}
            disabled={!active}
            onClick={() => onChoose(action)}
          >
            {action.icon ? (
              <span className="ci" style={{ background: "#fff" }}>
                <PhoneIcon name={action.icon} size={18} />
              </span>
            ) : null}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * The conversation on a photo, tappable as in Google Messages: a reply is sent as the recipient's
 * answer and the business types an answer back; an action only opens something.
 */
function ConversationView({
  sender,
  conversation,
  hint,
}: {
  sender: string;
  conversation: Conversation;
  hint?: Choice | undefined;
}) {
  const { t } = useT();
  // A little smaller on phones, so the photo still shows around the message.
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const { entries, typing, current, answered, choose } = conversation;
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = scroller.current;
    if (element)
      element.scrollTo({
        top: element.scrollHeight,
        behavior: reducedMotion() ? "auto" : "smooth",
      });
  }, [entries.length, typing]);

  return (
    <div
      ref={scroller}
      className="scrollbar-none max-h-full overflow-y-auto overscroll-contain"
      style={{ maskImage: "linear-gradient(to bottom, transparent 0, #000 28px)" }}
    >
      <div className="pt-7">
        <RcsSnippet width={300} scale={compact ? 0.8 : 0.9}>
          {/* A dark label keeps the sender readable on light photos too. */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 12.5,
              fontWeight: 500,
              color: "#fff",
              marginBottom: 6,
              padding: "2px 9px",
              borderRadius: 10,
              background: "rgba(31,31,31,.6)",
            }}
          >
            {sender}
            <VerifiedMark size={13} />
            <span style={{ opacity: 0.75, fontWeight: 400 }}>· {t("I dag")}</span>
          </div>
          {entries.map((entry, index) => {
            const gap = index === 0 ? 0 : 8;
            if (entry.from === "me") {
              return (
                <div key={index} className="animate-message-in" style={{ marginTop: gap }}>
                  <div className="outrow">
                    <div className="bubble">{entry.text}</div>
                  </div>
                  {/* Read, as Google Messages shows it once the business has answered. */}
                  {entries.slice(index + 1).some((later) => later.from === "business") ? (
                    <div style={{ textAlign: "right", marginTop: 3 }}>
                      <span className="snippet-note" style={{ marginTop: 0, padding: "1px 8px", fontSize: 11.5 }}>{t("Läst")}</span>
                    </div>
                  ) : null}
                </div>
              );
            }
            if (entry.from === "note") {
              return (
                <div
                  key={index}
                  role="status"
                  className="snippet-note animate-message-in"
                  style={{ display: "table" }}
                >
                  {entry.text}
                </div>
              );
            }
            const { step } = entry;
            const active = step === current && !answered;
            return (
              <div
                key={index}
                className={index === 0 ? undefined : "animate-message-in"}
                style={{ marginTop: gap }}
              >
                {step.text ? (
                  <div className="inrow">
                    <div className="bubble">{step.text}</div>
                  </div>
                ) : null}
                {step.card ? (
                  <div style={{ marginTop: step.text ? 6 : 0 }}>
                    <CardView card={step.card} active={active} onChoose={choose} hint={hint} />
                  </div>
                ) : null}
                {step.carousel ? (
                  <div
                    className="scrollbar-none"
                    style={{
                      display: "flex",
                      gap: 8,
                      overflowX: "auto",
                      marginTop: step.text ? 8 : 0,
                      // Room for the cards' shadow, which the scroll box would otherwise cut.
                      padding: "0 0 14px",
                      marginBottom: -14,
                      scrollSnapType: "x mandatory",
                      // The next card fades out at the edge instead of being cut off, a hint to swipe.
                      maskImage: "linear-gradient(to right, #000 calc(100% - 56px), transparent)",
                    }}
                  >
                    {step.carousel.map((card) => (
                      <div key={card.title} style={{ scrollSnapAlign: "start" }}>
                        <CardView card={card} narrow active={active} onChoose={choose} hint={hint} />
                      </div>
                    ))}
                    {/* Lets the last card scroll clear of the fade. */}
                    <div aria-hidden style={{ flex: "none", width: 48 }} />
                  </div>
                ) : null}
                {step.chips && active ? (
                  <div className={cn("chips", index === 0 && "invite")}>
                    {step.chips.map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        className={cn("chip", chip === hint && "tap-hint")}
                        onClick={() => choose(chip)}
                      >
                        {chip.icon ? (
                          <PhoneIcon name={chip.icon} size={16} color="#0b57d0" />
                        ) : null}
                        {chip.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
          {typing ? (
            <div className="animate-message-in" style={{ marginTop: 8 }}>
              <Typing />
            </div>
          ) : null}
        </RcsSnippet>
        {conversation.started ? (
          <button
            type="button"
            onClick={conversation.reset}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RotateCcw aria-hidden className="size-3.5" /> {t("Börja om")}
          </button>
        ) : null}
      </div>
    </div>
  );
}

type Feature = { label: string; Icon: LucideIcon };

/** The RCS features an example really uses, read from its messages, so the tags never claim more. */
function featuresOf(start: Step, locale: Locale): Feature[] {
  const found = new Map<string, Feature>();
  const add = (label: string, Icon: LucideIcon) => found.set(label, { label: translate(locale, label), Icon });
  // Every RCS business sender is verified, and the example shows the sender's name above it.
  add("Verifierad avsändare", BadgeCheck);
  add("Företagsnamn som avsändare", IdCard);
  const seen = new Set<Step>();
  const walk = (step: Step) => {
    if (seen.has(step)) return;
    seen.add(step);
    if (step.card) add("Kort med knappar", SquareMousePointer);
    if (/^(Kupong|Coupon)/.test(step.card?.title ?? "")) add("Kuponger", Ticket);
    if (step.carousel) add("Karusell", GalleryHorizontal);
    if (step.chips?.some((chip) => chip.next)) add("Snabbsvar", MousePointerClick);
    for (const choice of choicesIn(step)) {
      if (choice.next) {
        add("Svar i tråden", MessagesSquare);
        // The answer shows as read and the business types before it replies, as in the app.
        add("Läskvitto", CheckCheck);
        add("Visar att ni skriver", MoreHorizontal);
        walk(choice.next);
      }
      if (choice.opens === "kalendern" || choice.opens === "the calendar") add("Kalender", CalendarPlus);
      else if (choice.opens === "kartan" || choice.opens === "the map") add("Vägbeskrivning", MapPin);
      else if (choice.opens === "telefonen" || choice.opens === "the phone") add("Samtal", Phone);
      else if (choice.opens) add("Länk", ExternalLink);
    }
  };
  walk(start);
  // What this example shows that a plain SMS cannot, at most four; the sender and read receipts are
  // the same in every example, so they are left to the comparison table.
  const generic = new Set(["Verifierad avsändare", "Företagsnamn som avsändare", "Läskvitto", "Visar att ni skriver", "Svar i tråden"].map((label) => translate(locale, label)));
  return [...found.values()].filter((feature) => !generic.has(feature.label)).slice(0, 4);
}

/** One case large: the photo with its conversation beside the text, and what the customer can try. */
function CaseRow({ scenario, onSwipe }: { scenario: Scenario; onSwipe: (step: 1 | -1) => void }) {
  const conversation = useConversation(scenario.start);
  const { t, locale } = useT();
  const features = featuresOf(scenario.start, locale);
  const [hint, setHint] = useState<Choice | undefined>(undefined);
  const touched = useRef(false);
  const box = useRef<HTMLElement>(null);
  const swipeFrom = useRef<{ x: number; y: number } | null>(null);

  // The person's own taps stop the demo.
  const choose = (choice: Choice) => {
    touched.current = true;
    setHint(undefined);
    conversation.choose(choice);
  };

  // When the case comes into view: ring the first reply, then press it, once.
  useEffect(() => {
    const element = box.current;
    if (!element || reducedMotion()) return;
    const timers: number[] = [];
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      const first = choicesIn(scenario.start).find((choice) => choice.next) ?? choicesIn(scenario.start)[0];
      if (!first) return;
      timers.push(window.setTimeout(() => !touched.current && setHint(first), 1200));
      timers.push(window.setTimeout(() => {
        if (touched.current) return;
        setHint(undefined);
        conversation.choose(first);
      }, 2900));
    }, { threshold: 0.5 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
    // The demo belongs to this case only; the row is remounted when the case changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article ref={box} id="kundexempel-panel" role="tabpanel"
      aria-label={`${t("Exempel för")} ${scenario.customer}`}
      // A sideways swipe on a phone moves to the next or previous case.
      onTouchStart={(event) => {
        const touch = event.touches[0];
        swipeFrom.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
      }}
      onTouchEnd={(event) => {
        const from = swipeFrom.current;
        const touch = event.changedTouches[0];
        swipeFrom.current = null;
        if (!from || !touch) return;
        const dx = touch.clientX - from.x;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(touch.clientY - from.y) * 1.5) onSwipe(dx < 0 ? 1 : -1);
      }}
      className="grid overflow-hidden rounded-2xl bg-card text-card-foreground lg:grid-cols-[1.35fr_1fr]">
      <figure className="relative h-[460px] overflow-hidden bg-muted sm:h-[520px] lg:h-[560px]">
        <img src={scenario.photo.src} srcSet={scenario.photo.small ? `${scenario.photo.small} 800w, ${scenario.photo.src} 1600w` : undefined} sizes="(min-width: 1024px) 60vw, 100vw" alt={scenario.photo.alt} decoding="async" className="absolute inset-0 size-full object-cover" style={{ objectPosition: scenario.photo.position }} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <span className="absolute left-4 top-4 z-10 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm">{t("Exempel för")} {scenario.company}</span>
        <figcaption className={cn("absolute inset-x-5 bottom-5 top-14 flex flex-col justify-end", scenario.photo.messageAt === "right" ? "items-end sm:left-auto" : scenario.photo.messageAt === "center" ? "items-center" : "sm:right-auto")}>
          <ConversationView sender={scenario.customer} conversation={{ ...conversation, choose }} hint={hint} />
        </figcaption>
      </figure>
      <div className="flex flex-col p-5 sm:p-8 lg:justify-center lg:p-10">
        <p className="text-sm font-bold">{scenario.company}</p>
        <h3 className="mt-2 text-2xl font-extrabold leading-tight text-balance sm:text-3xl">{scenario.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-pretty text-muted-foreground">{scenario.copy}</p>
        {features.length ? (
          <ul aria-label={t("Det här använder exemplet")} className="mt-5 flex flex-wrap gap-2">
            {features.map(({ label, Icon }) => (
              <li key={label} className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold">
                <Icon aria-hidden strokeWidth={2} className="size-3.5 text-logo-blue" />
                {label}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

/** The examples one at a time: a tab per customer, the chosen one large under them. */
function CaseShowcase() {
  const scenarios = useScenarios();
  const { t } = useT();
  const [index, setIndex] = useState(0);
  const tabs = useRef<HTMLDivElement>(null);
  const scenario = scenarios[index];
  const show = (next: number) => {
    const count = scenarios.length;
    setIndex(((next % count) + count) % count);
  };
  // Keep the chosen tab visible in the row without moving the page.
  useEffect(() => {
    const row = tabs.current;
    const tab = row?.children[index] as HTMLElement | undefined;
    if (!row || !tab) return;
    row.scrollTo({ left: tab.offsetLeft - row.offsetLeft - 20, behavior: reducedMotion() ? "auto" : "smooth" });
  }, [index]);
  if (!scenario) return null;
  // From the buttons under the case the new case starts above the fold, so bring its tabs up.
  const step = (by: 1 | -1) => {
    show(index + by);
    tabs.current?.scrollIntoView({ block: "start", behavior: reducedMotion() ? "auto" : "smooth" });
  };
  const nextName = scenarios[(index + 1) % scenarios.length]?.customer;
  return (
    <div className={sectionBody}>
      <div ref={tabs} role="tablist" aria-label={t("Välj kundexempel")} className="scroll-mt-20 scrollbar-none -mx-5 mb-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        {scenarios.map((item, itemIndex) => (
          <button
            key={item.customer}
            type="button"
            role="tab"
            aria-selected={itemIndex === index}
            aria-controls="kundexempel-panel"
            onClick={() => setIndex(itemIndex)}
            className={cn(
              "inline-flex h-11 shrink-0 items-center rounded-full px-5 text-sm font-semibold transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              itemIndex === index ? "bg-ink-foreground text-ink" : "bg-ink-foreground/10 text-ink-foreground hover:bg-ink-foreground/20",
            )}
          >
            {item.company}
          </button>
        ))}
      </div>
      {/* The key remounts the row, so each case starts from its first message and plays its demo. */}
      <CaseRow key={scenario.customer} scenario={scenario} onSwipe={(step) => show(index + step)} />
      {/* On a phone the tabs have scrolled away by the end of a case, so the next one is offered here. */}
      <div className="mt-4 flex items-center justify-between gap-3 lg:hidden">
        <span className="text-sm text-ink-muted tabular-nums">{index + 1} {t("av")} {scenarios.length}</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} aria-label={t("Föregående exempel")} className="inline-flex size-11 items-center justify-center rounded-full bg-ink-foreground/10 text-ink-foreground transition-[background-color,scale] duration-150 ease-out active:scale-[0.96]">
            <ArrowLeft aria-hidden className="size-4" />
          </button>
          <button type="button" onClick={() => step(1)} className="inline-flex h-11 items-center gap-2 rounded-full bg-ink-foreground px-5 text-sm font-semibold text-ink transition-[scale] duration-150 ease-out active:scale-[0.96]">
            {nextName} <ArrowRight aria-hidden className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function CustomerExamples() {
  const { t, lp } = useT();
  return (
    <section
      id="exempel"
      data-no-mobile-cta
      aria-labelledby="exempel-title"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-16 text-ink-foreground sm:py-24"
    >
      {/* A wider row than the other sections, so the photos get room; heading and cards share its edge. */}
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div data-reveal>
          <h2 id="exempel-title" className={sectionTitle}>
            {t("Kundcase")}
          </h2>
          <p className={cn(sectionIntro, "text-ink-muted")}>
            {t("Så här kan det se ut hos några av våra kunder. Tryck på knapparna i meddelandet och se vad som händer. Fotona kommer från kundcasen, meddelandena är exempel.")}
          </p>
        </div>
        <CaseShowcase />
      </div>
    </section>
  );
}
