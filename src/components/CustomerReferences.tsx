import { customerReferences } from "@/data/customer-references";

export function CustomerReferences({ compact = false }: { compact?: boolean }) {
  const logos = customerReferences;
  const row = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex w-max shrink-0 items-center gap-x-14 pr-14 sm:gap-x-20 sm:pr-20"
    >
      {logos.map((customer) => (
        <div key={customer.name} className="flex h-10 items-center">
          <img
            src={customer.logo}
            alt={customer.name}
            loading="lazy"
            className="h-6 w-auto max-w-32 object-contain opacity-70 sm:h-7 sm:max-w-40"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section aria-label="Kundreferenser" className="bg-muted">
      <div className={`mx-auto max-w-6xl px-5 lg:px-8 ${compact ? "py-7" : "py-9 sm:py-11"}`}>
        <h2 className="text-center text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Några av våra kunder
        </h2>
        <div
          className="group mt-7 overflow-hidden sm:mt-8"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
          }}
        >
          <div className="logo-marquee-track group-hover:[animation-play-state:paused]">
            {row(false)}
            {row(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
