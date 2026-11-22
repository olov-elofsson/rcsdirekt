# RCS Direkt: visuell identitet

En brief för den som designar något åt RCS Direkt: en sida, en annons, en presentation eller ett utskick. Den bygger på `brand/BRAND.md` (filer, färger och typsnitt), `brand/brand-context.md`, och beskriver hur sajten ser ut i november 2026. Står något här i strid med BRAND.md gäller BRAND.md.

## 01 Strategi

RCS Direkt säljer något tekniskt till företag som inte vill tänka på teknik. Identiteten ska därför kännas som ett vanligt, välskrivet meddelande: lugn, rak och lätt att svara på. Den enda grafiska formen är logotypen. Resten är text, foton och riktiga meddelanden i samma få färger, och dekoration som inte förklarar något finns inte.

## 02 Logotyp

- **Form:** symbol och ordmärke. Symbolen är två droppar: en stor i marinblått och en mindre i blått bakom dess övre högra hörn, med en smal glipa emellan. Ordmärket är "rcs" i marinblått och "direkt" i blått.
- **Karaktär:** vänlig och stadig. Det runda står för samtalet, och det raka hörnet för att avsändaren är ett företag.
- **Använd:** filerna i `brand/SVG` och `brand/PNG`. Som avsändare i RCS används `rcs-avsandare.svg` (symbolen på vit bakgrund, 224 × 224 px). I webbläsarfliken används bara symbolen, utan bakgrund.
- **Undvik:** att sträcka, färga om, rotera eller lägga effekter på logotypen. Rita den inte av för hand.
- **Förebilder:** Slacks symbol, som en enkel form kan bära ett helt system. Monzos ordmärke, som tål att vara litet. Google Messages egna rundade avsändarlogotyper, som kunderna redan känner igen.

## 03 Färger

| Roll | Namn | Värde | Användning |
| --- | --- | --- | --- |
| Primär | Marin | `#15115F` | Text, rubriker, primära knappar, mörka ytor |
| Accent | Blå | `#2F7BFF` | Markeringar, länkar, en av två former i en grupp. Sparsamt |
| Yta | Lavendel | `#EFEEFC` | Sektionsbakgrunder, mjuka ytor, valda lägen |
| Yta | Dimma | `#F5F5FC` | Diskreta bakgrunder |
| Grund | Vit | `#FFFFFF` | Sidans bas |

- **Känsla:** sval, ren och pålitlig. Paletten är analog: nyanser av blått på vitt.
- **Regler:** marinblått bär texten. Blått (#2F7BFF) ger bara 3,9:1 mot vitt och används därför till ikoner, former och stora rubriker, aldrig till text under 24 px. Sektionerna möts med raka kanter och växlar mellan vit, lavendel och marin, så att sidan får rytm. Orange och persika förekommer inte, inte heller i illustrationer.
- **Inne i en telefon** gäller Google Messages färger (se skillen `rcs-phone`), inte brandkitets.

## 04 Typografi

- **Rubriker:** Archivo 800, tätt radavstånd (1,05–1,1), aldrig versaler i hela rubriken. Stora rubriker på två rader hellre än tre.
- **Brödtext:** Hind 400–600, 16–18 px, radavstånd cirka 1,6, högst cirka 65 tecken per rad.
- **Etiketter:** Hind 700 i versaler med lite spärrning, 12 px, för korta överrubriker som "Exempel för DreamCare".
- **Siffror:** tabellsiffror för priser och tider.
- **I telefonen:** Google Sans, som i Google Messages.
- **Undvik:** fler typsnitt, kursiv som dekoration och fetstil mitt i löptext.

## 05 Bilder

- **Stämning:** vardag, nära och varm. Människor som får eller svarar på ett besked: hemma, i verkstaden, på kursen, i butiken.
- **Motiv:** riktiga kunder och miljöer från kundcasen före stockfoton. Fotot får aldrig se ut som ett uppmätt kundresultat, och exempel märks "Exempel för …".
- **Behandling:** naturliga färger, ingen tonplatta i brandfärg. En mjuk mörk toning nertill när ett meddelande ligger ovanpå.
- **Meddelanden på foton:** riktiga RCS-meddelanden byggda med telefonens kod (`RcsSnippet`), aldrig ritade, och utan egna bilder i korten.
- **Undvik:** leende människor framför en dator, handskakningar, glödande nätverk och andra klichéer.

## 06 Ikoner och illustrationer

- **Inga svävande former.** Logotypen är den enda grafiska formen, och sidorna bärs av text, foton och riktiga meddelanden.
- **Ikoner bär information.** Lucide i gränssnittet, alltid med en text bredvid: egenskaper i jämförelsen, stegen, webb och API, det som ingår i priset, funktionerna ett kundexempel använder och lästid. Ikonen står i blått (#2F7BFF), ofta i en lavendelruta med rundade hörn, med linjebredd 2. I telefoner och meddelanden används Material-ikonerna från `engine.ts`.
- **Bilder i meddelanden:** exemplen på kundcasens foton har inga egna bilder i korten; fotot bär bilden.
- **Listor** numreras med siffror, inte ikoner.
- **Mängd text:** en rubrik och ett kort stycke per del. Längre listor (till exempel jämförelsen) visar det viktigaste och resten bakom "Visa alla".

## 07 Designprinciper

- **Visa meddelandet.** Det bästa beviset är ett riktigt RCS-meddelande som går att trycka i. Beskriv mindre och visa mer.
- **Luft före dekoration.** Vit yta, en tydlig rubrik och en sak i taget. Tar bort man en dekoration och inget försvinner ur budskapet, ska den bort.
- **Ärligt innehåll.** Exempel märks som exempel, priser är listpriser, och påståenden har källa.

## 08 Uttryck

- **Webb:** se `src/routes/index.tsx` och komponenterna där. Hjälteytan är centrerad text utan dekoration. Exemplen över kundcasens foton är sidans hjärta.
- **Sociala medier:** profilbild är symbolen på vit eller lavendel yta. Inlägg visar ett meddelande, en bild eller ett kundcase, med rubrik i Archivo och en droppe som enda dekoration.
- **Presentationer:** vit bakgrund, marinblå rubrik, en bild eller ett meddelande per bild. Avslutande bild med symbolen stort.
- **Utskick och e-post:** ordmärket överst, en rubrik, ett meddelande eller en bild, en knapp i marinblått.
- **RCS-avsändaren:** logotyp `rcs-avsandare.png`, banner `rcs-banner.svg` (1440 × 448 px), beskrivning "Skicka RCS direkt från webben eller via API."
