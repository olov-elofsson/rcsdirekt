import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

import { ContentBlock, DetailPage } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/rcs-api")({
  head: () => ({
    meta: [
      { title: "RCS API: skicka RCS från era egna system" },
      { name: "description", content: "Skicka RCS från era egna system med ett enkelt REST API. Tre fält räcker, JSON-svar och webhooks. Från 0,49 SEK per meddelande." },
      { property: "og:title", content: "RCS API: skicka RCS från era egna system" },
      { property: "og:description", content: "Skicka RCS från era egna system med ett enkelt REST API. Tre fält räcker, JSON-svar och webhooks. Från 0,49 SEK per meddelande." },
      { property: "og:type", content: "website" }, { property: "og:url", content: "https://rcsdirekt.se/rcs-api" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/rcs-api" }],
  }),
  component: RcsApiPage,
});

const examples = [
  {
    label: "Text",
    code: `{
  "to": "+46700000000",
  "sender": "DittForetag",
  "text": "Hej! Din order har just skickats."
}`,
  },
  {
    label: "Rikt kort",
    code: `{
  "to": "+46700000000",
  "sender": "DittForetag",
  "card": {
    "title": "Din order är på väg",
    "text": "Paketet levereras i morgon.",
    "image": "https://exempel.se/bild.jpg",
    "buttons": ["Spåra leveransen", "Kontakta oss"]
  }
}`,
  },
  {
    label: "Karusell",
    code: `{
  "to": "+46700000000",
  "sender": "DittForetag",
  "carousel": [
    { "title": "Sommarjacka", "image": "https://exempel.se/1.jpg", "button": "Se mer" },
    { "title": "Regnbyxa", "image": "https://exempel.se/2.jpg", "button": "Se mer" }
  ]
}`,
  },
  {
    label: "Knappar",
    code: `{
  "to": "+46700000000",
  "sender": "DittForetag",
  "text": "Kommer du till bokningen på fredag?",
  "suggestions": ["Bekräfta", "Flytta tiden", "Avboka"]
}`,
  },
  {
    label: "Schemalagt",
    code: `{
  "to": "+46700000000",
  "sender": "DittForetag",
  "text": "Glad fredag! Handla 20 % billigare i helgen.",
  "sendAt": "2026-10-03T09:00:00+02:00"
}`,
  },
];

function JsonBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto p-5 font-mono text-xs leading-6 text-ink-foreground sm:p-6 sm:text-sm">
      {code.split("\n").map((line, i) => {
        const match = line.match(/^(\s*)"([^"]+)":(.*)$/);
        return (
          <div key={i}>
            {match ? (
              <>
                {match[1]}
                <span className="text-ink-muted">"{match[2]}"</span>:{match[3]}
              </>
            ) : (
              line
            )}
          </div>
        );
      })}
    </pre>
  );
}

function RcsApiPage() {
  const [active, setActive] = useState(0);

  return (
    <DetailPage
      title="Ett enkelt API för RCS"
      intro="Skicka rika RCS-meddelanden från era egna system. Ett vanligt HTTPS-anrop räcker: mottagare, avsändare och meddelandet."
      aside={
        <div className="rounded-lg border border-border bg-primary-soft p-7 shadow-card sm:p-9">
          <h3 className="text-2xl font-extrabold leading-tight">Så enkelt är det</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">Ett anrop, tre fält och ett svar i JSON. Allt annat lägger du till när du behöver det.</p>
          <div className="mt-7 flex flex-col gap-3">
            <Button asChild>
              <a href="#exempel">Se exemplen <ArrowRight /></a>
            </Button>
            <Button asChild variant="outline">
              <a href="/kontakt">Få API-tillgång <ArrowRight /></a>
            </Button>
          </div>
        </div>
      }
    >
      <ContentBlock title="En enkel struktur">
        <p>Ett RCS-meddelande skickas med ett vanligt HTTPS-anrop. Tre uppgifter räcker: mottagare, avsändare och själva meddelandet. Allt annat, som knappar, bilder och karuseller, lägger du till först när du behöver det.</p>
        <div id="exempel" className="mt-8">
          <div className="flex flex-wrap gap-2">
            {examples.map((ex, i) => (
              <Button
                type="button"
                variant={i === active ? "default" : "outline"}
                aria-pressed={i === active}
                key={ex.label}
                onClick={() => setActive(i)}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm font-bold transition-colors",
                  i === active
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
              >
                {ex.label}
              </Button>
            ))}
          </div>
          <div className="mt-4 overflow-hidden rounded-lg border border-ink-foreground/10 bg-ink shadow-card">
            <div className="flex items-center gap-3 border-b border-ink-foreground/10 px-5 py-3 sm:px-6">
              <span className="rounded-md bg-ink-foreground/10 px-2.5 py-1 text-[11px] font-bold tracking-wide text-ink-foreground">POST</span>
              <span className="font-mono text-xs text-ink-muted sm:text-sm">/rcs/send</span>
              <span className="ml-auto hidden text-[11px] text-ink-muted sm:inline">Begäran</span>
            </div>
            <JsonBlock code={examples[active]?.code ?? ""} />
          </div>
          <div className="mt-4 overflow-hidden rounded-lg border border-ink-foreground/10 bg-ink shadow-card">
            <div className="flex items-center gap-3 border-b border-ink-foreground/10 px-5 py-3 sm:px-6">
              <span className="rounded-md bg-ink-foreground/10 px-2.5 py-1 text-[11px] font-bold tracking-wide text-ink-foreground">200</span>
              <span className="font-mono text-xs text-ink-muted sm:text-sm">OK</span>
              <span className="ml-auto hidden text-[11px] text-ink-muted sm:inline">Svar</span>
            </div>
            <JsonBlock code={'{\n  "messageId": "msg_8f4a21",\n  "status": "ACCEPTED",\n  "to": "+46700000000"\n}'} />
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Exemplen visar principen. Adresser och API-nycklar lämnas ut när API-tillgången aktiveras för ert konto.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            { title: "Tre fält räcker", text: "Mottagare, avsändare och meddelandet. Resten är valfritt." },
            { title: "Vanlig HTTP och JSON", text: "Fungerar från vilket programmeringsspråk eller ramverk som helst." },
            { title: "Svar direkt i JSON", text: "Besked om meddelandet är accepterat kommer i samma anrop." },
          ].map(({ title, text }) => (
            <div key={title} className="rounded-lg bg-muted p-5">
              <Check className="size-5 text-primary" />
              <h3 className="mt-4 text-base font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </ContentBlock>
      <div className="rounded-lg bg-primary p-7 text-primary-foreground sm:p-9">
        <h2 className="text-2xl font-extrabold leading-tight tracking-normal sm:text-3xl">Redo att bygga med RCS?</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-ink-muted">Kontakta oss för API-tillgång och hjälp med att planera er första integration.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="inverted">
            <a href="/kontakt">Kontakta oss <ArrowRight /></a>
          </Button>
          <Button asChild variant="inverted">
            <Link to="/rcs-online">Se webbgränssnittet</Link>
          </Button>
        </div>
      </div>
    </DetailPage>
  );
}
