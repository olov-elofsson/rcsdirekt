import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, LayoutTemplate, MousePointerClick } from "lucide-react";

import { ContentBlock, DetailPage } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/rcs-online")({
  head: () => ({
    meta: [
      { title: "Skicka RCS online — RCS Direkt" },
      { name: "description", content: "Skapa, förhandsgranska och skicka RCS-meddelanden direkt från webben utan installation eller kod." },
      { property: "og:title", content: "Skicka RCS direkt från webben — RCS Direkt" },
      { property: "og:description", content: "Skapa kampanjer med bilder, knappar och verifierad avsändare direkt i webbläsaren." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/rcs-online" }],
  }),
  component: RcsOnlinePage,
});

function RcsOnlinePage() {
  return (
    <DetailPage
      eyebrow="RCS online"
      title="Skicka RCS-meddelanden direkt från webben"
      intro="Ingen installation, ingen kod. Logga in, skapa ditt meddelande och nå dina kunder med bilder, knappar och verifierad avsändare – på några minuter."
      aside={<div className="rounded-[2rem] border border-border bg-primary-soft p-7 shadow-card sm:p-9"><LayoutTemplate className="size-7 text-primary" /><h2 className="mt-6 text-2xl font-extrabold">Skapa och skicka själv</h2><p className="mt-3 leading-relaxed text-muted-foreground">Passar kampanjer, erbjudanden, påminnelser och nyhetsutskick när teamet vill arbeta utan hjälp från utvecklare.</p><div className="mt-7 flex flex-col gap-3"><Button asChild><a href="#kontakt">Kom igång <ArrowRight /></a></Button><Button asChild variant="outline"><a href="#kontakt">Boka en demo</a></Button></div></div>}
    >
      <ContentBlock title="Enkelt att komma igång"><p>Med RCS Direkts webbgränssnitt skapar och skickar du RCS-utskick lika enkelt som ett vanligt meddelande. Du laddar upp din mottagarlista, väljer en mall eller bygger ett eget meddelande och trycker på skicka. Allt sker i webbläsaren, så du kan arbeta från vilken dator som helst.</p></ContentBlock>
      <ContentBlock title="Rikt innehåll utan krångel"><p>Lägg till bilder, karuseller, knappar och snabbsvar med några klick. Du ser en förhandsvisning av hur meddelandet kommer att se ut i mottagarens telefon innan det går iväg.</p><div className="mt-6 flex items-center gap-3 text-sm font-semibold text-foreground"><MousePointerClick className="size-5" />Bygg visuellt och förhandsgranska direkt</div></ContentBlock>
      <ContentBlock title="Följ resultaten"><p>Se hur många som har fått, läst och klickat i dina meddelanden. Statistiken hjälper dig att förstå vad som fungerar och förbättra nästa utskick.</p><div className="mt-6 flex items-center gap-3 text-sm font-semibold text-foreground"><BarChart3 className="size-5" />Leverans, läsningar och klick på ett ställe</div></ContentBlock>
      <Link to="/rcs-api" className="inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4">Behöver ni automatisera? Läs om RCS API <ArrowRight className="size-4" /></Link>
    </DetailPage>
  );
}