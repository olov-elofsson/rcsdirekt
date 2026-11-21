import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import symbolUrl from "../../brand/SVG/symbol.svg";
import { LeadForm } from "@/components/LeadForm";
import { Bubble, DateLabel, IncomingRow, OutgoingBubble, PhoneIcon, RcsPhone, Timestamp, Typing, VerifiedMark } from "@/components/RcsPhone";
import { Button } from "@/components/ui/button";
import { demoFeatures, replyContent, replyOptions, richCards, type DemoFeatureId, type ReplyOption } from "@/data/rcs-demo";
import { contentIcon } from "@/content/icons";
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
        "absolute z-20 grid size-[28px] place-items-center rounded-full bg-primary text-[14px] font-bold text-primary-foreground shadow-soft outline-none transition-transform duration-150 ease-out after:absolute after:-inset-3 after:content-[''] focus-visible:ring-2 focus-visible:ring-logo-blush focus-visible:ring-offset-2 active:scale-[0.96] min-[1000px]:hidden",
        active === id && "ring-2 ring-logo-blush ring-offset-2",
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
      style={{ position: "relative", borderRadius: 20, outline: active === id ? "2px solid var(--color-logo-blush)" : "2px solid transparent", outlineOffset: 4, transition: "outline-color 150ms ease-out", ...style }}
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
      <span className={cn("relative h-px w-16 shrink-0 origin-center bg-logo-blush transition-[width] duration-200 ease-out xl:w-24", active === id && "w-24 xl:w-32")}>
        <span className={cn("absolute top-1/2 size-2 -translate-y-1/2 rounded-full border-2 border-logo-blush bg-background", align === "left" ? "left-0" : "right-0")} />
      </span>
      <span className={cn("grid size-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground tabular-nums transition-transform duration-200 ease-out", active === id && "scale-110")}>{id}</span>
      <span className="min-w-0 max-w-[12rem] flex-1">
        <strong className="block text-sm leading-tight text-balance">{item.title}</strong>
        <span className="mt-1 block text-xs leading-snug text-pretty text-muted-foreground">{item.copy}</span>
      </span>
    </button>
  );
}

/** Rich card in the screen's own pixels, as in Google Messages. */
function RichCard({ title, copy, icon, actions, onAction }: { title: string; copy?: string; icon?: string; actions?: string[] | undefined; onAction?: (action: string) => void }) {
  const Icon = icon ? contentIcon(icon) : null;
  return (
    <div className="card" style={{ flex: "none" }}>
      {Icon ? (
        <div style={{ width: 262, height: 150, display: "grid", placeItems: "center", background: "#d3e3fd" }}>
          <Icon aria-hidden style={{ width: 48, height: 48, color: "#0b57d0", strokeWidth: 1.75 }} />
        </div>
      ) : null}
      <div className="ct">{title}</div>
      {copy ? <div className="cb">{copy}</div> : <div style={{ height: 9 }} />}
      {actions?.map((action) => (
        <button key={action} type="button" className="cbtn" style={{ width: "100%", background: "none", border: 0, borderTop: "1px solid #d4d9e1", cursor: "pointer", font: "inherit", fontWeight: 500 }} onClick={() => onAction?.(action)}>
          {action}
        </button>
      ))}
    </div>
  );
}

function DemoDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>("form input:not([tabindex='-1'])")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialog) return;
      // Keep keyboard focus inside the dialog while it is open.
      const focusable = [...dialog.querySelectorAll<HTMLElement>("button, input, textarea, a[href]")].filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-foreground/70 p-5 animate-fade-in" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="demo-dialog-title" aria-describedby="demo-dialog-description" className="relative w-full max-w-lg rounded-lg border border-border bg-background p-6 text-left shadow-lift animate-scale-in">
        <Button type="button" variant="ghost" size="icon" className="absolute right-3 top-3" onClick={onClose} aria-label="Stäng"><X /></Button>
        <h2 id="demo-dialog-title" className="pr-12 text-xl font-bold">Boka en demo</h2>
        <p id="demo-dialog-description" className="mt-2 text-sm text-muted-foreground">Fyll i dina uppgifter så återkommer vi med förslag på tider.</p>
        <div className="mt-6"><LeadForm mode="contact" defaultMessage="Jag vill boka en demo av RCS Direkt." compact /></div>
      </section>
    </div>
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
          <RcsPhone sender="RCS Direkt" logo={symbolUrl} messagesRef={messagesRef}>
            <FeatureTarget id={1} active={active} onActive={setActive} onOpen={setActive} style={{ margin: "6px 70px 4px", padding: "8px 0", textAlign: "center" }} markerClassName="-right-3 top-0">
              <img src={symbolUrl} alt="" style={{ width: 56, height: 56, borderRadius: 14, margin: "0 auto", display: "block", background: "#fff", border: "1px solid #e1e1e1", padding: 8 }} />
              <div style={{ marginTop: 8, fontSize: 16, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>RCS Direkt<VerifiedMark /></div>
              <div style={{ marginTop: 2, fontSize: 12.5, color: "#444746" }}>Verifierat företag</div>
            </FeatureTarget>
            <DateLabel>I dag</DateLabel>

            <FeatureTarget id={2} active={active} onActive={setActive} onOpen={setActive} style={{ marginLeft: "auto", width: "fit-content", maxWidth: 280, marginRight: 0 }} markerClassName="-left-4 -top-2">
              <OutgoingBubble status="Läst · 13:16">Hej! Vad är skillnaden mot ett vanligt sms?</OutgoingBubble>
            </FeatureTarget>

            <IncomingRow logo={symbolUrl}>
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
                  <button key={reply} type="button" className={cn("chip", selectedReply === reply && "pressed")} style={{ cursor: "pointer", font: "inherit", fontWeight: 500 }} onClick={() => chooseReply(reply)}>
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
            <Button type="button" variant="outline" size="icon" className="size-9" onClick={() => scrollCards(-1)} aria-label="Föregående kort"><ChevronLeft /></Button>
            <Button type="button" variant="outline" size="icon" className="size-9" onClick={() => scrollCards(1)} aria-label="Nästa kort"><ChevronRight /></Button>
          </div>

          {activeItem ? (
            <div role="status" className="fixed inset-x-4 bottom-4 z-[60] mx-auto flex max-w-sm items-start gap-3 rounded-2xl border border-border bg-background p-3.5 text-left shadow-lift animate-fade-in min-[1000px]:hidden">
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
