import { BadgeCheck, Send, UserPlus } from "lucide-react";

/** How a company gets started, shown on the start page and beside the sign-up form. */
export const STEPS = [
  { Icon: UserPlus, title: "Skapa ett konto", copy: "Berätta vilka ni är och vad ni vill skicka. Vi aktiverar kontot och hör av oss med nästa steg." },
  { Icon: BadgeCheck, title: "Registrera avsändare", copy: "Ni skickar företagsnamn, logotyp och en kort beskrivning. Vi registrerar avsändaren, och den kontrolleras innan den får skicka." },
  { Icon: Send, title: "Skicka första utskicket", copy: "Bygg meddelandet i webbverktyget eller koppla in ert system via API. Ni betalar för de meddelanden som skickas." },
];
