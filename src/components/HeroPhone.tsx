import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import senderLogo from "../../brand/SVG/rcs-avsandare.svg";
import cardImage from "@/assets/rcs-kort-webinar.svg";
import { DateLabel, IncomingRow, PhoneIcon, RcsPhone, Timestamp, Typing } from "@/components/RcsPhone";
import { useNextWebinar, when } from "@/lib/webinar";

type Action = { label: string; icon?: string; to: string; hash?: string };

/**
 * The start page's phone: a real RCS message arrives once, after a short typing indicator.
 * It invites to the next webinar from the CMS, or welcomes a new sender when there is none.
 */
export function HeroPhone() {
  const webinar = useNextWebinar();
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);
  // 0: thread only, 1: typing, 2: card, 3: suggestions.
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(3);
      return;
    }
    const timers = [700, 1900, 2600].map((delay, index) => window.setTimeout(() => setStep(index + 1), delay));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  useEffect(() => {
    if (step < 2) return;
    const list = listRef.current;
    requestAnimationFrame(() => list?.scrollTo({ top: list.scrollHeight, behavior: step === 3 ? "smooth" : "auto" }));
  }, [step]);

  const card = webinar
    ? (() => {
        const { day, time } = when(webinar);
        return {
          title: `Webinar: ${webinar.title}`,
          copy: `${day}, ${time}. Anmäl dig så skickar vi länken.`,
          actions: [
            { label: "Anmäl mig", icon: "event", to: "/", hash: "webinar" },
            { label: "Läs om RCS", icon: "open", to: "/blogg" },
          ] satisfies Action[],
        };
      })()
    : {
        title: "Välkommen till RCS Direkt",
        copy: "Skapa ett konto, välj mottagare och lägg till bild och knappar i ert första utskick.",
        actions: [
          { label: "Skapa konto", icon: "open", to: "/skapa-konto" },
          { label: "Se priser", to: "/priser" },
        ] satisfies Action[],
      };
  const chips: Action[] = [
    { label: "Vad kostar det?", to: "/priser" },
    { label: "Prata med oss", to: "/", hash: "kontakt" },
  ];
  const go = (action: Action) => void navigate({ to: action.to, ...(action.hash ? { hash: action.hash } : {}) });

  return (
    <div role="group" aria-label="Exempel på ett RCS-meddelande i Google Messages">
      <RcsPhone sender="RCS Direkt" logo={senderLogo} description="Skicka RCS direkt från webben eller via API." maxScale={0.82} messagesRef={listRef}>
        <DateLabel>I dag</DateLabel>
        {step === 1 ? (
          <div style={{ paddingLeft: 12 }}>
            <Typing />
          </div>
        ) : null}
        {step >= 2 ? (
          <div className="animate-message-in">
            <IncomingRow>
              <div className="card">
                <img src={cardImage} alt="" />
                <div className="ct">{card.title}</div>
                <div className="cb">{card.copy}</div>
                <div className="cbtns">
                  {card.actions.map((action) => (
                    <button key={action.label} type="button" className="cbtn" onClick={() => go(action)}>
                      {action.icon ? (
                        <span className="ci">
                          <PhoneIcon name={action.icon} size={18} />
                        </span>
                      ) : null}
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            </IncomingRow>
            <Timestamp>13:16</Timestamp>
          </div>
        ) : null}
        {step >= 3 ? (
          <div className="chips animate-message-in" style={{ marginBottom: 0 }}>
            {chips.map((chip) => (
              <button key={chip.label} type="button" className="chip" onClick={() => go(chip)}>
                {chip.label}
              </button>
            ))}
          </div>
        ) : null}
      </RcsPhone>
    </div>
  );
}
