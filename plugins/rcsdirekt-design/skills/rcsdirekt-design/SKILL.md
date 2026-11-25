---
name: rcsdirekt-design
description: Designsystemet för rcsdirekt.se (november 2026). Använd när en sida, sektion, komponent, kampanjsida, presentation, e-post eller en annan webbplats ska byggas, ändras eller granskas i rcsdirekt.se:s stil. Innehåller färger och CSS-variabler, typsnitt, band och mått, komponentrecept i React och Tailwind, en fristående HTML-mall, rörelse, bilder, text- och SEO-regler samt en kontrollista.
---

# Designsystem för rcsdirekt.se

Så här ser rcsdirekt.se ut, och så här bygger du något nytt i samma stil, på sajten eller någon annanstans. Systemet beskriver sajten som ägaren har godkänt i november 2026.

**Känslan i en mening:** ett lugnt, stort bolag som pratar rakt. Sajten har vit bas och marinblå text, en mörk ram i början och slutet, tunna linjer i stället för skuggor, och bara det som visar något rör sig. Förebilder är fortnox.se för sektionernas form och 46elks för den luftiga produktberättelsen.

## Filer

| Fil | Innehåll |
| --- | --- |
| [`references/tokens.css`](references/tokens.css) | Alla färger, typsnitt, radier, skuggor och rörelser som CSS-variabler, med en mappning för Tailwind v4. Börja här. |
| [`references/components.md`](references/components.md) | Recept för knappar, menyrad, hjälte, kort, droppen, steg, prislista, frågor, avslutande ruta, sidfot, formulär, kodruta och märken. |
| [`references/layout.md`](references/layout.md) | Band, mått, brytpunkter, linjering, sidmallar, rörelse, bilder och tillgänglighet. |
| [`references/copy.md`](references/copy.md) | Röst, rubriker, förbjudna mönster, påståenden, metadata, strukturerad data och USP. |
| [`examples/sida.html`](examples/sida.html) | En fristående sida i ren HTML och CSS med alla delar. Öppna den i en webbläsare. |
| [`assets/`](assets/) | Logotyper i SVG (liggande och symbol, för ljus och mörk botten) och mallen för delningsbilden. |

## Tio regler

1. **Färger:** Marin `#15115F` bär all text och alla mörka ytor. Blått `#2F7BFF` är bara en accent, aldrig en yta. Lavendel `#EFEEFC` och Dimma `#F5F5FC` är ljusa ytor. Orange, persika och andra varma färger förekommer aldrig.
2. **Typsnitt:** rubriker i Archivo 800 med `word-spacing: 0.06em` och `text-wrap: balance`, och brödtext i Hind. Sektionsrubriker är 33,6 px och 42,4 px från 640 px.
3. **Band:** sektioner i fullbredd möts med raka kanter och växlar mellan vit och Dimma. Marin ramar in sidan: hjälten, högst ett band i mitten, den avslutande rutan och sidfoten. Två Marin-band ligger aldrig i rad.
4. **Linjering:** bara hjälten, ingångskorten och den avslutande rutan är centrerade. Allt annat är vänsterställt.
5. **Variera formen:** kort med stora ikoner används en gång per sida. Därefter byter varje band form: delad sektion, steg, prislista, frågor i två spalter, avslutande ruta.
6. **Knappar:** helt rundade och 44 eller 48 px höga, med en primär knapp per sektion. På vitt är den Marin, och på Marin är den vit.
7. **Siffror** i steg och listor står i logotypens droppe (en cirkel med ett rakt hörn nere till vänster), aldrig fristående.
8. **Rörelse:** 150–200 ms med `cubic-bezier(0.22, 1, 0.36, 1)` och högst 2 px lyft. Sektioner glider inte in. Saker som dyker upp växer från 96 %, aldrig från noll.
9. **Text:** svenska, med "ni" på produktsidor och "du" i bloggen. Rubriker säger vad kunden får. Skriv utan tankstreck, utan säljord och utan påståenden som saknar källa. Varumärket skrivs alltid rcsdirekt.se.
10. **Tillgänglighet:** en H1 per sida, inga överhoppade rubriknivåer, en blå fokusring på 2 px, tryckytor på minst 44 px och ingen vågrät scroll på 390 px. Blå text används bara i stora storlekar (kontrast 3,9:1).

## Kom igång i ett nytt projekt

1. Ladda typsnitten:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Hind:wght@400;500;600;700&display=swap" />
   ```
2. Importera `references/tokens.css`. Med Tailwind v4 lägger du den efter `@import "tailwindcss";`.
3. Bygg sidan efter en mall i `references/layout.md` och med recepten i `references/components.md`. Utan React: utgå från `examples/sida.html`.
4. Skriv texten enligt `references/copy.md`.
5. Gå igenom kontrollistan nedan.

## Kontrollista

- [ ] Banden växlar och möts med raka kanter. Två Marin-band ligger aldrig i rad.
- [ ] Bara hjälten, ingångskorten och den avslutande rutan är centrerade.
- [ ] Kortmönstret med stor ikon används högst en gång.
- [ ] Det finns en primär knapp per sektion, och den är vit på Marin.
- [ ] Siffror i steg står i droppen.
- [ ] Ingen orange färg, inga dollartecken, ingen blå yta och inga gröna eller röda märken.
- [ ] Små länkar har tillräcklig kontrast.
- [ ] Sidan fungerar på 390 px bredd, och tryckytorna är minst 44 px.
- [ ] Det finns en H1 och ingen överhoppad rubriknivå.
- [ ] Titel, beskrivning, canonical, delningsbild och strukturerad data finns (se `copy.md`).
- [ ] Texten följer `copy.md`, och påståenden har källor.

## Om du arbetar i rcsdirekt-repot

Systemets källa är koden. Här finns delarna:

| Del | Fil |
| --- | --- |
| Färger, typsnitt, skuggor och rörelse | `src/styles.css` |
| Knappar | `src/components/ui/button.tsx` |
| Rubrik- och ingressklasser | `src/lib/typography.ts`, `sectionHeading` i `src/components/HomeRows.tsx` |
| Startsidans sektioner | `src/components/HomeRows.tsx`, `src/pages/HomePage.tsx` |
| Undersidornas hjälte | `src/components/PageHeading.tsx` |
| Menyrad och sidfot | `src/components/SiteLayout.tsx` |
| Droppen | `src/components/NumberDrop.tsx` |
| API-referens | `src/components/ApiReference.tsx` |
| SEO och strukturerad data | `src/lib/page-head.ts` |
| Logotyper (källan) | `brand/` och `brand/BRAND.md` |

När ägaren godkänner en ny stil uppdateras den här skillen i samma ändring. Kopiorna i `assets/` uppdateras från `brand/`.
