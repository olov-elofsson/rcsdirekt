import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";

import { icon, RCSV_CSS, statusIcons, verifiedBadge } from "@/lib/rcs-video/engine";
import { PHONE_FONT_FILES } from "@/lib/rcs-phone/fonts";

/**
 * The website's phone: the same Google Messages screen as the video generator, built on
 * RCSV_CSS (360 × 640 px, scaled as a whole). See .claude/skills/rcs-phone.
 */

const FONT_CSS = PHONE_FONT_FILES.map(
  (file) =>
    `@font-face{font-family:'Google Sans';font-style:normal;font-weight:${file.weight};font-display:swap;src:url(${file.url}) format('woff2');${
      file.subset === "latin"
        ? "unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
        : "unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF"
    }}`,
).join("");

/** Inline SVG from the video engine's Material icon set. */
export function PhoneIcon({ name, size = 24, color = "#1f1f1f" }: { name: string; size?: number; color?: string }) {
  return <span aria-hidden="true" style={{ display: "block", lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: icon(name, size, color) }} />;
}

export function VerifiedMark({ size = 16 }: { size?: number }) {
  return <span style={{ display: "flex" }} dangerouslySetInnerHTML={{ __html: verifiedBadge(size) }} />;
}

const SCREEN_W = 360;
const SCREEN_H = 640;
const FRAME = 6;
const COMPOSER_TOP = 556; // 640 - 24 (navigation area) - 60 (composer)
const MESSAGES_TOP = 86; // under the compact header; the thread intro scrolls up behind it

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

/** The phone's font and RCSV_CSS, once per page (React hoists and dedupes the style). */
export function RcsStyles() {
  return <style href="rcs-phone" precedence="default">{FONT_CSS + RCSV_CSS}</style>;
}

/**
 * A few messages from the phone, without the phone: for photos with a message on top.
 * Same classes and sizes as the screen, scaled as a whole.
 */
export function RcsSnippet({ width = 300, scale = 1, children }: { width?: number; scale?: number; children: ReactNode }) {
  return (
    <div style={{ width: width * scale }}>
      <RcsStyles />
      {/* zoom scales the layout box too, so the snippet takes the space it shows */}
      <div className="rcsv snippet" style={{ width, zoom: scale }}>
        {children}
      </div>
    </div>
  );
}

export function RcsPhone({
  sender,
  logo,
  description,
  clock = "13:16",
  maxScale = 0.86,
  messagesRef,
  introWrap = (intro) => intro,
  profile,
  children,
}: {
  sender: string;
  logo: string;
  /** Shown under the name at the start of the thread, as in Google Messages. */
  description?: string;
  clock?: string;
  maxScale?: number;
  /** The scrolling message list, for scrolling to new messages. */
  messagesRef?: RefObject<HTMLDivElement | null>;
  /** Wraps the thread intro, for example in an explanation marker. */
  introWrap?: (intro: ReactNode) => ReactNode;
  /** The business profile that opens from the sender's name or logo, as in Google Messages. */
  profile?: SenderProfile;
  children: ReactNode;
}) {
  const [fitRef, scale] = useFitScale(maxScale);
  const ownRef = useRef<HTMLDivElement>(null);
  const listRef = messagesRef ?? ownRef;
  // The compact header shows the sender once the large intro has scrolled away.
  const [compact, setCompact] = useState(!description);
  const onScroll = () => {
    if (description) setCompact((listRef.current?.scrollTop ?? 0) > 96);
  };
  const [profileOpen, setProfileOpen] = useState(false);
  const openProfile = profile ? () => setProfileOpen(true) : undefined;
  // The sender's name and logo open the profile; without a profile they are plain text.
  const senderButton = (content: ReactNode, style?: CSSProperties) =>
    openProfile ? (
      <button type="button" className="rcsv-tap" onClick={openProfile} aria-label={`Visa företagsprofilen för ${sender}`} style={style}>
        {content}
      </button>
    ) : (
      content
    );
  return (
    <div ref={fitRef} className="mx-auto w-full" style={{ maxWidth: SCREEN_W * maxScale + FRAME * 2 }}>
      <RcsStyles />
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
                <div id="hdr-name" style={{ opacity: compact ? 1 : 0, transition: "opacity 160ms ease-out", pointerEvents: compact ? "auto" : "none" }} aria-hidden={!compact}>
                  {senderButton(
                    <>
                      <img src={logo} alt="" />
                      <span>{sender}</span>
                      <VerifiedMark size={18} />
                    </>,
                    { display: "flex", alignItems: "center", height: 40, padding: "0 8px 0 4px", margin: "0 -8px 0 -4px", borderRadius: 20 },
                  )}
                </div>
                <div className="more"><PhoneIcon name="more" /></div>
              </div>
              <div
                id="msgs"
                ref={listRef}
                onScroll={onScroll}
                className="scrollbar-none"
                style={{ height: COMPOSER_TOP - MESSAGES_TOP, top: MESSAGES_TOP, display: "block", overflowY: "auto", overscrollBehavior: "contain", background: description ? "var(--surf)" : undefined }}
              >
                {description
                  ? introWrap(
                      <div className="intro">
                        {senderButton(
                          <>
                            <img src={logo} alt="" />
                            <div className="n">{sender}<VerifiedMark size={18} /></div>
                          </>,
                          { display: "block", width: "100%", borderRadius: 20, padding: "4px 0" },
                        )}
                        <div className="d">{description}</div>
                      </div>,
                    )
                  : null}
                <div className="sheet" style={{ minHeight: "100%", paddingBottom: 12 }}>{children}</div>
              </div>
              <div id="composer" style={{ top: COMPOSER_TOP, zIndex: 6 }}>
                <div id="composer-input">
                  <div className="plus"><PhoneIcon name="plus" color="#444746" /></div>
                  <div className="ph">RCS-meddelande</div>
                  <div className="emoji"><PhoneIcon name="emoji" size={22} color="#444746" /></div>
                  <div className="gal"><PhoneIcon name="image" size={22} color="#444746" /></div>
                </div>
                <div id="send-btn" style={{ background: "var(--voice)" }}><PhoneIcon name="voice" size={24} color="#0f5223" /></div>
              </div>
            </div>
            {profile ? <ProfileLayer open={profileOpen} onClose={() => setProfileOpen(false)} sender={sender} logo={logo} description={description} profile={profile} /> : null}
            <div id="navpill" />
          </div>
        </div>
      </div>
    </div>
  );
}

