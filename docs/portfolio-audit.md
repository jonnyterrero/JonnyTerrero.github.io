# Portfolio & Résumé Audit — Project Template Fill

**Owner:** Jonathan Terrero
**Created:** 2026-09-28
**Status:** Living document. Update as Section 6 data lands.
**Suggested repo path:** `docs/portfolio-audit.md`

**Sources audited:**
- `src/app/resume/page.tsx`
- `src/app/about/page.tsx`
- `src/lib/tech-stack.ts`
- `src/lib/projects.ts`
- `projects.json`
- `src/app/projects/[slug]/page.tsx`
- `build/projects/health-apps/MindMap/README.md`

---

## 0. How to use this document

Every field in every project section carries one of three tags:

| Tag | Meaning | Safe to publish? |
|---|---|---|
| `[V]` | **Verified** — traceable to code, a deployed artifact, or a recorded fact | Yes |
| `[D]` | **Derived** — follows logically from `[V]` facts | Yes |
| `[NEEDS DATA]` | Cannot be written without measuring or retrieving something | **No. Do not fill with estimates.** |

The governing rule for this document: **no fabricated figures.** A blank Section 6 is recoverable. A published number you cannot reproduce under questioning is not.

Sections 1, 3, 4, 5, 8, 9 are writing tasks — fillable now from existing material.
Sections 2, 6, 7 are a **measurement backlog**. You cannot write your way into them.

---

## 1. Audit findings

### C1 — Résumé and portfolio describe the same three apps with mutually exclusive stacks

| Source | MindMap+ / GastroGuard / SkinTrack+ stack |
|---|---|
| `resume/page.tsx` | Python, FastAPI, REST APIs, PyTorch |
| `projects.json` | Next.js, Supabase, TypeScript, Recharts, PWA |

Both are public. Evidence favours the portfolio: live URLs are Vercel deployments; the codebase calls Supabase Auth (`signIn` / `signUp` / `signOut`) and a Postgres RPC `upsert_mindmap_entry(jsonb)`.

**Resolution:** treat Next.js + Supabase as ground truth. Update the résumé stack line.
**Severity:** Critical. Two public documents disagreeing on your own stack.

### C2 — `PyTorch` is claimed and unsupported

`PyTorch` appears in the résumé stack line for the health suite and nowhere else — no model, no training set, no metric, no inference path in any file. Remove it until Sections 5 and 6 can support it.

**Severity:** Critical. An unanswerable follow-up question.

### C3 — Knee brace described as two disjoint projects across two public pages

| Source | Name | Period | Stack |
|---|---|---|---|
| `resume/page.tsx` | Biomechanical Knee Brace Prototype | Spring 2025 | Arduino, FSR, signal conditioning, Python |
| `projects.json` | Modular Knee Brace | — (status: Prototype) | 3D Printing, CAD, Biomechanics |

**Resolved 2026-09-28:** one project, two phases. Phase 1 = instrumented FSR prototype (Spring 2025). Phase 2 = current, SolidWorks CAD + Python simulation, physical print in PLA/silicone in progress, sensing layer being rebuilt.

**Action:** merge into a single entry on both surfaces, presented as a two-phase project. See Section 5 of this document.

### C4 — "Measuring real-time joint loading" is a physics overclaim

Résumé bullet: *"a smart knee brace measuring real-time joint loading using force-sensitive resistors."*

An FSR placed at a brace–limb interface measures **interface contact pressure over the sensor's active area**. It does not measure tibiofemoral joint reaction force. Internal joint load is not directly measurable non-invasively; it is *estimated* via inverse dynamics from kinematics plus ground reaction force, or via an instrumented implant.

This is the single most likely bullet on your résumé to be challenged by a biomechanics-literate interviewer, and the challenge is fatal as written.

**Rewrite to:** *"measuring brace–limb interface pressure distribution via an FSR array, used as a proxy for load transfer through the brace."* That is true, it is still a real measurement, and stating the distinction yourself reads as sophistication rather than error.

**Severity:** Critical.

### C5 — Most `repoUrl` values in `projects.json` are a bare root

The four health-tech and device entries read `"https://github.com/"`. `hasValidRepoUrl()` silently suppresses the button, so the site renders correctly and the defect is invisible.

**Consequence:** Section 9 ("Repository / demo / report") is empty for every project except BME Visualizations.

**Correction (2026-09-28):** BME Visualizations is the exception — it carries a real `repoUrl` *and* a real `liveUrl`, both working. It is currently the only project in the portfolio whose Section 9 is complete, and the model for what the others should look like.

Known-good repos still unwired: `gastro-guard`, `MindMap`, `SkinTrack-` under `github.com/jonnyterrero`.

### C6 — Sections 2, 6, 7, 8 do not exist anywhere in the portfolio

Every project bullet currently written is Section 1 + Section 5 — *what it is* and *what I built*. Zero acceptance criteria, zero quantitative verification, zero documented failure, zero stated limitation.

That is the exact profile of an undergraduate résumé, and closing it is the entire purpose of the 9-section template.

The only quantitative claim in the portfolio is the OmniFlex bullet: *"reducing Firestore read/write cost per session by 10%."* Retain the measurement artifact — before/after read counts from the Firestore usage dashboard over an identical session workload — or the number is indefensible.

### C7 — Status language is unfalsifiable

"In user testing," "in pre-release testing," "in testing and UI/UX refinement." How many users, over what window, with what retention? These three phrases are currently doing the work Section 6 should do.

### C8 — Minors disagree across three sources

- `resume/page.tsx`, `about/page.tsx`: Physics, Computer Science
- Master context document: Chemistry, Computer Science
- Personal profile: Chemistry, Mathematics

Three answers, two of them public. Pick one and propagate to every surface.

### C9 — "Encrypted storage" as written is not a differentiator

Résumé describes MindMap+ as *"privacy-focused … with encrypted storage."* If this refers to Supabase's default AES-256 encryption at rest, that is a property of the hosting platform shared by every Supabase project in existence — not application work.

**Either:** implement application-layer envelope encryption for journal text and claim it precisely, **or** replace the phrase with *"per-user row isolation enforced by database-level RLS policies"* — which is true, is your work, and is more impressive to an engineer.

### C10 — `ProjectDetail` type does not fit the 9-section template

```ts
export interface ProjectDetail {
  problem?: string;
  design?: string;
  engineering?: string[];
  sections?: { title: string; paragraphs: string[] }[];
}
```

The `sections[]` variant holds all nine headings with no schema change. `src/app/projects/[slug]/page.tsx` already renders it under a "Case study" heading. Use `sections[]`; retire `problem` / `design` / `engineering` for these four projects.

### C11 — Template gap: no scope/role field

The template has no place to state what you personally owned. Fine for solo work; a liability for anything course-based or team-based. Recommend inserting **"Scope & role"** between Sections 4 and 5.

### C12 — GastroGuard wearable ingestion is described as operational but is not connected

Résumé: *"full-stack GI monitoring platform with FastAPI APIs, persistent storage, **wearable ingestion (HRV, sleep)**, and analytics…"*

**Confirmed 2026-09-28:** the ingestion path does not run. The PWA is architected to connect to any health platform exposing a public API, but no live source is connected and no wearable data has been ingested.

Written as-is, this states a capability that has never executed. Two honest rewrites, pick one:

- **Conservative:** *"designed a vendor-neutral ingestion interface for external health-platform APIs (HRV, sleep); not connected to a live source in the current build."*
- **Stronger, if true:** *"built a generic ingestion endpoint accepting normalised HRV/sleep records from any public health API; validated against synthetic payloads, pending a live integration."* — **only use this if the endpoint actually exists and accepts a payload.** If the integration is conceptual rather than coded, use the conservative form.

`[NEEDS DATA]` Which is it: coded-but-unconnected, or designed-but-unbuilt? This determines whether it belongs in Section 5 (Implementation) or Section 3 (Architecture, as planned surface).

**Severity:** Critical. A claimed data source that has never produced a row.

### C13 — RESOLVED: no computer vision exists. Remove the claim.

`projects.json` currently declares:
- `stack: ["Python", "Computer Vision", "Supabase"]`
- `capabilityDetails.biomedical-embedded: "Vision pipeline plus physiological context for skin lesions."`

**Resolved 2026-09-28 — reading (c).** The PWA captures and uploads images. Those images are **not analysed**. The "model" is a predictive/correlation engine operating on **logged metadata** — symptoms, medications, environmental context — architecturally the same class of component as GastroGuard's. Machine learning was evaluated for this project and deliberately not adopted.

Both `projects.json` lines are therefore false. No pixel-level processing occurs: no segmentation, classification, change detection, or measurement.

**Note this inverts C1.** For SkinTrack+ the résumé is the accurate document — *"image management, medication and symptom logging, time-series records, calendar heatmaps"* — and `projects.json` is the overclaim.

**Required action — today, independent of the write-up:**
- [ ] `stack`: remove `"Computer Vision"`. Replace with the real stack: `["Next.js", "TypeScript", "Supabase", "PWA"]`, plus `"Python"` only if Python actually runs here.
- [ ] `capabilityDetails.biomedical-embedded`: replace with something true, e.g. *"In-app camera capture and structured longitudinal image records with symptom and medication context."*

**What to claim instead.** The deliberate decision not to use ML is itself the interesting content, and it is being hidden by a false claim. *"I evaluated a learned image model for lesion tracking and rejected it — no clinical ground truth, no labelled data, documented under-representation of darker skin tones in dermatological datasets, and uncontrolled consumer capture conditions that make apparent change indistinguishable from capture artifact. I shipped a correlation engine over logged context instead."* That is a stronger answer than any CV claim you could make, and it is true.

**Severity:** Critical as a claim. Trivial to fix.

### C14 — DOWNGRADED: guidance is metadata-derived, not image-derived

**Previous assessment (superseded):** image of a lesion in, treatment guidance out — a Software as a Medical Device function with a melanoma false-negative pathway.

**Corrected 2026-09-28.** No image analysis occurs (C13). Guidance derives from the user's own logged symptom, medication, and environmental records. **The melanoma false-negative pathway does not exist**, because nothing in the system examines a lesion. The severe reading was wrong and is withdrawn.

**What remains, at reduced severity.** "Predictive remedies for the user's skin issue" is still **therapeutic recommendation**, and it is unvalidated. Two live concerns:

- **Unvalidated advice.** Recommendations derived from n-of-1 correlations in self-reported data have no clinical grounding. Skin-specific guidance carries real downside — topical steroid overuse causes atrophy; occlusive treatments worsen some conditions and help others. Generic "remedies" for an unspecified skin issue can be actively wrong.
- **User inference.** A user photographing a lesion inside an app that then offers remedies will reasonably infer the app considered the photo. It did not. **That gap between what the user believes happened and what happened is the residual risk**, and it is closed by disclosure, not by removing the feature.

**Required, and now proportionate:**
1. Frame output as surfacing the user's own logged correlations — *"your flare-ups cluster with X in your records"* — not as advice.
2. State at the point of output that images are stored for the user's own reference and are **not analysed**. This is the specific sentence that closes the inference gap.
3. Standard disclaimer: no diagnosis, no cancer screening, see a dermatologist for any new, changing, asymmetric, or bleeding lesion.
4. Do not reintroduce image analysis without ground truth and a model card.

**Severity:** Moderate. Was Critical; corrected on better information.

### C15 — Deployment status is overstated; the public link may not work

**New, 2026-09-28. Revised same day on better information — the situation is better than first stated, but the public-facing claim is still wrong.**

- `projects.json`: `status: "Active Development"`, `liveUrl: "https://skintrack.vercel.app/"`, `stack: [… "Supabase"]`
- Résumé: *"in testing and UI/UX refinement"*, *"backend services for image management"*
- **Actual:** a **Firebase** backend exists but is dormant and not fully built; it needs reactivation. At the time of the only external test — roughly one year ago — there was no backend at all, and persistence was browser-local.

**A fourth stack error, and the largest on this project.** `projects.json` lists Supabase; the backend is Firebase. Combined with C13's false `"Computer Vision"` entry, three of that project's four declared stack items are wrong. Correct the whole array, not just the CV line.

Three consequences, in order:

**(a) A live link that doesn't work is worse than no link.** Anyone evaluating you — recruiter, interviewer, professor — will click it. If they hit a shell where uploads vanish on refresh, the damage exceeds anything the write-up could have gained. **Either reactivate the Firebase backend and verify end-to-end today, or remove `liveUrl` and set `status` to `"Prototype"` until it does.** Reactivation is the better path and is reportedly small work — but until it is verified, the link should not be public. This outranks every documentation item in this file.

**(b) There is no SkinTrack+ dataset and no cohort.** The one external test predates the backend entirely, so nothing testers uploaded was ever captured. No adherence data, no retention data, no image corpus. Every `[NEEDS DATA]` in Section 6 that depends on user data is not merely unmeasured — it is unrecoverable for that period. Note the date: that test was roughly a year ago, which also makes *"in testing and UI/UX refinement"* stale as a present-tense claim.

**(c) `"Active Development"` and `"in testing"` are doing work they haven't earned.** GastroGuard has 10 users over a month and carries the same status string as an app whose backend isn't finished. That flattening costs you credibility on the project that deserves it.

**Severity:** Critical. Reactivate and verify, or pull the link — today. Correct the stack array regardless.

---

### C16 — "Closed-loop motion control" overclaims what the hardware does

`projects.json` `useCase`: *"Used to explore **closed-loop motion control** and sensor-driven task automation on real hardware."*

Hobby servos take a commanded angle and report nothing back. Unless encoders were added, there is **no feedback on joint position** — the arm commands a pose and assumes it was reached. The loop that actually closes is around the **ultrasonic sensor and the FSM**: sense object presence → decide → act → re-sense. That is closed-loop *task* control, not closed-loop *motion* control.

Same error class as C4 on the knee brace — a control-theory term applied one level away from where it belongs, and an interviewer with robotics background will catch it in one question.

**Rewrite:** *"sensor-driven task sequencing with FSM state feedback; joint actuation is open-loop position command."* Naming the open-loop limitation yourself is stronger than the overclaim, and it sets up the Section 8 discussion of why repeatability has to be measured empirically rather than assumed.

`[NEEDS DATA]` Confirm no encoders or potentiometer feedback exist. If they do, C16 is withdrawn and the closed-loop claim stands.

**Severity:** High.

### C17 — The arm's repository exists but is unwired, and the project is badly underclaimed

**Revised 2026-09-28 on better information.** An earlier draft of this finding stated no repository existed. Wrong — the full project, including schematics, lives in the GitHub repo **`intro to mechatronic design`**. The defect is `repoUrl: ""` in `projects.json`, which is the same wiring failure as C5, not a missing artifact.

**The larger finding is the reverse of every other in this document.** Every prior finding is an overclaim. This one is an **underclaim**, and it is substantial. The arm actually performs:

- **Inverse kinematics** — Cartesian targets solved to joint angles, not replayed taught poses
- **Colour recognition and sorting** — reads an LED's colour, picks the ball, places it in the correspondingly coloured cup
- **Human-to-robot handover** — recognises an object, takes it from a person's hand, and places it down or into a cup

**None of these three appear anywhere in the portfolio or résumé.** `stack` lists Arduino, servo control, ultrasonic sensing, and FSM logic — no colour sensing, no kinematics. The bullets describe generic pick-and-place. A reader gets "student moved an object with a robot arm" when the truth is closed-form kinematics driving a perception-conditioned sort with a human-interaction mode.

Colour-conditioned sorting is a **classification task with a measurable confusion matrix**. Handover is a human-robot-interaction capability most undergraduate arms do not attempt. IK on an AVR is real work. Compounding it: `featured: false`.

**Required:**
- [ ] Wire `repoUrl` to the `intro to mechatronic design` repo.
- [ ] Add colour sensing and inverse kinematics to `stack[]`.
- [ ] Rewrite the bullets around what it actually does — colour-conditioned sort, IK, handover.
- [ ] Set `featured: true`.
- [ ] Record a cycle video. 20 seconds of colour-sorting and a handover outperforms three résumé bullets.

**Severity:** High. The work is done, it is good, and it is invisible.

### C18 — HeartWire OS's resource catalog contains systematically corrupted records

**Directly observable in the project data, and the most concrete defect in this audit.** The study-resource catalog shows three independent failure classes:

**(a) Track assignments are wrong at scale.** Neuroscience resources tagged `trackId: "ee"`. Chemistry LibreTexts tagged `"ee"`. Psychology course lists tagged `"se"`. ARM embedded-systems education kits and a Neso Academy computer-networks playlist tagged `"neuro"`. Adjacent rows from the same source split across unrelated tracks — the Prisma docs tagged `"se"` while the Prisma GitHub link immediately after is tagged `"chem"`.

