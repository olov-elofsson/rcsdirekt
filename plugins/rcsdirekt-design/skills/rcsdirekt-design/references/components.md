# Komponenter

Recepten är skrivna i React och Tailwind v4 med tokens från `tokens.css`, precis som på rcsdirekt.se. Utan Tailwind gäller samma mått: varje recept anger värdena i klartext. Ikonerna kommer från [Lucide](https://lucide.dev).

Innehåll: [Knappar](#knappar) · [Menyrad](#menyrad) · [Hjälte](#hjälte-startsida) · [Undersidans hjälte](#undersidans-hjälte) · [Sektionsrubrik](#sektionsrubrik) · [Ingångskort](#ingångskort) · [Droppen](#droppen) · [Steg på Marin](#steg-på-marin) · [Delad sektion](#delad-sektion) · [Prislista](#prislista) · [Frågor](#frågor) · [Avslutande ruta](#avslutande-ruta) · [Sidfot](#sidfot) · [Formulär](#formulär) · [Kodruta och API-referens](#kodruta-och-api-referens) · [Märken](#märken)

---

## Knappar

Alla knappar är helt rundade (pill), halvfeta och 44 px höga (48 px för `lg`). Ikonen i en knapp är 16 px.

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold leading-none " +
  "transition-[color,background-color,border-color,box-shadow,transform,translate,scale] duration-150 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 " +
  "[&>[data-icon=end]]:transition-transform motion-safe:hover:[&>[data-icon=end]]:translate-x-0.5 " +
  "motion-reduce:transition-none",
  {
    variants: {
      variant: {
        // Marin på vitt: den primära knappen.
        default: "bg-primary text-primary-foreground shadow-soft hover:bg-primary-deep hover:-translate-y-0.5 hover:shadow-card active:translate-y-0 active:scale-[0.96]",
        // Vit med tunn kant. På Marin används den med border-transparent som primär knapp.
        outline: "border border-input bg-background text-foreground shadow-sm hover:border-foreground/30 hover:bg-accent hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.96]",
        ghost: "hover:bg-accent active:scale-[0.96]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 has-[>[data-icon=end]]:pr-4.5",
        sm: "relative h-9 px-4 text-xs after:absolute after:inset-x-0 after:-inset-y-1", // 36 px att se, 44 px att trycka
        lg: "h-12 px-8 has-[>[data-icon=end]]:pr-7.5",
        icon: "size-11 p-0",
      },
    },
  },
);
```

Regler:
- Högst en primär knapp per sektion. Bredvid står en textlänk, aldrig en andra knapp som tävlar.
- På vitt är den primära knappen Marin. På Marin är den vit: `variant="outline"` med `border-transparent`.
- En pil i slutet (`<ArrowRight data-icon="end" />`) glider 2 px åt höger vid hover. Paddingen på den sidan är 2 px mindre, så att knappen ser optiskt centrerad ut.
- Vid hover lyfts knappen 2 px, och vid tryck krymper den till 96 %. Med `prefers-reduced-motion` rör den sig inte.
- Primära knappar i stora sektioner har minst 168 px bredd (`min-w-[10.5rem]`), så att de inte ser ihopkrympta ut.

Textlänk med pil, som används i kort och bredvid knappar:

```tsx
<Link className="group inline-flex min-h-10 items-center gap-1.5 text-base font-semibold text-logo-blue">
  Se priser <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
</Link>
```

Kontrast: blått (#2F7BFF) mot vitt är 3,9:1 och klarar inte WCAG AA för vanlig text. Sajten använder det i 16 px halvfet. I nya projekt: gör små länkar marinblå med understrykning (`text-foreground underline underline-offset-4`), och använd blått först från 24 px, eller 18,7 px fet.

## Menyrad

En flytande, vit och helt rundad rad som ligger över sidan och över hjältens Marin.

- Yttre: `sticky top-0 z-50 px-3 pt-3 sm:px-4`, med `pointer-events-none`, så att sidan går att klicka runt raden.
- Raden: `mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto] items-center gap-4 rounded-full border bg-background pl-5 pr-2.5`. Från 1200 px blir den tre kolumner (`grid-cols-[1fr_auto_1fr]`) med menyn i mitten.
- Skugga: `0 4px 16px -10px rgb(21 17 95 / 0.2)`. När sidan har scrollats blir den `0 8px 24px -12px rgb(21 17 95 / 0.25)` och kanten tydligare.
- Logotypen till vänster är 24 px hög, 28 px från 640 px.
- Menyval i 14 px halvfet. Det aktiva valet markeras med **en** lavendelfärgad pill (`h-9 rounded-full bg-primary-soft`) som glider till valet på 300 ms med `cubic-bezier(0.23, 1, 0.32, 1)`. Varje val tänds alltså inte för sig.
- Till höger: "Logga in" som `ghost`-knapp och "Skapa konto" som primär knapp, båda från 640 px. Under 1200 px finns en menyknapp (`outline`, `icon`) som tonar mellan ikonerna Menu och X, med `blur(4px)` och `scale(0.25)` på den som försvinner.
- Mobilmenyn är en vit panel (`rounded-lg p-7 shadow-lift`) som växer från 96 %, över en bakgrund som bara tonas in (`bg-foreground/10 backdrop-blur-[2px]`).
- Länken "Hoppa till innehållet" (`sr-only`, synlig vid fokus) ligger först i dokumentet.

Menyordningen följer startsidan uppifrån och ned.

## Hjälte (startsida)

```tsx
<section className="-mt-[4.75rem] bg-ink text-ink-foreground">  {/* dras upp under menyraden */}
  <div className="mx-auto flex max-w-4xl flex-col items-center px-5 pt-36 pb-20 text-center sm:pt-44 sm:pb-28 lg:px-8">
    {/* Valfri nyhetsrad: en länk i en mjuk pill */}
    <p className="mb-7">
      <a className="group inline-flex min-h-10 items-center gap-2 rounded-full bg-ink-foreground/10 px-3.5 text-[13px] font-semibold text-ink-foreground hover:bg-ink-foreground/15 sm:text-sm">
        <RadioTower className="size-4 text-logo-blue" /> Kort nyhet på en rad <ArrowRight className="size-3.5" />
      </a>
    </p>
    <h1 className="text-[2.5rem] font-extrabold leading-[1.05] text-balance sm:text-6xl lg:text-[4.25rem]">
      RCS för företag <span className="sm:block">i Sverige</span>
    </h1>
    <p className="mt-7 max-w-2xl text-lg leading-relaxed text-pretty text-ink-muted sm:text-xl">
      En eller två meningar som säger vad tjänsten gör och vad den kostar.
    </p>
    <div className="mt-10"><Button size="lg" variant="outline" className="min-w-[10.5rem] border-transparent">Skapa konto</Button></div>
  </div>
