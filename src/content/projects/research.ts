import type { Project } from "@/lib/projects";

export const strykerRsa: Project = {
  slug: "stryker-reunion-rsa",
  name: "Stryker ReUnion RSA Teardown",
  tagline: "Reverse-engineering a Class II reverse shoulder arthroplasty system end to end.",
  division: "research",
  priority: "featured",
  status: "Research",
  statusNote: "Benchmarking report · 3-author team",
  role: "Co-author with Joseph Pitt and Yug Patel · biomechanics, materials, regulatory, manufacturing synthesis",
  timeline: "2025",
  stack: ["Biomechanics", "Materials (Ti-6Al-4V, porous titanium, crosslinked UHMWPE)", "FDA 510(k)", "QFD", "DFx / DfE"],
  liveUrl: null,
  repoUrl: null,
  extraLinks: [
    { label: "Benchmarking report (PDF)", href: "/papers/stryker-reunion-rsa-benchmarking.pdf" },
    { label: "Engineering analysis (PDF)", href: "/papers/stryker-reunion-rsa-engineering-analysis.pdf" },
    { label: "Reverse-engineering slide deck (PPTX)", href: "/papers/stryker-reunion-rsa-reverse-engineering-presentation.pptx" },
  ],
  imageSrc: "/images/stryker-rsa/stryker-rsa-biomechanical-evolution.webp",
  imageAlt: "Biomechanical Evolution infographic for the Stryker ReUnion RSA system: exploded view of the convertible stem, humeral cup, glenosphere and tritanium baseplate, with sections on clinical problem, anatomic vs reverse mechanics, materials, performance metrics, and regulatory pathway",
  summary:
    "A full-system teardown of a reverse shoulder implant — disease state → biomechanics → requirements → regulatory → manufacturing → outcomes — built as a reusable benchmarking framework.",
  accentColor: "violet",
  capabilityDetails: {
    "biomedical-embedded": "Device biomechanics and materials mapped to clinical requirements and failure modes.",
    "core-engineering": "Benchmarking method: constraints → tradeoffs → decisions across the device lifecycle.",
  },
  caseStudy: {
    problem: [
      {
        type: "p",
        text: "Stryker’s ReUnion RSA is a Class II reverse shoulder arthroplasty system for patients with rotator cuff tear arthropathy, where the native joint has lost the soft-tissue stabilisers a conventional total shoulder replacement depends on.",
      },
      {
        type: "p",
        text: "The objective was not to document one implant but to build a repeatable benchmarking framework — disease state → biomechanics → requirements → regulatory → manufacturing → outcomes — that can be run in reverse when designing future devices.",
      },
    ],
    scope: [
      {
        type: "p",
        text: "Course project in biomedical engineering at FGCU, written as a three-person team with Joseph Pitt and Yug Patel. The teardown is a benchmarking exercise, not a regulatory submission: every claim traces to publicly available sources (Stryker literature, the FDA 510(k) summary, and peer-reviewed biomechanics work).",
      },
    ],
    implementation: [
      {
        type: "list",
        items: [
          "Biomechanics: the geometric inversion that lets the deltoid compensate for a non-functional rotator cuff.",
          "Materials system: Ti-6Al-4V, Tritanium porous metal, and X3 highly crosslinked UHMWPE.",
          "Regulatory: the FDA 510(k) clearance pathway for the device.",
          "Requirements: Quality Function Deployment targets.",
          "Manufacturing and Design for Environment decisions that support them.",
        ],
      },
      {
        type: "image",
        src: "/images/stryker-rsa/stryker-rsa-biomechanical-evolution.webp",
        alt: "Biomechanical Evolution infographic for the Stryker ReUnion RSA: exploded view of the components (X3 polyethylene insert, concave humeral cup, convex glenosphere, tritanium glenoid baseplate, convertible stem), clinical problem panel, anatomic-vs-reverse mechanics comparison, materials and osseointegration notes, performance metrics (88% 10-year survivorship), and regulatory / manufacturing summary",
        caption: "Benchmarking one-pager produced from the teardown. Each panel traces back to the benchmarking report attached below.",
      },
    ],
    limitations: [
      {
        type: "list",
        items: [
          "Benchmarking from publicly available sources — the FDA 510(k) summary, Stryker's own literature, and peer-reviewed biomechanics work. No access to a Design History File, lab access to the physical device, or Stryker's internal verification data.",
          "Performance figures cited in the deliverables (e.g., 10-year survivorship ranges and target wear rates) are literature summaries, not independent measurements.",
          "Three-author team: individual contribution is as stated in the role field, not the whole document.",
        ],
      },
    ],
  },
};

