import type { QuoteInput } from "./quote-schema";
import { oneLine, sendEmail, type SendResult } from "./send-email";

export type { SendResult } from "./send-email";

export function formatQuoteText(quote: QuoteInput): string {
  const lines: [string, string][] = [
    ["Name", quote.name],
    ["Company", quote.company || "—"],
    ["Email", quote.email],
    ["Phone", quote.phone || "—"],
    ["Pickup", quote.origin],
    ["Delivery", quote.destination],
    ["Pickup date", quote.pickupDate || "Flexible"],
    ["SMS consent", quote.smsConsent ? "Yes (checked the SMS opt-in box on the website form)" : "No"],
  ];
  const body = lines.map(([label, value]) => `${label}: ${value}`).join("\n");
  return `New quote request from the website\n\n${body}\n\nDetails:\n${quote.details || "—"}\n`;
}

/** Delivers a quote request to the company inbox. */
export function sendQuote(quote: QuoteInput): Promise<SendResult> {
  return sendEmail(
    {
      subject: `Quote request: ${oneLine(quote.origin)} → ${oneLine(quote.destination)}`,
      text: formatQuoteText(quote),
      replyTo: quote.email,
    },
    "quote",
  );
}
