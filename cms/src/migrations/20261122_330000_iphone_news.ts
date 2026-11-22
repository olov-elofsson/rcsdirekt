import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change: a news article on Swedish operators opening RCS on iPhone (November 2026),
// which the line above the start page heading links to. Created once; skipped if the slug exists.
const SLUG = 'svenska-operatorer-oppnar-rcs-pa-iphone'

const ARTICLE = {
  title: 'Svenska operatörer öppnar RCS på iPhone',
  slug: SLUG,
  category: 'Mobil & operatörer',
  published: '2026-11-22',
  description:
    'Tele2 och Comviq har öppnat RCS på iPhone för alla kunder, och Tre och Hallon testar det i iOS 27.3. Så ser läget ut i november 2026, och det här betyder det för dig.',
  keywords: ['rcs iphone sverige', 'rcs iphone tele2', 'rcs iphone comviq', 'rcs iphone tre', 'rcs iphone hallon', 'rcs ios 27.3'],
  sections: [
    {
      sectionId: 'nyheten',
      title: '',
      paragraphs: [
        'Under 2026 har RCS börjat komma till iPhone i Sverige. Tele2 och Comviq var först och har öppnat funktionen för alla sina kunder. Mellan iPhone och Android går det då att skicka bilder i bättre kvalitet, se när den andra skriver och få läskvitton.',
        'Nu står Tre och Hallon på tur. I den första testversionen av iOS 27.3, som Apple släppte den 3 november, fungerar RCS hos Tre, och det har också testats med ett Hallon-abonnemang.',
      ],
      points: [],
      sources: ['tele2-rcs', 'comviq-rcs', 'tre-hallon-ios-27-3'],
    },
    {
      sectionId: 'operatorer',
      title: 'Läget hos operatörerna',
      paragraphs: ['Läget gäller november 2026 och ändras när fler operatörer öppnar.'],
      points: ['Tele2: öppet för alla kunder', 'Comviq: öppet för alla kunder', 'Tre: fungerar i testversionen av iOS 27.3', 'Hallon: testat i testversionen av iOS 27.3', 'Telia: inget bekräftat stöd än', 'Telenor: inget bekräftat stöd än'],
      sources: ['tele2-rcs', 'comviq-rcs', 'tre-hallon-ios-27-3'],
    },
    {
      sectionId: 'nar',
      title: 'När får Tre och Hallon det?',
      paragraphs: [
        'Något datum finns inte. Stödet kan komma till alla kunder när den färdiga iOS 27.3 släpps, men operatörerna har inte bekräftat det. Det är sällan värt att installera en testversion bara för att få RCS.',
      ],
      points: [],
      sources: ['tre-hallon-ios-27-3'],
    },
    {
      sectionId: 'kontrollera',
      title: 'Så ser du om RCS är på',
      paragraphs: [
        'Gå till Inställningar, Appar och Meddelanden och leta efter RCS-meddelanden. Saknas valet har din operatör inte öppnat än, eller så behöver du en nyare iOS. En grön bubbla betyder inte att RCS används, eftersom även SMS visas grönt.',
      ],
      points: [],
      sources: ['apple'],
    },
    {
      sectionId: 'foretag',
      title: 'Vad betyder det för företag?',
      paragraphs: [
        'När fler iPhone-användare får RCS kan fler mottagare se ett företags meddelande med namn, logga, bilder och knappar i stället för som ett vanligt SMS. Räckvidden för en företagsavsändare kan ändå skilja sig mellan operatörerna, så testa utskicket mot de nät era kunder använder.',
      ],
      points: [],
      sources: ['apple', 'capabilities'],
    },
  ],
  related: ['rcs-pa-iphone', 'rcs-sverige-operatorer', 'aktivera-rcs'],
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const exists = await payload.find({ collection: 'artiklar', where: { slug: { equals: SLUG } }, depth: 0, limit: 1, req })
  if (exists.docs.length) {
    payload.logger.info('Migration: iPhone news article already there.')
    return
  }
  const sourceId = async (id: string) => (await payload.find({ collection: 'kallor', where: { sourceId: { equals: id } }, depth: 0, limit: 1, req })).docs[0]?.id
  const articleId = async (slug: string) => (await payload.find({ collection: 'artiklar', where: { slug: { equals: slug } }, depth: 0, limit: 1, req })).docs[0]?.id
  const sections = []
  for (const section of ARTICLE.sections) {
    const sources = (await Promise.all(section.sources.map(sourceId))).filter((id) => id !== undefined)
    if (!sources.length) {
      payload.logger.warn(`Migration: no sources found for section ${section.sectionId}; article not created.`)
      return
    }
    sections.push({ ...section, paragraphs: section.paragraphs.map((text) => ({ text })), points: section.points.map((text) => ({ text })), sources })
  }
  const related = (await Promise.all(ARTICLE.related.map(articleId))).filter((id) => id !== undefined)
  await payload.create({
    collection: 'artiklar',
    req,
    data: { ...ARTICLE, keywords: ARTICLE.keywords.map((keyword) => ({ keyword })), sections, related } as never,
  })
  payload.logger.info('Migration: news article on RCS on iPhone in Sweden created.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: remove the article in the CMS if it is ever not wanted.
}
