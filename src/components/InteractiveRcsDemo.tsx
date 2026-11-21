import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import senderLogo from "../../brand/SVG/rcs-avsandare.svg";
import { FormDialog } from "@/components/FormDialog";
import { LeadForm } from "@/components/LeadForm";
import { Bubble, DateLabel, IncomingRow, OutgoingBubble, PhoneIcon, RcsPhone, ThreadIntro, Timestamp, Typing } from "@/components/RcsPhone";
import { Button } from "@/components/ui/button";
import { demoFeatures, replyContent, replyOptions, richCards, type DemoFeatureId, type ReplyOption } from "@/data/rcs-demo";
import { cn } from "@/lib/utils";

const desktop = () => window.matchMedia("(min-width: 1000px) and (hover: hover)").matches;

/** Numbered marker on the phone (mobile). Small to look at, 52 px to tap (about 45 px once scaled). */
function FeatureMarker({ id, active, onOpen, className }: { id: DemoFeatureId; active: DemoFeatureId | null; onOpen: (id: DemoFeatureId) => void; className?: string | undefined }) {
  return (
    <button
      type="button"
      aria-label={`Förklaring ${id}: ${demoFeatures.find((feature) => feature.id === id)?.title ?? ""}`}
      aria-expanded={active === id}
      onClick={(event) => { event.stopPropagation(); onOpen(id); }}
      className={cn(
        "absolute z-20 grid size-[28px] place-items-center rounded-full bg-primary text-[14px] font-bold text-primary-foreground shadow-soft outline-none transition-transform duration-150 ease-out after:absolute after:-inset-3 after:content-[''] focus-visible:ring-2 focus-visible:ring-logo-blue focus-visible:ring-offset-2 active:scale-[0.96] min-[1000px]:hidden",
        active === id && "ring-2 ring-logo-blue ring-offset-2",
        className ?? "-right-2 -top-2",
      )}
    >
      {id}
    </button>
  );
}

/** Highlights a part of the screen while its explanation is active. Not focusable itself: the marker (mobile) and the annotation (desktop) are the controls. */
function FeatureTarget({ id, active, onActive, onOpen, children, markerClassName, style }: { id: DemoFeatureId; active: DemoFeatureId | null; onActive: (id: DemoFeatureId | null) => void; onOpen: (id: DemoFeatureId) => void; children: ReactNode; markerClassName?: string | undefined; style?: React.CSSProperties }) {
  return (
    <div
      onMouseEnter={() => { if (desktop()) onActive(id); }}
      onMouseLeave={() => { if (desktop()) onActive(null); }}
      style={{ position: "relative", borderRadius: 20, outline: active === id ? "2px solid var(--color-logo-blue)" : "2px solid transparent", outlineOffset: 4, transition: "outline-color 150ms ease-out", ...style }}
    >
      <FeatureMarker id={id} active={active} onOpen={onOpen} className={markerClassName} />
      {children}
    </div>
  );
}

function Annotation({ id, active, onActive, align }: { id: DemoFeatureId; active: DemoFeatureId | null; onActive: (id: DemoFeatureId | null) => void; align: "left" | "right" }) {
  const item = demoFeatures.find((feature) => feature.id === id);
  if (!item) return null;
  return (
    <button
      type="button"
      aria-pressed={active === id}
      onMouseEnter={() => onActive(id)}
      onMouseLeave={() => onActive(null)}
      onFocus={() => onActive(id)}
      onBlur={() => onActive(null)}
      className={cn("group hidden w-full items-center gap-3 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 min-[1000px]:flex", align === "left" && "flex-row-reverse text-right")}
    >
      <span className="relative h-2 w-24 shrink-0 xl:w-32">
        <span className={cn("absolute inset-x-0 top-1/2 h-px bg-logo-blue transition-transform duration-200 ease-out motion-reduce:transition-none", align === "left" ? "origin-left" : "origin-right", active === id ? "scale-x-100" : "scale-x-[0.67]")} />
        <span className={cn("absolute top-1/2 size-2 -translate-y-1/2 rounded-full border-2 border-logo-blue bg-background", align === "left" ? "left-0" : "right-0")} />
      </span>
      <span className={cn("grid size-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground tabular-nums transition-transform duration-200 ease-out", active === id && "scale-110")}>{id}</span>
      <span className="min-w-0 max-w-[12rem] flex-1">
        <strong className="block text-sm leading-tight text-balance">{item.title}</strong>
        <span className="mt-1 block text-xs leading-snug text-pretty text-muted-foreground">{item.copy}</span>
      </span>
    </button>
  );
}

