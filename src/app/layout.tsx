import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { ScrollEffects } from "@/components/scroll-effects";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteIntro, SiteIntroScript } from "@/components/site-intro";
import { organizationJsonLd } from "@/lib/seo";
import { COMPANY, SITE_URL } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const DEFAULT_TITLE = `${COMPANY.displayName} | Freight Trucking from Mason, OH`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${COMPANY.displayName}`,
  },
  description:
    "Full truckload freight across all 48 states from Mason, Ohio. 99.9% of loads delivered right. Authorized interstate carrier, USDOT 3986498. Call (513) 781-2423.",
  applicationName: COMPANY.displayName,
  keywords: [
    "trucking company Mason Ohio",
    "freight carrier Cincinnati",
    "full truckload carrier",
    "interstate trucking",
    "general freight hauling",
    "Samarkand Transport Group",
    "STG trucking",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: COMPANY.displayName,
    title: DEFAULT_TITLE,
    description: COMPANY.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: COMPANY.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
  category: "transportation",
};

export const viewport: Viewport = {
  themeColor: "#0b0f15",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-US"
      className={`${archivo.variable} ${inter.variable} antialiased`}
      // The intro script adds a class to <html> before React loads.
      suppressHydrationWarning
    >
      <head>
        <SiteIntroScript />
      </head>
      <body className="min-h-dvh">
        <SiteIntro />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ScrollEffects />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
