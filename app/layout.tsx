import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beastandbody.co"),
  title: {
    default: "Beast & Body | Mobile Cryotherapy in North Phoenix, AZ",
    template: "%s | Beast & Body",
  },
  description:
    "Beast & Body brings professional mobile cryotherapy directly to you in North Phoenix, New River, Anthem, Cave Creek, and surrounding areas. Cold therapy for humans and horses — no travel required.",
  keywords: [
    "cryotherapy North Phoenix",
    "mobile cryotherapy Phoenix AZ",
    "cryotherapy New River AZ",
    "equine cryotherapy Arizona",
    "horse cryotherapy Phoenix",
    "spot cryotherapy Phoenix",
    "mobile recovery North Phoenix",
    "cryotherapy Anthem AZ",
    "cryotherapy Cave Creek AZ",
    "equine cold therapy Arizona",
    "horse recovery therapy Phoenix",
    "mobile cryotherapy service",
    "Beast and Body",
  ],
  openGraph: {
    type: "website",
    url: "https://beastandbody.co",
    siteName: "Beast & Body Mobile Recovery",
    title: "Beast & Body | Mobile Cryotherapy in North Phoenix, AZ",
    description:
      "Professional mobile cryotherapy for humans and horses in North Phoenix, AZ. We come to you — barn, home, or gym.",
  },
  twitter: {
    card: "summary",
    title: "Beast & Body | Mobile Cryotherapy in North Phoenix, AZ",
    description:
      "Professional mobile cryotherapy for humans and horses in North Phoenix, AZ. We come to you.",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Beast & Body Mobile Recovery",
  description:
    "Professional mobile cryotherapy services for humans and horses. Serving North Phoenix, New River, Anthem, Cave Creek, and surrounding areas.",
  url: "https://beastandbody.co",
  telephone: "+14802397486",
  email: "jen.beastandbody@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New River",
    addressRegion: "AZ",
    postalCode: "85086",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.9165,
    longitude: -112.1076,
  },
  areaServed: [
    { "@type": "City", name: "North Phoenix" },
    { "@type": "City", name: "New River" },
    { "@type": "City", name: "Anthem" },
    { "@type": "City", name: "Cave Creek" },
    { "@type": "City", name: "Scottsdale" },
    { "@type": "City", name: "Phoenix" },
  ],
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cryotherapy Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Spot Cryotherapy",
          description: "Targeted cold therapy for a specific area of pain or injury.",
        },
        price: "35",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Athlete Recovery Cryotherapy",
          description: "Full-body recovery protocol covering 4–5 major treatment areas.",
        },
        price: "75",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Equine Spot Cryotherapy",
          description: "Targeted cold therapy for horses — tendons, ligaments, hocks.",
        },
        price: "45",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Equine Performance / Show Prep",
          description: "Pre-competition treatment covering 6–8 key points per horse.",
        },
        price: "95",
        priceCurrency: "USD",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Navbar />
        <main className="pt-[168px] sm:pt-[278px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
