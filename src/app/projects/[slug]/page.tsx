import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { accentDotClass, statusBadgeClass } from "@/lib/accent";
import {
  getAllSlugs,
  getProjectBySlug,
  hasLiveUrl,
  hasValidRepoUrl,
} from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.name,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const showLive = hasLiveUrl(project.liveUrl);
  const showRepo = hasValidRepoUrl(project.repoUrl);

  return (
    <article className="space-y-10">
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "mt-2 h-2 w-2 shrink-0 rounded-full",
            accentDotClass(project.accentColor)
          )}
          aria-hidden
        />
        <header className="min-w-0 space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Project
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            {project.name}
          </h1>
          <p className="text-base font-medium text-foreground/90">
            {project.tagline}
          </p>
          <Badge variant="outline" className={statusBadgeClass(project.status)}>
            {project.status}
          </Badge>
        </header>
      </div>

      <div className="flex flex-wrap gap-2">
        {showLive ? (
          <Button asChild size="sm">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Open live app
              <ExternalLink className="ml-1" aria-hidden />
            </a>
          </Button>
        ) : (
          <Button size="sm" disabled title="No public deployment yet">
            Live app — pending
          </Button>
        )}
        {showRepo ? (
          <Button variant="outline" size="sm" asChild>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Repository
              <ExternalLink className="ml-1" aria-hidden />
            </a>
          </Button>
        ) : null}
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Summary</h2>
        <p className="text-sm font-medium leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Use case</h2>
        <p className="text-sm font-medium leading-relaxed text-muted-foreground">
          {project.useCase}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Who it&apos;s for</h2>
        <ul className="flex flex-wrap gap-2">
          {project.targetUsers.map((u) => (
            <li key={u}>
              <Badge variant="outline">{u}</Badge>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Stack</h2>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Badge variant="secondary" className="font-mono text-xs">
                {tech}
              </Badge>
            </li>
          ))}
        </ul>
      </section>

      {project.detail ? (
        <>
          <Separator />
          <section className="space-y-4">
            <h2 className="text-base font-semibold tracking-tight">
              Design deep dive
            </h2>
            <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-foreground">Problem</h3>
                <p>{project.detail.problem}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-foreground">Design</h3>
                <p>{project.detail.design}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-foreground">
                  Engineering considerations
                </h3>
                <ul className="list-disc space-y-2 pl-5">
                  {project.detail.engineering.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </>
      ) : null}

      <Separator />

      <Button variant="ghost" size="sm" className="px-0" asChild>
        <Link href="/ecosystem">← Back to ecosystem</Link>
      </Button>
    </article>
  );
}
