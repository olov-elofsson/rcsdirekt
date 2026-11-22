import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: the price page's intro in the same relaxed voice as the
// homepage. It changes only if it still reads as before, so an edit made in the CMS is kept.
const FROM = 'Listpris per skickat meddelande, för varje meddelandetyp och operatör. Det finns ingen månadskostnad eller bindningstid.'
const TO = 'Här är listpriset per meddelande för varje typ och operatör. Ni betalar bara för det ni skickar, och det finns ingen månadskostnad eller bindningstid.'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const priser = (await payload.findGlobal({ slug: 'priser', depth: 0, req })) as Record<string, any>
  if (priser.intro !== FROM) {
    payload.logger.info('Migration: price page intro already changed.')
    return
  }
  await payload.updateGlobal({ slug: 'priser', req, data: { intro: TO } as never })
  payload.logger.info('Migration: price page intro rewritten.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier text is in git history if it is ever needed.
}
