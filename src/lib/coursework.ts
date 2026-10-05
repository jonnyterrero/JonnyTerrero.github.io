/**
 * Relevant coursework. Only courses with public evidence of the work are listed,
 * and each links to that evidence. Add more from the LinkedIn course list as
 * their work is published: { name, code?, area, evidence?: { label, href } }.
 */
export interface Course {
  name: string;
  code?: string;
  area: "Biomedical" | "Electrical" | "Embedded systems";
  /** What the course work produced, in one line. */
  work: string;
  evidence?: { label: string; href: string };
}

export const COURSEWORK: Course[] = [
  {
    name: "Physiology for Engineers I & II",
    area: "Biomedical",
    work: "ODE models of cardiovascular, metabolic, cellular, and neural physiology in MATLAB/Simulink",
    evidence: { label: "Quantitative Physiology Models", href: "/projects/quantitative-physiology-models/" },
  },
  {
    name: "Biofluid Mechanics",
    code: "BME 3261C",
    area: "Biomedical",
    work: "Blood rheology, hydrostatics, stenosis flow, and a CPAP design-challenge simulation",
    evidence: { label: "BME Visualizations", href: "/projects/bme-visualizations/" },
  },
  {
    name: "Biomechanics",
    area: "Biomedical",
    work: "Sagittal-plane knee equilibrium and patellar-tendon force model",
    evidence: { label: "BME Visualizations", href: "/projects/bme-visualizations/" },
  },
  {
    name: "Bioperformance of Materials",
    area: "Biomedical",
    work: "Graphene-oxide fibroblast-recovery study design and degradation models",
    evidence: { label: "BME Visualizations", href: "/projects/bme-visualizations/" },
  },
  {
    name: "Medical Instrument Architecture",
    area: "Biomedical",
    work: "Medical-device signal chain from measurand to display, with patient isolation",
    evidence: { label: "BME Visualizations", href: "/projects/bme-visualizations/" },
  },
  {
    name: "Biomedical Signal Models",
    area: "Biomedical",
    work: "Electrode loading, sensor linearity, CMRR, noise, and filter design",
    evidence: { label: "BME Visualizations", href: "/projects/bme-visualizations/" },
  },
  {
    name: "Intro to Mechatronic Design",
    area: "Embedded systems",
    work: "Arduino firmware: FSM control, sensing, and inverse kinematics for a robotic arm",
    evidence: { label: "Robotic Pick-and-Place Arm", href: "/projects/robotic-pick-place-arm/" },
  },
  {
    name: "Circuits",
    area: "Electrical",
    work: "Circuit analysis — the basis for the instrumentation signal-chain models",
  },
  {
    name: "Signals & Systems",
    area: "Electrical",
    work: "LTI systems, transforms, and filtering — the basis for the filter-bank and signal models",
  },
];
