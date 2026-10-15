import { useMemo } from "react";
import profile from "../data/profile";
import { projects } from "../data/projects";
import { usePortfolio } from "../state";
import DotGrid from "../components/DotGrid";
import "../styles/hero.css";

export default function Hero() {
  const { showYear, showProject } = usePortfolio();

  // One row per year with the projects of that year (from the same data as the Projects section).
  const index = useMemo(() => {
    const years = [...new Set(projects.map((p) => p.year))].sort();
    return years.map((y) => ({ year: y, items: projects.filter((p) => p.year === y).sort((a, b) => a.sort - b.sort) }));
  }, []);

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <DotGrid />
      <div className="wrap hero-grid">
        <div className="hero-main">
          <p className="hero-status mono">
            <span className="pulse" aria-hidden="true" />
            {profile.availability}
          </p>
          <h1 id="hero-title" className="hero-name">
            <span className="line">
              <span>{profile.firstName}</span>
            </span>
            <span className="line">
              <span>{profile.lastName}</span>
            </span>
          </h1>
          <p className="hero-role mono">
            <span>{profile.role}</span>
            <span className="slash" aria-hidden="true">
              /
            </span>
            <span className="accent">{profile.target}</span>
          </p>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-solid">
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
          <p className="hero-meta mono">Kasetsart University · Kamphaeng Saen Campus · 4th year</p>
        </div>

        <aside className="hero-index" aria-labelledby="index-title">
          <div className="hero-index-head">
            <h2 id="index-title" className="mono">
              Work index
            </h2>
            <span className="mono dim">{projects.length} entries</span>
          </div>
          <ol>
            {index.map(({ year, items }) => (
              <li key={year} className="idx-row">
                <button type="button" className="idx-year" onClick={() => showYear(year)}>
                  {year}
                  <span className="sr-only"> — show projects from {year}</span>
                </button>
                <ul className="idx-items">
                  {items.map((p) => (
                    <li key={p.id}>
                      <button type="button" onClick={() => showProject(p.id)}>
                        <i className={`dot dot-${p.status}`} aria-hidden="true" />
                        {p.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className="hero-index-foot mono dim">Click a year or a project to jump to it</p>
        </aside>
      </div>
      <a href="#about" className="scroll-cue mono" aria-label="Scroll to About">
        <span>Scroll</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
