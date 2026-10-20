import { LandingPage } from "@/components/LandingPage";
import { QuoteTrigger } from "@/components/QuoteModal";
import type { Location } from "@/lib/locations";

export function LocationPage({ location }: { location: Location }) {
  const heroTitle = location.slug === "australia"
    ? "Photography across Australia for your biggest moments & your brand"
    : location.suburb + " photography for your biggest moments & your brand";

  return (
    <LandingPage heroTitle={heroTitle} heroDescription={location.tagline}>
      <section id="local-area" aria-labelledby="location-heading" className="bg-cream py-[60px] text-navy">
        <div className="kp-container kp-reveal max-w-3xl text-center" data-reveal="soft">
          <h2 id="location-heading" className="kp-h2 text-[clamp(1.6rem,3.4vw,2.5rem)]">
            Photography in {location.suburb}
          </h2>
          <p className="mt-5 font-light leading-relaxed text-navy/80">{location.shortSummary}</p>
          <QuoteTrigger className="kp-btn-heart mt-6">Plan your shoot</QuoteTrigger>
        </div>
      </section>
    </LandingPage>
  );
}
