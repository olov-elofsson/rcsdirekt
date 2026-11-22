// Shape of the site's editable content. Produced by the CMS (GET /api/site-content) and
// written to content.json at build time; content.json in git is the fallback snapshot.

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
  /** List price per operator, for the pricing page. Missing in content from before it existed. */
  operatorPrices?: { operator: string; price: string }[];
};
export type Availability = { code: string; name: string; available: boolean };

export type CustomerCase = {
  name: string;
  logo: { url: string; alt: string; width: number; height: number };
  /** Photo shown at the top of the card; null until one is uploaded (the card then shows a brand surface). The logo is not shown on the site. */
  image: { url: string; alt: string; width: number; height: number } | null;
  description: string;
  /** Presentation page under /demo/<slug>; empty when the case is not published yet. */
  slug: string;
};

export type Webinar = {
  title: string;
  description: string;
  /** Start as an ISO date in UTC. */
  startsAt: string;
  durationMinutes: number;
  /** External sign-up page; empty means sign-ups go through the form on the site. */
  registrationUrl: string;
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
    /** SMS list prices per operator, shown on /priser only. Missing in content from before SMS prices. */
    sms?: { name: string; contents: string; operatorPrices: { operator: string; price: string }[] };
    networksHeading?: string;
    networksNote?: string;
    /** Every network with its list price per type; an empty price means the network does not take that type. */
    networks?: NetworkPrice[];
  };
  kundcase: CustomerCase[];
  /** Upcoming webinars, earliest first. Missing in content from before webinars existed. */
  webinarer?: Webinar[];
  demo: {
    /** Six features whose positions are fixed in the phone illustration (id 1–6). */
    features: { id: number; title: string; copy: string }[];
    richCards: IconItem[];
    replies: { option: string; title: string; copy: string; actions: string[] }[];
  };
  /** /integritetspolicy and /villkor. Missing in content from before the pages existed. */
  juridiskt?: { integritetspolicy: LegalPage; villkor: LegalPage };
  /** `redirects`: old addresses of articles hidden in the CMS and the article each now leads to. */
  kunskap: { sources: Source[]; glossary: GlossaryTerm[]; articles: Article[]; redirects?: { from: string; to: string }[] };
};

/** A section's body: paragraphs split at blank lines; lines starting with "- " form a list. */
export type LegalPage = { title: string; description: string; updated: string; sections: { heading: string; body: string }[] };

export type NetworkPrice = { network: string; host: string; basic: string; single: string; conversation: string; sms: string };
