import { useEffect, useState } from "react";
import UniqueLoading from "@/components/ui/morph-loading";
import { cn } from "@/lib/utils";

// Module-level flag — survives across route changes but resets on full reload.
// Ensures the splash only shows on the very first mount of the app session.
let hasShownSplash = false;

export function SplashScreen() {
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(!hasShownSplash);
  const [mounted, setMounted] = useState(!hasShownSplash);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || !isLoading) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(t);
  }, [hydrated, isLoading]);

  useEffect(() => {
    if (!mounted) return;
    if (!isLoading) {
      document.body.style.overflow = "";
      const t = setTimeout(() => {
        setMounted(false);
        hasShownSplash = true;
      }, 800);
      return () => clearTimeout(t);
    }
  }, [isLoading, mounted]);

  if (!mounted || !hydrated) return null;

  return (
    <div
      aria-hidden={!isLoading}
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-transform duration-700 ease-in-out dark:bg-[#121212]",
        !isLoading && "-translate-y-full",
      )}
    >
      <UniqueLoading size="lg" />
      <h1 className="mt-8 font-serif text-2xl tracking-widest text-gray-900 dark:text-zinc-100">
        AESTHETIQUE
      </h1>
    </div>
  );
}