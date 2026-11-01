export type ShortContent = { title: string; description: string; points: string[] };

export const shortContent: Record<string, ShortContent> = {
  "vad-ar-rcs": {
    "title": "Vad är RCS?",
    "description": "RCS är en meddelandestandard som låter dig skicka text, bilder och filer via internet i telefonens meddelandeapp. Namnet står för Rich Communication Services. Du behöver alltså inte en särskild RCS-app.",
    "points": [
      "När båda deltagarna har stöd kan chatten visa läskvitton och när den andra personen skriver. Samma app kan också skicka SMS eller MMS, så alla meddelanden i den använder inte nödvändigtvis RCS.",
      "Företag kan använda en registrerad avsändare med namn och logotyp och skicka bilder eller svarsknappar. Den tjänsten har egna krav på registrering och räckvidd. Ett privat RCS-samtal och ett företagsutskick behöver därför bedömas var för sig."
    ]
  },
  "rcs-vs-sms": {
    "title": "Vad skiljer RCS från SMS och MMS?",
    "description": "SMS är textmeddelanden via mobilnätet. MMS kan även innehålla bilder. RCS använder wifi eller mobildata och kan ge bättre mediedelning, läskvitton och interaktiva företagsmeddelanden.",
    "points": [
      "Alla tre kan visas i samma app. Skillnaden märks när du skickar innehåll eller läser status, snarare än genom att en ny inkorg öppnas.",
      "Ett enskilt SMS rymmer normalt 160 GSM-7-tecken. Andra tecken eller längre text kan ge flera delar. För företag som vill använda SMS när RCS inte fungerar behövs en bekräftad reservlösning och en separat SMS-text."
    ]
  },
  "rcs-for-foretag": {
    "title": "Vad är RCS för företag?",
    "description": "RCS för företag låter en registrerad avsändare skicka besked med företagsprofil, bilder och valbara svar i kundens meddelandeapp. Det kallas ofta RCS Business Messaging, RBM.",
    "points": [
      "En webbutik kan låta ordersystemet skicka ett leveransbesked med en spårningsknapp. Ett webbgränssnitt passar i stället när en person vill skapa ett utskick manuellt. RCS är kanalen; orderstatusen och hanteringen av kundsvar finns i företagets egna system.",
      "Innan utskick behöver avsändaren vara godkänd och tjänsten kunna nå kunderna. Registreringen ger inte rätt att marknadsföra till vem som helst. Kontaktregler och eventuell SMS-reserv behöver också vara ordnade."
    ]
  },
  "verifierad-avsandare": {
    "title": "Vad betyder verifierad avsändare?",
    "description": "Verifieringen kontrollerar kopplingen mellan RCS-avsändaren och varumärket den företräder. I Google Meddelanden kan kunden se företagsnamn, logotyp och en verifieringsmarkering.",
    "points": [
      "I Googles process bekräftar en behörig representant uppgifterna och att partnern får hantera avsändaren. Det görs före lansering. Fråga er partner vilka underlag som behövs och vilka marknader godkännandet gäller.",
      "Märkningen hjälper kunden att känna igen företaget, men är ingen kvalitetsstämpel för varje erbjudande eller länk. Den säger heller inget om end-to-end-kryptering. En oväntad begäran om betalning eller känsliga uppgifter bör fortfarande kontrolleras."
    ]
  },
  "rich-cards-karuseller": {
    "title": "Vad är rich cards och karuseller?",
    "description": "Ett rich card är ett meddelandekort som kan samla bild, rubrik, beskrivning och knappar. En karusell är flera sådana kort som kunden bläddrar mellan, till exempel ett urval produkter.",
    "points": [
      "Ett kort passar ett sammanhållet besked. Flera kort passar när alternativen ska jämföras. Lägg inte kundens bokningstid på sista kortet; den ska gå att hitta direkt.",
      "Knappar kan skicka ett föreslaget svar eller öppna exempelvis en webbplats. Det är olika handlingar som behöver hanteras på rätt sätt. Kontrollera mottagarstödet och skriv en enklare reservtext om flödet också ska använda SMS."
    ]
  },
  "rcs-api-webhooks": {
    "title": "Hur fungerar RCS API och webhooks?",
    "description": "Ett RCS API låter era system begära ett utskick. Webhooks tar emot senare händelser som leverans, lässtatus och kundsvar. Att API:et accepterat begäran betyder ännu inte att telefonen fått meddelandet.",
    "points": [
      "Spara meddelandets identifierare tillsammans med ordern eller ärendet. När en händelse kommer tillbaka går det då att uppdatera rätt post. Kontrollera webhook-anropets ursprung innan händelsen behandlas.",
      "Adresser, fält och autentisering beror på leverantören. Använd dokumentationen för tjänsten ni kopplar till. Ska SMS vara reserv behöver integrationen även veta när det får skickas och hur väntande RCS hanteras utan dubbla besked."
    ]
  },
  "rcs-pa-iphone": {
    "title": "Vad krävs för RCS på iPhone?",
    "description": "RCS kan användas i iPhones app Meddelanden från iOS 18, men operatören och abonnemanget måste också ha stöd. En systemuppdatering räcker inte på egen hand.",
    "points": [
      "Leta under Inställningar, Appar, Meddelanden efter RCS-meddelanden. Om valet saknas, fråga operatören om just din linje. När det fungerar kan ett samtal med Android få bättre bilddelning och läskvitton.",
      "Kontrollera kanaltexten i själva samtalet. Gröna bubblor kan vara både RCS och SMS. Företag som vill nå iPhone behöver dessutom testa sin registrerade avsändare; privat chatt visar inte hela företagsräckvidden."
    ]
  },
  "rcs-pa-android": {
    "title": "Hur fungerar RCS på Android?",
    "description": "På Android används RCS ofta i Google Meddelanden. När appen är ansluten kan den skicka via wifi eller mobildata och visa läskvitton och skrivindikatorer där det finns stöd.",
    "points": [
      "Tryck på profilbilden och öppna meddelandeinställningarna, sedan RCS-chattar. Där ser du anslutningsstatus och vilket nummer som används.",
      "Den du skriver till behöver också RCS. Annars kan samtalet använda SMS eller MMS. Omsändning beror på appens inställningar och tillgång till rätt nät; den är ingen leveransgaranti."
    ]
  },
  "aktivera-rcs": {
    "title": "Hur aktiverar jag RCS?",
    "description": "Du aktiverar RCS i meddelandeappens inställningar. Telefonen behöver internet, rätt nummerregistrering och stöd för funktionen.",
    "points": [
      "På Android: öppna Google Meddelanden, tryck på profilbilden och välj meddelandeinställningar, sedan RCS-chattar. Slå på funktionen och se att statusen blir ansluten.",
      "På iPhone: öppna Inställningar, Appar, Meddelanden och slå på RCS-meddelanden om valet finns. Saknas det behöver operatören bekräfta stöd för ditt abonnemang.",
      "Prova med någon som redan har fungerande RCS. Om anslutningen fastnar, kontrollera numret, internet och appuppdateringar innan du följer den officiella felsökningen."
    ]
  },
  "vad-kostar-rcs": {
    "title": "Vad kostar RCS?",
    "description": "Privat RCS använder wifi eller mobildata. Kostnaden följer därför din uppkoppling. Företagsutskick har en separat prissättning hos tjänsten som skickar dem.",
    "points": [
      "Hos RCS Direkt kostar Basic 0,49 SEK, Single 0,69 SEK och Conversation 0,99 SEK per meddelande. Du betalar per meddelande utan månadsavgift eller bindningstid.",
      "Räkna antalet meddelanden per typ när du uppskattar ett utskick. Kontrollera separat vad eventuell SMS-reserv kostar och ta med integration och hantering om du vill beräkna hela projektkostnaden."
    ]
  },
  "ar-rcs-sakert": {
    "title": "Är RCS säkert?",
    "description": "Det beror på vilken RCS-tjänst och vilket skydd du menar. Verifiering hjälper till att identifiera företagsavsändaren. Kryptering skyddar meddelandets innehåll. De löser olika problem.",
    "points": [
      "Google beskriver end-to-end-kryptering för vissa privata RCS-chattar. Det skyddet ska inte förutsättas gälla alla företagsmeddelanden. En verifieringsmarkering säger inte heller att varje länk från företaget är säker.",
      "För ett företagsflöde behöver ni veta hur uppgifter skyddas både i kanalen och i era egna system. Skicka inte lösenord och välj en lämpligt skyddad väg för känsliga uppgifter."
    ]
  },
  "rcs-historia": {
    "title": "Hur utvecklades RCS?",
    "description": "RCS utvecklades inom mobilbranschen för att ge meddelanden fler funktioner än SMS och MMS. GSMA:s Universal Profile blev en gemensam teknisk grund för appar, nät och tjänster.",
    "points": [
      "Standarden är inte en app. Operatörer och apputvecklare inför stödet i sina tjänster, vilket är en anledning till att tillgängligheten kan skilja sig mellan telefoner och länder.",
      "RCS finns i Google Meddelanden och kan användas i Apples Meddelanden med rätt operatörsstöd. För ett planerat utskick är dagens räckvidd mer relevant än standardens ålder."
    ]
  },
  "universal-profile": {
    "title": "Vad är Universal Profile?",
    "description": "Universal Profile är GSMA:s gemensamma uppsättning funktioner och tekniska krav för RCS. Den ska göra det lättare för olika appar, nät och tjänster att kommunicera.",
    "points": [
      "Det är en teknisk grund, inte ett abonnemang eller ett löfte om identiskt utseende på alla telefoner. Versioner och implementationer kan stödja olika funktioner.",
      "Om ni vill skicka en karusell eller använda en viss knapp behöver er tjänst och mottagaren fortfarande ha stöd för just den funktionen."
    ]
  },
  "rcs-wifi-mobildata": {
    "title": "Behöver RCS internet?",
    "description": "Ja, RCS behöver internet via wifi eller mobildata. Ett meddelande till en mottagare utan uppkoppling kan behöva vänta eller skickas genom en annan kanal.",
    "points": [
      "Google Meddelanden kan skicka om som SMS eller MMS när inställningarna tillåter det. Även den kanalen behöver fungera, så SMS löser inte alla täckningsproblem.",
      "För företag ska SMS-reserv finnas i tjänsten eller integrationen. Bestäm också när beskedet blir för gammalt för att skickas. En påminnelse efter bokningen är inte längre användbar."
    ]
  },
  "rcs-myter": {
    "title": "Vilka missförstånd finns om RCS?",
    "description": "RCS är varken en egen app eller en garanti för att alla meddelanden har samma funktioner. Det är en standard som används av olika appar och tjänster.",
    "points": [
      "Två vanliga missförstånd gäller iPhone och kryptering. RCS kan fungera på iPhone med operatörsstöd. End-to-end-kryptering finns för vissa privata chattar, men ska inte antas skydda alla företagsutskick.",
      "RCS har inte heller ersatt SMS överallt. SMS-reserv behöver ordnas för företagsflöden, och privat chatt över wifi säger inget om priset för ett företagsmeddelande."
    ]
  },
  "rcs-ordforklaring-pa-svenska": {
    "title": "Vad betyder RCS-termerna på svenska?",
    "description": "Agent betyder företagsavsändare, rich card är ett meddelandekort och carousel är flera kort som går att bläddra mellan. Orden beskriver delar av RCS, inte varsin app.",
    "points": [
      "Suggested reply är ett färdigt svar som kunden skickar tillbaka. Suggested action är en åtgärd, till exempel att öppna en länk. Ett svar och en öppnad webbplats behöver hanteras på olika sätt.",
      "Fallback betyder reservkanal, ofta SMS. En webhook tar emot händelser som leveransstatus eller kundsvar och kan föra dem vidare till rätt ärende i företagets system."
    ]
  },
  "rcs-marknadsforing": {
    "title": "Hur används RCS i marknadsföring?",
    "description": "RCS kan visa ett erbjudande med företagsnamn, bild och knappar i kundens meddelandeapp. Ett kort kan presentera en produkt; en karusell kan ge flera alternativ.",
    "points": [
      "Skriv vad erbjudandet gäller och vart knappen leder. För många val eller en lång inledning kan göra det svårare att förstå, även i ett rikt format.",
      "Kontrollera kontaktregler, avregistrering och mottagarstöd före utskick. Följ upp resultatet på sidan där kunden köper eller bokar. Klick visar intresse, men formatet ger ingen bestämd försäljningsökning."
    ]
  },
  "rcs-e-handel": {
    "title": "Hur kan e-handlare använda RCS?",
    "description": "E-handlare kan använda RCS för orderbekräftelser, leveransstatus och produktvisning. Ett leveransbesked kan samla orderreferens, aktuell status och spårningslänk.",
    "points": [
      "Använd det företagsnamn kunden känner igen och hämta uppgifterna från rätt order. En registrerad profil hjälper inte om länken öppnar fel beställning.",
      "Håll servicebesked och reklam åtskilda. De har olika syften och kan ha olika kontaktregler. För viktiga besked behöver ni också veta hur kunder utan RCS nås."
    ]
  },
  "rcs-kundservice": {
    "title": "Hur används RCS i kundservice?",
    "description": "Med RCS kan kunden skriva till företaget eller välja ett färdigt svar i meddelandeappen. Personal eller ett anslutet system måste sedan ta hand om frågan.",
    "points": [
      "Knappar passar när alternativen är tydliga, som orderstatus eller begäran om ombokning. Låt kunden komma vidare till en person när inget alternativ hjälper.",
      "Bekräfta vad som har hänt. Vi har tagit emot din begäran betyder något annat än Din tid är ombokad. Knyt svaret till ärendesystemet så att beskedet stämmer."
    ]
  },
  "rcs-bokningspaminnelser": {
    "title": "Hur fungerar bokningspåminnelser med RCS?",
    "description": "En RCS-påminnelse kan visa bokad tid och låta kunden bekräfta eller be om ombokning. Valet blir enkelt, men bokningssystemet behöver hantera svaret.",
    "points": [
      "Visa datum, tid och plats direkt. Om en ombokning måste behandlas av personal ska första svaret bekräfta begäran, inte påstå att en ny tid är klar.",
      "Undvik känsliga detaljer i påminnelsen. Sätt en relevant giltighetstid och planera eventuell SMS-reserv så att kunden inte får både dubbla och inaktuella besked."
    ]
  },
  "rcs-leveransnotiser": {
    "title": "Hur skickas leveransbesked med RCS?",
    "description": "Ett RCS-leveransbesked kan visa aktuell status, ett tidsfönster och en spårningslänk under företagets registrerade namn. Kunden ska snabbt se vilken beställning det gäller.",
    "points": [
      "Skilj på att ordern packas, har skickats och väntas komma fram. Uppgiften måste komma från leveranssystemet; meddelandeformatet ändrar inte transportens status.",
      "Använd en tydlig länk till rätt leverans. Förbered en reservväg för viktiga besked om er tjänst erbjuder det, men räkna inte någon kanal som en ovillkorlig leveransgaranti."
    ]
  },
  "rcs-restaurang-cafe": {
    "title": "Hur kan restauranger använda RCS?",
    "description": "En restaurang kan skicka bokningsbesked, visa en meny med bilder eller ge ett erbjudande via RCS. En knapp kan öppna bokningssidan eller hjälpa kunden att kontakta restaurangen.",
    "points": [
      "En bokningsbekräftelse behöver tid, plats och eventuella villkor. En menybild kan visa maten, men viktig information ska också vara läsbar som text.",
      "Ett nytt erbjudande är marknadsföring och ska bedömas separat från bokningen. Kontrollera att kunden får kontaktas och kan avregistrera sig. En knapp till bokningssidan betyder inte att bordet redan är bokat."
    ]
  },
  "rcs-gdpr-samtycke": {
    "title": "Vilka regler gäller för RCS-utskick?",
    "description": "Företaget ansvarar för personuppgifter och kontaktregler även när utskicket använder RCS. Telefonnummer, svar och leveransdata kan vara personuppgifter om de går att koppla till en person.",
    "points": [
      "GDPR:s rättsliga grund för behandlingen och reglerna om marknadsföringskontakt är skilda frågor. En bokningsbekräftelse och ett reklamerbjudande behöver därför bedömas efter sina respektive syften.",
      "Informera mottagaren och begränsa vad ni sparar och hur länge. Avregistrering behöver fungera i systemen som styr utskicken. Låt en dataskyddskunnig rådgivare bedöma ert upplägg; denna översikt ersätter inte juridisk rådgivning."
    ]
  },
  "rcs-roi": {
    "title": "Hur mäter jag resultat av RCS?",
    "description": "ROI jämför värdet av ett resultat med kostnaden för att uppnå det. RCS kan ge leverans- och läsdata, men ett läskvitto eller klick är inte ett färdigt köp.",
    "points": [
      "Om målet är bokningar behöver de slutförda bokningarna följas i bokningssystemet. Leverans, läsning och klick kan visa var kunder stannar på vägen dit.",
      "Jämför likvärdiga grupper och räkna med meddelanden, integration och hantering. Testa en tydlig förändring i taget så att det går att förstå vad som påverkade utfallet."
    ]
  },
  "rcs-kampanjplan": {
    "title": "Hur planerar jag en RCS-kampanj?",
    "description": "En RCS-kampanj behöver ett mål, relevanta mottagare och ett budskap som går att agera på. Välj format efter vad kunden ska göra, inte efter hur många funktioner som finns.",
    "points": [
      "Ett första test kan ha ett erbjudande och en länk. Bestäm hur resultatet ska följas upp och kontrollera att avsändaren är lanserad och kontakten tillåten.",
      "Prova länkar, svar, giltighetstid och eventuell reservversion innan ni skickar brett. Meddelandet är inte klart förrän även nästa steg fungerar för kunden."
    ]
  },
  "rcs-tonalitet": {
    "title": "Vilken ton passar i RCS?",
    "description": "En bra ton i RCS låter som ett begripligt besked från företaget, inte som en reklamrubrik i varje mening. Säg vad som hänt och vad kunden kan göra.",
    "points": [
      "Din order har skickats med en spårningslänk är ofta bättre än en lång inledning om spännande nyheter. Använd namn och ord som kunden känner igen.",
      "Även knapparna behöver samma omsorg. Begär ombokning är ärligare än Ombokat om valet bara startar en begäran. Läs texten högt och ta bort skämt som skymmer ärendet."
    ]
  },
  "rcs-basic-single-conversation": {
    "title": "Vad betyder Basic, Single och Conversation?",
    "description": "Basic, Single och Conversation är meddelandetyper i företags-RCS, inte abonnemangsplaner. De beskriver olika slags innehåll och dialog.",
    "points": [
      "Basic används för enklare textbesked. Single kan vara ett rikt meddelande med media eller kort. Conversation är inriktat på ett samtal där kunden och företaget utbyter meddelanden.",
      "Leverantörens definitioner avgör gränser, tidsfönster och debitering. Be om de villkoren innan ni räknar på ett flöde; en synlig svarsknapp avgör inte ensam hur det faktureras."
    ]
  },
  "foreslagna-svar": {
    "title": "Vad är föreslagna svar?",
    "description": "Föreslagna svar är färdiga svarsalternativ som kunden kan trycka på i stället för att skriva. Det engelska namnet är suggested replies.",
    "points": [
      "Bekräfta och Begär ombokning kan vara två sådana val. Svaret kan innehålla data som kopplar det till bokningen, så att företagets system vet vilket ärende som avses.",
      "Systemet eller personalen måste hantera valet. En svarsknapp ändrar inte bokningen av sig själv. Den skiljer sig också från en åtgärdsknapp som öppnar en webbsida."
    ]
  },
  "rcs-bilder-video": {
    "title": "Hur fungerar bilder och video i RCS?",
    "description": "RCS kan skicka bilder och video separat eller som del av ett rich card. Hur det ser ut beror på filen, meddelandeappen och mottagarstödet.",
    "points": [
      "Använd en bild som går att förstå på en liten skärm. Skriv pris och andra viktiga uppgifter som text, så att kunden får beskedet även om bilden laddar långsamt.",
      "Kontrollera tjänstens filtyper, storleksgränser och krav på medieadresser. Prova laddning och beskärning på telefon, och skriv en egen SMS-text om en reservkanal ska användas."
    ]
  },
  "skriva-bra-rcs-meddelanden": {
    "title": "Hur skriver jag ett tydligt RCS-meddelande?",
    "description": "Ett tydligt RCS-meddelande svarar först på vad ärendet gäller. Bilder och knappar ska hjälpa kunden vidare, inte vara skäl att lägga till mer innehåll.",
    "points": [
      "Din bokning är i morgon klockan 14, följt av plats och en bokningslänk, ger ett konkret besked. En allmän hälsning med flera erbjudanden gör samma uppgift svårare.",
      "Skriv knapptexten efter handlingen: Öppna ordern, Ring oss eller Begär ombokning. Prova meddelandet på telefon och se att reservtexten också går att förstå utan bilder."
    ]
  },
  "lankar-och-knappar": {
    "title": "Vad gör åtgärdsknappar i RCS?",
    "description": "Åtgärdsknappar i RCS kan exempelvis öppna en webbsida, ringa ett nummer eller visa en plats. De kallas suggested actions och är något annat än färdiga svar som skickas till företaget.",
    "points": [
      "Säg vad nästa steg är. Öppna bokningssidan beskriver en länk, medan Bokat kan ge fel intryck om kunden ännu inte valt en tid.",
      "Stödet beror på tjänst, format och klient. Kontrollera det före utskick och följ resultatet där handlingen slutförs. Ett klick visar inte att kunden har bokat eller köpt."
    ]
  },
  "rcs-fallback-sms": {
    "title": "Vad är SMS-fallback?",
    "description": "SMS-fallback betyder att SMS används som reserv när RCS inte kan skickas eller levereras enligt flödets villkor. Det behöver vara ordnat i tjänsten eller integrationen.",
    "points": [
      "Skriv en egen SMS-version. En karusell eller knapp kan inte följa med oförändrad, men orderreferens, status och en vanlig länk kan ge samma viktiga besked.",
      "Bestäm när SMS får skickas och hur ett väntande RCS-meddelande stoppas eller går ut. Annars kan kunden få båda. Fråga även hur reserven debiteras."
    ]
  },
  "rcs-leveransstatus": {
    "title": "Vad betyder leveransstatus i RCS?",
    "description": "RCS-status följer flera steg i ett utskick. Accepterat betyder att API:et tagit emot begäran. Levererat och läst är senare händelser när tjänsten kan rapportera dem.",
    "points": [
      "Spara stegen var för sig och koppla dem till rätt meddelande. Då går det att se om ett fel uppstod vid anropet eller under leveransen.",
      "Ett läskvitto bevisar inte förståelse eller samtycke. Saknas en läsrapport vet ni inte säkert att meddelandet är oläst, eftersom app och inställningar påverkar vad som rapporteras."
    ]
  },
  "testa-rcs-utskick": {
    "title": "Vad ska testas före ett RCS-utskick?",
    "description": "Ett RCS-test behöver följa kundens hela ärende: meddelandet, knapparna, svaret och uppdateringen i rätt system. En förhandsvisning testar bara en del.",
    "points": [
      "Skicka till telefoner med bekräftat stöd och använd varje val. Prova långa texter, bilder och länkar och se vilket besked kunden får efter svaret.",
      "Testa också en mottagare utan stöd, tidsgränser och SMS-reserv om den ingår. Avregistrering och hantering av dubbletter ska fungera innan riktiga kunder får utskicket."
    ]
  },
  "kapabilitetskontroll": {
    "title": "Vad är en kapabilitetskontroll?",
    "description": "En kapabilitetskontroll undersöker om en mottagare kan nås av en företagsagent och vilka RCS-funktioner som stöds. På engelska kallas det capability check.",
    "points": [
      "Det ger mer användbar information än telefonmodellen. Om en karusell saknar stöd kan tjänsten behöva välja ett enklare innehåll eller en reservkanal.",
      "Ett positivt svar är ingen senare leveranskvittens. Stödet kan också ändras, så följ leverantörens regler för hur länge kontrollens resultat får användas."
    ]
  },
  "rcs-agent-registrering": {
    "title": "Hur registreras en RCS-avsändare?",
    "description": "Företaget behöver en registrerad och godkänd RCS-avsändare före publika utskick. I Googles modell skapas en agent, följt av varumärkesverifiering och lansering.",
    "points": [
      "Förbered namn, logotyp, kontaktuppgifter och en behörig representant. Profilen ska motsvara det företag kunden känner igen.",
      "En skapad testagent är inte samma sak som en lanserad avsändare. Be partnern bekräfta godkännandet för marknaderna ni vill nå innan kundlistan används."
    ]
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