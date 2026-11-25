// The head of a page: title, description, Open Graph and canonical address.

export function pageHead({ title, description, svPath, type = "website" }: { title: string; description: string; svPath: string; type?: string }) {
  const url = `https://rcsdirekt.se${svPath}`;
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
  };
}
