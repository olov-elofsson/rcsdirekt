import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { configured, removedSlug } from '../lib/removed-slugs'

// Content change, not a schema change: the start page headings use the same names as the menu
// (Kunder, Plattform, Insikter), whatever earlier wording they still have, and Nercia's case
// carries the company's registered name. Text edited to something else in the CMS is kept.
const HEADINGS: [group: string | null, field: string, from: string[], to: string][] = [
  [null, 'kundcaseHeading', ['Kundcase', 'Kundexempel'], 'Kunder'],
  ['vagar', 'heading', ['Webb och API', 'Skicka från webben eller koppla in era system'], 'Plattform'],
  ['blogg', 'heading', ['Guider', 'Guider om RCS'], 'Insikter'],
]

const CASE_NAMES: [from: string, to: string][] = [['Nercia Utbildning AB', 'NERCIA Utbildning Aktiebolag']]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // Cases first, without a site build each; the start page update below starts one build.
  for (const [from, to] of configured(payload, 'kundcase') ? CASE_NAMES : []) {
    const found = await payload.find({ collection: removedSlug('kundcase'), where: { name: { equals: from } }, depth: 0, limit: 10, req })
    for (const doc of found.docs) {
      await payload.update({ collection: removedSlug('kundcase'), id: doc.id, data: { name: to } as never, req, context: { skipRebuild: true } })
    }
    if (found.docs.length) payload.logger.info(`Migration: case renamed to ${to}.`)
  }
  if (req.context) req.context.skipRebuild = false

  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Record<string, any>
  const data: Record<string, any> = {}
  for (const [group, field, from, to] of HEADINGS) {
    if (group === null) {
      if (from.includes(startsida[field])) data[field] = to
    } else if (from.includes(startsida[group]?.[field])) {
      data[group] = { ...(data[group] ?? startsida[group]), [field]: to }
    }
  }
  if (!Object.keys(data).length) {
    payload.logger.info('Migration: start page names already match the menu.')
    return
  }
  await payload.updateGlobal({ slug: 'startsida', req, data: data as never })
  payload.logger.info(`Migration: start page names updated for ${Object.keys(data).join(', ')}.`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier text is in git history if it is ever needed.
}
