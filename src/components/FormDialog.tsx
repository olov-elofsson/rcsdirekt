import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

/** A plain React-controlled modal (role="dialog", aria-modal) for the site's short forms. */
export function FormDialog({ title, description, onClose, children }: { title: string; description: ReactNode; onClose: () => void; children: ReactNode }) {
  const { t } = useT();
  const dialogRef = useRef<HTMLElement>(null);
  const id = useId();
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>("form input:not([tabindex='-1']):not([type='hidden'])")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialog) return;
      // Keep keyboard focus inside the dialog while it is open.
      const focusable = [...dialog.querySelectorAll<HTMLElement>("button, input, textarea, a[href]")].filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1 && el.getAttribute("type") !== "hidden");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-foreground/70 p-5 animate-opacity-in" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`} className="relative w-full max-w-lg rounded-lg bg-background p-7 text-left text-foreground shadow-lift animate-scale-in">
        <Button type="button" variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose} aria-label={t("Stäng")}><X /></Button>
        <h2 id={`${id}-title`} className="pr-12 text-xl font-bold">{title}</h2>
        <div id={`${id}-description`} className="mt-2 text-sm text-pretty text-muted-foreground">{description}</div>
        <div className="mt-6">{children}</div>
      </section>
    </div>
  );
}
