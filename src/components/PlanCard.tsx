import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import type { PricingPlan } from "@/content";
import { formatPrice, useCurrency } from "@/lib/money";
import { cn } from "@/lib/utils";

/**
 * One message type, kept short as Fortnox keeps its product cards: name, what it holds, the from
 * price and one action.
 */
export function PlanCard({ plan, size = "lg", className, style }: { plan: PricingPlan; size?: "md" | "lg"; uses?: boolean; className?: string; style?: CSSProperties }) {
  const featured = Boolean(plan.badge);
  const currency = useCurrency();
  const muted = featured ? "text-ink-muted" : "text-muted-foreground";
  return (
    <div data-reveal style={style} className={cn("flex flex-col rounded-2xl transition-[translate,box-shadow] duration-200 ease-out [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0", size === "lg" ? "p-7 sm:p-8" : "p-6", featured ? "bg-ink text-ink-foreground" : "bg-card shadow-card", className)}>
      <div className="flex items-center justify-between gap-3">
        <h3 className={cn("font-extrabold", size === "lg" ? "text-xl" : "text-lg")}>{plan.name}</h3>
        {plan.badge ? <span className="rounded-full bg-ink-foreground px-2.5 py-0.5 text-xs font-semibold text-ink">{plan.badge}</span> : null}
      </div>
      <p className={cn("mt-1.5 text-sm", muted)}>{plan.contents}</p>
      <p className="mt-8 flex flex-1 items-end gap-1.5">
        <span className={cn("pb-1 text-sm font-semibold", muted)}>från</span>
        <span className={cn("font-extrabold leading-none tabular-nums", size === "lg" ? "text-4xl" : "text-3xl")}>{formatPrice(plan.price, currency)}</span>
      </p>
      <p className={cn("mt-2 text-sm", muted)}>listpris per meddelande</p>
      {/* The plan follows into the sign-up form. */}
      <Button asChild size={size === "lg" ? "lg" : "default"} variant="outline" className={cn("mt-7 w-full", featured && "border-transparent")}>
        <Link to="/skapa-konto" search={{ plan: plan.name }}>Välj {plan.name.replace(/^RCS /, "")}</Link>
      </Button>
    </div>
  );
}
