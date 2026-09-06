import { Reveal } from "@/components/Reveal";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import beforeImg from "@/assets/result-before.jpg";
import afterImg from "@/assets/result-after.webp";
import crownBefore from "@/assets/crown-before.jpg";
import crownAfter from "@/assets/crown-after.jpg";
import beardBefore from "@/assets/beard-before.jpg";
import beardAfter from "@/assets/beard-after.jpg";

const cards = [
  {
    title: "Frontal Hairline",
    note: "FUE • 1,800 grafts • 8 month result",
    before: beforeImg,
    after: afterImg,
  },
  {
    title: "Crown Density",
    note: "FUE • 2,400 grafts • 12 month result",
    before: crownBefore,
    after: crownAfter,
  },
  {
    title: "Beard Restoration",
    note: "Beard FUE • 1,200 grafts • 6 month result",
    before: beardBefore,
    after: beardAfter,
  },
];

export function Results() {
  return (
    <section id="results" className="bg-background py-20 md:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">Results</p>
            <h2 className="font-serif text-4xl text-foreground md:text-5xl">
              Artistry in <span className="italic text-gradient-gold">Transformation</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Witness the clinical precision and natural-looking results achieved by our master surgeons.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <figure
                key={card.title}
                className="overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border"
              >
                <BeforeAfterSlider
                  beforeSrc={card.before}
                  afterSrc={card.after}
                  beforeAlt={`${card.title} — before`}
                  afterAlt={`${card.title} — after`}
                  className="rounded-t-2xl"
                />
                <figcaption className="bg-secondary/60 px-5 py-5 text-center">
                  <h3 className="font-serif text-xl text-foreground">{card.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{card.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
