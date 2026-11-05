import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { RcsVideoGenerator } from "@/components/rcs-video/RcsVideoGenerator";

const title = "Sender launch video URL";
const description =
  "Link to the video recording of the sender's use case(s). Video recording should demonstrate the full user experience including opt-in and opt-out capabilities, and HELP messages, if required by local regulations. The URL must be publicly accessible.";

export const Route = createFileRoute("/video-generator")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rcsdirekt.se/video-generator" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/video-generator" }],
  }),
  component: VideoGeneratorPage,
});

function VideoGeneratorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-primary-soft pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.02] sm:text-6xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </section>
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <RcsVideoGenerator />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
