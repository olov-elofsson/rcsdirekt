import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

// Schema: each advantage on the start page gets an optional "Med sms" line, so the list shows
// what RCS adds compared with sms. Content: fills in that line for the five current advantages,
// only where the title is unchanged and the line is still empty, so edits in the CMS are kept.
type Doc = Record<string, any>

const SMS_LINES: Record<string, string> = {
  'Kunden ser att det är ni': 'Ett nummer eller ett kort avsändarnamn, utan logotyp.',
  'Svar med ett tryck': 'Kunden skriver svaret själv eller öppnar en länk.',
  'Visa vad det gäller': 'Bara text och länkar.',
  'Ni ser vad som händer': 'Ni ser om meddelandet har levererats, men inte om det har lästs.',
  'Ingen ny app': 'Ingen app behövs här heller, och sms fungerar i alla mobiler.',
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Payload also proposed dropping media.prefix and media._objectkey: the GCS storage plugin adds
  // them only when its bucket is configured, so they exist in production and must stay.
  await db.execute(sql`
   ALTER TABLE "startsida_fordelar_items" ADD COLUMN "sms" varchar;`)

  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Doc
  const items = (startsida.fordelar?.items ?? []) as Doc[]
  if (!items.length) {
    payload.logger.warn('Migration: no advantages yet, sms lines not added.')
    return
  }
  let changed = 0
  const next = items.map((item) => {
    const line = SMS_LINES[item.title]
    if (!line || item.sms) return item
    changed++
    return { ...item, sms: line }
  })
  if (changed) await payload.updateGlobal({ slug: 'startsida', req, data: { fordelar: { ...startsida.fordelar, items: next } } as never })
  payload.logger.info(`Migration: sms lines added to ${changed} advantages.`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "startsida_fordelar_items" DROP COLUMN "sms";`)
}
