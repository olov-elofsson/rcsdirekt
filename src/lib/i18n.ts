// The site in Swedish (default, at the root) and English (under /en). The language follows the
// address, so there is no state to keep in sync: a component reads it from the current path.
// UI text is written in Swedish in the components and looked up in the English dictionary with
// t(); content from the CMS has its own English modules under src/content/en.
import { useRouterState } from "@tanstack/react-router";

import { en } from "@/i18n/en";

export type Locale = "sv" | "en";

/** Swedish page paths and their English counterparts. Pages not listed exist only in Swedish. */
const PAGES: [sv: string, en: string][] = [
  ["/priser", "/en/pricing"],
  ["/blogg", "/en/blog"],
  ["/om-oss", "/en/about"],
  ["/kontakt", "/en/contact"],
  ["/utvecklare", "/en/developers"],
  ["/skapa-konto", "/en/sign-up"],
  ["/integritetspolicy", "/en/privacy"],
  ["/villkor", "/en/terms"],
];

export const localeOf = (pathname: string): Locale => (pathname === "/en" || pathname.startsWith("/en/") ? "en" : "sv");

/** The English address for a Swedish one, or the Swedish one when it has no English page. */
export function englishPath(path: string): string {
  if (path === "/" || path === "") return "/en";
  for (const [sv, enPath] of PAGES) {
    if (path === sv) return enPath;
    if (path.startsWith(`${sv}/`)) return enPath + path.slice(sv.length);
  }
  return path;
}

/** The Swedish address for an English one. */
export function swedishPath(path: string): string {
  if (path === "/en" || path === "/en/") return "/";
  for (const [sv, enPath] of PAGES) {
    if (path === enPath) return sv;
    if (path.startsWith(`${enPath}/`)) return sv + path.slice(enPath.length);
  }
  return path;
}

/** Whether a Swedish page has an English version, for the language switch. */
export const hasEnglish = (svPath: string) => svPath === "/" || PAGES.some(([sv]) => svPath === sv || svPath.startsWith(`${sv}/`));

export function useLocale(): Locale {
  return useRouterState({ select: (state) => localeOf(state.location.pathname) });
}

/** Text in the current language: the Swedish text itself, or its English translation. */
export function translate(locale: Locale, text: string): string {
  if (locale === "sv") return text;
  const found = en[text];
  if (found === undefined && import.meta.env?.DEV) console.warn(`[i18n] missing English for: ${text}`);
  return found ?? text;
}

/** t("Svensk text") gives the text in the page's language; lp("/priser") gives the page's address in it. */
export function useT() {
  const locale = useLocale();
  return {
    locale,
    t: (text: string) => translate(locale, text),
    // Typed as the Swedish route so links stay type-checked; the English route exists for each listed page.
    lp: <T extends string>(path: T): T => (locale === "en" ? englishPath(path) : path) as T,
  };
}

/** hreflang links for a page that exists in both languages, from its Swedish path. */
export function alternates(svPath: string) {
  const site = "https://rcsdirekt.se";
  return [
    { rel: "alternate", hrefLang: "sv", href: site + svPath },
    { rel: "alternate", hrefLang: "en", href: site + englishPath(svPath) },
    { rel: "alternate", hrefLang: "x-default", href: site + svPath },
  ];
}
