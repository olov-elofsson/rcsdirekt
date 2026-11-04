import { customerReferences } from "@/data/customer-references";

/**
 * Nytänkande kundnämnande: logotyperna sitter inline i en redaktionell
 * mening i stället för i rutor, band eller marquee. Diskret men tydlig.
 */
export function CustomerInlineMention() {
  return (
    <section aria-label="Kundreferenser" className="bg-background pb-2 pt-2 sm:pb-4">
      <p className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-2 gap-y-1.5 px-5 text-center text-[0.9rem] leading-relaxed text-muted-foreground sm:text-base">
        <span>Skickar RCS redan via oss:</span>
        {customerReferences.map((customer, index) => (
          <span key={customer.name} className="inline-flex items-center gap-1.5">
            {index > 0 ? <span aria-hidden className="text-foreground/25">·</span> : null}
            <span className="inline-flex items-center">
              <img
                src={customer.logo.url}
                alt={customer.name}
                className="h-3.5 w-auto object-contain opacity-70 sm:h-4"
                loading="lazy"
              />
            </span>
          </span>
        ))}
      </p>
    </section>
  );
}
