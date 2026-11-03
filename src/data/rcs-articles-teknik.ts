import type { Article } from "./rcs-knowledge";

const d = "2026-11-01";

export const teknikArticles: Article[] = [
  {
    slug: "rcs-basic-single-conversation", title: "RCS Basic, Single eller Conversation: vilken behöver du?", category: "Meddelanden", published: d,
    description: "Tre meddelandetyper, tre användningsområden. En enkel guide så du väljer rätt utan att betala för mycket.",
    keywords: ["rcs basic", "rcs single", "rcs conversation", "rcs meddelandetyper"], related: ["vad-kostar-rcs", "rich-cards-karuseller", "foreslagna-svar"],
    sections: [
      { id: "basic", title: "Basic: det korta beskedet", sources: ["features"], paragraphs: [
        "RCS Basic passar när du vill säga en sak kort och tydligt, men med verifierad avsändare. Tänk orderbekräftelse eller kod. Pris hos oss: 0,30 SEK."
      ] },
      { id: "single", title: "Single: ett rikt meddelande", sources: ["cards"], paragraphs: [
        "RCS Single är för när du vill visa något: en bild, ett kort, en knapp. Ett komplett meddelande som står på egna ben. Pris: 0,425 SEK. Det är den de flesta väljer."
      ] },
      { id: "conversation", title: "Conversation: när ni ska prata", sources: ["features", "events"], paragraphs: [
        "RCS Conversation är för dialog, när mottagaren ska kunna svara och ni ska kunna svara tillbaka. Bokningar, support och frågor. Pris: 0,63 SEK."
      ] }
    ]
  },
  {
    slug: "foreslagna-svar", title: "Föreslagna svar: knapparna som gör konversationen lätt", category: "Meddelanden", published: d,
    description: "Suggested replies låter mottagaren svara med ett tryck. Så använder du dem utan att det känns som ett formulär.",
    keywords: ["föreslagna svar", "suggested replies", "rcs knappar svar"], related: ["rcs-kundservice", "rcs-bokningspaminnelser", "lankar-och-knappar"],
    sections: [
      { id: "vad", title: "Vad är ett föreslaget svar?", sources: ["features"], paragraphs: [
        "Ett föreslaget svar är en liten bubbla under meddelandet som mottagaren kan trycka på i stället för att skriva. Svaret skickas tillbaka som om de hade skrivit det själva. Magi för tummar."
      ] },
      { id: "hur", title: "Så skriver du bra svarsknappar", sources: ["practice"], paragraphs: [
        "Håll dem korta, gör dem tydligt olika och ha inte för många. Två till fyra val brukar räcka. Fler än så och det börjar likna en flervalsfråga på ett prov."
      ], points: ["Korta ord", "Tydliga skillnader", "Ett val för något annat"] }
    ]
  },
  {
    slug: "rcs-bilder-video", title: "Bilder och video i RCS: så blir det snyggt på alla skärmar", category: "Meddelanden", published: d,
    description: "Media är en av RCS största styrkor. Här är tankarna som gör att dina bilder ser bra ut och laddar snabbt.",
    keywords: ["rcs bild", "rcs video", "media i rcs"], related: ["rich-cards-karuseller", "rcs-restaurang-cafe", "skriva-bra-rcs-meddelanden"],
    sections: [
      { id: "kvalitet", title: "Äntligen skarpa bilder", sources: ["chat", "cards"], paragraphs: [
        "Med RCS slipper du de frimärksstora, pixliga bilderna från MMS-tiden. Bilder och video kan visas i bättre kvalitet, och i ett rich card sitter de ihop med text och knappar."
      ] },
      { id: "tips", title: "Tips för bättre media", sources: ["cards", "practice"], paragraphs: [
        "Tänk mobil först: motivet ska synas på en liten skärm. Undvik text i bilden som blir oläslig. Och håll filerna rimligt stora, mottagaren kan sitta på en tågresa med usel täckning."
      ], points: ["Tydligt motiv", "Lite eller ingen text i bilden", "Rimlig filstorlek"] }
    ]
  },
  {
    slug: "skriva-bra-rcs-meddelanden", title: "Skriv bra RCS-meddelanden: 9 tips från verkligheten", category: "Meddelanden", published: d,
    description: "Kort, tydligt och med ett nästa steg. Praktiska skrivtips för dig som ska skicka ditt första rika meddelande.",
    keywords: ["skriva rcs meddelande", "rcs tips", "bra sms text"], related: ["rcs-tonalitet", "rcs-bilder-video", "lankar-och-knappar"],
    sections: [
      { id: "tips", title: "Tipsen", sources: ["practice", "cards"], paragraphs: [
        "Att RCS rymmer mer betyder inte att du ska skriva mer. Det betyder att du kan visa i stället för att förklara."
      ], points: [
        "Börja med det viktigaste",
        "En idé per meddelande",
        "Använd bild när den säger mer än texten",
        "Ett tydligt nästa steg",
        "Skriv knapptexter som verb",
        "Undvik förkortningar",
        "Var personlig men inte påträngande",
        "Testa på en riktig telefon",
        "Läs högt innan du skickar"
      ] }
    ]
  },
  {
    slug: "lankar-och-knappar", title: "Länkar och åtgärdsknappar: ring, öppna, hitta hit", category: "Meddelanden", published: d,
    description: "Knappar kan öppna en webbsida, ringa ett nummer eller visa en plats. Så väljer du rätt åtgärd.",
    keywords: ["rcs knappar", "rcs åtgärder", "suggested actions"], related: ["foreslagna-svar", "rich-cards-karuseller", "skriva-bra-rcs-meddelanden"],
    sections: [
      { id: "typer", title: "Vad kan en knapp göra?", sources: ["features"], paragraphs: [
        "En åtgärdsknapp gör något i telefonen åt mottagaren. Det sparar steg. I stället för att kopiera ett telefonnummer trycker man bara."
      ], points: ["Öppna en webbsida", "Ringa ett nummer", "Visa en plats på kartan", "Lägga in i kalendern"] },
      { id: "val", title: "Välj den knapp som tar bort mest friktion", sources: ["practice"], paragraphs: [
        "Fråga dig: vad vill mottagaren helst göra härnäst? Om svaret är att ringa, ge dem en ring-knapp. Om svaret är att hitta dit, ge dem kartan."
      ] }
    ]
  },
  {
    slug: "rcs-fallback-sms", title: "SMS som reserv: plan B som räddar dagen", category: "Integration", published: d,
    description: "Alla kan inte ta emot RCS. Så tänker du kring reservkanal så att viktiga meddelanden alltid kommer fram.",
    keywords: ["rcs fallback", "sms reserv", "reservkanal rcs"], related: ["rcs-api-webhooks", "kapabilitetskontroll", "rcs-wifi-mobildata"],
    sections: [
      { id: "varfor", title: "Varför plan B behövs", sources: ["capabilities", "send"], paragraphs: [
        "Någon har en gammal telefon, någon står i en källare, någon har stängt av RCS. Utan reserv når ditt meddelande inte fram till dem. Med reserv får de i alla fall texten."
      ] },
      { id: "skriv", title: "Skriv reservtexten med omsorg", sources: ["practice"], paragraphs: [
        "Reservmeddelandet ska fungera på egen hand. Tänk inte att det är en sämre kopia, tänk att det är samma budskap i ett enklare format. Byt knappar mot en länk."
      ] }
    ]
  },
  {
    slug: "rcs-leveransstatus", title: "Leveransstatus i RCS: skickat, levererat, läst", category: "Integration", published: d,
    description: "Vad betyder varje status, och vad kan du lita på? En pedagogisk genomgång av händelserna efter ett utskick.",
    keywords: ["rcs leveransstatus", "rcs läskvitto", "rcs status"], related: ["rcs-roi", "rcs-api-webhooks", "rcs-fallback-sms"],
    sections: [
      { id: "steg", title: "Meddelandets resa", sources: ["events"], paragraphs: [
        "Efter att du tryckt skicka börjar en liten resa. Plattformen skickar händelser när meddelandet levererats och, om mottagaren tillåter, när det lästs. Tänk på det som spårning för paket, fast för text."
      ] },
      { id: "tolka", title: "Tolka med förnuft", sources: ["chat", "events"], paragraphs: [
        "Ingen läsrapport betyder inte att ingen läst. Mottagaren kan ha stängt av läskvitton. Titta på trender över många meddelanden snarare än enskilda."
      ] }
    ]
  },
  {
    slug: "testa-rcs-utskick", title: "Testa innan du skickar: checklistan som sparar ansiktet", category: "Integration", published: d,
    description: "Ett stavfel till tiotusen kunder är ingen kul fredag. Så testar du RCS-utskick på riktigt innan de går ut.",
    keywords: ["testa rcs", "rcs test", "testutskick"], related: ["rcs-kampanjplan", "kapabilitetskontroll", "skriva-bra-rcs-meddelanden"],
    sections: [
      { id: "lista", title: "Checklistan", sources: ["practice", "send"], paragraphs: [
        "Alla har någon gång skickat något de ångrat. Ett test tar fem minuter och kan rädda en hel vecka."
      ], points: ["Skicka till dig själv på Android och iPhone", "Kontrollera att alla knappar fungerar", "Titta på reservmeddelandet", "Läs texten högt", "Låt en kollega granska"] },
      { id: "riktig", title: "Testa på riktiga telefoner", sources: ["capabilities"], paragraphs: [
        "En förhandsvisning är bra, men en riktig telefon är bättre. Stöd och utseende kan skilja sig mellan enheter."
      ] }
    ]
  },
  {
    slug: "kapabilitetskontroll", title: "Kapabilitetskontroll: fråga telefonen innan du pratar", category: "Integration", published: d,
    description: "Innan du skickar en karusell kan du kontrollera om mottagaren kan ta emot den. Så fungerar kapabilitetskontroller.",
    keywords: ["rcs capability check", "kapabilitetskontroll", "rcs stöd mottagare"], related: ["rcs-fallback-sms", "testa-rcs-utskick", "rcs-pa-android"],
    sections: [
      { id: "vad", title: "En artig fråga först", sources: ["capabilities"], paragraphs: [
        "En kapabilitetskontroll är som att fråga om någon talar svenska innan du börjar prata. Plattformen frågar om mottagaren kan nås via RCS och vilka funktioner som stöds."
      ] },
      { id: "anvand", title: "Använd svaret klokt", sources: ["capabilities", "send"], paragraphs: [
        "Om svaret är nej skickar du reserven direkt. Om svaret är ja kan du skicka det rika meddelandet. Resultatet kan ändras över tid, så lita inte på gamla svar för evigt."
      ] }
    ]
  },
  {
    slug: "rcs-agent-registrering", title: "Från idé till godkänd avsändare: så registreras en RCS-agent", category: "Integration", published: d,
    description: "Namn, logotyp, beskrivning och granskning. Vad som händer när ett företag ska bli avsändare i RCS.",
    keywords: ["rcs agent", "registrera rcs avsändare", "rcs varumärke"], related: ["verifierad-avsandare", "rcs-for-foretag", "ar-rcs-sakert"],
    sections: [
      { id: "agent", title: "Vad är en agent?", sources: ["agent"], paragraphs: [
        "I RCS kallas företagets avsändare för agent. Inget hemligt med det, bara en profil med namn, logotyp, färg och kontaktuppgifter som visas för mottagaren."
      ] },
      { id: "granskning", title: "Granskningen", sources: ["verification"], paragraphs: [
        "Innan agenten får skicka till alla granskas varumärket. Det ska bekräfta att den som registrerar faktiskt får företräda företaget. Det tar lite tid, men det är också det som gör att mottagaren kan lita på avsändaren."
      ], points: ["Tydligt företagsnamn", "Logotyp i bra kvalitet", "Kort beskrivning", "Kontaktuppgifter"] }
    ]
  }
];
