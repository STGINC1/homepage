import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  tone = "light",
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "";
  const titleColor = tone === "dark" ? "text-paper" : "text-ink";
  const introColor = tone === "dark" ? "text-paper/70" : "text-stone";

  return (
    <div className={`reveal flex max-w-2xl flex-col ${alignment}`}>
      <p className={`eyebrow ${tone === "dark" ? "!text-brand-bright" : ""}`}>{eyebrow}</p>
      <h2
        id={id}
        className={`mt-4 text-[clamp(2rem,1.3rem+3vw,3.4rem)] leading-[1.02] font-extrabold ${titleColor}`}
      >
        {title}
      </h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${introColor}`}>{intro}</p>}
    </div>
  );
}
