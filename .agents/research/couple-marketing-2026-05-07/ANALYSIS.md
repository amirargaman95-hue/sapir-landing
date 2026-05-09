# couple-marketing.co.il — Design Analysis & Sapir Mapping

**Date:** 2026-05-07
**Source pages analyzed:**
- `/campaign/` (paid landing — main funnel page)
- `/` (homepage)

**Files captured:**
- `01-campaign-FULL.png` — full campaign page screenshot
- `02-homepage-FULL.png` — full homepage screenshot
- `01-campaign-snapshot.md` — accessibility tree
- `portfolio-23/` — **all 23 portfolio examples** (1.webp – 23.webp)
- `portfolio-urls.json` — image manifest

---

## 1. Design DNA — extracted from live CSS

### Typography
| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| H1 (display) | **Modernist** (Hebrew sans) | **100px** | **900** | מסיבי. גובה שורה 100px = 1.0 |
| H2 | Modernist | 38px | 400 (light) | פער דרמטי בין H1 ל-H2 |
| Body | Assistant | ~16px | 400 | קריאות גבוהה |
| Buttons | Modernist | – | 400 | pill, radius 25px |

**Key trick:** הם שוברים פערי ייצוג בין H1 ל-H2 — H1 = thick black 900, H2 = light 400. זה מה שיוצר את ה"דרמה".

### Color palette (5 צבעים — הרבה!)
| Color | Hex | Used for |
|---|---|---|
| Dark teal | `#1A3234` | Hero bg, dark sections — חתימה |
| Cream | `#F8F7F2` | Light sections — alternating |
| White | `#FFFFFF` | Primary text on dark, card bg |
| Lavender | `#8D94FA` | **Primary CTA bg** — הסגול-לבנדר שהפך לחתימה |
| Hot pink | `#CC3366` | Secondary accent, highlight |
| Acid yellow | `#E6FF2A` | Pop accent (sparingly) |
| Body text | `#333333` | Body on light bg |

### Layout & components
- **Hero:** H1 ענק (100px) על dark teal, CTA כפתור pill לוונדר, scroll-indicator ↓
- **Letter-spaced subhead** (ה י י !) — gimmick: כל אות ב-span נפרד עם spacing
- **Carousel ענק** של 23 דפי נחיתה — זה ה-MVP שלהם, הוכחה ויזואלית טהורה
- **Dual CTA pair** קבוע: טלפון + WhatsApp, צבעים שונים, צמודים
- **Bullet list עם איקונים** (✓) — שורת ערך פשוטה
- **No video, no animation heavy** — סטטי כמעט לחלוטין

### 23 ניצ'ות ב-portfolio
ספא · נדל"ן · עו"ד · קבלן · צימרים · מנה"ח · מרצה · יועץ משכנתא · הדברה · הלוואות · קוסמטיקה (×2) · כושר קרבי · עו"ד גירושין · יום גיבוש · מעצבת פנים · ביטוח · מפיקת אירועים · ספר דיגיטלי · סדנת רכבים · החזרי מס

**הם לא מציגים B2B-תעשייה / מפעלים** — פער שספיר יכולה לתפוס.

---

## 2. מה לקחת לספיר ✅

### 2.1 Hero — Massive Display Heading (CRITICAL)
- כותרת **80-110px desktop**, weight 900 (כרגע ספיר נמוכה מדי)
- שורה אחת בולטת + שורה שנייה זוהרת בצבע אחר
- פער חד בין H1 ל-H2 (H1 ב-900, H2 ב-300-400)

### 2.2 Dual CTA pair (טלפון + WhatsApp)
- שניים צמודים, צבעים שונים, ב-2 מקומות בעמוד
- אצל ספיר: WhatsApp (primary, אמבר) + טלפון (secondary, ghost)

### 2.3 Carousel-as-Proof
- **זה החזק ביותר באתר שלהם.** 23 דפי נחיתה גוללים בלולאה אינסופית
- אצל ספיר → **23 צילומי וואטסאפ** של תיאומי ראיון/השמות מוצלחות, גוללים אופקית
- או: **6-9 case-studies** של מפעלים שגייסה (logo + תפקיד + תמונת עובד אמיתי)

### 2.4 Niche-specific H3 ("דף נחיתה ל-X")
- אצל ספיר: "מפעל מתכת בצפון" / "בית-דפוס באזור התעשייה דרום" / "מפעל מזון 120 עובדים"
- כל case בכותרת H3 ברורה — SEO + הוכחה

