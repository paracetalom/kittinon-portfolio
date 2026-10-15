import { useRef, useState } from "react";

/** Architecture of the published Spring Boot page, taken from FruitController, FruitRepository and Fruit.java. */
function SpringFlow({ alt, caption }) {
  return (
    <figure className="flowfig">
      <div className="flow" role="img" aria-label={alt}>
        <div className="flow-node">
          <span className="mono">Browser</span>
          <strong>Thymeleaf page</strong>
          <small>form: name, price, stock · list of fruits</small>
        </div>
        <div className="flow-link" aria-hidden="true">
          <em>GET /</em>
          <em>POST /add</em>
        </div>
        <div className="flow-node">
          <span className="mono">Spring MVC</span>
          <strong>FruitController</strong>
        </div>
        <div className="flow-link" aria-hidden="true">
          <em>findAll()</em>
          <em>save()</em>
        </div>
        <div className="flow-node">
          <span className="mono">Spring Data JPA</span>
          <strong>FruitRepository</strong>
        </div>
        <div className="flow-link" aria-hidden="true">
          <em>SQL</em>
        </div>
        <div className="flow-node flow-db">
          <span className="mono">MySQL</span>
          <strong>fruit</strong>
          <small>id · name · price · stock</small>
        </div>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** Shows a project's real screenshots, charts or document crops. Thumbnails swap the main image; click to enlarge. */
export default function MediaViewer({ media, title }) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef(null);
  if (!media || media.length === 0) return null;
  const current = media[Math.min(index, media.length - 1)];

  if (current.kind === "diagram") return <SpringFlow alt={current.alt} caption={current.caption} />;

  const open = () => dialogRef.current && dialogRef.current.showModal();
  const close = () => dialogRef.current && dialogRef.current.close();

  return (
    <figure className={`media media-${current.frame || "plain"}`}>
      <button type="button" className="media-main" onClick={open} aria-label={`Enlarge image: ${current.alt}`}>
        {current.frame === "window" && (
          <span className="media-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <em>{current.caption || title}</em>
          </span>
        )}
        <img key={current.src} src={current.src} alt={current.alt} loading="lazy" decoding="async" />
        <span className="media-zoom" aria-hidden="true">
          Enlarge
        </span>
      </button>

      {media.length > 1 && (
        <div className="media-thumbs" role="group" aria-label="Choose an image">
          {media.map((m, i) => (
            <button
              key={m.src}
              type="button"
              className={i === index ? "on" : undefined}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <img src={m.src} alt="" loading="lazy" decoding="async" />
              <span className="sr-only">{m.alt}</span>
            </button>
          ))}
        </div>
      )}
      {current.caption && current.frame !== "window" && <figcaption>{current.caption}</figcaption>}

      <dialog ref={dialogRef} className="lightbox" onClick={(e) => e.target === dialogRef.current && close()} aria-label={current.alt}>
        <button type="button" className="lightbox-close" onClick={close}>
          Close <span aria-hidden="true">✕</span>
        </button>
        <img src={current.src} alt={current.alt} />
        {current.caption && <p>{current.caption}</p>}
      </dialog>
    </figure>
  );
}
