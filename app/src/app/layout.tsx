import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Heebo, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-heebo",
});

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-frank",
});

// NOTE: placeholder domain until production domain is finalized.
// Override via NEXT_PUBLIC_SITE_URL in .env.production.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sapirazulay.co.il";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ספיר אזולאי — מגייסת עובדים למפעלים בישראל",
  description:
    "אני ספיר. מגייסת למפעלים בישראל. כמעט עשור בשטח. תשלום רק אחרי גיוס. 30 יום אחריות בכתב.",
  alternates: { canonical: SITE_URL },
  keywords: [
    "גיוס עובדים למפעלים",
    "השמה למפעלים",
    "מגייסת",
    "גיוס לתעשייה",
    "ספיר אזולאי",
    "גיוס בישראל",
    "headhunter ישראל",
  ],
  openGraph: {
    title: "ספיר אזולאי — מגייסת עובדים למפעלים בישראל",
    description:
      "אתה מנהל את המפעל. אני מביאה לך את העובדים. תשלום רק אחרי גיוס — 30 יום אחריות בכתב.",
    url: SITE_URL,
    siteName: "ספיר אזולאי",
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ספיר אזולאי — מגייסת עובדים למפעלים בישראל",
    description:
      "אתה מנהל את המפעל. אני מביאה לך את העובדים. 30 יום אחריות בכתב.",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#09090B",
};

const jsonLdProfessional = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ספיר אזולאי — שירותי גיוס והשמה",
  alternateName: "Sapir Azulay Recruitment",
  description:
    "גיוס אישי למפעלים בישראל. כמעט עשור בשטח. תשלום רק אחרי גיוס בפועל. 30 יום אחריות בכתב.",
  url: SITE_URL,
  image: `${SITE_URL}/sapir/portrait.webp`,
  telephone: "+972-55-568-8102",
  areaServed: { "@type": "Country", name: "Israel" },
  serviceType: "גיוס והשמה",
  founder: {
    "@type": "Person",
    name: "ספיר אזולאי",
    jobTitle: "מגייסת למפעלים",
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
    <html lang="he" dir="rtl" className={`${heebo.variable} ${frankRuhl.variable}`}>
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
      <body className="min-h-screen">
        {children}
        <CookieBanner />
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('consent', 'default', {
                  ad_storage: 'denied',
                  analytics_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied'
                });
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
        {CLARITY_ID ? (
          <Script id="clarity-init" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
