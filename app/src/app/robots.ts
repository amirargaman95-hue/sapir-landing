import type { MetadataRoute } from "next";

// NOTE: placeholder domain until production domain is finalized.
// Override via NEXT_PUBLIC_SITE_URL in .env.production.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sapirazulay.co.il";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard-preview"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
