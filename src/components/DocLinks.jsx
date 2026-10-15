const pdfUrl = (file) => `${import.meta.env.BASE_URL}pdf/${file}`;

/** Documents (PDF) and outside links of one project. Every PDF can be opened in the browser or downloaded. */
export default function DocLinks({ project }) {
  const { docs = [], links = [], title } = project;
  if (!docs.length && !links.length) return null;
  return (
    <div className="doclinks">
      {docs.length > 0 && (
        <ul className="doclist" aria-label={`Documents for ${title}`}>
          {docs.map((d) => (
            <li key={d.file} className="docitem">
              <span className="docitem-tag" aria-hidden="true">
                PDF
              </span>
              <span className="docitem-text">
                <strong>{d.label}</strong>
                {d.note && <small>{d.note}</small>}
              </span>
              <span className="docitem-actions">
                <a href={pdfUrl(d.file)} target="_blank" rel="noreferrer" className="chip-link">
                  Open<span className="sr-only"> {d.label} in a new tab</span>
                  <span aria-hidden="true"> ↗</span>
                </a>
                <a href={pdfUrl(d.file)} download={d.file} className="chip-link">
                  Download<span className="sr-only"> {d.label}</span>
                  <span aria-hidden="true"> ↓</span>
                </a>
              </span>
            </li>
          ))}
        </ul>
      )}
      {links.length > 0 && (
        <ul className="linkrow">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noreferrer" className="btn btn-line">
                {l.label}
                <span className="sr-only"> (opens in a new tab)</span>
                <span className="btn-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
