// Copy of src/content/types.ts in the site. The CMS produces this shape at /api/site-content.
// Keep the two files identical.

export type Seo = { title: string; description: string };

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
  /** Shown as "Av …"; empty means rcsdirekt.se. */
  author?: string;
  /** Large picture under the heading; without one the site picks a customer-case photo. */
  image?: { url: string; alt: string; width: number; height: number } | null;
  sections: Section[];
  related: string[];
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
    networksHeading?: string;
    networksNote?: string;
    /** Every network with its list price per type; an empty price means the network does not take that type. */
    networks?: NetworkPrice[];
  };
  /** Upcoming webinars, earliest first. Missing in content from before webinars existed. */
  webinarer?: Webinar[];
  /** /integritetspolicy and /villkor. Missing in content from before the pages existed. */
  juridiskt?: { integritetspolicy: LegalPage; villkor: LegalPage };
  /** `redirects`: old addresses of articles hidden in the CMS and the article each now leads to. */
  kunskap: { sources: Source[]; articles: Article[]; redirects?: { from: string; to: string }[] };
};

/** A section's body: paragraphs split at blank lines; lines starting with "- " form a list. */
export type LegalPage = { title: string; description: string; updated: string; sections: { heading: string; body: string }[] };

export type NetworkPrice = { network: string; host: string; basic: string; single: string; conversation: string; sms: string };