**(b) Titles are parser artifacts, not titles.** Live values include `"Resource"` (hundreds of rows), `"| GitHub:"`, `"# Study Links Database"`, `"| **Computer Networks** | Neso Academy | [Computer Networks]( |"`, bare zero-width-space strings, and rows whose *title* is one URL while the `url` field holds a different one.

**(c) `courseId` is unreliable.** Large blocks share `courseId: 605` or `627` across unrelated subjects; many are `null` alongside identical-looking rows that are not.

**Diagnosis:** a markdown link-scraper ingested curated study notes, the regex captured trailing table syntax and link fragments as titles, and track/course assignment fell through to a default or an index error rather than a real mapping. **The output was never validated.** That is the entire finding — not that a scraper is wrong, but that nothing checked it.

**Why it matters more here than it would elsewhere.** The stated purpose of this system is *structured inputs and a result you can reconstruct* — the same principle the homepage argues for explicitly. A catalog where a neuroscience resource is filed under electrical engineering under a title of `"Resource"` fails that principle on its own terms. It is also live at a public URL.

**This is fixable and the fix is a portfolio asset.** A validation pass — assert every row has a non-empty human title, a `trackId` in the allowed set, a resolvable `courseId` or explicit null, and a well-formed URL — produces a before/after number. *"Audited 1,200 catalog records; 38% failed validation on title, track, or course assignment; repaired via re-ingestion with schema validation at the boundary."* That is a real Section 6 result and a real Section 7 story.

**Severity:** High. Public, systematic, and self-contradicting the project's stated premise.

### C19 — "HeartWire" names four different things

The name is used as:
1. **HeartWire OS** — a project entry in `projects.json` (study/planning platform)
2. **HeartWire Agent Suite** — a separate project entry (18 Claude agents)
3. **The portfolio site itself** — the workspace is `HeartWire OS-portfolio`
4. **An umbrella philosophy** — the BME Visualizations copy refers to *"the rest of HeartWire"* as a shared standard

A reader cannot tell whether HeartWire is a product, a personal brand, or the ecosystem containing everything else. Listing it as one project among peers while simultaneously using it as the parent brand is self-undermining in both directions — it shrinks the brand and inflates the project.

**Pick one and be consistent.** The cleanest resolution: HeartWire is the **ecosystem/brand**, and the individual products get their own names. Then "HeartWire OS" needs a distinct product name, or it needs to be presented as the ecosystem's home surface rather than a sibling project.

**Severity:** Moderate. Costs clarity, not credibility.

### C20 — Portfolio information architecture: HeartWire is a company, not a sibling project

**Resolves C19 with new information.** HeartWire is Jonny's **startup**. MindMap is its flagship product. The deployed page currently serves as the personal engineering portfolio. The agent suite is personal tooling, not a product.

That makes the present structure wrong in a deeper way than C19 described: **a company is listed as one card in a row alongside a two-person course robot.** The taxonomy flattens a venture, a class project, and a set of markdown prompt files into peers.

**The proposed fix — portfolio page as the surface, HeartWire embedded as an ongoing venture with MindMap as flagship — is directionally right, with one correction.** HeartWire should not be a *project* entry. It should be a **venture** entry in its own tier, with its products nested beneath it. The distinction is not cosmetic: a reader scanning a flat project grid cannot tell which items you built for a grade and which you are building a company around.

**Recommended structure:**

```
Jonathan Terrero — portfolio
│
├── VENTURES
│   └── HeartWire  (startup, ongoing)
│         ├── MindMap        ← flagship
│         ├── GastroGuard
│         ├── SkinTrack+
│         └── GlucoLoop      (concept)
│
├── ENGINEERING PROJECTS
│   ├── Modular Knee Brace
│   ├── Robotic Pick-and-Place Arm
│   └── BME Visualizations
│
├── RESEARCH / CASE STUDIES
│   ├── Stryker ReUnion RSA Teardown
│   ├── Healthcare Supply Chain
│   └── Co-Cr systematic review
│
└── TOOLING  (how I work — not products)
    ├── Agent suite
    └── HeartWire OS → rename (see below)
```

**Three consequences to handle:**

**(a) "HeartWire OS" needs a different name.** If HeartWire is the company, a personal study system called HeartWire OS reads as a company product. It is not — it is your own infrastructure. Rename it, or fold it into the tooling tier explicitly labelled as personal.

**(b) The claim findings get sharper, not softer.** This is the important one. A student project that overstates a capability is embarrassing. **A company that overstates a health capability is a liability.** Under a startup banner, these stop being résumé-polish issues:
- C9 — "encrypted storage" on MindMap, the flagship
- C12 — wearable ingestion described as operational when it has never run
- C14 — skin guidance from a system that does not analyse images
- C13 — a computer-vision claim on a dermatology product

**Fix these before HeartWire is presented as a company anywhere public.** The same sentence carries different weight over a company name.

**(c) Separate surfaces eventually, one surface for now.** A personal portfolio and a company site serve different audiences: a recruiter wants your scope and capability; a user or investor wants the product. Long-term these want separate domains. **For now, one clearly-tiered page is the right call** — you are pre-revenue and a student, and splitting into two thin sites serves neither. Tier it properly, cross-link, and split when HeartWire has something to sell.

**Severity:** Moderate structurally, High for (b).

---

## 2. Canonical template

```
1. Problem / clinical or user need
2. Requirements
   └─ measurable acceptance criteria
3. Architecture
   └─ system block diagram
4. Design decisions
   └─ alternatives considered
   └─ tradeoffs
[4.5 Scope & role]              ← recommended addition
5. Implementation
   └─ hardware / firmware / software / algorithms
6. Verification
   └─ test methodology
   └─ quantitative results
7. Failures / iterations
   └─ what didn't work, and why
8. Limitations
   └─ what you cannot claim
9. Repository / demo / report
```

---

## 3. Measurement backlog

Ordered by value per hour. Items marked **[×3]** produce reusable harnesses that fill a Section 6 row in three projects at once.

| # | Task | Est. | Fills | Notes |
|---|---|---|---|---|
| M1 | RLS cross-tenant isolation test **[×3]** | ~1 h | MindMap R3, GastroGuard, SkinTrack+ | Two test accounts; with A's JWT attempt select/update/delete on B's rows across every table and RPC. Expect 0 successes. Publishable as a hard number. |
| M2 | Auth E2E (Playwright) | ~2 h | MindMap R1/R3 | signup → confirm email → login → session persist → refresh → logout. Already on your backlog; automate once. |
| M3 | RPC contract tests | ~2 h | MindMap R2 | Valid payload / missing key / wrong type / duplicate same-day (idempotency) / oversized. |
| M4 | Dashboard render p95 at 30/90/365 d seeded data | ~2 h | MindMap R5 | Tells you where Recharts degrades. |
| M5 | **Locate FSR calibration raw data** | ~1 h | Knee brace R2, §6, §7 | **Blocking.** See §5 of this document. |
| M6 | Simulation validation vs. published gait kinetics | ~4 h | Knee brace R1 | Compare model output to normative sagittal knee moment curves from literature. |
| M7 | Print dimensional accuracy + fit check | ~2 h | Knee brace R3/R4 | Calipers on printed parts vs. CAD nominal; report mean deviation and max. |
| M8 | `.env.example` as a checked-in contract **[×3]** | ~30 min | All web apps, §7 | Direct fix for the `NEXT_PUBLIC_APP_URL` failure. |
| M9 | **GastroGuard adherence stats from existing data** | ~1 h | GastroGuard R2 | Entries/user, active-days/user, dropoff curve over the 10-user month. **Zero new collection — the data is already in Supabase.** |
| M10 | Confirm GastroGuard eval split strategy | ~30 min | GastroGuard R4 | **Blocking for any published metric.** Pooled random split ⇒ rerun as leave-one-subject-out. |
| M11 | Write GastroGuard model card | ~2 h | GastroGuard §5, §9 | Fill every row of the §5 table. The artifact itself is the deliverable. |
| M12 | Apply FDR correction to trigger associations | ~1 h | GastroGuard §6, §8 | Benjamini–Hochberg at q = 0.05, or explicitly label results uncorrected. |
| M13 | **SkinTrack+ storage isolation test** | ~1 h | SkinTrack+ R3, §8 | Confirm bucket is private. Attempt B's image via direct path, guessed path, expired signed URL, unauthenticated. Expect 0/4. **Do this before sharing the app with anyone.** |
| M14 | SkinTrack+ capture-consistency measurement | ~3 h | SkinTrack+ R2 | Same site, n repeats over days, under normal conditions. Report scale and ΔE variance. A large number is still a publishable finding. |
| M15 | Ship SkinTrack+ in-product "no assessment performed" disclaimer | ~1 h | SkinTrack+ §8 | Non-dismissible. Blocking before any external sharing. |

**Start with M9, then M13, then M1.** M9 is about an hour, needs no new collection, and produces the first genuinely publishable quantitative result in the portfolio. M13 is a safety item on an app that stores photographs of people's bodies — it outranks everything else if SkinTrack+ has been shared with anyone. M1 is binary, closes a security criterion, and the harness copy-pastes across all three web apps.

---

## 4. Project — MindMap+

**Slug:** `mindmap-plus` · **Status:** Active Development · **Live:** https://mind-map-bice-nine.vercel.app/

### 1. Problem / clinical or user need

`[V/D]` Mental-health and chronic-condition self-tracking is either unstructured (paper journal, notes app) or locked inside closed consumer apps that reduce mood to a single daily emoji. Neither produces analysable data.

A user attempting to answer *"does poor sleep precede my low-mood days, or follow them?"* has no instrument. The question requires timestamped, multi-variable, longitudinal records under a consistent schema — which free-text journaling does not produce, and which consumer apps do not export.

`[NEEDS DATA]` State whether this need is self-identified (n = 1 observation) or externally validated. If you have a user conversation, forum thread, or clinical citation establishing the gap, cite it. If it is self-identified, **say so** — that is honest and still legitimate grounds for a product.

### 2. Requirements — measurable acceptance criteria

`[NEEDS DATA]` — this section does not currently exist in any form. Scaffold below. **Do not publish placeholder numbers.**

| # | Requirement | Acceptance criterion | Status |
|---|---|---|---|
| R1 | Daily entry capture | Full check-in completed in ≤ ___ s, median over ___ sessions | unmeasured |
| R2 | Data durability | Entry survives offline submit + reconnect; 0 lost writes over ___ trials | unmeasured |
| R3 | Auth isolation | User A cannot read or mutate user B's rows via any query path | **testable now (M1)** |
| R4 | Cross-device sync | Entry written on device A visible on device B within ___ s | unmeasured |
| R5 | Analytics latency | 90-day dashboard renders in ≤ ___ ms p95 | unmeasured |
| R6 | Retention | ___ % of test users log ≥ 5 days in a rolling 7-day window | unmeasured |

R3 is the highest-value row in the table: it is a security property, it is binary, it is closeable in one hour, and it is the criterion an engineering interviewer is most likely to probe.

### 3. Architecture

`[V]`

```
┌───────────────────────────────────────────────────────┐
│  CLIENT — Next.js 15 App Router (PWA, TypeScript)     │
│  /today check-in · Recharts dashboards · service wkr  │
└────────────────┬──────────────────────────────────────┘
                 │ HTTPS
    ┌────────────▼────────────┐
    │  Next.js middleware     │  session refresh / route guard
    │  (middleware.ts)        │  ⚠ TECH DEBT → proxy.ts (Next 16)
    └────────────┬────────────┘
                 │
    ┌────────────▼─────────────────────────────────────┐
    │  SUPABASE                                         │
    │  ├─ Auth: signUp / signIn / signOut               │
    │  │        + email-confirmation route handler      │
    │  ├─ Postgres + RLS (per-user row isolation)       │
    │  └─ RPC: upsert_mindmap_entry(jsonb)   ← /today   │
    └───────────────────────────────────────────────────┘
                 │
    ┌────────────▼────────────┐
    │  Vercel (production)    │  mind-map-bice-nine.vercel.app
    └─────────────────────────┘
```

`[NEEDS DATA]` Confirm whether the service worker implements **offline write queueing** or only **asset caching**. These are materially different claims; "offline-capable" without a write queue is a claim you will lose under questioning.

### 4. Design decisions

**D1 — Single RPC (`upsert_mindmap_entry(jsonb)`) vs. per-field REST writes**
- *Chosen:* one Postgres function taking a JSONB payload.
- *Alternative:* individual table inserts issued per metric from the client.
- *Tradeoff:* the RPC makes a day's check-in **atomic and idempotent** — a partial submit cannot leave a half-written day, and a re-submit overwrites rather than duplicates. Cost: the JSONB contract is untyped at the database boundary, so client/function schema drift is a silent runtime failure rather than a compile error.
- `// TECH DEBT:` derive the JSONB shape from one source of truth (zod schema → inferred TS type → `supabase gen types`) so drift fails loudly at build.

**D2 — Supabase Auth + RLS vs. a custom session layer**
- *Chosen:* Supabase Auth with row-level security.
- *Tradeoff:* authorization lives in the database, so a compromised client cannot read other users' rows even holding a valid anon key. Cost: RLS policies become load-bearing security code that must be tested like code — and nothing in the repo currently tests them (see M1).

**D3 — Next.js PWA vs. native mobile**
- *Chosen:* PWA on Vercel.
- *Tradeoff:* one codebase, instant deploy, no app-store review. Cost: no background sensor access, weaker iOS notification reliability, and no on-device inference path — a real constraint given local-first quantized inference is already a scoped direction for this ecosystem.

### 5. Implementation

- **Hardware:** none in v1. Phase 2 of the hardware roadmap adds an ESP32 + BME280/BH1750 environmental node writing to a shared `sensor_readings` table via a universal `/ingest` Edge Function. **That Edge Function is a Phase-0 dependency and is not built.** Do not describe MindMap as having a hardware integration.
- **Firmware:** N/A in v1.
- **Software** `[V]`: Next.js 15 App Router, TypeScript, Recharts, Supabase JS client, Vercel. Auth layer complete — `signUp`, `signIn`, `signOut`, signup page, email-confirmation route handler, all deployed.
- **Algorithms** `[NEEDS DATA]`: the résumé claims *trigger detection*, *habit scoring*, and *longitudinal mood analytics*. Each is a named algorithm; none is documented. For each, you owe: input features → actual computation → why that computation over the alternative.
  - If trigger detection is a threshold rule, **write "threshold rule."** That is defensible.
  - If it is a correlation scan across many logged variables, state the multiple-comparisons correction, or an interviewer will ask why it is not p-hacking across 30 features.

### 6. Verification

`[NEEDS DATA]` — nothing here is currently measured. Execute M1–M4 from §3.

Report format once data exists:

> *"Cross-tenant access: 0/24 attempts succeeded across 8 tables × 3 operations (select/update/delete) using a second authenticated JWT."*

### 7. Failures / iterations

`[NEEDS DATA]`, but four items are already on record and belong here once resolved:

- **Missing `NEXT_PUBLIC_APP_URL` in Vercel env** → email-confirmation redirect targets the wrong origin in production. *Lesson: env vars that differ between local and prod are a distinct failure class; `.env.example` must be a checked-in contract.* (M8)
- **`middleware.ts` deprecated in favour of `proxy.ts` (Next.js 16)** → framework-version debt on a fast-moving framework.
- `[NEEDS DATA]` **Prisma → Supabase client migration.** Prisma is recorded as historical for this app. Why did you move off it? That is a genuine architectural iteration and precisely what Section 7 exists to capture.
- `[NEEDS DATA]` Anything built and discarded. If nothing, write *"no significant rework to date"* — itself an honest signal.

### 8. Limitations

`[V/D]` — publish verbatim:

- Not a medical device. No diagnostic, therapeutic, or clinical claim is made. Not evaluated under any FDA SaMD pathway.
- All inputs are self-reported and subjective. No physiological ground truth or sensor corroboration in v1.
- Patterns surfaced are **correlational and descriptive**. The application does not establish causation and does not control for confounders.
- `[NEEDS DATA]` Sample size and observation window. State whatever they are.
- **Encryption:** see finding C9. Correct the claim before publishing.
- No formal security audit or penetration test has been performed.

### 9. Repository / demo / report

- **Live** `[V]`: https://mind-map-bice-nine.vercel.app/
- **Repository** `[V, unwired]`: `github.com/jonnyterrero/MindMap` — currently `"https://github.com/"` in `projects.json`. Fix (C5).
- **Report** `[NEEDS DATA]`: once §6 has numbers, publish as `docs/verification.md` in the repo and link it from the portfolio. That link is the highest-signal artifact on the entire page.

