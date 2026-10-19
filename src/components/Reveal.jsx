import { useInView } from "../hooks/useReveal";

/** Fades and lifts its children into place when they scroll into view. With `repeat` they fade out again when they leave. */
export default function Reveal({ as: Tag = "div", delay = 0, repeat = false, className = "", children, ...rest }) {
  const [ref, inView] = useInView(undefined, repeat);
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
