// High-trust medical hero background loaded directly from Unsplash
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1920&auto=format&fit=crop";
import { ShieldCheck, Award, Users, BadgeCheck, Sparkles, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";
import { z } from "zod";
import { Link } from "@tanstack/react-router";
import { useClinicParams } from "@/hooks/useClinicParams";

const consultationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Please enter your full name" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[\p{L}\p{M}\s'.\-]+$/u, { message: "Name contains invalid characters" }),
  phone: z
    .string()
    .trim()
    .min(7, { message: "Please enter a valid phone number" })
    .max(20, { message: "Phone must be less than 20 characters" })
    .regex(/^[+\d][\d\s\-()]{6,19}$/, { message: "Please enter a valid phone number" }),
  service: z.enum([
    "FUE Transplant",
    "FUT Precision",
    "PRP Therapy",
    "Aesthetic Consultation",
  ]),
});

export function Hero() {
  const { clinic, city, phone: clinicPhone } = useClinicParams();
  const [values, setValues] = useState({ name: "", phone: "", service: "FUE Transplant" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string; service?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = consultationSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setSubmitted(false);
      return;
    }
    setErrors({});
    setSubmitted(true);
    // Safe encoded WhatsApp handoff
    const msg = `Consultation request:\nName: ${result.data.name}\nPhone: ${result.data.phone}\nService: ${result.data.service}`;
    window.open(`https://wa.me/${clinicPhone}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Board-certified surgeon in a modern luxury clinic"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[45%_center]"
          />
          {/* Universal image dimming so the bright clinic background never fights the text */}
          <div className="absolute inset-0 bg-black/5" />
          {/* Light 25-30% left-to-right readability overlay — keeps the clinic image crisp */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/35 via-background/20 to-transparent" />
          {/* Bottom fade to blend into the next section */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        </div>

        {/* Decorative blobs */}
        <div className="blob animate-blob -left-20 top-24 h-72 w-72 bg-gold/30" aria-hidden="true" />
        <div className="blob animate-blob top-1/2 right-[-4rem] h-80 w-80 bg-cream" style={{ animationDelay: "-6s" }} aria-hidden="true" />

        <div className="container-px relative mx-auto grid max-w-7xl gap-10 py-20 md:py-28 lg:grid-cols-2 lg:gap-12 lg:py-36">
          <div className="max-w-xl">
            <Reveal>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-charcoal backdrop-blur">
                <Sparkles className="h-3 w-3 text-gold" />
                Premium Hair Restoration
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h1
                className="font-serif text-4xl font-bold leading-[1.05] text-charcoal sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ textShadow: "0 1px 3px oklch(1 0 0 / 0.55)" }}
              >
                Best Skin &amp; Hair<br />
                Clinic in <span className="text-gradient-gold italic">{city}</span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p
                className="mt-6 max-w-md text-base font-medium text-charcoal md:text-lg"
                style={{ textShadow: "0 1px 2px oklch(1 0 0 / 0.55)" }}
              >
                At {clinic}, discover bespoke hair restoration tailored to your unique
                features — delivered in an environment of total tranquility.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/treatments"
                  className="btn-gold group relative inline-flex items-center gap-2 overflow-hidden rounded-md px-7 py-3.5 text-sm font-semibold text-charcoal shadow-[var(--shadow-gold)]"
                >
                  <span className="relative z-10">Explore Treatments</span>
                  <ArrowRight className="relative z-10 h-4 w-4" />
                  <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
                </Link>
                <Link
                  to="/"
                  hash="results"
                  className="gold-underline inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"
                >
                  View Results <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={300} y={36}>
            <form
              id="book"
              onSubmit={onSubmit}
              noValidate
              className="lg:ml-auto lg:w-full lg:max-w-md"
            >
              <div className="relative rounded-2xl border border-border/70 bg-card/90 p-7 shadow-[var(--shadow-soft)] backdrop-blur-md">
                <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-gold/40 via-transparent to-cream opacity-60 blur-md" aria-hidden="true" />
                <h2 className="font-serif text-2xl text-foreground">Book a Free Consultation</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  A specialist will reach out within 24 hours.
                </p>
                <div className="mt-6 space-y-4">
                  <Field
                    label="Full Name"
                    type="text"
                    placeholder="Your name"
                    value={values.name}
                    onChange={(v) => setValues((s) => ({ ...s, name: v }))}
                    error={errors.name}
                    maxLength={100}
                    autoComplete="name"
                  />
                  <Field
                    label="Phone Number"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={values.phone}
                    onChange={(v) => setValues((s) => ({ ...s, phone: v }))}
                    error={errors.phone}
                    maxLength={20}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Service of Interest
                    </label>
                    <select
                      value={values.service}
                      onChange={(e) => setValues((s) => ({ ...s, service: e.target.value }))}
                      className="h-11 w-full rounded-md border border-foreground/20 bg-background px-3 text-sm text-foreground transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-ring dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white dark:focus:border-[#CBA469] dark:focus:ring-[#CBA469]"
                    >
                      <option className="bg-white dark:bg-zinc-900 dark:text-white">FUE Transplant</option>
                      <option className="bg-white dark:bg-zinc-900 dark:text-white">FUT Precision</option>
                      <option className="bg-white dark:bg-zinc-900 dark:text-white">PRP Therapy</option>
                      <option className="bg-white dark:bg-zinc-900 dark:text-white">Aesthetic Consultation</option>
                    </select>
                  </div>
                  <button className="btn-gold mt-2 w-full rounded-md py-3.5 text-sm font-bold text-charcoal shadow-[var(--shadow-gold)]">
                    Book Your Consultation
                  </button>
                  {submitted && (
                    <p className="text-center text-xs text-gold" role="status">
                      Thank you — opening WhatsApp to confirm your request.
                    </p>
                  )}
                  <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                    Secure & Confidential
                  </p>
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>

      <div className="relative border-y border-border bg-cream">
        <div className="shimmer-line absolute inset-x-0 top-0 h-px" aria-hidden="true" />
        <div className="container-px mx-auto grid max-w-7xl gap-6 py-7 md:grid-cols-3">
          {[
            { icon: Award, text: "10+ Years Experience" },
            { icon: BadgeCheck, text: "Board Certified Surgeons" },
            { icon: Users, text: "10,000+ Satisfied Patients" },
          ].map(({ icon: Icon, text }, i) => (
            <Reveal key={text} delay={i * 120}>
              <div className="group flex items-center justify-center gap-3 text-sm font-medium text-foreground">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background ring-1 ring-gold/30 transition-all group-hover:ring-gold/70">
                  <Icon className="h-4.5 w-4.5 text-gold transition-transform group-hover:scale-110" />
                </span>
                {text}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  maxLength,
  autoComplete,
  inputMode,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  maxLength?: number;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric" | "search" | "url" | "none";
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={!!error}
        className={`h-11 w-full rounded-md border bg-background px-3 text-sm text-foreground placeholder:text-foreground/60 transition focus:outline-none focus:ring-2 focus:ring-ring dark:bg-zinc-800/50 dark:text-white dark:placeholder-zinc-400 dark:focus:border-[#CBA469] dark:focus:ring-[#CBA469] ${
          error
            ? "border-destructive focus:border-destructive"
            : "border-foreground/20 focus:border-gold dark:border-zinc-700"
        }`}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
