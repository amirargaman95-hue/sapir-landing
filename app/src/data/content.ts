// Sapir Azulay — landing copy as data (easy to edit later)
// All copy is first-person feminine. No prices. No "סוכנות" as self-description.

// WhatsApp URLs — each section gets its own pre-filled text for clearer lead attribution.
const WA_BASE = "https://wa.me/972555688102";
const wa = (text: string) => `${WA_BASE}?text=${encodeURIComponent(text)}`;

export const WHATSAPP_URL = wa(
  "שלום ספיר, ראיתי את הדף שלך — אני מנהל/ת מפעל ואני מחפש/ת לגייס עובד. אפשר לדבר?"
);
export const WHATSAPP_URL_HERO = wa(
  "שלום ספיר, ראיתי את הדף שלך — אני מנהל/ת מפעל ואני מחפש/ת לגייס עובד. אפשר לדבר?"
);
export const WHATSAPP_URL_FINAL = wa(
  "שלום ספיר, ראיתי את הסרטונים וההמלצות בדף שלך. אשמח לדבר על גיוס למפעל שלי."
);
export const WHATSAPP_URL_MID = wa(
  "שלום ספיר, ראיתי את הדף שלך ואני רוצה לשמוע איך זה עובד אצלך."
);
export const PHONE = "+972555688102";
export const EMAIL = "sapiraz2204@gmail.com";
export const INSTAGRAM_URL = "https://www.instagram.com/sapir___azulay/";
export const FACEBOOK_URL = "https://www.facebook.com/sapir.azulay.2025/";
export const BUSINESS_HOURS = "א׳–ה׳ 08:00–18:00 · מענה אישי בשעות פעילות";

export const hero = {
  eyebrow: "מגייסת עובדים למפעלים בישראל · כמעט עשור בשטח",
  headline: "אתה מנהל את המפעל. אני מביאה לך את העובדים.",
  subheadline:
    "אני ספיר. מגייסת למפעלים בישראל — מהגדרת התפקיד ועד שהעובד נקלט ונשאר. בלי ערימות קו״ח, בלי צוות שיחזור אליך. את/ה מדבר/ת איתי, אני מטפלת בכל השאר.",
  ctaPrimary: "דבר איתי בוואטסאפ",
  ctaMicrocopy: "ספיר אחת עונה — לא צוות שירות לקוחות.",
  trustTag: "ספיר אחת עונה — לא צוות שירות לקוחות",
  trustStrip: [
    "אדם אחד",
    "תשלום רק אחרי גיוס",
    "ספיר עונה אישית",
    "30 יום אחריות בכתב",
  ],
  imageSrc: "/sapir/portrait.webp",
  imageFallback: "/img/sapir-real.webp",
  imageAlt: "ספיר אזולאי, מגייסת למפעלים",
};

export const credentialBullets = [
  "כמעט עשור בגיוס ו-HR — יועצת קריירה מוסמכת מבר-אילן",
  "מתמחה במפעלים בישראל: ייצור, לוגיסטיקה, מתכת, פלסטיק, מזון",
  "כל התהליך אצלי — מהגדרת התפקיד ועד שהעובד נקלט ונשאר",
];

export const fullService = {
  eyebrow: "תהליך העבודה",
  title: "ככה זה עובד אצלי.",
  intro:
    "אתה ממשיך לנהל את העסק. אני דואגת לכל מה שצריך כדי להביא לך את העובד הנכון.",
  items: [
    {
      iconName: "Compass",
      title: "הגדרת המשרה",
      body: "יושבת איתך לחשיבה מחודשת על התפקיד — לדייק מה הצורך האמיתי של העסק.",
    },
    {
      iconName: "Megaphone",
      title: "פרסום משרה",
      body: "בפלטפורמות הכי רלוונטיות לתחום ולסוג התפקיד.",
    },
    {
      iconName: "MagnifyingGlass",
      title: "איתור אקטיבי",
      body: "פנייה ישירה למועמדים איכותיים — גם לאלה שלא מחפשים עבודה כרגע.",
    },
    {
      iconName: "Users",
      title: "מאגר מחפשי עבודה",
      body: "מהקהילה והמאגר האישי שצברתי במשך כמעט עשור.",
    },
    {
      iconName: "FileText",
      title: "סינון קו״ח",
      body: "יסודי ומקצועי. אתה מקבל ממני את ה-1–2 שבאמת מתאימים — לא ערימה.",
    },
    {
      iconName: "PhoneCall",
      title: "ראיונות עומק",
      body: "שיחה של 30–60 דקות עם כל מועמד. בודקת התאמה מקצועית ואישיותית.",
    },
    {
      iconName: "Target",
      title: "התאמה מדויקת",
      body: "בין המועמד לתפקיד ולארגון. לא רק כישורים — גם תרבות.",
    },
    {
      iconName: "HandHeart",
      title: "ליווי וקליטה",
      body: "גם אחרי שהוא מתחיל לעבוד — אני עדיין כאן. הצלחה אצלי = שהוא נשאר.",
    },
    {
      iconName: "ChatCircle",
      title: "מעקב שוטף",
      body: "בקשר איתך לאורך כל התהליך — תמיד יודע איפה זה עומד.",
    },
  ],
};

