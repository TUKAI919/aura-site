import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { faqs } from "@/data/site";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-cream py-20 md:py-28">
      <div className="container-px mx-auto max-w-3xl">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">FAQ</p>
            <h2 className="font-serif text-4xl text-foreground md:text-5xl">
              Frequently <span className="italic text-gradient-gold">Asked</span> Questions
            </h2>
            <p className="mt-4 text-muted-foreground">Everything you need to know about your hair restoration journey.</p>
          </div>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 100}>
                <div className={`overflow-hidden rounded-xl border bg-card transition-all duration-300 ${isOpen ? "border-gold/40 shadow-[var(--shadow-card)]" : "border-border"}`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-serif text-lg text-foreground">{f.q}</span>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "bg-gold text-primary-foreground rotate-45" : "bg-cream text-gold"}`}>
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
