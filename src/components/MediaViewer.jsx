import { useEffect, useRef, useState } from "react";

const SLIDE_MS = 2000; // time each picture stays
const FADE_MS = 900; // slow cross-fade between pictures

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

/** A YouTube video shown as its poster first; the player is only loaded (privacy-friendly domain) after a click. */
function VideoPlayer({ item }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="media media-video">
      <div className="video-box">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
            title={item.alt}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button type="button" className="video-start" data-cursor="Play ▶" onClick={() => setPlaying(true)} aria-label={`Play video: ${item.alt}`}>
            {item.poster && <img src={item.poster} alt="" loading="lazy" decoding="async" />}
            <span className="video-play" aria-hidden="true">
              ▶ Play
            </span>
          </button>
        )}
      </div>
      {item.caption && <figcaption>{item.caption}</figcaption>}
    </figure>
  );
}

function Thumbs({ media, index, setIndex, auto, running, setPaused }) {
  return (
    <div className={`media-thumbs${running ? " running" : ""}`} role="group" aria-label="Choose an image" style={{ "--slide-ms": `${SLIDE_MS}ms` }}>
      {media.map((m, i) => (
        <button key={i} type="button" className={i === index ? "on" : undefined} aria-pressed={i === index} onClick={() => setIndex(i)}>
          {m.src || m.poster ? <img src={m.src || m.poster} alt="" loading="lazy" decoding="async" /> : <span className="thumb-label mono" aria-hidden="true">{m.kind === "diagram" ? "Diagram" : "Video"}</span>}
          {m.kind === "video" && <span className="thumb-play" aria-hidden="true">▶</span>}
          <span className="sr-only">{m.alt}</span>
        </button>
      ))}
      {auto !== null && (
        <button type="button" className="media-auto mono" onClick={() => setPaused((v) => !v)} aria-pressed={!auto}>
          {auto ? "❚❚ Pause" : "▶ Auto"}
          <span className="sr-only"> slideshow</span>
        </button>
      )}
    </div>
  );
}

/** Shows a project's real screenshots, charts or document crops. Thumbnails swap the main item; click an image to enlarge. */
export default function MediaViewer({ media, title }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false); // the slideshow always starts playing; Pause stops it
  const [hovered, setHovered] = useState(false); // pointer or keyboard focus is on the viewer
  const [zoomed, setZoomed] = useState(false); // the enlarged picture is open
  const [onScreen, setOnScreen] = useState(false);
  const dialogRef = useRef(null);
  const rootRef = useRef(null);
  const count = media ? media.length : 0;
  const current = count ? media[Math.min(index, count - 1)] : null;

  // Only count as "playing" while the viewer is on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) return setOnScreen(true);
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [count]);

  // Slideshow: move to the next item every few seconds and loop. A video that is open is never interrupted.
  // Only plain images take part: the video and the diagram keep their own size and are reached with the thumbnails.
  const slides = media ? media.map((m, i) => (m.kind ? -1 : i)).filter((i) => i >= 0) : [];
  const canAuto = slides.length > 1;
  const running = canAuto && !paused && !hovered && !zoomed && onScreen && !!current && !current.kind;
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => {
      const at = slides.indexOf(index);
      setIndex(slides[(at + 1) % slides.length]);
    }, SLIDE_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, index, count]);

  // Keep the previous picture underneath while the new one fades in.
  const currentSrc = current && current.src;
  const [shown, setShown] = useState({ src: currentSrc, prev: null });
  if (currentSrc && shown.src !== currentSrc) setShown({ src: currentSrc, prev: shown.src });
  useEffect(() => {
    if (!shown.prev) return;
    const id = setTimeout(() => setShown((v) => ({ ...v, prev: null })), FADE_MS + 100);
    return () => clearTimeout(id);
  }, [shown]);

  if (!current) return null;

  const open = () => {
    if (!dialogRef.current) return;
    setZoomed(true);
    dialogRef.current.showModal();
  };
  const close = () => dialogRef.current && dialogRef.current.close();

  let main;
  if (current.kind === "diagram") {
    main = <SpringFlow alt={current.alt} caption={current.caption} />;
  } else if (current.kind === "video") {
    main = <VideoPlayer key={index} item={current} />;
  } else {
    main = (
      <figure className={`media media-${current.frame || "plain"}`}>
        <button type="button" className="media-main" data-cursor="Zoom +" onClick={open} aria-label={`Enlarge image: ${current.alt}`}>
          {current.frame === "window" && (
            <span className="media-bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <em>{current.caption || title}</em>
            </span>
          )}
          <span className="media-img" style={{ "--fade-ms": `${FADE_MS}ms` }}>
            {shown.prev && shown.prev !== current.src && <img className="media-prev" src={shown.prev} alt="" aria-hidden="true" />}
            <img key={current.src} src={current.src} alt={current.alt} loading="lazy" decoding="async" />
          </span>
          <span className="media-zoom" aria-hidden="true">
            Enlarge
          </span>
        </button>
        {current.caption && current.frame !== "window" && <figcaption>{current.caption}</figcaption>}
        <dialog ref={dialogRef} className="lightbox" onClose={() => setZoomed(false)} onClick={(e) => e.target === dialogRef.current && close()} aria-label={current.alt}>
          <button type="button" className="lightbox-close" onClick={close}>
            Close <span aria-hidden="true">✕</span>
          </button>
          <img src={current.src} alt={current.alt} />
          {current.caption && <p>{current.caption}</p>}
        </dialog>
      </figure>
    );
  }

  return (
    <div
      className="media-set"
      ref={rootRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {main}
      {count > 1 && <Thumbs media={media} index={index} setIndex={setIndex} auto={canAuto ? !paused : null} running={running} setPaused={setPaused} />}
    </div>
  );
}