---

## 5. Project — Modular Knee Brace

**Slug:** `modular-knee-brace` · **Status:** Prototype · **Category:** biomedical-device

> **Framing decision:** present as **one project, two phases**. Phase 1 (Spring 2025) is the instrumented FSR prototype. Phase 2 (current) is the SolidWorks/Python digital redesign with a physical print in progress and the sensing layer being rebuilt. A documented Phase 1 → Phase 2 transition is a strength: it gives this project the only non-trivial Section 7 in the portfolio.

### 1. Problem / clinical or user need

`[V]` Knee instability and pain frequently stem from support that is either **too generic** (one-size sleeves that apply undifferentiated compression) or **too rigid** (post-operative braces that immobilise at the cost of usable range of motion and comfort).

`[D]` The design gap is a support system whose stiffness and load path can be **reconfigured per user and per recovery stage** without replacing the entire device — hence modularity as the core design premise rather than a feature.

`[NEEDS DATA]` Whether this is grounded in literature, clinician input, or personal/athletic experience. State which. Personal experience is a legitimate and common origin for device work — name it rather than implying clinical grounding.

### 2. Requirements — measurable acceptance criteria

`[NEEDS DATA]` Scaffold. Fill from CAD, simulation output, and print measurements — several of these are closeable without any sensor hardware.

| # | Requirement | Acceptance criterion | Closeable now? |
|---|---|---|---|
| R1 | Simulation fidelity | Modelled sagittal knee moment within ___ % of published normative gait curves over stance phase | **Yes — M6** |
| R2 | Load transfer | ___ % of applied load carried by the brace frame vs. the limb, per FSR array | No — blocked on sensors |
| R3 | Range of motion | Preserves ≥ ___° flexion / ___° extension relative to unbraced | **Yes — goniometer on print** |
| R4 | Dimensional accuracy | Printed part within ± ___ mm of CAD nominal, max deviation ___ mm | **Yes — M7** |
| R5 | Modularity | Stiffness element swap performed in ≤ ___ s without tools | **Yes — timed on print** |
| R6 | Mass | Assembled device ≤ ___ g | **Yes — scale** |
| R7 | Durability | Survives ___ flexion cycles with no visible failure at hinge/interface | Partially — needs a cycling rig |

**Four of seven close with a caliper, a goniometer, a scale, and a stopwatch.** That is the cheapest Section 6 data in the entire portfolio.

### 3. Architecture

**Phase 1 — instrumented prototype (Spring 2025)** `[V, hardware no longer extant]`

```
┌──────────────┐   ┌──────────────────┐   ┌──────────────┐
│  FSR array   │──▶│ Signal condition │──▶│ Arduino ADC  │
│ (brace–limb  │   │ (voltage divider │   │  10-bit      │
│  interface)  │   │  / amplifier)    │   │              │
└──────────────┘   └──────────────────┘   └──────┬───────┘
                                                  │ serial
                                          ┌───────▼────────┐
                                          │ Python pipeline│
                                          │ calibration →  │
                                          │ force (N) →    │
                                          │ gait-cycle viz │
                                          └────────────────┘
```

**Phase 2 — digital redesign (current)** `[V]`

```
┌─────────────────────────┐
│ SolidWorks              │  parametric modular assembly:
│ parametric assembly     │  frame · hinge · swappable
│                         │  stiffness elements · silicone
└───────────┬─────────────┘  limb interface
            │ geometry + joint parameters
┌───────────▼─────────────┐
│ Python simulation       │  sagittal-plane kinematics
│                         │  → moment / load-path model
└───────────┬─────────────┘
            │ validated geometry
┌───────────▼─────────────┐
│ Additive manufacture    │  rigid polymer frame
│ (plastic + silicone)    │  + compliant silicone interface
└───────────┬─────────────┘
            │ ⟵ sensing layer: REBUILD IN PROGRESS
┌───────────▼─────────────┐
│ [Phase 1 pipeline]      │  to be re-instrumented
└─────────────────────────┘
```

State the current boundary explicitly on the portfolio page: **the loop is open.** The device is fully modelled and being printed; the sensing layer is not yet re-established.

### 4. Design decisions

**D1 — Modular stiffness elements vs. a monolithic brace**
- *Chosen:* swappable stiffness members on a common frame.
- *Alternative:* a single moulded brace with fixed mechanical properties.
- *Tradeoff:* one device spans multiple recovery stages and users; lower total cost per user and a shorter iteration loop, since only one element is reprinted to test a stiffness change. Cost: every interface between modules is a mechanical joint, and **joints are where prototypes fail** — more parts, more tolerance stack-up, more failure modes than a monolithic design.

**D2 — Rigid polymer frame + compliant silicone interface (hybrid) vs. single-material**
- *Chosen:* hybrid.
- *Tradeoff:* the rigid frame carries load and constrains motion; the silicone layer distributes contact pressure and improves comfort and retention — directly addressing the "too rigid" half of the problem statement. Cost: bonding dissimilar materials is a durability risk, the interface is the most likely failure site, and it complicates cleaning and reuse.

**D3 — Simulate before printing**
- *Chosen:* Python sagittal-plane model gates the print.
- *Alternative:* iterate physically, print-measure-reprint.
- *Tradeoff:* simulation cost is hours; a print iteration is days plus material. Cost: the model's assumptions become load-bearing — a 2D sagittal rigid-body model omits frontal/transverse plane loading, soft-tissue compliance, and strap slippage, all of which are real. **The model is a filter, not a substitute for physical test.** State this.

**D4 — FSRs vs. load cells vs. strain gauges (Phase 1)**
- *Chosen:* FSRs.
- *Tradeoff:* cheap, thin, conformable, trivially interfaced to an Arduino analog pin — the only realistic choice for a low-cost wearable interface layer. Cost: FSRs exhibit significant **hysteresis, drift under sustained load, nonlinear response, and poor unit-to-unit repeatability**; they are appropriate for relative/qualitative pressure mapping and poor for absolute force metrology.
- `[NEEDS DATA]` Whether you observed these effects in Phase 1. **If you did, that is Section 7 gold** — it is the single most credible thing you can say about this project.

### 4.5 Scope & role

`[NEEDS DATA]` Solo or team? Course project or independent? If course-based, name the course and state precisely which subsystems you owned (CAD / firmware / analysis / fabrication).

### 5. Implementation

**Hardware**
- Phase 1 `[V]`: FSR array at the brace–limb interface, signal-conditioning circuitry, Arduino microcontroller. **Physical hardware no longer extant.**
- Phase 2 `[V]`: SolidWorks parametric assembly; physical prototype in additive manufacture — rigid polymer structural elements, silicone compliant interface. Sensing layer being recreated.

**Firmware**
- `[NEEDS DATA]` **Does the Phase 1 Arduino sketch survive in version control or on disk?** If yes, it is a Section 5 artifact and belongs in the repo. If no, note it in Section 7 as a design-archive failure.

**Software** `[V]`
- Python analysis pipeline: raw ADC → calibration transform → force units → gait-cycle visualisation.
- Python simulation of the Phase 2 geometry.
- You have confirmed the scripts and Python code survive. **These are your most valuable surviving artifact — get them into a repository before anything else in this project.**

**Algorithms**
- `[NEEDS DATA]` Calibration transform: linear fit, piecewise, or polynomial? Against what reference loads? Report the fit and its R².
- `[NEEDS DATA]` Gait-cycle segmentation method — heel-strike detection by threshold, by peak-finding, or manual?
- `[D]` The Phase 2 simulation is a sagittal-plane knee moment model. Your existing BME Visualizations catalogue already contains a sagittal-plane knee torque model — **if that is the same model or shares its derivation, link them.** Cross-referencing two public artifacts that share a governing equation is a strong portfolio signal.

### 6. Verification

`[NEEDS DATA]` — but this project has the **cheapest** path to real numbers in the portfolio.

**Immediately closeable, no sensors required:**
1. **M7 — Dimensional accuracy.** Calipers on printed parts vs. CAD nominal. Report mean deviation, max deviation, n parts measured. Closes R4.
2. **R3 — Range of motion.** Goniometer, braced vs. unbraced, flexion and extension. Closes R3.
3. **R5 — Modularity.** Time the stiffness-element swap, n = 10 trials, report median. Closes R5.
4. **R6 — Mass.** Scale. One number.
5. **M6 — Simulation validation.** Compare modelled sagittal knee moment across stance phase against published normative gait kinetics. Report percent deviation and where it diverges. Closes R1. **This is the highest-value item in the project** — it converts "I built a simulation" into "I built a simulation and checked it against the literature."

**Blocked on sensor rebuild:**
6. **R2 — Load transfer.** Requires the FSR array.

**Historical — retrieval task (M5):**
7. `[NEEDS DATA]` **Does the Phase 1 raw data survive?** The résumé claims calibration was *"validated against known loads"* and that the Python tooling *"quantif[ies] brace performance."* If the raw FSR readings, the known reference masses, and the resulting calibration curve exist in any form — CSV, notebook, plot, screenshot, lab notebook photo — **those are publishable Section 6 results and you already earned them.** If they do not survive, both claims must be softened to describe method rather than result, and the loss goes in Section 7.

**This is the blocking item for the entire knee brace write-up. Resolve it first.**

### 7. Failures / iterations

This is the strongest Section 7 available to you. Three entries, two already confirmed:

- **`[V]` Phase 1 hardware and sensing layer no longer exist; rebuild in progress.**
  Write it plainly. The engineering lesson is the point: *a prototype whose only record is the physical object is a prototype you will lose.* The Phase 2 response — parametric CAD, version-controlled simulation code, a documented design intent — is the correct structural fix, and stating it that way turns a loss into evidence of judgment.

- **`[D]` Phase 1 → Phase 2 rearchitecture.** Phase 1 was build-first, instrument-second. Phase 2 inverts this: model and validate before committing material. State the trigger — what specifically about Phase 1 made you decide to start from CAD and simulation rather than rebuilding the physical prototype directly?

- **`[NEEDS DATA]` FSR behaviour under real loading.** If Phase 1 surfaced hysteresis, drift, saturation, or poor repeatability, document it with whatever evidence survives. A student who can say *"my sensor choice had a known failure mode, here is how it manifested, here is what I would select instead"* is operating a level above one who reports only successes.

- **`[NEEDS DATA]` Print failures.** Warping, support-removal damage, silicone–polymer bond failure, hinge tolerance issues. Additive manufacture failure modes are concrete, specific, and interesting.

### 8. Limitations

`[V/D]` — publish verbatim:

- **Not a medical device.** No therapeutic, rehabilitative, or clinical claim is made. Not evaluated under any FDA pathway. Not intended for patient use.
- **No clinical or human-subject validation.** No IRB protocol, no subject testing.
- **FSR measurement scope (critical — see C4):** the sensing layer measures **brace–limb interface contact pressure over the sensor's active area**, not tibiofemoral joint reaction force. Internal joint loading is not directly measurable non-invasively; it is estimated through inverse dynamics or instrumented implants. Interface pressure is a **proxy for load transfer through the brace**, and must be described as such.
- **Simulation scope:** sagittal-plane rigid-body model. Does not model frontal- or transverse-plane loading, soft-tissue compliance, strap slippage, or material fatigue. No FEA of the printed structure has been performed.
- **Material biocompatibility untested.** The silicone and polymer used have not been evaluated under ISO 10993 for cytotoxicity, sensitisation, or irritation. This is a skin-contact device; state the limitation explicitly. (You already model ISO 10993 fibroblast recovery in BME Visualizations — the standard is in your vocabulary, so use it.)
- **Fit validated on n = 1 geometry**, if at all. `[NEEDS DATA]` confirm.
- **Durability uncharacterised.** No cycle testing performed.

### 9. Repository / demo / report

- **Live:** N/A (physical device).
- **Repository** `[NEEDS DATA]`: none exists. **Highest-priority action for this project** — create `modular-knee-brace` containing:
  ```
  /cad          SolidWorks source + STEP exports
  /sim          Python simulation
  /analysis     Phase 1 Python pipeline
  /firmware     Arduino sketch (if it survives)
  /data         raw + calibration data (if it survives)
  /docs         verification.md, design-decisions.md
  README.md
  ```
- **Visual** `[V]`: `/images/modular-knee-brace-cad.png` is already referenced in `projects.json` and renders in the detail-page sidebar. Add a print-in-progress photograph once available — a render plus a physical part is markedly stronger than a render alone.
- **Report** `[NEEDS DATA]`: `docs/verification.md` once §6 items close.

---

## 6. Project — GastroGuard

**Slug:** `gastroguard` · **Status:** Active Development · **Live** `[V]`: https://gastro-guard-bice.vercel.app/

> **This is the only project in the portfolio with real user data.** `[V]` 10 users, ~1 month. That single fact makes it the strongest entry you have and the one to lead with — provided the statistical claims built on top of it are stated at the correct strength. See Sections 6 and 8.

### 1. Problem / clinical or user need

`[V/D]` Functional and inflammatory GI conditions produce symptom flare-ups whose triggers are **multifactorial and individual-specific** — diet, stress, sleep, and timing interact differently per person. The clinical standard of care for identifying them is a paper food-and-symptom diary reviewed retrospectively, or a structured elimination protocol such as low-FODMAP.

Both have the same failure mode: they generate data faster than a human can analyse it, and they depend on recall. A patient keeping a two-week diary produces a few hundred unstructured observations across a dozen variables, then hands them to a clinician for a ten-minute visual scan. Nothing in that loop performs pattern detection.

`[D]` The gap is not data capture — it is **structured capture plus per-individual analysis**, closing the loop without requiring a clinical visit to interpret it.

`[NEEDS DATA]` State the origin: personal condition, literature, clinician input, or user interviews. If personal, say so. It is a legitimate and common origin for this class of product.

### 2. Requirements — measurable acceptance criteria

Partially closeable — this project has real usage data.

| # | Requirement | Acceptance criterion | Status |
|---|---|---|---|
| R1 | Symptom + meal logging | Entry completed in ≤ ___ s, median over logged sessions | `[NEEDS DATA]` — derivable from existing timestamps |
| R2 | Adherence | ≥ ___ % of test users log on ≥ ___ days of a 7-day window | `[NEEDS DATA]` — **computable from the existing 10-user dataset today** |
| R3 | Auth isolation | User A cannot read or mutate user B's rows via any path | testable now (M1) |
| R4 | Model performance | Beats the trivial baseline by ≥ ___ on ___ metric, on held-out data | `[NEEDS DATA]` — see model card below |
| R5 | Explainability | Every surfaced trigger traceable to the rule or coefficient that produced it | `[NEEDS DATA]` |
| R6 | Cohort | ≥ 10 users over ≥ 1 month | **`[V]` MET — 10 users, ~1 month** |

**R2 is free.** You already hold the data. Compute entries-per-user, active-days-per-user, and dropoff curve from the existing Supabase tables. That is a publishable Section 6 result requiring zero new collection, and it is the single highest value-per-hour item remaining in the entire portfolio.

### 3. Architecture

`[V]` Solid lines are built. Dashed is designed and not connected (C12).

```
┌────────────────────────────────────────────────────────┐
│  CLIENT — Next.js PWA (TypeScript)                     │
│  symptom log · meal log · stress/sleep entry           │
│  insight surface                                        │
└───────────────┬────────────────────────────────────────┘
                │ HTTPS
   ┌────────────▼─────────────────────────────────────┐
   │  SUPABASE                                         │
   │  ├─ Auth + RLS (per-user isolation)               │
   │  └─ Postgres: symptom / meal / context tables     │
   └────────────┬─────────────────────────────────────┘
                │
   ┌────────────▼─────────────────────────────────────┐
   │  ANALYSIS LAYER                                   │
   │  hybrid: deterministic rule set                   │
   │        + correlation / predictive model           │
   │  → ranked candidate triggers                      │
   └───────────────────────────────────────────────────┘

   ╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╮
   ┊  EXTERNAL HEALTH-PLATFORM API (HRV, sleep) ┊  NOT CONNECTED
   ┊  vendor-neutral ingestion interface        ┊  (C12)
   ╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯
```

Showing the unconnected path as dashed on the portfolio page is better than hiding it. It communicates the architecture *and* the honest current boundary in one diagram.

### 4. Design decisions

