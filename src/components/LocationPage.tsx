import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@/components/icons";
import { QuoteTrigger } from "@/components/QuoteModal";
import { whyPoints } from "@/lib/content";
import type { Location } from "@/lib/locations";
import { servicesPageItems } from "@/lib/services-page";

const HERO_IMAGE = "/images/hero/family.webp";

export function LocationPage({
  location,
  nearby,
}: {
  location: Location;
  nearby: Location[];
}) {
  return (
    <main className="bg-cream text-navy">
      {/* Hero */}
      <section className="relative flex min-h-[560px] items-center overflow-hidden bg-navy pt-[110px] pb-16 text-cream lg:min-h-[640px] lg:pt-[130px]">
        <Image
          src={HERO_IMAGE}
          alt={`Photography in ${location.suburb}, Perth`}
          fill
          preload
          quality={70}
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-navy/68" />
        <div className="absolute inset-0 bg-linear-to-t from-navy/85 via-navy/30 to-navy/55" />
        <div className="kp-container relative z-[1]">
          <p
            className="kp-reveal text-[13px] font-semibold uppercase tracking-[0.28em] text-gold"
            data-reveal="soft"
          >
            Perth Photographer · {location.region}
          </p>
          <h1
            className="kp-reveal mt-5 max-w-4xl text-[clamp(2.4rem,5.4vw,4.75rem)] font-semibold uppercase leading-[1.04]"
            data-reveal="soft"
            data-reveal-delay="1"
          >
            Photographer in {location.suburb}
          </h1>
          <p
            className="kp-reveal mt-6 max-w-2xl text-[clamp(1.05rem,1.7vw,1.4rem)] font-light leading-relaxed text-cream/90"
            data-reveal="up"
            data-reveal-delay="2"
          >
            {location.tagline}
          </p>
          <div
            className="kp-reveal mt-9 flex flex-wrap items-center gap-4"
            data-reveal="zoom"
            data-reveal-delay="3"
          >
            <QuoteTrigger className="kp-btn-heart">Get a quote</QuoteTrigger>
            <Link
              href="/services"
              className="kp-btn-outline text-cream hover:bg-cream hover:text-navy"
            >
              View services
            </Link>
          </div>
          <div
            className="kp-reveal mt-7 flex flex-wrap items-center gap-2 text-cream/90"
            data-reveal="fade"
            data-reveal-delay="3"
          >
            <span className="flex gap-1 text-gold" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} className="h-5 w-5" />
              ))}
            </span>
            <span className="text-sm sm:text-base">Rated 5.0 from 117+ Google reviews</span>
          </div>
        </div>
      </section>

      {/* Intro + local spots */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="kp-container grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
          <div className="kp-reveal space-y-5 text-[clamp(1rem,1.35vw,1.2rem)] font-light leading-relaxed text-navy/85" data-reveal="up">
            <h2 className="kp-h2 mb-2 text-[clamp(1.7rem,3.4vw,2.6rem)] normal-case">
              Your local {location.suburb} photographer
            </h2>
            {location.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <aside className="kp-reveal self-start rounded-[16px] bg-navy p-8 text-cream" data-reveal="right" data-reveal-delay="1">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.22em] text-gold">
              Around {location.suburb}
            </h3>
            <p className="mt-4 text-sm font-light leading-relaxed text-cream/80">
              Favourite spots and settings for shoots nearby:
            </p>
            <ul className="mt-4 space-y-2.5 font-light">
              {location.landmarks.map((spot) => (
                <li key={spot} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  <span>{spot}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-cream/15 pt-5 text-sm font-light leading-relaxed text-cream/80">
              Based nearby in Mount Nasura, so there&rsquo;s less travel, easier planning and a
              photographer who genuinely knows {location.region}.
            </p>
          </aside>
        </div>
      </section>

      {/* Services offered in this suburb */}
      <section className="bg-navy py-16 text-cream sm:py-20 lg:py-24">
        <div className="kp-container">
          <div className="kp-reveal max-w-3xl" data-reveal="soft">
            <h2 className="text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold uppercase leading-tight">
              Photography services in {location.suburb}
            </h2>
            <p className="mt-4 font-light leading-relaxed text-cream/80">
              Whatever you&rsquo;re celebrating or building, here&rsquo;s what I photograph across{" "}
              {location.suburb} and the surrounding area  each with relaxed direction and a
              beautifully finished gallery.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicesPageItems.map((service, index) => (
              <Link
                key={service.id}
                href={service.href}
                prefetch={false}
                className="kp-reveal group flex flex-col overflow-hidden rounded-[14px] bg-cream/[0.04] ring-1 ring-cream/10 transition-colors hover:bg-cream/[0.08]"
                data-reveal="up"
                data-reveal-delay={(index % 3) + 1}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    loading="lazy"
                    quality={65}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex grow flex-col p-6">
                  <h3 className="text-[19px] font-semibold uppercase leading-snug">{service.title}</h3>
                  <p className="mt-3 grow text-sm font-light leading-relaxed text-cream/75">
                    {service.paragraphs[0]}
                  </p>
                  <span className="mt-5 text-sm font-light uppercase tracking-[0.14em] text-gold transition-colors group-hover:text-cream">
                    View gallery
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose me */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="kp-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="kp-reveal" data-reveal="soft">
            <h2 className="kp-h2 text-[clamp(1.7rem,3.4vw,2.6rem)] normal-case">
              Why book Meerkat in {location.suburb}?
            </h2>
            <p className="mt-5 max-w-md font-light leading-relaxed text-navy/80">
              One friendly photographer with you from the first hello to the final gallery  local,
              reliable and easy to work with.
            </p>
            <QuoteTrigger className="kp-btn-heart mt-8">Check availability</QuoteTrigger>
          </div>
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {whyPoints.map((point, index) => (
              <li
                key={point.lead}
                className="kp-reveal border-t border-navy/15 pt-5"
                data-reveal="up"
                data-reveal-delay={(index % 5) + 1}
              >
                <span className="block text-[17px] font-semibold text-navy">{point.lead}</span>
                <span className="mt-1 block font-light leading-relaxed text-navy/70">
                  {point.rest}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Nearby areas */}
      {nearby.length > 0 && (
        <section className="border-t border-navy/10 bg-cream pb-20">
          <div className="kp-container pt-14">
            <h2 className="kp-reveal text-[13px] font-semibold uppercase tracking-[0.24em] text-navy/60" data-reveal="fade">
              Also serving nearby
            </h2>
            <div className="kp-reveal mt-5 flex flex-wrap gap-3" data-reveal="up" data-reveal-delay="1">
              {nearby.map((place) => (
                <Link
                  key={place.slug}
                  href={`/locations/${place.slug}`}
                  className="rounded-full border border-navy/20 px-5 py-2 text-[15px] font-light text-navy transition-colors hover:border-gold hover:text-gold"
                >
                  {place.suburb}
                </Link>
              ))}
              <Link
                href="/locations"
                className="rounded-full border border-navy/20 px-5 py-2 text-[15px] font-light text-navy transition-colors hover:border-gold hover:text-gold"
              >
                All areas
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
