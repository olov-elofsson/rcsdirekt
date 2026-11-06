import nerciaLogo from "@/assets/company-logos/nercia.png.asset.json";
import maptunLogo from "@/assets/company-logos/maptun.png.asset.json";
import biliaLogo from "@/assets/company-logos/bilia.svg.asset.json";
import bigBowlLogo from "@/assets/company-logos/big-bowl.svg.asset.json";

export const rcsCaseExamples = [
  {
    company: "Nercia",
    logo: nerciaLogo.url,
    industry: "Utbildning",
    metric: "+32 %",
    benefit: "fler bekräftade kursplatser",
    description: "Kursinformation och en tydlig bekräftelseknapp kan göra det enklare att tacka ja inför kursstart.",
    detail: "Ett tänkbart upplägg: skicka en välkomsthälsning med kursbild, tid och plats. Knappar för att bekräfta deltagande och se vägbeskrivningen gör nästa steg tydligt. Deltagaren kan svara direkt med frågor inför kursstart.",
  },
  {
    company: "Maptun",
    logo: maptunLogo.url,
    industry: "Bil & tillbehör",
    metric: "+44 %",
    benefit: "fler klick till produkterna",
    description: "Produktbilder och knappar direkt till rätt tillbehör kan förkorta vägen från intresse till köp.",
    detail: "Ett tänkbart upplägg: presentera utvalda tillbehör i en karusell med produktbilder och en knapp till varje produkt. Efter köpet kan en orderuppdatering samla leveransinformation och kontaktväg i samma tråd.",
  },
  {
    company: "Bilia",
    logo: biliaLogo.url,
    industry: "Bil & service",
    metric: "−25 %",
    benefit: "färre missade servicetider",
    description: "En servicepåminnelse med knappar för att bekräfta eller boka om kan göra det lättare att hålla tiden.",
    detail: "Ett tänkbart upplägg: skicka en servicepåminnelse med tid, verkstad och vägbeskrivning. Knappar för att bekräfta tiden eller boka om gör nästa steg enkelt. Kunden kan ställa frågor direkt i samma tråd.",
  },
  {
    company: "Big Bowl",
    logo: bigBowlLogo.url,
    industry: "Bowling & upplevelser",
    metric: "+28 %",
    benefit: "fler bokningar från utskick",
    description: "Ett erbjudande med bild, lediga tider och bokningsknapp kan göra det enklare att samla gänget.",
    detail: "Ett tänkbart upplägg: skicka ett erbjudande med bild, tider och en bokningsknapp. Inför besöket kan en påminnelse visa bokningsuppgifter och vägbeskrivning. Mottagaren får en enkel kontaktväg för frågor.",
  },
] as const;