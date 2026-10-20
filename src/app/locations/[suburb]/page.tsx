import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { LocationPage } from "@/components/LocationPage";
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
      <LocationPage location={location} />
    </>
  );
}
