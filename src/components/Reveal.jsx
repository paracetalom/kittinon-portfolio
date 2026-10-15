import { useInView } from "../hooks/useReveal";

/** Fades and lifts its children into place the first time they scroll into view. */
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? " in-view" : ""}${className ? " " + className : ""}`}
      style={delay ? { "--delay": `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
