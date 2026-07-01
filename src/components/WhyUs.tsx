import Image from "next/image";
import { whyPoints } from "@/lib/content";
import { QuoteTrigger } from "@/components/QuoteModal";

export function WhyUs() {
  return (
    <section className="py-16 sm:py-20">
      <div className="kp-container">
        <h2 className="kp-reveal kp-h2 text-[clamp(1.8rem,4.4vw,3rem)] text-navy" data-reveal="soft">
          Why choose me?
        </h2>
        <h3 className="kp-reveal mt-6 max-w-2xl text-[clamp(1.6rem,3.4vw,2.5rem)] font-light leading-tight text-navy" data-reveal="soft" data-reveal-delay="1">
          Easy to work with and genuinely good at the job
        </h3>

        <div className="mt-12 grid items-center gap-14 lg:grid-cols-2">
          <div className="kp-reveal" data-reveal="left" data-reveal-delay="2">
            <p className="font-light leading-relaxed text-navy/80">
              I care about far more than just pretty pictures. I want you to actually enjoy the
              shoot and walk away with photos that feel like you. So I take the time to understand
              what you need, plan it out properly, and bring fifteen years of experience to every
              single session.
            </p>

            <p className="mt-6 font-light text-navy/80">Why people choose me:</p>
            <ul className="mt-4 space-y-3">
              {whyPoints.map((point, index) => (
                <li
                  key={point.lead}
                  className="kp-reveal flex items-start gap-3 text-navy/80"
                  data-reveal="left"
                  data-reveal-delay={(index % 4) + 1}
                >
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span className="font-light">
                    <strong className="font-semibold text-navy">{point.lead}</strong> {point.rest}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-6 font-light text-navy/80">
              Whatever we&rsquo;re shooting, you&rsquo;ll have my full attention and a final set of
              images you&rsquo;ll be genuinely happy to use.
            </p>

            <QuoteTrigger className="kp-btn-heart mt-8">Get a quote</QuoteTrigger>
          </div>

          <div className="kp-reveal group relative aspect-[4/5] overflow-hidden rounded-lg" data-reveal="right" data-reveal-delay="2">
            <Image
              src="/images/why-work-nora.jpg"
              alt="Nora Wan photographing on location"
              fill
              loading="lazy"
              quality={70}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_45%] transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
