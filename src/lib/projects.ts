import projectsData from "../../projects.json";

export type ProjectCategory =
  | "health-tech"
  | "platform"
  | "biomedical-device"
  | "research"
  | "ai-tooling";

export type AccentColor = "amber" | "blue" | "green" | "teal" | "violet";

export type CapabilityId =
  | "core-engineering"
  | "fullstack"
  | "data-analysis"
  | "biomedical-embedded"
  | "ai-automation"
  | "tools-workflow";

export interface ProjectDetail {
  problem?: string;
  design?: string;
  engineering?: string[];
  sections?: { title: string; paragraphs: string[] }[];
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: string;
  category: ProjectCategory;
  stack: string[];
  liveUrl: string;
  repoUrl: string;
  summary: string;
  useCase: string;
  targetUsers: string[];
  accentColor: AccentColor;
  featured: boolean;
  /** Path under `/public`, e.g. `/images/photo.png` */
  imageSrc?: string;
  imageAlt?: string;
  capabilityDetails?: Partial<Record<CapabilityId, string>>;
  detail?: ProjectDetail;
}

const projects = projectsData as Project[];

export function getAllProjects(): Project[] {
  return [...projects];
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getProjectsForCapabilityDetail(
  id: CapabilityId,
): { project: Project; line: string }[] {
  const items: { project: Project; line: string }[] = [];
  for (const project of projects) {
    const line = project.capabilityDetails?.[id]?.trim();
    if (line) items.push({ project, line });
  }
  return items.sort((a, b) => a.project.name.localeCompare(b.project.name));
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export const CATEGORY_ORDER: ProjectCategory[] = [
  "health-tech",
  "platform",
  "biomedical-device",
  "research",
  "ai-tooling",
];

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  "health-tech": "Health-Tech Apps",
  platform: "Platform / Data Layer",
  "biomedical-device": "Biomedical Devices",
  research: "Research and case studies",
  "ai-tooling": "AI / Tooling",
};

/** Repo link is shown only when URL looks like a specific repository, not a bare org/root. */
export function hasValidRepoUrl(repoUrl: string): boolean {
  if (!repoUrl || !repoUrl.trim()) return false;
  try {
    const u = new URL(repoUrl);
    if (u.hostname !== "github.com" && u.hostname !== "www.github.com") {
      return true;
    }
    const path = u.pathname.replace(/\/$/, "");
    const segments = path.split("/").filter(Boolean);
    return segments.length >= 2;
  } catch {
    return false;
  }
}

export function hasLiveUrl(liveUrl: string): boolean {
  return Boolean(liveUrl?.trim());
}
