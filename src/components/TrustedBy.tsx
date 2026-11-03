import { customerReferences } from "@/data/customer-references";

export function TrustedBy() {
  return (
    <section aria-label="Kunder som använder RCS Direkt" className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-12 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
          Trusted by
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16">
          {customerReferences.map((customer) => (
            <img
              key={customer.name}
              src={customer.logo.url}
              alt={`Logotyp för ${customer.name}`}
              className="h-6 w-auto object-contain opacity-80 sm:h-7"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
