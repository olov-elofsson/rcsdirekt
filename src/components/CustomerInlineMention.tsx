import { customerReferences } from "@/data/customer-references";

/**
 * Kundlogotyper som pillrade chip: varje kund i en liten rundad kapsel
 * med logotyp och namn, samlade i en centrerad rad under hero-knapparna.
 */
export function CustomerInlineMention() {
  return (
    <section aria-label="Kundreferenser" className="bg-background pb-8 pt-5">
      <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Skickar RCS redan via oss
      </p>
      <div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-3 px-5">
        {customerReferences.map((customer) => (
          <span
            key={customer.name}
            className="inline-flex items-center rounded-full bg-reference-tile px-6 py-3 shadow-[0_1px_3px_rgba(21,17,95,0.06)] ring-1 ring-foreground/[0.04] transition-transform duration-200 hover:-translate-y-0.5 sm:px-7"
          >
            <img
              src={customer.logo.url}
              alt={`Logotyp för ${customer.name}`}
              className="h-5 w-auto object-contain sm:h-6"
              loading="lazy"
            />
          </span>
        ))}
      </div>
    </section>
  );
}
