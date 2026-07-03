import Image from "next/image";
import Link from "next/link";
import { services, servicesSpecialise } from "@/lib/content";
import { photoIcons } from "@/components/photo-icons";
import { cn } from "@/lib/utils";

export function Services() {
  return (
    <section id="services" className="bg-navy text-cream">
      <div className="w-full pb-32 pt-24">
        {/* Heading + statement */}
        <div className="kp-reveal mx-auto max-w-[1180px] px-5 text-center" data-reveal="soft">
          <h2 className="kp-h2 text-[clamp(2.2rem,4.8vw,4.2rem)]">Services</h2>
          <h3 className="mx-auto mt-9 max-w-[1050px] text-[clamp(1.65rem,3.2vw,3rem)] font-light leading-snug text-cream">
            Whatever you&rsquo;re celebrating or building, the goal&rsquo;s the same photos
            that feel like you, and work hard wherever you use them.
          </h3>
        </div>

        {/* Left-aligned intro copy + specialise list */}
        <div className="kp-reveal mx-auto mt-16 max-w-[980px] space-y-5 px-5 text-[clamp(1.05rem,1.35vw,1.35rem)] font-light leading-relaxed text-cream/85" data-reveal="up" data-reveal-delay="1">
          <p>
            From weddings and family sessions to headshots, products and events, I photograph it all
            across Perth with relaxed direction on the day and a beautifully finished
            gallery at the end.
          </p>
          <p>What I photograph:</p>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-4 pl-0 sm:grid-cols-2">
            {servicesSpecialise.map(({ icon, label }, index) => {
              const Icon = photoIcons[icon];
              return (
                <li
                  key={label}
                  className="kp-reveal flex items-center gap-4"
                  data-reveal="left"
                  data-reveal-delay={(index % 4) + 1}
                >
                  <span className="flex size-16 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold">
                    <Icon className="size-10" />
                  </span>
                  <span className="text-[clamp(1rem,1.25vw,1.2rem)] leading-snug">{label}</span>
                </li>
              );
            })}
          </ul>
          <p>Based in Perth, available across Western Australia and Australia-wide.</p>
        </div>

        {/* Service cards  title + dotted connector + rounded image with hover reveal.
            On the 2-col layout the final odd card (Meerkats & Pets) centres on the
            last row; the 3-col layout divides 9 cards evenly so no override needed. */}
        <div className="mt-22 grid w-full grid-cols-1 gap-x-8 gap-y-20 px-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-3 lg:px-12 xl:gap-x-10 xl:px-16">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              prefetch={false}
              data-reveal="zoom"
              data-reveal-delay={index % 4}
              className={cn(
                "kp-reveal kp-hover-lift group flex min-w-0 flex-col",
                index === services.length - 1 &&
                  "sm:col-span-2 sm:mx-auto sm:w-[calc((100%_-_2rem)/2)] lg:col-span-1 lg:w-full"
              )}
            >
              {/* Fixed-height header so every image lines up; the dotted line
                  grows to fill the gap between the title and the image. */}
              <div className="flex h-[132px] flex-col items-center text-center">
                <h4 className="kp-h2 max-w-[14ch] text-[clamp(1.35rem,1.75vw,2rem)] text-cream transition-colors group-hover:text-gold">
                  {service.title}
                </h4>
                <span className="kp-dotted mt-4 w-px flex-1 text-cream/55" aria-hidden="true" />
              </div>

              <div className="relative aspect-[6/5] overflow-hidden rounded-[24px] bg-navy shadow-[0_14px_34px_rgba(0,0,0,0.28)]">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  loading="lazy"
                  quality={70}
                  sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 33vw, (min-width: 640px) 46vw, 92vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay reveals the description + Find out more */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-navy/85 px-8 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="max-w-[36ch] text-[clamp(1rem,1.2vw,1.28rem)] font-light leading-relaxed text-cream">
                    {service.description}
                  </p>
                  <span className="text-[clamp(0.8rem,0.9vw,1rem)] font-light uppercase tracking-[0.18em] text-gold">
                    Find out more
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
