import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content clean-up: images and sources nothing points at any more. Only articles use images now
// (the customer cases with their logos and photos are gone), and only articles cite sources.
// Hidden articles count too, so their redirects and history stay whole. Deleting an image also
// deletes its file in the bucket.
type Doc = Record<string, any>
const idOf = (value: unknown) => (value && typeof value === 'object' ? (value as Doc).id : value)
// The developer page links to these three directly (src/pages/DeveloperPage.tsx), so they stay.
const KEEP = new Set(['send', 'events', 'webhooks'])

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const { docs: articles } = await payload.find({ collection: 'artiklar', depth: 0, limit: 0, pagination: false, req })
  const usedImages = new Set((articles as Doc[]).map((article) => idOf(article.image)).filter(Boolean))
  const usedSources = new Set(
    (articles as Doc[]).flatMap((article) => (article.sections ?? []).flatMap((section: Doc) => (section.sources ?? []).map(idOf))),
  )

  const { docs: media } = await payload.find({ collection: 'media', depth: 0, limit: 0, pagination: false, req })
  const { docs: sources } = await payload.find({ collection: 'kallor', depth: 0, limit: 0, pagination: false, req })
  const context = { skipRebuild: true }
  let images = 0
  for (const doc of media) {
    if (usedImages.has(doc.id)) continue
    await payload.delete({ collection: 'media', id: doc.id, req, context })
    images++
  }
  let unused = 0
  for (const doc of sources) {
    if (usedSources.has(doc.id) || KEEP.has(doc.sourceId as string)) continue
    await payload.delete({ collection: 'kallor', id: doc.id, req, context })
    unused++
  }
  payload.logger.info(`Migration: removed ${images} unused image(s) and ${unused} unused source(s).`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Deleted images and sources cannot be restored by a migration.
}
