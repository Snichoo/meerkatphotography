import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { LocationPage } from "@/components/LocationPage";
import { ServicesEnquiry } from "@/components/ServicesEnquiry";
import { getLocationBySlug, locations } from "@/lib/locations";
import { breadcrumbJsonLd, locationServiceJsonLd, pageMetadata } from "@/lib/seo";

type LocationRouteProps = {
  params: Promise<{ suburb: string }>;
};

export function generateStaticParams() {
  return locations.map((location) => ({ suburb: location.slug }));
}

export async function generateMetadata({ params }: LocationRouteProps): Promise<Metadata> {
  const { suburb } = await params;
  const location = getLocationBySlug(suburb);

  if (!location) {
    return {
      title: "Area Not Found",
      robots: { index: false, follow: true },
    };
  }

  return pageMetadata({
    title: `${location.suburb} Photographer`,
    description: location.metaDescription,
    path: `/locations/${location.slug}`,
    imageAlt: `Meerkat Photography  photographer in ${location.suburb}, Perth`,
  });
}

export default async function LocationRoute({ params }: LocationRouteProps) {
  const { suburb } = await params;
  const location = getLocationBySlug(suburb);

  if (!location) {
    notFound();
  }

  const nearby = location.nearby
    .map((slug) => getLocationBySlug(slug))
    .filter((place): place is NonNullable<typeof place> => place !== undefined);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Areas", path: "/locations" },
            { name: location.suburb, path: `/locations/${location.slug}` },
          ]),
          locationServiceJsonLd(location),
        ]}
      />
      <Header variant="cream" />
      <LocationPage location={location} nearby={nearby} />
      <ServicesEnquiry />
      <Footer />
    </>
  );
}
