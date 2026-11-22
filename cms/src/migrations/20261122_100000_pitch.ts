import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change, not a schema change: a hero that says what the customer sees and does, a page
// title that names the category, and a contact heading that no longer repeats "Så kommer ni igång".
// Each text changes only if it still reads as before, so later edits in the CMS are kept.
type Doc = Record<string, any>

const CHANGES: [section: string, field: string, from: string, to: string][] = [
  ['hero', 'title', 'Det smidiga sättet att', 'Meddelanden kunden känner igen'],
  ['hero', 'highlight', 'skicka RCS', 'och kan svara på'],
  [
    'hero',
    'description',
    'Skicka meddelanden med bilder, knappar och verifierad avsändare, från webben eller via API. Ni betalar bara för det ni skickar.',
    'Med RCS kommer utskicket med ert namn, er logotyp, bilder och knappar i kundens vanliga meddelandeapp. Skicka från webben eller via API och betala per meddelande.',
  ],
  ['seo', 'title', 'Det smidiga sättet att skicka RCS', 'RCS för företag i Sverige | RCS Direkt'],
  ['kontakt', 'heading', 'Kom igång med RCS', 'Prata med oss'],
]

const PRICING_INTRO_FROM =
  'Betala per skickat meddelande. Priser per operatör i Sverige, utan månadskostnader eller bindningstider.'
const PRICING_INTRO_TO =
  'Listpris per skickat meddelande, för varje meddelandetyp och operatör. Det finns ingen månadskostnad eller bindningstid.'
const PAY_ANSWER_FROM =
  'Ni betalar bara för de meddelanden ni skickar. Priset beror på meddelandetyp, inte på antal mottagare per utskick.'
const PAY_ANSWER_TO =
  'Ni betalar för de meddelanden ni skickar. Priset beror på meddelandetyp och på vilken operatör mottagaren har.'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Doc
  if (!startsida.hero?.title) {
    payload.logger.warn('Migration: no start page content yet, pitch not changed.')
    return
  }
  const data: Doc = {}
  for (const [section, field, from, to] of CHANGES) {
    const current = data[section] ?? startsida[section]
    if (current?.[field] === from) data[section] = { ...current, [field]: to }
  }
  if (Object.keys(data).length) await payload.updateGlobal({ slug: 'startsida', req, data: data as never })
  payload.logger.info('Migration: start page pitch rewritten.')

  // The pricing page: the price also depends on the recipient's operator, as its table shows.
  const priser = (await payload.findGlobal({ slug: 'priser', depth: 0, req })) as Doc
  if (!priser.heading) return
  const pricing: Doc = {}
  if (priser.intro === PRICING_INTRO_FROM) pricing.intro = PRICING_INTRO_TO
  const faq = (priser.faq ?? []) as Doc[]
  if (faq.some((item) => item.answer === PAY_ANSWER_FROM)) {
    pricing.faq = faq.map((item) => (item.answer === PAY_ANSWER_FROM ? { ...item, answer: PAY_ANSWER_TO } : item))
  }
  if (Object.keys(pricing).length) await payload.updateGlobal({ slug: 'priser', req, data: pricing as never })
  payload.logger.info('Migration: pricing intro and first answer rewritten.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: earlier texts are in git history if they are ever needed.
}
