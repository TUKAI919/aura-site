import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Reveal } from "@/components/Reveal";
import { treatments } from "@/data/treatments";

export function TreatmentsCarousel() {
  return (
    <section id="services" className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="blob animate-blob -left-24 top-10 h-72 w-72 bg-gold/15" aria-hidden="true" />
      <div
        className="blob animate-blob bottom-0 right-0 h-80 w-80 bg-background"
        style={{ animationDelay: "-8s" }}
        aria-hidden="true"
      />

      <div className="container-px relative mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Treatments
            </p>
            <h2 className="font-serif text-4xl text-foreground md:text-5xl">
              Excellence in <span className="italic text-gradient-gold">Hair Restoration</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              From precision transplants to non-surgical therapies — explore the full spectrum of
              our signature treatments.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Carousel
            opts={{ align: "start", loop: true }}
            className="relative px-2 sm:px-10 md:px-14"
          >
            <CarouselContent className="-ml-4">
              {treatments.map(({ slug, title, short, image, icon: Icon }) => (
                <CarouselItem
                  key={slug}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <article className="group card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)]">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={image}
                        alt={`${title} — premium hair restoration treatment`}
                        loading="lazy"
                        width={1280}
                        height={896}
                        className="img-zoom h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/90 ring-1 ring-gold/40 backdrop-blur">
                        <Icon className="h-4.5 w-4.5 text-gold" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-serif text-xl text-foreground">{title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {short}
                      </p>
                      <Link
                        to="/treatments"
                        hash={slug}
                        aria-label={`View ${title} treatment details`}
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-all hover:gap-2.5"
                      >
                        View treatment details <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2 sm:left-0 h-10 w-10 border-gold/40 bg-background/90 text-foreground hover:bg-gold hover:text-gold-foreground" />
            <CarouselNext className="-right-2 sm:right-0 h-10 w-10 border-gold/40 bg-background/90 text-foreground hover:bg-gold hover:text-gold-foreground" />
          </Carousel>
        </Reveal>

        <div className="mt-12 text-center">
          <Link
            to="/treatments"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition hover:border-gold hover:bg-gold/10"
          >
            Explore all treatments <ArrowRight className="h-4 w-4 text-gold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
