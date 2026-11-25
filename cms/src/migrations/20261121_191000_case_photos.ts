import { readFile } from 'node:fs/promises'
import path from 'node:path'

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { configured, removedSlug } from '../lib/removed-slugs'

// Content change, not a schema change: a photo at the top of each customer case card.
// The files ship with the CMS in public/kundcase and are uploaded to the media library
// once; a case that already has a photo keeps it.
const PHOTOS: { name: string; file: string; alt: string }[] = [
  { name: 'DreamCare Omsorg AB', file: 'dreamcare.webp', alt: 'En ung kvinna och en äldre kvinna skrattar tillsammans i en soffa hemma' },
  { name: 'Maptun Performance AB', file: 'maptun.webp', alt: 'En svart Saab i Maptuns verkstad, kopplad till en effektbänk' },
  { name: 'Nercia Utbildning AB', file: 'nercia.webp', alt: 'Nercias namn tryckt i blått på strukturerat papper' },
  { name: 'Bilia AB', file: 'bilia.webp', alt: 'Bilias skylt på en glasfasad mot en blå himmel' },
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  if (!configured(payload, 'kundcase')) return
  for (const photo of PHOTOS) {
    const { docs } = await payload.find({ collection: removedSlug('kundcase'), where: { name: { equals: photo.name } }, depth: 0, req })
    const missing = docs.filter((item) => !(item as { image?: unknown }).image)
    if (!missing.length) continue
    let data: Buffer
    try {
      data = await readFile(path.join(process.cwd(), 'public', 'kundcase', photo.file))
    } catch (error) {
      // Never stop the CMS from starting over a photo; it can be uploaded by hand instead.
      payload.logger.warn(`Migration: could not read ${photo.file} (${String(error)}); add the photo for ${photo.name} in the CMS.`)
      continue
    }
    const media = await payload.create({
      collection: 'media',
      req,
      data: { alt: photo.alt },
      file: { data, mimetype: 'image/webp', name: `kundcase-${photo.file}`, size: data.length },
    })
    for (const item of missing) await payload.update({ collection: removedSlug('kundcase'), id: item.id, req, data: { image: media.id } as never })
  }
  payload.logger.info('Migration: customer case photos added.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: remove the photos in the CMS if they are ever unwanted.
}
