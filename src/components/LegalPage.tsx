import type { ReactNode } from "react";

import { PageHeading } from "@/components/PageHeading";
import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import type { LegalPage as LegalContent } from "@/content";
import { useT } from "@/lib/i18n";

/** A section's text: paragraphs at blank lines, and lines starting with "- " as a bulleted list. */
function Body({ text }: { text: string }) {
  const blocks = text.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  return (
    <>
      {blocks.map((block, index) => {
        const lines = block.split("\n").map((line) => line.trim());
        const items = lines.filter((line) => line.startsWith("- "));
        if (items.length && items.length === lines.length) {
          return (
            <ul key={index} className="mt-4 list-disc space-y-2 pl-5 marker:text-logo-blue">
              {items.map((item) => <li key={item} className="pl-1">{item.slice(2)}</li>)}
            </ul>
          );
        }
        return <p key={index} className="mt-4">{block}</p>;
      })}
    </>
  );
}

/** /integritetspolicy and /villkor: the shared heading, the date of the last change and the sections from the CMS. */
export function LegalPage({ page, fallbackTitle, swedish = "/", children }: { page: LegalContent | undefined; fallbackTitle: string; swedish?: string; children?: ReactNode }) {
  const ready = Boolean(page?.title && page.sections.length);
  const { t, locale } = useT();
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main id="innehall" tabIndex={-1} className="flex-1 outline-none">
        <PageHeading
          title={page?.title || fallbackTitle}
          description={
            ready ? (
              <>
                <p>{page!.description}</p>
                <p className="mt-3 text-sm">{t("Senast ändrad")} {page!.updated}</p>
                {/* The English text is a translation; the approved Swedish text is the one that applies. */}
                {locale === "en" ? <p className="mt-2 text-sm">This is a translation. If it differs from the <a href={swedish} hrefLang="sv" className="font-semibold underline underline-offset-4">Swedish version</a>, the Swedish version applies.</p> : null}
              </>
            ) : (
              <p>{t("Texten publiceras inom kort.")}</p>
            )
          }
        />
        {ready ? (
          <article className="px-5 pb-16 sm:pb-24 lg:px-8">
            <div className="mx-auto max-w-2xl text-base leading-relaxed text-pretty text-foreground/80 sm:text-[17px]">
              {page!.sections.map((section) => (
                <section key={section.heading} className="mt-12 first:mt-0">
                  <h2 className="text-2xl font-extrabold leading-snug text-foreground text-balance">{section.heading}</h2>
                  <Body text={section.body} />
                </section>
              ))}
              {children}
            </div>
          </article>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}
