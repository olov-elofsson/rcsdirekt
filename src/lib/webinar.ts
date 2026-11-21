import { useEffect, useState } from "react";

import { content } from "@/content";
import type { Webinar } from "@/content/types";

const zone = "Europe/Stockholm";
const dayFormat = new Intl.DateTimeFormat("sv-SE", { timeZone: zone, weekday: "long", day: "numeric", month: "long", year: "numeric" });
const shortDayFormat = new Intl.DateTimeFormat("sv-SE", { timeZone: zone, weekday: "short", day: "numeric", month: "short" });
const timeFormat = new Intl.DateTimeFormat("sv-SE", { timeZone: zone, hour: "2-digit", minute: "2-digit" });

export const endsAt = (webinar: Webinar) => Date.parse(webinar.startsAt) + webinar.durationMinutes * 60_000;

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** "Tisdag 13 januari 2027" and "14:00–14:45", in Swedish time. */
export function when(webinar: Webinar) {
  const start = new Date(webinar.startsAt);
  return { day: capitalize(dayFormat.format(start)), time: `${timeFormat.format(start)}–${timeFormat.format(new Date(endsAt(webinar)))}` };
}

/** "tis 13 jan kl. 14:00", for the notice bar. */
export function shortWhen(webinar: Webinar) {
  const start = new Date(webinar.startsAt);
  return `${shortDayFormat.format(start).replace(/\./g, "")} kl. ${timeFormat.format(start)}`;
}

/**
 * The next webinar from the CMS. The build already leaves out webinars that have ended;
 * after hydration the page also skips one that has ended since the build.
 */
export function useNextWebinar(): Webinar | undefined {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);
  return (content.webinarer ?? []).find((item) => now === null || endsAt(item) > now);
}
