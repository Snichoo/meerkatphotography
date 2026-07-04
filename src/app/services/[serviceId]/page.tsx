import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { ServicesEnquiry } from "@/components/ServicesEnquiry";
import { getGalleryImages } from "@/lib/galleries-data";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { getServiceById, servicesPageItems } from "@/lib/services-page";

type ServiceRouteProps = {
  params: Promise<{
    serviceId: string;
  }>;
};

export function generateStaticParams() {
  return servicesPageItems.map((service) => ({
    serviceId: service.id,
  }));
}

export async function generateMetadata({ params }: ServiceRouteProps): Promise<Metadata> {
  const { serviceId } = await params;
  const service = getServiceById(serviceId);

  if (!service) {
    return {
      title: "Service Not Found",
      robots: { index: false, follow: true },
    };
  }

  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: service.href,
    image: `/seo/services/${service.id}.jpg`,
    imageAlt: `${service.title} in Perth by Meerkat Photography`,
  });
}

export default async function ServiceDetailRoute({ params }: ServiceRouteProps) {
  const { serviceId } = await params;
  const service = getServiceById(serviceId);

  if (!service) {
    notFound();
  }

  const images = await getGalleryImages(serviceId);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: service.href },
          ]),
          serviceJsonLd(service),
        ]}
      />
      <Header variant="cream" activeLabel="Services" />
      <ServiceDetailPage service={service} images={images} />
      <ServicesEnquiry />
      <Footer />
    </>
  );
}
