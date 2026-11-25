# Text och metadata

## Röst

Ett lugnt, stort bolag som pratar rakt. Texten låter som ett välskrivet meddelande från en människa: konkret, kort och utan överdrifter.

- Svenska.
- Produktsidor säger "ni" till företaget. Blogg och guider säger "du", eftersom privatpersoner också läser dem.
- Varumärket skrivs alltid rcsdirekt.se, med gemener, och i genitiv rcsdirekt.se:s. Aldrig "RCS Direkt".
- Priser: `0,316 SEK`, med decimalkomma och mellanslag före valutan. Ange "exklusive moms" där det spelar roll.

## Rubriker

Rubriken säger vad kunden får, inte vad sektionen handlar om. Den är kort, och helst en påståendemening.

| Undvik | Skriv |
| --- | --- |
| SMS eller RCS? | Ert namn i stället för ett nummer |
| Så kommer ni igång | Igång i tre steg |
| Betala för det ni skickar | Priser |
| Frågor vi ofta får | Vanliga frågor |
| Kom igång i dag | Skicka ert första RCS-meddelande |
| Hela API:t på en skärm | API-referens |

- Frågor fungerar som rubriker bara i blogg och guider, där läsaren söker svar ("Vad kostar RCS?").
- Ingressen under en rubrik är en eller två meningar.
- Knappar och länkar säger vad som händer: "Skapa konto", "Se priser", "Till utvecklarsidan".

## Det här skriver vi inte

Kör all text genom skillen `humanizer` innan den publiceras. Undvik särskilt:

- tankstreck (– och —) i löptext; skriv om meningen i stället
- uppräkningar av typen "inga X, inga Y, inga Z"
- avslöjanden av typen "det handlar inte om X, det handlar om Y"
- tretal som bara finns för rytmens skull
- säljord: revolutionerande, sömlös, kraftfull, banbrytande, enkelt och smidigt
- korta slagkraftiga slutmeningar
- rubriker med fetstil inne i stycken
- inledningar som "I dagens digitala värld"

## Påståenden

- Varje sakpåstående ska gå att belägga. I artiklar anges källan per avsnitt. På produktsidor bygger påståenden på egen prislista, villkor eller dokumentation.
- Siffror om kunder, resultat eller marknad skrivs bara om de har en källa.
- Exempel märks som exempel ("Säg att en frisörsalong …", "Exempel för Maptun").
- Tjänster som inte finns än märks som kommande.
- Svensk lag går före allmänna marknadsföringsråd: marknadsföringslagen (2008:486), GDPR och reglerna för reklam via SMS och RCS.

## Metadata

| Fält | Regel |
| --- | --- |
| `<title>` | 40–60 tecken. Sökordet först, därefter ` | rcsdirekt.se` om det får plats. Startsidan: "RCS för företag i Sverige | rcsdirekt.se". |
| Beskrivning | 140–160 tecken. Vad sidan ger och varför man ska klicka. Startsidans beskrivning är USP:n. |
| H1 | En per sida, i linje med titeln. |
| Canonical | Sidans egen adress, med https och utan snedstreck på slutet. |
| Open Graph | `og:title`, `og:description`, `og:url`, `og:type`, `og:locale` (sv_SE), `og:site_name` och `og:image` (1200 × 630). |
| `lang` | `sv` |

Strukturerad data (JSON-LD):

| Sida | Typ |
| --- | --- |
| Startsida | `Organization` (med `@id`) och `WebSite` |
| Undersidor | `BreadcrumbList` |
| Prissida | `Service` med ett `Offer` per nivå |
| Om oss, kontakt | `AboutPage`, `ContactPage` |
| Blogg | `Blog` med `BlogPosting` |
| Artikel | `Article` med källorna i `citation` |
| API-dokumentation | `WebAPI` |
| Gratisverktyg | `WebApplication` med ett `Offer` på 0 kr |

FAQPage lönar sig inte längre: Google visar bara de rika resultaten för myndigheter och vårdsajter.

## USP

> Skicka RCS från webben eller via API, med bilder, knappar och verifierad avsändare. Från 0,316 SEK per meddelande och utan månadsavgift.

Den används i startsidans hjälte och som metabeskrivning. Priset i den är fast text och ändras för hand när prislistan ändras.