export const healthcareSupplyChain: Project = {
  slug: "healthcare-supply-chain",
  name: "Engineering the Healthcare Supply Chain",
  tagline: "Interviews with 12 healthcare professionals on where engineering fails clinicians, and what they actually need.",
  division: "research",
  priority: "standard",
  status: "Research",
  statusNote: "12 interviews · 8 physicians · 4-author team",
  role: "Co-investigator with Austin Fearday, David McGuire, and Joseph Pitt · interview protocol, interviews, synthesis",
  timeline: "2024 – 2025",
  stack: ["Qualitative research", "Stakeholder interviews", "Systems engineering", "Clinical workflow"],
  liveUrl: null,
  repoUrl: null,
  extraLinks: [
    { label: "CS progress update, 2025-09-19 (DOCX)", href: "/papers/healthcare-supply-chain-progress-update.docx" },
  ],
  summary:
    "Primary qualitative research with 12 healthcare professionals, 8 of them practising physicians, on clinical risk, supply fragility, and the gap between clinicians and engineers.",
  accentColor: "teal",
  capabilityDetails: {
    "core-engineering": "Systems framing of failure modes and operational constraints in clinical environments.",
    "tools-workflow": "Interview protocol → synthesis → recommendations as a repeatable research workflow.",
  },
  caseStudy: {
    problem: [
      {
        type: "p",
        text: "Most engineers never spend structured time inside a clinical environment. This study asked how engineers shape daily patient care, where supply-chain breakdowns create real clinical risk, and what biomedical engineers need to understand before they touch a device or system.",
      },
    ],
    implementation: [
      { type: "p", text: "Method: 12 interviews with healthcare professionals, 8 of them practising physicians, synthesised into recurring demand signals." },
    ],
    verification: [
      {
        type: "p",
        text: "Findings: consistent demand signals for reliable supply infrastructure, usable device design, data fluency, and the rare ability to communicate across the clinical–engineering divide.",
      },
    ],
    limitations: [
      {
        type: "list",
        items: [
          "Qualitative, with a small convenience sample. The findings are demand signals, not prevalence estimates.",
        ],
      },
    ],
  },
};

export const cocrReview: Project = {
  slug: "cocr-dental-degradation-review",
  name: "Co–Cr Dental Prosthesis Degradation Review",
  tagline: "A PROSPERO-registered systematic review of material degradation in cobalt-chromium dental prostheses.",
  division: "research",
  priority: "standard",
  status: "Research",
  statusNote: "Systematic review · 11 studies",
  role: "Co-author · protocol registration, search, screening, data extraction, synthesis",
  timeline: "2024",
  stack: ["Systematic review", "PRISMA 2020", "PubMed / Scopus / Web of Science", "Biomaterials"],
  liveUrl: null,
  repoUrl: null,
  summary:
    "Synthesised 11 studies on corrosion, wear, and ion release in cobalt-chromium dental prostheses under PRISMA 2020.",
  accentColor: "amber",
  capabilityDetails: {
    "data-analysis": "Cross-study synthesis of corrosion resistance, wear behaviour, and ion release.",
    "core-engineering": "Identifying the key drivers that should inform upstream design and manufacturing decisions.",
  },
  caseStudy: {
    problem: [
      {
        type: "p",
        text: "Which controllable variables most strongly drive clinical degradation — corrosion, wear, and ion release — in cobalt-chromium dental prostheses?",
      },
    ],
    implementation: [
      {
        type: "p",
        text: "A PROSPERO-registered protocol. Searched PubMed, Scopus, and Web of Science and included 11 studies under PRISMA 2020.",
      },
    ],
    verification: [
      {
        type: "p",
        text: "Key finding: across the included studies, surface finishing drove degradation outcomes more than alloy composition or fabrication method.",
      },
    ],
    limitations: [
      {
        type: "list",
        items: ["Eleven included studies; the conclusions are bounded by their heterogeneity and quality."],
      },
    ],
  },
};
