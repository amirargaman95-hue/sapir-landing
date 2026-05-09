# Jules Task — Lighthouse Audit + Performance Fixes

## Goal
Run Lighthouse on the Sapir landing page (production build) and fix any issue that drops Performance, Accessibility, Best Practices, or SEO below 95. Report final scores in the PR description.

## Scope
- Repo: `sapir-landing/app/` (Next.js app)
- Branch base: `feature/v3-conversion-redesign`
- New branch: `jules/lighthouse-perf-2026-05-09`

## Allowed changes
- Image optimization: convert to WebP/AVIF, add `width`/`height`, `loading="lazy"` for below-fold, `priority` for LCP image
- Font loading: `next/font` with `display: swap`, preload critical weights only
- Bundle size: dynamic `import()` for heavy components below the fold
- Render-blocking resources: defer non-critical scripts
- Accessibility quick wins: missing `alt`, `aria-label`, color contrast fixes, focus-visible styles
- SEO: missing `<title>`, `<meta name="description">`, canonical, Open Graph, JSON-LD
- Add `next.config.js` optimizations (image domains, compress, etc.)

## Hard constraints — DO NOT TOUCH
- Any text content / copy (Hebrew strings stay verbatim)
- Visual design — no color, spacing, typography, layout changes
- The sticky-stack section (`.sticky-stack-section` in `app/src/app/globals.css` ~line 2490). Recently fixed — leave alone.
- Component logic / state / hooks — only structural perf changes
- Do NOT upgrade Next.js or any dependency major version
- Do NOT delete unused code unless directly causing a Lighthouse warning

## Important — non-standard Next.js
This repo uses a custom Next.js version. Read `node_modules/next/dist/docs/` BEFORE writing any code that uses Next.js APIs (Image, Font, Script, Link, Head, Metadata). Do not rely on training-data Next.js APIs without verifying.

## Acceptance criteria
1. `cd app && npm run build` succeeds with no new warnings
2. Lighthouse mobile run on built site: Performance ≥95, A11y ≥95, Best Practices ≥95, SEO ≥95
3. Visual diff: zero pixel changes on hero, FullService (sticky stack), HowItWorks, FAQ
4. PR description includes:
   - Before/after Lighthouse scores (4 categories, mobile + desktop)
   - List of changes grouped by category (Perf / A11y / SEO)
   - Any TODOs left unresolved with reason

## How to run Lighthouse
```bash
cd app
npm run build
npm run start &
sleep 5
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-before.json --form-factor=mobile --quiet
# fix issues
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-after.json --form-factor=mobile --quiet
```
Do NOT commit the lighthouse JSON files. Summarize scores in PR body.

## Out of scope
- Vercel deployment (do not push to production)
- Changes to `index.html`, `preview-hero.html` (legacy files at repo root)
- Changes to `promo-video/`, `.agents/`, `reference/`

## Definition of done
- PR opened against `feature/v3-conversion-redesign`
- All acceptance criteria met
- No conflicts with the base branch
