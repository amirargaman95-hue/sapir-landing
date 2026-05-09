# Answers — Round 2

Good progress. Here's the path forward:

## On the 500 errors — fix this FIRST

Yes, **wipe `.next` and rebuild clean**. The 500 errors on JS chunks during Lighthouse usually mean stale dev artifacts mixed with production build, or the dev server got confused. They are almost certainly inflating the score artificially low — fix this before any further optimization.

```bash
cd app
rm -rf .next
npm run build
# Verify build succeeded with no errors
npm run start &
sleep 8
# Sanity check before Lighthouse:
curl -I http://localhost:3000
curl -s http://localhost:3000 -o /dev/null -w "%{http_code}\n"
# Now run Lighthouse
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-clean.json --form-factor=mobile --quiet
```

If after a clean rebuild the 500s are STILL there in the Lighthouse run, it's a real bug in routing or chunk loading. In that case, paste the exact error path (e.g. `/_next/static/chunks/...js`) and I'll help diagnose. Don't keep optimizing on top of a broken build — the numbers won't be meaningful.

## Priority order

**1. Clean rebuild + remeasure** (above). I expect Performance to jump from 65 → 80+ just from fixing the 500s.

**2. Fix the 3 accessibility issues NEXT.** They are quick wins and give immediate Lighthouse score boost:
   - `target-size` — make tap targets ≥24×24px (usually a button/link with too-small padding)
   - `aria-hidden-focus` — element with `aria-hidden="true"` contains a focusable child. Either remove `aria-hidden` or remove the focusable child
   - `label-content-name-mismatch` — visible label text ≠ accessible name (mismatch between what eye reads and what screen reader announces). Usually a button with emoji/icon + `aria-label` that don't match. Make them consistent.

These should each be 1-2 line fixes.

**3. THEN tackle JavaScript bundle.**
   - Run `du -sh app/.next/static/chunks/* | sort -h | tail -10` to find biggest chunks
   - The "unused JavaScript" warning usually points at: (a) heavy libraries imported globally that should be code-split, (b) Phosphor icons importing the full set instead of individual icons, (c) Framer Motion or similar imported eagerly
   - For Phosphor: ensure imports are `import { Compass } from "@phosphor-icons/react/dist/ssr"` (per-icon, SSR variant), NOT `import * as Phosphor from "@phosphor-icons/react"`
   - Check `app/page.tsx` and verify the dynamic imports you added actually have `{ ssr: false, loading: () => null }` for components that don't need SSR

## One more thing — Lighthouse environment

Make sure you're running Lighthouse against the **production server** (`npm run start`, port 3000), NOT the dev server (`npm run dev`). Dev mode is intentionally slow and will never score well. If you've been running against dev — that alone explains the score of 65.

## Summary

1. `rm -rf .next` → clean build → fix 500s → remeasure (10 min)
2. Fix 3 a11y issues (10 min)
3. Re-run Lighthouse — report new scores
4. If Performance still <95: bundle analysis with the commands above

If you hit 95+ before step 4, skip it and proceed to PR submission.
