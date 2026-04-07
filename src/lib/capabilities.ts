import type { LucideIcon } from "lucide-react";
import { Activity, Bot, Code2, Cpu, Layers, Wrench } from "lucide-react";

export interface Capability {
  id: string;
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
    id: "full-stack-data",
    title: "Full-Stack & Data Systems",
    descriptor: "Apps with structured data layers",
    description:
      "Designing and building full-stack applications with structured data layers.",
    skills: [
      "Next.js",
      "Supabase (Auth, Postgres, RLS)",
      "PostgreSQL / SQL",
      "API Design (REST, FastAPI)",
    ],
    icon: Layers,
  },
  {
    id: "data-signal",
    title: "Data & Signal Analysis",
    descriptor: "Patterns from behavioral and physiological data",
    description:
      "Extracting meaningful patterns from behavioral and physiological data.",
    skills: [
      "Time-series analysis",
      "Pattern detection",
      "Correlation analysis",
      "Data visualization (Recharts)",
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
      "Arduino",
      "Sensor integration",
      "Physiological data handling",
      "3D printing + prototyping",
      "Biomechanics (knee brace project)",
    ],
    icon: Cpu,
  },
  {
    id: "ai-automation",
    title: "AI + Automation Systems",
    descriptor: "Pipelines and AI-assisted workflows",
    description:
      "Building automation pipelines and AI-assisted engineering workflows.",
    skills: [
      "OpenAI API",
      "AI-assisted workflows",
      "GitHub Actions",
      "Multi-agent systems",
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
      "Cursor",
      "Docker",
      "Obsidian",
      "Structured project systems",
    ],
    icon: Wrench,
  },
];
