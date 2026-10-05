import { allProjects } from "@/content/projects";

/**
 * Portfolio tiers (rebuild plan P1-01). A project has exactly one home.
 * - product:     HeartWire, the startup, and its products
 * - engineering: hardware, devices, and computational models
 * - research:    case studies and reviews
 * - systems:     personal tooling (JonnyJr) — not products
 */
export type Division = "product" | "engineering" | "research" | "systems";

/** `archive` entries stay in the data but are not rendered anywhere. */
export type Priority = "flagship" | "featured" | "standard" | "archive";

/** Fixed status vocabulary. Falsifiable detail goes in `statusNote` (finding C7). */
export type Status =
  | "Active development"
  | "In use"
  | "Prototype"
  | "Completed"
  | "Research"
  | "Concept"
  | "Archived";

export type AccentColor = "amber" | "blue" | "green" | "teal" | "violet";

export type CapabilityId =
  | "core-engineering"
  | "fullstack"
  | "data-analysis"
  | "biomedical-embedded"
  | "ai-automation"
  | "tools-workflow";

/**
 * The project documentation template, in order. `scope` is the recommended
 * 4.5 addition (finding C11) and sits between design decisions and implementation.
 */
export type SectionKey =
  | "problem"
  | "requirements"
  | "architecture"
  | "decisions"
  | "scope"
  | "implementation"
  | "verification"
  | "failures"
  | "limitations"
  | "links";

export const SECTION_ORDER: SectionKey[] = [
  "problem",
  "requirements",
  "architecture",
  "decisions",
  "scope",
  "implementation",
  "verification",
  "failures",
  "limitations",
  "links",
];

export const SECTION_TITLES: Record<SectionKey, string> = {
  problem: "Problem / user need",
  requirements: "Requirements",
  architecture: "Architecture",
  decisions: "Design decisions",
  scope: "Scope & role",
  implementation: "Implementation",
  verification: "Verification",
  failures: "Failures / iterations",
  limitations: "Limitations",
  links: "Repository / demo / report",
};

export const SECTION_NUMBERS: Record<SectionKey, string> = {
  problem: "01",
  requirements: "02",
  architecture: "03",
  decisions: "04",
  scope: "4.5",
  implementation: "05",
  verification: "06",
  failures: "07",
  limitations: "08",
  links: "09",
};

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  /** Monospace block diagram. Dashed edges mean "designed, not connected". */
  | { type: "diagram"; text: string; caption?: string }
  | { type: "table"; columns: string[]; rows: string[][] }
  | {
      type: "decision";
      title: string;
      chosen: string;
      alternative?: string;
      tradeoff: string;
    }
  /** Honest placeholder: what is not yet measured and how it will be. Never a number. */
  | { type: "pending"; text: string };

export type CaseStudy = Partial<Record<SectionKey, Block[]>>;

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  division: Division;
  priority: Priority;
  status: Status;
  /** Short, falsifiable qualifier shown next to the status. */
  statusNote?: string;
  /** Who owned what. Required in spirit for any team or course work. */
  role?: string;
  timeline?: string;
  /** Only what is literally true of the shipped artifact. */
  stack: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  /** Reports, model cards, docs inside the repo. */
  extraLinks?: ProjectLink[];
  summary: string;
  accentColor: AccentColor;
  imageSrc?: string;
  imageAlt?: string;
  capabilityDetails?: Partial<Record<CapabilityId, string>>;
  caseStudy: CaseStudy;
}

const visible = allProjects.filter((p) => p.priority !== "archive");

export function getAllProjects(): Project[] {
  return [...visible];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return visible.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return visible.map((p) => p.slug);
}

/** Old project URLs that moved. Static export can't 301, so these pages refresh. */
export const LEGACY_SLUGS: Record<string, string> = {
  "heartwire-agent-suite": "jonnyjr",
};

const PRIORITY_RANK: Record<Priority, number> = {
  flagship: 0,
  featured: 1,
  standard: 2,
  archive: 3,
};

export function getProjectsByDivision(division: Division): Project[] {
  return visible
    .filter((p) => p.division === division)
    .sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]);
}

export function getFlagship(): Project {
  const flagship = visible.find((p) => p.priority === "flagship");
  if (!flagship) throw new Error("No flagship project defined");
  return flagship;
}

export function getProjectsForCapabilityDetail(
  id: CapabilityId,
): { project: Project; line: string }[] {
  const items: { project: Project; line: string }[] = [];
  for (const project of visible) {
    const line = project.capabilityDetails?.[id]?.trim();
    if (line) items.push({ project, line });
  }
  return items.sort((a, b) => a.project.name.localeCompare(b.project.name));
}

export const DIVISION_ORDER: Division[] = [
  "product",
  "engineering",
  "research",
  "systems",
];

export const DIVISIONS: Record<
  Division,
  { label: string; href: string; eyebrow: string; blurb: string }
> = {
  product: {
    label: "HeartWire",
    href: "/heartwire",
    eyebrow: "Startup · company formation in progress",
    blurb:
      "HeartWire is my health-tech startup. Its products turn behavior, symptoms, and study into structured records. Each page states what is built, what is measured, and what the product does not claim.",
  },
  engineering: {
    label: "Engineering",
    href: "/engineering",
    eyebrow: "Hardware, devices, models",
    blurb:
      "Physical builds and computational models: embedded firmware, mechanical design, and physics you can re-run.",
  },
  research: {
    label: "Research",
    href: "/research",
    eyebrow: "Case studies",
    blurb:
      "Device teardowns, stakeholder interviews, and literature review — the analysis side of the engineering work.",
  },
  systems: {
    label: "Systems",
    href: "/systems",
    eyebrow: "Personal tooling",
    blurb:
      "JonnyJr, the infrastructure I built for my own work: an agent bench and an Obsidian second brain. Not a product — it’s judged on whether it changes how I work.",
  },
};

/**
 * Repo link is shown only when the URL names a specific repository,
 * never a bare org or github.com root (finding C5).
 */
export function hasValidRepoUrl(repoUrl: string | null): repoUrl is string {
  if (!repoUrl || !repoUrl.trim()) return false;
  try {
    const u = new URL(repoUrl);
    if (u.hostname !== "github.com" && u.hostname !== "www.github.com") {
      return true;
    }
    const segments = u.pathname.split("/").filter(Boolean);
    return segments.length >= 2;
  } catch {
    return false;
  }
}

export function hasLiveUrl(liveUrl: string | null): liveUrl is string {
  return Boolean(liveUrl?.trim());
}

/** Which template sections have real content, for the coverage strip. */
export function sectionCoverage(
  project: Project,
): { key: SectionKey; state: "done" | "partial" | "pending" }[] {
  return SECTION_ORDER.map((key) => {
    const blocks = project.caseStudy[key];
    if (key === "links") {
      const hasLink =
        hasValidRepoUrl(project.repoUrl) || hasLiveUrl(project.liveUrl);
      return { key, state: hasLink ? "done" : blocks?.length ? "partial" : "pending" };
    }
    if (!blocks?.length) return { key, state: "pending" };
    const allPending = blocks.every((b) => b.type === "pending");
    const anyPending = blocks.some((b) => b.type === "pending");
    return {
      key,
      state: allPending ? "pending" : anyPending ? "partial" : "done",
    };
  });
}
