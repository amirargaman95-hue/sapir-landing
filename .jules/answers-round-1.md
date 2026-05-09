# Answers to your clarifying questions

**1. Mobile vs Desktop scores**
Hard requirement is **mobile ≥95** in all 4 categories. Desktop should also reach ≥95 if achievable, but if there is any tradeoff, prioritize mobile. Report both in PR body either way.

**2. Sticky-stack section constraints**
You **may** optimize *assets* (image format conversion, `loading="lazy"` on below-fold images, dimension attributes, font subsetting) inside `.sticky-stack-section` as long as the rendered result is pixel-identical. What is OFF LIMITS:
- The CSS positioning (`position: sticky`, `top: calc(...)`, `--i` offset variable)
- The `overflow: clip` on `.sticky-stack-section` (just fixed — was `overflow: hidden` and broke sticky)
- The visual design — colors, spacing, gradients, watermark numbers, hover effects

If asset optimization is the primary fix, do it. Just keep visuals identical.

**3. Environment variables**
No env vars needed. The site is a static Hebrew landing page with no backend calls. `npm install && npm run build && npm run start` should work out of the box. If something fails for missing vars, that is itself a bug — fix it (with a sensible default or remove the dependency) rather than asking for secrets.

**4. Custom Next.js — bundle analyzer**
**Do not install `@next/bundle-analyzer` or any new npm dependency.** The Next.js version is non-standard and adding plugins risks breakage. If you need to inspect bundle size:
- Use `du -sh app/.next/static/chunks/* | sort -h` after build
- Read the build summary that Next prints
- Inspect `app/.next/analyze/` if it gets generated automatically

If you genuinely cannot diagnose without the analyzer, stop and ask before installing.

**5. Codebase access**
The repo is now live at:
**https://github.com/amirargaman95-hue/sapir-landing**

- Branch to base off: `feature/v3-conversion-redesign`
- The Next.js app is at `app/` (root of repo has `index.html` + `preview-hero.html` which are legacy — ignore them)

Reconnect / re-clone the repo and you should see everything.

---

## One extra constraint I forgot to put in the original task

The repo contains real video files at `app/public/videos/v5.mp4` and `v6.mp4` (used in the WhatsAppWall / VideoWall components). **Do not re-encode or replace them** — the file references in code expect those exact filenames and dimensions. If video loading hurts perf, fix it via `preload="none"`, `poster` attribute, or lazy mounting — NOT by touching the file itself.
