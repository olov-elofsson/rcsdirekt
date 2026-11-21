// Fills an empty database with the content the site had before the CMS existed
// (a copy of src/content/content.json). Runs once, when there are no articles yet.
import type { Payload } from 'payload'

import type { SiteContent } from '../lib/site-content-types'
import initial from './content.json'

const context = { skipRebuild: true }

async function fetchLogo(url: string): Promise<{ data: Buffer; mimetype: string; name: string; size: number } | null> {
  const base = process.env.SEED_ASSET_BASE_URL
  if (!base || !url) return null
  try {
    const response = await fetch(new URL(url, base))
    if (!response.ok) return null
    const data = Buffer.from(await response.arrayBuffer())
    const name = decodeURIComponent(url.split('/').pop() || 'logo')
    const mimetype = name.endsWith('.svg') ? 'image/svg+xml' : (response.headers.get('content-type') ?? 'image/png')
    return { data, mimetype, name, size: data.length }
  } catch {
    return null
  }
}

export async function seedIfEmpty(payload: Payload): Promise<void> {
  if (process.env.SEED_ON_EMPTY === 'false') return
  const { totalDocs } = await payload.count({ collection: 'artiklar' })
  if (totalDocs > 0) return

  const content = initial as SiteContent
  payload.logger.info('Empty database: importing the existing site content.')

  const sourceIds = new Map<string, number | string>()
  for (const source of content.kunskap.sources) {
    const doc = await payload.create({ collection: 'kallor', data: { sourceId: source.id, title: source.title, url: source.url, finding: source.finding, implication: source.implication }, context })
    sourceIds.set(source.id, doc.id)
  }

  const articleIds = new Map<string, number | string>()
  for (const article of content.kunskap.articles) {
    const doc = await payload.create({
      collection: 'artiklar',
      context,
      data: {
        title: article.title,
        slug: article.slug,
        category: article.category as never,
        published: article.published,
        description: article.description,
        keywords: article.keywords.map((keyword) => ({ keyword })),
        sections: article.sections.map((section) => ({
          sectionId: section.id,
          title: section.title,
          paragraphs: section.paragraphs.map((text) => ({ text })),
          points: section.points.map((text) => ({ text })),
          sources: section.sources.map((id) => sourceIds.get(id)).filter((id) => id !== undefined) as never,
        })),
      },
    })
    articleIds.set(article.slug, doc.id)
  }
  for (const article of content.kunskap.articles) {
    if (!article.related.length) continue
    await payload.update({
      collection: 'artiklar',
      id: articleIds.get(article.slug)!,
      context,
      data: { related: article.related.map((slug) => articleIds.get(slug)).filter((id) => id !== undefined) as never },
    })
  }

  for (const entry of content.kunskap.glossary) {
    await payload.create({
      collection: 'begrepp',
      context,
      data: { term: entry.term, aliases: entry.aliases, definition: entry.definition, source: sourceIds.get(entry.source) as never, article: articleIds.get(entry.article) as never },
    })
  }

  for (const item of content.kundcase) {
    const file = await fetchLogo(item.logo.url)
    if (!file) {
      payload.logger.warn(`Seed: could not fetch the logo for ${item.name}; add it in the CMS.`)
      continue
    }
    const logo = await payload.create({ collection: 'media', context, data: { alt: item.logo.alt }, file })
    await payload.create({
      collection: 'kundcase',
      context,
      data: { name: item.name, logo: logo.id, width: item.logo.width, height: item.logo.height, description: item.description, slug: item.slug },
    })
  }

  const home = content.startsida
  await payload.updateGlobal({
    slug: 'startsida',
    context,
    data: {
      ...home,
      blogg: { ...home.blogg, picks: home.blogg.picks.map((slug) => articleIds.get(slug)).filter((id) => id !== undefined) },
    } as never,
  })

  const pricing = content.priser
  await payload.updateGlobal({
    slug: 'priser',
    context,
    data: {
      ...pricing,
      operators: pricing.operators.map((name) => ({ name })),
      included: pricing.included.map((text) => ({ text })),
    } as never,
  })

  await payload.updateGlobal({
    slug: 'demo',
    context,
    data: {
      features: content.demo.features.map(({ title, copy }) => ({ title, copy })),
      richCards: content.demo.richCards,
      replies: content.demo.replies.map((reply) => ({ ...reply, actions: reply.actions.map((label) => ({ label })) })),
    } as never,
  })

  payload.logger.info(`Imported ${content.kunskap.articles.length} articles, ${content.kunskap.sources.length} sources and ${content.kunskap.glossary.length} glossary terms.`)
}
