import type { ReactNode } from "react";
import { cssVars } from "@/lib/css-vars";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
}

/** Compact dark banner used at the top of inner pages. */
export function PageHero({ eyebrow, title, intro, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-clip bg-ink pt-36 pb-20 text-paper sm:pt-44 sm:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_90%_0%,rgb(1_77_189/0.5),transparent_60%),radial-gradient(60%_60%_at_0%_100%,rgb(5_144_225/0.22),transparent_60%)]" />
        <div className="tile-pattern absolute inset-0 opacity-[0.07] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <svg
          className="hero-spin absolute -right-24 -bottom-24 size-[28rem] text-brand-bright opacity-[0.1]"
          viewBox="0 0 48 48"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="11" y="11" width="26" height="26" />
            <rect x="11" y="11" width="26" height="26" transform="rotate(45 24 24)" />
          </g>
        </svg>
      </div>
      <div className="hero-drift container-x">
        <p className="hero-enter eyebrow !text-brand-bright" style={cssVars({ "--d": 0 })}>
          {eyebrow}
        </p>
        <h1
          className="hero-rise mt-5 max-w-4xl text-[clamp(2.4rem,1.4rem+4.4vw,4.8rem)] leading-[0.98] font-black"
          style={cssVars({ "--d": 1 })}
        >
          {title}
        </h1>
        <p
          className="hero-enter mt-6 max-w-2xl text-lg leading-relaxed text-paper/75 sm:text-xl"
          style={cssVars({ "--d": 2 })}
        >
          {intro}
        </p>
        {children && (
          <div className="hero-enter mt-9" style={cssVars({ "--d": 3 })}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
