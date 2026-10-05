import type { Project } from "@/lib/projects";

import { bmeVisualizations } from "./bme-visualizations";
import { gastroguard } from "./gastroguard";
import { kneeBrace } from "./knee-brace";
import { mindmap } from "./mindmap";
import { physiologyModels } from "./physiology-models";
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
  physiologyModels,
  bmeVisualizations,
  strykerRsa,
  healthcareSupplyChain,
  cocrReview,
  jonnyjr,
];
