# Answers — Round 3

Yes, go ahead and wrap up. A few constraints to keep in mind for the last stretch:

## Color contrast — be careful

**Do not change brand colors** to fix contrast. The brand palette is intentional:
- Navy: `#0E1A2E`, `#14213D`, `#1A365D`
- Cream/paper: `#F5F1EA`
- Accent yellow-green: `#DCEB5C`
- Amber/gold: `#d4a857` (legacy), eyebrow accents

If contrast fails on a small element (caption, eyebrow, secondary text), you may:
- Slightly darken/lighten the **muted** text variants (`rgba(245, 241, 234, 0.6)` → `0.72` is fine)
- Increase font weight on small text (300 → 400)
- Increase font size

You may NOT:
- Change any of the named brand colors above
- Change the hero background gradients
- Change the `.tint` / `.accent` / `.gold` color values
- "Fix" the sticky-stack section colors

If a contrast fix REQUIRES changing a brand color → skip it and report it in the PR description as "deferred — needs design decision". Don't force it.

## Server / port handling

To kill stale processes on port 3000:
```bash
# Find PID
lsof -ti:3000 | xargs -r kill -9
# Or use a different port
PORT=3100 npm run start &
```

Run Lighthouse against whichever port you actually started.

## Before opening the PR — final checklist

1. Performance ≥95 mobile (you said 93 → should be doable with the fixes)
2. A11y ≥95 mobile
3. Best Practices ≥95 mobile
4. SEO ≥95 mobile
5. Run `npm run build` once more — must complete with NO errors and NO new warnings
6. Visual diff on hero, FullService (sticky stack), HowItWorks — must look identical
7. PR body includes:
   - Before scores (clean build): Perf X / A11y Y / BP Z / SEO W
   - After scores: Perf 95+ / A11y 95+ / BP 95+ / SEO 95+
   - Bullet list of changes by category
   - Any deferred items (e.g., color contrast fixes that need design approval)

If you can't reach 95+ on any single category after the fixes, **stop and report** in the PR — don't keep grinding. We'll decide together if 93 is acceptable or if we need a different approach.

Go.
