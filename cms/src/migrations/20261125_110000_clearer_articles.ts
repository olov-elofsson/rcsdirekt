import { createHash } from 'node:crypto'

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change: the visible blog articles rewritten to be clearer and somewhat longer, with terms
// explained and examples marked as examples. Every fact comes from the sources already listed in
// the article, or from a source added to that section here (addSources, looked up by sourceId).
// An article changes only while its section text still hashes to the fingerprint of the text this
// rewrite started from (titles, paragraphs and points), so later edits in the CMS are never
// overwritten. Sections are matched by sectionId and keep their points.
type Rewrite = {
  fingerprint: string
  description?: string
  sections: Record<string, { title: string; paragraphs: string[]; addSources?: string[] }>
}

const ARTICLES: Record<string, Rewrite> = {
  "vad-ar-rcs": {
    "fingerprint": "038b26f957aa6653491960faa2910dbcca6bfa63fc4a486318abb08af0b8ac23",
    "description": "RCS är en meddelandestandard som låter dig skicka text, bilder och filer via internet i telefonens vanliga meddelandeapp. Namnet står för Rich Communication Services, och du behöver ingen särskild app för att använda det.",
    "sections": {
      "forklaring": {
        "title": "",
        "paragraphs": [
          "RCS står för Rich Communication Services, en standard för meddelanden som går över wifi eller mobildata. Den gemensamma tekniska grunden heter Universal Profile och tas fram av GSMA, mobiloperatörernas branschorganisation.",
          "När både du och den du skriver till har stöd kan chatten visa läskvitton och när den andra personen skriver. Samma app kan också skicka SMS eller MMS, så alla meddelanden i den går inte nödvändigtvis som RCS. Ett exempel: ett foto till en vän med RCS påslaget visar när hon har läst det, medan samma foto till någon utan stöd går som MMS och utan läskvitto.",
          "Företag kan använda en registrerad avsändare med namn och logotyp och skicka bilder eller svarsknappar. Den tjänsten har egna krav på registrering och räckvidd. Ett privat RCS-samtal och ett företagsutskick behöver därför bedömas var för sig."
        ]
      },
      "fordjupning": {
        "title": "Vad märker mottagaren?",
        "paragraphs": [
          "Du kan börja ett samtal i den vanliga inkorgen och ändå få olika funktioner beroende på vem du skriver till. Kontakterna och inkorgen är desamma, och RCS ändrar sättet meddelandet skickas och visas på. På iPhone kan både RCS och SMS visas med gröna bubblor, så titta på texten i samtalet för att se vilken kanal som används.",
          "För företag tillkommer en registrerad profil och ett system som hanterar utskick och svar. Kunden behöver inte installera företagets egen app för att läsa meddelandet, och i Google Meddelanden kan kunden blockera en företagsavsändare."
        ],
        "addSources": [
          "apple-channels"
        ]
      }
    }
  },
  "rcs-vs-sms": {
    "fingerprint": "f74f4ed8afbeec7a6623fb13655bd3c2219b971124692e2b5709b77461d327cb",
    "description": "SMS är textmeddelanden som skickas via mobilnätet, och MMS kan även innehålla bilder. RCS går över wifi eller mobildata och kan ge bättre mediedelning, läskvitton och företagsmeddelanden med bilder och knappar.",
    "sections": {
      "forklaring": {
        "title": "",
        "paragraphs": [
          "Alla tre kan visas i samma app, utan någon ny inkorg. Skillnaden märks först när du skickar något annat än kort text, eller när du vill veta om meddelandet har kommit fram och lästs.",
          "Ett enskilt SMS rymmer normalt 160 tecken ur teckenuppsättningen GSM-7. Andra tecken, till exempel emojier, eller längre text kan dela upp meddelandet i flera delar. RCS går över wifi eller mobildata och kan därför visa läskvitton och skicka bilder, kort och knappar, om mottagaren har stöd.",
          "Ett företag som vill skicka SMS när RCS inte fungerar behöver en reservlösning, ofta kallad fallback. Den ska vara bekräftad med leverantören, och SMS-versionen behöver en egen text eftersom bilder och knappar inte följer med."
        ]
      },
      "fordjupning": {
        "title": "Välj kanal efter uppgiften",
        "paragraphs": [
          "Ett kort besked utan bild eller svarsalternativ, som att paketet har kommit till ombudet, kan fungera bra som SMS. RCS blir mer intressant när kunden behöver se något eller göra ett tydligt val direkt i meddelandet, till exempel i ett kort med bild och knappar eller en karusell med flera kort.",
          "Jämför därför samma uppgift i båda kanalerna. Om RCS-versionen visar tre jackor i en karusell kan SMS-versionen länka till en sida där samma jackor går att jämföra, i stället för att försöka återge karusellen i text."
        ]
      }
    }
  },
  "rcs-for-foretag": {
    "fingerprint": "4ea6b1e8598047d56e6bacc653fe06af61d158c0466dd7a7770c9c545dde4ea9",
    "description": "RCS för företag låter en registrerad avsändare skicka meddelanden med företagsprofil, bilder och valbara svar i kundens vanliga meddelandeapp. Det kallas ofta RCS Business Messaging, eller RBM.",
    "sections": {
      "forklaring": {
        "title": "",
        "paragraphs": [
          "I Googles modell kallas avsändaren en agent, med varumärkes- och kontaktuppgifter som kunden ser. Ordet kan låta som en chattbot, men agenten är bara den registrerade avsändaren, och vad den gör styrs av företagets egna system.",
          "En webbutik kan låta ordersystemet skicka ett leveransbesked med en spårningsknapp. Ett webbgränssnitt passar i stället när en person vill skapa ett utskick för hand. RCS är kanalen, medan orderstatusen och hanteringen av kundsvar finns i företagets egna system, dit svar och händelser skickas via en webhook.",
          "Innan utskick behöver avsändaren vara godkänd. Google kontrollerar varumärket och att partnern får hantera avsändaren, och det går att kontrollera i förväg om ett visst nummer kan ta emot RCS från den. Registreringen ger ingen rätt att marknadsföra till vem som helst, så kontaktregler och en eventuell SMS-reserv behöver också vara ordnade."
        ]
      },
      "fordjupning": {
        "title": "Kanalen behöver ett sammanhang",
        "paragraphs": [
          "Ett företagsmeddelande är användbart när det hör ihop med något kunden redan förstår: en beställning, en bokning eller en fråga. Google rekommenderar relevanta meddelanden och tydliga val, men det är vägledning och inga uppmätta resultat, så effekten behöver du följa själv.",
          "Planera även vem som äger nästa steg. Trycker kunden på en knapp för att ändra leveransdag ska svaret nå leveranshanteringen och inte fastna i en separat inkorg. Kunden kan också skriva fritt eller skicka en bild, så rutinen behöver klara mer än knapparna."
        ],
        "addSources": [
          "receive"
        ]
      }
    }
  },
  "verifierad-avsandare": {
    "fingerprint": "1811e1b002215dd32990a5b9bdb0c6e9531f323e94c1c831d97cbcedca3bfbfa",
    "description": "Verifieringen kontrollerar att RCS-avsändaren hör ihop med varumärket den företräder. I Google Meddelanden ser kunden då företagets namn, logotyp och en verifieringsmarkering.",
    "sections": {
      "forklaring": {
        "title": "",
        "paragraphs": [
          "I Googles process bekräftar en behörig representant för varumärket uppgifterna och att partnern, alltså företaget som sköter avsändaren tekniskt, får hantera den. Det görs före lansering. Fråga din partner vilka underlag som behövs och vilka marknader godkännandet gäller.",
          "Enligt leverantören Bandwidth får en verifierad avsändare en bock efter namnet i Google Meddelanden. Märkningen hjälper kunden att känna igen företaget men intygar inte varje erbjudande eller länk, och den säger inget om end-to-end-kryptering. En oväntad begäran om betalning eller känsliga uppgifter bör du fortfarande kontrollera på annat sätt."
        ],
        "addSources": [
          "google-messages-logo-2026"
        ]
      },
      "fordjupning": {
        "title": "Igenkänning utan falsk trygghet",
        "paragraphs": [
          "Profilens namn bör vara det kunden känner igen från köpet. Har kunden handlat i en butik som heter något annat än koncernen som äger den, kan koncernnamnet skapa osäkerhet även när det är korrekt registrerat.",
          "Håll logotyp, kontaktvägar och länkdomäner konsekventa, och se över uppgifterna med partnern om varumärket ändras. Enligt Bandwidth ska logotypen nu vara 224 × 224 pixlar med enfärgad bakgrund och visas som en rundad kvadrat, och alla logotyper ska vara uppdaterade senast den 1 juni 2027. Kunden ska kunna kontrollera avsändaren genom en oberoende kontaktväg, till exempel numret på er webbplats, särskilt när meddelandet gäller pengar eller kontouppgifter."
        ],
        "addSources": [
          "google-messages-logo-2026"
        ]
      }
    }
  },
  "rcs-api-webhooks": {
    "fingerprint": "50511da4237c52378bf47c630e3a4cfb1f309ddcedde0390df75a676da6f9f69",
    "description": "Med ett RCS API kan dina system begära ett utskick, och via webhooks får de senare veta vad som hände: leverans, läsning och kundens svar. Att API:et har tagit emot begäran betyder ännu inte att telefonen har fått meddelandet.",
    "sections": {
      "forklaring": {
        "title": "",
        "paragraphs": [
          "Ett API är det gränssnitt ditt ordersystem anropar för att be leverantören skicka ett meddelande. En webhook går åt andra hållet: en adress i ditt system som leverantören anropar när något händer. Google skiljer till exempel på händelserna DELIVERED, levererat, och READ, läst.",
          "Spara meddelandets identifierare tillsammans med ordern eller ärendet, så går det att uppdatera rätt post när en händelse kommer tillbaka. Kontrollera webhook-anropets ursprung innan händelsen behandlas, och se till att samma händelse kan komma två gånger utan att ärendet ändras två gånger.",
          "Adresser, fält och autentisering beror på leverantören, så utgå från dokumentationen för tjänsten du kopplar till. Ska SMS vara reserv behöver integrationen också veta när det får skickas och hur väntande RCS hanteras utan dubbla besked."
        ]
      },
      "fordjupning": {
        "title": "Två riktningar i samma flöde",
        "paragraphs": [
          "Utskicket och svaret lever olika länge. Ordersystemet kan begära ett leveransbesked klockan 14, medan leveransrapporten kommer senare och kundens svar kanske nästa morgon. Integrationen behöver därför hitta samma order utan att det ursprungliga anropet är öppet.",
          "Beskriv vad varje status får ändra och vad som ska hända om en händelse saknas. Det gör felsökningen betydligt tydligare än en enda etikett som säger skickat. Räkna också med att kunden kan svara med fri text eller en bild, även om meddelandet bara hade knappar."
        ],
        "addSources": [
          "receive"
        ]
      }
    }
  },
  "rcs-pa-iphone": {
    "fingerprint": "b346115bcd4286dfc58bdda27104ffdddc61a7b60043bf3de15ae9fdf95457fc",
    "description": "RCS fungerar i iPhones app Meddelanden från iOS 18, men din operatör måste också ha stöd. I Sverige har Tele2 och Comviq öppnat för alla kunder, och hos Tre och Hallon fungerar det i en testversion av iOS.",
    "sections": {
      "forklaring": {
        "title": "",
        "paragraphs": [
          "För att använda RCS på iPhone behövs två saker. Telefonen måste ha iOS 18 eller senare, och din operatör måste ha öppnat för RCS. Det räcker alltså inte att uppdatera telefonen om operatören inte är med.",
          "Så kontrollerar du: öppna Inställningar, välj Appar och sedan Meddelanden. Där ska det finnas ett val som heter RCS-meddelanden. Saknas det, fråga operatören om just din linje. När det fungerar kan ett samtal med någon som har Android få bättre bilddelning och läskvitton.",
          "Vilken kanal ett samtal använder ser du i texten i själva samtalet. Gröna bubblor kan vara både RCS och SMS, så färgen säger inget om det. Blå bubblor är iMessage.",
          "Skickar du för ett företag och vill nå kunder med iPhone behöver du dessutom testa din registrerade avsändare. Att två privatpersoner kan chatta med RCS visar inte att ett företagsutskick når samma telefoner."
        ],
        "addSources": [
          "apple-channels"
        ]
      },
      "operatorer": {
        "title": "Vilka operatörer har RCS på iPhone i Sverige?",
        "paragraphs": [
          "Läget i november 2026: Tele2 och Comviq har öppnat RCS på iPhone för alla sina kunder. Hos Tre fungerar det i testversionen av iOS 27.3, som Apple släppte den 3 november, och det har också testats med Hallon. Det kan komma till alla kunder med den färdiga uppdateringen, men operatörerna har inte bekräftat när. Telia och Telenor har inte bekräftat något stöd än.",
          "Använder du en vanlig iOS-version får du vänta på den färdiga uppdateringen. Testversioner av iOS är gjorda för utvecklare och kan innehålla fel, så det är sällan värt att installera en bara för RCS. Listan ändras när fler operatörer kommer till, och det säkraste beskedet för din linje står på operatörens egen supportsida."
        ]
      },
      "fordjupning": {
        "title": "Testa ett verkligt samtal",
        "paragraphs": [
          "När inställningen finns kan du göra ett enkelt test. Öppna en konversation med någon som vet att hen har RCS, till exempel en vän med en Android-telefon där RCS är påslaget, och titta på kanaltexten innan du skickar.",
          "Att en bild kommer fram bevisar inte att RCS används, eftersom MMS också kan bära bilder. Kanaltexten i samtalet är ett säkrare tecken. Fungerar det inte, skriv upp vilken iOS-version telefonen har och vilken linje du använder, så blir det lättare för operatörens support att svara.",
          "För en företagsavsändare krävs ett eget test från just den avsändaren, eftersom ett test mellan två privata telefoner inte säger något om den. Inför ett utskick kan leverantören också göra en kapabilitetskontroll, som visar om ett visst telefonnummer kan ta emot RCS från avsändaren och vilka funktioner som stöds."
        ]
      }
    }
  },
  "vad-kostar-rcs": {
    "fingerprint": "2be47f4074917617f0f1d102ad6c018b593d2778a3e46476200394864f999c6f",
    "description": "Privat RCS går över wifi eller mobildata, så kostnaden följer din uppkoppling. Företagsutskick har en egen prissättning hos tjänsten som skickar dem, och hos rcsdirekt.se betalar du per meddelande.",
    "sections": {
      "forklaring": {
        "title": "",
        "paragraphs": [
          "Privata RCS-meddelanden går över wifi eller mobildata, så de räknas mot din surfmängd när du inte är på wifi. För företag debiterar operatörerna RCS i nivåer efter vad meddelandet innehåller.",
          "Hos rcsdirekt.se kostar Basic från 0,316 SEK, Single från 0,462 SEK och Conversation från 0,641 SEK per meddelande, exklusive moms. Basic är text upp till 160 tecken, Single har bild, knappar eller längre text, och Conversation gäller när kunden svarar och ni skriver fram och tillbaka, vanligtvis inom 24 timmar. Du betalar per meddelande utan månadsavgift eller bindningstid.",
          "Räkna antalet meddelanden per typ när du uppskattar ett utskick. 1 000 Basic-meddelanden kostar till exempel från 316 kronor. Kontrollera separat vad en eventuell SMS-reserv kostar och ta med integration och hantering om du vill beräkna hela projektkostnaden."
        ]
      },
      "fordjupning": {
        "title": "Räkna på det som ska skickas",
        "paragraphs": [
          "Två projekt med lika många kunder kan kosta olika mycket om det ena skickar ett besked och det andra en påminnelse och två uppföljningar. Gör därför budgeten utifrån meddelanden, inte bara kontaktlistans storlek.",
          "Skilj också kanalens pris från arbetet med att ta fram innehåll och ansluta ordersystemet. En eventuell reservkanal ska räknas för sig, så att kostnaden inte döljs i ett genomsnitt."
        ]
      }
    }
  },
  "rcs-gdpr-samtycke": {
    "fingerprint": "c9256a5cf3046cb66e293d029b581f82e7f6145ebc2d3c7fbf2b3cdd599b9ee5",
    "description": "Företaget ansvarar för personuppgifterna och för reglerna om marknadsföring även när utskicket går som RCS. Telefonnummer, svar och leveransdata kan vara personuppgifter om de går att koppla till en person.",
    "sections": {
      "forklaring": {
        "title": "",
        "paragraphs": [
          "Ett nytt meddelandeformat ändrar inte kraven. GDPR gäller hur du behandlar personuppgifter som telefonnummer och svar, och marknadsföringslagen gäller själva reklamen. Konsumentverket beskriver bland annat att reklam ska gå att känna igen som reklam och inte får vara vilseledande.",
          "GDPR:s rättsliga grund och reglerna om marknadsföringskontakt är skilda frågor. En bokningsbekräftelse och ett reklamerbjudande behöver därför bedömas var för sig, efter vad de är till för.",
          "Informera mottagaren och begränsa vad du sparar och hur länge. Enligt Integritetsskyddsmyndigheten kan en person alltid invända mot att hens uppgifter används för direktmarknadsföring, och en sådan invändning eller avregistrering måste få effekt i systemen som styr utskicken. Låt en dataskyddskunnig rådgivare bedöma ditt upplägg; den här översikten ersätter inte juridisk rådgivning."
        ],
        "addSources": [
          "marketing-law",
          "imy-objection"
        ]
      },
      "fordjupning": {
        "title": "Skilj på ändamålen",
        "paragraphs": [
          "Samma telefonnummer kan finnas i både ett bokningsregister och en kampanjlista utan att användningen är densamma. En frisörsalongs påminnelse dagen före en bokad tid hör till bokningen, medan ett erbjudande till samma nummer är marknadsföring.",
          "Dokumentera varför uppgiften behövs i respektive flöde och hur mottagarens val slår igenom, så att ett nej till erbjudanden inte stoppar påminnelserna. En teknisk leveranskvittens kan användas för felsökning men ska inte automatiskt bli ett nytt marknadsföringsunderlag. Bedömningen av rättslig grund, information och kontaktregler måste göras för den verkliga behandlingen."
        ]
      }
    }
  },
  "rcs-basic-single-conversation": {
    "fingerprint": "d2a0d25473fc53c58298fc74e2146ca1411d64159e51bb1123155258644abbf6",
    "description": "Basic, Single och Conversation är de nivåer som operatörerna debiterar RCS för företag efter. De beskriver vad meddelandet innehåller och om kunden svarar, och de är inga abonnemang.",
    "sections": {
      "forklaring": {
        "title": "",
        "paragraphs": [
          "Nivån bestäms för varje meddelande, så samma företag kan skicka alla tre. Basic är ren text upp till 160 tecken, till exempel en orderbekräftelse. Single har bild, video, knappar eller text längre än 160 tecken, som ett kort med bild och rubrik eller en karusell. Conversation börjar när kunden svarar, och sedan skriver ni fram och tillbaka under ett tidsfönster som vanligtvis är 24 timmar.",
          "Leverantörens och operatörernas villkor avgör gränser, tidsfönster och debitering. Be om dem innan du räknar på ett flöde, eftersom en synlig svarsknapp inte ensam avgör hur meddelandet faktureras."
        ]
      },
      "fordjupning": {
        "title": "Utgå från det verkliga innehållet",
        "paragraphs": [
          "Börja med att rita kundens flöde: ett kort besked, ett rikt utskick eller ett samtal med flera steg. Fråga sedan hur leverantören klassificerar varje del. En tandläkares påminnelse i ren text blir till exempel Basic, med en knapp för att boka om blir den Single, och svarar patienten börjar en Conversation.",
          "Se inte nivåerna som en trappa där den dyraste alltid är bäst. En enkel orderstatus kan klara sig med text, medan ett produktval behöver media. Debiteringsreglerna måste bekräftas separat från de tekniska möjligheterna."
        ]
      }
    }
  },
  "rcs-sverige-operatorer": {
    "fingerprint": "4d8e68917ed83871e9ca32e15697b19b8c98c60ba91d242d1de9b7bd541dc221",
    "description": "Tele2 och Comviq uppger att RCS fungerar på både iPhone och Android. Hos andra svenska operatörer behöver du fråga om stödet för ditt abonnemang och din telefon.",
    "sections": {
      "forklaring": {
        "title": "",
        "paragraphs": [
          "Tele2 och Comviq beskriver RCS för iPhone och Android på sina supportsidor. Enligt Hurbra.se fungerar RCS på iPhone även hos Tre i den första testversionen av iOS 27.3, och det har testats med Hallon, men operatörerna har inte bekräftat när alla kunder får det.",
          "Apples operatörslista och operatörernas egna supportsidor ger inte samma besked: den 1 november 2026 saknade Sveriges avsnitt hos Apple RCS-markeringar, trots Tele2s och Comviqs uppgifter om iPhone-stöd. Därför går det inte att ge ett säkert svar för hela Sverige utifrån den listan.",
          "Ska ett företag skicka RCS behövs en annan kontroll. Leverantören måste kunna nå kunderna från företagets registrerade avsändare. Att två personer kan chatta med RCS säger inte om ett företagsutskick når samma telefoner."
        ],
        "addSources": [
          "tre-hallon-ios-27-3"
        ]
      },
      "fordjupning": {
        "title": "Bygg en användbar stödbild",
        "paragraphs": [
          "Dela upp frågan i privat Android-chatt, privat iPhone-chatt och företagsmeddelanden. De tre svaren kan skilja sig för samma kund, till exempel om operatören har öppnat för Android men ännu inte för iPhone.",
          "När en supportuppgift är oklar, notera källa, datum och vilken telefon eller linje beskedet gäller, så ser du senare vad som behöver kontrolleras igen. För planerade utskick är ett test från den registrerade avsändaren till ett relevant mottagarurval mer användbart än att summera operatörernas allmänna lanseringsnyheter."
        ]
      }
    }
  },
  "svenska-operatorer-oppnar-rcs-pa-iphone": {
    "fingerprint": "a4c65808b72afb170e09c813fa99df5f7202d170068fe0beefb221dc258b226e",
    "sections": {
      "nyheten": {
        "title": "",
        "paragraphs": [
          "Under 2026 har RCS börjat nå iPhone i Sverige. RCS är den nyare standarden för meddelanden som går över wifi eller mobildata i telefonens vanliga meddelandeapp. Tele2 och Comviq var först och har öppnat funktionen för alla sina kunder.",
          "Skriver du från en iPhone till någon med Android märks skillnaden direkt. Bilder går fram i högre kvalitet, och båda ser när den andra skriver och när ett meddelande har lästs. Utan RCS går de samtalen som SMS och MMS.",
          "Tre och Hallon är nästa operatörer på tur. I den första testversionen av iOS 27.3, som Apple släppte den 3 november 2026, fungerar RCS hos Tre. Funktionen har också testats med ett abonnemang från Hallon."
        ],
        "addSources": [
          "apple-channels"
        ]
      },
      "operatorer": {
        "title": "Läget hos operatörerna",
        "paragraphs": [
          "Sammanställningen gäller november 2026 och uppdateras när fler operatörer öppnar för RCS. Tele2 och Comviq beskriver stödet på sina supportsidor. Uppgifterna om Tre och Hallon kommer från tester med testversionen av iOS 27.3 som Hurbra.se har rapporterat om."
        ]
      },
      "nar": {
        "title": "När får kunder hos Tre och Hallon RCS?",
        "paragraphs": [
          "Det finns inget bekräftat datum. Stödet kan nå alla kunder när den färdiga versionen av iOS 27.3 släpps, men varken Tre eller Hallon har bekräftat det. Testversioner av iOS är avsedda för utvecklare och kan innehålla fel, så det är sällan värt att installera en bara för att få RCS. Vill du veta när din linje får stöd, håll ett öga på operatörens supportsida, där Tele2 och Comviq har beskrivit sitt."
        ],
        "addSources": [
          "tele2-rcs",
          "comviq-rcs"
        ]
      },
      "kontrollera": {
        "title": "Så kontrollerar du att RCS är påslaget",
        "paragraphs": [
          "Telefonen behöver iOS 18 eller senare. Öppna Inställningar, välj Appar och sedan Meddelanden. Finns valet RCS-meddelanden kan du slå på det där. Saknas det har din operatör ännu inte öppnat för RCS, eller så behöver telefonen en nyare version av iOS.",
          "Bubblans färg visar inte om RCS används, eftersom både SMS och RCS visas i grönt. Titta i stället på texten i samtalet, som visar vilken kanal meddelandet går i."
        ],
        "addSources": [
          "apple-channels"
        ]
      },
      "foretag": {
        "title": "Vad det betyder för företag",
        "paragraphs": [
          "När fler iPhone-användare får RCS kan fler mottagare se företagens meddelanden med avsändarnamn, logotyp, bilder och knappar i stället för som vanliga SMS. Räckvidden för en företagsavsändare kan ändå skilja sig mellan operatörerna. Testa därför utskicket mot de nät som dina kunder använder.",
          "Inför ett utskick kan leverantören göra en kapabilitetskontroll. Den visar om ett visst telefonnummer kan ta emot RCS från avsändaren och vilka funktioner som stöds, vilket ger ett mer exakt svar än telefonmodell eller operatörsnamn."
        ]
      }
    }
  }
}

