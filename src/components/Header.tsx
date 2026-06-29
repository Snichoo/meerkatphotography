"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, services, site } from "@/lib/content";
import { FacebookIcon, InstagramIcon } from "@/components/icons";
import { useQuoteModal } from "@/components/QuoteModal";

type HeaderProps = {
  variant?: "transparent" | "cream";
  activeLabel?: string;
};

function QuoteButton({ variant }: { variant: "desktop" | "mobile" }) {
  const { open } = useQuoteModal();
  return (
    <button
      type="button"
      onClick={open}
      aria-label="Get a quote"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[12px] bg-orange text-center font-semibold uppercase leading-none tracking-[0.04em] text-cream shadow-[0_8px_20px_rgba(56,47,39,0.22)] transition-all hover:-translate-y-0.5 hover:bg-gold hover:shadow-[0_12px_26px_rgba(56,47,39,0.26)] active:translate-y-0",
        variant === "desktop"
          ? "hidden h-[46px] px-6 text-[13px] lg:inline-flex xl:h-[50px] xl:px-7 xl:text-[14px]"
          : "h-[40px] px-4 text-[11px] lg:hidden"
      )}
    >
      Get a Quote
    </button>
  );
}

export function Header({ variant = "transparent", activeLabel }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openQuote } = useQuoteModal();
  const creamVariant = variant === "cream";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        creamVariant
          ? "h-[68px] bg-cream py-0 text-navy"
          : scrolled
            ? "bg-navy/95 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.25)] backdrop-blur"
            : "bg-transparent py-3.5 text-cream"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-6",
          creamVariant ? "h-full px-6 sm:px-[60px]" : "kp-container"
        )}
      >
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 transition-transform duration-300 hover:scale-[1.03]",
            creamVariant ? "text-gold" : "text-cream"
          )}
          aria-label={site.name}
        >
          <Image
            src="/images/meerkat-logo.png"
            alt={site.name}
            width={1254}
            height={1254}
            quality={80}
            sizes="(max-width: 1024px) 48px, 62px"
            className={cn("h-auto", creamVariant ? "w-[48px] lg:w-[58px]" : "w-[48px] lg:w-[62px]")}
          />
          <span className="hidden font-heading leading-none sm:flex sm:flex-col">
            <span className="text-[16px] font-semibold uppercase tracking-[0.16em] lg:text-[18px]">
              Meerkat
            </span>
            <span className="mt-1 text-[10px] font-light uppercase tracking-[0.4em] lg:text-[11px]">
              Photography
            </span>
          </span>
        </Link>

        <nav className={cn("hidden items-center lg:flex", creamVariant ? "gap-[54px]" : "gap-7")}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-[15px] font-light transition-colors hover:text-gold",
                activeLabel === link.label
                  ? "text-gold"
                  : creamVariant
                    ? "text-navy"
                    : "text-cream/90"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={site.facebook}
            aria-label="Facebook"
            target="_blank"
            rel="noreferrer"
            className={cn(
              "transition-all hover:-translate-y-0.5 hover:text-gold",
              creamVariant ? "text-navy" : "text-cream/80"
            )}
          >
            <FacebookIcon />
          </a>
          <a
            href={site.instagram}
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer"
            className={cn(
              "transition-all hover:-translate-y-0.5 hover:text-gold",
              creamVariant ? "text-navy" : "text-cream/80"
            )}
          >
            <InstagramIcon />
          </a>
          <QuoteButton variant="desktop" />
        </div>

        {/* Mobile cluster: compact CTA + toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <QuoteButton variant="mobile" />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 transition-transform active:scale-95"
          >
          <span
            className={cn(
              "h-0.5 w-6 transition-transform duration-300",
              creamVariant ? "bg-navy" : "bg-cream",
              open && "translate-y-2 rotate-45"
            )}
          />
          <span
            className={cn(
              "h-0.5 w-6 transition-opacity duration-300",
              creamVariant ? "bg-navy" : "bg-cream",
              open && "opacity-0"
            )}
          />
          <span
            className={cn(
              "h-0.5 w-6 transition-transform duration-300",
              creamVariant ? "bg-navy" : "bg-cream",
              open && "-translate-y-2 -rotate-45"
            )}
          />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={cn("animate-soft-pop max-h-[calc(100vh-68px)] origin-top overflow-y-auto lg:hidden", creamVariant ? "bg-cream" : "bg-navy/98 backdrop-blur")}>
          <nav
            className={cn(
              "kp-container flex flex-col pb-8 pt-2",
              creamVariant ? "text-navy" : "text-cream"
            )}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "border-b py-3 text-[16px] font-light transition-colors hover:text-gold",
                  creamVariant ? "border-navy/15" : "border-cream/15",
                  activeLabel === link.label && "text-gold"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Services list */}
            <div
              className={cn(
                "border-b py-4",
                creamVariant ? "border-navy/15" : "border-cream/15"
              )}
            >
              <span className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
                What I shoot
              </span>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {services.map((service) => (
                  <li key={service.title}>
                    <Link
                      href={service.href}
                      prefetch={false}
                      onClick={() => setOpen(false)}
                      className="block py-0.5 text-[14px] font-light leading-snug transition-colors hover:text-gold"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote CTA */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openQuote();
              }}
              className="mt-5 rounded-[12px] bg-orange px-6 py-3 text-center text-[14px] font-semibold uppercase tracking-[0.04em] text-cream transition-all hover:-translate-y-0.5 hover:bg-gold active:translate-y-0"
            >
              Get a Quote
            </button>

            {/* Contact actions */}
            <div className="mt-3 grid grid-cols-3 gap-3">
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                onClick={() => setOpen(false)}
                aria-label="Call"
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-[12px] border py-3 text-[12px] font-light uppercase tracking-[0.06em] transition-colors hover:border-gold hover:text-gold",
                  creamVariant ? "border-navy/20" : "border-cream/25"
                )}
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-[12px] border py-3 text-[12px] font-light uppercase tracking-[0.06em] transition-colors hover:border-gold hover:text-gold",
                  creamVariant ? "border-navy/20" : "border-cream/25"
                )}
              >
                <InstagramIcon />
                Instagram
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-[12px] border py-3 text-[12px] font-light uppercase tracking-[0.06em] transition-colors hover:border-gold hover:text-gold",
                  creamVariant ? "border-navy/20" : "border-cream/25"
                )}
              >
                <FacebookIcon />
                Facebook
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
