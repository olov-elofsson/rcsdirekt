## Drift och innehåll

- Sidan körs på Google Cloud Run (tjänsten `rcsdirekt`, europe-west1) och byggs från `main` vid varje push.
- Allt redigerbart innehåll kommer från Payload CMS i `cms/` (tjänsten `rcsdirekt-cms`, cms.rcsdirekt.se). Bygget hämtar det till `src/content/content.json`; ändra innehåll i CMS:et, inte i den filen.
- Ändringar under `cms/` bygger bara CMS:et, övriga ändringar bara sidan.

## Brandkit

- Logotyper, ikoner, färger och typsnitt finns i `brand/` och beskrivs i `brand/BRAND.md`. Använd alltid filerna där i stället för egna kopior, och följ färgerna därifrån.

## Granskning av gränssnitt

Allt UI-arbete i det här repot, nytt eller ändrat, ska gå igenom skillsen i `.claude/skills/` innan det är klart:

- `make-interfaces-feel-better`: radier, optisk linjering, skuggor, typografi, ikoner, övergångar, prestanda.
- `emil-design-eng`: animationer, easing, längd, tryck- och hovertillstånd.
- `rcs-phone`: **alla telefoner** som visar RCS-meddelanden ska se ut som telefonen i videogeneratorn (`/video-generator`) och byggas på dess `RCSV_CSS`. Inga egna telefonmockups.

Uttryck förslag i projektets Tailwind-uppsättning och befintliga komponenter (Button-varianter, PageHeading, SiteLayout). Brandkitet nedan går före skillsens generella råd.

## Text och marknadsföring

Skillsen i `.claude/skills/` beskrivs i `.claude/skills/README.md`, med källa och licens för var och en.

- All text på sajten och i CMS:et ska gå igenom `humanizer`. Använd `copywriting` för ny text och `copy-editing` för ändringar. Det betyder bland annat: inga tankstreck i löptext, inga uppräkningar av typen "inga X, inga Y, inga Z", inga säljord och inga påståenden utan källa.
- För marknadsarbete finns biblioteket från marketingskills, till exempel `seo-audit`, `schema`, `cro`, `pricing`, `emails`, `sms` och `events`. Svensk lag går före skillsens amerikanska råd, till exempel marknadsföringslagen, GDPR och reglerna för reklam via sms och RCS.
- `grill-me` passar innan större ändringar: den frågar ut beställaren tills kraven är tydliga. `caveman` ger korta svar i chatten men gäller aldrig text som sparas i repot eller CMS:et.

- Video exports use a private storage bucket through validated same-host server upload and streaming routes; service-only upload logs and an atomic database limit prevent concurrent quota bypass without requiring accounts.
- Keep the exported video blob in a component ref and share one upload function between export and retry so retries never rerender the video.
- Keep site button geometry and interaction states in the shared Button variants, not page-specific overrides, so all pages stay consistent; miniature phone-demo controls retain their contextual sizes.
- Use the shared PageHeading for content-page introductions so heading scale, alignment, background treatment and spacing stay consistent with pricing.

- Visuell arkitektur: använd en luftig, 46elks-inspirerad produktberättelse med vit bas och ett vitt och blått brandkit (#EFEEFC / #F5F5FC / #15115F); orange/persika ska inte förekomma, eftersom tjänsten ska kännas enkel, rak och mänsklig.
- Sidstruktur: återanvänd SiteHeader på alla sidor och SiteLayout för offentliga undersidor så att sidhuvud, sidfot och innehållsbredd hålls konsekventa.
- Produktsidor: använd korta, skannbara funktionsöversikter och märk ännu ej anslutna tjänster som kommande eller kontoaktiverade för att undvika felaktiga produktlöften.
- Meddelandetyper: det finns ingen jämförelsesida och inga egna undersidor för RCS Basic, Single och Conversation; de beskrivs i bloggartikeln rcs-basic-single-conversation. Gamla länkar till /jamfor-planer vidarebefordras till startsidan. Uppmuntra inte nya länkar till en samlad jämförelsesida.
- RCS-exempel: startsidans telefon (`HeroPhone`) och exemplen över kundcasens foton (`PhotoScenarios`, data i `src/data/rcs-scenarios.ts`) är egna komponenter med egen datafil, så att de kan utvecklas utan att belasta sidrutten. Den tidigare demon "Så ser RCS ut i mobilen" är borttagen. Demoinnehållet finns kvar i CMS:et (globalen Demo) men används inte.
- Knowledge content uses browser-safe typed data with individually edited summaries and prose composed before search and rendering, without automatically appended examples; shared single-column views and synchronous lookup loaders keep citations, search and reading estimates consistent, and glossary entries reuse exact-match dedicated articles.
- The blog is the single discovery route for guides and glossary articles; permanently redirect the legacy /ordlista URL to /blogg to preserve existing links.
- Illustrative company RCS scenarios live in a browser-safe data module and a dedicated homepage section; label them as examples rather than verified customer results.
- Kundcasen visas på startsidan som interaktiva exempel över kundcasens foton (`PhotoScenarios`); det tidigare kundcaseblocket med kort är borttaget. Presentationerna nås fortfarande under /demo/<namn>. Märk alltid exemplen som exempel och väck inte overifierade resultatpåståenden.
- Modals use a plain React-controlled element with role="dialog" and aria-modal, avoiding a newly optimized dialog dependency that can split the preview's React module graph.
- Homepage visual refinements are scoped under `.home-refined`; each background transition is owned by the incoming section, so shared components, other routes and phone behavior remain unchanged.
- Large editorial expansions live in separate browser-safe article and source modules composed into the shared collection; keep an explicit keyword-intent map and count regression test to prevent accidental duplicate or missing articles.
- Compose individually authored per-slug article depth and typed primary-source findings before reading-time calculation and rendering; distinguish publisher documentation from measured customer results to avoid fabricated first-party evidence.
