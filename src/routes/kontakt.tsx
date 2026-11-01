import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";

import { LeadForm } from "@/components/LeadForm";
import { SiteFooter, SiteHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakta oss om RCS för företag" },
      { name: "description", content: "Frågor om att skicka RCS, API-tillgång eller priser? Kontakta RCS Direkt så hjälper vi ert företag igång." },
      { property: "og:title", content: "Kontakta oss om RCS för företag" },
      { property: "og:description", content: "Frågor om att skicka RCS, API-tillgång eller priser? Kontakta RCS Direkt så hjälper vi ert företag igång." },
      { property: "og:type", content: "website" }, { property: "og:url", content: "https://rcsdirekt.se/kontakt" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/kontakt" }],
  }),
  component: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-primary-soft py-16 sm:py-24 lg:py-28">
          <div aria-hidden className="deco-dots pointer-events-none absolute -right-8 top-12 size-56 opacity-[0.07]" />
          <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-normal sm:text-5xl lg:text-6xl">Kontakta oss</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">Har du frågor om RCS, priser eller hur ni kommer igång? Hör av dig så återkommer vi så snart vi kan.</p>
          </div>
        </section>
        <section className="py-16 sm:py-24 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:px-8">
            <div>
              <h2 className="text-2xl font-extrabold sm:text-3xl">Kontakt</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Vill ni skicka RCS från webben eller via era egna system? Vi hjälper er att välja meddelandetyp, aktivera avsändaren och komma igång, oavsett om ni skickar en kampanj eller miljontals meddelanden.
              </p>
              <a href="mailto:info@rcsdirekt.se" className="mt-6 inline-flex items-center gap-3 text-base font-semibold text-primary underline underline-offset-4 transition-colors hover:text-logo-blush">
                <Mail className="size-4" /> info@rcsdirekt.se
              </a>
              <h2 className="mt-12 text-2xl font-extrabold sm:text-3xl">Redan kund?</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Logga in i webbgränssnittet för att skicka, eller skriv till oss om API-nycklar, avsändarprofil eller statistik.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a href="https://portal.rcsdirekt.se/login" className="text-sm font-semibold text-primary underline underline-offset-4 transition-colors hover:text-logo-blush">Logga in</a>
                <a href="mailto:info@rcsdirekt.se" className="text-sm font-semibold text-primary underline underline-offset-4 transition-colors hover:text-logo-blush">info@rcsdirekt.se</a>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold sm:text-3xl">Skicka dina uppgifter så återkommer vi</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">Fyll i formuläret så hör vi av oss med nästa steg.</p>
              <div className="mt-6">
                <LeadForm mode="contact" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  ),
});
