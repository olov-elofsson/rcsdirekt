import { cn } from "@/lib/utils";

export function Wave({ fill, flip = false, className }: { fill: string; flip?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-x-0 z-0 h-14 w-full sm:h-20 lg:h-28", flip ? "-top-px rotate-180" : "-bottom-px", className)}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
    >
      <path d="M0 62 C240 12 480 6 720 38 C960 70 1200 110 1440 54 L1440 120 L0 120 Z" fill={fill} />
    </svg>
  );
}
