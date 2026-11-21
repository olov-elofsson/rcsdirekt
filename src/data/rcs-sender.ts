import bannerUrl from "../../brand/SVG/rcs-banner.svg";
import logoUrl from "../../brand/SVG/rcs-avsandare.svg";
import type { SenderProfile } from "@/components/RcsPhone";

/** RCS Direkt as the sender in the site's phones: logo, description and business profile. */
export const rcsDirektSender = {
  sender: "RCS Direkt",
  logo: logoUrl,
  description: "Skicka RCS direkt från webben eller via API.",
  profile: {
    banner: bannerUrl,
    // Only contact routes that exist; add phone or e-mail here when there is one to publish.
    contacts: [
      { icon: "globe", value: "rcsdirekt.se", label: "Webbplats", href: "/" },
      { icon: "open", value: "portal.rcsdirekt.se", label: "Kundportal", href: "https://portal.rcsdirekt.se/login" },
    ],
  } satisfies SenderProfile,
};
