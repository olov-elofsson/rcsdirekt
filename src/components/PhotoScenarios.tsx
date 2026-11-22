import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarPlus, ExternalLink, GalleryHorizontal, MapPin, MessagesSquare, Phone, RotateCcw, SquareMousePointer, type LucideIcon } from "lucide-react";

import { PhoneIcon, RcsSnippet, Typing } from "@/components/RcsPhone";
import { Button } from "@/components/ui/button";
import { scenarios, type Card, type Choice, type Scenario, type Step } from "@/data/rcs-scenarios";
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
      setEntries((list) => [...list, { from: "note", text: `Öppnar ${choice.opens}` }]);
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
}: {
  card: Card;
  narrow?: boolean;
  active: boolean;
  onChoose: (choice: Choice) => void;
}) {
  return (
    <div className={cn("card", narrow && "narrow")} style={{ flex: "none" }}>
      <div className="ct">{card.title}</div>
      <div className="cb">{card.body}</div>
      <div className={cn("cbtns", active && "invite")}>
        {card.actions.map((action) => (
          <button
            key={action.label}
            type="button"
            className="cbtn"
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
}: {
  sender: string;
  conversation: Conversation;
}) {
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
              display: "inline-block",
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
            <span style={{ opacity: 0.75, fontWeight: 400 }}> · I dag</span>
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
                      <span className="snippet-note" style={{ marginTop: 0, padding: "1px 8px", fontSize: 11.5 }}>Läst</span>
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
                    <CardView card={step.card} active={active} onChoose={choose} />
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
                        <CardView card={card} narrow active={active} onChoose={choose} />
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
                        className="chip"
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
            <RotateCcw aria-hidden className="size-3.5" /> Börja om
          </button>
        ) : null}
      </div>
    </div>
  );
}

type Feature = { label: string; Icon: LucideIcon };

/** The RCS features an example really uses, read from its messages, so the tags never claim more. */
function featuresOf(start: Step): Feature[] {
  const found = new Map<string, Feature>();
  const add = (label: string, Icon: LucideIcon) => found.set(label, { label, Icon });
  const seen = new Set<Step>();
  const walk = (step: Step) => {
    if (seen.has(step)) return;
    seen.add(step);
    if (step.card) add("Kort med knappar", SquareMousePointer);
    if (step.carousel) add("Karusell", GalleryHorizontal);
    for (const choice of choicesIn(step)) {
      if (choice.next) {
        add("Svar i tråden", MessagesSquare);
        walk(choice.next);
      }
      if (choice.opens === "kalendern") add("Kalender", CalendarPlus);
      else if (choice.opens === "kartan") add("Vägbeskrivning", MapPin);
      else if (choice.opens === "telefonen") add("Samtal", Phone);
      else if (choice.opens) add("Länk", ExternalLink);
    }
  };
  walk(start);
  // Three tags at most, in the order the example uses them, so a card stays calm.
  return [...found.values()].slice(0, 3);
}

/** One case: the photo with its conversation on top, and a short explanation under it. */
function CaseCard({ scenario, index, className }: { scenario: Scenario; index: number; className?: string }) {
  const conversation = useConversation(scenario.start);
  const features = featuresOf(scenario.start);
  return (
    <article data-reveal style={order(index)} className={cn("flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-card text-card-foreground md:w-auto", className)}>
      <figure className="relative h-[460px] overflow-hidden bg-muted sm:h-[500px]">
        <img src={scenario.photo.src} srcSet={scenario.photo.small ? `${scenario.photo.small} 800w, ${scenario.photo.src} 1600w` : undefined} sizes="(min-width: 1024px) 50vw, 100vw" alt={scenario.photo.alt} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" style={{ objectPosition: scenario.photo.position }} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <span className="absolute left-4 top-4 z-10 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm">Exempel för {scenario.customer}</span>
        <figcaption className={cn("absolute inset-x-5 bottom-5 top-12 flex flex-col justify-end", scenario.photo.messageAt === "right" ? "items-end sm:left-auto" : "sm:right-auto")}>
          <ConversationView sender={scenario.customer} conversation={conversation} />
        </figcaption>
      </figure>
      <div className="p-6 sm:p-7">
        <p className="text-sm font-bold text-foreground">{scenario.company}</p>
        <h3 className="mt-2 text-xl font-extrabold leading-snug">{scenario.title}</h3>
        <p className="mt-2 text-base leading-relaxed text-pretty text-muted-foreground">{scenario.copy}</p>
        {features.length ? (
          <ul aria-label="Det här använder exemplet" className="mt-5 flex flex-wrap gap-2">
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

/** Photos from the customer cases with a tappable RCS conversation on top, two cards per row on navy. */
export function PhotoScenarios() {
  return (
    <section
      id="exempel"
      aria-labelledby="exempel-title"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-16 text-ink-foreground sm:py-24"
    >
      {/* A wider row than the other sections, so the photos get room; heading and cards share its edge. */}
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div data-reveal>
          <h2 id="exempel-title" className={sectionTitle}>
            Kundexempel
          </h2>
          <p className={cn(sectionIntro, "text-ink-muted")}>
            Exempel för några av våra kunder. Tryck på knapparna i meddelandena
            och svara som en kund. Fotona kommer från kundcasen, och meddelandena är tänkbara
            upplägg.
          </p>
        </div>
        {/* Narrow and wide cards (2/5 and 3/5) swap sides between the rows. The second and third
            cards are wide: Maptun's carousel and Nercia's name in the photo need the width. */}
        {/* On phones the cards are a row to swipe, so the four do not stack into one long column. */}
        <div className={cn(sectionBody, "scrollbar-none -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-5")}>
          {scenarios.map((scenario, index) => (
            <CaseCard key={scenario.customer} scenario={scenario} index={index} className={index % 4 === 1 || index % 4 === 2 ? "lg:col-span-3" : "lg:col-span-2"} />
          ))}
        </div>
        <div data-reveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button asChild size="lg" variant="outline" className="home-cta self-start border-transparent">
            <Link to="/skapa-konto">Skapa konto <ArrowRight data-icon="end" /></Link>
          </Button>
          <p className="text-sm text-ink-muted">Bygg ett eget upplägg för era kunder.</p>
        </div>
      </div>
    </section>
  );
}
