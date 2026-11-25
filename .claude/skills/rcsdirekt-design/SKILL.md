---
name: rcsdirekt-design
description: Designsystemet för rcsdirekt.se, som det ser ut i november 2026. Använd när du bygger eller ändrar en sida, sektion eller komponent på sajten, och när något annat (en kampanjsida, ett utskick, en presentation, en annan webbplats) ska se ut som rcsdirekt.se. Innehåller färger, typsnitt, mått, sektionsmönster, komponenter, rörelse och textregler, med färdiga CSS-variabler att kopiera.
---

# Designsystem för rcsdirekt.se

Så här ser rcsdirekt.se ut, och så här bygger du något nytt i samma stil. Systemet beskriver sajten som ägaren har godkänt (november 2026). Logotypfiler och färgnamn kommer från `brand/BRAND.md`, och tonen och bildspråket från `brand/IDENTITY.md`. Står något här i strid med dem gäller BRAND.md.

Kopierar du skillen till ett annat projekt: ta med mappen `brand/` också, eller länka till logotyperna där.

## 1. Känslan i en mening

Ett stort, lugnt bolag som pratar rakt: vit bas, marinblå text, en mörk ram i början och slutet, tunna linjer i stället för skuggor, och bara det som visar något rör sig.

Förebilder: fortnox.se för sektionernas form (vita band, tunt kantade kort, korta rubriker), 46elks för den luftiga produktberättelsen.

## 2. Färger

| Namn | Värde | Roll |
| --- | --- | --- |
| Marin | `#15115F` | All text, rubriker, primära knappar, mörka band (hjälte, steg, avslutande ruta, sidfot) |
| Djupmarin | `#0D0A45` | Hover på primära knappar |
| Blå | `#2F7BFF` | Accent: linjeikoner, pilar, fokusring, ordet "direkt". Aldrig som yta |
| Lavendel | `#EFEEFC` | Mjuka ytor, valda lägen, bildpaneler |
| Dimma | `#F5F5FC` | Varannan sektionsbakgrund, text på Marin |
| Linje | `#E3E2F5` | Kanter på kort och avdelare |
| Dämpad text | `oklch(0.42 0.05 285)` | Ingresser och brödtext under rubriker |
| Dämpad text på Marin | `oklch(0.82 0.04 285)` | Ingresser på mörka band |
| Vit | `#FFFFFF` | Grundbakgrund och kort |

Regler:
- Marin bär texten. Blått är en accent och används aldrig som bakgrundsyta.
- Orange, persika och andra varma färger förekommer inte, inte ens i illustrationer.
- **Kontrast:** blått mot vitt är 3,9:1, så det klarar inte WCAG AA för vanlig text. Sajten har i dag blå länkar i 16 px halvfet ("Se priser →"). På nya ytor: gör små länkar marinblå med understrykning, och använd blått för text först från 24 px, eller från 18,7 px fet.
- Inne i en RCS-telefon gäller Google Messages färger, inte de här (se skillen `rcs-phone`).

CSS-variabler att kopiera:

```css
:root {
  --marin: #15115f;
  --marin-djup: #0d0a45;
  --bla: #2f7bff;
  --lavendel: #efeefc;
  --dimma: #f5f5fc;
  --linje: #e3e2f5;
  --text: #15115f;
  --text-dampad: oklch(0.42 0.05 285);
  --text-pa-marin: #f5f5fc;
  --text-dampad-pa-marin: oklch(0.82 0.04 285);
  --radie-kort: 1rem;      /* kort och listor */
  --radie-ruta: 1.5rem;    /* stora rutor, till exempel den avslutande */
  --radie-knapp: 9999px;   /* alla knappar och flikar */
  --bredd: 80rem;          /* innehållsbredd, max-w-7xl */
  --sidmarginal: 1.25rem;  /* 2rem från 1024 px */
}
```

## 3. Typsnitt

- **Rubriker:** Archivo, vikt 800, `letter-spacing: 0`, `word-spacing: 0.06em` (Archivos ordmellanrum är för smalt i fet stil), `text-wrap: balance`.
- **Brödtext:** Hind, vikt 400–600, `text-wrap: pretty` så att inga ensamma ord hamnar på sista raden.
- Båda från Google Fonts.

