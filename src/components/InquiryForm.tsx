import { useId, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { inquirySchema, type InquiryType } from "@/lib/inquiries/schema";
import { useT } from "@/lib/i18n";

type Status = "idle" | "sending" | "sent" | "failed";

/** `webinar` is the sign-up's subject (the webinar's name and time), sent as the message. */
export function InquiryForm({ mode, defaultMessage, webinar, compact = false }: { mode: InquiryType; defaultMessage?: string; webinar?: string; compact?: boolean }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const { t, lp, locale } = useT();
  const signup = mode === "signup";
  const webinarSignup = mode === "webinar";
  // Unique ids, so several forms can be on the same page (the contact section and the demo dialog).
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = inquirySchema(mode).safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      // Move focus to the first field with an error so it is read out and visible.
      const first = Object.keys(next)[0];
      if (first) document.getElementById(fid(first))?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, type: mode, ...(locale === "en" ? { message: `[English site] ${String(data["message"] ?? "")}` } : {}) }),
      });
      setStatus(response.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className={compact ? "py-4 text-center" : "rounded-lg bg-card p-8 text-center shadow-card sm:p-10"}>
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary-soft ring-1 ring-border/60"><Check aria-hidden className="size-5" /></span>
        <h2 className="mt-5 text-2xl font-extrabold tracking-normal">{t(webinarSignup ? "Du är anmäld!" : signup ? "Tack för din registrering!" : "Tack för ditt meddelande!")}</h2>
        <p className="mt-3 text-pretty text-muted-foreground">{t(webinarSignup ? "Vi skickar länken till webinaret till din e-post innan det börjar." : signup ? "Vi hör av oss inom kort med nästa steg för att aktivera ditt konto." : "Vi återkommer så snart vi kan.")}</p>
      </div>
    );
  }

  const errorId = (name: string) => `${fid(name)}-error`;
  const fieldError = (name: string) =>
    errors[name] ? <p id={errorId(name)} className="text-xs font-semibold text-destructive">{t(errors[name])}</p> : null;

  const field = (name: string, label: string, props: React.ComponentProps<typeof Input> = {}) => (
    <div className="min-w-0 space-y-2">
      <Label htmlFor={fid(name)}>{t(label)}</Label>
      <Input
        id={fid(name)}
        name={name}
        className="h-12 rounded-full bg-background px-5"
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? errorId(name) : undefined}
        {...props}
      />
      {fieldError(name)}
    </div>
  );

  return (
    <form noValidate onSubmit={onSubmit} className={compact ? "relative space-y-5" : "relative space-y-5 rounded-lg bg-card p-5 shadow-card sm:p-9"}>
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "Namn", { autoComplete: "name" })}
        {field("company", signup ? "Företag" : "Företag (valfritt)", { autoComplete: "organization" })}
        {field("email", "E-post", { type: "email", autoComplete: "email" })}
        {field("phone", "Telefon (valfritt)", { type: "tel", autoComplete: "tel" })}
      </div>
      {webinarSignup ? <input type="hidden" name="message" value={`Anmälan till webinar: ${webinar ?? ""}`} /> : <div className="min-w-0 space-y-2">
        <Label htmlFor={fid("message")}>{t(signup ? "Vad vill ni skicka? (valfritt)" : "Meddelande")}</Label>
        <Textarea
          id={fid("message")}
          name="message"
          rows={4}
          defaultValue={defaultMessage}
          className="rounded-[1.5rem] bg-background px-5 py-4"
          aria-invalid={!!errors["message"]}
          aria-describedby={errors["message"] ? errorId("message") : undefined}
        />
        {fieldError("message")}
      </div>}
      {/* Hidden from people; bots that fill in every field give themselves away. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor={fid("website")}>Webbplats</label>
        <input id={fid("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {signup ? (
        <div>
          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <input
              id={fid("terms")}
              type="checkbox"
              name="terms"
              className="mt-0.5 size-4 shrink-0 accent-primary"
              aria-invalid={!!errors["terms"]}
              aria-describedby={errors["terms"] ? errorId("terms") : undefined}
            />
            <span>{t("Jag har läst och godkänner")} <Link to={lp("/villkor")} target="_blank" className="font-semibold text-foreground underline underline-offset-4 hover:text-logo-blue">{t("villkoren")}</Link>.</span>
          </label>
          <div className="mt-1">{fieldError("terms")}</div>
        </div>
      ) : null}
      <p className="text-xs leading-relaxed text-pretty text-muted-foreground">
        {t("Vi behandlar dina uppgifter enligt vår")} <Link to={lp("/integritetspolicy")} target="_blank" className="font-semibold text-foreground underline underline-offset-4 hover:text-logo-blue">{t("integritetspolicy")}</Link>.
      </p>
      {status === "failed" ? (
        <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
          {t("Det gick inte att skicka just nu. Försök igen om en stund.")}
        </p>
      ) : null}
      <Button type="submit" size="lg" className="w-full" disabled={status === "sending"} aria-busy={status === "sending"}>
        {t(status === "sending" ? "Skickar…" : webinarSignup ? "Anmäl mig" : signup ? "Skapa konto" : "Skicka meddelande")}
      </Button>
    </form>
  );
}
