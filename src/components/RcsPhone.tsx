import { BadgeCheck, CheckCheck, Sparkles } from "lucide-react";

/**
 * Statisk RCS-telefonmockup som demonstrerar formatets möjligheter:
 * verifierad avsändare, media, snabbsvar och läs-kvitto.
 */
export function RcsPhone() {
  return (
    <div className="animate-float relative mx-auto w-full max-w-[320px]">
      <div className="rounded-[2rem] border border-ink-foreground/15 bg-ink-foreground/8 p-2.5 shadow-lift">
        <div className="overflow-hidden rounded-[1.55rem] bg-ink text-ink-foreground">
          {/* Notch + status */}
          <div className="flex items-center justify-center pt-2.5">
            <div className="h-5 w-24 rounded-full bg-ink-foreground/10" />
          </div>

          {/* Chatt-header med verifierad avsändare */}
          <div className="mt-2 flex items-center gap-3 border-b border-ink-foreground/10 bg-ink-foreground/5 px-4 py-3">
            <div className="flex size-9 items-center justify-center rounded-sm bg-gold font-display text-sm font-bold text-ink">
              RD
            </div>
            <div className="min-w-0">
              <p className="flex items-center gap-1 text-sm font-semibold">
                RCS Direkt
                <BadgeCheck className="size-4 shrink-0 text-gold" />
              </p>
              <p className="text-xs text-ink-muted">Företagskonto</p>
            </div>
          </div>

          {/* Meddelanden */}
          <div className="flex min-h-[340px] flex-col gap-2.5 px-3 py-4">
            <p className="text-center text-[10px] uppercase tracking-wider text-ink-muted">
              Idag 14:02
            </p>

            {/* Media + text-bubbla */}
            <div className="animate-bubble-in max-w-[85%] self-start overflow-hidden rounded-xl rounded-bl-sm bg-ink-foreground/8">
              <div className="relative flex h-28 items-center justify-center bg-primary/35">
                <Sparkles className="size-8 text-gold" />
                <span className="absolute bottom-1.5 right-2 rounded-sm bg-ink/70 px-2 py-0.5 text-[9px] font-medium">
                  Kampanj
                </span>
              </div>
              <div className="px-3.5 pb-2 pt-2.5">
                <p className="text-[13px] leading-snug">
                  Hej Sara! Vårens nyheter har landat – som nyhetsbrevs-
                  medlem får du 20 % hela helgen.
                </p>
              </div>
            </div>

            {/* Snabbsvar */}
            <div className="animate-bubble-in-2 flex flex-wrap gap-2 self-end">
               <span className="rounded-md border border-gold/60 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold text-gold">
                Se produkten
              </span>
               <span className="rounded-md border border-ink-foreground/15 bg-ink-foreground/8 px-3.5 py-1.5 text-xs font-medium">
                Spåra order
              </span>
            </div>

            {/* Läskvitto */}
             <div className="animate-bubble-in-3 flex items-center gap-1 self-end text-[10px] text-gold">
              Läst 14:03
              <CheckCheck className="size-3.5" />
            </div>

            {/* Skriv-indikator */}
            <div className="mt-auto flex items-center gap-1.5 self-start rounded-xl rounded-bl-sm bg-ink-foreground/8 px-3.5 py-2.5">
              <span className="animate-pulse-dot size-1.5 rounded-full bg-ink-muted" />
              <span className="animate-pulse-dot size-1.5 rounded-full bg-ink-muted [animation-delay:0.2s]" />
              <span className="animate-pulse-dot size-1.5 rounded-full bg-ink-muted [animation-delay:0.4s]" />
            </div>
          </div>

          {/* Inmatningsfält */}
          <div className="flex items-center gap-2 border-t border-ink-foreground/10 px-4 py-3">
            <div className="flex-1 rounded-md bg-ink-foreground/8 px-3.5 py-2 text-xs text-ink-muted">
              Skriv ett svar…
            </div>
            <div className="flex size-8 items-center justify-center rounded-md bg-gold">
              <span className="text-sm text-ink">↑</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
