export type ShortContent = { title: string; description: string; points: string[] };

export const shortContent: Record<string, ShortContent> = {
  "vad-ar-rcs": {
    title: "Vad är RCS?",
    description: "RCS betyder Rich Communication Services. Det är en meddelandestandard för text, bilder, filer och interaktiva funktioner i en meddelandeapp. RCS är alltså inte en egen app.",
    points: ["Meddelandena skickas över wifi eller mobildata. Både appen och mottagaren behöver stöd för RCS.", "Privat RCS-chatt och företags-RCS har olika funktioner och säkerhetsvillkor. Stöd för det ena garanterar inte det andra.", "Företag kan använda registrerade avsändare med namn, logotyp och knappar. Tillgängligheten beror på tjänst, operatör och marknad."]
  },
  "rcs-vs-sms": {
    title: "Vad skiljer RCS från SMS och MMS?",
    description: "SMS skickar text. MMS kan skicka bilder och annat medieinnehåll. RCS använder internet och kan dessutom ge läskvitton, bättre mediedelning och interaktiva företagsmeddelanden. Alla tre kan visas i samma app.",
    points: ["RCS kräver wifi eller mobildata och stöd hos mottagaren. SMS behöver inte en aktiv internetanslutning, men behöver mobilnätsstöd.", "Ett SMS rymmer normalt 160 GSM-7-tecken i ett enskilt meddelande. Andra tecken och längre texter kan ge fler meddelandedelar.", "SMS-fallback är en separat reservlösning. Den ingår inte automatiskt i varje företags-RCS-tjänst."]
  },
  "rcs-for-foretag": {
    title: "Vad är RCS för företag?",
    description: "RCS Business Messaging, eller RBM, låter företag skicka meddelanden med företagsprofil, bilder och valbara svar i mottagarens meddelandeapp. Det är företagsanvändningen av RCS, inte samma tjänst som privat chatt.",
    points: ["Företaget behöver en registrerad avsändare. Googles modell använder en agent som verifieras och lanseras innan publika utskick.", "Ett webbgränssnitt passar manuella utskick. Ett API låter era egna system starta meddelanden och hantera svar.", "Kontrollera mottagarstöd, reservkanal och vilka tjänster som är aktiverade på ert konto. Verifiering är inte ett tillstånd att skicka marknadsföring till vem som helst."]
  },
  "verifierad-avsandare": {
    title: "Vad betyder verifierad avsändare?",
    description: "En verifierad företagsavsändare har genomgått tjänstens kontroll av kopplingen till varumärket och behörigheten att företräda det. Mottagaren kan se företagsnamn, logotyp och verifieringsmarkering.",
    points: ["I Googles process bekräftar en behörig varumärkesrepresentant agentuppgifterna och partnerns behörighet före lansering.", "Verifiering identifierar avsändaren. Den garanterar inte att varje länk, erbjudande eller framtida meddelande är ofarligt.", "Märkningen säger inget om end-to-end-kryptering. Företagsprofil, leveransstatus och kryptering är tre olika saker."]
  },
  "rich-cards-karuseller": {
    title: "Vad är rich cards och karuseller?",
    description: "Ett rich card samlar media, rubrik, beskrivning och val i ett strukturerat meddelandekort. En karusell är flera sådana kort som mottagaren kan bläddra mellan, till exempel olika produkter.",
    points: ["I Googles modell behöver ett kort innehålla media, rubrik eller beskrivning. Alla delar är inte obligatoriska.", "Föreslagna svar skickar tillbaka ett val. Åtgärdsknappar kan exempelvis öppna en länk och därmed lämna chatten.", "Testa återgivningen och mottagarens stöd. En karusell blir inte automatiskt ett läsbart SMS; reservtexten måste skrivas separat."]
  },
  "rcs-api-webhooks": {
    title: "Hur fungerar RCS API och webhooks?",
    description: "Ett RCS API låter era system begära ett utskick. Webhooks tar emot det som händer senare, exempelvis leverans, lässtatus och kundsvar. Det första API-svaret är inte en leveranskvittens.",
    points: ["Använd er leverantörs dokumentation för adresser, fält och autentisering. Exempel från Google gäller inte automatiskt andra API:er.", "Koppla händelser till rätt meddelande och kontrollera att inkommande webhook-anrop kommer från rätt avsändare.", "Bestäm när reserv-SMS ska användas och hur väntande RCS-meddelanden hanteras, så kunden inte får dubbla besked."]
  },
  "rcs-pa-iphone": {
    title: "Vad krävs för RCS på iPhone?",
    description: "RCS i appen Meddelanden kan ge rikare mediedelning, läskvitton och skrivindikatorer i samtal med andra telefoner. Funktionen kräver stöd från operatören och är inte tillgänglig överallt.",
    points: ["RCS kräver iOS 18 eller senare samt stöd i aktuell region och hos operatören. En uppdatering ensam räcker inte.", "Leta efter RCS-meddelanden under Inställningar, Appar, Meddelanden. Om valet saknas, kontrollera operatörens stöd.", "Privat RCS-stöd innebär inte automatiskt stöd för företags-RCS eller varje rich card. Företag behöver kontrollera sin tjänsts mottagarstöd."]
  },
  "rcs-pa-android": {
    title: "Hur fungerar RCS på Android?",
    description: "På Android används RCS ofta via Google Messages. När RCS-chattar är anslutna kan appen skicka meddelanden över wifi eller mobildata och visa läskvitton och skrivindikatorer där det stöds.",
    points: ["Öppna Google Messages, profilbilden, meddelandeinställningar och RCS-chattar för att kontrollera anslutningsstatus.", "App, operatör, nummerregistrering och mottagarens stöd påverkar om en konversation använder RCS.", "Omsändning som SMS eller MMS beror på inställningarna och tillgång till rätt nät. RCS garanterar inte leverans utan uppkoppling."]
  },
  "aktivera-rcs": {
    title: "Hur aktiverar jag RCS?",
    description: "RCS slås på i telefonens meddelandeinställningar. Funktionen behöver en internetanslutning och stöd i appen och hos operatören. Ett påslaget reglage är inte samma sak som en färdig anslutning.",
    points: ["Android: öppna Google Messages, profilbilden, meddelandeinställningar, RCS-chattar och aktivera funktionen. Kontrollera sedan status.", "iPhone: gå till Inställningar, Appar, Meddelanden och aktivera RCS-meddelanden om valet finns.", "Om anslutningen fastnar, kontrollera internet, rätt telefonnummer och uppdateringar. Ett saknat iPhone-val kan bero på operatörens eller regionens stöd."]
  },
  "vad-kostar-rcs": {
    title: "Vad kostar RCS?",
    description: "Privata RCS-chattar använder wifi eller mobildata och omfattas av kostnaden för din uppkoppling. Företagsutskick prissätts separat av tjänsten som skickar meddelandena.",
    points: ["Hos RCS Direkt: Basic 0,49 SEK, Single 0,69 SEK och Conversation 0,99 SEK per meddelande.", "Prismodellen är betalning per meddelande, utan månadsavgift eller bindningstid.", "Kontrollera vad aktuell meddelandetyp omfattar och hur eventuell SMS-reserv debiteras. Privat chatt över wifi betyder inte att företagsutskick är gratis."]
  },
  "ar-rcs-sakert": {
    title: "Är RCS säkert?",
    description: "RCS kan ha flera skydd, men verifiering och kryptering betyder olika saker. Verifiering kontrollerar företagsavsändaren. Kryptering skyddar innehållet under överföringen eller mellan ändpunkterna, beroende på lösning.",
    points: ["Google beskriver end-to-end-kryptering för vissa privata RCS-chattar. Det innebär inte att alla företagsmeddelanden har samma skydd.", "En verifieringsmarkering är inte en garanti för alla länkar eller meddelanden från avsändaren.", "Kontrollera skyddet för den tjänst ni använder. Skicka inte lösenord och undvik känsliga personuppgifter utan en bedömd, lämplig lösning."]
  },
  "rcs-historia": {
    title: "Hur utvecklades RCS?",
    description: "RCS utvecklades inom mobilbranschen för att ge meddelandetjänster fler funktioner än SMS och MMS. GSMA:s Universal Profile skapade en gemensam teknisk grund för olika aktörer.",
    points: ["Standarden är inte en enskild app. Operatörer och meddelandeappar inför stöd för den.", "Google Messages och Apples Meddelanden kan använda RCS, men tillgängligheten beror på app, operatör och region.", "En gemensam standard betyder inte att alla funktioner finns på varje enhet. Företags-RCS har dessutom egen avsändarhantering och lansering."]
  },
  "universal-profile": {
    title: "Vad är Universal Profile?",
    description: "Universal Profile är GSMA:s gemensamma uppsättning RCS-funktioner och tekniska krav. Den ger appar, nät och tjänster en gemensam grund för att kunna kommunicera.",
    points: ["Profilen beskriver tekniken. Den är varken en meddelandeapp eller ett abonnemang.", "Olika implementationer och versioner kan stödja olika funktioner. Identiskt utseende på alla telefoner är inte garanterat.", "Företag behöver fortfarande kontrollera mottagarstöd och sin leverantörs funktioner före ett utskick."]
  },
  "rcs-wifi-mobildata": {
    title: "Behöver RCS internet?",
    description: "Ja. RCS skickar meddelanden över wifi eller mobildata. Utan internet kan ett RCS-meddelande behöva vänta på leverans eller hanteras genom en separat reservkanal.",
    points: ["Google Messages kan skicka om som SMS eller MMS när inställningarna tillåter det. Reservkanalen behöver också nätstöd.", "SMS-fallback för företag måste finnas i leverantörens tjänst eller byggas i integrationen. Den är inte automatisk överallt.", "Sätt en relevant giltighetstid för påminnelser och tidsbundna besked. Ett sent meddelande kan vara lika olämpligt som ett uteblivet."]
  },
  "rcs-myter": {
    title: "Vilka missförstånd finns om RCS?",
    description: "RCS är en standard, inte en egen app. Den kan ge rikare meddelanden, men funktioner, räckvidd och säkerhet beror på den aktuella tjänsten och mottagarens stöd.",
    points: ["Alla RCS-meddelanden är inte end-to-end-krypterade. Privat chatt och företags-RCS ska bedömas var för sig.", "RCS kan fungera på iPhone, men operatör och region spelar roll. Alla telefoner visar inte samma funktioner.", "RCS ersätter inte automatiskt SMS, och alla tjänster har inte SMS-reserv. Företagsutskick är heller inte gratis bara för att privat chatt använder data."]
  },
  "rcs-ordforklaring-pa-svenska": {
    title: "Vad betyder RCS-termerna på svenska?",
    description: "Engelska RCS-termer beskriver ofta ganska enkla saker: vem som skickar, vad mottagaren ser och hur systemen tar hand om svaret. Här är de vanligaste översättningarna.",
    points: ["Agent betyder företagsavsändare. Rich card är ett meddelandekort och carousel är flera sådana kort att bläddra mellan.", "Suggested reply är ett färdigt svar. Suggested action är en åtgärd, till exempel att öppna en länk. Det är inte samma sak.", "Fallback betyder reservkanal. En webhook är en adress som tar emot händelser, exempelvis ett kundsvar. Exakt stöd beror på tjänsten."]
  },
  "rcs-marknadsforing": {
    title: "Hur används RCS i marknadsföring?",
    description: "RCS-kampanjer kan visa erbjudanden med företagsprofil, bilder och knappar i meddelandeappen. Formatet hjälper mottagaren att förstå och agera, men ger inte bättre resultat av sig självt.",
    points: ["Välj ett huvudbudskap och ett tydligt nästa steg. Ett rich card passar en produkt; en karusell kan visa flera alternativ.", "Säkerställ att mottagaren får kontaktas och att avregistrering fungerar. En verifierad avsändare ersätter inte de kraven.", "Kontrollera mottagarstöd och reservtext före utskick. Mät verkliga resultat, inte bara klick, och undvik generella löften om försäljning."]
  },
  "rcs-e-handel": {
    title: "Hur kan e-handlare använda RCS?",
    description: "E-handlare kan använda RCS för orderbekräftelser, leveransbesked och produktvisning. Ett rich card kan samla produktbild, orderinformation och en länk till rätt sida.",
    points: ["Använd ett känt företagsnamn och skriv vilken order beskedet gäller. Länken ska leda till en tydlig och korrekt destination.", "En öppnad produktsida är inte ett köp. Knyt uppföljningen till utfallet i webbshoppen.", "Skilj servicemeddelanden från marknadsföring, exempelvis kundvagnspåminnelser. Kontrollera reglerna för kontakt och ha en reserv för mottagare utan RCS-stöd."]
  },
  "rcs-kundservice": {
    title: "Hur används RCS i kundservice?",
    description: "RCS kan låta kunder ställa frågor och välja färdiga svar i meddelandeappen. Företagets system eller personal behöver sedan ta hand om ärendet. Knappar löser inget på egen hand.",
    points: ["Föreslagna svar passar tydliga val, exempelvis orderstatus eller begäran om ombokning.", "Visa en väg till en person när automatiska svar inte räcker. Berätta när kunden kan förvänta sig hjälp.", "Koppla svaret till rätt kundärende och bekräfta vad som faktiskt har gjorts. En mottagen begäran är inte en genomförd ändring."]
  },
  "rcs-bokningspaminnelser": {
    title: "Hur fungerar bokningspåminnelser med RCS?",
    description: "En RCS-påminnelse kan visa bokad tid och erbjuda val som bekräfta, boka om eller avboka. Det gör svaret enkelt för kunden, men bokningssystemet måste hantera valet.",
    points: ["Visa datum, tid och plats direkt. Kunden ska inte behöva svepa genom en karusell för att hitta sin bokning.", "Knyt svaret till rätt bokning. Bekräfta om tiden har ändrats eller om en begäran bara har tagits emot.", "Undvik känsliga detaljer och sätt en giltighetstid. Planera eventuell SMS-reserv utan att skicka dubbla eller passerade påminnelser."]
  },
  "rcs-leveransnotiser": {
    title: "Hur skickas leveransbesked med RCS?",
    description: "RCS kan ge kunden leveransstatus, tidsfönster och en spårningslänk i ett meddelande från företagets registrerade avsändare. Beskedet ska svara på vad som händer med just kundens beställning.",
    points: ["Skriv vilken leverans det gäller, när den väntas och var kunden kan följa den. Lägg inte in mer information än ärendet behöver.", "Verifiering hjälper kunden att känna igen avsändaren, men garanterar inte att allt innehåll eller alla länkar är säkra.", "Bekräfta SMS-reserv med leverantören för viktiga besked. Ingen kanal ger en ovillkorlig leveransgaranti."]
  },
  "rcs-restaurang-cafe": {
    title: "Hur kan restauranger använda RCS?",
    description: "Restauranger kan använda RCS för bokningsbesked, menyer med bilder och erbjudanden till kunder som får kontaktas. En knapp kan öppna bokningssidan eller erbjuda ett samtal.",
    points: ["Visa det kunden behöver: tid, plats, meny eller erbjudandets villkor. En tydlig bild kan hjälpa, men ersätter inte nödvändig text.", "En bokningsknapp öppnar ofta en extern sida. Ett tryck betyder inte att bordet redan är bokat.", "Låt kunderna välja relevant kontakt och kunna avregistrera sig. Kontrollera mottagarstöd; bilder och knappar garanterar inte fler bokningar."]
  },
  "rcs-gdpr-samtycke": {
    title: "Vilka regler gäller för RCS-utskick?",
    description: "RCS ändrar inte företagets ansvar för personuppgifter eller marknadsföring. Telefonnummer, kundsvar och leveranshändelser kan vara personuppgifter när de går att koppla till en person.",
    points: ["Bedöm rättslig grund för behandlingen och vilka regler som gäller för kontakten. GDPR:s rättsliga grund och tillstånd för marknadsföring är inte samma fråga.", "Informera mottagaren, gör avregistrering möjlig och begränsa vilka uppgifter ni sparar och hur länge.", "Googles plattformsriktlinjer är inte svensk lag. Kontrollera ert upplägg med dataskyddskunnig rådgivare. Detta är en översikt, inte juridisk rådgivning."]
  },
  "rcs-roi": {
    title: "Hur mäter jag resultat av RCS?",
    description: "RCS kan rapportera leverans, lässtatus och kundval. ROI handlar däremot om värdet av resultatet jämfört med kostnaden. Ett klick eller läskvitto är inte ett färdigt köp.",
    points: ["Skilj accepterat, levererat, läst och slutfört ärende åt. Definiera varje mått innan ni jämför kanaler.", "Koppla köp och bokningar till systemet där de sker. Uteblivet läskvitto betyder inte säkert att ingen har läst.", "Testa en förändring i taget i jämförbara grupper och räkna med meddelande-, integrations- och hanteringskostnader. RCS ger inte en fast avkastning för alla."]
  },
  "rcs-kampanjplan": {
    title: "Hur planerar jag en RCS-kampanj?",
    description: "En första RCS-kampanj behöver ett tydligt mål, rätt mottagare och ett meddelande med ett begripligt nästa steg. Börja med ett litet test innan ni skickar brett.",
    points: ["Bestäm vad mottagaren ska göra och hur ni mäter det. Välj format efter uppgiften, inte efter antalet möjliga funktioner.", "Kontrollera att kontakten är tillåten, avsändaren är lanserad och mottagarna stöder innehållet.", "Testa länkar, svarshantering, giltighetstid och reservtext. Skala upp först när hela flödet fungerar, inte bara förhandsvisningen."]
  },
  "rcs-tonalitet": {
    title: "Vilken ton passar i RCS?",
    description: "Företagsmeddelanden i RCS ska vara begripliga, relevanta och lätta att känna igen. Skriv som en person som hjälper till: säg vad som har hänt, varför kunden får meddelandet och vad nästa steg är.",
    points: ["Lägg det viktigaste först och använd samma namn och ord som kunden känner igen från ert företag.", "Använd korta knapptexter som beskriver handlingen. Skriv inte Bokat om knappen bara skickar en bokningsbegäran.", "Undvik påträngande skämt i känsliga ärenden. Läs texten högt och kontrollera att den fungerar utan bild eller extra sammanhang."]
  },
  "rcs-basic-single-conversation": {
    title: "Vad betyder Basic, Single och Conversation?",
    description: "Basic, Single och Conversation beskriver olika meddelandetyper i företags-RCS, inte abonnemangsplaner. Typen påverkar vilket innehåll och vilket flöde tjänsten kan hantera.",
    points: ["Basic används för enklare textbesked. Single används för ett rikt meddelande, exempelvis med media eller kort.", "Conversation är inriktat på dialog. Exakta gränser, tidsfönster och debiteringsregler måste bekräftas för leverantören och kontot.", "Välj efter innehåll och behov av svar. Att mottagaren kan trycka på en knapp säger inte ensamt hur ett meddelande debiteras."]
  },
  "foreslagna-svar": {
    title: "Vad är föreslagna svar?",
    description: "Föreslagna svar, suggested replies, är färdiga svarsalternativ som mottagaren kan trycka på i stället för att skriva. Valet skickas tillbaka till företaget, ofta med data som identifierar svaret.",
    points: ["Använd tydligt olika val, exempelvis Bekräfta och Begär ombokning. Kunden ska förstå vad varje val betyder.", "Svaret måste hanteras av en person eller ett system. Ett knapptryck ändrar inte automatiskt bokningen eller ordern.", "Föreslagna svar är inte åtgärdsknappar som öppnar en länk. Funktioner och antal tillåtna förslag beror på format och tjänst."]
  },
  "rcs-bilder-video": {
    title: "Hur fungerar bilder och video i RCS?",
    description: "RCS kan skicka bilder och video som fristående media eller som delar av rich cards. Formatet kan ge bättre mediedelning än MMS, men kvalitet och återgivning beror på filen, appen och stödet.",
    points: ["Låt motivet synas på en liten skärm. Skriv viktig information som text, inte bara inuti bilden.", "Kontrollera tjänstens stödda filtyper, storleksgränser och medieadresser. Utgå inte från samma gränser hos alla leverantörer.", "Testa laddning och beskärning på stödda telefoner. Skriv en separat SMS-version om utskicket ska ha reservkanal."]
  },
  "skriva-bra-rcs-meddelanden": {
    title: "Hur skriver jag ett tydligt RCS-meddelande?",
    description: "Ett bra RCS-meddelande ger kunden ett begripligt besked och ett tydligt nästa steg. Mer plats och fler funktioner är inte en anledning att skriva mer.",
    points: ["Säg vad meddelandet gäller direkt. Håll ihop ett ärende eller erbjudande och använd bild när den faktiskt förklarar något.", "Skriv knapptext efter det som händer: Öppna ordern, Ring oss eller Begär ombokning. Undvik löften som knappen inte uppfyller.", "Kontrollera text, länkar och svar på riktiga telefoner. Reservtexten ska ge samma viktiga besked utan bild och knappar."]
  },
  "lankar-och-knappar": {
    title: "Vad gör åtgärdsknappar i RCS?",
    description: "Åtgärdsknappar, suggested actions, erbjuder en handling som att öppna en webbsida, ringa ett nummer eller visa en plats. De är något annat än föreslagna svar som skickar tillbaka ett kundval.",
    points: ["Tillgängliga åtgärder beror på meddelandeformat, klient och tjänst. Kontrollera stöd innan ni skickar.", "Vissa knappar lämnar chatten. Skriv vart kunden kommer och vad som sker, exempelvis Öppna bokningssidan.", "Ett knapptryck bevisar inte att kunden har köpt, ringt eller bokat. Följ resultatet i systemet där handlingen slutförs."]
  },
  "rcs-fallback-sms": {
    title: "Vad är SMS-fallback?",
    description: "SMS-fallback är att använda SMS som reserv när ett RCS-meddelande inte kan skickas eller levereras enligt flödets villkor. Reserven behöver finnas i tjänsten eller hanteras av företagets integration.",
    points: ["Fallback ingår inte automatiskt i alla RCS-tjänster och ger ingen absolut leveransgaranti.", "Skriv en egen SMS-text med samma viktiga information. Bilder, karuseller och knappar kan inte flyttas över oförändrade.", "Bestäm tidsgränser och hur väntande RCS-meddelanden hanteras före reservutskick, så kunden inte får dubbla besked. Kontrollera separat debitering."]
  },
  "rcs-leveransstatus": {
    title: "Vad betyder leveransstatus i RCS?",
    description: "Leveransstatus beskriver olika steg efter ett utskick. Ett accepterat API-anrop betyder att begäran har tagits emot. Levererat och läst är senare händelser, när tjänsten och klienten kan rapportera dem.",
    points: ["Accepterat är inte detsamma som levererat till telefonen. Ett läskvitto är inte bevis för förståelse eller samtycke.", "Utebliven läsrapport betyder inte säkert att meddelandet är oläst. Klient, inställningar och tjänst påverkar rapporteringen.", "Koppla händelser till rätt meddelande och håll dem åtskilda från kundens faktiska köp, bokning eller svar."]
  },
  "testa-rcs-utskick": {
    title: "Vad ska testas före ett RCS-utskick?",
    description: "Ett RCS-test ska följa hela flödet: vad kunden ser, vad knapparna gör och hur svar eller leveransfel hanteras. En snygg förhandsvisning räcker inte.",
    points: ["Testa på faktiska telefoner och klienter med bekräftat stöd. Kontrollera långa texter, bilder, länkar och avsändarprofil.", "Välj varje svarsalternativ och kontrollera att rätt ärende uppdateras eller att begäran tas emot.", "Prova mottagare utan stöd, giltighetstider och eventuell SMS-reserv. Kontrollera att avregistrering fungerar och att kunden inte får dubbla meddelanden."]
  },
  "kapabilitetskontroll": {
    title: "Vad är en kapabilitetskontroll?",
    description: "En kapabilitetskontroll, capability check, undersöker om en mottagare kan kommunicera med en företagsagent och vilka RCS-funktioner som stöds. Den är mer användbar än att bara veta telefonmodell.",
    points: ["Stöd för RCS som kanal är inte samma sak som stöd för varje kort, karusell eller åtgärd.", "Använd resultatet för att välja rätt innehåll eller en bekräftad reservkanal. Ett positivt svar garanterar inte senare leverans.", "Stödet kan ändras med app, operatör och inställningar. Följ leverantörens regler för kontroller i stället för att lita obegränsat på gamla resultat."]
  },
  "rcs-agent-registrering": {
    title: "Hur registreras en RCS-avsändare?",
    description: "En företagsavsändare behöver registreras och godkännas innan publika RCS-utskick. I Googles modell skapas en agent med företagsuppgifter, följt av varumärkesverifiering och lansering.",
    points: ["Förbered ett igenkännbart företagsnamn, logotyp, kontaktuppgifter och en behörig varumärkesrepresentant.", "Ett testkonto eller en skapad agent är inte ett lanseringsgodkännande. Bekräfta marknader, operatörer och process med partnern.", "Verifiering kontrollerar koppling och behörighet, inte varje framtida meddelandes innehåll. Agenten är en avsändare, inte automatiskt en AI."]
  }
};

