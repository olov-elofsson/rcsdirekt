import { createFileRoute } from "@tanstack/react-router";
import { allowedUploadOrigin, hashUploadIp, MAX_VIDEO_BYTES, uploadLimitReached, validMp4 } from "@/lib/rcs-video/upload-rules";

export const Route = createFileRoute("/api/rcs-video")({
  server: { handlers: {
    POST: async ({ request }) => {
      if (!allowedUploadOrigin(request)) return new Response("Forbidden", { status: 403 });
      const length = request.headers.get("content-length");
      if (length && Number(length) > MAX_VIDEO_BYTES) return new Response("Video too large", { status: 413 });
      if (request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() !== "video/mp4") return new Response("Invalid video type", { status: 400 });
      // Bound the actual body too, even when Content-Length is absent or inaccurate.
      const reader = request.body?.getReader();
      if (!reader) return new Response("Invalid MP4", { status: 400 });
      const chunks: Uint8Array[] = [];
      let size = 0;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > MAX_VIDEO_BYTES) {
          await reader.cancel();
          return new Response("Video too large", { status: 413 });
        }
        chunks.push(value);
      }
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
      if (!validMp4(bytes)) return new Response("Invalid MP4", { status: 400 });
      const salt = process.env["RCS_VIDEO_IP_SALT"];
      if (!salt) return new Response("Upload unavailable", { status: 503 });
      const { gcpVideoBucket, cloudRunClientIp, reserveUploadSlot, uploadVideo } = await import("@/lib/rcs-video/gcp.server");
      const bucket = gcpVideoBucket();
      const ip = bucket ? cloudRunClientIp(request) : request.headers.get("cf-connecting-ip")?.trim() || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
      if (!ip) return new Response("Sender address missing", { status: 403 });
      const ipHash = await hashUploadIp(ip, salt);
      if (bucket) {
        const slot = await reserveUploadSlot(ipHash).catch(() => "unavailable" as const);
        if (slot === "limit") return new Response("Upload limit reached", { status: 429 });
        if (slot !== "reserved") return new Response("Upload unavailable", { status: 503 });
        const file = `${crypto.randomUUID()}.mp4`;
        if (!(await uploadVideo(bucket, file, bytes).catch(() => false))) return new Response("Upload failed", { status: 502 });
        return Response.json({ url: `${new URL(request.url).origin}/v/${file}` });
      }
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const now = Date.now();
      const [hour, day] = await Promise.all([
        supabaseAdmin.from("rcs_video_uploads").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("created_at", new Date(now - 3600000).toISOString()),
        supabaseAdmin.from("rcs_video_uploads").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("created_at", new Date(now - 86400000).toISOString()),
      ]);
      if (hour.error || day.error) return new Response("Upload unavailable", { status: 503 });
      if (uploadLimitReached(hour.count ?? 0, day.count ?? 0)) return new Response("Upload limit reached", { status: 429 });
      const id = crypto.randomUUID();
      const file = `${id}.mp4`;
      const { error } = await supabaseAdmin.storage.from("rcs-videos").upload(file, bytes.buffer, { contentType: "video/mp4", upsert: false });
      if (error) return new Response("Upload failed", { status: 502 });
      const logged = await supabaseAdmin.from("rcs_video_uploads").insert({ id, ip_hash: ipHash });
      if (logged.error) {
        await supabaseAdmin.storage.from("rcs-videos").remove([file]);
        return new Response("Upload limit or logging failure", { status: logged.error.code === "P0001" ? 429 : 503 });
      }
      return Response.json({ url: `${new URL(request.url).origin}/v/${file}` });
    },
  } },
});