import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change: short section headings under the hero, so the pricing heading is "Priser" again.
// Changes only the previous wording, so later edits in the CMS are kept.
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Record<string, any>
  if (startsida.pris?.heading !== 'Tydliga listpriser per meddelande') {
    payload.logger.info('Migration: pricing heading already changed.')
    return
  }
  await payload.updateGlobal({ slug: 'startsida', req, data: { pris: { ...startsida.pris, heading: 'Priser' } } as never })
  payload.logger.info('Migration: pricing heading shortened to Priser.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier heading is in git history if it is ever needed.
}
