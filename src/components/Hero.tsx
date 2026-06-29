"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ScrollChevronIcon, StarIcon } from "@/components/icons";
import { QuoteTrigger } from "@/components/QuoteModal";
import { cn } from "@/lib/utils";

const slides = [
  { src: "/images/hero/wedding.webp", alt: "Wedding photography in Perth" },
  { src: "/images/hero/portrait.webp", alt: "Professional headshot photography" },
  { src: "/images/hero/family.webp", alt: "Family and lifestyle photography" },
  { src: "/images/hero/event.webp", alt: "Event photography in Perth" },
  { src: "/images/hero/birthday.webp", alt: "Birthday celebration photography" },
  { src: "/images/hero/pet.webp", alt: "Pet photography" },
  { src: "/images/hero/product.webp", alt: "Product photography" },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const [renderedSlides, setRenderedSlides] = useState<Set<number>>(() => new Set([0]));

  const rememberSlide = useCallback((slideIndex: number) => {
    setRenderedSlides((current) => {
      if (current.has(slideIndex)) {
        return current;
      }

      const next = new Set(current);
      next.add(slideIndex);
      return next;
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % slides.length;
        rememberSlide(next);
        return next;
      });
    }, 5000);
    return () => clearInterval(id);
  }, [rememberSlide]);

  useEffect(() => {
    const nextSlide = (active + 1) % slides.length;
    const preloadTimer = window.setTimeout(
      () => {
        rememberSlide(nextSlide);
      },
      active === 0 ? 1400 : 600
    );

    return () => window.clearTimeout(preloadTimer);
  }, [active, rememberSlide]);

  const renderedSlideIndexes = Array.from(renderedSlides).sort((a, b) => a - b);

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-navy"
    >
      {/* Background slideshow (crossfade) */}
      {renderedSlideIndexes.map((i) => {
        const slide = slides[i];

        return (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            preload={i === 0}
            loading={i === 0 ? undefined : "lazy"}
            quality={70}
            sizes="100vw"
            className={cn(
              "absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out",
              i === active ? "kp-hero-slide opacity-100" : "opacity-0"
            )}
          />
        );
      })}

      {/* Overlays for text legibility. */}
      <div className="absolute inset-0 bg-navy/60" />
      <div className="absolute inset-0 bg-linear-to-b from-navy/40 via-navy/25 to-navy/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(43,38,32,0.55)_0%,transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-cream">
        <h1 className="kp-reveal max-w-[20ch] font-heading text-[clamp(1.9rem,4.8vw,4.25rem)] font-semibold leading-[1.08] drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]" data-reveal="soft">
          Perth photography for your biggest moments &amp; your brand
        </h1>
        <p className="kp-reveal mt-5 max-w-[54ch] text-[clamp(1rem,1.7vw,1.4rem)] font-light text-cream/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]" data-reveal="soft" data-reveal-delay="1">
          From weddings, families and birthdays to headshots, products and events relaxed
          shoots, beautiful galleries, and one photographer with you from first hello to final
          delivery.
        </p>
        <QuoteTrigger className="kp-btn-heart kp-reveal mt-8" data-reveal="zoom" data-reveal-delay="2">
          Get a quote
        </QuoteTrigger>
        <div className="kp-reveal mt-6 flex flex-wrap items-center justify-center gap-2 text-cream drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]" data-reveal="fade" data-reveal-delay="3">
          <span className="flex gap-1 text-gold" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="h-5 w-5" />
            ))}
          </span>
          <span className="text-sm underline underline-offset-4 sm:text-base">
            Rated 5.0 from 117+ Google Reviews
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#intro"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/90 transition-colors hover:text-gold"
      >
        <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
        <ScrollChevronIcon className="animate-bounce" />
      </a>
    </section>
  );
}
