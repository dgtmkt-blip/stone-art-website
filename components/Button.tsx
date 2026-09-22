import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline-light" | "text";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ease-[var(--ease-editorial)] rounded-[var(--radius-sm)] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-stone-900 text-stone-50 hover:bg-ember",
  secondary: "bg-transparent text-stone-900 border border-stone-400 hover:border-stone-900",
  "outline-light": "bg-transparent text-stone-50 border border-stone-50/50 hover:bg-stone-50 hover:text-stone-900",
  text: "px-0 py-0 normal-case tracking-normal font-medium text-[15px] gap-1.5 group",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
}

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", className = "", children, ...rest } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
        {variant === "text" && (
          <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        )}
      </Link>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
