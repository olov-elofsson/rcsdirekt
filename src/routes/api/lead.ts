import { createFileRoute } from "@tanstack/react-router";
import { inquirySchema, type InquiryType } from "@/lib/inquiries/schema";
import { allowedUploadOrigin, hashUploadIp } from "@/lib/rcs-video/upload-rules";

const CMS_URL = (process.env["CMS_URL"] || "https://rcsdirekt-cms-631487523529.europe-west1.run.app").replace(/\/$/, "");

// Same per-sender limit as video uploads, in its own lead- log. Without the salt (local dev)
// or when Firestore fails, the form still goes through.
async function tooManyLeads(request: Request): Promise<boolean> {
  const salt = process.env["RCS_VIDEO_IP_SALT"];
  if (!salt) return false;
  const { cloudRunClientIp, reserveUploadSlot } = await import("@/lib/rcs-video/gcp.server");
  const ip = cloudRunClientIp(request);
  if (!ip) return false;
  const slot = await reserveUploadSlot(`lead-${await hashUploadIp(ip, salt)}`).catch(() => "unavailable" as const);
  return slot === "limit";
}

// Contact, sign-up and webinar forms post here; valid submissions are saved as inquiries in the CMS.
export const Route = createFileRoute("/api/lead")({
  server: { handlers: {
    POST: async ({ request }) => {
      if (!allowedUploadOrigin(request)) return Response.json({ error: "forbidden" }, { status: 403 });
      const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
      if (!body) return Response.json({ error: "invalid" }, { status: 400 });
      // Hidden field that people never fill in; bots often do. Pretend success.
      if (typeof body["website"] === "string" && body["website"] !== "") return Response.json({ ok: true });
      const type: InquiryType = body["type"] === "signup" || body["type"] === "webinar" ? body["type"] : "contact";
      const parsed = inquirySchema(type).safeParse(body);
      if (!parsed.success) return Response.json({ error: "invalid" }, { status: 400 });
      const key = process.env["LEAD_API_KEY"];
      if (!key) return Response.json({ error: "unavailable" }, { status: 503 });
      if (await tooManyLeads(request)) return Response.json({ error: "limit" }, { status: 429 });
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
