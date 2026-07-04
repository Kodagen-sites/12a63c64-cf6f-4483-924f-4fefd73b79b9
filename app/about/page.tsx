import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { SEOHead } from "@/components/seo/SEOHead";
import { organizationSchema, breadcrumbSchema } from "@/lib/seo/structured-data";
import { resolveImage } from "@/lib/image-fallback";
import { getAsset } from "@/lib/assets";
import PageHero from "@/components/sections/PageHero";
import BookButton from "@/components/BookButton";
import FadeUp from "@/components/motion/FadeUp";
import TextReveal from "@/components/motion/TextReveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Brightsmile Dental Studio — a modern, gentle family and cosmetic dental practice in South Austin built around comfort, honesty, and precision care.",
};

const brand = {
  name: siteConfig.company.name,
  description: siteConfig.company.description,
  email: siteConfig.company.email,
  phone: siteConfig.company.phone,
  location: siteConfig.company.location,
  url: siteConfig.seo.siteUrl,
  socials: siteConfig.socials,
};

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title={`About — ${siteConfig.company.name}`}
        description={metadata.description as string}
        path="/about"
        jsonLd={[
          organizationSchema(brand, siteConfig.seo.structuredData.address),
          breadcrumbSchema([
            { name: "Home", url: siteConfig.seo.siteUrl },
            { name: "About", url: `${siteConfig.seo.siteUrl}/about` },
          ]),
        ]}
      />

      <PageHero
        eyebrow="About the studio"
        title={siteConfig.aboutHeading}
        intro={siteConfig.company.tagline}
        image={resolveImage({ src: getAsset("page-about-hero"), industry: "dental-clinic", keyword: "dental team clinic", brandColor: siteConfig.brand.primary })}
      />

      <section className="section-pad">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <FadeUp>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">Our story</p>
            <p className="text-lg leading-relaxed text-white/75">{siteConfig.aboutStory}</p>
            <blockquote className="mt-8 border-l-2 border-primary pl-5 font-display text-2xl font-light italic text-white/90">
              &ldquo;{siteConfig.manifesto}&rdquo;
            </blockquote>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
              <img
                src={resolveImage({ src: getAsset("section-about"), industry: "dental-clinic", keyword: "friendly dentist patient", brandColor: siteConfig.brand.primary })}
                alt="Brightsmile Dental Studio team"
                className="h-full w-full object-cover"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="section-pad bg-surface/30">
        <div className="container-x">
          <div className="mb-14 max-w-xl">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">What we value</p>
            <TextReveal as="h2" className="font-display text-[clamp(30px,4.5vw,52px)] font-light leading-[1.05] tracking-[-0.02em] text-white">
              The care behind the smile
            </TextReveal>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {siteConfig.values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-white/10 bg-bg/60 p-8">
                  <h3 className="mb-3 font-display text-xl text-white">{v.title}</h3>
                  <p className="leading-relaxed text-white/65">{v.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x grid grid-cols-2 gap-8 lg:grid-cols-4">
          {siteConfig.stats.map((s) => (
            <FadeUp key={s.label} className="text-center">
              <div className="font-display text-[clamp(36px,5vw,64px)] font-light text-primary">{s.value}</div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">{s.label}</div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x rounded-[2rem] border border-primary/20 bg-gradient-to-br from-surface to-bg px-8 py-16 text-center md:py-20">
          <h2 className="mx-auto max-w-2xl font-display text-[clamp(28px,4vw,48px)] font-light text-white">
            Come see the difference gentle dentistry makes
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <BookButton />
            <Link href="/services" className="inline-flex items-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-primary hover:text-primary">
              Explore services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