</section>
```

Hjälten är centrerad text på Marin, utan telefon, foto eller dekorativa former, och har **en** knapp.

## Undersidans hjälte

Samma Marin och centrerad text, men lite lägre. Rubriken säger vad sidan är ("RCS för utvecklare", "Kontakta oss").

```tsx
<header className="relative -mt-[4.75rem] mb-12 overflow-hidden bg-ink text-ink-foreground sm:mb-16">
  <div className="mx-auto max-w-6xl px-5 pt-36 pb-16 text-center sm:pt-40 sm:pb-20 lg:px-8">
    <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.08] text-balance sm:text-5xl lg:text-6xl">{title}</h1>
    <div className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ink-muted sm:text-xl [&_a]:text-ink-foreground">{description}</div>
    {/* Valfritt: vit knapp och en tyst textlänk */}
    <div className="mt-9 flex flex-wrap items-center justify-center gap-3">{children}</div>
  </div>
</header>
```

## Sektionsrubrik

Vänsterställd rubrik och ingress. En valfri länk ("Priser per operatör →") står till höger på samma baslinje.

```tsx
const sectionHeading = "-ml-[0.04em] max-w-3xl text-[2.1rem] font-extrabold leading-[1.1] text-balance sm:text-[2.65rem]";
const sectionLead = "mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-[17px]";

