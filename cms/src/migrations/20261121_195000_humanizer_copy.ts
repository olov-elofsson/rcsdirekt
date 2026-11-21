import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: the site's copy reviewed with the humanizer and
// copywriting skills. Dashes, "no X, no Y" lists, sales words and staged fragments are
// rewritten, and claims without a source are replaced (the 35 % click rate) or corrected
// (iOS 18, as Apple and the operators state). Each text changes only if it still reads exactly
// as before, so an editor's later change in the CMS is never overwritten.

type Doc = Record<string, any>
type Change = [path: string, from: string, to: string]

const STARTSIDA: Change[] = [
  [
    'seo.description',
    'Skicka RCS för företag direkt från webben eller via API. Bilder, knappar och verifierad avsändare. Från 0,45 SEK per meddelande, inga månadskostnader.',
    'Skicka RCS från webben eller via API, med bilder, knappar och verifierad avsändare. Från 0,45 SEK per meddelande och utan månadsavgift.',
  ],
  [
    'hero.description',
    'Skicka meddelanden med bilder, knappar och verifierad avsändare – direkt från webben eller via API. Betala bara för det ni skickar.',
    'Skicka meddelanden med bilder, knappar och verifierad avsändare, från webben eller via API. Ni betalar bara för det ni skickar.',
  ],
  [
    'fordelar.intro',
    'Rikare meddelanden ger fler klick, svar och köp – och allt går att mäta.',
    'Mottagaren kan klicka, boka eller svara direkt i meddelandet, och i statistiken ser ni vad som hände efter utskicket.',
  ],
  ['fordelar.items.0.icon', 'trending-up', 'pointer'],
  ['fordelar.items.0.title', 'Upp till 35 % klickfrekvens', 'Knappar i meddelandet'],
  [
    'fordelar.items.0.copy',
    'RCS-meddelanden ger betydligt högre engagemang än ett vanligt textutskick. Interaktiva knappar och rikt innehåll får kunderna att agera direkt.',
    'Mottagaren köper, bokar eller svarar med ett tryck i meddelandet. Ett sms kan bara skicka med en länk som kunden får öppna själv.',
  ],
  ['fordelar.items.2.title', 'Mer resultat för pengarna', 'Betala per meddelande'],
  [
    'fordelar.items.2.copy',
    'När fler kunder öppnar, klickar och svarar får ni mer utav samma budget. Betala bara för de meddelanden som faktiskt skickas.',
    'Ni betalar för de meddelanden som skickas, utan månadsavgift eller bindningstid. Priset beror på meddelandetypen.',
  ],
  ['fordelar.items.3.title', 'En internationell standard', 'En öppen standard'],
  [
    'fordelar.items.3.copy',
    'RCS är en branschstandard som stöds av operatörer och telefontillverkare världen över. Samma teknik fungerar oavsett var era kunder finns.',
    'RCS är en standard från GSMA, mobiloperatörernas branschorganisation. Den finns i Google Meddelanden på Android och i Meddelanden på iPhone från iOS 18, när operatören har stöd för den.',
  ],
  ['jamforelse.rows.5.rcs', 'Android 5.0 eller senare, iOS 27', 'Android 5.0 eller senare, iOS 18 eller senare'],
  ['jamforelse.rows.6.label', 'Rich features (bilder, knappar m.m.)', 'Bilder, video och knappar'],
  ['pris.intro', 'Betala per meddelande. Inga startavgifter och inga bindningstider.', 'Ni betalar per meddelande. Det finns ingen startavgift och ingen bindningstid.'],
  [
    'blogg.intro',
    'Guider och förklaringar om RCS, från grunderna till API och webhooks. Allt på svenska, med källor.',
    'Guider och förklaringar om RCS, från grunderna till API och webhooks. Artiklarna är på svenska och anger sina källor.',
  ],
]

const PRISER: Change[] = [
  ['seo.title', 'RCS-priser i Sverige – betala per meddelande', 'RCS-priser i Sverige: betala per meddelande'],
  [
    'selectorNote',
    'Priserna anges i SEK per skickat meddelande. Vi säljer i Sverige idag – fler länder och valutor kommer snart.',
    'Priserna anges i SEK per skickat meddelande. Vi säljer i Sverige i dag, och fler länder och valutor kommer senare.',
  ],
]

