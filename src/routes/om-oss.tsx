import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Coins, RadioTower, ShieldCheck } from "lucide-react";

import { PageHeading } from "@/components/PageHeading";
import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { content } from "@/content";
import { company, organizationSchema } from "@/lib/company";
import { sectionIntro, sectionTitle } from "@/lib/typography";

const title = "Om RCS Direkt | WIGOSE AB i Örebro";
const description = "RCS Direkt är en tjänst från WIGOSE AB i Örebro. Svenska företag skickar RCS från webben eller via API och betalar per meddelande.";
const operators = content.priser.operators.filter((name) => !name.startsWith("Övriga"));

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rcsdirekt.se/om-oss" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/om-oss" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "AboutPage", url: "https://rcsdirekt.se/om-oss", mainEntity: organizationSchema }) }],
  }),
  component: AboutPage,
});

/** How we work, each point backed by something on the site: the sender check, the networks, where data lives, the prices. */
const PRINCIPLES = [
  { Icon: BadgeCheck, title: "Kontrollerade avsändare", copy: "Varje avsändare registreras och kontrolleras innan den får skicka, så att kunden ser ett riktigt företagsnamn och en logotyp." },
  { Icon: RadioTower, title: "Alla stora nät", copy: operators.length ? `Meddelandena når kunder hos ${operators.slice(0, -1).join(", ")} och ${operators.at(-1)}, och hos operatörerna som använder deras nät.` : "Meddelandena når kunder hos de stora operatörerna i Sverige." },
  { Icon: ShieldCheck, title: "Uppgifter inom EU", copy: "Formulär och konton lagras hos Google Cloud i Belgien. Integritetspolicyn beskriver vad vi sparar och hur länge." },
  { Icon: Coins, title: "Öppna priser", copy: "Listpriset för varje meddelandetyp och operatör står på prissidan. Ni betalar per skickat meddelande." },
];

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main id="innehall" tabIndex={-1} className="flex-1 outline-none">
        <PageHeading
          title="Om RCS Direkt"
          description={<p>RCS Direkt är en tjänst från {company.legalName} i {company.city}. Vi hjälper svenska företag att skicka RCS från webben eller via API.</p>}
        />

        <section className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PRINCIPLES.map(({ Icon, title: heading, copy }) => (
                <div key={heading} className="rounded-2xl bg-card p-6 shadow-card">
                  <span aria-hidden className="grid size-11 place-items-center rounded-xl bg-primary-soft text-logo-blue"><Icon strokeWidth={2} className="size-5" /></span>
                  <h2 className="mt-5 text-lg font-extrabold leading-snug">{heading}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary-soft py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-8">
            <div>
              <h2 className={sectionTitle}>Vad vi gör</h2>
              <p className={sectionIntro}>
                Med RCS Direkt skickar företag meddelanden med namn, logotyp, bilder och knappar till kundernas vanliga meddelandeapp. Ni bygger utskicket i webbverktyget eller kopplar in ert system via API, och vi hjälper till med avsändaren och upplägget.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg"><Link to="/skapa-konto">Skapa konto <ArrowRight data-icon="end" /></Link></Button>
                <Button asChild size="lg" variant="outline"><Link to="/kontakt">Kontakta oss</Link></Button>
              </div>
            </div>
            <div className="rounded-2xl bg-card p-7 shadow-card sm:p-8">
              <h2 className="text-xl font-extrabold">Företagsuppgifter</h2>
              <dl className="mt-5 divide-y divide-border text-sm">
                {[
                  ["Bolag", company.legalName],
                  ["Organisationsnummer", company.orgNumber],
                  ["Adress", `${company.street}, ${company.postalCode} ${company.city}`],
                  ["Tjänst", company.brand],
                  ...(company.email ? [["E-post", company.email]] : []),
                ].map(([term, value]) => (
                  <div key={term} className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
                    <dt className="text-muted-foreground">{term}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 flex flex-wrap gap-x-5 text-sm font-semibold">
                <Link to="/villkor" className="inline-flex min-h-10 items-center underline underline-offset-4 hover:text-logo-blue">Villkor</Link>
                <Link to="/integritetspolicy" className="inline-flex min-h-10 items-center underline underline-offset-4 hover:text-logo-blue">Integritetspolicy</Link>
                <Link to="/kontakt" className="inline-flex min-h-10 items-center underline underline-offset-4 hover:text-logo-blue">Kontakt</Link>
                {company.linkedin ? <a href={company.linkedin} className="inline-flex min-h-10 items-center underline underline-offset-4 hover:text-logo-blue">LinkedIn</a> : null}
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
