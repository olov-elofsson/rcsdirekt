import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/demo/$slug")({
  head: () => ({
    meta: [
      { title: "RCS Direkt" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DemoPresentation,
});

function DemoPresentation() {
  const { slug } = Route.useParams();

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlOverflow: html.style.overflow,
      htmlMargin: html.style.margin,
      bodyOverflow: body.style.overflow,
      bodyMargin: body.style.margin,
    };
    html.style.overflow = "hidden";
    html.style.margin = "0";
    body.style.overflow = "hidden";
    body.style.margin = "0";
    return () => {
      html.style.overflow = prev.htmlOverflow;
      html.style.margin = prev.htmlMargin;
      body.style.overflow = prev.bodyOverflow;
      body.style.margin = prev.bodyMargin;
    };
  }, []);

  return (
    <iframe
      title="RCS Direkt presentation"
      src={`https://rcs-saljverktyg.augin-d18.workers.dev/p/${slug}`}
      allow="clipboard-write"
      className="fixed inset-0 h-dvh w-screen border-0"
    />
  );
}
