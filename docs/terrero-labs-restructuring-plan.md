# Terrero Labs Restructuring & Portfolio Upgrade Plan
## Brand Architecture, Product Hierarchy, Portfolio Redesign, and 90-Day Execution Roadmap

**Prepared for:** Jonathan Terrero  
**Primary portfolio:** http://jonnyterrero.github.io/  
**Parent brand:** Terrero Labs  
**Flagship product:** MindMap  
**Cardiac product line:** HeartWire  
**Current HeartWire OS:** Temporary name; rename later  
**Current implementation:** Next.js 15 + React 19 + TypeScript + Tailwind CSS 4

---

# 1. Executive Direction

The restructuring should accomplish one thing above all:

> **Turn the current portfolio from a collection of impressive projects into a coherent engineering company/founder narrative.**

The current site already has the right foundation: it presents your work as an interconnected ecosystem rather than an isolated project gallery. The problem is that the brand hierarchy is unclear. HeartWire currently functions simultaneously as a health-tech studio, a product name, an operating system name, and an AI-tooling family name. That weakens the meaning of the strongest name and makes it harder for a visitor to understand what you are actually building.

The new hierarchy should be:

```text
Jonathan Terrero
Founder / Biomedical + Software Engineer
        │
        ▼
Terrero Labs
Biomedical systems and software studio
        │
        ├── PRODUCTS
        │   ├── MindMap         ← flagship product
        │   ├── HeartWire       ← cardiac monitoring / biosignal product line
        │   ├── GastroGuard
        │   └── SkinTrack+
        │
        ├── ENGINEERING / PROTOTYPES
        │   ├── Wearable ECG platform
        │   ├── Modular Knee Brace
        │   ├── Robotic Pick-and-Place Arm
        │   └── future neural-engineering hardware
        │
        ├── RESEARCH / CASE STUDIES
        │   ├── BME Visualizations
        │   ├── Stryker ReUnion RSA teardown
        │   ├── Healthcare Supply Chain research
        │   ├── Biomaterials / graphene oxide work
        │   └── additional engineering research
        │
        └── INTERNAL SYSTEMS / TOOLING
            ├── current HeartWire OS → rename
            ├── current HeartWire Agent Suite → rename
            └── JonnyJr / automation infrastructure
```

The visitor should understand the hierarchy within about **10 seconds**.

---

# 2. The New Brand Architecture

## 2.1 Parent Brand — Terrero Labs

Terrero Labs becomes the umbrella under which your independent engineering work lives.

Recommended positioning:

> **Terrero Labs is an independent biomedical engineering and software studio building systems for health data, biosignals, physiological monitoring, and human performance.**

Alternative shorter version:

> **Biomedical software, sensing systems, and human-centered engineering.**

Recommended identity:

- Serious rather than playful.
- Technical rather than "startup-y."
- Biomedical without being restricted to medicine.
- Broad enough to contain software, hardware, AI, signal processing, research, and future neural-engineering work.
- Founder-led without making the company feel like a school portfolio.

Avoid reducing the brand to:
- "health app company"
- "AI startup"
- "student projects"
- "wellness company"
- "HeartWire renamed"

Terrero Labs should represent the **engineering organization**. Products beneath it can be more specialized.

---

## 2.2 Founder Brand — Jonathan Terrero

Your personal identity should remain visible because the live portfolio also serves recruiters, professors, collaborators, and future employers.

Use this structure:

```text
Jonathan Terrero
Founder & Engineer, Terrero Labs

Software Engineer
Biomedical Engineering
Biosignals • Health Software • Embedded Systems • Neural Engineering
```

The site should not pretend Terrero Labs is a large organization. That would reduce credibility.

Use language such as:

> "Terrero Labs is my independent biomedical engineering studio."

That communicates ambition without misrepresenting scale.

---

# 3. Product Hierarchy

## 3.1 MindMap — Flagship Product

MindMap should become the dominant product on the website.

Current positioning is approximately:

> Mental state tracking with behavioral pattern recognition.

That is directionally correct but too generic for a flagship.

Recommended positioning:

> **MindMap is a longitudinal behavioral health platform that turns mood, stress, sleep, symptoms, routines, and environmental context into structured personal data.**

A more concise product tagline:

> **Understand the patterns behind how you feel, think, and perform.**

Engineering-facing description:

> MindMap converts repeated behavioral and physiological observations into structured time-series data for longitudinal analysis, visualization, and future predictive modeling.

### MindMap should receive:
- The largest product card.
- The first product position everywhere.
- A dedicated polished case study.
- Multiple real screenshots.
- System architecture diagram.
- Data-model diagram.
- Feature screenshots.
- Product roadmap.
- Repository link if public.
- Live application CTA.
- "Built by Terrero Labs" branding.
- Its own visual identity.

### Important positioning rule

Do not overstate clinical validation.

Unless you have completed clinical validation, regulatory clearance, or controlled studies, avoid language that implies MindMap:
- diagnoses psychiatric disease,
- predicts medical episodes with validated accuracy,
- replaces clinicians,
- delivers medical treatment.

Use:
- tracking,
- pattern detection,
- visualization,
- longitudinal analysis,
- behavioral insight,
- structured health data.

---

## 3.2 HeartWire — Cardiac Product Line

HeartWire becomes more valuable once it stops trying to mean everything.

Recommended role:

> **HeartWire is Terrero Labs' cardiac sensing and monitoring platform.**

This is a good home for:
- wearable ECG strap,
- cardiac event monitoring,
- ECG acquisition,
- signal conditioning,
- heart-rate / rhythm analytics,
- future cardiac hardware,
- cardiac dashboards,
- associated firmware and signal-processing pipelines.

Conceptually:

```text
Terrero Labs
└── HeartWire
    ├── Wearable ECG hardware
    ├── Embedded acquisition firmware
    ├── Signal-processing pipeline
    ├── Cardiac dashboard
    └── Future monitoring products
```

This makes HeartWire far stronger than using it as a generic company name.

HeartWire becomes a **product platform with technical meaning**.

---

## 3.3 GastroGuard

Keep it as a supporting Terrero Labs product.

Position:

> Longitudinal GI symptom, meal, behavior, and trigger tracking.

The portfolio should emphasize the engineering problem:

