import { grunderArticles } from "./rcs-articles-grunder";
import { foretagArticles } from "./rcs-articles-foretag";
import { teknikArticles } from "./rcs-articles-teknik";
import { shortContent, termDetails } from "./rcs-short-content";

export type Source = { id: string; title: string; url: string };
export type Section = { id: string; title: string; paragraphs: string[]; points?: string[]; sources: string[] };
export type Article = { slug: string; title: string; description: string; category: string; keywords: string[]; published: string; sections: Section[]; related: string[] };

export const sources: Source[] = [
  { id: "gsma", title: "GSMA: RCS Universal Profile", url: "https://www.gsma.com/solutions-and-impact/technologies/networks/rcs/universal-profile/" },
  { id: "chat", title: "Google Messages: Vanliga frågor om RCS-chattar", url: "https://support.google.com/messages/answer/9487020?hl=sv" },
  { id: "business", title: "Google Messages: RCS-chattar med företag", url: "https://support.google.com/messages/answer/7513219?hl=sv" },
  { id: "apple", title: "Apple: Om RCS-meddelanden på iPhone", url: "https://support.apple.com/sv-se/122195" },
  { id: "security", title: "Google Messages: Så skyddar RCS-chattar dina konversationer", url: "https://support.google.com/messages/answer/9592174?hl=en" },
  { id: "agent", title: "Google RCS for Business: Create an agent", url: "https://developers.google.com/business-communications/rcs-business-messaging/guides/build/agents" },
  { id: "verification", title: "Google RCS for Business: Brand verification", url: "https://developers.google.com/business-communications/rcs-business-messaging/guides/launch/brand-verification" },
  { id: "cards", title: "Google RCS for Business: Rich cards", url: "https://developers.google.com/business-communications/rcs-business-messaging/guides/learn/rich-cards" },
  { id: "features", title: "Google RCS for Business: What can agents do?", url: "https://developers.google.com/business-communications/rcs-business-messaging/guides/learn/what-can-rbm-do" },
  { id: "send", title: "Google RCS for Business: Send messages", url: "https://developers.google.com/business-communications/rcs-business-messaging/guides/build/messages/send" },
  { id: "events", title: "Google RCS for Business: Receive events", url: "https://developers.google.com/business-communications/rcs-business-messaging/guides/build/events/receive-events" },
  { id: "webhooks", title: "Google RCS for Business: Webhooks", url: "https://developers.google.com/business-communications/rcs-business-messaging/guides/integrate/webhooks" },
  { id: "capabilities", title: "Google RCS for Business: Capability checks", url: "https://developers.google.com/business-communications/rcs-business-messaging/guides/build/capabilities" },
  { id: "practice", title: "Google RCS for Business: Best practices", url: "https://developers.google.com/business-communications/rcs-business-messaging/guides/learn/best-practices" },
];

export function findSources(ids: string[]) {
  return sources.filter((source) => ids.includes(source.id));
}

