import { useEffect, useRef, useState, type CSSProperties } from "react";

import { Link } from "@tanstack/react-router";
import { ArrowRight, RotateCcw } from "lucide-react";

import { Wave } from "@/components/BandWave";
import { Button } from "@/components/ui/button";
import { content } from "@/content";
import { PhoneIcon, RcsSnippet, Typing } from "@/components/RcsPhone";
import { scenarios, type Choice, type Scenario } from "@/data/rcs-scenarios";
import { cn } from "@/lib/utils";

const order = (index: number) => ({ "--reveal-order": index }) as CSSProperties;

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type ConversationState = ReturnType<typeof useConversation>;

/** One case's conversation: the photo's message and the text card's buttons share it. */
function useConversation() {
  const [chosen, setChosen] = useState<Choice | null>(null);
  const [typing, setTyping] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const choose = (choice: Choice) => {
    if (chosen) return;
    setChosen(choice);
    if (!choice.reply || reducedMotion()) return;
    setTyping(true);
    timer.current = window.setTimeout(() => setTyping(false), 1100);
  };
  const reset = () => {
    window.clearTimeout(timer.current);
    setChosen(null);
    setTyping(false);
  };
  return { chosen, typing, choose, reset };
}

/**
 * The message on a photo, tappable as in Google Messages: a reply is sent as the recipient's
 * answer and the business types an answer back; an action only opens something.
 */
function Conversation({ scenario, state }: { scenario: Scenario; state: ConversationState }) {
  const { customer: sender, message } = scenario;
  const { chosen, typing, choose, reset } = state;
  const answered = chosen?.reply ? chosen : null;

  return (
    <>
      <RcsSnippet width={300} scale={0.9}>
        {/* A dark label keeps the sender readable on light photos too. */}
        <div style={{ display: "inline-block", fontSize: 12.5, fontWeight: 500, color: "#fff", marginBottom: 6, padding: "2px 9px", borderRadius: 10, background: "rgba(31,31,31,.6)" }}>{sender}</div>
        {message.kind === "bubble" ? (
          <div className="inrow">
            <div className="bubble">{message.text}</div>
          </div>
        ) : (
          <div className="card">
            <div className="ct">{message.title}</div>
            <div className="cb">{message.body}</div>
            <div className={cn("cbtns", !chosen && "invite")}>
              {message.actions.map((action) => (
                <button key={action.label} type="button" className="cbtn" onClick={() => choose(action)} aria-pressed={chosen === action}>
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
        )}
        {message.kind === "bubble" && !chosen ? (
          <div className="chips invite">
            {message.chips.map((chip) => (
              <button key={chip.label} type="button" className="chip" onClick={() => choose(chip)}>
                {chip.label}
              </button>
            ))}
          </div>
        ) : null}
        {chosen?.opens ? (
          <div role="status" className="snippet-note animate-message-in">
            Öppnar {chosen.opens}
          </div>
        ) : null}
        {answered ? (
          <div className="outrow animate-message-in" style={{ marginTop: 8 }}>
            <div className="bubble">{answered.label}</div>
          </div>
        ) : null}
        {answered && typing ? (
          <div className="animate-message-in" style={{ marginTop: 8 }}>
            <Typing />
          </div>
        ) : null}
        {answered && !typing ? (
          <div role="status" className="inrow animate-message-in" style={{ marginTop: 8 }}>
            <div className="bubble">{answered.reply}</div>
          </div>
        ) : null}
      </RcsSnippet>
      {chosen ? (
        <button type="button" onClick={reset} className="mt-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Börja om
        </button>
      ) : null}
    </>
  );
}

/** Choices that can be tried: every reply and action in the message. */
const choicesOf = (message: Scenario["message"]) => (message.kind === "bubble" ? message.chips : message.actions);

/** The customer case in the CMS whose name starts with the scenario's customer, for its link. */
const caseSlug = (customer: string) =>
  content.kundcase.find((item) => item.name.toLowerCase().startsWith(customer.toLowerCase()))?.slug ?? "";

/** One case: the photo with its message, and a text card whose buttons drive the same message. */
function CaseRow({ scenario, flip }: { scenario: Scenario; flip: boolean }) {
  const state = useConversation();
  const slug = caseSlug(scenario.customer);
  // One grid per case, so `order` only swaps the photo and the text within its own row.
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <figure data-reveal style={order(0)} className={cn("relative min-h-[440px] overflow-hidden rounded-2xl bg-muted lg:col-span-2 lg:min-h-[420px]", flip && "lg:order-2")}>
        <img src={scenario.photo.src} alt={scenario.photo.alt} loading="lazy" className="absolute inset-0 size-full object-cover" style={{ objectPosition: scenario.photo.position }} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm">Exempel för {scenario.customer}</span>
        <figcaption data-reveal style={order(2)} className="absolute bottom-5 left-5 right-5 sm:right-auto">
          <Conversation scenario={scenario} state={state} />
        </figcaption>
      </figure>
      <div data-reveal style={order(1)} className={cn("flex flex-col gap-8 rounded-2xl bg-card p-7 sm:p-8", flip && "lg:order-1")}>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-logo-blue">{scenario.customer}</p>
          <h3 className="mt-3 text-2xl font-extrabold leading-tight">{scenario.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-pretty text-muted-foreground">{scenario.copy}</p>
        </div>
        <div className="mt-auto">
          <p className="text-sm font-semibold">Prova själv</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {choicesOf(scenario.message).map((choice) => (
              <Button key={choice.label} type="button" variant="outline" size="sm" disabled={Boolean(state.chosen)} onClick={() => state.choose(choice)}>
                {choice.label}
              </Button>
            ))}
            {state.chosen ? (
              <Button type="button" variant="ghost" size="sm" onClick={state.reset}>
                <RotateCcw aria-hidden /> Börja om
              </Button>
            ) : null}
          </div>
          {slug ? (
            <Link to="/demo/$slug" params={{ slug }} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 transition-colors hover:text-logo-blue hover:underline">
              Se hela kundcaset <ArrowRight aria-hidden className="size-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** Photos from the customer cases with a tappable RCS message on top, beside a short explanation. */
export function PhotoScenarios() {
  return (
    <section id="exempel" aria-labelledby="exempel-title" className="relative scroll-mt-24 overflow-hidden bg-primary-soft py-16 sm:py-24">
      <Wave flip fill="var(--color-background)" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div data-reveal className="max-w-2xl">
          <h2 id="exempel-title" className="text-[2.1rem] font-extrabold leading-tight sm:text-[2.65rem]">
            Meddelanden som går att svara på
          </h2>
          <p className="mt-5 text-base leading-relaxed text-pretty text-muted-foreground">
            Så kan ett meddelande se ut för några av våra kunder. Tryck på knapparna i bilderna och se vad som händer. Fotona kommer från kundcasen, och meddelandena är tänkbara upplägg.
          </p>
        </div>
        <div className="mt-12 grid gap-4">
          {scenarios.map((scenario, index) => {
            const flip = index % 2 === 1;
            return <CaseRow key={scenario.customer} scenario={scenario} flip={flip} />;
          })}
        </div>
      </div>
    </section>
  );
}
