import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { useState } from "react";
import cover from "@/assets/rcs-blog-cover.jpg";
import { KnowledgeLayout, knowledgeHead } from "@/components/KnowledgeLayout";
import { PageHeading } from "@/components/PageHeading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { articles, readingMinutes, searchArticles } from "@/data/rcs-knowledge";

export const Route = createFileRoute("/blogg/")({
  head: () => knowledgeHead("Resurser", "Vad är RCS och hur fungerar det? Korta, källbelagda artiklar om meddelanden, företags-RCS, teknik och begrepp.", "/blogg"),
  component: BlogPage,
});

const dateFormat = new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "long", year: "numeric" });
function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? value : dateFormat.format(date);
}

function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Alla");
  const categories = ["Alla", ...new Set(articles.map((article) => article.category))];
  const results = searchArticles(query, category);
  const featured = ["rcs-sverige-operatorer", "rcs-tele2", "rcs-comviq"].map((slug) => articles.find((article) => article.slug === slug)).filter((article): article is (typeof articles)[number] => Boolean(article));
  return <KnowledgeLayout>
    <PageHeading title="Resurser" description={<p>Vad det är. Hur det fungerar. Vad som gäller.</p>} />
    <section className="mx-auto max-w-5xl px-5 pb-16 sm:pb-24 lg:px-8">
      <img src={cover} alt="Telefon med RCS-meddelandekort och ett kuvert" width={352} height={235} className="mx-auto w-44 rounded-lg" />
      {!query && category === "Alla" ? <section className="mt-9 border-b border-border pb-9"><h2 className="text-2xl leading-tight tracking-normal">Aktuellt om RCS i Sverige</h2><div className="mt-5 grid gap-4 lg:grid-cols-3">{featured.map((article) => <Link key={article.slug} to="/blogg/$slug" params={{ slug: article.slug }} className="group flex min-w-0 flex-col rounded-lg bg-primary-soft p-5"><Badge variant="outline" className="w-fit border-transparent bg-background text-primary">{article.category}</Badge><h3 className="mt-4 text-lg leading-snug group-hover:text-logo-blue">{article.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{article.description}</p><span className="mt-5 flex items-center justify-between gap-3 text-xs font-semibold text-muted-foreground">Uppdaterad {formatDate(article.published)}<ArrowUpRight className="size-4 shrink-0" /></span></Link>)}</div></section> : null}
      <div className="mt-8 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="relative flex-1"><Search aria-hidden className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" /><Input aria-label="Sök artiklar" placeholder="Vad vill du veta om RCS?" value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" /></div>
        <label className="flex items-center gap-3 text-sm text-muted-foreground">Ämne<select aria-label="Välj ämne" value={category} onChange={(event) => setCategory(event.target.value)} className="h-10 min-w-40 rounded-full border border-input bg-background px-4 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <p role="status" className="mt-6 text-sm text-muted-foreground">{results.length} {results.length === 1 ? "artikel" : "artiklar"}</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">{results.map((article) => <Link key={article.slug} to="/blogg/$slug" params={{ slug: article.slug }} className="group flex min-w-0 flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 text-sm text-muted-foreground"><Badge variant="outline" className="w-fit bg-primary-soft text-primary border-transparent">{article.category}</Badge><span className="shrink-0">{readingMinutes(article)} min</span></div><div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4"><h2 className="text-xl leading-snug tracking-normal transition-colors group-hover:text-logo-blue">{article.title}</h2><ArrowUpRight aria-hidden className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-logo-blue" /></div><p className="mt-3 line-clamp-3 leading-relaxed text-muted-foreground">{article.description}</p></Link>)}</div>
      {results.length === 0 ? <div className="py-12"><h2 className="text-xl tracking-normal">Inga artiklar hittades</h2><Button variant="outline" className="mt-5" onClick={() => { setQuery(""); setCategory("Alla"); }}>Visa alla artiklar</Button></div> : null}
    </section>
  </KnowledgeLayout>;
}
