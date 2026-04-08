import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getFeaturedProjects } from "@/lib/projects";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/site";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <div className="space-y-12">
      <section className="hero-panel space-y-6 p-6 sm:p-8">
        <p className="eyebrow-mono">
          Health-tech lab · early-stage studio
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          <span className="text-cyber-accent">HeartWire</span>{" "}
          builds clinical and consumer health tools where physiology, data,
          behavior, and{" "}
          <span className="text-primary">systems engineering</span> meet.
        </h1>
        <div className="max-w-2xl space-y-4 text-base font-medium leading-relaxed text-muted-foreground">
          <p>
            This is my personal site. It is a running log of what I am building
            and how I am building it.
          </p>
          <p>
            It is part portfolio and part system map. When a project is live,
            it is linked here, not just described.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/ecosystem">View ecosystem</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">About the operator</Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              GitHub →
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </section>

      <Separator className="separator-cyber" />

      <section className="space-y-6" id="philosophy">
        <h2 className="text-lg font-semibold tracking-tight">
          System philosophy
        </h2>
        <div className="space-y-4 body-prose-muted">
          <p>
            Human health is a system, just like engineering.{" "}
            <span className="accent-phrase">Engineering is an applied discipline</span>
            , and nothing is truly disconnected, especially when it comes to the
            body.
          </p>
          <p>
            Observable inputs include behavior, mental and emotional state,
            physiology, and environment. Every input and output forms measurable
            patterns, constraints, and potential interventions.
          </p>
          <p>
            Learning about yourself means learning your own health. The
            solutions are often simpler than expected. Reduce noise and
            confusion.{" "}
            <span className="accent-phrase">Increase and consolidate the signal.</span>
          </p>
          <p>
            <span className="accent-phrase">
              Structured inputs, alignment, and explicit hypotheses
            </span>{" "}
            outperform anecdotes when you are trying to understand a system that
            changes constantly.
          </p>
        </div>
      </section>

      <Separator className="separator-cyber" />

      <section className="space-y-6" id="featured">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            Featured work
          </h2>
          <Link
            href="/ecosystem"
            className="text-sm text-primary transition-colors hover:text-primary/80 hover:underline"
          >
            Full ecosystem map
          </Link>
        </div>
        <ul className="grid list-none gap-6 p-0">
          {featured.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
