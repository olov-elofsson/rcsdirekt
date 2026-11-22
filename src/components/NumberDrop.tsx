import { cn } from "@/lib/utils";

/**
 * A number in the logo's drop: a circle with one square corner. Numbered steps and lists on the
 * site always use this, never bare figures. `tone="light"` is white on Marin; the default is navy
 * on a light surface.
 */
export function NumberDrop({ n, tone = "ink", className }: { n: number; tone?: "ink" | "light"; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid size-10 shrink-0 place-items-center rounded-[50%_50%_50%_0] font-display text-base font-extrabold tabular-nums",
        tone === "light" ? "bg-ink-foreground text-ink" : "bg-ink text-ink-foreground",
        className,
      )}
    >
      {n}
    </span>
  );
}
