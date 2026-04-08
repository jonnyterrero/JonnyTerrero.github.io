import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
        "group relative overflow-hidden border border-primary/18 bg-card/75 backdrop-blur-sm transition-[transform,colors,box-shadow,border-color] duration-200 ease-out",
        "hover:-translate-y-px hover:border-primary/30",
        accentBorderClass(project.accentColor),
        accentCardGlowClass(project.accentColor)
      )}
    >
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="text-base font-semibold">
                <Link
                  href={`/projects/${project.slug}`}
                  className="rounded-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {project.name}
                </Link>
              </CardTitle>
              <Badge
                variant="outline"
                className={statusBadgeClass(project.status)}
              >
                {project.status}
              </Badge>
            </div>
            <CardDescription className="font-semibold text-foreground/88 leading-relaxed">
              {project.tagline}
            </CardDescription>
          </div>
          {showLive ? (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="shrink-0 border-primary/40 text-foreground hover:border-primary/70 hover:bg-primary/10 hover:text-foreground"
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="size-3.5" aria-hidden />
                Live deployment
              </a>
            </Button>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm font-medium leading-relaxed text-muted-foreground">
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
      </CardContent>
    </Card>
  );
}
