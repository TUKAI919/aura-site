import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useClinicParams } from "@/hooks/useClinicParams";

type NavLink = { label: string; href: string; route?: string; homeSectionId?: string; essential?: boolean };

const links: NavLink[] = [
  { label: "Home", href: "#top", essential: true },
  { label: "Results", href: "#results", essential: true },
  { label: "Treatments", href: "/treatments", route: "/treatments", homeSectionId: "services", essential: true },
  { label: "About", href: "#doctor", essential: true },
  { label: "Process", href: "#process" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq", essential: true },
  { label: "Contact", href: "#contact", essential: true },
];

export function Header() {
  const { clinic } = useClinicParams();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#top");
  const navRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const isClickScrolling = useRef(false);
  const scrollEndTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onScrollListener = useRef<(() => void) | null>(null);

  const detachScrollListener = () => {
    if (onScrollListener.current) {
      window.removeEventListener("scroll", onScrollListener.current);
      onScrollListener.current = null;
    }
    if (scrollEndTimeout.current) {
      clearTimeout(scrollEndTimeout.current);
      scrollEndTimeout.current = null;
    }
    if (safetyTimeout.current) {
      clearTimeout(safetyTimeout.current);
      safetyTimeout.current = null;
    }
  };

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Route links (e.g. /treatments) — let TanStack <Link> handle it
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const id = href.slice(1);
    // Hash links only work on the home page — navigate via the router (no full reload)
    if (!isHome) {
      navigate({ to: "/", hash: id === "top" ? undefined : id }).then(() => {
        // Allow the homepage to mount, then scroll to the target
        requestAnimationFrame(() => {
          const target = id === "top" ? document.body : document.getElementById(id);
          if (!target) return;
          if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
          else target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
      setActive(href);
      return;
    }
    isClickScrolling.current = true;
    setActive(href);

    const target = id === "top" ? document.body : document.getElementById(id);
    if (target) {
      if (id === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    detachScrollListener();

    const finish = () => {
      detachScrollListener();
      isClickScrolling.current = false;
    };

    const onScroll = () => {
      if (scrollEndTimeout.current) clearTimeout(scrollEndTimeout.current);
      scrollEndTimeout.current = setTimeout(finish, 100);
    };

    onScrollListener.current = onScroll;
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    safetyTimeout.current = setTimeout(finish, 3000);
  };
  const [indicator, setIndicator] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Indicator follows ONLY the active link (not hover)
  useEffect(() => {
    const update = () => {
      const el = itemRefs.current[active];
      const parent = navRef.current;
      if (!el || !parent || el.offsetParent === null) return setIndicator((i) => ({ ...i, opacity: 0 }));
      const p = parent.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      setIndicator({ left: r.left - p.left, width: r.width, opacity: 1 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  // ScrollSpy via IntersectionObserver — only on the home page where sections exist
  useEffect(() => {
    if (!isHome) {
      // On non-home routes, highlight the matching route link if any
      const match = links.find((l) => l.route === pathname);
      setActive(match ? match.href : "");
      return;
    }
    // Map section id -> link href (hash links + route links with homeSectionId)
    const idToHref = new Map<string, string>();
    for (const l of links) {
      if (l.href.startsWith("#")) idToHref.set(l.href.slice(1), l.href);
      else if (l.homeSectionId) idToHref.set(l.homeSectionId, l.href);
    }
    const elements = Array.from(idToHref.keys())
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }
        // Near the top of the page, always force Home active
        if (window.scrollY < 100) {
          setActive("#top");
          return;
        }
        let bestId = "top";
        let bestRatio = 0;
        for (const [id, ratio] of visibility) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestRatio > 0) {
          const href = idToHref.get(bestId);
          if (href) setActive(href);
        }
      },
      {
        // Section counts as active only when its middle band is centered in the viewport
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome, pathname]);

  // Clean up scroll listener / timeouts on unmount
  useEffect(() => {
    return () => {
      detachScrollListener();
    };
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close mobile menu when viewport grows past lg
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-100 bg-white/95 backdrop-blur-md lg:border-transparent lg:bg-transparent lg:backdrop-blur-none dark:border-white/10 dark:bg-background/95 lg:dark:bg-transparent">
      <div className="flex h-20 w-full items-center justify-between gap-4 px-4 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="font-serif text-base md:text-lg font-semibold tracking-wider text-foreground whitespace-nowrap"
          title={clinic}
        >
          {clinic.toUpperCase()}
        </Link>

        {/* Center floating pill nav */}
        <nav
          ref={navRef as any}
          className="pointer-events-auto relative hidden lg:flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-1.5 py-1.5 backdrop-blur-2xl dark:border-white/10 dark:bg-white/5"
          style={{ boxShadow: "0 10px 40px -12px oklch(0.22 0.01 60 / 0.18)" }}
          aria-label="Primary"
        >
          {/* Animated sliding pill indicator */}
          <span
            aria-hidden
            className="absolute rounded-full"
            style={{
              left: indicator.left,
              width: indicator.width,
              top: 6,
              bottom: 6,
              opacity: indicator.opacity,
              background: "var(--cream)",
              boxShadow: "inset 0 0 0 1px oklch(0.91 0.01 80), 0 6px 18px -10px oklch(0.745 0.095 78 / 0.6)",
              transition:
                "left 450ms cubic-bezier(.2,.8,.2,1), width 450ms cubic-bezier(.2,.8,.2,1), opacity 200ms ease",
              pointerEvents: "none",
            }}
          />
          {links.map((l) => {
            const isActive = active === l.href;
            const className = `relative z-10 rounded-full px-2.5 py-1 text-xs md:text-sm font-medium transition-colors duration-300 ${
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            } ${l.essential ? "" : "hidden xl:flex"}`;
            if (l.route) {
              return (
                <Link
                  key={l.href}
                  to={l.route}
                  ref={(el) => {
                    itemRefs.current[l.href] = el as HTMLAnchorElement | null;
                  }}
                  className={className}
                >
                  {l.label}
                </Link>
              );
            }
            return (
              <a
                key={l.href}
                href={isHome ? l.href : `/${l.href}`}
                ref={(el) => {
                  itemRefs.current[l.href] = el;
                }}
                onClick={(e) => handleNavClick(e, l.href)}
                className={className}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <span
            className="hidden md:inline-flex items-center rounded-full border border-white/30 bg-white/20 backdrop-blur-2xl px-1.5 py-1.5 dark:border-white/10 dark:bg-white/5"
            style={{ boxShadow: "0 10px 40px -12px oklch(0.22 0.01 60 / 0.18)" }}
          >
            <Link
              to="/book-consultation"
              className="btn-gold shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold text-charcoal"
            >
              Book Consultation
            </Link>
          </span>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/30 backdrop-blur-2xl lg:hidden dark:border-white/10 dark:bg-white/5"
            style={{ boxShadow: "0 10px 30px -12px oklch(0.22 0.01 60 / 0.18)" }}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile full-screen drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        {/* Glass backdrop */}
        <div
          className="absolute inset-0 bg-zinc-950/70 backdrop-blur-2xl"
          onClick={() => setOpen(false)}
        />
        {/* Centered nav content */}
        <div
          className={`relative flex h-full w-full flex-col items-center justify-center gap-2 px-6 pb-16 pt-28 transition-all duration-500 ${
            open ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          {links.map((l, i) => {
            const cls = `font-serif text-3xl tracking-wide transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            } ${active === l.href ? "text-gold" : "text-zinc-100/85 hover:text-gold"}`;
            const style = { transitionDelay: open ? `${80 + i * 35}ms` : "0ms" };
            if (l.route) {
              return (
                <Link
                  key={l.href}
                  to={l.route}
                  onClick={() => setOpen(false)}
                  style={style}
                  className={cls}
                >
                  {l.label}
                </Link>
              );
            }
            return (
              <a
                key={l.href}
                href={isHome ? l.href : `/${l.href}`}
                onClick={(e) => {
                  handleNavClick(e, l.href);
                  setOpen(false);
                }}
                style={style}
                className={cls}
              >
                {l.label}
              </a>
            );
          })}
          <Link
            to="/book-consultation"
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${80 + links.length * 35}ms` : "0ms" }}
            className={`btn-gold mt-8 inline-flex min-w-[220px] justify-center rounded-full px-8 py-3.5 text-sm font-semibold text-charcoal shadow-[var(--shadow-gold)] transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </header>
  );
}