const DEMO: Change[] = [
  ['features.0.copy', 'Er logga, namn och blå bock. Kunden vet att det är ni.', 'Kunden ser ert namn, er logotyp och en blå bock.'],
  ['features.4.copy', 'Känns som ett riktigt samtal.', 'Kunden ser när ni skriver ett svar.'],
  ['richCards.2.title', 'Knappar som säljer', 'Knappar för nästa steg'],
  ['richCards.3.title', 'Ingen app krävs', 'I kundens meddelandeapp'],
  ['richCards.3.copy', 'Landar i kundens vanliga meddelandeapp.', 'Kunden behöver ingen ny app.'],
]

// The comparison row says nothing a reader can check ("Ja, till viss del" against "Ja").
const DROP_ROW = 'AI-/GenAI-stöd'

const ARTICLE_PARAGRAPHS: [slug: string, from: string, to: string][] = [
  [
    'rcs-vs-sms',
    'Alla tre kan visas i samma app. Skillnaden märks när du skickar innehåll eller läser status, snarare än genom att en ny inkorg öppnas.',
    'Alla tre kan visas i samma app, utan någon ny inkorg. Skillnaden märks först när du skickar innehåll eller läser status.',
  ],
  [
    'testa-rcs-utskick',
    'Försök bekräfta samma bokning två gånger, öppna en gammal länk och svara efter att ärendet stängts. Sådana tester visar om flödet skyddar kunden från dubbla eller felaktiga ändringar. Använd också telefoner med olika textstorlek och en mottagare utan RCS-stöd. Det viktiga är inte att alla tester ser perfekta ut, utan att varje avvikelse får ett begripligt och säkert resultat.',
    'Försök bekräfta samma bokning två gånger, öppna en gammal länk och svara efter att ärendet stängts. Sådana tester visar om flödet skyddar kunden från dubbla eller felaktiga ändringar. Använd också telefoner med olika textstorlek och en mottagare utan RCS-stöd. Alla tester behöver inte se perfekta ut, men varje avvikelse ska ge ett begripligt och säkert resultat.',
  ],
]

function get(doc: Doc, path: string): unknown {
  return path.split('.').reduce<any>((value, key) => (value == null ? undefined : value[key]), doc)
}

function set(doc: Doc, path: string, value: string): void {
  const keys = path.split('.')
  const last = keys.pop() as string
  const parent = keys.reduce<any>((node, key) => node?.[key], doc)
  if (parent && typeof parent === 'object') parent[last] = value
}

/** Applies the changes whose text is unchanged; returns the top-level fields to save. */
function apply(doc: Doc, changes: Change[]): Doc {
  const touched = new Set<string>()
  for (const [path, from, to] of changes) {
    if (get(doc, path) !== from) continue
    set(doc, path, to)
    touched.add(path.split('.')[0])
  }
  return Object.fromEntries([...touched].map((key) => [key, doc[key]]))
}

async function updateGlobal(args: MigrateUpArgs, slug: 'startsida' | 'priser' | 'demo', changes: Change[], extra?: (doc: Doc) => Doc) {
  const { payload, req } = args
  const doc = (await payload.findGlobal({ slug, depth: 0, req })) as Doc
  const data = { ...apply(doc, changes), ...(extra?.(doc) ?? {}) }
  if (Object.keys(data).length) await payload.updateGlobal({ slug, req, data: data as never })
}

export async function up(args: MigrateUpArgs): Promise<void> {
  const { payload, req } = args

  await updateGlobal(args, 'startsida', STARTSIDA, (doc) => {
    const rows = (doc.jamforelse?.rows ?? []) as Doc[]
    if (!rows.some((row) => row.label === DROP_ROW)) return {}
    return { jamforelse: { ...doc.jamforelse, rows: rows.filter((row) => row.label !== DROP_ROW) } }
  })
  await updateGlobal(args, 'priser', PRISER)
  await updateGlobal(args, 'demo', DEMO)

  for (const [slug, from, to] of ARTICLE_PARAGRAPHS) {
    const { docs } = await payload.find({ collection: 'artiklar', where: { slug: { equals: slug } }, depth: 0, limit: 1, req })
    for (const article of docs as Doc[]) {
      let changed = false
      const sections = (article.sections ?? []).map((section: Doc) => ({
        ...section,
        paragraphs: (section.paragraphs ?? []).map((row: Doc) => {
          if (row.text !== from) return row
          changed = true
          return { ...row, text: to }
        }),
      }))
      if (changed) await payload.update({ collection: 'artiklar', id: article.id, req, data: { sections } as never })
    }
  }

  payload.logger.info('Migration: site copy reviewed with the humanizer and copywriting skills.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: earlier texts are in git history if they are ever needed.
}
