import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change: the article on RCS on iPhone says which Swedish operators have opened it
// (November 2026), with the operators' own pages and a news report on the iOS 27.3 beta as
// sources. Runs once; the section is recognised by its anchor "operatorer".
const NEW_SOURCE = {
  sourceId: 'tre-hallon-ios-27-3',
  title: 'Hurbra.se: RCS på iPhone hos Tre och Hallon',
  url: 'https://hurbra.se/rcs-iphone-tre-hallon-ios-27-3/',
  finding: 'Hurbra.se rapporterar att RCS är aktiverat hos Tre i den första testversionen av iOS 27.3, som Apple släppte 3 november 2026, och att det också har testats med Hallon.',
  implication: 'Det gäller en testversion. Operatörerna har inte bekräftat när alla kunder får stödet.',
}

const SECTION = {
  sectionId: 'operatorer',
  title: 'Vilka operatörer har RCS på iPhone i Sverige?',
  paragraphs: [
    'Läget i november 2026: Tele2 och Comviq har öppnat RCS på iPhone för alla sina kunder. Hos Tre fungerar det i testversionen av iOS 27.3, som Apple släppte 3 november, och det har också testats med Hallon. Det kan komma till alla kunder med den färdiga uppdateringen, men operatörerna har inte bekräftat när. Telia och Telenor har inte bekräftat något stöd än.',
    'Använder du en vanlig iOS-version får du vänta på den uppdateringen. Det är sällan värt att installera en testversion bara för RCS. Listan ändras när fler operatörer kommer till, och det säkraste beskedet för just din linje står på operatörens egen supportsida.',
  ],
  points: ['Tele2: öppet för alla kunder', 'Comviq: öppet för alla kunder', 'Tre: fungerar i testversionen av iOS 27.3', 'Hallon: testat i testversionen av iOS 27.3', 'Telia: inget bekräftat stöd än', 'Telenor: inget bekräftat stöd än'],
  sources: ['tele2-rcs', 'comviq-rcs', 'tre-hallon-ios-27-3'],
}

const DESCRIPTION =
  'RCS kan användas i iPhones app Meddelanden från iOS 18, men operatören måste också ha stöd. I Sverige har Tele2 och Comviq öppnat för alla kunder, och Tre och Hallon testar.'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const existing = await payload.find({ collection: 'kallor', where: { sourceId: { equals: NEW_SOURCE.sourceId } }, depth: 0, limit: 1, req })
  if (!existing.docs.length) await payload.create({ collection: 'kallor', data: NEW_SOURCE as never, req, context: { skipRebuild: true } })

  const sourceIds: (number | string)[] = []
  for (const sourceId of SECTION.sources) {
    const found = await payload.find({ collection: 'kallor', where: { sourceId: { equals: sourceId } }, depth: 0, limit: 1, req })
    if (found.docs[0]) sourceIds.push(found.docs[0].id)
  }
  if (req.context) req.context.skipRebuild = false

  const { docs } = await payload.find({ collection: 'artiklar', where: { slug: { equals: 'rcs-pa-iphone' } }, depth: 0, limit: 1, req })
  const article = docs[0] as Record<string, any> | undefined
  if (!article || !sourceIds.length) {
    payload.logger.warn('Migration: rcs-pa-iphone or its sources missing, article not changed.')
    return
  }
  const sections = (article.sections ?? []) as Record<string, any>[]
  if (sections.some((section) => section.sectionId === SECTION.sectionId)) {
    payload.logger.info('Migration: iPhone operator section already there.')
    return
  }
  const section = {
    sectionId: SECTION.sectionId,
    title: SECTION.title,
    paragraphs: SECTION.paragraphs.map((text) => ({ text })),
    points: SECTION.points.map((text) => ({ text })),
    sources: sourceIds,
  }
  // Right after the opening section, so the answer to "which operators" comes early.
  const next = [...sections.slice(0, 1), section, ...sections.slice(1)]
  await payload.update({ collection: 'artiklar', id: article.id, data: { sections: next, description: DESCRIPTION } as never, req })
  payload.logger.info('Migration: rcs-pa-iphone lists the Swedish operators with RCS on iPhone.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier text is in git history if it is ever needed.
}
