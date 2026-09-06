import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import { Results } from "@/components/Results";
import { TreatmentsCarousel } from "@/components/TreatmentsCarousel";
import { Doctor } from "@/components/Doctor";
import { Journey } from "@/components/Journey";
import { Sanctuary } from "@/components/Sanctuary";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { resultItems, faqs } from "@/data/site";

const SITE_URL = "https://premium-aesthetics-pro.lovable.app";

export const Route = createFileRoute("/")({
  head: () => {
    const faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };

    const resultsJsonLd = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Hair Restoration Results",
      itemListElement: resultItems.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "ImageObject",
          name: `${it.title} — before and after`,
          caption: `${it.title}. ${it.note}.`,
          description: `${it.title} hair restoration before and after photo. ${it.note}.`,
          contentUrl: `${SITE_URL}${it.img}`,
          representativeOfPage: false,
          creditText: "Aura Skin & Hair Clinic",
        },
      })),
    };

    const reviewJsonLd = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: "Aura Skin & Hair Clinic",
      image: `${SITE_URL}${resultItems[0].img}`,
      description:
        "Premium hair restoration and aesthetic clinic offering FUE, FUT and PRP therapy.",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "248",
        bestRating: "5",
      },
      review: resultItems.map((it) => ({
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Verified Patient" },
        name: it.title,
        reviewBody: `${it.title} — ${it.note}. Natural-looking, undetectable result delivered with surgical artistry.`,
      })),
    };

    return {
      meta: [
        { title: "Aura Skin & Hair Clinic — Hair Transplant & Skin Care in Raipur" },
        {
          name: "description",
          content:
            "Bespoke hair transplant and aesthetic treatments by board-certified surgeons. FUE, FUT and PRP therapy in a serene, world-class clinic.",
        },
        { property: "og:title", content: "Aura Skin & Hair Clinic — Hair Restoration" },
        {
          property: "og:description",
          content:
            "Confidence, restored. Discover bespoke hair restoration delivered with surgical artistry.",
        },
        { property: "og:url", content: `${SITE_URL}/` },
        { property: "og:image", content: `${SITE_URL}${resultItems[0].img}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: `${SITE_URL}${resultItems[0].img}` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(resultsJsonLd).replace(/</g, "\\u003c"),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(reviewJsonLd).replace(/</g, "\\u003c"),
        },
      ],
    };
  },
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <Header />
      <main>
        <Hero />
        <Results />
        <TreatmentsCarousel />
        <Doctor />
        <Journey />
        <Sanctuary />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <MobileActionBar />
      <WhatsAppButton />
      <ThemeToggle />
    </div>
  );
}
