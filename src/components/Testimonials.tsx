import { Quote, Star, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const reviews = [
  {
    text: "Incredible experience. The team was professional and the results felt completely natural. I couldn't have hoped for a better outcome.",
    name: "Rahul Verma",
    location: "Mumbai",
  },
  {
    text: "Dr. Sharma's attention to detail is exceptional. The procedure was painless and the recovery was quick. Highly recommended.",
    name: "Priya Singh",
    location: "Delhi",
  },
  {
    text: "From the very first consultation, I felt heard and cared for. The clinic is a true sanctuary.",
    name: "Arjun Kapoor",
    location: "Bangalore",
  },
];

const trustBadges = [
  "US-FDA Approved Tech",
  "ISHRS Certified Team",
  "100% Painless Protocol",
  "Sterilized Zero-Infection OT",
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">Testimonials</p>
            <h2 className="font-serif text-4xl text-foreground md:text-5xl">
              Patient <span className="italic text-gradient-gold">Experiences</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 140}>
              <article className="card-lift relative h-full rounded-2xl border border-border/60 bg-card p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)]">
                <Quote className="absolute right-6 top-6 h-10 w-10 text-gold/15" />
                <div className="mb-4 flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-[15px] leading-relaxed text-foreground/85">"{r.text}"</p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 font-serif text-base text-gold">
                    {r.name[0]}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.location}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trustBadges.map((b) => (
              <div
                key={b}
                className="flex items-center gap-3 rounded-xl border border-gold/25 bg-card/70 px-4 py-4"
              >
                <ShieldCheck className="h-5 w-5 shrink-0 text-gold" />
                <span className="text-sm font-medium text-foreground">{b}</span>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}
