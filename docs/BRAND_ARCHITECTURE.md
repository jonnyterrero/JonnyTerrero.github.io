# Brand architecture

Frozen 2026-10-05. Source of truth in code: `src/lib/brand.ts`.

```
Jonathan Terrero — Founder & Engineer
└── Terrero Labs — independent biomedical systems + software studio
    ├── Products      MindMap (flagship) · GastroGuard · SkinTrack+
    ├── Engineering   Colour-Sorting Robotic Arm · Modular Knee Brace · BME Visualizations
    ├── Research      Stryker RSA teardown · Healthcare supply chain · Co–Cr review
    └── Systems       Agent Bench · HeartWire OS (working title — rename planned)
```

## Rules

- **Terrero Labs** is the parent. Describe it as "my independent studio" — never imply headcount.
- **HeartWire** is reserved for a future cardiac sensing product line. No HeartWire product page exists, because no cardiac artifact exists yet (claim ratchet).
- **HeartWire OS** keeps its name only until Q-06 is answered, and is labelled "working title" everywhere.
- Product colour appears only as an identifier dot or rail: MindMap violet, GastroGuard amber, SkinTrack+ green.

## Resolved conflict

`portfolio-audit.md` C20 made HeartWire the venture. `terrero-labs-restructuring-plan.md` replaces that with Terrero Labs as the umbrella and HeartWire as the cardiac line. This site follows the restructuring plan. Reverting is a one-file change in `brand.ts` plus the `DIVISIONS` copy in `src/lib/projects.ts`.

## Open

- Q-05: minors are shown as **Physics and Computer Science** (matches the existing résumé and your stated profile). Change `BRAND.minors` if that's wrong.
- Domain and trademark checks before buying a Terrero Labs domain.
