import { useEffect, useRef, useState } from "react";

import { PhoneIcon, RcsSnippet, Typing, VerifiedMark } from "@/components/RcsPhone";
import { rcsDirektSender } from "@/data/rcs-sender";
import { cn } from "@/lib/utils";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const senderLine = { display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#444746", marginBottom: 6 } as const;
const note = { marginTop: 0, padding: "1px 8px", fontSize: 11.5 } as const;

/** The same notice as an SMS: a name of at most eleven characters, plain text and a bare link. */
function AsSms() {
  return (
    <RcsSnippet width={300}>
      <div style={senderLine}>rcsdirekt</div>
      <div className="inrow">
        <div className="bubble">Hej Anna! Ditt konto är klart. Logga in här för att skicka ditt första utskick: rcsdirekt.se/l/8k2Q.</div>
      </div>
      <div className="ts tsin" style={{ marginBottom: 0 }}>13:16 · Sms</div>
    </RcsSnippet>
  );
}

type Reply = { label: string; icon?: string; opens?: string; answer?: string };

const SUGGESTIONS: Reply[] = [
  { label: "Tack!", answer: "Varsågod! Hör av dig om du undrar något." },
  { label: "Boka genomgång", icon: "event", opens: "kalendern" },
  { label: "Visa priser", icon: "open", opens: "prissidan" },
];

/** The same notice as RCS: logo, verified name, a greeting, a card with buttons and suggestions. */
function AsRcs({ active }: { active: boolean }) {
  const [sent, setSent] = useState<Reply | null>(null);
  const [typing, setTyping] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [opened, setOpened] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const choose = (reply: Reply) => {
    if (reply.opens) {
      setOpened(reply.opens);
      return;
    }
    setOpened(null);
    setSent(reply);
    setTyping(true);
    timer.current = window.setTimeout(() => {
      setTyping(false);
      setAnswered(true);
    }, reducedMotion() ? 0 : 1100);
  };

  return (
    <RcsSnippet width={300}>
      <div style={senderLine}>
        <img src={rcsDirektSender.logo} alt="" width={20} height={20} style={{ borderRadius: 6, background: "#fff" }} />
        {rcsDirektSender.sender}
        <VerifiedMark size={15} />
      </div>
      <div className="inrow" style={{ marginBottom: 3 }}>
        <div className="bubble">Hej Anna! Välkommen till rcsdirekt.se.</div>
      </div>
      <div className="card">
        <img src={rcsDirektSender.profile.banner} alt="" />
        <div className="ct">Ditt konto är klart</div>
        <div className="cb">Skicka ditt första utskick från webben, eller koppla in ert system via API.</div>
        <div className="cbtns">
          <button type="button" tabIndex={active ? 0 : -1} className="cbtn" onClick={() => setOpened("portalen")}>
            <span className="ci"><PhoneIcon name="open" size={18} /></span>Logga in
          </button>
          <button type="button" tabIndex={active ? 0 : -1} className="cbtn" onClick={() => setOpened("telefonen")}>
            <span className="ci"><PhoneIcon name="call" size={18} /></span>Ring oss
          </button>
        </div>
      </div>
      <div className="ts tsin" style={{ marginBottom: 0 }}>13:16 · RCS</div>
      {sent ? (
        <div className="animate-message-in" style={{ marginTop: 8 }}>
          <div className="outrow"><div className="bubble">{sent.label}</div></div>
          {answered ? <div style={{ textAlign: "right", marginTop: 3 }}><span className="snippet-note" style={note}>Läst</span></div> : null}
        </div>
      ) : null}
      {typing ? <div className="animate-message-in" style={{ marginTop: 8 }}><Typing /></div> : null}
      {answered && sent?.answer ? (
        <div className="inrow animate-message-in" style={{ marginTop: 8 }}><div className="bubble">{sent.answer}</div></div>
      ) : null}
      {opened ? <div role="status" className="snippet-note animate-message-in" style={{ display: "table", marginTop: 8 }}>Öppnar {opened}</div> : null}
      {!sent ? (
        <div className="chips" style={{ justifyContent: "flex-end", flexWrap: "wrap" }}>
          {SUGGESTIONS.map((reply) => (
            <button key={reply.label} type="button" tabIndex={active ? 0 : -1} className="chip" onClick={() => choose(reply)}>
              {reply.icon ? <PhoneIcon name={reply.icon} size={16} color="#0b57d0" /> : null}
              {reply.label}
            </button>
          ))}
        </div>
      ) : null}
    </RcsSnippet>
  );
}

/**
 * Beside the hero text: one notice, switchable between how it arrives as SMS and as RCS. It turns
 * into RCS once by itself when it comes into view, and the RCS version's buttons can be tried.
 */
export function HeroMessage({ className }: { className?: string }) {
  const [rcs, setRcs] = useState(false);
  const touched = useRef(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = box.current;
    if (!element || reducedMotion()) {
      setRcs(true);
      return;
    }
    let timer: number | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      timer = window.setTimeout(() => !touched.current && setRcs(true), 1400);
    }, { threshold: 0.4 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const pick = (value: boolean) => {
    touched.current = true;
    setRcs(value);
  };

  return (
    <div ref={box} className={cn("w-full max-w-[22rem] rounded-3xl bg-muted px-5 pt-5 pb-7", className)}>
      <div role="radiogroup" aria-label="Visa meddelandet som" className="mx-auto mb-6 grid w-fit grid-cols-2 rounded-full bg-background p-1 text-sm font-semibold shadow-card">
        {[false, true].map((value) => (
          <button
            key={String(value)}
            type="button"
            role="radio"
            aria-checked={rcs === value}
            onClick={() => pick(value)}
            className={cn(
              "h-9 rounded-full px-5 transition-[background-color,color] duration-200 ease-out",
              rcs === value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {value ? "RCS" : "SMS"}
          </button>
        ))}
      </div>
      {/* Both versions share one grid cell, so the box keeps its height while they cross-fade. */}
      <div className="grid min-h-[34rem] text-left" aria-live="polite">
        {[false, true].map((value) => (
          <div
            key={String(value)}
            aria-hidden={rcs !== value}
            className={cn(
              "col-start-1 row-start-1 flex justify-center self-center transition-[opacity,translate,scale] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
              rcs === value ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-1 scale-[0.98] opacity-0",
            )}
          >
            {value ? <AsRcs active={rcs} /> : <AsSms />}
          </div>
        ))}
      </div>
    </div>
  );
}
