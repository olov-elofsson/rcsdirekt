import { createFileRoute } from "@tanstack/react-router";

import { startsida } from "@/content/startsida";
import { webinarer } from "@/content/webinarer";
import { organizationSchema } from "@/lib/company";
import { endsAt } from "@/lib/webinar";
import { HomePage } from "@/pages/HomePage";

const home = startsida;

/** Event markup for the next webinar, so search engines can show it as an online event. */
function webinarSchema() {
  // The server runs for days after a build, so skip a webinar that has ended since.
  const webinar = (webinarer ?? []).find((item) => endsAt(item) > Date.now());
  if (!webinar) return [];
  const end = new Date(endsAt(webinar)).toISOString();
  const event = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: webinar.title,
    description: webinar.description,
    startDate: webinar.startsAt,
    endDate: end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: { "@type": "VirtualLocation", url: webinar.registrationUrl || "https://rcsdirekt.se/" },
    organizer: { "@type": "Organization", name: "rcsdirekt.se", url: "https://rcsdirekt.se/" },
    inLanguage: "sv-SE",
  };
  return [{ type: "application/ld+json", children: JSON.stringify(event) }];
}

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: home.seo.title },
    { name: "description", content: home.seo.description },
    { property: "og:title", content: home.seo.title },
    { property: "og:description", content: home.seo.description },
    { property: "og:type", content: "website" }, { property: "og:url", content: "https://rcsdirekt.se/" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  links: [{ rel: "canonical", href: "https://rcsdirekt.se/" }],
  scripts: [
    { type: "application/ld+json", children: JSON.stringify({ ...organizationSchema, description: home.seo.description }) },
    { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: "rcsdirekt.se", url: "https://rcsdirekt.se/", inLanguage: "sv-SE" }) },
    ...webinarSchema(),
  ],
  }),
  component: HomePage,
});

