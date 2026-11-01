import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/SiteLayout";

export function KnowledgeLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground"><SiteHeader /><main>{children}</main><SiteFooter /></div>;
}

export function knowledgeHead(title: string, description: string, path: string, article = false) {
  return {
    meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: article ? "article" : "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: `https://rcsdirekt.se${path}` }],
    links: [{ rel: "canonical", href: `https://rcsdirekt.se${path}` }],
  };
}