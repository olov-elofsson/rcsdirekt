import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: the start page headline is "RCS för företag i Sverige"
// instead of the slogan. It changes only if the slogan is still there, so a later edit is kept.
const FROM = { title: 'Det smidiga sättet att', highlight: 'skicka RCS' }
const TO = { title: 'RCS för företag', highlight: 'i Sverige' }

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Record<string, any>
  if (startsida.hero?.title !== FROM.title || startsida.hero?.highlight !== FROM.highlight) {
    payload.logger.info('Migration: start page headline already changed.')
    return
  }
  await payload.updateGlobal({ slug: 'startsida', req, data: { hero: { ...startsida.hero, ...TO } } as never })
  payload.logger.info('Migration: start page headline is "RCS för företag i Sverige".')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier headline is in git history if it is ever needed.
}
