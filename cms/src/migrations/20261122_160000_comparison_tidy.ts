import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: the comparison loses "Analys och insikter", which says
// what the rows "Klickfrekvens (CTR)" and "Läskvitton" now say in more detail. Only removed while
// it still reads as before and those rows exist, so later edits in the CMS are kept.
type Row = { label: string; sms: string; rcs: string }

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Record<string, any>
  const rows = (startsida.jamforelse?.rows ?? []) as Row[]
  const covered = rows.some((row) => row.label === 'Klickfrekvens (CTR)') && rows.some((row) => row.label === 'Läskvitton')
  const next = rows.filter((row) => !(covered && row.label === 'Analys och insikter' && row.sms === 'Levererat' && row.rcs === 'Levererat, sett, klick'))
  if (next.length !== rows.length) {
    await payload.updateGlobal({ slug: 'startsida', req, data: { jamforelse: { ...startsida.jamforelse, rows: next } } as never })
    payload.logger.info('Migration: duplicate comparison row removed.')
  } else payload.logger.info('Migration: comparison rows already tidy.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the row is in git history if it is ever needed.
}
