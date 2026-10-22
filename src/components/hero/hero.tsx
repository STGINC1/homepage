import Image from "next/image";
import Link from "next/link";
import heroPhoto from "@/assets/hero-truck-dusk.jpg";
import { cssVars } from "@/lib/css-vars";
import { COMPANY } from "@/lib/site";
import { ArrowIcon, PhoneIcon } from "../icons";

const CREDENTIALS = [
  { label: "States covered", value: `All ${COMPANY.statesServed}` },
  { label: "Loads delivered right", value: COMPANY.deliveryAccuracy },
  { label: "USDOT", value: COMPANY.usdot },
  { label: `Miles in ${COMPANY.milesYear}`, value: `${COMPANY.milesLastYear.toLocaleString("en-US")}+` },
] as const;

const HEADLINE = ["Freight", "that", "arrives."] as const;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-clip bg-ink text-paper"
    >
      {/* Photo: slow settle on load, then zooms and darkens as you scroll */}
      <div aria-hidden="true" className="hero-media absolute inset-0 -z-20">
        {/* On large screens the photo shifts right so the truck clears the headline */}
        <div className="hero-kenburns absolute inset-0 lg:left-[28%] lg:[mask-image:linear-gradient(90deg,transparent,black_32%)]">
          <Image
            src={heroPhoto}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            fetchPriority="high"
            loading="eager"
            className="object-cover object-[44%_70%] lg:object-[0%_66%]"
          />
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(11_15_21/0.85)_0%,rgb(11_15_21/0.45)_45%,transparent_70%)] lg:bg-[linear-gradient(90deg,rgb(11_15_21/0.6)_0%,transparent_55%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
        <div className="absolute inset-0 bg-ink/35 lg:hidden" />
        <div className="grain absolute inset-0" />
        <div className="hero-dim absolute inset-0 bg-ink" />
      </div>

      <div className="hero-drift container-x relative flex flex-1 flex-col justify-end pt-32 pb-10 sm:pb-14">
        <p className="hero-enter flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-paper/80 uppercase">
          <span className="relative flex size-2.5">
            <span className="live-dot absolute inset-0 rounded-full bg-accent" />
            <span className="relative size-2.5 rounded-full bg-accent" />
          </span>
          Mason, Ohio · Interstate freight carrier
        </p>

        <h1
          id="hero-title"
          className="mt-6 text-[clamp(3.4rem,1rem+7.4vw,7.6rem)] leading-[0.86] font-black tracking-[-0.035em] uppercase"
        >
          {HEADLINE.map((line, index) => (
            <span key={line} className="line-mask">
              <span className="line-in" style={cssVars({ "--d": index })}>
                {index === HEADLINE.length - 1 ? (
                  <>
                    {line.slice(0, -1)}
                    <span className="text-accent">.</span>
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex max-w-xl flex-col gap-7">
          <p
            className="hero-enter max-w-xl text-lg leading-relaxed text-paper/80 sm:text-xl"
            style={cssVars({ "--d": 3 })}
          >
            Full truckload general freight across all 48 states, with 99.9% of loads delivered right.
            Shippers, receivers and brokers get one direct line, pickup to signed delivery.
          </p>
          <div className="hero-enter flex flex-wrap gap-3" style={cssVars({ "--d": 4 })}>
            <Link href="/contact" className="btn btn-primary group">
              Request a Quote
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a href={COMPANY.phone.href} className="btn btn-glass">
              <PhoneIcon className="size-4" />
              {COMPANY.phone.display}
            </a>
          </div>
        </div>

        <dl
          className="hero-enter mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-paper/15 pt-6 md:grid-cols-4"
          style={cssVars({ "--d": 5 })}
        >
          {CREDENTIALS.map((item) => (
            <div key={item.label} className="flex flex-col-reverse gap-1">
              <dt className="text-[0.7rem] font-semibold tracking-[0.2em] text-paper/55 uppercase">
                {item.label}
              </dt>
              <dd className="font-display text-xl font-bold tracking-tight sm:text-2xl">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        aria-hidden="true"
        className="hero-enter absolute right-6 bottom-40 hidden flex-col items-center gap-3 xl:flex"
        style={cssVars({ "--d": 6 })}
      >
        <span className="text-[0.65rem] font-semibold tracking-[0.3em] text-paper/60 uppercase [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative h-16 w-px overflow-hidden bg-paper/20">
          <span className="scroll-cue absolute inset-0 bg-accent" />
        </span>
      </div>
    </section>
  );
}
