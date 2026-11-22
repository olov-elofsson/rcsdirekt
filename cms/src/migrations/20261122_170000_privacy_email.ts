import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: the privacy policy names info@rcsdirekt.se as the way to
// reach us about personal data, beside the form and post. Each sentence changes only if it still
// reads as in the first version, so later edits in the CMS are kept.
type Section = { heading: string; body: string }

const CHANGES: [from: string, to: string][] = [
  [
    'Frågor om dina uppgifter skickar du via kontaktformuläret på rcsdirekt.se eller med post till adressen ovan.',
    'Frågor om dina uppgifter skickar du till info@rcsdirekt.se, via kontaktformuläret på rcsdirekt.se eller med post till adressen ovan.',
  ],
  ['Hör av dig via kontaktformuläret eller med post. Vi svarar inom en månad.', 'Hör av dig till info@rcsdirekt.se, via kontaktformuläret eller med post. Vi svarar inom en månad.'],
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const juridiskt = (await payload.findGlobal({ slug: 'juridiskt', depth: 0, req })) as Record<string, any>
  const sections = (juridiskt.integritetspolicy?.sections ?? []) as Section[]
  const next = sections.map((section) => ({ ...section, body: CHANGES.reduce((body, [from, to]) => body.split(from).join(to), section.body) }))
  if (JSON.stringify(next) === JSON.stringify(sections)) {
    payload.logger.info('Migration: privacy policy contact already changed.')
    return
  }
  await payload.updateGlobal({ slug: 'juridiskt', req, data: { integritetspolicy: { ...juridiskt.integritetspolicy, sections: next } } as never })
  payload.logger.info('Migration: privacy policy names info@rcsdirekt.se.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier text is in git history if it is ever needed.
}
