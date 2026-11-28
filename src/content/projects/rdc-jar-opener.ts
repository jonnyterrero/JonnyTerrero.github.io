import type { Project } from "@/lib/projects";

export const rdcJarOpener: Project = {
  slug: "rdc-universal-jar-opener",
  name: "Universal Jar Opener",
  tagline:
    "Rapid Design Challenge: a universal jar opener for elderly users with limited grip strength, scoped from three stakeholder interviews.",
  division: "engineering",
  priority: "standard",
  status: "Concept",
  statusNote: "Rapid Design Challenge · 3-author team · CAD stage",
  role: "Co-author with Joseph Pitt and Yug Patel · user research, concept evaluation, SolidWorks prototyping, documentation",
  timeline: "2025",
  stack: ["User interviews", "Concept evaluation", "SolidWorks", "Design History File"],
  liveUrl: null,
  repoUrl: null,
  extraLinks: [
    { label: "Final presentation, 25 slides (PPTX)", href: "/papers/rdc-jar-opener-presentation.pptx" },
    { label: "Design planning (DOCX)", href: "/papers/rdc-jar-opener-design-planning.docx" },
    { label: "Design History File (DOCX)", href: "/papers/rdc-jar-opener-design-history-file.docx" },
  ],
  summary:
    "Course Rapid Design Challenge with Joseph Pitt and Yug Patel. We interviewed three elderly users, identified knee pain, arthritis, and dynapenia as the dominant difficulty, and scoped a universal jar opener that accepts a wide range of lid diameters with minimal applied force. The team iterated digital prototypes in SolidWorks; 3D-printed hard testing did not happen inside the time window.",
  accentColor: "blue",
  capabilityDetails: {
    "biomedical-embedded":
      "Assistive-device design framed around measurable grip-strength and mobility constraints in an elderly user population.",
    "core-engineering":
      "End-to-end design process on a short deadline: user research → concept evaluation → CAD iteration → Design History File documentation.",
  },
  caseStudy: {
    problem: [
      {
        type: "p",
        text: "Opening jars is a routine task that becomes a daily failure mode for elderly users with reduced grip strength, arthritis, or dynapenia. Off-the-shelf jar openers tend to target a single lid diameter or require a motion (clamping, twisting with sustained grip) that is itself hard for the population they are sold to.",
      },
      {
        type: "p",
        text: "The Rapid Design Challenge asked for a universal opener that works across lid diameters, needs minimal applied force, is safe to handle, and could be manufactured cheaply.",
      },
    ],
    requirements: [
      {
        type: "table",
        columns: ["#", "Requirement", "Target", "Actual"],
        rows: [
          ["R1", "Lid-diameter range", "Accommodates a wide range of jar lid diameters without swapping parts", "Design intent — not yet measured against a spec'd range"],
          ["R2", "Applied force", "Minimal force required for an elderly user to operate", "Design intent — no grip-strength bench test yet"],
          ["R3", "Safety and ease of use", "No sharp edges, no pinch hazards, operable with one hand", "Checked in CAD; not user-tested"],
          ["R4", "Weight and compactness", "Light and compact enough to store in a kitchen drawer", "Design intent — not measured"],
          ["R5", "Manufacturability", "Can be manufactured at low cost in reasonable volumes", "Material and process choices not yet finalised"],
          ["R6", "Iterable from user feedback", "Design supports refinement based on observed use", "Met in process — DHF captures feedback loop"],
        ],
      },
    ],
    scope: [
      {
        type: "p",
        text: "Three-person team under a fixed course deadline. I contributed to the interview design, concept-evaluation tradeoff analysis, SolidWorks prototyping, and the write-up of the Design Planning and Design History File documents.",
      },
    ],
    implementation: [
      {
        type: "list",
        items: [
          "User research: structured interviews with three elderly participants to identify dominant daily-task difficulties — knee pain, arthritis, and dynapenia. Follow-up questions probed how each difficulty manifested (walking, grabbing, opening containers, operating phones, typing).",
          "Concept development: lever-based, grip-assisted, and electric opener concepts were sketched and evaluated against feasibility, cost, and user needs.",
          "CAD prototyping in SolidWorks: digital prototypes iterated to study the motion relationships between the parts of the assembled opener.",
          "Documentation: Design Planning and Design History File capturing goals, key objectives, responsibilities per design phase, interview feedback, concept trade-offs, and iteration notes.",
        ],
      },
    ],
    failures: [
      {
        type: "list",
        items: [
          "The planned 3D-printed hard-test prototype did not get produced inside the time window of the challenge. The design stayed at the CAD iteration stage.",
          "No grip-strength or usability measurements against the target elderly population — the force and ease-of-use requirements are stated as design intent, not verified.",
        ],
      },
    ],
    limitations: [
      {
        type: "list",
        items: [
          "Not a medical device. The product is an assistive kitchen tool, not a prescribed therapy; it was not evaluated under any regulatory pathway.",
          "User research cohort: three elderly interviewees. Qualitative demand signals only, not a representative sample of the elderly population or of grip-strength impairments.",
          "No physical prototype was built or tested — the design decisions were validated in CAD, not against hands.",
          "The concept evaluation (lever vs grip-assisted vs electric) was based on team judgement about feasibility, cost, and user needs rather than measured trade-off data.",
        ],
      },
    ],
  },
};
