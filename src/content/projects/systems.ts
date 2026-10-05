import type { Project } from "@/lib/projects";

const HW_REPO = "https://github.com/jonnyterrero/HeartWire-OS";
const AGENTS = "https://github.com/jonnyterrero/workflows-and-automations/tree/main/agents/agent-team";

export const heartwireOs: Project = {
  slug: "heartwire-os",
  name: "HeartWire OS",
  tagline:
    "Personal study and build system: a structured catalog of courses, resources, and levelled project ideas across engineering domains.",
  division: "systems",
  priority: "standard",
  status: "Active development",
  statusNote: "Working title — rename planned · catalog integrity audit pending",
  role: "Solo · personal infrastructure",
  stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Vercel"],
  liveUrl: "https://heart-wire-os.vercel.app/",
  repoUrl: HW_REPO,
  extraLinks: [
    { label: "Prisma schema", href: `${HW_REPO}/blob/main/build/projects/platform/prisma/schema.prisma` },
  ],
  summary:
    "Built for long-horizon learning, not task throughput: it models what a topic depends on, what has been covered, and which resource is worth starting — none of which are tasks.",
  accentColor: "violet",
  capabilityDetails: {
    "tools-workflow": "Personal study system: tracks, courses, typed resources, and a levelled project-idea catalog.",
    fullstack: "Next.js + Prisma over Postgres with versioned migrations.",
  },
  caseStudy: {
    problem: [
      {
        type: "p",
        text: "Self-directed study across many domains piles up links, textbooks, playlists, and project ideas faster than they are used. The failure isn’t access — it’s sequencing and retrieval: no way to see what a topic depends on, what has been covered, or which of six saved playlists to start.",
      },
    ],
    requirements: [
      {
        type: "table",
        columns: ["#", "Requirement", "Acceptance criterion", "Status"],
        rows: [
          ["R1", "Catalog integrity", "Every resource has a human title, a valid track, a resolvable or explicitly null course, and a well-formed URL", "Failing — known defects in the deployed export"],
          ["R2", "Link validity", "Dead links are detected and flagged, not silently served", "Not implemented"],
          ["R3", "Canonical source", "Exactly one implementation is authoritative", "Open — two data layers exist"],
        ],
      },
    ],
    architecture: [
      {
        type: "diagram",
        caption: "Same project, two data layers of opposite quality. The live URL serves (B).",
        text: `(A) PLATFORM — Next.js + Prisma + PostgreSQL
    hand-curated seed · typed resource enum
    trackId is a foreign key to Track
    → schema-enforced

(B) STATIC EXPORT — PWA with embedded JSON   ← deployed
    resources bulk-scraped from markdown notes
    no validation at the boundary
    → mis-tracked rows, parser-artifact titles`,
      },
    ],
    decisions: [
      {
        type: "decision",
        title: "Relational schema instead of a flat notes system",
        chosen: "Tracks → courses → typed resources in Postgres via Prisma.",
        alternative: "Markdown in Obsidian, which I also run.",
        tradeoff:
          "Every resource attaches to a course and carries a declared type, so coverage gaps are queryable. Cost: rigidity — a resource that doesn’t fit the taxonomy has nowhere to go, and changes need migrations.",
      },
      {
        type: "decision",
        title: "Bulk-scraping existing notes into the catalog",
        chosen: "Import hundreds of curated links in minutes rather than entering them by hand.",
        tradeoff:
          "The catalog reached useful density immediately. Cost, realised: with no validation at the boundary, scraper errors went live silently.",
      },
    ],
    scope: [{ type: "p", text: "Solo. Personal infrastructure, built for my own study. Not a product." }],
    implementation: [
      {
        type: "list",
        items: [
          "Prisma schema over PostgreSQL with versioned migrations, including a migration that locks down PostgREST access and enables RLS.",
          "Content: curriculum tracks across BME, chemistry, mathematics, CS, AI/ML, computational science, neuroscience, embedded systems, mechanics, and physics, plus levelled project ideas per subject (for example, an Ohm’s-law calculator → simulating RC/RL circuits in Python → a SPICE-like mini-simulator).",
        ],
      },
    ],
    verification: [
      {
        type: "pending",
        text: "Next: a scripted integrity audit of every deployed record (title, track, course, URL, type), reported as a failure rate by class; re-ingestion through the typed schema; then the same audit again. The before → after rate is the result. Until then, no catalog size or coverage figure is claimed.",
      },
    ],
    failures: [
      {
        type: "list",
        items: [
          "Scraped ingestion with no validation gate. Visible defects in the deployed export include neuroscience resources filed under electrical engineering, hundreds of rows titled “Resource”, and titles containing raw markdown table syntax.",
          "The same root cause as SkinTrack+ shipping without verified persistence: no gate before deploy. Two projects, one failure mode — which is why validation at the boundary is now the rule.",
        ],
      },
    ],
    limitations: [
      {
        type: "list",
        items: [
          "Single-user personal system, not a product.",
          "The deployed catalog is known to be partially corrupted until it is re-ingested.",
          "It catalogues links, not content: it doesn’t control or version external material, and it doesn’t check for link rot.",
          "It tracks resources, not learning. It can’t tell whether anything was understood.",
          "“HeartWire” is now reserved for a cardiac product line under Terrero Labs, so this system will be renamed.",
        ],
      },
    ],
  },
};