export type SenderProfile = {
  /** Banner image, 1440 × 448 px, shown at the top of the profile. */
  banner: string;
  /** Contact rows; each also gets a round button under the description. */
  contacts: { icon: string; value: string; label: string; href: string }[];
};

/** The business profile, in the same positions as the video's (`#prof` in RCSV_CSS). */
function ProfileLayer({ open, onClose, sender, logo, description, profile }: { open: boolean; onClose: () => void; sender: string; logo: string; description?: string | undefined; profile: SenderProfile }) {
  const n = profile.contacts.length;
  const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});
  return (
    <div
      className="layer"
      id="prof"
      aria-hidden={!open}
      inert={!open}
      style={{ zIndex: 20, transform: open ? "translateX(0)" : "translateX(100%)", transition: "transform 280ms cubic-bezier(0.23, 1, 0.32, 1)", visibility: open ? "visible" : "hidden", transitionProperty: "transform, visibility" }}
    >
      <button type="button" className="rcsv-tap back" onClick={onClose} aria-label="Tillbaka till konversationen" style={{ position: "absolute", left: 10, top: 43, width: 32, height: 32, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <PhoneIcon name="back" />
      </button>
      <div className="more"><PhoneIcon name="more" /></div>
      <img className="banner" src={profile.banner} alt="" />
      <img className="logo" src={logo} alt="" />
      <div className="name" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{sender}<VerifiedMark size={19} /></div>
      {description ? <div className="desc">{description}</div> : null}
      {profile.contacts.map((contact, index) => (
        <a key={contact.href} className="act rcsv-tap" href={contact.href} {...external(contact.href)} aria-label={contact.label} style={{ left: 180 - 24 + (index - (n - 1) / 2) * 80 }}>
          <PhoneIcon name={contact.icon} size={22} color="#0b57d0" />
        </a>
      ))}
      {profile.contacts.map((contact, index) => (
        <a key={`row-${contact.href}`} className={`crow rcsv-tap${index === 0 ? " first" : ""}${index === n - 1 ? " last" : ""}`} href={contact.href} {...external(contact.href)} style={{ top: 386 + index * 61, color: "inherit", textDecoration: "none" }}>
          <span dangerouslySetInnerHTML={{ __html: icon(contact.icon, 22, "#1f1f1f") }} />
          <div className="v">{contact.value}</div>
          <div className="l">{contact.label}</div>
        </a>
      ))}
    </div>
  );
}

/* Message building blocks, in the screen's own pixels. */

export function DateLabel({ children }: { children: ReactNode }) {
  return <div className="date">{children}</div>;
}

/** The business's messages: no avatar in Google Messages, they start 12 px in. */
export function IncomingRow({ children, last = true }: { children: ReactNode; last?: boolean }) {
  return (
    <div className="inrow" style={{ marginBottom: last ? 0 : 3 }}>
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
