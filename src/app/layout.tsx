import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { QuoteModalProvider } from "@/components/QuoteModal";
import { JsonLd } from "@/components/JsonLd";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  localBusinessJsonLd,
  personJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
});

const DEFAULT_TITLE = "Meerkat Photography | Perth Photographer, Weddings & Events";
const DEFAULT_DESCRIPTION =
  "Perth photographer Nora Wan with 15+ years shooting weddings, events, families, headshots, products and more across Perth & WA. Rated 5.0 from 117+ reviews. Get a quote.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Nora Wan" }],
  creator: "Nora Wan",
  publisher: SITE_NAME,
  category: "Photography",
  keywords: [
    "Perth photographer",
    "photography Perth",
    "Perth wedding photographer",
    "Perth event photographer",
    "Perth family photographer",
    "headshot photographer Perth",
    "product photography Perth",
    "real estate photography Perth",
    "pet photographer Perth",
    "Meerkat Photography",
    "Nora Wan",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE.url,
        width: DEFAULT_OG_IMAGE.width,
        height: DEFAULT_OG_IMAGE.height,
        alt: DEFAULT_OG_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/seo/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/seo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/seo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/seo/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" data-scroll-behavior="smooth" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={[localBusinessJsonLd(), websiteJsonLd(), personJsonLd()]} />
        <QuoteModalProvider>
          <RevealOnScroll />
          {children}
        </QuoteModalProvider>
      </body>
    </html>
  );
}
