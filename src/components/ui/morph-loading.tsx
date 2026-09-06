"use client";
import { cn } from "@/lib/utils";

export default function UniqueLoading({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const containerSizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };
  const squareSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn("relative", containerSizes[size])}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              squareSizes[size],
            )}
            style={{
              backgroundColor: "#CBA469",
              boxShadow: "0 4px 14px rgba(203, 164, 105, 0.45)",
              animation: `morph-${i} 2.4s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}