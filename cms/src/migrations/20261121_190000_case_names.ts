import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { configured, removedSlug } from '../lib/removed-slugs'

// Content change, not a schema change: the customer cases show the full company name.
// Names checked against the company registers (Bolagsverket via Allabolag, Finansinspektionen).
const FULL_NAMES: [string[], string][] = [
  [['DreamCare', 'DreamCare Omsorg AB'], 'DreamCare Omsorg AB'],
  [['Maptun', 'Maptun Performance AB'], 'Maptun Performance AB'],
  [['Nercia', 'Nercia Utbildning AB'], 'Nercia Utbildning AB'],
  [['Bilia', 'Bilia AB'], 'Bilia AB'],
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  if (!configured(payload, 'kundcase')) return
  for (const [names, fullName] of FULL_NAMES) {
    const { docs } = await payload.find({ collection: removedSlug('kundcase'), where: { name: { in: names } }, depth: 0, req })
    for (const item of docs) await payload.update({ collection: removedSlug('kundcase'), id: item.id, req, data: { name: fullName } as never })
  }
  payload.logger.info('Migration: customer cases use the full company names.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: earlier values are in git history if they are ever needed.
}
