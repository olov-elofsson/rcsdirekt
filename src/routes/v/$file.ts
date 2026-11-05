import { createFileRoute } from "@tanstack/react-router";
import { VIDEO_FILE_PATTERN } from "@/lib/rcs-video/upload-rules";

export const Route = createFileRoute("/v/$file")({
  server: { handlers: {
    GET: async ({ request, params }) => {
      if (!VIDEO_FILE_PATTERN.test(params.file)) return new Response("Not found", { status: 404 });
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await supabaseAdmin.storage.from("rcs-videos").createSignedUrl(params.file, 60);
      if (error || !data) return new Response("Not found", { status: 404 });
      const headers = new Headers();
      const range = request.headers.get("range");
      if (range) headers.set("range", range);
      const response = await fetch(data.signedUrl, { headers });
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