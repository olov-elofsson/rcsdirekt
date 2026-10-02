import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { ContentBlock, DetailPage } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/rcs-api")({
  head: () => ({
    meta: [
      { title: "RCS API för era system — RCS Direkt" },
      { name: "description", content: "Integrera RCS i era egna system med ett enkelt REST API. Tre fält räcker för ett RCS-meddelande." },
      { property: "og:title", content: "Bygg in RCS i era egna system — RCS Direkt" },
      { property: "og:description", content: "Skicka rika RCS-meddelanden med ett enkelt REST API och webhooks." },
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
      title="Ett enkelt API för RCS"
      intro="Skicka rika RCS-meddelanden från era egna system. Ett vanligt HTTPS-anrop räcker — mottagare, avsändare och meddelandet."
      aside={
        <div className="rounded-[2rem] border border-border bg-primary-soft p-7 shadow-card sm:p-9">
          <h2 className="text-2xl font-extrabold">Så enkelt är det</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">Ett anrop, tre fält och ett svar i JSON. Allt annat lägger du till när du behöver det.</p>
          <div className="mt-7 flex flex-col gap-3">
            <Button asChild>
              <a href="#exempel">Se ett exempel <ArrowRight /></a>
            </Button>
            <Button asChild variant="outline">
              <a href="#kontakt">Få API-tillgång <ArrowRight /></a>
            </Button>
          </div>
        </div>
      }
    >
      <ContentBlock title="En enkel struktur">
        <p>Ett RCS-meddelande skickas med ett vanligt HTTPS-anrop. Tre uppgifter räcker: mottagare, avsändare och själva meddelandet. Allt annat — knappar, bilder, karuseller — lägger du till först när du behöver det.</p>
        <div id="exempel" className="mt-8 grid gap-4">
          <div className="overflow-hidden rounded-3xl border border-ink-foreground/10 bg-ink shadow-card">
            <div className="flex items-center gap-3 border-b border-ink-foreground/10 px-5 py-3 sm:px-6">
              <span className="rounded-md bg-ink-foreground/10 px-2.5 py-1 text-[11px] font-bold tracking-wide text-ink-foreground">POST</span>
              <span className="font-mono text-xs text-ink-muted sm:text-sm">/rcs/send</span>
              <span className="ml-auto hidden text-[11px] text-ink-muted sm:inline">Begäran</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-xs leading-6 text-ink-foreground sm:p-6 sm:text-sm">
              <span className="font-bold">POST</span>{" "}<span className="text-ink-muted">/rcs/send</span>{"\n"}
              <span className="text-ink-muted">Authorization:</span> Bearer DIN_API_NYCKEL{"\n"}
              <span className="text-ink-muted">Content-Type:</span> application/json{"\n\n"}
              {"{\n"}
              {"  "}<span className="text-ink-muted">"to"</span>: "+46700000000",{"\n"}
              {"  "}<span className="text-ink-muted">"sender"</span>: "DittForetag",{"\n"}
              {"  "}<span className="text-ink-muted">"text"</span>: "Din order är på väg",{"\n"}
              {"  "}<span className="text-ink-muted">"suggestion"</span>: "Spåra leveransen"{"\n"}
              {"}"}
            </pre>
          </div>
          <div className="overflow-hidden rounded-3xl border border-ink-foreground/10 bg-ink shadow-card">
            <div className="flex items-center gap-3 border-b border-ink-foreground/10 px-5 py-3 sm:px-6">
              <span className="rounded-md bg-ink-foreground/10 px-2.5 py-1 text-[11px] font-bold tracking-wide text-ink-foreground">200</span>
              <span className="font-mono text-xs text-ink-muted sm:text-sm">OK</span>
              <span className="ml-auto hidden text-[11px] text-ink-muted sm:inline">Svar</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-xs leading-6 text-ink-foreground sm:p-6 sm:text-sm">
              {"{\n"}
              {"  "}<span className="text-ink-muted">"messageId"</span>: "msg_8f4a21",{"\n"}
              {"  "}<span className="text-ink-muted">"status"</span>: "ACCEPTED",{"\n"}
              {"  "}<span className="text-ink-muted">"to"</span>: "+46700000000"{"\n"}
              {"}"}
            </pre>
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
      <div className="rounded-[2rem] bg-primary p-7 text-primary-foreground sm:p-9">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Redo att bygga med RCS?</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-ink-muted">Kontakta oss för API-tillgång och hjälp med att planera er första integration.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <a href="#kontakt">Kontakta oss <ArrowRight /></a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/rcs-online">Se RCS online</Link>
          </Button>
        </div>
      </div>
    </DetailPage>
  );
}
