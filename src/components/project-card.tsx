import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { StatusBadge } from "@/components/status-badge";
import { accentDotClass, accentRailClass } from "@/lib/accent";
import { hasLiveUrl, hasValidRepoUrl, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

/** Cards show at most three stack tags (restructuring plan §12). */
const MAX_TAGS = 3;

export function ProjectCard({ project }: { project: Project }) {
  const live = hasLiveUrl(project.liveUrl);
  const repo = hasValidRepoUrl(project.repoUrl);

  return (
    <article
      className={cn(
        "surface group relative flex h-full flex-col gap-4 overflow-hidden p-5 transition-colors hover:border-foreground/25",
        "before:absolute before:inset-x-0 before:top-0 before:h-px",
        accentRailClass(project.accentColor),
      )}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span
            className={cn("size-1.5 shrink-0 rounded-full", accentDotClass(project.accentColor))}
            aria-hidden
          />
          <h3 className="text-base font-semibold tracking-tight">
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {project.name}
            </Link>
          </h3>
        </div>
        <StatusBadge project={project} />
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{project.tagline}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
        <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
          {project.stack.slice(0, MAX_TAGS).map((tech) => (
            <li
              key={tech}
              className="rounded border border-border px-1.5 py-0.5 font-mono text-[10.5px] text-foreground/70"
            >
              {tech}
            </li>
          ))}
        </ul>
        <span className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
          {live ? <span>live</span> : null}
          {repo ? <span>source</span> : null}
          <ArrowUpRight
            className="size-4 text-muted-foreground transition-colors group-hover:text-foreground"
            aria-hidden
          />
        </span>
      </div>
    </article>
  );
}
