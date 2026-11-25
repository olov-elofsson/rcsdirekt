import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change: an article on what each kind of RCS sender may send and how the
// registration works, with two new Google sources. Old hidden articles on registration now
// lead to it. Each step is skipped if it has already been done.
const SLUG = 'rcs-avsandare-anvandningsfall-registrering'

const SOURCES = [
  {
    sourceId: 'launch-overview',
    title: 'Google RCS for Business: Verify and launch your agent',
    url: 'https://developers.google.com/business-communications/rcs-business-messaging/guides/launch',
    finding:
      'Lanseringen består av varumärkesverifiering och ett godkännande från Google, operatören eller båda. Vissa operatörer sköter lanseringen själva och kan kräva ett direkt avtal. För att lansera hos en operatör där Google sköter lanseringen måste avsändaren först vara lanserad hos minst en operatör i samma land som sköter den själv.',
    implication:
      'Hur registreringen går till beror på vilka operatörer avsändaren ska nå. Fråga din partner hur det ser ut för de svenska näten.',
  },
  {
    sourceId: 'test-devices',
    title: 'Google RCS for Business: Set up a test device',
    url: 'https://developers.google.com/business-communications/rcs-business-messaging/guides/build/test',
    finding:
      'En avsändare som inte är lanserad kan bara skriva till testtelefoner som har RCS påslaget och har tackat ja till en inbjudan. Avsändaren kan skicka 20 inbjudningar per dag och 200 totalt, och meddelanden till testtelefoner debiteras inte.',
    implication: 'Testa med riktiga telefoner hos de operatörer dina kunder använder innan lanseringen begärs.',
  },
]

