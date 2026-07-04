import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Circles } from "@/components/Circles";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { WhyUs } from "@/components/WhyUs";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <Header />
      <main className="flex-1">
        <Hero />
        <Circles />
        <Services />
        <Work />
        <Process />
        {/* About + Why Us live in a cream box floating on a navy band (gaps on the sides) */}
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
