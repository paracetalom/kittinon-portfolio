import profile from "../data/profile";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with React and Vite. Fonts: Oswald, Inter Tight, JetBrains Mono (SIL OFL).</p>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}
