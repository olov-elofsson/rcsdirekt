/**
 * Shared type styles for section introductions, so every section on every page has the same
 * heading size, intro width and spacing.
 */

/** A section heading. The negative margin aligns Archivo's capitals optically with the text below. */
export const sectionTitle =
  "-ml-[0.05em] max-w-3xl text-[2.1rem] font-extrabold leading-[1.1] sm:text-[2.65rem]";

/** The same heading, centred. */
export const sectionTitleCentered = "mx-auto max-w-3xl text-center text-[2.1rem] font-extrabold leading-[1.1] sm:text-[2.65rem]";

/** The short paragraph under a section heading: about 65 characters per line. */
export const sectionIntro = "mt-4 max-w-[34rem] text-base leading-relaxed text-pretty text-muted-foreground sm:text-[17px]";

/** Space between a section's introduction and its content. */
export const sectionBody = "mt-10 sm:mt-12";
