import { useEffect, useRef, useState, type ReactNode } from "react";

import { PhoneIcon, RcsStyles, VerifiedMark } from "@/components/RcsPhone";
import { icon } from "@/lib/rcs-video/engine";
import { rcsDirektSender } from "@/data/rcs-sender";

/**
 * Side-by-side illustrations of how the same RCS message from a company looks on iPhone and on
 * Android, for the article rcs-iphone-android-skillnader. Android is drawn with the site's phone
 * classes (RCSV_CSS); iPhone with its `.rcsv.ios` variant. Each picture is a slice of the screen,
 * 360 px wide in the screen's own pixels and zoomed as a whole to fit its column.
 * Based on Voxtelesys' and Klaviyo's descriptions of iOS rendering (sources in the article).
 */

const SCREEN_W = 360;

function useFitZoom(): [React.RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.88);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setZoom(Math.min(1, el.clientWidth / SCREEN_W));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, zoom];
}

function Slice({ platform, children }: { platform: "ios" | "android"; children: ReactNode }) {
  const [ref, zoom] = useFitZoom();
  return (
    <div className="min-w-0">
      <p className="mb-2 text-sm font-semibold text-foreground">
        {platform === "ios" ? "iPhone" : "Android"}
        <span className="font-normal text-muted-foreground"> · {platform === "ios" ? "Meddelanden" : "Google Meddelanden"}</span>
      </p>
      <div ref={ref} className="overflow-hidden rounded-2xl border border-border bg-background">
        {/* zoom scales the layout box too, so the slice takes the space it shows */}
        <div className={`rcsv crop${platform === "ios" ? " ios" : ""}`} style={{ width: SCREEN_W, zoom }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Figure({ caption, ios, android }: { caption: ReactNode; ios: ReactNode; android: ReactNode }) {
  return (
    <figure className="my-10" aria-label="Illustration av skillnaden mellan iPhone och Android">
      <RcsStyles />
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-5">
        <Slice platform="ios">{ios}</Slice>
        <Slice platform="android">{android}</Slice>
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
        {caption} Illustration, utseendet varierar med telefon, version och operatör.
      </figcaption>
    </figure>
  );
}

const { sender, logo, description } = rcsDirektSender;

const ICON_PATHS = {
  chevronDown: "M12 15.4 5.3 8.7l1.4-1.4 5.3 5.3 5.3-5.3 1.4 1.4z",
  chevronLeft: "M15.4 18.6 8.8 12l6.6-6.6L14 4l-8 8 8 8z",
  plus: "M11 19v-6H5v-2h6V5h2v6h6v2h-6v6z",
  mic: "M12 14q-1.25 0-2.125-.875T9 11V5q0-1.25.875-2.125T12 2t2.125.875T15 5v6q0 1.25-.875 2.125T12 14m-1 7v-3.075q-2.6-.35-4.3-2.325T5 11h2q0 2.075 1.463 3.538T12 16t3.538-1.463T17 11h2q0 2.625-1.7 4.6T13 17.925V21z",
};
function Svg({ d, size = 16, color = "#8a8a8e" }: { d: string; size?: number; color?: string }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" style={{ flex: "none" }}>
      <path fill={color} d={d} />
    </svg>
  );
}

/* iPhone: header with the logo and the name in a pill, and the channel line under it. */
function IosHead() {
  return (
    <>
      <div className="ihead">
        <div className="iback"><Svg d={ICON_PATHS.chevronLeft} size={20} color="#000" /></div>
        <img src={logo} alt="" />
        <div className="ipname">{sender}<i>›</i></div>
      </div>
      <div className="ichan">Textmeddelande • RCS<br />Idag 13:12</div>
    </>
  );
}
const IosNote = () => <div className="inote">{sender} ser vilka åtgärder du väljer</div>;
function IosComposer() {
  return (
    <div className="icomp">
      <div className="iplus"><Svg d={ICON_PATHS.plus} size={18} /></div>
      <div className="ipill">Textmeddelande • RCS<Svg d={ICON_PATHS.mic} size={17} /></div>
    </div>
  );
}
function IosOptions() {
  return <div className="iopts">Alternativ<Svg d={ICON_PATHS.chevronDown} size={14} color="#3c3c43" /></div>;
}

/* Android: the compact header of Google Messages on the tinted surface, then the white sheet. */
function AndroidHead() {
  return (
    <div style={{ position: "relative", height: 56, background: "var(--surf)" }}>
      <div id="hdr" style={{ top: 2 }}>
        <div className="back"><PhoneIcon name="back" /></div>
        <div id="hdr-name"><img src={logo} alt="" /><span>{sender}</span><VerifiedMark size={18} /></div>
        <div className="more"><PhoneIcon name="more" /></div>
      </div>
    </div>
  );
}
function AndroidSheet({ children }: { children: ReactNode }) {
  return (
    <div style={{ background: "var(--surf)" }}>
      <div className="sheet" style={{ borderRadius: "24px 24px 0 0", paddingTop: 14 }}>{children}</div>
    </div>
  );
}
function AndroidComposer() {
  return (
    <div id="composer" style={{ position: "relative" }}>
      <div id="composer-input">
        <div className="plus"><PhoneIcon name="plus" color="#444746" /></div>
        <div className="ph">RCS-meddelande</div>
        <div className="emoji"><PhoneIcon name="emoji" size={22} color="#444746" /></div>
        <div className="gal"><PhoneIcon name="image" size={22} color="#444746" /></div>
      </div>
      <div id="send-btn" style={{ background: "var(--voice)" }}><PhoneIcon name="voice" size={24} color="#0f5223" /></div>
    </div>
  );
}

const WEBINAR = {
  title: "Webinar: kom igång med RCS",
  body: "En halvtimme om hur du registrerar en avsändare, skickar ditt första kort och tar emot svar. Vi går igenom ett riktigt utskick från början till slut och svarar på frågor efteråt.",
};
const CardImage = ({ height }: { height?: number }) => (
  <div className="cimg" style={height ? { height } : undefined}><PhoneIcon name="school" size={40} color="#0b57d0" /></div>
);

/** Sender profile: iPhone shows a contact card without the banner. */
export function ProfileCompare() {
  return (
    <Figure
      caption="Avsändarens profil. iPhone visar ett kontaktkort med logotyp, namn, inställningar och kontaktuppgifter, men inte bannerbilden. Google Meddelanden visar banner, logotyp, knappar och alla kontaktuppgifter."
      ios={
        <div className="iprof">
          <div className="iback"><Svg d={ICON_PATHS.chevronLeft} size={20} color="#000" /></div>
          <img className="logo" src={logo} alt="" />
          <div className="name">{sender}</div>
          <div className="ver">Verifierad avsändare</div>
          <div className="grp">
            <div>Dölj aviseringar<span className="itog" /></div>
            <div>Skicka läskvitton<span className="itog" /></div>
          </div>
          <div className="h">Om</div>
          <div className="grp"><div>{description}</div></div>
          <div className="h">Detaljer</div>
          <div className="grp">
            {rcsDirektSender.profile.contacts.map((contact) => (
              <div key={contact.href}><span><span className="l">{contact.label}</span><span className="v">{contact.value}</span></span></div>
            ))}
          </div>
        </div>
      }
      android={
        <div className="layer" id="prof" style={{ height: 520 }}>
          <div className="back"><PhoneIcon name="back" /></div>
          <div className="more"><PhoneIcon name="more" /></div>
          <img className="banner" src={rcsDirektSender.profile.banner} alt="" />
          <img className="logo" src={logo} alt="" />
          <div className="name" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{sender}<VerifiedMark size={19} /></div>
          <div className="desc">{description}</div>
          {rcsDirektSender.profile.contacts.map((contact, index, all) => (
            <div key={contact.href} className="act" style={{ left: 180 - 24 + (index - (all.length - 1) / 2) * 80 }}>
              <PhoneIcon name={contact.icon} size={22} color="#0b57d0" />
            </div>
          ))}
          {rcsDirektSender.profile.contacts.map((contact, index, all) => (
            <div key={`row-${contact.href}`} className={`crow${index === 0 ? " first" : ""}${index === all.length - 1 ? " last" : ""}`} style={{ top: 386 + index * 61 }}>
              <span dangerouslySetInnerHTML={{ __html: icon(contact.icon, 22, "#1f1f1f") }} />
              <div className="v">{contact.value}</div>
              <div className="l">{contact.label}</div>
            </div>
          ))}
        </div>
      }
    />
  );
}

/** Rich card: iPhone has one fixed image height, three lines of text and the action as a pill. */
export function CardCompare() {
  return (
    <Figure
      caption="Ett kort med hög bild och lång text. Android visar bilden i den höjd avsändaren valt, hela texten och knappen som en rad i kortet. iPhone har en fast bildhöjd, kortar texten efter tre rader och visar knappen som en kapsel."
      ios={
        <div style={{ paddingBottom: 12 }}>
          <IosHead />
          <div className="irow">
            <div className="icard">
              <CardImage />
              <div className="ibody">
                <div className="it">{WEBINAR.title}</div>
                <div className="id">{WEBINAR.body}</div>
                <span className="ichev">›</span>
              </div>
              <div className="ipillbtn">Anmäl dig<PhoneIcon name="open" size={16} color="#3c3c43" /></div>
            </div>
          </div>
        </div>
      }
      android={
        <>
          <AndroidHead />
          <AndroidSheet>
            <div className="inrow">
              <div className="card">
                <CardImage height={220} />
                <div className="ct">{WEBINAR.title}</div>
                <div className="cb">{WEBINAR.body}</div>
                <div className="cbtns">
                  <div className="cbtn"><span className="ci"><PhoneIcon name="open" size={18} /></span>Anmäl dig</div>
                </div>
              </div>
            </div>
          </AndroidSheet>
        </>
      }
    />
  );
}

const CAROUSEL = [
  { icon: "chat", title: "Basic", body: "Text upp till 160 tecken." },
  { icon: "image", title: "Single", body: "Bild, video, kort och knappar." },
  { icon: "sparkles", title: "Conversation", body: "Svar fram och tillbaka i 24 timmar." },
];

/** Carousel: a stack with Options on each card on iPhone, a horizontal row on Android. */
export function CarouselCompare() {
  const top = CAROUSEL[1]!;
  return (
    <Figure
      caption="En karusell med tre kort. Android visar korten i en rad som går att svepa åt sidan, med knapparna synliga. iPhone visar korten som en hög, ett i taget, och knapparna ligger under Alternativ på varje kort."
      ios={
        <div style={{ paddingBottom: 12 }}>
          <IosHead />
          <div className="istack">
            <span className="icount">2 av 3</span>
            <span className="iedge" style={{ left: 0 }} />
            <span className="iedge" style={{ right: 0 }} />
            <div className="icard">
              <div className="cimg" style={{ height: 110 }}><PhoneIcon name={top.icon} size={36} color="#0b57d0" /></div>
              <div className="ibody" style={{ paddingRight: 12 }}>
                <div className="it">{top.title}</div>
                <div className="id">{top.body}</div>
              </div>
              <IosOptions />
            </div>
          </div>
          <IosNote />
        </div>
      }
      android={
        <>
          <AndroidHead />
          <AndroidSheet>
            <div className="inrow" style={{ display: "flex", gap: 8, overflow: "hidden" }}>
              {CAROUSEL.map((item) => (
                <div key={item.title} className="card narrow" style={{ flex: "none" }}>
                  <div className="cimg"><PhoneIcon name={item.icon} size={36} color="#0b57d0" /></div>
                  <div className="ct">{item.title}</div>
                  <div className="cb">{item.body}</div>
                  <div className="cbtns">
                    <div className="cbtn"><span className="ci"><PhoneIcon name="open" size={18} /></span>Läs mer</div>
                  </div>
                </div>
              ))}
            </div>
          </AndroidSheet>
        </>
      }
    />
  );
}

/** A card with a primary button and three suggested actions. */
export function ButtonsCompare() {
  const actions = ["Lägg in i kalendern", "Påminn mig", "Fler tider"];
  return (
    <Figure
      caption="Ett kort med en knapp och tre föreslagna åtgärder. Android visar dem som rader i kortet, i den ordning avsändaren valt. iPhone visar knappen som en kapsel i kortet och åtgärderna i en egen bubbla under, och ordningen kan bli en annan."
      ios={
        <div style={{ paddingBottom: 4 }}>
          <IosHead />
          <div className="irow">
            <div className="icard">
              <div className="ibody">
                <div className="it">{WEBINAR.title}</div>
                <div className="id">Torsdag kl. 10.00, digitalt.</div>
                <span className="ichev">›</span>
              </div>
              <div className="ipillbtn">Anmäl dig<PhoneIcon name="open" size={16} color="#3c3c43" /></div>
            </div>
            <div className="iacts">{actions.map((label) => <div key={label}>{label}</div>)}</div>
          </div>
          <IosNote />
          <IosComposer />
        </div>
      }
      android={
        <>
          <AndroidHead />
          <AndroidSheet>
            <div className="inrow">
              <div className="card">
                <div className="ct">{WEBINAR.title}</div>
                <div className="cb">Torsdag kl. 10.00, digitalt.</div>
                <div className="cbtns">
                  <div className="cbtn"><span className="ci"><PhoneIcon name="open" size={18} /></span>Anmäl dig</div>
                  {actions.map((label) => <div key={label} className="cbtn">{label}</div>)}
                </div>
              </div>
            </div>
            <div style={{ height: 12 }} />
          </AndroidSheet>
          <AndroidComposer />
        </>
      }
    />
  );
}

/** A plain text message with actions: Options in the bubble on iPhone, chips on Android. */
export function TextActionsCompare() {
  const text = "Din tid är bokad torsdag kl. 14.00. Vill du boka om kan du ringa oss eller gå till webbplatsen.";
  const actions = [
    { icon: "call", label: "Ring oss" },
    { icon: "globe", label: "Webbplatsen" },
    { icon: "event", label: "Lägg in i kalendern" },
  ];
  return (
    <Figure
      caption="Ett vanligt textmeddelande med tre åtgärder. Android visar dem som förslag ovanför skrivfältet. iPhone samlar dem under Alternativ i bubblan, och först när kunden trycker där visas listan."
      ios={
        <div>
          <IosHead />
          <div className="irow">
            <div className="ibub">{text}<IosOptions /></div>
            <div className="imenu">
              {actions.map((action) => (
                <div key={action.label}><PhoneIcon name={action.icon} size={18} color="#000" />{action.label}</div>
              ))}
            </div>
          </div>
          <IosNote />
          <IosComposer />
        </div>
      }
      android={
        <>
          <AndroidHead />
          <AndroidSheet>
            <div className="inrow"><div className="bubble">{text}</div></div>
            <div className="ts tsin">13:12</div>
            <div className="chips" style={{ overflow: "hidden" }}>
              {actions.map((action) => (
                <div key={action.label} className="chip"><PhoneIcon name={action.icon} size={18} color="#0b57d0" />{action.label}</div>
              ))}
            </div>
          </AndroidSheet>
          <AndroidComposer />
        </>
      }
    />
  );
}

/** The comparisons for each section of the article, by section anchor. */
export const PLATFORM_FIGURES: Record<string, () => ReactNode> = {
  knappar: () => (
    <>
      <ButtonsCompare />
      <TextActionsCompare />
    </>
  ),
  bilder: () => (
    <>
      <CardCompare />
      <CarouselCompare />
    </>
  ),
  avsandaren: ProfileCompare,
};
