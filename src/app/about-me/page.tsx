import type { Metadata } from "next";
import { AboutMePage } from "@/components/AboutMePage";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "About Me - Meerkat Photography",
  description:
    "Meet Nora Wan, the Perth photographer behind Meerkat Photography. One person on every shoot, from weddings and families to headshots, products and events.",
};

export default function AboutMeRoute() {
  return (
    <>
      <Header variant="cream" activeLabel="About Me" />
      <AboutMePage />
      <Contact />
      <Footer />
    </>
  );
}
