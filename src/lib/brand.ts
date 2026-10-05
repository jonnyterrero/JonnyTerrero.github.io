/**
 * Single source of truth for brand and identity strings (restructuring plan §25).
 * Change a name here and every page follows — no stray legacy names.
 *
 * Brand architecture (docs/BRAND_ARCHITECTURE.md):
 *   Terrero Labs — parent studio (independent, founder-led; never implied larger)
 *   HeartWire    — reserved for the cardiac product line; not used for anything else
 */
export const BRAND = {
  company: "Terrero Labs",
  companyDescriptor: "Biomedical systems + software",
  companyLine:
    "Terrero Labs is my independent biomedical engineering studio, focused on health software, biosignals, embedded sensing, and applied engineering research.",
  founder: "Jonathan Terrero",
  founderShort: "Jonny Terrero",
  founderRole: "Founder & Engineer, Terrero Labs",
  roleTitle: "Software Engineer · Biomedical Engineering",
  location: "Fort Myers, FL",
  /** One answer everywhere (finding C8). */
  degree: "B.S. Biomedical Engineering, Florida Gulf Coast University",
  minors: "Physics and Computer Science",
  gradDate: "Expected May 2027",
  siteUrl: "https://jonnyterrero.github.io",
  description:
    "Jonathan Terrero is a software engineer and biomedical engineering student building Terrero Labs: health software, embedded sensing, biomedical devices, and computational models — each documented with what is built, what is measured, and what it does not claim.",
} as const;
