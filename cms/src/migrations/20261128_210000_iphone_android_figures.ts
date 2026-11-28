import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change: the article on how RCS from a company differs between iPhone and Android gets
// illustrations on the site (PlatformCompare), and its text now covers what they show: card height
// and orientation, carousels, button order, the Options list on iPhone and suggestions that stay.
// The source is Voxtelesys' comparison of the two platforms. Skipped if the article is missing.

const SLUG = 'rcs-iphone-android-skillnader'

const SOURCE = {
  sourceId: 'voxtelesys-ios-android',
  title: 'Voxtelesys: RCS Platform Behavior Differences (Android vs. iOS)',
  url: 'https://voxtelesys.com/tutorial/rcs-platform-behavior-differences',
  finding:
    'Android visar avsändarens banner, kortens alla höjder och både stående och liggande kort. iOS visar ingen banner, har en fast korthöjd och bara stående kort, där liggande kort kan visas fel. Karuseller staplas på iOS med knapparna under Alternativ på varje kort, medan Android visar dem i en rad. På iOS kan knappar visas i fel ordning, ytterligare åtgärder samlas under Alternativ och förslag på svar ligger kvar efter att kunden tryckt, medan Android tar bort förslagen. GIF-bilder visas stillastående på iOS. Rekommendationen är högst tre rader rubrik och text, en knapp och tre förslag per meddelande, och stående, höga kort.',
  implication:
    'Beskrivningen kommer från en leverantör och gäller iOS-versionerna då. Testa på aktuella telefoner innan ett stort utskick.',
}

type Rows = { text: string }[]
type Update = { paragraphs?: string[]; points?: string[]; sources: string[] }

const UPDATES: Record<string, Update> = {
  oversikt: {
    points: [
      'Mottagare: på Android kan Google sköta RCS även där operatören inte gör det, medan iPhone kräver att operatören har öppnat för RCS. I Sverige gäller det Tele2 och Comviq i november 2026.',
      'Knappar: på iPhone kan knapparna hamna i fel ordning, och fler åtgärder och förslag på svar samlas under Alternativ.',
      'Kort: iPhone har en fast bildhöjd, visar bara stående kort och kortar texten.',
      'Karuseller: Android visar korten i en rad, iPhone staplar dem.',
      'GIF: på iPhone visas GIF-bilder stillastående.',
      'Avsändarprofil: bannern och extra kontaktuppgifter visas bara i Google Meddelanden.',
      'Sortering: på iPhone kan ett första meddelande hamna under okända avsändare utan avisering.',
      'Engångskoder: iPhone känner igen koden och föreslår den automatiskt.',
    ],
    sources: ['apple', 'chat', 'tele2-rcs', 'comviq-rcs', 'send', 'klaviyo-ios-rcs', 'voxtelesys-ios-android', 'agent-info', 'apple-unknown-senders'],
  },
  knappar: {
    paragraphs: [
      'Google har två sorters knappar. De tillfälliga visas under meddelandet och försvinner när kunden svarar, och de fungerar på båda plattformarna. De som ligger kvar inne i meddelandebubblan stöds bara i Google Meddelanden från version 20260225.00, och inte på iPhone eller i Samsung Messages.',
      'På Android ligger knapparna som rader i kortet och förslagen på svar ovanför skrivfältet, där de försvinner när kunden har tryckt på ett. På iPhone kan knapparna visas i fel ordning eller hamna utanför kortet. Fler åtgärder och förslagen samlas i en lista som heter Alternativ under meddelandet, och förslagen ligger kvar där även efter att kunden har svarat. Knapparna är dessutom grå på iPhone.',
      'Lägg därför den viktigaste åtgärden först. Voxtelesys rekommenderar högst en knapp i kortet och tre förslag per meddelande, så att kunden ser vad som går att göra utan att öppna listan.',
    ],
    sources: ['send', 'voxtelesys-ios-android', 'klaviyo-ios-rcs'],
  },
  bilder: {
    paragraphs: [
      'Android visar kortets bild i den höjd avsändaren har valt, kort, mellan eller hög, och kan visa både stående och liggande kort. iPhone visar bilden i en fast höjd och bara stående kort, och ett liggande kort kan visas fel eller beskära bilden. Google rekommenderar hög bild för att korten ska fungera på iPhone, och Voxtelesys rekommenderar stående kort.',
      'På iPhone kortas rubriken och texten i ett kort, så håll dem till tre rader. En karusell visas på Android som en rad kort som går att svepa åt sidan. På iPhone staplas korten, och knapparna nås under Alternativ på varje kort. Med större textstorlek i telefonen kan bilderna dessutom beskäras.',
      'GIF-bilder visas stillastående på iPhone, så budskapet får inte hänga på animationen. Länkar i kortets text går inte att trycka på, så lägg länken på en knapp. En länk som står sist i ett vanligt meddelande, utan text efter, kan på iPhone bli en egen bubbla, och Klaviyo föreslår att du sätter en punkt efter länken för att undvika det.',
    ],
    sources: ['send', 'voxtelesys-ios-android', 'klaviyo-ios-rcs'],
  },
  avsandaren: {
    sources: ['business', 'verification', 'agent-info', 'klaviyo-ios-rcs', 'voxtelesys-ios-android'],
  },
  utforma: {
    points: [
      'Skriv texten så att den går att förstå utan bilden och utan knapparna.',
      'Använd stående kort och sätt mediehöjden till hög.',
      'Håll rubrik och text i kort till tre rader.',
      'Lägg den viktigaste knappen först, med högst en knapp i kortet och tre förslag.',
      'Lägg länkar på en knapp i stället för i kortets text.',
      'Låt inte budskapet bero på att en GIF rör sig.',
      'Lägg telefon, webbplats och e-post i profilens primära fält.',
      'Skicka ett test till en iPhone och en Android-telefon från den registrerade avsändaren.',
    ],
    sources: ['send', 'klaviyo-ios-rcs', 'voxtelesys-ios-android', 'agent-info', 'test-devices'],
  },
}

