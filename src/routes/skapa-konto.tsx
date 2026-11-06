import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Check, Github, KeyRound } from "lucide-react";

import { SiteHeader, SiteFooter } from "@/components/SiteLayout";
import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/skapa-konto")({
  head: () => ({
    meta: [
      { title: "Skapa konto och skicka RCS" },
      { name: "description", content: "Skapa ett konto och börja skicka RCS för ert företag. Inga startavgifter, inga månadskostnader. Betala per meddelande." },
      { property: "og:title", content: "Skapa konto och skicka RCS" },
      { property: "og:description", content: "Skapa ett konto och börja skicka RCS för ert företag. Inga startavgifter, inga månadskostnader. Betala per meddelande." },
      { property: "og:type", content: "website" }, { property: "og:url", content: "https://rcsdirekt.se/skapa-konto" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rcsdirekt.se/skapa-konto" }],
  }),
  component: SignupPage,
});

const emailSchema = z.string().trim().email("Ange en giltig e-postadress").max(255);

function GoogleMark() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-5">
      <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.1h6.5c-.1 1.1-.8 2.7-2.4 3.8l-.02.15 3.5 2.7.24.03c2.2-2 3.5-5 3.5-8.6Z" />
      <path fill="#34A853" d="M12 24c3.2 0 5.9-1 7.9-2.9l-3.8-2.9c-1 .7-2.4 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5l-.14.01-3.1 2.4-.04.11C4 21.3 7.7 24 12 24Z" />
      <path fill="#FBBC05" d="M5.3 14.4c-.24-.7-.38-1.5-.38-2.4s.14-1.7.36-2.4l-.01-.16-3.14-2.4-.1.05A12 12 0 0 0 0 12c0 1.9.5 3.7 1.3 5.3l4-2.9Z" />
      <path fill="#EA4335" d="M12 4.6c2.3 0 3.8 1 4.7 1.8l3.4-3.3C18 1.2 15.2 0 12 0 7.7 0 4 2.7 2 6.7l3.3 2.6c.9-2.9 3.6-4.7 6.7-4.7Z" />
    </svg>
  );
}

function SignupPage() {
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Ange en giltig e-postadress");
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1">
        <PageHeading title={sent ? "Tack för din registrering!" : "Skapa ditt konto"} description={sent ? <p>Vi hör av oss inom kort med nästa steg för att aktivera ditt konto.</p> : <p>Har du redan ett konto? <a href="https://portal.rcsdirekt.se/login" className="font-semibold text-primary underline underline-offset-4">Logga in</a></p>}>
          {sent ? (
              <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary-soft ring-1 ring-border/60"><Check className="size-5" /></span>
          ) : null}
        </PageHeading>
        {!sent ? <section className="px-5 py-16 sm:py-24 lg:px-8"><div className="mx-auto w-full max-w-md">
            <>
              <form noValidate onSubmit={onSubmit} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="email">E-post</Label>
                  <Input id="email" name="email" type="email" autoComplete="email" placeholder="namn@foretag.se" className="h-12 rounded-full bg-background px-5" aria-invalid={!!error} />
                  {error ? <p className="text-xs font-semibold text-destructive">{error}</p> : null}
                </div>
                <Button type="submit" size="lg" className="w-full">Fortsätt</Button>
              </form>

              <div className="my-7 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="h-px flex-1 bg-border" />eller<span className="h-px flex-1 bg-border" />
              </div>

              <div className="space-y-3">
                <Button type="button" variant="outline" size="lg" className="w-full justify-center gap-3"><GoogleMark />Fortsätt med Google</Button>
                <Button type="button" variant="outline" size="lg" className="w-full justify-center gap-3"><Github className="size-5" />Fortsätt med GitHub</Button>
                <Button type="button" variant="outline" size="lg" className="w-full justify-center gap-3"><KeyRound className="size-5" />Fortsätt med SSO</Button>
              </div>

              <p className="mt-7 text-center text-xs leading-relaxed text-muted-foreground">Inga månadskostnader, inga startavgifter och inga bindningstider.</p>
            </>
        </div></section> : null}
      </main>

      <SiteFooter />
    </div>
  );
}
