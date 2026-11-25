import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change: the hero says the service in one line, the same as the start page's search
// description (the owner's USP). Changes only the previous wording, so later edits are kept.
const OLD =
  'Nå kunden med ert namn, er logga och knappar direkt i meddelandeappen. Skicka från webben eller via API och betala per meddelande.'
const NEW =
  'Skicka RCS från webben eller via API, med bilder, knappar och verifierad avsändare. Från 0,316 SEK per meddelande och utan månadsavgift.'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Record<string, any>
  if (startsida.hero?.description !== OLD) {
    payload.logger.info('Migration: hero text already changed.')
    return
  }
  await payload.updateGlobal({ slug: 'startsida', req, data: { hero: { ...startsida.hero, description: NEW } } as never })
  payload.logger.info('Migration: hero text is the USP.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier text is in git history if it is ever needed.
}
