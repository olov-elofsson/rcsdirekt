import { ArrowLeft, BadgeCheck, Check, ChevronRight, Image, MoreVertical, Plus, ShieldCheck, Smile } from "lucide-react";
import type { Campaign } from "@/data/rcs-content";
import { cn } from "@/lib/utils";

/**
 * Statisk RCS-telefonmockup som demonstrerar formatets möjligheter:
 * verifierad avsändare, media, snabbsvar och läs-kvitto.
 */
export function RcsPhone({ campaign, compact = false, className, eager = false, hero = false }: { campaign: Campaign; compact?: boolean; className?: string; eager?: boolean; hero?: boolean }) {
  const meta = campaign.meta ?? [];
  const scenarioDetail = !compact && campaign.theme === "fashion" ? <div className="mt-2 flex gap-1">{meta.map((item) => <span key={item} className="flex-1 border-t border-border pt-1 text-center text-[7px] font-semibold text-muted-foreground">{item}</span>)}</div>
    : !compact && campaign.theme === "auto" ? <div className="mt-2 flex items-center justify-between rounded-sm bg-primary-soft px-2 py-1.5 text-[8px] font-semibold text-primary"><span>{meta[0]}</span><span>{meta[1]}</span></div>
    : !compact && campaign.theme === "delivery" ? <div className="mt-2"><div className="flex gap-1">{meta.map((item, step) => <span key={item} className={cn("h-1 flex-1 rounded-full", step < 3 ? "bg-primary" : "bg-border")} />)}</div><div className="mt-1 flex justify-between text-[6px] text-muted-foreground">{meta.map((item) => <span key={item}>{item}</span>)}</div></div>
    : !compact && campaign.theme === "property" ? <div className="mt-2 grid grid-cols-3 border-y border-border py-1.5 text-center">{meta.map((item) => <span key={item} className="text-[8px] font-semibold">{item}</span>)}</div>
    : !compact && campaign.theme === "food" ? <div className="mt-2 flex items-baseline gap-1 rounded-sm bg-primary-soft px-2 py-1 text-primary"><span className="font-display text-xl font-bold">{meta[0]}</span><span className="text-[7px] font-bold">{meta[1]}</span></div>
    : !compact && campaign.theme === "event" ? <div className="mt-2 flex items-center justify-between border-y border-dashed border-border py-1.5">{meta.map((item) => <span key={item} className="text-[7px] font-bold">{item}</span>)}</div>
    : null;
  return (
    <div className={cn("relative mx-auto w-full", compact ? "max-w-[218px]" : "max-w-[286px]", hero && "hero-phone", className)}>
      <div className={cn("rounded-[2.15rem] border border-phone-edge bg-phone-edge p-2 shadow-lift", hero && "h-[558px]")}>
        <div className={cn("overflow-hidden rounded-[1.7rem] bg-phone-screen text-foreground", hero && "h-full")}>
          <div className="relative flex h-7 items-center justify-center bg-phone-screen">
            <div className="h-4 w-20 rounded-full bg-phone-edge" />
            <span className="absolute left-3 text-[8px] font-semibold">9:41</span>
          </div>
          <div key={hero ? campaign.brand : undefined} className={cn(hero && "hero-phone-content")}>
            <div className={cn("border-b border-border bg-card", compact ? "px-2.5 py-2" : "px-3 pb-3 pt-2")}>
              <div className="flex items-center justify-between">
                <ArrowLeft className="size-4 text-muted-foreground" />
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-primary" />
                  <MoreVertical className="size-4 text-muted-foreground" />
                </div>
              </div>
              <div className="mt-1 flex flex-col items-center">
                <div className="flex size-11 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground ring-4 ring-primary-soft">{campaign.brand.slice(0, 1)}</div>
                <p className="mt-2 flex items-center gap-1 text-[11px] font-bold">{campaign.brand}<BadgeCheck className="size-3.5 shrink-0 text-primary" /></p>
                <p className="mt-0.5 text-[7px] text-muted-foreground">Verifierad företagsprofil</p>
              </div>
            </div>
            <div className={cn("bg-phone-chat", compact ? "min-h-[300px] p-2" : hero ? "h-[391px] p-2.5" : "min-h-[390px] p-2.5")}>
              <p className="mb-2 text-center text-[7px] text-muted-foreground">Idag</p>
              <div className="overflow-hidden rounded-[1.25rem] bg-card shadow-soft ring-1 ring-border/60">
                <img src={campaign.image} alt="" width={1024} height={640} loading={eager ? "eager" : "lazy"} className={cn("w-full object-cover", compact ? "h-24" : "h-32")} />
                <div className={cn(compact ? "p-2.5" : "p-3.5")}>
                  <p className={cn("font-display font-bold leading-tight", compact ? "text-xs" : "text-sm")}>{campaign.messageTitle}</p>
                  <p className={cn("mt-1.5 leading-snug text-muted-foreground", compact ? "text-[9px]" : "text-[10px]")}>{campaign.messageBody}</p>
                  {scenarioDetail}
                  {campaign.detail ? <p className={cn("mt-2 font-semibold text-primary", compact ? "text-[8px]" : "text-[9px]")}>{campaign.detail}</p> : null}
                  <div className="mt-3 divide-y divide-border border-t border-border">
                    {campaign.actions.slice(0, compact ? 2 : 2).map((action) => (
                      <div key={action} className={cn("flex items-center justify-center gap-1 font-bold text-primary", compact ? "min-h-6 text-[7px]" : "min-h-7 text-[8px]")}>{action}<ChevronRight className="size-2.5" /></div>
                    ))}
                  </div>
                </div>
              </div>
              {!compact ? <div className="mt-2 flex justify-center gap-1.5"><span className="rounded-full border border-primary px-2.5 py-1 text-[7px] font-semibold text-primary">Visa biljett</span><span className="rounded-full border border-primary px-2.5 py-1 text-[7px] font-semibold text-primary">Hitta hit</span></div> : null}
              <div className="mt-2 flex items-center justify-end px-1 text-[7px] text-muted-foreground"><span className="flex items-center gap-1"><Check className="size-2.5 text-primary" /> Levererat</span></div>
            </div>
            <div className="flex items-center gap-1.5 border-t border-border bg-card p-2">
              <Smile className="size-4 shrink-0 text-muted-foreground" />
              <div className="flex-1 rounded-full bg-muted px-3 py-1.5 text-[8px] text-muted-foreground">RCS-meddelande</div>
              <Image className="size-4 shrink-0 text-muted-foreground" />
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Plus className="size-3" /></span>
            </div>
          </div>
          </div>
        </div>
    </div>
  );
}
