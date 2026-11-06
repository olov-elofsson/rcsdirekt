import { Wave } from "@/components/BandWave";
import { rcsCaseExamples } from "@/data/rcs-case-examples";

export function RcsCaseExamples() {
  return (
    <section className="relative overflow-hidden bg-primary-soft py-16 sm:py-24 lg:py-24" aria-labelledby="case-examples-title">
      <Wave flip fill="var(--color-background)" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <h2 id="case-examples-title" className="max-w-3xl text-[2.1rem] font-extrabold leading-tight tracking-normal sm:text-[2.65rem]">RCS hos våra kunder</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">Från kursstart till premiärkväll. Meddelanden som gör nästa steg enkelt.</p>
        <div className="mt-12 grid auto-rows-fr gap-5 sm:grid-cols-2">
          {rcsCaseExamples.map((item) => (
            <article key={item.company} className="home-card flex min-w-0 flex-col rounded-lg border border-border/60 bg-card p-8">
              <div className="flex h-20 items-start border-b border-border/40 pb-6">
                <h3 className="flex h-12 w-full items-center">
                  <span role="img" aria-label={item.company} className="block h-6 w-[120px] max-w-full bg-foreground" style={{ maskImage: `url("${item.logo}")`, WebkitMaskImage: `url("${item.logo}")`, maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "left center" }} />
                </h3>
              </div>
              <p className="mt-7 text-5xl font-bold leading-tight text-logo-blue">{item.metric}</p>
              <p className="mt-1 text-xs text-muted-foreground">Illustrativt exempel</p>
              <p className="mt-2 text-base font-semibold leading-snug text-foreground">{item.benefit}</p>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
