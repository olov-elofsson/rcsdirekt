import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

// Images uploaded in Lovable were served by Lovable's hosting under this path.
// On Cloud Run the same files live in the storage bucket under assets/.
const HOSTED_ASSET_PREFIX = "/__l5e/assets-v1/";
const HOSTED_ASSET_TYPES: Record<string, string> = {
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  webp: "image/webp",
};

async function hostedAsset(request: Request): Promise<Response | undefined> {
  const { pathname } = new URL(request.url);
  if (!pathname.startsWith(HOSTED_ASSET_PREFIX)) return undefined;
  const key = pathname.slice(HOSTED_ASSET_PREFIX.length);
  if (!/^[0-9a-f-]{36}\/[\w.-]+$/.test(key)) return new Response("Not found", { status: 404 });
  const { gcpVideoBucket, fetchVideo } = await import("./lib/rcs-video/gcp.server");
  const bucket = gcpVideoBucket();
  if (!bucket) return undefined;
  const stored = await fetchVideo(bucket, `assets/${key}`, null).catch(() => undefined);
  if (!stored || stored.status !== 200) return new Response("Not found", { status: 404 });
  const type = HOSTED_ASSET_TYPES[key.split(".").pop() ?? ""] ?? "application/octet-stream";
  return new Response(stored.body, {
    headers: { "content-type": type, "cache-control": "public, max-age=86400" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const asset = await hostedAsset(request);
      if (asset) return asset;
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
