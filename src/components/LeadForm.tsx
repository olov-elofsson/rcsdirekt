import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const base = {
  name: z.string().trim().min(1, "Fyll i ditt namn").max(100),
  company: z.string().trim().max(120),
  email: z.string().trim().email("Ange en giltig e-postadress").max(255),
  phone: z.string().trim().max(30).regex(/^[+\d\s-]*$/, "Ange ett giltigt telefonnummer"),
  message: z.string().trim().max(1000),
};

type Mode = "contact" | "signup";

export function LeadForm({ mode }: { mode: Mode }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const signup = mode === "signup";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const schema = z.object({
      ...base,
      company: signup ? base.company.min(1, "Fyll i företagsnamn") : base.company,
      message: signup ? base.message : base.message.min(1, "Skriv ett meddelande"),
      terms: signup ? z.literal("on", { errorMap: () => ({ message: "Godkänn villkoren" }) }) : z.any(),
    });
    const result = schema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center shadow-card sm:p-10">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary-soft ring-1 ring-border/60"><Check className="size-5" /></span>
        <h2 className="mt-5 text-2xl font-extrabold tracking-normal">{signup ? "Tack för din registrering!" : "Tack för ditt meddelande!"}</h2>
        <p className="mt-3 text-muted-foreground">{signup ? "Vi hör av oss inom kort med nästa steg för att aktivera ditt konto." : "Vi återkommer så snart vi kan."}</p>
      </div>
    );
  }

  const field = (name: string, label: string, props: React.ComponentProps<typeof Input> = {}) => (
    <div className="min-w-0 space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} className="h-12 rounded-md bg-background" aria-invalid={!!errors[name]} {...props} />
      {errors[name] ? <p className="text-xs font-semibold text-destructive">{errors[name]}</p> : null}
    </div>
  );

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5 rounded-lg border border-border bg-card p-7 shadow-card sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "Namn", { autoComplete: "name" })}
        {field("company", signup ? "Företag" : "Företag (valfritt)", { autoComplete: "organization" })}
        {field("email", "E-post", { type: "email", autoComplete: "email" })}
        {field("phone", "Telefon (valfritt)", { type: "tel", autoComplete: "tel" })}
      </div>
      <div className="min-w-0 space-y-2">
        <Label htmlFor="message">{signup ? "Vad vill ni skicka? (valfritt)" : "Meddelande"}</Label>
        <Textarea id="message" name="message" rows={4} className="rounded-md bg-background" aria-invalid={!!errors['message']} />
        {errors['message'] ? <p className="text-xs font-semibold text-destructive">{errors['message']}</p> : null}
      </div>
      {signup ? (
        <div>
          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <input type="checkbox" name="terms" className="mt-0.5 size-4 shrink-0 accent-primary" />
            Jag godkänner villkoren och att RCS Direkt kontaktar mig om kontot.
          </label>
          {errors['terms'] ? <p className="mt-1 text-xs font-semibold text-destructive">{errors['terms']}</p> : null}
        </div>
      ) : null}
      <Button type="submit" size="lg" className="w-full">{signup ? "Skapa konto" : "Skicka meddelande"}</Button>
    </form>
  );
}
