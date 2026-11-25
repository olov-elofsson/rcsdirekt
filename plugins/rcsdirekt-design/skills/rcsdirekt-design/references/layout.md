# Sidans uppbyggnad

## Band

En sida består av sektioner i fullbredd, så kallade band, som möts med raka kanter. Det finns inga vågor, snedställda kanter eller överlappande former. Bakgrunden växlar, så att varje band läses för sig.

| Bakgrund | Token | Används till |
| --- | --- | --- |
| Marin | `bg-ink` | Hjälten, ett band mitt på sidan, den avslutande rutan, sidfoten |
| Vit | `bg-background` | De flesta band |
| Dimma | `bg-muted` | Vartannat ljust band |

Regler:
- Marin ramar in sidan: hjälten överst, den avslutande rutan och sidfoten nederst. Däremellan finns högst ett Marin-band.
- Två Marin-band ligger aldrig direkt efter varandra.
- Blått används aldrig som yta.
- Två ljusa band med samma bakgrund i rad flyter ihop. Växla mellan vit och Dimma.

## Mått

| Mått | Mobil | Från 640 px | Från 1024 px |
| --- | --- | --- | --- |
| Luft i ett band, uppe och nere | 64 px | 96 px | 96 px |
| Sidmarginal | 20 px | 20 px | 32 px |
| Innehållsbredd | 80rem (1280 px) | | |
| Rubrik och ingress till innehåll | 40 px | 48 px | |
| Avstånd mellan kort | 16 px | 24 px | |
| Hjältens luft upptill (under menyraden) | 144 px | 176 px | |

- Menyraden är 64 px hög och har 12 px luft ovanför. Hjälten och undersidornas hjälte dras därför upp `-4.75rem`, så att Marin syns bakom raden.
- `scroll-padding-top: 5rem` gör att ankarlänkar inte hamnar under menyraden. Sektioner med id får dessutom `scroll-mt-24`.
- Brytpunkter: 640 px (`sm`), 1024 px (`lg`), 1200 px (menyn visas i raden) och 1280 px (`xl`, kodrutor bredvid texten).
- Löptext är högst cirka 65 tecken bred: ingresser `max-w-xl` eller `34rem`, och hjältens ingress `max-w-2xl`.
- Tryckytor är minst 44 px höga, även för små länkar (`min-h-10` till `min-h-11`).
- På 390 px bredd scrollar sidan inte i sidled.

## Linjering

- Hjälten, ingångskorten direkt under den och den avslutande rutan är centrerade.
- Allt annat är vänsterställt. Rubrik och ingress står till vänster, och en "Se alla →"-länk står till höger på samma baslinje.

## Variera formen

En sida som upprepar samma block ser mallgjord ut. Byt form från band till band:

1. Ingångskort med linjeikoner (en gång)
2. Delad sektion: text till vänster och en illustration till höger
3. Interaktiva exempel, till exempel flikar med foton
4. Numrerade steg i kort på Marin
5. Prislista: en ruta med en rad per alternativ
6. Frågor i två spalter
7. Avslutande ruta

## Mallar

**Startsida**
1. Hjälte, Marin, centrerad, en knapp
2. Ingångskort, vit, centrerade
3. Det viktigaste skälet att välja tjänsten, Dimma, delad sektion
4. Exempel eller kundcase, vit
5. Steg, Marin
6. Priser, vit, prislista
7. Vanliga frågor, Dimma, två spalter
8. Avslutande ruta, Marin på vitt
9. Sidfot, Marin

**Undersida (produkt, om oss, kontakt)**
1. Undersidans hjälte, Marin
2. Två till fyra band som växlar mellan vit och Dimma
3. Gärna ett Marin-band om sidan är lång
4. Sidfot

**Utvecklarsida och dokumentation**
1. Undersidans hjälte med en knapp och en länk till referensen
2. Flödet i numrerade steg bredvid ett exempel i en kodruta, vit
3. API-referens med meny och en sektion per anrop, Dimma
4. Fallgropar i ett Marin-band
5. Artiklar, vit

**Artikel**
- En spalt, högst cirka 70 tecken bred.
- Rubrik, datum, lästid och författare överst. Källor anges per avsnitt och listas längst ned.
- Numrerade listor använder droppen.

## Rörelse

- Hover och tryck tar 150–200 ms med `cubic-bezier(0.22, 1, 0.36, 1)`. Kort och knappar lyfts högst 2 px.
- Sektioner glider inte in när man scrollar. Bara det som visar något rör sig: en växling mellan SMS och RCS, ett meddelande som kommer in i en telefon, ett exempel som spelas upp.
- Saker som dyker upp växer från 96–98 % och tonas in på 200–320 ms med `cubic-bezier(0.23, 1, 0.32, 1)`. De växer aldrig från noll.
- Bakgrunder bakom paneler tonas bara in. De rör sig inte.
- Hover-effekter som flyttar något gäller bara med riktig muspekare (`@media (hover: hover) and (pointer: fine)`).
- `prefers-reduced-motion` stänger av förflyttningar. Färgskiften får vara kvar.

## Bilder och illustrationer

- Använd riktiga foton från kunder och arbetsplatser, i WebP med en mindre version för mobil. Inga stockfoton och inga illustrerade människor.
- En telefon som visar RCS ska se ut som Google Messages på Android (se skillen `rcs-phone` i rcsdirekt-repot), inte som en ritad mockup.
- Exempel märks alltid som exempel, till exempel "Exempel för Maptun".
- Delningsbilden (Open Graph) är 1200 × 630 px: Marin, vit logotyp, rubriken i Archivo och en rad text. Den har inget pris, eftersom priset blir inaktuellt. Mallen finns i `assets/og-mall.html`.

## Tillgänglighet

- Länken "Hoppa till innehållet" ligger först på sidan.
- En H1 per sida och ingen överhoppad rubriknivå. Ett dolt `sr-only`-H2 fyller luckan där det behövs.
- Fokusringen är 2 px blå med 3 px avstånd och syns alltid vid tangentbordsfokus.
- Paneler och dialoger har `role="dialog"`, `aria-modal`, fokusfälla och stängs med Escape.
- Kontrast: marinblå text mot vitt är 15:1, och dämpad text cirka 7:1. Blå text bara i stora storlekar (se komponenterna).
