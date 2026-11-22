import { useEffect, useRef, useState } from "react";
import { MousePointerClick } from "lucide-react";

import { PhoneIcon, RcsSnippet, Typing, VerifiedMark } from "@/components/RcsPhone";
import { rcsDirektSender } from "@/data/rcs-sender";
import { useAutoToggle } from "@/hooks/use-auto-toggle";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const senderLine = { display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#444746", marginBottom: 6 } as const;
/** The message a little smaller than in the app, so the box sits level with the hero text. */
const SCALE = 0.86;
const note = { marginTop: 0, padding: "1px 8px", fontSize: 11.5 } as const;

/** The same notice as an SMS: a name of at most eleven characters, plain text and a bare link. */
function AsSms() {
  const { t } = useT();
  return (
    <RcsSnippet width={300} scale={SCALE}>
      <div style={senderLine}>rcsdirekt</div>
      <div className="inrow">
        <div className="bubble">{t("Hej Anna! Ditt konto är klart. Logga in här för att skicka ditt första utskick: rcsdirekt.se/l/8k2Q.")}</div>
      </div>
      <div className="ts tsin" style={{ marginBottom: 0 }}>13:16 · SMS</div>
    </RcsSnippet>
  );
}

type Reply = { label: string; icon?: string; opens?: string; answer?: string };

const SUGGESTIONS: Reply[] = [
  { label: "Tack!", answer: "Varsågod! Hör av dig om du undrar något." },
  { label: "Boka genomgång", icon: "event", opens: "kalendern" },
];

/** The same notice as RCS: logo, verified name, a greeting, a card with buttons and suggestions. */
function AsRcs({ active, onInteract }: { active: boolean; onInteract: () => void }) {
  const { t } = useT();
  const [sent, setSent] = useState<Reply | null>(null);
  const [typing, setTyping] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [opened, setOpened] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const choose = (reply: Reply) => {
    onInteract();
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
    <RcsSnippet width={300} scale={SCALE}>
      <div style={senderLine}>
        <img src={rcsDirektSender.logo} alt="" width={20} height={20} style={{ borderRadius: 6, background: "#fff" }} />
        {rcsDirektSender.sender}
        <VerifiedMark size={15} />
      </div>
      <div className="inrow" style={{ marginBottom: 3 }}>
        <div className="bubble">{t("Hej Anna! Välkommen till rcsdirekt.se.")}</div>
      </div>
      <div className="card">
        <img src={rcsDirektSender.profile.banner} alt="" />
        <div className="ct">{t("Ditt konto är klart")}</div>
        <div className="cb">{t("Skicka ditt första utskick från webben, eller koppla in ert system via API.")}</div>
        <div className="cbtns">
          <button type="button" tabIndex={active ? 0 : -1} className="cbtn" onClick={() => { onInteract(); setOpened("portalen"); }}>
            <span className="ci"><PhoneIcon name="open" size={18} /></span>{t("Logga in")}
          </button>
          <button type="button" tabIndex={active ? 0 : -1} className="cbtn" onClick={() => { onInteract(); setOpened("telefonen"); }}>
            <span className="ci"><PhoneIcon name="call" size={18} /></span>{t("Ring oss")}
          </button>
        </div>
      </div>
      <div className="ts tsin" style={{ marginBottom: 0 }}>13:16 · RCS</div>
      {sent ? (
        <div className="animate-message-in" style={{ marginTop: 8 }}>
          <div className="outrow"><div className="bubble">{t(sent.label)}</div></div>
          {answered ? <div style={{ textAlign: "right", marginTop: 3 }}><span className="snippet-note" style={note}>{t("Läst")}</span></div> : null}
        </div>
      ) : null}
      {typing ? <div className="animate-message-in" style={{ marginTop: 8 }}><Typing /></div> : null}
      {answered && sent?.answer ? (
        <div className="inrow animate-message-in" style={{ marginTop: 8 }}><div className="bubble">{t(sent.answer)}</div></div>
      ) : null}
      {opened ? <div role="status" className="snippet-note animate-message-in" style={{ display: "table", marginTop: 8 }}>{t("Öppnar")} {t(opened)}</div> : null}
      {!sent ? (
        <div className="chips" style={{ justifyContent: "flex-end", flexWrap: "wrap" }}>
          {SUGGESTIONS.map((reply) => (
            <button key={reply.label} type="button" tabIndex={active ? 0 : -1} className="chip" onClick={() => choose(reply)}>
              {reply.icon ? <PhoneIcon name={reply.icon} size={16} color="#0b57d0" /> : null}
              {t(reply.label)}
            </button>
          ))}
        </div>
      ) : null}
    </RcsSnippet>
  );
}

/** How long each version shows before the box switches by itself. */
const SWITCH_MS = 3600;

/**
 * Beside the hero text: one notice, switchable between how it arrives as SMS and as RCS. While it
 * is in view it switches by itself every few seconds; once the visitor picks a version or taps the
 * message, it stays put. With reduced motion it simply shows the RCS version.
 */
export function HeroMessage({ className }: { className?: string }) {
  const { t } = useT();
  const box = useRef<HTMLDivElement>(null);
  const { rcs, pick, touch } = useAutoToggle(box, SWITCH_MS);

  return (
    <div ref={box} className={cn("w-full lg:max-w-[20rem]", className)}>
      {/* A label above the box, in the same style as the line above the hero heading. */}
      <p id="se-skillnaden" className="mb-3 flex items-center justify-center gap-2 text-[13px] font-semibold text-muted-foreground sm:text-sm">
        <MousePointerClick aria-hidden strokeWidth={2} className="size-4 text-logo-blue" />
        {t("Se skillnaden själv")}
      </p>
      <div className="rounded-3xl bg-muted px-4 pt-4 pb-5">
      <div role="radiogroup" aria-labelledby="se-skillnaden" className="mx-auto mb-4 grid w-fit grid-cols-2 rounded-full bg-background p-1 text-sm font-semibold shadow-card">
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
      {/* Both versions share one grid cell, so the box keeps its height and the page never moves while they switch. */}
      <div className="grid text-left lg:min-h-[27.5rem]" aria-live="polite">
        {[false, true].map((value) => (
          <div
            key={String(value)}
            aria-hidden={rcs !== value}
            className={cn(
              "col-start-1 row-start-1 flex justify-center self-center transition-[opacity,translate,scale] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
              rcs === value ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-1 scale-[0.98] opacity-0",
            )}
          >
            {value ? <AsRcs active={rcs} onInteract={touch} /> : <AsSms />}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
