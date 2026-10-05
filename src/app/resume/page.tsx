import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  LOCATION,
  MAILTO_URL,
} from "@/lib/site";
import { BRAND } from "@/lib/brand";
import { TECH_STACK } from "@/lib/tech-stack";
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume for Jonathan Terrero — software engineer and biomedical engineering student, founder of Terrero Labs.",
};

const experience = [
  {
    role: "Software Engineer I",
    org: "OmniFlex Fitness · Naples, FL — Remote",
    period: "May 2026 – Present",
    bullets: [
      "Develop and ship production features across OmniTask (Angular/TypeScript task platform) and OmniTrivia (real-time multiplayer trivia) using TypeScript, Angular, Firebase/Firestore, and Flutter, supporting active users across web and cross-platform mobile clients.",
      "Built batched Firestore write pipeline and typed data-access layer with writeBatch bulk ops, OnPush change detection, and takeUntilDestroyed subscription hygiene, reducing Firestore read/write cost per session by 10% and eliminating a class of subscription-leak concurrency bugs.",
      "Implemented peer code review and PR-based Git/GitHub workflow with typed return contracts, cycle-detection utilities, and DRY shared modules, and collaborated with founders and mobile team to ship OmniTask feature releases and OmniTrivia multiplayer WebSocket rollout on a weekly release cadence.",
    ],
  },
];

const education = [
  {
    school: "Florida Gulf Coast University — Fort Myers, FL",
    credential: `Bachelor of Science in Biomedical Engineering | Minors: ${BRAND.minors.replace(" and ", ", ")}`,
    period: "May 2027",
  },
  {
    school: "Florida SouthWestern State College — Fort Myers, FL",
    credential: "Associate in Arts, Focus: Bioengineering and Biochemistry",
    period: "December 2023",
  },
];

/**
 * Every bullet must trace to code, a deployed artifact, or a committed measurement
 * (rebuild plan §1). See docs/evidence-log.md for the source of each claim.
 */
const projects = [
  {
    name: "Terrero Labs — Health Software (MindMap, GastroGuard, SkinTrack+)",
    stack: "Next.js, TypeScript, Supabase, Python",
    period: "Summer 2025 – Present",
    bullets: [
      "MindMap: behavioral health tracker with an atomic, idempotent daily check-in RPC, per-user row isolation enforced by database RLS policies (with a SQL cross-user isolation test suite), server-side AES-256-GCM envelope encryption for journal text, and an offline Python ML layer (calibrated logistic regression with abstention and an output-safety gate) evaluated on synthetic data.",
      "GastroGuard: GI symptom and meal logging PWA with a hybrid rule-based and correlation trigger engine; tested with 10 users over ~1 month. Designed a vendor-neutral ingestion interface for external health-platform data (HRV, sleep); not yet connected to a live source.",
      "SkinTrack+: prototype dermatology record — in-app photo capture, medication and symptom logging, time-indexed records, and calendar heatmaps. Images are stored for reference and not analysed; server persistence is being verified.",
    ],
  },
  {
    name: "Colour-Sorting Robotic Arm (2-person team)",
    stack: "Arduino (C/C++), Servo Control, Colour Sensing, Ultrasonic Ranging, FSM",
    period: "Spring 2026",
    bullets: [
      "Wrote all firmware for a 4-servo arm on an Arduino Uno; the brief specified behaviour only. Built a finite state machine controller with explicit states for scanning, picking, sensing, delivery, and reset.",
      "Implemented runtime colour classification: photoresistor readings under R/G/B LED illumination matched to per-session calibrated references by nearest distance, accepted only after three stable reads.",
      "Wrote a closed-form inverse-kinematics solver (law of cosines with wrist-point approach, rejecting unreachable targets before any servo command); the final sort used calibrated joint-space poses stored in EEPROM. Joint actuation is open-loop position command.",
    ],
  },
  {
    name: "Modular Knee Brace",
    stack: "SolidWorks, Fusion 360, Arduino, FSR Sensors, Python",
    period: "Spring 2025 – Present",
    bullets: [
      "Phase 1: instrumented brace prototype measuring brace–limb interface pressure distribution with an FSR array, used as a proxy for load transfer through the brace; built signal conditioning, a calibration routine, and Python gait-cycle visualisations.",
      "Phase 2: rebuilt the SolidWorks design as a parametric 10-part Fusion 360 assembly (frames, lofted connectors, snap-fit hinge) with fit checked at every joint; ran linear static studies on the hinge and a connector.",
    ],
  },
  {
    name: "BME Visualizations",
    stack: "HTML, JavaScript, Chart.js, Python, GitHub Pages",
    period: "2025 – Present",
    bullets: [
      "Built a public catalog of interactive computational models for five FGCU biomedical engineering courses, deployed at jonnyterrero.github.io/BME-Visualizations.",
      "Models cover blood rheology and capillary rise, instrument signal-chain architecture, signal loading/CMRR/noise, sagittal-plane knee torque, and biomaterial response.",
      "Each dashboard is parameter-driven, so governing equations can be swept and reconstructed rather than presented as static lecture slides.",
    ],
  },
];

