import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { siteConfig } from "@/content/site-config";
import { SEOHead } from "@/components/seo/SEOHead";
import { serviceSchema, breadcrumbSchema } from "@/lib/seo/structured-data";
import { resolveImage } from "@/lib/image-fallback";
import { getAsset } from "@/lib/assets";
import PageHero from "@/components/sections/PageHero";
import ServiceCard from "@/components/ServiceCard";
import BookButton from "@/components/BookButton";
import FadeUp from "@/components/motion/FadeUp";

const brand = {
  name: siteConfig.company.name,
  description: siteConfig.company.description,
  email: siteConfig.company.email,
  phone: siteConfig.company.phone,
  location: siteConfig.company.location,
  url: siteConfig.seo.siteUrl,
};

export function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!service) return { title: "Service not found" };
  return { title: service.name, description: service.description };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = siteConfig.services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <SEOHead
        title={`${service.name} — ${siteConfig.company.name}`}
        description={service.description}
        path={`/services/${service.slug}`}
        jsonLd={[
          serviceSchema({
            service,
            provider: brand,
            serviceType: "Dentistry",
            areaServed: "Austin, TX",
            serviceUrl: `${siteConfig.seo.siteUrl}/services/${service.slug}`,
          }),
          breadcrumbSchema([
            { name: "Home", url: siteConfig.seo.siteUrl },
            { name: "Services", url: `${siteConfig.seo.siteUrl}/services` },
            { name: service.name, url: `${siteConfig.seo.siteUrl}/services/${service.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Service"
        title={service.name}
        intro={service.description}
        image={resolveImage({ src: getAsset(`service-${service.slug}`), industry: "dental-clinic", keyword: service.name, brandColor: siteConfig.brand.primary })}
      />

      <section className="section-pad">
        <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-[1fr_360px]">
          <FadeUp>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">What to expect</p>
            <p className="text-lg leading-relaxed text-white/75">{service.description}</p>

            {service.highlights && service.highlights.length > 0 && (
              <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {service.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 rounded-xl border border-white/10 bg-surface/40 p-4">
                    <Check size={18} className="mt-0.5 flex-shrink-0 text-primary" />
                    <span className="text-sm leading-relaxed text-white/80">{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </FadeUp>

          <FadeUp delay={0.1}>
            <aside className="sticky top-28 rounded-2xl border border-primary/20 bg-gradient-to-br from-surface to-bg p-8">
              <h3 className="font-display text-2xl font-light text-white">Ready when you are</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                Book {service.name.toLowerCase()} with our gentle team. Most insurance accepted, flexible plans available.
              </p>
              <div className="mt-7">
                <BookButton label={`Book ${service.name}`} serviceSlug={service.slug} className="w-full" />
              </div>
              <div className="mt-5 text-center">
                <a href={`tel:${siteConfig.company.phone.replace(/[^\d+]/g, "")}`} className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 hover:text-primary">
                  Or call {siteConfig.company.phone}
                </a>
              </div>
            </aside>
          </FadeUp>
        </div>
      </section>

      <section className="section-pad bg-surface/30">
        <div className="container-x">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-light text-white">More ways we can help</h2>
            <Link href="/services" className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 hover:text-primary">All services →</Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((s, i) => (
              <ServiceCard
                key={s.slug}
                service={s}
                index={i}
                imageSrc={resolveImage({ src: getAsset(`service-${s.slug}`), industry: "dental-clinic", keyword: s.name, brandColor: siteConfig.brand.primary })}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
