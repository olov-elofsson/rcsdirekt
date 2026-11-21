# Skills i repot

## Egna

| Skill | Används till |
| --- | --- |
| `rcs-phone` | Alla telefoner som visar RCS-meddelanden |
| `make-interfaces-feel-better` | Radier, linjering, skuggor, typografi, ikoner, övergångar |
| `emil-design-eng` | Animationer, easing, tryck- och hovertillstånd |

## Från andra

Kopierade oförändrade från upphovspersonernas repon den 21 november 2026. Varje mapp har sin licensfil. Uppdatera genom att hämta repot på nytt och kopiera över mappen.

| Skill | Källa | Version | Licens |
| --- | --- | --- | --- |
| `humanizer` | [blader/humanizer](https://github.com/blader/humanizer) | `a32f244` | MIT |
| `grill-me`, `grilling` | [mattpocock/skills](https://github.com/mattpocock/skills), `skills/productivity/` | `abeeaf9` | MIT |
| `caveman`, `ultracave`, `megacave` | [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman), `skills/` | `a192894` | Apache 2.0 |
| 53 marknadsföringsskills, från `ab-testing` till `video` | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills), `skills/` | `5b2b400` | MIT |

`grill-me` anropar `grilling`, och `caveman` hänvisar till `ultracave` och `megacave`, så de ligger med.

Från marknadsföringsbiblioteket ingår inte mapparna `evals/` (testfall) och `scripts/` (körbar kod). `reverse-engineer-marketing` och `conversion-tracking` nämner skript som därför saknas. Hämta dem från källrepot om de behövs, och läs koden innan den körs: `teardown.mjs` hämtar data från nätet och kräver en egen API-nyckel.

Skill Creator från Anthropic finns redan inbyggd i Claude och ligger inte här.

## För rcsdirekt.se

- Texter på sajten och i CMS:et ska gå igenom `humanizer`. Skriver du ny text, använd också `copywriting`, och ändrar du befintlig text, `copy-editing`. Brandkitet och AGENTS.md går före skillsens allmänna råd.
- Marknadsföringsskillsen utgår från ett kontextdokument, `.agents/product-marketing.md`. Det skapas med `product-marketing`.
- Skillsen är skrivna på engelska och för amerikanska förhållanden. Svenska regler gäller före deras råd, till exempel marknadsföringslagen, GDPR och PTS regler om reklam via sms och RCS.
