import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Content change: the articles answer directly instead of "Enligt Google …", "Apple skriver …";
// the sources are already listed under each section. Only exact old wording is replaced, so text
// an editor has changed since is left alone, and running it again changes nothing.
export const REPLACEMENTS: [string, string][] = [
  // vad-ar-rcs
  ['Tele2 och Comviq beskriver RCS som en modernare variant av SMS och MMS.', 'Det är en modernare variant av SMS och MMS.'],
  ['Google, Apple, Tele2 och Comviq beskriver ungefär samma funktioner.', 'Funktionerna är ungefär desamma oavsett telefon och operatör.'],
  ['och Tele2 och Comviq anger att det fungerar från Android 5.0.', 'och det fungerar från Android 5.0.'],
  [
    'Enligt Google kan även andra appar som följer standarden, till exempel Samsung Messages och Meddelanden på iPhone, ansluta till RCS.',
    'Även andra appar som följer standarden, till exempel Samsung Messages och Meddelanden på iPhone, kan ansluta till RCS.',
  ],
  ['Apple skriver att det kan dröja några timmar efter att du har slagit på RCS innan det fungerar.', 'Det kan dröja några timmar efter att du har slagit på RCS innan det fungerar.'],
  ['Enligt Google kostar det inget extra', 'Det kostar inget extra'],
  ['Enligt Google kostar de inget extra', 'De kostar inget extra'],
  [
    'Tele2 skriver att RCS ingår i abonnemanget, medan Apple påpekar att operatörsavgifter kan tillkomma.',
    'Hos Tele2 ingår RCS i abonnemanget, men hos andra operatörer kan avgifter tillkomma.',
  ],
  ['Google anger att RCS-chattar mellan användare av Google Meddelanden', 'RCS-chattar mellan användare av Google Meddelanden'],
  [
    'När vi läste Googles hjälpsida i november 2026 stod det att RCS-chattar med iPhone-användare inte har end-to-end-kryptering.',
    'I november 2026 hade RCS-chattar mellan Google Meddelanden och iPhone inte end-to-end-kryptering.',
  ],
  ['Företagsmeddelanden via RCS är enligt Google inte end-to-end-krypterade.', 'Företagsmeddelanden via RCS är inte end-to-end-krypterade.'],
  ['är enligt Google troligen ett bedrägeriförsök.', 'är troligen ett bedrägeriförsök.'],
  // rcs-vs-sms, vad-kostar-rcs
  ['och enligt leverantören Bandwidth debiteras varje segment för sig.', 'och varje segment debiteras för sig.'],
  ['Google skiljer på levererat, läst och att mottagaren skriver.', 'Avsändaren ser om meddelandet har levererats, om det har lästs och om mottagaren skriver.'],
  [
    'Google rekommenderar att systemet först kontrollerar att RCS-meddelandet inte har levererats och försöker dra tillbaka det,',
    'Systemet bör då först kontrollera att RCS-meddelandet inte har levererats och försöka dra tillbaka det,',
  ],
  ['Enligt Google visar ett SMS ingen verifiering', 'Ett SMS visar ingen verifiering'],
  ['och enligt Google är inte heller företagsmeddelanden via RCS det.', 'och det är inte heller företagsmeddelanden via RCS.'],
  // rcs-for-foretag
  ['Google rekommenderar att kortets viktigaste knapp ligger först, eftersom', 'Lägg kortets viktigaste knapp först, eftersom'],
  [
    'Google anger till exempel att knappar som ligger kvar inne i meddelandebubblan inte stöds på iPhone eller i Samsung Messages.',
    'Knappar som ligger kvar inne i meddelandebubblan stöds till exempel inte på iPhone eller i Samsung Messages.',
  ],
  ['Enligt Google tar en lansering som Google hanterar 1 till 3 arbetsdagar,', 'En lansering som Google hanterar tar 1 till 3 arbetsdagar,'],
  [
    'Google rekommenderar relevanta meddelanden och tydliga val, men det är vägledning och inga uppmätta resultat, så effekten behöver du följa själv.',
    'Håll meddelandena relevanta och valen tydliga, och följ själv upp vilken effekt de har.',
  ],
  // verifierad-avsandare
  ['Enligt Googles hjälpsida för användare betyder bocken att', 'Bocken betyder att'],
  ['och Google anger att profilen också visar vem som har gjort verifieringen.', 'och där visas också vem som har gjort verifieringen.'],
  ['men Google skriver att vissa operatörer kommer att kräva den.', 'men vissa operatörer kommer att kräva den.'],
  ['Google anger 1 till 3 arbetsdagar för en lansering som Google hanterar,', 'En lansering som Google hanterar tar 1 till 3 arbetsdagar,'],
  ['Google anger 1 till 3 arbetsdagar för en lansering som Google sköter,', 'En lansering som Google sköter tar 1 till 3 arbetsdagar,'],
  [
    'Google skriver att verifieringsbocken är skyddad mot efterapning och inte kan läggas till för hand.',
    'Verifieringsbocken är skyddad mot efterapning och kan inte läggas till för hand.',
  ],
  ['Enligt leverantören Bandwidth ska alla logotyper vara uppdaterade', 'Alla logotyper ska vara uppdaterade'],
  ['Enligt Google gäller det här:', 'Det gäller de här valen:'],
  ['och kan enligt Bandwidth ta upp till sju dagar att synas.', 'och kan ta upp till sju dagar att synas.'],
  [
    'Google skriver att extra kontaktuppgifter och egna etiketter, som Kundtjänst i stället för Telefon, bara visas i Google Meddelanden.',
    'Extra kontaktuppgifter och egna etiketter, som Kundtjänst i stället för Telefon, visas bara i Google Meddelanden.',
  ],
  [
    'Google skriver att verifierade RCS-chattar mellan företag och användare inte är end-to-end-krypterade, och att företag,',
    'Verifierade RCS-chattar mellan företag och användare är inte end-to-end-krypterade, och företag,',
  ],
  ['Google påpekar också att ett företag aldrig kan vara med i en gruppchatt,', 'Ett företag kan heller aldrig vara med i en gruppchatt,'],
  // rcs-api-webhooks
  [
    'Google rekommenderar att webhooken lägger händelsen i en egen kö och svarar 200 OK inom fem sekunder, och att själva behandlingen sker separat.',
    'Lägg händelsen i en egen kö, svara 200 OK inom fem sekunder och behandla händelsen separat.',
  ],
  [
    'Google rekommenderar att systemet först kontrollerar att inget leveranskvitto har kommit och försöker dra tillbaka RCS-meddelandet.',
    'Kontrollera först att inget leveranskvitto har kommit och försök dra tillbaka RCS-meddelandet.',
  ],
  ['anger Google att RCS-meddelandet inte debiteras.', 'debiteras inte RCS-meddelandet.'],
  // rcs-pa-iphone
  ['Apple skriver att det kan dröja några timmar innan RCS fungerar', 'Det kan dröja några timmar innan RCS fungerar'],
  ['Apple påpekar också att operatörsavgifter kan tillkomma,', 'Operatörsavgifter kan tillkomma,'],
  ['Tele2 skriver att RCS ingår och använder din vanliga datatrafik.', 'Hos Tele2 ingår RCS och använder din vanliga datatrafik.'],
  [
    'Google anger att knappar som ligger kvar inne i meddelandebubblan inte stöds på iPhone,',
    'Knappar som ligger kvar inne i meddelandebubblan stöds inte på iPhone,',
  ],
  // rcs-gdpr-samtycke
  [
    'Den här genomgången bygger på vad Integritetsskyddsmyndigheten (IMY), Konsumentverket och lagtexten säger. Den ersätter inte juridisk rådgivning,',
    'Genomgången ersätter inte juridisk rådgivning,',
  ],
  [
    'Enligt 19 § marknadsföringslagen får ett företag använda elektronisk post vid marknadsföring till en privatperson bara om personen har samtyckt i förväg.',
    'Ett företag får använda elektronisk post vid marknadsföring till en privatperson bara om personen har samtyckt i förväg (19 § marknadsföringslagen).',
  ],
  [
    'Konsumentverket nämner e-post och sms, och IMY skriver e-post, sms, fax eller annan elektronisk kommunikation.',
    'Det omfattar e-post, sms, fax och annan elektronisk kommunikation.',
  ],
  [
    'IMY skriver att privata företag främst kan använda samtycke, avtal, rättslig förpliktelse och intresseavvägning, och att det ofta inte är lämpligt eller ens möjligt att stödja sig på samtycke.',
    'Privata företag kan främst använda samtycke, avtal, rättslig förpliktelse och intresseavvägning, och ofta är det inte lämpligt eller ens möjligt att stödja sig på samtycke.',
  ],
  ['IMY påpekar också att du inte får byta till intresseavvägning', 'Du får heller inte byta till intresseavvägning'],
  ['och för dem gäller bland annat det här enligt IMY:', 'och för dem gäller bland annat det här:'],
  ['Enligt IMY är rätten att invända mot direktmarknadsföring absolut.', 'Rätten att invända mot direktmarknadsföring är absolut.'],
  ['Valet fanns inte i Sverige enligt Googles lista i november 2026,', 'Valet fanns inte i Sverige i november 2026,'],
  // rcs-basic-single-conversation
  ['Google räknar ett textmeddelande på högst 160 tecken som Basic.', 'Ett textmeddelande på högst 160 tecken räknas som Basic.'],
  [
    'Google ger emojier som exempel, så fråga leverantören hur svenska tecken som å, ä och ö räknas innan du skriver text nära gränsen.',
    'Å, ä och ö tar två byte var i UTF-8, så fråga leverantören hur de räknas innan du skriver text nära gränsen.',
  ],
  ['och enligt Google räknas meddelandet ändå som Basic,', 'och meddelandet räknas ändå som Basic,'],
  ['Google räknar ett meddelande från kunden när hen', 'Ett meddelande från kunden räknas när hen'],
  ['och Google skriver att rapporterna för samtal kan dröja upp till två dagar.', 'och rapporterna för samtal kan dröja upp till två dagar.'],
  [
    'Google skriver att debiteringslogiken är densamma och att händelserna basic_message och single_message finns kvar för varje meddelande.',
    'Debiteringslogiken är densamma, och händelserna basic_message och single_message finns kvar för varje meddelande.',
  ],
  // rcs-sverige-operatorer
  ['Tele2 och Comviq uppger att RCS fungerar på både iPhone och Android.', 'Hos Tele2 och Comviq fungerar RCS på både iPhone och Android.'],
  [
    'Tele2 och Comviq beskriver RCS för iPhone och Android på sina supportsidor. Där krävs iOS 18',
    'Hos Tele2 och Comviq fungerar RCS på iPhone och Android. Det kräver iOS 18',
  ],
  ['Enligt Hurbra.se fungerar RCS på iPhone även hos Tre i den första testversionen', 'Hos Tre fungerar RCS på iPhone i den första testversionen'],
  ['trots att Comviq själv skriver att RCS fungerar på iPhone.', 'trots att RCS fungerar på iPhone hos Comviq.'],
  [
    'Google skriver att tillgången till RCS varierar mellan regioner och operatörer, och att RCS-chattar tillhandahålls',
    'Tillgången till RCS varierar mellan regioner och operatörer, och RCS-chattar tillhandahålls',
  ],
  [
    'Har telefonen två SIM-kort anger Google att SIM-kortet för samtal också ska vara inställt för mobildata.',
    'Har telefonen två SIM-kort ska SIM-kortet för samtal också vara inställt för mobildata.',
  ],
  [' Tele2 och Comviq beskriver samma vägar på sina supportsidor.', ''],
  // svenska-operatorer-oppnar-rcs-pa-iphone
  [
    'Tele2 och Comviq beskriver stödet på sina supportsidor. Uppgifterna om Tre och Hallon kommer från tester med testversionen av iOS 27.3 som Hurbra.se har rapporterat om.',
    'Uppgifterna om Tre och Hallon gäller testversionen av iOS 27.3.',
  ],
  // rcs-avsandare-anvandningsfall-registrering
  ['Så här beskriver Google vad varje sorts avsändare får och inte får skicka:', 'Varje sorts avsändare får skicka olika saker:'],
  ['Därför vill Google ha antingen en video', 'Därför krävs antingen en video'],
  [
    'Reklam till privatpersoner kräver enligt marknadsföringslagen samtycke i förväg,',
    'Marknadsföringslagen kräver samtycke i förväg för reklam till privatpersoner,',
  ],
]

export const direct = (text: string) => REPLACEMENTS.reduce((acc, [from, to]) => acc.split(from).join(to), text)

type Row = { text: string }
type Section = { paragraphs?: Row[]; points?: Row[] }

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const { docs } = await payload.find({ collection: 'artiklar', depth: 0, limit: 0, pagination: false, req })
  let changed = 0
  for (const article of docs as unknown as { id: number; description: string; sections: Section[] }[]) {
    const fixRows = (rows: Row[] = []) => rows.map((row) => ({ ...row, text: direct(row.text) }))
    const sections = article.sections.map((section) => ({ ...section, paragraphs: fixRows(section.paragraphs), points: fixRows(section.points) }))
    const description = direct(article.description)
    if (description === article.description && JSON.stringify(sections) === JSON.stringify(article.sections)) continue
    await payload.update({ collection: 'artiklar', id: article.id, req, data: { description, sections } as never })
    changed++
  }
  payload.logger.info(`Migration: ${changed} articles now answer directly.`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content migration: the old wording is not restored.
}
