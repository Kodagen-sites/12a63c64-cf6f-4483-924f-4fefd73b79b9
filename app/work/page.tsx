import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { SEOHead } from "@/components/seo/SEOHead";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import { resolveImage } from "@/lib/image-fallback";
import { getAsset } from "@/lib/assets";
import PageHero from "@/components/sections/PageHero";
import BookButton from "@/components/BookButton";
import FadeUp, { StaggerChildren } from "@/components/motion/FadeUp";
import CardTiltLayer from "@/components/motion/CardTiltLayer";

export const metadata: Metadata = {
  title: "Smile Stories",
  description:
    "Real smile transformations from Brightsmile Dental Studio patients in Austin — Invisalign, implants, whitening, and gentle family care that changed how they smile.",
};

export default function WorkPage() {
  return (
    <>
      <SEOHead
        title={`Smile Stories — ${siteConfig.company.name}`}
        description={metadata.description as string}
        path="/work"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: siteConfig.seo.siteUrl },
          { name: "Smile Stories", url: `${siteConfig.seo.siteUrl}/work` },
        ])}
      />

      <PageHero
        eyebrow="Smile stories"
        title="Real smiles, transformed"
        intro="Every smile tells a story. Here are a few from the Austin families and neighbors we're proud to care for."
        image={resolveImage({ src: getAsset("page-work-hero"), industry: "dental-clinic", keyword: "smile transformation before after", brandColor: siteConfig.brand.primary })}
      />

      <section className="section-pad">
        <div className="container-x">
          <StaggerChildren staggerDelay={0.07} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {siteConfig.work.map((w) => (
              <CardTiltLayer key={w.title} className="h-full rounded-2xl border border-white/10 bg-surface/40 p-8">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">{w.service}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{w.client}</span>
                </div>
                <h3 className="mb-3 font-display text-2xl font-light text-white">{w.title}</h3>
                <p className="leading-relaxed text-white/70">{w.result}</p>
              </CardTiltLayer>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section-pad bg-surface/30">
        <div className="container-x text-center">
          <FadeUp>
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(28px,4vw,48px)] font-light text-white">
              Your smile story starts with hello
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <BookButton />
              <Link href="/services" className="inline-flex items-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-primary hover:text-primary">
                Explore services
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
