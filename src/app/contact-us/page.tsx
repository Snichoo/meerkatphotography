import type { Metadata } from "next";
import { ContactUsPage } from "@/components/ContactUsPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Contact Us - Meerkat Photography",
  description:
    "Contact Nora Wan at Meerkat Photography for wedding, family, headshot, event, product and pet photography across Perth and Western Australia.",
};

export default function ContactUsRoute() {
  return (
    <>
      <Header variant="cream" activeLabel="Contact Us" />
      <ContactUsPage />
      <Footer />
    </>
  );
}
