// Fills an empty database from content.json, a copy of the live /api/site-content (November 2026:
// current prices, the ten shown articles and the start page). Off in production (SEED_ON_EMPTY=false
// in the Dockerfile). Hidden articles and their redirects are not in the copy. A collection that
// already has documents is skipped, so an import interrupted halfway must be finished by hand.
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
  const content = initial as unknown as SiteContent
  const isEmpty = async (collection: 'kallor' | 'artiklar' | 'begrepp' | 'kundcase') =>
    (await payload.count({ collection })).totalDocs === 0

  const sourceIds = new Map<string, number | string>()
  if (await isEmpty('kallor')) {
    payload.logger.info('Seed: importing sources.')
    for (const source of content.kunskap.sources) {
      const doc = await payload.create({ collection: 'kallor', data: { sourceId: source.id, title: source.title, url: source.url, finding: source.finding, implication: source.implication }, context })
      sourceIds.set(source.id, doc.id)
    }
  } else {
    const { docs } = await payload.find({ collection: 'kallor', limit: 0, pagination: false, depth: 0 })
    for (const doc of docs) sourceIds.set(doc.sourceId as string, doc.id)
  }

  const articleIds = new Map<string, number | string>()
  if (await isEmpty('artiklar')) {
    payload.logger.info('Seed: importing articles.')
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
  } else {
    const { docs } = await payload.find({ collection: 'artiklar', limit: 0, pagination: false, depth: 0, select: { slug: true } })
    for (const doc of docs) articleIds.set(doc.slug as string, doc.id)
  }

  if (await isEmpty('begrepp')) {
    payload.logger.info('Seed: importing glossary.')
    for (const entry of content.kunskap.glossary) {
      await payload.create({
        collection: 'begrepp',
        context,
        data: { term: entry.term, aliases: entry.aliases, definition: entry.definition, source: sourceIds.get(entry.source) as never, article: articleIds.get(entry.article) as never },
      })
    }
  }

  if (await isEmpty('kundcase')) {
    payload.logger.info('Seed: importing customer cases.')
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
  }

  // Globals count as imported once the start page has a hero title.
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0 })) as { hero?: { title?: string } }
  if (startsida.hero?.title) return
  payload.logger.info('Seed: importing page content.')

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

  payload.logger.info('Seed: done.')
}
