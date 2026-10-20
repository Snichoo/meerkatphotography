import Link from "next/link";
import { LandingPage } from "@/components/LandingPage";
import { QuoteTrigger } from "@/components/QuoteModal";
import type { Location } from "@/lib/locations";

export function LocationPage({
  location,
  nearby,
}: {
  location: Location;
  nearby: Location[];
}) {
  const heroTitle = location.slug === "australia"
    ? "Photography across Australia for your biggest moments & your brand"
    : location.suburb + " photography for your biggest moments & your brand";

  return (
    <LandingPage heroTitle={heroTitle} heroDescription={location.tagline}>
      <section
        id="local-area"
        aria-labelledby="location-heading"
        className="bg-navy px-2 pb-12 pt-10 sm:px-3 sm:pb-16 lg:px-5 lg:pb-20"
      >
        <div className="mx-auto max-w-[1520px] overflow-hidden rounded-[28px] bg-cream text-navy md:rounded-[40px]">
          <div className="kp-container py-16 sm:py-20">
            <div className="kp-reveal" data-reveal="soft">
              <p className="text-[13px] font-semibold uppercase tracking-[0.24em] text-gold">
                {location.kicker ?? "Meerkat Photography · " + location.region}
              </p>
              <h2 id="location-heading" className="kp-h2 mt-5 max-w-4xl text-[clamp(1.8rem,4.4vw,3rem)]">
                {location.introHeading ?? "Your " + location.suburb + " photographer"}
              </h2>
            </div>

            <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
              <div className="kp-reveal space-y-5 font-light leading-relaxed text-navy/80" data-reveal="left">
                {location.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="flex flex-wrap gap-4 pt-3">
                  <QuoteTrigger className="kp-btn-heart">Plan your shoot</QuoteTrigger>
                  <Link href="#services" className="kp-btn-outline text-navy hover:bg-navy hover:text-cream">
                    Explore services
                  </Link>
                </div>
              </div>

              <aside className="kp-reveal rounded-[20px] border border-gold/40 p-7 sm:p-8" data-reveal="right" data-reveal-delay="1">
                <h3 className="text-xl font-light leading-snug">Around {location.suburb}</h3>
                <p className="mt-4 font-light leading-relaxed text-navy/80">
                  {location.landmarksIntro ?? "Settings and local options to discuss for your shoot:"}
                </p>
                <ul className="mt-5 space-y-3">
                  {location.landmarks.map((spot) => (
                    <li key={spot} className="flex items-start gap-3 font-light text-navy/80">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                      <span>{spot}</span>
                    </li>
                  ))}
                </ul>
                {location.localGuide && (
                  <a
                    href={location.localGuide.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-block text-sm font-light underline underline-offset-4 hover:text-gold"
                  >
                    {location.localGuide.label} &rarr;
                  </a>
                )}
                <p className="mt-6 border-t border-navy/15 pt-5 text-sm font-light leading-relaxed text-navy/70">
                  {location.asideNote ?? (
                    <>
                      Based in Mount Nasura and available for on-location photography in {location.suburb}.
                      We&rsquo;ll confirm the setting, timing and any relevant venue arrangements when planning your shoot.
                    </>
                  )}
                </p>
              </aside>
            </div>

            {location.planningTips && (
              <div className="mt-14 border-t border-navy/15 pt-10">
                <h3 className="kp-reveal text-[clamp(1.6rem,3.4vw,2.5rem)] font-light leading-tight" data-reveal="soft">
                  Planning your {location.suburb} shoot
                </h3>
                <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
                  {location.planningTips.map((tip, index) => (
                    <div key={tip.title} className="kp-reveal" data-reveal="up" data-reveal-delay={index + 1}>
                      <h4 className="text-[17px] font-semibold">{tip.title}</h4>
                      <p className="mt-3 font-light leading-relaxed text-navy/80">{tip.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {location.servicesIntro && (
              <p className="kp-reveal mt-10 max-w-3xl font-light leading-relaxed text-navy/80" data-reveal="up">
                {location.servicesIntro}
              </p>
            )}

            {nearby.length > 0 && (
              <nav aria-label="Nearby photography areas" className="mt-12 border-t border-navy/15 pt-8">
                <h3 className="kp-reveal text-[13px] font-semibold uppercase tracking-[0.24em] text-navy/60" data-reveal="fade">
                  Also serving nearby
                </h3>
                <div className="kp-reveal mt-5 flex flex-wrap gap-3" data-reveal="up" data-reveal-delay="1">
                  {nearby.map((place) => (
                    <Link
                      key={place.slug}
                      href={"/locations/" + place.slug}
                      className="rounded-full border border-navy/20 px-5 py-2 text-[15px] font-light transition-colors hover:border-gold hover:text-gold"
                    >
                      {place.suburb}
                    </Link>
                  ))}
                  <Link href="/locations" className="rounded-full border border-navy/20 px-5 py-2 text-[15px] font-light transition-colors hover:border-gold hover:text-gold">
                    All areas
                  </Link>
                </div>
              </nav>
            )}
          </div>
        </div>
      </section>
    </LandingPage>
  );
}
