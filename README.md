# Kittinon Saengkhao — Portfolio

One-page portfolio website of Kittinon Saengkhao, a fourth-year Computer Science student at Kasetsart University
(Kamphaeng Saen Campus) looking for a cooperative education opportunity in Full Stack Development.

It presents the projects I built during my studies (featured projects, a timeline of other projects, and research
reading), my skills, a downloadable resume and a short document for every project.

Published with GitHub Pages: `https://paracetalom.github.io/kittinon-portfolio/` (see `.github/workflows/deploy.yml`).

## Design

A poster-style layout that mixes three ideas, without copying any one site:

- **Big pictures and colour that moves with you:** the page background drifts from grey to blue, lime and finally black
  while you scroll (`src/hooks/usePageTone.js`); project pictures play as a slow cross-fading slideshow.
- **Lots of type that reacts:** a huge name whose letters roll into symbols on hover, and a Work index of giant
  project titles that fill with colour and pop a picture in. Rows fade in and out as you scroll.
- **Unusual colour and perspective:** electric blue and acid lime on warm grey, a name that tilts in perspective with the
  pointer, a tilted colour band that speeds up with the scroll speed, a floating pill navigation and a mouse label.

Everything is plain CSS and small hooks, mostly `transform` and `opacity`. Colour tokens are in `src/index.css`.

## Built with

- [React](https://react.dev/) 19 and [Vite](https://vite.dev/) 8 (JavaScript, no TypeScript)
- Plain CSS (no UI library, no animation library)
- Fonts are self-hosted in `src/assets/fonts` (SIL Open Font License): Oswald, Inter Tight, JetBrains Mono
- ESLint for code checks

## Accessibility and motion

- Contrast of text on every background colour, visible focus rings, a skip link, text alternatives for images.
- `prefers-reduced-motion` is respected: the name no longer tilts, the colour band only moves while you scroll,
  and sections fade without sliding. The picture slideshow, the slow scroll to a project and the fades are
  things the visitor asks for or can pause, so they keep working; the slideshow has a Pause button.
- The mouse label only appears on devices with a mouse.

## Getting started

You need [Node.js](https://nodejs.org/) installed. Run these commands in a terminal inside the project folder:

```powershell
npm install        # download the libraries (first time only)
npm run dev        # start the development server, then open the address it prints
npm run lint       # check the code style
npm run build      # create the production version in the "dist" folder
npm run preview    # open the production version locally to test it
```

The site lives under the sub-path `/kittinon-portfolio/`. When the development server starts, open
`http://localhost:5173/kittinon-portfolio/` (not just `/`).

## Project structure

```text
src/
  components/   Nav (floating pill), Cursor (mouse label), MediaViewer (slideshow + video), project cards, Reveal
  sections/     Hero (name, colour band, Work index), About, Skills, Projects (featured + explorer), Contact
  hooks/        usePageTone (background fade), smoothScroll (slow scroll), scroll reveal, active section
  styles/       one file per area; theme.css is loaded last and holds the poster-style layer
  state.jsx     filters shared by the Work index, the skills and the project explorer
  data/
    profile.js    name, contact details, about text
    skills.js     skills as listed on my resume
    projects.js   every project: text, evidence type, images, documents, links
    status.js     the evidence types (live demo, prototype, documents, design, reading)
  assets/projects/   screenshots, charts and crops taken from my own reports and slides
public/
  Resume.pdf    resume for download (detailed address and GPAX are left out on purpose)
  pdf/          reports and slides that the site links to, with pages that contain other people's data removed
source-docs/    NOT published (git-ignored): the full original documents used to make the pictures
```

## Adding or editing a project

1. Open `src/data/projects.js` and add an object to the `projects` list (copy an existing one).
2. Only fill in `links`, `media` and `docs` that really exist, and only describe what you can prove from the project's own files.
3. `media` items are images (`src`, `alt`, `caption`, `frame`), a YouTube video (`kind: "video"`, `youtubeId`, `poster`)
   or the Spring Boot diagram (`kind: "diagram"`). Pictures are cut from the original documents kept in `source-docs/`.
4. For a document people can download, put a cleaned copy in `public/pdf/` and add it to `docs`. Keep originals in
   `source-docs/`. Do not publish pages with other people's names, student IDs, phone numbers or photos.
5. Run `npm run lint` and `npm run build`.

## Publishing to GitHub Pages

The `base` option in `vite.config.js` must match the repository name (`kittinon-portfolio`).
If the repository is ever renamed, change `base` too and rebuild.

## Content notes

- All text on the site is in English.
- Team projects are labelled as team projects and only my confirmed part is described.
- Every project shows how much evidence exists: live demo, prototype, documents, design or reading.
- Demo and GitHub buttons appear only for links that were checked.
- Some pictures show pages of my reports and slides, including test photos from public datasets (Kaggle) and figures
  from the papers I presented. Check the licences before reusing them.
- Personal data such as a home address, GPAX or student ID is not published.
