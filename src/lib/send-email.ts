/**
 * Sends a plain-text email to the company inbox through Web3Forms.
 *
 * Runs in the visitor's browser: the Web3Forms free plan only accepts
 * submissions from browsers, not from servers. The access key is public by
 * design (it can only send to the inbox it was created for). It is read from
 * WEB3FORMS_KEY, which next.config.ts builds into the browser bundle.
 * Get one at https://web3forms.com.
 */

export type SendResult = { ok: true } | { ok: false; reason: "not-configured" | "provider-error" };

export interface EmailMessage {
  subject: string;
  text: string;
  replyTo?: string;
}

/** What a server action returns once a form is valid and ready to email from the browser. */
export interface ReadyToSend<Values> {
  status: "send";
  email: EmailMessage;
  /** What the visitor typed, so a failed send never wipes the form. */
  values: Values;
}

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const SENDER_NAME = "STG Website";
const SEND_TIMEOUT_MS = 10_000;

/** Keeps user text in a subject line to one short line. */
export function oneLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, " ").slice(0, 60);
}

async function readSuccess(response: Response): Promise<{ success: boolean; detail: string }> {
  try {
    const body: unknown = await response.json();
    if (typeof body !== "object" || body === null) return { success: false, detail: "empty response" };
    const { success, message } = body as { success?: unknown; message?: unknown };
    return { success: success === true, detail: typeof message === "string" ? message : "" };
  } catch {
    return { success: false, detail: "response was not JSON" };
  }
}

export async function sendEmail(
  message: EmailMessage,
  logTag: string,
  accessKey: string | undefined = process.env.WEB3FORMS_KEY,
): Promise<SendResult> {
  if (!accessKey) {
    console.error(`[${logTag}] Email delivery is not configured. Set WEB3FORMS_KEY.`);
    return { ok: false, reason: "not-configured" };
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        from_name: SENDER_NAME,
        subject: message.subject,
        message: message.text,
        ...(message.replyTo ? { replyto: message.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });

    const { success, detail } = await readSuccess(response);
    if (!response.ok || !success) {
      console.error(`[${logTag}] Web3Forms responded ${response.status}: ${detail}`);
      return { ok: false, reason: "provider-error" };
    }
    return { ok: true };
  } catch (error: unknown) {
    console.error(`[${logTag}] Failed to reach Web3Forms`, error);
    return { ok: false, reason: "provider-error" };
  }
}

interface DeliveryOutcomes<State, Values> {
  sent: State;
  failed: (values: Values) => State;
}

/**
 * Wraps a server action for useActionState: the server validates the form,
 * then the browser emails it and turns the result into the form's next state.
 */
export function withBrowserDelivery<State, Values>(
  serverAction: (previous: State, formData: FormData) => Promise<State | ReadyToSend<Values>>,
  logTag: string,
  outcomes: DeliveryOutcomes<State, Values>,
): (previous: State, formData: FormData) => Promise<State> {
  return async (previous, formData) => {
    const result = await serverAction(previous, formData);
    if (!isReadyToSend(result)) return result;
    const sent = await sendEmail(result.email, logTag);
    return sent.ok ? outcomes.sent : outcomes.failed(result.values);
  };
}

function isReadyToSend<State, Values>(value: State | ReadyToSend<Values>): value is ReadyToSend<Values> {
  return typeof value === "object" && value !== null && (value as { status?: unknown }).status === "send";
}
