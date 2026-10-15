export type DemoFeatureId = 1 | 2 | 3 | 4 | 5 | 6;

export const demoFeatures: Array<{ id: DemoFeatureId; title: string; copy: string }> = [
  { id: 1, title: "Verifierad avsändare", copy: "Er logga, namn och blå bock. Kunden vet att det är ni." },
  { id: 2, title: "Läskvitton", copy: "Se när meddelandet är levererat och läst." },
  { id: 3, title: "Karusell med rich cards", copy: "Bilder, video och flera produkter att svepa mellan." },
  { id: 4, title: "Åtgärdsknappar", copy: "Köp, boka i kalendern, ring eller öppna en länk." },
  { id: 5, title: "Skrivindikator", copy: "Känns som ett riktigt samtal." },
  { id: 6, title: "Föreslagna svar", copy: "Kunden svarar med ett tryck." },
];

export const richCards = [
  { icon: "image", title: "Bilder och video", copy: "Visa produkten i full kvalitet, direkt i meddelandet." },
  { icon: "layers", title: "Svep mellan produkter", copy: "Flera erbjudanden i ett och samma utskick." },
  { icon: "pointer", title: "Knappar som säljer", copy: "Köp, boka eller svara med ett tryck." },
  { icon: "message", title: "Ingen app krävs", copy: "Landar i kundens vanliga meddelandeapp." },
] as const;

export const replyOptions = ["Vad kostar det?", "Visa ett exempel", "Prata med oss"] as const;
export type ReplyOption = (typeof replyOptions)[number];

export const replyContent: Record<ReplyOption, { title: string; copy: string; actions?: string[] }> = {
  "Vad kostar det?": {
    title: "Betala per meddelande",
    copy: "Priset börjar på 0,49 SEK per meddelande, utan månadskostnad eller bindningstid.",
    actions: ["Se meddelandetyper"],
  },
  "Visa ett exempel": {
    title: "Ett erbjudande som går att använda direkt",
    copy: "Kombinera en tydlig bild, kort text och en knapp som leder kunden vidare.",
    actions: ["Visa erbjudandet"],
  },
  "Prata med oss": {
    title: "Vi hjälper er komma igång",
    copy: "Berätta vad ni vill skicka så visar vi ett upplägg som passar er.",
    actions: ["Boka en demo", "Ring oss"],
  },
};