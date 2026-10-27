import {
  BulletList,
  Callout,
  InlineLink,
  PolicyPage,
  type PolicySection,
} from "@/components/legal/policy-page";
import { pageMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/site";
import { SMS_NO_SHARING_STATEMENT, SMS_PROGRAM } from "@/lib/sms";

export const metadata = pageMetadata({
  title: "SMS Terms & Conditions",
  description: `Terms for text messages from ${COMPANY.legalName}: message types, frequency, fees, and how to opt in, opt out (STOP) or get help (HELP).`,
  path: "/terms",
});

const EFFECTIVE_DATE = "October 27, 2026";
const SENDER = SMS_PROGRAM.sender;

const DISCLOSURES = [
  "Message and data rates may apply.",
  'You can opt out at any time by texting "STOP."',
  'For assistance, text "HELP" or visit our Privacy Policy and Terms and Conditions pages.',
  "Message frequency may vary.",
] as const;

const SECTIONS: readonly PolicySection[] = [
  {
    id: "sms-consent",
    title: "SMS Consent Communication",
    content: (
      <>
        <p>
          The information (phone numbers) obtained as part of the SMS consent process will not be shared with
          third parties for marketing purposes.
        </p>
        <Callout>{SMS_NO_SHARING_STATEMENT}</Callout>
      </>
    ),
  },
  {
    id: "message-types",
    title: "Types of SMS Communications",
    content: (
      <>
        <p>
          If you have consented to receive text messages from {SENDER}, you may receive{" "}
          <strong className="text-ink">{SMS_PROGRAM.messageType.toLowerCase()}</strong> messages related to
          the following:
        </p>
        <BulletList items={SMS_PROGRAM.topics} />
      </>
    ),
  },
  {
    id: "message-frequency",
    title: "Message Frequency",
    content: (
      <p>
        Message frequency may vary depending on the type of communication. For example, you may receive up to{" "}
        {SMS_PROGRAM.maxMessagesPerWeek} SMS messages per week related to your quote requests, shipments, and
        dispatch updates.
      </p>
    ),
  },
  {
    id: "fees",
    title: "Potential Fees for SMS Messaging",
    content: (
      <p>
        Please note that standard message and data rates may apply, depending on your carrier&apos;s pricing
        plan. These fees may vary if the message is sent domestically or internationally.
      </p>
    ),
  },
  {
    id: "opt-in",
    title: "Opt-In Method",
    content: (
      <>
        <p>
          You may opt in to receive SMS messages from {SENDER} by filling out a form on our website and
          checking the SMS consent box.
        </p>
        <p className="mt-3">
          The SMS consent box is optional. If you do not wish to receive SMS messages, leave it unchecked. You
          can still submit the form.
        </p>
      </>
    ),
  },
  {
    id: "opt-out",
    title: "Opt-Out Method",
    content: (
      <p>
        You can opt out of receiving SMS messages at any time. To do so, simply reply &quot;STOP&quot; to any
        SMS message you receive. Alternatively, you can contact us directly at{" "}
        <InlineLink href={COMPANY.phone.href}>{COMPANY.phone.display}</InlineLink> or{" "}
        <InlineLink href={`mailto:${COMPANY.emails.admin}`}>{COMPANY.emails.admin}</InlineLink> to request
        removal from our messaging list.
      </p>
    ),
  },
  {
    id: "help",
    title: "Help",
    content: (
      <>
        <p>
          If you are experiencing any issues, you can reply with the keyword HELP. Or, you can get help
          directly from us at <InlineLink href={COMPANY.phone.href}>{COMPANY.phone.display}</InlineLink> or{" "}
          <InlineLink href={`mailto:${COMPANY.emails.admin}`}>{COMPANY.emails.admin}</InlineLink>.
        </p>
        <p className="mt-3">
          If you do not wish to receive SMS messages, you can choose not to check the SMS consent box on our
          forms.
        </p>
      </>
    ),
  },
  {
    id: "disclosures",
    title: "Standard Messaging Disclosures",
    content: (
      <>
        <BulletList items={DISCLOSURES} />
        <p className="mt-5">
          Read our <InlineLink href="/privacy">Privacy Policy</InlineLink> and these{" "}
          <InlineLink href="/terms">Terms and Conditions</InlineLink>.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <PolicyPage
      eyebrow="SMS Terms & Conditions"
      title={
        <>
          Text messages, <span className="text-gradient">on your terms.</span>
        </>
      }
      intro="What to expect when you opt in to texts from us, and how to stop them at any time."
      effectiveDate={EFFECTIVE_DATE}
      path="/terms"
      contactHeading="Questions About These Terms?"
      sections={SECTIONS}
      lead={
        <p>
          These SMS Terms &amp; Conditions apply to text messages sent by{" "}
          <strong className="text-ink">{COMPANY.legalName}</strong> (&quot;{COMPANY.shortName},&quot;
          &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) to people who opt in on our website. They work
          together with our <InlineLink href="/privacy">Privacy Policy</InlineLink>.
        </p>
      }
    />
  );
}
