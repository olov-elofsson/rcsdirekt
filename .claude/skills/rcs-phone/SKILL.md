---
name: rcs-phone
description: Regler för alla telefoner som visar RCS-meddelanden på rcsdirekt.se. Använd när du bygger, ändrar eller granskar en telefonmockup, chattvy, demo eller illustration av ett RCS-meddelande.
---

# RCS-telefonen

Alla telefoner på rcsdirekt.se ska se ut som telefonen i **videogeneratorn** (`/video-generator`). Den är referensen: en Android-telefon med Google Messages, i exakta mått och färger. Kunder ska känna igen sin egen meddelandeapp, inte en ritad illustration.

Referensbilder av hur det ska se ut finns i `referens/`: `konversation.webp` (startsidans demo), `konversation-kort.webp`, `inkorg.webp` och `profil.webp`. Underlaget från Google och pressen står under [Källor](#källor).

Referensens kod finns i `src/lib/rcs-video/engine.ts`:
- `RCSV_CSS` innehåller alla mått och färger.
- `createRenderer` bygger själva vyerna: inkorg, konversation, tangentbord och företagsprofil.
- Ramen runt telefonen finns i `src/components/rcs-video/RcsVideoGenerator.tsx`.

## Grundregel

**Återanvänd referensen i stället för att rita en ny telefon.** Använd `src/components/RcsPhone.tsx`: `RcsPhone` ger ram, statusrad, avsändarhuvud och skrivfält, och `IncomingRow`, `Bubble`, `OutgoingBubble`, `Timestamp`, `Typing`, `DateLabel` och `PhoneIcon` bygger meddelandena. Startsidans demo (`InteractiveRcsDemo`) är exemplet. Komponenterna använder samma `.rcsv`-klasser och mått som `createRenderer`. Skala den med `transform: scale()`. Bygg ingen egen Tailwind-telefon med andra mått, och kopiera inte värden för hand. Saknas en vy, lägg till den i `RCSV_CSS` så att alla telefoner får den.

## Skärmen (360 × 640 px, skalas som helhet)

Ange alla mått i telefonens egna pixlar och skala hela skärmen. Ändra aldrig enskilda textstorlekar för att telefonen ska få plats.

| Del | Specifikation |
| --- | --- |
| Typsnitt | Inter, `-webkit-font-smoothing: antialiased`. Inte sidans Archivo eller Hind |
| Bakgrund | `#ffffff` i hela skärmen. Chatten har vit bakgrund, inte tonad |
| Text / dämpad text | `#1f1f1f` / `#444746` |
| Statusrad | 30 px hög. Klockan till vänster (19 px in, 14.5px/500), ikoner för signal, wifi och batteri till höger. Ingen notch och ingen ö |
| Navigeringsstreck | 73 × 3 px, `#1f1f1f`, centrerat 11 px från underkanten |
| Avsändarens logotyp | Alltid en **rundad kvadrat som logotypen fyller helt, med solid bakgrund** (vit om inget annat är godkänt), `object-fit: cover` och en hårfin kant `1px rgba(0,0,0,.08)` inåt. Aldrig rund, aldrig en genomskinlig symbol som flyter fritt. Radien är cirka 25 % av sidan: 32 px → 8 px, 27 px → 7 px, 40 px → 9 px, 64 px → 16 px, 72 px → 14 px |
| Huvud i konversation | 50 px högt, börjar 42 px från toppen. Tillbaka-pil 12 px in. Logotypen 32 × 32 px, sedan namnet i 16.6px och den blå verifieringsbocken. Till höger bara menyikonen (⋮): ingen ring- och ingen sköldikon |
| Överst i tråden (`.intro`, `ThreadIntro`) | Logotypen 64 × 64 px, namnet 16px/600 med bocken, beskrivningen 13px/18px i `#444746`, centrerat, och en avdelare `1px #e1e1e1` under |
| Verifieringsbock | Googles sigill (`verifiedBadge()` i `engine.ts`) i `#0b57d0`, direkt efter namnet i inkorgen, huvudet, tråden och profilen |
| Inkommande bubbla | Bakgrund `#e8edf5`, radie 19 px, padding 8 × 14 px, 15px/20.57px, max 248 px bred. Avatar 27 × 27 px med radie 7 px längst ned till vänster, och bubblorna börjar 47 px in |
| Bubblor i följd | Hörnet mot nästa bubbla har radie 5 px, och avståndet mellan bubblorna är 3 px |
| Utgående bubbla | Bakgrund `#0a56cf`, vit text, högerställd 13 px från kanten |
| Tidsstämpel | 11.5px, `#444746`, under bubblan |
| Rich card | 262 px brett, radie 17 px, bakgrund `#e8edf5`, ingen skugga. Bilden är 262 × 150 px med `object-fit: cover`. Titeln är 15.6px/600 och brödtexten 14.1px/19.2px |
| Knapp i kort | 42 px hög, `border-top: 1px solid #d4d9e1`, text `#0b57d0` 15px/500, centrerad |
| Förslag (chips) | 33 px höga, radie 17 px, `1px solid #c4c7c5`, vit bakgrund, text `#0b57d0` 14.5px/500, 5 px mellanrum, börjar 47 px in. Nedtryckt chip: `#d3e3fd` |
| Skrivfält | 60 px högt. Ett pillerfält 292 × 44 px, radie 22 px, i `#e8edf5`, 8 px in. **Inne i** pillret: plus-ikonen 10 px in, platshållaren "RCS-meddelande" 14.6px i `#444746` 46 px in, och emoji- och bildikonen till höger. Röst- och skicka-knappen är en egen cirkel på 44 px till höger om pillret |
| Inkorg | Företag har logotypen som rundad kvadrat (40 px, radie 9 px) och bock efter namnet. Privatpersoner har runda avatarer med initial. Skillnaden är avsiktlig: så skiljer Google Messages företag från personer |
| Tangentbord | 260 px högt, `#e7ecf4`. Tangenterna är 44 px höga med radie 6 px |
| Företagsprofil | Banner 360 × 112 px och logotyp 72 × 72 px med radie 14 px och 3 px vit kant. Namnet är 19px/600 |
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
| Typsnitt | Archivo, Hind eller systemtypsnitt i skärmen |
| Färger | Brandkitets marinblå eller lavendel på bubblor, kort, chips eller ram |
| Bubblor | Annan radie än 19 px, skugga, vit bakgrund på inkommande |
| Kort | Skugga eller ring, annan bredd än 262 px, knappar i annan färg än `#0b57d0` |
| Statusrad | Notch eller pill, klockan saknas eller ikonerna saknas |
| Avsändare | Rund avatar, initial i stället för logotyp, eller en logotyp utan solid bakgrund |
| Huvud | Ring- eller sköldikon i huvudet, eller saknad verifieringsbock |
| Skrivfält | Plus-ikonen utanför pillret |
| Textstorlek | Text under 11 px i telefonens egna pixlar, eller text som skalats separat |

Rapportera avvikelser som en tabell med kolumnerna Plats, Nu, Ska vara och Varför, i samma format som `make-interfaces-feel-better`.

## Källor

Kontrollerat i november 2026. Google ändrade under 2026 hur företagsavsändare visas i Google Messages, så kontrollera källorna igen om något ser annorlunda ut i en ny version av appen.

- Google: [Edit agent information, med riktlinjer för logotyp och banner](https://developers.google.com/business-communications/rcs-business-messaging/guides/learn/logo-guidelines). Logotypen är 224 × 224 px och högst 50 kB. Bannern visas på profilsidan.
- Bandwidth: [Updates to RCS for Business agent logos in Google Messages](https://www.bandwidth.com/support/en/articles/14977785-updates-to-rcs-for-business-agent-logos-in-google-messages) (18 augusti 2026). Logotyperna går från cirkel till kvadrat som visas med rundade hörn, med solid bakgrund ("avoid transparent backgrounds") och luft runt logotypen. Verifierade avsändare får en bock efter namnet. Alla logotyper ska vara uppdaterade senast 1 juni 2027.
- Android Authority: [Google Messages is making it easier to spot RCS marketing spam](https://www.androidauthority.com/google-messages-rcs-business-change-apk-teardown-3661818/) (29 april 2026), med skärmbilder. Företag får rundade kvadrater i inkorgen, konversationen och detaljvyn, medan personer behåller runda avatarer. Sköldikonen i huvudet tas bort, och verifieringen flyttar till profilsidan. Skärmbilderna visar också skrivfältet med plus, emoji och bild inne i pillret och en separat röstknapp.