```text
unstructured symptoms
        ↓
structured observations
        ↓
time-aligned behavior / meal data
        ↓
trend and correlation analysis
        ↓
actionable hypotheses
```

Do not give GastroGuard equal visual hierarchy with MindMap.

---

## 3.4 SkinTrack+

Keep it as a supporting product.

Position:

> Longitudinal dermatological image and symptom tracking with behavioral and environmental context.

Its strongest engineering story is not merely "a skin tracker."

It demonstrates:
- image handling,
- data storage,
- longitudinal comparison,
- computer vision,
- environmental correlation,
- biomedical software design.

---

# 4. What to Do With HeartWire OS

Do **not** rush the rename before the product itself is clearly defined.

For now:

1. Stop presenting it as a core Terrero Labs product.
2. Place it under:
   - Internal Systems,
   - Experimental Tools,
   - Developer Systems,
   - or Personal Infrastructure.
3. Add a temporary label:
   > "Working title — rename planned."
4. Remove HeartWire from the name once the replacement is chosen.

It currently describes an academic and engineering operating system, which does not logically belong under the cardiac HeartWire brand.

### Future naming criteria

The eventual name should imply:
- organization,
- engineering,
- knowledge infrastructure,
- research,
- long-term learning,
- systems thinking.

It should **not** sound medical unless the system itself is medical.

Possible naming directions to explore later:
- Terrero Forge
- Atlas
- Bench
- Workshop
- Foundry
- Lattice
- Vector
- Scaffold
- Continuum
- Framework

Do not choose the final name until its product scope is frozen.

---

# 5. What to Do With the HeartWire Agent Suite

The same naming conflict exists here.

Rename later to something under Terrero Labs such as:

```text
Terrero Labs Agent Bench
Terrero Labs Toolchain
LabOps
Terrero Systems
Terrero Agent Framework
```

This system is engineering infrastructure, not cardiac technology.

Place it under:

> **Internal Systems & AI Tooling**

rather than alongside consumer/biomedical products.

---

# 6. Current Portfolio Audit

## 6.1 What is already working

The current portfolio has several genuinely strong foundations:

- Clear biomedical + software positioning.
- Real live deployments.
- Separate project pages.
- A project data layer rather than manually duplicated cards.
- Modern Next.js / React / TypeScript implementation.
- Case studies in addition to software projects.
- Hardware projects in addition to web applications.
- A systems-oriented philosophy that connects the work.
- Resume, writing, GitHub, and LinkedIn all connected.
- Public BME visualizations.
- Strong evidence that you actually build rather than merely describe.

Do not throw this away.

This is a **restructure**, not a restart.

---

## 6.2 Main problems to fix

### Problem 1 — Brand ambiguity

Current references still present HeartWire as the studio.

This must become:

```text
OLD
Jonathan Terrero / HeartWire

NEW
Jonathan Terrero / Terrero Labs
```

HeartWire should only appear when referring to the cardiac product.

---

### Problem 2 — MindMap does not look like a flagship

It currently appears as one card among multiple peers.

New hierarchy:

```text
MindMap
████████████████████████████████████
Flagship product — large case-study preview

HeartWire      GastroGuard      SkinTrack+
██████         ██████           ██████
Supporting product cards
```

---

### Problem 3 — The tech stack appears too early

The homepage currently asks visitors to process a large list of technologies before seeing the strongest proof of work.

Recruiters and collaborators do not need the tool inventory first.

The order should become:

```text
WHO YOU ARE
↓
WHAT YOU BUILD
↓
FLAGSHIP PRODUCT
↓
OTHER PRODUCTS
↓
ENGINEERING / RESEARCH PROOF
↓
EXPERIENCE / CREDIBILITY
↓
CAPABILITIES
↓
WRITING
↓
CONTACT
```

Tech stack belongs lower on the page.

---

### Problem 4 — Project pages are too thin

Several current product pages largely contain:

```text
Summary
Use Case
Who It's For
Stack
```

That describes a project but does not demonstrate engineering.

Every serious project should answer:

1. What problem existed?
2. Why did you build this?
3. What did you personally build?
4. What architecture did you choose?
5. Why did you choose it?
6. What constraints existed?
7. What technical problem was hardest?
8. How did you validate the result?
9. What failed or changed?
10. What would you build next?

---

### Problem 5 — Generated deployment URLs weaken branding

Public portfolio buttons should eventually point to clean canonical URLs, not temporary-looking deployment addresses.

Future structure:

```text
mindmap.[Terrero Labs domain]
heartwire.[Terrero Labs domain]
gastroguard.[Terrero Labs domain]
skintrack.[Terrero Labs domain]
```

Exact domain selection should happen after domain and trademark checks.

---

### Problem 6 — Repository links need cleanup

Several project entries currently use generic placeholder GitHub URLs.

Rule:

> If there is no public repository, do not show a repository button.

Never link a "Source" button to the GitHub homepage.

Instead use:

```json
"repoUrl": null
```

and conditionally hide the CTA.

---

### Problem 7 — GitHub and portfolio branding are not fully synchronized

Your GitHub profile and website should tell exactly the same story.

They should agree on:
- Terrero Labs name,
- flagship product,
- role,
- contact email,
- project naming,
- product status,
- preferred live links.

---

# 7. Recommended Information Architecture

Replace the vague "Ecosystem" navigation with clearer categories.

## Recommended primary navigation

```text
Terrero Labs

Products
Engineering
Research
About
Writing
Resume
```

For mobile, collapse this into a proper menu.

### Alternative compact version

```text
Work
About
Writing
Resume
```

with Work containing filters for:
- Products
- Engineering
- Research

The first version is stronger if Terrero Labs is intended to become a real startup identity.

---

# 8. Recommended Route Structure

```text
/
├── products/
│   ├── mindmap/
│   ├── heartwire/
│   ├── gastroguard/
│   └── skintrack/
│
├── engineering/
│   ├── wearable-ecg/
│   ├── modular-knee-brace/
│   ├── robotic-arm/
│   └── future-neural-project/
│
├── research/
│   ├── bme-visualizations/
│   ├── stryker-rsa/
│   ├── healthcare-supply-chain/
│   └── biomaterials/
│
├── systems/
│   ├── current-heartwire-os/
│   ├── agent-bench/
│   └── jonnyjr/
│
├── about/
├── writing/
└── resume/
```

