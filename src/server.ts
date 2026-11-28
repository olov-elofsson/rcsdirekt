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

const MEDIA_TYPES: Record<string, string> = {
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
};

// Images uploaded in Payload CMS are stored in the same bucket under cms-media/.
const CMS_MEDIA_PREFIX = "/media/";

export function bucketKey(pathname: string): string | null | undefined {
  if (pathname.startsWith(CMS_MEDIA_PREFIX)) {
    let name: string;
    try {
      name = decodeURIComponent(pathname.slice(CMS_MEDIA_PREFIX.length));
    } catch {
      return null;
    }
    return name && !name.includes("/") && !name.startsWith(".") ? `cms-media/${name}` : null;
  }
  return undefined;
}

// The English pages are gone; their old addresses lead to the Swedish page with a 301.
const ENGLISH_PAGES: [en: string, sv: string][] = [
  ["/en/pricing", "/priser"],
  ["/en/blog", "/blogg"],
  ["/en/about", "/om-oss"],
  ["/en/contact", "/kontakt"],
  ["/en/developers", "/utvecklare"],
  ["/en/sign-up", "/skapa-konto"],
  ["/en/privacy", "/integritetspolicy"],
  ["/en/terms", "/villkor"],
];

export function swedishRedirect(pathname: string): string | undefined {
  if (pathname !== "/en" && !pathname.startsWith("/en/")) return undefined;
  for (const [en, sv] of ENGLISH_PAGES) {
    if (pathname === en || pathname === `${en}/`) return sv;
    if (pathname.startsWith(`${en}/`)) return sv + pathname.slice(en.length);
  }
  return "/";
}

// copykit.se is closed and points here. Its old pages lead with a 301 to the closest page on
// rcsdirekt.se, chosen from copykit.se's Search Console data; everything else goes to the start page.
const COPYKIT_HOSTS = new Set(["copykit.se", "www.copykit.se"]);

const COPYKIT_PAGES: [old: string, target: string][] = [
  ["/artiklar/vad-har-operatorerna-faktiskt-sagt", "/blogg/svenska-operatorer-oppnar-rcs-pa-iphone"],
  ["/artiklar/varfor-drojer-rcs-pa-iphone-i-sverige-0h7kq", "/blogg/svenska-operatorer-oppnar-rcs-pa-iphone"],
  ["/artiklar/rcs-tar-nasta-steg-i-sverige", "/blogg/svenska-operatorer-oppnar-rcs-pa-iphone"],
  ["/artiklar/kommer-rcs-att-sla-i-sverige", "/blogg/rcs-sverige-operatorer"],
  ["/artiklar/apple-ett-steg-narmare-saker-rcs-ny-kod-i-ios-26-3-avslojar-planerna", "/blogg/rcs-pa-iphone"],
  ["/artiklar/vad-ar-rcs-meddelande", "/blogg/vad-ar-rcs"],
  ["/artiklar/rcs-kommunikation", "/blogg/vad-ar-rcs"],
  ["/artiklar/historien-bakom-nasta-generations-sms", "/blogg/vad-ar-rcs"],
  ["/artiklar/universal-profile-v3-1", "/blogg/hur-rcs-hanger-ihop"],
  ["/artiklar/rcs-tekniska-funktioner-och-fordelar", "/blogg/rcs-vs-sms"],
  ["/artiklar/kraftigt-okad-efterfragan-pa-rcs", "/blogg/rcs-for-foretag"],
  ["/artiklar/hur-kommer-rcs-meddelanden-att-forandra-kunddialogen", "/blogg/rcs-for-foretag"],
  ["/kunskapsbank/vad-ar-rcs-och-hur-kommer-det-att-forandra-kunddialogen", "/blogg/vad-ar-rcs"],
  ["/sms-marknadsforing", "/blogg/rcs-vs-sms"],
  ["/rcs", "/blogg/vad-ar-rcs"],
  ["/artiklar", "/blogg"],
  ["/blogg", "/blogg"],
  ["/blogg-kategori", "/blogg"],
  ["/kunskapsbank", "/blogg"],
  ["/resurser", "/blogg"],
  ["/typ", "/blogg"],
  ["/checkout", "/priser"],
  ["/paypal-checkout", "/priser"],
  ["/privacy-policy", "/integritetspolicy"],
  ["/terms-of-service", "/villkor"],
];

export function copykitRedirect(host: string, pathname: string): string | undefined {
  if (!COPYKIT_HOSTS.has(host.toLowerCase().replace(/:\d+$/, ""))) return undefined;
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  for (const [old, target] of COPYKIT_PAGES) {
    if (path === old || path.startsWith(`${old}/`)) return `https://rcsdirekt.se${target}`;
  }
  return "https://rcsdirekt.se/";
}

async function hostedAsset(request: Request): Promise<Response | undefined> {
  const { pathname } = new URL(request.url);
  const objectKey = bucketKey(pathname);
  if (objectKey === undefined) return undefined;
  if (objectKey === null) return new Response("Not found", { status: 404 });
  const key = objectKey;
  const type = MEDIA_TYPES[key.split(".").pop()?.toLowerCase() ?? ""];
  if (!type) return new Response("Not found", { status: 404 });
  const { gcpVideoBucket, fetchVideo } = await import("./lib/rcs-video/gcp.server");
  const bucket = gcpVideoBucket();
  if (!bucket) return undefined;
  const stored = await fetchVideo(bucket, key, null).catch(() => undefined);
  if (!stored) return new Response("Media unavailable", { status: 503 });
  if (stored.status !== 200) {
    await stored.body?.cancel();
    return new Response(stored.status === 404 ? "Not found" : "Media unavailable", { status: stored.status === 404 ? 404 : 502 });
  }
  return new Response(stored.body, {
    headers: {
      "content-type": type,
      "cache-control": "public, max-age=86400",
      "x-content-type-options": "nosniff",
      // Uploaded SVGs are shown as images only; scripts inside them never run.
      "content-security-policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox",
    },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      const copykit = copykitRedirect(request.headers.get("host") ?? url.host, url.pathname);
      if (copykit) return new Response(null, { status: 301, headers: { location: copykit, "cache-control": "public, max-age=86400" } });
      const swedish = swedishRedirect(url.pathname);
      if (swedish) return new Response(null, { status: 301, headers: { location: swedish + url.search } });
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
