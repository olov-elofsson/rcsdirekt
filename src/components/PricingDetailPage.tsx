import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { DetailPage } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { pricingPlans, type PricingPlan } from "@/data/pricing-plans";

export function PricingDetailPage({ plan }: { plan: PricingPlan }) {
  return (
    <DetailPage
      title={plan.name}
      intro={plan.short}
      aside={<div className="rounded-[2rem] border border-border bg-card p-7 shadow-card sm:p-9">{plan.badge ? <span className="inline-flex h-6 items-center rounded-full bg-primary px-3 text-xs font-bold text-primary-foreground">{plan.badge}</span> : null}<p className={cn("text-sm font-bold", plan.badge && "mt-4")}>{plan.name}</p><p className="mt-5 text-4xl font-extrabold">{plan.price}</p><p className="mt-2 text-sm text-muted-foreground">per skickat meddelande</p><div className="mt-7 flex items-center gap-3 border-t border-border pt-6 text-sm font-bold"><span className="grid size-7 place-items-center rounded-full bg-primary-soft"><Check className="size-4" /></span>Inga månadskostnader</div><Button asChild className="mt-7 w-full"><a href="/skapa-konto">Skapa konto <ArrowRight /></a></Button></div>}
    >
      <div><h2 className="text-3xl font-extrabold sm:text-4xl">Skillnaden mellan meddelandetyperna</h2><p className="mt-4 text-lg leading-relaxed text-muted-foreground">Alla meddelandetyper betalas per skickat meddelande. Priset styrs av vad meddelandet kan innehålla.</p></div>
      <div className="border-t border-border pt-8"><p className="text-base leading-relaxed text-muted-foreground">{plan.copy}</p></div>
      <div className="border-t border-border pt-8"><p className="text-sm font-bold">Jämför med de andra meddelandetyperna</p><div className="mt-5 grid gap-3 sm:grid-cols-2">{pricingPlans.filter((item) => item.slug !== plan.slug).map((item) => <Link key={item.slug} to={item.slug} className="group border-b border-border py-4"><span className="flex items-center justify-between gap-4 font-bold">{item.name}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span><span className="mt-1 block text-sm text-muted-foreground">{item.price} per meddelande</span></Link>)}</div></div>
    </DetailPage>
  );
}