**D1 — Hybrid rules + statistical model vs. pure ML**
- *Chosen:* deterministic rule set combined with a correlation/predictive model.
- *Alternative:* end-to-end learned model over all logged variables.
- *Tradeoff:* **this is the correct decision and you should defend it explicitly.** At n = 10 users over one month, a purely learned model has nowhere near the sample size to generalise; it would fit noise and report it as insight. Rules give you non-zero output on day one of a new user (no cold-start gap), are auditable, and let every surfaced trigger be traced to the logic that produced it. Cost: rules encode your priors — they can only surface relationships you already thought to encode, so the model half exists to catch what the rules miss.
- This framing — *"the data does not support a learned model yet, so the rules carry the product while the model accumulates evidence"* — is a stronger interview answer than any accuracy figure.

**D2 — Server-first (Supabase/Next.js) vs. local-first native**
- *Chosen:* server-first PWA.
- *Tradeoff:* fast iteration, free cross-device sync, no app-store review, one codebase. Cost: GI symptom data is sensitive health data that now leaves the device, so the privacy burden moves onto RLS policy correctness and hosting posture; and it forecloses on-device inference.
- You have already scoped local-first quantised inference as the natural direction for this app specifically. That is a legitimate Section 9 "future work" item — say what would trigger the migration (e.g. a user privacy requirement, or a model small enough to run on-device), not just that it's planned.

**D3 — Vendor-neutral public-API ingestion vs. a proprietary wearable SDK**
- *Chosen:* generic interface against any health platform with a public API.
- *Tradeoff:* not locked to one vendor's hardware or SDK lifecycle; one integration surface serves many sources. Cost: **this is also why it doesn't run.** Public health-platform APIs generally do not expose raw HRV to a web client, and the richest sources (HealthKit, and equivalents) are native-only with no browser path — which is a direct, foreseeable consequence of D2.
- `[NEEDS DATA]` Confirm this is the actual blocker. If it is, D2 and D3 form a genuine coupled tradeoff, and naming that coupling is exactly the kind of reasoning Section 4 exists to display.

### 4.5 Scope & role

`[NEEDS DATA]` Solo? Confirm, and state how the 10 testers were recruited.

### 5. Implementation

- **Hardware:** none. Phase 3 of the hardware roadmap specifies a GastroGuard wearable; not built. Do not imply hardware exists.
- **Firmware:** N/A.
- **Software** `[V]`: Next.js PWA, TypeScript, Supabase (Auth + Postgres + RLS), deployed on Vercel. **Note:** the résumé's "FastAPI / PyTorch" description of this app is stale — see C1 and C2.
- **Ingestion interface** `[NEEDS DATA]`: coded-but-unconnected, or designed-but-unbuilt? Determines whether this belongs here or in Section 3. See C12.

**Algorithms — model card `[NEEDS DATA]`**

You have confirmed a hybrid correlation/predictive model with rules, and that an eval set exists. To publish anything about it, fill every row. Leave none blank; "not applicable" is a valid entry, a blank is not.

