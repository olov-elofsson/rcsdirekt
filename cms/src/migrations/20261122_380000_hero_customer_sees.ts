import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: the start page intro begins with what the customer sees.
// Changes only the previous wording.
const FROM = [
  'RCS är nästa steg efter SMS, med ert namn, er logga, bilder och knappar direkt i kundens meddelandeapp. Meddelandena går via över 800 direktkopplingar till operatörer världen över. Ni skickar från webben eller via API och betalar per meddelande.',
]
const TO =
  'Kunden ser vem som skriver innan hen öppnar meddelandet. Med RCS visas ert namn och er logga, och meddelandet kan ha bilder och knappar, i samma app som SMS. Meddelandena går via över 800 direktkopplingar till operatörer världen över. Skicka från webben eller via API och betala per meddelande.'
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Record<string, any>
  if (!FROM.includes(startsida.hero?.description)) {
    payload.logger.info('Migration: start page intro already changed.')
    return
  }
  await payload.updateGlobal({ slug: 'startsida', req, data: { hero: { ...startsida.hero, description: TO } } as never })
  payload.logger.info('Migration: intro starts with what the customer sees.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier text is in git history if it is ever needed.
}
