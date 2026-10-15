import { useEffect, useLayoutEffect, useRef, useState } from "react";
import profile from "../data/profile";
import { sections } from "../data/sections";
import "../styles/nav.css";

export default function Nav({ active, progress, scrolled }) {
  const [open, setOpen] = useState(false);
  const listRef = useRef(null);
  const [marker, setMarker] = useState({ left: 0, width: 0, ready: false });

  // Slide an underline under the active link.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const link = list.querySelector(`a[data-id="${active}"]`);
    if (!link || link.offsetParent === null) return setMarker((m) => ({ ...m, ready: false }));
    setMarker({ left: link.offsetLeft, width: link.offsetWidth, ready: true });
  }, [active, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}${open ? " open" : ""}`}>
      <div className="nav-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <nav className="nav-inner" aria-label="Main navigation">
        <a href="#home" className="nav-logo" aria-label={`${profile.name}, back to top`}>
          <span className="nav-logo-mark">{profile.initials}</span>
          <span className="nav-logo-text">{profile.firstName}</span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="nav-toggle-bars" aria-hidden="true" />
        </button>

        <ul id="nav-links" className="nav-links" ref={listRef}>
          {sections.map(({ id, label }, i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                data-id={id}
                className={active === id ? "active" : undefined}
                aria-current={active === id ? "location" : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="nav-num" aria-hidden="true">
                  {String(i).padStart(2, "0")}
                </span>
                {label}
              </a>
            </li>
          ))}
          <li className="nav-resume">
            <a href={profile.resume} download="Resume.pdf" className="nav-resume-link">
              Resume
              <span aria-hidden="true"> ↓</span>
            </a>
          </li>
          <span
            className="nav-marker"
            aria-hidden="true"
            style={{ transform: `translateX(${marker.left}px)`, width: marker.width, opacity: marker.ready ? 1 : 0 }}
          />
        </ul>
      </nav>
    </header>
  );
}
