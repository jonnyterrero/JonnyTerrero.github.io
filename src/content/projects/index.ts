import type { Project } from "@/lib/projects";

import { bmeVisualizations } from "./bme-visualizations";
import { ecmGrapheneOxide } from "./ecm-graphene-oxide";
import { gastroguard } from "./gastroguard";
import { kneeBrace } from "./knee-brace";
import { mindmap } from "./mindmap";
import { pclScaffolds } from "./pcl-scaffolds";
import { physiologyModels } from "./physiology-models";
import { rdcJarOpener } from "./rdc-jar-opener";
import { cocrReview, healthcareSupplyChain, strykerRsa } from "./research";
import { roboticArm } from "./robotic-arm";
import { skintrack } from "./skintrack";
import { glucoloop, heartwireOs, jonnyjr } from "./systems";

/** Order here is the display order within a tier at equal priority. */
export const allProjects: Project[] = [
  mindmap,
  gastroguard,
  heartwireOs,
  skintrack,
  glucoloop,
  roboticArm,
  kneeBrace,
  rdcJarOpener,
  physiologyModels,
  bmeVisualizations,
  strykerRsa,
  ecmGrapheneOxide,
  pclScaffolds,
  healthcareSupplyChain,
  cocrReview,
  jonnyjr,
];
