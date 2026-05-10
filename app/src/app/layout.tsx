import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-heebo",
});

export const metadata: Metadata = {
  title: "ספיר אזולאי — מביאה עובדים איכותיים למפעלים ובוטיקים",
  description:
    "אני ספיר. רכזת גיוס והשמה לבעלי מפעלים ובוטיקים בישראל. כמעט עשור ניסיון. תשלום רק אחרי גיוס. תקופת אחריות בכתב.",
  openGraph: {
    title: "ספיר אזולאי — מביאה עובדים איכותיים למפעלים ובוטיקים",
    description:
      "אתה מנהל את המפעל. אני מביאה לך את העובדים. תשלום רק אחרי גיוס — תקופת אחריות בכתב על כל השמה.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
