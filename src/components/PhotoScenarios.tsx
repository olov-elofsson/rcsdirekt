import { useEffect, useRef, useState, type CSSProperties } from "react";
import { RotateCcw } from "lucide-react";

import { PhoneIcon, RcsSnippet, Typing } from "@/components/RcsPhone";
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

/** One case: the photo with its conversation on top, and a short explanation under it. */
function CaseCard({ scenario, index }: { scenario: Scenario; index: number }) {
  const conversation = useConversation(scenario.start);
  return (
    <article data-reveal style={order(index)} className="flex flex-col overflow-hidden rounded-2xl bg-card text-card-foreground">
      <figure className="relative h-[460px] overflow-hidden bg-muted sm:h-[500px]">
        <img src={scenario.photo.src} alt={scenario.photo.alt} loading="lazy" className="absolute inset-0 size-full object-cover" style={{ objectPosition: scenario.photo.position }} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <span className="absolute left-4 top-4 z-10 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm">Exempel för {scenario.customer}</span>
        <figcaption className="absolute inset-x-5 bottom-5 top-12 flex flex-col justify-end sm:right-auto">
          <ConversationView sender={scenario.customer} conversation={conversation} />
        </figcaption>
      </figure>
      <div className="p-6 sm:p-7">
        <p className="text-sm font-semibold text-muted-foreground">{scenario.customer}</p>
        <h3 className="mt-1.5 text-xl font-extrabold leading-snug">{scenario.title}</h3>
        <p className="mt-2 text-base leading-relaxed text-pretty text-muted-foreground">{scenario.copy}</p>
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
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div data-reveal>
          <h2 id="exempel-title" className={sectionTitle}>
            Så kan det se ut hos era kunder
          </h2>
          <p className={cn(sectionIntro, "text-ink-muted")}>
            Exempel för några av våra kunder. Tryck på knapparna i meddelandena
            och svara som en kund. Fotona kommer från kundcasen, och meddelandena är tänkbara
            upplägg.
          </p>
        </div>
        <div className={cn(sectionBody, "grid gap-6 md:grid-cols-2")}>
          {scenarios.map((scenario, index) => (
            <CaseCard key={scenario.customer} scenario={scenario} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
