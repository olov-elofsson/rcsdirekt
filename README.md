# RCS Direkt

Webbplatsen [rcsdirekt.se](https://rcsdirekt.se) och dess innehållssystem.

| Del | Mapp | Körs som | Adress |
| --- | --- | --- | --- |
| Webbplatsen (TanStack Start, React, Tailwind) | `/` | Cloud Run-tjänsten `rcsdirekt` | rcsdirekt.se |
| Innehållssystemet (Payload CMS, Postgres) | `cms/` | Cloud Run-tjänsten `rcsdirekt-cms` | cms.rcsdirekt.se/admin |

Allt ligger i Google Cloud-projektet `rcsdirekt` (europe-west1).

## Så hänger det ihop

- En push till `main` bygger och driftsätter automatiskt. Ändringar under `cms/` bygger bara CMS:et, övriga ändringar bara webbplatsen.
- Texter, priser, artiklar, källor och kundcase redigeras i CMS:et. När något sparas byggs webbplatsen om och hämtar innehållet till `src/content/content.json`. Den filen ändras inte för hand.
- Ändringar i CMS:ets innehåll eller fält görs som migreringar i `cms/src/migrations/`, så att de körs när CMS:et driftsätts.

## Karta över repot

| Mapp eller fil | Vad det är |
| --- | --- |
| `src/routes/` | En fil per sida. Filnamnet blir adressen: `priser.tsx` är /priser, `blogg.$slug.tsx` är varje artikel, `index.tsx` är startsidan och `__root.tsx` ramen runt alla sidor. |
| `src/routes/api/` | Serveranrop: `lead.ts` tar emot formulären, `rcs-video.ts` laddar upp videor. |
| `src/components/` | Delar som sidorna byggs av, se nedan. |
| `src/components/ui/` | Grundkomponenter: knapp, fält, etikett, kryssruta, märke, förloppsmätare. |
| `src/content/` | Innehållet från CMS:et (`content.json`) och dess typer. |
| `src/data/` | Data som sidorna läser: artiklarna, kundexemplen, stegen för att komma igång, avsändaren i telefonerna. |
| `src/lib/` | Hjälpfunktioner: företagsuppgifter (`company.ts`), formulärregler (`inquiries/`), videogeneratorns motor (`rcs-video/`), webinar och typografi. |
| `src/assets/` | Fotona till kundexemplen. |
| `src/styles.css` | Färger, typsnitt och gemensamma stilar. |
| `public/` | Filer som visas som de är: ikoner, `sitemap.xml`, `robots.txt`. |
| `brand/` | Brandkitet: logotyper, färger och identitet. Läs `BRAND.md` och `IDENTITY.md`. |
| `cms/` | Innehållssystemet, med egen README. |
| `scripts/fetch-content.ts` | Hämtar innehållet från CMS:et när webbplatsen byggs. |
| `tests/` | Tester, körs med `bun test`. |
| `docs/` | Planer: `roadmap.md` och `seo-content-plan.md`. |
| `.claude/skills/` | Instruktioner för Claude, se README där. |
| `AGENTS.md` | Regler för kod, design och text i det här repot. |

### Komponenterna

| Fil | Vad den visar |
| --- | --- |
| `SiteLayout.tsx` | Sidhuvud, notisrad för webinar och sidfot. |
| `SectionEyebrow.tsx` | Den lilla etiketten med blått streck över rubrikerna på startsidan. |
| `PageHeading.tsx` | Rubriken överst på undersidor. |
| `HomepageSections.tsx` | Startsidans sektioner: jämförelsen, webb och API, priser, guider och kontakt. |
| `CustomerExamples.tsx` | Kundexemplen med meddelanden över foton. |
| `InquiryForm.tsx` | Formuläret för kontakt, konto och webinar. |
| `FormDialog.tsx` | Rutan som formuläret öppnas i. |
| `RcsPhone.tsx` | Telefonen och meddelandena i Google Messages-stil. |
| `BlogLayout.tsx` | Ramen för bloggen och artiklarna. |
| `ArticleCard.tsx` | Kortet för en artikel i listor. |
| `ArticleReadingTools.tsx` | Förloppsstapeln överst i artiklarna. |
| `LegalPage.tsx` | Integritetspolicyn och villkoren. |
| `BrandLogo.tsx` | Logotypen. |
| `rcs-video/RcsVideoGenerator.tsx` | Videogeneratorn på /video-generator. |

## Utveckla lokalt

Kräver [Bun](https://bun.sh).

```sh
bun install
bun run dev      # startar sajten lokalt
bun test         # tester
bun run build    # produktionsbygge till .output/
```
