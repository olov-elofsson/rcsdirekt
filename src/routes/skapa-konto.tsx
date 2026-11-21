import { createFileRoute } from "@tanstack/react-router";

import { LeadForm } from "@/components/LeadForm";
import { SiteHeader, SiteFooter } from "@/components/SiteLayout";
import { PageHeading } from "@/components/PageHeading";

export const Route = createFileRoute("/skapa-konto")({
  head: () => ({
    meta: [
      { title: "Skapa konto och skicka RCS" },
      { name: "description", content: "Skapa ett konto och skicka RCS för ert företag. Ni betalar per meddelande och har inga fasta avgifter." },
      { property: "og:title", content: "Skapa konto och skicka RCS" },
      { property: "og:description", content: "Skapa ett konto och skicka RCS för ert företag. Ni betalar per meddelande och har inga fasta avgifter." },
      { property: "og:type", content: "website" }, { property: "og:url", content: "https://rcsdirekt.se/skapa-konto" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/skapa-konto" }],
  }),
  component: SignupPage,
});

function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main id="innehall" tabIndex={-1} className="outline-none flex-1">
        <PageHeading
          title="Skapa ditt konto"
          description={<p>Berätta vilka ni är, så aktiverar vi kontot och hör av oss med nästa steg. Har du redan ett konto? <a href="https://portal.rcsdirekt.se/login" className="font-semibold text-primary underline underline-offset-4">Logga in</a></p>}
        />
        <section className="px-5 pb-16 sm:pb-24 lg:px-8">
          <div className="mx-auto w-full max-w-2xl">
            <LeadForm mode="signup" />
            <p className="mt-7 text-center text-xs leading-relaxed text-muted-foreground">Ni betalar per skickat meddelande, utan fasta avgifter eller bindningstid.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
