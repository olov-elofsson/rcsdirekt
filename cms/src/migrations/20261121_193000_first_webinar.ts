import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: the first webinar. Edit or move it in the CMS.
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const { totalDocs } = await payload.count({ collection: 'webinarer', req })
  if (totalDocs > 0) return
  await payload.create({
    collection: 'webinarer',
    req,
    data: {
      title: 'Lär dig allt om RCS',
      description:
        'Vi går igenom vad RCS är, hur meddelandena ser ut hos mottagaren och hur ni skickar ert första utskick. Ta gärna med dina frågor.',
      startsAt: '2027-01-13T13:00:00.000Z', // tisdag 13 januari 2027 kl. 14.00 svensk tid
      durationMinutes: 45,
      visible: true,
    },
  })
  payload.logger.info('Migration: first webinar added.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: remove the webinar in the CMS if it is ever unwanted.
}
