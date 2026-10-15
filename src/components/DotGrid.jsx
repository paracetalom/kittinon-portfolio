import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/useReveal";

/**
 * A quiet dot grid behind the hero. Dots near the pointer brighten and grow slightly.
 * It only animates while the pointer moves over the hero and while the hero is on screen,
 * and it is drawn once (static) when the visitor prefers reduced motion or has no pointer.
 */
export default function DotGrid() {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    const gap = 30;
    const radius = 150;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let x = gap / 2; x < width; x += gap) {
        for (let y = gap / 2; y < height; y += gap) {
          let near = 0;
          if (pointer.active) {
            const d = Math.hypot(x - pointer.x, y - pointer.y);
            near = Math.max(0, 1 - d / radius);
          }
          const r = 1 + near * 1.8;
          ctx.fillStyle = near > 0 ? `rgba(114, 216, 234, ${0.16 + near * 0.7})` : "rgba(140, 170, 255, 0.16)";
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const schedule = () => {
      if (raf || reduced || !visible) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        draw();
      });
    };

    const onMove = (e) => {
      const rect = parent.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      schedule();
    };
    const onLeave = () => {
      pointer.active = false;
      schedule();
    };

    resize();
    window.addEventListener("resize", resize);
    let observer;
    if (!reduced) {
      parent.addEventListener("pointermove", onMove);
      parent.addEventListener("pointerleave", onLeave);
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
        });
        observer.observe(parent);
      }
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      observer && observer.disconnect();
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="dotgrid" aria-hidden="true" />;
}
