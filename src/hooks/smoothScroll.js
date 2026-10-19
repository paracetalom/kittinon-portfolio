let frame = 0;

/** Scrolls the window to an element slowly (ease in-out). Wheel, touch or key input cancels it. It also runs with reduced motion: the visitor asked for it with a click. */
export function slowScrollTo(el, duration = 2400) {
  const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const target = Math.max(0, el.getBoundingClientRect().top + window.scrollY - pad);
  cancelAnimationFrame(frame);

  const from = window.scrollY;
  const dist = target - from;
  // longer trips take a bit longer, but never less than 1.2s or more than 3s
  const ms = Math.min(3000, Math.max(1200, duration * Math.min(1, Math.abs(dist) / 2400 + 0.4)));
  const start = performance.now();
  const html = document.documentElement;
  html.style.scrollBehavior = "auto";

  const stop = () => {
    cancelAnimationFrame(frame);
    html.style.scrollBehavior = "";
    ["wheel", "touchstart", "keydown"].forEach((t) => window.removeEventListener(t, stop));
  };
  ["wheel", "touchstart", "keydown"].forEach((t) => window.addEventListener(t, stop, { passive: true }));

  const step = (now) => {
    const t = Math.min(1, (now - start) / ms);
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    window.scrollTo(0, from + dist * e);
    if (t < 1) frame = requestAnimationFrame(step);
    else stop();
  };
  frame = requestAnimationFrame(step);
}
