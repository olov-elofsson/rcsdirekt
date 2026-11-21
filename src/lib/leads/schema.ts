import { z } from "zod";

// Shared by the form (instant feedback) and the server route (the real check).
const base = {
  name: z.string().trim().min(1, "Fyll i ditt namn").max(100),
  company: z.string().trim().max(120),
  email: z.string().trim().email("Ange en giltig e-postadress").max(255),
  phone: z.string().trim().max(30).regex(/^[+\d\s-]*$/, "Ange ett giltigt telefonnummer"),
  message: z.string().trim().max(1000),
};

export type LeadType = "contact" | "signup" | "webinar";

export function leadSchema(type: LeadType) {
  const signup = type === "signup";
  return z.object({
    ...base,
    company: signup ? base.company.min(1, "Fyll i företagsnamn") : base.company,
    // A webinar sign-up carries the webinar's name and time as its message, from a hidden field.
    message: type === "contact" ? base.message.min(1, "Skriv ett meddelande") : base.message,
    terms: signup ? z.literal("on", { errorMap: () => ({ message: "Godkänn villkoren" }) }) : z.any(),
  });
}