export const agentBench: Project = {
  slug: "heartwire-agent-suite",
  name: "Agent Bench",
  tagline:
    "Personal Claude skill specs with explicit refusal conditions, scope limits for regulated domains, and eval fixtures.",
  division: "systems",
  priority: "featured",
  status: "Active development",
  statusNote: "Personal tooling · eval results not yet graded",
  role: "Solo · personal tooling",
  stack: ["Claude Code Skills (SKILL.md)", "Claude API · Managed Agents", "Python", "YAML manifests"],
  liveUrl: null,
  repoUrl: AGENTS,
  extraLinks: [
    { label: "Eval fixtures", href: `${AGENTS}/evals` },
    { label: "Routing matrix", href: `${AGENTS}/docs/ROUTING_MATRIX.md` },
  ],
  summary:
    "Domain-specialised agent definitions for the work I actually do — software, hardware, coursework, finance, legal review. The interesting part isn’t the number of agents. It’s that each one declares when it must refuse.",
  accentColor: "teal",
  capabilityDetails: {
    "ai-automation": "Versioned Claude skill specs with refusal conditions and adversarial eval fixtures.",
    "tools-workflow": "Single YAML roster, build and deploy scripts, and a routing matrix for overlapping triggers.",
  },
  caseStudy: {
    problem: [
      {
        type: "p",
        text: "A general-purpose assistant fails on consistency, not capability: the same question asked twice gets differently shaped answers, domain guardrails have to be restated every session, and output formats have to be re-specified each time.",
      },
      {
        type: "p",
        text: "The fix is to make each agent’s role, activation trigger, output format, capability boundary, and refusal conditions explicit — and version-controlled.",
      },
    ],
    requirements: [
      {
        type: "table",
        columns: ["#", "Requirement", "Acceptance criterion", "Status"],
        rows: [
          ["R1", "Guardrail enforcement", "Agents refuse when their declared condition is unmet, and only then", "Adversarial fixtures written; runs not yet graded"],
          ["R2", "Non-overlap", "Overlapping triggers resolve by a declared precedence", "Routing matrix written"],
          ["R3", "Actual use", "Invocations per agent over 30 days, long tail included", "Not yet measured"],
          ["R4", "Maintenance", "Specs under version control", "Met"],
        ],
      },
    ],
    architecture: [
      {
        type: "diagram",
        text: `┌──────────────────────────────────────────────┐
│ skills/<agent>/SKILL.md                      │
│ role · trigger · output format · capabilities│
│ REFUSAL CONDITIONS  ← the design feature     │
└───────────────────┬──────────────────────────┘
                    │ manifest.yaml (single roster)
         ┌──────────┴───────────┐
┌────────▼─────────┐   ┌────────▼──────────────┐
│ Claude Code      │   │ Managed Agents        │
│ local skills     │   │ (deploy scripts)      │
└──────────────────┘   └────────┬──────────────┘
                                │
                     ┌──────────▼───────────┐
                     │ run_evals.py         │
                     │ fixtures → recorded  │
                     │ transcripts (ungraded│
                     └──────────────────────┘`,
      },
    ],
    decisions: [
      {
        type: "decision",
        title: "Explicit refusal conditions",
        chosen:
          "Agents declare when they must not produce output. The trading agent will not treat a setup as a thesis without an invalidation level, and defaults to analysis only; supervised execution is opt-in, gated per session and per order.",
        tradeoff:
          "A risk control is encoded in the tool rather than left to the user’s discipline in the moment. Cost: a markdown spec states intent; it doesn’t enforce it. Only testing shows whether the agent actually refuses.",
      },
      {
        type: "decision",
        title: "Scope limits in regulated domains by default",
        chosen: "Finance, tax, legal, and trading agents state that they are not professional advice and flag what needs a licensed professional.",
        tradeoff: "This is a stated constraint, not a technical guarantee — so it is described as one.",
      },
      {
        type: "decision",
        title: "Many narrow agents instead of a few broad ones",
        chosen: "Narrow specs that each carry their own domain conventions.",
        tradeoff:
          "Conventions that would conflict if merged can coexist. Cost: trigger collisions and maintenance load, handled by a routing matrix with explicit precedence.",
      },
    ],
    scope: [{ type: "p", text: "Solo. Personal tooling: no users, not distributed, not a product." }],
    implementation: [
      {
        type: "list",
        items: [
          "Markdown skill specs with YAML frontmatter, a shared commons spec for evidence and write-gate policy, and a single manifest as the roster.",
          "Python scripts to build, upload, and deploy the skills as Managed Agents, and to export them for a second editor.",
          "Eval fixtures per agent covering trigger, boundary, and freshness cases. The finance, legal, trading, and code-audit agents include adversarial cases.",
          "An eval runner that executes fixtures against the deployed agents and records full transcripts. It deliberately does not grade.",
        ],
      },
    ],
    verification: [
      {
        type: "pending",
        text: "Graded results aren’t published yet. Next: score the recorded adversarial transcripts as refusal rates on should-refuse vs. should-answer inputs, per agent with a declared refusal condition. Any productivity figure (“saves N hours”) is deliberately not claimed.",
      },
    ],
    failures: [
      {
        type: "pending",
        text: "Not yet documented: agents written but rarely used, duplicate-looking pairs, and specs rewritten after bad output.",
      },
    ],
    limitations: [
      {
        type: "list",
        items: [
          "Personal tooling, not a product.",
          "Specs are intent, not enforcement, until the evals are graded.",
          "No measurement that any agent produces better output than the same model without the spec.",
          "Inherits the underlying model’s limitations, including hallucination.",
          "The count of specs is not a measure of capability.",
        ],
      },
    ],
  },
};

/** Kept in the data for continuity but not rendered: nothing built, or claims not verifiable. */
export const glucoloop: Project = {
  slug: "glucoloop",
  name: "GlucoLoop",
  tagline: "CGM analytics concept",
  division: "product",
  priority: "archive",
  status: "Concept",
  stack: [],
  liveUrl: null,
  repoUrl: null,
  summary: "Concept only. Nothing is built.",
  accentColor: "green",
  caseStudy: {},
};

export const jonnyjr: Project = {
  slug: "jonnyjr",
  name: "JonnyJr",
  tagline: "Research automation experiments",
  division: "systems",
  priority: "archive",
  status: "Archived",
  stack: [],
  liveUrl: null,
  repoUrl: null,
  summary: "Hidden until its README’s coverage badge and CI claims are verified.",
  accentColor: "teal",
  caseStudy: {},
};
