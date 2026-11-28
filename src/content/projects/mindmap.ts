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
  liveUrl: "https://getmindmapplus.app",
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
        columns: ["#", "Requirement", "Target", "Actual"],
        rows: [
          ["R1", "Daily entry capture", "Median full check-in ≤ 60 s under real use", "Not yet measured"],
          ["R2", "Data durability", "Zero partial days under fault injection; a re-submit overwrites, never duplicates", "Designed in (single upsert RPC); not yet load-tested"],
          ["R3", "Auth isolation", "Every cross-tenant read and write attempt is denied by RLS", "SQL test suite written; run result not yet published"],
          ["R4", "Cross-device sync", "An entry written on device A is visible on device B within 10 s on a typical connection", "Not yet measured"],
          ["R5", "Analytics latency", "p95 90-day dashboard render ≤ 500 ms on a mid-tier phone", "Not yet measured"],
        ],
      },
      {
        type: "p",
        text: "Targets are set here as engineering commitments, not as marketing claims. Actuals are left as “not yet measured” wherever the test has not run. No number appears in Actual that is not traceable to a committed measurement.",
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
          "Software: Next.js 15 App Router, TypeScript, Supabase JS client, Recharts, deployed on Vercel at getmindmapplus.app.",
          "Auth: sign-up, sign-in, sign-out, and an email-confirmation route handler.",
          "Database: versioned SQL migrations for the schema, RLS policies, and function grants.",
          "Encryption: server-only AES-256-GCM helpers wired into the journal write paths behind a configuration flag, with a backfill script for existing rows.",
          "ML (offline, Python): feature pipeline with lags and rolling windows, rule baseline, per-outcome calibrated logistic regression, an abstention contract, and an output gate that blocks diagnostic phrasing before any text reaches the app.",
          "CI on every push: TypeScript typecheck, engine unit tests, and the ML package’s pytest, ruff, and mypy.",
          "Hardware: none. MindMap has no device integration.",
        ],
      },
      {
        type: "image",
        src: "/images/mindmap/mindmap-home-dashboard.png",
        alt: "MindMap home dashboard: Today's check-in card, Pattern Discovery day counter, MindMap Score tile, What MindMap noticed section, and bottom nav with Dashboard / Journal / Meds",
        caption: "Home dashboard. Pattern Discovery day counter and MindMap Score sit above a surfaced-pattern card; dashboard / journal / meds are reachable from the bottom nav.",
      },
      {
        type: "image",
        src: "/images/mindmap/mindmap-check-in-complete.png",
        alt: "MindMap check-in complete screen showing today's MindMap Score (70) and Pattern Discovery Day 14 of 20, with buttons to edit the check-in, go home, or view the Baseline Report",
        caption: "Check-in complete state. Today's score and day-of-20 progress show after submit; copy stays within the self-tracking disclaimer.",
      },
      {
        type: "image",
        src: "/images/mindmap/mindmap-baseline-report.png",
        alt: "MindMap Baseline Report: eight KPI tiles (avg sleep 7.4h, sleep quality 3.9/5, migraine days 5, intensity 2.4/10, anxiety 1.6/10, focus 5.5/10, routine completion 0%, medication consistency 0%) above an in-app medical disclaimer",
        caption: "Baseline Report, emitted automatically after the first 14 check-ins. Each tile is averaged or counted straight off the structured check-in rows, not inferred.",
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
        type: "p",
        text: "Deployment reach — Vercel Web Analytics on getmindmapplus.app, rolling 3 months ending 2026-11-26:",
      },
      {
        type: "table",
        columns: ["Metric", "Value", "Notes"],
        rows: [
          ["Unique visitors", "126", "Vercel Web Analytics, last 3 months"],
          ["Page views", "420", "Same window"],
          ["Bounce rate", "67%", "Marketing/landing traffic; not product engagement"],
          ["Top pages", "/ · /login · /today", "Landing, auth, daily check-in"],
          ["Top referrers", "vercel.com · bing.com · github.com", "Organic, not paid"],
          ["Device split", "Desktop 66% · Mobile 34%", "PWA is used on both"],
          ["Top regions", "United States 76% · Poland 6% · Germany 4% · France 3%", "Unprompted international reach"],
        ],
      },
      {
        type: "image",
        src: "/images/mindmap/mindmap-vercel-analytics-overview.png",
        alt: "Vercel Web Analytics screenshot for getmindmapplus.app showing 126 visitors, 420 page views, and 67% bounce rate over the last 3 months, with a timeline chart from Aug 30 to Nov 22 and a top-pages / top-referrers breakdown",
        caption: "Vercel Web Analytics, last 3 months. Traffic is deployment reach, not product validation — a visitor landing on / is not a logged check-in.",
      },
      {
        type: "image",
        src: "/images/mindmap/mindmap-vercel-analytics-visitors.png",
        alt: "Vercel Web Analytics visitor breakdown: Countries (United States 76%, Poland 6%, Germany 4%, France 3%, Canada 2%), Devices (Desktop 66%, Mobile 34%), Operating Systems (Windows 38%, iOS 28%, GNU/Linux 20%, Mac 8%, Android 6%)",
        caption: "Visitor composition. Device and OS mix are the production design constraint — mobile is a third of the traffic, iOS is the second-largest OS, so the PWA has to render correctly on both.",
      },
      {
        type: "pending",
        text: "Not yet published: the cross-tenant isolation result (the SQL suite exists; the run output isn’t committed), the end-to-end auth run report, and any evaluation of the ML layer on real user data. Deployment-reach numbers above are traffic, not product-outcome evidence.",
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
