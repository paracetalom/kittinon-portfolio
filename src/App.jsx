import "./styles/base.css";
import "./styles/sections.css";
import { PortfolioProvider } from "./state";
import { useActiveSection, useScrollProgress } from "./hooks/useActiveSection";
import Nav from "./components/Nav";
import { sections } from "./data/sections";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

const ids = sections.map((s) => s.id);

function Shell() {
  const active = useActiveSection(ids);
  const { progress, scrolled } = useScrollProgress();
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
