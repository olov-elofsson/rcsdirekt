import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { fingerprint } from './20261125_110000_clearer_articles'

// Content change: the visible blog articles become thorough guides, with new sections built on
// Google's RCS for Business documentation, Apple's and the operators' support pages, IMY, the
// Marketing Act and the site's own price list. New sources are created once (looked up by
// sourceId). An article changes only while its section text still hashes to the fingerprint of the
// text this rewrite started from, so later edits in the CMS are never overwritten; its sections
// are then replaced in the order below, keeping the row of any section with the same sectionId.
type Section = { id: string; title: string; paragraphs: string[]; points: string[]; sources: string[] }
type Rewrite = { fingerprint: string; description: string; sections: Section[] }

const SOURCES = [
  {
    "sourceId": "billing-faq",
    "title": "Google RCS for Business: Billing FAQ",
    "url": "https://developers.google.com/business-communications/rcs-business-messaging/guides/learn/rbm-billing-faq",
    "finding": "Google slog den 20 november 2025 ihop debiteringskategorierna Basic Message och Single Message till kategorin Non-conversational. Händelserna basic_message (text upp till 160 tecken) och single_message (rikt innehåll eller längre text) finns kvar, och en konversation omfattar alla meddelanden inom 24 timmar.",
    "implication": "Kategorin gäller avsändaren och händelserna gäller varje meddelande. Därför kan en prislista fortfarande ha tre nivåer. Operatörerna bestämmer om och hur kundens svar debiteras."
  },
  {
    "sourceId": "use-cases",
    "title": "Google RCS for Business: Agent use cases",
    "url": "https://developers.google.com/business-communications/rcs-business-messaging/guides/learn/agent-use-cases",
    "finding": "Google delar in avsändare i fyra användningsfall: engångskoder (OTP), transaktioner, marknadsföring och blandad användning. Varje användningsfall har regler för vad som får skickas.",
    "implication": "Användningsfallet väljs när avsändaren skapas och går inte att ändra efter att den skickats in för lansering. Välj det som motsvarar de meddelanden ni faktiskt ska skicka."
  },
  {
    "sourceId": "launch-approval",
    "title": "Google RCS for Business: Launch approval",
    "url": "https://developers.google.com/business-communications/rcs-business-messaging/guides/launch/launch-approval",
    "finding": "Före lansering krävs bland annat fullständiga avsändaruppgifter, länkar till integritetspolicy och villkor, ett fungerande sätt att avregistrera sig och en beskrivning av vad som utlöser meddelandena. En lansering som Google hanterar tar 1 till 3 arbetsdagar om villkoren är uppfyllda.",
    "implication": "Godkännandet gäller per operatör. Operatörer som själva hanterar lanseringen kan ha egna krav, till exempel ett direkt avtal."
  },
  {
    "sourceId": "agent-info",
    "title": "Google RCS for Business: Edit agent information",
    "url": "https://developers.google.com/business-communications/rcs-business-messaging/guides/build/agents/edit-agent-information",
    "finding": "Avsändarens profil har visningsnamn, beskrivning, färg, logotyp på 224 × 224 pixlar, bannerbild på 1440 × 448 pixlar, kontaktuppgifter och länkar till integritetspolicy och villkor. Logotypen visas som en rundad kvadrat i Google Meddelanden.",
    "implication": "Profilen är det kunden ser när hen vill kontrollera vem som skriver. Håll uppgifterna aktuella och samma som på er webbplats."
  },
  {
    "sourceId": "bandwidth-sms",
    "title": "Bandwidth: SMS character limits and concatenation",
    "url": "https://www.bandwidth.com/support/en/articles/12823182",
    "finding": "Leverantören Bandwidth anger att ett SMS-segment rymmer 160 tecken med GSM-7 och 70 tecken med UCS-2, som används till exempel när texten har emojier. Långa meddelanden delas upp i segment om 153 respektive 67 tecken, och varje segment debiteras.",
    "implication": "Uppgiften gäller Bandwidths tjänst men beskriver hur SMS-segment brukar räknas. Fråga er egen leverantör hur den räknar och debiterar långa SMS."
  },
  {
    "sourceId": "imy-legal-basis",
    "title": "IMY: Rättslig grund",
    "url": "https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/rattslig-grund/",
    "finding": "IMY anger sex rättsliga grunder och att privata företag främst kan använda samtycke, avtal, rättslig förpliktelse och intresseavvägning. Den rättsliga grunden ska vara bestämd innan uppgifterna samlas in, och valet ska dokumenteras.",
    "implication": "Varje flöde med telefonnummer behöver en egen bedömning. Samma nummer kan ha olika rättslig grund i en bokning och i ett kampanjutskick."
  },
  {
    "sourceId": "imy-principles",
    "title": "IMY: Grundläggande principer",
    "url": "https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/grundlaggande-principer/",
    "finding": "IMY beskriver principerna om bland annat ändamålsbegränsning, uppgiftsminimering och lagringsminimering. Personuppgifter får bara sparas så länge de behövs för ändamålet.",
    "implication": "Leveranskvitton, svar och telefonnummer ska ha ett angivet ändamål och en gallringsrutin, även när tekniken gör det enkelt att spara allt."
  },
  {
    "sourceId": "mfl-law",
    "title": "Riksdagen: Marknadsföringslag (2008:486)",
    "url": "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/marknadsforingslag-2008486_sfs-2008-486/",
    "finding": "Enligt 19 § får ett företag använda elektronisk post vid marknadsföring till en fysisk person bara om personen har samtyckt i förväg. Undantaget för befintliga kunder kräver att tre villkor är uppfyllda. Lagen definierar elektronisk post som ett individuellt elektroniskt meddelande i form av text, röst, ljud eller bild som kan lagras tills mottagaren hämtar det.",
    "implication": "Lagen nämner inte RCS vid namn. Låt en jurist bedöma ert upplägg om ni är osäkra på hur reglerna gäller ett visst utskick."
  },
  {
    "sourceId": "rcsdirekt-prices",
    "title": "rcsdirekt.se: Priser för RCS i Sverige",
    "url": "https://rcsdirekt.se/priser",
    "finding": "Prislistan anger listpris i SEK exklusive moms per meddelandetyp och mottagarens nät, till exempel Basic från 0,316 SEK, Single från 0,462 SEK och Conversation från 0,641 SEK. Ett tomt fält betyder att nätet inte tar emot den typen av meddelande.",
    "implication": "Priset för ett utskick beror på vilka nät mottagarna har. Kontrollera prislistan när du räknar, eftersom den ändras när leverantörens prislista ändras."
  }
]

