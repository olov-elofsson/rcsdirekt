import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { triggerSiteRebuild } from '../lib/rebuild'

// Content change: the blog's overlapping topics become one each. "För företag" joins "Företag",
// "Meddelanden" joins "Meddelandedesign" and "Integration" joins "Teknik". The next migration
// removes the three old options from the field.
const MERGE: [from: string, to: string][] = [
  ['För företag', 'Företag'],
  ['Meddelanden', 'Meddelandedesign'],
  ['Integration', 'Teknik'],
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  let moved = 0
  for (const [from, to] of MERGE) {
    const { docs } = await payload.find({ collection: 'artiklar', where: { category: { equals: from } }, depth: 0, limit: 0, pagination: false, req })
    for (const doc of docs) {
      await payload.update({ collection: 'artiklar', id: doc.id, data: { category: to } as never, req, context: { skipRebuild: true } })
      moved++
    }
  }
  if (req.context) req.context.skipRebuild = false
  payload.logger.info(`Migration: ${moved} articles moved to merged topics.`)
  // The articles were saved without a build each; one build now brings the new topics to the site.
  if (moved) await triggerSiteRebuild(req, 'ämnen i bloggen sammanslagna')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier topics are in git history if they are ever needed.
}
