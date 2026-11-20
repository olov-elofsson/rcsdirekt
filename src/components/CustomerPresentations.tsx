import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import dreamcareLogo from "@/assets/company-logos/dreamcare-logo.png.asset.json";

export function CustomerPresentations() {
  return (
    <section aria-labelledby="customer-presentations-title" className="bg-background">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <h2 id="customer-presentations-title" className="text-center text-[2.1rem] font-extrabold leading-tight sm:text-[2.65rem]">Kundcase</h2>
        <article className="home-card mx-auto mt-8 max-w-2xl rounded-lg border border-border bg-card p-6 sm:p-8">
          <img src={dreamcareLogo.url} alt="DreamCare" width={512} height={512} className="mb-3 size-16 object-contain" loading="lazy" />
          <h3 className="text-lg font-extrabold leading-snug sm:text-xl">DreamCare Omsorg AB</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Trygg kontakt med kunder, anhöriga och kollegor. Utforska åtta RCS-exempel för DreamCare, från kundträffar och påminnelser till frågor om hemtjänst.</p>
          <Button asChild size="sm" className="mt-5">
            <Link to="/demo/$slug" params={{ slug: "dreamcare" }}>Se kundcaset <ArrowRight /></Link>
          </Button>
        </article>
      </div>
    </section>
  );
}