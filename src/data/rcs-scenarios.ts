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
    | { kind: "bubble"; text: string; chips: string[] }
    | { kind: "card"; title: string; body: string; actions: { label: string; icon?: string }[] };
};

export const scenarios: Scenario[] = [
  {
    customer: "DreamCare",
    title: "Påminnelser som går att svara på",
    copy: "Kunden bekräftar besöket eller bokar om med ett tryck, och svaret kommer fram till er i stället för till en telefonkö.",
    photo: { src: careUrl, alt: "En ung kvinna och en äldre kvinna skrattar tillsammans i en soffa hemma", position: "50% 35%" },
    message: { kind: "bubble", text: "Hej Inga! Vi kommer på besök i morgon kl. 10.00. Passar tiden?", chips: ["Ja, det passar", "Boka om"] },
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
        { label: "Se tillbehören", icon: "open" },
        { label: "Boka montering", icon: "event" },
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
        { label: "Jag kommer" },
        { label: "Visa vägen", icon: "open" },
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
        { label: "Anmäl mig", icon: "event" },
        { label: "Läs mer", icon: "open" },
      ],
    },
  },
];
