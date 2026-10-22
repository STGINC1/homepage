import Image from "next/image";
import Link from "next/link";
import markDark from "@/assets/brand/stg-mark-dark.png";
import markLight from "@/assets/brand/stg-mark-light.png";

interface LogoProps {
  /** "light" = light artwork for dark backgrounds. */
  tone?: "light" | "dark";
}

/** STG logo mark plus the full company name, linking home. */
export function Logo({ tone = "light" }: LogoProps) {
  const mark = tone === "light" ? markLight : markDark;
  const text = tone === "light" ? "text-paper" : "text-ink";

  return (
    <Link href="/" className={`group flex items-center gap-3 ${text}`}>
      <Image
        src={mark}
        alt=""
        sizes="120px"
        loading="eager"
        className="h-9 w-auto shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 sm:h-10"
      />
      <span
        aria-hidden="true"
        className="hidden flex-col border-l border-current/20 pl-3 leading-none sm:flex lg:hidden xl:flex"
      >
        <span className="font-display text-[0.95rem] font-extrabold tracking-[0.08em]">SAMARKAND</span>
        <span className="mt-1 text-[0.58rem] font-semibold tracking-[0.3em] opacity-70">TRANSPORT GROUP</span>
      </span>
      <span className="sr-only">Samarkand Transport Group, home</span>
    </Link>
  );
}
