import type { Project } from "@/lib/projects";

const REPO = "https://github.com/jonnyterrero/Human-Physiology-for-Engineers";

export const physiologyModels: Project = {
  slug: "quantitative-physiology-models",
  name: "Quantitative Physiology Models",
  tagline:
    "Seven physiology systems modelled as differential equations in MATLAB/Simulink, then rebuilt as interactive browser simulations — from cardiac pressure–volume loops to Hodgkin–Huxley action potentials.",
  division: "engineering",
  priority: "featured",
  status: "Completed",
  statusNote: "Physiology for Engineers I & II · live on GitHub Pages",
  role: "Coursework models solved by me; browser ports built independently",
  timeline: "2025 – 2026",
  stack: ["MATLAB", "Simulink", "JavaScript", "Plotly.js", "GitHub Pages"],
  liveUrl: "https://jonnyterrero.github.io/Human-Physiology-for-Engineers/",
  repoUrl: REPO,
  extraLinks: [
    { label: "Visualization sources and fidelity notes", href: `${REPO}/tree/main/visualized%20examples` },
  ],
  summary:
    "Physiology treated as an engineering system: every organ-level behaviour here is a set of ODEs with parameters you can change. Each browser page reuses the course model’s equations, parameters, and numerical scheme, so a slider change gives the same answer the MATLAB file would.",
  accentColor: "teal",
  capabilityDetails: {
    "data-analysis": "ODE models of cardiovascular, metabolic, cellular, and neural physiology with scenario presets.",
    "core-engineering": "MATLAB/Simulink models ported to JavaScript with matching numerical schemes.",
    "biomedical-embedded": "Windkessel, left-heart PV-loop, glucose–insulin, and Hodgkin–Huxley models.",
  },
  caseStudy: {
    problem: [
      {
        type: "p",
        text: "Physiology is usually taught as description. Engineering it means writing each system as conservation laws and rate equations, then asking what happens when a parameter changes: stiffer arteries, a leaky valve, lower insulin sensitivity, a different extracellular potassium. The course models answer that in MATLAB/Simulink, which most readers can’t open.",
      },
      {
        type: "p",
        text: "The goal of the browser ports: anyone can run the same models, with the same equations, without MATLAB.",
      },
    ],
    requirements: [
      {
        type: "table",
        columns: ["#", "Requirement", "Acceptance criterion", "Status"],
        rows: [
          ["R1", "Model fidelity", "Each page uses the source model’s equations, parameters, and numerical scheme", "Documented per model in the repo’s fidelity notes"],
          ["R2", "Reference reproduction", "Glucose–insulin model reproduces the course fasting steady state (0.81 mg/ml glucose, 0.057 IU/ml insulin)", "Stated in the fidelity notes"],
          ["R3", "Numerical parity", "Browser output matches MATLAB/Simulink output at identical parameters", "Not yet measured"],
          ["R4", "Zero install", "Runs in a browser with no MATLAB, server, or build step", "Met"],
        ],
      },
    ],
    architecture: [
      {
        type: "diagram",
        caption: "One page per assignment. Each page is self-contained HTML + JavaScript; Plotly.js loads from a CDN.",
        text: `course model (MATLAB .m / Simulink .slx)
        │  same equations · parameters · time-stepping
        ▼
self-contained HTML page per model
  sliders + scenario presets ──▶ JS solver ──▶ Plotly charts
        │
        ▼
GitHub Pages catalog (index.html)

CARDIOVASCULAR   Windkessel blood pressure · left heart + aorta (PV loops)
METABOLIC        minimal glucose–insulin model (OGTT, T1/T2 diabetes, drugs)
CELLULAR         population dynamics · diffusion + mass action · enzyme kinetics
NEURAL           Hodgkin–Huxley action potentials`,
      },
    ],
    decisions: [
      {
        type: "decision",
        title: "Port the exact numerical scheme, not just the equations",
        chosen:
          "Each page reproduces the course code’s time-stepping — for example the semi-implicit Euler update in Psa_new.m, and Peskin’s semi-implicit gate and voltage updates at dt = 0.01 ms for Hodgkin–Huxley.",
        alternative: "Re-solve the same equations with a generic high-accuracy solver.",
        tradeoff:
          "Matching the scheme means a page and the MATLAB file agree step for step, so the port can be checked against the original. Cost: it inherits the original scheme’s step-size error — which the cell-population page shows deliberately, by solving logistic growth at three time steps.",
      },
      {
        type: "decision",
        title: "Scenario presets tied to clinical conditions",
        chosen:
          "Presets such as arteriosclerosis, second-degree heart block, aortic stenosis, aortic insufficiency, Type 1 vs. Type 2 diabetes, and IV potassium.",
        tradeoff:
          "Each preset is one parameter change with a physiological meaning, so a reader sees cause and effect. Cost: the presets are illustrative parameter values from the course, not fitted to patient data.",
      },
      {
        type: "decision",
        title: "Self-contained pages instead of an app",
        chosen: "One HTML file per model, with no build step.",
        tradeoff: "Opens anywhere and stays runnable for years. Cost: duplicated plotting code across pages. It’s the same choice made in BME Visualizations, for the same reason.",
      },
    ],
    scope: [
      {
        type: "p",
        text: "The models and their parameters come from the Physiology for Engineers I and II course assignments. I solved the assignments in MATLAB and Simulink, and built the browser ports and the catalog independently.",
      },
    ],
    implementation: [
      {
        type: "table",
        columns: ["Model", "What it computes"],
        rows: [
          ["Blood pressure (Windkessel)", "Arterial pressure from a triangular systolic flow pulse: C·dP/dt = Q_Ao − P/R. Presets for arteriosclerosis, obesity, exercise, and second-degree heart block; live pressure and cardiac-output readouts"],
          ["Left heart & aorta", "Time-varying ventricular compliance (Hoppensteadt–Peskin), diode valves, and an aortic-backflow term. Pressure–volume loops, stroke volume, cardiac output, and stroke work under stenosis and regurgitation"],
          ["Glucose–insulin", "Khoo’s minimal model, with fasting levels found by pre-running to steady state. Oral glucose tolerance test, Type 1 / Type 2 severity gains, and one-compartment drug pharmacokinetics including metformin. MATLAB scripts classify OGTT results"],
          ["Cell population", "Logistic growth with forward-Euler step-size error analysis, predator–prey phase planes, and a stiff three-species bacteria/phage model"],
          ["Diffusion & membrane potential", "Mass-action kinetics against analytic solutions, diffusion with product feedback inhibition, and resting potential by chord conductance — why IV potassium is lethal"],
          ["Enzyme kinetics", "Full E + S ⇌ C → E + P dynamics against the Michaelis–Menten approximation, plus Lineweaver–Burk and Hill fits"],
          ["Hodgkin–Huxley", "Na⁺/K⁺/leak conductances with m, h, n gating; action potentials under applied current"],
        ],
      },
    ],
    verification: [
      {
        type: "list",
        items: [
          "Fidelity notes in the repo record, per model, which source file each page transcribes and which constants it uses.",
          "The glucose–insulin page reproduces the course’s fasting steady state, and the mass-action page plots the Euler solution against the exact analytic solution.",
        ],
      },
      {
        type: "pending",
        text: "Next: a parity check — run each browser model and its MATLAB/Simulink source at identical parameters and report the maximum difference. Any nonzero result is a bug in one of them.",
      },
    ],
    failures: [
      {
        type: "pending",
        text: "Not yet written up: where the first port of each model disagreed with MATLAB, and why.",
      },
    ],
    limitations: [
      {
        type: "list",
        items: [
          "Teaching models with textbook parameters — not fitted to any patient, and not for clinical use.",
          "Lumped-parameter simplifications throughout: single-compartment arteries, ideal valves, a minimal two-state glucose–insulin system, and a space-clamped axon.",
          "Disease presets are single-parameter illustrations, not models of the full pathophysiology.",
        ],
      },
    ],
  },
};
