import { projects } from "../data/projects";
import { statusMeta, statusOrder } from "../data/status";
import SectionHeading from "../components/SectionHeading";
import FeaturedCase from "../components/FeaturedCase";
import Explorer from "../components/Explorer";
import "../styles/projects.css";

const featured = projects.filter((p) => p.featured).sort((a, b) => a.featuredOrder - b.featuredOrder);

export default function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="wrap">
        <SectionHeading number="03" id="projects-title" title="Projects" kicker="Selected work" />

        <div className="legend" aria-label="What the badges mean">
          {statusOrder.map((s) => (
            <span key={s} className="legend-item">
              <i className={`dot dot-${s}`} aria-hidden="true" />
              <strong>{statusMeta[s].label}</strong>
              <span>{statusMeta[s].hint}</span>
            </span>
          ))}
        </div>

        <h3 className="subhead">
          <span className="mono">Featured</span>
        </h3>
        <div className="cases">
          {featured.map((p, i) => (
            <FeaturedCase key={p.id} project={p} number={i + 1} />
          ))}
        </div>

        <Explorer />
      </div>
    </section>
  );
}
