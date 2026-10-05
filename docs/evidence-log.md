# Evidence log — repo verification, 2026-10-05

Before the site was rewritten, every claim was checked against the project repositories (shallow clones of `main`). Each entry below records what the code shows and how the site changed as a result. Under the claim ratchet (rebuild plan §1.3), a claim only gets stronger when there is evidence like this.

## Findings that change the audit

| # | Project | Audit said | Repo shows | Site now says |
|---|---|---|---|---|
| E1 | MindMap | C9: "encrypted storage" = platform default | `frontend/lib/journal-crypto.ts` (AES-256-GCM envelope encryption, per-user wrapped DEKs), migration `027_journal_encryption_user_keys.sql`, wired into journal write actions behind `isEncryptionEnabled` | App-layer envelope encryption exists in code; **production enablement not confirmed** |
| E2 | MindMap | M1: RLS untested | `supabase/tests/rls_isolation_tests.sql` (impersonates two users) | The suite exists; **the run result isn't committed**, so it's still pending |
| E3 | MindMap | no ML | `ml/` package, `MODEL_CARD.md`: calibrated logistic regression, leave-user-out on **synthetic data only**; migraine at chance | Described as synthetic-only. No AUROC figures are quoted |
| E4 | Robotic arm | D2: "IK over taught poses" drives the sort | `final_project_final_code.ino` uses **calibrated joint-space poses in EEPROM**. Closed-form IK lives in `v4_ik_pick_and_place.ino`, with **placeholder link lengths** (`MEASURE AND REPLACE`) | Both stated precisely. **Don't say "IK drives the sort" in interviews unless another build did** |
| E5 | Robotic arm | colour from "an LED" | Photoresistor read under R/G/B LED illumination; nearest squared-distance match to calibrated references (4 colours + empty); 3 stable reads | Described as implemented |
| E6 | Robotic arm | human handover | **Found (owner pointed to it):** `final-project/final_project_v1/robotic_arm_fsm/`, with an LED-command-triggered FSM, an 8–15 cm grab window, a `STOP_HAND` override under 8 cm (resume above 15 cm), a grip retry ≤ 2, median + EMA filtering, and non-blocking `millis()` | Handover build documented, with its safety limits |
| E7 | Knee brace | "no FEA"; Phase 2 = Python sim + silicone | `docs/simulation/…simulationxpress-report.docx` (LFS): right lower connector, Nylon 101, 3 lbf, max von Mises 35.7 MPa, max displacement 2.96 mm, **min FoS 1.68**. The course report (individual, EGN 3433C) documents a 2–4 FoS target, a failed first assembly mesh (interferences → bonded contacts), an assembly run near yield, and a FoS ≈ 5,000 run | FoS 1.68 published as "not met"; the 5,000 run is treated as a setup error. The user's identity is withheld for privacy |
| E8 | SkinTrack+ | C15: backend is Firebase | `@supabase/*` dependencies and `claude-supabase/` migrations; no Firebase code | Backend omitted from the stack until confirmed |
| E9 | SkinTrack+ | C13: no image analysis anywhere | **Public README claims "Automated Image Analysis", "Asymmetry Detection", "Border Irregularity", "Melanoma tracking".** `frontend/features/images/image-analysis.tsx` renders `Math.random()` redness/asymmetry values. The legacy Streamlit prototype computes area/redness/border metrics | Repo link **withheld**. This is the §1.4 safety gate — fix it in the SkinTrack- repo first |
| E10 | HeartWire OS | Q-10 open | Repo README: the live URL serves the static export (the corrupted one). Prisma `trackId` is a FK | Architecture says the live URL serves (B) |
| E11 | Agent suite | Q-07/Q-08 open | `workflows-and-automations/agents/agent-team`: SKILL.md specs, manifest, deploy scripts (Managed Agents), eval fixtures including adversarial cases; runner records but **does not grade** | "Claude Agent SDK" and "MCP" removed; evals reported as ungraded |
| E12 | JonnyJr | not audited | Owner: JonnyJr is now the agent bench + Obsidian second brain. The old `agents/JonnyJr` research README (static "coverage 85%" badge) is **not** linked | Shown as personal tooling; the links go to the agent bench only |

## Repo actions outside this site (owner)

1. **SkinTrack-** (under reconstruction — lower priority, per owner): when rebuilt, delete or replace the README's image-analysis and melanoma claims; remove or clearly gate the `Math.random()` analysis view. Then re-wire `repoUrl` in `src/content/projects/skintrack.ts`.
2. **MindMap**: commit one run of `rls_isolation_tests.sql` (output) → this closes R3 and P2-06 for MindMap.
3. **Intro-to-Mech-Design**: measure the link lengths, commit them to v4, and add a README that points to the final firmware.
4. **Modular-Knee-Brace**: commit the Phase 1 Python scripts (P1-11) and summarise the static study results.
