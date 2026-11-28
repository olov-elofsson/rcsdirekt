import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change: two articles on the legal questions customers ask most often: whether a company
// may buy phone numbers and send RCS marketing, and what applies when the recipient is a company,
// a sole trader or an employee. New sources are added first. Each step is skipped if done.

const SOURCES = [
  {
    sourceId: 'mfl-avgift',
    title: 'Riksdagen: Marknadsföringslag (2008:486), 29 och 31 §§',
    url: 'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/marknadsforingslag-2008486_sfs-2008-486/',
    finding:
      'En näringsidkare som uppsåtligen eller av oaktsamhet bryter mot en bestämmelse i lagen kan åläggas marknadsstörningsavgift (29 §). Avgiften är lägst 10 000 kronor och högst fyra procent av omsättningen året innan överträdelsen upphörde, och högst två miljoner euro om omsättningen inte går att fastställa (31 §, i lydelse från den 1 september 2022).',
    implication: 'Att skicka reklam utan samtycke kan leda till en avgift som räknas på hela företagets omsättning.',
  },
  {
    sourceId: 'edpb-consent',
    title: 'Europeiska dataskyddsstyrelsen: Riktlinjer 05/2020 om samtycke',
    url: 'https://edpb.europa.eu/sites/edpb/files/files/file1/edpb_guidelines_202005_consent_sv.pdf',
    finding:
      'För att ett samtycke ska vara informerat måste den registrerade bland annat få veta den personuppgiftsansvariges identitet (punkt 64). Ska samtycket åberopas av flera, eller av andra personuppgiftsansvariga som uppgifterna lämnas till, ska alla dessa organisationer namnges (punkt 65).',
    implication: 'Ett samtycke till "utvalda partner" utan namn räcker normalt inte för ett företag som köper uppgifterna.',
  },
  {
    sourceId: 'gdpr-art14',
    title: 'IMY: Dataskyddsförordningen i fulltext, artikel 14',
    url: 'https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/introduktion-till-gdpr/dataskyddsforordningen-i-fulltext/',
    finding:
      'När personuppgifter inte har samlats in från den registrerade själv ska den personuppgiftsansvarige informera om bland annat vem den är, ändamålen, den rättsliga grunden och varifrån uppgifterna kommer. Ska uppgifterna användas för att kontakta personen ska informationen lämnas senast vid den första kontakten.',
    implication: 'Den som köper nummer måste kunna berätta för varje mottagare varifrån numret kommer och varför det används.',
  },
  {
    sourceId: 'google-aup',
    title: 'Google: Acceptable Use Policy för RCS for Business',
    url: 'https://developers.google.com/business-communications/rcs-business-messaging/terms-and-policies/aup',
    finding:
      'Google kräver att företaget ger användaren information och får ett uttryckligt, informerat samtycke med en enkel väg att säga nej innan det söker upp användaren. Samtycket ska vara frivilligt, gälla ett bestämt syfte och gå att återkalla, och avsändaren ska följa användarens avregistrering.',
    implication: 'Googles villkor gäller ovanpå svensk lag. En avsändare som skickar utan samtycke riskerar att stängas av.',
  },
  {
    sourceId: 'imy-bonnier-2023',
    title: 'IMY: Beslut efter tillsyn av Bonnier News (2023)',
    url: 'https://www.imy.se/globalassets/dokument/beslut/2023/beslut-tillsyn-bonnier-news.pdf',
    finding:
      'Ärendet gällde ett företag som tillgängliggjorde personuppgifter till anslutna bolag för telefonförsäljning och postal direktmarknadsföring, med berättigat intresse som rättslig grund och med profilering av de registrerade.',
    implication: 'Listor som säljs för post och telefon bedöms efter sina egna regler. Det säger inget om att samma nummer får användas för SMS eller RCS.',
  },
  {
    sourceId: 'ny-juridik-elektronisk-post',
    title: 'Ny Juridik 3:09: Marknadsföring med hjälp av elektroniska meddelanden',
    url: 'https://www.delphi.se/uploads/2018/07/09marknadsforing-med-hjalp-av-elektroniska-meddelanden-ny-juridik-nr-3-09-thomson-reutershenrik-bengtsson.pdf',
    finding:
      'Enligt huvudregeln i 19 § marknadsföringslagen är det förbjudet att skicka marknadsföring med elektronisk post till fysiska personer utan samtycke i förväg. En fysisk person som driver enskild firma omfattas enligt förarbetena av samtyckeskravet.',
    implication: 'Reklam till en enskild firma behandlas som reklam till en privatperson.',
  },
  {
    sourceId: 'pmod-2020-13',
    title: 'Patent- och marknadsöverdomstolen: PMÖD 2020:13',
    url: 'https://lagen.nu/dom/pmod/2020:13',
    finding:
      'Domstolen ålade ett företag att betala fyra miljoner kronor i marknadsstörningsavgift för otillbörlig marknadsföring, efter talan av Konsumentombudsmannen.',
    implication: 'Domstolarna dömer ut avgifter i miljonklassen. Målet gällde inte reklam via elektronisk post, men visar hur stora avgifterna kan bli.',
  },
]

