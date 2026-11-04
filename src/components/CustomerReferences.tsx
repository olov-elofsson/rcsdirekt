import { Wave } from "@/components/BandWave";
import { customerReferences } from "@/data/customer-references";
import { cn } from "@/lib/utils";

export function CustomerReferences({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-label="Kundreferenser" className={cn("relative overflow-hidden bg-primary-soft", compact ? "py-12 sm:py-14" : "py-14 sm:py-20")}>
      <Wave flip fill="var(--color-background)" className="h-10 sm:h-14 lg:h-20" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-primary">Några referenser</p>
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {customerReferences.map((customer) => (
            <div key={customer.name} className="grid aspect-square place-items-center rounded-xl bg-reference-tile">
              <img src={customer.logo.url} alt={`Logotyp för ${customer.name}`} className="w-[64%] max-w-[10rem] object-contain" loading="lazy" />
            </div>
          ))}
        </div>
        <p className="mx-auto mt-9 max-w-xl text-center text-lg leading-relaxed text-foreground sm:text-xl">
          Används av företag som Nercia, Bilia och Maptun.
        </p>
      </div>
      <Wave fill="var(--color-background)" className="h-10 sm:h-14 lg:h-20" />
    </section>
  );
}
