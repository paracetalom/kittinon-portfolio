// How strong the evidence is for each project. Shown as a badge so visitors can tell a live demo from a prototype
// from a project that is only documented.
export const statusMeta = {
  live: { label: "Live demo", hint: "Runs online, you can try it" },
  prototype: { label: "Prototype", hint: "Partly built, with a walkthrough video and code" },
  documents: { label: "Documents", hint: "Report or slides and source, no online demo" },
  design: { label: "Design", hint: "Design work, no running product" },
  reading: { label: "Reading", hint: "Paper study, no code" },
};

export const statusOrder = ["live", "prototype", "documents", "design", "reading"];
