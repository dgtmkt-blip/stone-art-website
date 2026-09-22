import { Reveal } from "@/components/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <p
          className={`mb-4 text-[12px] font-semibold uppercase tracking-[0.24em] ${
            dark ? "text-ember-light" : "text-ember"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-[clamp(28px,4vw,44px)] font-normal ${
          dark ? "text-stone-50" : "text-stone-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-[16px] leading-relaxed ${dark ? "text-stone-300" : "text-stone-600"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
