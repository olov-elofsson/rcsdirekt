import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change: the iPhone news article in a more professional register, with the same facts
// and sources. Changes only an article whose title still reads as before, so edits in the CMS are
// kept. Sections are matched by sectionId and keep their sources.
const SLUG = 'svenska-operatorer-oppnar-rcs-pa-iphone'
const OLD_TITLE = 'Svenska operatörer öppnar RCS på iPhone'

const TITLE = 'RCS på iPhone i Sverige: läget hos operatörerna'
const DESCRIPTION =
  'Tele2 och Comviq har öppnat RCS för iPhone. Hos Tre och Hallon fungerar det i testversionen av iOS 27.3, och Telia och Telenor har ännu inte bekräftat stöd. Så ser läget ut i november 2026.'

const SECTIONS: Record<string, { title: string; paragraphs: string[]; points: string[] }> = {
  nyheten: {
    title: '',
    paragraphs: [
      'Under 2026 har RCS börjat nå iPhone i Sverige. Tele2 och Comviq var först och har öppnat funktionen för alla sina kunder. Mellan iPhone och Android går bilder nu fram i högre kvalitet, och båda parter ser när den andra skriver och när ett meddelande har lästs.',
      'Tre och Hallon är nästa operatörer på tur. I den första testversionen av iOS 27.3, som Apple släppte den 3 november 2026, fungerar RCS hos Tre. Funktionen har också testats med ett abonnemang från Hallon.',
    ],
    points: [],
  },
  operatorer: {
    title: 'Läget hos operatörerna',
    paragraphs: ['Sammanställningen gäller november 2026 och uppdateras när fler operatörer öppnar för RCS.'],
    points: [
      'Tele2: öppet för alla kunder',
      'Comviq: öppet för alla kunder',
      'Tre: fungerar i testversionen av iOS 27.3',
      'Hallon: fungerar i tester med testversionen av iOS 27.3',
      'Telia: inget bekräftat stöd ännu',
      'Telenor: inget bekräftat stöd ännu',
    ],
  },
  nar: {
    title: 'När får kunder hos Tre och Hallon RCS?',
    paragraphs: [
      'Det finns inget bekräftat datum. Stödet kan nå alla kunder när den färdiga versionen av iOS 27.3 släpps, men varken Tre eller Hallon har bekräftat det. Testversioner av iOS är avsedda för utvecklare och kan innehålla fel, så det är sällan värt att installera en bara för att få RCS.',
    ],
    points: [],
  },
  kontrollera: {
    title: 'Så kontrollerar du att RCS är påslaget',
    paragraphs: [
      'Öppna Inställningar, välj Appar och sedan Meddelanden. Finns valet RCS-meddelanden kan du slå på det där. Saknas det har din operatör ännu inte öppnat för RCS, eller så behöver telefonen en nyare version av iOS. Bubblans färg visar inte om RCS används, eftersom både SMS och RCS visas i grönt.',
    ],
    points: [],
  },
  foretag: {
    title: 'Vad det betyder för företag',
    paragraphs: [
      'När fler iPhone-användare får RCS kan fler mottagare se företagens meddelanden med avsändarnamn, logotyp, bilder och knappar i stället för som vanliga SMS. Räckvidden för en företagsavsändare kan ändå skilja sig mellan operatörerna. Testa därför utskicket mot de nät som dina kunder använder.',
    ],
    points: [],
  },
}

type Doc = Record<string, any>

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const { docs } = await payload.find({ collection: 'artiklar', where: { slug: { equals: SLUG } }, depth: 0, limit: 1, req })
  const article = docs[0] as Doc | undefined
  if (!article || article.title !== OLD_TITLE) {
    payload.logger.info('Migration: iPhone news article missing or already edited; left as it is.')
    return
  }
  const sections = ((article.sections ?? []) as Doc[]).map((section) => {
    const next = SECTIONS[section.sectionId]
    if (!next) return section
    return {
      ...section,
      title: next.title,
      paragraphs: next.paragraphs.map((text) => ({ text })),
      points: next.points.map((text) => ({ text })),
    }
  })
  await payload.update({
    collection: 'artiklar',
    id: article.id,
    req,
    data: { title: TITLE, description: DESCRIPTION, sections } as never,
  })
  payload.logger.info('Migration: iPhone news article rewritten.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier text is in git history (20261122_330000_iphone_news) if needed.
}