| Field | Value |
|---|---|
| Task framing | classification / regression / ranking — which? |
| Target variable | how is "flare-up" defined operationally? self-reported severity above a threshold? |
| Unit of observation | user-day? meal-event? |
| Input features | raw logged fields → engineered features (lags, rolling windows, time-of-day) |
| Lag structure | does a feature at day *t* predict symptoms at *t*, *t+1*, or a window? |
| Model class | logistic regression / tree ensemble / correlation scan with thresholds |
| Rule set | how many rules, and what does each encode? |
| Rule/model arbitration | when rules and model disagree, what wins? |
| Baseline | the trivial predictor you must beat (majority class, or user's own base rate) |
| Primary metric | and why that one for this problem |
| Eval split | **split by user, or pooled rows?** ← see Section 6 |
| Multiple-comparison handling | how many candidate trigger relationships are tested per user? |

### 6. Verification

**`[V]` Confirmed:** tested with **10 users over approximately 1 month**. An eval set exists.

That is a real cohort and a real window. It is also small enough that the statistical framing determines whether any performance number you report survives scrutiny. Three issues, in order of severity:

**(a) Evaluation split — blocking.**
If the eval set is a random row-level split of pooled observations, rows from the same user appear in both train and eval. The model can then learn *"this is user 7"* and recover user 7's symptom base rate — inflating performance without learning anything transferable. With 10 users this effect is large.

The defensible splits:
- **Leave-one-subject-out** — train on 9, evaluate on the held-out 10th, rotate. Tests generalisation to a new person. This is the split a reviewer will ask for.
- **Forward-chaining temporal split per user** — train on each user's first *k* days, evaluate on their later days. Tests generalisation forward in time for a known person, which is arguably the actual product use case.

These answer different questions. Report whichever you ran, name it, and state which question it answers. If you ran a pooled random split, **rerun as leave-one-subject-out before publishing any metric.**

**(b) Repeated measures.**
Ten users × ~30 days is ~300 observations, but they are **not 300 independent samples** — observations within a user are correlated. Treating them as independent inflates significance. The correct handling is a per-user model, or a mixed-effects model with user as a random effect. If you did neither, that is a stated limitation, not a fatal flaw — but it must be stated.

**(c) Multiple comparisons.**
If the correlation component scans every logged variable against flare-up occurrence, you are running many tests. At α = 0.05 across 30 candidate features, roughly 1–2 spurious "triggers" appear per user **by construction**. State the correction (Benjamini–Hochberg is the sensible choice here — you want to control false discovery rate, not family-wise error, since a missed real trigger costs more than a false lead) or state that results are exploratory and uncorrected.

**Publishable now, before any of the above:**
- **R2 adherence** from existing data: entries per user, active days per user, dropoff curve. Zero new collection. Do this first.
- **M1 RLS isolation test** — same harness as MindMap.

**Reporting format once (a) is resolved:**

> *"Evaluated by leave-one-subject-out cross-validation across 10 users (~N user-days). Primary metric ___ = ___ vs. a per-user base-rate baseline of ___. Candidate trigger associations corrected for false discovery rate at q = 0.05."*

### 7. Failures / iterations

- **`[V]` Wearable ingestion designed but never connected.** The most honest and most instructive entry available. State the cause — if the PWA/native boundary is what blocked it, that is a direct consequence of D2, and identifying your own coupled tradeoff after the fact is a strong signal.
- **`[D]` Deliberate scoping away from a learned-only model.** If you started toward end-to-end ML and pulled back once you saw the sample size, that is a decision reversal and belongs here. It reads far better than presenting the hybrid as if it were obvious from the start.
- `[NEEDS DATA]` What broke during the 10-user month? Dropoff, confusing UI, logging friction, users misunderstanding a field. **Any adherence problem you observed and responded to is Section 7 material** — and you have a whole month of real user behaviour to draw on, which no other project here does.
- `[NEEDS DATA]` Rules that produced obviously wrong triggers and were removed or retuned.

### 8. Limitations

`[V/D]` — publish verbatim:

- **Not a medical device.** No diagnostic, therapeutic, or dietary-treatment claim is made. Not evaluated under any FDA SaMD pathway. **If the product ever states or implies that a food causes a user's condition, that crosses into a clinical claim — keep all output framed as candidate associations for the user to discuss with a clinician.**
- **Cohort: 10 users over approximately 1 month.** Findings are exploratory and not generalisable beyond this sample. No external validation cohort.
- **All inputs self-reported.** Meal logging, symptom severity, and stress are subject to recall bias, adherence bias, and inconsistent interpretation between users. No physiological ground truth — the wearable ingestion path is not connected.
- **Repeated-measures structure.** Observations within a user are not independent; any analysis treating them as independent overstates confidence. `[NEEDS DATA]` state your handling.
- **Associations are correlational.** The system does not establish causation and cannot control for unmeasured confounders. Reverse causation is specifically plausible in this domain — a flare-up changes what a person eats, not only the reverse — and the lag structure of the model does not resolve it.
- **Multiple comparisons.** `[NEEDS DATA]` state the correction, or label results uncorrected and exploratory.
- **No clinical or professional review** of the rule set. `[NEEDS DATA]` unless a clinician reviewed it, in which case say so — it would be the strongest credibility line in the portfolio.
- No formal security audit. Sensitive health data is stored server-side; isolation rests on RLS policy correctness, which is untested (M1).

### 9. Repository / demo / report

- **Live** `[V]`: https://gastro-guard-bice.vercel.app/
- **Repository** `[V, unwired]`: `github.com/jonnyterrero/gastro-guard` — currently `"https://github.com/"` in `projects.json` (C5).
- **Report** `[NEEDS DATA]`: `docs/model-card.md` (the table in Section 5) plus `docs/verification.md` (adherence + evaluation results). **For this project specifically, the model card is the artifact.** A health app claiming predictive trigger detection, with a published model card stating cohort size, split strategy, baseline, and limitations, is a categorically different portfolio object from one that claims "analytics linking diet, stress, and sleep to symptom flare-ups."
- **Future work** `[D]`: on-device local-first inference with small quantised models — state the trigger condition for that migration, not just the intent.

## 7. Project — SkinTrack+

**Slug:** `skintrack` · **Status:** `[V]` **Prototype** — backend incomplete at last test; `projects.json` says "Active Development" (C15) · **Live URL:** https://skintrack.vercel.app/ — **verify or remove (C15)**

> **Read C13, C14, and C15 first.** No computer vision exists; the analysis layer is a correlation engine over logged metadata. The live link may not function end-to-end. C15(a) is a same-day action item and precedes everything else here.

### 1. Problem / clinical or user need

`[V/D]` Chronic dermatological conditions — eczema, psoriasis, acne, contact dermatitis — flare episodically and respond to treatment over weeks. Clinical assessment happens at a single appointment, capturing one point in that cycle and frequently an unrepresentative one: patients commonly present on a good day, or six weeks after the flare that prompted the booking.

The patient-side record is worse. Recall across weeks is unreliable, and the default artifact — photos scattered through a camera roll — is unstructured, uncontrolled for lighting and distance, and carries no symptom, medication, or environmental context. Neither patient nor clinician can answer *"is this better or worse than six weeks ago, and what changed in between?"*

`[D]` The gap is a **structured longitudinal record**: images captured under controlled conditions, time-indexed against medication changes, symptom severity, and environmental exposure, so a consultation starts from a timeline instead of recall.

`[NEEDS DATA]` State the origin — personal condition, clinician input, or user interviews.

### 2. Requirements — measurable acceptance criteria

`[NEEDS DATA]` Scaffold. **R0 is new and blocking; nothing below it can be measured until it passes.**

| # | Requirement | Acceptance criterion | Status |
|---|---|---|---|
| R0 | **Persistence** | Image + context survive upload, app close, and reload on a second device | **`[V]` FAILING — local-only at last test (C15)** |
| R1 | Capture friction | Photo + context entry completed in ≤ ___ s | blocked on R0 |
| R2 | Capture consistency | Repeat captures of the same site align within ___ % scale and ___ ΔE colour under user conditions | unmeasured — defining requirement |
| R3 | Image isolation | No user can retrieve another user's image via any storage path, signed or direct | blocked on R0 |
| R4 | Retrieval | Full history for one body site loads in ≤ ___ ms p95 at ___ images | blocked on R0 |
| R5 | Heatmap correctness | Calendar heatmap cell matches underlying records for 100% of sampled dates | testable now |
| R6 | Adherence | ___ % of users capture ≥ ___ times per month | **unrecoverable for the first test period (C15b)** |

**R0 is the whole project right now.** A longitudinal tracker that does not persist has no product. Close R0, then R2.

**R2 is the honest centre of the product.** If images taken three weeks apart differ in lighting, distance, and angle, any perceived change may be a capture artifact rather than a change in the skin. Measuring and constraining that is the real engineering problem and what makes the archive worth keeping.

### 3. Architecture

`[V]` Solid lines are built and verified. Dashed is specified but not confirmed working.

```
┌──────────────────────────────────────────────────────┐
│  CLIENT — Next.js PWA (TypeScript)                   │
│  in-app camera capture  ·  file upload               │
│  symptom + medication log  ·  calendar heatmap       │
│  ⚠ browser-local persistence at last test            │
└────────────┬─────────────────────────┬───────────────┘
             ┊ image blob              ┊ structured record
             ┊   ⚠ NOT CONFIRMED       ┊   ⚠ NOT CONFIRMED
   ╭┄┄┄┄┄┄┄┄┄▼┄┄┄┄┄┄┄┄┄╮   ╭┄┄┄┄┄┄┄┄┄┄▼┄┄┄┄┄┄┄┄┄┄┄┄┄┄╮
   ┊ Supabase Storage  ┊   ┊ Supabase Postgres + RLS  ┊
   ┊ bucket visibility ┊◀┄┄┊ image metadata           ┊
   ┊ UNCONFIRMED       ┊   ┊ symptoms · medications   ┊
   ╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯   ┊ environmental context    ┊
                           ╰┄┄┄┄┄┄┄┄┄┄┄┬┄┄┄┄┄┄┄┄┄┄┄┄┄╯
                                       │ metadata only
                           ┌───────────▼──────────────┐
                           │ CORRELATION / PREDICTIVE │
                           │ ENGINE                   │
                           │ rules over logged fields │
                           │ — images are NOT input   │
                           └──────────────────────────┘
```

**Draw it this way and say why.** An architecture diagram that marks its own unverified edges is more credible than one that implies a working system. The dashed boundary *is* the current state of the project.

Note the engine takes **no image input**. Label that explicitly on the diagram — it is the single fact that C13 and C14 both turn on.

### 4. Design decisions

**D1 — In-app camera capture vs. file picker only**
- *Chosen:* both, with an in-app camera path.
- *Tradeoff:* the in-app camera is what makes longitudinal comparison possible at all — the only place you can constrain capture conditions (guide overlay, fixed orientation, consistent framing, a ghost of the previous image for alignment). A file picker accepts arbitrary photos at arbitrary distances under arbitrary light, producing an archive that looks longitudinal and isn't. Cost: `getUserMedia` permission flows, iOS Safari behaviour differences, orientation and EXIF handling, and no access to raw sensor data or locked exposure from a browser.
- `[NEEDS DATA]` Does the capture UI impose *any* constraint today — overlay, guide, previous-image ghost? If yes, it is your strongest implementation detail and belongs in Section 5. If no, it is the highest-value next feature and belongs in Section 9.

**D2 — Correlation engine over logged metadata, not a learned image model**
- *Chosen:* rules and correlation over symptom, medication, and environmental records. ML explicitly evaluated and rejected for this project.
- *Alternative:* a trained image model for lesion segmentation or classification.
- *Tradeoff:* **this is the best decision in the project and it is currently invisible because `projects.json` claims the opposite.** A learned image model here would need clinical ground truth you cannot obtain, labelled data you do not have, and would inherit the documented under-representation of darker skin tones in dermatological datasets. It would also be evaluated against images whose capture conditions are uncontrolled (R2), so measured "change" could be lighting. The correlation engine needs none of that, is auditable, and every surfaced association traces to the record that produced it. Cost: it cannot see anything the user did not log, so the images contribute nothing to the analysis — they are documentation for the human, not input to the system.
- **Say the cost out loud.** "The images are for the user and their clinician, not for the model" is a clean, honest architectural statement.

**D3 — Image plus structured metadata vs. image only**
- *Chosen:* image alongside symptom severity, medication, and environmental context, all time-indexed.
- *Tradeoff:* this separates the product from a photo album, and captures the labels a future analysis layer would need without re-collection. Cost: entry friction rises with every field, and friction drives the adherence the whole longitudinal premise depends on — R1 and R6 are in direct tension. Say so.

**D4 — Client-local persistence in the first shared build**
- *Chosen:* browser-local storage; backend not complete at time of first external link.
- *Tradeoff:* shipping something testable without waiting on backend work. Cost, realised: **no data survived** (C15b). No cohort, no adherence measurement, no image corpus, and testers who invested effort got nothing durable back.
- **This is a decision to own rather than omit.** The generalisable version — *"I shipped a client-only build to get feedback early and lost the data it generated; now I treat persistence as a release gate, not a follow-up"* — is a real engineering lesson and reads as judgment. Silence on it does not.

### 4.5 Scope & role

`[NEEDS DATA]` Solo? How many people received the first link, and did any feedback survive even though the data didn't?

### 5. Implementation

- **Hardware:** none. Phase 4 of the hardware roadmap specifies a SkinTrack+ imager; not built. Do not imply it exists.
- **Firmware:** N/A.
- **Software** `[V]`: Next.js PWA with in-app camera capture and photo upload; symptom and medication logging; time-indexed records; calendar heatmap. Supabase Auth/Postgres/Storage **specified but not confirmed wired** (C15).
- **Image processing:** **none.** No segmentation, classification, change detection, or measurement. Images are stored and displayed for the user. State this plainly — a stated "images are documentation, not model input, by design" reads as judgment; silence next to a photo-based dermatology app reads as concealment.
- **Analysis layer** `[NEEDS DATA]`: correlation/predictive engine over logged metadata. Fill the model card below. It is far smaller than an ML model card because the component is far simpler — which is the point.

| Field | Value |
|---|---|
| Input fields | which logged variables feed the engine |
| Rules | how many, and what each encodes |
| Correlation method | which statistic, over what window |
| Lag structure | does a logged factor at day *t* relate to symptoms at *t*, *t+1*, or a window? |
| Output form | surfaced association, ranked list, or recommendation text |
| Multiple comparisons | how many candidate associations tested per user; correction applied |
| Minimum data | how many days before the engine outputs anything |

**The minimum-data row matters most.** An engine that reports correlations after four days of logging is reporting noise. State the threshold, or add one.

**If you ever want a defensible image capability**, the task is **not** classification or diagnosis. It is **change detection against the user's own baseline**: register two images of the same site, segment the affected region, report change in area and mean colour over time. It has a synthetic ground truth you can construct, never requires a diagnostic label, never issues guidance, and sidesteps the skin-tone representation problem that sinks classifier projects. R2 is its hard prerequisite.

### 6. Verification

`[NEEDS DATA]` — nothing is measured, and most of it is blocked on R0. Ordered:

1. **R0 — End-to-end persistence.** Upload an image and a context record, close the app, reload on a second device, confirm both are present. **Until this passes, the live link should not be public** (C15a). This is the whole verification programme right now.
2. **M13 — Storage isolation**, once R0 passes. With user A's session attempt to fetch B's image by direct object path, guessed path, expired signed URL, and unauthenticated. Expect 0 successes on all four. Also confirm the bucket is not public-read. Once images are actually server-side, this becomes the most important test in this document — the asset is photographs of a person's body.
3. **M1 — RLS row isolation**, same harness as MindMap and GastroGuard.
4. **R2 — Capture consistency.** Capture the same site *n* times under normal conditions across days. Measure variance in apparent scale (pixels per mm against a reference object) and in mean colour (ΔE). **Whatever the number is, it is publishable** — and if it is large, that is a finding, not a failure. It quantifies why uncalibrated consumer capture is hard and is the empirical justification for D1 and for a guided-capture overlay.
5. **R5 — Heatmap correctness.** Sample *n* dates, assert rendered cell matches underlying records. Runnable now against local data.

### 7. Failures / iterations

This project has the second-strongest Section 7 available, behind the knee brace — and for the same reason: something concrete went wrong and you can say what.

- **`[V]` Shipped a client-local build; the data did not survive.** Persistence was browser-local, the backend was incomplete, and uploads from the first shared link most likely never reached a server. The lesson is a release gate: *a tracking product without verified persistence is not testable, because the thing under test is the record.*
- **`[D]` Image blobs in browser storage.** `localStorage` holds ~5–10 MB and stores strings, so images must be base64-encoded — inflating them ~33% — and a handful of phone photos exhausts the quota. `QuotaExceededError` mid-session is the predictable result. `[NEEDS DATA]` Did you hit this? If so it is a precise, recognisable engineering failure and belongs here verbatim. IndexedDB is the correct client-side store for blobs if you keep an offline path.
- **`[V]` Evaluated ML for lesion analysis and rejected it.** Document the reasoning (D2). A documented decision *not* to build something, for stated reasons, is stronger than a half-built feature.
- `[NEEDS DATA]` **Camera implementation across browsers** — `getUserMedia` on iOS Safari, EXIF orientation, HEIC handling, upload size and compression. Concrete, specific, and immediately recognisable to anyone who has built mobile web capture.

### 8. Limitations

`[V/D]` — publish verbatim:

- **Not a diagnostic tool.** SkinTrack+ performs **no analysis, classification, or assessment of any image.** It does not detect, screen for, or assess melanoma or any other skin cancer, nor diagnose any dermatological condition. Not a medical device; not evaluated under any FDA pathway.
- **Images are not model input.** Stored and displayed for the user's own reference and for discussion with a clinician. The analysis layer operates only on logged symptom, medication, and environmental data. **State this in-product** — a user photographing a lesion in an app that then offers guidance will otherwise assume the photo was considered (C14).
- **Guidance is unvalidated.** Derived from correlations in a single user's self-reported records. No clinical grounding, no professional review, no outcome data. `[NEEDS DATA]` unless a clinician reviewed the rules — if one did, say so; it would be the strongest credibility line in the portfolio.
- **In-product disclaimer required at the point of output.** No diagnosis, no cancer screening, and any new, changing, asymmetric, or bleeding lesion warrants dermatologist evaluation. Ship before the app is shared with anyone again.
- **Persistence unverified.** `[V]` At last test the backend was incomplete and records were browser-local. Data entered may not survive device loss, browser clearing, or reinstall (C15).
- **Uncalibrated capture.** Uncontrolled lighting, white balance, distance, and angle. Apparent change in colour, size, or texture between images may be capture artifact rather than change in the skin. `[NEEDS DATA]` quantify via R2.
- **No clinical ground truth.** No image reviewed, confirmed, or labelled by a dermatologist. No biopsy or histological correlation.
- **Privacy.** The app is designed to store photographs of users' skin, which may incidentally capture identifying features — face, tattoos, jewellery, surroundings. `[NEEDS DATA]` state bucket visibility, signed-URL expiry, encryption at rest, retention policy, and whether a user can delete all their images. Untested until R0 passes and M13 runs.
- **Cohort: none.** `[V]` No usage data survives from the first test period (C15b). Write *"no retained usage data"* rather than implying a cohort.
- **Skin-tone representation (forward-looking).** If an image analysis layer is ever added: dermatological image datasets are documented as under-representing darker skin tones, and models trained on them degrade accordingly — on populations where melanoma is already diagnosed later and at worse stage. This is part of why ML was rejected here (D2). Stating it before building anything demonstrates you know the failure mode exists.
- No formal security audit or penetration test.

### 9. Repository / demo / report

- **Live** `[V, unverified]`: https://skintrack.vercel.app/ — **confirm end-to-end or remove from `projects.json` today** (C15a).
- **Repository** `[V, unwired]`: `github.com/jonnyterrero/SkinTrack-` — currently `"https://github.com/"` in `projects.json` (C5).
- **Report** `[NEEDS DATA]`: `docs/verification.md`, led by the R0 persistence result, then M13 storage isolation, then R2 capture consistency. For this project the privacy verification *is* the headline result — a health app publishing proof its image store is isolated makes a claim almost no student project can.
- **Future work** `[D]`: guided capture overlay (R2), then change detection against the user's own baseline as the first defensible image capability. Explicitly not classification.

---

## 8. Project — BME Visualizations

**Slug:** `bme-visualizations` · **Status:** `[V]` Active · **Live** `[V]`: https://jonnyterrero.github.io/BME-Visualizations/ · **Repo** `[V]`: https://github.com/jonnyterrero/BME-Visualizations

> **This is the only project in the portfolio where Section 6 is cheap, rigorous, and entirely in your control.** Every model here has a closed-form solution, a published reference value, or a known limiting behaviour to check against. No users, no IRB, no hardware, no cohort. **Highest verification-value-per-hour in the whole portfolio** — and it is currently the only project whose Section 9 is already complete.

### 1. Problem / clinical or user need

`[V/D]` The user here is a student, not a patient. Course models are transmitted as static artifacts — a slide with a fixed plot, a worked example at one parameter set, a notebook that runs once and is never opened again. A student sees *one instance* of a governing equation's behaviour and has no way to ask what happens when a term changes.

That is a real pedagogical failure, not a convenience gap. Understanding the Fåhræus–Lindqvist effect means knowing that apparent viscosity has a *minimum* at a particular vessel diameter; a single plotted curve does not teach that, sweeping the diameter does. The same holds for CMRR, for Johnson noise floors, and for moment-arm sensitivity in a knee equilibrium.

`[D]` The gap is **inspectable, re-runnable physics**: the governing equation, its parameters, and a live plot on the same page, so a parameter change produces a visible consequence immediately.

### 2. Requirements — measurable acceptance criteria

Unusually, most of these are closeable this week and deterministically.

| # | Requirement | Acceptance criterion | Closeable now? |
|---|---|---|---|
| R1 | **Numerical correctness** | Every model reproduces its closed-form solution within ___ % relative error across the full slider range | **Yes — the core task** |
| R2 | **Physical plausibility** | Every model reproduces its known published reference value or limiting behaviour | **Yes** |
| R3 | Dimensional consistency | Every governing equation dimensionally checked; units stated on every axis and slider | **Yes** |
| R4 | Parity | Browser dashboard and Python implementation agree within ___ % where both exist | **Yes — signal models** |
| R5 | Zero-install | Every dashboard opens from `file://` and from GitHub Pages with no build step | **Yes** |
| R6 | Robustness | No slider combination produces NaN, Inf, a blank plot, or a silently wrong curve | **Yes** |

**R1 and R2 are the project.** Everything else is packaging.

### 3. Architecture

`[V]`

```
┌──────────────────────────────────────────────────────────┐
│  GitHub Pages — catalog homepage (launch surface)        │
└───┬──────┬──────┬──────┬──────┬──────────────────────────┘
    │      │      │      │      │   one folder per course
 ┌──▼──┐┌──▼──┐┌──▼──┐┌──▼──┐┌──▼──┐
 │ Bio ││ Bio ││ Med ││ BME ││ Bio │  each: self-contained
 │ perf││fluid││inst ││ sig ││mech │  HTML + Chart.js
 │ mat ││mech ││arch ││model││     │  + README + notes
 └─────┘└─────┘└─────┘└─────┘└─────┘
                          │
                    ┌─────▼─────────────┐
                    │ Python / NumPy /   │  figure regeneration
                    │ Matplotlib         │  (signal models)
                    └────────────────────┘
```

**The dual-implementation path on the signal models is the architecturally interesting part** — browser dashboard for interaction, Python for reproducible figure generation. It is also a free correctness check (R4): two independent implementations of the same equations that must agree. Say that out loud; most people treat dual implementation as duplication rather than as verification.

### 4. Design decisions

**D1 — Self-contained HTML per model vs. a single application**
- *Chosen:* one standalone dashboard per model, no build step, opens from `file://` or Pages.
- *Alternative:* a unified React/Next app with shared components and routing.
- *Tradeoff:* zero install and zero toolchain means a model still opens in four years, on any machine, with no `npm install` that has since broken. For coursework meant to outlive the semester, that durability *is* the feature. Cost: duplicated styling and plotting boilerplate across folders, no shared component library, and no cross-model linking. Given every other project in this portfolio is Next.js, **be ready to explain why this one deliberately is not** — the answer is durability over DRY, and it is correct here.

**D2 — Chart.js vs. D3 or Plotly**
- *Chosen:* Chart.js.
- *Tradeoff:* minimal API, fast to wire a slider to a redraw, small dependency surface. Cost: limited control over scientific plotting conventions — log axes, error bars, annotated asymptotes, dual y-axes are awkward or absent. `[NEEDS DATA]` Did this constrain any model? A Fåhræus–Lindqvist plot or a noise-floor plot generally wants log axes; if you fought the library there, that is Section 7 content.

**D3 — Dual implementation (browser + Python) for signal models only**
- *Chosen:* Python alongside the dashboard for the signal-model set.
- *Tradeoff:* Python gives publication-quality static figures and a reproducible path from equation to plot; the browser gives interaction. Together they cross-check each other (R4). Cost: two implementations to keep in sync, and drift between them is silent unless R4 is actually tested.
- `[NEEDS DATA]` Why only this set? If the reason is that these figures were needed for a report, say so — it is a legitimate reason and explains the asymmetry.

**D4 — Parameter sweeping over worked examples**
- *Chosen:* sliders plus live equation display.
- *Tradeoff:* teaches the shape of a relationship rather than one point on it. Cost: a slider range that extends into physically meaningless territory teaches the wrong thing. `[NEEDS DATA]` Are ranges bounded to physiologically or physically sensible values? If not, that is the highest-value fix in the project and it ties directly to R6.

### 4.5 Scope & role

`[NEEDS DATA]` Solo build, presumably — confirm. Note whether any model was built for a specific course deliverable versus independently, and whether any instructor or peer has used it. **If a professor has pointed a class at this, that is a strong, verifiable line** and belongs in Section 9.

### 5. Implementation

**Software** `[V]`: HTML, JavaScript, Chart.js, GitHub Pages; Python with NumPy and Matplotlib for the signal-model figures. One folder per course containing the dashboard, a README, derivations, and original notes.

**The five models** `[V]`:

| Course | Model content |
|---|---|
| Bioperformance of Materials | 2×2×2 experimental flow; attachment, morphology, and degradation models; ISO 10993 framing for the graphene-oxide fibroblast-recovery senior project |
| Biofluid Mechanics | Newtonian plasma vs. shear-thinning whole blood including Fåhræus–Lindqvist; standing arterial hydrostatics; Jurin's law capillary rise |
| Medical Instrument Architecture | IEC 60601 signal chain from measurand to display; isolation as a patient-safety requirement; cascaded LTI transfer function |
| Biomedical Signal Models | Skin-electrode loading; thermistor vs. strain-gauge linearity; instrumentation-amplifier CMRR; Johnson noise. Browser dashboard + Python/Matplotlib |
| Biomechanics | Sagittal-plane knee simulator — external load torque vs. patellar-tendon force required for static equilibrium, with moment-arm sliders |

**Cross-link worth making** `[D]`: the sagittal-plane knee model and the Modular Knee Brace project share a governing equation. Linking two public artifacts that derive from the same physics is a strong portfolio signal and costs one line in each.

### 6. Verification

`[NEEDS DATA]`, **and this is the cheapest real Section 6 in the portfolio.** Every model below has an independent check. Build one test file per model; report max relative error.

**R1 — closed-form checks (deterministic, no judgment required):**

| Model | Check against |
|---|---|
| Jurin's law | h = 2γcos θ / (ρgr) evaluated by hand at three parameter sets; confirm h → ∞ as r → 0 and the θ > 90° sign flip |
| Arterial hydrostatics | ΔP = ρgh; confirm the standing head-to-foot gradient magnitude and sign about the hydrostatic indifference point |
| Johnson noise | v_n = √(4k_BTRB); the standard sanity check is ≈ 4 nV/√Hz for 1 kΩ at 300 K — if your dashboard disagrees, you have a units bug |
| CMRR | CMRR_dB = 20 log₁₀(A_d / A_cm); verify against hand calculation and against a real in-amp datasheet figure |
| Strain gauge | ΔR/R = GF · ε — linear by construction; confirm the slope equals the gauge factor you set |
| Cascaded LTI chain | Overall transfer function equals the product of stage transfer functions; verify at three frequencies |
| Knee equilibrium | ΣM = 0 about the joint centre; confirm the moment balance closes numerically at every slider position |

**R2 — published reference checks (these are what make it credible, not just correct):**

- **Fåhræus–Lindqvist:** apparent viscosity should show a *minimum* near ~5–7 µm tube diameter. If your model reproduces that minimum at the right scale, say so with the number — it demonstrates the model captures the phenomenon, not just an equation.
- **Thermistor:** exponential β-model or Steinhart–Hart response; confirm the curvature and that it is *non*-linear where the strain gauge is linear. That contrast is the pedagogical point of pairing them.
- **Knee:** patellar-tendon force reaching several multiples of body weight at deep flexion is the expected regime. Confirm your output lands there.

**R4 — dual-implementation parity:** run the browser dashboard and the Python implementation at identical parameters; report max divergence. Any nonzero result is a bug in one of them.

**The failure mode this protects against is specific and worth naming in the write-up.** A parameter-driven dashboard with a wrong constant or a units error produces a *smooth, plausible-looking curve*. Nothing looks broken. Nobody catches it — not the author, not a reader, not a grader. **Verification against closed-form solutions is the only defence, and it is the entire reason this section matters more here than anywhere else in the portfolio.**

**Reportable result format:**

> *"All five model sets validated against closed-form solutions at N parameter points; max relative error ___ %. Fåhræus–Lindqvist viscosity minimum reproduced at ___ µm against a published ~5–7 µm. Browser and Python signal-model implementations agree to within ___ %."*

That paragraph is worth more than every status string in the portfolio combined.

### 7. Failures / iterations

- `[NEEDS DATA]` **Any model that gave a plausible but wrong curve until checked.** This is the single most valuable thing you could document here — it is the exact failure mode described above, it demonstrates you know it exists, and it justifies the whole verification programme.
- `[NEEDS DATA]` Unit errors, especially mmHg ↔ Pa, µm ↔ m, and dB ↔ linear ratio. These are the classic sources in exactly this model set.
- `[NEEDS DATA]` Chart.js limitations — log axes, annotations, dual y-axes — and what you did about them (D2).
- `[NEEDS DATA]` Slider ranges that produced physically meaningless output before being bounded (D4, R6).
- `[NEEDS DATA]` Browser/Python divergence found via R4, and its cause.

### 8. Limitations

`[V/D]` — publish verbatim:

- **Teaching and exploration tools, not validated simulation software.** Not for clinical, diagnostic, or design use. No regulatory standing.
- **Simplified governing assumptions throughout.** Rigid-body static equilibrium in the knee model — no co-contraction, no muscle redundancy, no dynamic loading. Lumped LTI stages in the instrument chain — no nonlinearity, no saturation. Idealised fluid assumptions outside the ranges where the correlations hold.
- **ISO 10993 and IEC 60601 content is illustrative framing, not compliance guidance.** The models illustrate concepts these standards address; they do not implement, test against, or demonstrate conformance to any clause. **Be explicit — naming a standard in a biomedical context creates an impression of compliance that must be actively disclaimed.**
- **Validity bounded by parameter range.** Empirical correlations hold over the regimes they were derived in; sliders may permit values outside them. `[NEEDS DATA]` state the bounds per model, or bound the sliders.
- **Single author, no peer or instructor review.** `[NEEDS DATA]` unless one has reviewed it — if so, say so.
- **Correctness `[NEEDS DATA]`** until Section 6 runs. Until then, no accuracy claim should appear on the portfolio page.

### 9. Repository / demo / report

- **Live** `[V]`: https://jonnyterrero.github.io/BME-Visualizations/ — working.
- **Repository** `[V]`: https://github.com/jonnyterrero/BME-Visualizations — wired correctly in `projects.json`. **This is the only project in the portfolio with a complete Section 9. Use it as the template for the other four.**
- **Report** `[NEEDS DATA]`: `docs/validation.md` in the repo — one table per model, closed-form or reference value beside computed value, relative error, pass/fail. Link it from the catalog homepage. A student coursework repository that ships a validation table is doing something almost none do.
- **Cross-link** `[D]`: the sagittal-plane knee model ↔ the Modular Knee Brace project.

---

## 9. Project — Robotic Pick-and-Place Arm

**Slug:** `robotic-pick-place-arm` · **Status:** `[V]` Prototype/Complete · **Period:** `[V]` Spring 2026 · **Course:** `[V]` Intro to Mechatronic Design (team project) · **Repo** `[V]`: `intro to mechatronic design` — **unwired in `projects.json` (C17)**

> **This project is underclaimed, not overclaimed** — the only one in the portfolio where that is true. It performs inverse kinematics, colour-conditioned sorting, and human-to-robot handover, and the portfolio mentions none of the three (C17). It is also the most measurable project you own: colour classification has a confusion matrix, IK has positional accuracy, and pick-and-place has a success rate. All of it is one afternoon of trials away.

### 1. Problem / clinical or user need

`[V]` The task: autonomously read a colour signal, pick the corresponding object, and place it in the matching target — plus accept an object handed over by a person and place it down or into a cup.

`[D]` Three distinct engineering problems sit underneath that, and only the first is what "pick-and-place" usually means:

1. **Motion** — reach an arbitrary Cartesian target with a multi-axis arm, which requires solving the inverse kinematics rather than replaying recorded poses.
2. **Perception-conditioned decision** — the destination is not fixed in advance. It is *determined at runtime* by a sensed colour, so a misclassification produces a confidently wrong placement rather than a visible failure.
3. **Interaction and failure handling** — a human-handover mode means the object arrives at an unpredictable time, position, and orientation, and the controller must fail gracefully rather than jam, stall, or drop.

`[V]` The system met its objective: it recognised LED colour, picked the ball, and placed it in the correct cup; and it recognised handed items, took them, and placed them.

### 2. Requirements — measurable acceptance criteria

`[V]` R0 passed — the system does what it was designed to do. Everything below quantifies *how well*, and every row is closeable with a ruler, a stopwatch, and an afternoon.

| # | Requirement | Acceptance criterion | Closeable now? |
|---|---|---|---|
| R1 | **Colour classification accuracy** | ___ /___ correct per colour; full confusion matrix across the colour set | **Yes — the headline metric** |
| R2 | **Sort success rate** | ≥ ___ % end-to-end correct placements over ___ consecutive cycles | **Yes** |
| R3 | **IK positional accuracy** | Commanded Cartesian target reached within ± ___ mm, measured across ___ workspace points | **Yes — validates the IK** |
| R4 | **Pose repeatability** | Spread ≤ ± ___ mm over ___ returns to one pose, fixed approach direction | **Yes — ISO 9283-style** |
| R5 | **Handover success rate** | ___ /___ successful accepts from a human hand | **Yes** |
| R6 | Error-state coverage | ___ /___ FSM failure transitions exercised and correctly exited | **Yes** |
| R7 | Cycle time | Median ≤ ___ s over ___ cycles | **Yes** |
| R8 | Workspace | Reachable volume characterised; unreachable targets rejected, not attempted | **Yes** |

**R1 first.** Colour classification is the only genuine *classification* problem in your entire portfolio, and classification problems have a standard, unambiguous reporting format. A confusion matrix across your colour set is a result no other project here can produce.

**R3 and R4 measure different things** and the distinction is worth stating explicitly in the write-up: **accuracy** is how close the end effector gets to the commanded target (this validates your IK solution), **repeatability** is how tightly it clusters on return (this is a property of the hardware). An arm can be highly repeatable and inaccurate — that combination specifically indicates an IK or link-length calibration error, not a mechanical one.

### 3. Architecture

`[V]` The architecture is the state machine plus the IK solver. Show both.

```
┌──────────────┐  ┌─────────────┐  ┌──────────────┐
│ Colour sensor│  │ Ultrasonic  │  │ Human hand   │
│ (LED / object│  │ (presence,  │  │ (handover    │
│  classify)   │  │  range)     │  │  mode)       │
└──────┬───────┘  └──────┬──────┘  └──────┬───────┘
       └────────┬────────┴────────────────┘
        ┌───────▼────────────────────────┐
        │  ARDUINO UNO                   │
        │  ┌──────────────────────────┐  │
        │  │ FSM — sequencing, error  │  │
        │  │ handling, mode select    │  │
        │  └────────────┬─────────────┘  │
        │  ┌────────────▼─────────────┐  │
        │  │ INVERSE KINEMATICS       │  │
        │  │ (x,y,z) → joint angles   │  │
        │  │ + reachability check     │  │
        │  └────────────┬─────────────┘  │
        └───────────────┼────────────────┘
                 ┌──────▼──────┐
                 │  SERVOS     │  open-loop position (C16)
                 │  multi-axis │  no joint feedback
                 └─────────────┘

MODE A — autonomous sort:
 IDLE → SENSE_COLOUR → SELECT_TARGET_CUP → IK_SOLVE →
 APPROACH → GRASP → TRANSPORT → RELEASE → IDLE
                │         │          │
                └─── ERROR / RECOVER ┘

MODE B — human handover:
 IDLE → DETECT_OBJECT_IN_HAND → APPROACH → GRASP →
 (colour sense?) → PLACE_DOWN | PLACE_IN_CUP → IDLE
```

`[NEEDS DATA]` Replace with your actual states and transition conditions. **The real state diagram is the single most valuable figure you could add to the portfolio** — concrete, unambiguous, and almost never published by student projects. It is presumably already drawn in the course deliverable.

`[NEEDS DATA]` Is mode selection automatic (the FSM infers handover from sensor pattern) or manually switched? Automatic is a materially stronger claim.

### 4. Design decisions

**D1 — Finite state machine vs. a linear scripted sequence**
- *Chosen:* FSM governing sequencing, sensor polling, mode selection, and error handling.
- *Tradeoff:* every failure condition becomes an explicit named state with a defined exit, so "object missed" is a transition rather than an undefined continuation. It is also what makes two operating modes tractable — a scripted sequence would need duplicating for handover. Cost: more upfront structure, and state explosion if every edge case gets its own state instead of folding into shared recovery.
- The transferable claim: same instinct as the rules-plus-correlation engine in GastroGuard — **explicit, auditable state over implicit behaviour.** Consistency across an embedded project and a web app is a portfolio-level argument worth making.

**D2 — Inverse kinematics vs. taught joint-space poses**
- *Chosen:* `[V]` inverse kinematics — Cartesian targets solved to joint angles.
- *Alternative:* record joint angles for each cup and replay them.
- *Tradeoff:* **this is the strongest technical decision in the project and it is entirely absent from the portfolio.** Taught poses would have satisfied the demo — the cups are at fixed locations — so IK was not the path of least resistance. It buys a generalisable arm: any reachable coordinate, targets relocatable without re-teaching, and it is what makes handover feasible at all, since a hand does not present the object at a pre-recorded pose. Cost: link lengths must be measured accurately or every solution is biased; solution-branch selection must be handled; singularities and unreachable targets must be caught before commanding a servo.
- `[NEEDS DATA]` **Closed-form geometric solution or numerical/iterative?** Closed-form is the sane choice on a 16 MHz AVR and is what a 3–4 DOF planar-wrist arm admits. State which, and state the DOF.
- `[NEEDS DATA]` How is the solution branch chosen — elbow-up vs elbow-down? What happens on an unreachable target? Those two answers demonstrate whether the IK was understood or copied, and an interviewer who knows robotics will ask exactly them.

**D3 — Colour sensing for runtime target selection**
- *Chosen:* `[V]` colour classification determines the destination cup at runtime.
- *Tradeoff:* the arm responds to its environment instead of executing a fixed script — the difference between automation and a sequence. Cost: **a misclassification is a silent failure.** The arm executes a confident, smooth, completely wrong placement, and nothing in the motion looks broken. That failure mode is invisible without R1, which is precisely why the confusion matrix matters.
- `[NEEDS DATA]` Which sensor (TCS3200/TCS34725 class, or photodiode-plus-filter)? How many colours in the set? Was classification thresholded on raw channel ratios or on a transformed colour space? Reading an **emissive** LED and reading a **reflective** object are different problems — an LED's output is the signal, a ball's colour depends on the light falling on it. `[NEEDS DATA]` Were both handled, and differently?

**D4 — Open-loop servo positioning**
- *Chosen:* commanded joint angles, no position feedback (C16).
- *Tradeoff:* far simpler — no encoder wiring, no counting on an AVR already running IK. Cost: the arm cannot detect a missed, stalled, or obstructed movement, and IK accuracy (R3) becomes fully dependent on servo linearity and link-length calibration with nothing to correct residual error. **This is exactly why R3 must be measured rather than assumed.**

**D5 — Ultrasonic ranging alongside colour sensing**
- *Tradeoff:* cheap, digital, indifferent to object colour — which is the right complement to a colour sensor, since the two fail on different things. Cost: roughly 15° beam cone, so it reports the nearest object anywhere in that cone with no lateral localisation, is blind below ~2 cm (inside gripper range), drifts with temperature via the speed of sound, and returns nothing useful off small, soft, or angled surfaces.
- `[NEEDS DATA]` In handover mode, what actually detects the object in the hand — ultrasonic range change, colour, or both? Hand detection is the harder sensing problem here and deserves its own paragraph.

### 4.5 Scope & role

`[V]` **Two-person team, Intro to Mechatronic Design.**

| Subsystem | Owner |
|---|---|
| **All programming** — FSM, inverse kinematics, colour classification, error handling | **Jonny (sole)** |
| Mechanical construction of the arm | Partner |
| Wiring | Joint |
| Schematics | 50/50 |
| Project brief and direction | Professor |

**This strengthens the project considerably, and it belongs on the page.** Sole ownership of the firmware means the IK solver, the state machine, and the colour classifier are entirely yours — and those three *are* the engineering content. Mechanical assembly is the part a reader would discount anyway.

Write the scope line explicitly: *"Two-person team; I owned all firmware — inverse kinematics, FSM control, and colour classification. Partner handled mechanical construction; wiring and schematics shared."* Stating a bounded scope you fully owned is more credible than an unstated one that implies everything.

`[V]` **The professor specified the behaviour, not the implementation.** The brief stated what the robot had to do; the inverse-kinematics approach, the FSM architecture, and the colour-classification method were Jonny's decisions. No reference implementation or starter code was provided. The project was framed as an integration test of prior lab, circuits, and programming coursework.

**This is the version to write, and it is materially stronger than "course project":**

> *"Two-person team; the brief specified required robot behaviour only. I owned all firmware and chose the approach: closed-form inverse kinematics over taught poses, a finite state machine over scripted sequencing, and runtime colour classification for target selection. Partner handled mechanical construction; wiring and schematics shared."*

Specifying *what* and leaving *how* open is the standard structure of a capstone-style integration assignment, and the design decisions in Section 4 are therefore genuinely yours to defend. **Say that the brief was behavioural** — it pre-empts the "was this assigned?" question and answers it in your favour.

### 5. Implementation

- **Hardware** `[V]`: Arduino Uno, multi-axis servo arm, ultrasonic sensing, colour sensor, gripper. Schematics in the repo. `[NEEDS DATA]` DOF count, servo class, sensor part numbers, power arrangement.
- **Firmware** `[V]`: FSM control logic in Arduino C/C++ with an inverse-kinematics solver, mode handling, and error states. In the `intro to mechatronic design` repo.
- **Kinematics** `[V]`: inverse kinematics mapping Cartesian targets to joint angles. `[NEEDS DATA]` closed-form or iterative; DOF; branch selection; reachability handling.
- **Perception** `[V]`: colour classification selecting the destination cup; ultrasonic presence and ranging. `[NEEDS DATA]` sensor part, colour set size, decision rule, calibration procedure.
- **Modes** `[V]`: (A) autonomous colour-sort; (B) human handover — accept an object from a hand, place it down or in a cup.
- **Logging** `[NEEDS DATA]`: any serial telemetry? If yes, your R1–R7 data-collection path already exists.

### 6. Verification

`[NEEDS DATA]` — one afternoon produces all of it. Ordered by value.

1. **R1 — Colour confusion matrix.** 20 trials per colour. Rows = true colour, columns = classified colour. **Run it twice: once under the lighting you built in, once under different lighting.** The delta between those two matrices is the most interesting result in this project, because it quantifies exactly the fragility that D3 introduces. Report both.
2. **R2 — End-to-end sort success.** 50 consecutive cycles. Report successes and **the failure breakdown by mode** — colour misclassification, missed grasp, transport drop, placement miss. The breakdown outweighs the headline percentage: it shows you characterised the system rather than counted wins.
3. **R3 — IK positional accuracy.** Command 10 known Cartesian targets spanning the workspace; measure actual end-effector position against each. Report mean and max error in mm. **This is the number that validates your IK**, and it is the one an interviewer will want when you claim inverse kinematics.
4. **R4 — Pose repeatability.** 20 returns to one pose from a fixed approach direction; report spread. Compare against R3: high repeatability with poor accuracy points at link-length or IK calibration, not mechanics.
5. **R5 — Handover success.** 20 attempts, varying hand position and object orientation. Report successes and what makes it fail.
6. **R6 — Error-state coverage.** Induce each failure deliberately — remove the object mid-cycle, misalign it, place it out of range, block the gripper, present an ambiguous colour. Confirm the FSM reaches and exits the correct state. Report *k/k transitions exercised.*
7. **R8 — Workspace and reachability.** Confirm unreachable targets are rejected before a servo is commanded rather than producing a clipped or undefined pose.

**Reportable format:**

> *"Colour classification: ___ /100 correct across 5 colours under build lighting (confusion matrix in `docs/`); ___ /100 under altered lighting. End-to-end sort: ___ /50 cycles correct; failures were ___ misclassification, ___ missed grasp, ___ placement. IK positional accuracy ± ___ mm across 10 workspace targets; pose repeatability ± ___ mm over 20 returns. Handover ___ /20. All ___ FSM error transitions exercised."*

That paragraph is the most quantitatively defensible thing available anywhere in this portfolio, and it is an afternoon's work on a system that already functions.

### 7. Failures / iterations

`[NEEDS DATA]` — prompts, all near-universal for this exact build:

- **Colour sensing under changing ambient light.** The dominant failure mode of TCS3200-class sensors. `[NEEDS DATA]` Did you shroud the sensor, add a reference LED, calibrate per session, or threshold on channel *ratios* rather than absolute values? Ratio-based thresholding is the standard robust answer and worth stating if that is what you did.
- **IK link-length calibration.** Measured link lengths that disagree with the physical arm bias every solution. `[NEEDS DATA]` Did you tune link parameters against measured end-effector positions? That is R3 run as a calibration loop rather than a test, and it is a real engineering story.
- **Servo brownout.** Multiple servos off the Uno's 5V regulator exceed what it supplies; the board resets mid-motion, intermittently, and it reads as a firmware bug. Fix is a separate servo supply with common ground. The most recognisable debugging story in Arduino robotics.
- **`delay()` blocking the FSM.** Blocking delays prevent sensor polling during motion, so a mid-move fault is undetectable until the move finishes. Non-blocking `millis()` timing is the fix. `[NEEDS DATA]` Did you start blocking and refactor? That is a genuine architectural iteration.
- **Ultrasonic self-detection** — echoes off the arm's own structure during motion. Gating sensing to specific FSM states is the design response.
- `[NEEDS DATA]` Handover-specific failures: hand too close, object presented at an unexpected angle, premature grasp.

### 8. Limitations

`[V/D]` — publish verbatim:

- **Open-loop joint actuation.** No position feedback (C16). The controller commands angles and cannot verify they were reached; a stalled, obstructed, or slipped joint is undetectable. IK accuracy depends on link-length calibration and servo linearity with no residual-error correction.
- **Colour classification is environment-dependent.** Performance is conditioned on the lighting present during calibration. Ambient light change, shadowing, or a different surface finish can shift classification. **A misclassification produces a confident, smooth, incorrect placement — a silent failure with no visible malfunction.** `[NEEDS DATA]` quantify via R1 under two lighting conditions.
- **Emissive vs reflective sensing differ.** Reading an LED's own output and reading light reflected off a ball are different measurement problems with different failure modes.
- **Ultrasonic sensing constraints.** ~15° beam cone, no lateral localisation, blind below ~2 cm, temperature-dependent, unreliable on small, soft, or angled surfaces.
- **No grasp confirmation.** No force, tactile, or current sensing; a successful grasp cannot be distinguished from a missed one except indirectly.
- **Structured environment.** Fixed cup locations, known object geometry, controlled surroundings. `[NEEDS DATA]` state tested object set and placement tolerance.
- **Handover is not safety-engineered.** The arm operates near a human hand with no force limiting, no compliant actuation, no proximity-triggered stop, and no emergency stop. **It functioned in a supervised course setting and should be described that way.** Any human-interaction claim needs this stated explicitly — and stating it is the correct instinct for anyone heading toward medical or industrial hardware.
- **No dynamic or payload characterisation.** No maximum payload, no speed-accuracy curve, no settling-time measurement.
- **Performance `[NEEDS DATA]`** until Section 6 runs. Functional success is confirmed; quantitative reliability is not yet measured.

### 9. Repository / demo / report

- **Repository** `[V]`: `intro to mechatronic design` — full project and schematics. **Wire it into `projects.json` (C17).** `[NEEDS DATA]` exact URL and whether it is public.
- **README** `[NEEDS DATA]`: should lead with what the arm actually does — colour-conditioned sort, IK, handover — since that is currently invisible everywhere (C17). Include the state diagram, IK derivation, pin map, BOM, and schematics already in the repo.
- **Demo** `[NEEDS DATA]`: **the highest-value missing artifact in the whole portfolio.** A 20-second video of a colour sort plus a handover proves in one view what three résumé bullets fail to convey. For a physical build with no live URL, video is the only way a reader verifies anything.
- **Report** `[NEEDS DATA]`: `docs/verification.md` with the R1–R8 tables, confusion matrices included.
- **Featured flag:** currently `false`. Set it `true` (C17).

---

## 10. Project — HeartWire OS

**Slug:** `heartwire-os` · **Status:** `[V]` Active Development · **Live** `[V]`: https://heart-wire-os.vercel.app/ · **Repo** `[V]`: none wired (C5) · **Featured:** `false`

> **Read C18 first.** The resource catalog has systematically corrupted records — wrong track assignments, parser-artifact titles, unreliable course IDs — and it is publicly deployed. Fixing it is the project's clearest path to a real Section 6, because the fix produces a before/after number.

### 1. Problem / clinical or user need

`[V/D]` Self-directed technical study across many domains generates a large, unstructured pile of material — course links, textbooks, playlists, papers, project ideas — scattered across notes, bookmarks, and documents. The pile grows faster than it is used. Without structure, the failure is not access; it is **sequencing and retrieval**: no way to tell what a topic depends on, what has been covered, or which of six saved playlists is the one worth starting.

`[D]` The stated design premise is long-horizon learning over short-term productivity — a distinction worth defending explicitly, since it rules out the standard task-manager framing. A to-do app optimises throughput on discrete items. A study system has to model **prerequisite structure, coverage over time, and resource quality**, none of which are tasks.

`[NEEDS DATA]` Who is it for? `targetUsers` lists personal, students, engineers. **A single-user system built for yourself and a multi-user product are different projects with different requirements.** If it is personal infrastructure, say so — that is honest and still a legitimate engineering project. The current framing hedges.

### 2. Requirements — measurable acceptance criteria

`[NEEDS DATA]` Scaffold. **R1 is closeable this week and is the project's best available result.**

| # | Requirement | Acceptance criterion | Closeable now? |
|---|---|---|---|
| R1 | **Catalog data integrity** | 100% of resource records have a human-readable title, a `trackId` in the allowed set, a resolvable or explicitly null `courseId`, and a well-formed URL | **Yes — see C18** |
| R2 | **Link validity** | ≥ ___ % of catalog URLs return 2xx; dead links flagged, not silently served | **Yes — automatable** |
| R3 | Track coverage | Every track has ≥ ___ resources; no track is empty or a dumping ground | **Yes** |
| R4 | Retrieval | Finding a resource for a given course takes ≤ ___ actions from the home surface | **Yes** |
| R5 | Canonical source | Exactly one implementation is authoritative; no divergent copies | **Yes — see Section 3** |
| R6 | Actual use | Used on ≥ ___ days over ___ weeks by its author | `[NEEDS DATA]` — the real test |

**R6 is the honest measure of a personal system.** A study OS that its own author stopped opening has failed regardless of how well it is built. If you use it, that number is the most persuasive thing you can report. If you do not, that belongs in Section 7.

### 3. Architecture

`[V]` **There appear to be two implementations, and it is unclear which is canonical.**

```
  ┌──────────────────────────────────────────────┐
  │ (A) PLATFORM — Next.js + TypeScript + Prisma │
  │     prisma/seed.ts: hand-curated categories, │
  │     courses, typed resources                 │
  │     (VIDEO | COURSE | BOOK | ARTICLE)        │
  │     → clean, structured, schema-enforced     │
  └──────────────────────────────────────────────┘
                      ?  relationship unclear
  ┌──────────────────────────────────────────────┐
  │ (B) PORTFOLIO EXPORT — static index.html     │
  │     with embedded JSON: tracks, courses,     │
  │     resources                                │
  │     → scraped, untyped, corrupted (C18)      │
  └──────────────────────────────────────────────┘
                      │
              ┌───────▼────────┐
              │ Vercel         │  heart-wire-os.vercel.app
              └────────────────┘
```

**The contrast between (A) and (B) is the architectural finding.** The Prisma seed is hand-curated with a typed resource enum and sensible category/course structure — it is good work. The static export is scraped, untyped, and carries the C18 defects. **Same project, two data layers, opposite quality.**

`[NEEDS DATA]`, and this is R5:
- Which one is deployed at the live URL?
- Is (B) a legacy export superseded by (A), a prototype that preceded it, or are both live?
- Does the Prisma schema enforce `trackId` as an enum or a foreign key? **If it does, (A) is structurally incapable of the C18 defects, and the fix is simply to retire (B).**

`projects.json` lists `stack: ["Next.js", "TypeScript"]` — **omitting Prisma and the database entirely**, which is the most substantial part of the system.

### 4. Design decisions

**D1 — Relational schema over a flat notes system**
- *Chosen:* categories → courses → typed resources, in Postgres via Prisma.
- *Alternative:* markdown in Obsidian, which you already run as a Second Brain.
- *Tradeoff:* **worth stating, because you maintain both.** A relational schema enforces that every resource attaches to a course and carries a declared type, which makes coverage and gaps queryable — something a folder of markdown cannot answer. Cost: rigidity. A resource that does not fit the taxonomy has nowhere to go, and schema changes require migrations where markdown requires nothing.
- `[NEEDS DATA]` **What does HeartWire OS do that your Obsidian vault does not?** An interviewer who learns you run both will ask, and "structured queries over coverage" is a good answer only if the system actually answers them.

**D2 — Typed resource enum (VIDEO | COURSE | BOOK | ARTICLE)**
- *Tradeoff:* a closed set makes filtering reliable and prevents free-text drift. Cost: the scraped data uses `"Web"` and `"link"` as types — **values outside the enum** — which is further evidence that (B) bypassed the schema entirely (C18).

**D3 — Scraped ingestion of curated notes**
- *Chosen:* bulk-import existing study notes rather than hand-enter resources.
- *Tradeoff:* hundreds of resources imported in minutes instead of hours; the catalog reaches useful density immediately. Cost, realised: **no validation at the boundary, so the corruption in C18 entered silently and is now publicly served.**
- **This is the decision to own in Section 7.** The generalisable lesson — *bulk ingestion without schema validation at the boundary trades one afternoon of data entry for a corrupted dataset you cannot trust* — is a real engineering lesson, and it is the same class of failure as shipping SkinTrack+ without verifying persistence. **Two projects, same root cause: no validation gate before the thing goes live.** Naming that pattern across projects is a stronger self-assessment than fixing either one silently.

### 4.5 Scope & role

`[NEEDS DATA]` Solo, presumably. Confirm, and state whether anyone else has used it.

### 5. Implementation

- **Software** `[V]`: Next.js, TypeScript, Prisma, deployed on Vercel. `[NEEDS DATA]` database — Postgres via Supabase, or something else? Auth — is there any, or is it single-user?
- **Data model** `[V]`: categories with colour and description → courses with title and code → resources with title, URL, and type enum. `[NEEDS DATA]` full schema including track/course relations and whether `trackId` is enum-constrained.
- **Content** `[V]`: curriculum spanning BME core, chemistry, mathematics, CS/full-stack, AI/ML, computational science, neuro, embedded, engineering mechanics, physics, plus a language reference section — and a levelled project-idea catalog (Level 1/2/3 per subject).
- **`[D]` The levelled project-idea catalog is the most distinctive content in the system and is invisible in the portfolio.** A structured progression — *Level 1: Ohm's law calculator → Level 2: simulate RC/RL circuits in Python → Level 3: build a SPICE-like mini-simulator* — across every subject is a genuine pedagogical artifact, not a link dump. It is also the part that most clearly supports the "long-term learning, not short-term productivity" claim. Surface it.

### 6. Verification

`[NEEDS DATA]`, and **C18 hands you the best available result.**

1. **R1 — Catalog integrity audit.** Script it: for every record assert a non-empty non-artifact title, `trackId` in the allowed set, `courseId` resolvable or explicitly null, well-formed URL, `type` in the enum. Report the failure rate by class. **The before-number is the result**, and it will not be small — the observable defects include hundreds of rows titled `"Resource"`, type values outside the enum, and titles containing raw markdown table syntax.
2. **Re-ingest with validation at the boundary**, then re-run. *"38% → 0%"* is a Section 6 line and a Section 7 story in one.
3. **R2 — Link checker.** HEAD request every URL; report 2xx rate and flag dead links in the UI rather than serving them silently. For a catalog whose entire value is pointing at external material, **link rot is the dominant long-run failure mode** and nothing currently detects it.
4. **R3 — Track coverage.** Count resources per track. Given C18(a), the current distribution is meaningless — after the fix it becomes a real map of where the curriculum is thin.
5. **R5 — Resolve the two implementations.** Determine which is canonical, retire the other.
6. **R6 — Usage.** Days opened over the last N weeks.

### 7. Failures / iterations

- **`[V]` Scraped ingestion with no validation gate (C18).** The strongest entry available. Concrete, evidenced, and the lesson generalises.
- **`[D]` The cross-project pattern.** Same root cause as SkinTrack+ shipping without verified persistence: **no validation gate before deploy.** Two independent projects, one failure mode. Naming it is a better self-assessment than either individual fix, and it justifies the release-gate discipline you are now applying.
- `[NEEDS DATA]` **Two implementations (Section 3).** If (B) is a superseded prototype, that is a normal and documentable iteration — say what drove the move to Prisma. If both are live, that is unresolved debt.
- `[NEEDS DATA]` Has the taxonomy been restructured? A study system's category scheme rarely survives first contact with real content.
- `[NEEDS DATA]` Abandoned features.

### 8. Limitations

`[V/D]`:

- **Personal system, single user.** `[NEEDS DATA]` No multi-user support, no auth, no sharing — confirm. Not a product; infrastructure built for its author.
- **Catalog integrity is currently unverified and known to be partially corrupted** (C18). Until R1 runs and the data is re-ingested, **no claim about catalog size or coverage should appear on the portfolio page** — a count of records that includes hundreds of malformed rows is not a meaningful number.
- **Curated links, not curated content.** The system points at external material it does not control, evaluate, or version. Quality varies; availability is not guaranteed.
- **Link rot is unmitigated.** No checking, no archival, no dead-link flagging (R2).
- **No learning measurement.** The system tracks resources, not comprehension. It cannot tell whether anything was learned — only what was catalogued. **State this;** a "study OS" invites the assumption that it measures progress.
- **Efficacy unmeasured.** No evidence the structure improves study outcomes over a flat notes system. `[NEEDS DATA]` — R6 usage is the closest available proxy.
- **Naming ambiguity** (C19).

### 9. Repository / demo / report

- **Live** `[V]`: https://heart-wire-os.vercel.app/ — **verify it works end-to-end before featuring it**, and check which data layer it serves (R5). The SkinTrack+ lesson applies: a live link a reader clicks is a claim you are making.
- **Repository** `[V]`: `repoUrl: ""` — unwired (C5). Wire it.
- **`stack`:** add Prisma and the database. Listing only Next.js and TypeScript omits the system's substance.
- **Report** `[NEEDS DATA]`: `docs/data-integrity.md` — the R1 audit, before and after. **This single document would make HeartWire OS the second-most credible project in the portfolio**, because it demonstrates finding and fixing your own systematic defect, which is rarer and more persuasive than shipping something clean the first time.
- **Featured flag:** `false`. Leave it false until C18 is fixed. Featuring a publicly deployed catalog with known corrupted records is a worse outcome than leaving it unfeatured.

---

## 11. Project — Agent Suite (personal tooling)

**Slug:** `heartwire-agent-suite` · **Status:** `[V]` Active · **Repo/Live:** `[V]` none wired · **Tier:** `[V]` **tooling, not a product (C20)**

> **`[V]` This is the set of agents Jonny uses in his own work.** It is not a shipped system, has no users, and should not be presented as a product. That framing is not a downgrade — it is what makes the write-up honest and what determines which claims are available. Personal tooling is judged on *whether it changes how you work*, not on user counts.

### 1. Problem / user need

`[D]` A general-purpose assistant defaults to general-purpose behaviour: hedged answers, missing domain conventions, no standing constraints. Across the domains Jonny actually works in — embedded and hardware, backend and full-stack, biomedical coursework, finance and tax, legal review, trading, content — the failure is not capability but **consistency**. The same question asked twice gets differently-shaped answers, domain guardrails have to be restated every session, and output format has to be re-specified each time.

`[D]` The fix is to make role, activation condition, persona, capability boundary, and **refusal condition** explicit and version-controlled, so each domain gets the same treatment every time without re-prompting.

**`[NEEDS DATA]` — the one question that determines whether this is worth writing up at all:** has it actually changed how you work? If you reach for these daily, that is the finding. If most were written once and rarely fire, say that — an honest "6 of 18 get regular use" is a better line than an implied 18.

### 2. Requirements — measurable acceptance criteria

`[NEEDS DATA]`. Personal tooling has weaker but real criteria.

| # | Requirement | Acceptance criterion | Closeable? |
|---|---|---|---|
| R1 | **Actual use** | ___ /18 agents invoked in the last 30 days; top ___ account for ___ % of invocations | **Yes — the real metric** |
| R2 | **Trigger precision** | Correct agent activates without manual naming in ___ % of trials | Yes, with effort |
| R3 | **Guardrail enforcement** | Agents with refusal conditions refuse when the condition is unmet, ___ /___ adversarial trials | **Yes — highest value** |
| R4 | Output conformance | Output matches the declared format in ___ % of invocations | Yes |
| R5 | Non-overlap | No two agents claim the same trigger surface | Yes — static check |
| R6 | Maintenance | Definitions under version control with change history | **Yes — likely already true** |

**R3 is the one worth running.** See Section 6.

### 3. Architecture

`[V]`

```
┌──────────────────────────────────────────────────┐
│  Markdown-defined agent specs (SKILL.md)         │
│  each declaring:                                  │
│    · role / domain boundary                       │
│    · activation trigger                           │
│    · persona and output conventions               │
│    · capability list                              │
│    · REFUSAL CONDITIONS  ← the design feature     │
└──────────────────┬───────────────────────────────┘
                   │ loaded as Claude Code skills
        ┌──────────▼──────────┐
        │  Claude Code        │  trigger matching
        │  runtime            │  → agent activation
        └──────────┬──────────┘
                   │
        ┌──────────▼──────────┐
        │  MCP servers /      │  `[NEEDS DATA]` which
        │  external tools     │  agents actually use tools
        └─────────────────────┘
```

`[NEEDS DATA]` **Stack accuracy check.** `projects.json` lists *Claude Agent SDK*, *Claude Code Skills*, *MCP*, and *markdown-defined personas*. If every agent is a `SKILL.md` with no SDK code written and no MCP server authored, then **"Claude Agent SDK" and "MCP" overstate the implementation** — using a runtime is not the same as building against its SDK. Same error class as C13. Confirm which of the four is literally true and trim the rest.

### 4. Design decisions

**D1 — Markdown specs over code**
- *Tradeoff:* an agent is a text file — diffable, version-controlled, editable in seconds, no build step. Cost: no type checking, no tests, no way to assert an agent behaves as written. **A markdown spec is a statement of intent, not an enforced contract** — which is exactly why R3 matters.

**D2 — Explicit refusal conditions**
- `[V]` Example: the Trading Agent refuses to evaluate a setup without an invalidation level.
- **This is the most interesting thing in the project and it is buried in a bullet list.** It is a designed guardrail that prevents the tool from producing output in a state where the output would be harmful — refusing to analyse a trade with no defined exit is a risk-management control encoded into the tool rather than relied on from the user.
- **Lead the write-up with this.** "18 agents" is a file count. "Agents with encoded refusal conditions that block unsafe output" is an engineering claim, and it is the same instinct as the FSM's explicit error states and GastroGuard's rules-over-model choice. `[NEEDS DATA]` How many of the 18 declare refusal conditions? That number is worth more than 18.

**D3 — Professional-liability disclaimers in the domain agents**
- `[V]` The finance, tax, legal, trading, and CPA agents carry explicit scope limits — not financial advice, not a licensed attorney, analysis only, prepares work for licensed professionals.
- **This is already correct and you should say so.** Given C14 and C20(b), demonstrating that you scope-limit tooling in regulated domains *by default* is a credibility asset, not boilerplate. Make it a stated design principle rather than fine print.

**D4 — Eighteen narrow agents vs. a few broad ones**
- *Tradeoff:* narrow scope means each spec can carry domain-specific conventions and constraints that would conflict if merged. Cost: **trigger collision and maintenance load.** Several agents visibly overlap — `cpa-cfo-agent` and `cpa-cfo`; `investment-portfolio-agent` and `portfolio-manager`; `senior-swe-agent`, `backend-dev-agent`, `architect-agent`, and `code-auditor-agent` all cover adjacent software ground. `[NEEDS DATA]` Are the duplicate-looking pairs intentional variants or unpruned drafts? **Unpruned drafts in a personal toolkit are fine — but then the count is 18 files, not 18 working agents, and the write-up should not imply otherwise** (R5).

### 4.5 Scope & role

`[V]` Solo. Personal tooling. No users, not distributed, not a product (C20).

### 5. Implementation

- `[V]` 18 domain-specialised agent definitions as Claude Code skills, each declaring role, activation trigger, persona, and capability list.
- `[V]` Domains: software engineering (senior SWE, backend, architecture, code audit), hardware (electrical/hardware, mechanical/CS), biomedical and math tutoring, finance (CPA/CFO, tax audit), investing and trading, legal, business consulting, research analysis, content.
- `[NEEDS DATA]` Any MCP server authored, or only consumed? Any SDK code, or specs only?
- `[NEEDS DATA]` Are specs in a repo? R6 is probably already satisfied — wire the `repoUrl`.

### 6. Verification

`[NEEDS DATA]`. **Be honest about the difficulty: evaluating whether an agent produces better output than no agent is genuinely hard, and saying so is more credible than inventing a metric.** Three things are measurable without solving that problem:

1. **R3 — Guardrail enforcement.** The one to run. For every agent with a refusal condition, construct N inputs that should trigger refusal and N that should not, then record the refusal rate on each. *"Trading Agent refused 10/10 setups submitted without an invalidation level, and 0/10 valid setups."* **That is a real, adversarial, falsifiable result about a safety property** — the same class of test as the RLS isolation harness (M1), applied to prompt-level guardrails. Almost nobody tests their own prompt specs this way.
2. **R1 — Usage.** Count invocations per agent over 30 days. Report the distribution honestly, including the long tail that never fires. The distribution *is* the finding.
3. **R5 — Trigger collision.** Static check: enumerate triggers, find overlaps, resolve or merge the duplicate pairs (D4).

**What not to claim:** any productivity number without a measurement behind it. "Saved me N hours" is exactly the kind of figure that collapses under one follow-up question.

### 7. Failures / iterations

- `[NEEDS DATA]` **Agents written and never used.** If 12 of 18 rarely fire, that is the most useful thing in this section — it says something real about building tooling speculatively versus in response to a felt need.
- `[NEEDS DATA]` **Duplicate pairs** (D4). Intentional or unpruned?
- `[NEEDS DATA]` Agents that triggered when they should not have, or failed to trigger when they should.
- `[NEEDS DATA]` Specs rewritten after producing bad output — what the failure was and what constraint you added.

### 8. Limitations

`[V/D]`:

- **Personal tooling, not a product.** No users, no distribution, no support. Built for one workflow (C20).
- **Specs are intent, not enforcement.** Markdown definitions state how an agent should behave; nothing guarantees it does. Unverified until R3 runs.
- **No output-quality evaluation.** No measurement that any agent produces better output than the same model unprompted. `[NEEDS DATA]` — and if none exists, say so plainly.
- **Scope limits in regulated domains are declared, not enforced.** The finance, tax, legal, and trading agents state that they do not give professional advice. **That is the correct design and it is a stated constraint, not a technical guarantee.** Keep the disclaimers; do not upgrade the claim.
- **Inherits the underlying model's limitations** — knowledge cutoff, hallucination, no independent verification of factual output.
- **Count is not capability.** 18 is a number of definition files. `[NEEDS DATA]` how many are in regular use (R1).

### 9. Repository / demo / report

- **Repository** `[NEEDS DATA]`: are the specs version-controlled? If yes, wire `repoUrl` — **for this project the specs are the entire artifact**, exactly as firmware is for the robotic arm (C17).
- **Demo:** N/A. `[D]` The closest substitute is a published example: one agent's full spec with its refusal conditions, shown alongside a transcript of it refusing. **That single example communicates the design more than any description.**
- **Report** `[NEEDS DATA]`: `docs/guardrail-tests.md` with the R3 results.
- **Presentation:** move to the tooling tier (C20). Retitle away from "suite," which implies a product.

---

## Appendix A — `projects.json` patch checklist

- [ ] Replace all four `repoUrl` values with real repository URLs (C5)
- [ ] Merge résumé knee brace entry and `modular-knee-brace` into one two-phase project (C3)
- [ ] Add `Arduino`, `FSR`, `Python`, `SolidWorks`, `Simulation` to the knee brace `stack[]`
- [ ] **Remove `"Computer Vision"` from SkinTrack+ `stack[]` — no CV exists (C13). Today.**
- [ ] **Rewrite SkinTrack+ `capabilityDetails.biomedical-embedded`; the "vision pipeline" line is false (C13)**
- [ ] **SkinTrack+ `status`: `"Active Development"` → `"Prototype"` until R0 passes (C15)**
- [ ] **SkinTrack+ `liveUrl`: reactivate Firebase and verify end-to-end today, or remove it (C15a)**
- [ ] **SkinTrack+ `stack`: backend is Firebase, not Supabase — correct the whole array (C13, C15)**
- [ ] Add a `detail.sections[]` case study to `bme-visualizations` once its validation table exists
- [ ] Robotic arm `useCase`: "closed-loop motion control" → sensor-driven task sequencing; actuation is open-loop (C16)
- [ ] Robotic arm `repoUrl`: wire to the `intro to mechatronic design` repo (C17)
- [ ] Robotic arm `stack`: add colour sensing and inverse kinematics — both missing (C17)
- [ ] Robotic arm `summary`/`detail`: rewrite around colour-conditioned sorting, IK, and human handover (C17)
- [ ] Robotic arm `featured`: `false` → `true` (C17)
- [ ] Robotic arm: add the 2-person scope line — sole firmware ownership (§9.4.5)
- [ ] HeartWire OS `stack`: add Prisma and the database; Next.js + TypeScript omits the substance (C18)
- [ ] HeartWire OS `repoUrl`: wire it (C5)
- [ ] HeartWire OS: keep `featured: false` until the catalog integrity audit passes (C18)
- [ ] Restructure into tiers: Ventures / Engineering Projects / Research / Tooling (C20)
- [ ] HeartWire → venture tier, MindMap nested as flagship; not a sibling of course projects (C20)
- [ ] Rename "HeartWire OS" — it reads as a company product but is personal infrastructure (C20a)
- [ ] Agent suite → tooling tier; retitle away from "suite" (C20)
- [ ] Agent suite `stack`: confirm "Claude Agent SDK" and "MCP" are literally true; trim if specs-only
- [ ] Agent suite `repoUrl`: wire it — the specs are the artifact
- [ ] Convert all four `detail` objects to the `sections[]` shape (C10)
- [ ] Update `status` strings to carry falsifiable content where §6 data exists (C7)

## Appendix B — `resume/page.tsx` patch checklist

- [ ] Correct health-suite stack line: remove FastAPI / PyTorch, use Next.js / Supabase / TypeScript (C1, C2)
- [ ] Rewrite knee brace bullet 1: "joint loading" → "brace–limb interface pressure distribution" (C4)
- [ ] Soften knee brace bullet 2 and 3 unless Phase 1 raw data is recovered (M5)
- [ ] Correct or remove "encrypted storage" (C9)
- [ ] Reconcile minors across résumé, about page, and master context (C8)
- [ ] Retain the measurement artifact behind the 10% Firestore claim (C6)
- [ ] Robotic arm bullet 3: "improve task repeatability and object-handling reliability" asserts an improvement with no baseline. Either attach R1/R2 numbers, or rewrite to describe the calibration **procedure** rather than claim a **result** (D4)
- [ ] Rewrite GastroGuard "wearable ingestion (HRV, sleep)" — path is not connected (C12)
- [ ] Replace "in user testing" with the real figure: 10 users, ~1 month (C7)
- [ ] Rewrite SkinTrack+ description: no implied image analysis; frame as structured longitudinal documentation (C13, C14)

## Appendix B2 — SkinTrack+ code actions (not documentation)

Product changes, ranked. These precede any write-up.

1. [ ] **Verify the live link end-to-end, or take it down.** Upload → close → reload on a second device. (C15a)
2. [ ] **Close R0:** wire persistence to Supabase Storage + Postgres. Nothing else in the project is measurable until this passes.
3. [ ] Confirm the Storage bucket is private with signed-URL access; if public-read, fix before any real image lands in it.
4. [ ] Add point-of-output line: *images are stored for your reference and are not analysed.* (C14 — closes the user-inference gap)
5. [ ] Add disclaimer: no diagnosis, no cancer screening, see a dermatologist for any new/changing/asymmetric/bleeding lesion.
6. [ ] Reframe guidance output as surfaced correlations from the user's own records, not advice.
7. [ ] Set a minimum-data threshold before the engine outputs anything; correlations over a few days are noise.
8. [ ] If an offline path is kept, move image blobs from `localStorage` to IndexedDB.

## Appendix C — changelog

| Date | Change |
|---|---|
| 2026-09-28 | Initial audit. Findings C1–C11. MindMap+ and Modular Knee Brace templates filled. GastroGuard and SkinTrack+ scaffolded. |
| 2026-09-28 | C3 resolved — knee brace confirmed as one project, two phases; currently digital (SolidWorks + Python sim), print in progress, sensing layer being rebuilt. |
| 2026-09-28 | GastroGuard template filled. Cohort confirmed: 10 users, ~1 month, eval set exists, hybrid rules + correlation/predictive model. Wearable ingestion confirmed not connected → finding C12. Backlog items M9–M12 added. |
| 2026-09-28 | SkinTrack+ template drafted on the assumption of no analysis layer. **Superseded below.** |
| 2026-09-28 | C13/C14 raised on the assumption that images fed a model. **Superseded below.** |
| 2026-09-28 | **C13 RESOLVED, C14 DOWNGRADED, C15 raised.** Confirmed: no computer vision — the engine is correlation/rules over logged metadata; ML evaluated and deliberately rejected. C14 severity drops from Critical to Moderate: guidance is metadata-derived, so the melanoma false-negative pathway does not exist; residual risk is unvalidated advice plus the user's inference that the photo was considered. C15 raised: backend incomplete at last test, first shared build was browser-local, no data survived — live link and status are overstated. SkinTrack+ section rewritten: R0 persistence added as blocking requirement, D2/D4 reframed, Section 7 strengthened. All four target projects drafted. |
| 2026-09-28 | **C15 revised, C5 corrected.** SkinTrack+ backend exists in **Firebase** but is dormant and needs reactivation; the one external test (~1 yr ago) predates any backend, so no data was ever captured. `projects.json` lists Supabase — a fourth stack error on that project. C5 corrected: BME Visualizations carries working `repoUrl` and `liveUrl` and is the only project with a complete Section 9. |
| 2026-09-28 | **BME Visualizations template filled** (Section 8). Identified as the highest verification-value-per-hour project in the portfolio: every model has a closed-form solution or published reference to validate against, requiring no users, hardware, or cohort. Verification programme specified per model. |
| 2026-09-28 | **Robotic Pick-and-Place Arm template filled** (Section 9). C16 raised: "closed-loop motion control" overclaims open-loop servo actuation. C17 raised: no repository — for an embedded project the firmware is the artifact, and the project is also `featured: false` despite making the most measurable claims in the portfolio. Verification programme specified: success rate over 50 cycles, ISO 9283-style pose repeatability, FSM error-transition coverage. |
| 2026-09-28 | **Robotic arm revised.** Confirmed: inverse kinematics (not taught poses), colour-conditioned sorting (LED colour → matching cup), and human-to-robot handover; repo exists as `intro to mechatronic design`; team project for Intro to Mechatronic Design. C17 rewritten — the repo is unwired, not missing, and the project is **underclaimed**: three major capabilities appear nowhere in the portfolio or résumé. Section 9 rewritten around the three capabilities; verification now leads with a colour confusion matrix under two lighting conditions and IK positional accuracy. |
| 2026-09-28 | Robotic arm scope confirmed: 2-person team, Jonny sole owner of all programming (FSM, IK, colour classification); partner handled construction; wiring joint; schematics 50/50; professor set the brief. |
| 2026-09-28 | **HeartWire OS template filled** (Section 10). C18 raised: resource catalog has systematically corrupted records — wrong `trackId` assignments at scale, parser-artifact titles, unreliable `courseId`, type values outside the enum — from scraped ingestion with no validation at the boundary, publicly deployed. C19 raised: "HeartWire" names a project, an agent suite, the portfolio, and the umbrella brand simultaneously. Two apparent implementations (Prisma seed vs static export) of opposite data quality; canonical source unresolved. |
| 2026-09-28 | Robotic arm scope upgraded: professor specified required behaviour only; IK approach, FSM architecture, and classification method were Jonny's decisions, no starter code. |
| 2026-09-28 | **C20 raised, superseding C19.** HeartWire is Jonny's startup with MindMap as flagship; the deployed page is his personal engineering portfolio; the agent suite is personal tooling. Recommended tiering: Ventures / Engineering Projects / Research / Tooling. Flagged that a startup framing raises the stakes on C9, C12, C13, C14 — health overclaims under a company name are liability, not résumé polish. |
| 2026-09-28 | **Agent Suite template filled** (Section 11), framed as tooling rather than product. Lead finding: encoded refusal conditions (e.g. Trading Agent requires an invalidation level) are the real engineering claim, not the count of 18. Verification programme: adversarial guardrail testing (R3), usage distribution (R1), trigger-collision check (R5). All portfolio projects now drafted. |
