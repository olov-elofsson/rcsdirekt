import { customerReferences } from "@/data/customer-references";
import { Wave } from "@/components/BandWave";

export function CustomerReferences({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-label="Kundreferenser" className="relative overflow-hidden bg-primary-soft py-16 sm:py-20">
      <Wave flip className="h-10 sm:h-14 lg:h-20" fill="var(--color-background)" />
      <div aria-hidden className="deco-dots pointer-events-none absolute left-8 top-16 h-48 w-48 opacity-[0.08] lg:left-16" />
      <div aria-hidden className="deco-dots pointer-events-none absolute bottom-16 right-8 h-48 w-48 opacity-[0.08] lg:right-16" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <p className="text-center font-sans text-sm font-medium text-muted-foreground">Några av våra kunder</p>
        <div
          className={`flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16 ${compact ? "mt-7" : "mt-7 sm:mt-8"}`}
        >
          {customerReferences.map((customer) => (
            <img
              key={customer.name}
              src={customer.logo}
              alt={customer.name}
              loading="lazy"
              className="h-6 w-auto max-w-28 object-contain opacity-70 sm:h-8 sm:max-w-32"
            />
          ))}
        </div>
      </div>
      <Wave className="h-10 sm:h-14 lg:h-20" fill="var(--color-background)" />
    </section>
  );
}
