import type { Metadata } from "next";
import { COMPANY, SITE_URL } from "./site";

interface PageMetaInput {
  title: string;
  description: string;
  path: `/${string}`;
}

/**
 * Per-page metadata with canonical URL. Next.js replaces (does not merge)
 * nested openGraph/twitter objects, so the shared fields are repeated here.
 */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      locale: "en_US",
      siteName: COMPANY.displayName,
      images: ["/opengraph-image"],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}

const ORG_ID = `${SITE_URL}/#organization`;

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    // No schema.org type exists for freight carriers; MovingCompany would imply
    // household goods, which this authority excludes.
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    name: COMPANY.displayName,
    legalName: COMPANY.legalName,
    alternateName: COMPANY.shortName,
    description: COMPANY.description,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.jpg`,
    image: `${SITE_URL}/opengraph-image`,
    telephone: COMPANY.phone.e164,
    email: COMPANY.emails.admin,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: COMPANY.emails.admin,
        telephone: COMPANY.phone.e164,
      },
      { "@type": "ContactPoint", contactType: "safety", email: COMPANY.emails.safety },
      { "@type": "ContactPoint", contactType: "fleet and drivers", email: COMPANY.emails.fleet },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.region,
      postalCode: COMPANY.address.postalCode,
      addressCountry: COMPANY.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.latitude,
      longitude: COMPANY.geo.longitude,
    },
    areaServed: { "@type": "Country", name: "United States" },
    knowsAbout: ["Full truckload freight", "Interstate trucking", "General freight"],
    identifier: [{ "@type": "PropertyValue", propertyID: "USDOT", value: COMPANY.usdot }],
    sameAs: [COMPANY.saferHref],
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqJsonLd(items: readonly FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(trail: readonly { name: string; path: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

/** Serialize JSON-LD safely for a <script> tag (blocks `</script>` breakouts). */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
