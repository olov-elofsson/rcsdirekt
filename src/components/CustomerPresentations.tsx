import { Link } from "@tanstack/react-router";

import symbolUrl from "../../brand/SVG/symbol.svg";
import { ArrowRight } from "lucide-react";
import { Wave } from "@/components/BandWave";
import { Button } from "@/components/ui/button";
import { content } from "@/content";

const customerCases = content.kundcase;

export function CustomerPresentations() {
  return (
    <section id="kundcase" aria-labelledby="customer-presentations-title" className="relative scroll-mt-24 overflow-hidden bg-primary-soft py-16 sm:py-24">
      <Wave flip fill="var(--color-background)" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <h2
          id="customer-presentations-title"
          className="text-center text-[2.1rem] font-extrabold leading-tight sm:text-[2.65rem]"
        >
          {content.startsida.kundcaseHeading}
        </h2>
        <div className="mt-12 grid auto-rows-fr gap-5 sm:grid-cols-2">
          {customerCases.map((item) => (
            <article
              key={item.name}
              className="home-card flex min-w-0 flex-col overflow-hidden rounded-lg bg-card shadow-card"
            >
              {item.image ? (
                <img
                  src={item.image.url}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  className="aspect-[16/10] w-full bg-muted object-cover outline outline-1 -outline-offset-1 outline-black/10"
                  loading="lazy"
                />
              ) : (
                // Until the case has a photo: a quiet brand surface in the same format, never the logo.
                <div aria-hidden className="grid aspect-[16/10] w-full place-items-center bg-primary-soft">
                  <img src={symbolUrl} alt="" className="size-14 opacity-20" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-8">
                <h3 className="text-lg font-extrabold leading-snug sm:text-xl">{item.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-5 flex items-center border-t border-border/50 pt-5">
                  {item.slug ? (
                    <Button asChild size="sm" className="home-cta">
                      <Link to="/demo/$slug" params={{ slug: item.slug }}>
                        Se kundcaset <ArrowRight data-icon="end" />
                      </Link>
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">Kundcase kommer snart</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
