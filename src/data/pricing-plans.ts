export const pricingPlans = [
  {
    name: "RCS Basic",
    slug: "basic",
    price: "0,30 SEK",
    badge: null,
    short: "Verifierade textmeddelanden för korta och tydliga besked.",
    copy: "Det enklaste sättet att komma igång med RCS och ett naturligt nästa steg från traditionellt sms. Ett textmeddelande på upp till 160 tecken skickas från en verifierad avsändare. Mottagaren ser ert företagsnamn, er logotyp och en verifieringsmarkering direkt i meddelandeappen. Det skapar trygghet och gör det lättare att skilja era meddelanden från bedrägeriförsök. Basic passar bra för korta och tydliga besked som orderbekräftelser, leveransaviseringar, bokningspåminnelser och engångskoder, där budskapet är det viktiga och ni vill hålla kostnaden låg.",
  },
  {
    name: "RCS Single",
    slug: "single",
    price: "0,425 SEK",
    badge: "Populärast",
    short: "Rika utskick med bilder, video, karuseller och knappar.",
    copy: "Använd hela bredden av vad RCS kan erbjuda i ett enskilt utskick. Ett meddelande kan innehålla bilder, video, GIF-animationer, rika kort med rubrik och beskrivning, karuseller där mottagaren bläddrar mellan flera produkter, samt klickbara knappar och förslag som leder vidare till er webbplats, ett telefonsamtal, en karta eller en kalenderhändelse. Även rena textmeddelanden längre än 160 tecken räknas hit. Single passar för kampanjer, nyhetsutskick, produktlanseringar och erbjudanden där ni vill fånga uppmärksamheten visuellt och göra det enkelt för kunden att agera direkt i meddelandet.",
  },
  {
    name: "RCS Conversation",
    slug: "conversation",
    price: "0,63 SEK",
    badge: null,
    short: "Tvåvägsdialog med bilder, knappar och snabbsvar.",
    copy: "Byggt för dialog snarare än envägskommunikation. När mottagaren svarar öppnas en konversation där ni kan skicka meddelanden fram och tillbaka inom ett begränsat tidsfönster, vanligtvis 24 timmar. Under konversationen kan ni använda alla rika funktioner, som bilder, knappar och snabbsvar, vilket gör det enkelt att guida kunden steg för steg. Passar för kundservice, ombokningar, felanmälningar, orderuppföljning och automatiserade flöden med chattbottar, där kunden får hjälp direkt i sin meddelandeapp i stället för att behöva ringa eller logga in någonstans.",
  },
] as const;

export type PricingPlan = (typeof pricingPlans)[number];

export const pricingCountries = [
  { code: "SE", name: "Sverige", available: true },
  { code: "NO", name: "Norge", available: false },
  { code: "DK", name: "Danmark", available: false },
  { code: "FI", name: "Finland", available: false },
] as const;

export const pricingCurrencies = [
  { code: "SEK", name: "Svensk krona", available: true },
  { code: "EUR", name: "Euro", available: false },
  { code: "NOK", name: "Norsk krona", available: false },
  { code: "DKK", name: "Dansk krona", available: false },
] as const;