### Redirect strategy

Do not break old URLs.

Add permanent redirects such as:

```text
/ecosystem        → /products or /work
/projects/mindmap-plus → /products/mindmap
```

Keep existing links functioning while the new hierarchy rolls out.

---

# 9. Homepage Redesign

## Section 1 — Header

### Current concept

```text
Jonathan Terrero / HeartWire
```

### Replace with

```text
TERRERO LABS
Jonathan Terrero
```

or:

```text
Jonathan Terrero
Founder, Terrero Labs
```

Preferred desktop nav:

```text
TERRERO LABS              Products  Engineering  Research  About  Writing  Resume
```

---

# 10. Homepage Hero

Recommended hero structure:

```text
TERRERO LABS
Biomedical Systems + Software

I build tools that turn human physiology,
behavior, and biosignals into usable systems.

Biomedical engineering, full-stack software,
embedded sensing, signal processing, and applied AI.

[Explore the work]   [View MindMap]   [Resume]
```

Secondary identity line:

> Jonathan Terrero — Founder & Engineer

### What the hero must communicate

Within one screen:
- who you are,
- what Terrero Labs is,
- what domain you work in,
- that real products exist.

Do not lead with degrees, minors, or a giant skill list.

Those are evidence later.

---

# 11. Flagship MindMap Homepage Section

This should be the strongest visual element after the hero.

Suggested layout:

```text
┌─────────────────────────────────────────────────────────────┐
│ FLAGSHIP PRODUCT                                            │
│                                                             │
│ MindMap                                                     │
│ Longitudinal behavioral health analytics                    │
│                                                             │
│ Track mood, sleep, stress, symptoms, routines, and context  │
│ as structured time-series data.                             │
│                                                             │
│ [Launch MindMap] [Read Case Study] [Source]                 │
│                                                             │
│                      [large real product screenshot]         │
└─────────────────────────────────────────────────────────────┘
```

Include 3 concise proof points:

```text
Longitudinal tracking
Structured time-series data
Behavioral pattern visualization
```

Later, replace generic claims with measured numbers if available.

Examples:

```text
X tracked variables
Y dashboard views
Z database tables
N production releases
```

Only display metrics you can verify.

---

# 12. Terrero Labs Product Grid

After MindMap:

```text
PRODUCTS

HeartWire
Cardiac sensing and monitoring
[case study]

GastroGuard
GI symptom and trigger analytics
[case study]

SkinTrack+
Longitudinal skin-condition imaging
[case study]
```

Do not overfill cards with stack badges.

Show:
- product,
- problem,
- status,
- one compelling image,
- 2–3 technology tags maximum.

---

# 13. Selected Engineering Section

This is where your portfolio separates itself from a typical software portfolio.

Feature:

### Wearable ECG / HeartWire hardware
- electrodes,
- analog front end,
- ADC,
- embedded MCU,
- BLE/data transport,
- signal filtering,
- software visualization.

### Modular Knee Brace
- CAD,
- biomechanics,
- mechanical design,
- 3D printing,
- sensor integration when available.

### BME Visualizations
- mathematical modeling,
- biofluids,
- signals,
- biomechanics,
- instrumentation.

### Neural Engineering Project
When it exists, it should become one of the main engineering features.

---

# 14. Research Section

Your research/case-study work should not be buried inside an "ecosystem."

Use cards such as:

```text
Stryker ReUnion RSA Teardown
Reverse engineering • biomechanics • materials • regulatory

Healthcare Supply Chain Research
12 stakeholder interviews • systems engineering • clinical workflows

Graphene Oxide Fibroblast Study
Biomaterials • cell-material interaction • factorial experimental design
```

This communicates that you can:
- build,
- analyze,
- research,
- document,
- reason across domains.

That combination is one of the strongest aspects of the portfolio.

---

# 15. Experience / Credibility Section

Add a small, restrained section:

```text
CURRENT

Software Engineer I
OmniFlex Fitness

B.S. Biomedical Engineering
Florida Gulf Coast University
Expected 2027
```

Then show 2–3 quantified engineering outcomes.

Your current portfolio already contains a strong example:

- batched Firestore write pipeline,
- typed data-access layer,
- approximately 10% session-level read/write cost reduction,
- concurrency / subscription cleanup.

These are much stronger proof than listing "Firebase" in a stack section.

Use outcomes before tools.

---

# 16. Replace the Giant Tech Stack With Capability Areas

Current technology lists are useful but too prominent.

Create a section like:

## Capabilities

### Biomedical Systems
- Biosignal acquisition
- Biomedical instrumentation
- Biomechanics
- Biomaterials
- Physiological modeling

### Software Systems
- TypeScript / Next.js
- Python
- APIs
- Relational data modeling
- authentication
- cloud deployment

### Data & Signal Processing
- time-series data
- ECG / biosignals
- filtering
- statistical analysis
- visualization
- ML pipelines

### Embedded Engineering
- ESP32 / Arduino
- sensor integration
- analog circuits
- serial / wireless communication
- prototyping

### Engineering Tools
- Git / GitHub
- Docker
- SolidWorks
- MATLAB
- testing / CI

Then provide a small:

> View full technical stack →

if desired.

---

# 17. Case Study Template

Every major portfolio item should use the same structure.

## Template

```markdown
# Product / Project Name

One-sentence value proposition.

Status | Role | Timeline | Domain

[Hero image]

## Problem
What real problem exists?

## Why I Built It
Why was this worth solving?

## My Role
Exactly what you personally designed and implemented.

## Users
Who is this for?

## Requirements
Functional and engineering requirements.

## Architecture
Diagram + component explanation.

## Data Model
If software/data product.

## Hardware Architecture
If physical device.

## Key Engineering Decisions
Decision → alternatives → reason → tradeoff.

## Hardest Problem
Describe one technically meaningful challenge.

## Implementation
How the system actually works.

## Validation
How you tested it.

## Results
What currently works.

## Limitations
What is not solved yet.

## Next Iteration
Specific roadmap.

## Stack
Only after the engineering story.

## Links
Live demo | source | documentation
```

This structure turns projects into **engineering evidence**.

---

# 18. MindMap Case Study — Recommended Content

MindMap should receive the most complete case study.

## Problem

People accumulate subjective observations:

