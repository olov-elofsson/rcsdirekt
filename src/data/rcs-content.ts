import aeraImage from "@/assets/aera-fashion.jpg";
import motoImage from "@/assets/moto-car.jpg";
import nordlyImage from "@/assets/nordly-package.jpg";
import havnImage from "@/assets/havn-home.jpg";
import velaImage from "@/assets/vela-food.jpg";
import lumenImage from "@/assets/lumen-event.jpg";

export type Campaign = {
  industry: string;
  brand: string;
  headline: string;
  copy: string;
  messageTitle: string;
  messageBody: string;
  image: string;
  actions: string[];
  detail?: string;
  meta?: string[];
  theme: "fashion" | "auto" | "delivery" | "property" | "food" | "event";
};

export const campaigns: [Campaign, ...Campaign[]] = [
  { industry: "E-handel", brand: "AERA", headline: "Visa och sälj produkter", copy: "Skicka produktbilder, erbjudanden och köpknappar direkt till kunden.", messageTitle: "Hösten är här", messageBody: "Upptäck våra nyheter, utvalda för dig.", image: aeraImage, actions: ["Shoppa dam", "Shoppa herr", "Se fler"], meta: ["Nyheter", "Dam", "Herr"], theme: "fashion" },
  { industry: "Bil & service", brand: "MOTO", headline: "Boka och ge besked", copy: "Bekräfta service, erbjud provkörning och låt kunden boka en tid direkt.", messageTitle: "Din bil är klar", messageBody: "Vi är färdiga med servicen och bilen är redo att hämtas.", image: motoImage, actions: ["Boka hämtning", "Hitta hit", "Ring oss"], detail: "Idag · 16:30 · MOTO Örebro", meta: ["Service klar", "Redo att hämtas"], theme: "auto" },
  { industry: "Leverans", brand: "NORDLY", headline: "Följ varje leverans", copy: "Visa aktuell status och låt kunden följa eller ändra leveransen.", messageTitle: "På väg till dig 📦", messageBody: "Din order #48291 har lämnat vårt lager.", image: nordlyImage, actions: ["Följ paketet", "Ändra leverans"], detail: "Levereras imorgon", meta: ["Beställd", "Packad", "Skickad", "Leverans"], theme: "delivery" },
  { industry: "Mäklare", brand: "HAVN", headline: "Visa och boka bostäder", copy: "Presentera bostaden och låt kunden boka en visning i samma meddelande.", messageTitle: "Ny visning i ditt område", messageBody: "Ekbacksvägen 14, Örebro", image: havnImage, actions: ["Se bostaden", "Boka visning", "Visa på karta"], detail: "Visning söndag 13:00", meta: ["Villa", "156 m²", "5 rum"], theme: "property" },
  { industry: "Restaurang & loyalty", brand: "VELA", headline: "Boka bord och ge bonus", copy: "Fyll lediga bord och ge medlemmar erbjudanden som går att använda direkt.", messageTitle: "Du har något gott att hämta 🎁", messageBody: "Din medlemsbonus är redo.", image: velaImage, actions: ["Använd bonus", "Se meny", "Boka bord"], detail: "Gäller till söndag", meta: ["150", "BONUSPOÄNG"], theme: "food" },
  { industry: "Event", brand: "LUMEN", headline: "Samla allt inför eventet", copy: "Skicka biljett, starttid, vägbeskrivning och påminnelser i ett meddelande.", messageTitle: "Ikväll smäller det", messageBody: "LUMEN LIVE · Din biljett är redo.", image: lumenImage, actions: ["Visa biljett", "Hitta hit", "Lägg i kalender"], detail: "19:30 · Entré B", meta: ["24 SEP", "19:30", "ENTRÉ B"], theme: "event" },
];

export type Industry = {
  name: string;
  headline: string;
  copy: string;
  examples: string[];
  campaign: Campaign;
};

const industrySeed = [
  ["E-handel", "Visa och sälj produkter", "Skicka produktbilder, erbjudanden och köpknappar direkt till kunden.", ["Produktlansering", "Nyheter", "Loyalty", "Orderuppföljning"], 0],
  ["Bil & service", "Boka och ge besked", "Bekräfta service, erbjud provkörning och låt kunden boka en tid direkt.", ["Provkörning", "Servicepåminnelse", "Bilen är klar", "Personligt erbjudande"], 1],
  ["Leverans", "Följ varje leverans", "Visa aktuell status och låt kunden ändra leveransen i mobilen.", ["Orderbekräftelse", "Paket skickat", "Live-status", "Ändra leverans"], 2],
  ["Mäklare", "Visa och boka bostäder", "Presentera bostaden och låt kunden boka en visning direkt.", ["Ny bostad", "Visningsinbjudan", "Boka visning", "Bud & status"], 3],
  ["Restaurang", "Boka bord och ge bonus", "Skicka erbjudanden, ta emot bokningar och visa medlemsbonus.", ["Boka bord", "Medlemsbonus", "Ny meny", "Personligt erbjudande"], 4],
  ["Event", "Samla allt inför eventet", "Skicka biljett, starttid, vägbeskrivning och påminnelser.", ["Biljett", "Eventpåminnelse", "Praktisk information", "Merförsäljning"], 5],
  ["Resor & hotell", "Hjälp gästen hela vägen", "Skicka bokning, incheckning och tillval direkt till mobilen.", ["Bokningsbekräftelse", "Check-in", "Uppgradera rum", "Loyalty"], 3],
  ["Retail", "Få fler besök och köp", "Visa produkter, medlemserbjudanden och information om hämtning.", ["Produktlansering", "Medlemserbjudande", "Kundklubb", "Click & collect"], 0],
  ["Hälsa", "Minska missade tider", "Bekräfta, påminn och låt patienten boka om direkt.", ["Bokningsbekräftelse", "Påminnelse", "Ombokning", "Praktisk information"], 4],
  ["Utbildning", "Samla viktig information", "Skicka schema, påminnelser och besked i samma dialog.", ["Kursstart", "Påminnelse", "Schema", "Viktig information"], 5],
  ["Ideell sektor", "Gör det enkelt att delta", "Skicka information om event, medlemskap och donationer.", ["Event", "Medlemskap", "Donation", "Information"], 2],
  ["Fler branscher", "Anpassa RCS efter er vardag", "Vi hjälper er hitta rätt meddelanden att börja med.", ["Bekräftelse", "Påminnelse", "Erbjudande", "Kunddialog"], 1],
] as const;

export const industries: Industry[] = industrySeed.map(([name, headline, copy, examples, campaignIndex]) => ({
  name,
  headline,
  copy,
  examples: [...examples],
  campaign: campaigns[campaignIndex] ?? campaigns[0],
}));