import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: the start page lists five advantages. The fifth is the
// verified sender (Google's brand verification shows the name, logo and a blue check).
type Doc = Record<string, any>

const FIFTH = {
  icon: 'shield',
  title: 'Verifierad avsändare',
  copy: 'Kunden ser ert företagsnamn, er logotyp och en blå bock i stället för ett nummer. Avsändaren är kontrollerad innan den får skicka.',
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Doc
  const fordelar = startsida.fordelar as Doc | undefined
  if (!fordelar?.heading) {
    payload.logger.warn('Migration: no start page content yet, advantages not changed.')
    return
  }
  const items = (fordelar.items ?? []) as Doc[]
  const hasFifth = items.some((item) => item.title === FIFTH.title)
  const heading = fordelar.heading === 'Varför företag väljer RCS' ? 'Fem skäl att välja RCS' : fordelar.heading
  if (hasFifth && heading === fordelar.heading) return
  await payload.updateGlobal({
    slug: 'startsida',
    req,
    data: { fordelar: { ...fordelar, heading, items: hasFifth ? items : [...items, FIFTH] } } as never,
  })
  payload.logger.info('Migration: five advantages on the start page.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: edit the advantages in the CMS if they need to change back.
}
