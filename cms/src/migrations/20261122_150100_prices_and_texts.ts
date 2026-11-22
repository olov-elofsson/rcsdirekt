import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content: every list price from the supplier's price exports of 11 November 2026, converted as the
// RCS prices already on the site (EUR per 100 messages × 11.03 / 100, three decimals): SMS per
// operator, and every network with its price per type. Conversation started by the customer (P2A)
// costs the same as one the company starts (A2P). Also: SMS written in capitals, more rows in the
// comparison, and the hero heading back to the first one. Each text changes only if it still reads
// as before, and the price lists are only filled while they are empty, so edits in the CMS are kept.
type Doc = Record<string, any>

const SMS_PRICES = [
  {"operator": "Telia", "price": "0,346 SEK"},
  {"operator": "Tele2", "price": "0,336 SEK"},
  {"operator": "Telenor", "price": "0,395 SEK"},
  {"operator": "Tre", "price": "0,317 SEK"},
  {"operator": "Övriga operatörer", "price": "0,385 SEK"},
]

const NETWORKS = [
  {"network": "Telia", "host": "", "basic": "0,346 SEK", "single": "0,483 SEK", "conversation": "0,694 SEK", "sms": "0,346 SEK"},
  {"network": "Tele2", "host": "", "basic": "0,326 SEK", "single": "0,462 SEK", "conversation": "0,662 SEK", "sms": "0,336 SEK"},
  {"network": "Telenor", "host": "", "basic": "0,363 SEK", "single": "0,557 SEK", "conversation": "0,988 SEK", "sms": "0,395 SEK"},
  {"network": "Tre", "host": "", "basic": "0,316 SEK", "single": "0,481 SEK", "conversation": "0,641 SEK", "sms": "0,317 SEK"},
  {"network": "Götalandsnätet", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "0700 Sverige AB", "host": "Götalandsnätet", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "42 Telecom AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "42 Telecom LTD", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "ACN Communications", "host": "Telia", "basic": "0,346 SEK", "single": "0,483 SEK", "conversation": "0,694 SEK", "sms": "0,385 SEK"},
  {"network": "Ainmt Sverige AB (Netett)", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Alltele Foretag Sverige AB (f.d.Ventelo Sverige AB)", "host": "Telia", "basic": "0,346 SEK", "single": "0,483 SEK", "conversation": "0,694 SEK", "sms": "0,385 SEK"},
  {"network": "Alltele Privat AB (f.d.Timepiece-Services De Consultoria Lda)", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Animatele Inc.", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Bahnhof AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Beepsend AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "BM Sverige AB", "host": "Götalandsnätet", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Campuz Mobile AB", "host": "Telenor", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Cell Mobile Scandinavia AB", "host": "Telenor", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "CLX Networks AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Core Telecom Limited (42 Telecom AB MVNO)", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,297 SEK"},
  {"network": "Devicom AB", "host": "Telenor", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "DGC Access AB", "host": "Götalandsnätet", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Djuice Mobile Sweden", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "EasyTelecom i Stockholm AB", "host": "Telenor", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "eRate", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Eu Tel AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "First New Media Scandinavia AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Fogg Mobile AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Freshbody Sweden", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Generic Mobile Systems Sweden AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Glocalnet Scandinavia AB", "host": "Telenor", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Horisen AG", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Infobip Ltd.", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "InfraCom Communications AB (Weblink IP Phone AB/Cellip AB)", "host": "Telenor", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Interactive digital media GmbH", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Internet Payment Exchange AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "IntJoors Sverige AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Limitless Mobile AB (f.d. Telogic AB, LUDO Mobil AB)", "host": "Telia", "basic": "0,346 SEK", "single": "0,483 SEK", "conversation": "0,694 SEK", "sms": "0,385 SEK"},
  {"network": "Lindholmen Science Park", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Loxytel AB", "host": "Telia", "basic": "0,346 SEK", "single": "0,483 SEK", "conversation": "0,694 SEK", "sms": "0,385 SEK"},
  {"network": "Lycamobile Sweden", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Megaphone AB", "host": "Telenor", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Mercury International Carrier Services", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Mobil 2 Sverige AB", "host": "Telia", "basic": "0,346 SEK", "single": "0,483 SEK", "conversation": "0,694 SEK", "sms": "0,385 SEK"},
  {"network": "Mobile Arts AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Mobiweb Ltd", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Monty Mobile", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Net at Once Sweden AB", "host": "Telenor", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Netnet AS", "host": "Telia", "basic": "0,346 SEK", "single": "0,483 SEK", "conversation": "0,694 SEK", "sms": "0,385 SEK"},
  {"network": "NextGen Mobile Ltd", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Optimal Telecom Sverige", "host": "Tele2", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Phone Family AB", "host": "Tre", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Phonera Foretag AB", "host": "Telia", "basic": "0,346 SEK", "single": "0,483 SEK", "conversation": "0,694 SEK", "sms": "0,385 SEK"},
  {"network": "Qall Telecom AB", "host": "Telenor", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "RebTel Networks AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "ReWiCom Scandinavia AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Soft Telecom Sweden AB", "host": "Telia", "basic": "0,346 SEK", "single": "0,483 SEK", "conversation": "0,694 SEK", "sms": ""},
  {"network": "Spinbox AB", "host": "Telia", "basic": "0,346 SEK", "single": "0,483 SEK", "conversation": "0,694 SEK", "sms": "0,385 SEK"},
  {"network": "Spirius AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Spring Mobil AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "SSTNet Sverige AB", "host": "Götalandsnätet", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Svea Billing System AB (UNO Mobile)", "host": "Telia", "basic": "0,346 SEK", "single": "0,483 SEK", "conversation": "0,694 SEK", "sms": "0,385 SEK"},
  {"network": "Svensk Konsumentmobil AB", "host": "Telia", "basic": "0,346 SEK", "single": "0,483 SEK", "conversation": "0,694 SEK", "sms": "0,385 SEK"},
  {"network": "Svenska Tele i Lidkoping AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "SwedfoneNet AB (WARSIN HOLDING AB)", "host": "Götalandsnätet", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "TelaVox AB", "host": "Telia", "basic": "0,346 SEK", "single": "0,483 SEK", "conversation": "0,694 SEK", "sms": "0,385 SEK"},
  {"network": "Telecom3 Sverige AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Teledigit Scand. AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Telenor Connexion AB", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Telness AB", "host": "Telia", "basic": "0,346 SEK", "single": "0,483 SEK", "conversation": "0,694 SEK", "sms": "0,385 SEK"},
  {"network": "Tigo LTD", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Truphone Ltd.", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Unicorn Telecom AB", "host": "Tele2", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Uno Telefoni AB", "host": "Telia", "basic": "0,346 SEK", "single": "0,483 SEK", "conversation": "0,694 SEK", "sms": "0,385 SEK"},
  {"network": "Vanso GmbH", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Vectone Mobile (Ex. Mundio Mobile) (Sweden)", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Voxbone SA", "host": "Götalandsnätet", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Wifog AB", "host": "Götalandsnätet", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
  {"network": "Wireless Maingate AB (iMEZ AB)", "host": "", "basic": "", "single": "", "conversation": "", "sms": "0,385 SEK"},
]

const P2A_FAQ = {
  question: 'Vad kostar det när kunden skriver först?',
  answer: 'Samma pris som när ni startar samtalet. RCS Conversation har samma listpris oavsett vem som skriver först.',
}

const COMPARISON_HEADINGS = ['RCS jämfört med sms', 'RCS och sms', 'Det RCS kan som sms inte kan']
const COMPARISON_ROWS = [
  { label: 'Klickfrekvens (CTR)', sms: 'Bara via spårade länkar', rcs: 'Klick per knapp och länk' },
  { label: 'Läskvitton', sms: '✗', rcs: 'Läst, om mottagaren tillåter' },
  { label: 'Svar från kunden', sms: 'Fritext', rcs: 'Knappar, förslag och fritext' },
  { label: 'Avregistrering', sms: 'Svar STOPP eller länk', rcs: 'Knapp, STOPP eller i appen' },
  { label: 'Listpris per meddelande', sms: 'Från 0,317 SEK', rcs: 'Från 0,316 SEK' },
]

const HERO_FROM = { title: 'RCS för företag', highlight: 'med logotyp och knappar' }
const HERO_TO = { title: 'Det smidiga sättet att', highlight: 'skicka RCS' }

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const priser = (await payload.findGlobal({ slug: 'priser', depth: 0, req })) as Doc
  if (priser.heading) {
    const data: Doc = {}
    if (!(priser.sms?.operatorPrices ?? []).length)
      data.sms = { name: 'SMS', contents: 'Text upp till 160 tecken, till exempel som reserv', operatorPrices: SMS_PRICES }
    if (!(priser.networks ?? []).length) {
      data.networksHeading = 'Alla nät och priser'
      data.networksNote = 'Listpris per meddelande för varje nät i Sverige. Ett tomt fält betyder att nätet inte tar emot den typen av meddelande.'
      data.networks = NETWORKS
    }
    const faq = (priser.faq ?? []) as Doc[]
    if (!faq.some((item) => item.question === P2A_FAQ.question)) data.faq = [...faq, P2A_FAQ]
    const plans = (priser.plans ?? []) as Doc[]
    if (plans.some((plan) => typeof plan.copy === 'string' && plan.copy.includes('traditionellt sms')))
      data.plans = plans.map((plan) => ({ ...plan, copy: typeof plan.copy === 'string' ? plan.copy.split('traditionellt sms').join('traditionellt SMS') : plan.copy }))
    if (Object.keys(data).length) await payload.updateGlobal({ slug: 'priser', req, data: data as never })
    payload.logger.info(`Migration: pricing ${Object.keys(data).join(', ') || 'already up to date'}.`)
  } else payload.logger.warn('Migration: no pricing content yet, prices not added.')

  const startsida = (await payload.findGlobal({ slug: 'startsida', depth: 0, req })) as Doc
  if (!startsida.hero?.title) return
  const data: Doc = {}
  if (startsida.hero.title === HERO_FROM.title && startsida.hero.highlight === HERO_FROM.highlight) data.hero = { ...startsida.hero, ...HERO_TO }
  const jamforelse = { ...startsida.jamforelse }
  let comparisonChanged = false
  if (COMPARISON_HEADINGS.includes(jamforelse.heading)) {
    jamforelse.heading = 'RCS jämfört med SMS'
    comparisonChanged = true
  }
  const rows = (jamforelse.rows ?? []) as Doc[]
  const missing = COMPARISON_ROWS.filter((row) => !rows.some((existing) => existing.label === row.label))
  if (missing.length) {
    jamforelse.rows = [...rows, ...missing]
    comparisonChanged = true
  }
  if (comparisonChanged) data.jamforelse = jamforelse
  if (Object.keys(data).length) await payload.updateGlobal({ slug: 'startsida', req, data: data as never })
  payload.logger.info(`Migration: start page ${Object.keys(data).join(', ') || 'already up to date'}.`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: earlier texts and prices are in git history if they are ever needed.
}
