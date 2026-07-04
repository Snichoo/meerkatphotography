import type { Metadata } from "next";
import { AboutMePage } from "@/components/AboutMePage";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Nora Wan  Perth Photographer",
  description:
    "Meet Nora Wan, the Perth photographer behind Meerkat Photography. 15+ years and one person on every shoot, from weddings and families to headshots, products and events.",
  path: "/about-me",
  image: "/seo/og-about.jpg",
  imageAlt: "Nora Wan, Perth photographer",
});

export default function AboutMeRoute() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Me", path: "/about-me" },
        ])}
      />
      <Header variant="cream" activeLabel="About Me" />
      <AboutMePage />
      <Contact />
      <Footer />
    </>
  );
}
