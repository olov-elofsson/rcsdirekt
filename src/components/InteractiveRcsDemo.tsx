import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Eye,
  Image as ImageIcon,
  Layers3,
  Menu,
  MessageSquare,
  Mic,
  MousePointerClick,
  ShieldCheck,
  X,
} from "lucide-react";

import symbolUrl from "@/assets/rcsdirekt-symbol.svg";
import { Button } from "@/components/ui/button";
import { demoFeatures, replyContent, replyOptions, richCards, type DemoFeatureId, type ReplyOption } from "@/data/rcs-demo";
import { cn } from "@/lib/utils";

const cardIcons = { image: ImageIcon, layers: Layers3, pointer: MousePointerClick, message: MessageSquare };

function FeatureMarker({ id }: { id: DemoFeatureId }) {
  return <span aria-hidden className="absolute -right-2 -top-2 z-20 grid size-6 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-soft min-[1000px]:hidden">{id}</span>;
}

function FeatureTarget({ id, active, onActive, children, className }: { id: DemoFeatureId; active: DemoFeatureId | null; onActive: (id: DemoFeatureId | null) => void; children: React.ReactNode; className?: string }) {
  return <div tabIndex={0} onMouseEnter={() => onActive(id)} onMouseLeave={() => onActive(null)} onFocus={() => onActive(id)} onBlur={() => onActive(null)} className={cn("relative rounded-2xl outline-none transition-[box-shadow,transform] duration-300", active === id && "z-10 ring-2 ring-logo-blush ring-offset-2 ring-offset-phone-chat shadow-lift", className)}><FeatureMarker id={id} />{children}</div>;
}

function Annotation({ id, active, onActive, align }: { id: DemoFeatureId; active: DemoFeatureId | null; onActive: (id: DemoFeatureId | null) => void; align: "left" | "right" }) {
  const item = demoFeatures.find((feature) => feature.id === id);
  if (!item) return null;
  return <button type="button" onMouseEnter={() => onActive(id)} onMouseLeave={() => onActive(null)} onFocus={() => onActive(id)} onBlur={() => onActive(null)} className={cn("group hidden w-full items-center gap-3 text-left min-[1000px]:flex", align === "left" && "flex-row-reverse text-right")}>
    <span className={cn("relative h-px w-16 shrink-0 bg-logo-blush transition-all duration-300 xl:w-24", active === id && "w-24 xl:w-32")}><span className={cn("absolute top-1/2 size-2 -translate-y-1/2 rounded-full border-2 border-logo-blush bg-background", align === "left" ? "left-0" : "right-0")} /></span>
    <span className={cn("grid size-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground transition-transform", active === id && "scale-110")}>{id}</span>
    <span className="max-w-[12rem]"><strong className="block text-sm leading-tight">{item.title}</strong><span className="mt-1 block text-xs leading-snug text-muted-foreground">{item.copy}</span></span>
  </button>;
}

