# RCS Direkt

Webbplatsen [rcsdirekt.se](https://rcsdirekt.se) och dess innehållssystem.

| Del | Mapp | Körs som | Adress |
| --- | --- | --- | --- |
| Webbplatsen (TanStack Start, React, Tailwind) | `/` | Cloud Run-tjänsten `rcsdirekt` | rcsdirekt.se, www.rcsdirekt.se |
| Innehållssystemet (Payload CMS, Postgres) | `cms/` | Cloud Run-tjänsten `rcsdirekt-cms` | cms.rcsdirekt.se/admin |
| Brandkit: logotyper, ikoner, färger | `brand/` | – | se `brand/BRAND.md` |

Allt ligger i Google Cloud-projektet `rcsdirekt` (europe-west1).

## Så hänger det ihop

- En push till `main` bygger och driftsätter automatiskt. Ändringar under `cms/` bygger bara CMS:et, och övriga ändringar bara webbplatsen.
- Texter, priser, artiklar, källor, begrepp och kundcase redigeras i CMS:et. När något sparas byggs webbplatsen om och hämtar innehållet till `src/content/content.json`. Den filen ska inte ändras för hand.
- Bilder från CMS:et och videor från videogeneratorn lagras i bucketen `rcsdirekt-videos` och visas via `/media/…` och `/v/…`. Gränsen för uppladdningar ligger i Firestore.

## Utveckla lokalt

Kräver [Bun](https://bun.sh).

```sh
bun install
bun run dev      # http://localhost:8080
bun test         # tester
bun run build    # produktionsbygge till .output/
```

CMS:et har en egen README i `cms/`.

## Regler för kod och design

Se `AGENTS.md`. Allt UI-arbete går igenom skillsen i `.claude/skills/`, och brandkitet i `brand/` gäller före allt annat.
