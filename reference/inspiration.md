# Sapir — Reference & Inspiration Map

**Direction:** A — Editorial Documentary (locked 2026-05-06)
**DNA:** Linear · Granola · Justin Welsh · New Yorker · boutique exec search

## ראשיים — DNA הליבה
| URL | מה לקחת ממנה |
|---|---|
| [linear.app](https://linear.app) | אסימטרי, הירארכיה מושלמת, Tailwind מינימליסטי, scroll-stick רגעים |
| [granola.ai](https://granola.ai) | פלטה חמה (קרם/שחור), טיפוגרפיה כבדה, sense of premium-without-flash |
| [justinwelsh.me](https://justinwelsh.me) | סולו authority, תמונה אישית גדולה, אזורי טקסט נשימים |
| [lennysnewsletter.com](https://lennysnewsletter.com) | סמכות עם hierarchy ברור, social proof צפוף-עדין |
| [pipdecks.com](https://pipdecks.com) | wall של מוצרים/הוכחות בגריד עריכותי |

## מ-Boutique exec search (ה-positioning הקרוב ביותר)
| URL | מה לקחת ממנה |
|---|---|
| [egonzehnder.com](https://egonzehnder.com) | מאופק, סיפורי לקוחות בעריכה קולנועית, טיפוגרפיה כבדה |
| [heidrick.com](https://heidrick.com) | דמויות אנושיות מוצגות בכובד, תמונות פורטרט מודעות |
| [russellreynolds.com](https://russellreynolds.com) | וידאו ראיונות עם clients — איך להציג עדויות בכבוד |

## Aggregators לבדיקה במהלך עיצוב
- [godly.website](https://godly.website) — חיפוש לפי קטגוריה
- [land-book.com](https://land-book.com) — landing pages חיוניים
- [siteinspire.com](https://siteinspire.com) — סינון מבוסס תגיות
- [httpster.net](https://httpster.net) — winners 2026

## טיפוגרפיה (לב הסגנון Editorial)
- **כותרות:** Frank Ruhl Libre 600-900 (Google Fonts) — serif עברי משובח, מנכיח את הכובד
- **בודי:** Assistant 400-500 (Google Fonts) — נקי, נושמ
- **מספרים:** wrap ב-`<span dir="ltr">` ב-RTL; טבעי ב-Frank Ruhl
- אסור Heebo Black ככותרת ב-direction A — זה כיוון B/C

## פלטה (קרובה לקרם וכחול-טורקיז)
| צבע | קוד | שימוש |
|---|---|---|
| קרם בסיס | `#FAF8F4` | רקע ראשי |
| שחור פחם | `#1C1C1E` | טקסט + headlines |
| ציאן עמוק (accent יחיד) | `#1F4E5F` | CTAs, links, accents |
| שחר (subtle) | `#E8E2D5` | borders, dividers |
| לבן מלוכלך (cards) | `#FDFCFA` | רקע כרטיסים |

**אקסנט אחד בלבד.** אסור להוסיף עוד צבעים. כל highlight = הציאן.

## אנימציות (subtle, רק ב-2-3 רגעים)
1. **Hero image fade-up** — fromTo opacity 0→1 + y 30→0 ב-1.2s ease
2. **WhatsApp screenshots cascade** — stagger 0.08s, נפילה רכה כשמגיעים לסקציה
3. **Section pinning ל-2-3 שניות** ב-Solution + USPs (scroll-stick) — GSAP ScrollTrigger pin

לא יותר. שאר הדף **שקט**.

## Hebrew typography rules (מ-pattern_hebrew_voice.md)
- כותרות active voice ("המפעלים שגייסו" לא "מפעלים שגויסו")
- מספרים: 5 שעות, לא "five hours"
- CTA ישירים: "דברי איתי" / "וואטסאפ" / "בואי נדבר" — קצרים
- אין English embedded inside Hebrew text

## Israeli market adaptations
- WhatsApp = ה-CTA (לא טופס ארוך)
- תמונה אמיתית של ספיר > stock — חובה
- בעלי מפעלים בני 45-60 = הקהל. גרוויטה > דרמה
- אין אילוסטרציות AI / icon-art

## אנטי-פטרנים בכיוון A
- ❌ gradients יותר מ-1 (יקלקל את האסטטיקה השקטה)
- ❌ glow effects / neon
- ❌ scroll-snap מלא (יותר מדי "Apple-y")
- ❌ 3D elements
- ❌ glassmorphism
- ❌ אנימציה על כל אלמנט
