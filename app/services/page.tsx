import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { SEOHead } from "@/components/seo/SEOHead";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/structured-data";
import { resolveImage } from "@/lib/image-fallback";
import { getAsset } from "@/lib/assets";
import PageHero from "@/components/sections/PageHero";
import ServiceCard from "@/components/ServiceCard";
import BookButton from "@/components/BookButton";
import FadeUp, { StaggerChildren } from "@/components/motion/FadeUp";
import TextReveal from "@/components/motion/TextReveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "General dentistry, teeth whitening, Invisalign, dental implants, and kids' dentistry at Brightsmile Dental Studio in Austin. Gentle, modern care for the whole family.",
};

const brand = {
  name: siteConfig.company.name,
  description: siteConfig.company.description,
  email: siteConfig.company.email,
  phone: siteConfig.company.phone,
  location: siteConfig.company.location,
  url: siteConfig.seo.siteUrl,
};

export default function ServicesPage() {
  return (
    <>
      <SEOHead
        title={`Services — ${siteConfig.company.name}`}
        description={metadata.description as string}
        path="/services"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", url: siteConfig.seo.siteUrl },
            { name: "Services", url: `${siteConfig.seo.siteUrl}/services` },
          ]),
          ...siteConfig.services.map((s) =>
            serviceSchema({
              service: s,
              provider: brand,
              serviceType: "Dentistry",
              areaServed: "Austin, TX",
              serviceUrl: `${siteConfig.seo.siteUrl}/services/${s.slug}`,
            }),
          ),
        ]}
      />

      <PageHero
        eyebrow="Our services"
        title={siteConfig.servicesHeading}
        intro="From routine care to smile transformations — everything your family needs, under one calm roof in South Austin."
        image={resolveImage({ src: getAsset("page-services-hero"), industry: "dental-clinic", keyword: "dental treatment room", brandColor: siteConfig.brand.primary })}
      />

      <section className="section-pad">
        <div className="container-x">
          <StaggerChildren staggerDelay={0.08} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {siteConfig.services.map((service, i) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={i}
                imageSrc={resolveImage({
                  src: getAsset(`service-${service.slug}`),
                  industry: "dental-clinic",
                  keyword: service.name,
                  brandColor: siteConfig.brand.primary,
                })}
              />
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section-pad bg-surface/30">
        <div className="container-x text-center">
          <TextReveal as="h2" className="mx-auto max-w-2xl font-display text-[clamp(28px,4vw,48px)] font-light text-white">
            Not sure where to start?
          </TextReveal>
          <FadeUp delay={0.1}>
            <p className="mx-auto mt-5 max-w-lg leading-relaxed text-white/70">
              Book a friendly consultation and we&apos;ll help you choose the right care — no pressure, ever.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <BookButton />
              <Link href="/contact" className="inline-flex items-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-primary hover:text-primary">
                Contact us
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
