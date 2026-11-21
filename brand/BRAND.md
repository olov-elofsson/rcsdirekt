# RCS Direkt brandkit

Den här mappen är den enda källan för RCS Direkts logotyper och ikoner. Sidan importerar logotyperna härifrån (`src/components/BrandLogo.tsx`), och ikonerna i `public/` är kopior av filerna i `webb/`. Byter du en fil här, uppdatera kopian i `public/` också.

## Logotyper

| Fil | Används till |
| --- | --- |
| `SVG/rcsdirekt.svg` | Standard, liggande logotyp på ljus bakgrund |
| `SVG/rcsdirekt-vit.svg` | Liggande logotyp på mörk bakgrund (#15115F eller foto) |
| `SVG/rcsdirekt-staende.svg`, `-staende-vit.svg` | Stående, för kvadratiska ytor som profilbilder och skyltar |
| `SVG/rcsdirekt-1farg.svg`, `-1farg-vit.svg` | En färg, för tryck, stämplar och prägling |
| `SVG/symbol.svg`, `symbol-vit.svg` | Bara symbolen, med genomskinlig bakgrund: avatarer och appikoner |
| `SVG/rcs-avsandare.svg`, `PNG/rcs-avsandare.png` | Avsändarlogotyp för RCS: symbolen på vit bakgrund, 224 × 224 px (PNG 4,5 kB). Används i alla telefondemos och laddas upp som logotyp för RCS-agenten hos Google. Google Messages rundar hörnen själv |

Använd SVG på webben och i dokument. `PNG/` har transparenta versioner för verktyg som inte klarar SVG, och `JPG/` har versioner med bakgrund, till exempel för e-postsignaturer.

- Logotypen får aldrig sträckas, färgas om, roteras eller få effekter.
- Håll fri yta runt logotypen på minst symbolens höjd.
- Den liggande logotypen ska vara minst 96 px bred på skärm.

## Webb- och appikoner (`webb/`)

| Fil | Var den används |
| --- | --- |
| `favicon.svg`, `favicon-16.png`, `favicon-32.png` | Webbläsarfliken (`public/`) |
| `icon-180.png` | Apple touch icon (`public/apple-touch-icon.png`) |
| `icon-192.png`, `icon-512.png` | Webbmanifest (`public/site.webmanifest`) |
| `app-ikon.svg` | Originalet till appikonen |

## Färger

| Namn | Värde | Används till |
| --- | --- | --- |
| Marin | `#15115F` | Text, primära knappar, mörka ytor och logotypens text |
| Blå | `#2F7BFF` | Ordet "direkt" och symbolens accent. Använd sparsamt, till markeringar och länkar |
| Lavendel | `#EFEEFC` | Mjuka accentytor och valda lägen |
| Dimma | `#F5F5FC` | Sektionsbakgrunder och chattbakgrunden i telefondemos |
| Vit | `#FFFFFF` | Grundbakgrund |

Sidans tokens i `src/styles.css` (`--primary`, `--primary-soft`, `--muted` och så vidare) följer de här värdena. Orange och persika ska inte förekomma.

## Typsnitt

- Rubriker: **Archivo** 600–800.
- Brödtext: **Hind** 400–700.

Båda laddas från Google Fonts i `src/routes/__root.tsx`.
