import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, Briefcase, Building2, Clock, Code2, Cpu, Library, MessageSquare, Palette, Smartphone, type LucideIcon } from "lucide-react";

import type { ArticleSummary } from "@/content";
import { cn } from "@/lib/utils";

export type ArticleItem = ArticleSummary;

/** One icon per topic, so the topic is recognisable before its name is read. */
const TOPIC_ICONS: Record<string, LucideIcon> = {
  Grunder: BookOpen,
  "För företag": Briefcase,
  Företag: Building2,
  Meddelanden: MessageSquare,
  Meddelandedesign: Palette,
  Integration: Code2,
  Teknik: Cpu,
  "Mobil & operatörer": Smartphone,
  Begrepp: Library,
};
export const topicIcon = (topic: string): LucideIcon => TOPIC_ICONS[topic] ?? BookOpen;

const dateFormat = new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "long", year: "numeric" });
export function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? value : dateFormat.format(date);
}

/** An article as a card: topic with its icon, title, summary, reading time. */
export function ArticleCard({ article, className }: { article: ArticleItem; className?: string }) {
  const Icon = topicIcon(article.category);
  return (
    <Link
      to="/blogg/$slug"
      params={{ slug: article.slug }}
      className={cn("group flex min-w-0 flex-col rounded-2xl bg-card p-6 shadow-card transition-[box-shadow,translate] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-safe:hover:-translate-y-0.5 hover:shadow-card-hover", className)}
    >
      <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        <span aria-hidden className="grid size-7 place-items-center rounded-lg bg-primary-soft text-logo-blue"><Icon strokeWidth={2} className="size-3.5" /></span>
        {article.category}
      </span>
      <h3 className="mt-4 text-lg font-extrabold leading-snug text-balance transition-colors group-hover:text-logo-blue">{article.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-pretty text-muted-foreground">{article.description}</p>
      <span className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs font-semibold text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><Clock aria-hidden className="size-3.5" />{article.minutes} min läsning</span>
        <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
