import { customerReferences } from "@/data/customer-references";

export function CustomerReferences({ compact = false }: { compact?: boolean }) {
  return <section aria-label="Kundreferenser" className="bg-background py-10 sm:py-14"><div className="mx-auto max-w-6xl px-5 lg:px-8"><p className="text-center text-sm font-semibold text-muted-foreground">Några av våra kunder</p><div className={`mt-7 grid grid-cols-2 items-center gap-x-8 gap-y-7 sm:grid-cols-3 lg:grid-cols-6 ${compact ? "" : "sm:mt-9"}`}>{customerReferences.map((customer) => <div key={customer.name} className="flex h-16 min-w-0 items-center justify-center"><img src={customer.logo} alt={customer.name} loading="lazy" className="max-h-12 w-full max-w-36 object-contain grayscale opacity-80" /></div>)}</div></div></section>;
}