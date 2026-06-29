import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { services, site } from "@/lib/content";
import { FacebookIcon, InstagramIcon } from "@/components/icons";
import { QuoteTrigger } from "@/components/QuoteModal";

const usefulLinks = [
  { label: "About Me", href: "/about-me" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact-us" },
];

const mapEmbedUrl =
  "https://www.google.com/maps?q=9%2F8%20Dale%20Street%2C%20Mount%20Nasura%20WA%206112%2C%20Australia&output=embed";

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <span className="relative block w-full text-cream">
      <span className="relative z-[1] bg-navy pr-2 font-semibold">{children}</span>
      <span className="kp-dashed-x absolute left-0 top-1/2 h-0.5 w-full" aria-hidden="true" />
    </span>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy px-0 py-[90px] text-[22px] text-cream max-md:py-[50px] max-md:text-lg">
      <div className="kp-container">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-[0.9fr_1.35fr_1fr_1fr]">
          <div className="kp-reveal" data-reveal="up">
            <Link href="/" aria-label={site.name}>
              <Image
                src="/images/meerkat-logo.png"
                alt={site.name}
                width={1254}
                height={1254}
                loading="lazy"
                quality={80}
                sizes="116px"
                className="h-auto w-[116px]"
              />
            </Link>
            <div className="mt-8 flex gap-3">
              <a
                href={site.facebook}
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-all hover:-translate-y-1 hover:border-gold hover:text-gold"
              >
                <FacebookIcon />
              </a>
              <a
                href={site.instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-all hover:-translate-y-1 hover:border-gold hover:text-gold"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          <div className="kp-reveal inline-flex flex-col items-start leading-[2]" data-reveal="up" data-reveal-delay="1">
            <FooterHeading>Contact</FooterHeading>
            <address className="mt-3 not-italic">{site.location}</address>
            <div>
              <span>Phone: </span>
              <a href={`tel:${site.phone}`} className="hover:text-gold">
                {site.phone}
              </a>
            </div>
            <div>
              <span>Email: </span>
              <a href={`mailto:${site.email}`} className="hover:text-gold">
                {site.email}
              </a>
            </div>
            <QuoteTrigger className="my-[15px] inline-flex h-[45px] min-w-0 items-center justify-center rounded-[10px] border-4 border-orange bg-orange px-5 pb-0.5 pt-1 text-base font-light uppercase leading-none text-cream transition-colors hover:border-gold hover:bg-gold">
              Book a Shoot
            </QuoteTrigger>
            <div className="mt-4 w-full overflow-hidden rounded-[8px] border border-cream/25 bg-cream/10">
              <iframe
                title={site.location}
                src={mapEmbedUrl}
                className="block h-[210px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <nav className="kp-reveal inline-flex flex-col items-start leading-[2]" data-reveal="up" data-reveal-delay="2">
            <FooterHeading>Services</FooterHeading>
            <ul className="mt-3">
              {services.map((service) => (
                <li key={service.title}>
                  <Link href="/services" className="block text-[22px] font-normal text-cream hover:text-gold max-md:text-lg">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="kp-reveal inline-flex flex-col items-start leading-[2]" data-reveal="up" data-reveal-delay="3">
            <FooterHeading>Useful Links</FooterHeading>
            <ul className="mt-3">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="block text-[22px] font-normal text-cream hover:text-gold max-md:text-lg">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="kp-reveal pt-[100px] text-center text-base font-light text-cream max-md:pt-10 max-md:text-sm" data-reveal="fade">
          {site.copyright}
        </p>
      </div>
    </footer>
  );
}
