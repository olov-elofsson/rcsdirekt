import type { Article } from "./rcs-knowledge";

const d = "2026-11-01";

export const foretagArticles: Article[] = [
  {
    slug: "rcs-marknadsforing", title: "RCS i marknadsföring: så gör du kampanjer folk faktiskt vill öppna", category: "För företag", published: d,
    description: "Rikt innehåll är roligt, men relevans är det som säljer. Så bygger du RCS-kampanjer som känns som service och inte som reklam.",
    keywords: ["rcs marknadsföring", "rcs kampanj", "mobil marknadsföring"], related: ["rcs-kampanjplan", "rich-cards-karuseller", "rcs-roi"],
    sections: [
      { id: "relevans", title: "Relevans slår glitter", sources: ["practice"], paragraphs: [
        "Det är frestande att fylla ett RCS-meddelande med allt: video, karusell, fem knappar och ett emoji-fyrverkeri. Men mottagaren har ungefär tre sekunder att ägna dig. Ett tydligt erbjudande och ett tydligt nästa steg vinner nästan alltid.",
        "Googles riktlinjer för företagsmeddelanden betonar just att innehållet ska vara användbart och förväntat."
      ] },
      { id: "format", title: "Välj format efter budskap", sources: ["cards", "features"], paragraphs: [
        "En ny produkt passar i ett rich card. Ett sortiment passar i en karusell. En fråga passar i föreslagna svar. Formatet ska hjälpa budskapet, inte tvärtom."
      ], points: ["En sak att visa: rich card", "Flera saker att jämföra: karusell", "En fråga att besvara: föreslagna svar"] },
      { id: "tajming", title: "Tajming är halva jobbet", sources: ["practice"], paragraphs: [
        "Ett lunchprivilegium klockan tio på kvällen är mest förvirrande. Skicka när mottagaren kan agera, och respektera kvällar och helger."
      ] }
    ]
  },
  {
    slug: "rcs-e-handel", title: "RCS för e-handel: från kundvagn till leverans", category: "För företag", published: d,
    description: "Orderbekräftelser, leveransbesked och övergivna kundvagnar. Så kan e-handlare använda RCS genom hela köpresan.",
    keywords: ["rcs e-handel", "rcs ehandel", "rcs webbutik"], related: ["rcs-leveransnotiser", "rcs-marknadsforing", "rich-cards-karuseller"],
    sections: [
      { id: "resan", title: "Hela köpresan i en tråd", sources: ["features"], paragraphs: [
        "Det fina med RCS för e-handel är att allt kan samlas i en konversation: orderbekräftelsen, beskedet att paketet skickats och påminnelsen om att hämta ut det. Kunden slipper leta i inkorgen."
      ] },
      { id: "visa", title: "Visa produkten, inte bara namnet", sources: ["cards"], paragraphs: [
        "En orderbekräftelse med bild på varan känns mer som en present än som ett kvitto. Ett rich card kan visa bild, titel och en knapp till ordern."
      ] },
      { id: "forsiktig", title: "Övergivna kundvagnar med fingertoppskänsla", sources: ["practice"], paragraphs: [
        "En påminnelse om en glömd kundvagn kan vara hjälpsam. Tre påminnelser är tjat. Var försiktig, ha samtycke och gör det lätt att säga nej tack."
      ] }
    ]
  },
  {
    slug: "rcs-kundservice", title: "RCS i kundservice: färre samtal, gladare kunder", category: "För företag", published: d,
    description: "Med föreslagna svar och tvåvägskonversationer kan kundservice lösa enkla ärenden direkt i meddelandeappen.",
    keywords: ["rcs kundservice", "rcs support", "kundtjänst meddelanden"], related: ["foreslagna-svar", "rcs-tonalitet", "rcs-for-foretag"],
    sections: [
      { id: "enkelt", title: "Låt de enkla frågorna lösa sig själva", sources: ["features"], paragraphs: [
        "Vilka är era öppettider? Var är mitt paket? Kan jag boka om? Många frågor är förutsägbara. Med föreslagna svar kan kunden trycka sig fram till svaret utan att vänta i telefonkö."
      ] },
      { id: "manniska", title: "Men visa vägen till en människa", sources: ["practice"], paragraphs: [
        "Ingenting är så frustrerande som en automat som inte förstår. Ha alltid ett tydligt val för att prata med en person. Det bygger förtroende, även om de flesta aldrig använder det."
      ] }
    ]
  },
  {
    slug: "rcs-bokningspaminnelser", title: "Bokningspåminnelser med RCS: färre tomma stolar", category: "För företag", published: d,
    description: "Frisörer, kliniker och verkstäder tappar pengar på missade tider. Så gör RCS det enkelt att bekräfta eller boka om.",
    keywords: ["rcs påminnelse", "bokningspåminnelse sms", "rcs bokning"], related: ["foreslagna-svar", "rcs-kundservice", "vad-kostar-rcs"],
    sections: [
      { id: "problem", title: "Den tomma stolen", sources: ["practice"], paragraphs: [
        "Alla som driver en verksamhet med bokningar känner igen det: kunden som bara inte dyker upp. En påminnelse hjälper, men en påminnelse där kunden kan svara direkt hjälper mer."
      ] },
      { id: "knappar", title: "Bekräfta, boka om eller avboka", sources: ["features"], paragraphs: [
        "Med föreslagna svar kan påminnelsen innehålla tre knappar. Kunden trycker, ni får besked och tiden kan erbjudas någon annan. Ingen behöver ringa."
      ], points: ["Jag kommer", "Boka om", "Avboka"] },
      { id: "plan", title: "Ha en plan för svaren", sources: ["events"], paragraphs: [
        "Knappar är bara roliga om någon tar emot svaren. Se till att svaren hamnar i ert bokningssystem eller hos en person som agerar."
      ] }
    ]
  },
  {
    slug: "rcs-leveransnotiser", title: "Leveransnotiser i RCS: paketet är på väg (och kunden vet det)", category: "För företag", published: d,
    description: "Spårningslänkar, tidsfönster och uthämtningsställen. Så gör du leveransbesked som minskar frågorna till kundservice.",
    keywords: ["rcs leverans", "leveransavisering", "paketavisering rcs"], related: ["rcs-e-handel", "verifierad-avsandare", "rcs-fallback-sms"],
    sections: [
      { id: "fortroende", title: "Förtroende först", sources: ["verification"], paragraphs: [
        "Falska paketaviseringar är ett av de vanligaste bedrägerierna. En verifierad avsändare med logotyp gör att kunden lättare känner igen ett äkta besked."
      ] },
      { id: "innehall", title: "Det kunden vill veta", sources: ["cards"], paragraphs: [
        "När kommer det? Var hämtar jag? Vad behöver jag ta med? Svara på det, lägg till en knapp till spårningen och sluta där."
      ] },
      { id: "reserv", title: "Viktigt besked kräver reserv", sources: ["send"], paragraphs: [
        "Ett leveransbesked är för viktigt för att utebli. Använd sms som reserv för mottagare som inte kan ta emot RCS."
      ] }
    ]
  },
  {
    slug: "rcs-restaurang-cafe", title: "RCS för restauranger och caféer: menyn i fickan", category: "För företag", published: d,
    description: "Dagens lunch med bild, bordsbokning med ett tryck och stamkundserbjudanden. Idéer för krogen och kaféet.",
    keywords: ["rcs restaurang", "sms restaurang", "rcs café"], related: ["rcs-marknadsforing", "rcs-bokningspaminnelser", "rich-cards-karuseller"],
    sections: [
      { id: "lunch", title: "Dagens lunch, nu med bild", sources: ["cards"], paragraphs: [
        "Ett sms som säger kycklinggryta är en sak. Ett rich card med en bild på den ångande grytan är en helt annan. Mat säljs med ögonen, även i mobilen."
      ] },
      { id: "boka", title: "Boka bord med ett tryck", sources: ["features"], paragraphs: [
        "En knapp som öppnar bokningen eller ringer restaurangen sparar kunden flera steg. Ju färre steg, desto fler bokningar."
      ] },
      { id: "lagom", title: "Lagom är bäst", sources: ["practice"], paragraphs: [
        "Skicka inte dagens lunch varje dag till alla. Låt kunderna välja vad de vill ha, så blir meddelandena välkomna i stället för irriterande."
      ] }
    ]
  },
  {
    slug: "rcs-gdpr-samtycke", title: "RCS, GDPR och samtycke: det tråkiga som är jätteviktigt", category: "För företag", published: d,
    description: "Rika meddelanden kräver samma omsorg om mottagaren som sms och e-post. En pedagogisk genomgång av grunderna.",
    keywords: ["rcs gdpr", "samtycke sms", "rcs regler"], related: ["ar-rcs-sakert", "rcs-marknadsforing", "verifierad-avsandare"],
    sections: [
      { id: "grund", title: "Samma grundregler som andra kanaler", sources: ["practice"], paragraphs: [
        "RCS är en ny kanal men inte ett kryphål. Om du behöver samtycke för att skicka marknadsföring via sms behöver du det även här. Kanalen byter kläder, reglerna gör det inte.",
        "Det här är ingen juridisk rådgivning. Stäm av med någon som kan dataskydd om du är osäker."
      ] },
      { id: "avsluta", title: "Gör det lätt att säga nej", sources: ["practice", "features"], paragraphs: [
        "Ett föreslaget svar som säger avsluta är både vänligt och klokt. Mottagare som enkelt kan avregistrera sig blockerar mer sällan avsändaren."
      ] },
      { id: "data", title: "Tänk på vad du sparar", sources: ["events"], paragraphs: [
        "Leveranshändelser och svar är personuppgifter när de kopplas till en person. Spara det ni behöver, så länge ni behöver det, och inte mer."
      ] }
    ]
  },
  {
    slug: "rcs-roi", title: "Mät RCS rätt: från levererat till affär", category: "För företag", published: d,
    description: "Läst och klickat är kul att se, men vad betyder det för affären? Så kopplar du RCS-statistik till verkliga resultat.",
    keywords: ["rcs statistik", "rcs roi", "mäta rcs"], related: ["rcs-leveransstatus", "vad-kostar-rcs", "rcs-marknadsforing"],
    sections: [
      { id: "tratt", title: "Från levererat till köpt", sources: ["events"], paragraphs: [
        "RCS kan ge mer information än sms: levererat, läst och vilka knappar som tryckts. Det är en tratt. Längst ner finns det som faktiskt räknas, till exempel en bokning eller ett köp."
      ] },
      { id: "fallgrop", title: "Läskvitton är ingen sanning", sources: ["chat"], paragraphs: [
        "Ett läskvitto betyder att meddelandet visats, inte att det förståtts. Och alla mottagare skickar inte läskvitton. Använd siffran som en signal, inte som ett facit."
      ] },
      { id: "test", title: "Testa en sak i taget", sources: ["practice"], paragraphs: [
        "Vill du veta om bilden gör skillnad? Skicka med och utan till två jämnstora grupper. Ändrar du allt samtidigt vet du ingenting."
      ] }
    ]
  },
  {
    slug: "rcs-kampanjplan", title: "Din första RCS-kampanj: en plan på en servett", category: "För företag", published: d,
    description: "Mål, målgrupp, meddelande, mätning. En enkel plan för dig som vill komma igång utan att drunkna i detaljer.",
    keywords: ["rcs kampanj", "första rcs utskick", "komma igång rcs"], related: ["rcs-marknadsforing", "testa-rcs-utskick", "rcs-roi"],
    sections: [
      { id: "servett", title: "Fyra rader räcker", sources: ["practice"], paragraphs: [
        "De bästa planerna får plats på en servett. Om din inte gör det är den förmodligen för krånglig för en första kampanj."
      ], points: ["Mål: vad ska hända?", "Målgrupp: vem ska få det?", "Meddelande: vad ska de se?", "Mätning: hur vet vi att det funkade?"] },
      { id: "liten", title: "Börja litet", sources: ["practice", "capabilities"], paragraphs: [
        "Skicka först till en mindre grupp. Kontrollera hur meddelandet ser ut, hur många som kan ta emot RCS och vad som händer med resten. Sedan skalar du upp."
      ] }
    ]
  },
  {
    slug: "rcs-tonalitet", title: "Tonalitet i RCS: skriv som en människa, inte som ett system", category: "För företag", published: d,
    description: "Meddelandeappen är en personlig plats. Så hittar du en ton som känns varm och tydlig utan att bli fånig.",
    keywords: ["rcs tonalitet", "skriva sms till kunder", "ton i kundmeddelanden"], related: ["skriva-bra-rcs-meddelanden", "rcs-kundservice", "rcs-marknadsforing"],
    sections: [
      { id: "plats", title: "Du är gäst i någons vardagsrum", sources: ["practice"], paragraphs: [
        "Meddelandeappen är där folk pratar med sin mamma och sina vänner. När ett företag dyker upp där är det som att bli inbjuden på fika. Uppför dig därefter: vänligt, kort och utan att dominera samtalet."
      ] },
      { id: "regler", title: "Tre enkla regler", sources: ["practice"], paragraphs: [
        "Skriv som du skulle säga det. Undvik versaler som skriker. Och använd emoji som krydda, inte som huvudrätt."
      ], points: ["Säg det viktigaste först", "Var konsekvent mellan meddelanden", "Läs högt innan du skickar"] }
    ]
  }
];
