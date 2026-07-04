import type { Metadata } from "next";
import type { JsonLdData } from "@/components/JsonLd";
import { faqs, services, site } from "@/lib/content";
import type { Location } from "@/lib/locations";
import { servicesPageItems, type ServicesPageItem } from "@/lib/services-page";

/**
 * Canonical origin for the site. Override in Vercel with NEXT_PUBLIC_SITE_URL
 * (e.g. a preview/staging host) — defaults to the production apex.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://meerkatphotography.au"
).replace(/\/+$/, "");

export const SITE_NAME = site.name;
export const PHOTOGRAPHER_NAME = "Nora Wan";

/** Default social-share image (generated 1200x630 card in /public/seo). */
export const DEFAULT_OG_IMAGE = {
  url: "/seo/og-image.jpg",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — Perth photographer ${PHOTOGRAPHER_NAME}`,
} as const;

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Per-page metadata helper — keeps canonical URL, Open Graph and Twitter card
 * consistent across routes. `title` is the page title WITHOUT the brand; the
 * root layout's title template appends " | Meerkat Photography" to the tag,
 * while social cards use the full brand-suffixed title here.
 */
export function pageMetadata(opts: {
  title?: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}): Metadata {
  const fullTitle = opts.title ? `${opts.title} | ${SITE_NAME}` : DEFAULT_OG_IMAGE.alt;
  const image = opts.image ?? DEFAULT_OG_IMAGE.url;
  const imageAlt = opts.imageAlt ?? DEFAULT_OG_IMAGE.alt;

  return {
    ...(opts.title ? { title: opts.title } : {}),
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: "website",
      locale: "en_AU",
      url: absoluteUrl(opts.path),
      siteName: SITE_NAME,
      title: fullTitle,
      description: opts.description,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: opts.description,
      images: [image],
    },
  };
}

/** International-format phone for tel: links and structured data. */
const PHONE_INTL = `+61${site.phone.replace(/\D/g, "").replace(/^0/, "")}`;

const SAME_AS = [site.facebook, site.instagram].filter(Boolean);

// Stable @id anchors so structured-data nodes can reference each other.
const BUSINESS_ID = `${SITE_URL}/#business`;
const PERSON_ID = `${SITE_URL}/#nora-wan`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Primary LocalBusiness node. Uses ProfessionalService (a LocalBusiness
 * subtype) so Google can surface the business in local/map results.
 */
export function localBusinessJsonLd(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    description:
      "Perth photographer with 15+ years of experience shooting weddings, events, families, headshots, products and more across Perth and Western Australia.",
    url: SITE_URL,
    telephone: PHONE_INTL,
    email: site.email,
    image: absoluteUrl(DEFAULT_OG_IMAGE.url),
    logo: absoluteUrl("/images/meerkat-logo.png"),
    priceRange: "$$",
    currenciesAccepted: "AUD",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9/8 Dale Street",
      addressLocality: "Mount Nasura",
      addressRegion: "WA",
      postalCode: "6112",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -32.1206,
      longitude: 116.0184,
    },
    areaServed: [
      { "@type": "City", name: "Perth" },
      { "@type": "AdministrativeArea", name: "Western Australia" },
    ],
    founder: { "@id": PERSON_ID },
    employee: { "@id": PERSON_ID },
    sameAs: SAME_AS,
    knowsAbout: services.map((service) => service.title),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: 117,
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photography services",
      itemListElement: servicesPageItems.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: absoluteUrl(service.href),
        },
      })),
    },
  };
}

/** The person behind the business — helps entity/knowledge-panel matching. */
export function personJsonLd(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: PHOTOGRAPHER_NAME,
    jobTitle: "Photographer",
    description:
      "Nora Wan is a Perth photographer with 15+ years behind the camera, shooting weddings, portraits, events and products across Western Australia.",
    url: absoluteUrl("/about-me"),
    image: absoluteUrl("/images/nora-about.jpg"),
    worksFor: { "@id": BUSINESS_ID },
    sameAs: SAME_AS,
  };
}

/** WebSite node (site name + publisher) for sitelinks/branding. */
export function websiteJsonLd(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-AU",
    publisher: { "@id": BUSINESS_ID },
  };
}

/** FAQPage node built from the on-page FAQ so rich results stay in sync. */
export function faqJsonLd(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

type Crumb = { name: string; path: string };

/** BreadcrumbList for a sub-page trail. */
export function breadcrumbJsonLd(crumbs: Crumb[]): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/**
 * Service node for a suburb landing page: a photography service provided by the
 * business, with `areaServed` pinned to that suburb. The global LocalBusiness
 * node (rendered in the layout) supplies the business's own name/address, so we
 * don't duplicate a second LocalBusiness here.
 */
export function locationServiceJsonLd(location: Location): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Photographer in ${location.suburb}`,
    serviceType: "Photography",
    description: location.metaDescription,
    url: absoluteUrl(`/locations/${location.slug}`),
    provider: { "@id": BUSINESS_ID },
    areaServed: {
      "@type": "Place",
      name: `${location.suburb}, Western Australia ${location.postcode}`,
      geo: {
        "@type": "GeoCoordinates",
        latitude: location.geo.lat,
        longitude: location.geo.lng,
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Photography services in ${location.suburb}`,
      itemListElement: servicesPageItems.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${service.title} in ${location.suburb}`,
          url: absoluteUrl(service.href),
        },
      })),
    },
  };
}

/** ItemList of all suburb pages for the /locations index. */
export function locationListJsonLd(items: Location[]): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Areas served across Perth",
    itemListElement: items.map((location, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `Photographer in ${location.suburb}`,
      url: absoluteUrl(`/locations/${location.slug}`),
    })),
  };
}

/** Service node for an individual service detail page. */
export function serviceJsonLd(service: ServicesPageItem): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} — Perth`,
    serviceType: service.title,
    description: service.paragraphs.join(" "),
    url: absoluteUrl(service.href),
    image: absoluteUrl(service.image),
    provider: { "@id": BUSINESS_ID },
    areaServed: [
      { "@type": "City", name: "Perth" },
      { "@type": "AdministrativeArea", name: "Western Australia" },
    ],
  };
}
