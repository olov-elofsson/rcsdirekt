import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change: two articles that answer what companies asked in RCS forums (Swedroid,
// Flashback, SweClockers, operator communities, Klaviyo and Shopify communities) in November 2026
// and that the blog did not already cover: how RCS from a company differs between iPhone and
// Android, and how RCS compares with WhatsApp. New sources are added first. Each step is skipped
// if it has already been done.

const SOURCES = [
  {
    sourceId: 'apple-unknown-senders',
    title: 'Apple: Visa konversationer från okända avsändare i Meddelanden på iPhone',
    url: 'https://support.apple.com/en-us/125068',
    finding:
      'I iOS 26 kan meddelanden från okända avsändare hamna i ett eget filter. Inställningen Granska okända avsändare är avstängd som standard i iOS 26, men den är påslagen om användaren hade Filtrera okända avsändare påslaget i iOS 18.',
    implication:
      'En del iPhone-användare ser inte ett första företagsmeddelande i den vanliga listan och får ingen avisering förrän avsändaren räknas som känd.',
  },
  {
    sourceId: 'apple-filter-messages',
    title: 'Apple: Granska och filtrera textmeddelanden på iPhone',
    url: 'https://support.apple.com/guide/iphone/screen-and-filter-texts-iph203ab0be4/ios',
    finding:
      'På iPhone kan användaren granska meddelanden från okända avsändare, välja vilka kategorier som får avisera, och låta SMS, MMS och RCS från okända avsändare sorteras i mapparna Transaktioner och Kampanjer. Användaren kan också stänga av aviseringar från företag.',
    implication: 'Var ett företagsmeddelande hamnar på iPhone beror på mottagarens egna inställningar.',
  },
  {
    sourceId: 'klaviyo-ios-rcs',
    title: 'Klaviyo: RCS på iOS, kända begränsningar och vad du kan förvänta dig',
    url: 'https://help.klaviyo.com/hc/sv-se/articles/45972883876891',
    finding:
      'Klaviyo listade i februari 2026 kända skillnader för RCS från företag på iPhone: avsändarens id kan visas i stället för namnet, bannern visas inte i profilen, bildens höjd anpassas efter texten, knappar är grå och flera knappar samlas i en lista, svarsknappar hamnar i en egen bubbla under kortet, GIF-bilder visas stillastående och en länk sist i meddelandet blir en egen bubbla. Skillnaderna varierar mellan enheter, iOS-versioner och operatörer.',
    implication:
      'Listan kommer från en leverantör och gäller iOS-versionerna då. Testa på aktuella telefoner, eftersom Apple kan ha ändrat visningen sedan dess.',
  },
  {
    sourceId: 'iis-whatsapp-2025',
    title: 'Internetstiftelsen: Svenskarna och internet 2025, Sociala medier',
    url: 'https://svenskarnaochinternet.se/rapporter/svenskarna-och-internet-2025/sociala-medier/',
    finding: '49 procent av svenskarna hade använt Whatsapp minst en gång under de senaste tolv månaderna, och 19 procent använde appen dagligen.',
    implication: 'Ungefär hälften av svenskarna kan nås på Whatsapp, och en mindre del använder appen varje dag.',
  },
  {
    sourceId: 'meta-whatsapp-pricing',
    title: 'Meta: Pricing on the WhatsApp Business Platform',
    url: 'https://developers.facebook.com/docs/whatsapp/pricing',
    finding:
      'Sedan den 1 juli 2025 tar Meta betalt per meddelande. Priset beror på mallens kategori (marknadsföring, nytta eller autentisering), mottagarens landsnummer och för vissa kategorier volym. Mallar är den enda sortens meddelande som kan skickas utanför ett öppet kundtjänstfönster. Inom fönstret är meddelanden som inte är mallar gratis, liksom nyttomallar, medan marknadsförings- och autentiseringsmallar kostar. Meddelanden från kunden till företaget kostar inget.',
    implication: 'Kostnaden för Whatsapp beror på vad som skickas och om kunden nyligen har skrivit till företaget. Kontrollera Metas aktuella prislista.',
  },
  {
    sourceId: 'meta-whatsapp-opt-in',
    title: 'Meta: Get opt-in for WhatsApp',
    url: 'https://developers.facebook.com/docs/whatsapp/overview/getting-opt-in',
    finding:
      'Företag måste ha mottagarens samtycke innan de på eget initiativ skickar meddelanden utanför 24-timmarsfönstret. Samtycket kan samlas in på olika sätt, på och utanför Whatsapp, och ska uppfylla gällande lag.',
    implication: 'Metas regler ersätter inte svensk lag. Marknadsföringslagen och GDPR gäller som för andra kanaler.',
  },
]

type Section = { sectionId: string; title: string; paragraphs: string[]; points: string[]; sources: string[] }
type Article = {
  title: string
  slug: string
  category: string
  published: string
  author: string
  description: string
  keywords: string[]
  sections: Section[]
}

const IPHONE_ANDROID: Article = {
  title: 'Vad skiljer RCS från företag på iPhone och Android?',
  slug: 'rcs-iphone-android-skillnader',
  category: 'Meddelandedesign',
  published: '2026-11-28',
  author: 'Olov Elofsson',
  description:
    'Ett RCS-meddelande från ett företag ser inte likadant ut på iPhone som på Android. Vem som kan ta emot det, hur knappar och bilder visas och var meddelandet hamnar skiljer sig. Här går vi igenom skillnaderna och hur du utformar ett meddelande som fungerar på båda.',
  keywords: [
    'rcs iphone android skillnad',
    'rcs iphone vs android',
    'rcs för företag iphone',
    'rcs business messaging iphone',
    'rcs knappar iphone',
    'rcs karusell iphone',
    'rcs okända avsändare',
    'rcs meddelande ser konstigt ut iphone',
    'rbm ios',
  ],
  sections: [
    {
      sectionId: 'oversikt',
      title: '',
      paragraphs: [
        'På Android visas RCS från företag oftast i Google Meddelanden, som Google bygger tjänsten kring. På iPhone är det Apples Meddelanden som visar meddelandet, från iOS 18 och om operatören har öppnat för RCS. Apple bestämmer själv hur kort, knappar och avsändarprofil ritas upp, och därför kan samma utskick se olika ut i de två telefonerna.',
        'Skillnaderna i korthet:',
      ],
      points: [
        'Mottagare: på Android kan Google sköta RCS även där operatören inte gör det, medan iPhone kräver att operatören har öppnat för RCS. I Sverige gäller det Tele2 och Comviq i november 2026.',
        'Knappar: knappar som ligger kvar inne i meddelandebubblan visas inte på iPhone, och flera knappar kan samlas i en lista.',
        'Bilder: på iPhone anpassas bildens höjd efter texten, och GIF-bilder visas stillastående.',
        'Avsändarprofil: bannern och extra kontaktuppgifter visas bara i Google Meddelanden.',
        'Sortering: på iPhone kan ett första meddelande hamna under okända avsändare utan avisering.',
        'Engångskoder: iPhone känner igen koden och föreslår den automatiskt.',
      ],
      sources: ['apple', 'chat', 'tele2-rcs', 'comviq-rcs', 'send', 'klaviyo-ios-rcs', 'agent-info', 'apple-unknown-senders'],
    },
    {
      sectionId: 'mottagare',
      title: 'Vem kan ta emot meddelandet?',
      paragraphs: [
        'På Android tillhandahålls RCS-chattar antingen av operatören eller av Google, och de flesta telefoner har Google Meddelanden som standardapp. På iPhone krävs iOS 18 eller senare och en operatör som har öppnat för RCS på iPhone, och i november 2026 är det Tele2 och Comviq i Sverige. Tre fungerar i testversionen av iOS 27.3.',
        'För ett företagsutskick finns ett villkor till på båda plattformarna. Avsändaren måste vara lanserad hos kundens operatör. Saknas RCS, eller är avsändaren inte lanserad där, svarar plattformen med ett fel och kunden kan få ett SMS i stället. En kapabilitetskontroll före utskicket visar om ett visst nummer kan nås.',
      ],
      points: [],
      sources: ['chat', 'apple', 'tele2-rcs', 'comviq-rcs', 'tre-hallon-ios-27-3', 'launch-approval', 'capabilities'],
    },
    {
      sectionId: 'knappar',
      title: 'Knappar och svar',
      paragraphs: [
        'Google har två sorters knappar. De tillfälliga visas under meddelandet och försvinner när kunden svarar, och de fungerar på båda plattformarna. De som ligger kvar inne i meddelandebubblan stöds bara i Google Meddelanden från version 20260225.00, och inte på iPhone eller i Samsung Messages.',
        'På iPhone visas svarsknapparna dessutom i en egen bubbla under kortet, knapparna är grå, och har kortet flera knappar kan de samlas i en lista med en allmän etikett. Lägg därför den viktigaste åtgärden först och håll nere antalet knappar, så att kunden ser vad som går att göra utan att öppna listan.',
      ],
      points: [],
      sources: ['send', 'klaviyo-ios-rcs'],
    },
    {
      sectionId: 'bilder',
      title: 'Bilder, kort och länkar',
      paragraphs: [
        'Google rekommenderar att du sätter mediehöjden till hög för att korten ska fungera på iPhone. Det är särskilt viktigt för fristående kort med liggande layout, som annars kan misslyckas att visas eller levereras på iOS. På iPhone anpassas bilden efter textens längd och kan se ihoptryckt ut, så prova kortet med den text du faktiskt ska skicka.',
        'GIF-bilder visas stillastående på iPhone, så budskapet får inte hänga på animationen. En länk som står sist i meddelandet, utan text efter, kan på iPhone bli en egen bubbla med en förhandsvisning. Klaviyo föreslår att du sätter en punkt efter länken för att undvika det.',
      ],
      points: [],
      sources: ['send', 'klaviyo-ios-rcs'],
    },
    {
      sectionId: 'avsandaren',
      title: 'Hur avsändaren visas',
      paragraphs: [
        'I Google Meddelanden visas företagets namn och logotyp överst i samtalet och en verifieringsbock efter namnet, och i profilen finns bannerbild, beskrivning och kontaktuppgifter. Extra kontaktuppgifter och egna etiketter, som Kundtjänst i stället för Telefon, visas bara där. Andra appar visar den primära telefonen, webbplatsen och e-postadressen.',
        'På iPhone visas bannern inte i profilen, och avsändarens id kan i vissa fall stå i stället för namnet. Lägg därför de viktigaste kontaktvägarna i de primära fälten och gör logotypen tydlig, eftersom det är den som syns på båda plattformarna.',
      ],
      points: [],
      sources: ['business', 'verification', 'agent-info', 'klaviyo-ios-rcs'],
    },
    {
      sectionId: 'okanda-avsandare',
      title: 'Okända avsändare och filter på iPhone',
      paragraphs: [
        'I iOS 26 kan iPhone-användare låta meddelanden från okända avsändare hamna i ett eget filter i stället för i den vanliga listan. Inställningen är avstängd som standard, men den är påslagen hos den som hade Filtrera okända avsändare påslaget i iOS 18. Användaren kan också låta SMS, MMS och RCS från okända avsändare sorteras i mapparna Transaktioner och Kampanjer, och stänga av aviseringar från företag.',
        'Ett första meddelande från ett företag kan alltså komma fram utan att kunden märker det. När kunden har svarat eller markerat avsändaren som känd hamnar följande meddelanden i den vanliga listan. På iPhone kan kunden dessutom stänga av RCS-meddelanden från företag helt, och på båda plattformarna kan kunden blockera avsändaren och rapportera den som skräp.',
      ],
      points: [],
      sources: ['apple-unknown-senders', 'apple-filter-messages', 'apple', 'business'],
    },
    {
      sectionId: 'utforma',
      title: 'Så utformar du ett meddelande som fungerar på båda',
      paragraphs: [
        'Utgå från det som visas likadant och lägg till det andra som en bonus. Skillnaderna ändras med nya versioner av iOS och Google Meddelanden, så testa på riktiga telefoner innan ett stort utskick. Den här listan är en bra start:',
      ],
      points: [
        'Skriv texten så att den går att förstå utan bilden och utan knapparna.',
        'Sätt mediehöjden till hög på kort med bild.',
        'Lägg den viktigaste knappen först och använd få knappar.',
        'Låt inte budskapet bero på att en GIF rör sig.',
        'Sätt en punkt efter en länk som står sist i texten.',
        'Lägg telefon, webbplats och e-post i profilens primära fält.',
        'Skicka ett test till en iPhone och en Android-telefon från den registrerade avsändaren.',
      ],
      sources: ['send', 'klaviyo-ios-rcs', 'agent-info', 'test-devices'],
    },
  ],
}

const WHATSAPP: Article = {
  title: 'RCS eller WhatsApp för företag?',
  slug: 'rcs-eller-whatsapp',
  category: 'Företag',
  published: '2026-11-28',
  author: 'Olov Elofsson',
  description:
    'Både RCS och WhatsApp kan skicka bilder, knappar och svar från ett företag. Skillnaden ligger i var meddelandet hamnar, vem som kan ta emot det, hur du betalar och vilka regler som gäller. Här jämför vi kanalerna för svenska förhållanden.',
  keywords: [
    'rcs eller whatsapp',
    'rcs vs whatsapp',
    'whatsapp business eller rcs',
    'whatsapp för företag',
    'whatsapp business api pris',
    'rcs eller whatsapp e-handel',
    'kundkommunikation whatsapp sms rcs',
  ],
  sections: [
    {
      sectionId: 'oversikt',
      title: '',
      paragraphs: [
        'RCS hamnar i telefonens vanliga meddelandeapp och skickas till kundens mobilnummer. Kunden behöver ingen egen app, men telefonen och operatören måste ha stöd för RCS, och den som saknar det kan få ett SMS i stället. Whatsapp kräver att kunden har installerat appen.',
        'Skillnaderna i korthet:',
      ],
      points: [
        'Var meddelandet syns: RCS i meddelandeappen bland SMS, Whatsapp i en egen app.',
        'Vem du når: RCS når telefoner med RCS och resten med SMS, Whatsapp bara den som har appen.',
        'Pris: RCS kostar per meddelande efter typ och mottagarens nät, Whatsapp per meddelande efter kategori och land, med vissa meddelanden gratis när kunden nyligen har skrivit.',
        'Regler: båda kräver samtycke för marknadsföring enligt svensk lag, och Meta kräver dessutom samtycke innan företaget skriver först.',
      ],
      sources: ['chat', 'apple', 'capabilities', 'iis-whatsapp-2025', 'rcsdirekt-prices', 'meta-whatsapp-pricing', 'meta-whatsapp-opt-in', 'mfl-law'],
    },
    {
      sectionId: 'rackvidd',
      title: 'Vem når du?',
      paragraphs: [
        'Enligt Internetstiftelsen hade 49 procent av svenskarna använt Whatsapp minst en gång under det senaste året, och 19 procent använde appen dagligen. Ett företag som bara skickar på Whatsapp når alltså ungefär hälften av sina kunder, och färre av dem ser meddelandet samma dag.',
        'RCS når Android-telefoner med RCS och iPhone hos operatörer som har öppnat för det, i november 2026 Tele2 och Comviq. Avsändaren måste också vara lanserad hos kundens operatör. Resten kan få samma besked som SMS, så alla med ett mobilnummer nås, även om inte alla får knappar och bilder. En masskontroll på ett urval av kundernas nummer ger en uppskattning av hur många som kan få RCS.',
      ],
      points: [],
      sources: ['iis-whatsapp-2025', 'chat', 'tele2-rcs', 'comviq-rcs', 'launch-approval', 'capabilities'],
    },
    {
      sectionId: 'pris',
      title: 'Vad kostar det?',
      paragraphs: [
        'RCS kostar per meddelande, och priset beror på vad meddelandet innehåller och vilket nät mottagaren har. I rcsdirekt.se:s prislista börjar Basic, som är text upp till 160 tecken, på 0,316 kr, Single med bild eller knappar på 0,462 kr och Conversation, en dialog i 24 timmar, på 0,641 kr, exklusive moms. Får kunden ett SMS i stället kostar det SMS-priset.',
        'Whatsapp kostar också per meddelande sedan den 1 juli 2025. Priset beror på mallens kategori och mottagarens landsnummer, och för nytto- och autentiseringsmallar finns volymrabatter. Har kunden skrivit till företaget öppnas ett kundtjänstfönster. Inom det är vanliga meddelanden och nyttomallar gratis, medan marknadsföring och engångskoder kostar. Meta publicerar aktuella priser per land i sin prislista, och en leverantör tar ofta en avgift ovanpå.',
      ],
      points: [],
      sources: ['rcsdirekt-prices', 'billing-faq', 'meta-whatsapp-pricing'],
    },
    {
      sectionId: 'regler',
      title: 'Samtycke och regler',
      paragraphs: [
        'Svensk lag gäller lika för båda kanalerna. Marknadsföringslagen kräver samtycke i förväg för reklam till privatpersoner, med ett undantag för befintliga kunder som har tre villkor, och telefonnumren behöver en rättslig grund enligt GDPR för varje ändamål.',
        'Plattformarna har egna regler ovanpå lagen. För RCS granskar Google och operatörerna avsändaren och användningsfallet innan den får skicka, och avregistrering med STOP ska fungera. Meta kräver att företaget har mottagarens samtycke innan det skriver först på Whatsapp utanför 24-timmarsfönstret.',
      ],
      points: [],
      sources: ['mfl-law', 'imy-legal-basis', 'launch-approval', 'use-cases', 'meta-whatsapp-opt-in'],
    },
    {
      sectionId: 'dialog',
      title: 'När kunden svarar',
      paragraphs: [
        'På RCS kan kunden svara med text, bild eller sin plats, och svaren skickas till företagets system via en webhook. Svarar kunden inom 24 timmar på ett meddelande från en avsändare som är registrerad för samtal, startar en Conversation som omfattar meddelandena under 24 timmar efter svaret.',
        'På Whatsapp öppnar kundens meddelande ett fönster där företaget kan svara fritt. Utanför fönstret får företaget bara skicka godkända mallar. Det passar när kunden själv väljer att kontakta er på Whatsapp, till exempel med frågor om en beställning.',
      ],
      points: [],
      sources: ['receive', 'webhooks', 'billing-faq', 'meta-whatsapp-pricing', 'meta-whatsapp-opt-in'],
    },
    {
      sectionId: 'val',
      title: 'Välj efter uppgiften',
      paragraphs: [
        'Kanalerna utesluter inte varandra. RCS passar för besked som alla med ett mobilnummer ska få, som leveransbesked och bokningspåminnelser, eftersom kunder utan RCS kan få samma besked som SMS. Whatsapp passar när kunderna redan skriver till er där. Ställ några frågor innan du väljer:',
      ],
      points: [
        'Hur stor andel av kunderna når du i varje kanal?',
        'Vem tar initiativet, ni eller kunden?',
        'Vad kostar ett vanligt utskick med den andel som får SMS i stället?',
        'Vilket samtycke har ni, och för vilka ändamål?',
        'Var hamnar kundens svar i era egna system?',
      ],
      sources: ['capabilities', 'rcsdirekt-prices', 'meta-whatsapp-pricing', 'mfl-law', 'webhooks'],
    },
  ],
}

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

  const toCreate: Record<string, unknown>[] = []
  for (const article of [IPHONE_ANDROID, WHATSAPP]) {
    const exists = await payload.find({ collection: 'artiklar', where: { slug: { equals: article.slug } }, depth: 0, limit: 1, req })
    if (exists.docs.length) continue
    const sections = []
    for (const section of article.sections) {
      const sources = (await Promise.all(section.sources.map(findSource))).filter((id) => id !== undefined)
      if (sources.length < section.sources.length) {
        payload.logger.warn(`Migration: ${article.slug}#${section.sectionId} is missing ${section.sources.length - sources.length} source(s).`)
      }
      if (!sources.length) continue
      sections.push({ ...section, paragraphs: section.paragraphs.map((text) => ({ text })), points: section.points.map((text) => ({ text })), sources })
    }
    if (!sections.length) {
      payload.logger.warn(`Migration: no sections with sources for ${article.slug}; article not created.`)
      continue
    }
    toCreate.push({ ...article, keywords: article.keywords.map((keyword) => ({ keyword })), sections })
  }

  // Only the last article rebuilds the site, so it is built once with both in place.
  for (const [index, data] of toCreate.entries()) {
    const last = index === toCreate.length - 1
    await payload.create({ collection: 'artiklar', req, context: last ? {} : quiet, data: data as never })
  }
  payload.logger.info(`Migration: ${toCreate.length} articles created (iPhone and Android, RCS or WhatsApp).`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: remove the articles in the CMS if they are ever not wanted.
}
