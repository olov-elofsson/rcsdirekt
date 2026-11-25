// The head of a page: title, description, Open Graph, canonical address and its breadcrumb.

const SITE = "https://rcsdirekt.se";

/** One JSON-LD block for a route's `scripts`. */
export const jsonLd = (data: Record<string, unknown>) => ({
  type: "application/ld+json",
  children: JSON.stringify({ "@context": "https://schema.org", ...data }),
});

/** The path from the start page to this page, so search results can show it instead of the URL. */
export function breadcrumb(...crumbs: [name: string, path: string][]) {
  return jsonLd({
    "@type": "BreadcrumbList",
    itemListElement: [["rcsdirekt.se", "/"] as [string, string], ...crumbs].map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: SITE + path,
    })),
  });
}

export function pageHead({ title, description, svPath, crumb, type = "website" }: { title: string; description: string; svPath: string; crumb: string; type?: string }) {
  const url = SITE + svPath;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:locale", content: "sv_SE" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [breadcrumb([crumb, svPath])],
  };
}
