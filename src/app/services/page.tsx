import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { CheckIcon, NamedIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { PageTransition } from "@/components/page-transition";
import { ScrollBand } from "@/components/scroll-band";
import { SectionHeading } from "@/components/section-heading";
import { FAQS, SERVICES } from "@/lib/content";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Freight Trucking Services",
  description:
    "Full truckload (FTL) general freight, interstate long-haul and regional Midwest trucking from Mason, Ohio. Capacity for shippers and freight brokers.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Freight hauling, <span className="text-gradient">done right.</span>
          </>
        }
        intro="Authorized for-hire interstate trucking for general freight. One load, one truck, and one team that stays accountable from pickup to delivery."
      >
        <Link href="/contact" className="btn btn-primary">
          Request a Quote
        </Link>
      </PageHero>

      <section aria-label="Our services" className="py-20 sm:py-28">
        <div className="container-x space-y-6">
          {SERVICES.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              aria-labelledby={`${service.slug}-title`}
              className={`${index % 2 === 0 ? "reveal-left" : "reveal-right"} card grid gap-8 p-8 sm:p-12 md:grid-cols-[auto_1fr_1fr] md:items-start ${
                index % 2 === 1 ? "card-dark text-paper" : ""
              }`}
            >
              <span className="grid size-16 place-items-center rounded-2xl bg-brand/15 text-brand">
                <NamedIcon name={service.icon} className="size-8" />
              </span>
              <div>
                <p
                  className={`font-display text-sm font-bold ${index % 2 === 1 ? "text-accent" : "text-lapis"}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 id={`${service.slug}-title`} className="mt-2 text-3xl font-extrabold">
                  {service.title}
                </h2>
                <p
                  className={`mt-4 text-lg leading-relaxed ${index % 2 === 1 ? "text-paper/75" : "text-stone"}`}
                >
                  {service.summary}
                </p>
              </div>
              <ul className="space-y-3 md:pt-8">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand" />
                    <span className="font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-title" className="bg-paper-2/60 py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title="Questions shippers ask"
            intro="Not seeing yours? Call us. A person answers."
          />
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="reveal group rounded-2xl bg-white p-6 shadow-[0_1px_0_rgb(11_15_21/0.05)] open:shadow-[0_20px_40px_-24px_rgb(11_15_21/0.3)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-paper-2 text-xl transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-stone">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ScrollBand
        top={["Full truckload", "Interstate", "All 48 states"]}
        bottom={["Shippers", "Receivers", "Brokers"]}
        tone="dark"
      />

      <CtaBand />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
    </PageTransition>
  );
}
