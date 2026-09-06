import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShieldCheck,
  Sparkles,
  CalendarDays,
  Phone,
  Mail,
  User,
  Stethoscope,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Reveal } from "@/components/Reveal";
import { treatments } from "@/data/treatments";
import { useClinicParams } from "@/hooks/useClinicParams";

function BookingContactPills() {
  const { phone, email } = useClinicParams();
  const prettyPhone = phone.length > 2 ? `+${phone}` : phone;
  return (
    <div className="mt-10 flex flex-wrap gap-3 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 ring-1 ring-border">
        <Phone className="h-3.5 w-3.5 text-gold" /> {prettyPhone}
      </span>
      <a
        href={`mailto:${email}`}
        className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 ring-1 ring-border hover:ring-gold/50"
      >
        <Mail className="h-3.5 w-3.5 text-gold" /> {email}
      </a>
    </div>
  );
}

const bookingSearchSchema = z.object({
  treatment: z.string().optional(),
});

const SITE_URL = "https://premium-aesthetics-pro.lovable.app";

export const Route = createFileRoute("/book-consultation")({
  validateSearch: bookingSearchSchema,
  head: () => {
    const contactJsonLd = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Book a Free Consultation",
      url: `${SITE_URL}/book-consultation`,
      about: {
        "@type": "MedicalBusiness",
        name: "Aura Skin & Hair Clinic",
      },
    };
    return {
      meta: [
        { title: "Book a Free Consultation | Aura Skin & Hair Clinic" },
        {
          name: "description",
          content:
            "Schedule a free, confidential consultation with our hair restoration specialists. A simple 3-step booking experience.",
        },
        { property: "og:title", content: "Book a Free Consultation — Aura Skin & Hair Clinic" },
        {
          property: "og:description",
          content:
            "Tell us about your goals and pick a date — a specialist will reach out within 24 hours.",
        },
        { property: "og:url", content: `${SITE_URL}/book-consultation` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/book-consultation` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(contactJsonLd).replace(/</g, "\\u003c"),
        },
      ],
    };
  },
  component: BookConsultationPage,
});

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name" })
    .max(100)
    .regex(/^[\p{L}\p{M}\s'.\-]+$/u, { message: "Name contains invalid characters" }),
  phone: z
    .string()
    .trim()
    .min(7, { message: "Please enter a valid phone number" })
    .max(20)
    .regex(/^\+?[0-9][0-9\s\-()]{5,18}[0-9]$/, { message: "Please enter a valid phone number" }),
  email: z.string().trim().email({ message: "Please enter a valid email" }).max(150),
  date: z.string().min(1, { message: "Please pick a preferred date" }),
  treatment: z.string().min(1, { message: "Please choose a treatment" }),
  notes: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormValues, string>>;

function BookConsultationPage() {
  const { treatment: prefill } = Route.useSearch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<FormValues>({
    name: "",
    phone: "",
    email: "",
    date: "",
    treatment: prefill ?? treatments[0].slug,
    notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormValues>(k: K, v: FormValues[K]) =>
    setValues((s) => ({ ...s, [k]: v }));

  const validateStep = (current: number): boolean => {
    const e: Errors = {};
    if (current === 1) {
      const r = schema.pick({ name: true, phone: true, email: true }).safeParse(values);
      if (!r.success) {
        for (const i of r.error.issues) {
          const k = i.path[0] as keyof FormValues;
          if (!e[k]) e[k] = i.message;
        }
      }
    } else if (current === 2) {
      const r = schema.pick({ date: true, treatment: true }).safeParse(values);
      if (!r.success) {
        for (const i of r.error.issues) {
          const k = i.path[0] as keyof FormValues;
          if (!e[k]) e[k] = i.message;
        }
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => validateStep(step) && setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(values);
    if (!r.success) {
      const er: Errors = {};
      for (const i of r.error.issues) {
        const k = i.path[0] as keyof FormValues;
        if (!er[k]) er[k] = i.message;
      }
      setErrors(er);
      // jump back to the first step with an error
      if (er.name || er.phone || er.email) setStep(1);
      else if (er.date || er.treatment) setStep(2);
      return;
    }
    setErrors({});
    setSubmitted(true);
    const t = treatments.find((x) => x.slug === r.data.treatment)?.title ?? r.data.treatment;
    const msg = `New consultation request\nName: ${r.data.name}\nPhone: ${r.data.phone}\nEmail: ${r.data.email}\nPreferred date: ${r.data.date}\nTreatment: ${t}${
      r.data.notes ? `\nNotes: ${r.data.notes}` : ""
    }`;
    window.open(
      `https://wa.me/919876543210?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const steps = [
    { n: 1, label: "Your Details", icon: User },
    { n: 2, label: "Preferences", icon: CalendarDays },
    { n: 3, label: "Review", icon: Check },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <Header />
      <main className="pt-28">
        <section className="relative overflow-hidden bg-cream">
          <div className="blob animate-blob -left-20 top-10 h-72 w-72 bg-gold/20" aria-hidden="true" />
          <div
            className="blob animate-blob right-0 bottom-0 h-80 w-80 bg-background"
            style={{ animationDelay: "-6s" }}
            aria-hidden="true"
          />
          <div className="container-px relative mx-auto max-w-6xl py-16 md:py-24">
            <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
              {/* Left intro */}
              <Reveal>
                <div>
                  <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-background/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-gold backdrop-blur">
                    <Sparkles className="h-3 w-3" /> Free Consultation
                  </p>
                  <h1 className="font-serif text-4xl text-foreground md:text-5xl lg:text-6xl">
                    Begin your journey to{" "}
                    <span className="italic text-gradient-gold">restored confidence</span>
                  </h1>
                  <p className="mt-5 max-w-md text-muted-foreground md:text-lg">
                    Tell us a little about you. A specialist will reach out within 24 hours to
                    confirm your appointment and answer every question.
                  </p>

                  <ul className="mt-8 space-y-3 text-sm text-foreground/90">
                    {[
                      "Private 1:1 consultation with a senior specialist",
                      "No pressure — explore options at your pace",
                      "Personalised treatment plan and clear pricing",
                      "100% confidential",
                    ].map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        {line}
                      </li>
                    ))}
                  </ul>

                  <BookingContactPills />
                </div>
              </Reveal>

              {/* Form card */}
              <Reveal delay={120} y={32}>
                <div className="relative rounded-2xl border border-border/70 bg-card/90 p-7 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-10">
                  <div
                    className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-gold/40 via-transparent to-cream opacity-60 blur-md"
                    aria-hidden="true"
                  />

                  {/* Stepper */}
                  <ol className="mb-8 flex items-center justify-between gap-2">
                    {steps.map((s, idx) => {
                      const active = step === s.n;
                      const done = step > s.n;
                      return (
                        <li key={s.n} className="flex flex-1 items-center">
                          <div className="flex items-center gap-2">
                            <span
                              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                                done
                                  ? "bg-gold text-gold-foreground"
                                  : active
                                  ? "bg-foreground text-background ring-2 ring-gold/60 ring-offset-2 ring-offset-card"
                                  : "bg-cream text-muted-foreground"
                              }`}
                            >
                              {done ? <Check className="h-4 w-4" /> : s.n}
                            </span>
                            <span
                              className={`hidden text-xs font-medium uppercase tracking-wider sm:inline ${
                                active || done ? "text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              {s.label}
                            </span>
                          </div>
                          {idx < steps.length - 1 && (
                            <span
                              className={`mx-3 h-px flex-1 transition-colors ${
                                done ? "bg-gold" : "bg-border"
                              }`}
                            />
                          )}
                        </li>
                      );
                    })}
                  </ol>

                  {submitted ? (
                    <SuccessPanel
                      onReset={() => {
                        setSubmitted(false);
                        setStep(1);
                        navigate({ to: "/" });
                      }}
                    />
                  ) : (
                    <form onSubmit={onSubmit} noValidate className="space-y-5">
                      {step === 1 && (
                        <div className="space-y-4">
                          <Field
                            label="Full Name"
                            type="text"
                            placeholder="Your name"
                            icon={User}
                            value={values.name}
                            onChange={(v) => update("name", v)}
                            error={errors.name}
                            autoComplete="name"
                            maxLength={100}
                          />
                          <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                              label="Phone Number"
                              type="tel"
                              placeholder="+91 98765 43210"
                              icon={Phone}
                              value={values.phone}
                              onChange={(v) => update("phone", v)}
                              error={errors.phone}
                              autoComplete="tel"
                              maxLength={20}
                              inputMode="tel"
                            />
                            <Field
                              label="Email"
                              type="email"
                              placeholder="you@example.com"
                              icon={Mail}
                              value={values.email}
                              onChange={(v) => update("email", v)}
                              error={errors.email}
                              autoComplete="email"
                              maxLength={150}
                            />
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-4">
                          <Field
                            label="Preferred Date"
                            type="date"
                            placeholder=""
                            icon={CalendarDays}
                            value={values.date}
                            onChange={(v) => update("date", v)}
                            error={errors.date}
                            min={new Date().toISOString().slice(0, 10)}
                          />
                          <div>
                            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                              Treatment of Interest
                            </label>
                            <div className="relative">
                              <Stethoscope className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
                              <select
                                value={values.treatment}
                                onChange={(e) => update("treatment", e.target.value)}
                                className="h-11 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm text-foreground transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-ring dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white dark:focus:border-[#CBA469] dark:focus:ring-[#CBA469]"
                              >
                                {treatments.map((t) => (
                                  <option
                                    key={t.slug}
                                    value={t.slug}
                                    className="bg-white dark:bg-zinc-900 dark:text-white"
                                  >
                                    {t.title}
                                  </option>
                                ))}
                                <option
                                  value="not-sure"
                                  className="bg-white dark:bg-zinc-900 dark:text-white"
                                >
                                  Not sure — please advise
                                </option>
                              </select>
                            </div>
                            {errors.treatment && (
                              <p className="mt-1 text-xs text-destructive">{errors.treatment}</p>
                            )}
                          </div>
                          <div>
                            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                              Notes (optional)
                            </label>
                            <textarea
                              value={values.notes ?? ""}
                              onChange={(e) => update("notes", e.target.value)}
                              maxLength={500}
                              rows={4}
                              placeholder="Tell us anything that would help our specialist…"
                              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-ring dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white dark:placeholder-zinc-400 dark:focus:border-[#CBA469] dark:focus:ring-[#CBA469]"
                            />
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="rounded-xl border border-border bg-background/60 p-5 text-sm">
                          <h3 className="font-serif text-lg text-foreground">Review your details</h3>
                          <dl className="mt-4 grid gap-2 sm:grid-cols-2">
                            <Row label="Name" value={values.name} />
                            <Row label="Phone" value={values.phone} />
                            <Row label="Email" value={values.email} />
                            <Row label="Preferred date" value={values.date} />
                            <Row
                              label="Treatment"
                              value={
                                treatments.find((t) => t.slug === values.treatment)?.title ??
                                "Not sure — please advise"
                              }
                            />
                            {values.notes && (
                              <div className="sm:col-span-2">
                                <Row label="Notes" value={values.notes} />
                              </div>
                            )}
                          </dl>
                          <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                            <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                            By submitting you agree to be contacted about your consultation.
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={back}
                          disabled={step === 1}
                          className="inline-flex items-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-medium text-foreground/70 transition hover:text-foreground disabled:opacity-40"
                        >
                          <ArrowLeft className="h-4 w-4" /> Back
                        </button>
                        {step < 3 ? (
                          <button
                            type="button"
                            onClick={next}
                            className="btn-gold inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold shadow-[var(--shadow-gold)]"
                          >
                            Continue <ArrowRight className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="btn-gold inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold shadow-[var(--shadow-gold)]"
                          >
                            Confirm Booking <Check className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileActionBar />
      <WhatsAppButton />
      <ThemeToggle />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 text-foreground">{value}</dd>
    </div>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <div className="py-10 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 ring-1 ring-gold/40">
        <Check className="h-7 w-7 text-gold" />
      </div>
      <h2 className="mt-5 font-serif text-2xl text-foreground">Request received</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        We've opened WhatsApp to confirm your booking. A specialist will reach out within 24 hours.
      </p>
      <button
        onClick={onReset}
        className="btn-gold mt-7 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold shadow-[var(--shadow-gold)]"
      >
        Back to home <ArrowRight className="h-4 w-4" />
      </button>
    </div>
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
  icon: Icon,
  min,
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
  icon?: React.ComponentType<{ className?: string }>;
  min?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          autoComplete={autoComplete}
          inputMode={inputMode}
          min={min}
          aria-invalid={!!error}
          className={`h-11 w-full rounded-md border bg-background ${
            Icon ? "pl-9 pr-3" : "px-3"
          } text-sm text-foreground placeholder:text-muted-foreground transition focus:outline-none focus:ring-2 focus:ring-ring dark:bg-zinc-800/50 dark:text-white dark:placeholder-zinc-400 dark:focus:border-[#CBA469] dark:focus:ring-[#CBA469] ${
            error
              ? "border-destructive focus:border-destructive"
              : "border-input focus:border-gold dark:border-zinc-700"
          }`}
        />
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
