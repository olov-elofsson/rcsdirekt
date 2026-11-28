import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change: two more sources for the iPhone and Android illustrations, with screenshots
// that confirm the iPhone header, contact card and link previews (Text-Em-All) and the stacked
// carousel with its counter (Postscript). They are added to the sections the pictures follow.

const SLUG = 'rcs-iphone-android-skillnader'

const SOURCES = [
  {
    sourceId: 'textemall-ios-android',
    title: 'Text-Em-All: RCS on iPhone and Android, what differs and how to use it',
    url: 'https://www.text-em-all.com/blog/rcs-on-iphone-vs-android',
    finding:
      'Skärmdumpar visar att iPhone har avsändarens logotyp och namn överst med en meny till höger, ett kontaktkort utan banner med reglage, Om och Detaljer, och att en länkförhandsvisning visas som en egen bubbla bara när länken står sist i texten. Android visar förhandsvisningen i samma bubbla och profilen med banner och knappar med etiketter.',
    implication: 'Skärmdumparna är från en leverantör och visar en viss version av iOS och Google Meddelanden.',
  },
  {
    sourceId: 'postscript-ios-carousel',
    title: 'Postscript: Guide to Media in RCS Cards and Carousels',
    url: 'https://help.postscript.io/en/articles/14426697-guide-to-media-in-rcs-cards-and-carousels',
    finding: 'På iOS ser mottagaren ett kort i taget i en hög, med en räknare som "1 av N" ovanför, och sveper åt sidan mellan korten.',
    implication: 'Karusellen fungerar på iPhone, men bara ett kort syns i taget.',
  },
]

const ADD: Record<string, string[]> = {
  bilder: ['textemall-ios-android', 'postscript-ios-carousel'],
  avsandaren: ['textemall-ios-android'],
}

type StoredSection = { sectionId?: string | null; sources?: (number | { id: number })[] }

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const findSource = async (id: string) =>
    (await payload.find({ collection: 'kallor', where: { sourceId: { equals: id } }, depth: 0, limit: 1, req })).docs[0]?.id as
      | number
      | undefined
  for (const source of SOURCES) {
    if (await findSource(source.sourceId)) continue
    await payload.create({ collection: 'kallor', req, context: { skipRebuild: true }, data: source as never })
  }
  const found = await payload.find({ collection: 'artiklar', where: { slug: { equals: SLUG } }, depth: 0, limit: 1, req })
  const article = found.docs[0] as unknown as { id: number; sections: StoredSection[] } | undefined
  if (!article) {
    payload.logger.warn(`Migration: article ${SLUG} not found; skipped.`)
    return
  }
  let changed = false
  const sections: StoredSection[] = []
  for (const section of article.sections) {
    const extra = section.sectionId ? ADD[section.sectionId] : undefined
    if (!extra) {
      sections.push(section)
      continue
    }
    const current = (section.sources ?? []).map((source) => (typeof source === 'number' ? source : source.id))
    const ids = (await Promise.all(extra.map(findSource))).filter((id): id is number => id !== undefined && !current.includes(id))
    if (ids.length) changed = true
    sections.push({ ...section, sources: [...current, ...ids] })
  }
  if (!changed) return
  // No skipRebuild here, so the site is rebuilt with the new sources.
  await payload.update({ collection: 'artiklar', id: article.id, req, data: { sections } as never })
  payload.logger.info('Migration: sources for the iPhone and Android illustrations added.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the sources can be removed in the CMS if they are not wanted.
}
