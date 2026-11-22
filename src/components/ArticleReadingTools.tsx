import { Check, Link2 } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/** A thin bar at the top of the window that fills as the article is read. Moves only by transform. */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const article = document.querySelector("article");
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1">
      <div className="h-full origin-left bg-logo-blue" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

/** The id of the section currently being read, for the table of contents. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((element): element is HTMLElement => Boolean(element));
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids.join(",")]);
  return active;
}

/** Copies the article's address; the icon cross-fades to a check for a moment. */
export function CopyLink({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);
  const icon = "absolute inset-0 m-auto size-4 transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-opacity";
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(window.location.href).then(() => setCopied(true), () => undefined);
      }}
      className={cn("inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-muted-foreground ring-1 ring-border transition-colors duration-150 hover:text-foreground active:scale-[0.97]", className)}
    >
      <span className="relative size-4">
        <Link2 aria-hidden className={cn(icon, copied ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0")} />
        <Check aria-hidden className={cn(icon, copied ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]")} />
      </span>
      <span aria-live="polite">{copied ? "Länken är kopierad" : "Kopiera länk"}</span>
    </button>
  );
}
