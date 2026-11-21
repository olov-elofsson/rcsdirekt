import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

import { icon, RCSV_CSS, statusIcons, verifiedBadge } from "@/lib/rcs-video/engine";
import { INTER_FILES } from "@/lib/rcs-phone/inter";

/**
 * The website's phone: the same Google Messages screen as the video generator, built on
 * RCSV_CSS (360 × 640 px, scaled as a whole). See .claude/skills/rcs-phone.
 */

const INTER_CSS = INTER_FILES.map(
  (file) =>
    `@font-face{font-family:'Inter';font-style:normal;font-weight:${file.weight};font-display:swap;src:url(${file.url}) format('woff2');${
      file.subset === "latin"
        ? "unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
        : "unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF"
    }}`,
).join("");

/** Inline SVG from the video engine's Material icon set. */
export function PhoneIcon({ name, size = 24, color = "#1f1f1f" }: { name: string; size?: number; color?: string }) {
  return <span aria-hidden="true" style={{ display: "block", lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: icon(name, size, color) }} />;
}

export function VerifiedMark() {
  return <span style={{ display: "flex" }} dangerouslySetInnerHTML={{ __html: verifiedBadge(16) }} />;
}

const SCREEN_W = 360;
const SCREEN_H = 640;
const FRAME = 6;
const COMPOSER_TOP = 556; // 640 - 24 (navigation area) - 60 (composer)
const MESSAGES_TOP = 90;

/** Scale that fits the phone in its container, at most `max`. */
function useFitScale(max: number): [RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(max);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(Math.min(max, (el.clientWidth - FRAME * 2) / SCREEN_W));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [max]);
  return [ref, scale];
}

export function RcsPhone({
  sender,
  logo,
  clock = "13:16",
  maxScale = 0.86,
  messagesRef,
  children,
}: {
  sender: string;
  logo: string;
  clock?: string;
  maxScale?: number;
  /** The scrolling message list, for scrolling to new messages. */
  messagesRef?: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  const [fitRef, scale] = useFitScale(maxScale);
  return (
    <div ref={fitRef} className="mx-auto w-full" style={{ maxWidth: SCREEN_W * maxScale + FRAME * 2 }}>
      <style href="rcs-phone" precedence="default">{INTER_CSS + RCSV_CSS}</style>
      <div
        className="mx-auto overflow-hidden rounded-[32px] border-[6px] border-foreground/90 shadow-xl"
        style={{ width: SCREEN_W * scale + FRAME * 2, height: SCREEN_H * scale + FRAME * 2 }}
      >
        <div style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
          <div className="rcsv">
            <div id="status">
              <div id="clock">{clock}</div>
              <div id="sicons" dangerouslySetInnerHTML={{ __html: statusIcons() }} />
            </div>
            <div className="layer" id="conv">
              <div id="hdr">
                <div className="back"><PhoneIcon name="back" /></div>
                <div id="hdr-name">
                  <img src={logo} alt="" />
                  <span>{sender}</span>
                  <VerifiedMark />
                </div>
                <div className="more"><PhoneIcon name="more" /></div>
              </div>
              <div
                id="msgs"
                ref={messagesRef}
                className="scrollbar-none"
                style={{ height: COMPOSER_TOP - MESSAGES_TOP, top: MESSAGES_TOP, display: "block", overflowY: "auto", overscrollBehavior: "contain", paddingTop: 4, paddingBottom: 12 }}
              >
                {children}
              </div>
              <div id="composer" style={{ top: COMPOSER_TOP }}>
                <div id="composer-input">
                  <div className="plus"><PhoneIcon name="plus" color="#444746" /></div>
                  <div className="ph">RCS-meddelande</div>
                  <div className="emoji"><PhoneIcon name="emoji" size={22} color="#444746" /></div>
                  <div className="gal"><PhoneIcon name="image" size={22} color="#444746" /></div>
                </div>
                <div id="send-btn" style={{ background: "#d1e1fc" }}><PhoneIcon name="mic" size={22} color="#0b57d0" /></div>
              </div>
            </div>
            <div id="navpill" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Message building blocks, in the screen's own pixels. */

/** Top of the thread: the sender's logo, name with the verified badge, and description. */
export function ThreadIntro({ logo, sender, description }: { logo: string; sender: string; description: string }) {
  return (
    <div className="intro">
      <img src={logo} alt="" />
      <div className="n">{sender}<VerifiedMark /></div>
      <div className="d">{description}</div>
    </div>
  );
}

export function DateLabel({ children }: { children: ReactNode }) {
  return <div className="date">{children}</div>;
}

export function IncomingRow({ logo, children, last = true }: { logo: string; children: ReactNode; last?: boolean }) {
  return (
    <div className="inrow" style={{ marginBottom: last ? 0 : 3 }}>
      {last ? <img className="avatar" src={logo} alt="" /> : null}
      {children}
    </div>
  );
}

export function Bubble({ children }: { children: ReactNode }) {
  return <div className="bubble">{children}</div>;
}

export function OutgoingBubble({ children, status }: { children: ReactNode; status?: string }) {
  return (
    <>
      <div className="outrow"><div className="bubble">{children}</div></div>
      {status ? <div className="ts tsout">{status}</div> : <div style={{ height: 10 }} />}
    </>
  );
}

export function Timestamp({ children }: { children: ReactNode }) {
  return <div className="ts tsin">{children}</div>;
}

export function Typing() {
  return (
    <div className="typing" role="status" aria-label="Skriver">
      <span />
      <span />
      <span />
    </div>
  );
}
