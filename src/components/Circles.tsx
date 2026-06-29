"use client";

import { useEffect, useRef, useState } from "react";
import { QuoteTrigger } from "@/components/QuoteModal";
import { cn } from "@/lib/utils";

export function Circles() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        // Toggle on every entry/exit so the reveal replays each time the
        // section scrolls into view  whether scrolling down or back up.
        setInView(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const iv = (cls: string) => cn(cls, inView && "is-inview");

  return (
    <section
      ref={ref}
      id="intro"
      className="kp-circles relative isolate flex items-center justify-center overflow-hidden bg-cream"
    >
      {/* Bottom-half navy base that the circles "rise" out of and merge into */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-1/2 bg-navy" />

      {/* Orange circle (furthest back) */}
      <div
        className={iv(
          "kp-circle-side kp-circle-right absolute inset-0 z-10 m-auto aspect-square w-[74%] rounded-full bg-orange sm:w-[48.9%]"
        )}
      />
      {/* Gold circle (middle) */}
      <div
        className={iv(
          "kp-circle-side kp-circle-left absolute inset-0 z-20 m-auto aspect-square w-[74%] rounded-full bg-gold sm:w-[48.9%]"
        )}
      />

      {/* Centre navy circle holding the headline. `@container` makes the circle
          itself the sizing context so the text + gaps scale with the circle
          (via cqw units) and always stay inside it, even on small phones. */}
      <div className="@container relative z-30 flex aspect-square w-[80%] items-center justify-center rounded-full bg-navy text-cream sm:w-[53.33%]">
        <div className={iv("kp-circle-inner flex flex-col items-center px-[8%] text-center")}>
          <h2 className="kp-h2 max-w-[13ch] text-[clamp(1.5rem,4.4vw,3.6rem)] font-semibold leading-tight">
            Photography you&rsquo;ll be proud to share
          </h2>
          <h1 className="mt-3 max-w-[24ch] text-[clamp(0.72rem,3.54cqw,1.7rem)] font-light leading-snug text-cream/85 sm:mt-5">
            Weddings, portraits, events &amp; everything in between across Perth
          </h1>
          <QuoteTrigger className="kp-btn-heart mt-5 text-[clamp(0.95rem,1.7vw,1.5rem)] sm:mt-7">
            Get a quote
          </QuoteTrigger>
        </div>
      </div>
    </section>
  );
}
