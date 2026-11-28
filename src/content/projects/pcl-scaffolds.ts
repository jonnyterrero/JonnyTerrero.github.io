import type { Project } from "@/lib/projects";

export const pclScaffolds: Project = {
  slug: "pcl-scaffolds-bone-regeneration",
  name: "PCL Scaffolds for Bone Regeneration",
  tagline:
    "Paper review of a 3D-printed PCL cage + PEG bioink system for critical-sized bone defects, with FEA-derived mechanical performance and fluid-diffusion analysis.",
  division: "research",
  priority: "standard",
  status: "Research",
  statusNote: "Cellular & Tissue Engineering · 3-author paper review",
  role: "Co-author with Joseph Pitt and Yug Patel, advised by Dr. Marzhan Sypabekova · outline, summary, mechanical and diffusion analysis synthesis",
  timeline: "Spring 2026",
  stack: ["Bone tissue engineering", "3D printing (PCL + PEG bioink)", "FEA (mechanical)", "Fluid diffusion", "Literature analysis"],
  liveUrl: null,
  repoUrl: null,
  extraLinks: [
    { label: "Paper-review outline (DOCX)", href: "/papers/pcl-scaffolds-paper-review-outline.docx" },
    { label: "Paper-review summary and rationale (DOCX)", href: "/papers/pcl-scaffolds-paper-review-summary.docx" },
  ],
  summary:
    "Structured paper review in Dr. Marzhan Sypabekova's Cellular & Tissue Engineering course, co-authored with Joseph Pitt and Yug Patel. We analysed a published study on a 3D-printed polycaprolactone (PCL) cage surrounding a PEG-based bioink delivered via micro-capillary extrusion for critical-sized bone defects, covering why autografts and allografts fail in these defects, how the scaffold's three geometries (zigzag, zigzag/spiral, and shifted zigzag spiral) trade off mechanical competence against nutrient and gas diffusion, and what the FEA and fluid-diffusion analyses in the paper claim.",
  accentColor: "teal",
  capabilityDetails: {
    "biomedical-embedded":
      "Scaffold design for bone tissue engineering framed around mechanical-vs-biological trade-offs (mechanical competence, nutrient diffusion, vascularisation, degradation rate).",
    "data-analysis":
      "Cross-reading of FEA and diffusion results across three scaffold geometries and interpreting what the paper does and does not demonstrate.",
  },
  caseStudy: {
    problem: [
      {
        type: "p",
        text: "Critical-sized bone defects — from trauma, tumour resection, or congenital abnormalities — exceed the body's intrinsic regenerative capacity and need clinical intervention to restore structural integrity and function. The current standard of care is autografts and allografts, and each has structural limits.",
      },
      {
        type: "p",
        text: "Autografts are osteogenic, osteoinductive, and osteoconductive, but are bounded by donor-site morbidity, limited tissue availability, and variable mechanical properties relative to the defect site — which bites especially hard in large or load-bearing defects. Allografts are more available but carry risks of immune response, disease transmission, and reduced vascularisation that impair integration and long-term remodelling.",
      },
      {
        type: "p",
        text: "These limits motivate synthetic scaffold-based strategies: biomaterials that provide temporary mechanical support while supporting cell infiltration, proliferation, and extracellular-matrix deposition. The scaffold reviewed in this paper is one such strategy.",
      },
    ],
    scope: [
      {
        type: "p",
        text: "Course paper review (Cellular & Tissue Engineering, Spring 2026, Dr. Marzhan Sypabekova) co-authored with Joseph Pitt and Yug Patel. We did not reproduce the paper's experiments; we read it critically and synthesised what it claims, what it demonstrates, and where its conclusions are bounded.",
      },
    ],
    implementation: [
      {
        type: "list",
        items: [
          "Scaffold system under review: a 3D-printed polycaprolactone (PCL) cage surrounding a PEG-based bioink, assembled by placing the bioink inside the cage using micro-capillary extrusion.",
          "Three cage geometries compared: zigzag; zigzag / spiral; zigzag-spiral with shifting. The geometries vary to trade nutrient and gas diffusion against mechanical competence.",
          "Manufacturing: melt-extrusion-based printing for the PCL cage; micro-extrusion capillary printing for the bioink; layer-by-layer combination of the two.",
          "Biological payload: human bone-marrow mesenchymal stem cells (hBM-MSCs) in the PEG bioink.",
          "Analytical methods used by the paper: finite-element analysis (FEA) for mechanical properties; fluid-diffusion analysis for gas and nutrient transport through the scaffold.",
        ],
      },
    ],
    verification: [
      {
        type: "p",
        text: "What the paper claims (as synthesised in the review): the layer-by-layer PCL + PEG-bioink scaffold can be printed to patient-specific geometry; the three cage topologies differ measurably in both FEA stress distribution and modelled fluid transport; and the combined system supports hBM-MSC encapsulation.",
      },
      {
        type: "pending",
        text: "Specific numerical results extracted from the paper (modulus and strength values per geometry, diffusion coefficients, cell viability over time) are summarised in the attached review documents and not duplicated here until a version is published that cites them with page numbers.",
      },
    ],
    limitations: [
      {
        type: "list",
        items: [
          "This is a secondary-source review, not an independent reproduction. Every claim is what the reviewed paper reports, not what our team measured.",
          "Scope is one publication. Generalisation to the broader bone-regeneration scaffold literature would need a systematic review, not a single paper review.",
          "Three-author team: individual contribution is as stated in the role field, not the whole document.",
          "The paper itself is bounded by what FEA and diffusion modelling can validate ahead of a physical mechanical test or an in-vivo study; those limits carry into this review.",
        ],
      },
    ],
  },
};