type Doc = Record<string, any>
const text = (value: unknown) => (typeof value === 'string' ? value : '')
const list = (value: unknown): Doc[] => (Array.isArray(value) ? value : [])

/** The same hash as the fingerprints above: section titles, paragraphs and points, in order. */
export function fingerprint(sections: Doc[]): string {
  const shape = sections.map((section) => [
    text(section.title),
    list(section.paragraphs).map((row) => text(row.text)),
    list(section.points).map((row) => text(row.text)),
  ])
  return createHash('sha256').update(JSON.stringify(shape)).digest('hex')
}

const idOf = (value: unknown) => (value && typeof value === 'object' ? (value as Doc).id : value)

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  for (const [slug, rewrite] of Object.entries(ARTICLES)) {
    const { docs } = await payload.find({ collection: 'artiklar', where: { slug: { equals: slug } }, depth: 0, limit: 1, req })
    const article = docs[0] as Doc | undefined
    const sections = list(article?.sections)
    if (!article || fingerprint(sections) !== rewrite.fingerprint) {
      payload.logger.info(`Migration: article ${slug} missing or edited since; left as it is.`)
      continue
    }
    const next = []
    for (const [index, section] of sections.entries()) {
      const change = rewrite.sections[text(section.sectionId) || `avsnitt-${index + 1}`]
      if (!change) {
        next.push(section)
        continue
      }
      const sources = list(section.sources).map(idOf)
      for (const sourceId of change.addSources ?? []) {
        const found = await payload.find({ collection: 'kallor', where: { sourceId: { equals: sourceId } }, depth: 0, limit: 1, req })
        const id = found.docs[0]?.id
        if (id === undefined) payload.logger.warn(`Migration: source ${sourceId} missing, not added to ${slug}.`)
        else if (!sources.includes(id)) sources.push(id)
      }
      next.push({ ...section, title: change.title, paragraphs: change.paragraphs.map((paragraph) => ({ text: paragraph })), sources })
    }
    const data = { sections: next, ...(rewrite.description ? { description: rewrite.description } : {}) }
    await payload.update({ collection: 'artiklar', id: article.id, req, data: data as never })
    payload.logger.info(`Migration: article ${slug} rewritten.`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the earlier text is in git history (cms/src/seed/content.json) if it is ever needed.
}
