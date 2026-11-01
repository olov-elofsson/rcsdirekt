import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ordlista")({
  beforeLoad: () => { throw redirect({ to: "/blogg", statusCode: 301 }); },
});
