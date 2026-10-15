import Reveal from "./Reveal";
import MediaViewer from "./MediaViewer";
import ProjectBody from "./ProjectBody";
import { usePortfolio } from "../state";

/** Large case study for one of the three featured projects. */
export default function FeaturedCase({ project, number }) {
  const { skill } = usePortfolio();
  const dim = skill && !project.skills.includes(skill);
  return (
    <Reveal
      as="article"
      id={`case-${project.id}`}
      className={`case${number % 2 === 0 ? " flip" : ""}${dim ? " dim" : ""}`}
      aria-labelledby={`case-title-${project.id}`}
    >
      <div className="case-index" aria-hidden="true">
        {String(number).padStart(2, "0")}
      </div>
      <div className="case-media">
        <MediaViewer media={project.media} title={project.title} />
      </div>
      <div className="case-text">
        <ProjectBody project={{ ...project }} headingLevel={3} />
      </div>
    </Reveal>
  );
}
