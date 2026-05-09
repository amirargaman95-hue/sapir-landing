# Sapir Landing — Jules Roadmap

5 משימות, מסודרות לפי impact על העסק של ספיר.
כל משימה עצמאית — תעתיק אותה ל-Jules כשתרצה, אחת בכל פעם.

---

## ✅ Task 0 — DONE (in progress now)
Lighthouse Performance + A11y + SEO ≥95.

---

## 🔥 Task 1 — Analytics + Pixel + Event Tracking

### Goal
ספיר תדע בכל רגע: כמה אנשים נכנסו לאתר, מאיפה, מה לחצו, וכמה הפכו ללידים. בלי זה כל שינוי באתר זה ניחוש.

### Scope
- Repo: `amirargaman95-hue/sapir-landing`
- Branch base: `feature/v3-conversion-redesign`
- New branch: `jules/analytics-tracking`

### What to add
1. **Google Analytics 4** — script loaded via `next/script` with `strategy="afterInteractive"`. Use placeholder ID `G-XXXXXXXXXX` (Amir will replace before production)
2. **Facebook Pixel** — base pixel + standard events. Placeholder ID `000000000000000`
3. **Event tracking** — emit events on:
   - WhatsApp button click (anywhere on page) → `whatsapp_click` with `location` param (hero/sticky/footer/etc)
   - FAQ open → `faq_open` with `question` text
   - Section reached (scroll depth 25/50/75/100%) → `scroll_depth`
   - Phone number click (if any `tel:` link) → `phone_click`
   - Email click → `email_click`
4. **UTM persistence** — capture UTM params from URL, store in localStorage, attach to all WhatsApp links so Sapir sees source on incoming messages

### Implementation notes
- All tracking code in a single utility file: `app/src/lib/analytics.ts`
- Use a `useAnalytics()` hook for components to call `track('event_name', {...})`
- Do NOT track personally identifiable info (names, phone numbers from forms)
- Add `<noscript>` fallback for GA4 if needed
- Respect Do Not Track header

### Acceptance criteria
- All 5 event types fire correctly (verify via browser devtools network tab → look for GA4 + FB requests)
- Build passes, no TypeScript errors
- Lighthouse scores must NOT regress below 95 in any category
- README section added explaining how to swap placeholder IDs for real ones

### Out of scope
- Conversion-rate experiments (A/B tests)
- Server-side analytics
- Cookie consent banner (separate task)

---

## 🔥 Task 2 — SEO Schema + Sitemap + Open Graph

### Goal
Google ידחוף את האתר של ספיר מעל המתחרים בחיפוש. כשמשתפים בוואטסאפ — יראו תמונה מקצועית.

### Scope
- New branch: `jules/seo-schema-og`

### What to add
1. **JSON-LD structured data** in `app/src/app/layout.tsx`:
   - `LocalBusiness` schema for Sapir Azulay
   - `Person` schema (name, jobTitle, knowsAbout, sameAs with social links)
   - `ProfessionalService` schema (services offered, areaServed: Israel)
   - `FAQPage` schema (auto-generated from FAQ component data)
2. **Open Graph metadata** in layout + per-page overrides:
   - `og:title`, `og:description`, `og:image` (1200x630), `og:type`, `og:url`
   - Twitter Card variant: `twitter:card="summary_large_image"`
3. **Sitemap** at `app/src/app/sitemap.ts` (Next.js convention) — list all routes
4. **Robots.txt** at `app/src/app/robots.ts` — allow all, point to sitemap
5. **Canonical URLs** — every page has `<link rel="canonical">`
6. **Hebrew meta tags** — `<html lang="he" dir="rtl">`, `<meta name="language" content="Hebrew">`

### Open Graph image
Create one OG image at `app/public/og-image.png` (1200x630). If image generation isn't possible, use the existing `app/public/img/sapir-real.webp` or `sapir-profile.webp` and resize/crop. Note the actual file name used in the PR.

### Acceptance criteria
- Validate JSON-LD at https://validator.schema.org/ (Jules: just verify the JSON is valid against schemas, no need to actually submit)
- Run `curl http://localhost:3000 | grep -E 'og:|twitter:|application/ld'` — should show all tags
- `/sitemap.xml` and `/robots.txt` accessible after build
- No regression on Lighthouse scores

