import { ApplicationEmbed } from "@/components/apply/application-embed";
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
  title: "Apply to Drive | CDL Driver Application",
  description:
    "Apply online to drive with Samarkand Transport Group in Mason, Ohio. Class A CDL drivers running all 48 states. Drivers are partners, not numbers.",
  path: "/apply",
});

const HAVE_READY = [
  "Your Class A CDL details",
  "Your DOT medical card",
  "Addresses for the past 3 years",
  "Employment history (up to 10 years for commercial driving jobs)",
  "Accident and traffic violation history for the past 3 years",
] as const;

const STEPS = [
  {
    title: "Apply online",
    body: "Fill out the secure driver application on this page. Have your CDL and work history handy.",
  },
  { title: "We review", body: "We go through your application and make sure everything is complete." },
  { title: "We talk", body: "If it's a fit, we call you to talk about lanes, home time and pay." },
  {
    title: "Hit the road",
    body: "Complete onboarding and start running freight as a partner, not a number.",
  },
] as const;

export default function ApplyPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Driver application"
        title={
          <>
            Apply to drive <span className="text-gradient">with STG.</span>
          </>
        }
        intro="Run all 48 states with a carrier that treats drivers as partners. The secure application is right here on this page."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#application" className="btn btn-primary group">
            Start your application
            <ArrowIcon className="size-4 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
          <a href={COMPANY.phone.href} className="btn btn-glass">
            <PhoneIcon className="size-4" />
            {COMPANY.phone.display}
          </a>
        </div>
      </PageHero>

      <section id="application" aria-labelledby="application-heading" className="py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[18rem_1fr] lg:gap-14">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="application-heading"
              eyebrow="Before you start"
              title="Have these ready"
              intro="DOT rules require this for every CDL driver application."
            />
            <ul className="mt-6 space-y-3">
              {HAVE_READY.map((item, index) => (
                <li
                  key={item}
                  className="reveal-left flex items-start gap-3 text-sm font-semibold"
                  style={cssVars({ "--d": index })}
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand/10 text-brand-deep">
                    <CheckIcon className="size-4" />
                  </span>
                  <span className="pt-1">{item}</span>
                </li>
              ))}
            </ul>
            <div className="reveal mt-8 space-y-1 text-sm text-stone">
              <p>Need help?</p>
              <a
                href={COMPANY.phone.href}
                className="block font-semibold text-brand-deep underline underline-offset-2"
              >
                {COMPANY.phone.display}
              </a>
              <a
                href={`mailto:${COMPANY.emails.fleet}?subject=Driver%20application%20question`}
                className="block font-semibold text-brand-deep underline underline-offset-2"
              >
                {COMPANY.emails.fleet}
              </a>
            </div>
          </aside>

          <div className="min-w-0">
            <ApplicationEmbed />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="steps-heading"
        className="relative overflow-clip bg-ink py-20 text-paper sm:py-28"
      >
        <div
          className="tile-pattern pointer-events-none absolute inset-0 opacity-[0.05]"
          aria-hidden="true"
        />
        <div className="container-x relative">
          <SectionHeading
            id="steps-heading"
            tone="dark"
            eyebrow="How hiring works"
            title={
              <>
                Four steps to <span className="text-gradient">the driver&apos;s seat.</span>
              </>
            }
          />
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="reveal card card-dark p-7 text-paper"
                style={cssVars({ "--d": index })}
              >
                <span className="font-display grid size-12 place-items-center rounded-full bg-accent text-lg font-black text-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-xl font-extrabold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-paper/70">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ScrollBand
        top={["Drivers are partners", "All 48 states"]}
        bottom={["Not numbers", "99.9% delivered right"]}
      />

      <section aria-labelledby="questions-heading" className="pb-20">
        <div className="container-x">
          <div className="reveal-zoom card flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h2 id="questions-heading" className="text-2xl font-extrabold">
                Questions before you apply?
              </h2>
              <p className="mt-2 text-stone">
                Our fleet team is happy to talk about lanes, equipment and pay.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${COMPANY.emails.fleet}?subject=Driver%20application%20question`}
                className="btn btn-dark"
              >
                <MailIcon className="size-4" />
                {COMPANY.emails.fleet}
              </a>
              <a href={COMPANY.phone.href} className="btn btn-outline-dark">
                <PhoneIcon className="size-4" />
                {COMPANY.phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Apply", path: "/apply" },
        ])}
      />
    </PageTransition>
  );
}