<div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
  <div>
    <h2 className={sectionHeading}>Igång i tre steg</h2>
    <p className={sectionLead}>Vi hjälper er med avsändaren.</p>
  </div>
  {after /* valfri länk med pil */}
</div>
```

- `-ml-[0.04em]` linjerar Archivos versaler optiskt med texten under.
- Mellan ingress och innehåll är det 40 px, 48 px från 640 px.
- Har en sektion ingen synlig rubrik, till exempel ingångskorten, får den ett `<h2 className="sr-only">`. Då hoppar rubrikordningen aldrig från H1 till H3.

## Ingångskort

Tre kantade kort direkt under hjälten. På sidan är de centrerade. **Kortmönstret används bara här**, en gång per sida.

```tsx
<ul className="grid gap-4 sm:gap-6 lg:grid-cols-3">
  <li>
    <a className="group flex h-full flex-col items-center rounded-2xl border border-border bg-card px-6 pt-8 pb-7 text-center
                  transition-[border-color,box-shadow] duration-200 ease-out hover:border-logo-blue/40 hover:shadow-card
                  sm:px-8 sm:pt-10 sm:pb-9">
      <MonitorSmartphone aria-hidden strokeWidth={1.25} className="size-12 text-logo-blue sm:size-16" />
      <h3 className="mt-5 text-xl font-extrabold leading-snug sm:mt-7">Skicka från webben</h3>
      <p className="mt-3 flex-1 text-base leading-relaxed text-pretty text-muted-foreground">En till två meningar.</p>
      <span className="mt-7 inline-flex items-center gap-1.5 font-semibold text-logo-blue">Prova webbverktyget <ArrowRight className="size-4" /></span>
    </a>
  </li>
</ul>
```

- Linjeikoner med streckbredd 1.25, blå, utan platta bakom.
- Hela kortet är en länk. Vid hover blir kanten blåare och skuggan syns.
- Ikoner för pengar är aldrig dollartecken. Använd en plånbok (`Wallet`) eller ingen ikon.

## Droppen

Logotypens form: en cirkel med ett rakt hörn nere till vänster. Varje siffra i numrerade steg och listor står i en droppe, aldrig fristående.

```tsx
export function NumberDrop({ n, tone = "ink" }: { n: number; tone?: "ink" | "light" }) {
  return (
    <span aria-hidden className={cn(
      "grid size-10 shrink-0 place-items-center rounded-[50%_50%_50%_0] font-display text-base font-extrabold tabular-nums",
      tone === "light" ? "bg-ink-foreground text-ink" : "bg-ink text-ink-foreground",
    )}>{n}</span>
  );
}
```

`tone="light"` används på Marin.

## Steg på Marin

Ett band i Marin mitt på sidan, med tre kort som är lite ljusare än bakgrunden.

```tsx
<section className="bg-ink text-ink-foreground">                  {/* 64/96 px luft som andra band */}
  <div className="mx-auto max-w-7xl px-5 lg:px-8">
    <h2 className={sectionHeading}>Igång i tre steg</h2>
    <p className={cn(sectionLead, "text-ink-muted")}>Vi hjälper er med avsändaren.</p>
    <ol className="mt-10 grid gap-4 sm:gap-6 lg:grid-cols-3">
      <li className="flex flex-col gap-6 rounded-2xl border border-ink-foreground/10 bg-ink-foreground/[0.06] px-6 pt-7 pb-6 sm:px-8 sm:pt-8 sm:pb-7">
        <NumberDrop n={1} tone="light" />
        <div>
          <h3 className="text-xl font-extrabold leading-snug">Skapa ett konto</h3>
          <p className="mt-2 leading-relaxed text-ink-muted">En till två meningar.</p>
          <a className="mt-3 inline-flex min-h-10 items-center gap-1.5 font-semibold underline decoration-ink-foreground/40 underline-offset-4">Skapa konto →</a>
        </div>
      </li>
    </ol>
  </div>
