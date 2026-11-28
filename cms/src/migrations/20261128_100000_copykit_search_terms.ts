import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change after copykit.se was closed and redirected here. Its Search Console data
// (July 2025 to November 2026) showed what people searched for when they found the old RCS
// articles: "rcs iphone sverige", one operator at a time ("telia rcs iphone", "comviq rcs",
// "telenor rcs", "tele2 rcs iphone"), smaller brands ("hallon rcs", "vimla rcs") and what
// "RCS-chatt" or "RCS-meddelande" means. The articles get sections that answer those questions,
// and their search words are extended. Each step is skipped if it has already been done.

const SOURCES = [
  {
    sourceId: 'google-telia-2017',
    title: 'Google: RCS messaging now available to Telia subscribers in Sweden',
    url: 'https://blog.google/products/rcs/rcs-messaging-now-available-telia-subscribers-sweden',
    finding:
      'Google och Telia lanserade RCS för Telias privatkunder i Sverige i december 2017. Tjänsten gällde Android och fungerade i appen som i dag heter Google Meddelanden.',
    implication: 'Telias kunder med Android har haft RCS länge. Stödet för iPhone är en separat fråga.',
  },
  {
    sourceId: 'm3-telenor-rcs',
    title: 'M3: Vad är RCS och hur skiljer det sig från iMessage?',
    url: 'https://www.m3.se/article/2151014/vad-ar-rcs-och-hur-skiljer-det-sig-fran-imessage.html',
    finding:
      'Telenor uppgav att nästan alla Android-telefoner använder Google Meddelanden som standardapp, och att merparten av operatörens Android-kunder därför redan använder RCS.',
    implication: 'Hos Telenor fungerar RCS på Android. Uppgiften säger inget om iPhone.',
  },
]

type NewSection = { sectionId: string; title: string; paragraphs: string[]; points: string[]; sources: string[] }

type Change = {
  slug: string
  title?: string
  keywords: string[]
  // New sections go in after the section with this anchor, or after the first section.
  after?: string
  sections: NewSection[]
}

const CHANGES: Change[] = [
  {
    slug: 'svenska-operatorer-oppnar-rcs-pa-iphone',
    keywords: [
      'iphone rcs sverige',
      'rcs sverige',
      'rcs ios sverige',
      'tele2 rcs iphone',
      'tele2 rcs',
      'comviq rcs',
      'comviq rcs iphone',
      'telia rcs iphone',
      'telia rcs',
      'telenor rcs iphone',
      'telenor rcs',
      'tre rcs',
      'hallon rcs',
      'vimla rcs',
      'halebop rcs',
      'fello rcs',
    ],
    after: 'operatorer',
    sections: [
      {
        sectionId: 'telia',
        title: 'Har Telia RCS på iPhone?',
        paragraphs: [
          'Inte i november 2026. Telia har inte bekräftat när RCS kommer till iPhone, och Apples operatörslista har ingen RCS-markering för Telia i Sverige. Telias kunder med Android har däremot haft RCS sedan december 2017, då Telia och Google lanserade tjänsten här.',
          'Har du Telia och iPhone går dina samtal med Android-användare alltså fortfarande som SMS och MMS. Samtal med andra iPhone-användare går via iMessage precis som tidigare.',
        ],
        points: [],
        sources: ['apple-carriers', 'google-telia-2017'],
      },
      {
        sectionId: 'telenor',
        title: 'Har Telenor RCS på iPhone?',
        paragraphs: [
          'Inte heller Telenor har öppnat RCS för iPhone i Sverige i november 2026, och något datum har operatören inte gett. På Android fungerar RCS däremot. Telenor har uppgett att merparten av operatörens Android-kunder redan använder RCS, eftersom Google Meddelanden är standardappen i de flesta Android-telefoner.',
        ],
        points: [],
        sources: ['apple-carriers', 'm3-telenor-rcs'],
      },
      {
        sectionId: 'mindre-operatorer',
        title: 'Gäller det också mindre operatörer?',
        paragraphs: [
          'Många mindre mobilvarumärken använder en av de stora operatörernas nät, men de får inte automatiskt samma RCS-stöd. Hallon har till exempel testats för sig, skilt från Tre. Har du ett abonnemang hos till exempel Vimla, Halebop eller Fello är det deras egen supportsida som ger beskedet.',
          'Det snabbaste svaret för din egen linje finns i telefonen. Finns valet RCS-meddelanden under Inställningar, Appar och Meddelanden har operatören öppnat för RCS på ditt abonnemang.',
        ],
        points: [],
        sources: ['tre-hallon-ios-27-3', 'apple'],
      },
    ],
  },
  {
    slug: 'vad-ar-rcs',
    title: 'Vad är RCS och vad betyder RCS-meddelande?',
    keywords: [
      'vad betyder rcs',
      'rcs betyder',
      'rcs meddelande betyder',
      'vad menas med rcs meddelande',
      'vad är ett rcs meddelande',
      'rcs chatt vad är det',
      'vad är rcs chatt',
      'vad betyder rcs chatt',
      'rcs-chatt',
      'rcs chattar',
      'rcs meddelanden',
    ],
    sections: [
      {
        sectionId: 'rcs-chatt',
        title: 'Vad betyder RCS-chatt och RCS-meddelande?',
        paragraphs: [
          'Det är samma sak med olika namn. I Google Meddelanden på Android heter funktionen RCS-chattar, och på iPhone heter inställningen RCS-meddelanden. Båda betyder att meddelandet skickas med RCS över internet i stället för som SMS eller MMS genom mobilnätet.',
          'Står det RCS-meddelande i skrivfältet går samtalet som RCS. Står det Textmeddelande (SMS) går det som ett vanligt SMS, till exempel för att mottagaren saknar RCS eller har stängt av det.',
        ],
        points: [],
        sources: ['chat', 'apple', 'apple-channels'],
      },
    ],
  },
  {
    slug: 'rcs-pa-iphone',
    keywords: ['rcs på iphone', 'iphone rcs', 'rcs meddelande iphone', 'rcs chatt iphone', 'rcs iphone support', 'apple rcs'],
    sections: [],
  },
  {
    slug: 'rcs-sverige-operatorer',
    keywords: ['rcs sverige', 'rcs telia', 'rcs tele2', 'rcs telenor', 'rcs comviq', 'tre rcs', 'hallon rcs', 'rcs sweden'],
    sections: [],
  },
  {
    slug: 'rcs-for-foretag',
    keywords: ['rcs kampanj', 'rcs marknadsföring', 'rcs meddelande företag'],
    sections: [],
  },
]

