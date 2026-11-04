import { customerReferences } from "@/data/customer-references";

/**
 * Kundlogotyper som pillrade chip: varje kund i en liten rundad kapsel
 * med logotyp och namn, samlade i en centrerad rad under hero-knapparna.
 */
export function CustomerInlineMention() {
  return (
    <section aria-label="Kundreferenser" className="bg-background pb-6 pt-4">
      <p className="text-center text-sm text-muted-foreground">Skickar RCS redan via oss:</p>
      <div className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-2.5 px-5 sm:gap-3">
        {customerReferences.map((customer) => (
          <span
            key={customer.name}
            className="inline-flex items-center gap-2.5 rounded-full bg-reference-tile px-4 py-2 sm:px-5"
          >
            <img
              src={customer.logo.url}
              alt={`Logotyp för ${customer.name}`}
              className="h-4 w-auto object-contain sm:h-5"
              loading="lazy"
            />
          </span>
        ))}
      </div>
    </section>
  );
}
