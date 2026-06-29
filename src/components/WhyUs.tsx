import Image from "next/image";
import { whyPoints } from "@/lib/content";
import { QuoteTrigger } from "@/components/QuoteModal";

export function WhyUs() {
  return (
    <section className="py-16 sm:py-20">
      <div className="kp-container">
        <h2 className="kp-h2 text-[clamp(1.8rem,4.4vw,3rem)] text-navy">Why work with me?</h2>
        <h3 className="mt-6 max-w-2xl text-[clamp(1.6rem,3.4vw,2.5rem)] font-light leading-tight text-navy">
          Easy to work with &mdash; and genuinely good at the job
        </h3>

        <div className="mt-12 grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="font-light leading-relaxed text-navy/80">
              I care about far more than just pretty pictures. I want you to actually enjoy the
              shoot and walk away with photos that feel like you. So I take the time to understand
              what you need, plan it out properly, and bring fifteen years of experience to every
              single session.
            </p>

            <p className="mt-6 font-light text-navy/80">Why people choose me:</p>
            <ul className="mt-4 space-y-3">
              {whyPoints.map((point) => (
                <li key={point.lead} className="flex items-start gap-3 text-navy/80">
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

          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image
              src="/images/why-work-nora.jpg"
              alt="Nora Wan photographing on location"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_45%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
