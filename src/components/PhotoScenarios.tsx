import type { CSSProperties } from "react";

import { Wave } from "@/components/BandWave";

import { PhoneIcon, RcsSnippet } from "@/components/RcsPhone";
import { scenarios, type Scenario } from "@/data/rcs-scenarios";
import { cn } from "@/lib/utils";

const order = (index: number) => ({ "--reveal-order": index }) as CSSProperties;

function Message({ sender, message }: { sender: string; message: Scenario["message"] }) {
  return (
    <RcsSnippet width={300} scale={0.9}>
      {/* A dark pill keeps the sender readable on light photos too. */}
      <div
        style={{
          display: "inline-block",
          fontSize: 12.5,
          fontWeight: 500,
          color: "#fff",
          marginBottom: 6,
          padding: "2px 9px",
          borderRadius: 10,
          background: "rgba(31,31,31,.6)",
        }}
      >
        {sender}
      </div>
      {message.kind === "bubble" ? (
        <>
          <div className="inrow">
            <div className="bubble">{message.text}</div>
          </div>
          <div className="chips">
            {message.chips.map((chip) => (
              <div key={chip} className="chip">
                {chip}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="card">
          <div className="ct">{message.title}</div>
          <div className="cb">{message.body}</div>
          <div className="cbtns">
            {message.actions.map((action) => (
              <div key={action.label} className="cbtn">
                {action.icon ? (
                  <span className="ci" style={{ background: "#fff" }}>
                    <PhoneIcon name={action.icon} size={18} />
                  </span>
                ) : null}
                {action.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </RcsSnippet>
  );
}

/** Photos of everyday situations with an RCS message on top, beside a short explanation. */
export function PhotoScenarios() {
  return (
    <section
      id="exempel"
      aria-labelledby="exempel-title"
      className="relative scroll-mt-24 overflow-hidden bg-primary-soft py-16 sm:py-24"
    >
      <Wave flip fill="var(--color-background)" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div data-reveal className="max-w-2xl">
          <h2
            id="exempel-title"
            className="text-[2.1rem] font-extrabold leading-tight sm:text-[2.65rem]"
          >
            Meddelanden som går att svara på
          </h2>
          <p className="mt-5 text-base leading-relaxed text-pretty text-muted-foreground">
            Så kan ett meddelande se ut för några av våra kunder. Fotona kommer från kundcasen, och
            meddelandena är tänkbara upplägg.
          </p>
        </div>
        <div className="mt-12 grid gap-4">
          {scenarios.map((scenario, index) => {
            const flip = index % 2 === 1;
            // One grid per case, so `order` only swaps the photo and the text within its own row.
            return (
              <div key={scenario.customer} className="grid gap-4 lg:grid-cols-3">
                <figure
                  data-reveal
                  style={order(0)}
                  className={cn(
                    "relative min-h-[420px] overflow-hidden rounded-2xl bg-muted lg:col-span-2 lg:min-h-[460px]",
                    flip && "lg:order-2",
                  )}
                >
                  <img
                    src={scenario.photo.src}
                    alt={scenario.photo.alt}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover"
                    style={{ objectPosition: scenario.photo.position }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                    Exempel för {scenario.customer}
                  </span>
                  <figcaption
                    data-reveal
                    style={order(2)}
                    className="absolute bottom-5 left-5 right-5 sm:right-auto"
                  >
                    <Message sender={scenario.customer} message={scenario.message} />
                  </figcaption>
                </figure>
                <div
                  data-reveal
                  style={order(1)}
                  className={cn(
                    "flex flex-col justify-end rounded-2xl bg-card p-7 sm:p-8",
                    flip && "lg:order-1",
                  )}
                >
                  <h3 className="text-2xl font-extrabold leading-tight">{scenario.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-pretty text-muted-foreground">
                    {scenario.copy}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
