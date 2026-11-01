import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import cover from "@/assets/rcs-blog-cover.jpg";
import { KnowledgeLayout, knowledgeHead } from "@/components/KnowledgeLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { articles, readingMinutes, searchArticles } from "@/data/rcs-knowledge";

export const Route = createFileRoute("/blogg/")({
  head: () => knowledgeHead("RCS-blogg: guider om meddelanden, företag och teknik", "Läs utförliga svenska guider om RCS, SMS, företagsmeddelanden, avsändarverifiering och API. Med ordlista och källor från Google, Apple och GSMA.", "/blogg"),
  component: BlogPage,
});

function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Alla");
  const categories = ["Alla", ...new Set(articles.map((article) => article.category))];
  const results = searchArticles(query, category);
  return <KnowledgeLayout>
    <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:pt-24 lg:px-8">
      <h1 className="max-w-3xl text-4xl leading-tight tracking-normal sm:text-6xl">Kunskap om RCS</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">Från vad ett RCS-meddelande är till hur företag kan använda kort, svar och integrationer.</p>
      <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <Link to="/blogg/$slug" params={{ slug: "vad-ar-rcs" }} className="block overflow-hidden rounded-lg"><img src={cover} alt="Illustration av en telefon med meddelandekort, bredvid ett kuvert" width={1440} height={960} className="aspect-[3/2] w-full object-cover" /></Link>
        <div><p className="text-sm text-muted-foreground">Grunder · {readingMinutes(articles[0])} min läsning</p><h2 className="mt-4 text-3xl leading-tight tracking-normal sm:text-4xl"><Link to="/blogg/$slug" params={{ slug: "vad-ar-rcs" }}>Vad är RCS och vad betyder RCS-meddelande?</Link></h2><p className="mt-5 text-base leading-relaxed text-muted-foreground">RCS är en meddelandestandard, inte en särskild app. Börja med hur tekniken fungerar och vad som skiljer privat chatt från företagsmeddelanden.</p><Button asChild variant="outline" className="mt-7"><Link to="/blogg/$slug" params={{ slug: "vad-ar-rcs" }}>Läs guiden <ArrowRight /></Link></Button></div>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-5 py-12 sm:pb-24 lg:px-8" aria-label="Alla artiklar">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><h2 className="text-2xl tracking-normal sm:text-3xl">Alla guider</h2><div className="relative w-full sm:max-w-xs"><Search aria-hidden className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" /><Input aria-label="Sök artiklar" placeholder="Sök ämne eller term" value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" /></div></div>
      <div className="mt-6 flex flex-wrap gap-2" aria-label="Ämnen">{categories.map((item) => <Button key={item} size="sm" variant={category === item ? "default" : "ghost"} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</Button>)}</div>
      <p role="status" className="mt-5 text-sm text-muted-foreground">{results.length} {results.length === 1 ? "artikel" : "artiklar"}</p>
      <div className="mt-3 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">{results.map((article) => <article key={article.slug} className="border-t border-border py-8"><p className="text-sm text-muted-foreground">{article.category} · {readingMinutes(article)} min</p><h3 className="mt-3 text-xl leading-snug tracking-normal"><Link to="/blogg/$slug" params={{ slug: article.slug }} className="transition-colors hover:text-logo-blue">{article.title}</Link></h3><p className="mt-4 text-base leading-relaxed text-muted-foreground">{article.description}</p><Link to="/blogg/$slug" params={{ slug: article.slug }} aria-label={`Läs ${article.title}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:text-logo-blue">Läs artikeln <ArrowRight className="size-4" /></Link></article>)}</div>
      {results.length === 0 ? <div className="py-12"><h3 className="text-xl tracking-normal">Inga artiklar hittades</h3><p className="mt-3 text-muted-foreground">Prova ett annat ämne eller välj alla guider.</p><Button variant="outline" className="mt-5" onClick={() => { setQuery(""); setCategory("Alla"); }}>Visa alla guider</Button></div> : null}
    </section>
    <section className="bg-primary-soft py-14 sm:py-20"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-5 sm:flex-row sm:items-center lg:px-8"><div><h2 className="text-3xl tracking-normal">Vad betyder termen?</h2><p className="mt-4 text-muted-foreground">Agent, RBM, rich card och webhook. Förklaringar samlade på ett ställe.</p></div><Button asChild variant="outline"><Link to="/ordlista">Öppna RCS-ordlistan <ArrowRight /></Link></Button></div></section>
  </KnowledgeLayout>;
}