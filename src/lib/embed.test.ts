import { describe, expect, it } from "vitest";
import { isFramingAllowed, isZeusOrigin, parseZeusFrameMessage } from "./embed";

const SITE = "https://stgincs.com";
const headers = (entries: Record<string, string>) => new Headers(entries);

describe("isFramingAllowed", () => {
  it("blocks today's Zeus headers (frame-ancestors 'self')", () => {
    const h = headers({
      "x-frame-options": "SAMEORIGIN",
      "content-security-policy": "default-src 'self'; frame-ancestors 'self'; base-uri 'self'",
    });
    expect(isFramingAllowed(h, SITE)).toBe(false);
  });

  it("allows the page once our origin is listed, even if X-Frame-Options is still sent", () => {
    const h = headers({
      "x-frame-options": "SAMEORIGIN",
      "content-security-policy": "frame-ancestors 'self' https://stgincs.com https://www.stgincs.com",
    });
    expect(isFramingAllowed(h, SITE)).toBe(true);
    expect(isFramingAllowed(h, "https://www.stgincs.com")).toBe(true);
  });

  it("does not allow other sites or plain http", () => {
    const h = headers({ "content-security-policy": "frame-ancestors https://stgincs.com" });
    expect(isFramingAllowed(h, "https://evil.example")).toBe(false);
    expect(isFramingAllowed(h, "http://stgincs.com")).toBe(false);
  });

  it("supports wildcard subdomains", () => {
    const h = headers({ "content-security-policy": "frame-ancestors https://*.stgincs.com" });
    expect(isFramingAllowed(h, "https://www.stgincs.com")).toBe(true);
  });

  it("falls back to X-Frame-Options when there is no frame-ancestors", () => {
    expect(isFramingAllowed(headers({ "x-frame-options": "DENY" }), SITE)).toBe(false);
    expect(isFramingAllowed(headers({}), SITE)).toBe(true);
  });
});

describe("isZeusOrigin", () => {
  it("accepts the Zeus apex and www origins", () => {
    expect(isZeusOrigin("https://zeusplatform.net")).toBe(true);
    expect(isZeusOrigin("https://www.zeusplatform.net")).toBe(true);
  });

  it("rejects other origins and plain http", () => {
    expect(isZeusOrigin("http://www.zeusplatform.net")).toBe(false);
    expect(isZeusOrigin("https://zeusplatform.net.evil.example")).toBe(false);
    expect(isZeusOrigin("https://evil.example")).toBe(false);
  });
});

describe("parseZeusFrameMessage", () => {
  it("reads resize messages and rounds the height up", () => {
    expect(parseZeusFrameMessage({ type: "zeus:apply:resize", height: 1234.2 })).toEqual({
      type: "resize",
      height: 1235,
    });
  });

  it("reads scroll messages", () => {
    expect(parseZeusFrameMessage({ type: "zeus:apply:scroll", top: 480 })).toEqual({
      type: "scroll",
      top: 480,
    });
    expect(parseZeusFrameMessage({ type: "zeus:apply:scroll", top: 0 })).toEqual({
      type: "scroll",
      top: 0,
    });
  });

  it("ignores out-of-range or malformed values", () => {
    expect(parseZeusFrameMessage({ type: "zeus:apply:resize", height: 0 })).toBeNull();
    expect(parseZeusFrameMessage({ type: "zeus:apply:resize", height: 50_000 })).toBeNull();
    expect(parseZeusFrameMessage({ type: "zeus:apply:resize", height: Number.NaN })).toBeNull();
    expect(parseZeusFrameMessage({ type: "zeus:apply:resize", height: "900" })).toBeNull();
    expect(parseZeusFrameMessage({ type: "zeus:apply:scroll", top: -1 })).toBeNull();
  });

  it("ignores unknown types and non-objects", () => {
    expect(parseZeusFrameMessage({ type: "something:else", height: 900 })).toBeNull();
    expect(parseZeusFrameMessage("zeus:apply:resize")).toBeNull();
    expect(parseZeusFrameMessage(null)).toBeNull();
  });
});
