import type { Metadata } from "next";
import { Inter, Cormorant } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ChatWidget from "@/components/ui/ChatWidget";

const GA_ID = "G-SQJN83TFX2";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500"],
});

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const SITE_URL = "https://www.metricsstudios.no";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/FAVICON.png", apple: "/FAVICON.png" },

  title: {
    default: "Metrics Studios — Premium Nettsider, SEO & Digital Markedsføring Oslo",
    template: "%s | Metrics Studios",
  },
  description:
    "Metrics Studios hjelper bedrifter i Oslo og Norge med å vokse digitalt. Vi lager skreddersydde nettsider som selger, SEO som rangerer, og performance marketing som anskaffer kunder — målbart og skalerbart.",

  keywords: [
    "webdesign Oslo",
    "nettside Oslo",
    "SEO Oslo",
    "digital markedsføring Oslo",
    "søkemotoroptimalisering Norge",
    "Google Business Profile Oslo",
    "leadgenerering",
    "performance marketing Norge",
    "AI implementering bedrift",
    "webbyrå Oslo",
    "nettsider som selger",
    "Metrics Studios",
    "Daniel Christiansson",
  ],

  authors: [{ name: "Metrics Studios", url: SITE_URL }],
  creator: "Metrics Studios",
  publisher: "Metrics Studios",

  alternates: {
    canonical: SITE_URL,
    languages: { "nb-NO": SITE_URL },
  },

  openGraph: {
    title: "Metrics Studios — Premium Nettsider, SEO & Markedsføring Oslo",
    description:
      "Vi hjelper norske bedrifter med å vokse digitalt — skreddersydde nettsider, SEO, performance marketing og AI-implementering.",
    url: SITE_URL,
    siteName: "Metrics Studios",
    locale: "nb_NO",
    type: "website",
    images: [
      {
        url: "/LOGO1.png",
        width: 1200,
        height: 630,
        alt: "Metrics Studios — Digitalbyrå Oslo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Metrics Studios — Nettsider, SEO & Markedsføring",
    description:
      "Premium digitalbyrå i Oslo. Nettsider som selger, SEO som rangerer, og performance marketing som leverer målbare resultater.",
    images: ["/LOGO1.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Metrics Studios",
    description:
      "Digitalbyrå i Oslo som leverer premium nettsider, SEO, performance marketing og AI-implementering for bedrifter som vil vokse.",
    url: SITE_URL,
    logo: `${SITE_URL}/LOGO1.png`,
    image: `${SITE_URL}/LOGO1.png`,
    telephone: "+4746584867",
    email: "post@metricsstudios.no",
    founder: {
      "@type": "Person",
      name: "Daniel Christiansson",
      jobTitle: "Daglig Leder",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Prinsensgate 8",
      postalCode: "0152",
      addressLocality: "Oslo",
      addressCountry: "NO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 59.9116,
      longitude: 10.7386,
    },
    areaServed: [
      { "@type": "Country", name: "Norge" },
      { "@type": "City", name: "Oslo" },
    ],
    serviceType: [
      "Webdesign",
      "Søkemotoroptimalisering",
      "Digital Markedsføring",
      "Performance Marketing",
      "AI Implementering",
      "Leadgenerering",
      "Google Business Profile",
    ],
    priceRange: "$$",
    sameAs: [],
  };

  return (
    <html lang="no" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
        `}
      </Script>
      <body suppressHydrationWarning>
        {/* Global dot-grid background — fixed, full viewport, always visible */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage:
              "radial-gradient(circle, #B0B0A8 1.5px, transparent 1.5px)",
            backgroundSize: "44px 44px",
            opacity: 0.4,
          }}
        />
        <CustomCursor />
        <Navbar />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
