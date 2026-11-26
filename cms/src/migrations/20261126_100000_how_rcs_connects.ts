import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change: an article on how the parts fit together when a company sends RCS
// (standard, operators, phones, Google's platform, partner, the company's own system),
// with two new Google sources. Each step is skipped if it has already been done.
const SLUG = 'hur-rcs-hanger-ihop'

const SOURCES = [
  {
    sourceId: 'how-it-works',
    title: 'Google RCS for Business: How RCS for Business works',
    url: 'https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/how-it-works',
    finding:
      'Avsändaren skickar meddelanden som HTTP-anrop med JSON till Googles plattform, och kundens svar och händelser kommer tillbaka till en webhook. Saknar telefonen RCS svarar plattformen med felet 404, och då kan avsändaren skicka till exempel ett SMS. Meddelandena är krypterade mellan avsändaren och Googles servrar och mellan Googles servrar och telefonen, och Google söker igenom dem efter skadligt innehåll.',
    implication:
      'Företagets system behöver både kunna skicka och ta emot, och ha en reservväg för kunder utan RCS. Företagsmeddelanden är skyddade på vägen men inte end-to-end-krypterade.',
  },
  {
    sourceId: 'partner-registration',
    title: 'Google RCS for Business: Register as a partner',
    url: 'https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/register-partner',
    finding:
      'För att skicka RCS för företag måste man vara registrerad partner hos Google. En partner skapar avsändare för de varumärken den sköter. Partnerns namn står i de debiteringsrapporter som operatörerna får och ska stämma med namnet i partnerns avtal med operatörerna.',
    implication:
      'Ett företag som inte själv är partner skickar genom en partner, och det är partnern som operatörerna debiterar.',
  },
]

