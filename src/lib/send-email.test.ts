import { afterEach, describe, expect, it, vi } from "vitest";
import { type ReadyToSend, sendEmail, withBrowserDelivery } from "./send-email";

const MESSAGE = { subject: "Quote request: A → B", text: "Hello", replyTo: "dana@example.com" };

function mockFetch(status: number, body: unknown) {
  const fetchMock = vi.fn().mockResolvedValue(
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } }),
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("sendEmail (Web3Forms)", () => {
  it("reports not-configured and makes no request when the access key is missing", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchMock = mockFetch(200, { success: true });

    const result = await sendEmail(MESSAGE, "test", "");

    expect(result).toEqual({ ok: false, reason: "not-configured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts the message with the access key and reply-to address", async () => {
    const fetchMock = mockFetch(200, { success: true, message: "Email sent successfully!" });

    const result = await sendEmail(MESSAGE, "test", "public-key");

    expect(result).toEqual({ ok: true });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.web3forms.com/submit");
    expect(JSON.parse(init.body)).toEqual({
      access_key: "public-key",
      from_name: "STG Website",
      subject: MESSAGE.subject,
      message: MESSAGE.text,
      replyto: MESSAGE.replyTo,
    });
  });

  it("treats success:false as a provider error even with HTTP 200", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockFetch(200, { success: false, message: "Invalid access key" });

    expect(await sendEmail(MESSAGE, "test", "bad-key")).toEqual({ ok: false, reason: "provider-error" });
  });

  it("reports a provider error when the network fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));

    expect(await sendEmail(MESSAGE, "test", "public-key")).toEqual({ ok: false, reason: "provider-error" });
  });
});

describe("withBrowserDelivery", () => {
  type State = { status: "idle" } | { status: "done" } | { status: "failed"; values: { name: string } };
  const outcomes = {
    sent: { status: "done" } as State,
    failed: (values: { name: string }): State => ({ status: "failed", values }),
  };
  const ready: ReadyToSend<{ name: string }> = { status: "send", email: MESSAGE, values: { name: "Dana" } };

  it("passes a finished server state through without sending", async () => {
    const fetchMock = mockFetch(200, { success: true });
    const action = withBrowserDelivery(async (): Promise<State> => ({ status: "idle" }), "test", outcomes);

    expect(await action({ status: "idle" }, new FormData())).toEqual({ status: "idle" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns the failed state with the typed values when sending fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubEnv("WEB3FORMS_KEY", "");
    const action = withBrowserDelivery(async () => ready, "test", outcomes);

    expect(await action({ status: "idle" }, new FormData())).toEqual({ status: "failed", values: { name: "Dana" } });
    vi.unstubAllEnvs();
  });

  it("returns the sent state when the email goes out", async () => {
    vi.stubEnv("WEB3FORMS_KEY", "public-key");
    mockFetch(200, { success: true });
    const action = withBrowserDelivery(async () => ready, "test", outcomes);

    expect(await action({ status: "idle" }, new FormData())).toEqual({ status: "done" });
    vi.unstubAllEnvs();
  });
});
