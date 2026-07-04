import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/content/site-config";
import Header from "@/components/headers/Header";
import Footer from "@/components/Footer";
import BookingFlow from "@/components/booking/BookingFlow";
import EditorBridge from "@/components/__kodagen/EditorBridge";
import FilmGrain from "@/components/motion/FilmGrain";
import Vignette from "@/components/motion/Vignette";
import ScrollProgress from "@/components/motion/ScrollProgress";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const { seo, company } = siteConfig;

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.defaultTitle,
    template: `%s — ${company.name}`,
  },
  description: seo.defaultDescription,
  openGraph: {
    type: "website",
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    url: seo.siteUrl,
    siteName: company.name,
    locale: seo.locale,
    images: [{ url: seo.defaultOgImage, width: 1200, height: 630, alt: company.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    images: [seo.defaultOgImage],
  },
  alternates: { canonical: seo.siteUrl },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={seo.htmlLang} className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-bg font-body text-white antialiased">
        <BookingFlow>
          {siteConfig.motion.scrollProgress && <ScrollProgress />}
          <Header />
          <main>{children}</main>
          <Footer />
          <Vignette />
          <FilmGrain />
          <EditorBridge />
        </BookingFlow>
      </body>
    </html>
  );
}
