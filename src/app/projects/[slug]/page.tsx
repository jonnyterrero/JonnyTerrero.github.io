import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";

import { CaseStudy, CaseStudyToc, CoverageStrip } from "@/components/case-study";
import { ProjectDetailImage } from "@/components/project-detail-image";
import { RedirectPage } from "@/components/redirect-page";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { accentDotClass } from "@/lib/accent";
import { BRAND } from "@/lib/brand";
import {
  DIVISIONS,
  LEGACY_SLUGS,
  getAllSlugs,
  getProjectBySlug,
  hasLiveUrl,
  hasValidRepoUrl,
} from "@/lib/projects";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...getAllSlugs(), ...Object.keys(LEGACY_SLUGS)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (LEGACY_SLUGS[slug]) return { title: "Moved", robots: { index: false } };
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  const title = project.division === "product" ? `${project.name} | ${BRAND.startup}` : project.name;
  return {
    title: { absolute: title },
    description: project.tagline,
    alternates: { canonical: `/projects/${slug}/` },
    openGraph: { title, description: project.tagline, url: `/projects/${slug}/` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const moved = LEGACY_SLUGS[slug];
  if (moved) return <RedirectPage to={`/projects/${moved}/`} label="its new page" />;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const division = DIVISIONS[project.division];
  const live = hasLiveUrl(project.liveUrl);
  const repo = hasValidRepoUrl(project.repoUrl);

  const meta: { label: string; value: string }[] = [
    { label: "Division", value: division.label },
    ...(project.role ? [{ label: "Role", value: project.role }] : []),
    ...(project.timeline ? [{ label: "Timeline", value: project.timeline }] : []),
  ];

  return (
    <article className="space-y-12">
      <header className="space-y-6">
        <nav aria-label="Breadcrumb" className="eyebrow">
          <Link href={division.href} className="hover:text-foreground">
            {division.label}
          </Link>
          <span aria-hidden> / </span>
          <span className="text-foreground/70">{project.name}</span>
        </nav>
        <div className="max-w-3xl space-y-4">
          <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className={cn("size-2.5 shrink-0 rounded-full", accentDotClass(project.accentColor))} aria-hidden />
            {project.name}
          </h1>
          <p className="text-lg leading-relaxed text-foreground/85">{project.tagline}</p>
          <StatusBadge project={project} />
        </div>
        <dl className="grid max-w-3xl gap-x-8 gap-y-3 sm:grid-cols-3">
          {meta.map((m) => (
            <div key={m.label} className="space-y-1">
              <dt className="eyebrow">{m.label}</dt>
              <dd className="text-sm">{m.value}</dd>
            </div>
          ))}
        </dl>
        {live || repo ? (
          <div className="flex flex-wrap gap-2">
            {live ? (
              <Button asChild>
                <a href={project.liveUrl!} target="_blank" rel="noopener noreferrer">
                  Open live app <ExternalLink aria-hidden />
                </a>
              </Button>
            ) : null}
            {repo ? (
              <Button variant="outline" asChild>
                <a href={project.repoUrl!} target="_blank" rel="noopener noreferrer">
                  Source <ExternalLink aria-hidden />
                </a>
              </Button>
            ) : null}
          </div>
        ) : null}
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
        <div className="min-w-0 max-w-3xl space-y-12">
          <section className="space-y-4">
            <p className="prose-body text-base">{project.summary}</p>
            <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-foreground/75">
                  {tech}
                </li>
              ))}
            </ul>
          </section>
          {project.imageSrc ? (
            <div className="max-w-md">
              <ProjectDetailImage src={project.imageSrc} alt={project.imageAlt ?? `Image of ${project.name}`} />
            </div>
          ) : null}
          <CaseStudy project={project} />
        </div>
        <aside className="order-first space-y-8 lg:order-none">
          <div className="space-y-8 lg:sticky lg:top-24">
            <CoverageStrip project={project} />
            <div className="hidden lg:block">
              <CaseStudyToc />
            </div>
          </div>
        </aside>
      </div>

      <div className="border-t border-border pt-6">
        <Link href={division.href} className="text-sm text-muted-foreground hover:text-foreground">
          ← All {division.label.toLowerCase()}
        </Link>
      </div>
    </article>
  );
}
