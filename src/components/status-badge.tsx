import { statusBadgeClass } from "@/lib/accent";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function StatusBadge({
  project,
  showNote = true,
  className,
}: {
  project: Pick<Project, "status" | "statusNote">;
  showNote?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-2 gap-y-1", className)}>
      <span
        className={cn(
          "inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider",
          statusBadgeClass(project.status),
        )}
      >
        {project.status}
      </span>
      {showNote && project.statusNote ? (
        <span className="font-mono text-[11px] text-muted-foreground">{project.statusNote}</span>
      ) : null}
    </span>
  );
}