export const businessModel = {
  eyebrow: "אופן העבודה",
  title: "תשלום רק אחרי שגייסת.",
  sub: "אחרי שאני מסננת ומאתרת — המועמד מגיע אליך לראיון פרונטלי לאישור סופי. אין תשלום עד שהוא נקלט אצלך. 30 יום אחריות בכתב — מעוגן בחוזה. כולל מקרה של פיטור משמעתי בתוך תקופת ההתחייבות. אם העובד עוזב, אני מחליפה אותו על חשבוני.",
  highlights: [
    { label: "ראיון פרונטלי אצלך לאישור סופי", iconName: "UserCheck" },
    { label: "תשלום רק אחרי גיוס בפועל", iconName: "CheckCircle" },
    { label: "30 יום אחריות בכתב — מעוגן בחוזה", iconName: "ShieldCheck" },
  ],
};

export const valueProp = {
  eyebrow: "הערך למפעל שלך",
  title: "אתה ממשיך לייצר. אני מביאה את העובדים.",
  paragraphs: [
    "אתה לא צריך להתעסק עם סינונים, ראיונות וחיפושים. אתה ממשיך להריץ את הקווים, לדבר עם הלקוחות, לנהל את המפעל.",
    "אני מביאה את העובדים הנכונים — אנשים שעוזרים למפעל לצמוח, להתייצב, ולרוץ בלי כאבי ראש של תחלופה.",
  ],
  pillars: [
    { iconName: "Briefcase", title: "אתה ממשיך לנהל", body: "בלי לבזבז יום על ראיונות. מתמקד בייצור ובלקוחות." },
    { iconName: "ChartLineUp", title: "צוות שמחזיק", body: "העובד הנכון = פחות תחלופה, פחות חזרה לאפס." },
    { iconName: "Clock", title: "בלי בזבוז זמן", body: "כמעט עשור בשטח. מזהה עובד טוב מהר — חוסכת לך שעות." },
  ],
};

export type Credential = { iconName: string; metric: string; label: string; sub?: string };
export const credentials: Credential[] = [
  { iconName: "Briefcase", metric: "כמעט עשור", label: "ניסיון בגיוס עובדים", sub: "כמעט עשור בשטח" },
  { iconName: "Buildings", metric: "בר-אילן", label: "יועצת קריירה מוסמכת", sub: "תואר רשמי בייעוץ קריירה" },
  { iconName: "Sparkle", metric: "מאפס", label: "מחלקת משאבי אנוש שהקמתי", sub: "כל התהליך — סורסינג, סינון, קליטה" },
  { iconName: "Factory", metric: "מפעלים", label: "התמחות עיקרית", sub: "30–300 עובדים, ייצור ולוגיסטיקה" },
];

export type PainCard = { number: string; title: string; body: string };
export const pains: PainCard[] = [
  {
    number: "01",
    title: "חברת השמה שלחה מועמד שעזב אחרי חודש",
    body: "שילמת הרבה. קיבלת קו״ח. המועמד התפטר. ואת/ה מתחיל מחדש — בלי החזר, בלי אחריות בכתב.",
  },
  {
    number: "02",
    title: "השקעת זמן בראיונות שלא הובילו לכלום",
    body: "5 קו״ח לא רלוונטיים, 4 ראיונות, יום עבודה שלם — ובסוף שום השמה. הזמן שלך עולה כסף.",
  },
  {
    number: "03",
    title: "מצאת עובד טוב — אבל לא מצאת איך לשמר אותו",
    body: "הוא התחיל. אחרי שבועיים הוא לא מתאים. אף אחד לא ליווה את הקליטה. הוא הולך.",
  },
];

