import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ServicesEnquiry } from "@/components/ServicesEnquiry";
import { ServicesPage } from "@/components/ServicesPage";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { servicesPageItems } from "@/lib/services-page";

export const metadata: Metadata = pageMetadata({
  title: "Photography Services in Perth",
  description:
    "Wedding, family, birthday, headshot, product, event, real estate, travel and pet photography across Perth. Relaxed shoots and beautifully finished galleries.",
  path: "/services",
});

const serviceListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Photography services in Perth",
  itemListElement: servicesPageItems.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.title,
    url: absoluteUrl(service.href),
  })),
};

export default function ServicesRoute() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          serviceListJsonLd,
        ]}
      />
      <Header variant="cream" activeLabel="Services" />
      <ServicesPage />
      <ServicesEnquiry />
      <Footer />
    </>
  );
}
