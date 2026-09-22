import type { ElementType, PropsWithChildren } from "react";

interface ContainerProps {
  className?: string;
  wide?: boolean;
  as?: ElementType;
}

export function Container({
  children,
  className = "",
  wide = false,
  as: Tag = "div",
}: PropsWithChildren<ContainerProps>) {
  return (
    <Tag
      className={`mx-auto w-full px-6 md:px-10 ${wide ? "max-w-[1440px]" : "max-w-[1160px]"} ${className}`}
    >
      {children}
    </Tag>
  );
}
