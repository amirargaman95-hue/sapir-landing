// Sapir 9-step process — canonical content for the promo video.

export type Step = {
  id: number;
  title: string;
  body: string;
  iconKind:
    | "compass"
    | "megaphone"
    | "magnifier"
    | "users"
    | "filetext"
    | "phone"
    | "target"
    | "heart"
    | "chat";
};

export const STEPS: Step[] = [
  {
    id: 1,
    title: "הגדרת המשרה",
    body: "חשיבה מחודשת על התפקיד יחד עם בעל העסק — לדייק את הצורך האמיתי של הארגון.",
    iconKind: "compass",
  },
  {
    id: 2,
    title: "פרסום המשרה",
    body: "בפלטפורמות הרלוונטיות ביותר — לפי תחום וסוג התפקיד.",
    iconKind: "megaphone",
  },
  {
    id: 3,
    title: "איתור וחתירה",
    body: "סורסינג אקטיבי. פנייה אישית למועמדים פוטנציאליים שלא רואים את המודעה.",
    iconKind: "magnifier",
  },
  {
    id: 4,
    title: "מאגר מחפשי עבודה",
    body: "חיפוש בקהילת מחפשי העבודה והמאגר הקיים שלי — שנבנה לאורך כמעט עשור.",
    iconKind: "users",
  },
  {
    id: 5,
    title: "סינון ומיון קו״ח",
    body: "כל קו״ח עובר אצלי. אתה מקבל את ה-1-2 הרלוונטיים — לא ערימה.",
    iconKind: "filetext",
  },
  {
    id: 6,
    title: "ראיונות עומק",
    body: "שיחה טלפונית של 30-60 דקות. בדיקת התאמה מקצועית ואישיותית.",
    iconKind: "phone",
  },
  {
    id: 7,
    title: "התאמה מדויקת",
    body: "התאמה בין המועמד לאופי התפקיד והארגון. גם המועמד צריך להתאים — לא רק להיות מוכשר.",
    iconKind: "target",
  },
  {
    id: 8,
    title: "ליווי ושימור",
    body: "אחרי שהוא מתחיל — אני שם. ליווי קליטה ושימור בארגון. הצלחה = שהוא נשאר.",
    iconKind: "heart",
  },
  {
    id: 9,
    title: "מעקב שוטף",
    body: "התנהלות שוטפת מול בעל העסק — מעקב על התהליך לאורך כל הדרך.",
    iconKind: "chat",
  },
];
