import { type ReactNode, type ElementType } from "react";
import { useReveal } from "@/hooks/useReveal";

type Props = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  y?: number;
};

export function Reveal({ children, as: Tag = "div", delay = 0, className = "", y = 24 }: Props) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      style={{
        transitionDelay: `${delay}ms`,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        opacity: shown ? 1 : 0,
      }}
      className={`transition-all duration-700 ease-out will-change-transform ${className}`}
    >
      {children}
    </Tag>
  );
}
