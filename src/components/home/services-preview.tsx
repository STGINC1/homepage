import Link from "next/link";
import { SERVICES } from "@/lib/content";
import { cssVars } from "@/lib/css-vars";
import { ArrowIcon, NamedIcon } from "../icons";
import { SectionHeading } from "../section-heading";

export function ServicesPreview() {
  return (
    <section aria-labelledby="services-title" className="bg-paper-2/60 py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="What we haul"
            title={
              <>
                Built for loads that <span className="text-brand-deep">can&apos;t wait.</span>
              </>
            }
            intro="Full truckload general freight, run by people who answer the phone."
          />
          <Link href="/services" className="reveal btn btn-dark group shrink-0 self-start md:self-auto">
            All services
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((service, index) => {
            const isFeature = index === 0;
            const span = isFeature || index === 3 ? "lg:col-span-4" : "lg:col-span-2";
            const tone = isFeature ? "card-dark text-paper" : "";
            return (
              <li key={service.slug} className={`reveal ${span}`} style={cssVars({ "--d": index % 2 })}>
                <Link
                  href={`/services#${service.slug}`}
                  className={`card group flex h-full flex-col p-8 ${tone}`}
                >
                  <span
                    className={`grid size-14 place-items-center rounded-2xl transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110 ${
                      isFeature ? "bg-brand/20 text-brand-bright" : "bg-brand/10 text-brand"
                    }`}
                  >
                    <NamedIcon name={service.icon} className="size-7" />
                  </span>
                  <h3 className="mt-8 text-2xl font-extrabold">{service.title}</h3>
                  <p className={`mt-3 leading-relaxed ${isFeature ? "text-paper/75" : "text-stone"}`}>
                    {service.summary}
                  </p>
                  <span
                    className={`mt-auto flex items-center gap-2 pt-8 text-sm font-semibold ${
                      isFeature ? "text-accent" : "text-lapis"
                    }`}
                  >
                    Learn more
                    <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
