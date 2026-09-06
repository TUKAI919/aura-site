import j1 from "@/assets/journey-1.jpg";
import j2 from "@/assets/journey-2.jpg";
import j3 from "@/assets/journey-3.jpg";
import { Reveal } from "@/components/Reveal";

const steps = [
  { n: "01", img: j1, title: "Consultation", desc: "A private, in-depth conversation to understand your goals and vision." },
  { n: "02", img: j2, title: "Treatment Plan", desc: "A bespoke surgical roadmap built around your unique anatomy." },
  { n: "03", img: j3, title: "Natural Restoration", desc: "Lifelong, completely undetectable results with minimal downtime." },
];

export function Journey() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[#FAF8F5] py-20 md:py-28 dark:bg-background"
    >
      <div className="blob animate-blob -left-20 top-10 h-72 w-72 bg-gold/15" aria-hidden="true" />
      <div className="blob animate-blob bottom-10 right-0 h-80 w-80 bg-gold/10" style={{ animationDelay: "-7s" }} aria-hidden="true" />

      <div className="container-px relative mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">The Process</p>
            <h2 className="font-serif text-4xl text-foreground md:text-5xl">
              The <span className="italic text-gradient-gold">Patient Journey</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Three carefully crafted stages designed around clarity, comfort, and confidence.
            </p>
          </div>
        </Reveal>

        <div className="relative grid gap-6 md:grid-cols-3">
          {/* connector line */}
          <div className="pointer-events-none absolute left-0 right-0 top-[42%] hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent md:block" aria-hidden="true" />

          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 160}>
              <article className="group relative overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border transition-all duration-500 hover:shadow-[var(--shadow-soft)] hover:ring-gold/40">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="img-zoom h-full w-full object-cover"
                  />
                </div>
                <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 font-serif text-lg text-gold ring-1 ring-gold/40 backdrop-blur">
                  {s.n}
                </div>
                <div className="p-7">
                  <p className="text-[11px] font-medium tracking-[0.3em] text-gold">STEP {s.n}</p>
                  <h3 className="mt-2 font-serif text-2xl text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
