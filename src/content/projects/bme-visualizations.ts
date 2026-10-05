import type { Project } from "@/lib/projects";

export const bmeVisualizations: Project = {
  slug: "bme-visualizations",
  name: "BME Visualizations",
  tagline:
    "Interactive, parameter-driven models for five biomedical engineering courses — the governing equation and a live plot on the same page.",
  division: "engineering",
  priority: "featured",
  status: "Active development",
  statusNote: "Live on GitHub Pages",
  role: "Independent build",
  timeline: "2025 – present",
  stack: ["HTML", "JavaScript", "Chart.js", "Python · NumPy · Matplotlib", "GitHub Pages"],
  liveUrl: "https://jonnyterrero.github.io/BME-Visualizations/",
  repoUrl: "https://github.com/jonnyterrero/BME-Visualizations",
  summary:
    "Course models usually arrive as one plot at one parameter set. These dashboards let you sweep the parameters — vessel diameter, gain, moment arm — and see the consequence immediately.",
  accentColor: "teal",
  capabilityDetails: {
    "data-analysis": "Interactive plots for blood rheology, hydrostatics, CMRR, and Johnson noise.",
    "core-engineering": "Governing-equation dashboards you can re-run instead of static lecture slides.",
    "biomedical-embedded": "Instrument signal-chain and sagittal-plane knee equilibrium models.",
  },
  caseStudy: {
    problem: [
      {
        type: "p",
        text: "A student usually sees a governing equation’s behaviour at one parameter set: a slide with a fixed plot, or a notebook that runs once. That doesn’t teach the shape of the relationship. Understanding the Fåhræus–Lindqvist effect means knowing that apparent blood viscosity has a minimum at a particular vessel diameter — which a single curve doesn’t show, and sweeping the diameter does.",
      },
    ],
    requirements: [
      {
        type: "table",
        columns: ["#", "Requirement", "Acceptance criterion", "Status"],
        rows: [
          ["R1", "Numerical correctness", "Each model matches its closed-form solution across the slider range", "Not yet tested"],
          ["R2", "Physical plausibility", "Each model reproduces a published reference value or limiting behaviour", "Not yet tested"],
          ["R3", "Units", "Units stated on every axis and slider; equations dimensionally checked", "In progress"],
          ["R4", "Parity", "Browser and Python implementations agree where both exist", "Not yet tested"],
          ["R5", "Zero-install", "Every dashboard opens from GitHub Pages or a local file with no build step", "Met"],
        ],
      },
    ],
    architecture: [
      {
        type: "diagram",
        text: `┌───────────────────────────────────────────────────────┐
│ GitHub Pages — catalog homepage (launch surface)      │
└───┬────────┬────────┬────────┬────────┬───────────────┘
    │        │        │        │        │   one folder per course
┌───▼───┐┌───▼───┐┌───▼───┐┌───▼───┐┌───▼───┐
│ bio-  ││ bio-  ││ instr.││ signal││ bio-  │ each: self-contained
│ mat.  ││ fluids││ arch. ││ models││ mech. │ HTML + Chart.js
└───────┘└───────┘└───────┘└───┬───┘└───────┘ + README + notes
                               │
                     ┌─────────▼─────────┐
                     │ Python / NumPy /  │  reproducible figures;
                     │ Matplotlib        │  second implementation
                     └───────────────────┘`,
      },
    ],
    decisions: [
      {
        type: "decision",
        title: "Self-contained HTML per model instead of one app",
        chosen: "One standalone dashboard per model, with no build step.",
        alternative: "A unified React/Next.js app with shared components.",
        tradeoff:
          "A model still opens in four years on any machine, with no dependency install that has since broken — for coursework meant to outlive a semester, that durability is the feature. Cost: duplicated plotting boilerplate and no cross-model linking.",
      },
      {
        type: "decision",
        title: "Chart.js",
        chosen: "Chart.js for plotting.",
        alternative: "D3 or Plotly.",
        tradeoff:
          "Small API, quick to wire a slider to a redraw. Cost: scientific conventions — log axes, annotated asymptotes, dual y-axes — are awkward.",
      },
      {
        type: "decision",
        title: "A second Python implementation for the signal models",
        chosen: "NumPy/Matplotlib alongside the browser dashboard.",
        tradeoff:
          "Gives reproducible static figures and an independent implementation to check the dashboard against. Cost: two implementations to keep in sync, and drift is silent unless parity is tested.",
      },
    ],
    scope: [
      { type: "p", text: "Built and maintained by me." },
      { type: "pending", text: "Not yet documented: which models were graded course deliverables, and my share of the group-built sleep apnea / CPAP simulation." },
    ],
    implementation: [
      {
        type: "table",
        columns: ["Course", "Model content"],
        rows: [
          ["Bioperformance of Materials", "2×2×2 experimental flow; attachment, morphology, and degradation models; framing for a graphene-oxide fibroblast-recovery project"],
          ["Biofluid Mechanics (BME 3261C)", "Newtonian plasma vs. shear-thinning whole blood, including Fåhræus–Lindqvist; standing arterial hydrostatics; Jurin’s law capillary rise; an arterial-stenosis flow model; and an obstructive sleep apnea / CPAP expiratory-relief simulation built for a group design challenge (Group 10, “Rethinking CPAP”)"],
          ["Medical Instrument Architecture", "Signal chain from measurand to display; isolation as a patient-safety requirement; cascaded LTI transfer function"],
          ["Biomedical Signal Models", "Skin–electrode loading; thermistor vs. strain-gauge linearity; instrumentation-amplifier CMRR; Johnson noise; a filter bank (high-pass, low-pass, band-pass, notch)"],
          ["Biomechanics", "Sagittal-plane knee model: external load torque vs. the patellar-tendon force needed for static equilibrium, with moment-arm sliders"],
        ],
      },
    ],
    verification: [
      {
        type: "pending",
        text: "Not yet validated. Every model here has an independent check available, and none needs users or hardware: closed forms (Jurin’s law, ρgh, √(4kTRB) ≈ 4 nV/√Hz for 1 kΩ at 300 K, ΣM = 0 at the knee), published behaviour (the Fåhræus–Lindqvist viscosity minimum at small diameters), and browser-vs-Python parity. Results will go in a validation table in the repo. Until then, no accuracy claim is made.",
      },
      {
        type: "p",
        text: "Why this matters most here: a dashboard with a wrong constant or a units error still draws a smooth, plausible curve. Nothing looks broken. Checking against closed-form solutions is the only defence.",
      },
    ],
    failures: [
      {
        type: "pending",
        text: "Not yet documented: models that drew a plausible curve but were wrong until checked, unit conversions (mmHg ↔ Pa, µm ↔ m, dB ↔ ratio), and slider ranges that reached physically meaningless values.",
      },
    ],
    limitations: [
      {
        type: "list",
        items: [
          "Teaching and exploration tools — not validated simulation software, and not for clinical or design use.",
          "Simplified assumptions throughout: a rigid-body static knee, lumped linear instrument stages, and idealised fluids outside the regimes where the correlations hold.",
          "References to ISO 10993 and IEC 60601 are illustrative framing, not compliance guidance.",
          "Sliders may permit values outside a model’s valid range.",
          "Single author; no instructor or peer review.",
        ],
      },
    ],
  },
};