```text
mood
anxiety
stress
sleep
energy
focus
symptoms
medication adherence
environment
routines
```

but the data usually remains:
- unstructured,
- forgotten,
- isolated,
- impossible to compare over time.

## System Goal

Transform repeated subjective observations into:

```text
structured records
        ↓
normalized time-series data
        ↓
longitudinal visualization
        ↓
cross-variable comparison
        ↓
hypothesis generation
```

## Architecture

Show something like:

```text
Browser / PWA
     │
     ▼
Next.js Application
     │
     ├── Authentication
     │
     ├── Check-in UI
     │
     ├── Dashboard
     │
     └── Analytics
     │
     ▼
Supabase
     ├── PostgreSQL
     ├── Auth
     └── Row-level security
     │
     ▼
Analytics Layer
     ├── aggregation
     ├── correlations
     ├── trends
     └── future ML
```

Use the actual architecture only; adjust the diagram to the implementation.

---

# 19. HeartWire Case Study — Recommended Structure

HeartWire can become one of the most technically important pieces of your portfolio.

Possible page hierarchy:

```text
HeartWire
Cardiac sensing and monitoring platform

01. Problem
02. Product concept
03. Physiological signal
04. Electrode interface
05. Analog front end
06. Filtering
07. ADC
08. Embedded controller
09. Data transmission
10. Software dashboard
11. Signal processing
12. Testing
13. Safety constraints
14. Prototype results
15. Roadmap
```

Include a full signal chain:

```text
Body
 ↓
Electrodes
 ↓
Protection
 ↓
Instrumentation amplifier / ECG AFE
 ↓
High-pass filtering
 ↓
Low-pass filtering
 ↓
Notch filtering where appropriate
 ↓
ADC
 ↓
MCU
 ↓
BLE / wired link
 ↓
Software pipeline
 ↓
ECG visualization
 ↓
Feature extraction / event analysis
```

This will be extremely valuable for biomedical, instrumentation, medical-device, and neural-engineering recruiting.

---

# 20. Visual Design System

The goal should be:

> **research lab + premium engineering studio**

not:
- gaming dashboard,
- crypto startup,
- generic SaaS template,
- hospital website.

---

## 20.1 Parent Brand Palette

Keep Terrero Labs mostly neutral.

Suggested direction:

```text
Graphite      #0B0D10
Charcoal      #161A1F
Warm White    #F4F2ED
Silver        #A8AFB8
Soft Border   #2A3038
```

Use one restrained accent.

Possible accent:

```text
Cold steel / cyan accent
```

or:

```text
Deep oxblood / crimson accent
```

Do not make the entire corporate identity cardiac red because Terrero Labs must extend beyond HeartWire.

---

## 20.2 Product Colors

Allow each product to have one identifier.

```text
MindMap       Indigo / violet
HeartWire     Crimson
GastroGuard   Amber
SkinTrack     Sage / green
Research      Neutral / cyan
Hardware      Steel / graphite
```

The Terrero Labs shell stays neutral.

This creates brand coherence without making every product visually identical.

---

# 21. Typography

Your existing Geist + Geist Mono setup is appropriate.

Keep it.

Recommended use:

```text
Geist Sans
- headings
- paragraphs
- navigation

Geist Mono
- metadata
- labels
- engineering values
- status indicators
- version numbers
- technical diagrams
```

Avoid adding multiple decorative fonts.

Chic engineering design comes from:
- spacing,
- hierarchy,
- alignment,
- imagery,
- restraint,

not typography novelty.

---

# 22. Layout Changes

The current global content width is approximately a narrow reading column.

Keep that width for:
- articles,
- case-study prose,
- research writing.

Widen the homepage and product showcase.

Recommended:

```text
Homepage shell: max-width ~ 1200–1280 px
Article text:    max-width ~ 700–800 px
Case studies:    wide media + narrow text
```

Use a 12-column desktop grid.

Example:

```text
|---- 7 columns copy ----|---- 5 columns product image ----|
```

or:

```text
|------------ 12 column screenshot / system diagram ------------|
```

---

# 23. Image Strategy

Every flagship project should have real visual proof.

Priority order:

1. Real app screenshots.
2. Architecture diagrams.
3. Hardware photography.
4. CAD renders.
5. Plots/data visualizations.
6. Development screenshots.
7. Test setup photographs.

Avoid stock photography.

### Minimum asset set per flagship

```text
1 hero image
2 UI screenshots
1 architecture diagram
1 implementation / detail image
1 result or visualization
```

MindMap should have at least 5–7 strong assets.

HeartWire hardware should eventually have:
- PCB / breadboard,
- electrode placement diagram,
- signal chain,
- oscilloscope output,
- raw ECG,
- filtered ECG,
- enclosure/wearable prototype.

---

# 24. Technical Repository Restructure

The portfolio repository does not need to be rebuilt.

Recommended cleanup:

## Rename package

Current:

```json
"name": "heartwire-site"
```

Change to:

```json
"name": "terrero-labs-portfolio"
```

or:

```json
"name": "jonathan-terrero-portfolio"
```

---

## Rename local workspace file

Current:

```text
HeartWire revamped.code-workspace
```

Replace with something like:

```text
terrero-labs.code-workspace
```

Do not keep legacy branding in active project files.

---

# 25. Centralize Brand Constants

Create:

```text
src/lib/brand.ts
```

Example conceptual structure:

```ts
export const BRAND = {
  founder: "Jonathan Terrero",
  company: "Terrero Labs",
  descriptor: "Biomedical Systems + Software",
  flagship: "MindMap",
}
```

Keep:
- name,
- descriptions,
- social links,
- contact info,
- metadata strings,

in one source of truth.

This prevents old HeartWire references from surviving across pages.

---

# 26. Improve the Project Schema

The current project data structure is useful.

Extend it instead of replacing it.

Recommended fields:

```ts
type Project = {
  slug: string
  name: string
  brand?: string
  tagline: string
  description: string

  division:
    | "product"
    | "engineering"
    | "research"
    | "internal"

  priority:
    | "flagship"
    | "featured"
    | "standard"
    | "archive"

  status:
    | "production"
    | "active-development"
    | "prototype"
    | "research"
    | "concept"

  role: string[]
  timeline?: string

  stack: string[]

  liveUrl?: string
  repoUrl?: string
  documentationUrl?: string

  heroImage?: string
  screenshots?: string[]

  metrics?: {
    label: string
    value: string
  }[]

  architecture?: string

  problem?: string
  decisions?: EngineeringDecision[]
  limitations?: string[]
  roadmap?: string[]
}
```

