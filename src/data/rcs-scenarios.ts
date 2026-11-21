// Illustrative RCS conversations for our customer cases, laid over the cases' photos on the start
// page. They are possible set-ups, not measured customer results, and the section labels each one
// "Exempel för …". Keep them in line with the case descriptions in the CMS. Images are crops of
// the cases' own photos (the only photos we have), placed with `position`.
import careUrl from "@/assets/foto-omsorg.webp";
import workshopUrl from "@/assets/foto-verkstad.webp";
import courseUrl from "@/assets/foto-utbildning.webp";
import carDealerUrl from "@/assets/foto-bilhandel.webp";

/** A crop of a photo: the file, the point to zoom in on (CSS position) and how far (1 = whole photo). */
export type Picture = { src: string; position?: string; zoom?: number };

/**
 * A button in a message. A reply sends its label as the recipient's answer, and the business
 * answers with `next`. An action with an icon only opens something (`opens`) and sends nothing,
 * as in RCS.
 */
export type Choice = { label: string; icon?: string; opens?: string; next?: Step };

export type Card = { title: string; body: string; image?: Picture; actions: Choice[] };

/** One message from the business: a photo, text, a rich card or a carousel, with suggestions under it. */
export type Step = { image?: Picture; text?: string; card?: Card; carousel?: Card[]; chips?: Choice[] };

export type Scenario = {
  /** The customer case: shown as "Exempel för …" and as the sender. */
  customer: string;
  title: string;
  copy: string;
  /** The RCS features the conversation shows, listed in the text card. */
  features: string[];
  photo: Picture & { alt: string };
  start: Step;
};

const calendar: Choice = { label: "Lägg i kalendern", icon: "event", opens: "kalendern" };
const map: Choice = { label: "Visa vägen", icon: "open", opens: "kartan" };

/* DreamCare: a visit reminder that can be confirmed or moved, then a reminder and a rating. */
const rating: Step = {
  text: "Hur var besöket i dag?",
  chips: ["Mycket bra", "Bra", "Mindre bra"].map((label) => ({
    label,
    next: { text: label === "Mindre bra" ? "Tack för att du säger till. Vi ringer dig i morgon och hör vad vi kan göra bättre." : "Tack, vad roligt att höra! Vi hälsar Anna." },
  })),
};
const visitBooked = (when: string): Step => ({
  text: `Klart! Anna kommer ${when}.`,
  chips: [
    calendar,
    { label: "Vem är Anna?", next: { image: { src: careUrl, position: "44% 38%", zoom: 2.6 }, text: "Anna har varit hos oss i fyra år och kommer till dig varje vecka.", chips: [{ label: "Tack!", next: rating }] } },
  ],
});

/* Maptun: a carousel of services with pictures, booking, directions and a reminder. */
const workshopBooked = (day: string): Step => ({
  card: {
    title: `Bokat ${day} kl. 8.00`,
    body: "Lämna bilen från 7.30. Vi hör av oss när den är klar.",
    image: { src: workshopUrl, position: "62% 58%", zoom: 1.9 },
    actions: [map, calendar],
  },
  chips: [
    {
      label: "Påminn mig dagen innan",
      next: { text: "Det gör vi. Ha en fin dag!" },
    },
  ],
});
const bookWorkshop: Choice = {
  label: "Boka tid",
  next: {
    text: "Vi har lediga tider i verkstaden. Vilken dag passar?",
    chips: [
      { label: "Tisdag", next: workshopBooked("tisdag") },
      { label: "Torsdag", next: workshopBooked("torsdag") },
    ],
  },
};

/* Nercia: a welcome with a picture, what to bring, and a question. */
const courseInfo: Step = {
  text: "Toppen! Här är det du behöver inför första dagen.",
  carousel: [
    { title: "Schema", body: "Vecka 1 och 2", image: { src: courseUrl, position: "72% 36%", zoom: 2.6 }, actions: [{ label: "Öppna schemat", icon: "open", opens: "schemat" }] },
    { title: "Ta med", body: "Legitimation och dator", image: { src: courseUrl, position: "22% 74%", zoom: 3.2 }, actions: [{ label: "Läs mer", icon: "open", opens: "nercia.se" }] },
    { title: "Hitta hit", body: "Ingång från parkeringen", image: { src: courseUrl, position: "92% 14%", zoom: 2.2 }, actions: [map] },
  ],
  chips: [
    { label: "Jag har en fråga", next: { text: "Skriv den här, så svarar en lärare före kursstart.", chips: [{ label: "Tack, vi ses!", next: { text: "Vi ses på måndag kl. 9.00!" } }] } },
    { label: "Allt klart", next: { text: "Vi ses på måndag kl. 9.00!" } },
  ],
};

