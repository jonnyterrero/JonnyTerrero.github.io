# jonnyterrero.github.io

Portfolio of Jonathan Terrero, founder of Terrero Labs. Live at https://jonnyterrero.github.io.

Next.js 15 (static export) · React 19 · TypeScript · Tailwind CSS 4, deployed to GitHub Pages by `.github/workflows/deploy-pages.yml` on every push to `main`.

## Where things live

| Path | What |
|---|---|
| `src/content/projects/*.ts` | One typed module per project, following the 10-section template in `docs/project-template.md` |
| `src/lib/projects.ts` | Schema, tiers (product / engineering / research / systems), and helpers |
| `src/lib/brand.ts` | Every name, descriptor, and identity string |
| `docs/PORTFOLIO-REBUILD-PLAN.md` | Task backlog and status log — **read this first** |
| `docs/evidence-log.md` | What each claim was verified against |

## Rules for content

Publish only claims that trace to code, a deployed artifact, or a committed measurement. Anything unmeasured goes in a `{ type: "pending" }` block — never an estimate. Health products state that they are not medical devices.

```bash
npm ci && npm run dev     # local
npm run build             # static export to out/
```
