import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change: a two-sentence hero text, without the unsourced count of operator connections.
// Changes only the previous wording, so later edits in the CMS are kept.
const OLD =
  'RCS är nästa steg efter SMS. Med oss når ni kunden med ert namn, er logga, bilder och knappar direkt i meddelandeappen, via ett ekosystem med över 800 direktkopplingar till operatörer världen över. Ni skickar från webben eller via API och betalar per meddelande.'
const NEW =
  'Nå kunden med ert namn, er logga och knappar direkt i meddelandeappen. Skicka från webben eller via API och betala per meddelande.'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Record<string, any>
  if (startsida.hero?.description !== OLD) {
    payload.logger.info('Migration: hero text already changed.')
    return
  }
  await payload.updateGlobal({ slug: 'startsida', req, data: { hero: { ...startsida.hero, description: NEW } } as never })
  payload.logger.info('Migration: hero text shortened.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier text is in git history if it is ever needed.
}
