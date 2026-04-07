import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="text-sm text-muted-foreground">
          Operator background and how HeartWire is run.
        </p>
      </header>

      <section className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p className="text-foreground font-medium">
          Training: bioengineering, chemistry, and computer science.
        </p>
        <p>
          That combination is deliberate. Wet-lab and instrumentation thinking,
          molecular intuition, and production software are different dialects;
          HeartWire exists where they have to compile to the same executable
          specification: something a person can actually use under real
          constraints.
        </p>
      </section>

      <Separator />

      <section className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-base font-semibold text-foreground">
          Physical practice
        </h2>
        <p>
          <span className="text-foreground">Powerlifting</span> and{" "}
          <span className="text-foreground">Brazilian jiu-jitsu</span> keep the
          work grounded in load, recovery, and repeated failure under pressure.
          They are a useful counterweight to purely abstract system design: the
          body does not care about your roadmap.
        </p>
      </section>

      <Separator />

      <section className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-base font-semibold text-foreground">
          How the pieces fit
        </h2>
        <p>
          <span className="text-foreground">Systems thinking</span>,{" "}
          <span className="text-foreground">physiology</span>, and{" "}
          <span className="text-foreground">engineering integration</span> are
          the default lens—models, interfaces, and hardware are judged on
          whether they improve decisions and adherence, not on novelty for its
          own sake.
        </p>
        <p>
          HeartWire is not the runtime for the apps listed here; it is the map
          and the front door. Each product carries its own stack and deployment;
          this site explains what exists and routes you to the current live
          surface when one is published.
        </p>
      </section>

      <Button variant="outline" asChild>
        <Link href="/ecosystem">Ecosystem map</Link>
      </Button>
    </article>
  );
}
