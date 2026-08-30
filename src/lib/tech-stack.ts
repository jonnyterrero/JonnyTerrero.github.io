export interface TechStackCategory {
  label: string;
  items: string[];
}

/** Canonical stack list — kept in sync with the resume. */
export const TECH_STACK: TechStackCategory[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C", "C++", "SQL", "MATLAB"],
  },
  {
    label: "Frameworks & Libraries",
    items: [
      "React",
      "Next.js",
      "Angular",
      "FastAPI",
      "Django",
      "Flutter",
      "PyTorch",
      "Pandas",
      "NumPy",
      "Matplotlib",
    ],
  },
  {
    label: "Databases & Data",
    items: [
      "PostgreSQL",
      "SQLite",
      "Firebase / Firestore",
      "Supabase",
      "data cleaning",
      "CSV/JSON pipelines",
      "statistical visualization",
    ],
  },
  {
    label: "AI & Agents",
    items: ["Claude Agent SDK", "Claude Code Skills", "OpenAI API", "MCP"],
  },
  {
    label: "Hardware & Engineering",
    items: [
      "Arduino",
      "Sensor integration",
      "PCB design",
      "breadboarding",
      "microcontroller programming",
      "SolidWorks",
      "3D printing",
    ],
  },
  {
    label: "Tools & Platforms",
    items: ["Git", "GitHub", "Linux", "Vercel", "Docker", "VS Code", "Excel"],
  },
];
