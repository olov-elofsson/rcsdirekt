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

/** The "Options" row iPhone attaches to a message for its secondary actions. */
function Options({ label = "Alternativ" }: { label?: string }) {
  return (
    <div className="opts">
      {label}
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24">
        <path fill="#007aff" d="M12 15.4 5.3 8.7l1.4-1.4 5.3 5.3 5.3-5.3 1.4 1.4z" />
      </svg>
    </div>
  );
}

function IosComposer() {
  return (
    <div className="icomp">
      <div className="iplus" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#8a8a8e" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6z" /></svg>
      </div>
      <div className="ipill">Textmeddelande • RCS</div>
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

/** Sender profile: iPhone shows no banner. */
export function ProfileCompare() {
  return (
    <Figure
      caption="Avsändarens profil. På iPhone visas inte bannerbilden, medan Google Meddelanden visar banner, logotyp och alla kontaktuppgifter."
      ios={
        <div className="iprof">
          <img className="logo" src={logo} alt="" />
          <div className="name">{sender}</div>
          <div className="desc">{description}</div>
          <div className="acts">
            <div className="act"><PhoneIcon name="chat" size={20} color="#007aff" />meddelande</div>
            <div className="act"><PhoneIcon name="globe" size={20} color="#007aff" />webb</div>
          </div>
          <div className="rows">
            {rcsDirektSender.profile.contacts.map((contact) => (
              <div key={contact.href} className="r">
                <div className="l">{contact.label}</div>
                <div className="v">{contact.value}</div>
              </div>
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

/** Rich card: iPhone has one fixed image height and cuts long text. */
export function CardCompare() {
  return (
    <Figure
      caption="Ett kort med hög bild och lång text. Android visar bilden i den höjd avsändaren valt och hela texten. iPhone har en fast bildhöjd och kortar texten, och liggande kort kan visas fel."
      ios={
        <div className="sheet">
          <div className="inrow">
            <div className="card">
              <div className="cimg"><PhoneIcon name="school" size={40} color="#0b57d0" /></div>
              <div className="ct">{WEBINAR.title}</div>
              <div className="cb">{WEBINAR.body}</div>
            </div>
          </div>
        </div>
      }
      android={
        <div className="sheet">
          <div className="inrow">
            <div className="card">
              <div className="cimg" style={{ height: 220 }}><PhoneIcon name="school" size={48} color="#0b57d0" /></div>
              <div className="ct">{WEBINAR.title}</div>
              <div className="cb">{WEBINAR.body}</div>
            </div>
          </div>
        </div>
      }
    />
  );
}

const CAROUSEL = [
  { icon: "chat", title: "Basic", body: "Text upp till 160 tecken." },
  { icon: "image", title: "Single", body: "Bild, video, kort och knappar." },
  { icon: "sparkles", title: "Conversation", body: "Svar fram och tillbaka i 24 timmar." },
];

/** Carousel: a stack with an Options row per card on iPhone, a horizontal row on Android. */
export function CarouselCompare() {
  return (
    <Figure
      caption="En karusell med tre kort. Android visar korten i en rad som går att svepa åt sidan, med knapparna synliga. iPhone visar korten staplade, och knapparna ligger under Alternativ på varje kort."
      ios={
        <div className="sheet">
          <div className="inrow stack">
            {CAROUSEL.slice(0, 2).map((item) => (
              <div key={item.title}>
                <div className="card">
                  <div className="cimg" style={{ height: 90 }}><PhoneIcon name={item.icon} size={32} color="#0b57d0" /></div>
                  <div className="ct">{item.title}</div>
                  <div className="cb">{item.body}</div>
                </div>
                <Options />
              </div>
            ))}
          </div>
        </div>
      }
      android={
        <div className="sheet">
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
        </div>
      }
    />
  );
}

/** Buttons and suggested replies: rows and chips on Android, Options on iPhone. */
export function ButtonsCompare() {
  return (
    <Figure
      caption="Ett kort med tre knappar och tre förslag på svar. På Android ligger knapparna som rader i kortet och förslagen ovanför skrivfältet, där de försvinner när kunden har svarat. På iPhone visas den första knappen i kortet, och resten av knapparna och förslagen samlas under Alternativ, där de ligger kvar."
      ios={
        <>
          <div className="sheet" style={{ paddingBottom: 4 }}>
            <div className="inrow">
              <div className="card">
                <div className="ct">{WEBINAR.title}</div>
                <div className="cb">Torsdag kl. 10.00, digitalt.</div>
                <div className="ibtn">Anmäl dig</div>
              </div>
              <Options />
            </div>
          </div>
          <IosComposer />
        </>
      }
      android={
        <>
          <div className="sheet" style={{ paddingBottom: 4 }}>
            <div className="inrow">
              <div className="card">
                <div className="ct">{WEBINAR.title}</div>
                <div className="cb">Torsdag kl. 10.00, digitalt.</div>
                <div className="cbtns">
                  <div className="cbtn"><span className="ci"><PhoneIcon name="open" size={18} /></span>Anmäl dig</div>
                  <div className="cbtn"><span className="ci"><PhoneIcon name="event" size={18} /></span>Lägg in i kalendern</div>
                  <div className="cbtn">Påminn mig</div>
                </div>
              </div>
            </div>
            <div className="chips" style={{ marginTop: 12, marginBottom: 4 }}>
              <div className="chip">Ja tack</div>
              <div className="chip">Kanske</div>
              <div className="chip">Nej tack</div>
            </div>
          </div>
          <AndroidComposer />
        </>
      }
    />
  );
}

/** The comparisons for each section of the article, by section anchor. */
export const PLATFORM_FIGURES: Record<string, () => ReactNode> = {
  knappar: ButtonsCompare,
  bilder: () => (
    <>
      <CardCompare />
      <CarouselCompare />
    </>
  ),
  avsandaren: ProfileCompare,
};