export type Step = { number: string; title: string; body: string };
export const steps: Step[] = [
  {
    number: "01",
    title: "שיחה איתי",
    body: "אני יושבת איתך. מבינה את הצרכים שלך, את התרבות, את התפקיד הספציפי. בלי טפסים.",
  },
  {
    number: "02",
    title: "סינון אישי",
    body: "אני פוגשת את המועמדים בעצמי, מסננת איתם, ומציגה לך רק 1-2 שעברו את הסינון.",
  },
  {
    number: "03",
    title: "ליווי קליטה",
    body: "אחרי שהוא מתחיל — אני עדיין כאן. כי הצלחה אצלי = שהוא נשאר.",
  },
];

export type VideoItem = {
  id: string;
  title: string;     // employer name + role hired (e.g., "אבי, מפעל מתכת — ראש צוות ייצור")
  company: string;   // factory / business name
  role: string;      // role that was filled
  src: string;       // TBD — replace with actual video file
  poster: string;    // TBD — replace with thumbnail
  durationSec: number;
  caption: string;   // short quote-style caption
  who: string;       // who's talking (name + title)
};
// 6 וידאו חוסמים מחכים מספיר. מערך ריק = section מוסתר.
// SocialProof.tsx מסנן TBD ונופל לאלגנטיות empty-state כשאין וידאו אמיתי.
export const videos: VideoItem[] = [];

export const usps = [
  {
    iconName: "UserCircle",
    title: "אדם אחד, לא חברה",
    body: "אני מהשיחה הראשונה ועד שהעובד נקלט. בלי רכזות, בלי הקלדות, בלי מי-מטפל-במי. רק אני ואת/ה.",
  },
  {
    iconName: "ShieldCheck",
    title: "30 יום אחריות בכתב",
    body: "מעוגן בחוזה. אם העובד עוזב — אני מחליפה אותו על חשבוני. גם אם פיטרת אותו מסיבה משמעתית בתוך התקופה — מחליפה.",
  },
  {
    iconName: "Briefcase",
    title: "כמעט עשור. בר-אילן. בוטיק.",
    body: "יועצת קריירה מוסמכת מבר-אילן. ניסיון של כמעט עשור בגיוס ו-HR. בוטיק — לקוח שלי מקבל תעדוף ובלעדיות, לא ערימה של 50 משרות במקביל.",
  },
] as const;

export const proofs = Array.from({ length: 9 }, (_, i) => ({
  src: `/proofs/proof${i + 1}.jpeg`,
  alt: `הודעת וואטסאפ ${i + 1} ממעסיק`,
}));

// TODO: Sapir approval needed — שמות לקוחות לפני פרסום פומבי.
// TrustBadges.tsx לא מסתיר אוטומטית כשהמערך ריק, לכן נשארים השמות הקיימים עד אישור.
export const trustClients = [
  "אדמו גרופ",
  "יוסי הנה״ח",
  "אוהד גיוס",
  "מאיה גיוס",
  "שלומי",
];

export type FAQItem = { q: string; a: string; openByDefault?: boolean };
export const faqs: FAQItem[] = [
  {
    q: "כמה זמן לוקח לגייס לתפקיד?",
    a: "תלוי בתפקיד. אחרי שיחת אפיון איתך אני אומרת לך מה ריאלי — בלי הבטחות מהאוויר.",
    openByDefault: true,
  },
  {
    q: "כמה זה עולה?",
    a: "תשלום רק אחרי גיוס מוצלח. המחיר נסגר איתך בשיחה לפי תפקיד ודחיפות — בלי מחירונים בדף.",
  },
  {
    q: "מה קורה אם העובד לא מתאים?",
    a: "אם הוא נושר בתוך תקופת ההתחייבות (30 יום) — אני מחפשת לך מחליף. גם אם פיטרת אותו מסיבה משמעתית בתוך אותה תקופה. זמן ההחלפה תלוי בתפקיד.",
  },
  {
    q: "איך את בודקת שמועמד באמת רציני?",
    a: "אחרי כמעט עשור בתחום אני מזהה דפוסי התנהגות. בריאיון הטלפוני יש שאלות שמחזירות את האמת — מי באמת רוצה את התפקיד ומי מבזבז זמן.",
  },
  {
    q: "קשה למצוא עובדים — באמת תצליחי?",
    a: "כן, קשה. בגלל זה אני עובדת בבלעדיות עם הלקוחות שלי, ולא רצה אחרי 50 משרות במקביל. בוטיק = פוקוס.",
  },
  {
    q: "ואם הוא יעזוב מהר?",
    a: "30 יום אחריות בכתב. עזב מעצמו או פוטר מסיבה משמעתית בתוך 30 יום — מחליפה.",
  },
];