### 2.5 Cream + Dark Teal alternating
- כרגע ספיר היא 100% dark — מאבדת קצב ויזואלי
- להוסיף **section-cream** (`#F8F7F2`) לסקציות About / FAQ / Trust
- שאר הסקציות נשארות dark

### 2.6 Pill CTAs (radius 25-999px)
- ספיר כבר עושה את זה. נשאר.

### 2.7 בולט-list עם ✓ במקום פסקאות
- USPs / "מה כולל" — תמיד list עם איקונים, לא טקסט רץ

---

## 3. מה לא לקחת ❌

### 3.1 הפלטה הצעקנית (5 צבעים)
- **לבנדר (#8D94FA) + פינק (#CC3366) + צהוב חומצה (#E6FF2A)** = ילדותי, לא premium
- ספיר = ניצ'ה B2B-מפעלים-מנהלים → מקסימום **2 צבעים + 1 אקסנט** (Dark + Cream + Amber)

### 3.2 Modernist font
- נראית כמו פונט של עיצוב גרפי 2018, לא 2026
- ספיר נשארת עם **Heebo 900** ככותרת (או Frank Ruhl Libre אם רוצים editorial)

### 3.3 Letter-spacing trick (ה י י !)
- gimmick שפוגע בקריאות. אסור.

### 3.4 Hard pricing in hero ("1,300₪ בלבד!")
- ספיר = boutique. **אין מחירים בדף.** מתואם עם `voice.md`.

### 3.5 "Wix-feeling" stacking
- אצלם הסקציות ערומות בלי קצב — מרגיש page-builder
- ספיר חייבת **rhythm**: קצרה-ארוכה-קצרה, dark-cream-dark, image-heavy / text-heavy

### 3.6 Dense paragraphs
- אצלם פסקאות מהסוג "כבר 6 שנים שאנחנו עוזרים לבעלי עסקים..."
- ספיר → bullet-list / מספרים / ציטוטי לקוח, לא פסקאות מסבירות

### 3.7 חוסר וידאו
- couple-marketing אין וידאו — חולשה
- ספיר **חייבת VideoWall** (כבר בתוכנית) — וידאו עדויות = הופך אותה לפרימיום

---

## 4. החלטה — איזה כיוון לספיר?

### Direction X — "couple-marketing inspired" (recommended)
**לא להעתיק. לקחת מבנה + להחליף DNA:**

| Element | couple-marketing | Sapir version |
|---|---|---|
| Hero bg | Dark teal `#1A3234` | Dark `#0A0A0F` (כבר קיים) ✓ |
| H1 size | 100px | **100px** (להגדיל!) |
| H1 font | Modernist | **Heebo 900** או Frank Ruhl Libre 900 |
| Primary CTA | Lavender pill | **Amber pill** `#F2B65E` (כבר קיים) ✓ |
| Secondary CTA | Pink/white | Ghost-dark (כבר קיים) ✓ |
| Section bg pattern | Dark / cream alternating | **להוסיף cream alternating** |
| Proof carousel | 23 portfolio thumbnails | **9-23 WhatsApp screenshots** |
| Niche H3s | "דף נחיתה ל-X" | "מפעל X — Y עובדים" |
| Personality | "הזוג הצעיר" | "ספיר — אישה עצמאית עם משלחת" |
| Pricing | "1,300₪ בלבד" | אין מחירים |

### תוצאה:
ספיר מקבלת **את העוצמה של דף נחיתה ישראלי שנמכר** (כותרת ענקית, CTA-pair, carousel, ניצ'ות מפורטות), בלי לשלם את המחיר של "נראה זול" (פלטה צעקנית, פסקאות צפופות, פונט גנרי).

---

## 5. Next steps

1. **GATE 2 decision:** לאשר Direction X (התאמה מ-couple-marketing) — או להישאר עם Editorial Documentary המקורי
2. אם X מאושר → לעדכן `design-2026-05-06.md` עם הפלטה החדשה + spec ל-Hero ב-100px
3. לעדכן `Hero.tsx` ל-massive display
4. להוסיף `SectionCream` wrapper ל-globals.css
5. לבנות `WhatsAppCarousel.tsx` בסגנון carousel אינסופי (replaces או משלים את `WhatsAppWall.tsx`)
6. **דחוף:** להחליט האם 23 ה-case studies הם וואטסאפ או logo-grid

---

## 6. קישורים מקור

- Campaign page: https://couple-marketing.co.il/campaign/
- Homepage: https://couple-marketing.co.il/
- All 23 portfolio thumbnails saved in `portfolio-23/`
