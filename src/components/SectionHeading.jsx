import Reveal from "./Reveal";

export default function SectionHeading({ number, title, kicker, id }) {
  return (
    <Reveal className="sechead">
      <p className="sechead-kicker mono">
        <span>{number}</span>
        <span className="sechead-rule" aria-hidden="true" />
        <span>{kicker}</span>
      </p>
      <h2 id={id}>{title}</h2>
    </Reveal>
  );
}