This enables the website to render richer case studies from structured data.

---

# 27. Do Not Put Everything Into `projects.json`

As case studies grow, a 20–30 KB JSON file will become awkward.

Recommended long-term migration:

```text
content/
├── products/
│   ├── mindmap.mdx
│   ├── heartwire.mdx
│   ├── gastroguard.mdx
│   └── skintrack.mdx
│
├── engineering/
│   └── ...
│
└── research/
    └── ...
```

Use JSON/TypeScript for metadata and MDX for long-form case-study content.

That gives you:
- structured cards,
- rich long-form pages,
- diagrams,
- embedded components,
- code snippets,
- reusable case-study sections.

---

# 28. Component Architecture

Create reusable sections:

```text
components/
├── brand/
│   ├── terrero-wordmark.tsx
│   ├── product-mark.tsx
│   └── status-badge.tsx
│
├── case-study/
│   ├── case-study-hero.tsx
│   ├── architecture-diagram.tsx
│   ├── decision-card.tsx
│   ├── metrics-row.tsx
│   ├── project-gallery.tsx
│   └── project-links.tsx
│
├── home/
│   ├── hero.tsx
│   ├── flagship-product.tsx
│   ├── product-grid.tsx
│   ├── selected-engineering.tsx
│   ├── research-grid.tsx
│   └── capabilities.tsx
```

This is more maintainable than continuing to grow `page.tsx`.

---

# 29. Homepage Component Order

Target component tree:

```tsx
<Home>
  <Hero />
  <FlagshipProduct product="mindmap" />
  <ProductGrid />
  <SelectedEngineering />
  <SelectedResearch />
  <ExperienceHighlights />
  <Capabilities />
  <WritingPreview />
  <ContactCTA />
</Home>
```

This maps directly to the narrative you want visitors to follow.

---

# 30. SEO Overhaul

Update global metadata.

Current descriptions still center HeartWire as the parent studio.

Replace with language similar to:

> Jonathan Terrero is a biomedical and software engineer and founder of Terrero Labs, building health software, biosignal systems, biomedical devices, and applied engineering tools.

---

## Per-page metadata

Every major project should have:

```text
title
description
canonical URL
OpenGraph title
OpenGraph description
OpenGraph image
Twitter / social image
```

Examples:

```text
MindMap | Terrero Labs
HeartWire | Terrero Labs
Biomedical Engineering Projects | Jonathan Terrero
Research | Terrero Labs
```

---

# 31. Structured Data

Add JSON-LD where appropriate.

Useful schema types:

```text
Person
Organization
SoftwareApplication
CreativeWork
Article
```

### Person

Jonathan Terrero:
- engineer,
- founder,
- student,
- public profiles.

### Organization

Terrero Labs.

### SoftwareApplication

MindMap, GastroGuard, SkinTrack where appropriate.

Avoid claims you cannot support.

---

# 32. Sitemap and Indexing

Ensure:

```text
/sitemap.xml
/robots.txt
```

Include only pages worth indexing.

Do not index:
- temporary test routes,
- experimental duplicate pages,
- deprecated HeartWire pages.

---

# 33. Social Preview Cards

Create branded OpenGraph images.

Example:

```text
TERRERO LABS

MindMap
Longitudinal Behavioral Health Analytics

Jonathan Terrero
Biomedical + Software Engineering
```

A shared preview card makes links look professional on:
- LinkedIn,
- Discord,
- Slack,
- iMessage,
- X,
- recruiter ATS notes.

---

# 34. Domain Strategy

The GitHub Pages URL is perfectly acceptable during development.

Eventually acquire a Terrero Labs domain.

Before committing:
1. check domain availability,
2. check USPTO trademark records,
3. check Florida business registrations,
4. search web/company databases,
5. check social handles.

Do **not** assume the name is legally clear solely because a domain is available.

Potential future architecture:

```text
terrerolabs.[TLD]                 company / portfolio
mindmap.terrerolabs.[TLD]         flagship
heartwire.terrerolabs.[TLD]       cardiac platform
```

You can retain:

```text
jonnyterrero.github.io
```

as a redirect or personal mirror.

---

# 35. GitHub Profile Restructure

Your GitHub page should mirror the portfolio.

## New profile opening

Recommended:

```markdown
# Jonathan Terrero

Biomedical + software engineer building Terrero Labs.

I work across health software, biosignals, embedded systems,
biomedical instrumentation, data systems, and applied AI.
```

Then:

```markdown
## Terrero Labs

### MindMap — Flagship
Longitudinal behavioral health analytics platform.

### HeartWire
Wearable cardiac sensing and monitoring platform.

### GastroGuard
GI symptom and trigger analytics.

### SkinTrack+
Longitudinal dermatological tracking.
```

Then engineering/research.

---

# 36. GitHub Pin Strategy

Recommended pins:

1. MindMap
2. portfolio / Terrero Labs site
3. HeartWire repository when public
4. BME Visualizations
5. strongest hardware / embedded project
6. one high-quality infrastructure or research repository

Do not pin:
- tutorial repositories,
- abandoned prototypes,
- practice problem repositories,

above serious engineering work.

Those repositories may remain public, but they should not define the profile.

---

# 37. Repository README Standard

Every serious project should have:

```text
Project logo / name

One-sentence description

Screenshot

Live demo

Problem

Architecture

Features

Tech stack

Local setup

Data model

Engineering decisions

Testing

Security / privacy notes

Limitations

Roadmap

License
```

For biomedical work add:

```text
Intended use
Not intended for diagnosis
Safety considerations
Validation status
```

where applicable.

---

# 38. Professional Contact Cleanup

Use one primary professional identity across:

- portfolio,
- GitHub,
- resume,
- LinkedIn,
- Terrero Labs,
- project READMEs.

Your public pages currently expose different contact identities.

Choose one.

Long-term best option:

```text
name@[Terrero Labs domain]
```

Then optionally:

```text
hello@[Terrero Labs domain]
```

for company inquiries.

---

