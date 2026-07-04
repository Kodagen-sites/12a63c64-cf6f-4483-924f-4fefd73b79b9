import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/content/site-config";
import { SEOHead } from "@/components/seo/SEOHead";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/seo/structured-data";
import { resolveImage } from "@/lib/image-fallback";
import { getAsset } from "@/lib/assets";
import PageHero from "@/components/sections/PageHero";
import BookButton from "@/components/BookButton";
import FadeUp from "@/components/motion/FadeUp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit Brightsmile Dental Studio in South Austin. Call, email, or book online — new patients always welcome, most insurance accepted.",
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

const sd = siteConfig.seo.structuredData;

const HOURS = [
  { days: "Monday – Thursday", time: "8:00 AM – 5:00 PM" },
  { days: "Friday", time: "8:00 AM – 2:00 PM" },
  { days: "Saturday – Sunday", time: "Closed" },
];

export default function ContactPage() {
  const { email, phone, location } = siteConfig.company;
  return (
    <>
      <SEOHead
        title={`Contact — ${siteConfig.company.name}`}
        description={metadata.description as string}
        path="/contact"
        jsonLd={[
          localBusinessSchema({
            brand,
            address: sd.address,
            businessType: "Dentist",
            priceRange: sd.priceRange as "$" | "$$" | "$$$" | "$$$$",
            geo: sd.geo,
            hours: sd.hours.map((h) => ({ dayOfWeek: h.dayOfWeek as never, opens: h.opens, closes: h.closes })),
          }),
          breadcrumbSchema([
            { name: "Home", url: siteConfig.seo.siteUrl },
            { name: "Contact", url: `${siteConfig.seo.siteUrl}/contact` },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Get in touch"
        title="Come say hello"
        intro="We'd love to meet you. Book online in under a minute, or reach out any way you like."
        image={resolveImage({ src: getAsset("page-contact-hero"), industry: "dental-clinic", keyword: "dental clinic front desk welcoming", brandColor: siteConfig.brand.primary })}
      />

      <section className="section-pad">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-2">
          <FadeUp>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">Reach us</p>
            <ul className="space-y-6">
              <ContactRow icon={<Phone size={18} />} label="Call us" value={phone} href={`tel:${phone.replace(/[^\d+]/g, "")}`} />
              <ContactRow icon={<Mail size={18} />} label="Email" value={email} href={`mailto:${email}`} />
              <ContactRow icon={<MapPin size={18} />} label="Visit" value={location} href={`https://maps.google.com/?q=${encodeURIComponent(location)}`} />
            </ul>

            <div className="mt-10 rounded-2xl border border-white/10 bg-surface/40 p-7">
              <div className="mb-4 flex items-center gap-2 font-display text-lg text-white">
                <Clock size={18} className="text-primary" /> Opening hours
              </div>
              <ul className="space-y-2 text-sm">
                {HOURS.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4 text-white/70">
                    <span>{h.days}</span>
                    <span className="text-white">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="flex h-full flex-col justify-center rounded-3xl border border-primary/20 bg-gradient-to-br from-surface to-bg p-10">
              <h2 className="font-display text-[clamp(26px,3.5vw,40px)] font-light text-white">
                Book your visit
              </h2>
              <p className="mt-4 leading-relaxed text-white/70">
                New patients are always welcome. Pick a service and a time that works for you — our
                front desk confirms the rest.
              </p>
              <div className="mt-8">
                <BookButton label="Book a visit" className="w-full sm:w-auto" />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <li>
      <a href={href} className="group flex items-start gap-4">
        <span className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface text-primary">
          {icon}
        </span>
        <span>
          <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">{label}</span>
          <span className="text-lg text-white transition-colors group-hover:text-primary">{value}</span>
        </span>
      </a>
    </li>
  );
}
