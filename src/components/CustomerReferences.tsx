import { customerReferences } from "@/data/customer-references";

export function CustomerReferences({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-label="Kundreferenser" className="bg-background py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Några av våra kunder
        </p>
        <div
          className={`mt-6 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6 ${compact ? "" : "sm:mt-8"}`}
        >
          {customerReferences.map((customer) => (
            <div key={customer.name} className="flex h-10 min-w-0 items-center justify-center">
              <img
                src={customer.logo}
                alt={customer.name}
                loading="lazy"
                className="max-h-6 w-full max-w-24 object-contain grayscale opacity-55 mix-blend-multiply transition-opacity duration-200 hover:opacity-90 sm:max-h-7 sm:max-w-28"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
