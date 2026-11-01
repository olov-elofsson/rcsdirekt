import { customerReferences } from "@/data/customer-references";

export function CustomerReferences({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-label="Kundreferenser" className="bg-background py-10 sm:py-12">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <h2 className="text-center font-sans text-sm font-medium leading-snug text-muted-foreground">
          Några av våra kunder
        </h2>
        <div
          className={`mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 ${compact ? "" : "sm:mt-6"}`}
        >
          {customerReferences.map((customer) => (
            <div key={customer.name} className="flex h-24 min-w-0 items-center justify-center rounded-md bg-muted px-6 sm:h-28 sm:px-7">
              <img
                src={customer.logo}
                alt={customer.name}
                loading="lazy"
                className="max-h-7 w-full max-w-24 object-contain opacity-60 brightness-0 grayscale mix-blend-multiply sm:max-h-8 sm:max-w-28"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
