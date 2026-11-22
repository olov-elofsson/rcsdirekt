import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import type { CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import type { PricingPlan } from "@/content";
import { formatPrice, useCurrency } from "@/lib/money";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

/**
 * What each message type gives, step by step: each type has everything the one before has. Matches
 * the plans' descriptions in the CMS; a plan with an unknown slug shows its description instead.
 */
const INCLUDES: Record<string, { lead?: string; items: string[] }> = {
  basic: { items: ["Verifierad avsändare med ert namn och er logga", "Text upp till 160 tecken", "Leveransrapporter"] },
  single: { lead: "Allt i Basic, plus", items: ["Bilder, video och GIF", "Kort, karuseller och knappar", "Text över 160 tecken"] },
  conversation: { lead: "Allt i Single, plus", items: ["Kunden kan svara i tråden", "Fram och tillbaka, vanligtvis inom 24 timmar"] },
};

/** "Till exempel a, b och c." (or "For example a, b and c.") ending the description, as a list of uses. */
function usesOf(text: string): string[] {
  const match = /(?:Till exempel|For example) (.+?)\.?$/.exec(text.trim());
  return match?.[1] ? match[1].split(/, | och | and /).map((use) => use.trim()).filter(Boolean) : [];
}

/** One message type: name, from price, what is included, what it suits and a way to start. */
/** `uses={false}` leaves out "Passar för", where the card should stay short (the start page). */
export function PlanCard({ plan, size = "lg", uses: showUses = true, className, style }: { plan: PricingPlan; size?: "md" | "lg"; uses?: boolean; className?: string; style?: CSSProperties }) {
  const featured = Boolean(plan.badge);
  const currency = useCurrency();
  const { t, lp, locale } = useT();
  const includes = INCLUDES[plan.slug];
  const uses = showUses ? usesOf(plan.short ?? "") : [];
  const muted = featured ? "text-ink-muted" : "text-muted-foreground";
  return (
    <div data-reveal style={style} className={cn("flex flex-col rounded-2xl transition-[translate,box-shadow] duration-200 ease-out [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0", size === "lg" ? "p-7 sm:p-8" : "p-6", featured ? "bg-ink text-ink-foreground" : "bg-card shadow-card", className)}>
      <div className="flex items-center justify-between gap-3">
        <h3 className={cn("font-extrabold", size === "lg" ? "text-xl" : "text-lg")}>{plan.name}</h3>
        {plan.badge ? <span className="rounded-full bg-ink-foreground px-2.5 py-0.5 text-xs font-semibold text-ink">{plan.badge}</span> : null}
      </div>
      <p className={cn("mt-1.5 text-sm", muted)}>{plan.contents}</p>
      <p className="mt-6 flex items-baseline gap-1.5">
        <span className={cn("text-sm font-semibold", muted)}>{t("från")}</span>
        <span className={cn("font-extrabold tabular-nums", size === "lg" ? "text-4xl" : "text-3xl")}>{formatPrice(plan.price, currency, { locale: locale === "en" ? "en-GB" : "sv-SE" })}</span>
      </p>
      <p className={cn("mt-1 text-sm", muted)}>{t("listpris per meddelande")}</p>

      <div className={cn("mt-6 flex-1 border-t pt-6", featured ? "border-ink-foreground/15" : "border-border")}>
        {includes ? (
          <>
            <p className="text-sm font-semibold">{t(includes.lead ?? "Ingår")}</p>
            <ul className="mt-3 space-y-2.5">
              {includes.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-snug">
                  <span aria-hidden className={cn("mt-px grid size-[18px] shrink-0 place-items-center rounded-full", featured ? "bg-ink-foreground text-ink" : "bg-primary-soft text-logo-blue")}>
                    <Check strokeWidth={3} className="size-3" />
                  </span>
                  {t(item)}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className={cn("text-sm leading-relaxed text-pretty", muted)}>{plan.short}</p>
        )}
        {uses.length ? (
          <div className="mt-6">
            <p className={cn("text-xs font-semibold", muted)}>{t("Passar för")}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {uses.map((use) => (
                <li key={use} className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", featured ? "bg-ink-foreground/10" : "bg-muted")}>
                  {use.charAt(0).toUpperCase() + use.slice(1)}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {/* One filled action, on the lifted plan; the plan follows into the sign-up form. */}
      <Button asChild size={size === "lg" ? "lg" : "default"} variant="outline" className={cn("mt-8 w-full", featured && "border-transparent")}>
        <Link to={lp("/skapa-konto")} search={{ plan: plan.name }}>{t("Välj")} {plan.name.replace(/^RCS /, "")}</Link>
      </Button>
    </div>
  );
}
