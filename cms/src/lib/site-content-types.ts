// Copy of src/content/types.ts in the site. The CMS produces this shape at /api/site-content.
// Keep the two files identical.

export type Seo = { title: string; description: string };
export type IconItem = { icon: string; title: string; copy: string };

export type Source = {
  id: string;
  title: string;
  url: string;
  finding: string;
  implication: string;
};
export type Section = {
  id: string;
  title: string;
  paragraphs: string[];
  points: string[];
  sources: string[];
};
export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
  published: string;
  sections: Section[];
  related: string[];
};
export type GlossaryTerm = {
  term: string;
  aliases: string;
  definition: string;
  source: string;
  article: string;
};

export type PricingPlan = {
  name: string;
  slug: string;
  price: string;
  badge: string;
  short: string;
  copy: string;
  contents: string;
};
export type Availability = { code: string; name: string; available: boolean };

export type CustomerCase = {
  name: string;
  logo: { url: string; alt: string; width: number; height: number };
  /** Photo shown at the top of the card instead of the logo; null until one is uploaded. */
  image: { url: string; alt: string; width: number; height: number } | null;
  description: string;
  /** Presentation page under /demo/<slug>; empty when the case is not published yet. */
  slug: string;
};

export type SiteContent = {
  version: 1;
  startsida: {
    seo: Seo;
    hero: { title: string; highlight: string; description: string };
    kundcaseHeading: string;
    fordelar: { heading: string; intro: string; items: IconItem[] };
    /** "✓" renders a check mark and "✗" a cross; anything else is shown as text. */
    jamforelse: {
      heading: string;
      intro: string;
      rows: { label: string; sms: string; rcs: string }[];
    };
    vagar: { heading: string; intro: string; items: IconItem[] };
    pris: { heading: string; subheading: string; intro: string };
    blogg: { heading: string; intro: string; picks: string[] };
    kontakt: { heading: string; intro: string };
  };
  priser: {
    seo: Seo;
    heading: string;
    intro: string;
    plans: PricingPlan[];
    operators: string[];
    countries: Availability[];
    currencies: Availability[];
    selectorNote: string;
    vatNote: string;
    includedHeading: string;
    included: string[];
    faqHeading: string;
    faq: { question: string; answer: string }[];
    volumeText: string;
  };
  kundcase: CustomerCase[];
  demo: {
    /** Six features whose positions are fixed in the phone illustration (id 1–6). */
    features: { id: number; title: string; copy: string }[];
    richCards: IconItem[];
    replies: { option: string; title: string; copy: string; actions: string[] }[];
  };
  kunskap: { sources: Source[]; glossary: GlossaryTerm[]; articles: Article[] };
};
