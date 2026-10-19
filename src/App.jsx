import { useEffect } from "react";
import { usePageTone } from "./hooks/usePageTone";
import { slowScrollTo } from "./hooks/smoothScroll";
import "./styles/base.css";
import "./styles/sections.css";
import { PortfolioProvider } from "./state";
import { useActiveSection, useScrollProgress } from "./hooks/useActiveSection";
import Nav from "./components/Nav";
import { sections } from "./data/sections";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import "./styles/theme.css";

const ids = sections.map((s) => s.id);

function Shell() {
  const active = useActiveSection(ids);
  const { progress, scrolled } = useScrollProgress();

  usePageTone();

  // In-page links (nav, buttons) glide slowly instead of jumping.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const id = a.getAttribute("href").slice(1);
      const el = id && document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      slowScrollTo(el);
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav active={active} progress={progress} scrolled={scrolled} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Cursor />
    </>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <Shell />
    </PortfolioProvider>
  );
}
