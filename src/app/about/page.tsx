import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { PageTransition } from "@/components/page-transition";
import { ScrollBand } from "@/components/scroll-band";
import { SectionHeading } from "@/components/section-heading";
import { cssVars } from "@/lib/css-vars";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Samarkand Transport Group is a Mason, Ohio trucking company and authorized interstate carrier for general freight. Learn the story behind the name.",
  path: "/about",
});

const FACTS: readonly { label: string; value: string; href?: string }[] = [
  { label: "Legal name", value: COMPANY.legalName },
  { label: "Also known as", value: COMPANY.shortName },
  { label: "USDOT number", value: COMPANY.usdot, href: COMPANY.saferHref },
  { label: "Operation", value: COMPANY.operation },
  { label: "Cargo", value: COMPANY.cargo },
  { label: "Coverage", value: `All ${COMPANY.statesServed} contiguous states` },
  { label: "Delivery record", value: `${COMPANY.deliveryAccuracy} of loads delivered right` },
  { label: "Home base", value: COMPANY.address.oneLine },
];

const VALUES = [
  {
    title: "Our word",
    body: "A rate we quote is the rate you pay. A pickup we promise is a pickup we make.",
  },
  {
    title: "Your freight",
    body: "Every load is someone's inventory, deadline and customer. We treat it that way.",
  },
  {
    title: "Drivers are partners",
    body: "Not numbers on a board. Safe, respected drivers are how we deliver 99.9% of loads right.",
  },
] as const;

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="About STG"
        title={
          <>
            An old trade route. <span className="text-gradient">A modern carrier.</span>
          </>
        }
        intro={`${COMPANY.displayName} is a trucking company based in ${COMPANY.address.city}, Ohio. We haul general freight across all 48 states and look after shippers, receivers and brokers alike.`}
      />

      <section aria-labelledby="story-heading" className="py-20 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              id="story-heading"
              eyebrow="Our story"
              title="Why we're named after a Silk Road city"
            />
            <div className="reveal-left mt-8 space-y-5 text-lg leading-relaxed text-stone">
              <p>
                For more than a thousand years, Samarkand was one of the great crossroads of the Silk Road.
                Merchants crossed deserts and mountains to trade there because the city kept its promises:
                goods arrived, deals held, and travelers were looked after.
              </p>
              <p>
                That is the kind of carrier we set out to be. The roads are now interstates and the caravans
                are tractor-trailers, but freight still runs on the same thing: trust that it will arrive
                safely and on time.
              </p>
              <p>
                From our base in {COMPANY.address.city}, between Cincinnati and Dayton, we keep the operation
                lean and personal. When you call, you reach the people responsible for your load.
              </p>
            </div>
          </div>

          <aside
            aria-labelledby="facts-heading"
            className="reveal-right relative overflow-hidden rounded-[2rem] bg-ink p-8 text-paper sm:p-10 lg:sticky lg:top-28"
          >
            <div className="tile-pattern absolute inset-0 opacity-[0.06]" aria-hidden="true" />
            <h2 id="facts-heading" className="relative text-2xl font-extrabold">
              Company at a glance
            </h2>
            <dl className="relative mt-6 divide-y divide-paper/10">
              {FACTS.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[9rem_1fr] gap-4 py-3.5 text-sm sm:text-base">
                  <dt className="text-paper/55">{fact.label}</dt>
                  <dd className="font-semibold">
                    {fact.href ? (
                      <a
                        href={fact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-bright underline decoration-brand-bright/30 underline-offset-4 hover:decoration-brand-bright"
                      >
                        {fact.value}
                      </a>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="relative mt-6 text-xs text-paper/45">
              Carrier details match our public FMCSA SAFER record.
            </p>
          </aside>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="bg-paper-2/60 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            id="values-heading"
            eyebrow="What we stand on"
            title="Three things we don't compromise"
          />
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {VALUES.map((value, index) => (
              <li key={value.title} className="reveal card p-8" style={cssVars({ "--d": index })}>
                <span className="font-display text-5xl font-black text-brand/25" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-2xl font-extrabold">{value.title}</h3>
                <p className="mt-3 leading-relaxed text-stone">{value.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ScrollBand
        top={["Silk Road spirit", "Ohio roots"]}
        bottom={["Our word", "Your freight", "Drivers are partners"]}
      />

      <CtaBand title="Let's move something together." />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </PageTransition>
  );
}