export function InteractiveRcsDemo() {
  const [active, setActive] = useState<DemoFeatureId | null>(null);
  const [showNotes, setShowNotes] = useState(true);
  const [selectedReply, setSelectedReply] = useState<ReplyOption | null>(null);
  const [typing, setTyping] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);
  useEffect(() => {
    if (!dialogOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setDialogOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [dialogOpen]);

  const scrollChat = () => requestAnimationFrame(() => chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" }));
  const chooseReply = (reply: ReplyOption) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setSelectedReply(reply);
    setTyping(true);
    scrollChat();
    timerRef.current = setTimeout(() => { setTyping(false); scrollChat(); }, 1200);
  };
  const playDemo = () => {
    if (playing) return;
    setPlaying(true);
    setSelectedReply(null);
    setTyping(false);
    const sequence: DemoFeatureId[] = [1, 2, 3, 4, 5, 6];
    sequence.forEach((id, index) => window.setTimeout(() => setActive(id), index * 650));
    window.setTimeout(() => { setActive(null); setPlaying(false); chooseReply("Visa ett exempel"); }, sequence.length * 650);
  };
  const scrollCards = (direction: number) => carouselRef.current?.scrollBy({ left: direction * 236, behavior: "smooth" });
  const answer = selectedReply ? replyContent[selectedReply] : null;

  return <div className="mx-auto w-full max-w-6xl">
    <div className="mb-8 flex flex-wrap items-center justify-center gap-3 min-[1000px]:justify-end">
      <Button type="button" variant="outline" size="sm" onClick={() => setShowNotes((value) => !value)}><Eye />{showNotes ? "Dölj förklaringar" : "Visa förklaringar"}</Button>
      <Button type="button" size="sm" onClick={playDemo} disabled={playing}><CirclePlay />{playing ? "Spelar upp" : "Spela upp demo"}</Button>
    </div>

    <div className={cn("grid items-center gap-x-4", showNotes ? "min-[1000px]:grid-cols-[minmax(210px,1fr)_440px_minmax(210px,1fr)]" : "min-[1000px]:grid-cols-[440px] min-[1000px]:justify-center")}>
      {showNotes ? <div className="hidden min-[1000px]:flex min-[1000px]:h-[820px] min-[1000px]:flex-col min-[1000px]:justify-around"><Annotation id={1} align="left" active={active} onActive={setActive} /><Annotation id={3} align="left" active={active} onActive={setActive} /><Annotation id={5} align="left" active={active} onActive={setActive} /></div> : null}

      <div className="relative mx-auto w-[min(440px,calc(100vw-40px))] min-w-0 rounded-[3.25rem] border-[10px] border-phone-edge bg-phone-edge p-1.5 shadow-lift">
        <div className="overflow-hidden rounded-[2.5rem] bg-phone-screen">
          <div className="relative flex h-9 items-center justify-center px-5 text-[10px] font-bold"><span className="absolute left-5">09:41</span><span className="h-4 w-24 rounded-full bg-phone-edge" /></div>
          <div className="flex h-11 items-center gap-3 border-b border-border bg-card px-4"><ArrowLeft className="size-4 text-muted-foreground" /><img src={symbolUrl} alt="" className="size-7 object-contain" /><strong className="min-w-0 flex-1 text-xs">RCS Direkt</strong><ShieldCheck className="size-4 text-logo-blush" /><Menu className="size-4 text-muted-foreground" /></div>
          <div ref={chatRef} className="scrollbar-none h-[690px] overflow-y-auto scroll-smooth bg-phone-chat px-3 pb-4 pt-3">
            <FeatureTarget id={1} active={active} onActive={setActive} className="mx-auto mb-4 w-fit px-8 py-1 text-center">
              <div className="relative mx-auto grid size-16 place-items-center rounded-full bg-card shadow-soft ring-1 ring-border"><img src={symbolUrl} alt="RCS Direkt" className="size-9 object-contain" /><BadgeCheck className="absolute -bottom-0.5 -right-0.5 size-5 fill-primary-foreground text-logo-blush" /></div>
              <p className="mt-2 text-xs font-bold">RCS Direkt</p><p className="text-[9px] text-muted-foreground">Nästa generations meddelanden</p>
            </FeatureTarget>
            <p className="mb-3 text-center text-[9px] text-muted-foreground">I dag</p>
            <FeatureTarget id={2} active={active} onActive={setActive} className="ml-auto w-[78%]">
              <div className="rounded-2xl rounded-br-md bg-primary-soft p-3 text-left text-[11px] leading-relaxed">Hej! Vad är skillnaden mot ett vanligt SMS?</div><p className="mt-1 pr-1 text-right text-[8px] text-muted-foreground">✓✓ Läst · 09:41</p>
            </FeatureTarget>
            <div className="mt-3 w-[88%] rounded-2xl rounded-bl-md bg-card p-3 text-left text-[11px] leading-relaxed shadow-soft">Mer än ett SMS. Mindre krångel än en app. Här är det viktigaste:</div>

            <FeatureTarget id={3} active={active} onActive={setActive} className="mt-3 min-w-0 rounded-none">
              <div className="mb-2 hidden justify-end gap-1 min-[1000px]:flex"><Button type="button" variant="outline" size="icon" className="size-7" onClick={() => scrollCards(-1)} aria-label="Föregående kort"><ChevronLeft /></Button><Button type="button" variant="outline" size="icon" className="size-7" onClick={() => scrollCards(1)} aria-label="Nästa kort"><ChevronRight /></Button></div>
              <div ref={carouselRef} className="scrollbar-none flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2">
                {richCards.map((card, index) => { const Icon = cardIcons[card.icon]; return <article key={card.title} className="w-[220px] shrink-0 snap-center overflow-hidden rounded-2xl bg-card text-left shadow-soft ring-1 ring-border/60"><div className={cn("grid h-24 place-items-center", index % 2 === 0 ? "bg-primary-soft" : "bg-muted")}><Icon className="size-8 text-logo-blush" /></div><div className="p-3"><h3 className="text-xs font-bold tracking-normal">{card.title}</h3><p className="mt-1 text-[9px] leading-relaxed text-muted-foreground">{card.copy}</p><span className="mt-2 flex items-center text-[9px] font-bold text-logo-blush">Läs mer <ChevronRight className="size-3" /></span></div></article>; })}
              </div>
            </FeatureTarget>

            <FeatureTarget id={4} active={active} onActive={setActive} className="mt-3 w-[90%]">
              <div className="overflow-hidden rounded-2xl rounded-bl-md bg-card text-left shadow-soft"><p className="p-3 text-[11px] font-semibold leading-relaxed">Vill du se hur det kan fungera för ert företag?</p><div className="divide-y divide-border border-t border-border">{["Boka en demo", "Ring oss", "Besök rcsdirekt.se"].map((action) => action === "Besök rcsdirekt.se" ? <a key={action} href="https://rcsdirekt.se" target="_blank" rel="noreferrer" className="flex h-8 items-center justify-center text-[9px] font-bold text-logo-blush">{action}</a> : <button key={action} type="button" onClick={() => action === "Boka en demo" && setDialogOpen(true)} className="flex h-8 w-full cursor-pointer items-center justify-center text-[9px] font-bold text-logo-blush hover:bg-primary-soft">{action}</button>)}</div></div>
            </FeatureTarget>

            <FeatureTarget id={5} active={active} onActive={setActive} className="mt-3 w-fit"><div className="flex gap-1 rounded-2xl rounded-bl-md bg-card px-4 py-3 shadow-soft"><span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" /><span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:120ms]" /><span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:240ms]" /></div></FeatureTarget>

            <FeatureTarget id={6} active={active} onActive={setActive} className="mt-3 ml-auto w-fit max-w-full"><div className="flex flex-wrap justify-end gap-1.5">{replyOptions.map((reply) => <Button key={reply} type="button" variant="outline" size="sm" className="h-7 border-logo-blush px-3 text-[9px] text-logo-blush" onClick={() => chooseReply(reply)}>{reply}</Button>)}</div></FeatureTarget>

            {selectedReply ? <div className="mt-3 ml-auto w-[78%] animate-fade-in rounded-2xl rounded-br-md bg-primary-soft p-3 text-left text-[11px]">{selectedReply}<p className="mt-1 text-right text-[8px] text-muted-foreground">✓✓ Läst · 09:42</p></div> : null}
            {typing ? <div className="mt-3 flex w-fit gap-1 rounded-2xl rounded-bl-md bg-card px-4 py-3 shadow-soft"><span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" /><span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:120ms]" /><span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:240ms]" /></div> : null}
            {answer && !typing ? <div className="mt-3 w-[90%] animate-fade-in overflow-hidden rounded-2xl rounded-bl-md bg-card text-left shadow-soft"><div className="p-3"><p className="text-[11px] font-bold">{answer.title}</p><p className="mt-1 text-[9px] leading-relaxed text-muted-foreground">{answer.copy}</p></div>{answer.actions ? <div className="divide-y divide-border border-t border-border">{answer.actions.map((action) => <button type="button" key={action} onClick={() => action === "Boka en demo" && setDialogOpen(true)} className="flex h-8 w-full cursor-pointer items-center justify-center text-[9px] font-bold text-logo-blush hover:bg-primary-soft">{action}</button>)}</div> : null}</div> : null}
          </div>
          <div className="flex h-14 items-center gap-2 border-t border-border bg-card px-3"><div className="flex h-9 flex-1 items-center rounded-full bg-muted px-4 text-[10px] text-muted-foreground">RCS-meddelande</div><span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"><Mic className="size-4" /></span></div>
        </div>
      </div>

      {showNotes ? <div className="hidden min-[1000px]:flex min-[1000px]:h-[820px] min-[1000px]:flex-col min-[1000px]:justify-around"><Annotation id={2} align="right" active={active} onActive={setActive} /><Annotation id={4} align="right" active={active} onActive={setActive} /><Annotation id={6} align="right" active={active} onActive={setActive} /></div> : null}
    </div>

    {showNotes ? <div className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-2 min-[1000px]:hidden">{demoFeatures.map((item) => <button type="button" key={item.id} onFocus={() => setActive(item.id)} onBlur={() => setActive(null)} onMouseEnter={() => setActive(item.id)} onMouseLeave={() => setActive(null)} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-left shadow-soft"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{item.id}</span><span><strong className="block text-sm">{item.title}</strong><span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{item.copy}</span></span></button>)}</div> : null}

    {dialogOpen ? <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/70 px-5" onMouseDown={(event) => { if (event.target === event.currentTarget) setDialogOpen(false); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="demo-dialog-title" aria-describedby="demo-dialog-description" className="relative w-full max-w-lg rounded-lg border border-border bg-background p-6 text-left shadow-lift animate-scale-in">
        <Button type="button" variant="ghost" size="icon" className="absolute right-3 top-3" onClick={() => setDialogOpen(false)} aria-label="Stäng"><X /></Button>
        <h2 id="demo-dialog-title" className="pr-10 text-xl font-bold">Boka en demo</h2>
        <p id="demo-dialog-description" className="mt-2 text-sm text-muted-foreground">Fyll i dina uppgifter så återkommer vi.</p>
        <form className="mt-6 grid gap-4" onSubmit={(event) => { event.preventDefault(); setDialogOpen(false); }}><label className="grid gap-1 text-sm font-semibold">Namn<input autoFocus required className="h-11 rounded-md border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring" /></label><label className="grid gap-1 text-sm font-semibold">Företag<input required className="h-11 rounded-md border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring" /></label><label className="grid gap-1 text-sm font-semibold">E-post<input required type="email" className="h-11 rounded-md border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring" /></label><Button type="submit" className="mt-1 w-full">Skicka</Button></form>
      </section>
    </div> : null}
  </div>;
}