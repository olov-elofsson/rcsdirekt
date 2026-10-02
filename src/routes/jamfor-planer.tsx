import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { ContentBlock, DetailPage } from "@/components/SiteLayout";
import { pricingPlans } from "@/data/pricing-plans";

export const Route = createFileRoute("/jamfor-planer")({
  head: () => ({
    meta: [
      { title: "Vilken meddelandetyp behöver jag? · RCS Direkt" },
      { name: "description", content: "Jämför RCS Basic, RCS Single och RCS Conversation. Alla betalas per skickat meddelande, utan månadskostnad." },
      { property: "og:title", content: "Vilken meddelandetyp behöver jag? · RCS Direkt" },
      { property: "og:description", content: "Jämför de tre RCS-meddelandetyperna och hitta rätt nivå för era utskick." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/jamfor-planer" }],
  }),
  component: ComparePlansPage,
});

function ComparePlansPage() {
  return (
    <DetailPage
      title="Vilken behöver jag?"
      intro="Alla meddelandetyper betalas per skickat meddelande. Priset styrs av vad meddelandet kan innehålla. Välj den typ som passar era utskick."
      aside={
        <div className="rounded-[2rem] border border-border bg-primary-soft p-7 shadow-card sm:p-9">
          <h2 className="text-lg font-extrabold tracking-tight">Samma villkor för alla</h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
            {["Inga månadskostnader", "Inga startavgifter", "Inga bindningstider", "Betala per skickat meddelande"].map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      }
    >
      <ContentBlock title="De tre meddelandetyperna i korthet">
        <div className="grid gap-4 sm:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <Link
              key={plan.name}
              to={plan.slug}
              className={`group relative flex flex-col rounded-[1.75rem] border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift ${i === 1 ? "border-primary bg-primary text-primary-foreground shadow-card" : "border-border/80 bg-card shadow-soft hover:border-foreground/25"}`}
            >
              {i === 1 ? <span className="absolute -top-3 left-6 rounded-full bg-background px-3 py-1 text-[11px] font-bold text-foreground ring-1 ring-border">Populärast</span> : null}
              <p className="text-sm font-bold">{plan.name}</p>
              <p className="mt-5 text-[2rem] font-extrabold leading-none tracking-[-0.03em]">{plan.price}</p>
              <p className={`mt-1.5 text-xs ${i === 1 ? "opacity-75" : "text-muted-foreground"}`}>per meddelande</p>
            </Link>
          ))}
        </div>
      </ContentBlock>
      <ContentBlock title="Så tänker du">
        <div className="space-y-3">
          {[
            ["RCS Basic", "Korta, tydliga besked som bekräftelser och påminnelser."],
            ["RCS Single", "Kampanjer med bilder, karuseller och knappar."],
            ["RCS Conversation", "Kundservice och dialoger där mottagaren kan svara."],
          ].map(([name, text]) => (
            <div key={name} className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card px-5 py-4 shadow-soft">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft ring-1 ring-border/60"><Check className="size-4" /></span>
              <p className="text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">{name}</strong> — {text}</p>
            </div>
          ))}
        </div>
      </ContentBlock>
    </DetailPage>
  );
}
