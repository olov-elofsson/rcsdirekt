import type { ReactNode } from "react";

import { PageHeading } from "@/components/PageHeading";
import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import type { LegalPage as LegalContent } from "@/content";

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
export function LegalPage({ page, fallbackTitle, children }: { page: LegalContent | undefined; fallbackTitle: string; children?: ReactNode }) {
  const ready = Boolean(page?.title && page.sections.length);
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
                <p className="mt-3 text-sm">Senast ändrad {page!.updated}</p>
              </>
            ) : (
              <p>Texten publiceras inom kort.</p>
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