/** CMS icon names mapped to the phone's Material icons (see engine.ts), never lucide inside the screen. */
const PHONE_ICONS: Record<string, string> = {
  "trending-up": "trendingUp",
  "bar-chart": "barChart",
  wallet: "wallet",
  globe: "globe",
  code: "code",
  image: "image",
  layers: "layers",
  pointer: "touch",
  message: "chat",
  shield: "shield",
  check: "check",
  sparkles: "sparkles",
};
const phoneIconName = (name: string) => PHONE_ICONS[name] ?? "sparkles";

/** Rich card in the screen's own pixels, as in Google Messages. */
function RichCard({ title, copy, icon, actions, onAction }: { title: string; copy?: string; icon?: string; actions?: string[] | undefined; onAction?: (action: string) => void }) {
  return (
    <div className="card" style={{ flex: "none" }}>
      {icon ? (
        <div className="cimg">
          <PhoneIcon name={phoneIconName(icon)} size={48} color="#0b57d0" />
        </div>
      ) : null}
      <div className="ct">{title}</div>
      {copy ? <div className="cb">{copy}</div> : <div className="cgap" />}
      {actions?.map((action) => (
        <button key={action} type="button" className="cbtn" onClick={() => onAction?.(action)}>
          {action}
        </button>
      ))}
    </div>
  );
}

function DemoDialog({ onClose }: { onClose: () => void }) {
  return (
    <FormDialog title="Boka en demo" description={<p>Fyll i dina uppgifter så återkommer vi med förslag på tider.</p>} onClose={onClose}>
      <LeadForm mode="contact" defaultMessage="Jag vill boka en demo av RCS Direkt." compact />
    </FormDialog>
  );
}