type StoredSection = { id?: string; sectionId?: string | null; paragraphs?: Rows; points?: Rows; sources?: (number | { id: number })[] }

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const findSource = async (id: string) =>
    (await payload.find({ collection: 'kallor', where: { sourceId: { equals: id } }, depth: 0, limit: 1, req })).docs[0]?.id as
      | number
      | undefined
  if (!(await findSource(SOURCE.sourceId))) {
    await payload.create({ collection: 'kallor', req, context: { skipRebuild: true }, data: SOURCE as never })
  }

  const found = await payload.find({ collection: 'artiklar', where: { slug: { equals: SLUG } }, depth: 0, limit: 1, req })
  const article = found.docs[0] as unknown as { id: number; sections: StoredSection[] } | undefined
  if (!article) {
    payload.logger.warn(`Migration: article ${SLUG} not found; skipped.`)
    return
  }

  const sections: StoredSection[] = []
  for (const section of article.sections) {
    const update = section.sectionId ? UPDATES[section.sectionId] : undefined
    if (!update) {
      sections.push(section)
      continue
    }
    const sources = (await Promise.all(update.sources.map(findSource))).filter((id): id is number => id !== undefined)
    sections.push({
      ...section,
      ...(update.paragraphs ? { paragraphs: update.paragraphs.map((text) => ({ text })) } : {}),
      ...(update.points ? { points: update.points.map((text) => ({ text })) } : {}),
      ...(sources.length ? { sources } : {}),
    })
  }

  // No skipRebuild here, so the site is rebuilt with the updated article.
  await payload.update({ collection: 'artiklar', id: article.id, req, data: { sections } as never })
  payload.logger.info('Migration: iPhone and Android article updated with the platform differences.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the text can be edited back in the CMS if it is ever not wanted.
}