const skills = TECH_STACK.map((category) => ({
  label: category.label,
  value: category.items.join(", "),
}));

const leadership = [
  { org: "National Society of Black Engineers (NSBE)", role: "Treasurer" },
  { org: "Collegiate 100", role: "Head of Development" },
  { org: "Biomedical Engineering Society (BMES)", role: "Member" },
  { org: "Florida Engineering Society (FES)", role: "Member" },
];

export default function ResumePage() {
  return (
    <article className="space-y-10 print:space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tighter text-foreground">
            Resume
          </h1>
          <p className="text-sm font-medium text-muted-foreground">
            Also available on{" "}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
        <PrintButton />
      </header>

      <section className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {BRAND.founder}
        </h2>
        <p className="text-sm text-muted-foreground">
          {LOCATION} ·{" "}
          <a href={MAILTO_URL} className="hover:text-primary hover:underline">
            {CONTACT_EMAIL}
          </a>{" "}
          ·{" "}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary hover:underline"
          >
            linkedin.com/in/jonathan-terrero
          </a>{" "}
          ·{" "}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary hover:underline"
          >
            github.com/jonnyterrero
          </a>
        </p>
      </section>

      <Separator className="print:hidden" />

      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Experience
        </h3>
        {experience.map((job) => (
          <div key={job.role} className="space-y-2">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-sm font-semibold text-foreground">
                {job.role} <span className="font-normal text-muted-foreground">· {job.org}</span>
              </p>
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
      </section>

      <Separator className="print:hidden" />

      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Education
        </h3>
        {education.map((ed) => (
          <div
            key={ed.school}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
          >
            <div>
              <p className="text-sm font-semibold text-foreground">{ed.school}</p>
              <p className="text-sm text-muted-foreground">{ed.credential}</p>
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {ed.period}
            </span>
          </div>
        ))}
      </section>

      <Separator className="print:hidden" />

      <section className="space-y-6">
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Projects
        </h3>
        {projects.map((p) => (
          <div key={p.name} className="space-y-2">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-sm font-semibold text-foreground">
                {p.name}{" "}
                <span className="font-normal text-muted-foreground">
                  · {p.stack}
                </span>
              </p>
              <span className="text-xs font-medium text-muted-foreground">
                {p.period}
              </span>
            </div>
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <Separator className="print:hidden" />

      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Technical Skills
        </h3>
        <dl className="space-y-1.5 text-sm">
          {skills.map((s) => (
            <div key={s.label} className="flex flex-wrap gap-x-2">
              <dt className="font-semibold text-foreground">{s.label}:</dt>
              <dd className="text-muted-foreground">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Separator className="print:hidden" />

      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Leadership & Activities
        </h3>
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

      <Separator className="print:hidden" />

      <Button variant="ghost" size="sm" className="px-0 print:hidden" asChild>
        <Link href="/about">← About</Link>
      </Button>
    </article>
  );
}
