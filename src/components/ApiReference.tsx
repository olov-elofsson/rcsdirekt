import { JsonCode } from "@/components/HomepageSections";
import { sectionIntro, sectionTitle } from "@/lib/typography";

// The API reference on /utvecklare, laid out the way API docs usually are: the calls grouped in a
// menu on the left, and per call the method and path, what it does, the main parameters and a dark
// panel with a request and a response. Paths, fields and examples follow the provider's reference
// (November 2026); the provider is not named on the site (owner's decision).

type Param = [name: string, type: string, copy: string];
type Endpoint = {
  id: string;
  title: string;
  method: "POST" | "GET" | "Webhook";
  path: string;
  copy: string;
  params?: Param[];
  request?: string;
  response?: string;
  /** Label for the response panel, for webhooks the payload your server receives. */
  responseLabel?: string;
};

const GROUPS: { title: string; endpoints: Endpoint[] }[] = [
  {
    title: "Skicka",
    endpoints: [
      {
        id: "skicka-meddelanden",
        title: "Skicka meddelanden",
        method: "POST",
        path: "/rcs/2/messages",
        copy: "Skickar text, fil, kort, karusell eller mall till en eller flera mottagare. Ett anrop får vara högst 10 MB. En text utan förslag räknas som Basic; med ett förslag blir den Single.",
        params: [
          ["messages[].sender", "string, krävs", "Er avsändare."],
          ["messages[].destinations[].to", "string, krävs", "Mottagarens nummer med landskod, utan plus."],
          ["messages[].content.type", "string, krävs", "TEXT, FILE, CARD, CAROUSEL eller PROVIDER_TEMPLATE."],
          ["messages[].content.suggestions", "lista", "Upp till 11 förslag: REPLY, OPEN_URL, DIAL_PHONE, SHOW_LOCATION, REQUEST_LOCATION eller CREATE_CALENDAR_EVENT."],
          ["messages[].options.smsFailover", "objekt", "Ett SMS som skickas om RCS inte når telefonen."],
          ["messages[].options.validityPeriod", "objekt", "Hur länge leveransen försöks, från 10 sekunder till 48 timmar."],
        ],
        request: `{
  "messages": [{
    "sender": "Frisorsalongen",
    "destinations": [{ "to": "46701234567" }],
    "content": {
      "type": "TEXT",
      "text": "Din tid är tisdag kl. 14.00.",
      "suggestions": [
        { "type": "REPLY", "text": "Bekräfta",
          "postbackData": "bekrafta" }
      ]
    },
    "options": {
      "smsFailover": {
        "sender": "Frisorsalongen",
        "text": "Din tid: tis kl. 14.00"
      }
    }
  }]
}`,
        response: `{
  "bulkId": "a28dd97c-2222-4fcf",
  "messages": [{
    "messageId": "a28dd97c-1ffb-4fcf",
    "status": {
      "groupName": "PENDING",
      "name": "PENDING_ACCEPTED"
    },
    "destination": "46701234567"
  }]
}`,
      },
      {
        id: "skicka-handelse",
        title: "Skicka händelse",
        method: "POST",
        path: "/rcs/1/events",
        copy: "Visar för kunden att ni skriver (TYPING_INDICATOR, syns i fem sekunder) eller att ni har läst kundens meddelande (SEEN). Händelserna kostar inget.",
        params: [
          ["events[].sender", "string, krävs", "Er avsändare."],
          ["events[].destinations[].to", "string, krävs", "Kundens nummer."],
          ["events[].content.type", "string, krävs", "TYPING_INDICATOR eller SEEN."],
          ["events[].content.messageId", "string", "Kundens meddelande som ni har läst, för SEEN."],
        ],
        request: `{
  "events": [{
    "sender": "Frisorsalongen",
    "destinations": [{ "to": "46701234567" }],
    "content": { "type": "TYPING_INDICATOR" }
  }]
}`,
      },
    ],
  },
  {
    title: "Kontrollera nummer",
    endpoints: [
      {
        id: "kontrollera-nummer",
        title: "Kontrollera nummer",
        method: "POST",
        path: "/rcs/2/capability-check/query",
        copy: "Svarar direkt om numren kan ta emot RCS från er avsändare. Upp till 500 nummer per anrop, men inför ett utskick fungerar 1 till 10 bäst. Avsändaren måste vara lanserad i mottagarens nät.",
        params: [
          ["sender", "string, krävs", "Er avsändare."],
          ["phoneNumbers", "lista, krävs", "Numren som ska kontrolleras."],
        ],
        request: `{
  "sender": "Frisorsalongen",
  "phoneNumbers": ["46701234567", "46707654321"]
}`,
        response: `{
  "capabilityCheckResults": [
    { "phoneNumber": "46701234567", "code": "ENABLED" },
    { "phoneNumber": "46707654321", "code": "UNREACHABLE" }
  ]
}`,
      },
      {
        id: "kontrollera-manga",
        title: "Kontrollera många nummer",
        method: "POST",
        path: "/rcs/2/capability-check/notify",
        copy: "Samma kontroll för upp till 10 000 nummer, till exempel för att städa ett kundregister. Resultatet kommer per nummer till er webhook.",
        params: [
          ["sender", "string, krävs", "Er avsändare."],
          ["phoneNumbers", "lista, krävs", "Upp till 10 000 nummer."],
          ["notifyUrl", "string", "Adressen som resultaten skickas till."],
        ],
        request: `{
  "sender": "Frisorsalongen",
  "phoneNumbers": ["46701234567", "46707654321"],
  "notifyUrl": "https://exempel.se/rcs/kontroll"
}`,
        response: `{
  "bulkId": "d5c3bdff-2d44-4f74",
  "capabilityCheckRequestStates": [
    { "phoneNumber": "46701234567",
      "status": "PENDING_ENROUTE" }
  ]
}`,
      },
    ],
  },
  {
    title: "Rapporter och loggar",
    endpoints: [
      {
        id: "hamta-rapporter",
        title: "Hämta leveransrapporter",
        method: "GET",
        path: "/rcs/2/reports",
        copy: "För er som inte tar emot leveransrapporter som webhook. Varje rapport hämtas en gång, och rapporter finns i 48 timmar.",
        params: [
          ["messageId", "string", "Rapporten för ett visst meddelande."],
          ["bulkId", "string", "Rapporterna för ett visst anrop."],
          ["limit", "heltal", "Antal rapporter, 50 om inget anges och högst 1 000."],
        ],
        response: `{
  "results": [{
    "messageId": "a28dd97c-1ffb-4fcf",
    "to": "46701234567",
    "status": {
      "groupName": "DELIVERED",
      "name": "DELIVERED_TO_HANDSET"
    },
    "trafficType": "SINGLE"
  }]
}`,
      },
      {
        id: "hamta-loggar",
        title: "Hämta loggar",
        method: "GET",
        path: "/rcs/2/logs",
        copy: "Söker bland skickade meddelanden från de senaste 48 timmarna, till exempel för att visa dem i ert eget gränssnitt.",
        params: [
          ["destination", "string", "Mottagarens nummer."],
          ["messageId", "string", "Ett eller flera meddelanden, kommaseparerade."],
          ["sentSince, sentUntil", "datum och tid", "Tidsintervall."],
          ["limit", "heltal", "Antal meddelanden, 50 om inget anges och högst 1 000."],
        ],
      },
    ],
  },
  {
    title: "Webhooks",
    endpoints: [
      {
        id: "leveransrapport",
        title: "Leveransrapport",
        method: "Webhook",
        path: "POST till er adress",
        copy: "Kommer när meddelandet har nått telefonen eller misslyckats. trafficType visar prisnivån: BASIC, SINGLE eller ett samtal (A2P_CONVERSATION, P2A_CONVERSATION).",
        responseLabel: "Det ni får",
        response: `{
  "results": [{
    "messageId": "a28dd97c-1ffb-4fcf",
    "to": "46701234567",
    "status": {
      "groupName": "DELIVERED",
      "name": "DELIVERED_TO_HANDSET"
    },
    "channel": "RCS",
    "trafficType": "SINGLE"
  }]
}`,
      },
      {
        id: "lasrapport",
        title: "Läsrapport",
        method: "Webhook",
        path: "POST till er adress",
        copy: "Kommer när kunden har öppnat meddelandet.",
        responseLabel: "Det ni får",
        response: `{
  "results": [{
    "messageId": "a28dd97c-1ffb-4fcf",
    "from": "46701234567",
    "to": "Frisorsalongen",
    "sentAt": "2026-11-25T13:00:00.000+0000",
    "seenAt": "2026-11-25T13:04:12.000+0000"
  }]
}`,
      },
      {
        id: "inkommande",
        title: "Inkommande meddelande",
        method: "Webhook",
        path: "POST till er adress",
        copy: "Kommer när kunden skriver något eller skickar en fil eller plats. Filer från kunden finns kvar i 60 dagar.",
        responseLabel: "Det ni får",
        response: `{
  "results": [{
    "sender": "46701234567",
    "to": "Frisorsalongen",
    "receivedAt": "2026-11-25T13:05:30.000+0000",
    "message": {
      "type": "TEXT",
      "text": "Kan jag komma 15 i stället?"
    }
  }]
}`,
      },
      {
        id: "knapptryck",
        title: "Knapptryck",
        method: "Webhook",
        path: "POST till er adress",
        copy: "Kommer när kunden trycker på ett förslag, med förslagets text och det postbackData ni satte.",
        responseLabel: "Det ni får",
        response: `{
  "results": [{
    "sender": "46701234567",
    "to": "Frisorsalongen",
    "message": {
      "type": "SUGGESTION",
      "text": "Bekräfta",
      "postbackData": "bekrafta"
    }
  }]
}`,
      },
      {
        id: "kunden-skriver",
        title: "Kunden skriver",
        method: "Webhook",
        path: "POST till er adress",
        copy: "Kommer när kunden håller på att skriva ett svar.",
        responseLabel: "Det ni får",
        response: `{
  "results": [{
    "sender": "46701234567",
    "to": "Frisorsalongen",
    "event": { "type": "TYPING_INDICATOR" }
  }]
}`,
      },
      {
        id: "samtal-startat",
        title: "Samtal startat",
        method: "Webhook",
        path: "POST till er adress",
        copy: "Kommer när kunden svarar inom 24 timmar och meddelandena från och med nu räknas som ett samtal.",
        responseLabel: "Det ni får",
        response: `{
  "results": [{
    "messageId": "a28dd97c-1ffb-4fcf",
    "trafficType": "A2P_CONVERSATION",
    "event": { "type": "CONVERSATION_STARTED" },
    "conversation": {
      "type": "A2P",
      "startTime": "2026-11-25T13:05:30.000+0000",
      "endTime": "2026-11-26T13:05:30.000+0000"
    }
  }]
}`,
      },
      {
        id: "nummerkontroll",
        title: "Resultat av nummerkontroll",
        method: "Webhook",
        path: "POST till notifyUrl",
        copy: "Ett resultat per nummer från en kontroll av många nummer.",
        responseLabel: "Det ni får",
        response: `{
  "capabilityCheckResult": {
    "bulkId": "d5c3bdff-2d44-4f74",
    "phoneNumber": "46701234567",
    "code": "ENABLED"
  }
}`,
      },
    ],
  },
];

