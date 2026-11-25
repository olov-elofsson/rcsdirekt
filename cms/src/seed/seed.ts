// Fills an empty database from content.json, a copy of the live /api/site-content (November 2026:
// current prices, the ten shown articles and the start page). Off in production (SEED_ON_EMPTY=false
// in the Dockerfile). Hidden articles and their redirects are not in the copy. A collection that
// already has documents is skipped, so an import interrupted halfway must be finished by hand.
import type { Payload } from 'payload'

import type { SiteContent } from '../lib/site-content-types'
import initial from './content.json'

const context = { skipRebuild: true }

export async function seedIfEmpty(payload: Payload): Promise<void> {
  if (process.env.SEED_ON_EMPTY === 'false') return
  const content = initial as unknown as SiteContent
  const isEmpty = async (collection: 'kallor' | 'artiklar') =>
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

  if (await isEmpty('artiklar')) {
    payload.logger.info('Seed: importing articles.')
    for (const article of content.kunskap.articles) {
      await payload.create({
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
    data: home as never,
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

  payload.logger.info('Seed: done.')
}
