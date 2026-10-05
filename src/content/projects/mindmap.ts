import type { Project } from "@/lib/projects";

const REPO = "https://github.com/jonnyterrero/MindMap";

export const mindmap: Project = {
  slug: "mindmap-plus",
  name: "MindMap",
  tagline:
    "Longitudinal behavioral health tracking: mood, sleep, stress, symptoms, and routines as structured time-series data.",
  division: "product",
  priority: "flagship",
  status: "Active development",
  statusNote: "Live web app · pre-launch",
  role: "Founder · design and development",
  timeline: "2025 – present",
  stack: ["Next.js 15", "TypeScript", "Supabase (Auth · Postgres · RLS)", "Recharts", "Python (offline ML)", "Vercel"],
  liveUrl: "https://mind-map-bice-nine.vercel.app/",
  repoUrl: REPO,
  extraLinks: [
    { label: "ML model card", href: `${REPO}/blob/main/ml/MODEL_CARD.md` },
    { label: "Launch-readiness self-audit", href: `${REPO}/blob/main/LAUNCH_READINESS_AUDIT.md` },
    { label: "RLS isolation test suite", href: `${REPO}/blob/main/supabase/tests/rls_isolation_tests.sql` },
  ],
  summary:
    "Turns repeated daily check-ins into a consistent multi-variable record, so questions like “does poor sleep precede my low-mood days, or follow them?” have data behind them instead of recall.",
  accentColor: "violet",
  capabilityDetails: {
    fullstack: "Next.js + Supabase with per-user row-level security and an atomic check-in RPC.",
    "data-analysis": "Daily check-ins stored as structured time series; Recharts longitudinal dashboards.",
    "ai-automation": "Offline Python ML layer with abstention and an output-safety gate; evaluated on synthetic data only.",
  },
  caseStudy: {
    problem: [
      {
        type: "p",
        text: "Mental-health and chronic-condition self-tracking is usually either unstructured (a paper journal, a notes app) or locked inside consumer apps that reduce mood to one emoji per day. Neither produces data you can analyse.",
      },
      {
        type: "p",
        text: "Answering “does poor sleep precede my low-mood days, or follow them?” needs timestamped, multi-variable, longitudinal records under a consistent schema. Free-text journaling doesn’t produce that, and consumer apps don’t export it. MindMap exists to produce that record.",
      },
    ],
    requirements: [
      {
        type: "table",
        columns: ["#", "Requirement", "Acceptance criterion", "Status"],
        rows: [
          ["R1", "Daily entry capture", "Full check-in completes in a bounded time, median over real sessions", "Not yet measured"],
          ["R2", "Data durability", "A day’s check-in is atomic: no half-written days; re-submit overwrites, never duplicates", "Designed in (single upsert RPC); not yet load-tested"],
          ["R3", "Auth isolation", "User A cannot read or mutate user B’s rows through any query path", "SQL test suite written; run result not yet published"],
          ["R4", "Cross-device sync", "Entry written on one device is visible on another", "Not yet measured"],
          ["R5", "Analytics latency", "90-day dashboard renders within a p95 budget", "Not yet measured"],
        ],
      },
      {
        type: "pending",
        text: "Thresholds are deliberately left blank until each criterion has a committed measurement. No numbers are published ahead of the test that produces them.",
      },
    ],
    architecture: [
      {
        type: "diagram",
        caption: "Solid lines are built. The ML layer is decoupled: it shares only the database.",
        text: `┌─────────────────────────────────────────────────────┐
│ CLIENT — Next.js 15 App Router, TypeScript (PWA)    │
│ daily check-in · journal · Recharts dashboards      │
└───────────────────────┬─────────────────────────────┘
                        │ HTTPS
┌───────────────────────▼─────────────────────────────┐
│ SERVER — route handlers + server actions            │
│ session refresh (middleware) · journal encryption   │
│ helpers (server-only, AES-256-GCM)                  │
└───────────────────────┬─────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────┐
│ SUPABASE                                            │
│ ├─ Auth: sign-up / sign-in / email confirmation     │
│ ├─ Postgres + RLS: per-user row isolation           │
│ ├─ RPC: upsert_mindmap_entry(jsonb)  ← check-in     │
│ └─ wrapped per-user data keys (journal encryption)  │
└───────────────────────▲─────────────────────────────┘
                        │ reads entries / writes predictions
┌───────────────────────┴─────────────────────────────┐
│ ML LAYER — Python, offline daily batch               │
│ rule baseline · calibrated logistic regression      │
│ abstention contract · output-safety gate            │
└─────────────────────────────────────────────────────┘`,
      },
    ],
    decisions: [
      {
        type: "decision",
        title: "Single RPC for the daily check-in",
        chosen: "One Postgres function, upsert_mindmap_entry(jsonb), called from the check-in page.",
        alternative: "Separate client-side inserts per metric.",
        tradeoff:
          "The RPC makes a day atomic and idempotent — a partial submit cannot leave a half-written day, and a re-submit overwrites rather than duplicates. Cost: the JSON contract is untyped at the database boundary, so client/function drift fails at runtime instead of at build time.",
      },
      {
        type: "decision",
        title: "Authorization in the database (Supabase Auth + RLS)",
        chosen: "Row-level security policies on every user table.",
        alternative: "A custom session and authorization layer in application code.",
        tradeoff:
          "A compromised client holding a valid anon key still cannot read another user’s rows. Cost: RLS policies become load-bearing security code and have to be tested like code — hence the isolation test suite.",
      },
      {
        type: "decision",
        title: "Application-layer envelope encryption for journal text",
        chosen:
          "A random 256-bit data key per user, wrapped by a master key held only in server environment; journal bodies encrypted with AES-256-GCM. Rotated keys are kept so old entries still decrypt.",
        alternative: "Rely on the hosting platform’s disk-level encryption at rest.",
        tradeoff:
          "Platform encryption protects disks, not rows — anyone with database access reads plaintext. Envelope encryption narrows that to holders of the master key. Cost: key management, a backfill path for existing rows, and journal text that can no longer be searched in SQL.",
      },
      {
        type: "decision",
        title: "Rules first, ML as an assistive layer that can abstain",
        chosen:
          "A deterministic rule baseline, plus a calibrated model that returns “not enough data yet” instead of a number when evidence is thin.",
        alternative: "A learned model as the primary engine.",
        tradeoff:
          "Rules give output on day one and every result traces to its rule. The model has to beat that baseline to earn a place. Cost: rules only find relationships someone thought to encode.",
      },
      {
        type: "decision",
        title: "PWA on Vercel rather than native mobile",
        chosen: "One Next.js codebase, deployed continuously.",
        tradeoff:
          "No app-store review and instant deploys. Cost: no background sensor access and weaker iOS notification reliability — which matters for a habit-dependent product.",
      },
    ],
    scope: [
      {
        type: "p",
        text: "Independent project under Terrero Labs. I designed the schema, wrote the application, RLS policies, encryption helpers, and the ML package, and run the deployment.",
      },
    ],
    implementation: [
      {
        type: "list",
        items: [
          "Software: Next.js 15 App Router, TypeScript, Supabase JS client, Recharts, deployed on Vercel.",
          "Auth: sign-up, sign-in, sign-out, and an email-confirmation route handler.",
          "Database: versioned SQL migrations for the schema, RLS policies, and function grants.",
          "Encryption: server-only AES-256-GCM helpers wired into the journal write paths behind a configuration flag, with a backfill script for existing rows.",
          "ML (offline, Python): feature pipeline with lags and rolling windows, rule baseline, per-outcome calibrated logistic regression, an abstention contract, and an output gate that blocks diagnostic phrasing before any text reaches the app.",
          "CI on every push: TypeScript typecheck, engine unit tests, and the ML package’s pytest, ruff, and mypy.",
          "Hardware: none. MindMap has no device integration.",
        ],
      },
    ],
    verification: [
      {
        type: "list",
        items: [
          "Automated checks run in CI on every push: typecheck, unit tests for the insight, correlation, prediction, crisis-detection and encryption modules, and ML tests.",
          "Playwright end-to-end specs cover auth routes, authenticated pages, and legal pages.",
          "The ML layer has been evaluated leave-one-user-out on synthetic data only, with personas whose ground-truth effects are known. Its model card states that next-day migraine prediction is not reliably better than chance.",
        ],
      },
      {
        type: "pending",
        text: "Not yet published: the cross-tenant isolation result (the SQL suite exists; the run output isn’t committed), the end-to-end auth run report, and any evaluation on real user data.",
      },
    ],
    failures: [
      {
        type: "list",
        items: [
          "A missing NEXT_PUBLIC_APP_URL in the production environment sent email-confirmation redirects to the wrong origin. Lesson: variables that differ between local and production are their own failure class; .env.example should be a checked-in contract.",
          "A July 2026 self-audit of the codebase found /api/v1 endpoints returning hardcoded sample data behind header-presence “auth”, notification packages installed but never wired, and a wearables screen with no ingestion source. I wrote these up in the repo rather than leave them implied by the UI.",
          "Framework debt: Next.js middleware is deprecated in favour of a proxy file in Next 16.",
        ],
      },
    ],
    limitations: [
      {
        type: "list",
        items: [
          "Not a medical device. Makes no diagnostic, therapeutic, or clinical claim and has not been evaluated under any FDA pathway.",
          "All inputs are self-reported. No physiological ground truth or sensor data.",
          "Surfaced patterns are correlational and descriptive. The app does not establish causation or control for confounders.",
          "Journal encryption is implemented in code; I haven’t independently confirmed here that it is enabled in the production environment.",
          "The ML layer has no real-data validation. Synthetic-data results show the pipeline works, not that it predicts anything for real users.",
          "No external security audit or penetration test has been done.",
        ],
      },
    ],
  },
};
