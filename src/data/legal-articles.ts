/**
 * The articles on rules and law. They are collected on /regler instead of the blog's reading list,
 * and keep their addresses under /blogg so existing links still work.
 */
export const LEGAL_ARTICLES = ["rcs-gdpr-samtycke", "rcs-kopta-telefonnummer", "rcs-reklam-till-foretag"] as const;

export const isLegalArticle = (slug: string) => (LEGAL_ARTICLES as readonly string[]).includes(slug);
