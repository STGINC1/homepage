import { describe, expect, it } from "vitest";
import { formDataToObject, parseQuote } from "./quote-schema";
import { createRateLimiter } from "./rate-limit";
import { faqJsonLd, organizationJsonLd, serializeJsonLd } from "./seo";
import { formatQuoteText } from "./send-quote";
import { COMPANY } from "./site";

const VALID = {
  name: "Dana Shipper",
  company: "Acme Foods",
  email: "dana@acme.test",
  phone: "(513) 555-0199",
  origin: "Mason, OH",
  destination: "Atlanta, GA",
  pickupDate: "2026-11-03",
  details: "26 pallets, 40,000 lbs",
  website: "",
};

describe("parseQuote", () => {
  it("accepts a complete request and normalizes the phone number", () => {
    const result = parseQuote(VALID);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.phone).toBe("5135550199");
  });

  it("allows optional fields to be blank", () => {
    const result = parseQuote({ ...VALID, company: "", phone: "", pickupDate: "", details: "" });
    expect(result.ok).toBe(true);
  });

  it("returns one message per invalid field", () => {
    const result = parseQuote({ ...VALID, name: "", email: "nope", phone: "123" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.fieldErrors).sort()).toEqual(["email", "name", "phone"]);
    }
  });

  it("rejects submissions where the honeypot is filled", () => {
    const result = parseQuote({ ...VALID, website: "http://spam.test" });
    expect(result.ok).toBe(false);
  });

  it("rejects an invalid pickup date", () => {
    const result = parseQuote({ ...VALID, pickupDate: "not-a-date" });
    expect(result.ok).toBe(false);
  });
});

describe("formDataToObject", () => {
  it("reads known fields and ignores unknown or file entries", () => {
    const fd = new FormData();
    fd.set("name", "Dana");
    fd.set("$ACTION_ID_abc", "x");
    fd.set("details", new Blob(["file"]));
    const obj = formDataToObject(fd);
    expect(obj.name).toBe("Dana");
    expect(obj.details).toBe("");
    expect(obj).not.toHaveProperty("$ACTION_ID_abc");
  });
});

describe("createRateLimiter", () => {
  it("blocks after the limit and recovers after the window", () => {
    const limiter = createRateLimiter(2, 1_000);
    expect(limiter.check("ip", 0)).toBe(true);
    expect(limiter.check("ip", 10)).toBe(true);
    expect(limiter.check("ip", 20)).toBe(false);
    expect(limiter.check("other", 20)).toBe(true);
    expect(limiter.check("ip", 1_011)).toBe(true);
  });
});

describe("structured data", () => {
  it("describes the carrier with real identifiers", () => {
    const org = organizationJsonLd();
    expect(org["@type"]).toBe("LocalBusiness");
    expect(org.telephone).toBe(COMPANY.phone.e164);
    expect(JSON.stringify(org.identifier)).toContain(COMPANY.usdot);
  });

  it("builds a FAQ page entity", () => {
    const faq = faqJsonLd([{ question: "Q?", answer: "A." }]);
    expect(faq["@type"]).toBe("FAQPage");
  });

  it("escapes angle brackets so JSON-LD cannot close the script tag", () => {
    const out = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("<");
  });
});

describe("formatQuoteText", () => {
  it("fills blanks with placeholders", () => {
    const result = parseQuote({ ...VALID, company: "", pickupDate: "" });
    if (!result.ok) throw new Error("fixture should be valid");
    const text = formatQuoteText(result.data);
    expect(text).toContain("Company: —");
    expect(text).toContain("Pickup date: Flexible");
  });
});

describe("company emails", () => {
  it("lists every inbox on the company domain, each with a purpose", async () => {
    const { EMAIL_CONTACTS } = await import("./site");
    expect(EMAIL_CONTACTS.map((c) => c.email)).toEqual([
      "admin@stgincs.com",
      "safety@stgincs.com",
      "fleet@stgincs.com",
    ]);
    for (const contact of EMAIL_CONTACTS) expect(contact.description.length).toBeGreaterThan(10);
  });

  it("publishes the admin inbox in structured data", () => {
    expect(organizationJsonLd().email).toBe("admin@stgincs.com");
  });
});