# 39. Writing Strategy

Do not use the writing page only as a generic pointer.

Writing can become evidence of technical thinking.

Recommended categories:

```text
Engineering Notes
Biomedical Systems
Building Terrero Labs
Biosignals
Health Data
Neural Engineering
Product Engineering
Research Notes
```

Strong post ideas:

- Why longitudinal health data is harder than logging symptoms.
- Designing health software without pretending correlation is diagnosis.
- Building a wearable ECG signal chain.
- Lessons from building MindMap.
- Why adherence is an engineering variable.
- Building biomedical systems across hardware and software.
- What medical-device engineering taught me about consumer health software.
- Signal vs noise as a design principle.

Writing should reinforce the work.

---

# 40. Portfolio Credibility Rules

For every claim, ask:

> Can I show evidence?

Good:

```text
Built a batched Firestore pipeline that reduced per-session database operations by ~10%.
```

Weak:

```text
Expert in scalable distributed systems.
```

Good:

```text
Built a working Arduino robotic arm with sensor-driven state transitions.
```

Weak:

```text
Advanced robotics engineer.
```

The work is already strong enough that exaggeration is unnecessary.

---

# 41. Status System

Use consistent statuses:

```text
PRODUCTION
ACTIVE DEVELOPMENT
PROTOTYPE
RESEARCH
CONCEPT
ARCHIVED
```

Avoid ambiguous status names.

Add last-updated date:

```text
Active Development
Updated September 2026
```

This signals that the site is maintained.

---

# 42. Product Versioning

For serious products, consider displaying:

```text
MindMap
v0.8 — Active Development
```

and a changelog.

This communicates software maturity better than a vague "active."

---

# 43. Product Changelogs

Add:

```text
/products/mindmap/changelog
```

or link the GitHub Releases page.

Useful entries:

```text
v0.8
- redesigned check-in flow
- normalized symptom schema
- dashboard filtering
- improved mobile layout
```

A changelog proves sustained development.

---

# 44. Accessibility

Minimum requirements:

- Semantic heading order.
- Keyboard navigation.
- Visible focus states.
- Proper labels.
- Alt text for technical figures.
- Sufficient contrast.
- No information conveyed only through color.
- Reduced-motion support.
- Touch targets ≥ ~44 px where appropriate.

Run:
- Lighthouse Accessibility,
- axe,
- keyboard-only navigation.

---

# 45. Performance

Targets:

```text
Lighthouse Performance     > 90
Accessibility              > 95
Best Practices             > 95
SEO                        > 95
```

Key actions:

- Next/Image where possible.
- WebP / AVIF screenshots.
- Explicit width/height.
- Lazy-load lower-page media.
- Avoid large client bundles.
- Keep static content server-rendered.
- Avoid unnecessary animation libraries.
- Keep fonts minimal.

---

# 46. Analytics

Add privacy-respectful analytics so you can answer:

- Which projects recruiters open.
- Whether MindMap receives clicks.
- Whether visitors click Resume.
- Whether visitors open GitHub.
- What pages convert into contact.

Events worth tracking:

```text
mindmap_launch
mindmap_case_study
heartwire_case_study
resume_open
github_open
contact_click
project_repo_open
```

Do not over-instrument personal health product users from the portfolio domain.

---

# 47. Security / Privacy Presentation

Because you build health products, visitors will judge privacy maturity.

Each health product page should briefly state:

```text
Data storage approach
Authentication approach
Encryption assumptions
User-data ownership
Whether data leaves the device
Whether the system is a prototype or production-ready
```

Do not claim HIPAA compliance unless the complete system actually satisfies the relevant requirements.

---

# 48. Product Privacy Pages

Eventually add:

```text
/privacy
/security
```

and product-specific policies when the products collect real user data.

This is especially important for:
- MindMap,
- HeartWire,
- GastroGuard,
- SkinTrack.

---

# 49. Architecture Diagrams

Architecture diagrams will increase perceived technical depth more than almost any decorative redesign.

Use consistent diagrams.

### Software

```text
Client
  ↓
Application
  ↓
API / Server Actions
  ↓
Database
  ↓
Analytics
```

### Hardware

```text
Sensor
  ↓
AFE
  ↓
ADC
  ↓
MCU
  ↓
Communication
  ↓
Application
```

### Data / ML

```text
Raw Data
  ↓
Validation
  ↓
Normalization
  ↓
Feature Generation
  ↓
Analysis / Model
  ↓
Visualization
```

---

# 50. Development Roadmap

## Phase 0 — Freeze the New Brand Architecture
### Duration: 1–2 days

Decide and document:

- Terrero Labs = parent brand.
- MindMap = flagship.
- HeartWire = cardiac product/platform.
- HeartWire OS = legacy working title.
- HeartWire Agent Suite = legacy working title.
- GastroGuard / SkinTrack = supporting products.
- Engineering and research are separate from commercial products.

Create:

```text
BRAND_ARCHITECTURE.md
```

This prevents naming drift.

---

# 51. Phase 1 — Brand Cleanup
## Target: Week 1

### Repository

- [ ] Rename package from `heartwire-site`.
- [ ] Rename HeartWire workspace file.
- [ ] Search repository for `HeartWire`.
- [ ] Categorize every occurrence:
  - cardiac product → keep,
  - old studio reference → replace,
  - OS / agent suite → mark for rename.
- [ ] Create `src/lib/brand.ts`.
- [ ] Update metadata.
- [ ] Update header.
- [ ] Update footer.
- [ ] Update About page.
- [ ] Update Writing page.
- [ ] Update GitHub profile README.
- [ ] Unify contact identity.

### Deliverable

The site contains no ambiguous use of HeartWire.

---

# 52. Phase 2 — Information Architecture
## Target: Week 1–2

- [ ] Replace Ecosystem nav.
- [ ] Create `/products`.
- [ ] Create `/engineering`.
- [ ] Create `/research`.
- [ ] Add redirects from old routes.
- [ ] Add division fields to project data.
- [ ] Add priority fields.
- [ ] Add project statuses.
- [ ] Move internal tooling out of product hierarchy.

### Deliverable

Every project has exactly one logical home.

---

# 53. Phase 3 — Homepage Rebuild
## Target: Week 2

Build in this order:

