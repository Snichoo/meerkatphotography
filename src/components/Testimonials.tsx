"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { testimonials } from "@/lib/content";
import { StarIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const slidePositionClasses = [
  "translate-x-0",
  "-translate-x-[calc(100%+40px)]",
  "-translate-x-[calc(200%+80px)]",
  "-translate-x-[calc(300%+120px)]",
  "-translate-x-[calc(400%+160px)]",
  "-translate-x-[calc(500%+200px)]",
];

export function Testimonials() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const carouselItems = [...testimonials, testimonials[0]];

  useEffect(() => {
    const id = setInterval(() => {
      setIsResetting(false);
      setSlideIndex((index) => index + 1);
    }, 4700);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (slideIndex !== testimonials.length) {
      return;
    }

    const resetId = window.setTimeout(() => {
      setIsResetting(true);
      setSlideIndex(0);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setIsResetting(false));
      });
    }, 1000);

    return () => window.clearTimeout(resetId);
  }, [slideIndex]);

  return (
    <section className="relative overflow-hidden bg-navy">
      <Image
        src="/images/testimonial-bg-wedding.jpg"
        alt=""
        fill
        loading="lazy"
        quality={70}
        sizes="100vw"
        className="object-cover object-[center_28%]"
      />

      {/* Heart clip-path (objectBoundingBox so it scales with each card) */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="kp-heart" clipPathUnits="objectBoundingBox">
            <path d="M0.5,0.93 C0.5,0.93 0.03,0.62 0.03,0.29 C0.03,0.12 0.17,0.03 0.30,0.03 C0.40,0.03 0.47,0.10 0.5,0.19 C0.53,0.10 0.60,0.03 0.70,0.03 C0.83,0.03 0.97,0.12 0.97,0.29 C0.97,0.62 0.5,0.93 0.5,0.93 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="kp-container kp-reveal relative z-[1] py-[70px] sm:py-[100px]" data-reveal="zoom">
        <div className="overflow-hidden">
          <div
            className={cn(
              "flex gap-10 will-change-transform",
              isResetting
                ? "transition-none"
                : "transition-transform duration-1000 ease-[ease]",
              slidePositionClasses[slideIndex],
            )}
          >
            {carouselItems.map((testimonial, testimonialIndex) => (
              <div
                key={`${testimonial.author}-${testimonialIndex}`}
                aria-hidden={
                  testimonialIndex % testimonials.length !== slideIndex % testimonials.length
                }
                className="w-full shrink-0"
              >
                <div className="grid">
                  <div className="w-[83.333%] max-w-[620px] sm:w-[75%] md:w-[66.667%] lg:w-1/2">
                    <blockquote
                      className={cn(
                        "relative aspect-square bg-orange",
                        testimonialIndex % testimonials.length === slideIndex % testimonials.length &&
                          "kp-floating"
                      )}
                      style={{ clipPath: "url(#kp-heart)" }}
                    >
                      <div className="absolute inset-0 flex flex-col items-center justify-start px-[18%] pb-[16%] pt-[22%] text-center">
                        <div className="mb-2 flex gap-1 text-cream sm:mb-3 sm:gap-1.5" aria-label="5 out of 5 stars">
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <StarIcon
                              key={starIndex}
                              className="h-[clamp(0.78rem,1.25vw,1.15rem)] w-[clamp(0.78rem,1.25vw,1.15rem)]"
                            />
                          ))}
                        </div>
                        <p className="text-[clamp(0.68rem,1.08vw,1.15rem)] font-semibold italic leading-[1.34] text-cream">
                          {testimonial.quote}
                        </p>
                        <cite className="mt-3 text-[clamp(0.72rem,1.08vw,1.1rem)] font-semibold not-italic text-cream sm:mt-5">
                          - {testimonial.author}
                        </cite>
                      </div>
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
