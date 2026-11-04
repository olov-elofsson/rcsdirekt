import { customerReferences } from "@/data/customer-references";

/**
 * Kundnämnande som ren text: företagsnamnen står i versaler med samma
 * toning som brödtexten, i stället för som logotyper i rutor eller rader.
 */
export function CustomerInlineMention() {
  return (
    <section aria-label="Kundreferenser" className="bg-background pb-4 pt-3 sm:pb-6">
      <p className="mx-auto flex max-w-2xl flex-wrap items-baseline justify-center gap-x-3 gap-y-1 px-5 text-center text-sm text-muted-foreground sm:text-[0.95rem]">
        <span>Skickar RCS redan via oss:</span>
        {customerReferences.map((customer, index) => (
          <span
            key={customer.name}
            className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70 sm:text-[0.8rem]"
          >
            {index > 0 ? <span aria-hidden className="mr-3 text-foreground/25">·</span> : null}
            {customer.name}
          </span>
        ))}
      </p>
    </section>
  );
}
