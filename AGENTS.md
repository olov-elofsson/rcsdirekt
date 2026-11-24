## Drift och innehåll

- Sidan körs på Google Cloud Run (tjänsten `rcsdirekt`, europe-west1) och byggs från `main` vid varje push.
- Allt redigerbart innehåll kommer från Payload CMS i `cms/` (tjänsten `rcsdirekt-cms`, cms.rcsdirekt.se). Bygget hämtar det till `src/content/content.json`; ändra innehåll i CMS:et, inte i den filen.
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
- RCS-exempel: exemplen över kundcasens foton (`CustomerExamples`, data i `src/data/customer-examples.ts`) är en egen komponent med egen datafil, så att de kan utvecklas utan att belasta sidrutten. Hjälteytan är enkel centrerad text utan telefon och utan dekorativa symboler. Den tidigare demon "Så ser RCS ut i mobilen" och webinarkortet är borttagna; webinaret visas i notisraden, där anmälan öppnas direkt. Demoinnehållet finns kvar i CMS:et (globalen Demo) men används inte.
- Knowledge content uses browser-safe typed data with individually edited summaries and prose composed before search and rendering, without automatically appended examples; shared single-column views and synchronous lookup loaders keep citations, search and reading estimates consistent, and glossary entries reuse exact-match dedicated articles.
- Bloggen (/blogg) har de tio viktigaste artiklarna, som en numrerad läslista, och nyheter (ämnet Nyheter) överst. Övriga artiklar finns kvar i CMS:et men är markerade "Dold på sajten"; deras gamla adresser leder med 301 till artikeln i "Ersätts av". Nya artiklar läggs till med eftertanke: hellre färre och djupare, med riktiga datum. Den engelska bloggen har samma artiklar och omdirigeringar (`src/content/en/parts/kunskap.json`).
- Illustrative company RCS scenarios live in a browser-safe data module and a dedicated homepage section; label them as examples rather than verified customer results.
- Kundcasen visas på startsidan som interaktiva exempel över kundcasens foton (`CustomerExamples`); det tidigare kundcaseblocket med kort är borttaget. Presentationerna nås fortfarande under /demo/<namn>. Märk alltid exemplen som exempel och väck inte overifierade resultatpåståenden.
- Modals use a plain React-controlled element with role="dialog" and aria-modal, avoiding a newly optimized dialog dependency that can split the preview's React module graph.
- Startsidans fördelar ("Fem skäl att välja RCS") är borttagna; innehållet ligger kvar i CMS-globalen Startsida men används inte. Skillnaden mot sms visas i jämförelsetabellen, utan telefon.
- Varje sektion på startsidan har något som händer: interaktiva kundexempel, en tidslinje som ritas fram i "Så kommer ni igång" och en priskalkyl som bara multiplicerar antal med listpriset "från". Kalkylen får aldrig visa rabatter eller uppskattade volympriser.
- Integritetspolicyn (/integritetspolicy) och villkoren (/villkor) kommer från CMS-globalen Juridiskt och renderas av `LegalPage`. Ägaren har godkänt texterna (november 2026); ändra fakta (lagringstider, mottagare, villkor) där och uppdatera "Senast ändrad". Alla formulär länkar till integritetspolicyn och kontokryssrutan till villkoren.
- Företagsuppgifterna (WIGOSE AB, org.nr, adress) och schema.org-organisationen finns i `src/lib/company.ts`. /om-oss, /kontakt, sidfoten och den strukturerade datan läser därifrån; skriv bara fakta som går att belägga där, inga påhittade team, kunder eller siffror.
- Listpriserna är leverantörens prislista (EUR per 100 meddelanden) × 11,03 till SEK per meddelande, utan påslag; ägaren har bekräftat det. Nya prislistor räknas om på samma sätt i en innehållsmigrering.
- Engelsk version: sajten finns på svenska vid roten och på engelska under /en (/en/pricing, /en/blog/<slug> …). Språket följer adressen (`useT()` i `src/lib/i18n.ts`). Text i komponenterna skrivs på svenska inuti `t("…")` och översätts i `src/i18n/en.ts`; testet `tests/i18n.test.ts` fångar saknade nycklar. CMS-innehållet har engelska översättningar i `src/content/en/` (startsida, priser, juridiskt, artiklar, källor och begrepp) som hålls i repot; ändras den svenska texten i CMS:et ska översättningen följa med. Sidorna ligger i `src/pages/` och används av både den svenska och den engelska routen, som har varsitt head med hreflang. Nya sidor som finns på båda språken läggs i `PAGES` i `src/lib/i18n.ts` och i `public/sitemap.xml`. Videogeneratorn och /demo finns bara på svenska, och webinarraden visas inte på engelska.
- Valuta: listpriserna lagras i SEK. På prissidan kan EUR väljas; europriset räknas tillbaka med 11,03 kr per euro (`src/lib/money.ts`) och är då leverantörens listpris.
- Namnet skrivs alltid rcsdirekt.se (genitiv rcsdirekt.se:s), aldrig RCS Direkt, i text, metadata och CMS:et.
- Tilltal: produktsidorna säger "ni" till företaget; artiklarna i bloggen säger "du", eftersom de också läses av privatpersoner.
- Undvik mallkänsla: inga rutnät av ikonkort, högst fyra taggar per kundexempel och ingen inglidning på varje block. Bara det som visar något rör sig (tidslinjen, kundexemplen, SMS/RCS-växlingen).
- Homepage visual refinements are scoped under `.home-refined`. Sections meet with straight edges (no waves, also above the shared footer). As on fortnox.se and 46elks.se the sections are white with thinly bordered cards; colour comes from the Marin hero, the Marin key-figure band and the Lavendel closing box. On Marin, cards stay white and the primary action is the white `outline` Button. Blue stays an accent.
- Compose individually authored per-slug article depth and typed primary-source findings before reading-time calculation and rendering; distinguish publisher documentation from measured customer results to avoid fabricated first-party evidence.
- Formspråk efter fortnox.se och 46elks.se, i vårt eget brandkit: en svävande, rundad menyrad (`SiteHeader`); en centrerad hjälteyta i Marin som löper in under menyraden, på startsidan och på alla undersidor (`PageHeading`); kundnamnen under hjälten (46elks referenser, från `src/data/customer-examples.ts`); tre ingångskort med linjeikon; rader som växlar bild och text med en rundad knapp var (`HomeRows.tsx`); jämförelsen som funktionsrad med hela tabellen bakom en knapp; ett band i Marin med fyra nyckeltal (800+ direktkopplingar, ägargodkänt; övriga från innehållet); priser; guider och vanliga frågor som två kantade kort; och sist en enda ruta i Lavendel med de tre stegen och två vägar vidare (`ClosingBox`), som Fortnox avslutande ruta. Kontaktformuläret finns på /kontakt, och alla "Prata med oss" leder dit. Rubrikerna är hela meningar utan etiketter eller accentstreck och står centrerade, utom i raderna med bild och text. Menyn följer sidans ordning.
- Siffror i numrerade steg och listor visas alltid i logotypens droppe (`NumberDrop` i `src/components/NumberDrop.tsx`), aldrig som fristående siffror.