const badge = (method: Endpoint["method"]) =>
  method === "POST" ? "bg-primary-soft text-foreground" : method === "GET" ? "bg-card text-foreground ring-1 ring-border" : "bg-muted text-muted-foreground ring-1 ring-border";

function CodePanel({ label, code }: { label: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-xl bg-ink text-left">
      <p className="border-b border-ink-foreground/10 px-4 py-2 text-[11px] font-semibold tracking-[0.06em] text-ink-muted uppercase">{label}</p>
      <pre className="overflow-x-auto px-4 py-3 text-[12.5px] leading-relaxed"><JsonCode code={code} /></pre>
    </div>
  );
}

function EndpointSection({ endpoint }: { endpoint: Endpoint }) {
  const { id, title, method, path, copy, params, request, response, responseLabel } = endpoint;
  return (
    <article id={id} className="scroll-mt-28 grid gap-6 border-t border-border py-10 first:border-t-0 first:pt-0 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-10">
      <div>
        <h3 className="text-xl font-extrabold">{title}</h3>
        <p className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <span className={`rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold ${badge(method)}`}>{method}</span>
          <code className="font-mono text-[13px] font-semibold break-all">{path}</code>
        </p>
        <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">{copy}</p>
        {params ? (
          <>
            <h4 className="mt-6 text-sm font-semibold">{method === "GET" ? "Parametrar i adressen" : "Fält i anropet"}</h4>
            <dl className="mt-2 divide-y divide-border rounded-lg border border-border bg-card text-sm">
              {params.map(([name, type, text]) => (
                <div key={name} className="px-3 py-2.5">
                  <dt className="flex flex-wrap items-baseline gap-x-2">
                    <code className="font-mono text-[12.5px] font-semibold break-all">{name}</code>
                    <span className="text-xs text-muted-foreground">{type}</span>
                  </dt>
                  <dd className="mt-1 leading-relaxed text-pretty text-muted-foreground">{text}</dd>
                </div>
              ))}
            </dl>
          </>
        ) : null}
      </div>
      {request || response ? (
        <div className="grid content-start gap-3">
          {request ? <CodePanel label="Anrop" code={request} /> : null}
          {response ? <CodePanel label={responseLabel ?? "Svar 200"} code={response} /> : null}
        </div>
      ) : null}
    </article>
  );
}

