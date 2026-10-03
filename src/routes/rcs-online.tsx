import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  Check,
  ContactRound,
  Inbox,
  LayoutTemplate,
  Send,
} from "lucide-react";

import { ContentBlock, DetailPage } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/rcs-online")({
  head: () => ({
    meta: [
      { title: "Skicka RCS online från webben | RCS Direkt" },
      { name: "description", content: "Skicka RCS online utan kod. Skapa, schemalägg och följ RCS-utskick för ert företag direkt i webbläsaren. Betala per meddelande." },
      { property: "og:title", content: "Skicka RCS online från webben | RCS Direkt" },
      { property: "og:description", content: "Skicka RCS online utan kod. Skapa, schemalägg och följ RCS-utskick för ert företag direkt i webbläsaren. Betala per meddelande." },
      { property: "og:type", content: "website" }, { property: "og:url", content: "https://rcsdirekt.se/rcs-online" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/rcs-online" }],
  }),
  component: RcsOnlinePage,
});

const features = [
  { icon: Send, title: "Skapa utskick", text: "Bygg och förhandsgranska meddelandet direkt i webbläsaren." },
  { icon: CalendarClock, title: "Kampanjer", text: "Schemalägg rätt tid och samla allt på ett ställe." },
  { icon: Inbox, title: "Inkorg", text: "Se svaren och fortsätt konversationen." },
  { icon: ContactRound, title: "Kontakter", text: "Importera listor och dela in mottagarna i grupper." },
  { icon: LayoutTemplate, title: "Mallar", text: "Återanvänd text, bilder och knappar." },
  { icon: BarChart3, title: "Statistik", text: "Följ leverans, läsningar och klick." },
];

const steps = [
  "Bygg meddelandet med bilder, knappar och snabbsvar",
  "Förhandsgranska hur det ser ut i mottagarens meddelandeapp",
  "Schemalägg utskicket och välj mottagare",
  "Följ leverans, läsningar och klick i realtid",
];

function RcsOnlinePage() {
  return (
    <DetailPage
      title="Skicka RCS-meddelanden direkt från webben"
      intro="Skapa kampanjer, hantera kontakter och svara på meddelanden direkt i webbläsaren. Ingen kod krävs."
      aside={<div className="rounded-[2rem] border border-border bg-primary-soft p-7 shadow-card sm:p-9"><LayoutTemplate className="size-7 text-primary" /><h2 className="mt-6 text-2xl font-extrabold">Allt samlat online</h2><p className="mt-3 leading-relaxed text-muted-foreground">För team som vill skapa kampanjer och utskick utan en teknisk integration.</p><div className="mt-7 flex flex-col gap-3"><Button asChild><a href="/skapa-konto">Skapa konto <ArrowRight /></a></Button><Button asChild variant="outline"><a href="#funktioner">Se funktionerna</a></Button></div></div>}
    >
      <ContentBlock title="Ett webbgränssnitt för hela flödet">
        <p>Från första utkast till uppföljning finns allt på samma plats. Välj mottagare, bygg meddelandet visuellt och förhandsgranska resultatet innan du skickar.</p>
        <div id="funktioner" className="mt-8 grid gap-3 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-muted p-5">
              <Icon className="size-5 text-primary" />
              <h3 className="mt-4 text-base font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </ContentBlock>
      <ContentBlock title="Så fungerar det">
        <ul className="space-y-3">
          {steps.map((step) => (
            <li key={step} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-soft ring-1 ring-border/60"><Check className="size-3.5 text-primary" /></span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ul>
      </ContentBlock>
      <div className="rounded-[2rem] bg-primary p-7 text-primary-foreground sm:p-9">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Redo att skicka online?</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-ink-muted">Skapa ett konto och bygg ert första RCS-meddelande direkt i webbläsaren.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="inverted"><a href="/skapa-konto">Skapa konto <ArrowRight /></a></Button>
<Button asChild variant="inverted"><Link to="/rcs-api">Se RCS API</Link></Button>
        </div>
      </div>
    </DetailPage>
  );
}
