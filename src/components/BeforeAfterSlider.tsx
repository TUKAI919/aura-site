import { memo, useCallback, useEffect, useRef, useState } from "react";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
};

function BeforeAfterSliderImpl({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const pendingXRef = useRef<number | null>(null);
  const [pos, setPos] = useState(50);

  const updateFromClientX = useCallback((clientX: number) => {
    pendingXRef.current = clientX;
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = containerRef.current;
      const x = pendingXRef.current;
      if (!el || x == null) return;
      const rect = el.getBoundingClientRect();
      const pct = ((x - rect.left) / rect.width) * 100;
      setPos(Math.max(0, Math.min(100, pct)));
    });
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!draggingRef.current || !e.touches[0]) return;
      updateFromClientX(e.touches[0].clientX);
    };
    const stop = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stop);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [updateFromClientX]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 2));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 2));
  }, []);

  return (
    <div
      ref={containerRef}
      className={
        "relative w-full aspect-[4/3] overflow-hidden ring-1 ring-border select-none touch-none " +
        (className ?? "rounded-2xl shadow-[var(--shadow-soft)]")
      }
      onMouseDown={(e) => {
        e.preventDefault();
        draggingRef.current = true;
        updateFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        draggingRef.current = true;
        if (e.touches[0]) updateFromClientX(e.touches[0].clientX);
      }}
    >
      {/* AFTER (base) */}
      <img
        src={afterSrc}
        alt={afterAlt}
        draggable={false}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* BEFORE (overlay, clipped via clip-path) */}
      <img
        src={beforeSrc}
        alt={beforeAlt}
        draggable={false}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover will-change-[clip-path]"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      {/* Labels */}
      <span
        className="pointer-events-none absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-foreground shadow-sm backdrop-blur transition-opacity duration-300"
        style={{ opacity: pos > 12 ? 1 : 0 }}
      >
        Before
      </span>
      <span
        className="pointer-events-none absolute right-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-primary-foreground shadow-sm transition-opacity duration-300"
        style={{ opacity: pos < 88 ? 1 : 0 }}
      >
        After
      </span>

      {/* Divider line + handle */}
      <div
        className="absolute top-0 bottom-0 z-20 will-change-transform"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute inset-y-0 left-0 w-[2px] bg-gold shadow-[0_0_24px_rgba(203,164,105,0.55)]" />
        <button
          type="button"
          aria-label="Drag to compare before and after"
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          role="slider"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            draggingRef.current = true;
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            draggingRef.current = true;
          }}
          className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-gold text-primary-foreground shadow-[0_8px_24px_rgba(0,0,0,0.25)] ring-4 ring-background/70 transition-transform duration-200 touch-none hover:scale-110 focus:outline-none focus:ring-4 focus:ring-gold/40 md:h-10 md:w-10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 6 9 12 15 18" />
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="-ml-1">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export const BeforeAfterSlider = memo(BeforeAfterSliderImpl);
