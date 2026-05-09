# Final Round — Performance + Stop Criteria

A 93 → 55 regression is alarming. Before another optimization pass, **diagnose what changed**. Then ONE focused attempt. If still <85 after this round, **stop and submit the PR** with a "deferred performance" note — we'll iterate, not grind all night.

## STEP 1 — Sanity check (5 min)

The chunk names you mentioned (`0drmebz6v4i8_.js`, `10~x95jhs6ns3.js`) look like Turbopack hashes. **Confirm you're running production, not dev:**

```bash
cd app
rm -rf .next
NODE_ENV=production npm run build
NODE_ENV=production npm run start &
sleep 5
curl -s http://localhost:3000 | head -c 200
# Check for `next-route-announcer`, `__NEXT_DATA__` — production page should have these
```

If still seeing dev-shaped output, kill any stray `next dev` process:
```bash
lsof -ti:3000 | xargs -r kill -9
ps aux | grep -E 'next.*dev' | grep -v grep
```

Also: **what was the score on the LAST commit you pushed before this regression?** Roll back the last 2-3 commits in your branch, run Lighthouse, find the offender. Diff vs current. That's faster than blind optimization.

## STEP 2 — Lazy-load GSAP (the big win)

Yes — your instinct is right. GSAP + ScrollTrigger is ~70KB and used in only a few components. **Do this:**

```tsx
// In any component using gsap
import { useEffect, useRef } from "react";

export default function Component() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;
    let mounted = true;
    (async () => {
      const { default: gsap } = await import("gsap");
      if (!mounted || !ref.current) return;
      const ctx = gsap.context(() => {
        // your animations here
      }, ref.current);
      cleanup = () => ctx.revert();
    })();
    return () => { mounted = false; cleanup?.(); };
  }, []);

  return <div ref={ref}>...</div>;
}
```

Apply to: Hero, FullService (if it uses gsap), any other client component that imports gsap statically.

If a component uses ScrollTrigger:
```tsx
const { default: gsap } = await import("gsap");
const { ScrollTrigger } = await import("gsap/ScrollTrigger");
gsap.registerPlugin(ScrollTrigger);
```

## STEP 3 — Phosphor icons audit

For every file that imports from `@phosphor-icons/react`:

1. Confirm it imports the **SSR variant** for components that don't need interactivity:
   ```ts
   import { Compass } from "@phosphor-icons/react/dist/ssr";  // ✅ tree-shaken, SSR-only
   ```
   But for components with `useEffect` + dynamic icon swap, regular import is fine:
   ```ts
   import { Compass } from "@phosphor-icons/react";  // ✅ acceptable when needed client-side
   ```

2. Confirm **per-icon** imports, not barrel:
   ```ts
   import { Compass, Megaphone } from "@phosphor-icons/react";  // ✅
   import * as Icons from "@phosphor-icons/react";              // ❌ pulls everything
   ```

3. The ThreeReasons component has an `iconMap` of 5 icons. Verify only icons actually used in `usps` data are imported. Drop any that aren't referenced.

## STEP 4 — Stop grinding criteria

After STEPS 1-3, run Lighthouse one more time:

- **If Performance ≥ 85**: submit PR. We'll iterate from there.
- **If Performance ≥ 75 < 85**: submit PR with "deferred: bundle further reduction needs source-level decisions on gsap usage" note in PR body. We'll merge and iterate.
- **If Performance < 75**: stop. Commit current state to your branch. In the PR description, write:
  - "Performance currently X / mobile"
  - "Bottleneck: [the specific thing — main thread time, unused JS, LCP, CLS, etc.]"
  - "Deferred because: [one sentence — likely 'requires upgrading gsap loading pattern across components, beyond the safe-edit scope of this task']"
  - "Next steps for human review: [list]"

Do NOT keep iterating past this point. We can ship with 75 perf and improve later. We CANNOT ship a regression-causing PR.

## STEP 5 — DO NOT touch

- Do not install any new npm package (no bundle-analyzer, no compression-webpack-plugin, etc.)
- Do not upgrade Next.js, React, or any major dep
- Do not remove the marquee animation in Hero
- Do not remove the announcement bar
- Do not remove or modify any of the recently merged UI/UX changes (top header redesign, rotating role line, ThreeReasons hover effects, etc.)
- Do not touch sticky-stack section
- Do not delete video files

## Final note

The site is already live at https://sapir-landing.vercel.app and looks great. Performance optimization is important but **not at the cost of breaking what works**. We'd rather ship at 75 perf with great UX than 95 perf with broken animations or regressed visuals.

When you submit the PR, include final Lighthouse scores (mobile + desktop, all 4 categories) plus a clear list of what you changed. I'll review in the morning.

Goodnight. 🌙
