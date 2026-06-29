import Image from "next/image";
import Link from "next/link";
import { CREAM } from "@/components/Curve";
import { QuoteTrigger } from "@/components/QuoteModal";

const process = [
  {
    number: "1",
    title: "Brief",
    body: "We talk through your ideas, the people involved, locations and how you'll use the photos, so we're on the same page before the camera comes out.",
  },
  {
    number: "2",
    title: "Shoot",
    body: "I guide the session, manage the light and keep the day moving, without ever making it feel stiff or rushed.",
  },
  {
    number: "3",
    title: "Review",
    body: "I hand-pick and carefully edit the strongest images, so the final set feels consistent, polished and complete.",
  },
  {
    number: "4",
    title: "Delivery",
    body: "You get a beautiful online gallery of high-res, ready-to-use files, perfect for printing, sharing or your website.",
  },
];

function AboutHeroCurve() {
  return (
    <div className="relative z-[4] -mt-px h-[96px] md:h-[112px]" aria-hidden="true">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-full w-full"
      >
        <path
          d="M0 120 L0 70 C236 32 510 34 704 65 C792 79 865 86 922 45 C984 0 1065 -7 1140 38 C1247 102 1346 88 1440 68 L1440 120 Z"
          fill={CREAM}
        />
      </svg>
    </div>
  );
}

export function AboutMePage() {
  return (
    <main className="bg-cream text-navy">
      <section className="relative overflow-visible bg-navy pt-[140px] text-cream lg:pt-[155px]">
        <div className="kp-container relative z-[2] grid items-end gap-10 pb-0 lg:min-h-[700px] lg:grid-cols-[minmax(0,0.98fr)_minmax(320px,0.72fr)]">
          <div className="pb-12 lg:pb-28">
            <h1 className="kp-reveal max-w-4xl text-[clamp(2.6rem,6.2vw,5.8rem)] font-semibold uppercase leading-[1.02]" data-reveal="soft">
              Meet Nora Wan. Perth photography with heart.
            </h1>
            <div className="kp-reveal mt-8 max-w-2xl space-y-5 text-[clamp(1rem,1.45vw,1.25rem)] font-light leading-relaxed text-cream/86" data-reveal="up" data-reveal-delay="1">
              <p>
                I&rsquo;m Nora Wan, the photographer behind Meerkat Photography. I work directly
                with every client, keeping the process calm, personal and easy from the first
                enquiry to the final gallery.
              </p>
              <p>
                My style is warm, observant and practical: enough direction to help you feel
                comfortable, enough space for real moments to happen, and finished photos that feel
                polished without losing their personality.
              </p>
            </div>
            <div className="kp-reveal mt-10 flex flex-wrap gap-4" data-reveal="zoom" data-reveal-delay="2">
              <QuoteTrigger className="kp-btn-heart">Book a shoot</QuoteTrigger>
              <Link href="/services" className="kp-btn-outline text-cream hover:bg-cream hover:text-navy">
                View services
              </Link>
            </div>
          </div>

          <div className="kp-reveal relative z-[3] mx-auto mb-[-94px] flex w-full max-w-[660px] justify-center self-end lg:mb-[-110px]" data-reveal="right" data-reveal-delay="1">
            <Image
              src="/images/nora-about-page.png"
              alt="Nora Wan, Perth photographer"
              width={1050}
              height={1941}
              preload
              quality={80}
              sizes="(max-width: 1024px) 84vw, 560px"
              className="h-[min(118vw,660px)] w-auto max-w-none object-contain lg:h-[820px] xl:h-[900px]"
            />
          </div>
        </div>
        <AboutHeroCurve />
      </section>

      <section className="pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pt-32">
        <div className="kp-container">
          <div className="kp-reveal grid items-end gap-6 lg:grid-cols-[0.75fr_1fr]" data-reveal="soft">
            <h2 className="kp-h2 text-[clamp(1.8rem,4vw,3.2rem)]">My process</h2>
            <p className="max-w-2xl font-light leading-relaxed text-navy/80">
              A clear structure keeps the day relaxed while still making sure every photo earns its
              place.
            </p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-4">
            {process.map((step, index) => (
              <div
                key={step.title}
                className="kp-reveal pt-6"
                data-reveal="up"
                data-reveal-delay={index}
              >
                <span className="mb-6 block h-[3px] w-12 rounded-full bg-gold" />
                <span className="text-[72px] font-black leading-none text-gold">{step.number}</span>
                <h3 className="mt-4 text-[24px] font-light uppercase leading-tight">{step.title}</h3>
                <p className="mt-4 font-light leading-relaxed text-navy/75">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream pb-20">
        <div className="kp-container grid gap-5 md:grid-cols-[1.08fr_0.92fr] md:items-stretch">
          <div className="grid gap-5">
            <div className="kp-reveal group relative min-h-[340px] overflow-hidden rounded-[8px] md:min-h-[430px] lg:min-h-[500px]" data-reveal="left">
              <Image
                src="/images/about-wedding-5lc-158.jpg"
                alt="Wedding couple walking through a celebration"
                fill
                loading="lazy"
                quality={70}
                sizes="(max-width: 768px) 100vw, 56vw"
                className="object-cover object-[center_48%] transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="kp-reveal bg-navy px-8 py-10 text-cream md:px-10" data-reveal="up" data-reveal-delay="1">
              <h2 className="text-[clamp(1.6rem,3.4vw,2.5rem)] font-light leading-tight">
                Want photos that feel natural, look polished and are ready to share?
              </h2>
              <QuoteTrigger className="kp-btn-heart mt-8">Enquire now</QuoteTrigger>
            </div>
          </div>
          <div className="kp-reveal group relative min-h-[520px] overflow-hidden rounded-[8px] md:h-full md:min-h-0" data-reveal="right" data-reveal-delay="1">
            <Image
              src="/images/about-meerkat2.jpg"
              alt="Meerkat standing in the sand"
              fill
              loading="lazy"
              quality={70}
              sizes="(max-width: 768px) 100vw, 44vw"
              className="object-cover object-[center_54%] transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
