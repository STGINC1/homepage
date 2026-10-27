/**
 * Single source of truth for company facts.
 * Carrier details match the public FMCSA SAFER snapshot for USDOT 3986498.
 * Keep name, address and phone identical everywhere (local SEO relies on it).
 */

/** Live domain (matches the company email domain). Override with NEXT_PUBLIC_SITE_URL. */
const PRODUCTION_URL = "https://stgincs.com";

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.NODE_ENV === "production") return PRODUCTION_URL;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const COMPANY = {
  legalName: "Samarkand Transport Group Inc",
  displayName: "Samarkand Transport Group",
  shortName: "STG",
  tagline: "From the Silk Road to the open road.",
  description:
    "Samarkand Transport Group (STG) is an authorized for-hire interstate motor carrier based in Mason, Ohio, hauling general freight across all 48 contiguous states for shippers, receivers and brokers.",
  phone: {
    display: "(513) 781-2423",
    e164: "+15137812423",
    href: "tel:+15137812423",
  },
  address: {
    street: "6510 Mallard Ct",
    city: "Mason",
    region: "OH",
    postalCode: "45040",
    country: "US",
    oneLine: "6510 Mallard Ct, Mason, OH 45040",
    mapsHref: "https://www.google.com/maps/search/?api=1&query=6510+Mallard+Ct+Mason+OH+45040",
  },
  geo: { latitude: 39.3601, longitude: -84.3099 },
  emails: {
    admin: "admin@stgincs.com",
    safety: "safety@stgincs.com",
    fleet: "fleet@stgincs.com",
  },
  usdot: "3986498",
  saferHref:
    "https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=3986498",
  operation: "Authorized For-Hire · Interstate",
  cargo: "General Freight",
  milesLastYear: 150_000,
  milesYear: 2024,
  statesServed: 48,
  deliveryAccuracy: "99.9%",
} as const;

/** Online driver application hosted on Zeus. Zeus lists stgincs.com in frame-ancestors, so /apply shows it inline. */
export const APPLY_URL = "https://www.zeusplatform.net/a/b5759868bb905979306c637e3a4c5069";

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Drive With Us" },
  { href: "/apply", label: "Apply" },
  { href: "/contact", label: "Contact" },
] as const;

/** Who to email for what. Shown on the contact page and footer. */
export const EMAIL_CONTACTS = [
  {
    email: COMPANY.emails.admin,
    label: "General & quotes",
    description: "Rates, new shipments, billing and anything else.",
  },
  {
    email: COMPANY.emails.safety,
    label: "Safety & compliance",
    description: "Insurance certificates, carrier packets and safety questions.",
  },
  {
    email: COMPANY.emails.fleet,
    label: "Fleet & drivers",
    description: "Dispatch, equipment and driver inquiries.",
  },
] as const;

export const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "SMS Terms & Conditions" },
] as const;

export type NavHref = (typeof NAV_LINKS)[number]["href"];
