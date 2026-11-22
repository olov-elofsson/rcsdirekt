import { useEffect, useRef, useState } from "react";

import { PhoneIcon, RcsSnippet, VerifiedMark } from "@/components/RcsPhone";
import { rcsDirektSender } from "@/data/rcs-sender";
import { cn } from "@/lib/utils";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const senderLine = { display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#444746", marginBottom: 6 } as const;

/** The same notice as an SMS: a name of at most eleven characters, plain text and a bare link. */
function AsSms() {
  return (
    <RcsSnippet width={300}>
      <div style={senderLine}>rcsdirekt</div>
      <div className="inrow">
        <div className="bubble">Hej! Ditt konto är klart. Logga in här för att skicka ditt första utskick: rcsdirekt.se/l/8k2Q</div>
      </div>
    </RcsSnippet>
  );
}

/** The same notice as RCS: logo, verified name, a picture and buttons. */
function AsRcs() {
  return (
    <RcsSnippet width={300}>
      <div style={senderLine}>
        <img src={rcsDirektSender.logo} alt="" width={20} height={20} style={{ borderRadius: 6, background: "#fff" }} />
        {rcsDirektSender.sender}
        <VerifiedMark size={15} />
      </div>
      <div className="card">
        <img src={rcsDirektSender.profile.banner} alt="" />
        <div className="ct">Ditt konto är klart</div>
        <div className="cb">Nu kan du skicka ditt första utskick, från webben eller via API.</div>
        <div className="cbtns">
          <div className="cbtn"><span className="ci"><PhoneIcon name="open" size={18} /></span>Logga in</div>
          <div className="cbtn"><span className="ci"><PhoneIcon name="call" size={18} /></span>Ring oss</div>
        </div>
      </div>
    </RcsSnippet>
  );
}

/**
 * Under the hero: one notice, switchable between how it arrives as SMS and as RCS. It turns into
 * RCS once by itself when it comes into view, so the difference shows without reading anything.
 */
export function HeroMessage() {
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
    <div ref={box} className="mx-auto mt-14 w-full max-w-[22rem] rounded-3xl bg-muted px-5 pt-5 pb-7 sm:mt-16">
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
            {value ? "Som RCS" : "Som sms"}
          </button>
        ))}
      </div>
      {/* Both versions share one grid cell, so the box keeps its height while they cross-fade. */}
      <div className="grid text-left" aria-live="polite">
        {[false, true].map((value) => (
          <div
            key={String(value)}
            aria-hidden={rcs !== value}
            className={cn(
              "col-start-1 row-start-1 flex justify-center self-center transition-[opacity,translate,scale] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
              rcs === value ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-1 scale-[0.98] opacity-0",
            )}
          >
            {value ? <AsRcs /> : <AsSms />}
          </div>
        ))}
      </div>
    </div>
  );
}