</section>
```

Länkar på Marin är vita och understrukna, inte blå.

## Delad sektion

Text och knapp till vänster, och en ruta som visar något till höger, till exempel en telefon med ett riktigt meddelande. Bakgrunden är Dimma.

```tsx
<section className="bg-muted">
  <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
    <div>
      <h2 className={sectionHeading}>Ert namn i stället för ett nummer</h2>
      <p className={sectionLead}>…</p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"><Button size="lg">Skapa konto</Button>{textlänk}</div>
    </div>
    <div className="flex justify-center rounded-3xl border border-border bg-card px-6 py-12 sm:py-14">{illustration}</div>
  </div>
</section>
```

## Prislista

En kantad ruta med en rad per alternativ. På dator står namn och innehåll till vänster, priset i en fast kolumn och länken längst till höger.

```tsx
<ul className="divide-y divide-border rounded-2xl border border-border bg-card">
  <li className="grid gap-x-8 gap-y-2 px-6 py-6 sm:grid-cols-[1fr_11rem_12rem] sm:items-center sm:px-8">
    <div>
      <h3 className="text-xl font-extrabold leading-snug">RCS Basic</h3>
      <p className="mt-1 text-muted-foreground">Text upp till 160 tecken</p>
    </div>
    <p className="text-muted-foreground sm:text-right">från <span className="font-display text-xl font-extrabold tabular-nums text-foreground">0,316 SEK</span></p>
    <a className="… sm:justify-self-end">Välj Basic →</a>
  </li>
  {/* Valfri sista rad som förklarar något kort */}
  <li className="flex flex-col gap-2 rounded-b-2xl bg-muted px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
    <p className="max-w-2xl text-sm text-muted-foreground">En mening.</p>{länk}
  </li>
</ul>
```

Priser skrivs med svenskt decimalkomma och mellanslag före valutan: `0,316 SEK`.

## Frågor

Två spalter på dator: rubrik och kontaktlänk till vänster, frågorna i en kantad lista till höger. På mobil hamnar de under varandra.

```tsx
<section className="bg-muted">
  <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:px-8">
    <div>
      <h2 className={sectionHeading}>Vanliga frågor</h2>
      <p className="mt-4 text-muted-foreground">Hittar ni inte svaret? <a className="font-semibold text-foreground underline underline-offset-4">Kontakta oss</a></p>
    </div>
    <div className="divide-y divide-border rounded-2xl border border-border bg-card px-6 sm:px-8">
      <details className="group">
        <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold [&::-webkit-details-marker]:hidden">
          <span>Fråga?</span>
          <ChevronDown className="size-5 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <p className="pb-5 leading-relaxed text-muted-foreground">Svar.</p>
      </details>
    </div>
  </div>
</section>
```

Använd `<details>`, så fungerar listan utan JavaScript och med tangentbord.

## Avslutande ruta

Sist på sidan: en Marin-ruta på vit botten, centrerad.

```tsx
<section className="bg-background">
  <div className="mx-auto max-w-7xl px-5 lg:px-8">
    <div className="flex flex-col items-center rounded-3xl bg-ink px-6 py-16 text-center sm:py-20">
      <h2 className="max-w-3xl text-[2rem] font-extrabold leading-[1.1] text-balance text-ink-foreground sm:text-[2.6rem]">Skicka ert första RCS-meddelande</h2>
      <p className="mt-4 max-w-lg text-ink-muted sm:text-[17px]">En rad.</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <Button size="lg" variant="outline" className="border-transparent">Skapa konto →</Button>
        <a className="font-semibold text-ink-foreground underline underline-offset-4">Prata med oss</a>
      </div>
    </div>
  </div>
