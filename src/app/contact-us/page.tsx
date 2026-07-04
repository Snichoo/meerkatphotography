import type { Metadata } from "next";
import { ContactUsPage } from "@/components/ContactUsPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact a Perth Photographer",
  description:
    "Get in touch with Nora Wan at Meerkat Photography for wedding, family, headshot, event, product and pet photography across Perth and WA. Get a fast quote today.",
  path: "/contact-us",
});

export default function ContactUsRoute() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact-us" },
        ])}
      />
      <Header variant="cream" activeLabel="Contact Us" />
      <ContactUsPage />
      <Footer />
    </>
  );
}
