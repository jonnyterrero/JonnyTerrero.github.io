import type { LucideIcon } from "lucide-react";
import { Activity, Bot, Code2, Cpu, Layers, Wrench } from "lucide-react";

import type { CapabilityId } from "@/lib/projects";

export interface Capability {
  id: CapabilityId;
  title: string;
  descriptor: string;
  description: string;
  skills: string[];
  icon: LucideIcon;
}

export const capabilities: Capability[] = [
  {
    id: "core-engineering",
    title: "Core Engineering",
    descriptor: "Systems and scientific computing",
    description:
      "Low-level and high-level programming across systems and scientific computing.",
    skills: ["Python", "C/C++", "MATLAB", "TypeScript"],
    icon: Code2,
  },
  {
    id: "fullstack",
    title: "Full-Stack & Data Systems",
    descriptor: "Apps with structured data layers",
    description:
      "Designing and building full-stack applications with structured data layers.",
    skills: [
      "Next.js / React / Angular",
      "Supabase (Auth, Postgres, RLS)",
      "Firebase / Firestore",
      "PostgreSQL / SQL",
      "API Design (REST, FastAPI, Django)",
    ],
    icon: Layers,
  },
  {
    id: "data-analysis",
    title: "Data & Signal Analysis",
    descriptor: "Patterns from behavioral and physiological data",
    description:
      "Extracting meaningful patterns from behavioral and physiological data.",
    skills: [
      "Time-series feature engineering (lags, rolling windows)",
      "Correlation analysis with explicit limitations",
      "Calibration and abstention for predictions",
      "Data visualization (Recharts, Chart.js, Matplotlib)",
    ],
    icon: Activity,
  },
  {
    id: "biomedical-embedded",
    title: "Biomedical + Embedded Systems",
    descriptor: "Physical systems meets software",
    description:
      "Bridging physical systems and software for real-world health applications.",
    skills: [
      "Arduino / microcontroller programming",
      "Sensor integration (FSR, ultrasonic, photoresistor colour sensing)",
      "PCB design + breadboarding",
      "SolidWorks / Fusion 360 CAD + FDM printing",
      "Biomechanics and orthosis design",
    ],
    icon: Cpu,
  },
  {
    id: "ai-automation",
    title: "AI + Automation Systems",
    descriptor: "Pipelines and AI-assisted workflows",
    description:
      "Personal agent tooling with explicit refusal conditions, and safety-gated ML for health data.",
    skills: [
      "Claude Code Skills",
      "Claude API (Managed Agents)",
      "OpenAI API",
      "scikit-learn (calibrated logistic regression)",
      "GitHub Actions",
    ],
    icon: Bot,
  },
  {
    id: "tools-workflow",
    title: "Tools & Workflow",
    descriptor: "Build, organize, and ship efficiently",
    description:
      "Systems and tools used to build, organize, and ship projects efficiently.",
    skills: [
      "Git / GitHub",
      "Linux",
      "Vercel",
      "Cursor",
      "Docker",
      "Obsidian",
      "Structured project systems",
    ],
    icon: Wrench,
  },
];
