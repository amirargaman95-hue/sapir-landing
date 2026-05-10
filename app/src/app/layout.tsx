import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-heebo",
});

const SITE_URL = "https://sapir-landing.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ספיר אזולאי — מביאה עובדים איכותיים למפעלים ובוטיקים",
  description:
    "אני ספיר. רכזת גיוס והשמה לבעלי מפעלים ובוטיקים בישראל. כמעט עשור ניסיון. תשלום רק אחרי גיוס. תקופת אחריות בכתב.",
  alternates: { canonical: SITE_URL },
  keywords: [
    "גיוס עובדים למפעלים",
    "השמה למפעלים",
    "רכזת גיוס",
    "גיוס בוטיק",
    "ספיר אזולאי",
    "גיוס בישראל",
    "headhunter ישראל",
  ],
  openGraph: {
    title: "ספיר אזולאי — מביאה עובדים איכותיים למפעלים ובוטיקים",
    description:
      "אתה מנהל את המפעל. אני מביאה לך את העובדים. תשלום רק אחרי גיוס — תקופת אחריות בכתב על כל השמה.",
    url: SITE_URL,
    siteName: "ספיר אזולאי",
    locale: "he_IL",
    type: "website",
    images: [
      {
        url: "/sapir/portrait.webp",
        width: 1200,
        height: 630,
        alt: "ספיר אזולאי — רכזת גיוס והשמה",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ספיר אזולאי — מביאה עובדים איכותיים למפעלים ובוטיקים",
    description:
      "אתה מנהל את המפעל. אני מביאה לך את העובדים. תקופת אחריות בכתב.",
    images: ["/sapir/portrait.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdProfessional = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ספיר אזולאי — שירותי גיוס והשמה",
  alternateName: "Sapir Azulay Recruitment",
  description:
    "שירותי גיוס והשמה אישיים לבעלי מפעלים ובוטיקים בישראל. כמעט עשור ניסיון. תשלום רק לאחר גיוס בפועל.",
  url: SITE_URL,
  image: `${SITE_URL}/sapir/portrait.webp`,
  telephone: "+972-55-568-8102",
  areaServed: { "@type": "Country", name: "Israel" },
  serviceType: "גיוס והשמה",
  priceRange: "₪₪",
  founder: {
    "@type": "Person",
    name: "ספיר אזולאי",
    jobTitle: "רכזת גיוס והשמה",
  },
  sameAs: [
    "https://www.instagram.com/sapir___azulay/",
    "https://www.facebook.com/sapir.azulay.2025/",
  ],
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "ספיר אזולאי",
  jobTitle: "רכזת גיוס והשמה",
  worksFor: { "@type": "Organization", name: "ספיר אזולאי — שירותי גיוס" },
  knowsAbout: [
    "גיוס עובדים",
    "השמת עובדים",
    "ניהול תהליכי גיוס",
    "מפעלים ועסקים בישראל",
  ],
  url: SITE_URL,
  image: `${SITE_URL}/sapir/portrait.webp`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdProfessional),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
