import { createFileRoute } from "@tanstack/react-router";
import { VIDEO_FILE_PATTERN } from "@/lib/rcs-video/upload-rules";

export const Route = createFileRoute("/v/$file")({
  server: { handlers: {
    GET: async ({ request, params }) => {
      if (!VIDEO_FILE_PATTERN.test(params.file)) return new Response("Not found", { status: 404 });
      const range = request.headers.get("range");
      const { gcpVideoBucket, fetchVideo } = await import("@/lib/rcs-video/gcp.server");
      const bucket = gcpVideoBucket();
      if (!bucket) return new Response("Video unavailable", { status: 503 });
      const response = await fetchVideo(bucket, params.file, range).catch(() => undefined);
      if (!response) return new Response("Video unavailable", { status: 503 });
      if (response.status === 416) return new Response(null, { status: 416, headers: { "content-range": response.headers.get("content-range") ?? "bytes */*" } });
      if (response.status !== 200 && response.status !== 206) {
        await response.body?.cancel();
        return response.status === 404 ? new Response("Not found", { status: 404 }) : new Response("Video unavailable", { status: 502 });
      }
      const outgoing = new Headers({ "cache-control": "public, max-age=31536000, immutable", "x-content-type-options": "nosniff" });
      for (const name of ["content-type", "accept-ranges", "content-length", "content-range"]) {
        const value = response.headers.get(name);
        if (value) outgoing.set(name, value);
      }
      return new Response(response.body, { status: response.status, headers: outgoing });
    },
  } },
});