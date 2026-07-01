"use client";

import { useState } from "react";
import { NAVY } from "@/components/Curve";
import { sendEnquiry } from "@/lib/sendEnquiry";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <section id="contact" className="bg-cream">
      <div className="kp-container kp-reveal max-w-5xl pb-20 pt-20 text-center" data-reveal="soft">
        <div className="mx-auto mb-10 h-px w-full max-w-2xl bg-navy/30" />
        <h2 className="text-[clamp(1.8rem,4vw,2.9rem)] font-light leading-tight text-navy">
          Based in Perth, available across Western Australia
        </h2>
        <p className="mt-6 font-light leading-relaxed text-navy/80">
          I shoot both <strong className="font-semibold text-navy">on location and in-studio</strong>{" "}
          across Perth, Mount Nasura and the surrounding suburbs
          and I&rsquo;m happy to travel Australia-wide for the right project.
        </p>
        <p className="mt-4 font-light text-navy/80">
          Get in touch to talk through your shoot, check availability and sort out the details.
          I&rsquo;d love to hear what you&rsquo;ve got planned.
        </p>
      </div>

      <div id="footer-cta-form" className="relative z-[2] -mt-[2.83vw] w-full overflow-hidden">
        <svg
          className="block h-[2.83vw] w-full scale-110"
          viewBox="0 0 1800 51"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1800 36.5572V50.9996H0V32.2457C115.692 21.9009 244.169 13.5328 382.779 7.77593C824.267 -10.562 1336.09 6.48687 1800 36.5572Z"
            fill="#d85850"
          />
        </svg>
      </div>

      <div className="overflow-hidden bg-orange text-cream">
        <div className="kp-container max-w-[1140px] pt-[100px]">
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              if (sending || sent) return;
              const form = event.currentTarget;
              setSending(true);
              setError(null);
              try {
                await sendEnquiry(form, "Contact page");
                setSent(true);
                form.reset();
              } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong.");
              } finally {
                setSending(false);
              }
            }}
            className="grid gap-x-10 gap-y-[30px] pb-[100px] sm:grid-cols-2"
          >
            <input
              type="text"
              name="name"
              required
              placeholder="Your name*"
              className={`${inputClass} kp-reveal sm:col-span-2`}
              data-reveal="up"
            />
            <input type="email" name="email" required placeholder="Email*" className={`${inputClass} kp-reveal`} data-reveal="left" data-reveal-delay="1" />
            <input type="tel" name="phone" required placeholder="Phone*" className={`${inputClass} kp-reveal`} data-reveal="right" data-reveal-delay="1" />
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
                className="kp-btn-outline text-cream hover:bg-cream hover:text-navy disabled:cursor-not-allowed disabled:opacity-70"
              >
                {sent ? "Thanks, we'll be in touch!" : sending ? "Sending…" : "Submit"}
              </button>
              {error && <p className="mt-4 text-[14px] font-light text-cream/90">{error}</p>}
            </div>
          </form>
        </div>

        <svg
          className="block h-auto w-full scale-110"
          viewBox="0 0 1800 74"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1800 0.332031V74H0V19.207C59.7245 18.9648 123.175 19.1221 190.416 19.7139C474.915 22.2207 792.058 16.2715 1112.06 10.2686L1112.15 10.2656H1112.21C1343.74 5.92188 1576.77 1.5498 1800 0.332031Z"
            fill={NAVY}
          />
        </svg>
      </div>
    </section>
  );
}

const inputClass =
  "h-[45px] w-full rounded-[10px] border border-cream bg-cream px-4 pb-[0.7rem] pt-[0.6rem] text-[15px] font-light text-navy placeholder:text-[#777676cc] outline-none transition-all focus:-translate-y-0.5 focus:border-navy focus:shadow-[0_12px_24px_rgba(56,47,39,0.16)]";
