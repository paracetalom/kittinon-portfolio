import { useRef, useState } from "react";
import profile from "../data/profile";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

export default function Contact() {
  const [copied, setCopied] = useState("");
  const timer = useRef(0);

  const copy = async (what, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(what);
    } catch {
      setCopied("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(""), 2200);
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="wrap">
        <SectionHeading number="04" id="contact-title" title="Contact" kicker="Say hello" />
        <div className="contact-grid">
          <Reveal className="contact-lead">
            <p className="contact-big">
              I am looking for a co-op placement in Full Stack Development.
            </p>
            <a href={profile.resume} download="Resume.pdf" className="btn btn-solid">
              Download resume <span className="btn-arrow" aria-hidden="true">↓</span>
            </a>
          </Reveal>

          <Reveal as="ul" className="contact-list" delay={120}>
            <li>
              <span className="mono label">Email</span>
              <a href={`mailto:${profile.email}`} className="contact-value">
                {profile.email}
              </a>
              <button type="button" className="copy" onClick={() => copy("email", profile.email)}>
                {copied === "email" ? "Copied" : "Copy"}
                <span className="sr-only"> email address</span>
              </button>
            </li>
            <li>
              <span className="mono label">Phone</span>
              <a href={profile.phoneHref} className="contact-value">
                {profile.phone}
              </a>
              <button type="button" className="copy" onClick={() => copy("phone", profile.phone)}>
                {copied === "phone" ? "Copied" : "Copy"}
                <span className="sr-only"> phone number</span>
              </button>
            </li>
            <li>
              <span className="mono label">GitHub</span>
              <a href={profile.github} target="_blank" rel="noreferrer" className="contact-value">
                {profile.githubLabel}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <span className="copy-ph" aria-hidden="true">↗</span>
            </li>
            <li>
              <span className="mono label">LinkedIn</span>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-value">
                {profile.linkedinLabel}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <span className="copy-ph" aria-hidden="true">↗</span>
            </li>
          </Reveal>
        </div>
        <p className="sr-only" role="status">
          {copied && copied !== "failed" ? `${copied} copied to clipboard` : copied === "failed" ? "Copy not available, please select the text" : ""}
        </p>
      </div>
    </section>
  );
}
