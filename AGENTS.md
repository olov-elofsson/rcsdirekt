## Drift och innehåll

- Sidan körs på Google Cloud Run (tjänsten `rcsdirekt`, europe-west1) och byggs från `main` vid varje push.
- Allt redigerbart innehåll kommer från Payload CMS i `cms/` (tjänsten `rcsdirekt-cms`, cms.rcsdirekt.se). Bygget hämtar det till `src/content/content.json` och stoppar om CMS:et inte svarar efter tre försök; ändra innehåll i CMS:et, inte i den filen.
- `scripts/split-content.ts` delar upp `content.json` i `src/content/parts/` efter hämtningen, så att varje sida bara laddar det den visar. Importera en del från sin egen modul (`@/content/priser`, `@/content/article-list` …), aldrig hela innehållet; artiklarna (`@/content/kunskap`) hör bara hemma på artikelsidan.
- Ändringar under `cms/` bygger bara CMS:et, övriga ändringar bara sidan.

## Brandkit

- Logotyper, ikoner, färger och typsnitt finns i `brand/` och beskrivs i `brand/BRAND.md`. Den visuella identiteten (bilder, illustrationer, ikoner och designprinciper) står i `brand/IDENTITY.md`. Använd alltid filerna där i stället för egna kopior, och följ färgerna därifrån.

## Granskning av gränssnitt

Allt UI-arbete i det här repot, nytt eller ändrat, ska gå igenom skillsen i `.claude/skills/` innan det är klart:

- `make-interfaces-feel-better`: radier, optisk linjering, skuggor, typografi, ikoner, övergångar, prestanda.
- `emil-design-eng`: animationer, easing, längd, tryck- och hovertillstånd.
- `rcs-phone`: **alla telefoner** som visar RCS-meddelanden ska se ut som telefonen i videogeneratorn (`/video-generator`) och byggas på dess `RCSV_CSS`. Inga egna telefonmockups.

Uttryck förslag i projektets Tailwind-uppsättning och befintliga komponenter (Button-varianter, PageHeading, SiteLayout). Brandkitet nedan går före skillsens generella råd.

## Text och marknadsföring

Skillsen i `.claude/skills/` beskrivs i `.claude/skills/README.md`, med källa och licens för var och en.

- All text på sajten och i CMS:et ska gå igenom `humanizer`. Använd `copywriting` för ny text och `copy-editing` för ändringar. Det betyder bland annat: inga tankstreck i löptext, inga uppräkningar av typen "inga X, inga Y, inga Z", inga säljord och inga påståenden utan källa.
- För SEO och konvertering finns `seo-audit`, `schema` och `cro`. Svensk lag går före skillsens amerikanska råd, till exempel marknadsföringslagen, GDPR och reglerna för reklam via SMS och RCS.
- `grill-me` passar innan större ändringar: den frågar ut beställaren tills kraven är tydliga.

- Video exports use a private storage bucket through validated same-host server upload and streaming routes; service-only upload logs and an atomic database limit prevent concurrent quota bypass without requiring accounts.
- Keep the exported video blob in a component ref and share one upload function between export and retry so retries never rerender the video.
- Keep site button geometry and interaction states in the shared Button variants, not page-specific overrides, so all pages stay consistent; miniature phone-demo controls retain their contextual sizes.
- Use the shared PageHeading for content-page introductions so heading scale, alignment, background treatment and spacing stay consistent with pricing.

