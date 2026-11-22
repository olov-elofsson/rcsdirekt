import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { triggerSiteRebuild } from '../lib/rebuild'

// Content change: the owner writes the articles and is named as author ("Av Olov Elofsson").
// Only articles without an author are changed.
const AUTHOR = 'Olov Elofsson'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const { docs } = await payload.find({ collection: 'artiklar', depth: 0, limit: 0, pagination: false, req })
  const missing = docs.filter((doc) => !(doc as { author?: string }).author)
  for (const doc of missing) {
    await payload.update({ collection: 'artiklar', id: doc.id, data: { author: AUTHOR } as never, req, context: { skipRebuild: true } })
  }
  if (req.context) req.context.skipRebuild = false
  if (missing.length) await triggerSiteRebuild(req, 'författare på artiklarna')
  payload.logger.info(`Migration: author set on ${missing.length} articles.`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: clear the field in the CMS if it is ever needed.
}