const ARTICLE = {
  title: 'Vad får en RCS-avsändare skicka, och hur registreras den?',
  slug: SLUG,
  category: 'Företag',
  published: '2026-11-25',
  author: 'Olov Elofsson',
  description:
    'Varje RCS-avsändare registreras för ett av fyra användningsfall: engångskoder, transaktioner, marknadsföring eller blandad användning. Valet styr vad avsändaren får skicka och kan inte ändras när den har skickats in för lansering. Här går vi igenom hur du väljer och vad som händer från registrering till första utskick.',
  keywords: [
    'rcs agent',
    'rcs användningsfall',
    'rcs avsändare registrering',
    'registrera rcs avsändare',
    'rcs lansering',
    'rcs engångskod',
    'rcs otp',
    'rcs transaktionella meddelanden',
    'rcs marknadsföring avsändare',
  ],
  sections: [
    {
      sectionId: 'forklaring',
      title: '',
      paragraphs: [
        'Avsändaren är det kunden ser överst i chatten: företagets namn, logotyp och en verifieringsbock. Google kallar den en agent. Ordet betyder här bara en registrerad avsändare och har inget med AI att göra.',
        'När avsändaren skapas väljer du vad den ska användas till. Google har fyra användningsfall, och vart och ett har regler för vilka meddelanden som är tillåtna. Användningsfallet går inte att ändra efter att avsändaren har skickats in för lansering, så det är värt att tänka igenom valet innan något annat görs.',
      ],
      points: [],
      sources: ['agent', 'use-cases'],
    },
    {
      sectionId: 'anvandningsfall',
      title: 'De fyra användningsfallen',
      paragraphs: ['Så här beskriver Google vad varje sorts avsändare får och inte får skicka:'],
      points: [
        'Engångskoder: koder för inloggning och tvåstegsverifiering, återställning av lösenord och för att slutföra ett köp på nätet. Avsändaren får inte skicka produktinformation eller erbjudanden.',
        'Transaktioner: besked om något kunden redan har, som orderbekräftelser, leveransbesked, bokningspåminnelser, boardingkort, varningar för misstänkt bedrägeri, kontoutdrag och frågor om ett köp. Erbjudanden, rabatter och uppgraderingar är inte tillåtna.',
        'Marknadsföring: erbjudanden, rabatter och uppgraderingar till nya eller befintliga kunder, och påminnelser om ett köp kunden har påbörjat, till exempel en övergiven varukorg. Engångskoder och tidskritiska besked hör inte hit.',
        'Blandad användning: samtal där transaktioner och marknadsföring hänger ihop, som när ett flygbolag skickar boardingkortet och sedan erbjuder en bättre plats. Koder som behövs för ett köp i samma samtal är tillåtna, men inte inloggningskoder eller lösenordsåterställning.',
      ],
      sources: ['use-cases'],
    },
    {
      sectionId: 'valja',
      title: 'Så väljer du användningsfall',
      paragraphs: [
        'Utgå från de meddelanden du faktiskt ska skicka, inte från vad som kanske blir aktuellt längre fram. Skriv ner varje utskick och vad som får det att gå iväg, och se vilket användningsfall listan passar. En blandad avsändare får bara användas när samtalen verkligen innehåller båda delarna, och inte som ett sätt att hålla alla dörrar öppna.',
        'Google tillåter i vissa länder att en blandad avsändare lanseras med bara den ena delen på plats, om den andra kommer inom sex månader. Sverige finns inte med i den listan i dag, så här behöver båda delarna finnas när avsändaren lanseras. Några tumregler:',
      ],
      points: [
        'Skickar du inloggningskoder behöver de en egen avsändare för engångskoder.',
        'Skickar du bara orderbesked, leveransbesked och påminnelser räcker en avsändare för transaktioner.',
        'Skickar du kampanjer och nyhetsbrev till kunder som har sagt ja behöver du en avsändare för marknadsföring.',
        'Följer erbjudandet naturligt på ett besked i samma samtal passar blandad användning.',
      ],
      sources: ['use-cases'],
    },
    {
      sectionId: 'last',
      title: 'Det här bestäms en gång för alla',
      paragraphs: [
        'Utöver användningsfallet väljer du region när avsändaren skapas, alltså var den lagrar sina data. Den går inte att byta senare. Verifieringsuppgifterna och svaren i lanseringsformuläret låses när lanseringen har begärts, och en avsändare kan inte raderas. Ett felval betyder i praktiken att du får registrera en ny avsändare och göra om granskningen.',
      ],
      points: [],
      sources: ['agent', 'verification', 'launch-approval'],
    },
    {
      sectionId: 'steg',
      title: 'Från registrering till första utskick',
      paragraphs: ['Registreringen sker hos din partner, alltså företaget som sköter avsändaren tekniskt. Stegen ser ut så här:'],
      points: [
        'Avsändaren skapas med namn, logotyp, beskrivning, kontaktuppgifter, region och användningsfall.',
        'Den testas mot testtelefoner som har tackat ja till en inbjudan. Innan lanseringen kan den inte skriva till någon annan.',
        'Verifieringsuppgifterna lämnas: en anställd hos varumärket som får godkänna avsändaren, och vid behov en fullmakt som pdf.',
        'Lanseringen begärs med ett formulär om vad som utlöser meddelandena, hur samtalen går och hur kunden avregistrerar sig.',
        'Google, operatörerna eller båda granskar avsändaren och kontaktar varumärkets kontaktperson.',
        'När statusen står på Lanserad kan avsändaren nå kunder hos den operatören efter ungefär 30 minuter.',
      ],
      sources: ['agent', 'test-devices', 'verification', 'launch-approval'],
    },
    {
      sectionId: 'underlag',
      title: 'Vad granskarna vill se',
      paragraphs: [
        'Granskningen gäller att avsändaren gör det som användningsfallet säger. Därför vill Google ha antingen en video av samtalen eller utskrifter steg för steg, med de exakta texterna, knapparna och länkarna. Beskrivningarna ska stämma med det användningsfall du valde.',
        'Var konkret om vad som utlöser meddelandet. Skriv inte bara att kunden får ett meddelande när hen registrerar sig, utan var och hur registreringen sker. Webbplatsen, integritetspolicyn och villkoren ska vara publicerade och gå att öppna. Formuläret ska innehålla:',
      ],
      points: [
        'Vad som utlöser varje meddelande, till exempel att en order skickas från lagret.',
        'Hela samtalet med de exakta texterna och alla knappar.',
        'Avregistreringen: avsändaren ska förstå ordet STOP och motsvarande ord på svenska, och svara med ett besked om att kunden inte får fler meddelanden.',
        'Namn, e-postadress och telefonnummer till de ansvariga hos er.',
      ],
      sources: ['launch-approval'],
    },
    {
      sectionId: 'tid',
      title: 'Hur lång tid tar det?',
      paragraphs: [
        'Google anger 1 till 3 arbetsdagar för en lansering som Google sköter, om varumärket godkänner inom 24 timmar och allt underlag är på plats. Vissa operatörer sköter lanseringen själva, har egna krav och kan kräva ett direkt avtal. För att få lansera hos en operatör där Google sköter granskningen måste avsändaren först vara lanserad hos minst en operatör i samma land som sköter den själv.',
        'Ett steg som kan dra ut på tiden är mejlet till varumärkets kontaktperson. Det kommer från rbm-support@google.com och måste besvaras innan lanseringen går vidare. Ange en personlig adress och inte en gruppadress, och säg till kontaktpersonen i förväg att mejlet kommer.',
      ],
      points: [],
      sources: ['launch-approval', 'launch-overview', 'verification'],
    },
    {
      sectionId: 'samtycke',
      title: 'Registreringen ersätter inte samtycket',
      paragraphs: [
        'En godkänd avsändare betyder att Google och operatörerna har kontrollerat vem som skickar och vad den ska skicka. Det ger inget tillstånd att skicka till en viss person. Reklam till privatpersoner kräver enligt marknadsföringslagen samtycke i förväg, med ett undantag för befintliga kunder som har tre villkor.',
        'Telefonnumren behöver dessutom en rättslig grund enligt GDPR för varje ändamål. Samma nummer kan användas för ett leveransbesked med avtalet som grund men behöva samtycke för ett kampanjutskick.',
      ],
      points: [],
      sources: ['mfl-law', 'imy-legal-basis', 'verification'],
    },
  ],
}

