import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: the owner's wording of the start page intro ("Med oss …").
// Changes only the previous wording.
const FROM = [
  'RCS är nästa steg efter SMS, med ert namn, er logga, bilder och knappar direkt i kundens meddelandeapp. Ni ansluter till ett ekosystem med över 800 direktkopplingar till operatörer världen över, så meddelandena går direkt till operatörerna och fram till kunden. Ni skickar från webben eller via API och betalar per meddelande.',
]
const TO =
  'RCS är nästa steg efter SMS. Med oss når ni kunden med ert namn, er logga, bilder och knappar direkt i meddelandeappen, via ett ekosystem med över 800 direktkopplingar till operatörer världen över. Ni skickar från webben eller via API och betalar per meddelande.'
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Record<string, any>
  if (!FROM.includes(startsida.hero?.description)) {
    payload.logger.info('Migration: start page intro already changed.')
    return
  }
  await payload.updateGlobal({ slug: 'startsida', req, data: { hero: { ...startsida.hero, description: TO } } as never })
  payload.logger.info('Migration: intro says what the customer gets with us.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier text is in git history if it is ever needed.
}