const ARTICLE = {
  title: 'Hur hänger RCS ihop, från företaget till kundens telefon?',
  slug: SLUG,
  category: 'Företag',
  published: '2026-11-26',
  author: 'Olov Elofsson',
  description:
    'Ett RCS-meddelande från ett företag passerar flera led innan det syns hos kunden: företagets system, en partner, Googles plattform, operatören och meddelandeappen i telefonen. Här går vi igenom vad varje led gör och hur de hänger ihop.',
  keywords: [
    'hur fungerar rcs',
    'rcs för företag hur fungerar det',
    'rcs google operatör',
    'rcs business messaging',
    'rbm',
    'rcs partner',
    'rcs iphone android företag',
    'rcs arkitektur',
  ],
  sections: [
    {
      sectionId: 'oversikt',
      title: '',
      paragraphs: [
        'Ett SMS går från avsändaren genom operatörens nät till telefonen. RCS från ett företag har fler led, och vart och ett har sin uppgift. Det förklarar varför ett meddelande kan fungera hos en kund men inte hos en annan, och varför det tar några dagar innan en ny avsändare kan skicka.',
        'Kort sagt går meddelandet de här stegen, och svaren går samma väg tillbaka:',
      ],
      points: [
        'Företagets system bestämmer att något ska skickas, till exempel när en order lämnar lagret.',
        'Partnern tar emot utskicket och skickar det från företagets registrerade avsändare.',
        'Googles plattform för RCS för företag kontrollerar att kunden kan ta emot RCS och att avsändaren är godkänd hos kundens operatör.',
        'RCS-tjänsten, som drivs av operatören eller av Google, för meddelandet till kundens telefon.',
        'Meddelandeappen i telefonen visar meddelandet med företagets namn, logotyp och knappar.',
      ],
      sources: ['how-it-works', 'partner-registration', 'launch-overview', 'chat'],
    },
    {
      sectionId: 'standarden',
      title: 'Standarden gör att allt talar samma språk',
      paragraphs: [
        'RCS är en standard från GSMA, mobiloperatörernas branschorganisation. Den gemensamma tekniska grunden heter Universal Profile. Tack vare den kan en Android-telefon och en iPhone skicka RCS till varandra, och operatörer i olika länder kan koppla ihop sina tjänster.',
        'Standarden bestämmer vad som är möjligt, men varje operatör och varje app väljer själv när en funktion införs. Därför kan samma meddelande se lite olika ut i olika telefoner.',
      ],
      points: [],
      sources: ['gsma'],
    },
    {
      sectionId: 'operatoren',
      title: 'Operatören öppnar för RCS och tar betalt',
      paragraphs: [
        'RCS är en tjänst som operatören tillhandahåller. Har operatören inte öppnat för RCS på kundens abonnemang går meddelandet inte fram som RCS, hur ny telefonen än är. Själva tjänsten drivs antingen av operatören eller av Google.',
        'För företag har operatören två uppgifter till. Den godkänner varje avsändare innan den får skriva till operatörens kunder, och den tar betalt per meddelande. Priset beror på vad meddelandet innehåller och om kunden svarar, och det är därför listpriserna skiljer sig mellan meddelandetyper och mellan mottagarnas nät.',
      ],
      points: [],
      sources: ['apple', 'chat', 'launch-overview', 'billing-faq', 'rcsdirekt-prices'],
    },
    {
      sectionId: 'telefonen',
      title: 'Telefonen och meddelandeappen',
      paragraphs: [
        'På Android tar Google Meddelanden emot RCS, och andra appar som följer standarden, som Samsung Messages, kan också göra det. På iPhone är det Apples Meddelanden, som har stöd för RCS från iOS 18 om operatören har öppnat för det. Från iOS 26 går det att välja en annan app för SMS, MMS och RCS.',
        'Appen avgör hur meddelandet visas: var knapparna hamnar, hur bilden beskärs och hur företagets profil ser ut. Kunden kan också stänga av RCS från företag, på iPhone under Inställningar, Appar, Meddelanden och RCS-meddelanden, och rapportera ett meddelande som skräp.',
      ],
      points: [],
      sources: ['chat', 'apple', 'business'],
    },
    {
      sectionId: 'google',
      title: 'Googles plattform kopplar ihop företag och operatörer',
      paragraphs: [
        'Företagsmeddelanden skickas genom Googles plattform för RCS för företag, som ofta kallas RBM efter RCS Business Messaging. Där registreras avsändaren, och där kontrolleras varumärket och vad avsändaren ska skicka. Efter lanseringen når avsändaren kunder med RCS hos de operatörer som har godkänt den, oavsett om kunden har Android eller iPhone.',
        'Plattformen tar emot utskicket som ett anrop och svarar direkt om något är fel. Saknar kundens telefon RCS, eller är avsändaren inte lanserad hos kundens operatör, får avsändaren felet 404 och kan skicka ett SMS i stället. Är telefonen avstängd väntar meddelandet i upp till 31 dagar, om det inte har en kortare giltighetstid. Kvitton för levererat och läst, och allt kunden svarar, skickas tillbaka till avsändarens webhook.',
      ],
      points: [],
      sources: ['how-it-works', 'launch-overview', 'capabilities', 'send', 'webhooks'],
    },
    {
      sectionId: 'partnern',
      title: 'Partnern har avtalen och tekniken',
      paragraphs: [
        'Bara registrerade partner kan skapa avsändare och skicka genom Googles plattform. Partnern skapar avsändaren åt varumärket, begär lanseringen hos operatörerna och har avtalen med dem. Det är partnern som operatörerna debiterar, och partnern som tar emot kundernas svar och händelser och skickar dem vidare till företaget.',
        'Ett företag som inte vill bli partner själv skickar därför genom en partner. Hos rcsdirekt.se skickar du från webben eller via API, och registreringen av avsändaren sköts genom oss.',
      ],
      points: [],
      sources: ['partner-registration', 'agent', 'launch-approval'],
    },
    {
      sectionId: 'foretaget',
      title: 'Företagets eget system',
      paragraphs: [
        'Det sista ledet är företagets egna system: webbutiken, bokningssystemet eller kundregistret. Där uppstår det som ska skickas, till exempel att en order har skickats eller att en tid närmar sig. Systemet anropar partnerns API, eller så skickar någon utskicket från ett webbverktyg.',
        'Systemet behöver också ta emot det som kommer tillbaka. Det gäller leveranskvitton, kundens svar och avregistreringar, som ska stoppa fortsatta utskick. Kunder utan RCS behöver få ett SMS i stället, och samma kund ska inte få båda.',
      ],
      points: [],
      sources: ['how-it-works', 'webhooks', 'events', 'launch-approval'],
    },
    {
      sectionId: 'felsokning',
      title: 'Var ska du leta när något inte fungerar?',
      paragraphs: ['Varje led styr sin del, så här är det värt att börja leta:'],
      points: [
        'Kunden får ett SMS i stället för RCS: telefonen saknar RCS, operatören har inte öppnat för det, eller avsändaren är inte lanserad hos kundens operatör.',
        'Avsändaren når kunder hos en operatör men inte hos en annan: lanseringen är inte godkänd hos alla operatörer.',
        'Knappar eller bilder ser olika ut: det beror på meddelandeappen och dess version.',
        'Leveranskvittot kommer sent eller inte alls: telefonen kan ha varit avstängd, eller så har webhooken inte tagit emot händelsen.',
      ],
      sources: ['capabilities', 'launch-overview', 'how-it-works', 'webhooks'],
    },
    {
      sectionId: 'sakerhet',
      title: 'Vem kan läsa meddelandena?',
      paragraphs: [
        'Företagsmeddelanden är krypterade på vägen mellan avsändaren och Googles servrar och mellan Googles servrar och telefonen, men de är inte end-to-end-krypterade. Google söker igenom meddelanden från företag efter skadligt innehåll men har inte åtkomst till det kunden skriver till företaget. Partnern och i vissa fall operatören kan komma åt innehållet för leverans och andra ändamål. Skicka därför aldrig uppgifter i ett RCS-meddelande som du inte skulle skicka i ett SMS.',
      ],
      points: [],
      sources: ['how-it-works', 'business'],
    },
  ],
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const context = { skipRebuild: true }
  const findSource = async (id: string) =>
    (await payload.find({ collection: 'kallor', where: { sourceId: { equals: id } }, depth: 0, limit: 1, req })).docs[0]?.id
  for (const source of SOURCES) {
    if (await findSource(source.sourceId)) continue
    await payload.create({ collection: 'kallor', req, context, data: source as never })
  }
  const exists = await payload.find({ collection: 'artiklar', where: { slug: { equals: SLUG } }, depth: 0, limit: 1, req })
  if (exists.docs.length) return
  const sections = []
  for (const section of ARTICLE.sections) {
    const sources = (await Promise.all(section.sources.map(findSource))).filter((id) => id !== undefined)
    if (!sources.length) {
      payload.logger.warn(`Migration: no sources found for section ${section.sectionId}; article not created.`)
      return
    }
    sections.push({ ...section, paragraphs: section.paragraphs.map((text) => ({ text })), points: section.points.map((text) => ({ text })), sources })
  }
  // No skipRebuild here, so the site is rebuilt with the new article.
  await payload.create({
    collection: 'artiklar',
    req,
    data: { ...ARTICLE, keywords: ARTICLE.keywords.map((keyword) => ({ keyword })), sections } as never,
  })
  payload.logger.info('Migration: article on how RCS fits together created.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: remove the article in the CMS if it is ever not wanted.
}
