import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { useState } from "react";
import cover from "@/assets/rcs-blog-cover.jpg";
import { KnowledgeLayout, knowledgeHead } from "@/components/KnowledgeLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { articles, readingMinutes, searchArticles } from "@/data/rcs-knowledge";

export const Route = createFileRoute("/blogg/")({
  head: () => knowledgeHead("RCS-blogg: korta svar om RCS, företag och teknik", "Vad är RCS och hur fungerar det? Korta, källbelagda artiklar om meddelanden, företags-RCS, teknik och begrepp.", "/blogg"),
  component: BlogPage,
});

function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Alla");
  const categories = ["Alla", ...new Set(articles.map((article) => article.category))];
  const results = searchArticles(query, category);
  return <KnowledgeLayout>
    <section className="mx-auto max-w-5xl px-5 py-12 sm:py-20 lg:px-8">
      <header className="flex items-center justify-between gap-8">
        <div><h1 className="text-4xl leading-tight tracking-normal sm:text-5xl">RCS, enkelt förklarat</h1><p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">Vad det är. Hur det fungerar. Vad som gäller.</p></div>
        <img src={cover} alt="Telefon med RCS-meddelandekort och ett kuvert" width={1440} height={960} className="hidden w-44 shrink-0 rounded-lg sm:block" />
      </header>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1"><Search aria-hidden className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" /><Input aria-label="Sök artiklar" placeholder="Vad vill du veta om RCS?" value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" /></div>
        <label className="flex items-center gap-3 text-sm text-muted-foreground">Ämne<select aria-label="Välj ämne" value={category} onChange={(event) => setCategory(event.target.value)} className="h-10 min-w-40 rounded-md border border-input bg-background px-3 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <p role="status" className="mt-6 text-sm text-muted-foreground">{results.length} {results.length === 1 ? "artikel" : "artiklar"}</p>
      <div className="mt-4 grid gap-x-12 sm:grid-cols-2">{results.map((article) => <Link key={article.slug} to="/blogg/$slug" params={{ slug: article.slug }} className="group border-t border-border py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><div className="flex items-center justify-between gap-4 text-sm text-muted-foreground"><Badge variant="secondary">{article.category}</Badge><span className="shrink-0">{readingMinutes(article)} min</span></div><div className="mt-3 flex items-start justify-between gap-4"><h2 className="text-xl leading-snug tracking-normal transition-colors group-hover:text-logo-blue">{article.title}</h2><ArrowUpRight aria-hidden className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-logo-blue" /></div><p className="mt-3 line-clamp-2 leading-relaxed text-muted-foreground">{article.description}</p></Link>)}</div>
      {results.length === 0 ? <div className="py-12"><h2 className="text-xl tracking-normal">Inga artiklar hittades</h2><Button variant="outline" className="mt-5" onClick={() => { setQuery(""); setCategory("Alla"); }}>Visa alla artiklar</Button></div> : null}
    </section>
  </KnowledgeLayout>;
}
