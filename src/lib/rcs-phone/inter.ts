// Inter for the phone screens (Google Messages uses it on Android). Shared by the
// video generator, which embeds it in exported videos, and the website's phone.
import inter400 from "@fontsource/inter/files/inter-latin-400-normal.woff2?url";
import inter500 from "@fontsource/inter/files/inter-latin-500-normal.woff2?url";
import inter600 from "@fontsource/inter/files/inter-latin-600-normal.woff2?url";
import interExt400 from "@fontsource/inter/files/inter-latin-ext-400-normal.woff2?url";
import interExt500 from "@fontsource/inter/files/inter-latin-ext-500-normal.woff2?url";
import interExt600 from "@fontsource/inter/files/inter-latin-ext-600-normal.woff2?url";

export const INTER_FILES = [
  { weight: 400, subset: "latin", url: inter400 },
  { weight: 500, subset: "latin", url: inter500 },
  { weight: 600, subset: "latin", url: inter600 },
  { weight: 400, subset: "latin-ext", url: interExt400 },
  { weight: 500, subset: "latin-ext", url: interExt500 },
  { weight: 600, subset: "latin-ext", url: interExt600 },
];
