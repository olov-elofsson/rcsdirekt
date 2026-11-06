import { ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { rcsCaseExamples } from "@/data/rcs-case-examples";

export function RcsCaseExamples() {
  const [selected, setSelected] = useState<(typeof rcsCaseExamples)[number] | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
  }, [selected]);

  return (
    <section className="bg-primary-soft py-16 sm:py-24 lg:py-28" aria-labelledby="case-examples-title">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <h2 id="case-examples-title" className="max-w-3xl text-[2.1rem] font-extrabold leading-tight tracking-normal sm:text-[2.65rem]">RCS i praktiken</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">Fyra tänkbara sätt att använda RCS. Illustrativa exempel för företagen nedan, inte verifierade kundcase eller uppmätta resultat.</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rcsCaseExamples.map((item) => (
            <article key={item.company} className="flex min-w-0 flex-col rounded-lg border border-border bg-card p-6 sm:p-7">
              <div className="flex min-h-24 flex-col justify-center border-b border-border/60 pb-6">
                <h3 className="text-2xl font-extrabold leading-tight text-foreground">{item.company}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{item.industry}</p>
              </div>
              <p className="mt-7 text-[1.75rem] font-extrabold leading-tight text-logo-blue">{item.benefit}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <Button variant="link" className="mt-7 h-auto justify-start self-start p-0 text-sm text-foreground" onClick={() => setSelected(item)}>
                Se exempel <ArrowRight className="size-4" />
              </Button>
            </article>
          ))}
        </div>
      </div>
      <dialog
        ref={dialogRef}
        aria-labelledby="case-dialog-title"
        aria-describedby="case-dialog-description"
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
        onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-lg border border-border bg-background p-0 text-foreground shadow-lift backdrop:bg-foreground/60"
      >
        <div className="relative p-6">
          <Button variant="ghost" size="icon" aria-label="Stäng exemplet" className="absolute right-2 top-2" onClick={() => setSelected(null)}><X className="size-4" /></Button>
          <h2 id="case-dialog-title" className="pr-8 text-lg font-semibold leading-snug">{selected?.company}: {selected?.benefit}</h2>
          <p id="case-dialog-description" className="mt-2 text-sm text-muted-foreground">Illustrativt RCS-exempel, inte ett verifierat kundcase.</p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{selected?.detail}</p>
        </div>
      </dialog>
    </section>
  );
}