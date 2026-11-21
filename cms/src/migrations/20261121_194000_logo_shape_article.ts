import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: the new logo shape for business senders in Google
// Messages, as a source and a section in the article about changing the sender profile.
const SOURCE = {
  sourceId: 'google-messages-logo-2026',
  title: 'Bandwidth: Updates to RCS for Business agent logos in Google Messages',
  url: 'https://www.bandwidth.com/support/en/articles/14977785-updates-to-rcs-for-business-agent-logos-in-google-messages',
  finding:
    'Bandwidth skriver att Google Messages visar logotyper för RCS-företag som rundade kvadrater i stället för cirklar, att verifierade avsändare får en bock efter namnet och att logotypen ska vara 224 × 224 px med solid bakgrund. Alla logotyper ska vara uppdaterade senast 1 juni 2027.',
  implication:
    'Uppgiften kommer från en leverantörs kundinformation om Googles ändring, inte från en mätning. Kontrollera kraven med er partner innan logotypen byts.',
}

const SECTION = {
  sectionId: 'ny-logotypform',
  title: 'Ny logotypform i Google Messages',
  paragraphs: [
    {
      text: 'Google Messages visar numera logotypen för företag som en rundad kvadrat i stället för en cirkel. Privatpersoner behåller runda bilder, så företagen syns tydligare i inkorgen. En verifierad avsändare får en bock efter namnet.',
    },
  ],
  points: [
    { text: 'Logotypen ska vara kvadratisk, 224 × 224 px, utan egna rundade hörn.' },
    { text: 'Använd en solid bakgrund. En genomskinlig logotyp syns dåligt, särskilt i mörkt läge.' },
    { text: 'Lämna luft runt logotypen så att inget beskärs i hörnen.' },
    { text: 'Befintliga avsändare ska ha bytt logotyp senast 1 juni 2027. Bytet granskas på samma sätt som andra ändringar.' },
  ],
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const { docs: existing } = await payload.find({ collection: 'kallor', where: { sourceId: { equals: SOURCE.sourceId } }, depth: 0, limit: 1, req })
  const source = existing[0] ?? (await payload.create({ collection: 'kallor', req, data: SOURCE }))

  const { docs: articles } = await payload.find({ collection: 'artiklar', where: { slug: { equals: 'rcs-agent-profil-andring' } }, depth: 0, limit: 1, req })
  for (const article of articles as Record<string, any>[]) {
    const sections = (article.sections ?? []) as Record<string, any>[]
    if (sections.some((section) => section.sectionId === SECTION.sectionId)) continue
    await payload.update({
      collection: 'artiklar',
      id: article.id,
      req,
      data: { sections: [...sections, { ...SECTION, sources: [source.id] }] } as never,
    })
  }
  payload.logger.info('Migration: logo shape section added to the sender profile article.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: remove the section and source in the CMS if they are ever unwanted.
}
