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
  title: "ספיר אזולאי — מגייסת אישית למפעלים ועסקים בישראל",
  description:
    "אני ספיר. מגייסת אישית למפעלים ועסקים בישראל. כל השמה — תקופת התחייבות בכתב.",
  openGraph: {
    title: "ספיר אזולאי — מגייסת אישית למפעלים",
    description:
      "המפעלים שגייסו דרכי — הצוות שלהם עדיין שם. תקופת התחייבות בכתב על כל השמה.",
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
