import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, HeartPulse } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Reveal } from "@/components/Reveal";
import { treatments } from "@/data/treatments";

const SITE_URL = "https://premium-aesthetics-pro.lovable.app";

export const Route = createFileRoute("/treatments")({
  head: () => {
    const collectionJsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Hair Restoration & Aesthetic Treatments",
      url: `${SITE_URL}/treatments`,
      hasPart: treatments.map((t) => ({
        "@type": "MedicalProcedure",
        name: t.title,
        description: t.long,
        url: `${SITE_URL}/treatments#${t.slug}`,
      })),
    };
    return {
      meta: [
        { title: "Treatments — Hair Restoration & Aesthetics | Aura Skin & Hair Clinic" },
        {
          name: "description",
          content:
            "Explore our full menu of hair restoration treatments: FUE, FUT, PRP therapy, Scalp Micropigmentation, Laser Hair Therapy and Beard & Eyebrow transplants.",
        },
        { property: "og:title", content: "Treatments — Aura Skin & Hair Clinic" },
        {
          property: "og:description",
          content:
            "Surgical and non-surgical hair restoration delivered with artistry and care.",
        },
        { property: "og:url", content: `${SITE_URL}/treatments` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/treatments` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(collectionJsonLd).replace(/</g, "\\u003c"),
        },
      ],
    };
  },
  component: TreatmentsPage,
});

function TreatmentsPage() {
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <Header />
      <main className="pt-28">
        {/* Hero */}
        <section className="relative overflow-hidden bg-cream">
          <div className="blob animate-blob -left-20 top-10 h-72 w-72 bg-gold/20" aria-hidden="true" />
          <div
            className="blob animate-blob right-0 bottom-0 h-80 w-80 bg-background"
            style={{ animationDelay: "-6s" }}
            aria-hidden="true"
          />
          <div className="container-px relative mx-auto max-w-5xl py-20 text-center md:py-28">
            <Reveal>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
                Our Services
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="font-serif text-4xl text-foreground md:text-6xl">
                Treatments designed around{" "}
                <span className="italic text-gradient-gold">you</span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mx-auto mt-6 max-w-2xl text-muted-foreground md:text-lg">
                Whether you are looking for a permanent hair transplant or a gentle non-surgical
                boost, our specialists guide you to the right treatment with honesty and care.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Treatment sections */}
        <section className="container-px mx-auto max-w-7xl space-y-24 py-20 md:py-28">
          {treatments.map((t, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={t.slug}
                id={t.slug}
                className="scroll-mt-32 grid items-center gap-10 md:grid-cols-2 md:gap-16"
              >
                <Reveal y={36}>
                  <div className={reverse ? "md:order-2" : ""}>
                    <div className="relative overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
                      <img
                        src={t.image}
                        alt={`${t.title} at Aura Skin & Hair Clinic`}
                        loading="lazy"
                        width={1280}
                        height={896}
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={120} y={28}>
                  <div className={reverse ? "md:order-1" : ""}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-cream px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-gold">
                      <t.icon className="h-3.5 w-3.5" />
                      {`Treatment ${String(i + 1).padStart(2, "0")}`}
                    </span>
                    <h2 className="mt-4 font-serif text-3xl text-foreground md:text-4xl">
                      {t.title}
                    </h2>
                    <p className="mt-4 text-muted-foreground">{t.long}</p>

                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {t.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-foreground/90">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5">
                        <Clock className="h-3.5 w-3.5 text-gold" />
                        Duration: {t.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5">
                        <HeartPulse className="h-3.5 w-3.5 text-gold" />
                        Recovery: {t.recovery}
                      </span>
                    </div>

                    <Link
                      to="/book-consultation"
                      search={{ treatment: t.slug }}
                      className="btn-gold mt-7 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold shadow-[var(--shadow-gold)]"
                    >
                      Book this treatment <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </section>

        {/* Bottom CTA */}
        <section className="relative overflow-hidden bg-cream py-20 md:py-24">
          <div className="container-px mx-auto max-w-4xl text-center">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
                Begin Your Journey
              </p>
              <h2 className="mt-3 font-serif text-3xl text-foreground md:text-5xl">
                Not sure which treatment is right for you?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Book a free, no-pressure consultation. Our specialists will assess your goals and
                recommend the perfect plan.
              </p>
              <Link
                to="/book-consultation"
                className="btn-gold mt-8 inline-flex items-center gap-2 rounded-md px-8 py-3.5 text-sm font-semibold shadow-[var(--shadow-gold)]"
              >
                Book a Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
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
