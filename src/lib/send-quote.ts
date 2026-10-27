import type { QuoteInput } from "./quote-schema";

/**
 * Delivers a quote request by email through Resend's HTTP API.
 * Required env vars (server only):
 *   RESEND_API_KEY   – API key from resend.com
 *   QUOTE_TO_EMAIL   – inbox that receives quote requests
 *   QUOTE_FROM_EMAIL – verified sender, e.g. "STG Website <quotes@yourdomain.com>"
 */

export type SendResult = { ok: true } | { ok: false; reason: "not-configured" | "provider-error" };

interface MailConfig {
  apiKey: string;
  to: string;
  from: string;
}

function readConfig(): MailConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL;
  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

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

const SEND_TIMEOUT_MS = 10_000;

function oneLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, " ").slice(0, 60);
}

export async function sendQuote(quote: QuoteInput): Promise<SendResult> {
  const config = readConfig();
  if (!config) {
    console.error(
      "[quote] Email delivery is not configured. Set RESEND_API_KEY, QUOTE_TO_EMAIL, QUOTE_FROM_EMAIL.",
    );
    return { ok: false, reason: "not-configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: quote.email,
        subject: `Quote request: ${oneLine(quote.origin)} → ${oneLine(quote.destination)}`,
        text: formatQuoteText(quote),
      }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(`[quote] Resend responded ${response.status}: ${await response.text()}`);
      return { ok: false, reason: "provider-error" };
    }
    return { ok: true };
  } catch (error: unknown) {
    console.error("[quote] Failed to reach email provider", error);
    return { ok: false, reason: "provider-error" };
  }
}
