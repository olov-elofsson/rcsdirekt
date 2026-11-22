// The head of a page that exists in both languages: title, description, Open Graph, canonical
// address and hreflang links, from the page's Swedish path.
import { alternates, englishPath } from "@/lib/i18n";

export function pageHead({ title, description, svPath, lang, type = "website" }: { title: string; description: string; svPath: string; lang: "sv" | "en"; type?: string }) {
  const url = `https://rcsdirekt.se${lang === "en" ? englishPath(svPath) : svPath}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:locale", content: lang === "en" ? "en_GB" : "sv_SE" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }, ...alternates(svPath)],
  };
}
