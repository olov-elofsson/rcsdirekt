import { useEffect, useRef, useState, type RefObject } from "react";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * An SMS/RCS switch (starting on RCS when `startWithRcs` is set) that flips by itself every `interval` ms while `ref` is on screen, and stops
 * for good once the visitor picks a side (`pick`) or otherwise takes over (`touch`). With reduced
 * motion it simply shows RCS.
 */
export function useAutoToggle(ref: RefObject<HTMLElement | null>, interval = 3600, startWithRcs = false) {
  const [rcs, setRcs] = useState(startWithRcs);
  const touched = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion()) {
      setRcs(true);
      return;
    }
    let timer: number | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (!entry?.isIntersecting || touched.current) return;
      timer = window.setInterval(() => {
        if (touched.current) window.clearInterval(timer);
        else setRcs((value) => !value);
      }, interval);
    }, { threshold: 0.4 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [ref, interval]);

  const touch = () => { touched.current = true; };
  const pick = (value: boolean) => {
    touch();
    setRcs(value);
  };
  return { rcs, pick, touch };
}
