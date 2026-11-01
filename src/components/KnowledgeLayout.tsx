import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/SiteLayout";

export function KnowledgeLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground"><SiteHeader /><main><div className="border-b border-border bg-muted"><nav aria-label="Kunskapsbank" className="mx-auto flex max-w-6xl gap-7 px-5 py-5 text-sm font-semibold lg:px-8"><Link to="/blogg" activeProps={{ className: "text-logo-blue" }} activeOptions={{ exact: true }}>Artiklar</Link><Link to="/ordlista" activeProps={{ className: "text-logo-blue" }}>RCS-ordlista</Link></nav></div>{children}</main><SiteFooter /></div>;
}

export function knowledgeHead(title: string, description: string, path: string, article = false) {
  return {
    meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: article ? "article" : "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: `https://rcsdirekt.se${path}` }],
    links: [{ rel: "canonical", href: `https://rcsdirekt.se${path}` }],
  };
}