/* Bilia: an invitation with a photo, sign-up, and a test drive. */
const testDriveBooked = (time: string): Step => ({
  text: `Klart! Din provkörning är torsdag kl. ${time}. Bilen står redo vid entrén.`,
  chips: [calendar],
});
const signedUp: Step = {
  card: {
    title: "Du är anmäld!",
    body: "Vill du provköra nyheten samma kväll?",
    image: { src: carDealerUrl, position: "78% 72%", zoom: 2.6 },
    actions: [
      {
        label: "Boka provkörning",
        next: { text: "Vilken tid passar?", chips: [{ label: "17.30", next: testDriveBooked("17.30") }, { label: "19.00", next: testDriveBooked("19.00") }] },
      },
      { label: "Nej tack", next: { text: "Okej, vi ses på torsdag!", chips: [calendar] } },
    ],
  },
};

export const scenarios: Scenario[] = [
  {
    customer: "DreamCare",
    title: "Påminnelser som går att svara på",
    copy: "Kunden bekräftar besöket eller väljer en ny tid, ser vem som kommer och säger efteråt vad den tyckte. Allt i samma tråd.",
    features: ["Kort med bild", "Ny tid i två steg", "Bildmeddelande", "Betyg efter besöket"],
    photo: { src: careUrl, alt: "En ung kvinna och en äldre kvinna skrattar tillsammans i en soffa hemma", position: "50% 35%" },
    start: {
      card: {
        title: "Besök i morgon kl. 10.00",
        body: "Anna från hemtjänsten kommer till dig. Passar tiden?",
        image: { src: careUrl, position: "14% 50%", zoom: 2.2 },
        actions: [
          { label: "Ja, det passar", next: visitBooked("i morgon kl. 10.00") },
          {
            label: "Boka om",
            next: {
              text: "Inga problem. Vilken tid passar bättre?",
              chips: [
                { label: "Ons 10.00", next: visitBooked("onsdag kl. 10.00") },
                { label: "Tor 13.00", next: visitBooked("torsdag kl. 13.00") },
                { label: "Fre 9.00", next: visitBooked("fredag kl. 9.00") },
              ],
            },
          },
          { label: "Ring oss", icon: "call", opens: "telefonen" },
        ],
      },
    },
  },
  {
    customer: "Maptun",
    title: "Tjänster att svepa mellan",
    copy: "En karusell med bilder och en knapp per tjänst. Tiden bokas i samma konversation, med vägbeskrivning och påminnelse.",
    features: ["Karusell med bilder", "Bokning i chatten", "Vägbeskrivning", "Påminnelse"],
    photo: { src: workshopUrl, alt: "En svart Saab i Maptuns verkstad, kopplad till en effektbänk", position: "50% 60%" },
    start: {
      text: "Hej! Dags för något nytt till bilen? Här är tre av våra tjänster.",
      carousel: [
        { title: "Motoroptimering", body: "Mjukvara anpassad för din bil.", image: { src: workshopUrl, position: "46% 26%", zoom: 2.3 }, actions: [bookWorkshop, { label: "Läs mer", icon: "open", opens: "maptun.se" }] },
        { title: "Effektmätning", body: "Se kraften på vår bänk.", image: { src: workshopUrl, position: "18% 72%", zoom: 2.1 }, actions: [bookWorkshop, { label: "Läs mer", icon: "open", opens: "maptun.se" }] },
        { title: "Felsökning", body: "Vi läser av bilens fel.", image: { src: workshopUrl, position: "78% 36%", zoom: 2.4 }, actions: [bookWorkshop, { label: "Läs mer", icon: "open", opens: "maptun.se" }] },
      ],
    },
  },
  {
    customer: "Nercia",
    title: "Välkomstbesked inför kursstart",
    copy: "Tid och plats, en knapp för att tacka ja, och det deltagaren behöver inför första dagen som kort att svepa mellan.",
    features: ["Kort med bild", "Karusell", "Vägbeskrivning", "Frågor i chatten"],
    photo: { src: courseUrl, alt: "Nercias namn tryckt i blått på strukturerat papper", position: "50% 50%" },
    start: {
      card: {
        title: "Välkommen till kursen!",
        body: "Vi börjar måndag kl. 9.00. Välkomstfika från 8.30.",
        image: { src: courseUrl, position: "46% 42%", zoom: 1.7 },
        actions: [{ label: "Jag kommer", next: courseInfo }, map],
      },
    },
  },
  {
    customer: "Bilia",
    title: "Inbjudan med anmälan i meddelandet",
    copy: "En inbjudan med bild och anmälan i meddelandet. Gästen kan boka en provkörning samma kväll.",
    features: ["Kort med bild", "Anmälan i två steg", "Provkörning i chatten", "Lägg i kalendern"],
    photo: { src: carDealerUrl, alt: "Bilias skylt på en glasfasad mot en blå himmel", position: "50% 30%" },
    start: {
      card: {
        title: "Välkommen på premiärkväll",
        body: "Se nyheterna torsdag kl. 18.00 hos oss.",
        image: { src: carDealerUrl, position: "40% 36%", zoom: 1.9 },
        actions: [
          {
            label: "Anmäl mig",
            next: {
              text: "Kul! Hur många kommer ni?",
              chips: ["1", "2", "3 eller fler"].map((count) => ({ label: count, next: signedUp })),
            },
          },
          { label: "Se nyheten", icon: "open", opens: "bilia.se" },
        ],
      },
    },
  },
];
