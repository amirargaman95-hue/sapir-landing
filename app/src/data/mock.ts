// Mock data for /dashboard-preview — no DB, no auth, no persistence.

export type KPI = {
  label: string;
  value: string;
  delta?: string;
};

export const kpis: KPI[] = [
  { label: "השמות פעילות", value: "8", delta: "+2 החודש" },
  { label: "מועמדים בפייפליין", value: "23", delta: "+5 השבוע" },
  { label: "לידים השבוע", value: "5", delta: "+1 היום" },
  { label: "לקוחות פעילים", value: "11", delta: "+1 החודש" },
];

export type Placement = {
  id: string;
  candidate: string;
  client: string;
  role: string;
  startedAt: string;
  status: "תקופת התחייבות" | "הושמה" | "פעיל";
};

export const placements: Placement[] = [
  {
    id: "p1",
    candidate: "אבי צאיג",
    client: "יוסי הנה״ח",
    role: "מנהל חשבונות",
    startedAt: "2026-03-12",
    status: "פעיל",
  },
  {
    id: "p2",
    candidate: "נתנאל אלקרט",
    client: "יוסי הנה״ח",
    role: "הנה״ח שכר",
    startedAt: "2026-04-02",
    status: "תקופת התחייבות",
  },
  {
    id: "p3",
    candidate: "חאלד מלגזן",
    client: "יוסי הנה״ח",
    role: "מלגזן",
    startedAt: "2026-02-20",
    status: "פעיל",
  },
  {
    id: "p4",
    candidate: "ניסים",
    client: "יוסי הנה״ח",
    role: "מחסנאי",
    startedAt: "2026-04-18",
    status: "תקופת התחייבות",
  },
  {
    id: "p5",
    candidate: "עידן",
    client: "אוהד גיוס",
    role: "מנהל פרויקטים",
    startedAt: "2025-10-05",
    status: "פעיל",
  },
  {
    id: "p6",
    candidate: "אלינור",
    client: "מאיה גיוס",
    role: "אדמיניסטרציה",
    startedAt: "2026-04-25",
    status: "תקופת התחייבות",
  },
  {
    id: "p7",
    candidate: "נתנאל",
    client: "שלומי",
    role: "עובד תפעול",
    startedAt: "2026-04-06",
    status: "הושמה",
  },
];

export type Client = {
  id: string;
  name: string;
  industry: string;
  placements: number;
  lastActivity: string;
  contact: string;
};

export const clients: Client[] = [
  {
    id: "c1",
    name: "יוסי הנה״ח",
    industry: "פיננסים / הנה״ח",
    placements: 4,
    lastActivity: "2026-04-30",
    contact: "yossi",
  },
  {
    id: "c2",
    name: "אדמו גרופ",
    industry: "תעשייה",
    placements: 2,
    lastActivity: "2026-05-04",
    contact: "עידן תומר",
  },
  {
    id: "c3",
    name: "אוהד גיוס",
    industry: "גיוס / שירותים",
    placements: 1,
    lastActivity: "2026-04-22",
    contact: "אוהד / לריסה",
  },
  {
    id: "c4",
    name: "מאיה גיוס",
    industry: "אדמיניסטרציה",
    placements: 1,
    lastActivity: "2026-04-28",
    contact: "מאיה",
  },
  {
    id: "c5",
    name: "שלומי",
    industry: "תפעול",
    placements: 1,
    lastActivity: "2026-04-15",
    contact: "שלומי",
  },
];

export type CandidateStatus =
  | "חדש"
  | "בשיחה"
  | "נשלח למעסיק"
  | "הושמה"
  | "תקופת התחייבות";

export type Candidate = {
  id: string;
  name: string;
  role: string;
  status: CandidateStatus;
  client?: string;
  note?: string;
};

export const candidates: Candidate[] = [
  { id: "k1", name: "ענת לוי", role: "הנה״ח שכר", status: "חדש", note: "ניסיון 5 שנים" },
  { id: "k2", name: "מוטי שרון", role: "מלגזן", status: "חדש" },
  { id: "k3", name: "רונית כהן", role: "אדמיניסטרציה", status: "בשיחה", note: "פגישה ביום ד׳" },
  { id: "k4", name: "דודי אברהם", role: "מחסנאי", status: "בשיחה" },
  { id: "k5", name: "שירה מלכה", role: "מנהלת תפעול", status: "נשלח למעסיק", client: "אדמו גרופ" },
  { id: "k6", name: "יוסי בן-דוד", role: "הנה״ח", status: "נשלח למעסיק", client: "יוסי הנה״ח" },
  { id: "k7", name: "אלינור", role: "אדמיניסטרציה", status: "הושמה", client: "מאיה גיוס" },
  { id: "k8", name: "נתנאל", role: "עובד תפעול", status: "הושמה", client: "שלומי" },
  { id: "k9", name: "אבי צאיג", role: "מנהל חשבונות", status: "תקופת התחייבות", client: "יוסי הנה״ח" },
  { id: "k10", name: "חאלד", role: "מלגזן", status: "תקופת התחייבות", client: "יוסי הנה״ח" },
];

export type Lead = {
  id: string;
  name: string;
  phone: string;
  role: string;
  source: "וואטסאפ" | "טופס" | "המלצה";
  receivedAt: string;
};

export const leads: Lead[] = [
  { id: "l1", name: "רונן ברגר", phone: "054-555-1122", role: "מנהל מפעל", source: "וואטסאפ", receivedAt: "2026-05-06 09:14" },
  { id: "l2", name: "מירי שמש", phone: "052-444-9087", role: "הנה״ח", source: "טופס", receivedAt: "2026-05-05 17:30" },
  { id: "l3", name: "אסף הוד", phone: "050-333-2211", role: "מחסן + לוגיסטיקה", source: "המלצה", receivedAt: "2026-05-05 11:02" },
  { id: "l4", name: "אורית בן-עזרא", phone: "053-222-7788", role: "מנהלת אדמיניסטרציה", source: "וואטסאפ", receivedAt: "2026-05-04 15:45" },
  { id: "l5", name: "יואב גינדי", phone: "054-111-3344", role: "מלגזן", source: "טופס", receivedAt: "2026-05-03 19:20" },
  { id: "l6", name: "תמר ישראלי", phone: "052-666-5599", role: "מנהלת משאבי אנוש", source: "המלצה", receivedAt: "2026-05-03 10:10" },
  { id: "l7", name: "דניאל כהן", phone: "050-777-4422", role: "תפעול", source: "וואטסאפ", receivedAt: "2026-05-02 13:55" },
];

export type CalendarEvent = {
  date: number; // day of May 2026
  title: string;
  type: "interview" | "client" | "followup";
};

export const events: CalendarEvent[] = [
  { date: 7, title: "ראיון: ענת לוי", type: "interview" },
  { date: 8, title: "פגישה: יוסי הנה״ח", type: "client" },
  { date: 12, title: "Follow-up: אלינור", type: "followup" },
  { date: 14, title: "ראיון: מוטי שרון", type: "interview" },
  { date: 19, title: "פגישה: אדמו גרופ", type: "client" },
];
