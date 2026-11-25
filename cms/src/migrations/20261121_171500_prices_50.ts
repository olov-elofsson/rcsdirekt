import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { configured, removedSlug } from '../lib/removed-slugs'

// Content change, not a schema change: new prices with a 50 % markup on the
// purchase price (Basic 0,30 → 0,45, Single 0,425 → 0,64, Conversation 0,63 → 0,95,
// rounded up to whole öre), everywhere the prices are written out, and the
// DreamCare case named by the company name only.
const PRICE_TEXT: [string, string][] = [
  ['Basic 0,30 SEK, Single 0,425 SEK och Conversation 0,63 SEK', 'Basic 0,45 SEK, Single 0,64 SEK och Conversation 0,95 SEK'],
  ['Från 0,30 SEK per meddelande', 'Från 0,45 SEK per meddelande'],
  ['börjar på 0,30 SEK', 'börjar på 0,45 SEK'],
]
const PLAN_PRICES: Record<string, string> = { 'RCS Basic': '0,45 SEK', 'RCS Single': '0,64 SEK', 'RCS Conversation': '0,95 SEK' }

const replaceAll = (text: unknown, pairs: [string, string][]) =>
  typeof text === 'string' ? pairs.reduce((value, [from, to]) => value.split(from).join(to), text) : text

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const priser = (await payload.findGlobal({ slug: 'priser', depth: 0, req })) as Record<string, any>
  await payload.updateGlobal({
    slug: 'priser',
    req,
    data: {
      plans: (priser.plans ?? []).map((plan: Record<string, any>) => ({ ...plan, price: PLAN_PRICES[plan.name] ?? plan.price })),
      seo: { ...priser.seo, description: replaceAll(priser.seo?.description, PRICE_TEXT) },
    } as never,
  })

  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Record<string, any>
  await payload.updateGlobal({
    slug: 'startsida',
    req,
    data: { seo: { ...startsida.seo, description: replaceAll(startsida.seo?.description, PRICE_TEXT) } } as never,
  })

  if (configured(payload, 'demo')) {
    const demo = (await payload.findGlobal({ slug: removedSlug('demo'), depth: 0, req })) as Record<string, any>
    await payload.updateGlobal({
      slug: removedSlug('demo'),
      req,
      data: { replies: (demo.replies ?? []).map((reply: Record<string, any>) => ({ ...reply, copy: replaceAll(reply.copy, PRICE_TEXT) })) } as never,
    })
  }

  const { docs: articles } = await payload.find({ collection: 'artiklar', where: { slug: { equals: 'vad-kostar-rcs' } }, depth: 0, limit: 1, req })
  for (const article of articles as Record<string, any>[]) {
    await payload.update({
      collection: 'artiklar',
      id: article.id,
      req,
      data: {
        sections: article.sections.map((section: Record<string, any>) => ({
          ...section,
          paragraphs: (section.paragraphs ?? []).map((row: Record<string, any>) => ({ ...row, text: replaceAll(row.text, PRICE_TEXT) })),
        })),
      } as never,
    })
  }

  if (configured(payload, 'kundcase')) {
    const { docs: cases } = await payload.find({ collection: removedSlug('kundcase'), where: { name: { equals: 'DreamCare Omsorg AB' } }, depth: 0, req })
    for (const item of cases) await payload.update({ collection: removedSlug('kundcase'), id: item.id, req, data: { name: 'DreamCare' } as never })
  }

  payload.logger.info('Migration: prices with 50 % markup and DreamCare renamed.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: earlier values are in git history if they are ever needed.
}
