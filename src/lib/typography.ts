/**
 * Shared type styles for section introductions, so every section on every page has the same
 * heading size, intro width and spacing.
 */

/** A section heading. The negative margin aligns Archivo's capitals optically with the text below. */
// A short blue bar sits over every section heading, as over the hero's. It starts at the text's
// edge (the 0.05em pulls only the letters, so the bar gets the margin back).
const accentBar = "before:mb-5 before:block before:h-1 before:w-12 before:rounded-full before:bg-logo-blue before:content-['']";

export const sectionTitle =
  `-ml-[0.05em] max-w-3xl text-[2.1rem] font-extrabold leading-[1.1] sm:text-[2.65rem] ${accentBar} before:ml-[0.05em]`;

/** The same heading, centred. */
export const sectionTitleCentered = `mx-auto max-w-3xl text-center text-[2.1rem] font-extrabold leading-[1.1] sm:text-[2.65rem] ${accentBar} before:mx-auto`;

/** The short paragraph under a section heading: about 65 characters per line. */
export const sectionIntro = "mt-4 max-w-[34rem] text-base leading-relaxed text-pretty text-muted-foreground sm:text-[17px]";

/** Space between a section's introduction and its content. */
export const sectionBody = "mt-10 sm:mt-12";
