import { Link } from "@tanstack/react-router";
import { ArrowRight, RadioTower } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CustomerExamples } from "@/components/CustomerExamples";
import { CtaBox, Difference, Entrances, Plans, Steps } from "@/components/HomeRows";
import { FaqSection } from "@/components/HomepageSections";
import { useReveal } from "@/hooks/use-reveal";
import { startsida } from "@/content/startsida";

// The start page; the route adds the head.

// Every section continues the hero and the entrance cards: a short heading and bordered cards
// with a line icon and one blue link. Then questions and a closing box.
export function HomePage() {
  const revealReady = useReveal();
  return <div className={cn("home-refined min-h-screen bg-background text-foreground", revealReady && "reveal-ready")}><SiteHeader /><main id="innehall" tabIndex={-1} className="outline-none"><HeroFirst /><Entrances /><Difference /><CustomerExamples /><Steps /><Plans /><FaqSection /><CtaBox /></main><SiteFooter /></div>;
}

// -0.05em: Archivo has about 0.07em of space before straight capitals, the body text far less,
// so a left-aligned heading would look indented next to the text under it.



/** The news article the line above the heading leads to. */
const NEWS_SLUG = "svenska-operatorer-oppnar-rcs-pa-iphone";

function HeroFirst() {
  const home = startsida;
  const labelLink = "group -my-2 inline-flex min-h-10 items-center gap-2 rounded-full bg-ink-foreground/10 px-3.5 text-[13px] font-semibold sm:text-sm text-ink-foreground transition-colors duration-150 hover:bg-ink-foreground/15";
  return (
    // Marin, centred, with one action, as Fortnox's hero; pulled up under the floating header.
    <section id="top" className="-mt-[4.75rem] bg-ink text-ink-foreground">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 pt-36 pb-20 text-center sm:pt-44 sm:pb-28 lg:px-8">
        {/* One line on where RCS stands, leading to the article with each operator's status. */}
        <p className="mb-7">
          <Link to="/blogg/$slug" params={{ slug: NEWS_SLUG }} className={labelLink}>
            <RadioTower aria-hidden strokeWidth={2} className="size-4 text-logo-blue" />
            Tele2 och Comviq har öppnat RCS för iPhone
            <ArrowRight aria-hidden className="hidden size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 sm:block" />
          </Link>
        </p>
        <h1 className="text-[2.5rem] font-extrabold leading-[1.05] text-balance text-ink-foreground sm:text-6xl lg:text-[4.25rem]">
          {home.hero.title} <span className="sm:block">{home.hero.highlight}</span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-pretty text-ink-muted sm:text-xl">{home.hero.description}</p>
        <div className="mt-10 flex justify-center"><Button className="home-cta border-transparent" asChild size="lg" variant="outline"><Link to="/skapa-konto">Skapa konto</Link></Button></div>
      </div>
    </section>
  );
}