type Row = { id?: string; text: string }
type StoredSection = { id?: string; sectionId?: string | null; title?: string | null; paragraphs?: Row[]; points?: Row[]; sources?: number[] }
type StoredArticle = { id: number; title: string; keywords?: { id?: string; keyword: string }[]; sections: StoredSection[] }

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const quiet = { skipRebuild: true }
  const findSource = async (id: string) =>
    (await payload.find({ collection: 'kallor', where: { sourceId: { equals: id } }, depth: 0, limit: 1, req })).docs[0]?.id as
      | number
      | undefined
  for (const source of SOURCES) {
    if (await findSource(source.sourceId)) continue
    await payload.create({ collection: 'kallor', req, context: quiet, data: source as never })
  }

  const updates: { id: number; data: Record<string, unknown> }[] = []
  for (const change of CHANGES) {
    const found = await payload.find({ collection: 'artiklar', where: { slug: { equals: change.slug } }, depth: 0, limit: 1, req })
    const article = found.docs[0] as unknown as StoredArticle | undefined
    if (!article) {
      payload.logger.warn(`Migration: article ${change.slug} not found; skipped.`)
      continue
    }

    const known = new Set((article.keywords ?? []).map((row) => row.keyword.toLocaleLowerCase('sv')))
    const added = change.keywords.filter((keyword) => !known.has(keyword.toLocaleLowerCase('sv')))
    const keywords = [...(article.keywords ?? []), ...added.map((keyword) => ({ keyword }))]

    const sections = [...article.sections]
    const anchors = new Set(sections.map((section) => section.sectionId).filter(Boolean))
    let insertAt = change.after ? sections.findIndex((section) => section.sectionId === change.after) + 1 : 1
    if (insertAt <= 0) insertAt = 1
    let sectionsAdded = 0
    for (const section of change.sections) {
      if (anchors.has(section.sectionId)) continue
      const sources = (await Promise.all(section.sources.map(findSource))).filter((id): id is number => id !== undefined)
      if (!sources.length) {
        payload.logger.warn(`Migration: no sources for ${change.slug}#${section.sectionId}; section skipped.`)
        continue
      }
      sections.splice(insertAt, 0, {
        sectionId: section.sectionId,
        title: section.title,
        paragraphs: section.paragraphs.map((text) => ({ text })),
        points: section.points.map((text) => ({ text })),
        sources,
      })
      insertAt++
      sectionsAdded++
    }

    const title = change.title ?? article.title
    if (!added.length && !sectionsAdded && title === article.title) continue
    updates.push({ id: article.id, data: { title, keywords, sections } })
  }

  // Only the last update rebuilds the site, so it is built once with everything in place.
  for (const [index, update] of updates.entries()) {
    const last = index === updates.length - 1
    await payload.update({ collection: 'artiklar', id: update.id, req, context: last ? {} : quiet, data: update.data as never })
  }
  const changed = updates.length
  payload.logger.info(`Migration: ${changed} articles updated with the search terms from copykit.se.`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the added sections can be removed in the CMS if they are not wanted.
}
