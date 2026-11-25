import type { Payload } from 'payload'

// The customer cases, the glossary and the demo global were removed in 20261125_130000_remove_unused.
// Older content migrations still name them; on a fresh database they skip that part instead of failing.
export const configured = (payload: Payload, slug: string): boolean =>
  slug in payload.collections || payload.config.globals.some((global) => global.slug === slug)

/** A removed slug, untyped because the generated types no longer know it; the old migrations still compile. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removedSlug = (slug: 'kundcase' | 'begrepp' | 'demo'): any => slug