</section>
```

## Sidfot

Marin. Logotypen står till vänster och fyra länkspalter till höger. Underst finns en rad med bolag och org.nr. Adress och kontaktuppgifter står på kontaktsidan, inte här.

```tsx
<footer className="bg-ink pt-16 pb-8 text-ink-foreground sm:pt-20">
  <div className="mx-auto max-w-7xl px-5 lg:px-8">
    <div className="grid gap-12 lg:grid-cols-[1fr_4fr] lg:gap-16">
      <a aria-label="Startsida"><img src="rcsdirekt-vit.svg" className="h-8" alt="rcsdirekt.se" /></a>
      <nav aria-label="Sidfot" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
        <div>
          <p className="text-sm font-semibold">Rubrik</p>
          <ul className="mt-3"><li><a className="inline-flex min-h-10 items-center text-sm text-ink-muted hover:text-ink-foreground">Länk</a></li></ul>
        </div>
      </nav>
    </div>
    <div className="mt-16 flex flex-col gap-2 border-t border-ink-foreground/10 pt-6 text-xs text-ink-muted sm:flex-row sm:justify-between">
      <p>© 2026 Bolaget AB · org.nr 000000-0000</p>
      <div className="flex gap-x-5">{småLänkar}</div>
    </div>
  </div>
</footer>
```

Externa länkar får en liten `ArrowUpRight` (14 px) som glider snett uppåt vid hover.

## Formulär

- Fält: `h-11 w-full rounded-full border border-input bg-transparent px-4 text-base shadow-sm focus-visible:ring-1 focus-visible:ring-ring md:text-sm`. Textrutor har samma kant men rundning 16 px.
- Etikett: `text-sm font-medium` ovanför fältet.
- Fel: en rad under fältet i 14 px. Vid försök att skicka hamnar fokus på det första fältet med fel.
- Kryssrutor och länken till integritetspolicyn står närmast knappen.
- Ett formulär som skickats ersätts av ett kvitto: en bock i en lavendelfärgad cirkel, en rubrik och en rad om vad som händer sen.

## Kodruta och API-referens

För utvecklarsidor. Koden visas i en mörk Marin-ruta med etiketten överst.

```tsx
<div className="overflow-hidden rounded-xl bg-ink">
  <p className="border-b border-ink-foreground/10 px-4 py-2 text-[11px] font-semibold tracking-[0.06em] text-ink-muted uppercase">Anrop</p>
  <pre className="overflow-x-auto px-4 py-3 text-[12.5px] leading-relaxed">{/* nycklar ink-muted, strängar ink-foreground, skiljetecken ink-muted/70 */}</pre>
</div>
```

Så är API-referensen uppbyggd:
- En meny till vänster, `w-56` och `sticky top-28`, med grupperna i små versaler och raderna "märke + namn".
- Per anrop finns rubrik, metod och sökväg i en kantad ram, en kort beskrivning och en lista över fälten (namn i fet monospace, typ i liten text, förklaring under). Kodrutorna med anrop och svar står bredvid, från 1280 px.
- Grupperna ligger i vita rutor (`rounded-2xl border bg-background p-5 sm:p-8`) på Dimma.
- Exemplen ska vara riktiga anrop, med svenska värden.

## Märken

Små etiketter i monospace, till exempel för HTTP-metoder:

| Märke | Klasser |
| --- | --- |
| POST | `rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold bg-primary-soft text-foreground` |
| GET | samma, men `bg-card ring-1 ring-border` |
| Webhook och övrigt | samma, men `bg-muted text-muted-foreground ring-1 ring-border` |

Gröna, röda eller orange märken förekommer inte.
