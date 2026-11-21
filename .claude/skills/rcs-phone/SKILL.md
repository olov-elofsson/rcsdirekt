---
name: rcs-phone
description: Regler för alla telefoner som visar RCS-meddelanden på rcsdirekt.se. Använd när du bygger, ändrar eller granskar en telefonmockup, chattvy, demo eller illustration av ett RCS-meddelande.
---

# RCS-telefonen

Alla telefoner på rcsdirekt.se ska se ut som telefonen i **videogeneratorn** (`/video-generator`). Den är referensen: en Android-telefon med Google Messages, i exakta mått och färger. Kunder ska känna igen sin egen meddelandeapp, inte en ritad illustration.

Referensbilder av hur det ska se ut finns i `referens/`: `konversation.webp` (början av en tråd, startsidans demo), `konversation-kort.webp` (kort och förslag), `video-konversation.webp`, `inkorg.webp` och `profil.webp`. Underlaget från Google och pressen står under [Källor](#källor).

Referensens kod finns i `src/lib/rcs-video/engine.ts`:
- `RCSV_CSS` innehåller alla mått och färger.
- `createRenderer` bygger själva vyerna: inkorg, konversation, tangentbord och företagsprofil.
- Ramen runt telefonen finns i `src/components/rcs-video/RcsVideoGenerator.tsx`.

## Grundregel

**Återanvänd referensen i stället för att rita en ny telefon.** Använd `src/components/RcsPhone.tsx`: `RcsPhone` ger ram, statusrad, avsändarhuvud, början av tråden (med `description`) och skrivfält, och `IncomingRow`, `Bubble`, `OutgoingBubble`, `Timestamp`, `Typing`, `DateLabel` och `PhoneIcon` bygger meddelandena. Startsidans demo (`InteractiveRcsDemo`) är exemplet. Komponenterna använder samma `.rcsv`-klasser och mått som `createRenderer`. Skala den med `transform: scale()`. Bygg ingen egen Tailwind-telefon med andra mått, och kopiera inte värden för hand. Saknas en vy, lägg till den i `RCSV_CSS` så att alla telefoner får den.

## Skärmen (360 × 640 px, skalas som helhet)

Ange alla mått i telefonens egna pixlar och skala hela skärmen. Ändra aldrig enskilda textstorlekar för att telefonen ska få plats. Förlagan är Googles egna mockups av Google Messages i ljust läge (se [Källor](#källor)), räknade om från 412 till 360 px bredd.

| Del | Specifikation |
| --- | --- |
| Typsnitt | Google Sans 400 och 500 (`@fontsource/google-sans`, OFL), `-webkit-font-smoothing: antialiased`. Inte sidans Archivo eller Hind, och inte Inter |
| Ytor | Statusrad, huvud, profilsida och kort ligger på den tonade ytan `#f0f4f9`. Chatten är ett **vitt ark** (`.sheet`, `#msgs`) med radie 24 px i de övre hörnen, som börjar under huvudet. Skrivfältet står på det vita arket |
| Text / dämpad text | `#1f1f1f` / `#444746` |
| Statusrad | 30 px hög. Klockan till vänster (19 px in, 14.5px/500), ikoner för signal, wifi och batteri till höger. Ingen notch och ingen ö |
| Navigeringsstreck | 73 × 3 px, `#1f1f1f`, centrerat 11 px från underkanten |
| Huvud (kompakt) | Börjar 34 px från toppen, 52 px högt. Tillbaka-pil 12 px in, logotypen 30 × 30 px med radie 9 px, namnet 17px/400, verifieringsbocken efter namnet och menyikonen (⋮) längst till höger. Ingen ring- och ingen sköldikon |
| Början av tråden (`.intro`) | När en konversation börjar visas avsändaren stort på den tonade ytan ovanför arket: logotypen 64 × 64 px med radie 19 px, namnet 19px/400 med bocken, och beskrivningen 13.5px/19px i `#444746`, centrerat. Det kompakta huvudet visar bara pil och meny tills man scrollat förbi, och tonar sedan in logotyp och namn (`RcsPhone` med `description`) |
| Avsändarens logotyp | Alltid en rundad kvadrat som logotypen fyller helt, med solid bakgrund (vit om inget annat är godkänt), `object-fit: cover`, **utan ram eller kant**. Aldrig rund och aldrig en genomskinlig symbol |
| Företagets meddelanden | **Ingen avatar** bredvid bubblor och kort. De börjar 12 px in |
| Inkommande bubbla | Bakgrund `#f0f4f9`, radie 20 px, padding 10 × 16 px, 15.5px/21px, max 272 px bred. Bubblor i följd har radie 6 px mot varandra och 3 px mellanrum |
| Utgående bubbla | Bakgrund `#0b57d0`, vit text, radie 20 px, högerställd 12 px från kanten |
| Tidsstämpel och datum | 11.5px respektive 12.5px, `#444746` |
| Rich card | Bakgrund `#f0f4f9`, radie 22 px, ingen skugga. Ensamt kort 336 px brett; i karusell 240 px (`.card.narrow`) med 8 px mellanrum. Bilden fyller bredden, 160 px hög (132 px i karusell). Titeln 16px/500, brödtexten 14.5px/20.5px i `#444746` |
| Knappar i kort (`.cbtns`) | Vita rader inne i kortet, minst 48 px höga, 2 px mellanrum, text 15.5px i `#1f1f1f` (inte blå), vänsterställd. Gruppen har radie 18 px ytterst och 5 px mellan raderna. Åtgärder som öppnar något (länk, samtal, kalender) har ikonen i en cirkel på 32 px i `#f0f4f9` |
| Förslag (chips) | **Högerställda**, 36 px höga, radie 18 px, `1px solid #c4c7c5`, vit bakgrund, text `#444746` 14.5px, 8 px mellanrum. Valfri ikon i `#0b57d0` för åtgärder |
| Skrivfält | 60 px högt på vitt. Pillret är 288 × 48 px, radie 24 px, i `#f0f4f9`, 8 px in. Inne i pillret: plus-ikonen 12 px in, platshållaren "RCS-meddelande" 15.5px i `#444746` 48 px in, och emoji- och bildikonen till höger |
| Röstknapp | En cirkel på 48 px i `#c4eed0` med ljudvågsikonen (`voice`) i `#0f5223`. När man har skrivit något blir den en blå skicka-knapp |
| Inkorg | Företag har logotypen som rundad kvadrat (40 px, radie 9 px) och bock efter namnet. Privatpersoner har runda avatarer med initial |
| Företagsprofil | Tonad sida. Banner 360 × 112 px, logotypen 76 × 76 px med radie 22 px och utan kant, namnet 20px/400 med bocken. Runda vita knappar för samtal, webb och e-post, och kontaktuppgifterna i vita rader grupperade som knapparna i kort |
| Tangentbord | 260 px högt, `#e7ecf4`. Tangenterna är 44 px höga med radie 6 px |
| Ikoner | Material-ikonerna i `engine.ts` (`icon()`). Inte lucide |

## Ramen

- `rounded-[32px]`, `border-[6px] border-foreground/90` och `shadow-xl` runt skärmen, utan ytterligare inre ram.
- Storlek: `360 * skala + 12` × `640 * skala + 12` px. Skärmens proportioner är alltid 9:16.
- Inga kameraöar, sidoknappar eller reflexer.

## Innehåll

- Avsändaren är alltid ett verifierat företag med en logotyp i rundad kvadrat. När RCS Direkt själv är avsändare används `brand/SVG/rcs-avsandare.svg`: symbolen på vit bakgrund, 224 × 224 px. Använd aldrig den genomskinliga `symbol.svg` i en telefon.
- Logotyper som laddas upp i videogeneratorn får vit bakgrund automatiskt.
- Använd svenska texter och realistiska tider, till exempel 13:16.
- Inne i skärmen gäller Google Messages färger, inte brandkitets. Brandkitets färger (#15115F, #EFEEFC, #F5F5FC) används runt telefonen: bakgrund, förklaringar och markörer.
- Förklaringsmarkörer som numrerade punkter och ringar ligger utanför eller ovanpå skärmen och påverkar aldrig skärmens layout.

## Checklista vid granskning

| Kontroll | Fel om |
| --- | --- |
| Byggd på `RCSV_CSS`/`createRenderer` | Egen markup med Tailwind-klasser för bubblor och kort |
| Proportioner | Skärmen är inte 360 × 640 skalad, eller höjden följer innehållet |
| Typsnitt | Archivo, Hind, Inter eller systemtypsnitt i skärmen i stället för Google Sans |
| Färger | Brandkitets marinblå eller lavendel på bubblor, kort, chips eller ram |
| Ytor | Helvit skärm utan tonat huvud, eller ett chattark utan rundade övre hörn |
| Bubblor | Annan radie än 20 px, skugga, vit bakgrund på inkommande, avatar bredvid företagets meddelanden |
| Kort | Skugga eller ring, blå knapptext, knappar som linjer i stället för vita rader |
| Förslag | Vänsterställda chips eller blå text i chips |
| Statusrad | Notch eller pill, klockan saknas eller ikonerna saknas |
| Avsändare | Rund avatar, initial i stället för logotyp, logotyp utan solid bakgrund eller med ram |
| Huvud | Ring- eller sköldikon i huvudet, eller saknad verifieringsbock |
| Skrivfält | Plus-ikonen utanför pillret, eller en blå mikrofon i stället för den gröna röstknappen |
| Textstorlek | Text under 11 px i telefonens egna pixlar, eller text som skalats separat |

Rapportera avvikelser som en tabell med kolumnerna Plats, Nu, Ska vara och Varför, i samma format som `make-interfaces-feel-better`.

## Källor

Kontrollerat i november 2026. Google ändrade under 2026 hur företagsavsändare visas i Google Messages, så kontrollera källorna igen om något ser annorlunda ut i en ny version av appen.

- Google: mockups av konversationen i ljust läge i [Rich cards](https://developers.google.com/business-communications/rcs-business-messaging/guides/learn/rich-cards) (bilderna `rich-card-components.png`, `suggested-replies.png`, `carousel-with-suggestions.png`) och [Send messages](https://developers.google.com/business-communications/rcs-business-messaging/guides/build/messages/send) (`visible_url_rich_card.png`). De visar det tonade huvudet med avsändaren stort i början av tråden, det vita arket, korten med vita knapprader, högerställda chips, skrivfältet och den gröna röstknappen. Det här är huvudkällan för måtten ovan.
- Google: mockups av profilsidan i [logotypriktlinjerna](https://developers.google.com/business-communications/rcs-business-messaging/guides/learn/logo-guidelines) (`do-mock-callouts-rbm.svg`, `do-hero-mock-rbm.svg`), med den tonade bakgrunden `#F0F4F9`, logotypen utan kant och namnet i normal vikt med bocken.

- Google: [Edit agent information, med riktlinjer för logotyp och banner](https://developers.google.com/business-communications/rcs-business-messaging/guides/learn/logo-guidelines). Logotypen är 224 × 224 px och högst 50 kB. Bannern visas på profilsidan.
- Bandwidth: [Updates to RCS for Business agent logos in Google Messages](https://www.bandwidth.com/support/en/articles/14977785-updates-to-rcs-for-business-agent-logos-in-google-messages) (18 augusti 2026). Logotyperna går från cirkel till kvadrat som visas med rundade hörn, med solid bakgrund ("avoid transparent backgrounds") och luft runt logotypen. Verifierade avsändare får en bock efter namnet. Alla logotyper ska vara uppdaterade senast 1 juni 2027.
- Android Authority: [Google Messages is making it easier to spot RCS marketing spam](https://www.androidauthority.com/google-messages-rcs-business-change-apk-teardown-3661818/) (29 april 2026), med skärmbilder. Företag får rundade kvadrater i inkorgen, konversationen och detaljvyn, medan personer behåller runda avatarer. Sköldikonen i huvudet tas bort, och verifieringen flyttar till profilsidan. Skärmbilderna visar också skrivfältet med plus, emoji och bild inne i pillret och en separat röstknapp.
