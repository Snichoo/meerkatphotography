"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ButtonHTMLAttributes,
} from "react";
import { X } from "lucide-react";
import { sendEnquiry } from "@/lib/sendEnquiry";

type QuoteModalContextValue = {
  open: () => void;
  close: () => void;
};

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  }
  return ctx;
}

const inputClass =
  "h-[46px] w-full rounded-[10px] border border-navy/15 bg-cream px-4 text-[15px] font-light text-navy placeholder:text-navy/45 outline-none transition-all focus:-translate-y-0.5 focus:border-orange focus:shadow-[0_12px_24px_rgba(56,47,39,0.14)]";

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const open = useCallback(() => {
    setSent(false);
    setError(null);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <QuoteModalContext.Provider value={{ open, close }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Request a quote"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="animate-fade-in absolute inset-0 cursor-default bg-navy/70 backdrop-blur-sm"
          />

          <div className="animate-soft-pop relative z-[1] max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-[20px] bg-cream p-7 shadow-[0_30px_80px_rgba(56,47,39,0.45)] sm:p-9">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-navy/60 transition-colors hover:bg-navy/10 hover:text-navy"
            >
              <X className="h-5 w-5" />
            </button>

            {sent ? (
              <div className="py-10 text-center">
                <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold uppercase text-navy">
                  Thanks!
                </h2>
                <p className="mt-3 font-light text-navy/75">
                  Your enquiry is on its way I&rsquo;ll be in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="kp-btn-heart mt-8"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="pr-8 text-[clamp(1.5rem,3vw,2rem)] font-semibold uppercase leading-tight text-navy">
                  Request a quote
                </h2>
                <p className="mt-2 font-light leading-relaxed text-navy/75">
                  Tell me a little about your shoot and I&rsquo;ll come back with availability and
                  pricing.
                </p>

                <form
                  onSubmit={async (event) => {
                    event.preventDefault();
                    if (sending) return;
                    const form = event.currentTarget;
                    setSending(true);
                    setError(null);
                    try {
                      await sendEnquiry(form, "Quote modal");
                      setSent(true);
                    } catch (err) {
                      setError(err instanceof Error ? err.message : "Something went wrong.");
                    } finally {
                      setSending(false);
                    }
                  }}
                  className="mt-6 grid gap-4"
                >
                  <input type="text" name="name" required placeholder="Your name*" className={inputClass} />
                  <input type="email" name="email" required placeholder="Email*" className={inputClass} />
                  <input type="tel" name="phone" required placeholder="Phone*" className={inputClass} />
                  <textarea
                    rows={4}
                    name="message"
                    placeholder="Message"
                    className={`${inputClass} h-[120px] py-3`}
                  />
                  {error && <p className="text-[14px] font-light text-orange">{error}</p>}
                  <button
                    type="submit"
                    disabled={sending}
                    className="kp-btn-heart mt-2 w-full disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {sending ? "Sending…" : "Submit enquiry"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </QuoteModalContext.Provider>
  );
}

type QuoteTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function QuoteTrigger({ children, type, onClick, ...props }: QuoteTriggerProps) {
  const { open } = useQuoteModal();
  return (
    <button
      type={type ?? "button"}
      onClick={(event) => {
        onClick?.(event);
        open();
      }}
      {...props}
    >
      {children}
    </button>
  );
}