export const aboutManifesto = {
  eyebrow: "עליי",
  heading: "מפעל מגייס מאדם, לא מטופס.",
  body: [
    "כמעט עשור אני בגיוס. למדתי שקו״ח לא חסר במשק — חסרים אנשים שיודעים להקשיב למעסיק ולמועמד באותה רמה של אכפתיות.",
    "אני לא שולחת ערימות. כל מועמד שמגיע אליך עבר אצלי שיחת עומק אישית. בגלל זה העובדים שאני מגייסת — נשארים.",
  ],
  highlight: "אני מתעסקת בפרטים הקטנים, כדי שאתה תמשיך להתעסק בגדולים.",
  imageSrc: "/sapir/portrait-2.png",
  imageFallback: "/sapir/portrait.webp",
  imageAlt: "ספיר אזולאי",
};

export const aboutCopy = {
  heading: "אני ספיר. כמעט עשור בגיוס לתעשייה.",
  body: [
    "בת 30, יועצת קריירה מוסמכת מבר-אילן, כמעט עשור בגיוס ו-HR.",
    "התחלתי כשכירה, הקמתי מחלקת משאבי אנוש מאפס, ובשלב מסוים הבנתי שאני טובה בזה — אז החלטתי לייצר את הכסף לעצמי, לא לארגון.",
    "אני בוטיק. לא מטפלת באלפי משרות כמו חברת השמה — כל לקוח שלי הוא לקוח פרימיום, ועובד מולי בלעדית. אני זאת שעובדת על המשרה, לא רכזת. בגלל זה התהליך מהיר ופרקטי.",
  ],
  quote: {
    text: "12 עובדים, כמעט אפס נשירה, ובלעדיות מולה.",
    author: "מנהל מפעל ברזל",
    role: "לקוח קבוע",
  },
  imageSrc: "/img/sapir-profile.webp",
  imageAlt: "ספיר אזולאי",
};

export type Industry = {
  niche: string;
  title: string;
  meta: string;
  quote?: string;
};
// 5 סקטורי-ליבה — בלי quotes גנריים. רק התחומים שספיר מגייסת אליהם בפועל.
export const industries: Industry[] = [
  { niche: "ברזל ומתכת", title: "ברזל, מתכת ומסגרות", meta: "ראש צוות ייצור · ריתוך · CNC · הרכבה" },
  { niche: "פלסטיק וגומי", title: "פלסטיק וגומי", meta: "מהנדס תהליך · אופרטור · מנהל איכות" },
  { niche: "מזון ומשקאות", title: "מזון ומשקאות", meta: "אופה ראשי · אחראי משמרת · מנהל ייצור" },
  { niche: "לוגיסטיקה ומחסנים", title: "לוגיסטיקה ומחסנים", meta: "מנהל מחסן · מנהל הפצה · ראש צוות" },
  { niche: "ייצור תעשייתי", title: "ייצור תעשייתי כללי", meta: "מנהל מפעל · מנהל אחזקה · מנהל משמרת" },
];

export const finalCta = {
  heading: "מעוניין? בוא נדבר 5 דקות.",
  sub: "וואטסאפ ישיר אליי. בלי בוטים, בלי טפסים. אני עונה אישית — לרוב עד שעה בשעות פעילות.",
  hours: "א׳–ה׳ 08:00–18:00 · מענה אישי בשעות פעילות",
};

export type ActiveJob = { title: string; sector: string };
export const activeJobs: ActiveJob[] = [
  { title: "מנהל אחזקה", sector: "ברזל ומתכת" },
  { title: "רתך אינרטי", sector: "ברזל ומתכת" },
  { title: "מפעיל CNC", sector: "ברזל ומתכת" },
  { title: "מנהל ייצור", sector: "מזון ומשקאות" },
  { title: "ראש צוות ייצור", sector: "פלסטיק וגומי" },
  { title: "מנהל איכות", sector: "פלסטיק וגומי" },
  { title: "מנהל מחסן", sector: "לוגיסטיקה" },
  { title: "חשמלאי תעשייתי", sector: "ייצור תעשייתי" },
];
