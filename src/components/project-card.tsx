import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { accentBorderClass } from "@/lib/accent";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      className={cn(
        "border-l-4 border-l-transparent transition-colors hover:border-border",
        accentBorderClass(project.accentColor)
      )}
    >
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-base font-semibold">
            <Link
              href={`/projects/${project.slug}`}
              className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              {project.name}
            </Link>
          </CardTitle>
          <Badge variant="secondary" className="font-normal">
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
            <Badge key={tech} variant="outline" className="font-mono text-[10px]">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
