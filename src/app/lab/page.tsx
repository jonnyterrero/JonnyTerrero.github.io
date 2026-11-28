import type { Metadata } from "next";
import Link from "next/link";

import { JurinDemo } from "@/components/lab/jurin-demo";

export const metadata: Metadata = {
  title: "Engineering Lab",
  description:
    "An interactive engineering lab: governing equations rendered in KaTeX and a live Plotly plot on the same page, plus a catalog of the full browser dashboards in the BME-Computations-and-Visualizations repo.",
  alternates: { canonical: "/lab/" },
};

const BME_VIS = "https://jonnyterrero.github.io/BME-Computations-and-Visualizations";

interface LabModel {
  course: string;
  title: string;
  description: string;
  href: string;
}

const CATALOG: LabModel[] = [
  {
    course: "Biofluid Mechanics",
    title: "Blood rheology · hydrostatics · Jurin's law",
    description:
      "Newtonian plasma vs. shear-thinning whole blood including Fåhræus–Lindqvist, standing arterial hydrostatics, and capillary rise.",
    href: `${BME_VIS}/biofluid-mechanics/dashboard.html`,
  },
  {
    course: "Biofluid Mechanics",
    title: "Atherosclerotic stenosis CFD",
    description:
      "Interactive stenosis hemodynamics: velocity heat map, pressure drop across the lesion, and wall shear stress.",
    href: `${BME_VIS}/biofluid-mechanics/atherosclerosis-cfd.html`,
  },
  {
    course: "Biofluid Mechanics",
    title: "Sleep apnea / CPAP expiratory relief",
    description:
      "Airway collapse mechanics, a full-night simulation, and the effect of a pressure-relief valve, built for a group CPAP design challenge.",
    href: `${BME_VIS}/biofluid-mechanics/sleep-apnea-simulation.html`,
  },
  {
    course: "Biomedical Instrumentation",
    title: "Medical-instrument architecture",
    description:
      "IEC 60601 signal chain from measurand to display, with the isolation barrier and a cascaded LTI transfer function.",
    href: `${BME_VIS}/biomedical-instrumentation/medical-instrument-architecture/architecture.html`,
  },
  {
    course: "Biomedical Instrumentation",
    title: "Signal models — electrode loading, CMRR, noise",
    description:
      "Skin–electrode loading, thermistor vs strain-gauge linearity, instrumentation-amplifier CMRR, and Johnson noise.",
    href: `${BME_VIS}/biomedical-instrumentation/biomedical-signal-models/visualizations.html`,
  },
  {
    course: "Biomedical Instrumentation",
    title: "Biosignal filter bank",
    description:
      "High-pass, low-pass, band-pass, and notch responses mapped onto the physiological spectrum.",
    href: `${BME_VIS}/biomedical-instrumentation/biomedical-signal-models/filter-bank.html`,
  },
  {
    course: "Biomechanics",
    title: "Sagittal-plane knee simulator",
    description:
      "External load torque vs. patellar-tendon force needed for static equilibrium, with moment-arm sliders.",
    href: `${BME_VIS}/biomechanics/simulator.html`,
  },
  {
    course: "Human Physiology",
    title: "Visualized physiology examples",
    description:
      "Windkessel blood pressure, left-heart PV loops, glucose–insulin, diffusion and membrane potential, enzyme kinetics, Hodgkin–Huxley.",
    href: `${BME_VIS}/human-physiology-for-engineers/visualized-examples/index.html`,
  },
  {
    course: "Bioperformance of Materials",
    title: "Bioperformance dashboard",
    description:
      "Framing and support models for the graphene-oxide fibroblast-recovery study.",
    href: `${BME_VIS}/bioperformance-of-materials/dashboard.html`,
  },
];

export default function LabPage() {
  return (
    <div className="space-y-14">
      <section className="max-w-3xl space-y-4">
        <p className="eyebrow">Engineering Lab</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Governing equations you can re-run
        </h1>
        <p className="text-base leading-relaxed text-foreground/80">
          Course models usually arrive as one plot at one parameter set. The demo below renders
          the governing equation inline and lets you sweep its parameters — so the{" "}
          <em>shape</em> of the relationship is the thing you see, not a single point on it. The
          catalog underneath links to the full browser dashboards for the rest of the models.
        </p>
      </section>

      <JurinDemo />

      <section className="space-y-6" aria-labelledby="catalog">
        <div className="max-w-2xl space-y-2">
          <p className="eyebrow">Full dashboards</p>
          <h2 id="catalog" className="text-2xl font-semibold tracking-tight">
            Course model catalog
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Every dashboard below is a standalone HTML + Chart.js page in the{" "}
            <a
              href="https://github.com/jonnyterrero/BME-Computations-and-Visualizations"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              BME-Computations-and-Visualizations
            </a>{" "}
            repo, deployed to GitHub Pages. Opens in a new tab.
          </p>
        </div>
        <ul className="grid list-none gap-3 p-0 sm:grid-cols-2">
          {CATALOG.map((m) => (
            <li key={m.href} className="surface space-y-1.5 p-4">
              <p className="eyebrow">{m.course}</p>
              <p className="text-sm font-medium">
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  {m.title} ↗
                </a>
              </p>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                {m.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-3xl space-y-3 border-t border-border pt-8">
        <p className="eyebrow">What this isn&rsquo;t</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          The Lab is a teaching and exploration surface, not validated simulation software. Sliders
          may permit values outside a model&rsquo;s valid range. Full limitations and the
          validation posture live on the{" "}
          <Link href="/projects/bme-visualizations/" className="underline underline-offset-4 hover:text-foreground">
            BME Visualizations project page
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
