import { cn } from "@/lib/utils";

/** A short label above a section heading, with a blue line before it, as on larger company sites. */
export function SectionEyebrow({ children, onDark = false }: { children: string; onDark?: boolean }) {
  return (
    <p className={cn("mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.14em] uppercase", onDark ? "text-ink-muted" : "text-muted-foreground")}>
      <span aria-hidden className="h-0.5 w-6 rounded-full bg-logo-blue" />
      {children}
    </p>
  );
}
