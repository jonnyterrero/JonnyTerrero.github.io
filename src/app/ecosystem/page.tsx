import type { Metadata } from "next";

import { ProjectCard } from "@/components/project-card";
import { Separator } from "@/components/ui/separator";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  getAllProjects,
  type ProjectCategory,
} from "@/lib/projects";

export const metadata: Metadata = {
  title: "Ecosystem",
};

function projectsInCategory(category: ProjectCategory) {
  return getAllProjects().filter((p) => p.category === category);
}

export default function EcosystemPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tighter text-foreground">
          <span className="accent-text">Ecosystem</span>
        </h1>
        <div className="max-w-2xl space-y-4 body-prose-muted">
          <p>Everything below started as an attempt to solve a real problem.</p>
          <p>
            Each project is part of a larger system, and the structure reflects
            how that work is organized.
          </p>
        </div>
      </header>

      {CATEGORY_ORDER.map((category, index) => {
        const items = projectsInCategory(category);
        if (items.length === 0) return null;
        return (
          <section key={category} className="space-y-6">
            {index > 0 ? <Separator /> : null}
            <h2 className="text-base font-semibold tracking-tight">
              {CATEGORY_LABELS[category]}
            </h2>
            <ul className="grid list-none gap-6 p-0">
              {items.map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
