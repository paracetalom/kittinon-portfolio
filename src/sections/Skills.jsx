import { useMemo } from "react";
import { skillGroups } from "../data/skills";
import { projects } from "../data/projects";
import { usePortfolio } from "../state";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

export default function Skills() {
  const { skill, setSkill, showProject } = usePortfolio();

  // Which projects used each skill (taken from the project data, so it cannot drift from the Projects section).
  const usage = useMemo(() => {
    const map = {};
    skillGroups.forEach((g) => g.items.forEach((s) => (map[s] = projects.filter((p) => p.skills.includes(s)))));
    return map;
  }, []);

  const used = skill ? usage[skill] : [];

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHeading number="02" id="skills-title" title="Skills" kicker="What I work with" />
        <Reveal className="skills-intro">
          <p>Choose a skill to see where I used it. The project list below follows your choice.</p>
        </Reveal>

        <div className="skills-grid">
          {skillGroups.map((g, gi) => (
            <Reveal key={g.id} className="skill-group" delay={gi * 100}>
              <h3 className="mono">{g.title}</h3>
              <ul>
                {g.items.map((s) => {
                  const n = usage[s].length;
                  return (
                    <li key={s}>
                      <button
                        type="button"
                        className={`skill${skill === s ? " on" : ""}${n === 0 ? " none" : ""}`}
                        aria-pressed={skill === s}
                        onClick={() => setSkill(skill === s ? null : s)}
                      >
                        {s}
                        <span className="skill-n" aria-label={`${n} ${n === 1 ? "project" : "projects"}`}>
                          {n}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="skill-panel" aria-live="polite">
          {!skill && <p className="mono dim">Nothing selected</p>}
          {skill && (
            <>
              <p className="skill-panel-title">
                <strong>{skill}</strong>
                {used.length === 0 ? (
                  <span> is on my resume, but it is not used in a project listed here yet.</span>
                ) : (
                  <span> in {used.length === 1 ? "this project" : `these ${used.length} projects`}:</span>
                )}
              </p>
              {used.length > 0 && (
                <ul className="skill-used">
                  {used.map((p) => (
                    <li key={p.id}>
                      <button type="button" onClick={() => showProject(p.id)}>
                        <i className={`dot dot-${p.status}`} aria-hidden="true" />
                        {p.title}
                        <span aria-hidden="true"> →</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
