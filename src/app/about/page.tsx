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
    <article className="space-y-12">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tighter text-foreground">
          Builder, Athlete, and{" "}
          <span className="accent-text">Systems Thinker</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Operator background and how HeartWire is run.
        </p>
      </header>

      <section className="space-y-4 body-prose-muted">
        <p>
          My work is driven by structure and discipline. I treat the body and
          mind as systems.{" "}
          <span className="accent-text">Inputs, outputs, and patterns</span> can
          be managed, understood, and improved over time.
        </p>
        <p>
          HeartWire is where I apply that thinking, turning real-world health
          problems into{" "}
          <span className="accent-text">structured, engineered solutions</span>.
        </p>
        <p>
          Outside of HeartWire, I am an Orthodox Christian, powerlifter, and
          Brazilian Jiu-Jitsu practitioner. These shape how I approach problems
          and growth: consistent, deliberate, and grounded in reality.
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
