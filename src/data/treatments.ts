import fueImg from "@/assets/treatments/fue.jpg";
import futImg from "@/assets/treatments/fut.jpg";
import prpImg from "@/assets/treatments/prp.jpg";
import smpImg from "@/assets/treatments/smp.jpg";
import laserImg from "@/assets/treatments/laser.jpg";
import beardImg from "@/assets/treatments/beard.jpg";
import { Scissors, Microscope, Droplet, Brush, Zap, User } from "lucide-react";

export type Treatment = {
  slug: string;
  title: string;
  short: string;
  long: string;
  bullets: string[];
  duration: string;
  recovery: string;
  image: string;
  icon: typeof Scissors;
};

export const treatments: Treatment[] = [
  {
    slug: "fue",
    title: "FUE Hair Transplant",
    short:
      "Tiny single follicles are moved one by one for a natural, scar-free finish.",
    long:
      "Follicular Unit Extraction (FUE) is the most popular modern hair transplant method. The surgeon removes individual hair follicles from the back of your head, one at a time, using a tiny precision tool. These follicles are then placed exactly where you need more hair. Because each follicle is taken separately, there is no long cut and no visible line scar. You can wear short hair afterwards without anyone noticing.",
    bullets: [
      "No linear scar — keep short hairstyles",
      "Minimal discomfort under local anaesthesia",
      "Most patients are back to work in 2–3 days",
      "Permanent, natural-looking growth",
    ],
    duration: "6–8 hours",
    recovery: "2–3 days",
    image: fueImg,
    icon: Scissors,
  },
  {
    slug: "fut",
    title: "FUT Hair Transplant",
    short:
      "A proven strip technique that delivers maximum density in a single session.",
    long:
      "Follicular Unit Transplantation (FUT) involves removing a thin strip of skin from the back of the head, where hair grows thickest. Skilled technicians then separate the strip into thousands of healthy follicle groups under microscopes, and the surgeon plants them in the thinning areas. FUT is ideal when you need a large number of grafts in one go, and it usually offers the highest possible density per session.",
    bullets: [
      "Highest graft yield in one session",
      "Excellent for advanced hair loss",
      "Donor hair stays permanently strong",
      "Fine scar easily hidden under existing hair",
    ],
    duration: "5–7 hours",
    recovery: "7–10 days",
    image: futImg,
    icon: Microscope,
  },
  {
    slug: "prp",
    title: "PRP Therapy",
    short:
      "Your own platelets are injected to wake sleeping follicles and stop shedding.",
    long:
      "Platelet-Rich Plasma (PRP) therapy uses the natural healing power of your own blood. We take a small sample, spin it in a centrifuge to concentrate the growth-factor-rich platelets, then gently inject the golden serum into your scalp. This stimulates dormant follicles, slows down hair fall, and thickens existing strands. PRP is a great stand-alone treatment for early thinning and a powerful boost after a transplant.",
    bullets: [
      "100% natural — uses your own blood",
      "Reduces shedding in 4–6 weeks",
      "Thickens existing hair strands",
      "No downtime — walk in, walk out",
    ],
    duration: "45–60 minutes",
    recovery: "None",
    image: prpImg,
    icon: Droplet,
  },
  {
    slug: "smp",
    title: "Scalp Micropigmentation (SMP)",
    short:
      "Detailed micro-dots create the illusion of a freshly buzzed, fuller head of hair.",
    long:
      "Scalp Micropigmentation is a non-surgical cosmetic treatment. Using ultra-fine needles and specialised pigments, we place thousands of tiny dots on the scalp that look exactly like real hair follicles. SMP is perfect for covering scars, adding density to thinning areas, or recreating a sharp, defined hairline. The result is a clean, confident look — usually completed in 2 to 3 short sessions.",
    bullets: [
      "Completely non-surgical, no incisions",
      "Hides scars and thinning patches",
      "Lasts 4–6 years with simple touch-ups",
      "Sharp, modern hairline design",
    ],
    duration: "2–4 hours per session",
    recovery: "1–2 days",
    image: smpImg,
    icon: Brush,
  },
  {
    slug: "laser",
    title: "Low-Level Laser Therapy",
    short:
      "Gentle red light energises follicles for thicker, healthier hair growth.",
    long:
      "Low-Level Laser Therapy (LLLT) uses safe, painless red light to stimulate the cells inside your hair follicles. Better blood flow and increased cell activity help slow hair loss and encourage new, thicker growth. We offer in-clinic sessions and approved home devices, making it the most relaxing treatment in our menu — many patients use it alongside PRP or after a transplant for faster results.",
    bullets: [
      "Painless and 100% non-invasive",
      "FDA-cleared technology",
      "Boosts results of other treatments",
      "Home-use devices available",
    ],
    duration: "20–30 minutes",
    recovery: "None",
    image: laserImg,
    icon: Zap,
  },
  {
    slug: "beard-eyebrow",
    title: "Beard & Eyebrow Transplant",
    short:
      "Define your beard line or restore full, shaped eyebrows with precise grafts.",
    long:
      "Using the same FUE method as scalp transplants, we carefully move single follicles to fill gaps in your beard, moustache, sideburns, or eyebrows. Every hair is placed at the correct angle and direction so the new growth looks completely natural. Whether you want a fuller beard, sharper eyebrow arches, or to cover a scar, our surgeons design each session around your facial features.",
    bullets: [
      "Natural angle and direction for every hair",
      "Permanent, grows like your own hair",
      "Covers scars, gaps, and patchy areas",
      "Custom-designed shape for your face",
    ],
    duration: "3–5 hours",
    recovery: "3–5 days",
    image: beardImg,
    icon: User,
  },
];
