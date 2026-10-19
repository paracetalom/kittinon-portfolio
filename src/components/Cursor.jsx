import { useEffect, useRef } from "react";

/**
 * The site's own mouse pointer: a lime dot everywhere, a bigger ring over links and buttons, and a label over
 * anything marked data-cursor="Label". Only for devices with a mouse; touch screens keep their normal behaviour.
 * The real pointer is hidden while this one is running, except over the enlarged-picture dialog and videos.
 */
export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const root = document.documentElement;
    let raf = 0;
    let x = 0;
    let y = 0;
    let mode = "";
    let label = "";

    const paint = () => {
      raf = 0;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const setMode = (next, text = "") => {
      if (next !== mode) {
        mode = next;
        el.dataset.mode = next;
        root.classList.toggle("has-cursor", next !== "off");
      }
      if (text !== label) {
        label = text;
        el.querySelector(".cursor-body").textContent = text;
      }
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target;
      if (!t || !t.closest || t.tagName === "IFRAME") {
        setMode("off");
      } else {
        const tagged = t.closest("[data-cursor]");
        if (tagged) setMode("label", tagged.getAttribute("data-cursor"));
        else if (t.closest("a, button, summary, [role='button']")) setMode("link");
        else setMode("dot");
      }
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onDown = () => el.classList.add("press");
    const onUp = () => el.classList.remove("press");
    const hide = () => setMode("off");

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor");
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" data-mode="off" aria-hidden="true">
      <span className="cursor-body" />
    </div>
  );
}
