"use client";

import { useState } from "react";

import { capabilities, type Capability } from "@/lib/capabilities";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function SkillsCapabilitiesSection() {
  const [open, setOpen] = useState<Capability | null>(null);

  return (
    <section className="space-y-6">
      <div className="space-y-1.5">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-cyber-eyebrow">
          {"// Skills & Capabilities"}
        </p>
        <p className="text-sm text-muted-foreground">
          A breakdown of the systems I build and operate across.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cap) => {
          const Icon = cap.icon;
          return (
            <button
              key={cap.id}
              type="button"
              onClick={() => setOpen(cap)}
              className="group flex items-start gap-3 rounded-lg border border-primary/12 bg-card/75 p-4 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-px hover:border-primary/22"
            >
              <Icon
                className="mt-0.5 size-5 shrink-0 text-primary/90"
                aria-hidden
              />
              <div className="min-w-0">
                <span className="text-sm font-semibold leading-tight text-foreground">
                  {cap.title}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground line-clamp-1">
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
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
