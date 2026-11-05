// Standardexempel för RCS-videogeneratorn. Fiktivt varumärke – byt allt mot kundens godkända material.

const svgUrl = (svg: string) => "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);

export const exampleLogo = svgUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" width="224" height="224" viewBox="0 0 224 224"><rect width="224" height="224" fill="#1f3a5f"/><circle cx="112" cy="96" r="38" fill="none" stroke="#fff" stroke-width="12"/><text x="112" y="182" font-family="Arial,Helvetica,sans-serif" font-size="34" font-weight="700" fill="#fff" text-anchor="middle">optik</text></svg>`,
);

export const exampleBanner = svgUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="448" viewBox="0 0 1440 448"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1f3a5f"/><stop offset="1" stop-color="#6f8fb5"/></linearGradient></defs><rect width="1440" height="448" fill="url(#g)"/><g fill="none" stroke="#ffffff" stroke-opacity=".25" stroke-width="10"><circle cx="1080" cy="224" r="120"/><circle cx="1280" cy="224" r="120"/><path d="M1200 224h0"/></g></svg>`,
);

export const exampleCard = svgUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" width="786" height="450" viewBox="0 0 786 450"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe8f3"/><stop offset="1" stop-color="#9fb4cf"/></linearGradient></defs><rect width="786" height="450" fill="url(#g)"/><g fill="none" stroke="#1f3a5f" stroke-width="18"><circle cx="300" cy="225" r="85"/><circle cx="486" cy="225" r="85"/><path d="M385 220q8-14 16 0"/></g></svg>`,
);

export type Action = "reply" | "url" | "dial";
export type Chip = { label: string; action?: Action; target?: string };
export type Step =
  | { role: "agent"; type: "text"; text: string; chips?: Chip[]; newGroup?: boolean }
  | { role: "agent"; type: "card"; image?: string; title?: string; body?: string; buttons?: Chip[] }
  | { role: "user"; type: "tap"; label: string }
  | { role: "user"; type: "type"; text: string };

export type Flow = {
  name: string;
  brand: {
    displayName: string;
    description: string;
    color: string;
    logo: string;
    banner: string;
    contacts: { type: "phone" | "web" | "email"; value: string; label: string }[];
  };
  startClock: string;
  showProfile: boolean;
  profileSeconds: number;
  finalHold: number;
  optin: string;
  steps: Step[];
  help: { keyword: string; reply: string };
  optout: { keyword: string; reply: string };
};

export const exampleFlow: Flow = {
  name: "Exempel – Nordsyn Optik",
  brand: {
    displayName: "Nordsyn Optik",
    description: "Synundersökning, glasögon och linser i centrala Örebro.",
    color: "#1f3a5f",
    logo: exampleLogo,
    banner: exampleBanner,
    contacts: [
      { type: "phone", value: "+46191234567", label: "Nordsyn Optik" },
      { type: "web", value: "https://www.example.com/", label: "Nordsyn Optik" },
      { type: "email", value: "kundservice@example.com", label: "Kundservice" },
    ],
  },
  startClock: "13:16:42",
  showProfile: true,
  profileSeconds: 6,
  finalHold: 5,
  optin:
    "Du får detta meddelande eftersom du har valt att ta emot information och erbjudanden från Nordsyn Optik. Du kan när som helst avregistrera dig genom att svara STOP eller STOPP.",
  steps: [
    {
      role: "agent",
      type: "card",
      image: exampleCard,
      title: "Dags för en ny synundersökning?",
      body: "Boka en kostnadsfri synundersökning hos oss i Örebro.",
      buttons: [
        { label: "Boka tid", action: "reply" },
        { label: "Läs mer", action: "url", target: "https://www.example.com/" },
        { label: "Ring oss", action: "dial", target: "+46191234567" },
      ],
    },
    { role: "user", type: "tap", label: "Boka tid" },
    {
      role: "agent",
      type: "text",
      text: "Vilken dag passar dig bäst?",
      chips: [{ label: "Torsdag" }, { label: "Fredag" }, { label: "Lördag" }],
    },
    { role: "user", type: "tap", label: "Fredag" },
    {
      role: "agent",
      type: "text",
      text: "Tack! Din förfrågan om en tid på fredag är registrerad. Nordsyn Optik återkommer med en bekräftelse.",
    },
  ],
  help: {
    keyword: "HJÄLP",
    reply: "Behöver du hjälp? Kontakta Nordsyn Optik på 019-123 45 67 eller kundservice@example.com.",
  },
  optout: {
    keyword: "STOPP",
    reply:
      "Du är nu avregistrerad från RCS-meddelanden från Nordsyn Optik. Du kommer inte att få fler RCS-meddelanden från denna avsändare om du inte väljer att registrera dig igen.",
  },
};

export const emptyFlow = (): Flow => ({
  ...structuredClone(exampleFlow),
  name: "Ny profil",
  brand: { displayName: "", description: "", color: "#1f1f1f", logo: "", banner: "", contacts: [] },
  optin: "",
  steps: [],
  help: { keyword: "HJÄLP", reply: "" },
  optout: { keyword: "STOPP", reply: "" },
});
