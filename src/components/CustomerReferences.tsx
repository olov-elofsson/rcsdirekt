import { customerReferences } from "@/data/customer-references";

export function CustomerReferences({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-label="Kundreferenser" className="bg-muted">
      <div className={`mx-auto grid max-w-6xl items-center gap-7 px-5 lg:grid-cols-[13rem_1fr] lg:gap-12 lg:px-8 ${compact ? "py-7" : "py-8 sm:py-10"}`}>
        <h2 className="text-center text-base font-semibold leading-snug text-muted-foreground lg:text-left">Några av<br className="hidden lg:block" /> våra kunder</h2>
        <div className="grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-4 sm:gap-x-10">
          {customerReferences.map((customer) => (
            <div
              key={customer.name}
              className="flex h-10 min-w-0 items-center justify-center"
            >
              <img
                src={customer.logo}
                alt={customer.name}
                loading="lazy"
                className="max-h-7 w-auto max-w-28 object-contain opacity-70"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
