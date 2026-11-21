import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock } from "lucide-react";

import { FormDialog } from "@/components/FormDialog";
import { LeadForm } from "@/components/LeadForm";
import { Button } from "@/components/ui/button";
import { content } from "@/content";
import type { Webinar } from "@/content/types";

const zone = "Europe/Stockholm";
const dayFormat = new Intl.DateTimeFormat("sv-SE", { timeZone: zone, weekday: "long", day: "numeric", month: "long", year: "numeric" });
const timeFormat = new Intl.DateTimeFormat("sv-SE", { timeZone: zone, hour: "2-digit", minute: "2-digit" });
const dayNumber = new Intl.DateTimeFormat("sv-SE", { timeZone: zone, day: "numeric" });
const monthShort = new Intl.DateTimeFormat("sv-SE", { timeZone: zone, month: "short" });

const endsAt = (webinar: Webinar) => Date.parse(webinar.startsAt) + webinar.durationMinutes * 60_000;

function when(webinar: Webinar) {
  const start = new Date(webinar.startsAt);
  const end = new Date(endsAt(webinar));
  const day = dayFormat.format(start);
  return { day: day.charAt(0).toUpperCase() + day.slice(1), time: `${timeFormat.format(start)}–${timeFormat.format(end)}` };
}

/**
 * The next webinar from the CMS. The build already leaves out webinars that have ended;
 * after hydration the page also skips one that has ended since the build.
 */
export function UpcomingWebinar() {
  const webinars = content.webinarer ?? [];
  const [now, setNow] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => setNow(Date.now()), []);

  const webinar = webinars.find((item) => now === null || endsAt(item) > now);
  if (!webinar) return null;
  const { day, time } = when(webinar);
  const start = new Date(webinar.startsAt);
  const subject = `${webinar.title}, ${day} ${time}`;

  return (
    <section id="webinar" aria-labelledby="webinar-title" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <div className="home-card flex flex-col gap-6 rounded-lg bg-card p-7 shadow-card sm:flex-row sm:items-center sm:gap-8 sm:p-8">
          <time dateTime={webinar.startsAt} aria-hidden className="grid size-20 shrink-0 place-content-center rounded-lg bg-primary-soft text-center">
            <span className="font-display text-3xl font-extrabold leading-none tabular-nums">{dayNumber.format(start)}</span>
            <span className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">{monthShort.format(start).replace(".", "")}</span>
          </time>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-logo-blue">Kommande webinar</p>
            <h2 id="webinar-title" className="mt-2 text-2xl font-extrabold leading-tight sm:text-[1.75rem]">{webinar.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">{webinar.description}</p>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm font-semibold">
              <span className="inline-flex items-center gap-1.5"><CalendarDays aria-hidden className="size-4 text-muted-foreground" />{day}</span>
              <span className="inline-flex items-center gap-1.5 tabular-nums"><Clock aria-hidden className="size-4 text-muted-foreground" />{time}</span>
            </p>
          </div>
          {webinar.registrationUrl ? (
            <Button asChild size="lg" className="shrink-0 self-start sm:self-center">
              <a href={webinar.registrationUrl} target="_blank" rel="noreferrer">Anmäl dig <ArrowUpRight data-icon="end" /></a>
            </Button>
          ) : (
            <Button type="button" size="lg" className="shrink-0 self-start sm:self-center" onClick={() => setOpen(true)}>
              Anmäl dig <ArrowRight data-icon="end" />
            </Button>
          )}
        </div>
      </div>
      {open ? (
        <FormDialog title={webinar.title} description={<p>{day}, {time}. Vi skickar länken till din e-post.</p>} onClose={close}>
          <LeadForm mode="webinar" webinar={subject} compact />
        </FormDialog>
      ) : null}
    </section>
  );
}
