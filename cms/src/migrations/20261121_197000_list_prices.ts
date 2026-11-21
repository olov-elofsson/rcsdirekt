import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: list prices per operator (from the price list of
// November 2026), with the lowest as the "from" price. The purchase price is not stored here.
// Texts that state the old prices are updated where they still read as before.

type Doc = Record<string, any>

const OPERATORS = ['Telia', 'Tele2', 'Telenor', 'Tre', 'Övriga operatörer']
const LIST_PRICES: Record<string, string[]> = {
  basic: ['0,346', '0,326', '0,363', '0,316', '0,346'],
  single: ['0,483', '0,462', '0,557', '0,481', '0,483'],
  conversation: ['0,694', '0,662', '0,988', '0,641', '0,694'],
}
const lowest = (prices: string[]) => prices.reduce((a, b) => (Number(b.replace(',', '.')) < Number(a.replace(',', '.')) ? b : a))

const TEXT: [string, string][] = [
  ['Basic 0,45 SEK, Single 0,64 SEK och Conversation 0,95 SEK', 'Basic från 0,316 SEK, Single från 0,462 SEK och Conversation från 0,641 SEK'],
  ['Från 0,45 SEK per meddelande', 'Från 0,316 SEK per meddelande'],
  ['börjar på 0,45 SEK', 'börjar på 0,316 SEK'],
]
const replaceAll = (text: unknown) => (typeof text === 'string' ? TEXT.reduce((value, [from, to]) => value.split(from).join(to), text) : text)

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const priser = (await payload.findGlobal({ slug: 'priser', depth: 0, req })) as Doc
  // An empty pricing global (a new database) has nothing to update; never stop the CMS over it.
  if (!priser.heading || !(priser.plans ?? []).length) {
    payload.logger.warn('Migration: no pricing content yet, list prices not set.')
    return
  }
  const plans = ((priser.plans ?? []) as Doc[]).map((plan) => {
    const prices = LIST_PRICES[plan.slug]
    if (!prices) return plan
    return {
      ...plan,
      price: `${lowest(prices)} SEK`,
      operatorPrices: OPERATORS.map((operator, index) => ({ operator, price: `${prices[index]} SEK` })),
    }
  })
  const operators = OPERATORS.map((name) => ({ name }))
  await payload.updateGlobal({
    slug: 'priser',
    req,
    data: { plans, operators, seo: { ...priser.seo, description: replaceAll(priser.seo?.description) } } as never,
  })

  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Doc
  const description = replaceAll(startsida.seo?.description)
  if (description !== startsida.seo?.description) await payload.updateGlobal({ slug: 'startsida', req, data: { seo: { ...startsida.seo, description } } as never })

  const demo = (await payload.findGlobal({ slug: 'demo', depth: 0, req })) as Doc
  const replies = ((demo.replies ?? []) as Doc[]).map((reply) => ({ ...reply, copy: replaceAll(reply.copy) }))
  await payload.updateGlobal({ slug: 'demo', req, data: { replies } as never })

  const { docs } = await payload.find({ collection: 'artiklar', where: { slug: { equals: 'vad-kostar-rcs' } }, depth: 0, limit: 1, req })
  for (const article of docs as Doc[]) {
    const sections = ((article.sections ?? []) as Doc[]).map((section) => ({
      ...section,
      paragraphs: ((section.paragraphs ?? []) as Doc[]).map((row) => ({ ...row, text: replaceAll(row.text) })),
    }))
    await payload.update({ collection: 'artiklar', id: article.id, req, data: { sections } as never })
  }

  payload.logger.info('Migration: list prices per operator.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: earlier prices are in git history if they are ever needed.
}
