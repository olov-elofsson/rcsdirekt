import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change: section headings on the start page become sentences, as on fortnox.se, instead
// of the menu words (Jämför, Priser …).
// Each heading changes only if it is still the menu word, so later edits in the CMS are kept.
type Doc = Record<string, any>

const HEADINGS: [section: string, from: string, to: string][] = [
  ['jamforelse', 'Jämför', 'Det RCS kan som SMS inte kan'],
  ['pris', 'Priser', 'Tydliga listpriser per meddelande'],
  ['blogg', 'Insikter', 'Guider och nyheter om RCS'],
  ['kontakt', 'Kontakt', 'Prata med oss'],
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Doc
  if (!startsida.pris?.heading) {
    payload.logger.warn('Migration: no start page content yet, headings not changed.')
    return
  }
  const data: Doc = {}
  for (const [section, from, to] of HEADINGS) {
    if (startsida[section]?.heading === from) data[section] = { ...startsida[section], heading: to }
  }
  if (Object.keys(data).length) await payload.updateGlobal({ slug: 'startsida', req, data: data as never })
  payload.logger.info(`Migration: ${Object.keys(data).length} start page headings written as sentences.`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the menu words are in the code as labels, and in git history.
}
