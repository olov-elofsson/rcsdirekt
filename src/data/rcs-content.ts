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
  theme: "fashion" | "auto" | "delivery" | "property" | "food" | "event";
};

export const campaigns: [Campaign, ...Campaign[]] = [
  { industry: "E-handel", brand: "AERA", headline: "Från inspiration till köp.", copy: "Visa dina produkter, erbjudanden och nyheter direkt i kundens meddelandeapp. Med snygga bilder, knappar och karuseller blir det enklare att inspirera – och få fler affärer.", messageTitle: "Hösten är här.", messageBody: "Upptäck våra nyheter – utvalda för dig.", image: aeraImage, actions: ["Shoppa dam", "Shoppa herr"], theme: "fashion" },
  { industry: "Bil & service", brand: "MOTO", headline: "Från besked till handling.", copy: "Service, provkörning och viktiga besked blir enklare när kunden kan agera direkt i meddelandet.", messageTitle: "Din bil är klar.", messageBody: "Vi är färdiga med servicen och bilen är redo att hämtas.", image: motoImage, actions: ["Boka hämtning", "Hitta hit", "Ring oss"], detail: "Idag · 16:30 · MOTO Örebro", theme: "auto" },
  { industry: "Leverans", brand: "NORDLY", headline: "Från order till dörr.", copy: "Håll kunden uppdaterad hela vägen – och låt dem följa eller ändra leveransen direkt i meddelandet.", messageTitle: "På väg till dig 📦", messageBody: "Din order #48291 har lämnat vårt lager.", image: nordlyImage, actions: ["Följ paketet", "Ändra leverans"], detail: "Beställd ✓  Packad ✓  Skickad ✓", theme: "delivery" },
  { industry: "Mäklare", brand: "HAVN", headline: "Från intresse till visning.", copy: "Visa bostaden, skapa intresse och låt kunden boka visning direkt – utan onödiga mellansteg.", messageTitle: "Ny visning i ditt område", messageBody: "Ekbacksvägen 14, Örebro · Villa · 156 m² · 5 rum", image: havnImage, actions: ["Se bostaden", "Boka visning", "Visa på karta"], detail: "Visning söndag 13:00", theme: "property" },
  { industry: "Restaurang & loyalty", brand: "VELA", headline: "Från kund till stamkund.", copy: "Belöna lojala gäster, fyll lediga bord och skapa anledningar att komma tillbaka.", messageTitle: "Du har något gott att hämta 🎁", messageBody: "Din medlemsbonus är redo.", image: velaImage, actions: ["Använd bonus", "Se menyn", "Boka bord"], detail: "150 BONUSPOÄNG · Gäller till söndag", theme: "food" },
  { industry: "Event", brand: "LUMEN", headline: "Från påminnelse till upplevelse.", copy: "Biljetter, information och praktiska detaljer samlade där kunden redan har dem – i mobilen.", messageTitle: "Ikväll smäller det.", messageBody: "LUMEN LIVE · 19:30 · Din biljett är redo.", image: lumenImage, actions: ["Visa biljett", "Hitta hit", "Lägg i kalender"], theme: "event" },
];

export type Industry = {
  name: string;
  headline: string;
  copy: string;
  examples: string[];
  campaign: Campaign;
};

const industrySeed = [
  ["E-handel", "Från inspiration till köp.", "Visa produkter, lansera nyheter, belöna lojala kunder och följ upp köp – utan att kunden lämnar meddelandeappen.", ["Produktlansering", "Nyheter", "Loyalty", "Orderuppföljning"], 0],
  ["Bil & service", "Från bokning till bättre service.", "Gör varje kontakt enklare – före, under och efter verkstadsbesöket.", ["Provkörning", "Servicepåminnelse", "Bilen är klar", "Personligt erbjudande"], 1],
  ["Leverans", "Full koll, hela vägen.", "Ge tydlig status och låt kunden styra sin leverans direkt i mobilen.", ["Orderbekräftelse", "Paket skickat", "Live-status", "Ändra leverans"], 2],
  ["Mäklare", "Fler visningar. Färre steg.", "Presentera bostäder och gör vägen från intresse till bokning kortare.", ["Ny bostad", "Visningsinbjudan", "Boka visning", "Bud & status"], 3],
  ["Restaurang", "Fyll bord och bygg lojalitet.", "Gör bokning, erbjudanden och återbesök till en naturlig del av dialogen.", ["Boka bord", "Medlemsbonus", "Ny meny", "Personligt erbjudande"], 4],
  ["Event", "Bygg förväntan före start.", "Samla biljetter, påminnelser och praktisk information på ett ställe.", ["Biljett", "Eventpåminnelse", "Praktisk information", "Merförsäljning"], 5],
  ["Resor & hotell", "En smidigare resa börjar i mobilen.", "Förenkla allt från bokning till incheckning och personliga tillval.", ["Bokningsbekräftelse", "Check-in", "Uppgradera rum", "Loyalty"], 3],
  ["Retail", "Gör butik och mobil till en upplevelse.", "Driv besök, köp och lojalitet med relevanta meddelanden.", ["Produktlansering", "Medlemserbjudande", "Kundklubb", "Click & collect"], 0],
  ["Hälsa", "Trygga besked i rätt tid.", "Minska missade tider och gör viktig information lätt att agera på.", ["Bokningsbekräftelse", "Påminnelse", "Ombokning", "Praktisk information"], 4],
  ["Utbildning", "Information som når fram.", "Samla schema, påminnelser och viktiga besked i en tydlig dialog.", ["Kursstart", "Påminnelse", "Schema", "Viktig information"], 5],
  ["Ideell sektor", "När engagemang blir handling.", "Gör det enkelt att delta, bidra och hålla sig uppdaterad.", ["Event", "Medlemskap", "Donation", "Information"], 2],
  ["Fler branscher", "RCS formas efter er vardag.", "Vi hjälper er hitta de tillfällen där en rikare dialog gör mest nytta.", ["Bekräftelse", "Påminnelse", "Erbjudande", "Kunddialog"], 1],
] as const;

export const industries: Industry[] = industrySeed.map(([name, headline, copy, examples, campaignIndex]) => ({
  name,
  headline,
  copy,
  examples: [...examples],
  campaign: campaigns[campaignIndex] ?? campaigns[0],
}));