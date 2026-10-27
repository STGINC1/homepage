import {
  BulletList,
  Callout,
  InlineLink,
  PolicyPage,
  type PolicySection,
} from "@/components/legal/policy-page";
import { pageMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/site";
import { SMS_NO_SHARING_STATEMENT } from "@/lib/sms";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${COMPANY.legalName} collects, uses and protects your personal information, including SMS messaging.`,
  path: "/privacy",
});

const EFFECTIVE_DATE = "October 27, 2026";
const PRIVACY_EMAIL = COMPANY.emails.admin;

const COLLECTED = [
  "Full name",
  "Email address",
  "Phone number (including mobile)",
  "Physical address",
  "Employment details",
  "Form submissions & documents",
] as const;

const USES = [
  "To provide transportation and dispatch services",
  "To communicate regarding your account, services, or employment status",
  "To send SMS messages related to safety, load updates, and dispatch notifications",
  "To respond to inquiries and provide customer support",
  "To comply with legal obligations",
] as const;

const SHARING = [
  "With service providers who assist in operating our business (e.g., payroll processors, insurance providers, and the email service that delivers messages sent through our website), under strict confidentiality",
  "As required by law or court order",
  "During a business transfer (e.g., merger or acquisition), with appropriate safeguards",
] as const;

const SMS_POINTS = [
  "We will use your number only for purposes related to your service, employment, or account status",
  "You may receive reminders, updates, or alerts via SMS (message frequency varies)",
  "You can opt out anytime by replying STOP, or ask for help by replying HELP",
  "SMS consent is optional and is never required to submit a form or receive a quote",
] as const;

const RIGHTS = [
  { title: "Access", body: "View or update your personal information" },
  { title: "Withdraw", body: "Revoke your consent at any time" },
  { title: "Delete", body: "Request deletion of your data" },
] as const;

const SECTIONS: readonly PolicySection[] = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: (
      <>
        <p>We may collect the following types of personal information:</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {COLLECTED.map((item) => (
            <li key={item} className="rounded-xl bg-paper-2 px-4 py-3 font-medium text-ink">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-5">
          We do not collect data from third-party sources. All information is provided directly by you.
        </p>
        <p className="mt-3">
          When you use the quote form on our website, we collect the details you enter so we can respond to
          your request. Our website does not use advertising or tracking cookies.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-your-information",
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use the information we collect for the following purposes:</p>
        <BulletList items={USES} />
      </>
    ),
  },
  {
    id: "information-sharing",
    title: "Information Sharing",
    content: (
      <>
        <p className="font-semibold text-ink">
          We do not sell, rent, or share your personal information for marketing purposes.
        </p>
        <p className="mt-3">We may share your information only in the following limited situations:</p>
        <BulletList items={SHARING} />
        <p className="mt-5">
          None of the above sharing includes SMS opt-in data or consent. Text messaging originator opt-in data
          and consent will not be shared with any third parties.
        </p>
      </>
    ),
  },
  {
    id: "sms-privacy",
    title: "SMS & Mobile Messaging Privacy",
    content: (
      <>
        <Callout>{SMS_NO_SHARING_STATEMENT}</Callout>
        <p className="mt-5">If you provide your mobile number and opt in to receive SMS messages:</p>
        <BulletList items={SMS_POINTS} />
        <p className="mt-5">
          Message and data rates may apply. Consent is not a condition of employment or service. For full
          details, see our <InlineLink href="/terms">SMS Terms &amp; Conditions</InlineLink>.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    content: (
      <p>
        We maintain appropriate administrative, technical, and physical safeguards to protect your personal
        information. However, no method of transmission over the internet is 100% secure, and we cannot
        guarantee absolute security.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: (
      <>
        <p>You have the right to:</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {RIGHTS.map((right) => (
            <li key={right.title} className="reveal-zoom rounded-2xl bg-ink p-5 text-paper">
              <span className="font-display text-lg font-extrabold text-brand-bright">{right.title}</span>
              <span className="mt-1 block text-sm text-paper/75">{right.body}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5">
          To exercise these rights, please contact us at{" "}
          <InlineLink href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</InlineLink>.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy occasionally. The revised version will be posted on our website with
        the updated effective date.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <PolicyPage
      eyebrow="Privacy Policy"
      title={
        <>
          Your privacy <span className="text-gradient">matters to us.</span>
        </>
      }
      intro="Learn how we protect and manage your information."
      effectiveDate={EFFECTIVE_DATE}
      path="/privacy"
      contactHeading="Questions About This Policy?"
      sections={SECTIONS}
      lead={
        <>
          <p>
            <strong className="text-ink">
              {COMPANY.legalName} (&quot;{COMPANY.shortName},&quot; &quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;)
            </strong>{" "}
            respects your privacy and is committed to protecting your personal information.
          </p>
          <p className="mt-4">
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
            you use our website, services, or communicate with us, including via SMS text messages. By using
            our services or providing your information, you agree to the practices described in this policy.
          </p>
        </>
      }
    />
  );
}
