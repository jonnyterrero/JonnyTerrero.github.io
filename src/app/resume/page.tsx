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
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume for Jonathan Terrero — software engineer and biomedical engineering student.",
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
    credential: "Bachelor of Science in Biomedical Engineering | Minors: Physics, Computer Science",
    period: "May 2027",
  },
  {
    school: "Florida SouthWestern State College — Fort Myers, FL",
    credential: "Associate in Arts, Focus: Bioengineering and Biochemistry",
    period: "December 2023",
  },
];

const projects = [
  {
    name: "Robotic Pick-and-Place Arm",
    stack: "Arduino (C/C++), Servo Control, Ultrasonic Sensing, FSM Logic",
    period: "Spring 2026",
    bullets: [
      "Designed and programmed a multi-axis robotic arm for autonomous pick-and-place operation using Arduino Uno, servo motors, and ultrasonic object detection.",
      "Implemented finite state machine control logic to manage motion sequences, sensor feedback, and error handling.",
      "Calibrated joint angles and motion parameters to improve task repeatability and object-handling reliability.",
    ],
  },
  {
    name: "Biomechanical Knee Brace Prototype",
    stack: "Arduino, FSR Sensors, Signal Conditioning, Python",
    period: "Spring 2025",
    bullets: [
      "Designed and prototyped a smart knee brace measuring real-time joint loading using force-sensitive resistors and an Arduino microcontroller.",
      "Built signal-conditioning circuitry and calibration routines converting raw analog readings into quantified force measurements (Newtons), validated against known loads.",
      "Developed Python analytics tools to visualize loading patterns across gait cycles and quantify brace performance, integrating hardware, firmware, and data pipeline end to end.",
    ],
  },
  {
    name: "Health Technology Software Suite (3 Applications)",
    stack: "Python, FastAPI, REST APIs, PyTorch",
    period: "Summer 2025 – Present",
    bullets: [
      "GastroGuard: full-stack GI monitoring platform with FastAPI APIs, persistent storage, wearable ingestion (HRV, sleep), and analytics linking diet, stress, and sleep to symptom flare-ups; in user testing.",
      "MindMap+: privacy-focused FastAPI journaling platform with encrypted storage, authentication, trigger detection, habit scoring, and longitudinal mood analytics; in pre-release testing.",
      "SkinTrack+: full-stack dermatology tracker with backend services for image management, medication and symptom logging, time-series records, and calendar heatmaps; in testing and UI/UX refinement.",
    ],
  },
];

const skills = [
  { label: "Languages", value: "Python, TypeScript, JavaScript, C, C++, SQL, MATLAB" },
  {
    label: "Frameworks & Libraries",
    value: "React, Next.js, Angular, FastAPI, Django, Flutter, PyTorch, Pandas, NumPy, Matplotlib",
  },
  {
    label: "Databases & Data",
    value: "PostgreSQL, SQLite, Firebase/Firestore, data cleaning, CSV/JSON pipelines, statistical visualization",
  },
  {
    label: "Hardware & Engineering",
    value: "Sensor integration, PCB design, breadboarding, microcontroller programming, SolidWorks, 3D printing",
  },
  { label: "Tools & Platforms", value: "Git, GitHub, Linux, Vercel, VS Code, Excel" },
];

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
          Jonathan Terrero
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