export const termDetails: Record<string, string[]> = {
  "Agent": ["Agenten behöver registreras och lanseras innan publika utskick i Googles modell.", "Den kan vara kopplad till vanliga system eller personal. AI är inget krav."],
  "Agentprofil": ["Använd ett namn och en logotyp som kunden känner igen.", "En ifylld profil betyder inte att avsändaren redan är verifierad eller lanserad."],
  "API": ["Ert system kan begära utskick vid exempelvis en orderändring.", "Ett accepterat anrop är inte en leveranskvittens. Följ senare händelser och er leverantörs dokumentation."],
  "Asynkron leverans": ["Behåll meddelandets identifierare så senare händelser kan kopplas till rätt ärende.", "Skilj accepterat, levererat och läst åt. En senare händelse kan också ange ett fel."],
  "Brand verification": ["En behörig varumärkesrepresentant bekräftar uppgifter och partnerns behörighet i Googles process.", "Verifiering och lansering är separata steg. Kontrollen garanterar inte varje framtida meddelandes innehåll."],
  "Föreslagen åtgärd": ["Knappen kan öppna en extern sida; hela handlingen sker inte alltid i chatten.", "Stöd beror på klient och tjänst. Ett tryck betyder inte att ett köp eller en bokning har slutförts."],
  "Karusell": ["Använd formatet för flera alternativ som behöver visas på liknande sätt.", "Testa text, bilder och mottagarstöd. Lägg inte ett viktigt enskilt besked bakom ett svep."],
  "Leveranskvittens": ["Ett accepterat API-anrop är inte samma sak som leverans till telefonen.", "Kvittensen visar inte att personen har läst, förstått eller godkänt innehållet."],
  "Läskvitto": ["Klientens stöd och inställningar påverkar om en läshändelse rapporteras.", "Ingen rapport betyder inte säkert oläst. En rapport bevisar inte samtycke eller ett slutfört köp."],
  "MaaP": ["Begreppet handlar om plattformsstöd för företagskommunikation.", "Det är inte namnet på en enskild app och fastställer inte en leverantörs priser eller kontofunktioner."],
  "MMS": ["MMS och RCS kan visas i samma app men använder olika tjänster.", "Mediegränser och kostnad beror på operatören. En MMS-bild är inte ett interaktivt rich card."],
  "Operatör": ["Operatören kan påverka RCS-stödet, även när telefonen och appen har rätt version.", "För företagsutskick behöver räckvidden bekräftas för agenten, marknaden och den valda tjänsten."],
  "P2P": ["P2P är privat chatt, inte företagsmeddelanden från en registrerad agent.", "Uppgifter om kryptering och tillgänglighet i privat chatt gäller inte automatiskt företags-RCS."],
  "Postback-data": ["Använd en stabil identifierare så ett knappval kan kopplas till rätt flöde.", "Systemet behöver hantera valet. Data från ett tryck innebär inte att kundärendet redan är ändrat."],
  "RBM": ["Företaget representeras av en registrerad avsändare, i Googles modell kallad agent.", "Verifiering, lansering och mottagarstöd behöver vara bekräftade. Privat RCS-stöd räcker inte som garanti."],
  "RCS-chatt": ["RCS behöver uppkoppling och stöd hos deltagarna.", "Appen kan använda SMS eller MMS i stället, beroende på stöd och inställningar. Reservleverans är inte garanterad."],
  "RCS-klient": ["Google Messages och Apples Meddelanden är exempel på appar som kan använda RCS.", "Appversion, operatör och inställningar påverkar funktionerna. Samma meddelande kan visas olika."],
  "Rich card": ["I Googles modell behöver kortet innehålla media, rubrik eller beskrivning, inte nödvändigtvis alla tre.", "Förslag och återgivning beror på format och mottagarstöd. Viktig information bör även finnas som text."],
  "Skrivindikator": ["Indikatorn visar skrivaktivitet, inte att ett svar säkert kommer.", "Den är dokumenterad för RCS-chattar men ska inte antas finnas i varje företagsflöde."],
  "SMS": ["Ett enskilt SMS rymmer normalt 160 GSM-7-tecken. Annan teckenkodning och längre text kan ge fler delar.", "SMS har inte RCS-kort eller inbyggda rich-card-knappar. En leveransrapport är inte ett läskvitto."],
  "Webhook": ["Koppla inkommande händelser till rätt meddelande och kundärende.", "Kontrollera anropets ursprung enligt leverantörens instruktioner. Att ett anrop innehåller JSON gör det inte betrott."]
};