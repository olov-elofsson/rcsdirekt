import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: short, plain section headings on the start page that match
// the menu ("RCS och sms", "Priser", "Guider"). Each heading changes only if it still reads as
// before, so later edits in the CMS are kept.
type Doc = Record<string, any>

const HEADINGS: [section: string, from: string, to: string][] = [
  ['jamforelse', 'Det RCS kan som sms inte kan', 'RCS och sms'],
  ['vagar', 'Skicka från webben eller koppla in era system', 'Webb och API'],
  ['pris', 'Betala per meddelande', 'Priser'],
  ['blogg', 'Guider om RCS', 'Guider'],
  ['kontakt', 'Prata med oss', 'Kontakt'],
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Doc
  if (!startsida.hero?.title) {
    payload.logger.warn('Migration: no start page content yet, headings not changed.')
    return
  }
  const data: Doc = {}
  for (const [section, from, to] of HEADINGS) {
    if (startsida[section]?.heading === from) data[section] = { ...startsida[section], heading: to }
  }
  if (Object.keys(data).length) await payload.updateGlobal({ slug: 'startsida', req, data: data as never })
  payload.logger.info(`Migration: ${Object.keys(data).length} start page headings shortened.`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: earlier headings are in git history if they are ever needed.
}
