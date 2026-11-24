import { createFileRoute } from "@tanstack/react-router";
import { allowedUploadOrigin, hashUploadIp, MAX_VIDEO_BYTES, validMp4 } from "@/lib/rcs-video/upload-rules";

export const Route = createFileRoute("/api/rcs-video")({
  server: { handlers: {
    POST: async ({ request }) => {
      if (!allowedUploadOrigin(request)) return new Response("Forbidden", { status: 403 });
      const length = request.headers.get("content-length");
      if (length && Number(length) > MAX_VIDEO_BYTES) return new Response("Video too large", { status: 413 });
      if (request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() !== "video/mp4") return new Response("Invalid video type", { status: 400 });
      // Reserve the sender's slot before reading the body, so a flood of large bodies is refused
      // before it is held in memory.
      const salt = process.env["RCS_VIDEO_IP_SALT"];
      if (!salt) return new Response("Upload unavailable", { status: 503 });
      const { gcpVideoBucket, cloudRunClientIp, publicOrigin, reserveUploadSlot, uploadVideo } = await import("@/lib/rcs-video/gcp.server");
      const bucket = gcpVideoBucket();
      if (!bucket) return new Response("Upload unavailable", { status: 503 });
      const ip = cloudRunClientIp(request);
      if (!ip) return new Response("Sender address missing", { status: 403 });
      const ipHash = await hashUploadIp(ip, salt);
      const slot = await reserveUploadSlot(ipHash).catch((error) => (console.error("Upload slot failed", error), "unavailable" as const));
      if (slot === "limit") return new Response("Upload limit reached", { status: 429 });
      if (slot !== "reserved") return new Response("Upload unavailable", { status: 503 });
      // shortcut: a rejected or failed upload still uses its slot, upgrade to a release call if real users hit the limit.
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
      const file = `${crypto.randomUUID()}.mp4`;
      if (!(await uploadVideo(bucket, file, bytes).catch((error) => (console.error("Video upload failed", error), false)))) return new Response("Upload failed", { status: 502 });
      return Response.json({ url: `${publicOrigin(request)}/v/${file}` });
    },
  } },
});