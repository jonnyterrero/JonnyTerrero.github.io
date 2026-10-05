/**
 * Single source of truth for brand and identity strings (restructuring plan §25).
 * Change a name here and every page follows — no stray legacy names.
 *
 * Brand architecture (docs/BRAND_ARCHITECTURE.md):
 *   Terrero Labs — umbrella for my work as an engineer: projects, research, skills
 *   HeartWire    — my health-tech startup (company formation in progress); its
 *                  products are MindMap, GastroGuard, SkinTrack+, HeartWire OS, GlucoLoop
 *   JonnyJr      — personal tooling: agent bench + Obsidian second brain
 */
export const BRAND = {
  company: "Terrero Labs",
  companyDescriptor: "Biomedical engineering · software · hardware",
  companyLine:
    "Terrero Labs is the umbrella for my work as an engineer: the projects, research, and skills behind them.",
  startup: "HeartWire",
  startupStatus: "Company formation in progress",
  startupLine:
    "HeartWire is my health-tech startup, now being formally set up. It’s where the products live: MindMap, GastroGuard, SkinTrack+, HeartWire OS, and later GlucoLoop.",
  founder: "Jonathan Terrero",
  founderShort: "Jonny Terrero",
  founderRole: "Engineer · Founder of HeartWire",
  roleTitle: "Software Engineer · Biomedical Engineering",
  location: "Fort Myers, FL",
  /** One answer everywhere (finding C8). */
  degree: "B.S. Biomedical Engineering, Florida Gulf Coast University",
  minors: "Physics and Computer Science",
  gradDate: "Expected May 2027",
  siteUrl: "https://jonnyterrero.github.io",
  description:
    "Terrero Labs is the engineering portfolio of Jonathan Terrero, a software engineer, biomedical engineering student, and founder of the health-tech startup HeartWire. Each project is documented with what is built, what is measured, and what it does not claim.",
} as const;
