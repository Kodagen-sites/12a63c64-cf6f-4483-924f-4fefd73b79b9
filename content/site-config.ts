// ============================================================
// site-config.ts — single source of truth for all copy + brand
// Brightsmile Dental Studio — Austin, TX
// ============================================================

export const siteConfig = {
  company: {
    name: "Brightsmile Dental Studio",
    tagline: "Modern dentistry with a gentle touch",
    description:
      "Brightsmile Dental Studio is a modern family and cosmetic dental practice in Austin, Texas — offering general dentistry, teeth whitening, Invisalign, dental implants, and kids' dentistry in a calm, welcoming space.",
    email: "hello@brightsmiledental.studio",
    phone: "(512) 555-0142",
    location: "1204 South Lamar Blvd, Austin, TX 78704",
  },

  brand: {
    primary: "#4ea8ff",
    accent: "#7cc4ff",
    bg: "#0a1020",
  },

  typography: {
    display: "Space Grotesk",
    body: "Inter",
    mono: "ui-monospace",
  },

  // -- Booking + industry gate ------------------------------------
  industry: "medical",
  bookingVariant: "B3", // centered modal appointment wizard

  seo: {
    siteUrl: "https://brightsmiledental.studio",
    locale: "en_US",
    htmlLang: "en",
    defaultTitle: "Brightsmile Dental Studio — Modern dentistry in Austin, TX",
    defaultDescription:
      "Family & cosmetic dentistry in South Austin. General dentistry, teeth whitening, Invisalign, dental implants, and kids' dentistry — gentle, modern care. Book your visit today.",
    defaultOgImage: "https://brightsmiledental.studio/og-default.png",
    twitterHandle: "@brightsmileatx",
    noindexPaths: ["/account", "/admin", "/auth", "/api", "/booking-confirmation"],
    googleSiteVerification: "",
    structuredData: {
      businessType: "Dentist",
      address: {
        streetAddress: "1204 South Lamar Blvd",
        addressLocality: "Austin",
        addressRegion: "TX",
        postalCode: "78704",
        addressCountry: "US",
      },
      hours: [
        { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "08:00", closes: "17:00" },
        { dayOfWeek: ["Friday"], opens: "08:00", closes: "14:00" },
      ],
      priceRange: "$$",
      geo: { latitude: 30.2515, longitude: -97.7684 },
      rating: { value: 4.9, count: 328 },
      starRating: null,
      amenities: [],
      cuisine: [],
    },
  },

  socials: {
    instagram: "https://instagram.com/brightsmileatx",
    twitter: "https://twitter.com/brightsmileatx",
    facebook: "https://facebook.com/brightsmileatx",
    linkedin: "",
    youtube: "",
    tiktok: "",
    whatsapp: "",
  },

  hero: {
    h1: [
      { text: "A brighter smile,", accent: false },
      { text: "gently done", accent: true },
      { text: "in the heart of Austin", accent: false },
    ],
  },

  tagline: "Modern dentistry with a gentle touch",

  servicesHeading: "Care for every smile",

  services: [
    {
      name: "General Dentistry",
      slug: "general-dentistry",
      description:
        "Comprehensive cleanings, exams, fillings, and preventive care that keep your whole family healthy — with unhurried appointments and honest guidance.",
      highlights: [
        "Cleanings & preventive exams",
        "Tooth-colored fillings",
        "Gum health & periodontal care",
        "Same-day emergency visits",
      ],
    },
    {
      name: "Teeth Whitening",
      slug: "teeth-whitening",
      description:
        "Professional, enamel-safe whitening that lifts years of stains in a single visit — plus custom take-home trays to keep your smile bright.",
      highlights: [
        "In-office whitening in about an hour",
        "Custom take-home trays",
        "Enamel-safe, dentist-supervised",
        "Sensitivity-managed formulas",
      ],
    },
    {
      name: "Invisalign",
      slug: "invisalign",
      description:
        "Straighten your teeth discreetly with clear, removable aligners — mapped out with a 3D preview so you can see your future smile before you start.",
      highlights: [
        "Clear, removable aligners",
        "3D digital smile preview",
        "Fewer office visits",
        "Flexible monthly payment plans",
      ],
    },
    {
      name: "Dental Implants",
      slug: "dental-implants",
      description:
        "Permanent, natural-looking tooth replacement that restores full function and confidence — planned with precision imaging for a comfortable fit.",
      highlights: [
        "Single-tooth to full-arch solutions",
        "Precision 3D-guided placement",
        "Natural look and feel",
        "Long-term, durable results",
      ],
    },
    {
      name: "Kids Dentistry",
      slug: "kids-dentistry",
      description:
        "Friendly, patient care that helps children build healthy habits and feel at ease — turning the dentist into a place little ones actually look forward to.",
      highlights: [
        "Gentle, kid-friendly visits",
        "Sealants & fluoride treatments",
        "Cavity prevention coaching",
        "A calm, playful environment",
      ],
    },
  ] as Array<{ name: string; slug: string; description: string; highlights?: string[] }>,

  rooms: [] as Array<{
    slug: string;
    name: string;
    description: string;
    pricePerNight: number;
    currency: string;
    maxGuests: number;
    squareMeters?: number;
    image?: string;
    images?: string[];
    amenities?: string[];
  }>,

  locations: [] as Array<{
    slug: string;
    name: string;
    address: {
      streetAddress: string;
      city: string;
      region?: string;
      postalCode?: string;
      country: string;
    };
    phone?: string;
    email?: string;
    geo?: { latitude: number; longitude: number };
    hours?: Array<{ days: string[]; opens: string; closes: string }>;
    images?: string[];
    description?: string;
  }>,

  gallery: [] as Array<{
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
  }>,

  whyUs: {
    heading: "Why families choose Brightsmile",
    items: [
      { title: "Gentle by design", description: "Anxiety-friendly care, numbing that actually works, and a team that never rushes you." },
      { title: "Modern & precise", description: "Digital scanning, low-radiation imaging, and same-day answers — no guesswork." },
      { title: "Transparent pricing", description: "Clear estimates before we begin, plus flexible plans and most insurance accepted." },
      { title: "One studio, whole family", description: "From toddlers to grandparents, everyone's smile is cared for under one roof." },
    ],
  },

  process: [
    { step: 1, title: "Say hello", description: "Book online or call us. Tell us what's on your mind — no question is too small." },
    { step: 2, title: "Gentle exam", description: "A relaxed, thorough visit with digital imaging and a clear look at your smile." },
    { step: 3, title: "Your plan", description: "We walk you through options and honest pricing, then choose the path together." },
    { step: 4, title: "Bright results", description: "Comfortable treatment and follow-up care that keeps your smile healthy for good." },
  ],

  aboutHeading: "Dentistry that feels different",
  aboutStory:
    "Brightsmile Dental Studio was founded on a simple belief: going to the dentist should feel calm, honest, and even a little uplifting. Tucked into South Austin, our studio pairs modern technology with unhurried, human care. We take the time to listen, explain, and make sure every visit — for you or your kids — ends with a brighter smile and zero surprises.",
  manifesto:
    "We believe great dentistry is quiet confidence: precise hands, warm words, and no reason to feel nervous.",
  values: [
    { title: "Comfort first", description: "Every detail of the studio is built to help you relax, from the chairs to the conversation." },
    { title: "Honesty always", description: "We only recommend what you actually need, and we explain the why every time." },
    { title: "Precision care", description: "Modern tools and steady hands mean better outcomes and shorter recovery." },
    { title: "Austin at heart", description: "We're proud locals caring for our neighbors, one healthy smile at a time." },
  ],

  work: [
    { title: "A confidence reset", client: "Maya R.", service: "Invisalign", result: "Straightened in 11 months with a clear-aligner plan and a smile she loves to show." },
    { title: "Full-arch restoration", client: "David L.", service: "Dental Implants", result: "Replaced failing teeth with implants — eating and speaking with total confidence again." },
    { title: "Wedding-ready smile", client: "Priya & Sam", service: "Teeth Whitening", result: "Eight shades brighter in a single visit, right before the big day." },
    { title: "A fearless first visit", client: "The Nguyen family", service: "Kids Dentistry", result: "Two nervous kids who now ask when they get to come back." },
    { title: "Back to healthy", client: "Marcus T.", service: "General Dentistry", result: "A quiet cavity caught early and fixed same-day — no drama, no downtime." },
    { title: "Aligned and glowing", client: "Elena V.", service: "Invisalign", result: "Combined clear aligners with whitening for a complete smile refresh." },
  ] as Array<{ title: string; client: string; service: string; result: string }>,

  stats: [
    { value: "12k+", label: "Smiles cared for" },
    { value: "4.9", label: "Average rating" },
    { value: "15", label: "Years in Austin" },
    { value: "98%", label: "Would refer a friend" },
  ] as Array<{ value: string; label: string }>,

  features: [] as Array<{ title: string; description: string }>,

  sectionThemeWord: "Smile",

  narrative: [] as Array<{ speaker: string; text: string }>,

  mixedMedia: {
    skipSecondaryVideo: true,
    accentEyebrow: "",
    accentLine: "",
  },

  cta: {
    primary: "Book a visit",
    secondary: "Explore services",
  },

  ctaBlock: {
    heading: "Your brighter smile starts here",
    description:
      "New patients are always welcome. Book online in under a minute — most insurance accepted, flexible plans available.",
  },

  trustBar: [
    "Most insurance accepted",
    "Same-day emergencies",
    "Flexible payment plans",
    "Family & cosmetic care",
    "Digital, low-radiation imaging",
  ] as string[],

  scrollHero: {
    archetype: "E" as "A" | "B" | "C" | "D" | "E" | "F" | "G",
    styleId: "midnight-azure",
    assetMode: "prompt-only" as "live-generate" | "prompt-only",
    imageUrl: "",
    scrollDistance: 0,
  },

  headerVariant: "transparent-ghost" as const,
  footerVariant: "FT3" as const,

  motion: {
    scrollProgress: true,
    cursorFollower: false,
    intensity: "medium" as "low" | "medium" | "high",
  },
} as const;

export type SiteConfig = typeof siteConfig;