export function InteractiveRcsDemo() {
  const [active, setActive] = useState<DemoFeatureId | null>(null);
  const [selectedReply, setSelectedReply] = useState<ReplyOption | null>(null);
  const [typing, setTyping] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const scrollChat = () => requestAnimationFrame(() => messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" }));
  const chooseReply = (reply: ReplyOption) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setSelectedReply(reply);
    setTyping(true);
    scrollChat();
    timerRef.current = setTimeout(() => { setTyping(false); scrollChat(); }, 1200);
  };
  const onAction = (action: string) => {
    if (action === "Boka en demo") setDialogOpen(true);
    else if (action === "Besök rcsdirekt.se") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const closeDialog = useCallback(() => setDialogOpen(false), []);
  const scrollCards = (direction: number) => carouselRef.current?.scrollBy({ left: direction * 267, behavior: "smooth" });
  const answer = selectedReply ? replyContent[selectedReply] : null;
  const activeItem = active ? demoFeatures.find((feature) => feature.id === active) : undefined;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="relative mb-12">
        <h2 className="text-center text-[2.1rem] font-extrabold leading-tight tracking-normal sm:text-[2.65rem]">Så ser RCS ut i mobilen</h2>
        <p className="mx-auto mt-5 max-w-[60ch] text-center text-base leading-relaxed text-pretty text-muted-foreground">Tryck på siffrorna och se vad mottagaren möter: verifierad avsändare, bilder, knappar och snabbsvar.</p>
      </div>
      <div className="relative grid items-center gap-x-6 min-[1000px]:grid-cols-[minmax(210px,1fr)_auto_minmax(210px,1fr)]">
        <div className="hidden min-[1000px]:flex min-[1000px]:h-[560px] min-[1000px]:flex-col min-[1000px]:justify-around">
          <Annotation id={1} align="left" active={active} onActive={setActive} />
          <Annotation id={3} align="left" active={active} onActive={setActive} />
          <Annotation id={5} align="left" active={active} onActive={setActive} />
        </div>

        <div className="relative mx-auto w-full max-w-[332px] min-[1000px]:w-[322px]">
          <RcsPhone sender="RCS Direkt" logo={senderLogo} messagesRef={messagesRef}>
            <FeatureTarget id={1} active={active} onActive={setActive} onOpen={setActive} style={{ borderRadius: 0 }} markerClassName="right-8 top-1">
              <ThreadIntro logo={senderLogo} sender="RCS Direkt" description="Skicka RCS direkt från webben eller via API." />
            </FeatureTarget>
            <DateLabel>I dag</DateLabel>

            <FeatureTarget id={2} active={active} onActive={setActive} onOpen={setActive} style={{ marginLeft: "auto", width: "fit-content", maxWidth: 280, marginRight: 0 }} markerClassName="-left-4 -top-2">
              <OutgoingBubble status="Läst · 13:16">Hej! Vad är skillnaden mot ett vanligt sms?</OutgoingBubble>
            </FeatureTarget>

            <IncomingRow logo={senderLogo}>
              <Bubble>RCS hamnar direkt i kundens vanliga meddelandeapp, med bilder, flera produkter att svepa mellan och knappar för att köpa, boka eller svara. Ingen app att ladda ner.</Bubble>
            </IncomingRow>
            <Timestamp>13:16</Timestamp>

            <FeatureTarget id={3} active={active} onActive={setActive} onOpen={setActive} style={{ borderRadius: 0, marginBottom: 11 }} markerClassName="right-3 -top-3">
              <div ref={carouselRef} className="scrollbar-none" style={{ display: "flex", gap: 5, overflowX: "auto", scrollSnapType: "x mandatory", padding: "0 13px 0 47px", scrollPaddingLeft: 47 }}>
                {richCards.map((card) => (
                  <div key={card.title} style={{ scrollSnapAlign: "start" }}>
                    <RichCard title={card.title} copy={card.copy} icon={card.icon} actions={["Läs mer"]} onAction={onAction} />
                  </div>
                ))}
              </div>
            </FeatureTarget>

            <FeatureTarget id={4} active={active} onActive={setActive} onOpen={setActive} style={{ marginLeft: 47, width: "fit-content", marginBottom: 11 }} markerClassName="-right-3 -top-3">
              <RichCard title="Vill du se hur det kan fungera för ert företag?" actions={["Boka en demo", "Ring oss", "Besök rcsdirekt.se"]} onAction={onAction} />
            </FeatureTarget>

            <FeatureTarget id={5} active={active} onActive={setActive} onOpen={setActive} style={{ marginLeft: 47, width: "fit-content", marginBottom: 11 }} markerClassName="-right-8 -top-2">
              <Typing />
            </FeatureTarget>

            <FeatureTarget id={6} active={active} onActive={setActive} onOpen={setActive} style={{ marginBottom: 4 }} markerClassName="right-2 -top-4">
              <div className="chips scrollbar-none" style={{ overflowX: "auto", paddingRight: 13, marginBottom: 0 }}>
                {replyOptions.map((reply) => (
                  <button key={reply} type="button" aria-pressed={selectedReply === reply} className={cn("chip", selectedReply === reply && "pressed")} onClick={() => chooseReply(reply)}>
                    <PhoneIcon name="chat" size={16} color="#0b57d0" />
                    {reply}
                  </button>
                ))}
              </div>
            </FeatureTarget>

            {selectedReply ? <div style={{ marginTop: 10 }}><OutgoingBubble status="Läst · 13:17">{selectedReply}</OutgoingBubble></div> : null}
            {typing ? <div style={{ paddingLeft: 47 }}><Typing /></div> : null}
            {answer && !typing ? (
              <div style={{ paddingLeft: 47 }} className="animate-fade-in">
                <RichCard title={answer.title} copy={answer.copy} actions={answer.actions} onAction={onAction} />
              </div>
            ) : null}
          </RcsPhone>

          <div className="mt-4 hidden justify-center gap-2 min-[1000px]:flex">
            <Button type="button" variant="outline" size="icon" onClick={() => scrollCards(-1)} aria-label="Föregående kort"><ChevronLeft /></Button>
            <Button type="button" variant="outline" size="icon" onClick={() => scrollCards(1)} aria-label="Nästa kort"><ChevronRight /></Button>
          </div>

          {activeItem ? (
            <div role="status" className="fixed inset-x-4 bottom-4 z-[60] mx-auto flex max-w-sm items-start gap-3 rounded-[26px] bg-background p-3.5 text-left shadow-lift animate-fade-in min-[1000px]:hidden">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground tabular-nums">{activeItem.id}</span>
              <span className="min-w-0 flex-1">
                <strong className="block text-sm">{activeItem.title}</strong>
                <span className="mt-1 block text-[13px] leading-snug text-pretty text-muted-foreground">{activeItem.copy}</span>
              </span>
              <Button type="button" variant="ghost" size="icon" aria-label="Stäng förklaringen" onClick={() => setActive(null)} className="-m-1.5 shrink-0"><X className="size-4" /></Button>
            </div>
          ) : null}
        </div>

        <div className="hidden min-[1000px]:flex min-[1000px]:h-[560px] min-[1000px]:flex-col min-[1000px]:justify-around">
          <Annotation id={2} align="right" active={active} onActive={setActive} />
          <Annotation id={4} align="right" active={active} onActive={setActive} />
          <Annotation id={6} align="right" active={active} onActive={setActive} />
        </div>
      </div>

      {dialogOpen ? <DemoDialog onClose={closeDialog} /> : null}
    </div>
  );
}
