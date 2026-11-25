import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change: search-result descriptions. Two articles had descriptions under 110 characters,
// and the privacy policy's said "rcsdirekt.se och rcsdirekt.se". Changes only the previous wording,
// so later edits in the CMS are kept.
const ARTICLES: [slug: string, from: string, to: string][] = [
  [
    'verifierad-avsandare',
    'Verifieringen kontrollerar att RCS-avsändaren hör ihop med varumärket den företräder.',
    'Verifieringen kontrollerar att RCS-avsändaren hör ihop med varumärket den företräder. Så går det till och vad kunden ser i meddelandeappen.',
  ],
  [
    'rcs-gdpr-samtycke',
    'Företaget ansvarar för personuppgifterna och för reglerna om marknadsföring även när utskicket går som RCS.',
    'Företaget ansvarar för personuppgifterna och för reglerna om marknadsföring även när utskicket går som RCS. Så gäller GDPR och marknadsföringslagen.',
  ],
]
const PRIVACY_FROM = 'när du använder rcsdirekt.se och rcsdirekt.se.'
const PRIVACY_TO = 'när du använder rcsdirekt.se.'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  for (const [slug, from, to] of ARTICLES) {
    const { docs } = await payload.find({ collection: 'artiklar', where: { slug: { equals: slug } }, depth: 0, limit: 1, req })
    const doc = docs[0] as { id: number | string; description?: string } | undefined
    if (!doc || doc.description !== from) {
      payload.logger.info(`Migration: description for ${slug} already changed.`)
      continue
    }
    await payload.update({ collection: 'artiklar', id: doc.id, req, data: { description: to } as never })
  }
  const juridiskt = (await payload.findGlobal({ slug: 'juridiskt', depth: 0, req })) as Record<string, any>
  const description: string = juridiskt.integritetspolicy?.description ?? ''
  if (description.includes(PRIVACY_FROM)) {
    await payload.updateGlobal({
      slug: 'juridiskt',
      req,
      data: { integritetspolicy: { ...juridiskt.integritetspolicy, description: description.replace(PRIVACY_FROM, PRIVACY_TO) } } as never,
    })
  }
  payload.logger.info('Migration: search descriptions updated.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier wording is in git history if it is ever needed.
}