const ARTICLES: Record<string, Rewrite> = {
  "vad-ar-rcs": {
    "fingerprint": "22dc38a25ceb48adc934f457dfffbecc487bcf2a7a2586457a0f0b6764dea917",
    "description": "RCS är en meddelandestandard som låter dig skicka text, bilder och filer via internet i telefonens vanliga meddelandeapp. Namnet står för Rich Communication Services, och du behöver ingen särskild app för att använda det.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "RCS står för Rich Communication Services, en standard för meddelanden som går över wifi eller mobildata. Den gemensamma tekniska grunden heter Universal Profile och tas fram av GSMA, mobiloperatörernas branschorganisation. Tele2 och Comviq beskriver RCS som en modernare variant av SMS och MMS.",
          "RCS-funktionerna används bara när alla i samtalet har RCS påslaget. Samma app kan fortfarande skicka SMS och MMS, så alla meddelanden i den går inte nödvändigtvis som RCS. Ett exempel: ett foto till en vän med RCS påslaget visar när hon har läst det, medan samma foto till någon utan stöd går som MMS och utan läskvitto.",
          "Företag kan använda en registrerad avsändare med namn och logotyp och skicka bilder eller svarsknappar. Den tjänsten har egna krav på registrering och räckvidd. Ett privat RCS-samtal och ett företagsutskick behöver därför bedömas var för sig."
        ],
        "points": [],
        "sources": [
          "gsma",
          "chat",
          "tele2-rcs",
          "comviq-rcs",
          "business"
        ]
      },
      {
        "id": "funktioner",
        "title": "Vad kan du göra med RCS?",
        "paragraphs": [
          "Google, Apple, Tele2 och Comviq beskriver ungefär samma funktioner. Skillnaden mot SMS märks mest när du skickar bilder eller vill veta om den andra har läst."
        ],
        "points": [
          "Se när den andra personen skriver.",
          "Få leveranskvitton och läskvitton. Läskvitton visar också den andra när du har läst.",
          "Dela foton och videor i högre upplösning än med MMS.",
          "Namnge gruppchattar och lägga till eller ta bort deltagare.",
          "Chatta mellan iPhone och Android när båda har RCS påslaget."
        ],
        "sources": [
          "chat",
          "apple",
          "tele2-rcs"
        ]
      },
      {
        "id": "app",
        "title": "Behöver du en särskild app?",
        "paragraphs": [
          "Nej. På Android används Google Meddelanden, och Tele2 och Comviq anger att det fungerar från Android 5.0. Enligt Google kan även andra appar som följer standarden, till exempel Samsung Messages och Meddelanden på iPhone, ansluta till RCS. På iPhone krävs iOS 18 eller senare, och från iOS 26 kan du välja vilken app som ska hantera SMS, MMS och RCS.",
          "Operatören måste också ha öppnat för RCS på ditt abonnemang. Finns inte inställningen i appen kan det bero på operatören eller på att telefonen behöver en nyare systemversion. Apple skriver att det kan dröja några timmar efter att du har slagit på RCS innan det fungerar."
        ],
        "points": [],
        "sources": [
          "apple",
          "apple-channels",
          "security",
          "tele2-rcs",
          "comviq-rcs"
        ]
      },
      {
        "id": "kanal",
        "title": "Hur ser du att ett meddelande går som RCS?",
        "paragraphs": [
          "Titta i skrivfältet. När du skriver till någon med RCS står det RCS-meddelande där, och annars står det till exempel Textmeddelande (SMS). På iPhone visas både RCS och SMS i gröna bubblor, så färgen säger inget om kanalen. Blå bubblor är iMessage, Apples egen tjänst mellan Apple-enheter.",
          "I Google Meddelanden visar små ikoner vid meddelandet om det skickas, har skickats, har levererats eller har lästs. Ikonerna visas inte för SMS och MMS. Saknar mottagaren RCS, eller har du ingen dataanslutning, kan appen skicka meddelandet som SMS eller MMS i stället, om den inställningen är påslagen."
        ],
        "points": [],
        "sources": [
          "chat",
          "security",
          "tele2-rcs",
          "apple-channels"
        ]
      },
      {
        "id": "kostnad",
        "title": "Kostar RCS något extra?",
        "paragraphs": [
          "RCS använder din datatrafik. Enligt Google kostar det inget extra så länge du är ansluten till ett wifi som du inte betalar för, och över mobildata följer kostnaden ditt abonnemang. Tele2 skriver att RCS ingår i abonnemanget, medan Apple påpekar att operatörsavgifter kan tillkomma. Fråga din operatör om du är osäker."
        ],
        "points": [],
        "sources": [
          "chat",
          "tele2-rcs",
          "apple"
        ]
      },
      {
        "id": "kryptering",
        "title": "Är RCS krypterat?",
        "paragraphs": [
          "Det beror på vilka appar och operatörer som är inblandade. Google anger att RCS-chattar mellan användare av Google Meddelanden är end-to-end-krypterade som standard. När Google tillhandahåller RCS-tjänsten skyddas meddelandena annars med TLS på vägen mellan telefonen och Google. När vi läste Googles hjälpsida i november 2026 stod det att RCS-chattar med iPhone-användare inte har end-to-end-kryptering.",
          "Apple har infört end-to-end-krypterad RCS som betaversion i iOS 26.5, hos operatörer som stöder det. Krypteringen gäller bara när alla deltagares operatörer stöder den, och ett krypterat samtal har en låssymbol högst upp. Ser du inget lås ska du utgå från att meddelandet inte är skyddat på det sättet. Företagsmeddelanden via RCS är enligt Google inte end-to-end-krypterade."
        ],
        "points": [],
        "sources": [
          "security",
          "chat",
          "apple",
          "apple-channels",
          "business"
        ]
      },
      {
        "id": "fordjupning",
        "title": "Vad är RCS för företag?",
        "paragraphs": [
          "Ett företag kan skicka RCS från en registrerad avsändare. I Google Meddelanden visas företagets namn och logotyp högst upp i samtalet i stället för ett telefonnummer, och en verifierad avsändare har en bock efter namnet. Meddelandet kan innehålla bilder, kort som går att svepa mellan och knappar för till exempel att ringa eller öppna en webbsida.",
          "Du som mottagare kan blockera ett företag och rapportera det som spam. Google Meddelanden har i flera länder också ett val för att säga upp prenumerationen på oviktiga meddelanden, och på iPhone kan du stänga av RCS-meddelanden från företag under Inställningar, Appar, Meddelanden och RCS-meddelanden. Ett företag kan aldrig vara med i en gruppchatt, så en gruppinbjudan som påstår sig komma från ett företag är enligt Google troligen ett bedrägeriförsök."
        ],
        "points": [],
        "sources": [
          "agent",
          "business",
          "apple",
          "capabilities",
          "practice"
        ]
      },
      {
        "id": "kom-igang",
        "title": "Så slår du på RCS",
        "paragraphs": [
          "Inställningen ligger på lite olika ställen beroende på telefon. Båda i samtalet behöver ha RCS påslaget och en fungerande internetanslutning."
        ],
        "points": [
          "iPhone: öppna Inställningar, tryck på Appar och Meddelanden och slå på RCS-meddelanden.",
          "Android: öppna Google Meddelanden, tryck på profilbilden, välj Inställningar för Meddelanden och RCS-chattar och slå på Aktivera RCS-chattar.",
          "Står det Ansluten under RCS-chattar på Android är tjänsten klar att använda.",
          "Saknas valet helt, kontrollera systemuppdateringar och fråga sedan operatören om just ditt abonnemang."
        ],
        "sources": [
          "apple",
          "chat",
          "tele2-rcs"
        ]
      }
    ]
  },
  "rcs-vs-sms": {
    "fingerprint": "93e04c1abea950d3875ffa2d3fd5d34597567fe6756b98931613fcccbf6ca840",
    "description": "SMS är textmeddelanden som skickas via mobilnätet, och MMS kan även innehålla bilder. RCS går över wifi eller mobildata och kan ge bättre mediedelning, läskvitton och företagsmeddelanden med bilder och knappar.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Alla tre kan visas i samma app, utan någon ny inkorg. SMS och MMS är operatörstjänster som fungerar även när RCS saknas, medan RCS kräver att både du och mottagaren har tjänsten påslagen och en internetanslutning. Skillnaden märks först när du skickar något annat än kort text, eller när du vill veta om meddelandet har kommit fram och lästs.",
          "Ett företag som vill skicka SMS när RCS inte fungerar behöver en reservlösning, ofta kallad fallback. Den ska vara bekräftad med leverantören, och SMS-versionen behöver en egen text eftersom bilder och knappar inte följer med."
        ],
        "points": [],
        "sources": [
          "apple-channels",
          "tele2-rcs",
          "chat",
          "send"
        ]
      },
      {
        "id": "tecken",
        "title": "Hur mycket text får plats?",
        "paragraphs": [
          "Ett SMS-segment rymmer 160 tecken med teckenuppsättningen GSM-7. Innehåller texten tecken utanför den, till exempel emojier, används UCS-2 och då ryms 70 tecken. Längre meddelanden delas upp i flera segment som telefonen sätter ihop, och enligt leverantören Bandwidth debiteras varje segment för sig.",
          "RCS räknar annorlunda. Google kallar ett textmeddelande på högst 160 tecken för Basic Message och räknar tecknen som byte i UTF-8, där en emoji kan ta 2 till 4 tecken. Texten i ett enskilt RCS-meddelande får vara upp till 3 072 tecken, och längre text än 160 tecken räknas som ett rikare meddelande när det debiteras."
        ],
        "points": [],
        "sources": [
          "bandwidth-sms",
          "send",
          "billing-faq"
        ]
      },
      {
        "id": "innehall",
        "title": "Vad kan ett RCS-meddelande innehålla som ett SMS inte kan?",
        "paragraphs": [
          "Med MMS kan du skicka bilder, video och länkar. Ett RCS-meddelande från ett företag kan dessutom ha ett kort med bild, rubrik på upp till 200 tecken och beskrivning på upp till 2 000 tecken, eller en karusell med upp till tio sådana kort. Varje kort kan ha upp till fyra knappar, och varje knapptext får vara högst 25 tecken.",
          "Knapparna är antingen föreslagna svar, som skickar ett färdigt svar till företaget, eller föreslagna åtgärder, som använder telefonens egna funktioner. Google listar dessa åtgärder:"
        ],
        "points": [
          "Ringa ett nummer.",
          "Visa en plats på en karta.",
          "Dela sin plats.",
          "Öppna en webbadress.",
          "Skapa en kalenderhändelse."
        ],
        "sources": [
          "apple-channels",
          "cards",
          "send"
        ]
      },
      {
        "id": "kvitton",
        "title": "Hur vet du att meddelandet har kommit fram?",
        "paragraphs": [
          "I RCS skickar mottagarens telefon händelser tillbaka till avsändaren. Google skiljer på levererat, läst och att mottagaren skriver. I privata chattar visar Google Meddelanden samma steg med ikoner vid meddelandet, och de ikonerna visas inte för SMS och MMS.",
          "Läskvitton går att stänga av, så ett meddelande utan läskvitto kan ändå ha blivit läst. Räkna därför leverans och läsning som olika signaler. Ingen av dem visar att kunden förstått eller gjort något."
        ],
        "points": [],
        "sources": [
          "events",
          "chat",
          "business"
        ]
      },
      {
        "id": "reserv",
        "title": "Vad händer om mottagaren saknar RCS?",
        "paragraphs": [
          "Har mottagarens telefon inte RCS, eller har avsändaren inte lanserats hos mottagarens operatör, svarar Googles plattform med felet 404 NOT_FOUND. Då kan företagets system skicka ett SMS i stället. Google rekommenderar att systemet först kontrollerar att RCS-meddelandet inte har levererats och försöker dra tillbaka det, så att kunden inte får samma besked två gånger.",
          "Alla nät tar inte emot RCS från företag. I rcsdirekt.se:s prislista har flera mindre nät bara ett SMS-pris, vilket betyder att de inte tar emot RCS-typerna. För privata chattar har Google Meddelanden en inställning som skickar om meddelandet som SMS eller MMS när RCS inte går fram."
        ],
        "points": [],
        "sources": [
          "send",
          "practice",
          "capabilities",
          "rcsdirekt-prices",
          "chat"
        ]
      },
      {
        "id": "avsandare",
        "title": "Ser kunden vem som skickar?",
        "paragraphs": [
          "Enligt Google visar ett SMS ingen verifiering av avsändaren för mottagaren. Ett RCS-meddelande från en registrerad avsändare visar företagets namn och logotyp, och en verifierad avsändare har en bock efter namnet. SMS och MMS är inte end-to-end-krypterade, och enligt Google är inte heller företagsmeddelanden via RCS det."
        ],
        "points": [],
        "sources": [
          "business",
          "apple-channels",
          "verification"
        ]
      },
      {
        "id": "fordjupning",
        "title": "Välj kanal efter uppgiften",
        "paragraphs": [
          "Ett kort besked utan bild eller svarsalternativ, som att paketet har kommit till ombudet, kan fungera bra som SMS. RCS blir mer intressant när kunden behöver se något eller göra ett tydligt val direkt i meddelandet, till exempel i ett kort med bild och knappar eller en karusell med flera kort.",
          "Jämför därför samma uppgift i båda kanalerna. Säg att en klädbutik visar tre jackor i en RCS-karusell. SMS-versionen kan då länka till en sida där samma jackor går att jämföra, i stället för att försöka återge karusellen i text. Några frågor att gå igenom för varje utskick:"
        ],
        "points": [
          "Behöver kunden se en bild för att förstå meddelandet?",
          "Finns det ett val som kunden kan göra direkt med en knapp?",
          "Hur ser texten ut som SMS, och ryms den i ett segment?",
          "Vad ska hända om RCS inte når fram inom den tid beskedet är aktuellt?"
        ],
        "sources": [
          "cards",
          "practice",
          "send"
        ]
      }
    ]
  },
  "rcs-for-foretag": {
    "fingerprint": "25be13280a4138ecff53e2d5c800e97427aefd43aa6991e4ccd5616507bd6a89",
    "description": "RCS för företag låter en registrerad avsändare skicka meddelanden med företagsprofil, bilder och valbara svar i kundens vanliga meddelandeapp. Det kallas ofta RCS Business Messaging, eller RBM.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "I Googles modell kallas avsändaren en agent. Den har ett visningsnamn, logotyp, beskrivning, kontaktuppgifter och webbadresser som kunden ser i meddelandeappen. Ordet agent kan låta som en chattbot, men agenten är bara den registrerade avsändaren, och vad den gör styrs av företagets egna system.",
          "En webbutik kan låta ordersystemet skicka ett leveransbesked med en spårningsknapp. Ett webbgränssnitt passar i stället när en person vill skapa ett utskick för hand. RCS är kanalen, medan orderstatusen och hanteringen av kundsvar finns i företagets egna system, dit svar och händelser skickas via en webhook."
        ],
        "points": [],
        "sources": [
          "agent",
          "agent-info",
          "webhooks"
        ]
      },
      {
        "id": "innehall",
        "title": "Vad kan ett företagsmeddelande innehålla?",
        "paragraphs": [
          "Ett och samma meddelande kan innehålla text, ett kort med bild eller video, en karusell med upp till tio kort och knappar för svar eller åtgärder. En fil får vara högst 100 MiB. Google rekommenderar att kortets viktigaste knapp ligger först, eftersom Google Meddelanden visar det första förslaget direkt i aviseringen på Android.",
          "Alla funktioner fungerar inte överallt. Google anger till exempel att knappar som ligger kvar inne i meddelandebubblan inte stöds på iPhone eller i Samsung Messages. Gör därför en kapabilitetskontroll, som visar vilka funktioner ett visst nummer stöder, och prova meddelandet på de telefoner kunderna använder."
        ],
        "points": [],
        "sources": [
          "send",
          "cards",
          "capabilities"
        ]
      },
      {
        "id": "anvandningsfall",
        "title": "Vilka typer av utskick finns?",
        "paragraphs": [
          "När avsändaren skapas väljer företaget ett av Googles fyra användningsfall. Det styr vilka regler som gäller och går inte att ändra efter att avsändaren har skickats in för lansering."
        ],
        "points": [
          "Engångskoder (OTP): koder för inloggning eller för att godkänna en betalning. Får inte innehålla erbjudanden.",
          "Transaktioner: besked om något kunden redan har, som orderbekräftelser, leveransbesked och bokningsändringar. Får inte innehålla erbjudanden.",
          "Marknadsföring: erbjudanden, rabatter och påminnelser om en påbörjad varukorg.",
          "Blandad användning: samtal där transaktioner och marknadsföring hör ihop, till exempel ett boardingkort följt av ett erbjudande om bättre plats."
        ],
        "sources": [
          "use-cases",
          "agent",
          "send"
        ]
      },
      {
        "id": "lansering",
        "title": "Hur går det till att börja skicka?",
        "paragraphs": [
          "Först bekräftar en behörig person hos varumärket avsändarens uppgifter och att partnern, alltså företaget som sköter avsändaren tekniskt, får hantera den. Sedan granskas avsändaren av Google, av operatörerna eller av båda. Vissa operatörer hanterar lanseringen själva och kan kräva ett direkt avtal, och för att lansera hos de operatörer som Google hanterar behöver avsändaren först vara lanserad hos minst en operatör i samma land som sköter det själv.",
          "Enligt Google tar en lansering som Google hanterar 1 till 3 arbetsdagar, om varumärket godkänner inom 24 timmar och underlaget är komplett. Det här behöver vara klart innan:"
        ],
        "points": [
          "Visningsnamn, logotyp, beskrivning och minst en kontaktväg.",
          "En fungerande webbplats och länkar till integritetspolicy och villkor.",
          "En fungerande avregistrering, till exempel när kunden skriver STOP.",
          "En beskrivning av vad som utlöser första meddelandet och hur samtalet går, som text eller video."
        ],
        "sources": [
          "verification",
          "launch-approval",
          "agent-info"
        ]
      },
      {
        "id": "teknik",
        "title": "Hur hänger tekniken ihop?",
        "paragraphs": [
          "Företagets system skickar meddelanden via ett API och får tillbaka händelser och kundsvar via en webhook. Är kundens telefon avstängd tar plattformen ändå emot meddelandet och försöker leverera det i upp till 30 dagar. För tidskänsliga besked kan systemet ange en giltighetstid, så att ett inaktuellt meddelande dras tillbaka och kan ersättas av ett SMS.",
          "Det går att kontrollera i förväg om ett visst nummer kan ta emot RCS från avsändaren. Saknar kunden RCS, eller är avsändaren inte lanserad hos kundens operatör, svarar plattformen med ett fel och företaget kan välja en annan kanal."
        ],
        "points": [],
        "sources": [
          "send",
          "webhooks",
          "events",
          "capabilities"
        ]
      },
      {
        "id": "mottagaren",
        "title": "Vad kan kunden göra?",
        "paragraphs": [
          "Kunden kan svara med fri text, en bild eller sin plats även om meddelandet bara hade knappar, och kan blockera avsändaren och rapportera den som spam. Google Meddelanden har i flera länder ett val för att säga upp prenumerationen på oviktiga meddelanden, som kampanjer, medan engångskoder och besked om tjänster kunden själv har begärt får fortsätta. Sverige fanns inte med i Googles lista över de länderna i november 2026. På iPhone kan kunden stänga av RCS-meddelanden från företag i inställningarna.",
          "Registreringen ger ingen rätt att marknadsföra till vem som helst. Svenska regler om samtycke och personuppgifter gäller som vanligt, och ett nej från kunden måste stoppa utskicken i de egna systemen."
        ],
        "points": [],
        "sources": [
          "receive",
          "business",
          "events",
          "apple",
          "practice"
        ]
      },
      {
        "id": "fordjupning",
        "title": "Kanalen behöver ett sammanhang",
        "paragraphs": [
          "Ett företagsmeddelande är användbart när det hör ihop med något kunden redan förstår: en beställning, en bokning eller en fråga. Google rekommenderar relevanta meddelanden och tydliga val, men det är vägledning och inga uppmätta resultat, så effekten behöver du följa själv.",
          "Planera även vem som äger nästa steg. Säg att en möbelbutik skickar ett leveransbesked med en knapp för att ändra leveransdag. Svaret ska då nå leveranshanteringen och inte fastna i en separat inkorg, och om kunden skriver en fråga i stället för att trycka på knappen behöver någon kunna svara."
        ],
        "points": [],
        "sources": [
          "practice",
          "receive",
          "webhooks"
        ]
      }
    ]
  },
  "verifierad-avsandare": {
    "fingerprint": "27b8a11c2ad6f00e3f6883a2c86dd158edca2ae43824a1e707934b7e6a6793f3",
    "description": "Verifieringen kontrollerar att RCS-avsändaren hör ihop med varumärket den företräder. I Google Meddelanden ser kunden då företagets namn, logotyp och en verifieringsmarkering.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "I Googles process bekräftar en behörig representant för varumärket avsändarens uppgifter och att partnern, alltså företaget som sköter avsändaren tekniskt, får hantera den. Verifieringen är ett krav före lansering. När avsändaren är verifierad och lanserad visar Google Meddelanden automatiskt en bock efter namnet.",
          "Enligt Googles hjälpsida för användare betyder bocken att Google, mobiloperatören eller en tredjepartsleverantör har bekräftat företagets identitet. I företagets profil står det dessutom Verifierad, och Google anger att profilen också visar vem som har gjort verifieringen."
        ],
        "points": [],
        "sources": [
          "verification",
          "business"
        ]
      },
      {
        "id": "underlag",
        "title": "Vad behöver företaget lämna in?",
        "paragraphs": [
          "Uppgifterna lämnas en gång per avsändare, oavsett hur många operatörer den ska lanseras hos. De kan ändras fram till att lanseringen begärs, men inte efter det. Fråga din partner vilka underlag som behövs och vilka marknader godkännandet gäller."
        ],
        "points": [
          "Kontaktuppgifter till en anställd hos varumärket som har rätt att godkänna uppgifterna. Google vill ha en personlig e-postadress och ingen gruppadress.",
          "Frivilliga underlag, till exempel en fullmakt, som pdf. Högst fem filer på upp till 50 MB vardera.",
          "En verifieringstoken från en godkänd verifieringsinstans. Den är frivillig i alla länder i dag, men Google skriver att vissa operatörer kommer att kräva den."
        ],
        "sources": [
          "verification",
          "launch-approval"
        ]
      },
      {
        "id": "tid",
        "title": "Hur lång tid tar det, och vem hör av sig?",
        "paragraphs": [
          "Verifieringen görs efter att lanseringen har begärts. Hos operatörer där Google sköter lanseringen kontaktas varumärket en gång, och sedan räknas avsändaren som verifierad för alla sådana lanseringar. Operatörer som sköter lanseringen själva kan kontakta varumärket var för sig.",
          "Google anger 1 till 3 arbetsdagar för en lansering som Google hanterar, om varumärket svarar inom 24 timmar och webbplats, integritetspolicy och villkor är på plats. Det lönar sig därför att meddela kontaktpersonen i förväg att ett mejl kommer."
        ],
        "points": [],
        "sources": [
          "verification",
          "launch-approval"
        ]
      },
      {
        "id": "profil",
        "title": "Vad ser kunden?",
        "paragraphs": [
          "I samtalets rubrik visas företagets namn och logotyp i stället för ett telefonnummer, och i profilen finns beskrivning, kontaktuppgifter och länkar till integritetspolicy och villkor. Google skriver att verifieringsbocken är skyddad mot efterapning och inte kan läggas till för hand.",
          "Logotypen ska vara 224 × 224 pixlar och visas som en rundad kvadrat i Google Meddelanden. Bannerbilden är 1440 × 448 pixlar, och profilens färg ska ha minst kontrasten 4,5:1 mot vitt. Enligt leverantören Bandwidth ska alla logotyper vara uppdaterade till det nya formatet senast den 1 juni 2027, en ny logotyp kan ta upp till sju dagar att synas, och bytet kan kräva nya godkännanden och avgifter."
        ],
        "points": [],
        "sources": [
          "business",
          "agent-info",
          "practice",
          "google-messages-logo-2026"
        ]
      },
      {
        "id": "andringar",
        "title": "Vad går inte att ändra i efterhand?",
        "paragraphs": [
          "En del val låses när avsändaren skapas eller skickas in för lansering, så det lönar sig att bestämma dem tidigt. Enligt Google gäller det här:"
        ],
        "points": [
          "Verifieringsuppgifterna kan inte ändras efter att lanseringen har begärts.",
          "Användningsfallet, till exempel transaktioner eller marknadsföring, kan inte ändras efter att avsändaren skickats in för lansering.",
          "Regionen där avsändaren lagrar sina data kan inte ändras efter att den skapats.",
          "En avsändare kan inte raderas.",
          "En ny logotyp går igenom samma godkännande som tidigare och kan enligt Bandwidth ta upp till sju dagar att synas."
        ],
        "sources": [
          "agent",
          "verification",
          "use-cases",
          "google-messages-logo-2026"
        ]
      },
      {
        "id": "andra-appar",
        "title": "Ser profilen likadan ut i alla appar?",
        "paragraphs": [
          "Inte helt. Google skriver att extra kontaktuppgifter och egna etiketter, som Kundtjänst i stället för Telefon, bara visas i Google Meddelanden. Andra appar visar bara den primära telefonen, webbplatsen och e-postadressen, ibland med en standardetikett. Lägg därför de viktigaste kontaktvägarna i de primära fälten. Google kräver minst en av dem för att avsändaren ska kunna lanseras och rekommenderar alla tre."
        ],
        "points": [],
        "sources": [
          "agent-info"
        ]
      },
      {
        "id": "begransningar",
        "title": "Vad säger märkningen inget om?",
        "paragraphs": [
          "Bocken hjälper kunden att känna igen företaget. Den intygar inte att varje erbjudande eller länk är bra, och den säger inget om kryptering. Google skriver att verifierade RCS-chattar mellan företag och användare inte är end-to-end-krypterade, och att företag, meddelandeleverantörer och ibland operatörer kan komma åt innehållet för leverans och andra ändamål.",
          "En oväntad begäran om betalning eller känsliga uppgifter bör kunden fortfarande kontrollera på annat sätt. Google påpekar också att ett företag aldrig kan vara med i en gruppchatt, så en gruppinbjudan som påstår sig komma från ett företag är troligen ett bedrägeriförsök."
        ],
        "points": [],
        "sources": [
          "business",
          "verification",
          "security"
        ]
      },
      {
        "id": "fordjupning",
        "title": "Igenkänning utan falsk trygghet",
        "paragraphs": [
          "Profilens namn bör vara det kunden känner igen från köpet. Säg att kunden har handlat i en butik som heter något annat än koncernen som äger den. Då kan koncernnamnet skapa osäkerhet även när det är korrekt registrerat.",
          "Kunden ska också kunna kontrollera avsändaren genom en oberoende kontaktväg, till exempel numret på er webbplats, särskilt när meddelandet gäller pengar eller kontouppgifter. Några saker att stämma av med partnern:"
        ],
        "points": [
          "Visningsnamnet är samma som kunden ser i butiken eller på webbplatsen.",
          "Logotypen har marginal runt motivet och syns i både ljust och mörkt läge.",
          "Länkar i meddelandena går till domäner som också står i profilen.",
          "Det finns en rutin för att uppdatera profilen när varumärket ändras."
        ],
        "sources": [
          "agent-info",
          "practice",
          "google-messages-logo-2026"
        ]
      }
    ]
  },
  "rcs-api-webhooks": {
    "fingerprint": "a36e049bd541a850d9396b6007179f9759569638821d60e0efe06758bd0233fa",
    "description": "Med ett RCS API kan dina system begära ett utskick, och via webhooks får de senare veta vad som hände: leverans, läsning och kundens svar. Att API:et har tagit emot begäran betyder ännu inte att telefonen har fått meddelandet.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Ett API är det gränssnitt ditt ordersystem anropar för att be leverantören skicka ett meddelande. En webhook går åt andra hållet: en adress i ditt system som leverantören anropar när något händer, till exempel att meddelandet har levererats eller att kunden har svarat.",
          "Adresser, fält och autentisering beror på leverantören, så utgå från dokumentationen för tjänsten du kopplar till. Exemplen nedan kommer från Googles dokumentation för RCS for Business."
        ],
        "points": [],
        "sources": [
          "send",
          "webhooks",
          "events"
        ]
      },
      {
        "id": "utskick",
        "title": "Vad betyder svaret på ett utskick?",
        "paragraphs": [
          "Varje utskick får ett eget meddelande-id, och samma id får aldrig användas för ett annat meddelande. Google svarar med felet 409 ALREADY_EXISTS om det händer. Spara id:t tillsammans med ordern eller ärendet, så går det att uppdatera rätt post när en händelse kommer tillbaka.",
          "Svaret 200 OK betyder att plattformen har tagit emot meddelandet. Är telefonen avstängd försöker plattformen leverera det i upp till 30 dagar. Andra svar säger mer om mottagaren:"
        ],
        "points": [
          "404 NOT_FOUND: numret saknar RCS, eller avsändaren är inte lanserad hos mottagarens operatör.",
          "400 INVALID_ARGUMENT: meddelandet innehåller en funktion som telefonen inte stöder och levereras inte.",
          "Meddelandet får vara högst 250 KB och texten högst 3 072 tecken."
        ],
        "sources": [
          "send",
          "practice"
        ]
      },
      {
        "id": "handelser",
        "title": "Vilka händelser kommer tillbaka?",
        "paragraphs": [
          "Google skiljer på händelser från kundens telefon och händelser från plattformen. Kundens svar kan vara fri text, ett tryck på en knapp, en plats eller en fil. En plats kan vara vilken plats kunden än väljer, inte bara den hen befinner sig på."
        ],
        "points": [
          "DELIVERED: meddelandet har kommit fram till telefonen.",
          "READ: meddelandet har öppnats.",
          "IS_TYPING: kunden skriver.",
          "Tryck på en föreslagen åtgärd, med de data du gav knappen.",
          "UNSUBSCRIBE och SUBSCRIBE: kunden har sagt upp eller återupptagit prenumerationen.",
          "TTL_EXPIRATION_REVOKED: meddelandet drogs tillbaka när giltighetstiden gick ut."
        ],
        "sources": [
          "events",
          "receive",
          "send"
        ]
      },
      {
        "id": "sakerhet",
        "title": "Hur skyddar du webhooken?",
        "paragraphs": [
          "Vem som helst kan anropa en öppen adress, så kontrollera varje anrop innan du behandlar det. Google skickar en signatur i rubriken X-Goog-Signature, som du jämför med en HMAC SHA512 av meddelandet beräknad med din klientnyckel. När webhooken registreras skickar Google också ett anrop med en hemlighet som adressen ska svara med. Google avråder från att lita på fasta ip-adresser, eftersom adresserna ändras.",
          "Svara snabbt. Google rekommenderar att webhooken lägger händelsen i en egen kö och svarar 200 OK inom fem sekunder, och att själva behandlingen sker separat. Alla svar utom 200 OK räknas som misslyckade, och då gör plattformen nya försök i upp till sju dagar innan händelsen raderas. Alla avsändare hos samma partner delar en kö, så en webhook som fallerar kan försena händelser för de andra avsändarna också, även testavsändare."
        ],
        "points": [],
        "sources": [
          "webhooks"
        ]
      },
      {
        "id": "dubbletter",
        "title": "Hur undviker du dubbletter?",
        "paragraphs": [
          "Händelser levereras minst en gång, vilket betyder att samma händelse ibland kommer två gånger. Kontrollera meddelande-id:t och hoppa över det du redan har behandlat. Misslyckas ett utskick på grund av ett tillfälligt fel eller en tidsgräns, försök igen med samma id och längre väntetid mellan försöken.",
          "Ett SMS som reserv ska inte skickas bara för att anropet tog lång tid. Google rekommenderar att systemet först kontrollerar att inget leveranskvitto har kommit och försöker dra tillbaka RCS-meddelandet. Misslyckas återkallelsen kan meddelandet redan ha kommit fram. Startar du ett SMS efter ett oklart besked om giltighetstiden och RCS-meddelandet ändå levereras, anger Google att RCS-meddelandet inte debiteras."
        ],
        "points": [],
        "sources": [
          "practice",
          "send"
        ]
      },
      {
        "id": "giltighet",
        "title": "Hur länge ska ett meddelande få vänta?",
        "paragraphs": [
          "För tidskänsliga meddelanden kan du ange en giltighetstid eller en exakt sluttid. Den kortaste tiden är sex sekunder och den längsta 15 dagar. Google föreslår minst 15 sekunder för engångskoder och minst 60 sekunder för andra meddelanden, eftersom telefonen kan behöva tid att hämta bilder eller tappa täckning en stund. En påminnelse om en tid som redan har passerat bör få en giltighetstid som slutar innan dess."
        ],
        "points": [],
        "sources": [
          "send"
        ]
      },
      {
        "id": "fordjupning",
        "title": "Två riktningar i samma flöde",
        "paragraphs": [
          "Utskicket och svaret lever olika länge. Säg att ordersystemet begär ett leveransbesked klockan 14. Leveransrapporten kommer kanske några sekunder senare och kundens svar nästa morgon. Integrationen behöver därför hitta samma order utan att det ursprungliga anropet är öppet.",
          "Beskriv vad varje status får ändra och vad som ska hända om en händelse saknas. Det gör felsökningen tydligare än en enda etikett som säger skickat. Inför driftstart kan du gå igenom den här listan:"
        ],
        "points": [
          "Varje utskick har ett unikt id som sparas med ordern.",
          "Webhooken kontrollerar signaturen och svarar innan händelsen behandlas.",
          "Samma händelse två gånger ändrar inte ärendet två gånger.",
          "Fri text, bilder och platser från kunden hamnar hos någon som kan svara.",
          "En avregistrering stoppar kommande utskick i alla system som skickar."
        ],
        "sources": [
          "send",
          "events",
          "webhooks",
          "practice"
        ]
      }
    ]
  },
  "vad-kostar-rcs": {
    "fingerprint": "66dd7d5832414081e1b37f6c9700923e5fe649324871e6be290b34da8efdcaac",
    "description": "Privat RCS går över wifi eller mobildata, så kostnaden följer din uppkoppling. Företagsutskick har en egen prissättning hos tjänsten som skickar dem, och hos rcsdirekt.se betalar du per meddelande utan månadsavgift.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Privata RCS-meddelanden går över wifi eller mobildata. Enligt Google kostar de inget extra så länge du använder ett wifi som du inte betalar för, och över mobildata följer kostnaden ditt abonnemang. Tele2 skriver att RCS ingår i abonnemanget, medan Apple påpekar att operatörsavgifter kan tillkomma.",
          "För företag är det annorlunda. Operatörerna debiterar RCS från företag efter vad meddelandet innehåller och om kunden svarar, i nivåerna Basic, Single och Conversation. Priset beror också på vilken operatör mottagaren har."
        ],
        "points": [],
        "sources": [
          "chat",
          "tele2-rcs",
          "apple",
          "billing-faq",
          "rcsdirekt-prices"
        ]
      },
      {
        "id": "priser",
        "title": "Vad kostar RCS för företag hos rcsdirekt.se?",
        "paragraphs": [
          "Listpriserna i november 2026 är Basic från 0,316 SEK, Single från 0,462 SEK och Conversation från 0,641 SEK, exklusive moms. Det finns ingen startavgift, månadsavgift eller bindningstid. Det lägsta priset gäller inte alla mottagare, så räkna med priset för de nät dina kunder har."
        ],
        "points": [
          "Telia: Basic 0,346, Single 0,483 och Conversation 0,694 SEK.",
          "Tele2: Basic 0,326, Single 0,462 och Conversation 0,662 SEK.",
          "Telenor: Basic 0,363, Single 0,557 och Conversation 0,988 SEK.",
          "Tre: Basic 0,316, Single 0,481 och Conversation 0,641 SEK."
        ],
        "sources": [
          "rcsdirekt-prices"
        ]
      },
      {
        "id": "debitering",
        "title": "Hur avgör operatören vilken nivå ett meddelande får?",
        "paragraphs": [
          "Google räknar ett textmeddelande på högst 160 tecken som Basic och ett meddelande med bild, kort, knappar eller längre text som Single. Tecknen räknas som byte i UTF-8, och en emoji kan ta 2 till 4 tecken. En text på 150 tecken med några emojier kan därför bli Single.",
          "Hur svaren räknas beror också på avsändarens kategori. En avsändare som inte är registrerad för samtal debiteras per meddelande även när kunden svarar, och kundens svar räknas då som egna meddelanden.",
          "För en avsändare som är registrerad för samtal uppstår en Conversation när kunden svarar inom 24 timmar, och den omfattar då alla meddelanden i ett 24-timmarsfönster. Google tar fram händelserna och operatörerna bestämmer om och hur kundens egna meddelanden debiteras. Några regler från Googles dokumentation som påverkar fakturan:"
        ],
        "points": [
          "Meddelanden debiteras när de levereras, inte när de skickas, så ett utskick sent i en månad kan hamna på nästa månads faktura.",
          "Ett meddelande som aldrig levereras debiteras inte.",
          "Ett tryck på en föreslagen åtgärd, som att öppna en länk, räknas inte som ett debiterbart meddelande från kunden.",
          "Ett tryck på ett föreslaget svar, en fil eller en delad plats räknas som ett meddelande från kunden."
        ],
        "sources": [
          "billing-faq",
          "send"
        ]
      },
      {
        "id": "sms-reserv",
        "title": "Vad kostar en SMS-reserv?",
        "paragraphs": [
          "Ska kunder utan RCS få ett SMS i stället behöver du räkna med SMS-priset för de mottagarna. Hos rcsdirekt.se kostar ett SMS 0,317 SEK till Tre, 0,336 SEK till Tele2, 0,346 SEK till Telia och 0,395 SEK till Telenor, och 0,385 SEK till de flesta mindre nät. Flera av de mindre näten tar bara emot SMS, så för deras kunder blir reserven det enda alternativet.",
          "Ett långt SMS delas upp i segment om 153 tecken, eller 67 tecken om texten innehåller emojier, och enligt leverantören Bandwidth debiteras varje segment för sig. Skriv därför SMS-versionen kort, särskilt om RCS-versionen har mycket text."
        ],
        "points": [],
        "sources": [
          "rcsdirekt-prices",
          "bandwidth-sms",
          "send"
        ]
      },
      {
        "id": "exempel",
        "title": "Ett räkneexempel",
        "paragraphs": [
          "Säg att en frisörkedja skickar 1 000 påminnelser i ren text, där 600 mottagare har Telia och 400 har Tre. Som Basic blir det 600 × 0,346 + 400 × 0,316 = 334 kronor exklusive moms. Lägger kedjan till en bild och en knapp för att boka om blir samma utskick Single: 600 × 0,483 + 400 × 0,481 = 482,20 kronor.",
          "Svarar 100 kunder med en fråga, och kedjan svarar dem, kan de samtalen debiteras som Conversation. Det beror på hur avsändaren är registrerad, så fråga leverantören hur sådana samtal räknas innan du budgeterar ett flöde där många väntas svara."
        ],
        "points": [],
        "sources": [
          "rcsdirekt-prices",
          "billing-faq"
        ]
      },
      {
        "id": "fordjupning",
        "title": "Räkna på det som ska skickas",
        "paragraphs": [
          "Två projekt med lika många kunder kan kosta olika mycket om det ena skickar ett besked och det andra en påminnelse och två uppföljningar. Gör därför budgeten utifrån meddelanden, inte bara kontaktlistans storlek.",
          "Skilj också kanalens pris från arbetet med att ta fram innehåll och ansluta ordersystemet. En reservkanal ska räknas för sig, så att kostnaden inte döljs i ett genomsnitt. Det här behöver du veta för en uppskattning:"
        ],
        "points": [
          "Hur många meddelanden varje kund får i flödet.",
          "Om meddelandena är ren text under 160 tecken eller har bild och knappar.",
          "Hur stor andel av kunderna som har Telia, Tele2, Telenor, Tre eller ett mindre nät.",
          "Hur många som väntas svara.",
          "Hur många som saknar RCS och ska få SMS."
        ],
        "sources": [
          "rcsdirekt-prices",
          "billing-faq",
          "practice"
        ]
      }
    ]
  },
  "rcs-pa-iphone": {
    "fingerprint": "6b7082739deb0c372e61d0bd4d8ce29336ecc7df24930001c6c6e018ac9fb4b2",
    "description": "RCS fungerar i iPhones app Meddelanden från iOS 18, men din operatör måste också ha stöd. I Sverige har Tele2 och Comviq öppnat för alla kunder, och hos Tre och Hallon fungerar det i en testversion av iOS.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "För att använda RCS på iPhone behövs två saker. Telefonen måste ha iOS 18 eller senare, och du behöver ett abonnemang med SMS från en operatör som har öppnat för RCS på iPhone. Det räcker alltså inte att uppdatera telefonen om operatören inte är med.",
          "Så kontrollerar du: öppna Inställningar, välj Appar och sedan Meddelanden. Där ska det finnas ett val som heter RCS-meddelanden. Saknas det, kontrollera först att iOS är uppdaterad och fråga sedan operatören om just din linje. Apple skriver att det kan dröja några timmar innan RCS fungerar efter att du har slagit på det.",
          "Vilken kanal ett samtal använder ser du i skrivfältet, där det står RCS-meddelande när RCS används. Gröna bubblor kan vara både RCS och SMS, så färgen säger inget om det. Blå bubblor är iMessage."
        ],
        "points": [],
        "sources": [
          "apple",
          "apple-channels",
          "tele2-rcs"
        ]
      },
      {
        "id": "operatorer",
        "title": "Vilka operatörer har RCS på iPhone i Sverige?",
        "paragraphs": [
          "Läget i november 2026: Tele2 och Comviq har öppnat RCS på iPhone för alla sina kunder. Hos Tre fungerar det i testversionen av iOS 27.3, som Apple släppte den 3 november, och det har också testats med Hallon. Det kan komma till alla kunder med den färdiga uppdateringen, men operatörerna har inte bekräftat när. Telia och Telenor har inte bekräftat något stöd än.",
          "Apples egen operatörslista, publicerad den 17 november 2026, anger krypterad RCS hos Tele2 men har ingen RCS-markering för Comviq, Tre, Telia eller Telenor. Listan och operatörernas supportsidor ger alltså inte exakt samma bild. Det säkraste beskedet för din linje står på operatörens egen supportsida."
        ],
        "points": [
          "Tele2: öppet för alla kunder",
          "Comviq: öppet för alla kunder",
          "Tre: fungerar i testversionen av iOS 27.3",
          "Hallon: testat i testversionen av iOS 27.3",
          "Telia: inget bekräftat stöd än",
          "Telenor: inget bekräftat stöd än"
        ],
        "sources": [
          "tele2-rcs",
          "comviq-rcs",
          "tre-hallon-ios-27-3",
          "apple-carriers"
        ]
      },
      {
        "id": "android",
        "title": "Vad fungerar mellan iPhone och Android?",
        "paragraphs": [
          "När både du och mottagaren har RCS får samtal mellan iPhone och Android ungefär samma funktioner som ett samtal mellan två Android-telefoner. Utan RCS går samma samtal som SMS och MMS."
        ],
        "points": [
          "Du ser när den andra skriver, i samtal mellan två personer.",
          "Leveranskvitton och läskvitton, också i samtal mellan två personer.",
          "Foton och videor i högre upplösning.",
          "Gruppchattar som går att namnge och där deltagare kan läggas till eller tas bort."
        ],
        "sources": [
          "chat",
          "apple",
          "tele2-rcs"
        ]
      },
      {
        "id": "kryptering",
        "title": "Är RCS på iPhone krypterat?",
        "paragraphs": [
          "Apple har infört end-to-end-krypterad RCS som betaversion i iOS 26.5. Den är påslagen som standard hos operatörer som stöder den och kräver att alla deltagares operatörer gör det. Ett krypterat samtal har en låssymbol högst upp, och saknas den är meddelandena inte skyddade mot att någon läser dem på vägen.",
          "Googles hjälpsida angav i november 2026 fortfarande att RCS-chattar med iPhone-användare saknar end-to-end-kryptering. Uppgifterna kan gälla olika operatörer och versioner, så låssymbolen i det aktuella samtalet är det säkraste tecknet."
        ],
        "points": [],
        "sources": [
          "apple",
          "apple-channels",
          "apple-carriers",
          "chat"
        ]
      },
      {
        "id": "app",
        "title": "Kan du använda en annan app?",
        "paragraphs": [
          "Från iOS 26 kan du välja vilken app som ska hantera SMS, MMS och RCS på iPhone. Apple påpekar också att operatörsavgifter kan tillkomma, så fråga operatören om du är osäker på vad som ingår i abonnemanget. Tele2 skriver att RCS ingår och använder din vanliga datatrafik."
        ],
        "points": [],
        "sources": [
          "apple",
          "tele2-rcs"
        ]
      },
      {
        "id": "fordjupning",
        "title": "Testa ett verkligt samtal",
        "paragraphs": [
          "När inställningen finns kan du göra ett enkelt test. Öppna en konversation med någon som vet att hen har RCS, till exempel en vän med en Android-telefon där RCS är påslaget, och titta på texten i skrivfältet innan du skickar.",
          "Att en bild kommer fram bevisar inte att RCS används, eftersom MMS också kan bära bilder. Fungerar det inte kan du gå igenom samma steg som Tele2 och Comviq föreslår. Skriv sedan upp vilken iOS-version telefonen har och vilken linje du använder, så blir det lättare för operatörens support att svara."
        ],
        "points": [
          "Kontrollera att wifi eller mobildata fungerar.",
          "Kontrollera att RCS-meddelanden är påslaget.",
          "Uppdatera iOS under Inställningar, Allmänt och Programuppdatering.",
          "Kontrollera att mottagaren också har RCS."
        ],
        "sources": [
          "apple",
          "tele2-rcs",
          "comviq-rcs"
        ]
      },
      {
        "id": "foretag",
        "title": "Vad betyder det för företag?",
        "paragraphs": [
          "Skickar du för ett företag och vill nå kunder med iPhone behöver du testa din registrerade avsändare. Att två privatpersoner kan chatta med RCS visar inte att ett företagsutskick når samma telefoner. Inför ett utskick kan leverantören göra en kapabilitetskontroll, som visar om ett visst nummer kan ta emot RCS från avsändaren och vilka funktioner som stöds.",
          "Räkna också med skillnader i hur meddelandet visas. Google anger att knappar som ligger kvar inne i meddelandebubblan inte stöds på iPhone, så kortet behöver fungera även när knapparna visas under det. iPhone-användare kan dessutom stänga av RCS-meddelanden från företag i inställningarna och rapportera ett meddelande som skräp."
        ],
        "points": [],
        "sources": [
          "capabilities",
          "send",
          "apple"
        ]
      }
    ]
  },
  "rcs-gdpr-samtycke": {
    "fingerprint": "0a764ffe135f699915135be87acf472d3edee65d6b2bb882e54c745e0f48ae0d",
    "description": "Företaget ansvarar för personuppgifterna och för reglerna om marknadsföring även när utskicket går som RCS. Telefonnummer, svar och leveransdata kan vara personuppgifter om de går att koppla till en person.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Ett nytt meddelandeformat ändrar inte kraven. Två regelverk gäller oftast samtidigt: dataskyddsförordningen, GDPR, gäller hur du behandlar personuppgifter som telefonnummer och svar, och marknadsföringslagen gäller själva reklamen. De besvarar olika frågor, så en bokningsbekräftelse och ett reklamerbjudande behöver bedömas var för sig, efter vad de är till för.",
          "Den här genomgången bygger på vad Integritetsskyddsmyndigheten (IMY), Konsumentverket och lagtexten säger. Den ersätter inte juridisk rådgivning, och för ett verkligt upplägg bör du låta en dataskyddskunnig rådgivare eller jurist göra bedömningen."
        ],
        "points": [],
        "sources": [
          "imy-legal-basis",
          "marketing-law",
          "mfl-law"
        ]
      },
      {
        "id": "samtycke",
        "title": "När krävs samtycke för reklam i meddelanden?",
        "paragraphs": [
          "Enligt 19 § marknadsföringslagen får ett företag använda elektronisk post vid marknadsföring till en privatperson bara om personen har samtyckt i förväg. Lagen definierar elektronisk post som ett individuellt elektroniskt meddelande i form av text, röst, ljud eller bild som kan lagras tills mottagaren hämtar det. Konsumentverket nämner e-post och sms, och IMY skriver e-post, sms, fax eller annan elektronisk kommunikation. RCS nämns inte vid namn, så låt en jurist bekräfta hur regeln gäller ditt utskick.",
          "Har företaget fått kontaktuppgiften när det sålde något till personen gäller ett undantag, men bara om alla tre villkor i lagen är uppfyllda:"
        ],
        "points": [
          "Personen har inte sagt nej till att uppgiften används för marknadsföring.",
          "Reklamen gäller företagets egna, likartade produkter.",
          "Personen får tydligt, enkelt och kostnadsfritt säga nej både när uppgiften samlas in och i varje följande reklammeddelande."
        ],
        "sources": [
          "mfl-law",
          "marketing-law",
          "imy-objection"
        ]
      },
      {
        "id": "innehall",
        "title": "Vad gäller för själva reklamen?",
        "paragraphs": [
          "Marknadsföringen ska vara utformad så att det tydligt framgår att det är reklam och vem som står bakom den. Den får inte vara vilseledande, till exempel om pris eller kvalitet, och väsentlig information får inte utelämnas. Ett meddelande från en verifierad avsändare med logotyp gör det lättare att se vem som skickar, men det ändrar inte kraven på innehållet.",
          "Lagens 20 § kräver dessutom att ett reklammeddelande med elektronisk post alltid innehåller en giltig adress dit mottagaren kan begära att utskicken upphör. Den regeln gäller även när mottagaren är ett företag."
        ],
        "points": [],
        "sources": [
          "marketing-law",
          "mfl-law",
          "verification"
        ]
      },
      {
        "id": "rattslig-grund",
        "title": "Vilken rättslig grund behövs enligt GDPR?",
        "paragraphs": [
          "All behandling av personuppgifter behöver en av GDPR:s sex rättsliga grunder. IMY skriver att privata företag främst kan använda samtycke, avtal, rättslig förpliktelse och intresseavvägning, och att det ofta inte är lämpligt eller ens möjligt att stödja sig på samtycke. Överväg därför först de andra grunderna.",
          "Den rättsliga grunden ska vara bestämd innan uppgifterna samlas in, och valet ska dokumenteras. De registrerade ska alltid få veta vilken grund du använder. IMY påpekar också att du inte får byta till intresseavvägning bara för att ett samtycke visar sig vara ogiltigt."
        ],
        "points": [],
        "sources": [
          "imy-legal-basis"
        ]
      },
      {
        "id": "principer",
        "title": "Hur länge får du spara nummer och svar?",
        "paragraphs": [
          "GDPR:s grundprinciper sätter ramarna. Telefonnummer, kundsvar och leveranskvitton är personuppgifter om de går att koppla till en person, och för dem gäller bland annat det här enligt IMY:"
        ],
        "points": [
          "Uppgifterna får bara samlas in för särskilda och uttryckligen angivna ändamål.",
          "Spara inte fler uppgifter än ändamålet kräver, och inget för att det kan vara bra att ha.",
          "Radera eller avidentifiera uppgifterna när de inte längre behövs, och ha en rutin för gallring.",
          "Vill du använda uppgifterna på ett nytt sätt måste det vara förenligt med det ursprungliga ändamålet, och mottagaren ska informeras innan."
        ],
        "sources": [
          "imy-principles",
          "events"
        ]
      },
      {
        "id": "invandning",
        "title": "Vad händer när någon säger nej?",
        "paragraphs": [
          "Enligt IMY är rätten att invända mot direktmarknadsföring absolut. När en person invänder måste behandlingen för det ändamålet upphöra, och svaret ska komma utan onödigt dröjsmål och senast inom en månad. Invändningen måste alltså få effekt i alla system som styr utskicken.",
          "Google har en liknande regel för RCS. Säger kunden upp prenumerationen i Google Meddelanden får avsändaren händelsen UNSUBSCRIBE och ett STOP-meddelande, och efter det får bara nödvändiga meddelanden skickas, som engångskoder, besked om en tjänst kunden har begärt och en bekräftelse på avregistreringen. Valet fanns inte i Sverige enligt Googles lista i november 2026, men Google kräver att varje avsändare har en fungerande avregistrering redan vid lanseringen."
        ],
        "points": [],
        "sources": [
          "imy-objection",
          "events",
          "business",
          "launch-approval"
        ]
      },
      {
        "id": "fordjupning",
        "title": "Skilj på ändamålen",
        "paragraphs": [
          "Samma telefonnummer kan finnas i både ett bokningsregister och en kampanjlista utan att användningen är densamma. Säg att en frisörsalong skickar en påminnelse dagen före en bokad tid. Den hör till bokningen, medan ett erbjudande till samma nummer är marknadsföring. Googles indelning i transaktionsmeddelanden och marknadsföring följer samma linje.",
          "Dokumentera varför uppgiften behövs i respektive flöde och hur mottagarens val slår igenom, så att ett nej till erbjudanden inte stoppar påminnelserna. En teknisk leveranskvittens kan användas för felsökning men ska inte automatiskt bli ett nytt marknadsföringsunderlag. Innan första utskicket kan du gå igenom det här:"
        ],
        "points": [
          "Vilket ändamål varje flöde har, och vilken rättslig grund som gäller för det.",
          "Om reklamutskicken har ett samtycke, eller uppfyller alla tre villkoren för befintliga kunder.",
          "Var mottagaren får information om behandlingen, till exempel i integritetspolicyn.",
          "Hur ett nej registreras och hur snabbt det stoppar utskicken.",
          "Hur länge nummer, svar och kvitton sparas."
        ],
        "sources": [
          "use-cases",
          "imy-principles",
          "imy-legal-basis",
          "mfl-law"
        ]
      }
    ]
  },
  "rcs-basic-single-conversation": {
    "fingerprint": "5e5075bcda3130d6c58b6e05cf6adff4415e48d398bfa57ac024338745c805e4",
    "description": "Basic, Single och Conversation är de nivåer som operatörerna debiterar RCS för företag efter. De beskriver vad meddelandet innehåller och om kunden svarar, och de är inga abonnemang.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Nivån bestäms för varje meddelande, så samma företag kan skicka alla tre. Basic är ren text upp till 160 tecken, till exempel en orderbekräftelse. Single har bild, video, knappar eller text längre än 160 tecken, som ett kort med bild och rubrik eller en karusell. Conversation börjar när kunden svarar, och sedan skriver ni fram och tillbaka under ett tidsfönster på 24 timmar.",
          "Leverantörens och operatörernas villkor avgör gränser och debitering. Be om dem innan du räknar på ett flöde, eftersom en synlig svarsknapp inte ensam avgör hur meddelandet faktureras."
        ],
        "points": [],
        "sources": [
          "billing-faq",
          "send",
          "cards"
        ]
      },
      {
        "id": "basic",
        "title": "Vad räknas som Basic?",
        "paragraphs": [
          "Google räknar ett textmeddelande på högst 160 tecken som Basic. Tecknen räknas som byte i UTF-8, där en emoji tar 2 till 4. Ett meddelande med 150 bokstäver och tre emojier kan alltså gå över gränsen. Google ger emojier som exempel, så fråga leverantören hur svenska tecken som å, ä och ö räknas innan du skriver text nära gränsen.",
          "Basic får innehålla en länk. Har sidan rätt metadata kan meddelandeappen visa en förhandsvisning med bild och titel, och enligt Google räknas meddelandet ändå som Basic, eftersom förhandsvisningen inte är ett rikt kort. Kunden kan stänga av förhandsvisningar i appen, så texten behöver fungera utan dem."
        ],
        "points": [],
        "sources": [
          "send",
          "billing-faq"
        ]
      },
      {
        "id": "single",
        "title": "Vad räknas som Single?",
        "paragraphs": [
          "Single är ett meddelande med rikt innehåll, eller ren text över 160 tecken. Det kan vara ett kort med bild, rubrik och upp till fyra knappar, eller en karusell med upp till tio kort. Ett enda Single-meddelande kan alltså låta kunden välja mellan flera åtgärder, som att öppna en webbsida, ringa eller lägga in en tid i kalendern.",
          "Single gäller per meddelande. Skickar du ett kort och sedan en separat text blir det två meddelanden, och textmeddelandet bedöms för sig."
        ],
        "points": [],
        "sources": [
          "billing-faq",
          "cards",
          "send"
        ]
      },
      {
        "id": "conversation",
        "title": "Hur fungerar Conversation?",
        "paragraphs": [
          "En Conversation kan bara uppstå för en avsändare som är registrerad för samtal. Den startar när en part svarar inom 24 timmar på ett meddelande från den andra, och omfattar sedan alla meddelanden i 24 timmar efter svaret. Google skiljer på två fall:"
        ],
        "points": [
          "Kunden svarar på företagets meddelande. Då ingår företagets senaste meddelande, kundens svar och allt inom 24 timmar i samma Conversation.",
          "Företaget svarar på ett meddelande som kunden har skrivit först. Då startar Conversation med kundens meddelande.",
          "Har företaget skickat flera meddelanden innan kunden svarar debiteras de tidigare var för sig som Basic eller Single.",
          "Svarar kunden efter mer än 24 timmar debiteras företagets meddelanden var för sig."
        ],
        "sources": [
          "billing-faq"
        ]
      },
      {
        "id": "svar",
        "title": "Vilka svar från kunden räknas?",
        "paragraphs": [
          "Google räknar ett meddelande från kunden när hen skriver text, skickar en fil, trycker på ett föreslaget svar eller delar sin plats. Ett tryck på en föreslagen åtgärd, som att öppna en länk, räknas inte. Operatörerna bestämmer sedan om och hur kundens meddelanden debiteras, och Google skriver att rapporterna för samtal kan dröja upp till två dagar."
        ],
        "points": [],
        "sources": [
          "billing-faq"
        ]
      },
      {
        "id": "google-2025",
        "title": "Vad ändrade Google i november 2025?",
        "paragraphs": [
          "Den 20 november 2025 slog Google ihop avsändarkategorierna Basic Message och Single Message till en kategori för avsändare som inte för samtal, Non-conversational. Sedan dess är varje ny avsändare antingen Conversational eller Non-conversational, och Google flyttar befintliga avsändare automatiskt med start den 16 mars 2026. Kategorin väljs när avsändaren skapas.",
          "Ändringen gällde etiketterna för avsändaren. Google skriver att debiteringslogiken är densamma och att händelserna basic_message och single_message finns kvar för varje meddelande. Därför visar svenska prislistor, som rcsdirekt.se:s, fortfarande tre nivåer: priset följer vad varje meddelande innehåller och om kunden svarar."
        ],
        "points": [],
        "sources": [
          "billing-faq",
          "agent",
          "rcsdirekt-prices"
        ]
      },
      {
        "id": "fordjupning",
        "title": "Utgå från det verkliga innehållet",
        "paragraphs": [
          "Börja med att rita kundens flöde: ett kort besked, ett rikt utskick eller ett samtal med flera steg. Fråga sedan hur leverantören klassificerar varje del. Säg att en tandläkare skickar en påminnelse i ren text. Den blir Basic, med en knapp för att boka om blir den Single, och svarar patienten börjar en Conversation om avsändaren är registrerad för samtal.",
          "Se inte nivåerna som en trappa där den dyraste alltid är bäst. En enkel orderstatus kan klara sig med text, medan ett produktval behöver media. Debiteringsreglerna måste bekräftas separat från de tekniska möjligheterna. Gå igenom det här för varje meddelande i flödet:"
        ],
        "points": [
          "Är det ren text, och ryms texten inom 160 tecken räknat med emojier?",
          "Har det bild, video, kort eller knappar?",
          "Väntar du dig att kunden svarar, och är avsändaren registrerad för samtal?",
          "Vilket pris gäller för mottagarens nät?"
        ],
        "sources": [
          "billing-faq",
          "cards",
          "rcsdirekt-prices"
        ]
      }
    ]
  },
  "rcs-sverige-operatorer": {
    "fingerprint": "e85d9f859e345f8463afa82c0e3801d900594f40a30958788d5c248d777afbd0",
    "description": "Tele2 och Comviq uppger att RCS fungerar på både iPhone och Android. Hos andra svenska operatörer behöver du fråga om stödet för ditt abonnemang och din telefon.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Tele2 och Comviq beskriver RCS för iPhone och Android på sina supportsidor. Där krävs iOS 18 eller senare på iPhone, eller Android 5.0 eller senare med appen Google Meddelanden. Enligt Hurbra.se fungerar RCS på iPhone även hos Tre i den första testversionen av iOS 27.3, och det har testats med Hallon, men operatörerna har inte bekräftat när alla kunder får det.",
          "Ska ett företag skicka RCS behövs en annan kontroll. Leverantören måste kunna nå kunderna från företagets registrerade avsändare. Att två personer kan chatta med RCS säger inte om ett företagsutskick når samma telefoner."
        ],
        "points": [],
        "sources": [
          "tele2-rcs",
          "comviq-rcs",
          "tre-hallon-ios-27-3"
        ]
      },
      {
        "id": "operatorer",
        "title": "Hur ser läget ut hos varje operatör?",
        "paragraphs": [
          "Sammanställningen gäller iPhone i november 2026. Tele2 och Comviq bygger på operatörernas egna sidor, Tre och Hallon på tester med testversionen av iOS 27.3 och Telia och Telenor på att vi inte har hittat något besked från dem."
        ],
        "points": [
          "Tele2: öppet för alla kunder",
          "Comviq: öppet för alla kunder",
          "Tre: fungerar i testversionen av iOS 27.3",
          "Hallon: testat i testversionen av iOS 27.3",
          "Telia: inget bekräftat stöd än",
          "Telenor: inget bekräftat stöd än"
        ],
        "sources": [
          "tele2-rcs",
          "comviq-rcs",
          "tre-hallon-ios-27-3",
          "apple-carriers"
        ]
      },
      {
        "id": "apple-lista",
        "title": "Vad visar Apples operatörslista?",
        "paragraphs": [
          "Apple publicerar en lista över vilka funktioner varje operatör har på iPhone. Den 1 november 2026 saknade Sveriges avsnitt RCS-markeringar helt. I versionen från den 17 november står Tele2 med end-to-end-krypterade RCS-meddelanden, medan Comviq, Tre, Telia och Telenor saknar RCS-markering, trots att Comviq själv skriver att RCS fungerar på iPhone.",
          "Listan och operatörernas supportsidor ger alltså inte samma besked. Det går därför inte att ge ett säkert svar för hela Sverige utifrån listan, och för en enskild linje är operatörens egen uppgift det bästa beskedet."
        ],
        "points": [],
        "sources": [
          "apple-carriers",
          "comviq-rcs",
          "tele2-rcs"
        ]
      },
      {
        "id": "android",
        "title": "Hur är det på Android?",
        "paragraphs": [
          "Google skriver att tillgången till RCS varierar mellan regioner och operatörer, och att RCS-chattar tillhandahålls av Google eller av mobiloperatören. I Google Meddelanden ser du status under RCS-chattar i inställningarna. Står det Ansluten fungerar tjänsten, och står det att RCS inte stöds av operatören har operatören inte öppnat för det.",
          "Har telefonen två SIM-kort anger Google att SIM-kortet för samtal också ska vara inställt för mobildata. Står det Väntar på nytt försök i mer än 30 minuter har Google problem att verifiera numret."
        ],
        "points": [],
        "sources": [
          "chat",
          "tele2-rcs"
        ]
      },
      {
        "id": "kontrollera",
        "title": "Hur ser du vilket stöd din telefon har?",
        "paragraphs": [
          "Det snabbaste beskedet för din egen linje får du i telefonens inställningar, som ser likadana ut oavsett operatör. Tele2 och Comviq beskriver samma vägar på sina supportsidor."
        ],
        "points": [
          "iPhone: Inställningar, Appar, Meddelanden och RCS-meddelanden. Finns valet har operatören öppnat för RCS.",
          "Android: Google Meddelanden, profilbilden, Inställningar för Meddelanden och RCS-chattar. Status Ansluten betyder att RCS fungerar.",
          "I ett samtal står det RCS-meddelande i skrivfältet när RCS används, oavsett bubblans färg."
        ],
        "sources": [
          "tele2-rcs",
          "comviq-rcs",
          "apple",
          "chat"
        ]
      },
      {
        "id": "foretag",
        "title": "Vilka nät når ett företag med RCS?",
        "paragraphs": [
          "Ett företags avsändare lanseras hos en operatör i taget, och varje operatör godkänner den. Är avsändaren inte lanserad hos mottagarens operatör svarar plattformen med ett fel, även om mottagaren har RCS för privata chattar. I rcsdirekt.se:s prislista har Telia, Tele2, Telenor och Tre RCS-priser, liksom flera tjänsteleverantörer som använder Telias nät. För de flesta andra nät i listan finns bara ett SMS-pris, vilket betyder att de inte tar emot RCS från företag.",
          "Inför ett utskick kan leverantören kontrollera enskilda nummer. Googles kapabilitetskontroll visar om ett nummer kan nås och vilka funktioner som stöds, och en masskontroll med 500 till 10 000 nummer ger en uppskattning av hur många som kan nås. Svaret bygger på att numret har varit anslutet till RCS under de senaste 31 dagarna."
        ],
        "points": [],
        "sources": [
          "launch-approval",
          "send",
          "rcsdirekt-prices",
          "capabilities"
        ]
      },
      {
        "id": "fordjupning",
        "title": "Bygg en användbar stödbild",
        "paragraphs": [
          "Dela upp frågan i privat Android-chatt, privat iPhone-chatt och företagsmeddelanden. De tre svaren kan skilja sig för samma kund, till exempel om operatören har öppnat för Android men ännu inte för iPhone.",
          "När en supportuppgift är oklar, notera källa, datum och vilken telefon eller linje beskedet gäller, så ser du senare vad som behöver kontrolleras igen. För planerade utskick är ett test från den registrerade avsändaren mer användbart än att summera operatörernas allmänna lanseringsnyheter. Det här är värt att ha koll på:"
        ],
        "points": [
          "Vilka operatörer dina kunder har, och hur stor andel som har mindre nät.",
          "Vilka av dem avsändaren är lanserad hos.",
          "Resultatet av en kapabilitetskontroll på ett urval av kundnumren.",
          "Ett datum för när sammanställningen ska ses över igen."
        ],
        "sources": [
          "tele2-rcs",
          "comviq-rcs",
          "apple-carriers",
          "capabilities"
        ]
      }
    ]
  },
  "svenska-operatorer-oppnar-rcs-pa-iphone": {
    "fingerprint": "ff6dd24a09dd000da7ee57260f2ee97207119ea14558ebcdf56cc2d4aaeb242e",
    "description": "Tele2 och Comviq har öppnat RCS för iPhone. Hos Tre och Hallon fungerar det i testversionen av iOS 27.3, och Telia och Telenor har ännu inte bekräftat stöd. Så ser läget ut i november 2026.",
    "sections": [
      {
        "id": "nyheten",
        "title": "",
        "paragraphs": [
          "Under 2026 har RCS börjat nå iPhone i Sverige. RCS är den nyare standarden för meddelanden som går över wifi eller mobildata i telefonens vanliga meddelandeapp. Tele2 och Comviq var först och har öppnat funktionen för alla sina kunder.",
          "Skriver du från en iPhone till någon med Android märks skillnaden direkt. Bilder går fram i högre kvalitet, och båda ser när den andra skriver och när ett meddelande har lästs. Utan RCS går de samtalen som SMS och MMS.",
          "Tre och Hallon är nästa operatörer på tur. I den första testversionen av iOS 27.3, som Apple släppte den 3 november 2026, fungerar RCS hos Tre. Funktionen har också testats med ett abonnemang från Hallon."
        ],
        "points": [],
        "sources": [
          "tele2-rcs",
          "comviq-rcs",
          "tre-hallon-ios-27-3",
          "apple-channels"
        ]
      },
      {
        "id": "operatorer",
        "title": "Läget hos operatörerna",
        "paragraphs": [
          "Sammanställningen gäller november 2026 och uppdateras när fler operatörer öppnar för RCS. Tele2 och Comviq beskriver stödet på sina supportsidor. Uppgifterna om Tre och Hallon kommer från tester med testversionen av iOS 27.3 som Hurbra.se har rapporterat om."
        ],
        "points": [
          "Tele2: öppet för alla kunder",
          "Comviq: öppet för alla kunder",
          "Tre: fungerar i testversionen av iOS 27.3",
          "Hallon: fungerar i tester med testversionen av iOS 27.3",
          "Telia: inget bekräftat stöd ännu",
          "Telenor: inget bekräftat stöd ännu"
        ],
        "sources": [
          "tele2-rcs",
          "comviq-rcs",
          "tre-hallon-ios-27-3"
        ]
      },
      {
        "id": "nar",
        "title": "När får kunder hos Tre och Hallon RCS?",
        "paragraphs": [
          "Det finns inget bekräftat datum. Stödet kan nå alla kunder när den färdiga versionen av iOS 27.3 släpps, men varken Tre eller Hallon har bekräftat det. Testversioner av iOS är avsedda för utvecklare och kan innehålla fel, så det är sällan värt att installera en bara för att få RCS. Vill du veta när din linje får stöd, håll ett öga på operatörens supportsida, där Tele2 och Comviq har beskrivit sitt."
        ],
        "points": [],
        "sources": [
          "tre-hallon-ios-27-3",
          "tele2-rcs",
          "comviq-rcs"
        ]
      },
      {
        "id": "kryptering",
        "title": "Krypteras meddelandena?",
        "paragraphs": [
          "Apple har infört end-to-end-krypterad RCS som betaversion i iOS 26.5, hos operatörer som stöder det. I Apples operatörslista från den 17 november 2026 är Tele2 den svenska operatör som står med krypterade RCS-meddelanden. Krypteringen gäller bara när alla i samtalet har operatörer som stöder den, och ett krypterat samtal har en låssymbol högst upp."
        ],
        "points": [],
        "sources": [
          "apple",
          "apple-channels",
          "apple-carriers"
        ]
      },
      {
        "id": "kontrollera",
        "title": "Så kontrollerar du att RCS är påslaget",
        "paragraphs": [
          "Telefonen behöver iOS 18 eller senare. Öppna Inställningar, välj Appar och sedan Meddelanden. Finns valet RCS-meddelanden kan du slå på det där. Saknas det har din operatör ännu inte öppnat för RCS, eller så behöver telefonen en nyare version av iOS.",
          "Bubblans färg visar inte om RCS används, eftersom både SMS och RCS visas i grönt. Titta i stället i skrivfältet, där det står RCS-meddelande när samtalet går som RCS."
        ],
        "points": [],
        "sources": [
          "apple",
          "apple-channels",
          "tele2-rcs"
        ]
      },
      {
        "id": "foretag",
        "title": "Vad det betyder för företag",
        "paragraphs": [
          "När fler iPhone-användare får RCS kan fler mottagare se företagens meddelanden med avsändarnamn, logotyp, bilder och knappar i stället för som vanliga SMS. Räckvidden för en företagsavsändare kan ändå skilja sig mellan operatörerna. Testa därför utskicket mot de nät som dina kunder använder.",
          "Inför ett utskick kan leverantören göra en kapabilitetskontroll. Den visar om ett visst telefonnummer kan ta emot RCS från avsändaren och vilka funktioner som stöds, vilket ger ett mer exakt svar än telefonmodell eller operatörsnamn. På iPhone kan användaren också stänga av RCS-meddelanden från företag i inställningarna."
        ],
        "points": [],
        "sources": [
          "apple",
          "capabilities"
        ]
      }
    ]
  }
}

