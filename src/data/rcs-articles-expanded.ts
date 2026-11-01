import type { Article } from "./rcs-knowledge";

// Editorial explanations checked against the linked sources on 2026-11-01.
export const expandedArticles: Article[] = [
  {
    "slug": "rcs-sverige-operatorer",
    "title": "Vilka svenska operatörer stöder RCS?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs operatörer sverige tillgänglighet"
    ],
    "published": "2026-11-01",
    "description": "Tele2 och Comviq uppger att RCS fungerar på både iPhone och Android. För andra svenska operatörer behöver du fråga om stödet för ditt abonnemang och din telefon.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Apples operatörslista och operatörernas egna supportsidor ger inte samma besked: den 1 november 2026 saknade Sveriges avsnitt hos Apple RCS-markeringar, trots Tele2s och Comviqs uppgifter om iPhone-stöd. Därför går det inte att ge ett säkert svar för hela Sverige utifrån den listan.",
          "Ska ett företag skicka RCS behövs en annan kontroll. Leverantören måste kunna nå kunderna från företagets registrerade avsändare. Att två personer kan chatta med RCS säger inte om ett företagsutskick når samma telefoner."
        ],
        "sources": [
          "tele2-rcs",
          "comviq-rcs",
          "apple-carriers",
          "apple"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-tele2",
    "title": "Fungerar RCS hos Tele2?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs tele2 iphone android"
    ],
    "published": "2026-11-01",
    "description": "Ja, enligt Tele2s support. Där anges iOS 18 eller senare för iPhone och Android 5.0 eller senare med Google Meddelanden för Android.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Du och den du skriver till behöver ha RCS aktiverat och vara uppkopplade. Titta i konversationens skrivfält för att se om den använder RCS. Telefonens huvudinställning säger bara att funktionen är påslagen.",
          "Saknas valet på en uppdaterad telefon, fråga Tele2 om just ditt abonnemang. Beskedet här gäller privat chatt och bygger på supportsidan den 1 november 2026. Företagsutskick behöver kontrolleras med utskicksleverantören."
        ],
        "sources": [
          "tele2-rcs",
          "apple"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-comviq",
    "title": "Fungerar RCS hos Comviq?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs comviq iphone android"
    ],
    "published": "2026-11-01",
    "description": "Comviq säger att RCS fungerar på iPhone och Android. Deras support anger iOS 18 eller senare för iPhone och Google Meddelanden på en kompatibel Android-telefon.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "På Android ser du anslutningsstatus under RCS-chattar i appens inställningar. På iPhone kan du se vilken kanal en konversation använder i skrivfältet. Även den du skriver till behöver ha RCS och internet.",
          "Uppgifterna kommer från Comviqs supportsida den 1 november 2026. Om du undrar över kontantkort eller om inställningen saknas, be Comviq kontrollera ditt nummer. Stödet hos en annan operatör besvarar inte den frågan."
        ],
        "sources": [
          "comviq-rcs",
          "apple"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-telia-kontroll",
    "title": "Hur kontrollerar jag RCS hos Telia?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs telia iphone abonnemang"
    ],
    "published": "2026-11-01",
    "description": "Fråga Telia om RCS för din telefon och ditt abonnemang. Apples svenska operatörslista saknade en RCS-markering för Telia den 1 november 2026, så den ger inget bekräftat ja.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Frånvaron i listan räcker inte heller för ett säkert nej, särskilt inte för Android. Där kan du själv öppna Google Meddelanden och läsa statusen under RCS-chattar. På iPhone behöver abonnemanget ha operatörsstöd.",
          "Säg vilken telefon du har när du frågar Telia. Ett svar om företagets utskickstjänst är inte ett svar om privat RCS på ditt mobilnummer."
        ],
        "sources": [
          "apple-carriers",
          "apple",
          "chat"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-telenor-kontroll",
    "title": "Hur kontrollerar jag RCS hos Telenor?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs telenor iphone stöd"
    ],
    "published": "2026-11-01",
    "description": "Be Telenor bekräfta RCS för ditt abonnemang och ange om du använder iPhone eller Android. Apples svenska Telenor-avsnitt saknade RCS-markering vid kontrollen den 1 november 2026.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "På Android kan du få ett mer konkret besked genom anslutningsstatusen i Google Meddelanden. För iPhone behöver både iOS-versionen och abonnemangets stöd stämma. En uppdaterad telefon löser inte ett saknat operatörsstöd.",
          "Om Telenor beskriver en tjänst för företagsutskick gäller det en annan användning. Be om ett uttryckligt besked om privat chatt för din linje."
        ],
        "sources": [
          "apple-carriers",
          "apple",
          "chat"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-tre-kontroll",
    "title": "Hur kontrollerar jag RCS hos Tre?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs tre 3 iphone stöd"
    ],
    "published": "2026-11-01",
    "description": "Tre behöver bekräfta om RCS fungerar på ditt abonnemang. Vid kontrollen den 1 november 2026 listade Apple inte RCS i sitt svenska avsnitt för 3.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Det säger inte allt om Android, där RCS-statusen i Google Meddelanden kan visa om anslutningen fungerar. För iPhone bör Tre bekräfta stödet för den linje du använder.",
          "Ha telefonmodell och systemversion till hands när du kontaktar supporten. Berätta också om du har SIM eller eSIM. Börja där, snarare än att återställa telefonen för en funktion som kanske inte är aktiverad hos operatören."
        ],
        "sources": [
          "apple-carriers",
          "apple",
          "chat"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-lagprisoperator",
    "title": "Kan jag anta RCS-stöd från operatörens nät?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs hallon fello vimla halebop nät"
    ],
    "published": "2026-11-01",
    "description": "Du kan inte utgå från att Hallon, Fello, Vimla eller Halebop har samma RCS-stöd som operatören vars nät de använder. Nättäckning och meddelandefunktioner är skilda saker.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Fråga ditt eget varumärke om abonnemanget och ange iPhone eller Android. Funktioner kan behöva aktiveras separat även när två abonnemang använder samma mobilnät.",
          "Prova sedan med en kontakt som har fungerande RCS och läs kanaltexten i appen. Ett oklart supportbesked bör stå som obekräftat stöd, inte omvandlas till ett ja."
        ],
        "sources": [
          "apple",
          "apple-carriers",
          "chat"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-apple-operator-uppgifter",
    "title": "Varför skiljer sig Apples och operatörens RCS-besked?",
    "category": "Mobil & operatörer",
    "keywords": [
      "apple rcs operatör olika uppgifter"
    ],
    "published": "2026-11-01",
    "description": "Tele2 och Comviq bekräftade iPhone-stöd på sina supportsidor den 1 november 2026. Samma dag saknade Apples svenska operatörslista RCS-markeringar. Sidorna gav alltså olika besked.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Vi vet inte varför uppgifterna skiljer sig. Det vore därför fel att välja en förklaring, till exempel att en viss sida ligger efter, utan belägg.",
          "För dig som vill chatta är ett besked om ditt abonnemang och ett test i appen mest användbart. För ett företagsutskick måste leverantören dessutom bekräfta vilka kunder den registrerade avsändaren kan nå."
        ],
        "sources": [
          "apple-carriers",
          "tele2-rcs",
          "comviq-rcs"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-operator-byte",
    "title": "Vad händer med RCS när jag byter operatör?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs byta operatör nummerflytt"
    ],
    "published": "2026-11-01",
    "description": "När du byter operatör kan RCS behöva kontrolleras på nytt, även om du behåller numret. Den nya operatören kan ha andra förutsättningar, särskilt för iPhone.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "När nummerflytten är klar: se att rätt nummer används i meddelandeappen och läs RCS-statusen. Prova med någon som redan har fungerande RCS.",
          "Om det slutade fungera vid bytet, berätta det för supporten tillsammans med datumet för nummerflytten. Det hjälper dem att skilja registreringsproblem från problem i en enskild chatt."
        ],
        "sources": [
          "chat",
          "apple"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-sim-byte",
    "title": "Varför slutade RCS fungera efter ett SIM-byte?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs nytt sim esim fungerar inte"
    ],
    "published": "2026-11-01",
    "description": "Efter ett SIM- eller eSIM-byte kan appens nummerregistrering eller val av linje behöva ses över. Kontrollera först att rätt nummer är aktivt och att internet fungerar.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Läs sedan RCS-statusen i meddelandeappen. På Android finns den i Google Meddelanden. På iPhone behöver du också se att RCS är tillgängligt för den nya linjen.",
          "Kvarstår felet, berätta för supporten när SIM-kortet byttes och vad appen visar. Det är bättre underlag än att bara rapportera att meddelanden inte kommer fram."
        ],
        "sources": [
          "chat",
          "apple"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-dubbla-sim",
    "title": "Vilket nummer använder RCS med dubbla SIM?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs dual sim två nummer"
    ],
    "published": "2026-11-01",
    "description": "Med dubbla SIM kan RCS använda ett annat nummer än du tänkt. Kontrollera vilken linje konversationen och meddelandeappen är inställda på.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Telefonens linje för mobildata och numret som registrerats för RCS behöver inte vara samma sak. Hur de väljs skiljer sig mellan appar och telefoner.",
          "Testa en linje i taget med en känd RCS-kontakt. Om numret i inställningarna är fel, ta det vidare till operatören eller appens support. Stöd på den ena linjen bekräftar inte stöd på den andra."
        ],
        "sources": [
          "chat",
          "apple"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-saknad-installning",
    "title": "Varför saknas RCS-inställningen på iPhone?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs inställning saknas iphone"
    ],
    "published": "2026-11-01",
    "description": "RCS-valet kan saknas på iPhone när operatören eller abonnemanget inte stöder funktionen. Apple kräver både kompatibel iOS-version och operatörsstöd.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Uppdatera telefonen och fråga operatören om ditt nummer. Att en vän har RCS på samma iPhone-modell säger inte att ditt abonnemang har samma stöd.",
          "Om operatören bekräftar att det ska fungera, uppge telefonmodell, iOS-version och vilken linje som är aktiv. Då kan supporten undersöka varför valet ändå saknas."
        ],
        "sources": [
          "apple",
          "tele2-rcs"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-fastnar-verifiering",
    "title": "Vad gör jag när RCS fastnar på verifiering?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs verifierar nummer ansluter fastnar"
    ],
    "published": "2026-11-01",
    "description": "När RCS står kvar på verifiering är nummerregistreringen inte klar. Se först att appen visar rätt nummer och att telefonen har internet.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Uppdatera Google Meddelanden och följ Googles felsökningsråd. Att slå av och på reglaget om och om igen är ingen säker genväg.",
          "Skriv ned statusmeddelandet om du behöver hjälp. Berätta om du nyligen bytt telefon, nummer, SIM eller operatör; det kan göra det lättare att hitta orsaken."
        ],
        "sources": [
          "chat"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-vissa-kontakter",
    "title": "Varför fungerar RCS bara med vissa kontakter?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs fungerar bara vissa kontakter"
    ],
    "published": "2026-11-01",
    "description": "En telefon kan använda RCS med en kontakt och SMS med en annan. Båda deltagarna måste ha fungerande RCS i just den konversationen.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Be kontakten kontrollera att RCS är på och internet fungerar. Se även att du skriver till rätt nummer, särskilt om personen nyligen bytt det.",
          "Prova en enkel text till någon som brukar fungera med RCS. Om det går är din egen anslutning sannolikt inte hela problemet. Fortsätt då felsöka den kontakt eller chatt där felet uppstår."
        ],
        "sources": [
          "chat",
          "apple"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-meddelandekanal",
    "title": "Hur ser jag om ett meddelande skickas som RCS?",
    "category": "Mobil & operatörer",
    "keywords": [
      "se rcs sms kanal meddelande"
    ],
    "published": "2026-11-01",
    "description": "Läs kanaltexten i konversationens skrivfält eller meddelandets information. Bubblans färg räcker inte: på iPhone är RCS grönt, precis som SMS och MMS.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Tele2 beskriver att skrivfältet visar RCS-meddelande när kanalen används. På Android kan appens kanalmarkering och anslutningsstatus ge motsvarande ledning.",
          "För ett meddelande som har skickats om behöver du läsa dess egen status. En fungerande RCS-anslutning just nu säger inte hur ett tidigare meddelande skickades."
        ],
        "sources": [
          "tele2-rcs",
          "apple-channels",
          "chat"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-iphone-grona-bubblor",
    "title": "Betyder en grön bubbla att det är SMS?",
    "category": "Mobil & operatörer",
    "keywords": [
      "grön bubbla iphone rcs sms"
    ],
    "published": "2026-11-01",
    "description": "En grön bubbla på iPhone kan vara RCS, SMS eller MMS. Blå bubblor är iMessage. Grönt betyder alltså inte automatiskt SMS.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Titta på kanaltexten i skrivfältet för ett bättre besked. Läskvitton och bättre bilddelning kan förekomma med RCS, men de beror också på inställningar och mottagarstöd.",
          "Vid felsökning, skriv ned vad appen säger om kanalen. Färgen ensam ger supporten för lite information för att skilja ett SMS-fel från ett RCS-fel."
        ],
        "sources": [
          "apple-channels",
          "apple"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-roaming",
    "title": "Fungerar RCS när jag är utomlands?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs roaming utomlands"
    ],
    "published": "2026-11-01",
    "description": "RCS kan fungera utomlands via wifi eller mobildata. Appen behöver fortfarande vara ansluten och både ditt abonnemang och mottagaren måste ha stöd.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Fråga operatören om dataroaming och villkoren för landet du besöker. Wifi kan ge internet utan mobildata, men avgifterna för ett eventuellt reserv-SMS är en separat fråga.",
          "Prova innan du behöver skicka ett viktigt besked. Om appen väljer SMS eller MMS kan andra priser gälla än för din vanliga dataanvändning."
        ],
        "sources": [
          "chat",
          "apple"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-kontantkort",
    "title": "Fungerar RCS med kontantkort?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs kontantkort stöd"
    ],
    "published": "2026-11-01",
    "description": "RCS med kontantkort behöver bekräftas av operatören för just det kortet. Ett besked om operatörens abonnemang täcker inte nödvändigtvis alla kontantkort.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Du behöver internet och en fungerande registrering i appen. För iPhone ska operatörens besked också gälla iPhone, inte bara Android.",
          "Kontrollera priset för SMS och MMS om appen använder dem som reserv. Ett RCS-meddelande över wifi och ett reserv-SMS kan belasta olika delar av kontantkortet."
        ],
        "sources": [
          "chat",
          "apple"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-flytta-telefon",
    "title": "Vad behöver jag göra med RCS när jag byter telefon?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs byta telefon gammal enhet"
    ],
    "published": "2026-11-01",
    "description": "När du flyttar numret till en ny telefon, kontrollera att RCS använder rätt nummer där. Appen ska visa att anslutningen fungerar innan du förlitar dig på den.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Följ appens råd om att stänga av eller avregistrera RCS på den gamla enheten, särskilt om du byter meddelandeapp. Se sedan över inställningarna på den nya.",
          "Testa både RCS och vanligt SMS. Om något slutade fungera vid flytten, ge supporten modell och app för båda telefonerna så att de kan följa vad som ändrats."
        ],
        "sources": [
          "chat",
          "apple"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-avaktivera",
    "title": "Hur stänger jag av RCS?",
    "category": "Mobil & operatörer",
    "keywords": [
      "stänga av rcs inaktivera"
    ],
    "published": "2026-11-01",
    "description": "På iPhone stänger du av RCS under Inställningar, Appar, Meddelanden och RCS-meddelanden. På Android finns reglaget i Google Meddelandens inställningar för RCS-chattar.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Har du inte kvar Android-telefonen, använd Googles hjälp för avregistrering. Att bara radera appen är inte samma sak som att stänga av registreringen.",
          "Efter avstängningen kan appen använda SMS eller MMS där det går. De har egna avgifter och nätkrav. Kontrollera separat om äldre väntande meddelanden kommit fram."
        ],
        "sources": [
          "chat",
          "apple"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-foretagsmeddelanden-iphone",
    "title": "Kan jag stänga av företags-RCS på iPhone?",
    "category": "Mobil & operatörer",
    "keywords": [
      "stänga av rcs företagsmeddelanden iphone"
    ],
    "published": "2026-11-01",
    "description": "Apple beskriver ett eget reglage för RCS-företagsmeddelanden. Det finns under Inställningar, Appar, Meddelanden och RCS-meddelanden när funktionen är tillgänglig.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Med det kan du stänga av företagsmeddelanden utan att stänga av privat RCS-chatt. Saknas valet, kontrollera programvaran och vad operatören stöder.",
          "Vill du sluta få reklam från ett visst företag bör du även avregistrera dig hos företaget. Ett kanalreglage i telefonen ändrar inte säkert dina val för e-post eller andra utskick."
        ],
        "sources": [
          "apple"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-blockera-foretag",
    "title": "Hur blockerar jag ett företag i Google Meddelanden?",
    "category": "Mobil & operatörer",
    "keywords": [
      "blockera företag rcs google meddelanden"
    ],
    "published": "2026-11-01",
    "description": "Öppna företagschatten i Google Meddelanden och använd appens alternativ för blockering, rapportering eller avregistrering. Vilka val du ser kan variera.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Läs vad alternativet gör. Att rapportera skräppost till appen och att be företaget sluta skicka kan vara olika handlingar.",
          "Du kan även kontakta företaget för att invända mot dess direktmarknadsföring. Spara bekräftelsen om du vill kunna följa upp att utskicken har stoppats."
        ],
        "sources": [
          "business"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-gruppchatt",
    "title": "Vad händer i en gruppchatt om någon saknar RCS?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs gruppchatt deltagare stöd"
    ],
    "published": "2026-11-01",
    "description": "En grupp där någon saknar RCS kan få andra funktioner än en RCS-grupp. Vad som fungerar beror på vilka kanaler deltagarnas appar kan använda tillsammans.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Läs kanaltexten för gruppen. Bildkvalitet, läskvitton och hantering av deltagare kan ändras när en annan kanal används.",
          "Testa med de personer som faktiskt ska vara med. Ett fungerande samtal mellan två personer säger inte hur hela gruppen fungerar. Privat gruppchatt är också något annat än ett företagsutskick."
        ],
        "sources": [
          "chat",
          "apple-channels"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-supportunderlag",
    "title": "Vad ska jag uppge när jag söker hjälp med RCS?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs support felsökning underlag"
    ],
    "published": "2026-11-01",
    "description": "Supporten behöver veta vad som händer, när det började och vilken app du använder. Lägg till telefonmodell, systemversion, operatör och den RCS-status som visas.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Berätta om felet gäller en kontakt eller alla, och om du nyligen bytt SIM, telefon eller nummer. Kontrollera också om internet fungerar och vilken kanal chatten använder.",
          "Skicka inte lösenord eller engångskoder. Om en skärmbild behövs, dölj privata samtal och personuppgifter som inte behövs för felsökningen."
        ],
        "sources": [
          "chat",
          "apple"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-webhook-avsandarkontroll",
    "title": "Hur kontrolleras avsändaren för en RCS-webhook?",
    "category": "Teknik",
    "keywords": [
      "rcs webhook signatur säkerhet"
    ],
    "published": "2026-11-01",
    "description": "En RCS-webhook måste kontrollera vem som skickar anropet innan den behandlar händelsen. Giltig JSON eller ett känt meddelande-id bevisar inte att anropet är äkta.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Använd verifieringsmetoden i er leverantörs dokumentation. Googles metod gäller Googles plattform; en annan leverantör kan kräva en annan kontroll.",
          "Ett underkänt anrop ska inte ändra en bokning eller markera en order som levererad. Logga felet så att det går att undersöka, men lämna hemligheter och onödiga kunduppgifter utanför loggen."
        ],
        "sources": [
          "webhooks"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-dubbla-handelser",
    "title": "Hur hanterar jag dubbla RCS-händelser?",
    "category": "Teknik",
    "keywords": [
      "rcs dubbla events idempotens"
    ],
    "published": "2026-11-01",
    "description": "Samma webhook-händelse kan behöva tas emot mer än en gång utan att kundens ärende ändras flera gånger. Det brukar kallas idempotent hantering.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Spara händelsens identifierare och kontrollera om den redan behandlats. Ett upprepat avbokningssvar ska exempelvis inte starta en ny avbokning eller återbetalning.",
          "Mottagningen kan kvittera en dubblett utan att upprepa åtgärden. Håll därför isär att händelsen tagits emot och att en ändring gjorts i bokningssystemet."
        ],
        "sources": [
          "webhooks",
          "events"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-webhook-omsandning",
    "title": "Vad gör jag om en webhook levereras igen?",
    "category": "Teknik",
    "keywords": [
      "rcs webhook retry omsändning"
    ],
    "published": "2026-11-01",
    "description": "Om en webhook levereras igen ska systemet kunna ta emot den utan att utföra samma åtgärd en gång till. Leverantörens dokumentation anger villkoren för omsändning.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Verifiera och spara händelsen innan långsam bearbetning börjar. Då går det att skilja ett misslyckat mottagande från ett fel i kundsystemet.",
          "Testa genom att skicka samma händelse flera gånger. En kund ska få en korrekt uppdaterad beställning, inte flera beställningar eller meddelanden för samma val."
        ],
        "sources": [
          "webhooks"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-handelser-ordning",
    "title": "Måste RCS-händelser komma i rätt ordning?",
    "category": "Teknik",
    "keywords": [
      "rcs event ordning status"
    ],
    "published": "2026-11-01",
    "description": "Planera för att en händelse kan komma fram senare än den inträffade. Mottagningstiden i ert system behöver inte motsvara meddelandets händelsetid.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Använd leverantörens dokumenterade tidsfält och koppla varje händelse till rätt meddelande. En sen leveransrapport ska till exempel inte skriva över en senare rapport om läsning.",
          "Bestäm vilka statusändringar som är tillåtna. Då kan systemet hantera både sena rapporter och dubbletter utan att kundärendet går bakåt av misstag."
        ],
        "sources": [
          "events",
          "webhooks"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-handelser-ko",
    "title": "Varför lägga RCS-händelser i en kö?",
    "category": "Teknik",
    "keywords": [
      "rcs kö asynkron bearbetning"
    ],
    "published": "2026-11-01",
    "description": "En kö låter webhooken ta emot händelser snabbt medan order- eller supportsystemet arbetar i sin egen takt. Det kan vara användbart när bearbetningen tar tid.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Kön är ett sätt att bygga integrationen, inte ett krav för RCS. Den behöver skydd mot förlorade och dubbelt behandlade händelser.",
          "Se till att ni kan hitta det som väntar, det som är färdigt och det som misslyckats. En kvittens från webhooken säger att händelsen tagits emot, inte att kundens ärende är klart."
        ],
        "sources": [
          "webhooks",
          "receive"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-meddelandeidentifierare",
    "title": "Hur kopplar jag RCS till rätt kundärende?",
    "category": "Teknik",
    "keywords": [
      "rcs messageId kundärende korrelation"
    ],
    "published": "2026-11-01",
    "description": "Spara vilket meddelande-id som hör till vilken order, bokning eller supportfråga. När svar och status kommer tillbaka kan systemet då hitta rätt ärende.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Telefonnumret räcker inte alltid. Samma kund kan ha flera beställningar och få flera besked samma dag. Synlig knapptext är också för ospecifik för den kopplingen.",
          "Skicka bara den data som behövs i ett knappval. Ett ärende-id kan ofta ersätta en hel uppsättning kund- och orderuppgifter."
        ],
        "sources": [
          "send",
          "events"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-loggning",
    "title": "Vad bör en RCS-integration logga?",
    "category": "Teknik",
    "keywords": [
      "rcs loggar felsökning integration"
    ],
    "published": "2026-11-01",
    "description": "En användbar logg visar meddelandets identifierare, tidpunkter och status från begäran till senare händelser. Hela meddelandetexten behöver inte kopieras till varje logg.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "API-nycklar ska aldrig hamna där. Begränsa även kundsvar och andra personuppgifter till det som behövs för felsökningen, med rätt åtkomst och lagringstid.",
          "Logga mottagning och bearbetning var för sig. Då går det att se om en utebliven orderuppdatering beror på att händelsen aldrig kom eller att kundsystemet inte kunde behandla den."
        ],
        "sources": [
          "send",
          "events",
          "webhooks"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-api-nycklar",
    "title": "Hur skyddar jag API-nycklar för RCS?",
    "category": "Teknik",
    "keywords": [
      "rcs api nyckel skydda hemlighet"
    ],
    "published": "2026-11-01",
    "description": "En hemlig API-nyckel ska finnas i en skyddad servermiljö. Lägg den inte i webbsidans kod, ett publikt dokument eller en supportskärmbild.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Begränsa nyckelns åtkomst där leverantören erbjuder det. Bestäm vem som kan byta den och hur ni agerar vid en misstänkt läcka.",
          "Håll test och produktion åtskilda när tjänsten tillåter det. Prova också nyckelbyte i förväg, så att ett nödvändigt byte inte behöver bli ett okontrollerat avbrott."
        ],
        "sources": [
          "send",
          "webhooks"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-felaktiga-anrop",
    "title": "Vad händer om RCS-anropet är felaktigt?",
    "category": "Teknik",
    "keywords": [
      "rcs api fel validering"
    ],
    "published": "2026-11-01",
    "description": "Ett felaktigt RCS-anrop kan avvisas innan någon leverans börjar. Felkoden visar om problemet gäller exempelvis format, behörighet eller innehåll.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Läs svaret innan du försöker igen. Ett felaktigt fält behöver rättas; att skicka samma begäran fler gånger gör det inte giltigt.",
          "Skilj detta från ett meddelande som accepterats men senare inte kan levereras. De två fallen uppstår i olika steg och behöver olika felsökning."
        ],
        "sources": [
          "send"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-telefonnummer-format",
    "title": "Hur ska telefonnummer anges i RCS-anrop?",
    "category": "Teknik",
    "keywords": [
      "rcs telefonnummer format landskod"
    ],
    "published": "2026-11-01",
    "description": "Följ API:ets krav på nummerformat. Internationellt format med landskod är vanligt, men er leverantörs dokumentation avgör detaljerna.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Kontrollera importerade nummer före utskick, särskilt när svenska lokala nummer ska få landskod. Ett korrekt formaterat nummer kan fortfarande vara fel nummer eller sakna RCS-stöd.",
          "Gissa inte när underlaget är oklart. Det kan skicka kundinformation till fel person. Bevara det ursprungliga numret där det behövs för att kunna reda ut en osäker normalisering."
        ],
        "sources": [
          "send"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-giltighetstid",
    "title": "Varför behöver ett RCS-meddelande en giltighetstid?",
    "category": "Teknik",
    "keywords": [
      "rcs ttl giltighetstid utgång"
    ],
    "published": "2026-11-01",
    "description": "En bokningspåminnelse som kommer efter besöket hjälper ingen. Giltighetstid sätter en gräns för hur länge ett tidsbundet RCS-besked ska få försöka levereras.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Kontrollera hur tjänsten anger tiden och vad som händer när den går ut. Det kan behövas ett separat beslut om SMS-reserv.",
          "Låt gränsen följa ärendet. En påminnelse och ett erbjudande kan behöva olika tider, och ett reserv-SMS ska inte fortsätta sprida samma besked efter att det blivit inaktuellt."
        ],
        "sources": [
          "send",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-avbryta-vantande",
    "title": "Kan jag stoppa ett väntande RCS-meddelande?",
    "category": "Teknik",
    "keywords": [
      "rcs avbryta revoke väntande"
    ],
    "published": "2026-11-01",
    "description": "Vissa tjänster kan stoppa eller återkalla väntande RCS-meddelanden. Möjligheten beror på tjänsten och meddelandets status. Ett redan levererat besked ska inte antas kunna raderas hos kunden.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Kontrollera meddelande-id, status och svaret från stoppförsöket. Först en bekräftelse visar att stoppet lyckats.",
          "Ska ett reserv-SMS skickas efteråt behöver stoppet ingå i samma beslut. Ett obekräftat avbrott kan annars följas av både SMS och ett sent RCS-meddelande."
        ],
        "sources": [
          "send"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-reserv-dubbla-besked",
    "title": "Hur undviker jag både RCS och SMS till samma kund?",
    "category": "Teknik",
    "keywords": [
      "rcs sms dubbla besked fallback timing"
    ],
    "published": "2026-11-01",
    "description": "Kunden kan få både SMS och RCS om reserv-SMS skickas medan RCS-versionen fortfarande väntar på leverans. Planera de två kanalerna som ett gemensamt flöde.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Använd status, giltighetstid och eventuell återkallelse enligt er tjänsts dokumentation. Bestäm när SMS får skickas och hur ett sent RCS-besked ska hanteras.",
          "Prova med fördröjd leverans, inte bara ett direkt fel. Det testet kan visa en dubbelleverans som inte märks när varje kanal testas för sig."
        ],
        "sources": [
          "send",
          "events",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-inkommande-filer",
    "title": "Kan kunder skicka filer till ett företag via RCS?",
    "category": "Teknik",
    "keywords": [
      "rcs inkommande fil kundsvar"
    ],
    "published": "2026-11-01",
    "description": "Kunder kan skicka filer i de inkommande meddelandetyper som Googles RCS for Business stöder. Er tjänst och ert kundsystem behöver också kunna ta emot och hantera dem.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Ta reda på vilka filtyper som skickas vidare. Bilagor är externt innehåll och behöver lämpliga säkerhetskontroller och begränsad åtkomst.",
          "Om en fil inte kan användas, säg det till kunden och erbjud en säker alternativ väg. Ett ärende ska inte bli liggande för att en bilaga inte kunde öppnas."
        ],
        "sources": [
          "receive"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-ovantade-svar",
    "title": "Hur hanterar jag ett oväntat kundsvar i RCS?",
    "category": "Teknik",
    "keywords": [
      "rcs fritext oväntat svar bot"
    ],
    "published": "2026-11-01",
    "description": "Kunder kan skriva fritt även när ni har planerat för svarsknappar. Integrationens svarshantering behöver därför täcka mer än de förvalda alternativen.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Om texten är oklar, be om ett förtydligande eller lämna över till personal. En gissning ska inte bli en beställning eller avbokning.",
          "Behåll kopplingen till konversationen när någon tar över. Då kan personalen se vad kunden försökt göra, i stället för att ställa samma frågor på nytt."
        ],
        "sources": [
          "receive",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-delad-plats",
    "title": "Hur hanterar ett företag en delad plats i RCS?",
    "category": "Teknik",
    "keywords": [
      "rcs location kund plats"
    ],
    "published": "2026-11-01",
    "description": "Googles företagsmodell kan ta emot en plats från kunden. För att använda den behöver ni koppla platsen till rätt konversation och veta vad den ska användas till.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "En kartposition är inte alltid en leveransadress. Be kunden bekräfta adressen när ärendet kräver det. Platsdelning är heller inget medgivande till fortsatt spårning.",
          "Begränsa åtkomst och lagring. Kan systemet inte hantera platsen, förklara det och be kunden skriva den adress som behövs."
        ],
        "sources": [
          "receive",
          "features"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-varumarken-agenter",
    "title": "Behöver olika varumärken olika RCS-avsändare?",
    "category": "Teknik",
    "keywords": [
      "rcs flera varumärken agent"
    ],
    "published": "2026-11-01",
    "description": "Flera varumärken kan behöva olika RCS-avsändare om kunderna känner igen dem som skilda företag. Utgå från identiteten kunden möter, inte bara er interna organisation.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "En agent per avdelning är inte ett generellt krav. Support och leverans kan höra till samma varumärke även om olika team arbetar med dem.",
          "Stäm av strukturen före registreringen. Godkännandet för en avsändare gäller den registrerade identiteten och bör inte behandlas som ett godkännande för alla koncernens namn."
        ],
        "sources": [
          "agent",
          "verification"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-lanseringsunderlag",
    "title": "Vilka uppgifter behövs inför en RCS-lansering?",
    "category": "Teknik",
    "keywords": [
      "rcs launch underlag godkännande"
    ],
    "published": "2026-11-01",
    "description": "Inför en lansering behöver företaget beskriva vem avsändaren är, hur meddelandena används och hur kunder kan svara eller avregistrera sig. Google beskriver sådana uppgifter i sitt lanseringsunderlag.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Visa det verkliga flödet. En bild av ett kort säger inte hur en kund hamnar i utskicket eller hur ett svar tas om hand.",
          "Be partnern om kraven för er marknad. Att underlaget är inskickat betyder inte att avsändaren är godkänd för att börja skicka."
        ],
        "sources": [
          "launch",
          "verification"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-testagent-produktion",
    "title": "Vad skiljer en testagent från en lanserad avsändare?",
    "category": "Teknik",
    "keywords": [
      "rcs testagent produktion lansering"
    ],
    "published": "2026-11-01",
    "description": "En testagent används för att prova innehåll och integration med tillåtna testmottagare. En lanserad avsändare har dessutom gått igenom plattformens godkännande för publika utskick.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Kontrollera vilket läge avsändaren befinner sig i innan kundlistan används. En skapad agent kan fortfarande vänta på verifiering eller lansering.",
          "Håll testnummer och riktiga mottagare åtskilda. En lyckad demo bekräftar testet, inte räckvidden till alla kunder."
        ],
        "sources": [
          "agent",
          "launch"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-automatiska-svarstider",
    "title": "Hur anger jag svarstider i en RCS-konversation?",
    "category": "Teknik",
    "keywords": [
      "rcs automatisk bekräftelse svarstid"
    ],
    "published": "2026-11-01",
    "description": "Säg när kunden kan få ett svar från personal. En automatisk bekräftelse visar att frågan kommit fram, men ska inte ge intrycket att ärendet redan är löst.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Ange de tider ni faktiskt kan hålla. Om nästa svar kommer under nästa bemannade pass, skriv det i stället för att lova omedelbar hjälp.",
          "Koppla bekräftelsen till ärendet så att personalen kan fortsätta där kunden slutade. Kunden ska inte behöva starta en ny kontakt bara för att första svaret var automatiskt."
        ],
        "sources": [
          "practice",
          "receive"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-kort-medieadress",
    "title": "Vad krävs av en medieadress i ett RCS-kort?",
    "category": "Teknik",
    "keywords": [
      "rcs image url media tillgänglig"
    ],
    "published": "2026-11-01",
    "description": "Adressen till en RCS-bild eller fil måste kunna hämtas på det sätt tjänsten kräver. Filtyp, storlek och åtkomst behöver följa leverantörens dokumentation.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "En adress som bara fungerar när du är inloggad kan misslyckas när tjänsten hämtar bilden. Se också till att länken inte löper ut innan meddelandet levererats eller avslöjar känsliga uppgifter.",
          "Prova den slutliga adressen och filen. Att bilden syns i redigeraren är inte ett test av den externa hämtningen."
        ],
        "sources": [
          "cards",
          "send"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-kort-beskarning",
    "title": "Varför beskärs RCS-bilden olika på olika telefoner?",
    "category": "Teknik",
    "keywords": [
      "rcs bild beskärning rich card"
    ],
    "published": "2026-11-01",
    "description": "Bilden i ett RCS-kort kan beskäras olika beroende på kortets layout och telefonen. Placera inte produktens viktigaste detalj precis vid kanten.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Prova bilden på de telefoner och appar ni stöder. Lägg pris, tid och annan nödvändig information som text så att beskärningen inte tar bort själva beskedet.",
          "Granska bilden tillsammans med rubrik och knappar. Ibland är ett enklare motiv bättre än att försöka få in mer i samma bildyta."
        ],
        "sources": [
          "cards"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-funktion-utan-stod",
    "title": "Vad gör jag när mottagaren saknar stöd för en RCS-funktion?",
    "category": "Teknik",
    "keywords": [
      "rcs unsupported capability anpassning"
    ],
    "published": "2026-11-01",
    "description": "Om en mottagare saknar stöd för en funktion behöver ni välja ett enklare meddelande eller en annan kanal. RCS-stöd i sig bekräftar inte varje karusell eller åtgärd.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Låt mottagarkontrollen styra valet. Behåll den information kunden behöver även om en bild eller knapp tas bort.",
          "Testa den enklare versionen också. Den ska gå att förstå och använda på egen hand, utan att kunden har sett det planerade originalet."
        ],
        "sources": [
          "capabilities",
          "cards"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-handelser-overvakning",
    "title": "Hur upptäcker jag att RCS-händelser slutat komma?",
    "category": "Teknik",
    "keywords": [
      "rcs webhook övervakning larm"
    ],
    "published": "2026-11-01",
    "description": "Övervaka både inkommande RCS-händelser och bearbetningen av dem. API:et kan acceptera ett utskick även när leveransrapporter eller kundsvar inte når ert system.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Jämför med normal aktivitet och kända testflöden. Ett enstaka saknat läskvitto räcker inte för att konstatera ett avbrott.",
          "Larm behöver ha en mottagare. Spara identifierare och tidpunkter så att den ansvariga kan följa samma meddelande hos er och hos leverantören."
        ],
        "sources": [
          "webhooks",
          "events"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-saker-aterstart",
    "title": "Hur återupptar jag ett stoppat RCS-flöde säkert?",
    "category": "Teknik",
    "keywords": [
      "rcs återstart kö driftstopp"
    ],
    "published": "2026-11-01",
    "description": "Efter ett stopp behöver ni först se vilka meddelanden och händelser som redan behandlats. Att skicka om hela listan kan ge kunderna dubbletter.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Läs sparade identifierare och statusar. Se även om innehållet fortfarande gäller; ett erbjudande kan ha löpt ut under avbrottet.",
          "Återuppta i mindre steg och följ utfallet. Målet är att avsluta rätt ärenden en gång, inte att tömma kön till varje pris."
        ],
        "sources": [
          "webhooks",
          "events",
          "send"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-tillganglighet-textstorlek",
    "title": "Hur fungerar RCS för kunder med stor text?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs tillgänglighet stor text"
    ],
    "published": "2026-11-01",
    "description": "Testa RCS-kort och knappar med telefonens större textinställningar. En förhandsvisning med standardtext visar inte hur det blir för kunder som behöver större bokstäver.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Rubriker och knapptexter ska fortfarande gå att läsa när raderna blir fler. Viktiga uppgifter behöver finnas som text, inte enbart inuti en bild.",
          "Följ även länken eller svaret vidare. Det hjälper föga att kortet är läsbart om bokningssidan efteråt inte fungerar med samma inställningar."
        ],
        "sources": [
          "cards",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-skarm-lasare",
    "title": "Hur gör jag RCS begripligt med skärmläsare?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs skärmläsare tillgänglighet"
    ],
    "published": "2026-11-01",
    "description": "Ett RCS-meddelande behöver gå att förstå genom texten. Om bara en bild berättar tiden eller erbjudandet kan en skärmläsaranvändare missa själva beskedet.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Skriv vad knappen gör, exempelvis Öppna ordern. Flera knappar med texten Läs mer ger sämre ledning när de läses utan det visuella sammanhanget.",
          "Prova med skärmläsare i de appar kunderna använder. Stödet kan skilja sig mellan appar, så utlovad tillgänglighet behöver bygga på faktiska tester."
        ],
        "sources": [
          "cards",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-karusell-forsta-kort",
    "title": "Vad ska första kortet i en RCS-karusell visa?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs karusell första kort information"
    ],
    "published": "2026-11-01",
    "description": "Första kortet behöver förklara vad meddelandet gäller. En del kunder kommer inte att bläddra vidare, så avgörande information får inte kräva ett svep.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Använd de följande korten för alternativ, till exempel olika produkter. Ett viktigt villkor eller en bokad tid hör inte hemma enbart på sista kortet.",
          "Läs bara första kortet vid testet. Går det att förstå vem som skickar, vad saken gäller och vad kunden kan göra?"
        ],
        "sources": [
          "cards",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-karusell-ordning",
    "title": "Hur ordnar jag produkter i en RCS-karusell?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs karusell produktordning"
    ],
    "published": "2026-11-01",
    "description": "Lägg produkterna i en ordning som hjälper kunden att välja. Visa samma sorts uppgifter på samma plats i varje kort så att jämförelsen blir enkel.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Produktnamn, beskrivning och länk ska höra ihop. Undvik att blanda in ett servicebesked bland reklamalternativen om det gör syftet oklart.",
          "Prova varje länk och bestäm vad ett reserv-SMS behöver säga. Det kan inte återge hela karusellen, men måste fortfarande ge ett begripligt besked."
        ],
        "sources": [
          "cards",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-en-eller-flera-knappar",
    "title": "Hur många knappar behöver ett RCS-meddelande?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs antal knappar val"
    ],
    "published": "2026-11-01",
    "description": "Antalet knappar bör följa kundens uppgift. En spårningslänk kan räcka för ett leveransbesked, medan en bokning kan behöva både Bekräfta och Begär ombokning.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Fler knappar ger inte alltid fler användbara val. Om två alternativ verkar göra samma sak behöver de förtydligas eller slås ihop.",
          "Maxantalet beror på format och tjänst. Kontrollera den tekniska gränsen, men låt inte den bli ett mål för hur många knappar ni ska fylla med."
        ],
        "sources": [
          "features",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-fritext-eller-knappar",
    "title": "När är fritext bättre än svarsknappar?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs fritext snabbsvar val"
    ],
    "published": "2026-11-01",
    "description": "Svarsknappar passar när alternativen är kända. Fritext är bättre när kunden behöver beskriva ett fel, ställa en egen fråga eller förklara något oväntat.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Låt kunden komma vidare om inget knappval passar. Ett felaktigt val ska inte vara enda vägen till hjälp.",
          "En öppen fråga behöver någon som tar hand om svaret. Ordna bemanning eller fungerande automatisk hantering innan ni bjuder in till fritext."
        ],
        "sources": [
          "features",
          "receive",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-knapp-bekraftelse",
    "title": "Vad ska kunden se efter ett knapptryck?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs knapp bekräftelse handling"
    ],
    "published": "2026-11-01",
    "description": "Efter ett knapptryck ska kunden veta vad som faktiskt hänt. Begär ombokning betyder att ett önskemål skickats, inte att en ny tid redan är bokad.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Låt boknings- eller ordersystemet avgöra bekräftelsen. Tar hanteringen tid, bekräfta mottagandet och säg vad som händer härnäst.",
          "Testa även ett misslyckat försök. Kunden behöver få veta om bokningen är oförändrad och hur det går att få hjälp."
        ],
        "sources": [
          "events",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-sprakversioner",
    "title": "Hur väljer jag språk i ett RCS-utskick?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs flera språk språkval"
    ],
    "published": "2026-11-01",
    "description": "Välj språk utifrån vad kunden föredrar när ni har den uppgiften. Ett svenskt telefonnummer säger inte vilket språk personen vill läsa.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Översätt hela vägen: meddelande, knappar och sidan eller svaret efteråt. En knapp på ett språk hjälper inte mycket om nästa steg bara finns på ett annat.",
          "Längre översättningar behöver provas på telefon. Korta vid behov, men behåll betydelsen och villkoren."
        ],
        "sources": [
          "practice",
          "agent"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-prisvillkor-kort",
    "title": "Var ska pris och villkor stå i ett RCS-erbjudande?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs erbjudande pris villkor tydlighet"
    ],
    "published": "2026-11-01",
    "description": "Visa priset och avgörande villkor så att kunden förstår erbjudandet före nästa steg. Lägg inte en viktig begränsning bara i en liten bildtext.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Håll ihop priset med vad som ingår. Om villkoren kräver mer utrymme ska länken leda till en tydlig beskrivning som stämmer med kortet.",
          "Marknadsförings- och köpregler gäller även i RCS. Ett begränsat kortformat är inget skäl att utelämna information som kunden behöver."
        ],
        "sources": [
          "marketing-law",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-emoji-foretag",
    "title": "Passar emoji i RCS från företag?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs emoji företag tonalitet"
    ],
    "published": "2026-11-01",
    "description": "Emoji kan passa i företagsmeddelanden när de kompletterar texten. De bör inte bära en tid, ett villkor eller nästa steg på egen hand.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Symboler kan visas och uppfattas olika. I ett servicebesked är en tydlig formulering oftast viktigare än att skapa rätt stämning.",
          "Läs meddelandet utan emoji. Om innebörden då försvinner behöver texten säga mer, inte fler symboler läggas till."
        ],
        "sources": [
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-lanka-ratt-order",
    "title": "Hur ser jag till att en RCS-länk öppnar rätt order?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs orderlänk rätt kund"
    ],
    "published": "2026-11-01",
    "description": "En orderlänk behöver kopplas till rätt beställning och rätt åtkomst. Kundens telefonnummer ersätter inte behörighetskontrollen på sidan som öppnas.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Länken ska inte ge åtkomst till andra kunders order eller uppgifter. Använd det skydd som informationen kräver även när länken skickats till en känd mottagare.",
          "Prova rätt länk, fel länk och en utgången länk. Vid fel ska kunden få ett begripligt besked och en väg till sitt ärende."
        ],
        "sources": [
          "features",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-forhandsvisning-test",
    "title": "Räcker en förhandsvisning av RCS?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs förhandsvisning riktiga telefoner"
    ],
    "published": "2026-11-01",
    "description": "En förhandsvisning räcker för att granska ett utkast, men inte för att godkänna hela utskicket. Telefonen och meddelandeappen kan visa innehållet på andra sätt.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Skicka till verkliga testenheter och använd länkarna och svaren. Prova även långa texter, större textinställningar och långsam bildladdning.",
          "Ta med reservversionen. Ett perfekt RCS-kort hjälper inte en kund som i stället får ett otydligt SMS."
        ],
        "sources": [
          "cards",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-sms-lanktext",
    "title": "Hur skriver jag en länk i reserv-SMS?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs reserv sms knapp länktext"
    ],
    "published": "2026-11-01",
    "description": "Skriv vad länken öppnar och vilket ärende reserv-SMS:et gäller. Utan RCS-kortets knappar och bilder behöver texten bära mer av sammanhanget.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Behåll nödvändiga uppgifter som bokningstid eller ordernummer. Kunden kan ha fått enbart SMS och ska ändå förstå beskedet.",
          "Kontrollera sidan länken leder till och hur många SMS-delar texten ger. Att länken är kort säger inget om dess säkerhet eller tydlighet."
        ],
        "sources": [
          "practice",
          "send"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-bilder-utan-text",
    "title": "Kan viktig information ligga bara i en RCS-bild?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs bildtext viktig information"
    ],
    "published": "2026-11-01",
    "description": "Lägg inte viktig information enbart i en RCS-bild. Den kan beskäras, laddas långsamt eller bli svårläst på en liten skärm.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Skriv tid, pris och villkor som vanlig text. Låt bilden visa produkten eller det som är lättare att förklara visuellt.",
          "Ta bort bilden när du granskar meddelandet. Om ärendet eller nästa steg inte går att förstå behöver texten kompletteras."
        ],
        "sources": [
          "cards",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-video-nar",
    "title": "När är video användbart i ett RCS-meddelande?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs video produkt demonstration"
    ],
    "published": "2026-11-01",
    "description": "Video passar när rörelse förklarar något, till exempel hur en produkt används. Ett kort statusbesked behöver sällan en film.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Ge nödvändig information även i text. Kunden kanske inte kan spela upp video där och då, och filen behöver stödjas av tjänsten.",
          "Testa filen på telefon och se hur den laddar. Välj längd och format efter det som ska visas, inte efter hur mycket utrymme som finns."
        ],
        "sources": [
          "cards",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-personalisering-namn",
    "title": "Hur använder jag kundnamn utan pinsamma fel?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs personalisering namn fel"
    ],
    "published": "2026-11-01",
    "description": "Använd kundnamn när uppgiften är pålitlig. En hälsning med fel namn eller ett synligt systemfält kan göra resten av beskedet svårt att lita på.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Ha en neutral hälsning när namn saknas. Testa importen med tomma fält och kontrollera att orderuppgifter inte blandas mellan kunder.",
          "Personligt behöver inte betyda namngivet. Ett korrekt besked om kundens ärende kan vara mer omtänksamt än ett osäkert Hej följt av förnamnet."
        ],
        "sources": [
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-igenkanning-lang-dialog",
    "title": "Hur känner kunden igen företaget i en lång RCS-dialog?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs lång dialog avsändare igenkänning"
    ],
    "published": "2026-11-01",
    "description": "Behåll samma igenkännbara företagsprofil i dialogen och skriv vilket ärende varje nytt besked gäller. Namn och logotyp ger inte hela sammanhanget.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Markera när samtalet går över till en ny fråga. Undvik att blanda ett pågående supportproblem med erbjudanden som inte hör dit.",
          "Vid ett personalbyte ska nästa person kunna fortsätta ärendet. Kunden behöver inte känna till era avdelningar för att förstå svaret."
        ],
        "sources": [
          "agent",
          "business",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-kundresa-utan-app",
    "title": "Måste hela köpet ske i RCS-chatten?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs köp extern sida app"
    ],
    "published": "2026-11-01",
    "description": "Hela köpet behöver inte ske i RCS-chatten. En knapp kan öppna en webbplats där kunden betalar, bokar eller slutför beställningen.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Skriv vad knappen öppnar. Köp nu kan vara missvisande om den bara leder till information, medan Öppna produktsidan beskriver det faktiska steget.",
          "Kontrollera målsidan på telefon och håll erbjudandet lika på båda ställena. Mät köpet där det slutförs, inte bara klicket i meddelandet."
        ],
        "sources": [
          "features",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-mansklig-overlamning",
    "title": "Hur lämnar en RCS-bot över till en människa?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs bot människa handover"
    ],
    "published": "2026-11-01",
    "description": "När automatiska svar inte hjälper behöver kunden kunna nå personal. Bekräfta överlämningen och sluta ställa samma fråga om kunden redan har svarat.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "För över relevant samtalshistorik och ärendenummer med lämplig åtkomst. Då kan personen som tar över fortsätta utan att kunden måste börja om.",
          "Ange en svarstid som bemanningen kan hålla. Ett automatiskt svar ska inte låtsas komma från en människa."
        ],
        "sources": [
          "receive",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-felbudskap-kund",
    "title": "Hur skriver jag ett bra felbesked i RCS?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs felmeddelande kundupplevelse"
    ],
    "published": "2026-11-01",
    "description": "Ett användbart felbesked säger vad som inte gick och hur kunden kan komma vidare. Ett internt felnummer behöver en förklaring.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Skriv om bokningen eller ordern är oförändrad. Det är skillnad på att en begäran inte kom fram och att den togs emot men inte kunde genomföras.",
          "Erbjud en relevant kontaktväg eller länk. Be inte kunden trycka igen om det kan skapa en andra beställning eller ett dubbelt ärende."
        ],
        "sources": [
          "practice",
          "receive"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-aterkommande-aviseringar",
    "title": "Hur gör jag återkommande RCS-besked mindre störande?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs avisering frekvens uppdateringar"
    ],
    "published": "2026-11-01",
    "description": "Skicka ett nytt besked när något relevant har ändrats för kunden. Varje intern uppdatering behöver inte bli en notis.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Samordna besked som annars kommer tätt och låter nästan likadana. Skriv vad som är nytt, inte bara att ordern har uppdaterats.",
          "Håll marknadsföringsval åtskilda från serviceinformation. Målet är att kunden får rätt besked, inte så många meddelanden som systemet kan producera."
        ],
        "sources": [
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-tidszon-kampanj",
    "title": "Vilken tid ska ett schemalagt RCS-utskick använda?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs schemalägga tidszon sommartid"
    ],
    "published": "2026-11-01",
    "description": "Ta reda på vilken tidszon schemaläggningen använder. UTC och svensk lokal tid skiljer sig, och skillnaden ändras med sommar- och vintertid.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Ange datum och tid entydigt enligt tjänstens dokumentation. En bokningstid i meddelandet ska vara den tid kunden ska följa, inte en intern systemtid.",
          "Prova schemat före ett större utskick. För mottagare i flera länder behöver ni även bedöma om samma sändningstid är rimlig lokalt."
        ],
        "sources": [
          "send",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-ab-test-ett-val",
    "title": "Hur gör jag ett rättvist A/B-test av RCS-text?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs ab test text jämförelse"
    ],
    "published": "2026-11-01",
    "description": "Ett rättvist A/B-test jämför en avgränsad ändring i likvärdiga grupper. Byter ni text, erbjudande och sändningstid samtidigt blir orsaken till skillnaden oklar.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Bestäm vad som räknas före utskicket. Om målet är bokningar ska genomförda bokningar vara huvudmåttet, inte bara klick.",
          "Redovisa räckvidd och användning av reservkanaler också. Grupper med olika leveransförutsättningar kan ge en missvisande jämförelse av själva texten."
        ],
        "sources": [
          "practice",
          "analytics"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-trad-order-besked",
    "title": "Hur håller jag ihop flera orderbesked i RCS?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs orderbesked konversation struktur"
    ],
    "published": "2026-11-01",
    "description": "Skriv ordernummer eller annan relevant referens och vad som ändrats. Din order är klar kan vara oklart för en kund med flera beställningar i samma chatt.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Hämta status från ordersystemet och länka till rätt order. Lägg inte till personuppgifter som inte behövs för att förstå beskedet.",
          "Samordna automatiska notiser med personalens svar. Har kunden fått veta att det finns ett problem ska nästa standardbesked inte motsäga det."
        ],
        "sources": [
          "practice",
          "events"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-ny-kanal-samma-budskap",
    "title": "Hur håller jag samma budskap i RCS och SMS?",
    "category": "Meddelandedesign",
    "keywords": [
      "rcs sms konsekvent innehåll"
    ],
    "published": "2026-11-01",
    "description": "RCS och SMS behöver säga samma viktiga sak, men med olika utformning. RCS kan ha bild och knappar; SMS behöver text och en vanlig länk.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Kontrollera datum, pris, status och villkor i båda versionerna. Reserven får inte hämta äldre uppgifter än originalet.",
          "Läs versionerna var för sig. Kunden ska förstå den som kommer fram utan att behöva känna till den andra."
        ],
        "sources": [
          "practice",
          "send"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-marknadsforing-invandning",
    "title": "Vad gör jag när en kund invänder mot RCS-reklam?",
    "category": "Företag",
    "keywords": [
      "rcs direktmarknadsföring invändning"
    ],
    "published": "2026-11-01",
    "description": "En kund har enligt IMY en absolut rätt att invända mot behandling för direktmarknadsföring. Efter invändningen ska personuppgifterna inte längre användas för det ändamålet.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Stoppa utskicken i alla berörda listor och verktyg. Det räcker inte att lägga en anteckning hos supporten om nästa kampanj ändå använder numret.",
          "Serviceärenden kan ha andra rättsliga förutsättningar och behöver bedömas separat. Ta dataskyddskunnig hjälp med gränsdragningen i ert upplägg; detta är en översikt, inte juridisk rådgivning."
        ],
        "sources": [
          "imy-objection"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-svar-inte-samtycke",
    "title": "Är ett RCS-svar samtycke till reklam?",
    "category": "Företag",
    "keywords": [
      "rcs svar samtycke marknadsföring"
    ],
    "published": "2026-11-01",
    "description": "Ett svar om en bokning är inte i sig samtycke till reklam. Kunden kan vilja bekräfta en tid utan att vilja få framtida erbjudanden.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Varken leveransstatus eller läskvitton visar ett marknadsföringsval. Bedöm kontaktregler och behandling av personuppgifter för sina respektive syften.",
          "Om ni ber om ett sådant val, skriv tydligt vad kunden tackar ja till och hantera det separat från bokningen. Villkoren behöver bedömas för den konkreta situationen."
        ],
        "sources": [
          "imy-objection",
          "marketing-law"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-marknadsforing-avsandare",
    "title": "Hur ska RCS-reklam märkas?",
    "category": "Företag",
    "keywords": [
      "rcs reklamidentifiering avsändare"
    ],
    "published": "2026-11-01",
    "description": "Reklam i RCS ska gå att känna igen som reklam, och den ansvariga avsändaren ska framgå. Ett erbjudande bör inte utformas som om det vore ett nödvändigt orderbesked.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Använd företagsnamnet och en text som visar syftet. En verifierad profil ersätter inte en tydlig reklambeskrivning.",
          "Pris, villkor och påståenden behöver också vara korrekta. Det är hela erbjudandet som bedöms, inte bara märkningen."
        ],
        "sources": [
          "marketing-law"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-transaktion-reklam",
    "title": "Kan ett orderbesked också innehålla reklam?",
    "category": "Företag",
    "keywords": [
      "rcs transaktion marknadsföring blanda"
    ],
    "published": "2026-11-01",
    "description": "Att skicka ett nödvändigt orderbesked ger inte automatiskt rätt att lägga till reklam. Leveransinformation och ett nytt erbjudande har olika syften.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Bedöm kontaktreglerna för reklamdelen separat. Den får inte heller göra det svårare att hitta själva orderinformationen.",
          "Håll marknadsföringsval åtskilda från ärendet. En kund som har invänt mot reklam ska inte få den inbakad i en leveransuppdatering."
        ],
        "sources": [
          "marketing-law",
          "imy-objection"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-avregistrering-leverantor",
    "title": "Hur stoppar jag reklam hos alla utskicksleverantörer?",
    "category": "Företag",
    "keywords": [
      "rcs avregistrering extern leverantör"
    ],
    "published": "2026-11-01",
    "description": "Avregistreringen måste nå alla verktyg som styr företagets marknadsföringsutskick. Annars kan kunden stoppas i en tjänst men ligga kvar i en annan.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Bestäm vilket system som håller det gällande spärrläget och hur det förs vidare. Se över importer så att en äldre lista inte återaktiverar ett spärrat nummer.",
          "Testa hela vägen från avregistreringen till nästa utskickslista. Bekräftelsen i chatten räcker inte om reklamen fortsätter."
        ],
        "sources": [
          "imy-objection",
          "events"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-dataminimering",
    "title": "Vilka kunduppgifter behövs i ett RCS-flöde?",
    "category": "Företag",
    "keywords": [
      "rcs dataminimering kunduppgifter"
    ],
    "published": "2026-11-01",
    "description": "Ett RCS-flöde behöver de kunduppgifter som är relevanta för ärendet, inte en kopia av hela kundprofilen. Ett order-id kan räcka för att hitta resten i kundsystemet.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Telefonnummer och svar kan vara personuppgifter. Bedöm därför syfte, åtkomst och lagringstid för uppgifterna som skickas och sparas.",
          "Stäm av med ert dataskyddsarbete och leverantörens villkor. Ta inte med ett extra fält enbart för att API:et kan ta emot det."
        ],
        "sources": [
          "imy-objection",
          "receive"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-lagring-kundsvar",
    "title": "Hur länge ska RCS-svar sparas?",
    "category": "Företag",
    "keywords": [
      "rcs lagring kundsvar gallring"
    ],
    "published": "2026-11-01",
    "description": "Det finns ingen lagringstid som passar alla RCS-svar. Hur länge de behövs beror på ärendet, syftet och de krav som gäller för verksamheten.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "En aktiv supportfråga, sammanställd statistik och en teknisk logg kan behöva olika hantering. Hela samtalet behöver inte finnas lika länge i alla system.",
          "Bestäm vem som gallrar och hur det fungerar i exporter och hos leverantörer. Låt en dataskyddskunnig person bedöma tiderna för ert upplägg."
        ],
        "sources": [
          "imy-objection",
          "receive"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-support-atkomst",
    "title": "Vem ska få läsa kundernas RCS-svar?",
    "category": "Företag",
    "keywords": [
      "rcs behörighet support kundsvar"
    ],
    "published": "2026-11-01",
    "description": "Kundernas RCS-svar bör vara åtkomliga för dem som behöver dem i arbetet. Att ett system tar emot svaren innebär inte att alla anställda ska kunna läsa dem.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Kundservice kan behöva samtalstext, medan teknisk felsökning ibland klarar sig med status och identifierare. Anpassa åtkomsten efter uppgiften.",
          "Ta bort eller ändra behörigheter när personal slutar eller byter roll. Se även till att ni vet i vilka verktyg konversationerna finns."
        ],
        "sources": [
          "receive",
          "webhooks"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-kansliga-uppgifter",
    "title": "Vad gör jag om en kund skickar känsliga uppgifter?",
    "category": "Företag",
    "keywords": [
      "rcs känsliga uppgifter kundsupport"
    ],
    "published": "2026-11-01",
    "description": "Om en kund skickar känsliga uppgifter, följ verksamhetens rutiner för den informationen. Att uppgifterna kom frivilligt gör inte vidare spridning eller lång lagring lämplig.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Be inte om mer än ärendet kräver. Flytta vid behov fortsättningen till en säkrare, lämplig kanal och undvik att innehållet kopieras till allmänna loggar.",
          "Bedöm både dataskydd och säkerhet. Verifierad avsändare säger vem som skickar; den beskriver inte hur kundens svar skyddas i era system."
        ],
        "sources": [
          "receive",
          "security"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-statistik-senare",
    "title": "Varför ändras RCS-statistiken efter utskicket?",
    "category": "Företag",
    "keywords": [
      "rcs statistik sena rapporter"
    ],
    "published": "2026-11-01",
    "description": "RCS-statistik kan ändras när nya leverans- och läshändelser kommer in. En rapport direkt efter utskick är därför inte alltid slutläget.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Se vilka tidsfält och rapportperioder tjänsten använder. Sändningstid, aktivitetstid och tiden då rapporten kom fram kan skilja sig.",
          "Jämför rapporter vid likvärdiga tidpunkter och ange när de togs ut. Ett växande antal läsningar betyder inte att fler meddelanden har skickats."
        ],
        "sources": [
          "analytics",
          "events"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-klick-konvertering",
    "title": "Hur skiljer jag RCS-klick från ett köp?",
    "category": "Företag",
    "keywords": [
      "rcs klick konvertering köp"
    ],
    "published": "2026-11-01",
    "description": "Ett klick i RCS visar att kunden valt en handling. Ett köp är ett senare resultat som behöver bekräftas där beställningen genomförs.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Koppla uppföljningen till rätt utskick med relevanta identifierare. Om försäljning är målet ska en öppnad produktsida inte räknas som ett färdigt köp.",
          "Redovisa klick och köp var för sig. Då går det att se både intresset för meddelandet och hur många som slutförde nästa steg."
        ],
        "sources": [
          "events",
          "analytics"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-sms-matt-jamforelse",
    "title": "Kan jag jämföra RCS-läsningar med SMS-leveranser?",
    "category": "Företag",
    "keywords": [
      "rcs sms statistik jämför mått"
    ],
    "published": "2026-11-01",
    "description": "RCS-läsningar och SMS-leveranser är olika mått och ska inte jämföras som om de betydde samma sak. En leveransrapport säger inte att kunden läst.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Välj om möjligt ett gemensamt resultat, till exempel bekräftade bokningar. Visa respektive kanals räckvidd, kostnad och statusmått bredvid det.",
          "Definitioner och jämförbara grupper behövs för en användbar slutsats. Fler rapporterade händelser kan annars bara bero på att en kanal kan mäta mer."
        ],
        "sources": [
          "analytics",
          "events"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-serviceteam-matning",
    "title": "Vad ska kundservice mäta i RCS?",
    "category": "Företag",
    "keywords": [
      "rcs kundservice mått svarstid"
    ],
    "published": "2026-11-01",
    "description": "Kundservice bör mäta om kunden får hjälp, inte enbart om svaret läses. Tid till ett meningsfullt svar och andelen avslutade ärenden kan vara relevanta mått.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Bestäm vad ett avslutat ärende betyder hos er. En automatisk hälsning löser ingen fråga, och en knapp kan bara skicka en begäran.",
          "Använd data från ärendesystemet tillsammans med RCS-status. Då blir det lättare att skilja väntan på leverans från väntan på faktisk hjälp."
        ],
        "sources": [
          "receive",
          "events",
          "analytics"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-kostnad-reservkanal",
    "title": "Hur räknar jag kostnaden när RCS har SMS-reserv?",
    "category": "Företag",
    "keywords": [
      "rcs sms reserv kostnad budget"
    ],
    "published": "2026-11-01",
    "description": "Budgetera RCS och SMS-reserven enligt tjänstens egna villkor. Ett reserv-SMS behöver inte ingå i priset bara för att utskicket ser ut som ett sammanhängande flöde.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Ta reda på när debitering sker och om SMS-texten blir flera delar. Klargör också vilken status eller tidsgräns som startar reserven.",
          "Räkna därefter på hela utskicket och dess resultat. Ett RCS-pris ensamt förklarar inte kostnaden för kunder som nås genom olika kanaler."
        ],
        "sources": [
          "send",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-debitering-status",
    "title": "Är en leveransrapport också en fakturarapport?",
    "category": "Företag",
    "keywords": [
      "rcs debitering leverans rapport"
    ],
    "published": "2026-11-01",
    "description": "En leveransrapport visar meddelandets status. En fakturarapport visar det som debiterats enligt avtalet. De två rapporterna besvarar olika frågor.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Läs vilka händelser och meddelandetyper som är fakturerbara. Orden accepterat och levererat avgör inte priset utan tjänstens definitioner.",
          "Koppla posterna med meddelande-id när summorna behöver följas upp. Be om en förklaring på postnivå om fakturan avviker, inte bara en ny totalsiffra."
        ],
        "sources": [
          "analytics",
          "send"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-pilot-mottagare",
    "title": "Vilka kunder bör ingå i en RCS-pilot?",
    "category": "Företag",
    "keywords": [
      "rcs pilot testgrupp mottagare"
    ],
    "published": "2026-11-01",
    "description": "En pilot bör innehålla kunder som passar det valda ärendet och får kontaktas. Enbart interna testtelefoner med bästa möjliga stöd kan ge för snävt underlag.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Ta med relevanta variationer i telefoner och appar. Prova också vägen för mottagare som saknar RCS eller någon av funktionerna.",
          "Bestäm frågorna före testet: förstår kunden beskedet, fungerar svaret och blir ärendet rätt? Det ger mer än att bara bekräfta att meddelandet gick att skicka."
        ],
        "sources": [
          "practice",
          "capabilities"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-pilot-avbryta",
    "title": "När bör en RCS-pilot pausas?",
    "category": "Företag",
    "keywords": [
      "rcs pilot stoppa fel"
    ],
    "published": "2026-11-01",
    "description": "Pausa en pilot om kunduppgifter blir fel, avregistrering misslyckas eller ett svar kopplas till fel ärende. Ett godkänt API-anrop väger inte upp sådana fel.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Utse en ansvarig och bestäm stoppvillkoren i förväg. Vid stopp behöver ni även se vilka meddelanden som redan skickats och vilka som väntar.",
          "Rätta orsaken och testa samma fall innan ni fortsätter. Pilotens begränsade storlek är till för att upptäcka fel innan fler kunder påverkas."
        ],
        "sources": [
          "practice",
          "events"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-upphandling-fragor",
    "title": "Vad ska jag fråga en RCS-leverantör före köp?",
    "category": "Företag",
    "keywords": [
      "rcs leverantör välja upphandling"
    ],
    "published": "2026-11-01",
    "description": "Be en RCS-leverantör visa hur ert eget flöde fungerar: vilka kunder ni kan nå, hur avsändaren godkänns och hur innehåll, svar och reservkanal hanteras.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Klargör priser och vad som verkligen är aktiverat för kontot. En allmän funktionslista kan innehålla sådant ni ännu inte har tillgång till.",
          "Be om villkor för datahantering, support och integration. Ett test med era meddelanden ger bättre beslutsunderlag än ett generellt löfte om täckning."
        ],
        "sources": [
          "send",
          "capabilities",
          "verification"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-rackvidd-foretagsiphone",
    "title": "Hur testar företag räckvidd till iPhone?",
    "category": "Företag",
    "keywords": [
      "rcs företagsmeddelanden iphone räckvidd"
    ],
    "published": "2026-11-01",
    "description": "Testa iPhone-räckvidd med företagets registrerade avsändare och den tjänst ni ska använda. En privat RCS-chatt mellan två personer testar inte samma sak.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Använd leverantörens mottagarkontroller och skicka det avsedda innehållet till riktiga testenheter. Se också att företagsmeddelanden är tillåtna i mottagarens inställningar.",
          "Beskriv vilka telefoner och abonnemang testet täckte. En lyckad leverans till en iPhone ger inget säkert besked om alla svenska iPhone-kunder."
        ],
        "sources": [
          "apple",
          "business",
          "capabilities"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-operatornyhet-tolka",
    "title": "Hur tolkar jag en nyhet om RCS-lansering?",
    "category": "Företag",
    "keywords": [
      "rcs lansering nyhet operatör stöd"
    ],
    "published": "2026-11-01",
    "description": "En RCS-nyhet behöver läsas med sitt sammanhang: land, operatör, telefon och typ av användning. Stöd för privat Android-chatt är inte ett besked om företagsutskick till iPhone.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Kontrollera datum och officiell källa. En annonserad pilot eller kommande lansering är inte samma sak som en funktion tillgänglig för alla kunder.",
          "Om beskeden skiljer sig, behåll osäkerheten i planeringen. Fråga operatören eller utskicksleverantören om den räckvidd just er kampanj behöver."
        ],
        "sources": [
          "apple",
          "apple-carriers",
          "business"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-agent-profil-andring",
    "title": "Vad bör jag kontrollera när företagsprofilen ändras?",
    "category": "Företag",
    "keywords": [
      "rcs ändra namn logotyp agent"
    ],
    "published": "2026-11-01",
    "description": "En ändring av företagsnamn eller RCS-profil kan kräva ny kontroll enligt tjänstens regler. En godkänd avsändare kan inte förutsättas få byta varumärke fritt.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Stäm av ändringen med partnern och uppdatera kontaktuppgifter, mallar och länkar. Det gamla namnet ska inte ligga kvar i nästa steg efter en ny profil.",
          "Prova profilen i en riktig konversation. Kunden behöver känna igen avsändaren; verifieringen handlar om identitet och behörighet, inte bara om logotypfilen."
        ],
        "sources": [
          "agent",
          "verification"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-avdelningar-samma-avsandare",
    "title": "Ska support och marknad ha samma RCS-avsändare?",
    "category": "Företag",
    "keywords": [
      "rcs support marknad agent struktur"
    ],
    "published": "2026-11-01",
    "description": "Support och marknad kan behöva samma igenkännbara RCS-identitet när de representerar samma varumärke. Organisationens interna gränser behöver inte synas för kunden.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Håll ändå behörigheter och marknadsföringsval tydliga. Ett supportärende ska inte avbrytas av en kampanj som kunden valt bort.",
          "Fråga leverantören hur en gemensam agent eller flera agenter kan användas. Välj det som passar kundens kontakt med företaget och de regler tjänsten ställer."
        ],
        "sources": [
          "agent",
          "practice"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-kundlistor-import",
    "title": "Vad ska kontrolleras innan en kundlista används för RCS?",
    "category": "Företag",
    "keywords": [
      "rcs import kundlista kontroll"
    ],
    "published": "2026-11-01",
    "description": "Kontrollera telefonnummer, dubbletter och aktuella spärrar innan en kundlista används. Mottagarna behöver också få kontaktas för utskickets syfte.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "En gammal import får inte skriva över en ny avregistrering. Se till att rätt orderuppgifter hör till rätt nummer om innehållet anpassas per kund.",
          "Prova en liten del först. Att filen går att importera säger varken att numren stöder RCS eller att utskicket är tillåtet."
        ],
        "sources": [
          "practice",
          "imy-objection"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-kundreferenser-pastanden",
    "title": "Hur får kundresultat beskrivas i RCS-marknadsföring?",
    "category": "Företag",
    "keywords": [
      "rcs kundcase resultat påståenden"
    ],
    "published": "2026-11-01",
    "description": "Kundresultat behöver gå att styrka. Beskriv vad som mättes och i vilken kampanj, i stället för att göra en enskild siffra till ett löfte för alla kunder.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Skilj klick från köp och ange hur en jämförelse gjordes. En logotyp belägger inte ett resultatpåstående.",
          "Använd kundnamn och referenser som ni har rätt att visa. Saknas ett kundcase kan ni ge ett tydligt märkt exempel, men inte hitta på en kunds erfarenhet."
        ],
        "sources": [
          "marketing-law"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-statusuppdatering-rutin",
    "title": "Hur håller jag information om RCS-stöd aktuell?",
    "category": "Företag",
    "keywords": [
      "rcs tillgänglighet uppdatering källkontroll"
    ],
    "published": "2026-11-01",
    "description": "Information om RCS-stöd behöver ett datum för kontrollen och en tydlig källa. En gammal lanseringsnyhet räcker inte alltid för ett aktuellt besked.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Följ officiella operatörs- och plattformssidor. Skilj privat chatt från företagsräckvidd och notera när källorna säger olika saker.",
          "Byt kontrolldatum först när uppgiften faktiskt har kontrollerats igen. Ett nytt datum utan ny kontroll gör informationen mer vilseledande, inte mer aktuell."
        ],
        "sources": [
          "apple-carriers",
          "tele2-rcs",
          "comviq-rcs"
        ]
      }
    ],
    "related": []
  },
  {
    "slug": "rcs-test-mellan-operatorer",
    "title": "Hur testar jag RCS mellan två operatörer?",
    "category": "Mobil & operatörer",
    "keywords": [
      "rcs test mellan operatörer"
    ],
    "published": "2026-11-01",
    "description": "Testa med två telefoner som har fungerande RCS och olika operatörer. Kontrollera anslutningsstatusen på båda innan du börjar.",
    "sections": [
      {
        "id": "forklaring",
        "title": "",
        "paragraphs": [
          "Skicka en enkel text och läs vilken kanal som användes. Prova sedan bilden eller funktionen du vill undersöka. Vid fel, ändra en förutsättning i taget.",
          "Anteckna app, systemversion, operatör och tid utan att sprida privata samtal. Resultatet gäller det testade paret, inte alla abonnemang eller företagsavsändare."
        ],
        "sources": [
          "tele2-rcs",
          "comviq-rcs",
          "chat"
        ]
      }
    ],
    "related": []
  }
];
