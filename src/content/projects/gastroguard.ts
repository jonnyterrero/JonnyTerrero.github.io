import type { Project } from "@/lib/projects";

export const gastroguard: Project = {
  slug: "gastroguard",
  name: "GastroGuard",
  tagline: "GI symptom, meal, and context logging with per-user trigger analysis.",
  division: "product",
  priority: "featured",
  status: "Active development",
  statusNote: "Tested with 10 users over ~1 month",
  role: "Founder · design and development",
  timeline: "2025 – present",
  stack: ["Next.js", "TypeScript", "Supabase (Auth · Postgres · RLS)", "PWA", "Vercel"],
  liveUrl: "https://gastro-guard-bice.vercel.app/",
  repoUrl: "https://github.com/jonnyterrero/gastro-guard",
  summary:
    "Structured capture of symptoms, meals, stress, and sleep, analysed per person. The aim is to replace a paper diary that nobody analyses with a record that surfaces candidate triggers for the user to discuss with a clinician.",
  accentColor: "amber",
  capabilityDetails: {
    fullstack: "Next.js PWA with Supabase auth and structured GI logging.",
    "data-analysis": "Hybrid rule set + correlation model over per-user symptom records.",
  },
  caseStudy: {
    problem: [
      {
        type: "p",
        text: "Functional and inflammatory GI conditions flare in response to triggers that are multifactorial and individual: diet, stress, sleep, and timing interact differently per person. The standard tools — a paper food-and-symptom diary or a structured elimination protocol — generate observations faster than anyone analyses them, and depend on recall.",
      },
      {
        type: "p",
        text: "The gap isn’t capture. It’s structured capture plus per-individual analysis, so the record can be interpreted without waiting for a ten-minute visual scan at a clinic visit.",
      },
    ],
    requirements: [
      {
        type: "table",
        columns: ["#", "Requirement", "Acceptance criterion", "Status"],
        rows: [
          ["R1", "Logging friction", "Symptom + meal entry completes within a bounded median time", "Derivable from existing timestamps; not yet computed"],
          ["R2", "Adherence", "Share of users logging on most days of a 7-day window", "Computable from the existing cohort; not yet computed"],
          ["R3", "Auth isolation", "User A cannot read or mutate user B’s rows", "Not yet tested"],
          ["R4", "Model performance", "Beats a per-user base-rate baseline on held-out data", "Not published — evaluation split must be confirmed first"],
          ["R5", "Explainability", "Every surfaced trigger traces to the rule or statistic that produced it", "Design goal"],
          ["R6", "Cohort", "≥ 10 users over ≥ 1 month", "Met — 10 users, ~1 month"],
        ],
      },
    ],
    architecture: [
      {
        type: "diagram",
        caption: "Solid lines are built. The dashed source is designed but has never been connected.",
        text: `┌──────────────────────────────────────────────────┐
│ CLIENT — Next.js PWA (TypeScript)                │
│ symptom log · meal log · stress / sleep entry    │
│ insight views                                    │
└────────────────────────┬─────────────────────────┘
                         │ HTTPS
┌────────────────────────▼─────────────────────────┐
│ SUPABASE                                         │
│ ├─ Auth + RLS (per-user isolation)               │
│ └─ Postgres: symptom · meal · context tables     │
└────────────────────────┬─────────────────────────┘
                         │
┌────────────────────────▼─────────────────────────┐
│ ANALYSIS LAYER                                   │
│ deterministic rule set                           │
│   + correlation / predictive model               │
│ → ranked candidate triggers                      │
└──────────────────────────────────────────────────┘

 ╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╮
 ┊ external health-platform API (HRV, sleep)  ┊  NOT CONNECTED
 ┊ vendor-neutral ingestion interface         ┊
 ╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯`,
      },
    ],
    decisions: [
      {
        type: "decision",
        title: "Hybrid rules + statistical model instead of pure ML",
        chosen: "A deterministic rule set combined with a correlation/predictive model.",
        alternative: "An end-to-end learned model over every logged variable.",
        tradeoff:
          "Ten users over a month is nowhere near enough data for a learned model to generalise; it would fit noise and report it as insight. Rules give output on a new user’s first day, are auditable, and let every surfaced trigger be traced. Cost: rules only find relationships I thought to encode — the model half exists to catch what they miss.",
      },
      {
        type: "decision",
        title: "Server-first PWA instead of local-first native",
        chosen: "Next.js + Supabase, one codebase, deployed on Vercel.",
        tradeoff:
          "Fast iteration, cross-device sync, and no app-store review. Cost: sensitive health data leaves the device, so privacy rests on RLS correctness; and the richest wearable sources are native-only.",
      },
      {
        type: "decision",
        title: "Vendor-neutral ingestion interface for wearable data",
        chosen: "Design against any health platform that exposes a public API, rather than one vendor’s SDK.",
        tradeoff:
          "Not locked to one vendor. Cost: it is also why the path doesn’t run yet — public web APIs generally don’t expose raw HRV to a browser client, which is a direct consequence of the server-first PWA decision above.",
      },
    ],
    scope: [
      {
        type: "p",
        text: "Independent project under Terrero Labs. I built the app, schema, and analysis layer and ran the 10-user test period.",
      },
    ],
    implementation: [
      {
        type: "list",
        items: [
          "Software: Next.js PWA in TypeScript; Supabase Auth, Postgres, and RLS; deployed on Vercel.",
          "Analysis: deterministic rules combined with a correlation/predictive component that ranks candidate triggers per user.",
          "Wearable ingestion (HRV, sleep): an interface was designed; no live source is connected and no wearable data has been ingested.",
          "Hardware: none.",
        ],
      },
    ],
    verification: [
      {
        type: "p",
        text: "The app was used by 10 people over roughly one month, and an evaluation set exists.",
      },
      {
        type: "pending",
        text: "No model performance number is published. Before one is, I need to confirm the evaluation split is by user (leave-one-subject-out) or forward in time — a pooled random split lets the model recognise individual users and inflates results — and state how multiple comparisons across candidate triggers are corrected. Adherence statistics from the existing cohort come first: they need no new data.",
      },
    ],
    failures: [
      {
        type: "list",
        items: [
          "Wearable ingestion was designed and never connected. The cause is the coupling between two of my own decisions: a browser-first app and data sources that are native-only.",
          "I scoped the analysis away from a learned-only model once the sample size made it clear a model would fit noise.",
        ],
      },
    ],
    limitations: [
      {
        type: "list",
        items: [
          "Not a medical device. Makes no diagnostic, therapeutic, or dietary-treatment claim and has not been evaluated under any FDA pathway. Output is framed as candidate associations to discuss with a clinician — never as “this food causes your condition”.",
          "Cohort: 10 users over about a month. Exploratory and not generalisable; no external validation cohort.",
          "All inputs are self-reported and subject to recall and adherence bias. No physiological ground truth.",
          "Observations within a user aren’t independent; any analysis that treats them as independent overstates confidence.",
          "Associations are correlational. Reverse causation is plausible in this domain — a flare-up changes what a person eats.",
          "No clinical review of the rule set and no external security audit.",
        ],
      },
    ],
  },
};