export function readingMinutes(article: Article) {
  const text = [article.description, ...article.sections.flatMap((section) => [section.title, ...section.paragraphs, ...(section.points ?? [])])].join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

const baseArticles: Article[] = [
  {
    slug: "vad-ar-rcs", title: "Vad är RCS och vad betyder RCS-meddelande?", category: "Grunder", published: "2026-11-01",
    description: "RCS står för Rich Communication Services. Här får du veta hur meddelanden skickas, vad som skiljer RCS från en app och varför företagsmeddelanden är en egen del av tekniken.",
    keywords: ["vad är rcs", "rcs meddelande", "vad är rcs meddelande", "vad betyder rcs meddelande", "rcs chatt"], related: ["rcs-vs-sms", "rcs-for-foretag", "verifierad-avsandare"],
    sections: [
      { id: "betydelse", title: "RCS betyder Rich Communication Services", sources: ["gsma", "chat"], paragraphs: [
        "RCS är en meddelandestandard som gör det möjligt att skicka mer än vanlig text i en meddelandeapp. Namnet är en förkortning av Rich Communication Services. I praktiken kan ett RCS-meddelande innehålla till exempel en högupplöst bild eller en fil, och en konversation kan visa läskvitton och när den andra personen skriver.",
        "Det är lätt att tro att RCS är namnet på en särskild app. Så är det inte. En app, till exempel Google Messages, kan använda RCS som ett av flera sätt att skicka meddelanden. Samma app kan också hantera SMS och MMS. Vilken teknik som används beror bland annat på inställningar, uppkoppling och mottagarens stöd.",
        "GSMA:s Universal Profile beskriver en gemensam uppsättning RCS-funktioner och tekniska förutsättningar. Den gemensamma grunden ska göra det lättare för olika aktörer att stödja tekniken. Den betyder däremot inte att varje funktion är tillgänglig på varje telefon eller i varje meddelandetjänst."
      ] },
      { id: "hur", title: "Hur skickas ett RCS-meddelande?", sources: ["chat"], paragraphs: [
        "RCS-chattar använder wifi eller mobildata. Google beskriver att RCS-chattar aktiveras när deltagarna har RCS och att tjänsten tillhandahålls av Google eller mobiloperatören. Det är en viktig skillnad mot att bara skriva ett telefonnummer och förutsätta att meddelandet alltid får samma funktioner som ett SMS.",
        "Om RCS inte är tillgängligt kan Google Messages skicka meddelandet som SMS eller MMS, beroende på inställningar. Appen har ett val för automatisk omsändning. Den möjligheten i en konsumentapp ska inte förväxlas med ett löfte om automatisk SMS-reserv i varje företagstjänst. Företagets leverantör behöver beskriva hur dess utskick hanteras.",
        "Kostnaden för en privat RCS-chatt över mobildata hör ihop med användarens dataabonnemang. Priset för ett företagsutskick är en annan fråga: det bestäms av tjänsten som företaget använder. Det går därför inte att använda uppgiften att privat chatt kan gå över wifi som bevis för att företagsmeddelanden är kostnadsfria."
      ] },
      { id: "upplevelse", title: "Vad ser mottagaren?", sources: ["chat", "business"], paragraphs: [
        "För en privatperson kan skillnaden märkas genom tydligare bilddelning, lässtatus och en skrivindikator. Google Messages visar olika statusmarkeringar för skickat, levererat och läst. Ett läskvitto är en signal från meddelandeklienten, inte ett bevis för att personen har förstått innehållet eller vill bli kontaktad igen.",
        "Ett meddelande från ett registrerat företag kan ha ett annat utseende. Googles beskrivning av företagschattar omfattar företagsnamn, logotyp och verifieringsmarkering, samt innehåll som bilder och valbara svar eller åtgärder. Den typen av meddelande hör till företagsanvändningen av RCS, ofta kallad RCS Business Messaging."
      ] },
      { id: "skillnad", title: "RCS-chatt och företags-RCS är inte samma sak", sources: ["agent", "business", "security"], paragraphs: [
        "P2P betyder person till person. Det är exempelvis två privatpersoner som chattar med varandra. Företags-RCS handlar i stället om kommunikationen mellan ett företag och en mottagare. I Googles företagsplattform representeras företaget av en agent: en programmatisk avsändare med en företagsprofil.",
        "Skillnaden spelar roll när man läser om säkerhet, tillgänglighet och funktioner. En uppgift om en privat konversation i Google Messages gäller inte automatiskt för företagets utskick. Undvik därför påståenden som att alla RCS-meddelanden är end-to-end-krypterade. Kryptering måste beskrivas för den aktuella tjänsten och typen av konversation."
      ] },
      { id: "stod", title: "Fungerar RCS på alla telefoner?", sources: ["chat", "apple", "capabilities"], paragraphs: [
        "Nej, man bör inte utgå från det. Tillgängligheten beror på bland annat telefon, meddelandeapp, operatör, land och användarens inställningar. Apple beskriver RCS på iPhone med beroenden till region och operatör. Att en telefon kan använda RCS för en privat chatt fastställer inte heller att den kan ta emot ett visst företagsmeddelande.",
        "För företag behöver stödet undersökas i den tjänst och på de marknader där utskicket ska användas. Googles dokumentation beskriver kapabilitetskontroller som kan avgöra om en mottagare kan kommunicera med en företagsagent och vilka funktioner som stöds. Det är mer användbart än att utgå från en enda versionssiffra för Android eller iOS."
      ] },
      { id: "borja", title: "Tre frågor innan ni väljer RCS", sources: ["practice", "capabilities"], paragraphs: [
        "Börja med vad mottagaren behöver göra. Ett leveransbesked kan behöva en tydlig status och en spårningslänk. En bokning kan behöva ett enkelt svar. En produktpresentation kan behöva en bild och ett fåtal val. RCS är ett format för kommunikationen, inte en anledning att lägga till fler moment än mottagaren behöver.",
        "Kontrollera därefter vilka mottagare ni kan nå, vilka funktioner tjänsten erbjuder och vad som händer när RCS inte kan levereras. När de frågorna är besvarade går det att välja mellan ett webbgränssnitt för manuellt skapade utskick och en integration som låter era system starta meddelandeflödet."
      ], points: ["Vad ska mottagaren förstå eller göra?", "Vilka enheter, operatörer och funktioner stöds?", "Hur hanteras ett meddelande som inte kan levereras som RCS?"] }
    ]
  },
  {
    slug: "rcs-vs-sms", title: "RCS vs SMS och MMS: vad är skillnaden?", category: "Grunder", published: "2026-11-01",
    description: "RCS, SMS och MMS kan finnas i samma meddelandeapp men har olika förutsättningar. Jämför innehåll, uppkoppling, kvittenser och vad som händer när RCS inte fungerar.",
    keywords: ["rcs vs sms", "skillnad rcs sms", "rcs eller sms", "rcs mms"], related: ["vad-ar-rcs", "rcs-api-webhooks", "rich-cards-karuseller"],
    sections: [
      { id: "oversikt", title: "Samma app, olika sätt att skicka", sources: ["chat", "gsma"], paragraphs: [
        "SMS är traditionella textmeddelanden. MMS är en separat meddelandetjänst för multimedieinnehåll. RCS står för Rich Communication Services och tillför en bredare uppsättning meddelandefunktioner. Alla tre kan förekomma i samma app, vilket gör att skillnaden inte alltid syns förrän användaren skickar en bild, kontrollerar status eller byter mottagare.",
        "Det är därför missvisande att beskriva RCS som en helt ny inkorg som alla måste installera. Samtidigt är det lika missvisande att säga att RCS är ett vanligt SMS med dekorationer. Funktionerna och leveransförutsättningarna skiljer sig. Ett företag behöver välja kanal efter budskap, mottagarstöd och hur viktigt det är att ett reservmeddelande kan skickas."
      ] },
      { id: "innehall", title: "Text, bilder och interaktiva val", sources: ["business", "cards", "features"], paragraphs: [
        "Ett textmeddelande fungerar ofta bra för ett kort besked. När mottagaren behöver se ett föremål eller välja mellan alternativ ger företags-RCS fler sätt att presentera informationen. Googles företagsdokumentation beskriver rich cards med media, rubrik, beskrivning och förslag, samt karuseller med flera kort.",
        "En bild via MMS är inte samma sak som ett rich card. Kortet samlar innehåll och val i en struktur. Föreslagna svar låter mottagaren välja ett förskrivet svar, medan föreslagna åtgärder erbjuder en handling, till exempel att öppna en länk. Det kan minska antalet steg, men vissa åtgärder lämnar chatten. Alla aktiviteter behöver alltså inte kunna slutföras inne i meddelandeappen.",
        "Hur korten återges och vilka funktioner som fungerar beror på mottagarens stöd. Företaget behöver testa innehållet i de klienter som faktiskt ska användas, inte bara i en snygg förhandsvisning på en dator."
      ] },
      { id: "data", title: "RCS använder wifi eller mobildata", sources: ["chat", "security"], paragraphs: [
        "Google beskriver RCS-chattar som meddelanden som skickas över wifi eller mobildata. SMS och MMS är separata tjänster och deras leverans hanteras fortsatt via operatören. Att meddelandena visas bredvid varandra i appen innebär därför inte att deras tekniska förutsättningar är identiska.",
        "För mottagaren spelar uppkoppling och inställningar roll. För företaget spelar även marknad, operatör och stöd för företagsavsändaren roll. Ett telefonnummer i en kontaktlista är inte i sig en bekräftelse på att just det planerade RCS-innehållet kan levereras till numret."
      ] },
      { id: "status", title: "Skickat, levererat och läst betyder olika saker", sources: ["chat", "events", "send"], paragraphs: [
        "RCS kan ge läskvitton och andra händelser som gör kommunikationen lättare att följa. I Google Messages är skickat, levererat och läst olika statusar. I ett företagsflöde kommer informationen ofta som händelser till företagets integration. Ett godkänt API-anrop är inte en leveranskvittens.",
        "En SMS-tjänst kan också rapportera leveransstatus, men man ska inte behandla den som ett läskvitto. På motsvarande sätt ska ett RCS-läskvitto inte tolkas som ett köp, en godkänd bokning eller ett samtycke. Välj mått som motsvarar det ni faktiskt vill följa: teknisk leverans, öppning, användarval eller ett resultat i ert eget system."
      ] },
      { id: "fallback", title: "RCS som SMS-reserv kräver ett tydligt flöde", sources: ["chat", "send", "practice"], paragraphs: [
        "Google Messages har inställningar för omsändning som SMS eller MMS när RCS inte är tillgängligt. Det är ett exempel på fallback, alltså att byta till en alternativ kanal. Den konsumentfunktionen är inte ett bevis för att samma hantering ingår i varje företagsplattform.",
        "I Googles företags-API kan en mottagare utan stöd ge ett fel som avsändarens system behöver hantera. Leverantören eller företagets integration kan då välja en annan kanal. Fördröjd leverans kräver särskild omsorg: om ett RCS-meddelande fortfarande väntar på leverans kan ett för tidigt reserv-SMS göra att kunden får samma besked två gånger.",
        "Reservmeddelandet behöver också skrivas för sitt format. En karusell går inte att återskapa som vanlig SMS-text. Bestäm vilken information som måste finnas kvar, vilken länk som leder vidare och hur ni undviker att ett gammalt erbjudande eller en passerad påminnelse levereras sent."
      ] },
      { id: "val", title: "När är RCS ett bra val?", sources: ["features", "practice"], paragraphs: [
        "RCS är värt att undersöka när budskapet behöver en synlig företagsprofil, bilder eller strukturerade svar. Ett tänkt bokningsflöde kan till exempel visa två svarsalternativ i stället för att be kunden skriva ett fritt svar. En produktvisning kan samla bild och länk på samma kort. Exemplen beskriver utformning, inte utlovade resultat.",
        "Ett kort textbesked kan fortfarande passa bra i en enklare kanal. Bedöm inte valet enbart efter antal funktioner. Jämför vad ni behöver skicka, vilka kunder som kan ta emot det, den aktuella tjänstens pris och hur leveransproblem hanteras. Det finns ingen generell procentsiffra som bevisar att RCS alltid ger bättre resultat än SMS."
      ] }
    ]
  },
  {
    slug: "rcs-for-foretag", title: "RCS för företag: vad är RCS Business Messaging?", category: "För företag", published: "2026-11-01",
    description: "Så skiljer sig företags-RCS från privat chatt. En genomgång av RBM, företagsagenten, avsändarprofilen och frågorna ni behöver besvara innan ett utskick.",
    keywords: ["rcs för företag", "rcs business messaging", "rbm", "skicka rcs", "rcs utskick"], related: ["verifierad-avsandare", "rich-cards-karuseller", "rcs-api-webhooks"],
    sections: [
      { id: "rbm", title: "RBM är företagsanvändningen av RCS", sources: ["gsma", "agent", "business"], paragraphs: [
        "RCS Business Messaging, ofta förkortat RBM, handlar om att företag kommunicerar med användare genom RCS. RCS är den bredare meddelandestandarden. RBM används för företagskommunikationen och ska skiljas från P2P, alltså privatpersoner som chattar med varandra.",
        "Googles företagsplattform kallas RCS for Business och har dokumentation för agenter, meddelanden och integrationer. Den visar hur Googles plattform fungerar, men är inte en komplett beskrivning av alla leverantörers erbjudanden. Det är viktigt när ni jämför tjänster: en funktion i Googles dokumentation behöver också finnas i den lösning ni faktiskt väljer.",
        "GSMA:s Universal Profile omfattar både konsumentfunktioner och stöd för företagsmeddelanden. Det ger en gemensam grund, men gör inte företags-RCS till samma produkt som en privat chatt. Avsändarhantering, åtkomst och integrationsflöden har andra förutsättningar."
      ] },
      { id: "agent", title: "Företaget representeras av en agent", sources: ["agent", "verification", "business"], paragraphs: [
        "I Googles RBM-modell är en agent en programmatisk avsändare som representerar ett varumärke. Agenten har en profil med information om företaget. För mottagaren kan profilen visas med namn, logotyp och en verifieringsmarkering. Det är ett mer identifierbart avsändarsammanhang än att bara visa ett telefonnummer.",
        "Att skapa en agent är inte samma sak som att vara redo för ett publikt utskick. Google beskriver en verifierings- och lanseringsprocess. Företagets representant behöver bekräfta uppgifterna och behörigheten för den partner som hanterar agenten. Kontrollera med er leverantör vilka steg som gäller, vem som gör dem och när avsändaren kan användas.",
        "Agent är inte synonymt med AI. Avsändaren kan skicka förutbestämda meddelanden, hantera fasta svar eller vara kopplad till ett kundsystem. Om AI används är det ett separat val i verksamhetens system, inte ett krav för att använda RCS."
      ] },
      { id: "anvandning", title: "Börja med ett konkret kundärende", sources: ["features", "cards", "practice"], paragraphs: [
        "Ett bra första användningsfall går att förklara utan att nämna tekniken. Kunden behöver veta var leveransen är, bekräfta en tid eller få en tydlig bild av en produkt. Därefter väljer ni vilka delar av RCS som gör just den uppgiften enklare.",
        "I ett tänkt tidsbokningsflöde kan meddelandet innehålla den bokade tiden och två val: bekräfta eller begära ombokning. Ett föreslaget svar skickar ett val tillbaka till företaget; företagets system behöver sedan hantera det. Knappen bokar alltså inte om tiden av sig själv. I ett tänkt produktflöde kan ett rich card samla bild, beskrivning och länk, medan köpet sker på webbplatsen.",
        "Det är ofta bättre att göra ett litet ärende tydligt än att visa alla möjliga funktioner. Välj få alternativ och formulera dem så att mottagaren förstår vad som händer efter ett tryck. Märk exemplen som exempel och dra inte slutsatser om försäljning eller klickfrekvens utan egna mätningar."
      ] },
      { id: "satt", title: "Webbgränssnitt eller integration?", sources: ["send", "webhooks"], paragraphs: [
        "Ett webbgränssnitt är ett sätt för människor i företaget att skapa och hantera meddelanden. En API-integration är ett sätt för era system att starta ett flöde. Valet handlar därför mycket om vad som utlöser kommunikationen: ett manuellt kampanjbeslut eller en händelse som en bokning, order eller statusändring.",
        "Vid en integration behöver ni även ta hand om inkommande svar och leveranshändelser. Googles dokumentation beskriver webhooks för att ta emot sådana händelser. I den tjänst ni väljer behöver ni kontrollera vilka händelser som finns, hur anrop verifieras och hur ett kundval kopplas till rätt ärende.",
        "Ingen av vägarna gör avsändarverifiering eller mottagarstöd oviktigt. De är grundförutsättningar oavsett hur meddelandet skapas. Beskrivningen här gäller uppläggen generellt och är inte en bekräftelse på att en viss integration är aktiverad på ett konto."
      ] },
      { id: "kontroll", title: "Kontrollera räckvidd, reservkanal och ansvar", sources: ["capabilities", "send", "practice"], paragraphs: [
        "En kontaktlista kan innehålla mottagare med olika telefoner, operatörer och appar. Fråga därför vilka mottagare som kan nås av den aktuella företagsagenten. Kontrollera också stöd för de funktioner ni vill använda. Stöd för RCS som kanal är inte alltid samma sak som stöd för varje kort eller åtgärd.",
        "Bestäm vad som ska hända om ett meddelande inte kan skickas eller levereras. Finns SMS-fallback? Vem skapar reservtexten? Hur undviks dubbel leverans? Vilka fel och tidsgränser måste ert system hantera? Dokumentera svaren innan ni skickar till en stor lista.",
        "Företaget behöver också ha en egen process för vilka kunder som får kontaktas och hur kundernas önskemål hanteras. Att en avsändare är verifierad eller att ett API accepterar ett telefonnummer är inte ett juridiskt klartecken för marknadsföring. Den här tekniska guiden ersätter inte en bedömning av reglerna för ert användningsfall."
      ] }
    ]
  },
  {
    slug: "verifierad-avsandare", title: "Verifierad avsändare i RCS: vad innebär märkningen?", category: "För företag", published: "2026-11-01",
    description: "Företagsnamn, logotyp och verifiering hjälper mottagaren att identifiera avsändaren. Läs vad kontrollen omfattar, hur Googles process fungerar och vad märkningen inte garanterar.",
    keywords: ["verifierad avsändare rcs", "rcs avsändare", "rcs verifiering", "rcs företagsprofil"], related: ["rcs-for-foretag", "vad-ar-rcs", "rich-cards-karuseller"],
    sections: [
      { id: "markning", title: "Märkningen hör till företagsavsändaren", sources: ["business", "verification"], paragraphs: [
        "En verifierad avsändare i företags-RCS är en företagsavsändare som har gått igenom den aktuella tjänstens verifieringsprocess. Google Messages beskriver företagschattar med företagsnamn, logotyp och verifieringsmarkering. Syftet är att göra det tydligare vilken registrerad företagsavsändare användaren pratar med.",
        "Det är inte en egenskap hos alla meddelanden som använder RCS. En privat RCS-chatt är något annat än en verifierad företagsagent. Om ni vill använda en företagsprofil behöver ni ta reda på vilken registrering, verifiering och lansering som gäller för den leverantör och de marknader ni väljer.",
        "Markeringen ska inte heller blandas ihop med leveransmarkeringarna bredvid ett meddelande. Avsändarverifiering handlar om avsändaren. En leveranskvittens handlar om ett enskilt meddelandes status. Ett läskvitto är ytterligare en annan signal."
      ] },
      { id: "process", title: "Vad kontrolleras i Googles verifieringsprocess?", sources: ["verification", "agent"], paragraphs: [
        "Google beskriver varumärkesverifiering som ett steg där en behörig representant för varumärket bekräftar agentuppgifterna och att meddelandepartnern får hantera agenten. Verifiering krävs före lansering. Efter verifiering och lansering visar Google Messages en verifieringsmarkering vid agentnamnet.",
        "Det betyder att behörighet och kopplingen mellan agent och varumärke är centrala. Företaget bör veta vem som är dess representant, vilken partner som arbetar med avsändaren och vilka uppgifter som ska visas. Håll kontaktuppgifterna aktuella så att processen inte blir beroende av en person som har lämnat företaget.",
        "Processen är Googles beskrivning av dess plattform. Exakt hantering, underlag och tidplan behöver bekräftas av den partner som hjälper er. Ange inte en generell handläggningstid och utgå inte från att samma godkännande automatiskt omfattar varje nät eller marknad."
      ] },
      { id: "profil", title: "Företagsprofilen behöver vara tydlig även utan en symbol", sources: ["agent", "business"], paragraphs: [
        "Avsändarprofilen kan innehålla företagsinformation som namn och logotyp. Välj uppgifter som mottagaren känner igen. Om kunden handlar från ett varumärke men får ett meddelande med ett obekant namn kan kommunikationen fortfarande upplevas som oklar, även när avsändaren är registrerad.",
        "Tänk också på kopplingen mellan profil och budskap. Ett leveransbesked ska förklara vilken beställning eller händelse det gäller utan att be om fler uppgifter än nödvändigt. En länk bör leda till en destination som stämmer med det meddelandet säger att den gör. Verifieringsmarkeringen ersätter inte begriplig text och en genomtänkt kundupplevelse.",
        "Testa profilen och meddelandet tillsammans. Granska vad som syns innan kunden öppnar chatten, hur logotypen fungerar i liten storlek och om de valbara åtgärderna beskriver sitt nästa steg. Det är redaktionella och praktiska kvalitetskontroller, inte nya delar av den tekniska verifieringen."
      ] },
      { id: "garanti", title: "Verifiering är inte en garanti för allt innehåll", sources: ["verification", "security"], paragraphs: [
        "En identitets- och behörighetskontroll ska inte beskrivas som en garanti för att varje framtida meddelande är ofarligt, att ett erbjudande är bra eller att en länk aldrig kan leda fel. Den säger inte heller att företaget är oberoende kvalitetsgranskat. Håll beskrivningen nära vad verifieringsprocessen faktiskt kontrollerar.",
        "Verifiering säger dessutom något annat än kryptering. En synlig företagsprofil bevisar inte att konversationen har end-to-end-kryptering. Googles säkerhetsbeskrivningar för privata RCS-konversationer får inte flyttas över till företagsmeddelanden utan stöd för just den lösningen.",
        "För en mottagare är det rimligt att kontrollera innehållet även när avsändaren är märkt. Om en oväntad begäran gäller känsliga uppgifter kan kunden använda företagets välkända kontaktväg för att kontrollera ärendet. Företaget bör skriva meddelanden som inte gör mottagaren beroende av att lita på en enda symbol."
      ] },
      { id: "forbered", title: "Vad bör företaget förbereda?", sources: ["agent", "verification"], paragraphs: [
        "Samla rätt varumärkesuppgifter och bestäm vem som får bekräfta dem. Fråga leverantören vilka underlag som behövs, hur agenten testas och hur lansering hanteras. Skilj mellan ett test av utseendet och ett godkännande för publika utskick.",
        "Skriv också ned hur uppgifter ska uppdateras när företaget byter namn, logotyp eller kontaktperson. Det gör avsändaren lättare att förvalta. En verifierad profil är inte bara en engångsuppgift inför första kampanjen; den behöver fortsätta stämma med det företag mottagaren förväntar sig att höra från."
      ], points: ["Rätt företagsnamn och igenkännbar logotyp.", "En behörig kontaktperson för varumärket.", "Bekräftad partner, process och lanseringsomfattning.", "En rutin för ändrade profil- och kontaktuppgifter."] }
    ]
  },
  {
    slug: "rich-cards-karuseller", title: "Rich cards, karuseller och knappar i RCS", category: "Meddelanden", published: "2026-11-01",
    description: "Så fungerar rich cards och karuseller i företags-RCS. Skillnaden mellan ett föreslaget svar och en åtgärd, med praktiska exempel och begränsningar att testa.",
    keywords: ["rcs rich cards", "rcs karusell", "rcs knappar", "rcs bilder", "rcs föreslagna svar"], related: ["rcs-for-foretag", "rcs-api-webhooks", "rcs-vs-sms"],
    sections: [
      { id: "kort", title: "Ett rich card samlar ett sammanhängande budskap", sources: ["cards"], paragraphs: [
        "Ett rich card är ett strukturerat meddelandekort i företags-RCS. I Googles dokumentation kan kortet kombinera media, rubrik, beskrivning och förslag. Ett kort behöver innehålla media, rubrik eller beskrivning; alla delar är alltså inte alltid obligatoriska.",
        "Kortets viktigaste uppgift är att hålla ihop information som hör samman. För ett tänkt produktmeddelande kan bilden visa produkten, rubriken namnge den och beskrivningen ge de uppgifter kunden behöver innan den öppnar produktsidan. För ett tänkt servicebesked kan texten vara viktigare än bilden.",
        "Ett rich card är inte bara en bild av en färdig annons. Om all information bäddas in i bilden blir den svårare att läsa när visningen ändras. Låt textdelarna bära den nödvändiga informationen och använd media där den faktiskt hjälper mottagaren att förstå innehållet."
      ] },
      { id: "karusell", title: "En karusell låter mottagaren bläddra mellan kort", sources: ["cards", "capabilities"], paragraphs: [
        "En karusell är en följd av rich cards som mottagaren kan bläddra mellan. Googles RBM-dokumentation beskriver karuseller med vertikala kort. Formatet kan passa när flera alternativ behöver presenteras på ett liknande sätt, till exempel ett mindre urval produkter eller olika typer av tjänster.",
        "En karusell är mindre självklar när budskapet egentligen är ett enda viktigt besked. Om kunden måste svepa för att hitta sin bokade tid har formatet gjort uppgiften svårare. Lägg inte nödvändig information på ett senare kort bara för att få plats med mer visuellt innehåll först.",
        "Återgivningen påverkas av enhet och skärmstorlek. Rubriker, beskrivningar och media behöver testas i de klienter som stöds. Företaget måste också kontrollera mottagarens kapabiliteter; stöd för RCS innebär inte att varje funktion i ett planerat meddelande är tillgänglig."
      ] },
      { id: "svar", title: "Föreslagna svar skickar ett val tillbaka", sources: ["features", "events"], paragraphs: [
        "Ett föreslaget svar är ett förskrivet svarsalternativ som mottagaren kan trycka på. Det passar när ett fåtal svar räcker, till exempel ett val mellan att bekräfta en tid och att be om hjälp. Kunden slipper formulera ett fritt svar, men ska fortfarande förstå vad valet betyder.",
        "När ett förslag väljs kan agentens system få en händelse med text och postback-data. Postback-data är information som hjälper integrationen att identifiera valet. Den synliga knapptexten kan säga vad kunden väljer, medan systemet använder en stabil identifierare för att hitta rätt ärende eller nästa steg.",
        "Svaret behöver få en meningsfull följd. Om kunden väljer att begära ombokning ska företaget kunna ta hand om begäran. Att visa knappen utan att hantera svaret skapar ett skenbart arbetsflöde. Bekräfta vad som har hänt och skilj mellan en mottagen begäran och en genomförd förändring."
      ] },
      { id: "atgard", title: "En åtgärdsknapp är något annat än ett svar", sources: ["features", "events"], paragraphs: [
        "En föreslagen åtgärd erbjuder en handling. Vad den gör beror på åtgärdstyp och stöd. Ett exempel är att öppna en webbadress. Ett föreslaget svar uttrycker i stället ett val i konversationen. Skillnaden spelar roll både för texten på knappen och för vad företagets system förväntar sig att ta emot.",
        "Skriv knapptexten efter nästa steg. Om åtgärden öppnar en bokningssida är det tydligare att säga det än att ge intrycket att tiden bokas direkt. Om den öppnar en produktsida bör det vara väntat att kunden lämnar meddelandeappen. Alla RCS-åtgärder sker alltså inte inne i chatten.",
        "Ett knapptryck är inte alltid samma sak som att uppgiften är slutförd. En öppnad länk behöver skiljas från ett köp eller en bokning i uppföljningen. Koppla resultatmätningen till det system där den faktiska aktiviteten sker, i stället för att räkna alla val som färdiga kundärenden."
      ] },
      { id: "test", title: "Testa innehållet och reservversionen tillsammans", sources: ["cards", "capabilities", "practice"], paragraphs: [
        "Granska först meddelandets läsordning: vad förstår kunden innan den trycker eller sveper? Testa sedan långa rubriker, olika bildformat och korta skärmar. Förhandsvisningen i ett verktyg är användbar men ersätter inte ett test i en faktisk meddelandeklient.",
        "Om flödet kan använda SMS-fallback behöver ett enklare meddelande ge samma viktiga besked. En bildkarusell går inte att konvertera till SMS utan att någon bestämmer vilken text och destination som ska bevaras. Förbered den versionen innan utskicket, inte först när leveransen misslyckas.",
        "Dessa exempel beskriver funktioner i Googles företagsdokumentation och redaktionella sätt att använda dem. De bekräftar inte att varje format är tillgängligt på alla konton, operatörer eller marknader. Be er leverantör specificera stödet för de meddelanden ni vill skapa."
      ], points: ["Ett tydligt huvudbudskap före valen.", "Knapptext som stämmer med nästa steg.", "Hantering av kundens svar i företagets system.", "Test på stödda enheter och en färdig reservtext."] }
    ]
  },
  {
    slug: "rcs-api-webhooks", title: "RCS API, webhooks och SMS-fallback: så hänger det ihop", category: "Integration", published: "2026-11-01",
    description: "Ett accepterat API-anrop är inte ett levererat meddelande. Förstå kapabilitetskontroller, leveranshändelser, inkommande svar och hur en reservkanal behöver hanteras.",
    keywords: ["rcs api", "rcs webhook", "rcs sms fallback", "rcs leveranskvittens", "rcs integration"], related: ["rcs-for-foretag", "rcs-vs-sms", "rich-cards-karuseller"],
    sections: [
      { id: "api", title: "API:et startar flödet, det avslutar inte leveransen", sources: ["send", "events"], paragraphs: [
        "Ett API är ett programmerbart gränssnitt mellan system. I ett RCS-flöde kan företagets system skicka en förfrågan om ett meddelande när något händer, till exempel när en order får en ny status. Googles RCS for Business-dokumentation beskriver hur en agent använder dess API för att skicka meddelanden.",
        "Det omedelbara svaret på förfrågan ska hållas isär från den senare leveransen. Att ett anrop har accepterats betyder inte att mottagarens telefon har fått meddelandet. Och ett levererat meddelande betyder inte att kunden har läst det. Integrationen behöver därför hantera flera steg i stället för en enda etikett som säger lyckat.",
        "Exakta adressvägar, fält, autentiseringsmetoder och felkoder är leverantörsspecifika. Ett kodexempel för Google är inte automatiskt ett exempel för en annan tjänst. Använd dokumentationen för det API ni faktiskt kopplar till och behandla generella exempel som förklaringar, inte som färdiga produktionsanrop."
      ] },
      { id: "kapabilitet", title: "Kontrollera mottagarens stöd före avancerat innehåll", sources: ["capabilities", "send"], paragraphs: [
        "En kapabilitetskontroll kan hjälpa till att avgöra om en mottagare kan kommunicera med en RBM-agent och vilka funktioner som stöds. Den frågan är mer specifik än om personen äger en Android-telefon eller en iPhone. App, operatör, marknad och inställningar kan påverka utfallet.",
        "Google beskriver olika fel för olika situationer. En mottagare utan RCS-stöd kan ge 404 NOT_FOUND. Ett meddelande med en funktion som inte stöds kan ge 400 INVALID_ARGUMENT. De betyder inte samma sak och ska inte hanteras som en generell instruktion att skicka ett identiskt meddelande igen.",
        "Planera för att stödet kan påverka vilket innehåll som skickas. Om ett enklare meddelande går att använda behöver den versionen vara genomtänkt. Om en annan kanal krävs behöver valet göras enligt ett uttryckligt flöde. Ett tekniskt fel bör inte lämna kundärendet utan en definierad nästa åtgärd."
      ] },
      { id: "webhook", title: "Webhooks tar emot det som händer senare", sources: ["webhooks", "events"], paragraphs: [
        "En webhook är en mottagningsadress dit plattformen kan skicka händelser över HTTPS. I ett företagsflöde kan händelserna gälla leverans, lässtatus, inkommande meddelanden eller val som kunden gör. Då behöver företagets integration inte behandla det första API-svaret som hela sanningen om kommunikationen.",
        "När ett förslag väljs kan händelsen innehålla text och postback-data. Integrationen använder informationen för att förstå vilket val som gjordes. Knyt händelsen till rätt meddelande och rätt kundärende, och skilj mellan en begäran och den faktiska ändringen i ert order-, boknings- eller supportsystem.",
        "Googles webhook-dokumentation innehåller även verifiering av inkommande anrop. En publik mottagningsadress måste kunna avgöra om en händelse verkligen kommer från den förväntade plattformen. Att bara ta emot JSON gör inte anropet betrott. Följ den aktuella leverantörens instruktioner för kontrollen."
      ] },
      { id: "status", title: "Mät leverans, läsning och resultat var för sig", sources: ["events", "chat"], paragraphs: [
        "Ett tydligt flöde skiljer minst på att meddelandet accepterats, att det levererats och att en läshändelse har rapporterats. Till det kommer kundens svar och resultatet av en eventuell åtgärd. Vilka statusar och händelser som finns behöver bekräftas i er tjänst.",
        "Ett läskvitto är inte ett samtycke och ett knapptryck är inte ett genomfört köp. Om ni vill följa om en bokning bekräftades behöver integrationen kontrollera det i bokningssystemet. Om ni bara mäter klick beskriver siffran en interaktion, inte nödvändigtvis ett färdigt resultat.",
        "Dokumentera vad varje mått betyder så att statistik från olika kanaler inte blandas ihop. En leveranshändelse från en tjänst och en läshändelse från en annan kan vara användbara var för sig, men jämförelsen blir fel om båda kallas öppningar."
      ] },
      { id: "reserv", title: "SMS-fallback behöver mer än ett reservnummer", sources: ["send", "practice"], paragraphs: [
        "Fallback betyder att använda en alternativ kanal när RCS inte kan användas eller levereras enligt flödets villkor. I Googles företagsmodell kan avsändarens infrastruktur behöva välja den andra kanalen. Det är inte en allmän garanti om att varje meddelande automatiskt blir ett SMS.",
        "Bestäm när reservkanalen ska väljas och vad som händer med ett meddelande som fortfarande väntar på leverans. Google rekommenderar att leveransläget kontrolleras för att undvika dubbla meddelanden. Kunden ska inte få ett reserv-SMS och sedan ett sent RCS-besked med samma innehåll utan att det var avsikten.",
        "Bestäm också en relevant giltighetstid för ärendet och skriv reservtexten separat. En passerad tidsbokning ska inte få samma påminnelse som en kommande. Ett rich card behöver en enklare textversion där det viktigaste och eventuell länk finns kvar. Bekräfta vilka möjligheter till tidsgränser och återkallande er leverantör faktiskt erbjuder."
      ] },
      { id: "lista", title: "Frågor att ta med till integrationsarbetet", sources: ["webhooks", "capabilities", "practice"], paragraphs: [
        "Börja med ett avgränsat testfall och följ hela vägen från ett accepterat anrop till den händelse som kommer tillbaka. Testa även en mottagare eller ett innehåll som inte stöds. Det är i de avvikande flödena som antaganden om leverans och fallback brukar bli synliga.",
        "Guiden beskriver principer och Googles dokumenterade RBM-flöde. Den är inte en bekräftelse på vilka endpoints, webhooks eller reservkanaler som är aktiverade hos RCS Direkt. För en konkret integration behövs dokumentation och bekräftat stöd för det aktuella kontot."
      ], points: ["Vad betyder det första API-svaret?", "Hur kopplas senare händelser till rätt meddelande?", "Hur verifieras inkommande webhook-anrop?", "När används reservkanalen och hur undviks dubbel leverans?", "Vilka funktioner och marknader stöds för den aktuella agenten?"] }
    ]
  }
];

export type GlossaryTerm = { term: string; aliases: string; definition: string; source: string; article: string };
const glossaryEntries: GlossaryTerm[] = [
  { term: "Agent", aliases: "företagsagent", definition: "En programmatisk företagsavsändare i Googles RBM-modell. Agenten representerar ett varumärke och använder plattformens API för att kommunicera med mottagare. Agent betyder inte automatiskt AI.", source: "agent", article: "rcs-for-foretag" },
  { term: "Agentprofil", aliases: "avsändarprofil företagsprofil", definition: "Den företagsinformation som hör till en agent, exempelvis namn och logotyp. Profilen hjälper mottagaren att identifiera företagsavsändaren i meddelandeappen.", source: "agent", article: "verifierad-avsandare" },
  { term: "API", aliases: "application programming interface integration", definition: "Ett programmerbart gränssnitt som låter system skicka förfrågningar till en tjänst. Fält, autentisering och funktioner beror på vilket API som används.", source: "send", article: "rcs-api-webhooks" },
  { term: "Asynkron leverans", aliases: "asynchronous", definition: "Leverans som sker efter den ursprungliga förfrågan. Det första API-svaret är inte en leveranskvittens; senare händelser kan beskriva vad som hände med meddelandet.", source: "events", article: "rcs-api-webhooks" },
  { term: "Brand verification", aliases: "varumärkesverifiering", definition: "Googles process där en behörig varumärkesrepresentant bekräftar agentuppgifterna och partnerns behörighet. Ett steg före lansering, inte en garanti för allt innehåll.", source: "verification", article: "verifierad-avsandare" },
  { term: "Capability check", aliases: "kapabilitetskontroll mottagarstöd", definition: "En kontroll av om en mottagare kan kommunicera med en RBM-agent och vilka funktioner som stöds. Stöd för kanalen och stöd för en särskild funktion är olika frågor.", source: "capabilities", article: "rcs-api-webhooks" },
  { term: "Fallback", aliases: "sms fallback reservkanal", definition: "Byte till en alternativ kanal när den första inte kan användas enligt flödets villkor. SMS-fallback måste bekräftas hos leverantören och är inte automatiskt en del av alla RCS-tjänster.", source: "practice", article: "rcs-api-webhooks" },
  { term: "Föreslagen åtgärd", aliases: "suggested action knapp", definition: "Ett val som erbjuder en handling, till exempel att öppna en länk. Handlingen beror på åtgärdstypen och stödet; den behöver inte slutföras inne i chatten.", source: "features", article: "rich-cards-karuseller" },
  { term: "Föreslaget svar", aliases: "suggested reply snabbsvar", definition: "Ett förskrivet svarsalternativ som mottagaren kan välja. Agentens system kan få en händelse med det valda svaret och tillhörande data.", source: "events", article: "rich-cards-karuseller" },
  { term: "Karusell", aliases: "carousel rich card", definition: "En följd av meddelandekort som mottagaren kan bläddra mellan. Googles RBM-dokumentation beskriver karuseller med vertikala rich cards; återgivning och stöd behöver testas.", source: "cards", article: "rich-cards-karuseller" },
  { term: "Leveranskvittens", aliases: "delivery receipt delivered", definition: "En händelse som anger leverans till mottagarens enhet enligt tjänstens rapportering. Den skiljer sig från att ett API har accepterat en begäran och från ett läskvitto.", source: "events", article: "rcs-api-webhooks" },
  { term: "Läskvitto", aliases: "read receipt read", definition: "En signal om lässtatus från meddelandeklienten. Det är inte ett bevis för förståelse, samtycke eller ett genomfört köp.", source: "chat", article: "rcs-api-webhooks" },
  { term: "MaaP", aliases: "messaging as a platform", definition: "Messaging as a Platform. Ett GSMA-begrepp för plattformsstöd som möjliggör företagsmeddelanden inom RCS-ekosystemet.", source: "gsma", article: "rcs-for-foretag" },
  { term: "MMS", aliases: "multimedia messaging service", definition: "Multimedia Messaging Service, en meddelandetjänst för multimedieinnehåll. MMS är en separat teknik och inte samma sak som ett interaktivt RCS-kort.", source: "chat", article: "rcs-vs-sms" },
  { term: "Operatör", aliases: "mobiloperatör carrier", definition: "Mobilnätsleverantören. Operatör, region och användarens inställningar kan påverka om RCS är tillgängligt.", source: "chat", article: "vad-ar-rcs" },
  { term: "P2P", aliases: "person to person privat chatt", definition: "Person till person: meddelanden mellan privatpersoner. Funktioner och säkerhetsuppgifter för P2P ska inte utan vidare tillämpas på företags-RCS.", source: "security", article: "rcs-for-foretag" },
  { term: "Postback-data", aliases: "postbackData användarval", definition: "Data som följer med ett valt svar eller en åtgärd till agentens system. Den kan hjälpa integrationen att identifiera valet utan att bara tolka den synliga knapptexten.", source: "events", article: "rich-cards-karuseller" },
  { term: "RBM", aliases: "rcs business messaging rcs for business", definition: "RCS Business Messaging, företagsanvändningen av RCS. Googles företagsplattform har egna API:er och en agentmodell; dess dokumentation fastställer inte alla andra leverantörers funktioner.", source: "agent", article: "rcs-for-foretag" },
  { term: "RCS", aliases: "rich communication services", definition: "Rich Communication Services. En meddelandestandard med stöd för fler funktioner än enbart text. RCS är inte namnet på en enda app eller en enhetlig leverantörstjänst.", source: "gsma", article: "vad-ar-rcs" },
  { term: "RCS-chatt", aliases: "rcs meddelande", definition: "En konversation som använder RCS. Google Messages beskriver chatt över wifi eller mobildata med bland annat bilddelning, skrivindikatorer och läskvitton där det stöds.", source: "chat", article: "vad-ar-rcs" },
  { term: "RCS-klient", aliases: "meddelandeapp messages", definition: "Appen eller programmet på enheten som hanterar RCS. En meddelandeapp kan även använda SMS och MMS, och klientens stöd påverkar upplevelsen.", source: "chat", article: "vad-ar-rcs" },
  { term: "Rich card", aliases: "rikt kort meddelandekort", definition: "Ett strukturerat RBM-kort som kan kombinera media, rubrik, beskrivning och förslag. I Googles modell behöver kortet innehålla media, rubrik eller beskrivning.", source: "cards", article: "rich-cards-karuseller" },
  { term: "Skrivindikator", aliases: "typing indicator", definition: "En signal i en konversation som visar att den andra parten skriver. Google beskriver funktionen i RCS-chattar; den ska inte antas finnas i alla företagsflöden.", source: "chat", article: "vad-ar-rcs" },
  { term: "SMS", aliases: "short message service sms meddelande", definition: "Short Message Service, traditionella textmeddelanden. SMS är en annan meddelandeteknik än RCS även när båda visas i samma app.", source: "chat", article: "rcs-vs-sms" },
  { term: "Universal Profile", aliases: "gsma standard", definition: "GSMA:s branschöverenskomna uppsättning RCS-funktioner och tekniska förutsättningar. Den gemensamma grunden är inte ett löfte om identisk funktion på alla enheter.", source: "gsma", article: "vad-ar-rcs" },
  { term: "Verifierad avsändare", aliases: "verified sender", definition: "En företagsavsändare vars identitet och behörighet har godkänts enligt en definierad process. Verifiering ska inte blandas ihop med kryptering eller en garanti för varje meddelandes innehåll.", source: "verification", article: "verifierad-avsandare" },
  { term: "Webhook", aliases: "https händelse callback", definition: "En HTTPS-adress som tar emot händelser från en plattform, exempelvis leveranshändelser eller kundsvar. Inkommande anrop behöver verifieras enligt leverantörens instruktioner.", source: "webhooks", article: "rcs-api-webhooks" },
];

const guides: Article[] = [...baseArticles, ...grunderArticles, ...foretagArticles, ...teknikArticles].map((article) => {
  const content = shortContent[article.slug];
  if (!content) return article;
  return { ...article, title: content.title, description: content.description, sections: [{ id: "det-har-galler", title: "Det här gäller", paragraphs: [], points: content.points, sources: [...new Set(article.sections.flatMap((section) => section.sources))] }] };
});

const dedicatedTerms: Record<string, string> = {
  RCS: "vad-ar-rcs", "Verifierad avsändare": "verifierad-avsandare", "Universal Profile": "universal-profile",
  "Capability check": "kapabilitetskontroll", Fallback: "rcs-fallback-sms", "Föreslaget svar": "foreslagna-svar",
};
function termSlug(term: string) {
  return dedicatedTerms[term] ?? `begrepp-${term.toLocaleLowerCase("sv").replaceAll("å", "a").replaceAll("ä", "a").replaceAll("ö", "o").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

export const glossary = glossaryEntries.map((entry) => ({ ...entry, article: termSlug(entry.term) }));

const termArticles: Article[] = glossaryEntries.filter((entry) => !dedicatedTerms[entry.term]).map((entry) => ({
  slug: termSlug(entry.term), title: `Vad är ${entry.term}?`, description: entry.definition,
  category: "Begrepp", keywords: [entry.term, entry.aliases], published: "2026-11-01", related: [entry.article],
  sections: [{ id: "det-har-galler", title: "Det här gäller", paragraphs: [], points: termDetails[entry.term] ?? [], sources: [entry.source] }],
}));

export const articles: Article[] = [...guides, ...termArticles];

export function searchArticles(query: string, category = "Alla") {
  const needle = query.trim().toLocaleLowerCase("sv");
  return articles.filter((article) => (category === "Alla" || article.category === category) && [article.title, article.description, ...article.keywords].join(" ").toLocaleLowerCase("sv").includes(needle));
}

export function searchGlossary(query: string) {
  const needle = query.trim().toLocaleLowerCase("sv");
  return glossary.filter((entry) => [entry.term, entry.aliases, entry.definition].join(" ").toLocaleLowerCase("sv").includes(needle));
}