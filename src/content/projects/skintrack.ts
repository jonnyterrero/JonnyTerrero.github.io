import type { Project } from "@/lib/projects";

export const skintrack: Project = {
  slug: "skintrack",
  name: "SkinTrack+",
  tagline:
    "Structured longitudinal documentation of chronic skin conditions: photos time-indexed against symptoms, medication, and environment.",
  division: "product",
  priority: "standard",
  status: "Prototype",
  statusNote: "Persistence not yet verified · no retained usage data",
  timeline: "2025 – present",
  stack: ["Next.js", "TypeScript", "PWA"],
  // Live link withheld until persistence is verified end-to-end (rebuild plan P0-01).
  liveUrl: null,
  // Repo link withheld until its README and image-analysis placeholder are corrected (see docs/evidence-log.md).
  repoUrl: null,
  summary:
    "A timeline for chronic skin conditions, so a consultation starts from a record instead of recall. Images are documentation for the user and their clinician — they are not analysed.",
  accentColor: "green",
  capabilityDetails: {
    "data-analysis": "Correlation rules over logged symptom, medication, and environmental records — not over images.",
    "biomedical-embedded": "In-app camera capture and structured longitudinal image records with symptom and medication context.",
  },
  caseStudy: {
    problem: [
      {
        type: "p",
        text: "Eczema, psoriasis, acne, and contact dermatitis flare episodically and respond to treatment over weeks. A clinic visit captures one point in that cycle, often an unrepresentative one. The patient’s own record is worse: photos scattered through a camera roll, taken under different light and distance, with no symptom, medication, or environmental context attached.",
      },
      {
        type: "p",
        text: "The gap is a structured longitudinal record: images time-indexed against medication changes, symptom severity, and environmental exposure.",
      },
    ],
    requirements: [
      {
        type: "table",
        columns: ["#", "Requirement", "Acceptance criterion", "Status"],
        rows: [
          ["R0", "Persistence", "Image + context survive upload, app close, and reload on a second device", "Failing at last test — blocking"],
          ["R1", "Capture consistency", "Repeat captures of one site align in scale and colour under normal conditions", "Not yet measured — the defining requirement"],
          ["R2", "Image isolation", "No user can retrieve another user’s image through any storage path", "Blocked on R0"],
          ["R3", "Heatmap correctness", "Calendar heatmap cells match the underlying records", "Not yet tested"],
        ],
      },
      {
        type: "p",
        text: "R0 is the whole project right now: a longitudinal tracker that doesn’t persist has nothing to track.",
      },
    ],
    architecture: [
      {
        type: "diagram",
        caption: "Dashed edges are specified but not verified working. The correlation engine takes no image input.",
        text: `┌────────────────────────────────────────────────┐
│ CLIENT — Next.js PWA (TypeScript)              │
│ in-app camera · photo upload                   │
│ symptom + medication log · calendar heatmap    │
└──────────┬───────────────────────┬─────────────┘
           ┊ image blob            ┊ structured record
           ┊ NOT VERIFIED          ┊ NOT VERIFIED
 ╭┄┄┄┄┄┄┄┄┄▼┄┄┄┄┄┄┄╮     ╭┄┄┄┄┄┄┄┄┄▼┄┄┄┄┄┄┄┄┄┄┄┄╮
 ┊ image storage   ┊     ┊ records database     ┊
 ╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯     ╰┄┄┄┄┄┄┄┄┄┬┄┄┄┄┄┄┄┄┄┄┄┄╯
                                   │ metadata only
                       ┌───────────▼────────────┐
                       │ CORRELATION ENGINE     │
                       │ rules over logged      │
                       │ fields — images are    │
                       │ NOT an input           │
                       └────────────────────────┘`,
      },
    ],
    decisions: [
      {
        type: "decision",
        title: "No learned image model",
        chosen: "Correlation rules over symptom, medication, and environmental records. An image model was evaluated and rejected.",
        alternative: "A trained model for lesion segmentation or classification.",
        tradeoff:
          "An image model would need clinical ground truth I can’t obtain and labelled data I don’t have, and would inherit the documented under-representation of darker skin tones in dermatology datasets. Consumer capture is also uncontrolled, so apparent “change” could just be lighting. Cost: the images contribute nothing to the analysis — they are for the user and their clinician, not the model.",
      },
      {
        type: "decision",
        title: "In-app camera capture alongside a file picker",
        chosen: "Both, with an in-app camera path.",
        tradeoff:
          "The in-app camera is the only place capture conditions can be constrained (framing guides, a ghost of the previous photo), which is what makes longitudinal comparison possible at all. Cost: browser camera permission flows, iOS Safari differences, and orientation handling.",
      },
      {
        type: "decision",
        title: "Client-local persistence in the first shared build",
        chosen: "Ship a browser-local build for early feedback before the backend was complete.",
        tradeoff:
          "Got the app in front of testers sooner. Cost, realised: no data survived — no cohort, no adherence numbers, no image corpus. Persistence is now a release gate, not a follow-up.",
      },
    ],
    scope: [
      {
        type: "pending",
        text: "Independent project. Tester count and surviving feedback from the first shared build are not yet documented.",
      },
    ],
    implementation: [
      {
        type: "list",
        items: [
          "Next.js PWA with in-app camera capture and photo upload, symptom and medication logging, time-indexed records, and a calendar heatmap.",
          "Image processing: none in the product. No segmentation, classification, change detection, or measurement runs on user images.",
          "Backend: server persistence is specified but not verified end-to-end.",
          "Hardware: none.",
        ],
      },
    ],
    verification: [
      {
        type: "pending",
        text: "Nothing is measured yet, and most of it is blocked on R0. Order: end-to-end persistence across two devices; storage isolation (direct path, guessed path, expired signed URL, unauthenticated — expect 0 of 4); row isolation; then capture consistency in scale and colour.",
      },
    ],
    failures: [
      {
        type: "list",
        items: [
          "Shipped a client-local build; the data didn’t survive. A tracking product without verified persistence isn’t testable, because the thing under test is the record.",
          "Evaluated ML for lesion analysis and rejected it, for the reasons above. A documented decision not to build something is stronger than a half-built feature.",
        ],
      },
    ],
    limitations: [
      {
        type: "list",
        items: [
          "Not a diagnostic tool and not a medical device. Performs no analysis, classification, or assessment of any image; does not screen for skin cancer or diagnose any condition. Not evaluated under any FDA pathway.",
          "Images are stored for the user’s own reference and are not model input. Any new, changing, asymmetric, or bleeding lesion warrants a dermatologist’s evaluation.",
          "Any output is a correlation in one user’s self-reported records — unvalidated, with no clinical review.",
          "Persistence is unverified. Capture is uncalibrated, so apparent change between photos may be a capture artifact.",
          "No retained usage data from the first test period, so there is no cohort.",
        ],
      },
    ],
  },
};
