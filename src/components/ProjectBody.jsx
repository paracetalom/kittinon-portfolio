import StatusBadge from "./StatusBadge";
import DocLinks from "./DocLinks";

/** Text part shared by the featured case studies and the explorer detail panel. */
export default function ProjectBody({ project, headingLevel = 3 }) {
  const { title, subtitle, period, kind, summary, role, facts = [], tech = [], status } = project;
  const Heading = `h${headingLevel}`;
  return (
    <div className="pbody">
      <div className="pbody-meta">
        <StatusBadge status={status} />
        <span className="mono">{period}</span>
        <span className="mono dim">{kind}</span>
      </div>
      <Heading className="pbody-title">{title}</Heading>
      {subtitle && <p className="pbody-sub">{subtitle}</p>}
      <p className="pbody-summary">{summary}</p>

      {role && (
        <div className="pbody-role">
          <span className="label">My part</span>
          <p>{role}</p>
        </div>
      )}

      {facts.length > 0 && (
        <ul className="facts">
          {facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}

      {tech.length > 0 && (
        <ul className="tech" aria-label="Technologies">
          {tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}

      <DocLinks project={project} />
    </div>
  );
}