/** The API reference: a menu of every call and webhook, and one section per call. */
export function ApiReference() {
  return (
    <section id="api-referens" className="scroll-mt-24 bg-muted py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className={sectionTitle}>API-referens</h2>
        <p className={sectionIntro}>Sex anrop och sju webhooks. Alla anrop tar och ger JSON och autentiseras med en API-nyckel i huvudet <code className="font-mono text-[0.9em]">Authorization</code>. Adressen och nyckeln får ni när kontot är aktiverat.</p>
        <div className="mt-10 grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <nav aria-label="API-referens">
            <div className="grid gap-6 sm:grid-cols-2 lg:sticky lg:top-28 lg:grid-cols-1">
              {GROUPS.map((group) => (
                <div key={group.title}>
                  <p className="text-xs font-semibold tracking-[0.06em] text-muted-foreground uppercase">{group.title}</p>
                  <ul className="mt-2 grid gap-0.5">
                    {group.endpoints.map((endpoint) => (
                      <li key={endpoint.id}>
                        <a href={`#${endpoint.id}`} className="flex min-h-9 items-center gap-2 rounded-md px-2 text-sm transition-colors hover:bg-card">
                          <span className={`w-12 shrink-0 rounded px-1 py-0.5 text-center font-mono text-[10px] font-semibold ${badge(endpoint.method)}`}>{endpoint.method === "Webhook" ? "HOOK" : endpoint.method}</span>
                          <span className="truncate">{endpoint.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
          <div className="grid gap-12">
            {GROUPS.map((group) => (
              <div key={group.title} className="rounded-2xl border border-border bg-background p-5 sm:p-8">
                <h3 className="mb-8 text-sm font-semibold tracking-[0.06em] text-muted-foreground uppercase">{group.title}</h3>
                {group.endpoints.map((endpoint) => <EndpointSection key={endpoint.id} endpoint={endpoint} />)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
