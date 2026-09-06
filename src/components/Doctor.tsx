import doctor from "@/assets/doctor.jpg";
import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { useClinicParams } from "@/hooks/useClinicParams";

const credentials = [
  "MBBS, MD — AIIMS Delhi",
  "Member of ISHRS",
  "Pioneer in Advanced FUE & DHI Implantation",
];

export function Doctor() {
  const { doctor: doctorName } = useClinicParams();
  return (
    <section id="doctor" className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="blob animate-blob right-[-6rem] top-10 h-80 w-80 bg-cream" aria-hidden="true" />
      <div className="container-px relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal y={32}>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-gold/30 via-cream to-transparent blur-xl" aria-hidden="true" />
            <div className="group relative overflow-hidden rounded-2xl bg-cream shadow-[var(--shadow-soft)]">
              <img
                src={doctor}
                alt={doctorName}
                loading="lazy"
                width={1024}
                height={1024}
                className="img-zoom h-full w-full object-cover"
              />
              <div className="absolute bottom-5 left-5 rounded-full bg-background/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-foreground shadow-sm backdrop-blur">
                15+ Years of Artistry
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] md:block">
              <p className="font-serif text-3xl text-gold">10,000+</p>
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Procedures</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">Lead Specialist</p>
            <h2 className="font-serif text-4xl text-foreground md:text-5xl">
              <span className="italic text-gradient-gold">{doctorName}</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              With over 15 years of dedicated focus on restorative hair treatments,{" "}
              {doctorName} is a leading authority in surgical artistry. A meticulous
              approach combines technical mastery with a deeply human understanding
              of what it takes to restore confidence.
            </p>
            <ul className="mt-7 space-y-3">
              {credentials.map((c, i) => (
                <Reveal as="li" key={c} delay={200 + i * 100}>
                  <span className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/30">
                      <Check className="h-3 w-3" />
                    </span>
                    {c}
                  </span>
                </Reveal>
              ))}
            </ul>
            <Link
              to="/book-consultation"
              className="btn-gold mt-8 inline-flex rounded-md px-7 py-3.5 text-sm font-medium shadow-[var(--shadow-gold)]"
            >
              Book an Appointment
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