type Section = { sectionId: string; title: string; paragraphs: string[]; points: string[]; sources: string[] }
type Article = { title: string; slug: string; category: string; published: string; author: string; description: string; keywords: string[]; sections: Section[] }

const BOUGHT_LISTS: Article = {
  title: 'Får du köpa telefonnummer och skicka RCS-reklam?',
  slug: 'rcs-kopta-telefonnummer',
  category: 'Företag',
  published: '2026-11-28',
  author: 'Olov Elofsson',
  description:
    'Kort svar: inte till privatpersoner, om inte varje mottagare i förväg har sagt ja till reklam från just ditt företag. En köpt lista har nästan aldrig ett sådant samtycke. Här går vi igenom vad marknadsföringslagen, GDPR och Googles regler säger, vad det kan kosta och hur du bygger en lista du får använda.',
  keywords: [
    'köpa telefonnummer sms reklam',
    'köpa lista sms utskick',
    'köpt lista rcs',
    'får man skicka sms reklam utan samtycke',
    'sms reklam lag',
    'rcs reklam samtycke',
    'köpa mobilnummer marknadsföring',
    'marknadsföringslagen sms',
    'gdpr köpt lista',
    'samtycke partner',
  ],
  sections: [
    {
      sectionId: 'kort-svar',
      title: '',
      paragraphs: [
        'Ett RCS-meddelande med reklam räknas som elektronisk post enligt marknadsföringslagen, på samma sätt som ett SMS. Till en privatperson får du bara skicka det om personen har samtyckt i förväg. Samtycket ska gälla reklam från ditt företag, och det kan du inte köpa till en lista i efterhand.',
        'Undantaget för befintliga kunder hjälper inte heller. Det gäller bara nummer som du själv har fått när du sålde något till personen. Ett nummer som kommer från en listsäljare uppfyller inte det villkoret.',
        'Genomgången ger en översikt och ersätter inte juridisk rådgivning. Låt en jurist bedöma ert upplägg innan ni skickar till nummer som ni inte har samlat in själva.',
      ],
      points: [],
      sources: ['mfl-law', 'marketing-law'],
    },
    {
      sectionId: 'lagen',
      title: 'Vad säger marknadsföringslagen?',
      paragraphs: [
        'Enligt 19 § får ett företag använda elektronisk post vid marknadsföring till en fysisk person bara om personen har samtyckt till det på förhand. Lagen definierar elektronisk post som ett individualiserat elektroniskt meddelande i form av text, röst, ljud eller bild som skickas via ett allmänt elektroniskt kommunikationsnät och kan lagras tills mottagaren hämtar det. Konsumentverket sammanfattar det som att företag bara får kontakta dig med reklam via e-post eller SMS om du har godkänt det.',
        'RCS nämns inte vid namn i lagen, men ett RCS-meddelande är ett individuellt meddelande som lagras tills mottagaren hämtar det, precis som ett SMS. Utgå därför från att samma regler gäller.',
        'Undantaget i 19 § gäller bara när du har fått numret i samband med att du sålde något till personen, och då måste alla tre villkoren vara uppfyllda:',
      ],
      points: [
        'Personen har inte sagt nej till att numret används för marknadsföring.',
        'Reklamen gäller dina egna, likartade produkter.',
        'Personen får klart, tydligt, enkelt och kostnadsfritt säga nej både när numret samlas in och i varje följande reklammeddelande.',
      ],
      sources: ['mfl-law', 'marketing-law'],
    },
    {
      sectionId: 'kopt-samtycke',
      title: 'Räcker det att listsäljaren har samtycke?',
      paragraphs: [
        'Listsäljare skriver ibland att personerna har samtyckt till erbjudanden från "utvalda partner". Ett sådant samtycke räcker normalt inte för dig som köpare. Enligt Europeiska dataskyddsstyrelsens riktlinjer måste den som ger samtycke få veta vem den personuppgiftsansvarige är, och om flera ska använda samtycket ska alla organisationerna namnges. Ett samtycke som inte nämner ditt företag ger alltså inte dig rätt att skicka.',
        'Googles regler för RCS från företag pekar åt samma håll. Företaget ska få ett uttryckligt och informerat samtycke för ett bestämt syfte innan det skriver till användaren, och användaren ska enkelt kunna säga nej. Det är ditt företag, som avsändare, som ska ha samtycket.',
        'Begär därför alltid att få se exakt hur samtycket samlades in, med texten personen godkände, datum och vilka företag som nämndes. Står ditt företag inte med, utgå från att listan inte kan användas för SMS eller RCS.',
      ],
      points: [],
      sources: ['edpb-consent', 'google-aup', 'mfl-law'],
    },
    {
      sectionId: 'gdpr',
      title: 'Vad kräver GDPR när du köper nummer?',
      paragraphs: [
        'Telefonnummer till privatpersoner är personuppgifter. Köper du dem blir ditt företag personuppgiftsansvarigt för din användning och behöver en rättslig grund för den, bestämd och dokumenterad innan du börjar.',
        'Eftersom uppgifterna inte kommer från personen själv gäller artikel 14. Du måste berätta vem du är, varför du använder numret, vilken rättslig grund du har och varifrån numret kommer. Ska numret användas för att kontakta personen ska informationen lämnas senast i den första kontakten. Personen har dessutom alltid rätt att invända mot direktmarknadsföring, och då måste utskicken till numret upphöra.',
        'GDPR och marknadsföringslagen gäller samtidigt. Även om du har en rättslig grund enligt GDPR för att behandla numret, krävs fortfarande samtycke enligt marknadsföringslagen för att skicka reklam till det.',
      ],
      points: [],
      sources: ['imy-legal-basis', 'gdpr-art14', 'imy-objection', 'mfl-law'],
    },
    {
      sectionId: 'andra-kanaler',
      title: 'Varför säljs då listor med telefonnummer?',
      paragraphs: [
        'Listor säljs främst för post och telefonförsäljning, där andra regler gäller än för elektronisk post. IMY har till exempel granskat ett företag som tillhandahöll personuppgifter till andra bolag just för telefonförsäljning och postal direktmarknadsföring. Att ett nummer får användas för ett samtal eller ett brev betyder inte att det får användas för ett SMS eller ett RCS-meddelande med reklam.',
        'Meddelanden som inte är reklam, som en leveransavisering eller en bokningsbekräftelse, omfattas inte av samtyckeskravet i 19 §. De förutsätter ändå att personen är din kund, och då har du redan numret från kunden själv.',
      ],
      points: [],
      sources: ['imy-bonnier-2023', 'mfl-law', 'use-cases'],
    },
    {
      sectionId: 'risker',
      title: 'Vad kan det kosta?',
      paragraphs: [
        'Konsumentombudsmannen kan begära att domstolen ålägger ett företag som bryter mot marknadsföringslagen att betala marknadsstörningsavgift. Avgiften är lägst 10 000 kronor och högst fyra procent av omsättningen året innan överträdelsen upphörde. Domstolarna har dömt ut avgifter i miljonklassen, till exempel fyra miljoner kronor i PMÖD 2020:13, även om det målet gällde en annan sorts marknadsföring.',
        'Till det kommer GDPR, där IMY kan ingripa mot behandling som saknar rättslig grund eller information, och Googles villkor. En RCS-avsändare som skickar utan samtycke bryter mot Googles regler för användning och riskerar att stängas av.',
      ],
      points: [],
      sources: ['mfl-avgift', 'pmod-2020-13', 'imy-legal-basis', 'google-aup'],
    },
    {
      sectionId: 'egen-lista',
      title: 'Så bygger du en lista du får använda',
      paragraphs: [
        'Den säkra vägen är att samla in numren själv, där kunden redan möter ditt företag: i kassan på webben, vid en bokning eller i butiken. Be om samtycket separat från köpet och spara hur det gavs. Det här bör finnas med:',
      ],
      points: [
        'En egen ruta för reklam via SMS och RCS som inte är ikryssad från början.',
        'Ditt företags namn och vad kunden får, till exempel erbjudanden ungefär en gång i månaden.',
        'Hur kunden säger nej, till exempel genom att svara STOP.',
        'En länk till integritetspolicyn.',
        'En logg med datum, tid, kanal och texten kunden godkände.',
        'En rutin som stoppar alla reklamutskick när någon säger nej.',
      ],
      sources: ['mfl-law', 'edpb-consent', 'google-aup', 'imy-objection', 'launch-approval'],
    },
  ],
}

