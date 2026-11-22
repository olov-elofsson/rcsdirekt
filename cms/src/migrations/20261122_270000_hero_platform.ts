import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: the start page intro also says what the service runs on,
// a global platform with direct connections to the operators. Changes only the earlier wording.
const FROM = [
  'RCS är nästa steg efter SMS. Utskicket kommer med ert namn och er logga, och kunden ser bilder och trycker på knappar direkt i sin vanliga meddelandeapp. Ni skickar från webben eller via API och betalar per meddelande.',
  'RCS är nästa steg efter sms. Utskicket kommer med ert namn och er logga, och kunden ser bilder och trycker på knappar direkt i sin vanliga meddelandeapp. Ni skickar från webben eller via API och betalar per meddelande.',
]
const TO =
  'RCS är nästa steg efter SMS. Utskicket kommer med ert namn och er logga, och kunden ser bilder och trycker på knappar direkt i sin vanliga meddelandeapp. Bakom ligger en global plattform med direktkopplingar till operatörerna. Ni skickar från webben eller via API och betalar per meddelande.'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Record<string, any>
  if (!FROM.includes(startsida.hero?.description)) {
    payload.logger.info('Migration: start page intro already changed.')
    return
  }
  await payload.updateGlobal({ slug: 'startsida', req, data: { hero: { ...startsida.hero, description: TO } } as never })
  payload.logger.info('Migration: start page intro mentions the global platform.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier text is in git history if it is ever needed.
}
