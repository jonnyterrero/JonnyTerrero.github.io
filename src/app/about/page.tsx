import type { Metadata } from "next";
import Link from "next/link";

import { SkillsCapabilitiesSection } from "@/components/skills-capabilities-section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Builder, Athlete, and Systems Thinker
        </h1>
        <p className="text-sm text-muted-foreground">
          Operator background and how HeartWire is run.
        </p>
      </header>

      <section className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          My work is driven by structure and discipline. I treat the body and
          mind as systems — inputs, outputs, and patterns that can be understood
          and improved over time.
        </p>
        <p>
          HeartWire is where I apply that thinking: turning real-world health
          problems into engineered solutions.
        </p>
        <p>
          Outside of that, I train in powerlifting and Brazilian Jiu-Jitsu —
          both shape how I approach growth: consistent, deliberate, and grounded
          in reality.
        </p>
      </section>

      <Separator className="separator-cyber" />

      <SkillsCapabilitiesSection />

      <Separator className="separator-cyber" />

      <Button variant="outline" asChild>
        <Link href="/ecosystem">Ecosystem map</Link>
      </Button>
    </article>
  );
}
