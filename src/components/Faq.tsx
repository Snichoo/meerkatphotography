"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { faqs } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-cream pb-16 pt-[70px]">
      <div className="kp-container">
        <div>
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="m-0">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-6 border-b border-navy px-5 py-10 text-left text-[22px] font-normal leading-[1.25] text-navy transition-colors hover:text-gold",
                    isOpen && "border-transparent pb-5"
                  )}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span
                    className={cn(
                      "shrink-0 text-2xl transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  >
                    {isOpen ? "-" : "+"}
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-b border-navy px-5 pb-10 font-light leading-relaxed text-navy/80">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
