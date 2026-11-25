import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Coins, Globe, RadioTower, ShieldCheck } from "lucide-react";

import { PageHeading } from "@/components/PageHeading";
import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { priser } from "@/content/priser";
import { company } from "@/lib/company";
import { sectionIntro, sectionTitle } from "@/lib/typography";

// The about page at /om-oss.

/** How we work, each point backed by something on the site: the sender check, the networks, where data lives, the prices. */
const principles = (operators: string[]) => [
  { Icon: Globe, title: "Global plattform", copy: "Vår plattform har direktkopplingar till operatörerna och räckvidd över hela världen. I dag säljer vi i Sverige, och samma plattform når fler länder när ni vill växa." },
  { Icon: BadgeCheck, title: "Kontrollerade avsändare", copy: "Vi registrerar varje avsändare och den kontrolleras innan den får skicka. Så vet kunden att det verkligen är ni." },
  { Icon: RadioTower, title: "Alla stora nät", copy: operators.length ? `${operators.slice(0, -1).join(", ")} | ${operators.at(-1)}` : "Meddelandena når kunder hos de stora operatörerna i Sverige." },
  { Icon: ShieldCheck, title: "Uppgifter inom EU", copy: "Det ni fyller i och era konton sparas hos Google Cloud i Belgien. I integritetspolicyn står vad vi sparar och hur länge." },
  { Icon: Coins, title: "Öppna priser", copy: "Alla listpriser står på prissidan, per meddelandetyp och operatör. Ni betalar för det ni skickar." },
];

export function AboutPage() {
  const operators = priser.operators.filter((name) => !/^(Övriga|Other)/.test(name));
  // The networks card names the operators; its sentence is built per language around them.
  const text = (heading: string, copy: string) => {
    if (heading !== "Alla stora nät" || !copy.includes(" | ")) return copy;
    const [first, last] = copy.split(" | ");
    return "Era kunder nås oavsett om de har {first} eller {last}, och även om de har en operatör som använder något av de näten.".replace("{first}", first ?? "").replace("{last}", last ?? "");
  };
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main id="innehall" tabIndex={-1} className="flex-1 outline-none">
        <PageHeading
          title="Om rcsdirekt.se"
          description={<p>{"rcsdirekt.se drivs av {company} i {city}. Vi vill att det ska vara enkelt för svenska företag att skicka RCS, från webben eller via API.".replace("{company}", company.legalName).replace("{city}", company.city)}</p>}
        />

        <section className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            {/* Plain text in two columns: a list of facts reads as a statement, not a row of feature cards. */}
            <dl className="grid gap-x-12 gap-y-8 border-t border-border pt-10 sm:grid-cols-2">
              {principles(operators).map(({ title: heading, copy }) => (
                <div key={heading}>
                  <dt className="text-lg font-extrabold leading-snug">{heading}</dt>
                  <dd className="mt-2 leading-relaxed text-pretty text-muted-foreground">{text(heading, copy)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="bg-primary-soft py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-8">
            <div>
              <h2 className={sectionTitle}>Vad vi gör</h2>
              <p className={sectionIntro}>
                Vi gör det möjligt för företag att skicka meddelanden med namn, logga, bilder och knappar direkt till kundens vanliga meddelandeapp. Ni bygger utskicket själva i webben eller låter ert system skicka via API. Avsändaren och upplägget hjälper vi er med.
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
