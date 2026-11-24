import { createFileRoute } from "@tanstack/react-router";
import { inquirySchema, type InquiryType } from "@/lib/inquiries/schema";

const CMS_URL = (process.env["CMS_URL"] || "https://rcsdirekt-cms-631487523529.europe-west1.run.app").replace(/\/$/, "");

function allowedOrigin(origin: string, request: Request): boolean {
  if (/^https:\/\/(www\.)?rcsdirekt\.se$/.test(origin)) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

// Contact, sign-up and webinar forms post here; valid submissions are saved as inquiries in the CMS.
export const Route = createFileRoute("/api/lead")({
  server: { handlers: {
    POST: async ({ request }) => {
      const origin = request.headers.get("origin");
      if (origin && !allowedOrigin(origin, request)) return Response.json({ error: "forbidden" }, { status: 403 });
      const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
      if (!body) return Response.json({ error: "invalid" }, { status: 400 });
      // Hidden field that people never fill in; bots often do. Pretend success.
      if (typeof body["website"] === "string" && body["website"] !== "") return Response.json({ ok: true });
      const type: InquiryType = body["type"] === "signup" || body["type"] === "webinar" ? body["type"] : "contact";
      const parsed = inquirySchema(type).safeParse(body);
      if (!parsed.success) return Response.json({ error: "invalid" }, { status: 400 });
      const key = process.env["LEAD_API_KEY"];
      if (!key) return Response.json({ error: "unavailable" }, { status: 503 });
      const { name, company, email, phone, message } = parsed.data;
      const response = await fetch(`${CMS_URL}/api/leads`, {
        method: "POST",
        headers: { "content-type": "application/json", "x-lead-key": key },
        body: JSON.stringify({ type, name, company, email, phone, message }),
      }).catch((error) => (console.error("Lead to CMS failed", error), null));
      if (!response?.ok) {
        if (response) console.error("Lead to CMS failed", response.status);
        return Response.json({ error: "unavailable" }, { status: 502 });
      }
      return Response.json({ ok: true });
    },
  } },
});
