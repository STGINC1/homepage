import type { FaqItem } from "./seo";
import { COMPANY } from "./site";

export type IconName = "truck" | "route" | "map" | "handshake" | "shield" | "clock" | "chat" | "box";

export interface Service {
  slug: string;
  icon: IconName;
  title: string;
  summary: string;
  points: readonly string[];
}

export const SERVICES: readonly Service[] = [
  {
    slug: "full-truckload",
    icon: "truck",
    title: "Full Truckload (FTL)",
    summary:
      "One shipper, one truck, one destination. Your freight rides alone, so there are no extra stops or extra handling between pickup and delivery.",
    points: [
      "Dedicated equipment for your load",
      "Fewer touches, less risk of damage",
      "Straight-through transit",
    ],
  },
  {
    slug: "interstate-long-haul",
    icon: "route",
    title: "Interstate Long-Haul",
    summary:
      "We run all 48 contiguous states under our own interstate authority, and keep you posted from pickup until the bills are signed.",
    points: [
      "Active FMCSA operating authority",
      "Status updates while your load is on the road",
      "Proof of delivery after unloading",
    ],
  },
  {
    slug: "regional-midwest",
    icon: "map",
    title: "Regional Midwest Freight",
    summary:
      "Home base sits on the I-71 / I-75 corridor between Cincinnati and Dayton, a quick reach to Ohio, Indiana, Kentucky and the wider Midwest.",
    points: [
      "Quick reach from Mason, OH",
      "Ohio, Indiana and Kentucky lanes",
      "Good fit for repeat regional loads",
    ],
  },
  {
    slug: "shippers-receivers-brokers",
    icon: "handshake",
    title: "Shippers, Receivers & Brokers",
    summary:
      "We look after everyone on the load. Shippers get a carrier that shows up, receivers get freight on their schedule, and brokers get a carrier they can call again.",
    points: [
      "Carrier packet ready for brokers",
      "Receiver appointments respected",
      "Insurance certificate on request",
    ],
  },
] as const;

export interface Step {
  title: string;
  body: string;
}

export const PROCESS_STEPS: readonly Step[] = [
  {
    title: "Request a quote",
    body: "Send pickup, delivery, dates and load details, or just call. We come back with a clear rate.",
  },
  {
    title: "Book & dispatch",
    body: "Once you confirm, we lock in the pickup window and send the rate confirmation.",
  },
  {
    title: "On the road",
    body: "Your freight runs straight through. You get updates from the people driving it, not a call center.",
  },
  {
    title: "Delivered",
    body: "The load is signed for and proof of delivery is sent, so billing is simple.",
  },
] as const;

export interface Reason {
  icon: IconName;
  title: string;
  body: string;
}

export const REASONS: readonly Reason[] = [
  {
    icon: "shield",
    title: "Authorized & on record",
    body: `Active USDOT ${COMPANY.usdot}. Check our public FMCSA record any time.`,
  },
  {
    icon: "box",
    title: "99.9% delivered right",
    body: "Load after load, 99.9% delivered correctly. Pickup windows and delivery appointments are commitments.",
  },
  {
    icon: "handshake",
    title: "Everyone on the load",
    body: "Shippers, receivers and brokers each get a straight answer, honest updates and freight that arrives.",
  },
  {
    icon: "route",
    title: "Drivers are partners",
    body: "Our drivers are partners, not numbers. Respected drivers take better care of your freight.",
  },
] as const;

export const FAQS: readonly FaqItem[] = [
  {
    question: "What kind of freight does Samarkand Transport Group haul?",
    answer:
      "We are authorized to haul general freight (property, not household goods) as an interstate for-hire motor carrier. Call us with your commodity and we will confirm fit.",
  },
  {
    question: "Where are you located, and where do you deliver?",
    answer: `Our home base is ${COMPANY.address.oneLine}, between Cincinnati and Dayton. We run all 48 contiguous states, coast to coast.`,
  },
  {
    question: "Are you licensed and insured?",
    answer: `Yes. We operate under USDOT ${COMPANY.usdot} with active authority from the FMCSA. A certificate of insurance is available on request.`,
  },
  {
    question: "How do I get a freight quote?",
    answer: `Use the quote form on our contact page or call ${COMPANY.phone.display}. Share the pickup and delivery locations, dates, weight and any special requirements.`,
  },
  {
    question: "Do you work with freight brokers?",
    answer:
      "Yes. We work with shippers, receivers and freight brokers. Ask for our carrier packet and we will send it over.",
  },
] as const;
