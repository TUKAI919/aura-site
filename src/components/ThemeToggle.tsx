import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const [pop, setPop] = useState(false);

  const handleClick = () => {
    setPop(true);
    toggle();
    window.setTimeout(() => setPop(false), 300);
  };

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={handleClick}
      className={`fixed right-4 bottom-[calc(1rem+3rem+12px)] z-50 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white/10 backdrop-blur-md shadow-lg transition-transform duration-300 hover:scale-110 md:right-6 md:bottom-[calc(1.5rem+3.5rem+15px)] md:h-14 md:w-14 dark:border-white/10 dark:bg-black/20 ${
        pop ? "scale-110" : "scale-100"
      }`}
    >
      <Sun
        className="absolute h-6 w-6 text-gold transition-all duration-500 ease-out"
        style={{
          transform: isDark ? "rotate(-180deg) scale(0.4)" : "rotate(0deg) scale(1)",
          opacity: isDark ? 0 : 1,
        }}
      />
      <Moon
        className="absolute h-6 w-6 text-gold transition-all duration-500 ease-out"
        style={{
          transform: isDark ? "rotate(0deg) scale(1)" : "rotate(180deg) scale(0.4)",
          opacity: isDark ? 1 : 0,
        }}
      />
    </button>
  );
}
