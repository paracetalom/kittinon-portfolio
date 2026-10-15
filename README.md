# Kittinon Saengkhao — Portfolio

One-page portfolio website of Kittinon Saengkhao, a fourth-year Computer Science student at Kasetsart University
(Kamphaeng Saen Campus) looking for a cooperative education opportunity in Full Stack Development.

It presents the projects I built during my studies (Featured projects, a timeline of other projects, and research
reading), my skills, a downloadable resume and a short summary PDF for every project.

> Status: work in progress. The site has been built and tested locally and is **not published yet**.
> Planned address: `https://paracetalom.github.io/kittinon-portfolio/` (GitHub Pages).

## Built with

- [React](https://react.dev/) 19 and [Vite](https://vite.dev/) 8 (JavaScript, no TypeScript)
- Plain CSS (no UI library, no animation library): animations use CSS and `IntersectionObserver`, and respect "reduce motion"
- Fonts are self-hosted in `src/assets/fonts` (SIL Open Font License): Bricolage Grotesque, Instrument Sans, JetBrains Mono
- ESLint for code checks

## Getting started

You need [Node.js](https://nodejs.org/) installed. Run these commands in a terminal inside the project folder:

```powershell
npm install        # download the libraries (first time only)
npm run dev        # start the development server, then open the address it prints
npm run lint       # check the code style
npm run build      # create the production version in the "dist" folder
npm run preview    # open the production version locally to test it
```

Because the site is meant for GitHub Pages, it lives under the sub-path `/kittinon-portfolio/`.
When the development server starts, open `http://localhost:5173/kittinon-portfolio/` (not just `/`).

## Project structure

```text
src/
  components/   Nav, project cards, media viewer, document links, dot grid
  sections/     Hero, About, Skills, Projects (featured + explorer) and Contact
  hooks/        scroll reveal, active section, scroll progress
  state.jsx     filters shared by the hero index, the skills and the project explorer
  data/
    profile.js    name, contact details, about text
    skills.js     skills as listed on my resume
    projects.js   every project: text, evidence type, images, documents, links
    status.js     the evidence types (live demo, prototype, documents, design, reading)
  assets/projects/   screenshots, charts and crops taken from my own reports and slides
public/
  Resume.pdf    resume for download (detailed address and GPAX are left out on purpose)
  pdf/          my own reports and slides, with pages that contain other people's personal data removed
```

## Adding or editing a project

1. Open `src/data/projects.js` and add an object to the `projects` list (copy an existing one).
2. Only fill in `links`, `media` and `docs` that really exist, and only describe what you can prove from the project's own files.
3. For a document, put the original in `public/pdf/` and add it to `docs`. Do not publish pages with other people's names, student IDs, phone numbers or photos, and do not replace a report with a newly written summary.
4. Run `npm run lint` and `npm run build`.

## Publishing to GitHub Pages

The `base` option in `vite.config.js` must match the repository name (`kittinon-portfolio`).
If the repository is ever renamed, change `base` too and rebuild. Publishing is done manually after review.

## Content notes

- All text on the site is in English.
- Team projects are labelled as team projects and only my confirmed part is described.
- Every project shows how much evidence exists: live demo, prototype, documents, design or reading.
- Demo and GitHub buttons appear only for links that were checked.
- The documents are my own reports and slides. Where a page contained classmates' names, student IDs, phone numbers or stock photos, that page was left out; nothing was rewritten.
- Personal data such as a home address, GPAX or student ID is not published.
