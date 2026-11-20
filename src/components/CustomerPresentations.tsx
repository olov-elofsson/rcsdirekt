import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import dreamcareLogo from "@/assets/company-logos/dreamcare-logo.png.asset.json";
import maptunLogo from "@/assets/company-logos/maptun.png.asset.json";
import nerciaLogo from "@/assets/company-logos/nercia.png.asset.json";
import biliaLogo from "@/assets/company-logos/bilia.svg.asset.json";

type CustomerCase = {
  name: string;
  logo: string;
  alt: string;
  width: number;
  height: number;
  description: string;
  slug?: string;
};

const customerCases: CustomerCase[] = [
  {
    name: "DreamCare Omsorg AB",
    logo: dreamcareLogo.url,
    alt: "DreamCare",
    width: 512,
    height: 512,
    description: "Trygg kontakt med kunder, anhöriga och kollegor. Utforska åtta RCS-exempel för DreamCare, från kundträffar och påminnelser till frågor om hemtjänst.",
    slug: "dreamcare",
  },
  {
    name: "Maptun",
    logo: maptunLogo.url,
    alt: "Maptun",
    width: 200,
    height: 34,
    description: "Produktbilder och knappar direkt till rätt tillbehör kan förkorta vägen från intresse till köp. Ett tänkbart upplägg: en karusell med utvalda tillbehör och en knapp till varje produkt.",
  },
  {
    name: "Nercia",
    logo: nerciaLogo.url,
    alt: "Nercia",
    width: 928,
    height: 187,
    description: "Kursinformation och en tydlig bekräftelseknapp kan göra det enklare att tacka ja inför kursstart. Ett tänkbart upplägg: en välkomsthälsning med kursbild, tid och plats.",
  },
  {
    name: "Bilia",
    logo: biliaLogo.url,
    alt: "Bilia",
    width: 99,
    height: 35,
    description: "En inbjudan med bild på nyheten och en anmälningsknapp kan göra det enklare att säga ja till premiärkvällen. Ett tänkbart upplägg: en servicepåminnelse med tid, verkstad och vägbeskrivning.",
  },
];

export function CustomerPresentations() {
  return (
    <section aria-labelledby="customer-presentations-title" className="bg-background">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <h2 id="customer-presentations-title" className="text-center text-[2.1rem] font-extrabold leading-tight sm:text-[2.65rem]">Kundcase</h2>
        <div className="mt-8 grid auto-rows-fr gap-5 sm:grid-cols-2">
          {customerCases.map((item) => (
            <article key={item.name} className="home-card flex min-w-0 flex-col rounded-lg border border-border/80 bg-card p-8 shadow-card">
              <div className="flex h-14 items-center">
                <img src={item.logo} alt={item.alt} width={item.width} height={item.height} className="max-h-14 w-auto max-w-[170px] object-contain" loading="lazy" />
              </div>
              <h3 className="mt-6 text-lg font-extrabold leading-snug sm:text-xl">{item.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <div className="mt-5 flex items-center border-t border-border/50 pt-5">
                {item.slug ? (
                  <Button asChild size="sm" className="home-cta">
                    <Link to="/demo/$slug" params={{ slug: item.slug }}>Se kundcaset <ArrowRight /></Link>
                  </Button>
                ) : (
                  <span className="text-xs text-muted-foreground">Kundcase kommer snart</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