// Hidden articles whose old addresses should now lead to the new article.
const REDIRECT_HERE = [
  'rcs-agent-registrering',
  'rcs-varumarken-agenter',
  'rcs-lanseringsunderlag',
  'rcs-testagent-produktion',
  'rcs-avdelningar-samma-avsandare',
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const context = { skipRebuild: true }
  const findSource = async (id: string) =>
    (await payload.find({ collection: 'kallor', where: { sourceId: { equals: id } }, depth: 0, limit: 1, req })).docs[0]?.id
  for (const source of SOURCES) {
    if (await findSource(source.sourceId)) continue
    await payload.create({ collection: 'kallor', req, context, data: source as never })
  }

  let article = (await payload.find({ collection: 'artiklar', where: { slug: { equals: SLUG } }, depth: 0, limit: 1, req })).docs[0]
  if (!article) {
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
    article = await payload.create({
      collection: 'artiklar',
      req,
      data: { ...ARTICLE, keywords: ARTICLE.keywords.map((keyword) => ({ keyword })), sections } as never,
    })
  }

  for (const slug of REDIRECT_HERE) {
    const old = (await payload.find({ collection: 'artiklar', where: { slug: { equals: slug } }, depth: 0, limit: 1, req })).docs[0]
    if (!old || !old.archived) continue
    await payload.update({ collection: 'artiklar', id: old.id, req, context, data: { replacedBy: article.id } as never })
  }
  payload.logger.info('Migration: article on sender use cases and registration created.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: remove the article in the CMS if it is ever not wanted.
}
