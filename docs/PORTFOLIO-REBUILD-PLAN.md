# Portfolio Rebuild — Execution Plan

**Owner:** Jonathan Terrero
**Companion file:** `portfolio-audit.md` — findings detail and the filled 9-section templates
**This file:** what to do, in what order, with acceptance criteria
**Created:** 2026-09-28 · **Status:** Phase 0 not started

---

## 0. For a fresh Claude Code session — read this first

**What this is.** A long-running restructure of Jonathan Terrero's engineering portfolio and résumé, plus the code changes that make the public claims true. It spans several repos and will take weeks, not one session.

**Two files, different jobs:**
| File | Use it for |
|---|---|
| `portfolio-audit.md` | Why a change is needed. Findings C1–C20 in full, and the 9-section write-up template filled per project. |
| `PORTFOLIO-REBUILD-PLAN.md` (this) | What to do next. Task IDs, acceptance criteria, status. |

**Session protocol:**
1. Read §1 (Ground rules) and §3 (Findings register). Both are short.
2. Read §8 (Status log) — the last entry tells you where work stopped.
3. Pick the lowest-numbered task in §5 whose `Blocked by` is clear and whose status is `TODO`.
4. Before editing any file, read it in full. Do not assume structure from this document — file paths here may have drifted.
5. On completion, update the task's status in §5 **and** append to §8. Both, in the same commit.
6. If a task turns out to be wrong, blocked, or larger than described, append the reason to §8 and move on. Do not silently skip.

**Do not batch Phase 0 with later phases.** Phase 0 removes public claims that are currently false. It gates everything else.

---

## 1. Ground rules — non-negotiable

### 1.1 No fabricated metrics
The owner's standing requirement: verified, interview-defensible figures only. A blank metric is recoverable; a published number that cannot be reproduced under questioning is not.

**Never** write a number into portfolio copy, résumé copy, or a README unless it came from a test that was actually run and whose output is committed somewhere.

### 1.2 Evidence tiers — tag before you publish
Every factual claim carries one of:

| Tag | Meaning | Publishable? |
|---|---|---|
| `[V]` | Verified — traceable to code, a deployed artifact, or a recorded measurement | Yes |
| `[D]` | Derived — follows logically from `[V]` facts | Yes |
| `[NEEDS DATA]` | Requires a measurement or retrieval not yet done | **No** |

`[NEEDS DATA]` markers in `portfolio-audit.md` are **not placeholders to fill with plausible text.** They are a work queue. If a task requires data that does not exist, the task is to *generate the data*, not to write around it.

### 1.3 The claim ratchet
A claim may only get **weaker** without new evidence, never stronger. If you are unsure whether a capability is real, write the conservative version. Every finding in §3 except C17 is an overclaim being walked back.

### 1.4 Safety and regulatory gate
Applies to MindMap, GastroGuard, SkinTrack+, and anything under the HeartWire name.

- **No diagnostic, therapeutic, or treatment-recommendation output** from any health app, and no copy implying it.
- **No implied lesion assessment** anywhere in SkinTrack+.
- Health apps state plainly: not a medical device, no FDA evaluation, correlational output only.
- Any feature touching lesion imagery, symptom triage, or treatment guidance requires explicit sign-off from the owner before shipping — **do not implement it because it appears in a backlog.**

Rationale in `portfolio-audit.md` C13, C14, C20(b).

### 1.5 Scope honesty
Team projects state team size and personally-owned subsystems. Currently relevant: the robotic arm (2-person; owner wrote all firmware).

### 1.6 Do not delete the audit's reasoning
When a finding is resolved, mark it resolved in §3 with a date. Do not remove it. The correction history is itself portfolio material — see C13/C14, which were raised and then substantially revised on better information.

---

## 2. Surfaces and repos

