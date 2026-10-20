import type { ReactNode } from "react";
import { About } from "@/components/About";
import { Circles } from "@/components/Circles";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { WhyUs } from "@/components/WhyUs";
import { Work } from "@/components/Work";
import { faqJsonLd } from "@/lib/seo";

type LandingPageProps = {
  heroTitle?: string;
  heroDescription?: string;
  /** Optional local content, within the same homepage composition. */
  children?: ReactNode;
};

/** One shared landing page keeps the homepage and area pages in step. */
export function LandingPage({ heroTitle, heroDescription, children }: LandingPageProps) {
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <Header />
      <main className="flex-1">
        <Hero title={heroTitle} description={heroDescription} />
        <Circles />
        {children}
        <Services />
        <Work />
        <Process />
        {/* About + Why Us share the homepage's cream panel on a navy band. */}
        <div className="bg-navy px-2 pb-12 pt-10 sm:px-3 sm:pb-16 lg:px-5 lg:pb-20">
          <div className="mx-auto max-w-[1520px] overflow-hidden rounded-[28px] bg-cream md:rounded-[40px]">
            <About />
            <WhyUs />
          </div>
        </div>
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