### Out of scope
- Submitting sitemap to Google Search Console
- Changing copy / page titles

---

## 🔥 Task 3 — Image Responsive Sweep

### Goal
מובייל מהיר ב-50%. גוגל מתגמל אתרים שלא מבזבזים נתונים סלולריים.

### Scope
- New branch: `jules/responsive-images`

### What to do
1. Audit every `<Image>` and `<img>` in `app/src/components/**`
2. For each image:
   - Ensure `width` + `height` are explicit (prevents layout shift)
   - Use `next/image` if not already
   - Provide `sizes` prop matching the actual rendered size at each breakpoint
   - Below-fold images: `loading="lazy"`
   - LCP image (hero): `priority` + `fetchPriority="high"`
3. Convert any remaining JPG/PNG in `app/public/img/` to WebP (keep originals as fallback)
4. Add `app/public/img/` directory README explaining naming convention

### Hard constraints
- DO NOT touch `app/public/videos/v5.mp4`, `v6.mp4` — leave video files alone
- DO NOT change image content or art direction
- Visual diff must be zero

### Acceptance criteria
- Mobile Lighthouse Performance ≥97 (currently 95+ from Task 0, this should push higher)
- No layout shift (CLS = 0)
- Build passes

### Out of scope
- Image compression beyond format conversion
- New images / illustrations

---

## 🟡 Task 4 — Bundle Audit + Dead Code Removal

### Goal
האתר קל יותר, נטען מהר, פחות זיכרון בנייד.

### Scope
- New branch: `jules/bundle-cleanup`

### What to do
1. Run `du -sh app/.next/static/chunks/* | sort -h` after build, document top 10 biggest chunks in PR body
2. Identify unused dependencies:
   - `npx depcheck` (or manual check) — list deps in package.json not actually imported
   - Remove confirmed-unused deps from `package.json`
3. Identify dead files:
   - Components in `app/src/components/` never imported anywhere
   - Old assets in `app/public/` that no live code references
   - List for review in PR body — DO NOT auto-delete on first pass
4. Check Phosphor icons — ensure per-icon imports, not whole library
5. Check Framer Motion / GSAP — ensure tree-shakeable imports

### Hard constraints
- DO NOT delete files on this pass — list them in PR body for human review
- DO NOT remove deps that are dev-only (eslint, prettier, types) even if "unused"

### Acceptance criteria
- PR body includes: chunk size table, candidates for deletion, deps removed
- Build passes after dep removals
- Lighthouse Performance ≥97

---

## 🟡 Task 5 — TypeScript Strict + Type Cleanup

### Goal
פחות באגים בעתיד. כל שינוי בקוד יהיה בטוח יותר.

### Scope
- New branch: `jules/typescript-strict`

### What to do
1. Enable strict mode in `tsconfig.json`: `"strict": true`, `"noUncheckedIndexedAccess": true`
2. Find all `any` types in `app/src/` and replace with proper types
3. Find all `// @ts-ignore` and either fix or convert to `// @ts-expect-error` with comment
4. Add return types to all exported functions
5. Run `npm run build` — must pass with zero TS errors

### Hard constraints
- DO NOT change runtime behavior
- DO NOT add new dependencies (e.g., `zod`)
- If a type fix would require restructuring code → leave as `any` and note in PR

### Acceptance criteria
- `tsc --noEmit` passes with strict mode
- Zero `any` types except where explicitly justified with comment
- Build passes

---

## הסדר המומלץ

1. ✅ Task 0 — done now
2. 🔥 Task 1 — Analytics (חיוני)
3. 🔥 Task 2 — SEO + OG (חיוני)
4. 🔥 Task 3 — Responsive images (השלמת Task 0)
5. 🟡 Task 4 — Bundle cleanup (תחזוקה)
6. 🟡 Task 5 — TypeScript (תחזוקה ארוכת טווח)

**תזרים:**
- Task 1, 2, 3 = עוצרים ב-3 שבועות, רץ אחד בכל שבוע
- Task 4, 5 = כשיש זמן, פחות דחוף
- בין משימה למשימה → אני סוקר PR לפני מיזוג
