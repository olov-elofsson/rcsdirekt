import { afterEach, beforeEach, expect, test } from "bun:test";
import {
  cloudRunClientIp,
  fetchVideo,
  reserveUploadSlot,
  uploadVideo,
} from "../src/lib/rcs-video/gcp.server";

type Call = { url: string; init?: RequestInit };
const realFetch = globalThis.fetch;
let calls: Call[] = [];
let stored: number[] | undefined;
let conflicts = 0;

beforeEach(() => {
  calls = [];
  stored = undefined;
  conflicts = 0;
  process.env["GOOGLE_CLOUD_PROJECT"] = "demo";
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    calls.push({ url, init });
    if (url.includes("metadata.google.internal"))
      return Response.json({ access_token: "token", expires_in: 3600 });
    if (url.endsWith(":beginTransaction")) return Response.json({ transaction: "tx" });
    if (url.endsWith(":rollback")) return Response.json({});
    if (url.endsWith(":commit")) {
      if (conflicts > 0) {
        conflicts--;
        return new Response("aborted", { status: 409 });
      }
      const body = JSON.parse(String(init?.body));
      stored = body.writes[0].update.fields.uploads.arrayValue.values.map(
        (v: { integerValue: string }) => Number(v.integerValue),
      );
      return Response.json({});
    }
    if (url.includes("/documents/rcs_video_uploads/")) {
      if (!stored) return new Response("missing", { status: 404 });
      return Response.json({
        fields: {
          uploads: { arrayValue: { values: stored.map((t) => ({ integerValue: String(t) })) } },
        },
      });
    }
    return new Response("ok");
  }) as typeof fetch;
});
afterEach(() => {
  globalThis.fetch = realFetch;
});

test("the connecting address is the last forwarded entry", () => {
  const request = new Request("https://rcsdirekt.se/api/rcs-video", {
    headers: { "x-forwarded-for": "1.1.1.1, 203.0.113.9" },
  });
  expect(cloudRunClientIp(request)).toBe("203.0.113.9");
  expect(cloudRunClientIp(new Request("https://rcsdirekt.se/"))).toBeUndefined();
});

test("first upload from a sender is recorded", async () => {
  expect(await reserveUploadSlot("abc", 1_000_000)).toBe("reserved");
  expect(stored).toEqual([1_000_000]);
});

test("sixth upload within an hour is refused and nothing is written", async () => {
  const now = 100_000_000;
  stored = [1, 2, 3, 4, 5].map((n) => now - n * 60_000);
  expect(await reserveUploadSlot("abc", now)).toBe("limit");
  expect(stored).toHaveLength(5);
  expect(calls.some((call) => call.url.endsWith(":rollback"))).toBe(true);
});

test("twenty uploads within a day is the daily ceiling, older entries are dropped", async () => {
  const now = 1_000_000_000;
  stored = Array.from({ length: 20 }, (_, n) => now - 2 * 3_600_000 - n * 60_000);
  expect(await reserveUploadSlot("abc", now)).toBe("limit");
  stored = [now - 25 * 3_600_000, now - 2 * 3_600_000];
  expect(await reserveUploadSlot("abc", now)).toBe("reserved");
  expect(stored).toEqual([now - 2 * 3_600_000, now]);
});

test("a conflicting parallel upload is retried", async () => {
  conflicts = 1;
  expect(await reserveUploadSlot("abc", 5_000_000)).toBe("reserved");
  expect(calls.filter((call) => call.url.endsWith(":beginTransaction"))).toHaveLength(2);
});

test("upload refuses to overwrite and streaming forwards the range", async () => {
  expect(await uploadVideo("bucket", "a.mp4", new Uint8Array(8))).toBe(true);
  const upload = calls.find((call) => call.url.includes("/upload/storage/v1/b/bucket/o"));
  expect(upload?.url).toContain("ifGenerationMatch=0");
  await fetchVideo("bucket", "a.mp4", "bytes=0-9");
  const read = calls.find((call) => call.url.includes("/o/a.mp4?alt=media"));
  expect(new Headers(read?.init?.headers).get("range")).toBe("bytes=0-9");
  expect(new Headers(read?.init?.headers).get("authorization")).toBe("Bearer token");
});

test("share links use https behind Cloud Run's TLS termination", () => {
  const forwarded = new Request("http://rcsdirekt.se/api/rcs-video", {
    headers: { "x-forwarded-proto": "https" },
  });
  expect(publicOrigin(forwarded)).toBe("https://rcsdirekt.se");
  expect(publicOrigin(new Request("http://localhost:8080/api/rcs-video"))).toBe(
    "http://localhost:8080",
  );
});
