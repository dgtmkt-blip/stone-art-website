"use client";

import { useEffect, useRef, useState, type PropsWithChildren, type ElementType } from "react";

interface RevealProps {
  className?: string;
  delay?: 1 | 2 | 3 | 4;
  as?: ElementType;
}

/** Fade/translate-in on scroll into view. Honors prefers-reduced-motion via CSS (see globals.css). */
export function Reveal({
  children,
  className = "",
  delay,
  as: Tag = "div",
}: PropsWithChildren<RevealProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay ? `reveal-delay-${delay}` : "";

  return (
    <Tag ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${delayClass} ${className}`}>
      {children}
    </Tag>
  );
}
