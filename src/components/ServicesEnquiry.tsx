"use client";

import { useState } from "react";
import { Curve, CREAM } from "@/components/Curve";
import { sendEnquiry } from "@/lib/sendEnquiry";

const ORANGE = "#d85850";

const inputClass =
  "h-[45px] w-full rounded-[10px] border border-cream bg-cream px-4 pb-[0.7rem] pt-[0.6rem] text-[15px] font-light text-navy placeholder:text-[#777676cc] outline-none transition-all focus:-translate-y-0.5 focus:border-navy focus:shadow-[0_12px_24px_rgba(56,47,39,0.16)]";

export function ServicesEnquiry() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <section id="contact" className="bg-orange text-cream">
      {/* Wavy divider from the cream gallery into the orange enquiry band */}
      <Curve top={CREAM} bottom={ORANGE} shape="wave" height={70} />

      <div className="kp-container max-w-[1140px] pt-[50px]">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (sending || sent) return;
            const form = event.currentTarget;
            setSending(true);
            setError(null);
            try {
              await sendEnquiry(form, "Services page");
              setSent(true);
              form.reset();
            } catch (err) {
              setError(err instanceof Error ? err.message : "Something went wrong.");
            } finally {
              setSending(false);
            }
          }}
          className="grid gap-x-10 gap-y-[30px] pb-[90px] sm:grid-cols-2"
        >
          <input
            type="text"
            name="name"
            required
            placeholder="Your name*"
            className={`${inputClass} kp-reveal sm:col-span-2`}
            data-reveal="up"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email*"
            className={`${inputClass} kp-reveal`}
            data-reveal="left"
            data-reveal-delay="1"
          />
          <input
            type="tel"
            name="phone"
            required
            placeholder="Phone*"
            className={`${inputClass} kp-reveal`}
            data-reveal="right"
            data-reveal-delay="1"
          />
          <textarea
            rows={4}
            name="message"
            placeholder="Message"
            className={`${inputClass} kp-reveal h-[150px] sm:col-span-2`}
            data-reveal="up"
            data-reveal-delay="2"
          />

          <div className="kp-reveal relative text-center sm:col-span-2" data-reveal="zoom" data-reveal-delay="3">
            <button
              type="submit"
              disabled={sending || sent}
              className="inline-flex min-h-[38px] min-w-[120px] items-center justify-center rounded-[8px] border border-cream px-6 py-2 text-[12px] font-light uppercase leading-tight text-cream transition-all hover:-translate-y-0.5 hover:bg-cream hover:text-navy active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sent ? "Thanks" : sending ? "Sending…" : "Submit"}
            </button>
            {error && <p className="mt-4 text-[14px] font-light text-cream/90">{error}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
