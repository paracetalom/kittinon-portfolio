import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { projects } from "./data/projects";
import { slowScrollTo } from "./hooks/smoothScroll";

const PortfolioContext = createContext(null);

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) slowScrollTo(el);
}

/** Filters and selection shared by the hero index, the skills grid and the project explorer. */
export function PortfolioProvider({ children }) {
  const [skill, setSkill] = useState(null);
  const [year, setYear] = useState("all");
  const [status, setStatus] = useState("all");
  const [selectedId, setSelectedId] = useState(null);

  const resetFilters = useCallback(() => {
    setSkill(null);
    setYear("all");
    setStatus("all");
  }, []);

  // Show the project: featured ones live in their own section, the rest open in the explorer.
  const showProject = useCallback((id) => {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    if (p.featured) {
      scrollToId(`case-${id}`);
    } else {
      setYear("all");
      setStatus("all");
      setSkill(null);
      setSelectedId(id);
      setTimeout(() => scrollToId("explorer"), 30);
    }
  }, []);

  const showYear = useCallback((y) => {
    setYear(String(y));
    setStatus("all");
    setSelectedId(null);
    setTimeout(() => scrollToId("explorer"), 30);
  }, []);

  const value = useMemo(
    () => ({ skill, setSkill, year, setYear, status, setStatus, selectedId, setSelectedId, resetFilters, showProject, showYear }),
    [skill, year, status, selectedId, resetFilters, showProject, showYear]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used inside PortfolioProvider");
  return ctx;
}
