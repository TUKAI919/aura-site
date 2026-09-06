import c1 from "@/assets/clinic-1.jpg";
import c2 from "@/assets/clinic-2.jpg";
import c3 from "@/assets/clinic-3.jpg";
import c4 from "@/assets/clinic-4.jpg";
import { Reveal } from "@/components/Reveal";

const photos = [
  { src: c1, alt: "Reception", className: "row-span-2 aspect-[3/4] md:aspect-auto" },
  { src: c2, alt: "Consultation room", className: "aspect-[4/3] md:col-span-2" },
  { src: c3, alt: "Architectural detail", className: "aspect-square" },
  { src: c4, alt: "Treatment chair", className: "aspect-square md:col-span-2" },
];

export function Sanctuary() {
  return (
    <section id="gallery" className="bg-background py-20 md:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">The Space</p>
            <h2 className="font-serif text-4xl text-foreground md:text-5xl">
              Our <span className="italic text-gradient-gold">Sanctuary</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Designed to evoke tranquility, our clinic merges architectural craftsmanship with medical-grade quality.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {photos.map((p, i) => (
            <Reveal key={p.alt} delay={i * 120} className={p.className}>
              <div className="group relative h-full w-full overflow-hidden rounded-2xl">
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="img-zoom h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 translate-y-2 text-xs font-medium uppercase tracking-[0.25em] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {p.alt}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
