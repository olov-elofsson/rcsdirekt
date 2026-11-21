// Illustrative RCS conversations for our customer cases, laid over the cases' photos on the start
// page. They are possible set-ups, not measured customer results, and the section labels each one
// "Exempel för …". Keep them in line with the case descriptions in the CMS.
import careUrl from "@/assets/foto-omsorg.webp";
import workshopUrl from "@/assets/foto-verkstad.webp";
import courseUrl from "@/assets/foto-utbildning.webp";
import carDealerUrl from "@/assets/foto-bilhandel.webp";

/**
 * A button in a message. A reply sends its label as the recipient's answer, and the business
 * answers with `next`. An action with an icon only opens something (`opens`) and sends nothing,
 * as in RCS.
 */
export type Choice = { label: string; icon?: string; opens?: string; next?: Step };

export type Card = { title: string; body: string; image?: string; imageIcon?: string; actions: Choice[] };

/** One message from the business: text, a rich card or a carousel, with suggestions under it. */
export type Step = { text?: string; card?: Card; carousel?: Card[]; chips?: Choice[] };

export type Scenario = {
  /** The customer case: shown as "Exempel för …" and as the sender. */
  customer: string;
  title: string;
  copy: string;
  /** The RCS features the conversation shows, listed in the text card. */
  features: string[];
  photo: { src: string; alt: string; position?: string };
  start: Step;
};

const calendar: Choice = { label: "Lägg i kalendern", icon: "event", opens: "kalendern" };

export const scenarios: Scenario[] = [
  {
    customer: "DreamCare",
    title: "Påminnelser som går att svara på",
    copy: "Kunden bekräftar besöket eller väljer en ny tid med ett tryck, och svaret kommer fram till er i stället för till en telefonkö.",
    features: ["Förslag att svara med", "Ny tid i två steg", "Lägg i kalendern"],
    photo: { src: careUrl, alt: "En ung kvinna och en äldre kvinna skrattar tillsammans i en soffa hemma", position: "50% 35%" },
    start: {
      text: "Hej Inga! Vi kommer på besök i morgon kl. 10.00. Passar tiden?",
      chips: [
        { label: "Ja, det passar", next: { text: "Tack! Vi ses i morgon kl. 10.00.", chips: [calendar] } },
        {
          label: "Boka om",
          next: {
            text: "Inga problem. Vilken tid passar bättre?",
            chips: [
              { label: "Ons 10.00", next: { text: "Klart! Vi kommer onsdag kl. 10.00.", chips: [calendar] } },
              { label: "Tor 13.00", next: { text: "Klart! Vi kommer torsdag kl. 13.00.", chips: [calendar] } },
            ],
          },
        },
      ],
    },
  },
  {
    customer: "Maptun",
    title: "Tillbehör att svepa mellan",
    copy: "En karusell med utvalda tillbehör och en knapp till varje produkt. Montering bokas direkt i samma konversation.",
    features: ["Karusell med kort", "Knapp till rätt produkt", "Bokning i chatten"],
    photo: { src: workshopUrl, alt: "En svart Saab i Maptuns verkstad, kopplad till en effektbänk", position: "50% 60%" },
    start: {
      text: "Hej! Här är tre populära tillbehör till din bil.",
      carousel: [
        { title: "Motoroptimering", body: "Mer kraft, samma bil.", imageIcon: "trendingUp", actions: [{ label: "Läs mer", icon: "open", opens: "maptun.se" }] },
        { title: "Sportluftfilter", body: "Byts på en timme.", imageIcon: "layers", actions: [{ label: "Läs mer", icon: "open", opens: "maptun.se" }] },
        { title: "Avgassystem", body: "Rostfritt stål.", imageIcon: "sparkles", actions: [{ label: "Läs mer", icon: "open", opens: "maptun.se" }] },
      ],
      chips: [
        {
          label: "Boka montering",
          next: {
            text: "Vi har lediga tider i verkstaden. Vilken dag passar?",
            chips: [
              { label: "Tisdag", next: { text: "Bokat tisdag kl. 8.00. Lämna bilen när du vill från 7.30.", chips: [calendar] } },
              { label: "Torsdag", next: { text: "Bokat torsdag kl. 8.00. Lämna bilen när du vill från 7.30.", chips: [calendar] } },
            ],
          },
        },
      ],
    },
  },
  {
    customer: "Nercia",
    title: "Välkomstbesked inför kursstart",
    copy: "Tid, plats och en tydlig knapp för att tacka ja. Den som vill får en påminnelse dagen innan.",
    features: ["Kort med bild", "Följdfråga", "Vägbeskrivning"],
    photo: { src: courseUrl, alt: "Nercias namn tryckt i blått på strukturerat papper", position: "50% 50%" },
    start: {
      card: {
        title: "Välkommen till kursen!",
        body: "Vi börjar måndag kl. 9.00. Välkomstfika från 8.30.",
        image: courseUrl,
        actions: [
          {
            label: "Jag kommer",
            next: {
              text: "Toppen! Vill du ha en påminnelse dagen innan?",
              chips: [
                { label: "Ja tack", next: { text: "Då skickar vi en påminnelse på söndag. Vi ses!" } },
                { label: "Nej tack", next: { text: "Okej, vi ses på måndag!" } },
              ],
            },
          },
          { label: "Visa vägen", icon: "open", opens: "kartan" },
        ],
      },
    },
  },
  {
    customer: "Bilia",
    title: "Inbjudan med anmälan i meddelandet",
    copy: "En bild på nyheten och en anmälningsknapp. Gästen svarar hur många som kommer, och kvällen hamnar i kalendern.",
    features: ["Kort med bild", "Anmälan i två steg", "Lägg i kalendern"],
    photo: { src: carDealerUrl, alt: "Bilias skylt på en glasfasad mot en blå himmel", position: "50% 30%" },
    start: {
      card: {
        title: "Välkommen på premiärkväll",
        body: "Se nyheterna torsdag kl. 18.00 hos oss.",
        image: carDealerUrl,
        actions: [
          {
            label: "Anmäl mig",
            next: {
              text: "Kul! Hur många kommer ni?",
              chips: ["1", "2", "3 eller fler"].map((count) => ({
                label: count,
                next: { text: "Du är anmäld! Vi ses torsdag kl. 18.00.", chips: [calendar] },
              })),
            },
          },
          { label: "Läs mer", icon: "open", opens: "bilia.se" },
        ],
      },
    },
  },
];