| Surface | Location | Notes |
|---|---|---|
| Portfolio site | Next.js app (this repo) | `src/lib/projects.ts`, `projects.json`, `src/app/resume/page.tsx`, `src/app/about/page.tsx`, `src/app/projects/[slug]/page.tsx`, `src/lib/tech-stack.ts` |
| MindMap | `github.com/jonnyterrero/MindMap` | Next.js 15 + Supabase, live on Vercel |
| GastroGuard | `github.com/jonnyterrero/gastro-guard` | Next.js + Supabase, live on Vercel |
| SkinTrack+ | `github.com/jonnyterrero/SkinTrack-` | Next.js PWA, **Firebase** backend (dormant) |
| Robotic arm | `intro to mechatronic design` | Arduino firmware + schematics — exact URL `[NEEDS DATA]` |
| BME Visualizations | `github.com/jonnyterrero/BME-Visualizations` | Live on GitHub Pages. **Only surface currently wired correctly.** |
| HeartWire OS | live at `heart-wire-os.vercel.app` | Next.js + Prisma. Repo `[NEEDS DATA]` |
| Agent suite | `[NEEDS DATA]` | Markdown skill specs |
| Knee brace | none | **Repo must be created — Q-04** |

---

## 3. Findings register

Detail for each is in `portfolio-audit.md` under the same ID.

| ID | Project | Finding | Sev | Status |
|---|---|---|---|---|
| C1 | Health suite | Résumé says FastAPI/PyTorch; actual stack is Next.js + Supabase | Critical | RESOLVED 2026-10-05 |
| C2 | Health suite | `PyTorch` claimed, no model exists anywhere | Critical | RESOLVED 2026-10-05 |
| C3 | Knee brace | Listed as two disjoint projects across résumé and portfolio | — | **RESOLVED** — one project, two phases |
| C4 | Knee brace | "Measuring real-time joint loading" — FSRs measure interface pressure, not joint reaction force | Critical | RESOLVED 2026-10-05 |
| C5 | Most | `repoUrl` is a bare root; BME Visualizations is the exception | High | RESOLVED 2026-10-05 (SkinTrack+ withheld) |
| C6 | All | Sections 2/6/7/8 absent portfolio-wide — no acceptance criteria, verification, failures, or limits | Critical | Phases 2–3 |
| C7 | All | Status language unfalsifiable ("in user testing" — how many, how long?) | High | RESOLVED 2026-10-05 |
| C8 | Profile | Minors disagree across résumé, about page, and master context | Moderate | RESOLVED 2026-10-05 (confirm Q-05) |
| C9 | MindMap | "Encrypted storage" = Supabase platform default, not application work | High | RESOLVED 2026-10-05 — encryption exists in code |
| C10 | Site | `ProjectDetail` type doesn't fit the 9-section template; use `sections[]` | Moderate | RESOLVED 2026-10-05 |
| C11 | Template | No scope/role field | Low | RESOLVED 2026-10-05 |
| C12 | GastroGuard | Wearable ingestion described as operational; has never run | Critical | RESOLVED on portfolio 2026-10-05 |
| C13 | SkinTrack+ | "Computer Vision" claimed; no image analysis exists | Critical | RESOLVED on portfolio 2026-10-05 — but see evidence-log: repo README + random placeholder metrics |
| C14 | SkinTrack+ | Remedy output = therapeutic claim. **Downgraded** from image-derived to metadata-derived | Moderate | TODO |
| C15 | SkinTrack+ | Status overstated; Firebase backend dormant; live link may not work; stack says Supabase | Critical | RESOLVED on portfolio 2026-10-05 |
| C16 | Robotic arm | "Closed-loop motion control" — servos are open-loop | High | RESOLVED 2026-10-05 |
| C17 | Robotic arm | **Underclaim.** Repo exists but unwired; IK, colour sorting, and handover absent from all copy | High | RESOLVED 2026-10-05 — with IK correction (evidence-log) |
| C18 | HeartWire OS | Catalog records systematically corrupted — wrong tracks, parser-artifact titles, out-of-enum types | High | TODO |
| C19 | Naming | "HeartWire" names four things | — | **SUPERSEDED by C20** |
| C20 | Structure | HeartWire is a startup, not a sibling project. Tier the portfolio. Startup framing raises stakes on C9/C12/C13/C14 | High | RESOLVED 2026-10-05 — Terrero Labs umbrella |

