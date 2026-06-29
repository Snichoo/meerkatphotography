import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ServicesEnquiry } from "@/components/ServicesEnquiry";
import { ServicesPage } from "@/components/ServicesPage";

export const metadata: Metadata = {
  title: "Services - Meerkat Photography",
  description:
    "Wedding, family, birthday, headshot, product, event and pet photography across Perth with Meerkat Photography. Relaxed shoots and beautifully finished galleries.",
};

export default function ServicesRoute() {
  return (
    <>
      <Header variant="cream" activeLabel="Services" />
      <ServicesPage />
      <ServicesEnquiry />
      <Footer />
    </>
  );
}
