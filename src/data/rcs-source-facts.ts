import type { Source } from "./rcs-knowledge";

export type SourceFact = { sourceId: string; finding: string; implication: string };

// Findings describe the original publisher's service, not RCS Direkt's results.
export const sourceFacts: Record<string, SourceFact> = {
  gsma: { sourceId: "gsma", finding: "Universal Profile är GSMA:s gemensamma tekniska grund för RCS.", implication: "En gemensam standard innebär inte att varje operatör eller app har infört samma funktioner." },
  chat: { sourceId: "chat", finding: "Google Meddelanden använder wifi eller mobildata för RCS och visar anslutningsstatus i appen.", implication: "Kontrollera både anslutningen och kanalen i det aktuella samtalet; en påslagen inställning räcker inte." },
  business: { sourceId: "business", finding: "Google beskriver företags-RCS separat från privata chattar, med företagsprofil och möjlighet att blockera avsändaren.", implication: "Privat RCS-stöd ska inte användas som bevis för att en viss företagsavsändare når kunden." },
  apple: { sourceId: "apple", finding: "Apple anger iOS 18 eller senare och en operatör med RCS-stöd som förutsättningar på iPhone.", implication: "Systemversionen ensam ger inget säkert besked om stödet på ett svenskt abonnemang eller för företagsutskick." },
  "apple-carriers": { sourceId: "apple-carriers", finding: "Apple publicerar operatörsfunktioner per land och operatör i sin europeiska supportlista.", implication: "Läs rätt landsavsnitt och jämför med operatörens egen information. En listuppgift avgör inte företagsräckvidden." },
  "apple-channels": { sourceId: "apple-channels", finding: "Apples Meddelanden kan använda iMessage, RCS och SMS/MMS. RCS och SMS kan båda visas med gröna bubblor.", implication: "Bubblans färg skiljer inte RCS från SMS; kanaltexten i konversationen ger bättre information." },
  security: { sourceId: "security", finding: "Google beskriver end-to-end-kryptering för kvalificerade privata RCS-konversationer i Google Meddelanden.", implication: "Det skyddet ska inte förutsättas för företags-RCS. Avsändarverifiering och kryptering är olika saker." },
  agent: { sourceId: "agent", finding: "I Googles företagsmodell representeras avsändaren av en agent med varumärkes- och kontaktuppgifter.", implication: "Agenten är en registrerad avsändare, inte automatiskt en chatbot eller AI. Kundsystemen styr vad den gör." },
  verification: { sourceId: "verification", finding: "Googles varumärkesverifiering kontrollerar varumärket och partnerns behörighet före lansering.", implication: "Godkänd identitet är varken ett kvalitetsintyg för erbjudandet eller ett tillstånd att kontakta varje mottagare." },
  cards: { sourceId: "cards", finding: "Google dokumenterar rich cards med media, rubrik, beskrivning och förslag, samt karuseller av kort.", implication: "Välj format efter innehållet och prova det på mottagarenheter. Ett rikare format ger inte i sig ett bättre resultat." },
  features: { sourceId: "features", finding: "Google skiljer föreslagna svar från åtgärder som exempelvis öppnar en webbadress.", implication: "Ett skickat svar och ett besök på en webbplats är olika händelser. Slutförd bokning måste bekräftas i bokningssystemet." },
  send: { sourceId: "send", finding: "Google dokumenterar utskick, felhantering och begränsningar för sin RCS for Business-tjänst.", implication: "Använd dokumentationen för er faktiska leverantör. Att ett anrop accepterats är inte en leveransbekräftelse." },
  events: { sourceId: "events", finding: "Google skiljer leveranshändelsen DELIVERED från läshändelsen READ för företagsmeddelanden.", implication: "Statusarna beskriver olika steg. Varken leverans eller läsning bevisar förståelse, samtycke eller köp." },
  webhooks: { sourceId: "webhooks", finding: "Googles företags-RCS skickar inkommande meddelanden och händelser till en konfigurerad webhook.", implication: "Mottagaren behöver verifiera anrop och hantera återleveranser utan att samma kundärende ändras flera gånger." },
  capabilities: { sourceId: "capabilities", finding: "Googles kapabilitetskontroll undersöker räckvidd och stödda funktioner för ett telefonnummer och en företagsagent.", implication: "Det är mer specifikt än telefonmodell eller operatörsnamn, men är inte en kvittens på ett senare utskick." },
  practice: { sourceId: "practice", finding: "Google rekommenderar relevanta meddelanden, tydliga användarval och respekt för mottagarens önskemål.", implication: "Det är vägledning, inte ett uppmätt kampanjresultat. Effekten behöver följas i den egna kundresan." },
  receive: { sourceId: "receive", finding: "Google dokumenterar inkommande kundmeddelanden, bland annat text och medieinnehåll.", implication: "Ta emot och bedöm kundens verkliga svar; en knappstyrd dialog behöver även kunna hantera annat innehåll." },
  launch: { sourceId: "launch", finding: "Google har särskilda lanseringsuppgifter och lanseringsstatus för företagsagenter.", implication: "En skapad testagent är inte samma sak som en avsändare som är godkänd för publika utskick." },
  analytics: { sourceId: "analytics", finding: "Google har separat dokumentation för mätning i RCS for Business.", implication: "Läs definitionerna bakom rapporten. Kanalstatistik och köpdata har olika ursprung och behöver kopplas ihop för affärsanalys." },
  "tele2-rcs": { sourceId: "tele2-rcs", finding: "Tele2 uppger på sin supportsida att RCS kan användas på iPhone och Android med rätt förutsättningar.", implication: "Uppgiften gäller operatörens beskrivning av privat chatt. Kontrollera just ditt abonnemang och företagsräckvidden separat." },
  "comviq-rcs": { sourceId: "comviq-rcs", finding: "Comviq beskriver RCS på iPhone och Android på sin supportsida.", implication: "Utgå från Comviqs besked för ditt nummer, inte enbart från vilket nät operatören använder." },
  "imy-objection": { sourceId: "imy-objection", finding: "IMY anger att den registrerade alltid kan invända mot behandling av personuppgifter för direktmarknadsföring.", implication: "En invändning måste få effekt i utskickssystemen. Den här rättigheten besvarar inte ensam frågor om lagringstid eller annan rättslig grund." },
  "marketing-law": { sourceId: "marketing-law", finding: "Konsumentverket beskriver krav på bland annat reklamidentifiering och att marknadsföring inte får vara vilseledande.", implication: "Ett nytt meddelandeformat ändrar inte kraven på tydlig avsändare eller belägg för påstådda kundresultat." },
};

export function factsForSources(ids: string[]): SourceFact[] {
  return [...new Set(ids)].flatMap((id) => sourceFacts[id] ? [sourceFacts[id]] : []).slice(0, 2);
}

export function factPublisher(source: Source) {
  return source.title.split(":")[0];
}