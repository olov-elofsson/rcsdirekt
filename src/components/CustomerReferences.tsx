import { customerReferences } from "@/data/customer-references";

export function CustomerReferences({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-label="Kundreferenser" className="bg-background py-10 sm:py-12">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <h2 className="text-center font-sans text-sm font-medium leading-snug text-muted-foreground">
          Några av våra kunder
        </h2>
        <div
          className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14 sm:gap-y-6 ${compact ? "mt-5" : "mt-6 sm:mt-7"}`}
        >
          {customerReferences.map((customer) => (
            <img
              key={customer.name}
              src={customer.logo}
              alt={customer.name}
              loading="lazy"
              className="h-6 w-auto max-w-28 object-contain opacity-60 sm:h-7 sm:max-w-32"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
