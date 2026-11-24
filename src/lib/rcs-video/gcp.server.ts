// Google Cloud backend for the video generator: Cloud Storage holds the MP4 files and
// Firestore holds the per-sender upload log. RCS_VIDEO_BUCKET names the bucket; without it
// uploads and playback answer 503.
// Plain REST with the runtime service account, so no SDK is bundled.
import { DAY_UPLOAD_LIMIT, HOUR_UPLOAD_LIMIT } from "./upload-rules";

const METADATA = "http://metadata.google.internal/computeMetadata/v1";
const STORAGE = "https://storage.googleapis.com";
const FIRESTORE = "https://firestore.googleapis.com/v1";
const COLLECTION = "rcs_video_uploads";
const HOUR_MS = 3_600_000;
const DAY_MS = 86_400_000;

export function gcpVideoBucket(): string | undefined {
  return process.env["RCS_VIDEO_BUCKET"] || undefined;
}

// Cloud Run appends the connecting address last; earlier entries are sender-supplied.
// An IPv6 sender controls a whole /64, so the quota counts the network, not the single address.
export function cloudRunClientIp(request: Request): string | undefined {
  const ip = request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim();
  if (!ip) return undefined;
  if (!ip.includes(":")) return ip;
  if (ip.includes(".")) return ip.split(":").at(-1); // IPv4 written as IPv6, such as ::ffff:203.0.113.9
  const [head = "", tail = ""] = ip.split("::");
  const front = head.split(":").filter(Boolean);
  const back = tail.split(":").filter(Boolean);
  const groups = ip.includes("::") ? [...front, ...Array(8 - front.length - back.length).fill("0"), ...back] : front;
  return `${groups.slice(0, 4).map((group) => group.toLowerCase().replace(/^0+(?=.)/, "")).join(":")}::/64`;
}

// Cloud Run terminates TLS before the container, so request.url is http there.
export function publicOrigin(request: Request): string {
  const url = new URL(request.url);
  if (request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() === "https")
    url.protocol = "https:";
  return url.origin;
}

let cachedToken: { value: string; expires: number } | undefined;
let cachedProject: string | undefined;

async function metadata(path: string): Promise<Response> {
  const response = await fetch(`${METADATA}/${path}`, { headers: { "metadata-flavor": "Google" } });
  if (!response.ok) throw new Error(`Metadata request failed: ${response.status}`);
  return response;
}

async function accessToken(): Promise<string> {
  if (cachedToken && cachedToken.expires > Date.now() + 60_000) return cachedToken.value;
  const body = (await (await metadata("instance/service-accounts/default/token")).json()) as {
    access_token: string;
    expires_in: number;
  };
  cachedToken = { value: body.access_token, expires: Date.now() + body.expires_in * 1000 };
  return cachedToken.value;
}

async function projectId(): Promise<string> {
  cachedProject ??=
    process.env["GOOGLE_CLOUD_PROJECT"] ||
    (await (await metadata("project/project-id")).text()).trim();
  return cachedProject;
}

async function authorized(url: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  headers.set("authorization", `Bearer ${await accessToken()}`);
  return fetch(url, { ...init, headers });
}

function objectUrl(bucket: string, file: string): string {
  return `${STORAGE}/storage/v1/b/${encodeURIComponent(bucket)}/o/${encodeURIComponent(file)}`;
}

export async function uploadVideo(
  bucket: string,
  file: string,
  bytes: Uint8Array,
): Promise<boolean> {
  const url = `${STORAGE}/upload/storage/v1/b/${encodeURIComponent(bucket)}/o?uploadType=media&ifGenerationMatch=0&name=${encodeURIComponent(file)}`;
  const response = await authorized(url, {
    method: "POST",
    headers: { "content-type": "video/mp4" },
    body: bytes as unknown as BodyInit,
  });
  return response.ok;
}

export async function fetchVideo(
  bucket: string,
  file: string,
  range: string | null,
): Promise<Response> {
  return authorized(`${objectUrl(bucket, file)}?alt=media`, { headers: range ? { range } : {} });
}

type UploadsDocument = {
  fields?: { uploads?: { arrayValue?: { values?: { integerValue?: string }[] } } };
};

export type SlotResult = "reserved" | "limit" | "unavailable";

// Atomically checks the hour/day limits and records the upload, so parallel requests
// from one sender cannot slip past the quota.
export async function reserveUploadSlot(ipHash: string, now = Date.now()): Promise<SlotResult> {
  const database = `projects/${await projectId()}/databases/(default)`;
  const documents = `${FIRESTORE}/${database}/documents`;
  const name = `${database}/documents/${COLLECTION}/${ipHash}`;
  const json = { "content-type": "application/json" };
  for (let attempt = 0; attempt < 4; attempt++) {
    const begin = await authorized(`${documents}:beginTransaction`, {
      method: "POST",
      headers: json,
      body: "{}",
    });
    if (!begin.ok) return "unavailable";
    const { transaction } = (await begin.json()) as { transaction: string };
    const read = await authorized(
      `${FIRESTORE}/${name}?transaction=${encodeURIComponent(transaction)}`,
    );
    if (!read.ok && read.status !== 404) return "unavailable";
    const stored = read.ok ? ((await read.json()) as UploadsDocument) : {};
    const recent = (stored.fields?.uploads?.arrayValue?.values ?? [])
      .map((value) => Number(value.integerValue))
      .filter((time) => Number.isFinite(time) && time >= now - DAY_MS);
    if (
      recent.filter((time) => time >= now - HOUR_MS).length >= HOUR_UPLOAD_LIMIT ||
      recent.length >= DAY_UPLOAD_LIMIT
    ) {
      await authorized(`${documents}:rollback`, {
        method: "POST",
        headers: json,
        body: JSON.stringify({ transaction }),
      }).catch(() => undefined);
      return "limit";
    }
    const values = [...recent, now].map((time) => ({ integerValue: String(time) }));
    const commit = await authorized(`${documents}:commit`, {
      method: "POST",
      headers: json,
      body: JSON.stringify({
        transaction,
        writes: [{ update: { name, fields: { uploads: { arrayValue: { values } } } } }],
      }),
    });
    if (commit.ok) return "reserved";
    // 409 means another upload from the same sender committed first; read again and retry.
    if (commit.status !== 409) return "unavailable";
  }
  return "unavailable";
}
