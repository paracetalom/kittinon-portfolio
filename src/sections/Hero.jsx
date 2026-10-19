import { useEffect, useRef } from "react";
import profile from "../data/profile";
import { projects } from "../data/projects";
import { usePortfolio } from "../state";
import { usePrefersReducedMotion } from "../hooks/useReveal";
import Reveal from "../components/Reveal";
import "../styles/hero.css";

// Symbols a letter rolls into when the pointer touches it.
const ALT = ["✦", "●", "▲", "■", "+", "×", "◆", "★", "▼"];

function Word({ text, offset = 0 }) {
  return (
    <span className="word" aria-hidden="true">
      {[...text].map((ch, i) => (
        <span className="ch" key={i}>
          <span className="ch-a">{ch}</span>
          <span className="ch-b">{ALT[(i + offset) % ALT.length]}</span>
        </span>
      ))}
    </span>
  );
}

const ordered = [...projects].sort((a, b) => b.sort - a.sort);
const ticker = [profile.role, profile.target, profile.availability];

export default function Hero() {
  const { showProject } = usePortfolio();
  const reduced = usePrefersReducedMotion();
  const heroRef = useRef(null);
  const trackRef = useRef(null);

  // Pointer tilts the name in perspective; scrolling slides the two lines apart. Both only write CSS variables.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || reduced) return;
    let raf = 0;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / Math.max(r.height, 1) - 0.5;
        hero.style.setProperty("--ry", `${(x * 14).toFixed(2)}deg`);
        hero.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
      });
    };
    const onLeave = () => {
      hero.style.setProperty("--ry", "0deg");
      hero.style.setProperty("--rx", "0deg");
    };
    const onScroll = () => {
      const t = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1.2);
      hero.style.setProperty("--sy", t.toFixed(3));
    };
    if (fine) {
      hero.addEventListener("pointermove", onMove);
      hero.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);


  // The colour band drifts on its own and speeds up with the scroll speed; it runs backwards when scrolling up.
  // With reduced motion it only moves while the visitor scrolls.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const setWidth = () => track.firstElementChild.offsetWidth || 1;
    let x = 0;
    let lastY = window.scrollY;
    let vel = 0;
    let dir = 1;
    let raf = 0;
    let last = performance.now();
    let visible = true;
    const apply = () => {
      const w = setWidth();
      x = ((x % w) + w) % w;
      track.style.transform = `translate3d(${-x}px, 0, 0)`;
    };

    const onScrollStatic = () => {
      x += (window.scrollY - lastY) * 0.6;
      lastY = window.scrollY;
      apply();
    };
    const frame = (now) => {
      raf = 0;
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      vel += (dy - vel) * 0.12;
      if (Math.abs(vel) > 0.6) dir = vel > 0 ? 1 : -1;
      x += dir * (50 + Math.min(Math.abs(vel), 60) * 28) * dt;
      apply();
      if (visible) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf && visible) {
        last = performance.now();
        lastY = window.scrollY;
        raf = requestAnimationFrame(frame);
      }
    };

    let observer;
    if (reduced) {
      window.addEventListener("scroll", onScrollStatic, { passive: true });
    } else {
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible) start();
        });
        observer.observe(track.parentElement);
      }
      start();
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollStatic);
      observer && observer.disconnect();
    };
  }, [reduced]);

  return (
    <section id="home" className="hero" aria-labelledby="hero-title" ref={heroRef}>
      <div className="hero-top">
        <p className="hero-status mono">
          <span className="pulse" aria-hidden="true" />
          {profile.availability}
        </p>
        <p className="hero-meta mono">Kasetsart University · Kamphaeng Saen · 4th year</p>
      </div>

      <h1 id="hero-title" className="hero-name" aria-label={profile.name}>
        <span className="line line-1">
          <Word text={profile.firstName.toUpperCase()} />
        </span>
        <span className="line line-2">
          <Word text={profile.lastName.toUpperCase()} offset={3} />
        </span>
      </h1>

      <div className="hero-body wrap">
        <p className="hero-role mono">
          <span>{profile.role}</span>
          <span className="slash" aria-hidden="true">
            /
          </span>
          <span className="accent">{profile.target}</span>
        </p>
        <p className="hero-intro">{profile.intro}</p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-solid btn-ticket">
            See my projects <span className="btn-arrow" aria-hidden="true">↓</span>
          </a>
          <a href={profile.resume} download="Resume.pdf" className="btn btn-line">
            Resume <span className="btn-arrow" aria-hidden="true">↓</span>
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-text">
            GitHub <span className="btn-arrow" aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track" ref={trackRef}>
          {[0, 1].map((k) => (
            <div className="marquee-set" key={k}>
              {[...ticker, ...ticker].map((t, i) => (
                <span key={i}>
                  {t} <b>✦</b>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="wi-wrap" aria-labelledby="index-title">
        <div className="wi-head wrap">
          <h2 id="index-title" className="mono">
            Work index
          </h2>
          <span className="mono">{projects.length} entries · hover, then click to jump</span>
        </div>
        <ol className="wi-list">
          {ordered.map((p) => {
            const first = p.media && p.media.find((m) => m.src || m.poster);
            const thumb = first && (first.src || first.poster);
            return (
              <Reveal as="li" key={p.id} repeat>
                <button type="button" className="wi" data-cursor="Open ↓" onClick={() => showProject(p.id)}>
                  <span className="wi-year mono">{p.year}</span>
                  <span className="wi-title">{p.title}</span>
                  <span className="wi-sub mono">
                    <i className={`dot dot-${p.status}`} aria-hidden="true" />
                    {p.subtitle}
                  </span>
                  {thumb && <img className="wi-thumb" src={thumb} alt="" loading="lazy" decoding="async" />}
                  <span className="sr-only"> — jump to this project</span>
                </button>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
