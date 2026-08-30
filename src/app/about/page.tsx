import type { Metadata } from "next";
import Link from "next/link";

import { SkillsCapabilitiesSection } from "@/components/skills-capabilities-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RESUME_PATH } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
};

const experience = [
  {
    role: "Software Engineer I",
    org: "OmniFlex Fitness · Naples, FL — Remote",
    period: "May 2026 – Present",
    bullets: [
      "Ship production features across OmniTask (Angular/TypeScript task platform) and OmniTrivia (real-time multiplayer trivia) using TypeScript, Angular, Firebase/Firestore, and Flutter across web and cross-platform mobile.",
      "Built a batched Firestore write pipeline and typed data-access layer (writeBatch bulk ops, OnPush change detection, takeUntilDestroyed subscription hygiene), cutting Firestore read/write cost per session by 10% and eliminating a class of subscription-leak concurrency bugs.",
      "Run peer code review on a PR-based Git/GitHub workflow with typed return contracts and shared modules; collaborate with founders and the mobile team on a weekly release cadence, including a multiplayer WebSocket rollout for OmniTrivia.",
    ],
  },
];

const education = [
  {
    school: "Florida Gulf Coast University",
    location: "Fort Myers, FL",
    credential: "B.S. Biomedical Engineering · Minors in Physics and Computer Science",
    period: "Expected May 2027",
  },
  {
    school: "Florida SouthWestern State College",
    location: "Fort Myers, FL",
    credential: "A.A., focus in Bioengineering and Biochemistry",
    period: "December 2023",
  },
];

const leadership = [
  { org: "National Society of Black Engineers (NSBE)", role: "Treasurer" },
  { org: "Collegiate 100", role: "Head of Development" },
  { org: "Biomedical Engineering Society (BMES)", role: "Member" },
  { org: "Florida Engineering Society (FES)", role: "Member" },
];

export default function AboutPage() {
  return (
    <article className="space-y-12">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tighter text-foreground">
          <span className="accent-phrase">Builder, Athlete</span>, and{" "}
          <span className="accent-phrase">Systems Thinker</span>
        </h1>
        <p className="text-sm font-medium text-muted-foreground">
          Software engineer, biomedical engineering student, and the operator
          behind HeartWire.
        </p>
      </header>

      <section className="space-y-4 body-prose-muted">
        <p>
          My work is driven by structure and discipline. I treat the body and
          mind as systems. Inputs, outputs, and patterns can be managed,
          understood, and improved over time.
        </p>
        <p>
          HeartWire is where I apply that thinking, turning real-world health
          problems into structured, engineered solutions.
        </p>
      </section>

      <Separator className="separator-cyber" />

      <section className="space-y-6">
        <p className="eyebrow-mono">{"// Experience"}</p>
        <div className="space-y-8">
          {experience.map((job) => (
            <div key={job.role} className="space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-sm font-semibold text-foreground">
                  {job.role} <span className="font-normal text-muted-foreground">· {job.org}</span>
                </h3>
                <span className="text-xs font-medium text-muted-foreground">
                  {job.period}
                </span>
              </div>
              <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <p className="eyebrow-mono">{"// Education"}</p>
        <div className="space-y-4">
          {education.map((ed) => (
            <div
              key={ed.school}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
            >
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {ed.school}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {ed.credential}
                </p>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {ed.period}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <p className="eyebrow-mono">{"// Leadership & Activities"}</p>
        <ul className="flex flex-wrap gap-2">
          {leadership.map((item) => (
            <li key={item.org}>
              <Badge variant="outline" className="font-normal">
                {item.role} · {item.org}
              </Badge>
            </li>
          ))}
        </ul>
      </section>

      <Separator className="separator-cyber" />

      <SkillsCapabilitiesSection />

      <Separator className="separator-cyber" />

      <section className="space-y-4 body-prose-muted">
        <p>
          Outside of engineering, I am an Orthodox Christian, powerlifter, and
          Brazilian Jiu-Jitsu practitioner. These shape how I approach problems
          and growth:{" "}
          <span className="accent-phrase">
            consistent, deliberate, and grounded in reality
          </span>.
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" asChild>
          <Link href={RESUME_PATH}>Resume</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/ecosystem">Ecosystem map</Link>
        </Button>
      </div>
    </article>
  );
}
