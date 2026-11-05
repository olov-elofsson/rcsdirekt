import { expect, test } from "bun:test";
import { allowedUploadOrigin, DAY_UPLOAD_LIMIT, hashUploadIp, HOUR_UPLOAD_LIMIT, MAX_VIDEO_BYTES, uploadLimitReached, validMp4, VIDEO_FILE_PATTERN } from "../src/lib/rcs-video/upload-rules";

test("only same host or the two approved hosts can upload, with Referer fallback", () => {
  const request = (headers: Record<string, string>) => new Request("http://localhost:8080/api/rcs-video", { headers });
  expect(allowedUploadOrigin(request({ origin: "http://localhost:8080" }))).toBe(true);
  expect(allowedUploadOrigin(request({ origin: "https://rcsdirekt.se" }))).toBe(true);
  expect(allowedUploadOrigin(request({ origin: "https://www.rcsdirekt.se" }))).toBe(true);
  expect(allowedUploadOrigin(request({ referer: "http://localhost:8080/video-generator" }))).toBe(true);
  expect(allowedUploadOrigin(request({ origin: "https://evil.test", referer: "http://localhost:8080/" }))).toBe(false);
  expect(allowedUploadOrigin(request({}))).toBe(false);
});
test("max video size is 25 MiB", () => { expect(MAX_VIDEO_BYTES).toBe(26214400); });
test("MP4 requires ftyp at bytes 4 through 7", () => {
  expect(validMp4(new Uint8Array([0, 0, 0, 24, 102, 116, 121, 112]))).toBe(true);
  expect(validMp4(new TextEncoder().encode("ftypxxxx"))).toBe(false);
});
test("file names must match the requested UUID-shaped mp4 expression", () => {
  expect(VIDEO_FILE_PATTERN.test("2f1c1234-1234-1234-1234-123456789abc.mp4")).toBe(true);
  expect(VIDEO_FILE_PATTERN.test("../demo.mp4")).toBe(false);
});
test("sixth upload in an hour is denied", () => {
  expect(HOUR_UPLOAD_LIMIT).toBe(5);
  expect(uploadLimitReached(4, 4)).toBe(false);
  expect(uploadLimitReached(5, 5)).toBe(true);
});
test("twenty-first upload in a day is denied", () => {
  expect(DAY_UPLOAD_LIMIT).toBe(20);
  expect(uploadLimitReached(0, 19)).toBe(false);
  expect(uploadLimitReached(0, 20)).toBe(true);
});
test("IP hashes are salted SHA-256", async () => {
  const hash = await hashUploadIp("192.0.2.1", "test-salt");
  expect(hash).toHaveLength(64);
  expect(hash).not.toBe(await hashUploadIp("192.0.2.1", "other-salt"));
});