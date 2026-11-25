# rcsdirekt-design

Designsystemet för rcsdirekt.se som en skill för Claude Code. Med den bygger Claude sidor, komponenter, kampanjsidor och andra webbplatser i samma stil som rcsdirekt.se. Människor kan också läsa filerna direkt.

## Installera i ett annat projekt

**Som plugin (rekommenderat).** Då kan projektet uppdatera skillen när den ändras här. Kör i Claude Code i det andra projektet:

```
/plugin marketplace add olov-elofsson/rcsdirekt
/plugin install rcsdirekt-design@rcsdirekt
```

Med Claude Code 2.1.275 eller senare räcker ett steg:

```
/plugin install rcsdirekt-design --marketplace olov-elofsson/rcsdirekt
```

Skillen heter då `/rcsdirekt-design:rcsdirekt-design`, och Claude använder den av sig själv när något ska se ut som rcsdirekt.se.

Repot är privat, så den som installerar behöver läsbehörighet till det på GitHub. Över HTTPS behöver git också inloggning: kör `gh auth login` och sedan `gh auth setup-git`. Uppdatera senare med `/plugin marketplace update rcsdirekt`, eller slå på automatisk uppdatering under Marketplaces i `/plugin`.

**Som kopia.** Kopiera mappen `plugins/rcsdirekt-design/skills/rcsdirekt-design/` till `.claude/skills/rcsdirekt-design/` i det andra projektet. Den fungerar fristående, men uppdateras inte av sig själv.

**Utan Claude.** Öppna `examples/sida.html` i en webbläsare och använd `references/tokens.css` som grund.

## Innehåll

- `SKILL.md`: tio regler, hur man kommer igång, och en kontrollista
- `references/tokens.css`: CSS-variabler och en mappning för Tailwind v4
- `references/components.md`: komponentrecept
- `references/layout.md`: band, mått, sidmallar, rörelse och tillgänglighet
- `references/copy.md`: röst, rubriker, metadata och strukturerad data
- `examples/sida.html`: en fristående exempelsida
- `assets/`: logotyper och mallen för delningsbilden

## Rättigheter

Logotyperna och varumärket rcsdirekt.se tillhör WIGOSE AB. De får användas i bolagets egna projekt, och inte för att utge sig för att vara rcsdirekt.se.