| Nivå | Mobil | Från 640 px | Radavstånd |
| --- | --- | --- | --- |
| Hjälterubrik (h1) | 40 px | 60 px, 68 px från 1024 px | 1.05 |
| Sektionsrubrik (h2) | 33,6 px (2.1rem) | 42,4 px (2.65rem) | 1.1 |
| Kortrubrik (h3) | 20 px | 20 px | snug |
| Ingress under h2 | 16 px | 17 px | relaxed, max 34rem eller 60ch bred |
| Hjältens ingress | 18 px | 20 px | relaxed, max 42rem bred |
| Brödtext | 16 px | 16 px | relaxed |
| Liten text (sidfot, noter) | 12–14 px | samma | normal |

- Vänsterställda rubriker får `margin-left: -0.04em`, så att Archivos versaler linjerar optiskt med texten under.
- Siffror i tabeller och priser: `font-variant-numeric: tabular-nums`.
- Priser skrivs som `0,316 SEK` med svenskt decimalkomma och mellanslag före valutan.

## 4. Sidans uppbyggnad

**Banden.** En sida består av sektioner i fullbredd som möts med raka kanter, utan vågor eller snedställda kanter. De växlar bakgrund så att varje del läses för sig:

1. Hjälte i **Marin**
2. Vitt
3. **Dimma**
4. Vitt
5. **Marin** (ett band mitt på sidan, till exempel stegen)
6. Vitt
7. **Dimma**
8. Vitt med en avslutande ruta i **Marin**
9. Sidfot i **Marin**

Marin ramar alltså in sidan i början och slutet och ger en paus i mitten. Lägg aldrig två Marin-band direkt efter varandra.

**Luft.** Sektionerna har 64 px luft upptill och nedtill på mobil och 96 px från 640 px. Innehållet är högst 80rem brett, med 20 px sidmarginal (32 px från 1024 px). Rubrik och ingress har 40–48 px till innehållet under.

**Linjering.** Bara hjälten, ingångskorten direkt under den och den avslutande rutan är centrerade. Allt annat är vänsterställt: rubrik och ingress till vänster, och en eventuell "Se alla →"-länk till höger på samma baslinje.

**Undersidor** börjar med samma Marin-hjälte, centrerad (`PageHeading`), som dras upp under den flytande menyraden.

## 5. Komponenter

### Menyrad
Flytande, vit och helt rundad (`rounded-full`), med en tunn skugga, och den ligger över hjälten. Menyn följer ordningen på startsidan: Plattform, Jämför, Kundcase, Priser, Insikter. Det aktiva valet markeras med en mjuk lavendelfärgad pill.

### Knappar
Alla knappar är helt rundade och halvfeta, i storleken 44 px (48 px för stora).
- **Primär** på vitt: Marin med vit text. Vid hover blir den djupmarin och lyfts 2 px.
- **Primär** på Marin: vit `outline`-knapp utan kant, med marinblå text.
- **Sekundär:** en textlänk bredvid, aldrig två knappar som tävlar.
- En pil i knappen glider 2 px åt höger vid hover. Vid tryck krymper knappen till 96 %.
- Högst en primär knapp per sektion.

### Kort
- Vit yta med en 1 px kant i `--linje` och rundning 16 px. Skuggan används bara som hover på klickbara kort: kanten blir blåare och kortet lyfts 2 px, men bara på enheter med riktig muspekare.
- Innehållet uppifrån: linjeikon (Lucide, streckbredd 1.25, 48 px, blå), rubrik, en till två meningars text och en länk med pil.
- **Använd kortmönstret bara en gång per sida** (på startsidan: ingångskorten). Samma kort med stor ikon tre gånger i rad är det som får en sida att se mallgjord ut.

### Former som varierar sidan
Byt form mellan sektionerna i stället för att upprepa kort:
- **Numrerade steg:** kort på Marin, något ljusare än bakgrunden (`rgba(245,245,252,0.06)` med en kant på 10 %), med siffran i logotypens droppe (se nedan).
- **Prislista:** en enda kantad ruta med en rad per alternativ: namn och innehåll till vänster, pris i fet Archivo i mitten och en länk till höger. En sista rad i Dimma kan förklara något kort.
- **Frågor:** två spalter, med rubrik och "Hittar ni inte svaret? Kontakta oss" till vänster och en kantad lista med fällbara frågor till höger.
- **Delad sektion:** text och knappar till vänster, en illustrerande ruta (till exempel en telefon) till höger.
- **Avslutande ruta:** en Marin-ruta med rundning 24 px, centrerad rubrik, en rad text, en vit knapp och en understruken textlänk.

