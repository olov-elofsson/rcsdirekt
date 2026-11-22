import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: a hero heading that says what the service is, with the
// search term first. Changes only if both lines still read as before, so later edits are kept.
type Doc = Record<string, any>

const FROM = { title: 'Meddelanden kunden känner igen', highlight: 'och kan svara på' }
const TO = { title: 'RCS för företag', highlight: 'med logotyp och knappar' }

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Doc
  const hero = startsida.hero as Doc | undefined
  if (hero?.title !== FROM.title || hero?.highlight !== FROM.highlight) {
    payload.logger.info('Migration: hero heading already changed, left as it is.')
    return
  }
  await payload.updateGlobal({ slug: 'startsida', req, data: { hero: { ...hero, ...TO } } as never })
  payload.logger.info('Migration: hero heading changed.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier heading is in git history if it is ever needed.
}
