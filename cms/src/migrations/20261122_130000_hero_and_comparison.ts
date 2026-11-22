import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: a hero heading that says what the service is, with the
// search term first, and a comparison heading that says it compares. Each changes only if it
// still reads as before, so later edits are kept.
type Doc = Record<string, any>

const FROM = { title: 'Meddelanden kunden känner igen', highlight: 'och kan svara på' }
const TO = { title: 'RCS för företag', highlight: 'med logotyp och knappar' }
const COMPARISON_FROM = ['RCS och sms', 'Det RCS kan som sms inte kan']
const COMPARISON_TO = 'RCS jämfört med sms'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Doc
  const hero = startsida.hero as Doc | undefined
  const data: Doc = {}
  if (hero?.title === FROM.title && hero?.highlight === FROM.highlight) data.hero = { ...hero, ...TO }
  if (COMPARISON_FROM.includes(startsida.jamforelse?.heading)) data.jamforelse = { ...startsida.jamforelse, heading: COMPARISON_TO }
  if (Object.keys(data).length) await payload.updateGlobal({ slug: 'startsida', req, data: data as never })
  payload.logger.info(`Migration: ${Object.keys(data).join(' and ') || 'no'} heading changed.`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier heading is in git history if it is ever needed.
}
