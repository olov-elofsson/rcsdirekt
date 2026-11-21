import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { PageHeading } from "@/components/PageHeading";
import { RcsVideoGenerator } from "@/components/rcs-video/RcsVideoGenerator";

const title = "Video till RCS-ansökan";
const description =
  "För att lansera en RCS-avsändare krävs en video av hela mottagarupplevelsen, inklusive samtycke, avregistrering och HJÄLP, på en offentlig länk. Fyll i avsändaren, så skapas både videon och texterna till ansökan.";

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
        <PageHeading title={title} description={<p>{description}</p>} />
        <section className="bg-background py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <RcsVideoGenerator />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
