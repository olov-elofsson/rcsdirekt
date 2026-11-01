import { customerReferences } from "@/data/customer-references";

export function CustomerReferences({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-label="Kundreferenser" className="bg-muted py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <h2 className="text-center text-lg leading-snug text-foreground sm:text-xl">
          Några av våra kunder
        </h2>
        <div
          className={`mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 ${compact ? "" : "sm:mt-8"}`}
        >
          {customerReferences.map((customer) => (
            <div key={customer.name} className="flex aspect-[4/3] min-w-0 items-center justify-center rounded-lg bg-primary-soft px-6 sm:px-7">
              <img
                src={customer.logo}
                alt={customer.name}
                loading="lazy"
                className="max-h-8 w-full max-w-28 object-contain grayscale mix-blend-multiply sm:max-h-9 sm:max-w-32"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
