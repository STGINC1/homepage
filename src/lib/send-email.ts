/**
 * Sends a plain-text email to the company inbox through Resend's HTTP API.
 * Required env vars (server only):
 *   RESEND_API_KEY   – API key from resend.com
 *   QUOTE_TO_EMAIL   – inbox that receives website submissions
 *   QUOTE_FROM_EMAIL – verified sender, e.g. "STG Website <quotes@yourdomain.com>"
 */

export type SendResult = { ok: true } | { ok: false; reason: "not-configured" | "provider-error" };

export interface EmailMessage {
  subject: string;
  text: string;
  replyTo?: string;
}

interface MailConfig {
  apiKey: string;
  to: string;
  from: string;
}

const SEND_TIMEOUT_MS = 10_000;

function readConfig(): MailConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL;
  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

/** Keeps user text in a subject line to one short line. */
export function oneLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, " ").slice(0, 60);
}

export async function sendEmail(message: EmailMessage, logTag: string): Promise<SendResult> {
  const config = readConfig();
  if (!config) {
    console.error(
      `[${logTag}] Email delivery is not configured. Set RESEND_API_KEY, QUOTE_TO_EMAIL, QUOTE_FROM_EMAIL.`,
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
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
        subject: message.subject,
        text: message.text,
      }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(`[${logTag}] Resend responded ${response.status}: ${await response.text()}`);
      return { ok: false, reason: "provider-error" };
    }
    return { ok: true };
  } catch (error: unknown) {
    console.error(`[${logTag}] Failed to reach email provider`, error);
    return { ok: false, reason: "provider-error" };
  }
}
