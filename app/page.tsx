import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { SEOHead } from "@/components/seo/SEOHead";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/seo/structured-data";
import { resolveImage } from "@/lib/image-fallback";
import { getAsset } from "@/lib/assets";
import Hero from "@/components/home/Hero";
import ServiceCard from "@/components/ServiceCard";
import BookButton from "@/components/BookButton";
import FadeUp, { StaggerChildren } from "@/components/motion/FadeUp";
import TextReveal from "@/components/motion/TextReveal";
import Marquee from "@/components/motion/Marquee";
import NumberCounter from "@/components/motion/NumberCounter";
import CardTiltLayer from "@/components/motion/CardTiltLayer";

const brand = {
  name: siteConfig.company.name,
  description: siteConfig.company.description,
  email: siteConfig.company.email,
  phone: siteConfig.company.phone,
  location: siteConfig.company.location,
  url: siteConfig.seo.siteUrl,
  socials: siteConfig.socials,
};

const sd = siteConfig.seo.structuredData;

export default function HomePage() {
  return (
    <>
      <SEOHead
        path="/"
        jsonLd={[
          localBusinessSchema({
            brand,
            address: sd.address,
            businessType: "Dentist",
            priceRange: sd.priceRange as "$" | "$$" | "$$$" | "$$$$",
            geo: sd.geo,
            rating: { value: sd.rating.value, count: sd.rating.count },
            hours: sd.hours.map((h) => ({ dayOfWeek: h.dayOfWeek as never, opens: h.opens, closes: h.closes })),
          }),
          organizationSchema(brand, sd.address),
          websiteSchema({ brand }),
        ]}
      />

      <Hero />

      {/* Trust marquee */}
      <section className="border-y border-white/5 bg-surface/40 py-5">
        <Marquee speed={38} pauseOnHover>
          {siteConfig.trustBar.map((item) => (
            <span key={item} className="mx-8 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {item}
            </span>
          ))}
        </Marquee>
      </section>

      {/* Services */}
      <section className="section-pad">
        <div className="container-x">
          <div className="mb-14 max-w-2xl">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">What we do</p>
            <TextReveal as="h2" className="font-display text-[clamp(32px,5vw,60px)] font-light leading-[1.05] tracking-[-0.02em] text-white">
              {siteConfig.servicesHeading}
            </TextReveal>
          </div>
          <StaggerChildren staggerDelay={0.08} className="grid grid-cols-1 gap-6 md:grid-cols-3">
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

      {/* Why us */}
      <section className="section-pad bg-surface/30">
        <div className="container-x">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">Why Brightsmile</p>
              <TextReveal as="h2" className="font-display text-[clamp(32px,5vw,56px)] font-light leading-[1.05] tracking-[-0.02em] text-white">
                {siteConfig.whyUs.heading}
              </TextReveal>
            </div>
            <Link href="/about" className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 hover:text-primary">
              Our story →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.whyUs.items.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.06}>
                <CardTiltLayer className="h-full rounded-2xl border border-white/10 bg-bg/60 p-7">
                  <div className="mb-5 font-display text-3xl font-light text-primary">0{i + 1}</div>
                  <h3 className="mb-2 font-display text-lg text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/65">{item.description}</p>
                </CardTiltLayer>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-pad">
        <div className="container-x grid grid-cols-2 gap-8 lg:grid-cols-4">
          {siteConfig.stats.map((stat) => (
            <FadeUp key={stat.label} className="text-center">
              <div className="font-display text-[clamp(40px,6vw,72px)] font-light text-white">
                {renderStat(stat.value)}
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">{stat.label}</div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="section-pad bg-surface/30">
        <div className="container-x">
          <div className="mb-14 max-w-xl">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">How it works</p>
            <TextReveal as="h2" className="font-display text-[clamp(32px,5vw,56px)] font-light leading-[1.05] tracking-[-0.02em] text-white">
              Simple from hello to healthy
            </TextReveal>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {siteConfig.process.map((p, i) => (
              <FadeUp key={p.step} delay={i * 0.08} className="relative">
                <div className="mb-4 font-mono text-xs text-primary">STEP {p.step}</div>
                <h3 className="mb-2 font-display text-xl text-white">{p.title}</h3>
                <p className="text-sm leading-relaxed text-white/65">{p.description}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="section-pad">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <FadeUp>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
              <img
                src={resolveImage({ src: getAsset("section-about"), industry: "dental-clinic", keyword: "friendly dentist patient", brandColor: siteConfig.brand.primary })}
                alt="Inside Brightsmile Dental Studio"
                className="h-full w-full object-cover"
              />
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">About us</p>
            <TextReveal as="h2" className="font-display text-[clamp(30px,4.5vw,52px)] font-light leading-[1.08] tracking-[-0.02em] text-white">
              {siteConfig.aboutHeading}
            </TextReveal>
            <p className="mt-6 leading-relaxed text-white/70">{siteConfig.aboutStory}</p>
            <blockquote className="mt-6 border-l-2 border-primary pl-5 font-display text-xl font-light italic text-white/90">
              &ldquo;{siteConfig.manifesto}&rdquo;
            </blockquote>
            <div className="mt-8">
              <Link href="/about" className="font-mono text-xs uppercase tracking-[0.2em] text-primary hover:underline">
                More about the studio →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-gradient-to-br from-surface to-bg px-8 py-16 text-center md:px-16 md:py-24">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative">
              <TextReveal as="h2" className="mx-auto max-w-3xl font-display text-[clamp(30px,5vw,60px)] font-light leading-[1.05] tracking-[-0.02em] text-white">
                {siteConfig.ctaBlock.heading}
              </TextReveal>
              <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/70">{siteConfig.ctaBlock.description}</p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <BookButton label="Book a visit" />
                <Link href="/contact" className="inline-flex items-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-primary hover:text-primary">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Render a stat that may contain a numeric part + suffix (e.g. "12k+", "4.9", "98%").
function renderStat(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return value;
  const num = parseFloat(match[1]);
  const decimals = match[1].includes(".") ? 1 : 0;
  return <NumberCounter to={num} decimals={decimals} suffix={match[2]} />;
}
