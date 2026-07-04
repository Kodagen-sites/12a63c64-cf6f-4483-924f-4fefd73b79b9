"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/content/site-config";
import { resolveImage } from "@/lib/image-fallback";
import { getAsset } from "@/lib/assets";
import CanvasAtmosphere from "@/components/motion/CanvasAtmosphere";
import ScrollHint from "@/components/motion/ScrollHint";
import BookButton from "@/components/BookButton";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // T4 — still image + parallax drift as the section scrolls away.
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const overlayY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const heroImg = resolveImage({
    src: getAsset("section-hero"),
    industry: "dental-clinic",
    keyword: "modern bright dental clinic reception",
    brandColor: siteConfig.brand.primary,
  });

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
      {/* Parallax still */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 -z-10">
        <img src={heroImg} alt="" aria-hidden className="h-full w-full object-cover" style={{ filter: "brightness(0.5) saturate(0.95)" }} />
      </motion.div>
      {/* Gradient wash for legibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      {/* Ambient azure particle field */}
      <CanvasAtmosphere mode="network" density={90} color="#4ea8ff" accentColor="#7cc4ff" opacity={0.4} zIndex={-5} />

      <motion.div style={{ y: overlayY, opacity: fade }} className="container-x relative z-10 pt-28">
        <div className="max-w-2xl">
          <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
            <span className="inline-block h-px w-10 bg-primary/60" />
            Dental studio · Austin, TX
          </div>

          <h1 className="font-display text-[clamp(44px,7.5vw,92px)] font-light leading-[0.98] tracking-[-0.02em] text-white">
            {siteConfig.hero.h1.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {line.accent ? <span className="italic text-primary">{line.text}</span> : line.text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-white/75"
          >
            Family &amp; cosmetic dentistry that feels calm, modern, and genuinely kind — from
            routine cleanings to Invisalign and implants.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <BookButton label="Book a visit" />
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-primary hover:text-primary"
            >
              Explore services →
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollHint label="Scroll" accentColor="#4ea8ff" />
      </div>
    </section>
  );
}
