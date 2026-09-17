import { BadgeCheck, Check, ChevronRight, MapPin } from "lucide-react";
import type { Campaign } from "@/data/rcs-content";
import { cn } from "@/lib/utils";

/**
 * Statisk RCS-telefonmockup som demonstrerar formatets möjligheter:
 * verifierad avsändare, media, snabbsvar och läs-kvitto.
 */
export function RcsPhone({ campaign, compact = false, className, eager = false }: { campaign: Campaign; compact?: boolean; className?: string; eager?: boolean }) {
  return (
    <div className={cn("relative mx-auto w-full", compact ? "max-w-[218px]" : "max-w-[286px]", className)}>
      <div className="rounded-[2rem] border border-phone-edge bg-phone-edge p-2 shadow-lift">
        <div className="overflow-hidden rounded-[1.55rem] bg-phone-screen text-foreground">
          <div className="relative flex h-7 items-center justify-center bg-phone-screen">
            <div className="h-4 w-20 rounded-full bg-phone-edge" />
            <span className="absolute left-3 text-[8px] font-semibold">9:41</span>
          </div>
          <div className={cn("flex items-center gap-2 border-b border-border bg-card", compact ? "px-2.5 py-2" : "px-3 py-2.5")}>
            <div className="flex size-7 items-center justify-center rounded-full bg-primary font-display text-[9px] font-bold text-primary-foreground">
              {campaign.brand.slice(0, 1)}
            </div>
            <div className="min-w-0">
              <p className="flex items-center gap-1 text-[10px] font-bold">
                {campaign.brand}
                <BadgeCheck className="size-3 shrink-0 text-primary" />
              </p>
              <p className="text-[7px] text-muted-foreground">Verifierad avsändare</p>
            </div>
          </div>
          <div className={cn("bg-phone-chat", compact ? "min-h-[300px] p-2" : "min-h-[390px] p-2.5")}>
            <div className="overflow-hidden rounded-lg bg-card shadow-soft">
              <img src={campaign.image} alt="" width={1024} height={640} loading={eager ? "eager" : "lazy"} className={cn("w-full object-cover", compact ? "h-24" : "h-40")} />
              <div className={cn(compact ? "p-2.5" : "p-3.5")}>
                <p className={cn("font-display font-bold leading-tight", compact ? "text-xs" : "text-base")}>{campaign.messageTitle}</p>
                <p className={cn("mt-1.5 leading-snug text-muted-foreground", compact ? "text-[9px]" : "text-[11px]")}>{campaign.messageBody}</p>
                {campaign.detail ? <p className={cn("mt-2 font-semibold text-primary", compact ? "text-[8px]" : "text-[10px]")}>{campaign.detail}</p> : null}
                {campaign.theme === "delivery" ? (
                  <div className="mt-3 flex items-center gap-1">
                    {[0, 1, 2, 3].map((step) => <span key={step} className={cn("h-1.5 flex-1 rounded-full", step < 3 ? "bg-primary" : "bg-border")} />)}
                  </div>
                ) : null}
                <div className="mt-3 grid gap-1.5">
                  {campaign.actions.slice(0, compact ? 2 : 3).map((action, index) => (
                    <div key={action} className={cn("flex items-center justify-center gap-1 rounded-sm border px-2 font-bold uppercase", compact ? "min-h-6 text-[7px]" : "min-h-8 text-[9px]", index === 0 ? "border-primary bg-primary text-primary-foreground" : "border-primary text-primary")}>{action}{index === 0 ? <ChevronRight className="size-2.5" /> : null}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between px-1 text-[8px] text-muted-foreground">
              <span className="flex items-center gap-1"><Check className="size-2.5 text-primary" /> Levererat</span>
              <MapPin className="size-3" />
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-border bg-card p-2">
            <div className="flex-1 rounded-full bg-muted px-3 py-1.5 text-[8px] text-muted-foreground">Skriv ett meddelande…</div>
            <div className="size-5 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
