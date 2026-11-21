import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { content } from "@/content";

const customerCases = content.kundcase;

export function CustomerPresentations() {
  return (
    <section aria-labelledby="customer-presentations-title" className="bg-background">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <h2
          id="customer-presentations-title"
          className="text-center text-[2.1rem] font-extrabold leading-tight sm:text-[2.65rem]"
        >
          {content.startsida.kundcaseHeading}
        </h2>
        <div className="mt-8 grid auto-rows-fr gap-5 sm:grid-cols-2">
          {customerCases.map((item) => (
            <article
              key={item.name}
              className="home-card flex min-w-0 flex-col overflow-hidden rounded-lg border border-border/80 bg-card shadow-card"
            >
              {item.image ? (
                <img
                  src={item.image.url}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  className="aspect-[16/10] w-full bg-muted object-cover"
                  loading="lazy"
                />
              ) : null}
              <div className="flex flex-1 flex-col p-8">
                {item.image || !item.logo.url ? null : (
                  <div className="mb-6 flex h-14 items-center">
                    <img
                      src={item.logo.url}
                      alt={item.logo.alt}
                      width={item.logo.width}
                      height={item.logo.height}
                      className="max-h-14 w-auto max-w-[170px] object-contain"
                      loading="lazy"
                    />
                  </div>
                )}
                <h3 className="text-lg font-extrabold leading-snug sm:text-xl">{item.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-5 flex items-center border-t border-border/50 pt-5">
                  {item.slug ? (
                    <Button asChild size="sm" className="home-cta">
                      <Link to="/demo/$slug" params={{ slug: item.slug }}>
                        Se kundcaset <ArrowRight />
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
