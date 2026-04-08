"use client";

import Link from "next/link";
import { useState } from "react";

import { capabilities, type Capability } from "@/lib/capabilities";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getProjectsForCapabilityDetail } from "@/lib/projects";

export function SkillsCapabilitiesSection() {
  const [open, setOpen] = useState<Capability | null>(null);

  return (
    <section className="space-y-6">
      <div className="space-y-1.5">
        <p className="eyebrow-mono">{"// Skills & Capabilities"}</p>
        <p className="text-sm font-medium text-muted-foreground">
          A breakdown of the systems I build and operate across.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cap) => {
          const Icon = cap.icon;
          return (
            <button
              key={cap.id}
              type="button"
              onClick={() => setOpen(cap)}
              className="group flex items-start gap-3 rounded-lg border border-primary/12 bg-card/75 p-4 text-left backdrop-blur-sm transition-[transform,colors,box-shadow,border-color] duration-200 ease-out hover:-translate-y-px hover:border-primary/22"
            >
              <Icon
                className="mt-0.5 size-5 shrink-0 text-primary/90"
                aria-hidden
              />
              <div className="min-w-0">
                <span className="text-sm font-semibold leading-tight text-foreground">
                  {cap.title}
                </span>
                <span className="mt-0.5 block text-xs font-medium text-muted-foreground line-clamp-1">
                  {cap.descriptor}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        {open && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{open.title}</DialogTitle>
              <DialogDescription className="leading-relaxed">
                {open.description}
              </DialogDescription>
            </DialogHeader>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              {open.skills.map((skill) => (
                <li key={skill} className="flex items-baseline gap-2">
                  <span className="text-primary/70" aria-hidden>
                    ›
                  </span>
                  {skill}
                </li>
              ))}
            </ul>
            {(() => {
              const usedIn = getProjectsForCapabilityDetail(open.id);
              if (usedIn.length === 0) return null;
              return (
                <div className="mt-6 space-y-3">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Used In
                  </p>
                  <ul className="space-y-3 text-sm">
                    {usedIn.map(({ project, line }) => (
                      <li key={project.slug} className="space-y-0.5">
                        <div>
                          <Link
                            href={`/projects/${project.slug}`}
                            className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                          >
                            {project.name}
                          </Link>
                        </div>
                        <p className="text-xs leading-snug text-muted-foreground">
                          {line}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
