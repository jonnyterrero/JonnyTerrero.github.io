import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  accentBorderClass,
  accentCardGlowClass,
  accentChipClass,
  statusBadgeClass,
} from "@/lib/accent";
import { hasLiveUrl, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  const showLive = hasLiveUrl(project.liveUrl);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-border/70 bg-card/75 backdrop-blur-sm transition-all duration-300",
        "hover:-translate-y-px",
        accentBorderClass(project.accentColor),
        accentCardGlowClass(project.accentColor)
      )}
    >
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-base font-semibold">
            <Link
              href={`/projects/${project.slug}`}
              className="rounded-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {project.name}
            </Link>
          </CardTitle>
          <Badge variant="outline" className={statusBadgeClass(project.status)}>
            {project.status}
          </Badge>
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {project.tagline}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className={cn("font-normal", accentChipClass(project.accentColor))}
            >
              {tech}
            </Badge>
          ))}
        </div>
        {showLive ? (
          <p className="pt-1">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Live app →
            </a>
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
