import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { RcsVideoGenerator } from "@/components/rcs-video/RcsVideoGenerator";

const title = "Skapa en RCS-demovideo";
const description =
  "Fyll i avsändare, logotyp, banner och ett exempelflöde. Förhandsvisa och exportera en simulerad Google Messages-video i 1080 × 1920.";

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
              Bygg en avsändarprofil och ett exempelflöde, förhandsvisa direkt och ladda ned en MP4 till er RCS-ansökan. Allt sker i
              webbläsaren – inga bilder eller texter laddas upp.
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
