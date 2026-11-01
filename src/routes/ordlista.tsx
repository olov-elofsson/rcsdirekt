import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { KnowledgeLayout, knowledgeHead } from "@/components/KnowledgeLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { glossary, searchGlossary } from "@/data/rcs-knowledge";

export const Route = createFileRoute("/ordlista")({ head: () => knowledgeHead("RCS-ordlista: korta artiklar om varje begrepp", "Vad betyder agent, RBM, rich card och webhook? Varje RCS-begrepp har en egen kort artikel med förklaring, viktiga villkor och källor.", "/ordlista"), component: GlossaryPage });

function GlossaryPage() {
  const [query, setQuery] = useState("");
  const results = searchGlossary(query);
  return <KnowledgeLayout><section className="mx-auto max-w-5xl px-5 py-12 sm:py-20 lg:px-8">
    <h1 className="text-4xl leading-tight tracking-normal sm:text-5xl">RCS-ordlista</h1>
    <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{glossary.length} begrepp. Raka förklaringar, ett i taget.</p>
    <div className="relative mt-10 max-w-xl"><Search aria-hidden className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" /><Input aria-label="Sök i ordlistan" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Sök ett begrepp, till exempel RBM" className="pl-9" /></div>
    <p role="status" className="mt-6 text-sm text-muted-foreground">{results.length} begrepp</p>
    <div className="mt-4 grid gap-x-12 sm:grid-cols-2">{results.map((entry) => <Link key={entry.term} to="/blogg/$slug" params={{ slug: entry.article }} className="group border-t border-border py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><div className="flex items-start justify-between gap-4"><h2 className="text-xl leading-snug tracking-normal transition-colors group-hover:text-logo-blue">{entry.term}</h2><ArrowUpRight aria-hidden className="mt-1 size-4 shrink-0 text-muted-foreground group-hover:text-logo-blue" /></div><p className="mt-3 line-clamp-2 leading-relaxed text-muted-foreground">{entry.definition}</p></Link>)}</div>
    {results.length === 0 ? <div className="py-10"><h2 className="text-xl tracking-normal">Inga begrepp hittades</h2><Button variant="outline" className="mt-5" onClick={() => setQuery("")}>Visa hela ordlistan</Button></div> : null}
  </section></KnowledgeLayout>;
}
