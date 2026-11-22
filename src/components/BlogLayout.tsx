import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/SiteLayout";
import { alternates, englishPath } from "@/lib/i18n";

export function BlogLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground"><SiteHeader /><main id="innehall" tabIndex={-1} className="outline-none">{children}</main><SiteFooter /></div>;
}

/** Up to 160 characters for search results: the last whole sentence that fits, else whole words and "…". */
export function metaDescription(text: string, max = 160) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentence = cut.lastIndexOf(". ");
  if (sentence > 80) return cut.slice(0, sentence + 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "")}…`;
}

/** The page title with the brand after it, when it still fits in about 60 characters. */
const withBrand = (title: string) => (title.includes("rcsdirekt.se") || title.length > 47 ? title : `${title} | rcsdirekt.se`);

/** The head of a blog page; `path` is the Swedish path, and the English page uses its /en address. */
export function blogHead(rawTitle: string, rawDescription: string, path: string, article = false, lang: "sv" | "en" = "sv") {
  const title = withBrand(rawTitle);
  const description = metaDescription(rawDescription);
  const url = `https://rcsdirekt.se${lang === "en" ? englishPath(path) : path}`;
  return {
    meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: article ? "article" : "website" }, { property: "og:locale", content: lang === "en" ? "en_GB" : "sv_SE" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: url }],
    links: [{ rel: "canonical", href: url }, ...alternates(path)],
  };
}