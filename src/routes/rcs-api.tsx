import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Braces,
  CalendarClock,
  Check,
  GalleryHorizontal,
  MousePointerClick,
  Send,
  Tags,
  Webhook,
} from "lucide-react";

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
  const capabilities = [
    { icon: Braces, title: "Text", text: "Korta besked eller längre meddelanden med verifierad avsändare." },
    { icon: GalleryHorizontal, title: "Rika kort", text: "Bilder, video, rubriker och karuseller med flera val." },
    { icon: MousePointerClick, title: "Knappar", text: "Länka vidare, ring, öppna kartan eller låt kunden svara direkt." },
    { icon: Send, title: "Större utskick", text: "Skicka samma meddelande till många mottagare i ett samlat flöde." },
    { icon: Tags, title: "Personanpassning", text: "Använd kund- och orderdata för att göra varje meddelande relevant." },
    { icon: Webhook, title: "Webhooks", text: "Ta emot leveransstatus, läskvittenser, klick och svar i era system." },
  ];

  return (
    <DetailPage
      eyebrow="RCS API"
      title="Bygg in RCS i era egna system"
      intro="Integrera interaktiva RCS-meddelanden i era applikationer. Skicka text, bilder, karuseller och knappar genom ett enkelt REST API."
      aside={<div className="rounded-[2rem] border border-border bg-primary-soft p-7 shadow-card sm:p-9"><Braces className="size-7 text-primary" /><h2 className="mt-6 text-2xl font-extrabold">Bygg på ert sätt</h2><p className="mt-3 leading-relaxed text-muted-foreground">För företag som vill automatisera kommunikation från e-handel, bokningssystem, CRM eller egna applikationer.</p><div className="mt-7 flex flex-col gap-3"><Button asChild><a href="#kontakt">Få API-tillgång <ArrowRight /></a></Button><Button asChild variant="outline"><a href="#exempel">Se ett exempel</a></Button></div></div>}
    >
      <ContentBlock title="Format för varje meddelande">
        <p>Gå från enkla textmeddelanden till visuella och interaktiva upplevelser. Samma integration kan hantera både enskilda händelser och större kampanjer.</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {capabilities.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-muted p-5">
              <Icon className="size-5 text-primary" />
              <h3 className="mt-4 text-base font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </ContentBlock>
      <ContentBlock title="Automatisera kommunikationen"><p>Låt en order, bokning eller annan händelse starta rätt meddelande automatiskt. API:t passar både transaktionella flöden och större utskick till många mottagare.</p><div className="mt-6 flex items-center gap-3 text-sm font-semibold text-foreground"><Send className="size-5" />Enstaka meddelanden eller större volymer</div></ContentBlock>
      <ContentBlock title="Personligt och tidsstyrt"><p>Infoga kunduppgifter, orderinformation och andra egna fält i innehållet. Schemalägg utskick med rätt tidszon när meddelandet ska nå fram vid en bestämd tid.</p><div className="mt-6 flex items-center gap-3 text-sm font-semibold text-foreground"><CalendarClock className="size-5" />Personanpassning och schemaläggning</div></ContentBlock>
      <ContentBlock title="Svar och händelser tillbaka"><p>Webhooks skickar leveransstatus, läskvittenser, knapptryck och kundens svar tillbaka till ert system. Det gör det möjligt att fortsätta ett flöde utan manuella steg.</p><div className="mt-6 flex items-center gap-3 text-sm font-semibold text-foreground"><Webhook className="size-5" />Reagera på det som händer i realtid</div></ContentBlock>
      <ContentBlock title="En enkel struktur">
        <p>Ett RCS-meddelande skickas med ett vanligt HTTPS-anrop. Tre uppgifter räcker: mottagare, avsändare och själva meddelandet. Allt annat — knappar, bilder, karuseller — lägger du till först när du behöver det.</p>
        <div id="exempel" className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-ink-foreground/10 bg-ink">
            <p className="border-b border-ink-foreground/10 px-5 py-3 text-xs font-bold text-ink-muted">Begäran</p>
            <pre className="overflow-x-auto p-5 font-mono text-xs leading-6 text-ink-foreground sm:text-sm">{`POST /rcs/send
Authorization: Bearer DIN_API_NYCKEL
Content-Type: application/json

{
  "to": "+46700000000",
  "sender": "DittForetag",
  "text": "Din order är på väg",
  "suggestion": "Spåra leveransen"
}`}</pre>
          </div>
          <div className="overflow-hidden rounded-2xl border border-ink-foreground/10 bg-ink">
            <p className="border-b border-ink-foreground/10 px-5 py-3 text-xs font-bold text-ink-muted">Svar</p>
            <pre className="overflow-x-auto p-5 font-mono text-xs leading-6 text-ink-foreground sm:text-sm">{`200 OK

{
  "messageId": "msg_8f4a21",
  "status": "ACCEPTED",
  "to": "+46700000000"
}`}</pre>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Exemplet visar principen. Adresser och API-nycklar lämnas ut när API-tillgången aktiveras för ert konto.</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { title: "Tre fält räcker", text: "Mottagare, avsändare och meddelandet. Resten är valfritt." },
            { title: "Vanlig HTTP och JSON", text: "Fungerar från vilket programmeringsspråk eller ramverk som helst." },
            { title: "Svar direkt i JSON", text: "Besked om meddelandet är accepterat kommer i samma anrop." },
          ].map(({ title, text }) => (
            <div key={title} className="rounded-2xl bg-muted p-5">
              <Check className="size-5 text-primary" />
              <h3 className="mt-4 text-base font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </ContentBlock>
      <ContentBlock title="Testa innan ni går live"><p>En separat testmiljö gör det möjligt att validera innehåll och se en förhandsvisning innan något skickas. API-nycklar hanteras per konto och används för att skydda anropen.</p></ContentBlock>
      <div className="rounded-[2rem] bg-primary p-7 text-primary-foreground sm:p-9">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Redo att bygga med RCS?</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-ink-muted">Kontakta oss för API-tillgång och hjälp med att planera er första integration.</p>
        <div className="mt-6 flex flex-wrap gap-3"><Button asChild variant="outline"><a href="#kontakt">Kontakta oss <ArrowRight /></a></Button><Button asChild variant="outline"><Link to="/rcs-online">Se RCS online</Link></Button></div>
      </div>
    </DetailPage>
  );
}