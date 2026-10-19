import { useEffect, useRef, useState } from "react";

const hasObserver = () => typeof window !== "undefined" && "IntersectionObserver" in window;

/**
 * Becomes true once the element has scrolled into view. With `repeat` it follows the element: false again when it
 * leaves the screen, true when it comes back. Without IntersectionObserver it starts visible.
 */
export function useInView(options = { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }, repeat = false) {
  const ref = useRef(null);
  const [inView, setInView] = useState(() => !hasObserver());

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasObserver()) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!repeat) observer.disconnect();
        } else if (repeat) {
          setInView(false);
        }
      });
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
