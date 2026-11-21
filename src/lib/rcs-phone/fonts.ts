// Google Sans for the phone screens, as in Google Messages (OFL 1.1, from @fontsource/google-sans).
// Shared by the video generator, which embeds it in exported videos, and the website's phone.
import sans400 from "@fontsource/google-sans/files/google-sans-latin-400-normal.woff2?url";
import sans500 from "@fontsource/google-sans/files/google-sans-latin-500-normal.woff2?url";
import sansExt400 from "@fontsource/google-sans/files/google-sans-latin-ext-400-normal.woff2?url";
import sansExt500 from "@fontsource/google-sans/files/google-sans-latin-ext-500-normal.woff2?url";

export const PHONE_FONT_FILES = [
  { weight: 400, subset: "latin", url: sans400 },
  { weight: 500, subset: "latin", url: sans500 },
  { weight: 400, subset: "latin-ext", url: sansExt400 },
  { weight: 500, subset: "latin-ext", url: sansExt500 },
];
