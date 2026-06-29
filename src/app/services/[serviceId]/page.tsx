import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { ServicesEnquiry } from "@/components/ServicesEnquiry";
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
      title: "Service Not Found - Meerkat Photography",
    };
  }

  return {
    title: `${service.title} - Meerkat Photography`,
    description: `${service.title} gallery and service details from Meerkat Photography.`,
  };
}

export default async function ServiceDetailRoute({ params }: ServiceRouteProps) {
  const { serviceId } = await params;
  const service = getServiceById(serviceId);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header variant="cream" activeLabel="Services" />
      <ServiceDetailPage service={service} />
      <ServicesEnquiry />
      <Footer />
    </>
  );
}
