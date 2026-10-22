import { CtaBand } from "@/components/cta-band";
import Link from "next/link";
import { ArrowIcon, CheckIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { PageTransition } from "@/components/page-transition";
import { ScrollBand } from "@/components/scroll-band";
import { SectionHeading } from "@/components/section-heading";
import { cssVars } from "@/lib/css-vars";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/site";

export const metadata = pageMetadata({
  title: "CDL Driver Jobs",
  description:
    "Drive with Samarkand Transport Group in Mason, Ohio. We talk with experienced Class A CDL drivers about interstate general freight runs. Call (513) 781-2423.",
  path: "/careers",
});

const LOOKING_FOR = [
  "Valid Class A CDL",
  "Safe driving record",
  "Able to pass DOT physical and drug screen",
  "Pride in on-time, damage-free delivery",
] as const;

const WHAT_YOU_GET = [
  {
    title: "Partners, not numbers",
    body: "Our drivers are partners in the business. You know who you work for, and they know you.",
  },
  {
    title: "Respect for your time",
    body: "Loads planned with realistic schedules and hours-of-service in mind.",
  },
  {
    title: "Miles to run",
    body: "We run all 48 states, so there are lanes for drivers who want to see the country.",
  },
] as const;

export default function CareersPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Drive with us"
        title={
          <>
            Drivers are partners, <span className="text-gradient">not numbers.</span>
          </>
        }
        intro="Our 99.9% delivery record is built by drivers who take pride in safe, on-time freight. If that's you, call or email us to start the conversation."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/apply" className="btn btn-primary group">
            Apply now
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a href={COMPANY.phone.href} className="btn btn-glass">
            <PhoneIcon className="size-4" />
            {COMPANY.phone.display}
          </a>
          <a href={`mailto:${COMPANY.emails.fleet}?subject=Driver%20inquiry`} className="btn btn-glass">
            <MailIcon className="size-4" />
            {COMPANY.emails.fleet}
          </a>
        </div>
      </PageHero>

      <section aria-labelledby="drivers-heading" className="py-20 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading
              id="drivers-heading"
              eyebrow="What we look for"
              title="The basics"
              intro="Openings depend on freight and equipment. Call us to hear what's available now."
            />
            <ul className="mt-8 space-y-4">
              {LOOKING_FOR.map((item, index) => (
                <li
                  key={item}
                  className="reveal-left flex items-center gap-4 rounded-2xl bg-white p-5 font-semibold shadow-[0_1px_0_rgb(11_15_21/0.05)]"
                  style={cssVars({ "--d": index })}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                    <CheckIcon className="size-5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5 self-start">
            {WHAT_YOU_GET.map((item, index) => (
              <div
                key={item.title}
                className="reveal-right card card-dark p-8 text-paper"
                style={cssVars({ "--d": index })}
              >
                <h3 className="text-2xl font-extrabold">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-paper/70">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScrollBand top={["Drivers are partners", "All 48 states"]} bottom={["Not numbers", "Miles to run"]} />

      <CtaBand
        title="Ready to roll?"
        body={`Apply online, call us, or email ${COMPANY.emails.fleet}. Tell us about your experience and the kind of runs you want.`}
        action={{ href: "/apply", label: "Apply now" }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Drive With Us", path: "/careers" },
        ])}
      />
    </PageTransition>
  );
}
