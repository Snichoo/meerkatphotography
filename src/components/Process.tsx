"use client";

import { useState } from "react";
import { processSteps } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Curve, CREAM, NAVY } from "@/components/Curve";
import { QuoteTrigger } from "@/components/QuoteModal";

const lineTransforms = [
  "translate-x-0",
  "translate-x-full",
  "translate-x-[200%]",
  "translate-x-[300%]",
] as const;

export function Process() {
  const [active, setActive] = useState(1);

  return (
    <section className="bg-navy text-cream">
      {/* Curved divider rising from the cream Case Studies band */}
      <Curve top={CREAM} bottom={NAVY} shape="centerRise" height={90} />

      <div className="kp-container pb-24">
        {/* Intro */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="kp-h2 text-[clamp(1.9rem,4.4vw,3.2rem)]">
            How a shoot with me works
          </h2>
          <p className="mt-6 font-semibold text-gold">
            A simple, relaxed process from start to finish
          </p>
          <p className="mt-4 font-light leading-relaxed text-cream/80">
            Every Meerkat shoot is planned around what you actually need &mdash; whether that&rsquo;s
            a wedding, a family session, a set of headshots or a full product range.
          </p>
          <p className="mt-3 font-light text-cream/80">
            A clear, easy process keeps the day feeling relaxed and makes sure the final photos do
            exactly what you need them to.
          </p>
          <h3 className="mt-10 text-[clamp(1.8rem,3.2vw,2.4rem)] font-light text-cream">
            Interested?
          </h3>
          <p className="mt-2 font-light text-cream/75">
            Take a look at the four steps below, or enquire now and we&rsquo;ll talk through your
            shoot.
          </p>
        </div>

        {/* Numbered tabs */}
        <div className="relative mt-[60px]">
          <div className="grid grid-cols-4 gap-x-2 sm:gap-x-6 lg:gap-x-10">
            {processSteps.map((step, i) => {
              const isActive = i === active;
              return (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative z-[1] flex items-start px-1 pb-20 text-left transition-colors md:pb-[125px]",
                    isActive ? "text-gold" : "text-cream/90 hover:text-gold"
                  )}
                >
                  <span className="flex items-center bg-navy pb-[5px] leading-none">
                    <span className="mr-1.5 text-[clamp(2.5rem,8.35vw,7.5rem)] font-black leading-[0.8] md:mr-[15px]">
                      {i + 1}
                    </span>
                    <span className="text-[clamp(0.72rem,2.45vw,2.375rem)] font-light leading-none">
                      {step.label ?? step.title}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className={cn(
              "pointer-events-none absolute bottom-0 left-0 h-[80%] w-1/4 transition-transform duration-500 ease-[cubic-bezier(1,.01,0,1.22)] md:h-[calc(100%-60px)]",
              lineTransforms[active]
            )}
          >
            <div className="absolute bottom-0 left-1/2 h-full w-[6px] -translate-x-1/2 bg-gold md:w-[10px]" />
            <div className="absolute bottom-0 left-1/2 h-[30px] w-[30px] -translate-x-1/2 rounded-full bg-gold md:h-[50px] md:w-[50px]" />
          </div>
        </div>

        {/* Active step content panel */}
        <div className="-mt-7 rounded-[20px] border-[5px] border-gold bg-cream px-5 pb-8 pt-10 text-center text-navy md:border-[10px] md:px-8 md:pb-[30px] md:pt-[70px]">
          <div key={active} className="animate-fade-in">
            <h4 className="text-[clamp(1.6rem,2.65vw,2.375rem)] font-light leading-tight text-navy">
              {processSteps[active].title}
            </h4>
            <div className="mx-auto mt-8 max-w-[960px] space-y-5 font-light leading-relaxed text-navy">
              {processSteps[active].body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <QuoteTrigger className="kp-btn-heart">Enquire now</QuoteTrigger>
        </div>
      </div>
    </section>
  );
}
