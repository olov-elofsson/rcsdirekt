import { createFileRoute } from "@tanstack/react-router";
import { VIDEO_FILE_PATTERN } from "@/lib/rcs-video/upload-rules";

export const Route = createFileRoute("/v/$file")({
  server: { handlers: {
    GET: async ({ request, params }) => {
      if (!VIDEO_FILE_PATTERN.test(params.file)) return new Response("Not found", { status: 404 });
      const range = request.headers.get("range");
      const { gcpVideoBucket, fetchVideo } = await import("@/lib/rcs-video/gcp.server");
      const bucket = gcpVideoBucket();
      let response: Response;
      if (bucket) {
        const stored = await fetchVideo(bucket, params.file, range).catch(() => undefined);
        if (!stored) return new Response("Video unavailable", { status: 503 });
        response = stored;
      } else {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage.from("rcs-videos").createSignedUrl(params.file, 60);
        if (error || !data) return new Response("Not found", { status: 404 });
        response = await fetch(data.signedUrl, { headers: range ? { range } : {} });
      }
      if (response.status === 416) return new Response(null, { status: 416, headers: { "content-range": response.headers.get("content-range") ?? "bytes */*" } });
      if (response.status !== 200 && response.status !== 206) return new Response("Not found", { status: 404 });
      const outgoing = new Headers({ "cache-control": "public, max-age=31536000, immutable", "x-content-type-options": "nosniff" });
      for (const name of ["content-type", "accept-ranges", "content-length", "content-range"]) {
        const value = response.headers.get(name);
        if (value) outgoing.set(name, value);
      }
      return new Response(response.body, { status: response.status, headers: outgoing });
    },
  } },
});