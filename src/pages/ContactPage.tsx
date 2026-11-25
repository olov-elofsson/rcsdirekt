import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import { InquiryForm } from "@/components/InquiryForm";
import { PageHeading } from "@/components/PageHeading";
import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { company, phoneHref } from "@/lib/company";

// The contact page at /kontakt.

export function ContactPage() {
  const row = "flex items-start gap-3 text-sm";
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main id="innehall" tabIndex={-1} className="flex-1 outline-none">
        <PageHeading title="Kontakta oss" description={<p>Berätta lite om vad ni vill skicka, så hör vi av oss. Vi hjälper till med avsändare, upplägg och koppling.</p>} />
        <section className="px-5 pb-16 sm:pb-24 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
            <InquiryForm mode="contact" />
            <aside className="space-y-6">
              <div className="rounded-2xl bg-primary-soft p-6">
                <h2 className="text-lg font-extrabold">{company.brand}</h2>
                <ul className="mt-4 space-y-3">
                  <li className={row}><Building2 aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-logo-blue" /><span>{company.legalName}, org.nr {company.orgNumber}</span></li>
                  <li className={row}><MapPin aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-logo-blue" /><span>{company.street}, {company.postalCode} {company.city}</span></li>
                  {company.email ? <li className={row}><Mail aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-logo-blue" /><a href={`mailto:${company.email}`} className="-my-2.5 inline-flex min-h-10 items-center font-semibold underline-offset-4 hover:underline">{company.email}</a></li> : null}
                  {company.phone ? <li className={row}><Phone aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-logo-blue" /><a href={phoneHref(company.phone)} className="-my-2.5 inline-flex min-h-10 items-center font-semibold underline-offset-4 hover:underline">{company.phone}</a></li> : null}
                  {company.linkedin ? <li className={row}><Linkedin aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-logo-blue" /><a href={company.linkedin} className="-my-2.5 inline-flex min-h-10 items-center font-semibold underline-offset-4 hover:underline">LinkedIn</a></li> : null}
                </ul>
              </div>
              <div className="rounded-2xl bg-card p-6 shadow-card">
                <h2 className="text-lg font-extrabold">Har ni redan ett konto?</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">Logga in i portalen, där skickar ni och ser hur det gick.</p>
                <a href="https://portal.rcsdirekt.se/login" className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:text-logo-blue hover:underline">Logga in <ArrowUpRight aria-hidden className="size-4" /></a>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Undrar ni över priserna? Kolla <Link to="/priser" className="font-semibold text-foreground underline underline-offset-4 hover:text-logo-blue">prissidan</Link>. Om personuppgifter står i <Link to="/integritetspolicy" className="font-semibold text-foreground underline underline-offset-4 hover:text-logo-blue">integritetspolicyn</Link>.
              </p>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
