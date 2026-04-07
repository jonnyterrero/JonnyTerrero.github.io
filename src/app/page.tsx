import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getFeaturedProjects } from "@/lib/projects";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <div className="space-y-14">
      <section className="space-y-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Health-tech lab · early-stage studio
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          HeartWire builds clinical and consumer health tools where physiology,
          data, behavior, and systems engineering meet.
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          This site is the front door: identity, portfolio, and a routing layer
          to each application&apos;s live deployment. Product logic and backends
          stay with the apps—here you get orientation, evidence of work, and
          direct links when a build is public.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/ecosystem">View ecosystem</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">About the operator</Link>
          </Button>
        </div>
      </section>

      <Separator />

      <section className="space-y-6" id="philosophy">
        <h2 className="text-lg font-semibold tracking-tight">
          System philosophy
        </h2>
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Health is treated as a{" "}
            <span className="text-foreground">systems problem</span>, not a
            series of disconnected symptoms. Observable inputs span behavior,
            physiology, and environment; outputs are measurable patterns,
            constraints, and candidate interventions.
          </p>
          <p>
            The objective is straightforward:{" "}
            <span className="text-foreground">
              reduce noise, increase signal
            </span>
            . Structured logging, time alignment, and explicit hypotheses beat
            anecdote when you are trying to learn from a body that changes every
            week.
          </p>
        </div>
      </section>

      <Separator />

      <section className="space-y-6" id="featured">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            Featured work
          </h2>
          <Link
            href="/ecosystem"
            className="text-sm text-primary hover:underline"
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