const B2B: Article = {
  title: 'Får du skicka RCS-reklam till företag?',
  slug: 'rcs-reklam-till-foretag',
  category: 'Företag',
  published: '2026-11-28',
  author: 'Olov Elofsson',
  description:
    'Reglerna för reklam via SMS och RCS skiljer sig beroende på vem som tar emot den. Till ett aktiebolag krävs inget samtycke enligt marknadsföringslagen, men till en enskild firma gäller samma krav som till en privatperson. Här reder vi ut vad som gäller för aktiebolag, enskilda firmor och anställda.',
  keywords: [
    'b2b sms reklam',
    'sms reklam till företag',
    'rcs reklam företag',
    'samtycke enskild firma reklam',
    'e-post reklam till företag lag',
    'marknadsföringslagen 20 §',
    'reklam till anställda mobilnummer',
  ],
  sections: [
    {
      sectionId: 'kort-svar',
      title: '',
      paragraphs: [
        'Samtyckeskravet i 19 § marknadsföringslagen gäller marknadsföring till fysiska personer. Ett aktiebolag, en förening eller en myndighet är juridiska personer, och till dem får du skicka reklam via SMS och RCS utan samtycke i förväg. Varje reklammeddelande måste ändå innehålla en giltig adress dit mottagaren kan begära att utskicken upphör, enligt 20 §.',
        'Genomgången ger en översikt och ersätter inte juridisk rådgivning.',
      ],
      points: [],
      sources: ['mfl-law', 'ny-juridik-elektronisk-post'],
    },
    {
      sectionId: 'enskild-firma',
      title: 'Enskild firma räknas som privatperson',
      paragraphs: [
        'Den som driver enskild firma är en fysisk person. Enligt förarbetena till lagen omfattas en enskild näringsidkare därför av samtyckeskravet, på samma sätt som en konsument. En lista med "företagsnummer" kan därför innehålla nummer som du inte får skicka reklam till utan samtycke.',
        'Kontrollera bolagsformen innan ett utskick till företag. Går det inte att skilja ut de enskilda firmorna, hantera hela listan som om den gällde privatpersoner.',
      ],
      points: [],
      sources: ['ny-juridik-elektronisk-post', 'mfl-law'],
    },
    {
      sectionId: 'anstallda',
      title: 'Nummer till anställda',
      paragraphs: [
        'Ett mobilnummer till en namngiven anställd är en personuppgift, även när numret betalas av arbetsgivaren. Då gäller GDPR. Du behöver en rättslig grund för att använda numret, till exempel berättigat intresse efter en dokumenterad intresseavvägning, och personen har rätt att få information och att invända mot direktmarknadsföring.',
        'Håll därför reklamen relevant för personens roll, berätta varifrån du har numret, och sluta skicka när någon säger nej.',
      ],
      points: [],
      sources: ['imy-legal-basis', 'gdpr-art14', 'imy-objection'],
    },
    {
      sectionId: 'google',
      title: 'Googles regler gäller alla mottagare',
      paragraphs: [
        'För RCS kommer Googles villkor ovanpå lagen, och de skiljer inte på privatpersoner och företag. En avsändare ska ha ett uttryckligt och informerat samtycke innan den söker upp en användare, och den ska följa avregistreringar. Även om lagen tillåter reklam till ett aktiebolag utan samtycke, kräver Google alltså ett ja från mottagaren innan ett RCS-meddelande med reklam skickas.',
      ],
      points: [],
      sources: ['google-aup', 'launch-approval'],
    },
    {
      sectionId: 'checklista',
      title: 'Innan du skickar till företag',
      paragraphs: ['Gå igenom listan innan första utskicket:'],
      points: [
        'Vilka mottagare är aktiebolag, och vilka är enskilda firmor?',
        'Vilka nummer går till namngivna personer, och vilken rättslig grund har du för dem?',
        'Har mottagarna sagt ja, som Googles regler kräver för RCS?',
        'Finns en giltig adress för att stoppa utskicken i varje meddelande?',
        'Slår ett nej igenom i alla system som skickar reklam?',
      ],
      sources: ['mfl-law', 'ny-juridik-elektronisk-post', 'imy-legal-basis', 'google-aup', 'imy-objection'],
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
  for (const article of [BOUGHT_LISTS, B2B]) {
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
    if (!sections.length) continue
    toCreate.push({ ...article, keywords: article.keywords.map((keyword) => ({ keyword })), sections })
  }

  // Only the last article rebuilds the site, so it is built once with both in place.
  for (const [index, data] of toCreate.entries()) {
    await payload.create({ collection: 'artiklar', req, context: index === toCreate.length - 1 ? {} : quiet, data: data as never })
  }
  payload.logger.info(`Migration: ${toCreate.length} legal articles created.`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: remove the articles in the CMS if they are ever not wanted.
}
