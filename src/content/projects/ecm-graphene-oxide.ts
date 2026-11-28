import type { Project } from "@/lib/projects";

export const ecmGrapheneOxide: Project = {
  slug: "ecm-graphene-oxide-fibroblasts",
  name: "ECM Surface × Graphene Oxide: Fibroblast Response",
  tagline:
    "Does the culture surface — TCP, Collagen I, or Gelatin — change how fibroblasts respond to and recover from a sublethal graphene oxide exposure?",
  division: "research",
  priority: "featured",
  status: "Research",
  statusNote: "SURIS Nov 2026 · BME 3101C Fall 2026 · 3 runs, 6 conditions",
  role: "Co-investigator with Gage Grismer and Rodman Smith, advised by Dr. Marzhan Sypabekova · experimental design, cell culture, imaging analysis, write-up",
  timeline: "Fall 2026",
  stack: [
    "Cell culture (NIH/3T3 fibroblasts)",
    "Graphene oxide (Sigma-Aldrich)",
    "ECM coatings (rat-tail Collagen I, 0.2% Gelatin)",
    "Scratch / wound-healing assay",
    "Phase-contrast microscopy (4×, 10×)",
    "Threshold-based image analysis",
  ],
  liveUrl: null,
  repoUrl: null,
  extraLinks: [
    {
      label: "Poster — SURIS 2026 source (PPTX, 30 MB)",
      href: "/papers/terrero-grismer-smith-ecm-graphene-oxide-poster-suris2026.pptx",
    },
    {
      label: "Poster — BME 3101C course version (PDF)",
      href: "/papers/terrero-grismer-ecm-graphene-oxide-poster.pdf",
    },
  ],
  summary:
    "Preliminary study with Gage Grismer and Dr. Marzhan Sypabekova at FGCU's U.A. Whitaker College of Engineering. We asked whether the extracellular matrix a fibroblast sits on changes its response to sublethal graphene oxide (GO) — the standard cytotoxicity substrate is tissue-culture plastic, but a wound-dressing or tissue scaffold presents ECM proteins instead. Across three runs, Collagen I consistently supported the strongest coverage and TCP the weakest; the 10 µg/mL GO dose had no consistent measurable effect, so the GO × surface interaction remains untested.",
  accentColor: "teal",
  capabilityDetails: {
    "biomedical-embedded":
      "Biomaterials cytocompatibility framed around the ECM the device actually meets, not the TCP it is usually screened on.",
    "data-analysis":
      "Threshold-based cell-free area analysis and wound-closure percentages computed per condition across three runs.",
    "core-engineering":
      "Reusable workflow (seed → attach → expose → wash → recover → scratch) applied identically across six conditions.",
  },
  caseStudy: {
    problem: [
      {
        type: "p",
        text: "Graphene oxide is being developed for wound dressings and tissue scaffolds, but its cytocompatibility is almost always screened on tissue-culture plastic (TCP) — not on the extracellular-matrix (ECM) proteins cells actually meet inside a scaffold.",
      },
      {
        type: "p",
        text: "Surface identity matters because fibroblasts bind ECM through integrins: Collagen I preserves native integrin-binding sites, Gelatin (denatured collagen) presents them differently, and TCP presents none. If the surface controls how cells sit on GO, then judging GO on TCP alone may misestimate its effect in an ECM-based scaffold — and fibroblasts are the cells that rebuild dermis and close wounds, so the misestimate has direct clinical consequences.",
      },
      {
        type: "p",
        text: "Dose is the other lever. Wang et al. report little detectable toxicity in human fibroblasts below ~20 µg/mL and clear cytotoxicity above ~50 µg/mL under their conditions, so a sublethal probe needs to sit inside that window.",
      },
    ],
    requirements: [
      {
        type: "table",
        columns: ["#", "Requirement", "Target", "Actual"],
        rows: [
          [
            "R1",
            "Sublethal GO dose",
            "Dose sits below the ~20 µg/mL toxicity threshold from Wang et al. [1] and produces detectable but non-lethal effects on TCP.",
            "Partially met — 10 µg/mL is sublethal but produced no consistent effect",
          ],
          [
            "R2",
            "Three ECM conditions, matched exposure",
            "Identical seed → expose → wash → recover → scratch workflow across TCP, Collagen I, Gelatin.",
            "Met",
          ],
          [
            "R3",
            "Untreated controls per surface",
            "Each ECM surface has a matched no-GO control in every run.",
            "Met in Trials 2–3; Trial 1 had GO-treated wells only",
          ],
          [
            "R4",
            "Calibrated coverage metric",
            "Cell-free area = share of field > 50 µm (4×) or 25 µm (10×) from any detected cell [4].",
            "Met — threshold-checked per magnification",
          ],
          [
            "R5",
            "Functional recovery readout",
            "Scratch-assay wound-closure percentage per surface and condition [3].",
            "Met in Trial 1 (0 vs 24 h); edges unreadable in Trials 2–3 by 72 h",
          ],
          [
            "R6",
            "Replication",
            "≥ 3 independent runs per condition with replicate wells and multiple fields per well.",
            "Not met — 1 well and 1 field per condition per run",
          ],
        ],
      },
    ],
    scope: [
      {
        type: "p",
        text: "Course research project in BME 3101C Bioperformance of Materials at Florida Gulf Coast University, Fall 2026, with Gage Grismer and Dr. Marzhan Sypabekova. I owned experimental design decisions, shared cell-culture and exposure work, ran the image analysis pipeline, and wrote the methods, results, and limitations sections of the poster.",
      },
    ],
    implementation: [
      {
        type: "list",
        items: [
          "Cells: NIH/3T3 fibroblasts seeded on 6-well plates — uncoated TCP, rat-tail Collagen I, and 0.2% w/v Gelatin.",
          "GO preparation: Sigma-Aldrich GO (2 mg/mL, product 763705), bath-sonicated 20 min; stock was accidentally frozen, then thawed and re-sonicated before use.",
          "Exposure: 10 µg/mL GO in complete medium for ~24 h, applied identically across all three surfaces.",
          "Recovery: GO removed, Ca²⁺/Mg²⁺-free DPBS wash, fresh medium on the same surface for 48–72 h.",
          "Scratch assay: pipette-tip wound imaged at 0 h and at 24 h (Trial 1) or 72 h (Trials 2–3).",
          "Image analysis: phase-contrast fields thresholded; cell-free area = % of field > 50 µm (4×) or 25 µm (10×) from any detected cell; closure = (W₀ − Wₜ)/W₀ × 100.",
          "A dose pilot was unintentionally overdosed ~10× (labeled 10 and 20 µg/mL, actually ~100 and ~200 µg/mL) and excluded from analysis; it is kept only as a qualitative high-dose reference.",
        ],
      },
    ],
    verification: [
      {
        type: "p",
        text: "Key result — Trials 2–3, ~48 h after GO washout: Collagen I stayed ≤ 4% cell-free in every well, GO-treated or control, and TCP was sparse in most wells regardless of condition. GO-treated wells were sparser than their matched control in only 1 of 6 pairs.",
      },
      {
        type: "table",
        columns: ["Surface", "Control T2", "10 µg/mL GO T2", "Control T3", "10 µg/mL GO T3"],
        rows: [
          ["TCP", "42% cell-free", "1%", "82%", "71%"],
          ["Collagen I", "4%", "1%", "3%", "0%"],
          ["Gelatin", "54%", "23%", "1%", "2%"],
        ],
      },
      {
        type: "p",
        text: "Supporting — Trial 1 (GO-only, ~72 h after washout): TCP 15% cell-free, Collagen I 0.2%, Gelatin 0.1%. Scratch assay (Trial 1, 4×): wound width 930 → 800 µm on Collagen I (14% closure) and 760 → 600 µm on Gelatin (22% closure) at 24 h.",
      },
      {
        type: "p",
        text: "Interpretation: surface identity had a strong, consistent effect on fibroblast coverage. 10 µg/mL GO did not, which is consistent with the dose sitting below the ~20 µg/mL toxicity range in [1]; without a measurable GO effect, the GO × surface interaction cannot be tested from these data.",
      },
    ],
    failures: [
      {
        type: "list",
        items: [
          "Dose pilot was unintentionally labeled 10× low (actual ~100 and ~200 µg/mL). Produced severe cell loss, so it is kept as a qualitative high-dose marker but excluded from the quantitative analysis.",
          "GO stock was accidentally frozen, thawed, and re-sonicated. Freeze-thaw can shift GO aggregation state and effective dose, so the 10 µg/mL exposure is not guaranteed equivalent to a fresh-prepared stock at the same nominal concentration.",
          "An incubator failure cut Trials 2 and 3 short, so the planned 72 h recovery window was not fully observed.",
          "No pre-exposure baseline images were collected per well, so run-to-run differences in seeding density cannot be ruled out as a source of the surface effect.",
        ],
      },
    ],
    limitations: [
      {
        type: "list",
        items: [
          "n = 1 well and 1 field per condition per run across 3 runs. Results are descriptive; no inferential statistics are reported.",
          "Well-to-well variation exceeded any GO effect at 10 µg/mL, so the primary interaction question — does the surface change the response to GO — remains open.",
          "Pipette-tip scratching can strip Collagen I and Gelatin coatings along the wound edge, so closure measurements conflate migration, proliferation, and coating damage.",
          "Scratch-assay edges could not be identified by 72 h in Trials 2–3; TCP had too few cells to form a readable edge.",
          "No live/dead viability assay, so coverage is a proxy for health, not a direct measure of it.",
          "Fields were not position-matched between timepoints, which adds imaging variance on top of biological variance.",
        ],
      },
      {
        type: "p",
        text: "Next study: re-pilot the GO concentration between 10 and 20 µg/mL, run ≥ 3 wells per condition with pre-exposure baseline images and multiple position-matched fields per well, add a live/dead viability assay, and evaluate GO × surface with a two-way ANOVA.",
      },
    ],
    links: [
      {
        type: "p",
        text: "Poster: ECM Surface-Dependent Fibroblast Response and Recovery Following Graphene Oxide Exposure. Terrero J., Grismer G., Sypabekova M. BME 3101C Bioperformance of Materials, Department of Bioengineering, U.A. Whitaker College of Engineering, Florida Gulf Coast University, Fall 2026.",
      },
      {
        type: "list",
        items: [
          "[1] K. Wang et al., “Biocompatibility of graphene oxide,” Nanoscale Res. Lett., vol. 6, art. 8, 2011. doi:10.1007/s11671-010-9751-6",
          "[2] N. Davidenko et al., “Evaluation of cell binding to collagen and gelatin,” J. Mater. Sci.: Mater. Med., vol. 27, art. 148, 2016. doi:10.1007/s10856-016-5763-9",
          "[3] C.-C. Liang, A. Y. Park, J.-L. Guan, “In vitro scratch assay,” Nat. Protoc., vol. 2, pp. 329–333, 2007. doi:10.1038/nprot.2007.30",
          "[4] N. Jaccard et al., “Automated method for the rapid and precise estimation of adherent cell culture characteristics from phase contrast microscopy images,” Biotechnol. Bioeng., vol. 111, pp. 504–517, 2014. doi:10.1002/bit.25115",
        ],
      },
    ],
  },
};
