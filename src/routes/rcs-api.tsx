import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Braces, MessageSquareReply, Workflow } from "lucide-react";

import { ContentBlock, DetailPage } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/rcs-api")({
  head: () => ({
    meta: [
      { title: "RCS API för era system — RCS Direkt" },
      { name: "description", content: "Integrera RCS i e-handel, bokningssystem, CRM och andra applikationer med REST API och webhooks." },
      { property: "og:title", content: "Bygg in RCS i era egna system — RCS Direkt" },
      { property: "og:description", content: "Automatisera rika RCS-meddelanden i realtid med API och webhooks." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/rcs-api" }],
  }),
  component: RcsApiPage,
});

function RcsApiPage() {
  return (
    <DetailPage
      eyebrow="RCS API"
      title="Bygg in RCS i era egna system"
      intro="Koppla RCS Direkts API till ert affärssystem, er app eller e-handel och skicka rika meddelanden automatiskt – i realtid och i stor skala."
      aside={<div className="rounded-[2rem] border border-border bg-primary-soft p-7 shadow-card sm:p-9"><Braces className="size-7 text-primary" /><h2 className="mt-6 text-2xl font-extrabold">Full kontroll via API</h2><p className="mt-3 leading-relaxed text-muted-foreground">Passar företag med egna system eller utvecklingsresurser som vill automatisera transaktionella flöden och större volymer.</p><div className="mt-7 flex flex-col gap-3"><Button asChild><a href="#kontakt">Kontakta oss <ArrowRight /></a></Button><Button asChild variant="outline"><a href="#kontakt">Prata med en utvecklare</a></Button></div></div>}
    >
      <ContentBlock title="Automatisera kommunikationen"><p>Med vårt API triggas meddelanden direkt från era befintliga system. Orderbekräftelser, leveransaviseringar, bokningspåminnelser och kontoaviseringar går iväg automatiskt när något händer – utan manuellt arbete.</p><div className="mt-6 flex items-center gap-3 text-sm font-semibold text-foreground"><Workflow className="size-5" />Händelsestyrda utskick i realtid</div></ContentBlock>
      <ContentBlock title="Full flexibilitet för utvecklare"><p>API:t är byggt för att vara enkelt att integrera. Ni skickar meddelanden med bilder, knappar och förslag på svar via vanliga anrop och får statusuppdateringar och svar från mottagarna tillbaka via webhooks.</p></ContentBlock>
      <ContentBlock title="Tvåvägskommunikation"><p>Låt kunderna svara, välja tid eller bekräfta direkt i meddelandet. Svaren landar i ert system så att ni kan agera på dem automatiskt – till exempel boka om en tid eller uppdatera en order.</p><div className="mt-6 flex items-center gap-3 text-sm font-semibold text-foreground"><MessageSquareReply className="size-5" />Svar och status tillbaka till ert system</div></ContentBlock>
      <Link to="/rcs-online" className="inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4">Vill ni skicka manuellt? Läs om RCS online <ArrowRight className="size-4" /></Link>
    </DetailPage>
  );
}