- [ ] New Terrero Labs header.
- [ ] New founder/company hero.
- [ ] Large MindMap flagship section.
- [ ] Supporting product grid.
- [ ] Selected engineering.
- [ ] Selected research.
- [ ] Experience highlights.
- [ ] Capabilities.
- [ ] Writing preview.
- [ ] Contact section.

### Deliverable

A recruiter can understand the portfolio without opening another page.

---

# 54. Phase 4 — MindMap Flagship Case Study
## Target: Week 2–3

- [ ] Capture polished screenshots.
- [ ] Create architecture diagram.
- [ ] Document data model.
- [ ] Document authentication.
- [ ] Explain analytics logic.
- [ ] Document engineering tradeoffs.
- [ ] Add limitations.
- [ ] Add roadmap.
- [ ] Fix canonical production URL.
- [ ] Fix GitHub repository link.
- [ ] Add OG image.
- [ ] Add product metadata.

### Deliverable

MindMap becomes a portfolio centerpiece rather than a project card.

---

# 55. Phase 5 — HeartWire Product Page
## Target: Week 3–4

Even if the wearable is still in development:

- [ ] Add product mission.
- [ ] Explain intended use.
- [ ] Add system block diagram.
- [ ] Add hardware development photos.
- [ ] Add sensor / AFE architecture.
- [ ] Add signal-processing pipeline.
- [ ] Add software architecture.
- [ ] Add validation plan.
- [ ] Add current prototype state.
- [ ] Add safety / limitations section.
- [ ] Add roadmap.

### Deliverable

A technical visitor can see where HeartWire is going and what engineering has already happened.

---

# 56. Phase 6 — Upgrade Supporting Case Studies
## Target: Month 2

Priority:

1. BME Visualizations
2. Modular Knee Brace
3. GastroGuard
4. SkinTrack
5. Stryker RSA teardown
6. Robotic arm

For each:

- [ ] Problem.
- [ ] Requirements.
- [ ] Architecture / design.
- [ ] Engineering decisions.
- [ ] Evidence.
- [ ] Results.
- [ ] Limitations.
- [ ] Next iteration.

---

# 57. Phase 7 — GitHub Cleanup
## Target: Month 2

- [ ] Update profile README.
- [ ] Replace HeartWire organization reference with Terrero Labs.
- [ ] Reorder pinned repositories.
- [ ] Improve MindMap README.
- [ ] Improve portfolio README.
- [ ] Improve BME Visualizations README.
- [ ] Archive visibly dead repositories if appropriate.
- [ ] Add topics to active repositories.
- [ ] Add licenses where appropriate.
- [ ] Add screenshots to READMEs.
- [ ] Add CI status where useful.

---

# 58. Phase 8 — Production Polish
## Target: Month 2–3

- [ ] Custom domain research.
- [ ] Canonical URLs.
- [ ] Sitemap.
- [ ] robots.txt.
- [ ] OpenGraph images.
- [ ] JSON-LD.
- [ ] analytics.
- [ ] accessibility pass.
- [ ] performance pass.
- [ ] mobile pass.
- [ ] broken-link test.
- [ ] 404 page.
- [ ] redirects.
- [ ] favicon / Terrero Labs mark.
- [ ] unified product screenshots.

---

# 59. 30-Day Plan

## Week 1 — Naming + Architecture

**Goal:** Remove ambiguity.

- Terrero Labs everywhere.
- HeartWire only cardiac.
- MindMap designated flagship.
- Project taxonomy finalized.
- Repository legacy references identified.

**Output:**
- brand architecture document,
- updated site shell,
- updated metadata,
- updated GitHub branding.

---

## Week 2 — Homepage

**Goal:** Rebuild the story.

Ship:
- new hero,
- MindMap flagship block,
- products section,
- engineering section,
- research section,
- capabilities section.

Do not spend the week polishing micro-animations.

Narrative first.

---

## Week 3 — MindMap

**Goal:** Produce one exceptional case study.

Ship:
- screenshots,
- architecture,
- data model,
- technical decisions,
- limitations,
- roadmap.

If only one page becomes excellent this month, it should be MindMap.

---

## Week 4 — HeartWire

**Goal:** Establish the new meaning of HeartWire.

Ship the cardiac platform page even if it says:

> Prototype / active development.

A well-documented prototype is more credible than a vague future product.

---

# 60. 60-Day Plan

By day 60:

- Brand fully migrated.
- MindMap flagship case study complete.
- HeartWire cardiac case study online.
- BME Visualizations upgraded.
- Knee brace upgraded.
- GitHub synchronized.
- SEO metadata cleaned.
- Portfolio screenshots standardized.
- Analytics installed.
- Case-study template reusable.

At this stage, the portfolio should be ready to send to:

- biomedical device companies,
- health-tech startups,
- software engineering recruiters,
- medical software teams,
- neural-engineering labs,
- graduate researchers,
- investors / collaborators.

---

# 61. 90-Day Plan

By day 90:

- Custom Terrero Labs domain decision.
- Branded product URLs.
- Product changelogs.
- Writing section contains real technical articles.
- HeartWire hardware prototype documented.
- New neural-engineering project added if development is underway.
- Accessibility / Lighthouse targets met.
- All serious GitHub repositories follow the README standard.
- Internal HeartWire-derived names renamed.
- Terrero Labs identity fully stable.

---

# 62. Priority Matrix

| Priority | Task | Impact | Effort |
|---|---|---:|---:|
| P0 | Replace HeartWire parent branding with Terrero Labs | Very High | Low |
| P0 | Make MindMap flagship | Very High | Medium |
| P0 | Rewrite homepage hierarchy | Very High | Medium |
| P0 | Build complete MindMap case study | Very High | Medium |
| P1 | Create HeartWire cardiac platform page | Very High | Medium |
| P1 | Reorganize Ecosystem into Products / Engineering / Research | High | Medium |
| P1 | Fix repo / deployment URLs | High | Low |
| P1 | Sync GitHub branding | High | Low |
| P1 | Add strong screenshots | High | Medium |
| P2 | Improve case studies | High | High |
| P2 | SEO / OG / JSON-LD | Medium | Medium |
| P2 | Analytics | Medium | Low |
| P2 | Domain migration | Medium | Medium |
| P3 | Animations | Low | Medium |
| P3 | Decorative visual effects | Low | Medium |

