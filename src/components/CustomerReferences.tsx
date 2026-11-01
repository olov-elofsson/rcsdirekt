import { customerReferences } from "@/data/customer-references";
import { Wave } from "@/components/BandWave";

export function CustomerReferences({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-label="Kundreferenser" className="relative overflow-hidden bg-primary-soft py-14 sm:py-16 lg:py-20">
      <Wave flip className="h-8 sm:h-12 lg:h-16" fill="var(--color-background)" />
      <div aria-hidden className="deco-dots pointer-events-none absolute left-10 top-14 h-40 w-40 opacity-[0.06] lg:left-20" />
      <div aria-hidden className="deco-dots pointer-events-none absolute bottom-14 right-10 h-40 w-40 opacity-[0.06] lg:right-20" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Några av våra kunder</p>
        <div
          className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-7 sm:gap-x-16 lg:gap-x-20 ${compact ? "mt-8" : "mt-8 sm:mt-10"}`}
        >
          {customerReferences.map((customer) => (
            <img
              key={customer.name}
              src={customer.logo}
              alt={customer.name}
              loading="lazy"
              className="h-7 w-auto max-w-28 object-contain opacity-75 sm:h-8 sm:max-w-36"
            />
          ))}
        </div>
      </div>
      <Wave className="h-8 sm:h-12 lg:h-16" fill="var(--color-background)" />
    </section>
  );
}