- Visuell arkitektur: använd en luftig, 46elks-inspirerad produktberättelse med vit bas och ett vitt och blått brandkit (#EFEEFC / #F5F5FC / #15115F); orange/persika ska inte förekomma, eftersom tjänsten ska kännas enkel, rak och mänsklig.
- Sidstruktur: återanvänd SiteHeader på alla sidor och SiteLayout för offentliga undersidor så att sidhuvud, sidfot och innehållsbredd hålls konsekventa.
- Produktsidor: använd korta, skannbara funktionsöversikter och märk ännu ej anslutna tjänster som kommande eller kontoaktiverade för att undvika felaktiga produktlöften.
- Meddelandetyper: det finns ingen jämförelsesida och inga egna undersidor för RCS Basic, Single och Conversation; de beskrivs i bloggartikeln rcs-basic-single-conversation. Gamla länkar till /jamfor-planer vidarebefordras till startsidan. Uppmuntra inte nya länkar till en samlad jämförelsesida.
- RCS-exempel: exemplen över kundcasens foton (`CustomerExamples`, data i `src/data/customer-examples.ts`) är en egen komponent med egen datafil, så att de kan utvecklas utan att belasta sidrutten. Hjälteytan är enkel centrerad text utan telefon och utan dekorativa symboler. Den tidigare demon "Så ser RCS ut i mobilen" och webinarkortet är borttagna; webinaret visas i notisraden, där anmälan öppnas direkt.
- Knowledge content uses browser-safe typed data with individually edited summaries and prose composed before search and rendering, without automatically appended examples; shared single-column views and synchronous lookup loaders keep citations, search and reading estimates consistent.
- Bloggen (/blogg) har de tio viktigaste artiklarna, som en numrerad läslista, och nyheter (ämnet Nyheter) överst. Övriga artiklar finns kvar i CMS:et men är markerade "Dold på sajten"; deras gamla adresser leder med 301 till artikeln i "Ersätts av". Nya artiklar läggs till med eftertanke: hellre färre och djupare, med riktiga datum.
- Illustrative company RCS scenarios live in a browser-safe data module and a dedicated homepage section; label them as examples rather than verified customer results.
- Kundcasen visas på startsidan som interaktiva exempel över kundcasens foton (`CustomerExamples`); det tidigare kundcaseblocket med kort är borttaget. Presentationerna nås fortfarande under /demo/<namn>. Märk alltid exemplen som exempel och väck inte overifierade resultatpåståenden.
- Modals use a plain React-controlled element with role="dialog" and aria-modal, avoiding a newly optimized dialog dependency that can split the preview's React module graph.
- CMS:et innehåller bara det sajten visar: globalen Startsida har hjälten och SEO-texten, och samlingarna Kundcase och Begrepp samt globalen Demo är borttagna (migreringen 20261125_130000_remove_unused). De dolda artiklarna ligger kvar eftersom de styr omdirigeringarna. Äldre innehållsmigreringar som nämner borttagna delar hoppar över dem via `configured` i `cms/src/lib/removed-slugs.ts`.
- Priskalkylen finns på prissidan och multiplicerar bara antal med listpriset "från"; den får aldrig visa rabatter eller uppskattade volympriser.
- Integritetspolicyn (/integritetspolicy) och villkoren (/villkor) kommer från CMS-globalen Juridiskt och renderas av `LegalPage`. Ägaren har godkänt texterna (november 2026); ändra fakta (lagringstider, mottagare, villkor) där och uppdatera "Senast ändrad". Alla formulär länkar till integritetspolicyn och kontokryssrutan till villkoren.
- Företagsuppgifterna (WIGOSE AB, org.nr, adress) och schema.org-organisationen finns i `src/lib/company.ts`. /om-oss, /kontakt, sidfoten och den strukturerade datan läser därifrån; skriv bara fakta som går att belägga där, inga påhittade team, kunder eller siffror.
- Listpriserna är leverantörens prislista (EUR per 100 meddelanden) × 11,03 till SEK per meddelande, utan påslag; ägaren har bekräftat det. Nya prislistor räknas om på samma sätt i en innehållsmigrering.
- Sajten finns bara på svenska. Den tidigare engelska versionen under /en är borttagen och dess adresser leder med 301 till motsvarande svenska sida (`swedishRedirect` i `src/server.ts`). Text skrivs direkt i komponenterna.
- Valuta: listpriserna lagras i SEK. På prissidan kan EUR väljas; europriset räknas tillbaka med 11,03 kr per euro (`src/lib/money.ts`) och är då leverantörens listpris.
- Namnet skrivs alltid rcsdirekt.se (genitiv rcsdirekt.se:s), aldrig RCS Direkt, i text, metadata och CMS:et.
- Tilltal: produktsidorna säger "ni" till företaget; artiklarna i bloggen säger "du", eftersom de också läses av privatpersoner.
- Högst fyra taggar per kundexempel och ingen inglidning på varje block; bara det som visar något rör sig (kundexemplen, SMS/RCS-växlingen).
- Homepage visual refinements are scoped under `.home-refined`. Sections meet with straight edges (no waves) and alternate white and Dimma (`bg-muted`: the SMS/RCS demo and Vanliga frågor), with the three steps as one Marin band mid-page, so each section reads as its own band. As on fortnox.se the sections are white with thinly bordered cards; colour comes from the Marin hero and closing box, which bookend the page, the Marin steps band and the Lavendel picture panels. On Marin the primary action is the white `outline` Button. Blue stays an accent and is not used as a surface.
- Compose individually authored per-slug article depth and typed primary-source findings before reading-time calculation and rendering; distinguish publisher documentation from measured customer results to avoid fabricated first-party evidence.
- Startsidan bygger vidare på hjälten och ingångskorten (ägarens önskan, november 2026): varje del har en rubrik som säger vad kunden får (inte "SMS eller RCS?"), vänsterställd under hjälten. Bara ingångskorten är kort med linjeikon (`CardGrid` i `HomeRows.tsx`); stegen är numrerade kort med `NumberDrop` på Marin, priserna en prislista med en rad per meddelandetyp och frågorna två spalter, så att samma kortmönster inte upprepas. Bara hjälten, ingångskorten och den avslutande rutan är centrerade. Inga dollartecken eller andra generiska ikoner för pengar. Ordning: hjälte i Marin med en knapp, ingångskorten (`#vad-ar-rcs`), SMS eller RCS? med demon och Skapa konto (`#rcs-mot-sms`), Kundcase med en länk till kontakt, Så kommer ni igång (`#kom-igang`), Priser med ett kort och en Välj-länk per meddelandetyp (`#pris`), Vanliga frågor och en avslutande ruta i Marin (`#starta`). Sidfoten har logotypen till vänster och länkspalterna till höger, utan adress och kontaktuppgifter (de står på /kontakt och /om-oss), och en rad med org.nr, webbplatskarta och CMS. Prislistan på startsidan förklarar bara att Basic, Single och Conversation är nivåerna operatörerna debiterar RCS efter, inget om oss. Kundexemplen visar kundens kortnamn (Maptun, Nercia, Bilia, Big Bowl, Kebabfabriken), inte det registrerade bolagsnamnet. Kontaktformuläret finns på /kontakt.
- Siffror i numrerade steg och listor visas alltid i logotypens droppe (`NumberDrop` i `src/components/NumberDrop.tsx`), aldrig som fristående siffror.
