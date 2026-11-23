// Illustrative RCS conversations for our customer cases, laid over the cases' photos on the start
// page. They are possible set-ups, not measured customer results, and the section labels each one
// "Exempel för …". Keep them in line with the case descriptions in the CMS. The messages have no
// pictures of their own; the case photo they sit on carries the image.
import workshopUrl from "@/assets/foto-verkstad.webp";
import workshopUrlSmall from "@/assets/foto-verkstad-800.webp";
import courseUrl from "@/assets/foto-utbildning.webp";
import courseUrlSmall from "@/assets/foto-utbildning-800.webp";
import carDealerUrl from "@/assets/foto-bilhandel.webp";
import carDealerUrlSmall from "@/assets/foto-bilhandel-800.webp";
import bowlingUrl from "@/assets/foto-bowling.webp";
import bowlingUrlSmall from "@/assets/foto-bowling-800.webp";
import restaurantUrl from "@/assets/foto-restaurang.webp";
import restaurantUrlSmall from "@/assets/foto-restaurang-800.webp";

/** The photo a case's conversation is laid over. */
/** `messageAt` moves the conversation off the people in the photo: "right" for a subject on the left, "center" for people on both sides. */
export type Picture = { src: string; /** An 800 px wide copy for phones and narrow cards. */ small?: string; position?: string; messageAt?: "right" | "center" };

/**
 * A button in a message. A reply sends its label as the recipient's answer, and the business
 * answers with `next`. An action with an icon only opens something (`opens`) and sends nothing,
 * as in RCS.
 */
export type Choice = { label: string; icon?: string; opens?: string; next?: Step };

export type Card = { title: string; body: string; actions: Choice[] };

/** One message from the business: a photo, text, a rich card or a carousel, with suggestions under it. */
export type Step = { text?: string; card?: Card; carousel?: Card[]; chips?: Choice[] };

export type Scenario = {
  /** The customer case: shown as "Exempel för …" and as the sender. */
  customer: string;
  /** The company's registered name, as in the customer case in the CMS; the card's name. */
  company: string;
  title: string;
  copy: string;
  photo: Picture & { alt: string };
  start: Step;
};

const calendar: Choice = { label: "Lägg i kalendern", icon: "event", opens: "kalendern" };
const map: Choice = { label: "Visa vägen", icon: "open", opens: "kartan" };

/* Big Bowl: a lane booked in the thread, with food added and the time in the calendar. */
const laneDone = (text: string): Step => ({ text, chips: [calendar, map] });
const laneBooked = (time: string): Step => ({
  text: `Klart! Ni har bana 4 kl. ${time} på fredag. Vill ni lägga till mat?`,
  chips: [
    { label: "Ja, gärna", next: laneDone("Vi har lagt till mat för sällskapet. Välkomna!") },
    { label: "Nej tack", next: laneDone("Toppen, välkomna!") },
  ],
});

/* Kebabfabriken: the customer club, with a sign-up bonus, coupons, weekly offers and points. */
const coupon = (what: string, code: string): Step => ({
  card: {
    title: `Kupong: ${what}`,
    body: `Visa koden ${code} i kassan. Gäller i 30 dagar.`,
    actions: [calendar, map],
  },
  chips: [{ label: "Mina poäng", next: { text: "Du har 120 poäng. Vid 200 poäng bjuder vi på en valfri rätt.", chips: [map] } }],
});
const weeklyOffers: Step = {
  text: "Veckans erbjudanden för medlemmar:",
  carousel: [
    { title: "Två kebabtallrikar", body: "Betala för en, den andra halva priset.", actions: [{ label: "Hämta kupong", next: coupon("två kebabtallrikar", "KF-2210") }] },
    { title: "Familjepaket", body: "20 % rabatt hela veckan.", actions: [{ label: "Hämta kupong", next: coupon("familjepaket", "KF-3407") }] },
    { title: "Lunch med dryck", body: "Dryck ingår till dagens lunch.", actions: [{ label: "Hämta kupong", next: coupon("lunch med dryck", "KF-5518") }] },
  ],
};

