import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change: the webinar moves from Wednesday 13 January to Wednesday 17 February 2027, at
// the same time (14:00 Swedish time, 13:00 UTC). Changes only a webinar still on the old date.
const FROM = '2027-01-13T13:00:00.000Z'
const TO = '2027-02-17T13:00:00.000Z'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const { docs } = await payload.find({ collection: 'webinarer', depth: 0, limit: 100, req })
  const moved = docs.filter((doc) => new Date(String(doc.startsAt)).toISOString() === FROM)
  for (const doc of moved) {
    await payload.update({ collection: 'webinarer', id: doc.id, req, data: { startsAt: TO } as never })
  }
  payload.logger.info(`Migration: moved ${moved.length} webinar(s) to 17 February 2027.`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: move the date back in the CMS if needed.
}
