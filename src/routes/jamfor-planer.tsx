import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { ContentBlock, DetailPage } from "@/components/SiteLayout";
import { pricingPlans } from "@/data/pricing-plans";

export const Route = createFileRoute("/jamfor-planer")({
  head: () => ({
    meta: [
      { title: "Vilken plan behöver jag? — RCS Direkt" },
      { name: "description", content: "Jämför RCS Basic, RCS Single och RCS Conversation — alla betalas per skickat meddelande, utan månadskostnad." },
      { property: "og:title", content: "Vilken plan behöver jag? — RCS Direkt" },
      { property: "og:description", content: "Jämför de tre RCS-planerna och hitta rätt nivå för era utskick." },
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
      eyebrow="Jämför planerna"
      title="Vilken behöver jag?"
      intro="Alla planer betalas per skickat meddelande. Priset styrs av vad meddelandet kan innehålla — välj den nivå som passar era utskick."
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
      <ContentBlock title="De tre planerna i korthet">
        <div className="grid gap-5 sm:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Link
              key={plan.name}
              to={plan.slug}
              className="group flex flex-col rounded-[2rem] border border-border/80 bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-foreground/25 hover:shadow-lift"
            >
              <p className="text-sm font-bold">{plan.name}</p>
              <p className="mt-4 text-[2.2rem] font-extrabold leading-none tracking-[-0.03em]">{plan.price}</p>
              <p className="mt-1.5 text-xs text-muted-foreground">per meddelande</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{plan.short}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold">
                Läs mer <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </ContentBlock>
      <ContentBlock title="Så tänker du">
        <ul className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <li><strong className="text-foreground">RCS Basic</strong> — korta, tydliga besked som bekräftelser och påminnelser, där budskapet är det viktiga.</li>
          <li><strong className="text-foreground">RCS Single</strong> — kampanjer och erbjudanden där bilder, karuseller och knappar ska fånga uppmärksamheten.</li>
          <li><strong className="text-foreground">RCS Conversation</strong> — kundservice och dialoger där mottagaren ska kunna svara och få hjälp direkt i meddelandeappen.</li>
        </ul>
      </ContentBlock>
    </DetailPage>
  );
}
