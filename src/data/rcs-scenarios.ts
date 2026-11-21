// Illustrative RCS messages over photos on the start page. They are examples, not customer
// results, and the section labels them so. The photos come from customer cases in the CMS.
import careUrl from "@/assets/foto-omsorg.webp";
import workshopUrl from "@/assets/foto-verkstad.webp";

export type Scenario = {
  /** Shown as "Exempel: …" on the photo. */
  label: string;
  title: string;
  copy: string;
  photo: { src: string; alt: string; position?: string };
  message:
    | { kind: "bubble"; sender: string; text: string; chips: string[] }
    | { kind: "card"; sender: string; title: string; body: string; actions: { label: string; icon?: string }[] };
};

export const scenarios: Scenario[] = [
  {
    label: "omsorg",
    title: "Påminnelser som går att svara på",
    copy: "Mottagaren bekräftar eller bokar om med ett tryck, och svaret hamnar hos er i stället för i en telefonkö.",
    photo: { src: careUrl, alt: "En ung kvinna och en äldre kvinna skrattar tillsammans i en soffa hemma", position: "50% 35%" },
    message: { kind: "bubble", sender: "Hemtjänsten", text: "Hej Inga! Vi kommer på besök i morgon kl. 10.00. Passar tiden?", chips: ["Ja, det passar", "Boka om"] },
  },
  {
    label: "verkstad",
    title: "Besked med nästa steg i samma meddelande",
    copy: "Bilen är klar, och i meddelandet finns vägbeskrivning, öppettider och ett nummer att ringa.",
    photo: { src: workshopUrl, alt: "En svart bil i en verkstad, kopplad till en effektbänk", position: "50% 60%" },
    message: {
      kind: "card",
      sender: "Verkstaden",
      title: "Din bil är klar för hämtning",
      body: "Vi har öppet till 18.00 i dag.",
      actions: [
        { label: "Visa vägen", icon: "open" },
        { label: "Ring verkstaden", icon: "call" },
      ],
    },
  },
];
