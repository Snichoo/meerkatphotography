import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ServicesEnquiry } from "@/components/ServicesEnquiry";
import { QuoteTrigger } from "@/components/QuoteModal";
import { locations } from "@/lib/locations";
import { breadcrumbJsonLd, locationListJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Areas We Serve Across Perth",
  description:
    "Meerkat Photography covers Armadale, Kelmscott, Byford, Gosnells, Thornlie, Canning Vale and the wider Perth area for weddings, families, events, headshots and more.",
  path: "/locations",
});

export default function LocationsIndexRoute() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Areas", path: "/locations" },
          ]),
          locationListJsonLd(locations),
        ]}
      />
      <Header variant="cream" />
      <main className="bg-cream text-navy">
        <section className="bg-navy pb-16 pt-[130px] text-cream lg:pb-20 lg:pt-[150px]">
          <div className="kp-container">
            <p className="kp-reveal text-[13px] font-semibold uppercase tracking-[0.28em] text-gold" data-reveal="soft">
              Meerkat Photography · Perth
            </p>
            <h1 className="kp-reveal mt-5 max-w-4xl text-[clamp(2.4rem,5.4vw,4.75rem)] font-semibold uppercase leading-[1.04]" data-reveal="soft" data-reveal-delay="1">
              Areas I serve across Perth
            </h1>
            <p className="kp-reveal mt-6 max-w-2xl text-[clamp(1.05rem,1.7vw,1.35rem)] font-light leading-relaxed text-cream/90" data-reveal="up" data-reveal-delay="2">
              Based in Mount Nasura and shooting right across Perth and Western Australia. Pick your
              suburb below, or get in touch wherever you are.
            </p>
            <QuoteTrigger className="kp-btn-heart kp-reveal mt-8" data-reveal="zoom" data-reveal-delay="3">
              Get a quote
            </QuoteTrigger>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="kp-container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location, index) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="kp-reveal group flex flex-col rounded-[16px] border border-navy/15 bg-white/40 p-8 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[0_18px_40px_rgba(56,47,39,0.12)]"
                data-reveal="up"
                data-reveal-delay={(index % 3) + 1}
              >
                <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold">
                  {location.region}
                </span>
                <h2 className="mt-3 text-[26px] font-semibold uppercase leading-tight text-navy">
                  {location.suburb}
                </h2>
                <p className="mt-3 grow font-light leading-relaxed text-navy/75">
                  {location.tagline}
                </p>
                <span className="mt-6 text-sm font-light uppercase tracking-[0.14em] text-navy transition-colors group-hover:text-gold">
                  View {location.suburb} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <ServicesEnquiry />
      <Footer />
    </>
  );
}
