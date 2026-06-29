"use client";

import { useState } from "react";
import { Curve, CREAM } from "@/components/Curve";

const ORANGE = "#d85850";

const inputClass =
  "h-[45px] w-full rounded-[10px] border border-cream bg-cream px-4 pb-[0.7rem] pt-[0.6rem] text-[15px] font-light text-navy placeholder:text-[#777676cc] outline-none transition-all focus:-translate-y-0.5 focus:border-navy focus:shadow-[0_12px_24px_rgba(56,47,39,0.16)]";

export function ServicesEnquiry() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="bg-orange text-cream">
      {/* Wavy divider from the cream gallery into the orange enquiry band */}
      <Curve top={CREAM} bottom={ORANGE} shape="wave" height={70} />

      <div className="kp-container max-w-[1140px] pt-[50px]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
          className="grid gap-x-10 gap-y-[30px] pb-[90px] sm:grid-cols-2"
        >
          <input
            type="text"
            required
            placeholder="Your name*"
            className={`${inputClass} kp-reveal sm:col-span-2`}
            data-reveal="up"
          />
          <input
            type="email"
            required
            placeholder="Email*"
            className={`${inputClass} kp-reveal`}
            data-reveal="left"
            data-reveal-delay="1"
          />
          <input
            type="tel"
            required
            placeholder="Phone*"
            className={`${inputClass} kp-reveal`}
            data-reveal="right"
            data-reveal-delay="1"
          />
          <textarea
            rows={4}
            placeholder="Message"
            className={`${inputClass} kp-reveal h-[150px] sm:col-span-2`}
            data-reveal="up"
            data-reveal-delay="2"
          />

          <div className="kp-reveal relative text-center sm:col-span-2" data-reveal="zoom" data-reveal-delay="3">
            <button
              type="submit"
              className="inline-flex min-h-[38px] min-w-[120px] items-center justify-center rounded-[8px] border border-cream px-6 py-2 text-[12px] font-light uppercase leading-tight text-cream transition-all hover:-translate-y-0.5 hover:bg-cream hover:text-navy active:translate-y-0"
            >
              {sent ? "Thanks" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
