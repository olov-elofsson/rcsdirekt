import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { configured, removedSlug } from '../lib/removed-slugs'

// Content change, not a schema change: the owner removed the DreamCare customer case from the site,
// so it goes from the CMS too. Its photo stays in the media library.
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  if (!configured(payload, 'kundcase')) return
  const { docs } = await payload.find({
    collection: removedSlug('kundcase'),
    where: { or: [{ name: { like: 'DreamCare' } }, { slug: { equals: 'dreamcare' } }] },
    depth: 0,
    limit: 10,
    req,
  })
  for (const doc of docs) {
    await payload.delete({ collection: removedSlug('kundcase'), id: doc.id, req })
  }
  payload.logger.info(`Migration: removed ${docs.length} DreamCare customer case(s).`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the case is in git history (cms/src/seed/content.json) if it is ever needed.
}
