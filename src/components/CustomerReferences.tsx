import { customerReferences } from "@/data/customer-references";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle, ShieldCheck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CustomerReferences({ compact = false, showTrust = false }: { compact?: boolean; showTrust?: boolean }) {
  return (
    <section aria-label="Kundreferenser" className="bg-background">
      <div className={`mx-auto max-w-5xl px-5 lg:px-8 ${compact ? "py-8" : "pt-5 pb-10 sm:pb-12"}`}>
        <p className="text-center text-sm font-medium text-muted-foreground">Några av våra kunder</p>
        <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 items-center gap-x-8 gap-y-7 sm:mt-7 sm:grid-cols-4 sm:gap-x-12">
          {customerReferences.map((customer) => (
            <div
              key={customer.name}
              className="flex h-10 items-center justify-center"
            >
              <img
                src={customer.logo}
                alt={customer.name}
                loading="lazy"
                className="max-h-7 w-auto max-w-28 object-contain opacity-70 sm:max-h-8 sm:max-w-32"
              />
            </div>
          ))}
        </div>
      </div>
      {showTrust && <div className="bg-muted">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-7 sm:grid-cols-3 sm:gap-8 sm:py-8 lg:px-8">
          <TrustItem icon={Wallet} title="Tydliga priser" copy="Betala per meddelande. Inga månadskostnader." href="/#pris" label="Se priser" />
          <TrustItem icon={MessageCircle} title="Personlig kontakt" copy="Prata med oss om ert nästa RCS-utskick." href="/kontakt" label="Kontakta oss" />
          <TrustItem icon={ShieldCheck} title="Verifierad avsändare" copy="Företagsnamn och logotyp visar vem som skickar." href="/blogg/verifierad-avsandare" label="Om verifiering" article />
        </div>
      </div>}
    </section>
  );
}

function TrustItem({ icon: Icon, title, copy, href, label, article = false }: { icon: typeof Wallet; title: string; copy: string; href: string; label: string; article?: boolean }) {
  return <div className="flex items-start gap-3">
    <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary/70" strokeWidth={1.5} />
    <div className="min-w-0">
      <h3 className="text-sm font-bold">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{copy}</p>
      <Button asChild variant="link" className="mt-1 h-auto p-0 text-xs font-semibold">
        {article ? <Link to="/blogg/$slug" params={{ slug: "verifierad-avsandare" }}>{label}<ArrowUpRight className="size-3.5" /></Link> : <a href={href}>{label}<ArrowUpRight className="size-3.5" /></a>}
      </Button>
    </div>
  </div>;
}
