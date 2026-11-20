import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import dreamcareLogo from "@/assets/company-logos/dreamcare-logo.png.asset.json";

export function CustomerPresentations() {
  return (
    <section aria-labelledby="customer-presentations-title" className="bg-background">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <h2 id="customer-presentations-title" className="text-center text-[2.1rem] font-extrabold leading-tight sm:text-[2.65rem]">Kundcase</h2>
        <article className="home-card mx-auto mt-10 grid max-w-3xl gap-6 rounded-lg border border-border bg-card p-8 sm:grid-cols-[1fr_auto] sm:items-center sm:p-10">
          <div className="min-w-0">
            <img src={dreamcareLogo.url} alt="DreamCare" width={512} height={512} className="mb-4 size-24 object-contain" loading="lazy" />
            <h3 className="text-xl font-extrabold leading-snug sm:text-2xl">DreamCare Omsorg AB</h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">Trygg kontakt med kunder, anhöriga och kollegor. Utforska åtta RCS-exempel för DreamCare, från kundträffar och påminnelser till frågor om hemtjänst.</p>
          </div>
          <Button asChild className="justify-self-start">
            <Link to="/demo/$slug" params={{ slug: "dreamcare" }}>Se kundcaset <ArrowRight /></Link>
          </Button>
        </article>
      </div>
    </section>
  );
}