import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content: the first privacy policy and terms. Facts that can be checked in the code (what the
// forms collect, Google Cloud in europe-west1, no tracking cookies) come from there; the rest is a
// draft for the owner to review in the CMS. Only fills the global while it is still empty.
type Section = { heading: string; body: string }

const UPDATED = '22 november 2026'

const PRIVACY: Section[] = [
  {
    heading: 'Vem som ansvarar',
    body: `WIGOSE AB (org.nr 559415-6753), Klostergatan 15, 703 39 Örebro, driver RCS Direkt och är personuppgiftsansvarig för behandlingen som beskrivs här.

Frågor om dina uppgifter skickar du via kontaktformuläret på rcsdirekt.se eller med post till adressen ovan.`,
  },
  {
    heading: 'Vilka uppgifter vi samlar in',
    body: `När du skickar kontaktformuläret, ber om ett konto eller anmäler dig till ett webinar sparar vi det du fyller i: namn och e-post, och företag, telefonnummer och meddelande om du anger dem. Vid en webinaranmälan sparar vi också vilket webinar det gäller.

När du laddar upp en video i videogeneratorn sparar vi videon och tidpunkten för uppladdningen tillsammans med en hash av din IP-adress. Hashen är en kod som räknas fram ur adressen. Själva IP-adressen sparar vi inte.

Våra servrar loggar tekniska uppgifter om varje anrop, till exempel tidpunkt och IP-adress. När ett formulär tas emot loggas även e-postadressen.`,
  },
  {
    heading: 'Varför vi behandlar uppgifterna',
    body: `- Kontaktformuläret: för att svara på din fråga. Den rättsliga grunden är vårt berättigade intresse av att kunna svara den som hör av sig (artikel 6.1 f i dataskyddsförordningen).
- Kontoförfrågan: för att aktivera kontot och komma överens om villkoren. Behandlingen behövs innan ett avtal ingås (artikel 6.1 b).
- Webinaranmälan: för att skicka länken och genomföra webinaret. Grunden är vårt berättigade intresse (artikel 6.1 f).
- Videouppladdning: för att visa videon via länken och begränsa hur många videor samma avsändare kan ladda upp. Grunden är vårt berättigade intresse av att förhindra missbruk (artikel 6.1 f).
- Serverloggar: för drift och säkerhet. Grunden är vårt berättigade intresse (artikel 6.1 f).

Vi fattar inga automatiserade beslut om dig och säljer inte dina uppgifter.`,
  },
  {
    heading: 'Hur länge vi sparar uppgifterna',
    body: `- Kontaktförfrågningar och kontoförfrågningar som inte leder till ett avtal: 12 månader efter den senaste kontakten.
- Webinaranmälningar: 3 månader efter webinaret.
- Uppgifter om kunder: så länge kundförhållandet pågår. Underlag för bokföringen sparas i 7 år enligt bokföringslagen.
- Uppladdade videor: så länge länken behövs. Vill du att en video tas bort kan du kontakta oss.
- Hashade IP-adresser: används bara för att räkna uppladdningar under det senaste dygnet.
- Serverloggar: 30 dagar.`,
  },
  {
    heading: 'Vilka som tar del av uppgifterna',
    body: `Uppgifterna lagras hos Google Cloud i regionen europe-west1, som ligger i Belgien. Google behandlar dem för vår räkning enligt Googles personuppgiftsbiträdesavtal för Google Cloud.

Google är ett amerikanskt företag och kan i vissa fall föra över uppgifter till USA, till exempel vid support. Sådana överföringar stöds av EU-kommissionens beslut om EU-USA Data Privacy Framework och av standardavtalsklausuler.

När vi svarar dig använder vi vår e-posttjänst, och vid ett webinar den plattform som webinaret sänds på.`,
  },
  {
    heading: 'Typsnitt och cookies',
    body: `Sidan hämtar typsnitt från Google Fonts. Då skickas din IP-adress till Google när sidan laddas.

Vi använder inga cookies för statistik eller marknadsföring. Webbläsaren sparar lokalt om du har stängt notisraden högst upp, och videogeneratorn sparar det du har fyllt i så att det finns kvar nästa gång. De uppgifterna stannar i din webbläsare.`,
  },
  {
    heading: 'Meddelanden som våra kunder skickar',
    body: `När ett företag skickar RCS genom oss är företaget personuppgiftsansvarigt för mottagarnas uppgifter, och vi är personuppgiftsbiträde. Det regleras i ett personuppgiftsbiträdesavtal mellan oss och kunden. Frågor om ett meddelande du har fått ställer du till företaget som skickade det.`,
  },
  {
    heading: 'Dina rättigheter',
    body: `Du har rätt att få veta vilka uppgifter vi har om dig och att få en kopia av dem. Du kan begära att vi rättar eller raderar uppgifter, att vi begränsar behandlingen eller att du får ut de uppgifter du själv har lämnat i ett maskinläsbart format. När behandlingen bygger på vårt berättigade intresse har du rätt att invända mot den.

Hör av dig via kontaktformuläret eller med post. Vi svarar inom en månad.

Om du är missnöjd med hur vi behandlar dina uppgifter kan du klaga hos Integritetsskyddsmyndigheten (IMY) på imy.se.`,
  },
  {
    heading: 'Ändringar',
    body: `Vi uppdaterar policyn när vi ändrar hur vi behandlar personuppgifter. Datumet högst upp visar när den senast ändrades.`,
  },
]

const TERMS: Section[] = [
  {
    heading: 'Om villkoren',
    body: `Villkoren gäller mellan WIGOSE AB (org.nr 559415-6753), som driver RCS Direkt, och det företag som skapar ett konto (kunden). Tjänsten är till för företag och organisationer, inte för privatpersoner.

Har kunden och RCS Direkt ett skriftligt avtal gäller det före dessa villkor.`,
  },
  {
    heading: 'Tjänsten',
    body: `Med RCS Direkt skickar kunden RCS-meddelanden från ett webbverktyg eller via API. Meddelandena levereras genom mobiloperatörerna och Googles RCS-tjänst. Stöder mottagarens telefon eller operatör inte RCS kan meddelandet inte levereras som RCS.

Vi arbetar för att tjänsten ska fungera utan avbrott, men vi kan inte lova att varje meddelande kommer fram.`,
  },
  {
    heading: 'Konto och avsändare',
    body: `Kunden ska lämna korrekta uppgifter om företaget. Varje avsändare registreras och kontrolleras innan den får skicka. Kunden får bara skicka i eget namn eller i namn av ett företag som har gett kunden rätt till det.

Kunden ansvarar för att inloggningsuppgifter och API-nycklar hålls hemliga och för allt som skickas från kontot.`,
  },
  {
    heading: 'Priser och betalning',
    body: `Kunden betalar per skickat meddelande enligt prislistan på rcsdirekt.se/priser eller enligt ett pris vi har kommit överens om. Priserna anges exklusive moms. Det finns ingen startavgift, månadsavgift eller bindningstid.

Hur och när kunden betalar står i avtalet eller på fakturan. Vid sen betalning har vi rätt till dröjsmålsränta enligt räntelagen. Vi kan ändra priserna med 30 dagars varsel.`,
  },
  {
    heading: 'Tillåten användning',
    body: `Kunden ansvarar för innehållet i meddelandena och för att utskicken följer lagen, särskilt marknadsföringslagen och dataskyddsförordningen. Det innebär bland annat att

- reklam till privatpersoner bara får skickas till den som har samtyckt i förväg, eller till befintliga kunder enligt undantaget i 19 § marknadsföringslagen
- varje reklammeddelande ska visa vem som skickar det och ge mottagaren ett enkelt sätt att tacka nej till fler utskick
- kunden ska ha en rättslig grund för att använda mottagarnas telefonnummer.

Kunden får inte skicka meddelanden som är vilseledande eller olagliga, eller som utger sig för att komma från någon annan. Kunden ska också följa de regler för RCS-avsändare som Google och operatörerna ställer.`,
  },
  {
    heading: 'Avstängning',
    body: `Vi får stänga av ett konto eller en avsändare direkt om kunden bryter mot villkoren, om utskicken leder till klagomål eller om en operatör eller Google kräver det. Vi meddelar kunden så snart vi kan.`,
  },
  {
    heading: 'Personuppgifter',
    body: `När kunden skickar meddelanden är kunden personuppgiftsansvarig för mottagarnas uppgifter och WIGOSE AB är personuppgiftsbiträde. Det regleras i ett personuppgiftsbiträdesavtal som ingås innan kunden börjar skicka. Hur vi behandlar uppgifter om kunden och dess kontaktpersoner står i integritetspolicyn.`,
  },
  {
    heading: 'Ansvar',
    body: `Vi ansvarar inte för indirekta skador, till exempel utebliven vinst, eller för fel som beror på operatörer, Google, mottagarens telefon eller annat utanför vår kontroll. Vårt sammanlagda ansvar är begränsat till det kunden har betalat för tjänsten under de senaste tre månaderna.`,
  },
  {
    heading: 'Uppsägning',
    body: `Kunden kan säga upp kontot när som helst. Meddelanden som redan har skickats debiteras. Vi kan säga upp tjänsten med 30 dagars varsel, eller direkt om kunden väsentligt bryter mot villkoren.`,
  },
  {
    heading: 'Ändringar av villkoren',
    body: `Vi kan ändra villkoren. Väsentliga ändringar meddelar vi kunden minst 30 dagar innan de börjar gälla.`,
  },
  {
    heading: 'Tillämplig lag och tvister',
    body: `Svensk lag gäller för villkoren. Tvister avgörs av allmän domstol, med Örebro tingsrätt som första instans.`,
  },
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const current = (await payload.findGlobal({ slug: 'juridiskt', depth: 0, req })) as Record<string, any>
  if (current.integritetspolicy?.title || current.villkor?.title) {
    payload.logger.info('Migration: legal pages already have content, left as they are.')
    return
  }
  await payload.updateGlobal({
    slug: 'juridiskt',
    req,
    data: {
      integritetspolicy: {
        title: 'Integritetspolicy',
        description: 'Så behandlar WIGOSE AB personuppgifter när du använder rcsdirekt.se och RCS Direkt.',
        updated: UPDATED,
        sections: PRIVACY,
      },
      villkor: {
        title: 'Villkor',
        description: 'Villkoren för företag som skickar RCS genom RCS Direkt.',
        updated: UPDATED,
        sections: TERMS,
      },
    },
  })
  payload.logger.info('Migration: privacy policy and terms added.')
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the texts are in git history if they are ever needed.
}
