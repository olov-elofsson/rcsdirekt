// Illustrative RCS messages for our customer cases, laid over the cases' photos on the start
// page. They are possible set-ups, not measured customer results, and the section labels each
// one "Exempel för …". Keep them in line with the case descriptions in the CMS.
import careUrl from "@/assets/foto-omsorg.webp";
import workshopUrl from "@/assets/foto-verkstad.webp";
import courseUrl from "@/assets/foto-utbildning.webp";
import carDealerUrl from "@/assets/foto-bilhandel.webp";

export type Scenario = {
  /** The customer case: shown as "Exempel för …" and as the sender. */
  customer: string;
  title: string;
  copy: string;
  photo: { src: string; alt: string; position?: string };
  message:
    | { kind: "bubble"; text: string; chips: Choice[] }
    | { kind: "card"; title: string; body: string; actions: Choice[] };
};

/**
 * A button in the message. A reply (`reply`) is sent as the recipient's answer and the business
 * answers; an action with an icon opens something (`opens`) and sends nothing, as in RCS.
 */
export type Choice = { label: string; icon?: string; reply?: string; opens?: string };

export const scenarios: Scenario[] = [
  {
    customer: "DreamCare",
    title: "Påminnelser som går att svara på",
    copy: "Kunden bekräftar besöket eller bokar om med ett tryck, och svaret kommer fram till er i stället för till en telefonkö.",
    photo: { src: careUrl, alt: "En ung kvinna och en äldre kvinna skrattar tillsammans i en soffa hemma", position: "50% 35%" },
    message: {
      kind: "bubble",
      text: "Hej Inga! Vi kommer på besök i morgon kl. 10.00. Passar tiden?",
      chips: [
        { label: "Ja, det passar", reply: "Tack! Vi ses i morgon kl. 10.00." },
        { label: "Boka om", reply: "Inga problem. Vilken dag passar bättre?" },
      ],
    },
  },
  {
    customer: "Maptun",
    title: "Tillbehör med en knapp till rätt produkt",
    copy: "Bilder på utvalda tillbehör och en knapp till varje produkt kan korta vägen från intresse till köp.",
    photo: { src: workshopUrl, alt: "En svart Saab i Maptuns verkstad, kopplad till en effektbänk", position: "50% 60%" },
    message: {
      kind: "card",
      title: "Utvalda tillbehör till din bil",
      body: "Se bilder och pris direkt i meddelandet.",
      actions: [
        { label: "Se tillbehören", icon: "open", opens: "maptun.se" },
        { label: "Boka montering", reply: "Vi har lediga tider tisdag och torsdag. Vilken dag passar dig?" },
      ],
    },
  },
  {
    customer: "Nercia",
    title: "Välkomstbesked inför kursstart",
    copy: "Tid, plats och en tydlig knapp för att tacka ja gör det enklare att komma till första kursdagen.",
    photo: { src: courseUrl, alt: "Nercias namn tryckt i blått på strukturerat papper", position: "50% 50%" },
    message: {
      kind: "card",
      title: "Välkommen till kursen!",
      body: "Vi börjar måndag kl. 9.00. Välkomstfika från 8.30.",
      actions: [
        { label: "Jag kommer", reply: "Toppen! Vi ses på måndag." },
        { label: "Visa vägen", icon: "open", opens: "kartan" },
      ],
    },
  },
  {
    customer: "Bilia",
    title: "Inbjudan med anmälan i meddelandet",
    copy: "En bild på nyheten och en anmälningsknapp kan göra det enklare att säga ja till premiärkvällen.",
    photo: { src: carDealerUrl, alt: "Bilias skylt på en glasfasad mot en blå himmel", position: "50% 30%" },
    message: {
      kind: "card",
      title: "Välkommen på premiärkväll",
      body: "Se nyheterna torsdag kl. 18.00 hos oss.",
      actions: [
        { label: "Anmäl mig", reply: "Du är anmäld! Vi påminner dig dagen innan." },
        { label: "Läs mer", icon: "open", opens: "bilia.se" },
      ],
    },
  },
];
