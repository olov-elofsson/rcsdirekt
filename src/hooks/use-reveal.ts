import { useEffect, useState } from "react";

/**
 * Marks `[data-reveal]` elements inside the page as shown once they scroll into view, so the
 * CSS in styles.css can fade them up. Returns true once it runs; until then nothing is hidden,
 * so the page reads fine without JavaScript and for crawlers.
 */
export function useReveal(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (!("IntersectionObserver" in window) || elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    for (const element of elements) {
      // Anything already on screen stays as it is; only what is still below the fold animates.
      if (element.getBoundingClientRect().top < window.innerHeight) element.setAttribute("data-shown", "");
      else observer.observe(element);
    }
    setReady(true);
    return () => observer.disconnect();
  }, []);
  return ready;
}
