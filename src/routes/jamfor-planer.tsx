import { createFileRoute, redirect } from "@tanstack/react-router";

// The old comparison page was removed; message types live on their own pages.
// Keep the published URL working with a redirect instead of a 404.
export const Route = createFileRoute("/jamfor-planer")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
