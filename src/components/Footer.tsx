import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useClinicParams } from "@/hooks/useClinicParams";

export function Footer() {
  const { clinic, city, phone, email } = useClinicParams();
  const prettyPhone = phone.length > 2 ? `+${phone}` : phone;
  return (
    <footer id="contact" className="relative overflow-hidden bg-background pt-20 pb-10">
      {/* Decorative animated background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        {/* Soft gradient wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 10% 0%, oklch(0.965 0.015 80 / 0.9), transparent 60%), radial-gradient(70% 60% at 100% 100%, oklch(0.745 0.095 78 / 0.18), transparent 60%)",
          }}
        />
        {/* Animated gold blobs */}
        <span
          className="blob animate-blob"
          style={{ width: 380, height: 380, left: "-80px", top: "20%", background: "oklch(0.745 0.095 78 / 0.35)" }}
        />
        <span
          className="blob animate-blob"
          style={{
            width: 320,
            height: 320,
            right: "-60px",
            bottom: "-80px",
            background: "oklch(0.85 0.06 80 / 0.45)",
            animationDelay: "-6s",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.22 0.01 60) 1px, transparent 1px), linear-gradient(90deg, oklch(0.22 0.01 60) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }}
        />
        {/* Shimmering top divider */}
        <div className="absolute left-0 right-0 top-0 h-px shimmer-line" />
      </div>

      <div className="container-px relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 border-t border-border pt-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-serif text-2xl tracking-[0.18em] text-foreground">{clinic.toUpperCase()}</p>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A premier destination for hair restoration and aesthetic excellence —
              where craftsmanship meets care.
            </p>
          </div>
          <div className="md:col-span-2">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/treatments" className="hover:text-foreground">Treatments</Link></li>
              <li><a href="/#results" className="hover:text-foreground">Results</a></li>
              <li><a href="/#doctor" className="hover:text-foreground">About</a></li>
              <li><Link to="/book-consultation" className="hover:text-foreground">Book</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 text-gold" />{city}</li>
              <li className="flex gap-2.5"><Phone className="mt-0.5 h-4 w-4 text-gold" /><a href={`tel:${prettyPhone}`}>{prettyPhone}</a></li>
              <li className="flex gap-2.5"><Mail className="mt-0.5 h-4 w-4 text-gold" /><a href={`mailto:${email}`}>{email}</a></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">Find Us</h4>
            <div className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <iframe
                title={`${clinic} location in ${city}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(clinic + " " + city)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                className="aspect-square w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic + " " + city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm ring-1 ring-border backdrop-blur-sm transition hover:bg-background hover:ring-gold/50"
              >
                <MapPin className="h-3.5 w-3.5 text-gold" />
                Open in Maps
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {clinic}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
