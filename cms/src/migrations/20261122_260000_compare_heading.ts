import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: the comparison section is headed "Jämför", the same name as
// in the menu. Changes only an earlier wording of the heading, so a later edit is kept.
const FROM = ['RCS jämfört med SMS', 'RCS jämfört med sms', 'RCS och sms', 'RCS och SMS', 'Det RCS kan som sms inte kan', 'Det RCS kan som SMS inte kan']

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Record<string, any>
  if (!FROM.includes(startsida.jamforelse?.heading)) {
    payload.logger.info('Migration: comparison heading already changed.')
    return
  }
  await payload.updateGlobal({ slug: 'startsida', req, data: { jamforelse: { ...startsida.jamforelse, heading: 'Jämför' } } as never })
  payload.logger.info('Migration: comparison heading is "Jämför".')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier heading is in git history if it is ever needed.
}
