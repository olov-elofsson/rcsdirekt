import { BadgeCheck, Send, UserPlus } from "lucide-react";

/** How a company gets started, shown on the start page and beside the sign-up form. */
export const STEPS = [
  { Icon: UserPlus, title: "Skapa ett konto", copy: "Berätta vilka ni är och vad ni vill skicka. Vi aktiverar kontot." },
  { Icon: BadgeCheck, title: "Registrera avsändare", copy: "Skicka namn, logotyp och en kort beskrivning. Avsändaren kontrolleras innan den får skicka." },
  { Icon: Send, title: "Skicka första utskicket", copy: "Bygg meddelandet i webbverktyget eller koppla in ert system via API." },
];
