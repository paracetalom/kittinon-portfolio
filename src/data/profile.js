// Personal details shown on the site. Edit here, not in the components.
const profile = {
  name: "Kittinon Saengkhao",
  firstName: "Kittinon",
  lastName: "Saengkhao",
  initials: "KS",
  role: "Computer Science student",
  target: "Entry-level Full Stack Developer",
  intro:
    "I enjoy building software projects, exploring web development, and learning how AI and data-driven technologies can solve practical problems.",
  availability: "Looking for a co-op placement",
  email: "kittinon.work@gmail.com",
  phone: "+66 65 420 3273",
  phoneHref: "tel:+66654203273",
  github: "https://github.com/paracetalom",
  githubLabel: "github.com/paracetalom",
  linkedin: "https://www.linkedin.com/in/kittinon-saengkhao-103863441/",
  linkedinLabel: "linkedin.com/in/kittinon-saengkhao",
  // BASE_URL is "/kittinon-portfolio/" in production (see vite.config.js)
  resume: `${import.meta.env.BASE_URL}Resume.pdf`,
};

export const about = {
  lead: "Fourth-year Computer Science student at Kasetsart University, Kamphaeng Saen Campus.",
  body: "I have learned mostly by building things for my courses: web apps, a database design, a Java game, image processing in MATLAB, an in-browser classifier and a data analysis. I am looking for a co-op placement where I can work on real projects and learn from developers.",
  facts: [
    ["Studying", "B.Sc. Computer Science, Kasetsart University (Kamphaeng Saen), 2023 – present"],
    ["Interested in", "Full Stack Development, AI, Data Science, graphic design"],
    ["Languages", "Thai (native), English (intermediate)"],
    ["On my own", "Reading research papers on computer vision, deep learning and anomaly detection"],
  ],
};

export default profile;
