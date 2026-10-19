import { useEffect } from "react";

// Page colour at the top of each section: bg, bg-2, surface. It drifts from one to the next while scrolling and
// fades slowly to black across the whole Projects section, arriving at Contact.
const stops = [
  { id: "home", c: [[230, 230, 226], [218, 218, 213], [242, 242, 238]] },
  { id: "about", c: [[211, 224, 247], [196, 212, 241], [230, 238, 251]] },
  { id: "skills", c: [[246, 211, 236], [239, 194, 226], [251, 230, 244]] },
  { id: "projects", c: [[230, 230, 226], [218, 218, 213], [242, 242, 238]] },
  { id: "contact", c: [[10, 10, 16], [20, 20, 29], [21, 21, 31]] },
];
const names = ["--bg", "--bg-2", "--surface"];

const lum = ([r, g, b]) => {
  const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

export function usePageTone() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    let last = "";

    const update = () => {
      raf = 0;
      const y = window.scrollY + window.innerHeight * 0.5; // the line across the middle of the screen
      const pts = stops
        .map((s) => {
          const el = document.getElementById(s.id);
          return el ? { y: s.id === "home" ? 0 : el.getBoundingClientRect().top + window.scrollY, c: s.c } : null;
        })
        .filter(Boolean);
      if (!pts.length) return;
      let i = pts.length - 1;
      while (i > 0 && y < pts[i].y) i--;
      const a = pts[i];
      const b = pts[Math.min(i + 1, pts.length - 1)];
      const t = b.y > a.y ? Math.min(1, Math.max(0, (y - a.y) / (b.y - a.y))) : 0;
      const mixed = a.c.map((col, k) => col.map((v, j) => Math.round(v + (b.c[k][j] - v) * t)));
      const key = mixed.flat().join(",");
      if (key === last) return;
      last = key;
      names.forEach((n, k) => root.style.setProperty(n, `rgb(${mixed[k].join(" ")})`));
      const dark = lum(mixed[0]) < 0.18;
      if (dark !== (root.dataset.tone === "dark")) {
        if (dark) root.dataset.tone = "dark";
        else delete root.dataset.tone;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}