---

# 63. What Not to Do

Do not:

- rebuild the entire stack,
- migrate frameworks without a technical reason,
- spend weeks designing a logo before fixing hierarchy,
- create ten new projects to make the portfolio look larger,
- make every prototype appear production-ready,
- hide limitations,
- fill pages with dozens of technology badges,
- use excessive gradients / glow effects,
- build fake metrics,
- call unvalidated health software "clinical AI,"
- place AI above the biomedical problem being solved.

You already have enough projects.

The goal is **depth, coherence, and proof**.

---

# 64. Recommended Homepage Copy Direction

## Hero

> **Biomedical systems, software, and instrumentation.**
>
> I'm Jonathan Terrero, founder of Terrero Labs. I build software and hardware that turn human physiology, behavior, and biosignals into measurable systems.

## Terrero Labs descriptor

> Terrero Labs is my independent biomedical engineering studio focused on health software, biosignal systems, embedded sensing, and applied engineering research.

## MindMap

> **MindMap**
>
> A longitudinal behavioral health platform for turning mood, sleep, stress, symptoms, routines, and context into structured data you can examine over time.

## HeartWire

> **HeartWire**
>
> A wearable cardiac sensing and monitoring platform spanning ECG acquisition, embedded electronics, signal processing, and software visualization.

---

# 65. Recommended Site Story

The entire site should tell this sequence:

```text
Jonathan is an engineer.
        ↓
He founded Terrero Labs to build biomedical systems.
        ↓
MindMap is the flagship software product.
        ↓
HeartWire is the cardiac sensing platform.
        ↓
Supporting products prove repeated product execution.
        ↓
Hardware projects prove physical engineering ability.
        ↓
Research proves scientific depth.
        ↓
Professional work proves production software ability.
        ↓
Writing proves reasoning and communication.
```

If that story is clear, the portfolio becomes much more than a resume site.

It becomes a **technical record of an engineering career being built in public**.

---

# 66. Suggested Final Portfolio Navigation

```text
TERRERO LABS

Products
Engineering
Research
Writing
About
Resume
```

Homepage buttons:

```text
[Explore Products]
[View MindMap]
[Resume]
```

Footer:

```text
Jonathan Terrero
Founder & Engineer — Terrero Labs

GitHub
LinkedIn
Writing
Email
```

---

# 67. Definition of Done

The restructuring is complete when a first-time visitor can answer all of these without asking you:

- Who is Jonathan Terrero?
- What is Terrero Labs?
- What does MindMap do?
- Why is MindMap the flagship?
- What does HeartWire mean?
- What biomedical hardware have you built?
- What production software have you built?
- What research have you done?
- What technologies can you actually use?
- Can I see the code?
- Can I see a live product?
- Can I see engineering diagrams?
- Can I understand your design decisions?
- Can I contact you?
- Can I download your resume?

If those answers are obvious, the portfolio is doing its job.

---

# 68. Immediate Next Actions

Start in this exact order:

1. **Create `BRAND_ARCHITECTURE.md`.**
2. **Search the entire repo for "HeartWire".**
3. **Replace parent-company references with Terrero Labs.**
4. **Keep HeartWire only for cardiac product references.**
5. **Rename `heartwire-site` package metadata.**
6. **Rename the legacy workspace file.**
7. **Change the header to Terrero Labs.**
8. **Update global metadata.**
9. **Reclassify every project into Product / Engineering / Research / Internal.**
10. **Mark MindMap as `flagship`.**
11. **Redesign the homepage around MindMap.**
12. **Move the tech stack below the work.**
13. **Create the full MindMap case study.**
14. **Create the HeartWire cardiac case study.**
15. **Fix all placeholder repository URLs.**
16. **Normalize deployment URLs.**
17. **Update GitHub profile branding.**
18. **Add screenshots and architecture diagrams.**
19. **Add SEO / OG / structured data.**
20. **Run accessibility, mobile, and performance audits.**

---

# 69. Recommended First Repository Issue / Epic

Create an issue called:

```text
Terrero Labs Portfolio Restructure
```

Suggested checklist:

```markdown
## Brand
- [ ] Replace HeartWire studio branding
- [ ] Add Terrero Labs constants
- [ ] Update metadata
- [ ] Update header/footer
- [ ] Update About
- [ ] Update Writing

## Information Architecture
- [ ] Add Products route
- [ ] Add Engineering route
- [ ] Add Research route
- [ ] Redirect Ecosystem
- [ ] Add project divisions
- [ ] Add project priority

## Homepage
- [ ] New hero
- [ ] MindMap flagship
- [ ] Product grid
- [ ] Selected engineering
- [ ] Research
- [ ] Experience
- [ ] Capabilities
- [ ] Contact

## MindMap
- [ ] Case study
- [ ] screenshots
- [ ] architecture diagram
- [ ] data model
- [ ] roadmap
- [ ] limitations
- [ ] OG image

## HeartWire
- [ ] cardiac positioning
- [ ] hardware architecture
- [ ] signal chain
- [ ] prototype media
- [ ] validation plan

## GitHub
- [ ] profile README
- [ ] pinned repositories
- [ ] repository READMEs
- [ ] repo topics

## Production
- [ ] sitemap
- [ ] robots
- [ ] canonical URLs
- [ ] structured data
- [ ] analytics
- [ ] accessibility
- [ ] Lighthouse
```

---

# 70. Final Strategic Rule

When deciding whether something belongs on the homepage, ask:

> **Does this help prove what kind of engineer I am or what Terrero Labs builds?**

If not, it belongs deeper in the site.

When deciding whether something deserves a project page, ask:

> **Can I explain the problem, system, decisions, and evidence?**

If not, it is not yet a case study.

And when deciding how to describe Terrero Labs:

> **Lead with the engineering work, not the ambition.**

The products, architecture, experiments, code, and hardware will make the ambition obvious.

---

## Reference Points Used for This Plan

Current public portfolio:
- `jonnyterrero.github.io`

Current portfolio repository:
- `github.com/jonnyterrero/JonnyTerrero.github.io`

Current observed portfolio architecture:
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- structured project data
- reusable project-card system
- GitHub Pages deployment

This plan intentionally preserves that technical foundation and concentrates work on positioning, hierarchy, case-study depth, evidence, and brand coherence.
