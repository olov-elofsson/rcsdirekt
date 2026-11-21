import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { type ReactNode } from "react";

import { ArrowRight } from "lucide-react";

import { PageHeading } from "@/components/PageHeading";
import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <PageHeading title="Sidan finns inte" description={<p>Sidan du letar efter finns inte eller har flyttats.</p>}>
          <Button asChild size="lg">
            <Link to="/">Till startsidan <ArrowRight data-icon="end" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/blogg">Läs om RCS</Link>
          </Button>
        </PageHeading>
      </main>
      <SiteFooter />
    </div>
  );
}

/* Kept free of the site layout, in case the layout itself is what failed. */
function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 text-foreground">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-extrabold leading-tight">Sidan kunde inte laddas</h1>
        <p className="mt-3 text-pretty text-muted-foreground">
          Något gick fel hos oss. Försök igen eller gå till startsidan.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Försök igen
          </Button>
          <Button asChild variant="outline">
            <a href="/">Till startsidan</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "RCS Direkt" },
      { name: "description", content: "RCS Business Messaging för svenska företag." },
      { property: "og:title", content: "RCS Direkt" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Hind:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