/* Maptun: a carousel of services with pictures, booking, directions and a reminder. */
const workshopBooked = (day: string): Step => ({
  card: {
    title: `Bokat ${day} kl. 8.00`,
    body: "Lämna bilen från 7.30. Vi hör av oss när den är klar.",
    actions: [map, calendar],
  },
  chips: [
    {
      label: "Påminn mig dagen innan",
      next: { text: "Det gör vi. Vi skickar en påminnelse med adress och vägbeskrivning dagen innan.", chips: [map] },
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
    { title: "Schema", body: "Vecka 1 och 2", actions: [{ label: "Öppna schemat", icon: "open", opens: "schemat" }] },
    { title: "Ta med", body: "Legitimation och dator", actions: [{ label: "Läs mer", icon: "open", opens: "nercia.se" }] },
    { title: "Hitta hit", body: "Ingång från parkeringen", actions: [map] },
  ],
  chips: [
    {
      label: "Jag har en fråga",
      next: {
        text: "Välj en vanlig fråga eller skriv din egen, så svarar en lärare före kursstart.",
        chips: [
          { label: "Finns det parkering?", next: { text: "Ja, det finns gratis parkering vid entrén.", chips: [map] } },
          { label: "Kan jag äta lunch där?", next: { text: "Ja, det finns en restaurang i huset. Lunchen ingår första dagen." } },
        ],
      },
    },
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
    customer: "Maptun",
    company: "Maptun Performance AB",
    title: "Tjänster att svepa mellan",
    copy: "En karusell med en knapp per tjänst. Tiden bokas i samma konversation, med vägbeskrivning och påminnelse.",
    photo: { src: workshopUrl, small: workshopUrlSmall, alt: "En svart Saab i Maptuns verkstad, kopplad till en effektbänk", position: "50% 60%" },
    start: {
      text: "Hej! Dags för något nytt till bilen? Här är tre av våra tjänster.",
      carousel: [
        { title: "Motoroptimering", body: "Mjukvara anpassad för din bil.", actions: [bookWorkshop, { label: "Läs mer", icon: "open", opens: "maptun.se" }] },
        { title: "Effektmätning", body: "Se kraften på vår bänk.", actions: [bookWorkshop, { label: "Läs mer", icon: "open", opens: "maptun.se" }] },
        { title: "Felsökning", body: "Vi läser av bilens fel.", actions: [bookWorkshop, { label: "Läs mer", icon: "open", opens: "maptun.se" }] },
      ],
    },
  },
  {
    customer: "Nercia",
    company: "NERCIA Utbildning Aktiebolag",
    title: "Välkomstbesked inför kursstart",
    copy: "Tid och plats, en knapp för att tacka ja, och det deltagaren behöver inför första dagen som kort att svepa mellan.",
    photo: { src: courseUrl, small: courseUrlSmall, alt: "Nercias namn tryckt i blått på strukturerat papper", position: "50% 50%", messageAt: "right" },
    start: {
      card: {
        title: "Välkommen till kursen!",
        body: "Vi börjar måndag kl. 9.00. Välkomstfika från 8.30.",
        actions: [{ label: "Jag kommer", next: courseInfo }, map],
      },
    },
  },
  {
    customer: "Bilia",
    company: "Bilia AB",
    title: "Inbjudan med anmälan i meddelandet",
    copy: "Gästen anmäler sig med ett tryck, bokar en provkörning samma kväll och lägger tiden i kalendern.",
    photo: { src: carDealerUrl, small: carDealerUrlSmall, alt: "Bilias skylt på en glasfasad mot en blå himmel", position: "50% 30%" },
    start: {
      card: {
        title: "Välkommen på premiärkväll",
        body: "Se nyheterna torsdag kl. 18.00 hos oss.",
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
  {
    customer: "Big Bowl",
    company: "Big Bowl Sverige AB",
    title: "Boka bana i meddelandet",
    copy: "Kunden väljer tid, lägger till mat och får tiden i kalendern och vägen dit, utan att lämna tråden.",
    photo: { src: bowlingUrl, small: bowlingUrlSmall, alt: "Ett bowlingklot slår ner käglor på en blank bana", position: "50% 50%" },
    start: {
      card: {
        title: "Lediga banor på fredag",
        body: "Bowla med kompisarna eller jobbet. Boka direkt här.",
        actions: [
          {
            label: "Boka bana",
            next: {
              text: "Vilken tid passar?",
              chips: ["18.00", "19.00", "20.00"].map((time) => ({ label: time, next: laneBooked(time) })),
            },
          },
          { label: "Se menyn", icon: "open", opens: "bigbowl.se" },
        ],
      },
    },
  },
  {
    customer: "Kebabfabriken",
    company: "Kebabfabriken AB",
    title: "Kundklubb med kuponger och bonus",
    copy: "Nya medlemmar får en välkomstbonus, och alla får veckans erbjudanden, kuponger och poäng direkt i meddelandet.",
    photo: { src: restaurantUrl, small: restaurantUrlSmall, alt: "Gäster äter i en restaurang med växter och böcker på hyllorna", position: "50% 50%" },
    start: {
      card: {
        title: "Välkommen till kundklubben!",
        body: "Tack för att du gick med. Din välkomstbonus är en gratis dryck vid nästa besök.",
        actions: [
          { label: "Hämta bonusen", next: coupon("gratis dryck", "KF-1001") },
          { label: "Veckans erbjudanden", next: weeklyOffers },
        ],
      },
    },
  },
];
