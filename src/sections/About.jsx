import { about } from "../data/profile";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHeading number="01" id="about-title" title="About" kicker="Who I am" />
        <div className="about-grid">
          <Reveal className="about-text">
            <p className="about-lead">{about.lead}</p>
            <p>{about.body}</p>
          </Reveal>
          <Reveal as="dl" className="facts-list" delay={120}>
            {about.facts.map(([k, v]) => (
              <div key={k} className="fact-row">
                <dt className="mono">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