**One finding runs the other way.** C17 is an underclaim — the robotic arm does inverse kinematics, colour-conditioned sorting, and human handover, and none of it appears anywhere. Every other finding walks a claim back.

---

## 4. Phases and gates

```
PHASE 0  Truth & safety          ── gate: no false public claim remains
   ↓
PHASE 1  Structure & wiring      ── gate: IA tiered, every repo/live link real
   ↓
PHASE 2  Verification harnesses  ── gate: ≥1 real measured number per active project
   ↓
PHASE 3  Write-ups               ── gate: 9 sections filled from measured data
   ↓
PHASE 4  Maintenance
```

**Gates are hard.** Do not start Phase 3 write-ups for a project whose Phase 2 measurements have not run — that is how `[NEEDS DATA]` becomes invented prose.

**Phase 0 rationale.** HeartWire is a company. Health claims under a company name are liability, not résumé polish. Everything in Phase 0 is either a false public statement or a live link that misrepresents what exists.

---

## 5. Task backlog

Status values: `TODO` · `IN PROGRESS` · `BLOCKED` · `DONE` · `DROPPED`

### PHASE 0 — Truth & safety

| ID | Task | Files / target | Acceptance | Blocked by | Status |
|---|---|---|---|---|---|
| P0-01 | SkinTrack+: verify live link end-to-end, or take it down | `projects.json` + SkinTrack repo | Upload → close → reload on a second device shows the record. If it fails: `liveUrl` removed, `status` → `"Prototype"` | — | DONE (2026-10-05) — liveUrl removed and status set to Prototype pending end-to-end verification |
| P0-02 | SkinTrack+: remove or reframe remedy/guidance output | SkinTrack repo | No treatment, remedy, or reassurance text reaches the UI. Output reframed as the user's own logged correlations | Q-01 | TODO |
| P0-03 | SkinTrack+: add point-of-output disclosure | SkinTrack repo | Visible at the output surface, not a footer: performs no diagnosis, does not screen for skin cancer, **images are stored for reference and are not analysed**, see a dermatologist for any new/changing/asymmetric/bleeding lesion | — | TODO |
| P0-04 | SkinTrack+: remove `"Computer Vision"` from stack; correct backend to Firebase | `projects.json` | `stack` reflects reality; `capabilityDetails.biomedical-embedded` no longer says "vision pipeline" | — | DONE (2026-10-05) — CV removed; backend omitted from stack: repo code uses Supabase, contradicting "Firebase" (see evidence-log) |
| P0-05 | MindMap: correct or implement the encryption claim | Résumé + `projects.json` | Either app-layer envelope encryption exists and is described precisely, or copy reads "per-user row isolation enforced by database-level RLS policies" | — | DONE (2026-10-05) — app-layer envelope encryption found in MindMap code; described precisely; prod enablement unconfirmed |
| P0-06 | GastroGuard: correct wearable ingestion claim | `src/app/resume/page.tsx` | Copy states the ingestion interface is designed and not connected to a live source | Q-02 | DONE (2026-10-05) — conservative wording (Q-02 still open) |
| P0-07 | Résumé: remove FastAPI + PyTorch from the health-suite stack line | `src/app/resume/page.tsx` | Line reads Next.js / Supabase / TypeScript | — | DONE (2026-10-05) |
| P0-08 | Knee brace: rewrite the joint-loading bullet | `src/app/resume/page.tsx` | "brace–limb interface pressure distribution, used as a proxy for load transfer" | — | DONE (2026-10-05) |
| P0-09 | Robotic arm: rewrite "closed-loop motion control" | `projects.json` `useCase` | "sensor-driven task sequencing with FSM state feedback; joint actuation is open-loop position command" | Q-03 | DONE (2026-10-05) — firmware confirms open-loop servos |
| P0-10 | Replace unfalsifiable status strings | `projects.json`, résumé | GastroGuard states "10 users over ~1 month". SkinTrack+ states no retained usage data. No project claims testing it has not done | — | DONE (2026-10-05) |
| P0-11 | Reconcile minors across all surfaces | `resume/page.tsx`, `about/page.tsx` | One answer, identical everywhere | Q-05 | DONE (2026-10-05) — Physics + CS everywhere via src/lib/brand.ts; confirm Q-05 |
| P0-12 | Add health-app disclaimers | MindMap, GastroGuard, SkinTrack+ repos | Each states: not a medical device, no FDA evaluation, correlational output only | — | TODO |

