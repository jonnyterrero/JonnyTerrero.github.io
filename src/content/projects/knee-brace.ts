import type { Project } from "@/lib/projects";

const REPO = "https://github.com/jonnyterrero/Modular-Knee-Brace";

export const kneeBrace: Project = {
  slug: "modular-knee-brace",
  name: "Modular Knee Brace",
  tagline:
    "A 3D-printable, modular knee brace: snap-fit hinges, swappable connectors, and frames rebuilt as a parametric CAD model.",
  division: "engineering",
  priority: "featured",
  status: "Prototype",
  statusNote: "FEA below safety target · parametric rebuild done · print pending",
  timeline: "Phase 1: Spring 2025 · Phase 2: 2026 – present",
  stack: ["SolidWorks", "SolidWorks Simulation (static FEA)", "Fusion 360 (parametric)", "Fusion API · Python", "FDM 3D printing", "Arduino + FSR (Phase 1)"],
  liveUrl: null,
  repoUrl: REPO,
  extraLinks: [
    { label: "Fusion rebuild — engineering notes", href: `${REPO}/blob/main/docs/fusion-rebuild.md` },
    { label: "Part drawings", href: `${REPO}/tree/main/docs/drawings` },
    { label: "FEA report — right lower connector", href: `${REPO}/blob/main/docs/simulation/right-lower-connector-simulationxpress-report.docx` },
  ],
  summary:
    "One project in two phases. Phase 1 (Spring 2025) produced the SolidWorks design, static FEA, and an instrumented prototype that measured brace–limb interface pressure. The FEA showed the design didn’t yet meet its safety-factor target. Phase 2 rebuilds it as a parametric CAD model, with fit checked at every joint before anything is printed.",
  accentColor: "blue",
  imageSrc: "/images/knee-brace-fusion-iso.png",
  imageAlt: "Fusion 360 assembly of the modular knee brace, isometric view: thigh and calf frames joined by connectors and a snap-fit hinge",
  capabilityDetails: {
    "biomedical-embedded": "CAD, static simulation, and FDM printing for a wearable orthosis; FSR interface-pressure sensing in Phase 1.",
    "core-engineering": "Parametric frames, lofted connectors, and a snap-fit hinge with measured, documented tolerances.",
  },
  caseStudy: {
    problem: [
      {
        type: "p",
        text: "Knee support tends to be either too generic (one-size sleeves with undifferentiated compression) or too rigid (post-operative braces that trade usable range of motion for immobilisation). The design gap is a brace whose parts can be swapped or resized per user and per recovery stage, without replacing the whole device — so modularity is the core premise, not a feature.",
      },
      {
        type: "p",
        text: "It started from a specific user: the brace was sized for one person with long-term knee instability after ligament reconstruction, aimed at early-stage rehabilitation and gait support.",
      },
    ],
    requirements: [
      {
        type: "table",
        columns: ["#", "Requirement", "Acceptance criterion", "Status"],
        rows: [
          ["R0", "Structural margin", "Factor of safety 2–4 under the applied loads (target taken from published brace FEA)", "Not met — minimum FoS 1.68 on the right lower connector at 3 lbf"],
          ["R1", "Fit", "Every joint in the assembly mates without interference", "Checked in CAD at every joint (Phase 2)"],
          ["R2", "Dimensional accuracy", "Printed parts within tolerance of CAD nominal (calipers)", "Not yet measured — print pending"],
          ["R3", "Range of motion", "Braced flexion/extension relative to unbraced (goniometer)", "Not yet measured"],
          ["R4", "Modularity", "A connector or hinge swap is fast and needs no tools", "Not yet measured"],
          ["R5", "Mass", "Assembled device within a target mass", "Not yet measured"],
        ],
      },
      {
        type: "p",
        text: "R2–R5 need only calipers, a goniometer, a stopwatch, and a scale once the parts are printed — the cheapest verification data in this portfolio.",
      },
    ],
    architecture: [
      {
        type: "diagram",
        caption: "Phase 1 hardware no longer exists. Phase 2 is modelled and print-ready; its sensing layer is planned, not built.",
        text: `PHASE 1 — instrumented prototype (Spring 2025)
┌────────────┐   ┌──────────────────┐   ┌─────────────┐   ┌──────────────┐
│ FSR array  │──▶│ signal           │──▶│ Arduino ADC │──▶│ Python:      │
│ brace–limb │   │ conditioning     │   │             │   │ calibration →│
│ interface  │   │                  │   │             │   │ gait plots   │
└────────────┘   └──────────────────┘   └─────────────┘   └──────────────┘

PHASE 2 — CAD-first redesign (2026)
┌─────────────────────────────────────────────────────────────────┐
│ thigh frame ── upper connector ─┐                               │
│                                 ├─ snap-fit hinge (inner+outer) │
│ calf frame  ── lower connector ─┘   mirrored left / right       │
└─────────────────────────────────────────────────────────────────┘
 SolidWorks originals → Fusion 360 parametric rebuild → STL (mm) → FDM
 ╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╮
 ┊ planned sensing: ESP32 · hinge angle encoder · thigh and ┊
 ┊ shin IMUs · pressure sensors · LiPo · BLE               ┊
 ╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯`,
      },
    ],
    decisions: [
      {
        type: "decision",
        title: "Modular parts on common sockets instead of a monolithic brace",
        chosen: "Frames, connectors, and hinges meet at one standard socket: 0.77 × 0.27 in, 1.01 in deep, with a flared mouth.",
        alternative: "A single moulded brace with fixed properties.",
        tradeoff:
          "One part can be reprinted to test a change, and a broken part is replaced, not the device. Cost: every interface is a mechanical joint, and joints are where prototypes fail — more parts and more tolerance stack-up.",
      },
      {
        type: "decision",
        title: "Snap-fit hinge pivot",
        chosen: "An inner hinge with a recess and a mushroom snap boss, an outer hinge with a spigot that seats in the recess, and a partial rim that acts as a rotation stop.",
        tradeoff:
          "Assembles without fasteners and limits rotation mechanically. Cost: snap features in FDM plastic are sensitive to layer orientation and fatigue.",
      },
      {
        type: "decision",
        title: "Lofted, handed connectors",
        chosen: "Each connector twists so its frame-end tab matches the frame socket angle (7.5° upper, 10° lower) while the hinge-end tab stays square.",
        tradeoff:
          "Follows the leg’s geometry instead of forcing a flat joint. Cost: the twist runs opposite ways on each side of the leg, so left and right are separate parts.",
      },
      {
        type: "decision",
        title: "Model and fit-check before printing (Phase 2)",
        chosen: "Rebuild the final SolidWorks parts as a parametric Fusion 360 model, measured face by face, before committing material.",
        alternative: "Iterate physically: print, measure, reprint.",
        tradeoff:
          "A CAD iteration takes hours; a print takes days plus material. Cost: CAD fit is not physical fit — printer tolerance and warping still have to be measured (R2).",
      },
      {
        type: "decision",
        title: "FSRs for Phase 1 sensing",
        chosen: "Force-sensitive resistors at the brace–limb interface.",
        alternative: "Load cells or strain gauges.",
        tradeoff:
          "Cheap, thin, conformable, and trivial to read on an analog pin. Cost: hysteresis, drift under sustained load, a nonlinear response, and poor unit-to-unit repeatability — good for relative pressure mapping, poor for absolute force.",
      },
    ],
    scope: [
      {
        type: "p",
        text: "Phase 1 was my individual design project for Design for Manufacturing (EGN 3433C, Spring 2025): design, CAD, FEA, and report. Phase 2 is independent work.",
      },
    ],
    implementation: [
      {
        type: "list",
        items: [
          "Phase 1: FSR array at the brace–limb interface, signal conditioning, Arduino, and a Python pipeline from raw ADC counts through a calibration transform to gait-cycle plots. The physical prototype no longer exists.",
          "SolidWorks part set and assembly, intended for carbon-fibre-reinforced nylon. Linear static FEA in SolidWorks Simulation on three models: the hinge-and-connector assembly, the right upper connector, and the outer right hinge, plus a SimulationXpress study of the right lower connector. All were modelled as Nylon 101, because the software has no carbon-fibre-nylon material, under loads of 0.25–6 lb.",
          "Fusion 360 rebuild: parametric thigh and calf frames (thigh bore 5.75 in, calf bore 4.50 in, named parameters for fit, wrap angle, socket, and strap path), exact copies of the original connectors and hinges positioned on the knee axis, and Python Fusion-API scripts to build, measure, and export parts.",
          "Print-ready STL exports in millimetres.",
        ],
      },
    ],
    verification: [
      {
        type: "list",
        items: [
          "Fit checked in CAD at every joint of the 10-part assembly; corrections to the original parts are documented in the repo.",
          "FEA, right lower connector (SimulationXpress): Nylon 101 (yield 60 MPa), 3 lbf applied, fixed on 15 faces, standard solid mesh. Max von Mises stress 35.7 MPa, max displacement 2.96 mm, minimum factor of safety 1.68 — below the 2–4 target. The report’s conclusion: not yet a safe design for a wearer.",
          "FEA, hinge-and-connector assembly: the revised run peaked just under nylon’s ~11,500 psi yield at loads of a few pounds — effectively no margin.",
        ],
      },
      {
        type: "pending",
        text: "Physical verification waits on the print: caliper deviation against CAD nominal, goniometer range of motion, swap time, and mass. The Phase 1 FSR calibration data is being located; until it is, no load or calibration figure is claimed.",
      },
    ],
    failures: [
      {
        type: "list",
        items: [
          "The Phase 1 hardware and sensing layer no longer exist. A prototype whose only record is the physical object is a prototype you will lose. Phase 2’s response — parametric CAD, version-controlled scripts, documented design intent — is the structural fix.",
          "The first assembly mesh failed. Clearances between the hinges and connectors were too tight, leaving interferences the mesher couldn’t resolve. I bonded the contacts to get a solution, which ran about 30 minutes — and bonding hides exactly the interfaces most likely to fail.",
          "A second assembly run reported a factor of safety around 5,000 under the same conditions. A number that large points to a loading or boundary-condition error, not an overbuilt part, so I don’t treat that run as a result.",
          "No study met the 2–4 safety-factor target. The design needs geometry changes at the connectors and hinges, and that is part of why Phase 2 rebuilds the model parametrically rather than patching it.",
          "The rebuild found inherited issues in the originals: about 0.003 in of press fit on one side of each hinge seat, and connectors and hinges that don’t follow the frame parameters because they are copied geometry.",
        ],
      },
    ],
    limitations: [
      {
        type: "list",
        items: [
          "Not a medical device, not intended for patient use, and not evaluated under any FDA pathway. No human-subject testing.",
          "Phase 1 measured brace–limb interface contact pressure — a proxy for load transfer through the brace, not tibiofemoral joint force, which can’t be measured non-invasively.",
          "Static linear FEA only, with isotropic Nylon 101 standing in for the intended carbon-fibre nylon (and for the PLA/PETG of FDM prints). No fatigue, soft-tissue compliance, strap slip, or out-of-plane loading. The applied loads (0.25–6 lb) haven’t yet been justified against gait loading, mesh convergence hasn’t been checked, and the Phase 2 Fusion geometry hasn’t been re-simulated.",
          "Sized for one user’s leg (n = 1 geometry).",
          "Materials haven’t been evaluated for skin contact (ISO 10993), and durability is uncharacterised.",
        ],
      },
    ],
  },
};
