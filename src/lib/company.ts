// The company behind RCS Direkt, in one place: the footer, /om-oss, /kontakt and the structured
// data all read from here, so the facts never differ between pages.
export const company = {
  brand: "RCS Direkt",
  legalName: "WIGOSE AB",
  orgNumber: "559415-6753",
  street: "Klostergatan 15",
  postalCode: "703 39",
  city: "Örebro",
  country: "SE",
  url: "https://rcsdirekt.se",
  /** Fill in to show them on /kontakt, /om-oss, in the footer and in the structured data. Empty hides them. */
  email: "",
  phone: "",
  linkedin: "",
} as const;

/** The phone number as a tel: link, digits and a leading + only. */
export const phoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/** schema.org Organization with the registered name, organisation number, address and contact page. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${company.url}/#organization`,
  name: company.brand,
  legalName: company.legalName,
  url: `${company.url}/`,
  logo: `${company.url}/icon-512.png`,
  identifier: { "@type": "PropertyValue", propertyID: "Organisationsnummer", value: company.orgNumber },
  address: {
    "@type": "PostalAddress",
    streetAddress: company.street,
    postalCode: company.postalCode,
    addressLocality: company.city,
    addressCountry: company.country,
  },
  areaServed: { "@type": "Country", name: "Sverige" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${company.url}/kontakt`,
    availableLanguage: ["sv"],
    ...(company.email ? { email: company.email } : {}),
    ...(company.phone ? { telephone: company.phone } : {}),
  },
  ...(company.linkedin ? { sameAs: [company.linkedin] } : {}),
};
