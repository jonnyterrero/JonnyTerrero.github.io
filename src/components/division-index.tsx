import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { DIVISIONS, getProjectsByDivision, type Division } from "@/lib/projects";

export function DivisionGrid({ division, headingLevel = "h2" }: { division: Division; headingLevel?: "h1" | "h2" }) {
  const d = DIVISIONS[division];
  const projects = getProjectsByDivision(division);
  const Heading = headingLevel;
  return (
    <section className="space-y-6" aria-labelledby={`division-${division}`}>
      <div className="max-w-2xl space-y-2">
        <p className="eyebrow">{d.eyebrow}</p>
        <Heading
          id={`division-${division}`}
          className={headingLevel === "h1" ? "text-3xl font-semibold tracking-tight sm:text-4xl" : "text-2xl font-semibold tracking-tight"}
        >
          {headingLevel === "h1" ? d.label : <Link href={d.href} className="hover:text-primary">{d.label}</Link>}
        </Heading>
        <p className="text-sm leading-relaxed text-muted-foreground">{d.blurb}</p>
      </div>
      <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function DivisionPage({ division }: { division: Division }) {
  return (
    <div className="space-y-12">
      <DivisionGrid division={division} headingLevel="h1" />
      <p className="max-w-2xl border-t border-border pt-6 text-sm text-muted-foreground">
        Every project page follows the same template: problem, requirements, architecture, design decisions, scope, implementation, verification, failures, limitations, and links. Sections without evidence yet are marked pending rather than filled in.
      </p>
    </div>
  );
}
