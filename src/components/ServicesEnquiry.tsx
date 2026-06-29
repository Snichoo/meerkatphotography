"use client";

import { useState } from "react";
import { Curve, CREAM } from "@/components/Curve";

const ORANGE = "#d85850";

const inputClass =
  "h-[45px] w-full rounded-[10px] border border-cream bg-cream px-4 pb-[0.7rem] pt-[0.6rem] text-[15px] font-light text-navy placeholder:text-[#777676cc] outline-none transition focus:border-navy";

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
          <input type="text" required placeholder="Your name*" className={`${inputClass} sm:col-span-2`} />
          <input type="email" required placeholder="Email*" className={inputClass} />
          <input type="tel" required placeholder="Phone*" className={inputClass} />
          <textarea
            rows={4}
            placeholder="Message"
            className={`${inputClass} h-[150px] sm:col-span-2`}
          />

          <div className="relative text-center sm:col-span-2">
            <button
              type="submit"
              className="inline-flex min-h-[38px] min-w-[120px] items-center justify-center rounded-[8px] border border-cream px-6 py-2 text-[12px] font-light uppercase leading-tight text-cream transition-colors hover:bg-cream hover:text-navy"
            >
              {sent ? "Thanks" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