### Siffror i logotypens droppe
Numrerade steg och listor visar aldrig fristående siffror. Siffran står i en cirkel med ett rakt hörn nere till vänster (`border-radius: 50% 50% 50% 0`), 40 × 40 px, i fet Archivo. Den är marinblå med ljus siffra på ljus botten, och tvärtom på Marin.

### Ikoner
Använd Lucide, med streckbredd 1.25 i stora ikoner och 1.75–2 i små. Ikonerna ska vara blå eller marinblå, utan bakgrundsplattor. Valuta- och dollarsymboler används aldrig för pengar; använd en plånbok eller ingen ikon alls.

### Sidfot
Marin. Logotypen står till vänster och fyra länkspalter till höger, med små rubriker (14 px halvfet) och länkar i dämpad text. Underst finns en rad med "© år Bolag · org.nr" och små länkar. Adress och kontakt står på kontaktsidan, inte i sidfoten.

## 6. Rörelse

- Hover och tryck tar 150–200 ms med `cubic-bezier(0.22, 1, 0.36, 1)`. Kort och knappar lyfts högst 2 px.
- Sektioner glider inte in när man scrollar. Bara det som visar något rör sig, till exempel en växling mellan SMS och RCS eller ett meddelande som kommer in i en telefon.
- Saker som dyker upp växer från 96–98 % och tonas in. De växer aldrig från ingenting.
- `prefers-reduced-motion` stänger av allt utom färgskiften.
- Fokus visas alltid med en 2 px blå ring och 3 px avstånd.

## 7. Bilder

Använd riktiga foton från kunder och arbetsplatser, inte stockfoton eller illustrationer av människor. Lägg en telefon med ett riktigt RCS-meddelande över fotot när det förklarar något. Märk alltid sådana exempel som exempel.

## 8. Text

- Svenska. Produktsidor säger "ni" till företaget, och bloggen säger "du".
- Rubriker är korta och säger vad kunden får: "Ert namn i stället för ett nummer", "Igång i tre steg", "Priser". Undvik frågor som rubrik och undvik "SMS eller RCS?".
- Ingresser är en eller två meningar.
- Skriv utan tankstreck, utan uppräkningar av typen "inga X, inga Y, inga Z", utan säljord och utan påståenden som inte har en källa. Kör texten genom skillen `humanizer`.
- Varumärket skrivs alltid rcsdirekt.se, med gemener.

## 9. Kontrollera innan du är klar

- [ ] Banden växlar och möts med raka kanter. Två Marin-band ligger aldrig i rad.
- [ ] Bara hjälten, ingångskorten och den avslutande rutan är centrerade.
- [ ] Kortmönstret med stor ikon används högst en gång på sidan.
- [ ] Det finns en primär knapp per sektion, och den är vit på Marin.
- [ ] Siffror i steg står i droppen.
- [ ] Ingen orange färg, inga dollartecken och ingen blå yta.
- [ ] Små länkar har tillräcklig kontrast (se avsnitt 2).
- [ ] Sidan fungerar på 390 px bredd utan vågrät scroll och med tryckytor på minst 44 px.
- [ ] Texten har gått igenom `humanizer`.

## Var det finns i koden

Om du arbetar i rcsdirekt-repot:

| Del | Fil |
| --- | --- |
| Färger, typsnitt, skuggor och rörelse | `src/styles.css` |
| Knappar | `src/components/ui/button.tsx` |
| Rubrik- och ingressklasser | `src/lib/typography.ts`, och `sectionHeading` i `src/components/HomeRows.tsx` |
| Startsidans sektioner | `src/components/HomeRows.tsx`, `src/pages/HomePage.tsx` |
| Undersidornas hjälte | `src/components/PageHeading.tsx` |
| Menyrad och sidfot | `src/components/SiteLayout.tsx` |
| Droppen | `src/components/NumberDrop.tsx` |
