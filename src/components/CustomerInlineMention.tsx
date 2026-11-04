import { customerReferences } from "@/data/customer-references";

/**
 * Eleganta kundlogotyper: en lugn rad direkt på vit botten, åtskilda av
 * tunna lodräta linjer, under en diskret versal-etikett. Inga rutor eller
 * kapslar.
 */
export function CustomerInlineMention() {
  return (
    <section aria-label="Kundreferenser" className="bg-background pb-10 pt-6">
      <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        Skickar RCS redan via oss
      </p>
      <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-5 sm:gap-x-12">
        {customerReferences.map((customer, index) => (
          <span key={customer.name} className="flex items-center gap-8 sm:gap-12">
            {index > 0 ? <span aria-hidden className="h-6 w-px bg-foreground/10" /> : null}
            <img
              src={customer.logo.url}
              alt={`Logotyp för ${customer.name}`}
              className="h-5 w-auto object-contain opacity-80 transition-opacity duration-200 hover:opacity-100 sm:h-6"
              loading="lazy"
            />
          </span>
        ))}
      </div>
    </section>
  );
}
