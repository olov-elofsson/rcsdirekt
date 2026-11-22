import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: the comparison on the start page shows only rows where sms
// and RCS differ, and says what the sender profile holds instead of "Begränsad"/"Stark". Each row
// changes only if it still reads as before, so later edits in the CMS are kept.
type Row = { label: string; sms: string; rcs: string; id?: string }

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Record<string, any>
  const rows = (startsida.jamforelse?.rows ?? []) as Row[]
  if (!rows.length) {
    payload.logger.warn('Migration: no comparison rows yet, left as they are.')
    return
  }
  const next = rows
    // Both columns say "Ingen": no difference to show.
    .filter((row) => !(row.label === 'Installation' && row.sms === 'Ingen' && row.rcs === 'Ingen (inbyggt där det finns)'))
    .map((row) => {
      if (row.label === 'Avsändarprofil' && row.sms === 'Begränsad' && row.rcs === 'Stark')
        return { ...row, sms: 'Nummer eller kort namn', rcs: 'Namn, logotyp och beskrivning' }
      if (row.label === 'Tillgänglighet i Sverige' && row.rcs === 'Android 5.0 eller senare, iOS 18 eller senare')
        return { ...row, rcs: 'Android 5+ och iOS 18+' }
      return row
    })
  const changed = JSON.stringify(next) !== JSON.stringify(rows)
  if (changed) await payload.updateGlobal({ slug: 'startsida', req, data: { jamforelse: { ...startsida.jamforelse, rows: next } } as never })
  payload.logger.info(`Migration: comparison rows ${changed ? 'updated' : 'already changed'}.`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier rows are in git history if they are ever needed.
}
