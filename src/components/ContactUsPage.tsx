import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { Contact } from "@/components/Contact";
import { QuoteTrigger } from "@/components/QuoteModal";
import { site } from "@/lib/content";

const contactDetails = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
  },
  {
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone}`,
    icon: Phone,
  },
  {
    label: "Studio Base",
    value: site.location,
    href: "https://maps.google.com/?q=9%2F8%20Dale%20Street%2C%20Mount%20Nasura%20WA%206112%2C%20Australia",
    icon: MapPin,
  },
];

export function ContactUsPage() {
  return (
    <main className="bg-cream text-navy">
      <section className="relative isolate min-h-[680px] overflow-hidden bg-navy pt-[120px] text-cream lg:min-h-[760px] lg:pt-[150px]">
        <Image
          src="/images/nora-services-overview.jpg"
          alt=""
          fill
          preload
          quality={70}
          sizes="100vw"
          className="kp-hero-slide object-cover object-[center_66%]"
        />
        <div className="absolute inset-0 bg-navy/72" />
        <div className="absolute inset-0 bg-linear-to-b from-navy/35 via-navy/30 to-navy/90" />

        <div className="kp-container relative z-[1] grid gap-12 pb-24 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.7fr)] lg:items-end">
          <div>
            <h1 className="kp-reveal max-w-4xl text-[clamp(2.75rem,6.4vw,6.4rem)] font-semibold uppercase leading-[0.98]" data-reveal="soft">
              Contact Nora Wan
            </h1>
            <p className="kp-reveal mt-8 max-w-2xl text-[clamp(1.05rem,1.55vw,1.4rem)] font-light leading-relaxed text-cream/86" data-reveal="up" data-reveal-delay="1">
              Tell me what you&rsquo;re planning, where it&rsquo;s happening and what you need the
              photos for. I&rsquo;ll come back with availability, pricing and the best way to shape
              the shoot.
            </p>
            <div className="kp-reveal mt-10 flex flex-wrap gap-4" data-reveal="zoom" data-reveal-delay="2">
              <QuoteTrigger className="kp-btn-heart">Get a quote</QuoteTrigger>
              <a
                href={`mailto:${site.email}`}
                className="kp-btn-outline gap-3 text-cream hover:bg-cream hover:text-navy"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                Email Nora
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            {contactDetails.map((detail, index) => {
              const Icon = detail.icon;

              return (
                <a
                  key={detail.label}
                  href={detail.href}
                  target={detail.label === "Studio Base" ? "_blank" : undefined}
                  rel={detail.label === "Studio Base" ? "noreferrer" : undefined}
                  className="kp-reveal kp-hover-lift group grid gap-2.5 rounded-[14px] bg-cream p-5 text-navy shadow-[0_14px_34px_rgba(56,47,39,0.28)]"
                  data-reveal="right"
                  data-reveal-delay={index}
                >
                  <span className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-orange">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    {detail.label}
                  </span>
                  <span className="text-[clamp(1rem,1.25vw,1.2rem)] font-light leading-relaxed text-navy/80 transition-colors group-hover:text-navy">
                    {detail.value}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
