"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { work } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Curve, CREAM, NAVY } from "@/components/Curve";
import { QuoteTrigger } from "@/components/QuoteModal";

export function Work() {
  const [index, setIndex] = useState(0);
  const [renderedSlides, setRenderedSlides] = useState<Set<number>>(() => new Set([0]));
  const count = work.length;

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

  const showSlide = (nextIndex: number) => {
    rememberSlide(nextIndex);
    setIndex(nextIndex);
  };

  const go = (dir: number) => {
    setIndex((i) => {
      const next = (i + dir + count) % count;
      rememberSlide(next);
      return next;
    });
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % count;
        rememberSlide(next);
        return next;
      });
    }, 3000);

    return () => window.clearInterval(timer);
  }, [count, rememberSlide]);

  useEffect(() => {
    const nextIndex = (index + 1) % count;
    const preloadTimer = window.setTimeout(() => {
      rememberSlide(nextIndex);
    }, 600);

    return () => window.clearTimeout(preloadTimer);
  }, [count, index, rememberSlide]);

  const renderedSlideIndexes = Array.from(renderedSlides).sort((a, b) => a - b);

  return (
    <section id="work" className="bg-cream">
      {/* Curved divider down from the navy Services band */}
      <Curve top={NAVY} bottom={CREAM} shape="centerDip" height={90} />

      {/* Intro */}
      <div className="kp-container kp-reveal mx-auto max-w-3xl text-center" data-reveal="soft">
        <h2 className="kp-h2 text-[clamp(1.8rem,4vw,2.9rem)] text-navy">
          A look at recent work
        </h2>
        <h4 className="mx-auto mt-6 max-w-2xl text-[clamp(1rem,1.8vw,1.25rem)] font-light uppercase leading-relaxed text-navy/80">
          Have a look below and if it feels like your kind of shoot, I&rsquo;d love to hear
          from you.
        </h4>
      </div>

      {/* Full-width carousel */}
      <div className="kp-reveal relative mt-8" data-reveal="zoom" data-reveal-delay="1">
        <div className="relative h-[74vw] max-h-[960px] min-h-[440px] w-full overflow-hidden">
          {renderedSlideIndexes.map((i) => {
            const item = work[i];

            return (
              <Image
                key={item.src}
                src={item.src}
                alt={item.alt}
                fill
                loading="lazy"
                quality={70}
                sizes="100vw"
                className={cn(
                  "object-cover object-[center_32%] transition-opacity duration-700",
                  i === index ? "opacity-100" : "opacity-0"
                )}
              />
            );
          })}

          {/* Cream curve that rises to a peak then dips, cutting into the TOP of the images */}
          <svg
            className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[clamp(80px,6.8vw,135px)] w-full"
            viewBox="0 0 1800 100"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M0 0 L1800 0 L1800 80 C1360 94 880 24 520 16 C350 12 160 24 0 34 Z"
              fill={CREAM}
            />
          </svg>

          <svg
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[clamp(76px,6.7vw,119px)] w-full"
            viewBox="0 0 1800 119"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M1036 100C626.5 100 323.5 66.5 0 31.5V119H1800V0.5C1482.5 82.5 1306.53 100 1036 100Z"
              fill={CREAM}
            />
          </svg>

          <div className="absolute inset-x-0 bottom-[clamp(58px,8.5vw,132px)] z-10">
            <div className="kp-container flex items-center">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => go(-1)}
                className="flex shrink-0 cursor-pointer text-cream transition-all hover:scale-105 hover:opacity-75 active:scale-95"
              >
                <svg
                  className="h-auto w-10 sm:w-[58px]"
                  viewBox="0 0 58 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M0.87868 20.8787C-0.292893 22.0503 -0.292893 23.9497 0.87868 25.1213L19.9706 44.2132C21.1421 45.3848 23.0416 45.3848 24.2132 44.2132C25.3848 43.0416 25.3848 41.1421 24.2132 39.9706L7.24264 23L24.2132 6.02944C25.3848 4.85786 25.3848 2.95837 24.2132 1.7868C23.0416 0.615223 21.1421 0.615223 19.9706 1.7868L0.87868 20.8787ZM3 26H58V20H3V26Z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              <div className="mx-2 flex h-2.5 flex-1 gap-1.5 sm:mx-5 sm:h-5 sm:gap-5">
                {work.map((item, i) => (
                  <button
                    key={item.src}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => showSlide(i)}
                    className={cn(
                      "h-full flex-1 bg-cream transition-opacity hover:opacity-80",
                      i === index ? "opacity-100" : "opacity-40"
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next"
                onClick={() => go(1)}
                className="flex shrink-0 cursor-pointer text-cream transition-all hover:scale-105 hover:opacity-75 active:scale-95"
              >
                <svg
                  className="h-auto w-10 sm:w-[58px]"
                  viewBox="0 0 58 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M57.1213 25.1213C58.2929 23.9497 58.2929 22.0503 57.1213 20.8787L38.0294 1.7868C36.8579 0.615223 34.9584 0.615223 33.7868 1.7868C32.6152 2.95837 32.6152 4.85786 33.7868 6.02944L50.7574 23L33.7868 39.9706C32.6152 41.1421 32.6152 43.0416 33.7868 44.2132C34.9584 45.3848 36.8579 45.3848 38.0294 44.2132L57.1213 25.1213ZM0 26H55V20H0V26Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="kp-container mt-14 flex flex-wrap justify-center gap-5 pb-24">
        <QuoteTrigger className="kp-btn-heart kp-reveal" data-reveal="left">
          Get a quote
        </QuoteTrigger>
        <Link href="/services" className="kp-btn-heart kp-reveal" data-reveal="right" data-reveal-delay="1">
          View gallery
        </Link>
      </div>
    </section>
  );
}
