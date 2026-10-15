import { useEffect, useMemo, useRef } from "react";
import { projects } from "../data/projects";
import { statusMeta, statusOrder } from "../data/status";
import { usePortfolio } from "../state";
import MediaViewer from "./MediaViewer";
import ProjectBody from "./ProjectBody";

const others = projects.filter((p) => !p.featured);
const years = [...new Set(others.map((p) => p.year))].sort();

/** Browse the other projects by year, evidence type and skill. List on the left, details on the right. */
export default function Explorer() {
  const { skill, setSkill, year, setYear, status, setStatus, selectedId, setSelectedId, resetFilters } = usePortfolio();
  const detailRef = useRef(null);
  const listRef = useRef(null);

  const visible = useMemo(
    () =>
      others
        .filter((p) => year === "all" || String(p.year) === year)
        .filter((p) => status === "all" || p.status === status)
        .filter((p) => !skill || p.skills.includes(skill))
        .sort((a, b) => a.sort - b.sort),
    [year, status, skill]
  );

  const selected = visible.find((p) => p.id === selectedId) || visible[0] || null;

  // On narrow screens bring the detail panel into view after choosing a project.
  const choose = (id, fromUser = true) => {
    setSelectedId(id);
    if (fromUser && window.matchMedia("(max-width: 899px)").matches) {
      setTimeout(() => detailRef.current && detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
    }
  };

  // Arrow keys move through the list (roving tabindex).
  const onKeyDown = (e) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key) || !visible.length) return;
    e.preventDefault();
    const i = Math.max(0, visible.findIndex((p) => p.id === (selected && selected.id)));
    let next = i;
    if (e.key === "ArrowDown") next = Math.min(visible.length - 1, i + 1);
    if (e.key === "ArrowUp") next = Math.max(0, i - 1);
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = visible.length - 1;
    choose(visible[next].id, false);
    const btn = listRef.current && listRef.current.querySelector(`[data-id="${visible[next].id}"]`);
    btn && btn.focus();
  };

  useEffect(() => {
    if (selected && selected.id !== selectedId) setSelectedId(selected.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected && selected.id]);

  const grouped = years.map((y) => ({ y, items: visible.filter((p) => p.year === y) })).filter((g) => g.items.length);

  return (
    <div className="explorer" id="explorer">
      <div className="explorer-head">
        <h3 className="explorer-title">More work</h3>
        <p className="explorer-note">Pick a year, an evidence type or a skill. The list and details update.</p>
      </div>

      <div className="filters">
        <div className="seg" role="group" aria-label="Filter by year">
          {["all", ...years].map((y) => (
            <button key={y} type="button" aria-pressed={year === String(y)} onClick={() => setYear(String(y))}>
              {y === "all" ? "All years" : y}
            </button>
          ))}
        </div>
        <div className="seg" role="group" aria-label="Filter by evidence type">
          <button type="button" aria-pressed={status === "all"} onClick={() => setStatus("all")}>
            Any
          </button>
          {statusOrder
            .filter((s) => others.some((p) => p.status === s))
            .map((s) => (
              <button key={s} type="button" aria-pressed={status === s} onClick={() => setStatus(s)} title={statusMeta[s].hint}>
                <i className={`dot dot-${s}`} aria-hidden="true" />
                {statusMeta[s].label}
              </button>
            ))}
        </div>
        {skill && (
          <button type="button" className="skill-pill" onClick={() => setSkill(null)}>
            Skill: {skill} <span aria-hidden="true">✕</span>
            <span className="sr-only"> (clear skill filter)</span>
          </button>
        )}
      </div>

      <div className="explorer-grid">
        <div
          className="explorer-list"
          role="tablist"
          aria-orientation="vertical"
          aria-label="Projects"
          ref={listRef}
          onKeyDown={onKeyDown}
        >
          {grouped.length === 0 && (
            <div className="empty">
              <p>No project matches these filters.</p>
              <button type="button" className="btn btn-line" onClick={resetFilters}>
                Reset filters
              </button>
            </div>
          )}
          {grouped.map((g) => (
            <div key={g.y} className="year-group">
              <div className="year-label" aria-hidden="true">
                {g.y}
              </div>
              {g.items.map((p) => {
                const on = selected && selected.id === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    id={`tab-${p.id}`}
                    data-id={p.id}
                    aria-selected={on}
                    aria-controls="explorer-panel"
                    tabIndex={on ? 0 : -1}
                    className={`row${on ? " on" : ""}`}
                    onClick={() => choose(p.id)}
                  >
                    <i className={`dot dot-${p.status}`} aria-hidden="true" />
                    <span className="row-text">
                      <strong>{p.title}</strong>
                      <small>{p.period}</small>
                    </span>
                    <span className="row-go" aria-hidden="true">
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div
          className="explorer-detail"
          id="explorer-panel"
          role="tabpanel"
          aria-labelledby={selected ? `tab-${selected.id}` : undefined}
          ref={detailRef}
          tabIndex={-1}
        >
          {selected && (
            <div className="detail" key={selected.id}>
              {selected.media && selected.media.length > 0 && <MediaViewer media={selected.media} title={selected.title} />}
              <ProjectBody project={selected} headingLevel={3} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
