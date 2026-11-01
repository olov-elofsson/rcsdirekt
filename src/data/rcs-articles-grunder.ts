import type { Article } from "./rcs-knowledge";

const d = "2026-11-01";

export const grunderArticles: Article[] = [
  {
    slug: "rcs-pa-iphone", title: "RCS på iPhone: ja, nu pratar de samma språk", category: "Grunder", published: d,
    description: "Länge var gröna bubblor synonymt med pixliga bilder. Så här fungerar RCS på iPhone och vad som avgör om det är påslaget.",
    keywords: ["rcs iphone", "rcs ios", "aktivera rcs iphone"], related: ["vad-ar-rcs", "rcs-pa-android", "aktivera-rcs"],
    sections: [
      { id: "bakgrund", title: "Slutet på bubbelkriget", sources: ["apple"], paragraphs: [
        "Den som har skickat en video från en iPhone till en Android vet hur det brukade gå: en suddig liten film som såg ut att vara inspelad genom en duschdörr. Anledningen var att meddelandet föll tillbaka till MMS, en teknik från tiden då mobiler hade antenner.",
        "Med RCS på iPhone kan bilder, läskvitton och skrivindikatorer fungera även i konversationer med telefoner som inte är iPhone. Apple beskriver funktionen på sin supportsida, och den hör ihop med appen Meddelanden."
      ] },
      { id: "krav", title: "Vad som måste stämma", sources: ["apple"], paragraphs: [
        "RCS på iPhone är inte bara en fråga om rätt iOS-version. Apple anger att stödet beror på operatör och region. Har din operatör inte slagit på det, hjälper det inte hur mycket du än uppdaterar.",
        "Tänk på det som en bro: båda sidor måste vara byggda för att någon ska kunna gå över."
      ], points: ["Aktuell iOS-version", "Operatör som stöder RCS", "RCS påslaget i inställningarna för Meddelanden"] },
      { id: "foretag", title: "Vad betyder det för företag?", sources: ["apple", "capabilities"], paragraphs: [
        "För ett företag är iPhone-stödet goda nyheter, eftersom fler mottagare kan få rikare meddelanden. Men stöd för privata chattar betyder inte automatiskt att varje företagsfunktion visas likadant. Kontrollera alltid mottagarens kapabilitet innan du lovar en karusell till hela kundregistret."
      ] }
    ]
  },
  {
    slug: "rcs-pa-android", title: "RCS på Android: guiden för dig som vill ha blå bockar", category: "Grunder", published: d,
    description: "De flesta Androidtelefoner kan använda RCS via Google Messages. Här är vad som krävs och hur du ser att det fungerar.",
    keywords: ["rcs android", "google messages rcs", "rcs samsung"], related: ["rcs-pa-iphone", "aktivera-rcs", "vad-ar-rcs"],
    sections: [
      { id: "app", title: "Appen gör jobbet", sources: ["chat"], paragraphs: [
        "På Android sköts RCS oftast av Google Messages. Appen kan växla mellan RCS, SMS och MMS beroende på vad som är möjligt i stunden. Lite som en tolk som byter språk utan att du märker det.",
        "Google kallar funktionen RCS-chattar. När den är aktiv kan du se skrivindikatorer, läskvitton och skicka bilder i bättre kvalitet."
      ] },
      { id: "kontroll", title: "Så ser du om RCS är på", sources: ["chat"], paragraphs: [
        "Gå till inställningarna i Google Messages och leta efter RCS-chattar. Där visas status. Står det att den ansluter kan det ta en stund, särskilt om du nyss bytt SIM-kort.",
        "RCS behöver mobildata eller wifi. Utan uppkoppling gör appen det enda rimliga och skickar som SMS, om du har tillåtit det."
      ] },
      { id: "tips", title: "Vanliga stötestenar", sources: ["chat"], paragraphs: [
        "Har du flyttat numret till en ny telefon kan det gamla RCS-registret ligga kvar en stund. Stäng av RCS på den gamla enheten innan du byter, så slipper du att meddelanden fastnar i limbo."
      ], points: ["Kontrollera uppkopplingen", "Uppdatera Google Messages", "Stäng av RCS innan du byter telefon"] }
    ]
  },
  {
    slug: "aktivera-rcs", title: "Så aktiverar du RCS på några minuter", category: "Grunder", published: d,
    description: "Steg för steg: slå på RCS på Android och iPhone, och vad du gör om det står att den ansluter för evigt.",
    keywords: ["aktivera rcs", "slå på rcs", "rcs inställningar"], related: ["rcs-pa-android", "rcs-pa-iphone", "rcs-myter"],
    sections: [
      { id: "android", title: "På Android", sources: ["chat"], paragraphs: [
        "Öppna Google Messages, tryck på din profilbild, välj inställningar och sedan RCS-chattar. Slå på reglaget. Klart. Det är ungefär lika svårt som att slå på ficklampan."
      ] },
      { id: "iphone", title: "På iPhone", sources: ["apple"], paragraphs: [
        "Gå till Inställningar, välj Appar och Meddelanden och leta efter RCS-meddelanden. Finns inte valet kan det bero på att operatören ännu inte stöder funktionen. Då är det inget du gjort fel."
      ] },
      { id: "fastnar", title: "När det står att den ansluter", sources: ["chat"], paragraphs: [
        "Ibland tar registreringen tid. Kontrollera att du har uppkoppling, starta om telefonen och vänta en stund. Det är inte ovanligt att det löser sig av sig självt, ungefär som när man ringer IT-supporten och problemet försvinner medan man väntar i kö."
      ], points: ["Kolla mobildata eller wifi", "Starta om telefonen", "Uppdatera appen och systemet"] }
    ]
  },
  {
    slug: "vad-kostar-rcs", title: "Vad kostar RCS? Ärliga siffror utan finstilt", category: "Grunder", published: d,
    description: "För privatpersoner kostar RCS data. För företag kostar det per meddelande. Så här hänger prisbilden ihop.",
    keywords: ["vad kostar rcs", "rcs pris", "rcs kostnad"], related: ["rcs-basic-single-conversation", "rcs-for-foretag", "rcs-roi"],
    sections: [
      { id: "privat", title: "För dig som privatperson", sources: ["chat"], paragraphs: [
        "En privat RCS-chatt går över mobildata eller wifi. Kostnaden ligger alltså i ditt dataabonnemang, inte i ett pris per meddelande. Sitter du på wifi märker du inget alls."
      ] },
      { id: "foretag", title: "För dig som företag", sources: ["business"], paragraphs: [
        "Företagsutskick är en annan sak. Där betalar du tjänsten som skickar. Hos oss betalar du per meddelande: RCS Basic 0,49 SEK, RCS Single 0,69 SEK och RCS Conversation 0,99 SEK. Inga månadsavgifter, inga bindningstider.",
        "Varför tre priser? För att ett kort textbesked och en hel konversation med bilder och svar är olika mycket jobb. Du betalar för det du faktiskt använder."
      ] },
      { id: "rakna", title: "Räkna på det själv", sources: ["practice"], paragraphs: [
        "Ett bra sätt att tänka: vad kostar det att inte nå fram? Ett påminnelsemeddelande som förhindrar en missad bokning kan vara värt många gånger sitt pris. Börja smått, mät och skala upp det som fungerar."
      ] }
    ]
  },
  {
    slug: "ar-rcs-sakert", title: "Är RCS säkert? Det här är skillnaden mellan verifiering och kryptering", category: "Grunder", published: d,
    description: "Verifierad avsändare och krypterad chatt låter som samma sak men är det inte. En lugn genomgång av vad som skyddar vad.",
    keywords: ["är rcs säkert", "rcs kryptering", "rcs säkerhet"], related: ["verifierad-avsandare", "vad-ar-rcs", "rcs-gdpr-samtycke"],
    sections: [
      { id: "tva", title: "Två olika skydd", sources: ["security", "verification"], paragraphs: [
        "Kryptering handlar om att ingen obehörig ska kunna läsa meddelandet på vägen. Verifiering handlar om att du ska veta vem som skickar. Det ena är ett kuvert, det andra är en namnteckning. Båda är bra, men de skyddar mot olika saker.",
        "Google beskriver end-to-end-kryptering för vissa privata RCS-chattar i Google Messages. Det betyder inte att varje företagsmeddelande har samma skydd."
      ] },
      { id: "bedrageri", title: "Skydd mot falska avsändare", sources: ["verification", "business"], paragraphs: [
        "Ett stort problem med SMS är att vem som helst kan låtsas vara banken. I RCS för företag kan avsändaren verifieras, och mottagaren ser namn, logotyp och en markering. Det gör det svårare för bedragare att klä ut sig."
      ] },
      { id: "rad", title: "Vad du som företag bör göra", sources: ["practice"], paragraphs: [
        "Skicka aldrig känsliga uppgifter som lösenord i ett meddelande, oavsett kanal. Använd verifierad avsändare, var konsekvent i tonen och lär kunderna hur ni brukar kontakta dem."
      ] }
    ]
  },
  {
    slug: "rcs-historia", title: "RCS historia: från bortglömd standard till nästa generations sms", category: "Grunder", published: d,
    description: "RCS har funnits längre än du tror. En kort och lite nördig resa genom hur standarden växte upp.",
    keywords: ["rcs historia", "när kom rcs", "rcs gsma"], related: ["universal-profile", "vad-ar-rcs", "rcs-vs-sms"],
    sections: [
      { id: "start", title: "En idé från branschen", sources: ["gsma"], paragraphs: [
        "RCS föddes ur en enkel fråga: vad händer när sms inte räcker längre? Mobilbranschen samlades kring GSMA för att ta fram en gemensam standard för rikare meddelanden, så att alla inte skulle bygga sina egna öar.",
        "I många år gick det trögt. Olika operatörer gjorde olika versioner och resultatet blev lite som att alla pratade dialekt men ingen förstod varandra."
      ] },
      { id: "profil", title: "Universal Profile gav ordning", sources: ["gsma"], paragraphs: [
        "Universal Profile blev svaret: en gemensam uppsättning funktioner som alla kunde rätta sig efter. Med den fick RCS en tydligare grund att växa på."
      ] },
      { id: "nu", title: "Där vi är nu", sources: ["chat", "apple"], paragraphs: [
        "I dag finns RCS i Google Messages och i Meddelanden på iPhone, beroende på operatör och region. Det som länge var en framtidsdröm är nu något många använder utan att ens veta om det."
      ] }
    ]
  },
  {
    slug: "universal-profile", title: "Universal Profile förklarad som för en tolvåring", category: "Grunder", published: d,
    description: "Universal Profile är regelboken som gör att RCS fungerar mellan olika aktörer. Så här enkelt kan det sägas.",
    keywords: ["universal profile", "rcs universal profile", "gsma rcs standard"], related: ["rcs-historia", "vad-ar-rcs", "rcs-myter"],
    sections: [
      { id: "regelbok", title: "En gemensam regelbok", sources: ["gsma"], paragraphs: [
        "Föreställ dig att alla i klassen ska spela samma brädspel men har olika regler. Det blir bråk. Universal Profile är den gemensamma regelboken för RCS, framtagen inom GSMA.",
        "Den beskriver vilka funktioner som ska finnas och hur de ska fungera tekniskt, så att olika telefoner och nät kan förstå varandra."
      ] },
      { id: "inte", title: "Vad den inte lovar", sources: ["gsma", "capabilities"], paragraphs: [
        "En regelbok betyder inte att alla spelar varje regel. Alla telefoner har inte alla funktioner. Därför behöver företag fortfarande kontrollera vad en mottagare faktiskt kan ta emot."
      ] }
    ]
  },
  {
    slug: "rcs-wifi-mobildata", title: "Behöver RCS internet? Om wifi, mobildata och dålig täckning", category: "Grunder", published: d,
    description: "RCS reser över data, inte över det gamla sms-nätet. Vad händer när du står i en källare utan täckning?",
    keywords: ["rcs wifi", "rcs mobildata", "rcs utan internet"], related: ["rcs-fallback-sms", "rcs-vs-sms", "rcs-pa-android"],
    sections: [
      { id: "data", title: "RCS åker datavägen", sources: ["chat"], paragraphs: [
        "SMS skickas över mobilnätets signalering, lite som brev med posten. RCS skickas över internet, som e-post. Därför behöver du wifi eller mobildata för att RCS ska fungera fullt ut."
      ] },
      { id: "kallare", title: "I källaren utan täckning", sources: ["chat"], paragraphs: [
        "Saknas uppkoppling kan Google Messages skicka som SMS eller MMS om inställningen tillåter det. Du får ditt meddelande fram, men utan de rika funktionerna. Lite som att byta från färg-tv till radio."
      ] },
      { id: "foretag", title: "För företagsutskick", sources: ["send"], paragraphs: [
        "Ett företag kan inte veta exakt var mottagaren befinner sig. Därför är en genomtänkt reservkanal viktig, så att viktiga besked kommer fram även när datan inte gör det."
      ] }
    ]
  },
  {
    slug: "rcs-myter", title: "Sju myter om RCS som det är dags att släppa", category: "Grunder", published: d,
    description: "Nej, RCS är ingen app. Och nej, det är inte alltid krypterat. Vi rättar till de vanligaste missförstånden.",
    keywords: ["rcs myter", "missförstånd rcs", "rcs fakta"], related: ["vad-ar-rcs", "ar-rcs-sakert", "rcs-vs-sms"],
    sections: [
      { id: "myter", title: "Myterna, en efter en", sources: ["chat", "security", "apple", "capabilities"], paragraphs: [
        "Myter sprider sig snabbare än läskvitton. Här är de vi hör oftast, och vad som faktiskt stämmer."
      ], points: [
        "RCS är en app. Nej, det är en standard som appar använder.",
        "Alla RCS-meddelanden är krypterade. Nej, det beror på tjänst och typ av konversation.",
        "RCS fungerar inte på iPhone. Jo, beroende på operatör och region.",
        "RCS kostar per meddelande för privatpersoner. Nej, det går över data.",
        "Alla telefoner visar samma sak. Nej, stödet varierar.",
        "RCS ersätter sms helt. Inte än, sms finns kvar som reserv.",
        "Företag kan skicka vad som helst. Nej, avsändare granskas och mottagaren kan blockera."
      ] }
    ]
  },
  {
    slug: "rcs-ordforklaring-pa-svenska", title: "RCS på svenska: så pratar du om tekniken utan att låta som en manual", category: "Grunder", published: d,
    description: "Agent, rich card, fallback. Här är de engelska orden översatta till vanlig svenska som dina kollegor förstår.",
    keywords: ["rcs svenska", "rcs begrepp", "rcs termer"], related: ["vad-ar-rcs", "rich-cards-karuseller", "rcs-fallback-sms"],
    sections: [
      { id: "ord", title: "Ordlistan i fickformat", sources: ["agent", "cards", "send"], paragraphs: [
        "Branschen älskar engelska ord. Det är inget fel med det, men på fikarasten fungerar svenskan bättre. Här är våra favoritöversättningar."
      ], points: [
        "Agent: företagets avsändare i RCS",
        "Rich card: ett meddelandekort med bild, text och knappar",
        "Carousel: flera kort i rad som man sveper mellan",
        "Suggested reply: ett färdigt svar man trycker på",
        "Fallback: reservkanal, ofta sms"
      ] },
      { id: "mer", title: "Vill du ha fler?", sources: ["gsma"], paragraphs: [
        "Vår RCS-ordlista samlar alla begrepp med korta förklaringar och källor. Perfekt att skicka till kollegan som just frågade vad en webhook är."
      ] }
    ]
  }
];