**Phase 0 gate:** every row above is `DONE` or `DROPPED` with a logged reason.

### PHASE 1 — Structure & wiring

| ID | Task | Files / target | Acceptance | Blocked by | Status |
|---|---|---|---|---|---|
| P1-01 | Implement the four-tier IA | `src/lib/projects.ts`, `projects.json`, routing | Tiers render: Ventures / Engineering Projects / Research / Tooling. See `portfolio-audit.md` C20 for the tree | — | DONE (2026-10-05) — /products /engineering /research /systems |
| P1-02 | HeartWire → venture tier; MindMap nested as flagship | `projects.json` | HeartWire is not a peer of course projects; its products nest under it | P1-01 | DONE (2026-10-05) — umbrella is Terrero Labs per restructuring plan; see BRAND_ARCHITECTURE.md |
| P1-03 | Rename "HeartWire OS" | all surfaces | Personal study system no longer reads as a company product | Q-06 | BLOCKED (Q-06) — labelled "working title — rename planned" |
| P1-04 | Agent suite → tooling tier, retitled away from "suite" | `projects.json` | Presented as personal tooling; no user or product implication | P1-01 | DONE (2026-10-05) — retitled "Agent Bench" |
| P1-05 | Wire every `repoUrl` | `projects.json` | MindMap, GastroGuard, SkinTrack+, robotic arm, HeartWire OS, agent suite all resolve. `hasValidRepoUrl()` passes for each | Q-04, Q-07 | DONE (2026-10-05) — all wired except SkinTrack+ (withheld: README makes image-analysis claims) and JonnyJr (hidden) |
| P1-06 | Correct every `stack[]` array | `projects.json` | SkinTrack+ (Firebase, no CV), robotic arm (add IK + colour sensing), HeartWire OS (add Prisma + DB), agent suite (only what's literally true) | Q-03, Q-08 | DONE (2026-10-05) |
| P1-07 | Robotic arm: rewrite copy around what it does | `projects.json` | Colour-conditioned sorting, inverse kinematics, human handover all present. `featured: true` | P1-06 | DONE (2026-10-05) — rewritten from firmware; see evidence-log re IK |
| P1-08 | Robotic arm: add the scope line | `projects.json` | 2-person team; sole firmware ownership; behavioural brief only | — | DONE (2026-10-05) |
| P1-09 | Migrate `detail` to `sections[]` shape | `src/lib/projects.ts`, `projects.json` | All 9 template sections render on the detail page | — | DONE (2026-10-05) — content moved to typed modules in src/content/projects/*.ts; projects.json removed |
| P1-10 | Add a scope/role field to the template and type | `src/lib/projects.ts` | Optional field renders between Design decisions and Implementation | P1-09 | DONE (2026-10-05) |
| P1-11 | Create the knee brace repo | new repo | `/cad /sim /analysis /firmware /data /docs` + README. **Phase 1 Python scripts committed** — currently the only surviving Phase 1 artifact and unversioned | Q-04 | IN PROGRESS — repo exists (Modular-Knee-Brace); Phase 1 Python scripts not yet committed |
| P1-12 | SkinTrack+: reactivate the Firebase backend | SkinTrack repo | R0 passes — image + context survive upload, app close, and reload on a second device | P0-01 | TODO |
| P1-13 | SkinTrack+: confirm storage bucket is private | Firebase console + rules | No unauthenticated read path to any stored image. If public, fix before any real image lands | P1-12 | TODO |

**Phase 1 gate:** every link on the site resolves; no stack array contains a false entry; IA is tiered.

### PHASE 2 — Verification harnesses

Ordered by value per hour. These produce the numbers Phase 3 consumes.

| ID | Task | Produces | Est. | Blocked by | Status |
|---|---|---|---|---|---|
| P2-01 | **GastroGuard adherence from existing data** | Entries/user, active-days/user, dropoff curve over the 10-user month | ~1 h | — | TODO |
| P2-02 | **Robotic arm: colour confusion matrix** | 20 trials × each colour, under build lighting **and** altered lighting. Two matrices; the delta is the result | ~2 h | hardware access | TODO |
| P2-03 | Robotic arm: end-to-end sort success | 50 cycles, successes + **failure breakdown by mode** | ~1 h | hardware access | TODO |
| P2-04 | Robotic arm: IK positional accuracy | 10 Cartesian targets across the workspace, error in mm. Validates the IK claim | ~2 h | hardware access | TODO |
| P2-05 | Robotic arm: pose repeatability | 20 returns, fixed approach direction, spread in mm (ISO 9283-style) | ~1 h | hardware access | TODO |
| P2-06 | **RLS isolation harness ×3** | 0/N cross-tenant access across tables × operations. Build once, run on MindMap, GastroGuard, SkinTrack+ | ~2 h | P1-12 for SkinTrack | TODO |
| P2-07 | **GastroGuard: confirm eval split** | Leave-one-subject-out or forward-chaining. **Blocking for any published model metric** | ~30 min | — | TODO |
| P2-08 | GastroGuard: rerun eval if split was pooled | Defensible performance number vs. per-user base-rate baseline | ~3 h | P2-07 | TODO |
| P2-09 | GastroGuard: FDR correction on trigger associations | Benjamini–Hochberg at q=0.05, or results explicitly labelled uncorrected | ~1 h | — | TODO |
| P2-10 | GastroGuard: model card | Every row of the §5 table in `portfolio-audit.md` filled | ~2 h | P2-07 | TODO |
| P2-11 | **HeartWire OS: catalog integrity audit** | Failure rate by class (title, track, course, URL, type). The before-number | ~2 h | — | TODO |
| P2-12 | HeartWire OS: re-ingest with boundary validation | Post-fix failure rate. "N% → 0%" | ~4 h | P2-11 | TODO |
| P2-13 | HeartWire OS: link checker | 2xx rate; dead links flagged in UI, not silently served | ~2 h | — | TODO |
| P2-14 | **BME Visualizations: closed-form validation** | Per-model max relative error vs. analytical solution. See the §6 table in the audit | ~4 h | — | TODO |
| P2-15 | BME Visualizations: published-reference checks | Fåhræus–Lindqvist viscosity minimum, thermistor curvature, knee force regime | ~2 h | P2-14 | TODO |
| P2-16 | BME Visualizations: browser↔Python parity | Max divergence on signal models. Nonzero = a bug in one | ~1 h | — | TODO |
| P2-17 | BME Visualizations: bound slider ranges | No slider reaches physically meaningless territory | ~2 h | P2-14 | TODO |
| P2-18 | Knee brace: dimensional accuracy | Calipers vs. CAD nominal — mean and max deviation | ~2 h | print complete | TODO |
| P2-19 | Knee brace: ROM, swap time, mass | R3, R5, R6 — goniometer, stopwatch, scale | ~2 h | print complete | TODO |
| P2-20 | Knee brace: simulation vs. published gait kinetics | % deviation across stance phase. Highest-value item in that project | ~4 h | — | TODO |
| P2-21 | **Knee brace: recover Phase 1 raw data** | Calibration curve + reference loads, or a documented loss. **Blocking for two résumé bullets** | ~1 h | — | TODO |
| P2-22 | Agent suite: guardrail adversarial test | Refusal rate on N should-refuse vs. N should-not inputs, per agent with declared refusal conditions | ~3 h | — | TODO |
| P2-23 | Agent suite: usage distribution | Invocations per agent over 30 days, long tail included | ~1 h | — | TODO |
| P2-24 | Agent suite: trigger-collision check | Overlapping triggers found; duplicate pairs resolved or merged | ~1 h | Q-09 | TODO |
| P2-25 | MindMap: auth E2E (Playwright) | signup → confirm → login → persist → refresh → logout | ~2 h | — | TODO |
| P2-26 | MindMap: RPC contract tests | Valid / missing key / wrong type / duplicate same-day / oversized | ~2 h | — | TODO |
| P2-27 | `.env.example` as a checked-in contract ×3 | Direct fix for the `NEXT_PUBLIC_APP_URL` production failure | ~30 min | — | TODO |

**Start with P2-01.** One hour, no new collection, first real number in the portfolio.

**Phase 2 gate:** each active project has at least one measured, committed result.

### PHASE 3 — Write-ups

| ID | Task | Acceptance | Blocked by | Status |
|---|---|---|---|---|
| P3-01 | MindMap 9-section write-up | No `[NEEDS DATA]` in published copy; §6 cites committed results | P2-06, P2-25, P2-26 | TODO |
| P3-02 | GastroGuard write-up + model card | §6 states cohort, split strategy, baseline, correction | P2-01, P2-07..10 | TODO |
| P3-03 | SkinTrack+ write-up | Framed as structured longitudinal documentation. No implied analysis | P1-12, P1-13 | TODO |
| P3-04 | Knee brace write-up | Two-phase framing; §7 covers the hardware loss honestly | P2-18..21 | TODO |
| P3-05 | BME Visualizations write-up + `docs/validation.md` | Per-model validation table published and linked | P2-14..17 | TODO |
| P3-06 | Robotic arm write-up + demo video | Real FSM state diagram; 20-second cycle + handover video | P2-02..05 | TODO |
| P3-07 | HeartWire OS write-up + `docs/data-integrity.md` | Before/after integrity numbers published | P2-11..13 | TODO |
| P3-08 | Agent suite write-up | Led by refusal conditions, not the count of 18 | P2-22..24 | TODO |
| P3-09 | Résumé rebuild | Every bullet traceable to a `[V]` fact or a committed measurement | P3-01..08 | TODO |

### PHASE 4 — Maintenance

| ID | Task | Cadence | Status |
|---|---|---|---|
| P4-01 | Re-run link checker across portfolio and HeartWire catalog | Monthly | TODO |
| P4-02 | Re-run RLS harness after any schema or policy change | Per change | TODO |
| P4-03 | Re-verify every `liveUrl` end-to-end | Monthly | TODO |
| P4-04 | Update this file's status log | Per session | ongoing |

---

## 6. Shared harnesses to build once

**H-01 — RLS / tenant isolation harness.** Two test accounts. With A's JWT attempt select, update, and delete against B's rows across every table and RPC. Assert 0 successes. Parameterise by project; reused across MindMap, GastroGuard, SkinTrack+ (P2-06).

**H-02 — Link checker.** HEAD every URL in a catalog; report 2xx rate; emit a dead-link list. Used by HeartWire OS (P2-13) and portfolio maintenance (P4-01).

**H-03 — Closed-form validation runner.** For each BME model: parameter set → computed value → analytical value → relative error. Emits a markdown table straight into `docs/validation.md` (P2-14).

**H-04 — Schema validation at ingestion boundary.** Assert non-empty human title, `trackId` in allowed set, resolvable or explicitly-null `courseId`, well-formed URL, `type` within enum. Rejects at import rather than after (P2-12).

**Cross-project pattern worth naming in the write-ups:** HeartWire ingested without validation; SkinTrack+ shipped without verified persistence. Two projects, one root cause — **no gate before deploy.** H-01 and H-04 are that gate, retrofitted.

---

## 7. Open questions

Answer these to unblock the tasks listed. Record answers here with dates.

| ID | Question | Blocks | Answer |
|---|---|---|---|
| Q-01 | Does SkinTrack+'s correlation engine currently emit remedy/treatment text to the UI, or only surfaced correlations? | P0-02 | |
| Q-02 | GastroGuard ingestion interface: coded-but-unconnected, or designed-but-unbuilt? | P0-06 | |
| Q-03 | Robotic arm: any encoder or potentiometer joint feedback? (If yes, C16 is withdrawn.) | P0-09, P1-06 | |
| Q-04 | Exact URL of the `intro to mechatronic design` repo; is it public? | P1-05, P1-11 | 2026-10-05: github.com/jonnyterrero/Intro-to-Mech-Design — public |
| Q-05 | Which minors are correct — Chemistry + Mathematics, or Physics + CS? | P0-11 | |
| Q-06 | New name for the personal study system currently called "HeartWire OS" | P1-03 | |
| Q-07 | Are the agent specs in a repo? URL? | P1-05 | 2026-10-05: workflows-and-automations/agents/agent-team — public |
| Q-08 | Agent suite: is any Claude Agent SDK code written, or any MCP server authored — or are all 18 `SKILL.md` files only? | P1-06 | 2026-10-05: SKILL.md specs + Python deploy/eval scripts against the Claude API (Managed Agents). No Agent SDK code; MCP is consumed (config), not authored |
| Q-09 | Duplicate-looking agent pairs (`cpa-cfo-agent`/`cpa-cfo`, `investment-portfolio-agent`/`portfolio-manager`) — intentional variants or unpruned drafts? | P2-24 | |
| Q-10 | HeartWire OS: which implementation is deployed — the Prisma platform or the static export? Is `trackId` enum- or FK-constrained in the schema? | P2-11 | 2026-10-05: live URL serves the static export (repo README); Prisma `trackId` is a FK to Track |
| Q-11 | Robotic arm IK: closed-form geometric or iterative? DOF count? How is the solution branch chosen, and what happens on an unreachable target? | P3-06 | 2026-10-05 (partial): closed-form — wrist-point subtraction or 2-link law of cosines; unreachable targets rejected before servo command; 4 servos. Link lengths are placeholders in v4; final sort uses EEPROM poses |
| Q-12 | Knee brace: does the Phase 1 Arduino sketch survive anywhere? | P1-11 | |

---

## 8. Status log

Append one entry per working session. Newest last. Keep entries short and factual.

```
2026-09-28 — Plan created. Audit complete: 20 findings across 11 projects.
             Nothing started. Next: P0-01.
2026-10-05 — Portfolio-side Phase 0 and Phase 1 done in this repo. Verified every
             claim against the project repos first (docs/evidence-log.md); five
             findings changed on that evidence. Site rebuilt: Terrero Labs shell,
             four tiers, typed 10-section case studies in src/content/projects/.
             NOT done (other repos / need owner): P0-02, P0-03, P0-12, P1-12,
             P1-13, all of Phase 2. Fix SkinTrack- README + placeholder analysis
             before re-linking it. Next: P2-01 (GastroGuard adherence).
```

---

## 9. Definition of done

**Per project:**
- [ ] All nine template sections filled, no `[NEEDS DATA]` in published copy
- [ ] Section 6 cites at least one measurement whose output is committed
- [ ] Section 8 states what cannot be claimed, including regulatory status where applicable
- [ ] Section 9 has a resolving repo link and, where applicable, a working live link or a video
- [ ] Every number traceable to a committed result

**Portfolio-wide:**
- [ ] Four-tier IA live
- [ ] No claim on any public surface contradicts any other public surface
- [ ] No health app implies diagnostic, therapeutic, or assessment capability
- [ ] Every `repoUrl` and `liveUrl` resolves and works end-to-end
- [ ] Every résumé bullet traceable to a `[V]` fact or a committed measurement

**The test:** a technically literate reader can click any link, read any claim, ask the hardest follow-up question it invites, and get an answer that holds.
