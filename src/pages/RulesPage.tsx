import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { NumberDrop } from "@/components/NumberDrop";
import { PageHeading } from "@/components/PageHeading";
import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { articleList } from "@/content/article-list";
import { LEGAL_ARTICLES } from "@/data/legal-articles";
import { sectionIntro, sectionTitle } from "@/lib/typography";

// The help page at /regler: the rules for sending RCS, in short, and the articles that explain them.

/** Each point is covered, with sources, in one of the articles below. */
const RULES = [
  "Reklam via SMS och RCS till privatpersoner och enskilda firmor kräver att mottagaren har sagt ja i förväg (19 § marknadsföringslagen).",
  "Undantaget för befintliga kunder gäller bara om ni fick numret när kunden köpte något, reklamen gäller era egna likartade produkter och kunden kan säga nej i varje meddelande.",
  "En köpt lista kan inte användas för reklam via SMS eller RCS, om inte samtycket som följer med listan namnger ert företag.",
  "Varje reklammeddelande ska ha en giltig väg att stoppa utskicken, även när mottagaren är ett företag (20 § marknadsföringslagen).",
  "Telefonnummer till personer är personuppgifter. Ni behöver en rättslig grund enligt GDPR och ska berätta för mottagaren hur numret används.",
  "Google kräver ett uttryckligt samtycke innan en RCS-avsändare skriver till någon, och att avregistrering med STOP fungerar.",
];

export function RulesPage() {
  const order = LEGAL_ARTICLES as readonly string[];
  const articles = articleList
    .filter((article) => order.includes(article.slug))
    .sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main id="innehall" tabIndex={-1} className="flex-1 outline-none">
        <PageHeading
          title="Regler för RCS-utskick"
          description={
            <p>
              Det här gäller när ert företag skickar RCS: samtycke, köpta listor, reklam till företag och personuppgifter. Sidan ger en översikt med källor och ersätter inte juridisk rådgivning.
            </p>
          }
        />

        <section className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <h2 className={sectionTitle}>Reglerna i korthet</h2>
            <ol className="mt-8 space-y-6">
              {RULES.map((rule, index) => (
                <li key={rule} className="flex gap-4">
                  <NumberDrop n={index + 1} />
                  <p className="pt-1.5 text-lg leading-relaxed text-pretty text-foreground/85">{rule}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-border bg-muted py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <h2 className={sectionTitle}>Läs mer</h2>
            <p className={sectionIntro}>Artiklarna går igenom reglerna steg för steg, med lagtext, myndigheternas vägledning och Googles villkor som källor.</p>
            <ul className="mt-8 space-y-4">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    to="/blogg/$slug"
                    params={{ slug: article.slug }}
                    className="group block rounded-2xl border border-border bg-background p-6 transition-shadow duration-200 ease-out hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span className="text-xl font-extrabold leading-snug text-balance transition-colors duration-150 group-hover:text-logo-blue">{article.title}</span>
                      <ArrowRight aria-hidden className="mt-1.5 size-5 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                    </span>
                    <span className="mt-2 block leading-relaxed text-pretty text-muted-foreground">{article.description}</span>
                    <span className="mt-3 block text-sm text-muted-foreground tabular-nums">{article.minutes} min läsning</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <h2 className={sectionTitle}>Osäkra på ert upplägg?</h2>
            <p className={sectionIntro}>
              Vi går gärna igenom hur ni samlar in samtycken och hur avregistreringar slår igenom. Bedömningen av ert upplägg bör ändå göras av en jurist.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link to="/kontakt">
                  Kontakta oss <ArrowRight data-icon="end" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