type Doc = Record<string, any>
const text = (value: unknown) => (typeof value === 'string' ? value : '')
const list = (value: unknown): Doc[] => (Array.isArray(value) ? value : [])

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const ids = new Map<string, number | string>()
  const sourceDoc = async (sourceId: string) => {
    if (!ids.has(sourceId)) {
      const found = await payload.find({ collection: 'kallor', where: { sourceId: { equals: sourceId } }, depth: 0, limit: 1, req })
      if (found.docs[0]) ids.set(sourceId, found.docs[0].id)
    }
    return ids.get(sourceId)
  }

  for (const source of SOURCES) {
    if (await sourceDoc(source.sourceId)) continue
    const doc = await payload.create({ collection: 'kallor', data: source as never, req, context: { skipRebuild: true } })
    ids.set(source.sourceId, doc.id)
    payload.logger.info(`Migration: source ${source.sourceId} created.`)
  }
  if (req.context) req.context.skipRebuild = false

  for (const [slug, rewrite] of Object.entries(ARTICLES)) {
    const { docs } = await payload.find({ collection: 'artiklar', where: { slug: { equals: slug } }, depth: 0, limit: 1, req })
    const article = docs[0] as Doc | undefined
    const current = list(article?.sections)
    if (!article || fingerprint(current) !== rewrite.fingerprint) {
      payload.logger.info(`Migration: article ${slug} missing or edited since; left as it is.`)
      continue
    }
    const rows = new Map(current.map((section, index) => [text(section.sectionId) || `avsnitt-${index + 1}`, section]))
    const sections = []
    for (const section of rewrite.sections) {
      const sources = []
      for (const sourceId of section.sources) {
        const id = await sourceDoc(sourceId)
        if (id === undefined) payload.logger.warn(`Migration: source ${sourceId} missing, not added to ${slug}.`)
        else sources.push(id)
      }
      const row = rows.get(section.id)
      sections.push({
        ...(row?.id ? { id: row.id } : {}),
        sectionId: section.id,
        title: section.title,
        paragraphs: section.paragraphs.map((paragraph) => ({ text: paragraph })),
        points: section.points.map((point) => ({ text: point })),
        sources,
      })
    }
    if (sections.some((section) => !section.sources.length)) {
      payload.logger.warn(`Migration: article ${slug} has a section without sources; left as it is.`)
      continue
    }
    await payload.update({ collection: 'artiklar', id: article.id, req, data: { sections, description: rewrite.description } as never })
    payload.logger.info(`Migration: article ${slug} rewritten as a thorough guide.`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier text is in git history (cms/src/seed/content.json) if it is ever needed.
}
