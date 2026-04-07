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
        <h1 className="text-3xl font-semibold tracking-tight">Ecosystem</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Everything below is sourced from a single dataset. Categories reflect
          how work is organized—apps, shared platform layers, devices, and
          internal tooling—not marketing tiers.
        </p>
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
