import { Scissors, Microscope, Droplet, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const services = [
  {
    icon: Scissors,
    title: "FUE Transplant",
    desc: "Follicular Unit Extraction with single-graft precision — minimally invasive, natural-looking density, and a fast recovery curve.",
  },
  {
    icon: Microscope,
    title: "FUT Precision",
    desc: "Advanced strip technique optimised for maximum coverage and density in a single session, performed under microscopic magnification.",
  },
  {
    icon: Droplet,
    title: "PRP Therapy",
    desc: "Platelet-rich plasma treatment to stimulate dormant follicles, reduce shedding, and enhance overall scalp health.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="blob animate-blob -left-24 top-10 h-72 w-72 bg-gold/15" aria-hidden="true" />
      <div className="blob animate-blob bottom-0 right-0 h-80 w-80 bg-background" style={{ animationDelay: "-8s" }} aria-hidden="true" />

      <div className="container-px relative mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">Treatments</p>
            <h2 className="font-serif text-4xl text-foreground md:text-5xl">
              Excellence in <span className="italic text-gradient-gold">Hair Restoration</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Comprehensive technologies executed with meticulous attention to detail.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 140}>
              <article className="group card-lift relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card p-8 text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-cream ring-1 ring-gold/30 transition-transform duration-500 group-hover:scale-110" />
                  <span className="absolute inset-0 rounded-full ring-1 ring-gold/0 transition-all duration-700 group-hover:scale-150 group-hover:ring-gold/40" />
                  <Icon className="relative h-7 w-7 text-gold transition-transform duration-500 group-hover:-rotate-6" />
                </div>
                <h3 className="font-serif text-2xl text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <a
                  href="#book"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-all group-hover:gap-2.5"
                >
                  Read More <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
