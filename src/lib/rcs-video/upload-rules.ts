export const MAX_VIDEO_BYTES = 25 * 1024 * 1024;
export const VIDEO_FILE_PATTERN = /^[0-9a-f-]{36}\.mp4$/;
export const HOUR_UPLOAD_LIMIT = 5;
export const DAY_UPLOAD_LIMIT = 20;

export function allowedUploadOrigin(request: Request): boolean {
  const source = request.headers.get("origin") ?? request.headers.get("referer");
  if (!source) return false;
  try {
    const url = new URL(source);
    return ["http:", "https:"].includes(url.protocol) &&
      [new URL(request.url).host, "rcsdirekt.se", "www.rcsdirekt.se"].includes(url.host);
  } catch { return false; }
}

export function validMp4(bytes: Uint8Array): boolean {
  return bytes.length >= 8 && bytes[4] === 102 && bytes[5] === 116 && bytes[6] === 121 && bytes[7] === 112;
}

export function uploadLimitReached(hour: number, day: number): boolean {
  return hour >= HOUR_UPLOAD_LIMIT || day >= DAY_UPLOAD_LIMIT;
}

export async function hashUploadIp(ip: string, salt: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${ip}\0${salt}`));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}